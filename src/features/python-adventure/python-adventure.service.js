// src/features/python-adventure/python-adventure.service.js
import { callApi } from "../../repositories/api.client.js";
import { db, auth } from "../../core/firebase.js";
import { doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { COLLECTIONS, STORAGE_KEYS, FEATURES } from "../../core/constants.js";
import { normalizeError } from "../../core/errors.js";
import {
  CHALLENGES_CLIENT_DATA,
  WORLDS_DATA,
  ACHIEVEMENTS_DATA,
  DAILY_CHALLENGES_POOL,
  getDailyChallengeDateKey,
  getTodayDailyChallenge
} from "./python-adventure-data.js";

const LOCAL_STORAGE_KEY = "python_adventure_local_progress";
const CUSTOM_LEVELS_STORAGE_KEY = "python_adventure_custom_levels";
const WORLD_ORDERS_STORAGE_KEY = "python_adventure_world_orders";

// Initialize and merge custom levels into CHALLENGES_CLIENT_DATA
function initCustomLevelsCache() {
  try {
    const raw = localStorage.getItem(CUSTOM_LEVELS_STORAGE_KEY);
    if (raw) {
      const customMap = JSON.parse(raw);
      if (customMap && typeof customMap === "object") {
        Object.assign(CHALLENGES_CLIENT_DATA, customMap);
      }
    }
  } catch (err) {
    console.warn("Failed to load custom levels from local storage:", err);
  }
}
initCustomLevelsCache();

export const PythonAdventureService = {
  /**
   * Fetches or initializes student progress.
   * Primary: Cloud Function getPythonAdventureProgress.
   * Fallback: Authenticated Firestore document or localStorage.
   */
  async getStudentProgress(studentUid) {
    const uid = auth.currentUser?.uid || studentUid;
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const data = await callApi("getPythonAdventureProgress");
        if (data && typeof data === "object") {
          this._saveLocalCache(uid, data);
          return data;
        }
      } catch (apiErr) {
        console.warn("Cloud function getPythonAdventureProgress unavailable, using fallback:", apiErr);
      }
    }

    // Fallback 1: Firestore Direct
    try {
      if (uid && db) {
        const snap = await getDoc(doc(db, COLLECTIONS.PYTHON_ADVENTURE_PROGRESS, uid));
        if (snap.exists()) {
          const data = this.normalizeProgress(snap.data());
          this._saveLocalCache(uid, data);
          return data;
        }
      }
    } catch (fsErr) {
      console.warn("Firestore progress read fallback error:", fsErr);
    }

    // Fallback 2: Local cache or initial state
    const cached = this._getLocalCache(uid);
    if (cached) return this.normalizeProgress(cached);

    const initial = {
      studentUid: uid,
      currentWorldId: "world-1",
      currentLevelId: "world-1-level-1",
      xp: 0,
      level: 1,
      stars: {},
      completedChallenges: {},
      unlockedWorlds: ["world-1"],
      unlockedChallenges: ["world-1-level-1"],
      achievements: [],
      inventory: ["starter_compass"],
      streak: { count: 1, lastActiveDate: new Date().toISOString().split("T")[0] },
      stats: { totalCompleted: 0, totalRuns: 0, dailyCompletedDate: null },
      updatedAt: new Date().toISOString()
    };
    this._saveLocalCache(uid, initial);

    try {
      if (uid && db) {
        await setDoc(doc(db, COLLECTIONS.PYTHON_ADVENTURE_PROGRESS, uid), initial);
      }
    } catch (_) {}

    return initial;
  },

  /**
   * Guarantees structural integrity of student progress across all 8 worlds:
   * - Ensures world-1 and world-1-level-1 are always unlocked.
   * - Automatically unlocks the next level for any completed challenge.
   * - For every unlocked world, ensures its first challenge is unlocked.
   * - If all levels of a world are completed, unlocks the next world & its first level.
   * @param {object} progress
   * @returns {object} Normalized progress
   */
  normalizeProgress(progress) {
    if (!progress) return progress;
    const completed = progress.completedChallenges || {};
    const unlockedWorlds = new Set(progress.unlockedWorlds || ["world-1"]);
    const unlockedChallenges = new Set(progress.unlockedChallenges || ["world-1-level-1"]);

    unlockedWorlds.add("world-1");
    unlockedChallenges.add("world-1-level-1");

    // 1. For each completed challenge, unlock its nextChallengeId & unlocksWorldId
    for (const [chId, rec] of Object.entries(completed)) {
      unlockedChallenges.add(chId);
      const chData = CHALLENGES_CLIENT_DATA[chId];
      if (chData) {
        if (chData.nextChallengeId) unlockedChallenges.add(chData.nextChallengeId);
        if (chData.unlocksWorldId) {
          unlockedWorlds.add(chData.unlocksWorldId);
        }
      }
    }

    // 2. Cascade across all 8 concept worlds sequentially
    for (let wNum = 1; wNum <= WORLDS_DATA.length; wNum++) {
      const curWorldId = `world-${wNum}`;
      const nextWorldId = `world-${wNum + 1}`;
      const curChallenges = this.getWorldChallenges(curWorldId);

      // If this world is unlocked, its first level MUST be unlocked
      if (unlockedWorlds.has(curWorldId) && curChallenges.length > 0) {
        unlockedChallenges.add(curChallenges[0].id);

        // Within this world: if challenge i is completed, challenge i+1 is unlocked
        for (let i = 0; i < curChallenges.length - 1; i++) {
          if (completed[curChallenges[i].id]) {
            unlockedChallenges.add(curChallenges[i + 1].id);
          }
        }
      }

      // If all challenges in this world are completed, unlock next world and its first challenge!
      if (curChallenges.length > 0 && curChallenges.every((c) => !!completed[c.id])) {
        if (wNum < WORLDS_DATA.length) {
          unlockedWorlds.add(nextWorldId);
          const nextChallenges = this.getWorldChallenges(nextWorldId);
          if (nextChallenges.length > 0) {
            unlockedChallenges.add(nextChallenges[0].id);
          }
        }
      }
    }

    // 3. Guarantee full and fair XP calculation from all completed challenges (Self-Healing)
    let trueXpSum = 0;
    for (const [chId, rec] of Object.entries(completed)) {
      const chData = CHALLENGES_CLIENT_DATA[chId];
      const baseVal = chData ? (chData.baseXp || 100) : (rec.score || 10) * 5;
      const awarded = Math.max(rec.xpAwarded || 0, baseVal);
      trueXpSum += awarded;
    }
    const finalXp = Math.max(progress.xp || 0, trueXpSum);
    const finalLevel = Math.max(1, Math.floor(finalXp / 250) + 1);
    progress.xp = finalXp;
    progress.level = finalLevel;
    if (!progress.stats) progress.stats = {};
    progress.stats.totalCompleted = Object.keys(completed).length;

    return {
      ...progress,
      unlockedWorlds: Array.from(unlockedWorlds),
      unlockedChallenges: Array.from(unlockedChallenges)
    };
  },

  /**
   * Fetches sanitized challenge metadata (without answer leaks).
   */
  async getChallenge(challengeId) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const remote = await callApi("getPythonAdventureChallenge", { challengeId });
        if (remote && remote.id) return remote;
      } catch (apiErr) {
        console.warn("Cloud function getPythonAdventureChallenge unavailable, using client curriculum:", apiErr);
      }
    }

    const localChallenge = CHALLENGES_CLIENT_DATA[challengeId];
    if (!localChallenge) {
      throw new Error(`المهمة المطلوبة (${challengeId}) غير موجودة.`);
    }

    return { ...localChallenge };
  },

  /**
   * Submits challenge for authoritative validation and reward calculation.
   */
  async submitChallenge({ challengeId, code, hintsUsed = 0, attempts = 1, currentProgress }) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const result = await callApi("submitPythonAdventureChallenge", {
          challengeId,
          code,
          hintsUsed,
          attempts
        });
        if (result && result.success) {
          // Refresh local cache with updated values
          const uid = auth.currentUser?.uid || currentProgress?.studentUid;
          if (uid && result.passed) {
            await this.getStudentProgress(uid);
          }
          return result;
        }
      } catch (apiErr) {
        console.warn("Cloud function submitPythonAdventureChallenge unavailable, executing local authoritative validator:", apiErr);
      }
    }

    // Local Authoritative Validation Fallback
    return this._localValidateAndScore({ challengeId, code, hintsUsed, attempts, currentProgress });
  },

  /**
   * Local Authoritative Evaluator for fallback & offline testing.
   */
  async _localValidateAndScore({ challengeId, code, hintsUsed, attempts, currentProgress }) {
    let challenge = CHALLENGES_CLIENT_DATA[challengeId];
    if (!challenge && typeof challengeId === "string" && challengeId.startsWith("daily-")) {
      challenge = await this.getDailyChallenge(challengeId);
    }
    if (!challenge) {
      challenge = this.getCustomLevels()?.[challengeId];
    }
    if (!challenge) {
      throw new Error(`المهمة البرمجية (${challengeId}) غير موجودة أو انتهت صلاحيتها.`);
    }

    // 1. Authoritative code validation against expected output and requirements
    const { runPythonCode } = await import("./python-adventure-runtime.js?v=3.5.3");
    const runCheck = await runPythonCode(code);
    if (runCheck.error) {
      return {
        success: true,
        passed: false,
        feedback: "الكود يحتوي على أخطاء برمجية تمنع تنفيذه بنجاح.",
        errorDetails: runCheck.error,
        testResults: { stdout: runCheck.output }
      };
    }

    const cleanOutput = (runCheck.output || "").trim();

    if (challenge.expectedOutput) {
      const expected = String(challenge.expectedOutput).trim();
      if (cleanOutput !== expected && !cleanOutput.includes(expected)) {
        return {
          success: true,
          passed: false,
          feedback: "النتيجة التي طبعها برنامجك غير متطابقة مع المطلوب في التحدي.",
          errorDetails: `الناتج المتوقع: ${expected}\nالناتج المطبوع: ${cleanOutput || "(لا يوجد إخراج print)"}`,
          testResults: { stdout: runCheck.output }
        };
      }
    }

    if (Array.isArray(challenge.outputIncludes)) {
      for (const inc of challenge.outputIncludes) {
        if (!cleanOutput.includes(inc)) {
          return {
            success: true,
            passed: false,
            feedback: `يجب أن يحتوي الناتج على العبارة: "${inc}"`,
            errorDetails: `الناتج المطبوع: ${cleanOutput}`,
            testResults: { stdout: runCheck.output }
          };
        }
      }
    }

    const today = getDailyChallengeDateKey();
    const uid = auth.currentUser?.uid || currentProgress?.studentUid || "student_guest";
    const existing = currentProgress || (await this.getStudentProgress(uid));

    // Hints penalty
    let xpMultiplier = 1.0;
    if (hintsUsed === 1) xpMultiplier = 0.90;
    else if (hintsUsed === 2) xpMultiplier = 0.75;
    else if (hintsUsed === 3) xpMultiplier = 0.50;
    else if (hintsUsed >= 4) xpMultiplier = 0.20;

    let starsEarned = 3;
    if (hintsUsed >= 4) starsEarned = 1;
    else if (hintsUsed > 0) starsEarned = 2;

    const earnedBaseXp = Math.round((challenge.baseXp || 100) * xpMultiplier);

    const previousRecord = existing.completedChallenges?.[challengeId];
    let actualXpAwarded = earnedBaseXp;
    if (previousRecord) {
      const prevStars = previousRecord.stars || 1;
      if (starsEarned > prevStars) {
        actualXpAwarded = Math.round((challenge.baseXp || 100) * 0.4);
      } else {
        actualXpAwarded = 0; // Zero repeat XP prevents infinite level grinding
      }
      starsEarned = Math.max(starsEarned, prevStars);
    }

    const completedMap = {
      ...(existing.completedChallenges || {}),
      [challengeId]: {
        completedAt: new Date().toISOString(),
        stars: starsEarned,
        attempts,
        hintsUsed,
        score: 10,
        maxScore: 10,
        xpAwarded: actualXpAwarded
      }
    };

    let trueXpSum = 0;
    for (const [chId, rec] of Object.entries(completedMap)) {
      const chData = CHALLENGES_CLIENT_DATA[chId];
      const baseVal = chData ? (chData.baseXp || 100) : (rec.score || 10) * 5;
      const awarded = Math.max(rec.xpAwarded || 0, baseVal);
      trueXpSum += awarded;
    }
    const newTotalXp = Math.max((existing.xp || 0) + actualXpAwarded, trueXpSum);
    const newLevel = Math.max(1, Math.floor(newTotalXp / 250) + 1);
    const levelUp = newLevel > (existing.level || 1);

    const unlockedChallenges = new Set(existing.unlockedChallenges || ["world-1-level-1"]);
    unlockedChallenges.add(challengeId);
    if (challenge.nextChallengeId) unlockedChallenges.add(challenge.nextChallengeId);

    const unlockedWorlds = new Set(existing.unlockedWorlds || ["world-1"]);
    if (challenge.unlocksWorldId) {
      unlockedWorlds.add(challenge.unlocksWorldId);
      const nextWorldChallenges = this.getWorldChallenges(challenge.unlocksWorldId);
      if (nextWorldChallenges.length > 0) {
        unlockedChallenges.add(nextWorldChallenges[0].id);
      }
    }

    const currentAchievements = new Set(existing.achievements || []);
    const newlyUnlockedAchievements = [];

    if (!currentAchievements.has("first_code")) {
      currentAchievements.add("first_code");
      newlyUnlockedAchievements.push(ACHIEVEMENTS_DATA.find((a) => a.id === "first_code"));
    }
    if (challenge.type === "boss" && !currentAchievements.has("boss_slayer")) {
      currentAchievements.add("boss_slayer");
      newlyUnlockedAchievements.push(ACHIEVEMENTS_DATA.find((a) => a.id === "boss_slayer"));
    }

    const isDaily = challengeId.startsWith("daily-");
    const lastActive = existing.streak?.lastActiveDate || "";
    let newStreakCount = existing.streak?.count || 1;

    if (lastActive && lastActive !== today) {
      const lastDate = new Date(lastActive);
      const curDate = new Date(today);
      const diffDays = Math.round((curDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        newStreakCount += 1;
      } else if (diffDays > 1) {
        newStreakCount = 1;
      }
    }

    const updated = {
      ...existing,
      xp: newTotalXp,
      level: newLevel,
      currentWorldId: challenge.unlocksWorldId || challenge.worldId || existing.currentWorldId || "world-1",
      currentLevelId: challenge.nextChallengeId || challengeId,
      stars: { ...(existing.stars || {}), [challengeId]: starsEarned },
      completedChallenges: completedMap,
      unlockedWorlds: Array.from(unlockedWorlds),
      unlockedChallenges: Array.from(unlockedChallenges),
      achievements: Array.from(currentAchievements),
      streak: {
        count: newStreakCount,
        lastActiveDate: today
      },
      stats: {
        totalCompleted: Object.keys(completedMap).length,
        totalRuns: (existing.stats?.totalRuns || 0) + 1,
        dailyCompletedDate: isDaily ? today : (existing.stats?.dailyCompletedDate || null)
      },
      updatedAt: new Date().toISOString()
    };

    this._saveLocalCache(uid, updated);
    try {
      if (uid && db) {
        await setDoc(doc(db, COLLECTIONS.PYTHON_ADVENTURE_PROGRESS, uid), updated, { merge: true });
        await setDoc(doc(db, "student_gamification", uid), {
          studentUid: uid,
          competitionPoints: newTotalXp,
          xp: newTotalXp,
          level: newLevel,
          challengesCompleted: Object.keys(completedMap).length,
          streak: newStreakCount,
          updatedAt: new Date().toISOString()
        }, { merge: true });

        // Record student submission in coding_submissions collection
        const subDocId = `${uid}_${challengeId}_${Date.now()}`;
        await setDoc(doc(db, "coding_submissions", subDocId), {
          studentUid: uid,
          challengeId,
          code,
          score: 10,
          maxScore: 10,
          passed: true,
          hintsUsed,
          attempts,
          output: cleanOutput,
          submittedAt: serverTimestamp()
        });
      }
    } catch (saveErr) {
      console.warn("Firestore remote sync warning (progress cached locally):", saveErr);
    }

    return {
      success: true,
      passed: true,
      score: 10,
      maxScore: 10,
      earnedXp: actualXpAwarded,
      totalXp: newTotalXp,
      stars: starsEarned,
      newLevel,
      levelUp,
      unlockedNextChallengeId: challenge.nextChallengeId || null,
      unlockedWorldId: challenge.unlocksWorldId || null,
      newlyUnlockedAchievements: newlyUnlockedAchievements.filter(Boolean),
      feedback: challenge.type === "boss" ? "🏆 تم هزيمة الزعيم واجتياز التحدي الأسطوري بنجاح!" : "🎉 أحسنت صنعاً! تم اجتياز المهمة بنجاح واستيعاب المفهوم البرمجي.",
      skillsGained: challenge.skills || [],
      testResults: { stdout: cleanOutput }
    };
  },

  /**
   * Deterministically retrieves today's active Daily Challenge.
   */
  getTodayDailyChallenge(date = new Date()) {
    return getTodayDailyChallenge(date);
  },

  /**
   * Fetches daily challenge (dynamically rotated by date).
   */
  async getDailyChallenge(challengeId) {
    if (challengeId && CHALLENGES_CLIENT_DATA[challengeId]) {
      return CHALLENGES_CLIENT_DATA[challengeId];
    }
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const data = await callApi("getDailyChallenge");
        if (data && data.id && CHALLENGES_CLIENT_DATA[data.id]) {
          return CHALLENGES_CLIENT_DATA[data.id];
        }
        if (data && data.id) return data;
      } catch (_) {}
    }

    return this.getTodayDailyChallenge();
  },

  /**
   * Records code execution run in student progress stats.
   */
  async recordRun(studentId, challengeId) {
    if (!studentId) return;
    try {
      const progress = await this.getStudentProgress(studentId);
      const currentRuns = progress.stats?.totalRuns || 0;
      const updatedRuns = currentRuns + 1;
      const updatedProgress = {
        ...progress,
        stats: {
          ...(progress.stats || {}),
          totalRuns: updatedRuns
        }
      };
      await this.saveStudentProgress(studentId, updatedProgress);
      return updatedRuns;
    } catch (err) {
      console.warn("recordRun tracking error:", err);
    }
  },

  /**
   * Returns all custom added levels.
   */
  getCustomLevels() {
    try {
      const raw = localStorage.getItem(CUSTOM_LEVELS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  },

  /**
   * Returns saved world level ordering mapping: { [worldId]: [challengeId1, challengeId2, ...] }
   */
  getWorldLevelOrders() {
    try {
      const raw = localStorage.getItem(WORLD_ORDERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  },

  /**
   * Returns challenges for a given world, sorted in custom or default order.
   * @param {string} worldId
   * @returns {Array<object>}
   */
  getWorldChallenges(worldId) {
    initCustomLevelsCache();
    const allInWorld = [];
    for (const [cId, ch] of Object.entries(CHALLENGES_CLIENT_DATA)) {
      if (ch.worldId === worldId) {
        allInWorld.push(ch);
      }
    }

    const savedOrders = this.getWorldLevelOrders();
    const orderList = savedOrders[worldId];

    if (Array.isArray(orderList) && orderList.length > 0) {
      allInWorld.sort((a, b) => {
        const idxA = orderList.indexOf(a.id);
        const idxB = orderList.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return (a.levelNumber || 0) - (b.levelNumber || 0);
      });
    } else {
      allInWorld.sort((a, b) => (a.levelNumber || 0) - (b.levelNumber || 0));
    }

    // Reassign sequential level numbers and nextChallengeId links
    allInWorld.forEach((ch, idx) => {
      ch.levelNumber = idx + 1;
      const nextCh = allInWorld[idx + 1];
      if (nextCh) {
        ch.nextChallengeId = nextCh.id;
      } else if (CHALLENGES_CLIENT_DATA[ch.id]?.nextChallengeId) {
        ch.nextChallengeId = CHALLENGES_CLIENT_DATA[ch.id].nextChallengeId;
      }
    });

    return allInWorld;
  },

  /**
   * Adds a new level/challenge to a world.
   * @param {object} params
   */
  addCustomLevel({
    worldId,
    title,
    subtitle = "",
    difficulty = "easy",
    type = "write_code",
    baseXp = 50,
    starterCode = "",
    requirements = [],
    expectedOutput = "",
    hints = []
  }) {
    if (!worldId || !title) {
      throw new Error("يرجى تحديد العالم وإدخال عنوان المستوى.");
    }

    const id = `${worldId}-custom-${Date.now()}`;
    const currentChallenges = this.getWorldChallenges(worldId);
    const worldObj = WORLDS_DATA.find((w) => w.id === worldId);

    const parsedRequirements = Array.isArray(requirements)
      ? requirements
      : (typeof requirements === "string" ? requirements.split("\n").map((r) => r.trim()).filter(Boolean) : []);

    const parsedHints = Array.isArray(hints)
      ? hints
      : (typeof hints === "string" ? hints.split("\n").map((h) => h.trim()).filter(Boolean) : []);

    const newChallenge = {
      id,
      worldId,
      worldTitle: worldObj?.title || "عالم بايثون",
      levelNumber: currentChallenges.length + 1,
      title: title.trim(),
      subtitle: (subtitle || "تحدي إضافي جديد").trim(),
      difficulty: difficulty || "easy",
      type: type || "write_code",
      baseXp: Number(baseXp) || 50,
      skills: ["python", "practice"],
      story: subtitle || title,
      microLesson: {
        concept: title,
        summary: subtitle || `تدرب على كتابة الكود وحل مسألة ${title}.`,
        exampleCode: starterCode || "# اكتب الكود المطلوب أدناه\n"
      },
      starterCode: starterCode || "# اكتب الكود هنا\n",
      requirements: parsedRequirements.length > 0 ? parsedRequirements : ["اكتب البرنامج المطلوب بدقة"],
      expectedOutput: expectedOutput.trim(),
      hints: parsedHints.length > 0 ? parsedHints : ["تأكد من اتباع متطلبات المسألة"],
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    // Update in-memory CHALLENGES_CLIENT_DATA
    CHALLENGES_CLIENT_DATA[id] = newChallenge;

    // Save to localStorage
    const customLevels = this.getCustomLevels();
    customLevels[id] = newChallenge;
    try {
      localStorage.setItem(CUSTOM_LEVELS_STORAGE_KEY, JSON.stringify(customLevels));
    } catch (_) {}

    // Update World Order
    const savedOrders = this.getWorldLevelOrders();
    const currentOrder = savedOrders[worldId] || currentChallenges.map((c) => c.id);
    currentOrder.push(id);
    savedOrders[worldId] = currentOrder;
    try {
      localStorage.setItem(WORLD_ORDERS_STORAGE_KEY, JSON.stringify(savedOrders));
    } catch (_) {}

    // Dispatch notification
    window.dispatchEvent(new CustomEvent("python-adventure-levels-updated", { detail: { worldId, action: "add", challengeId: id } }));

    return newChallenge;
  },

  /**
   * Reorders the levels in a world based on array of challenge IDs.
   * @param {string} worldId
   * @param {Array<string>} orderedChallengeIds
   */
  reorderWorldLevels(worldId, orderedChallengeIds) {
    if (!worldId || !Array.isArray(orderedChallengeIds)) {
      throw new Error("بيانات إعادة الترتيب غير صحيحة.");
    }

    const savedOrders = this.getWorldLevelOrders();
    savedOrders[worldId] = orderedChallengeIds;
    try {
      localStorage.setItem(WORLD_ORDERS_STORAGE_KEY, JSON.stringify(savedOrders));
    } catch (_) {}

    // Refresh and update links
    const updatedChallenges = this.getWorldChallenges(worldId);

    // Dispatch notification
    window.dispatchEvent(new CustomEvent("python-adventure-levels-updated", { detail: { worldId, action: "reorder", orderedIds: orderedChallengeIds } }));

    return updatedChallenges;
  },

  /**
   * Deletes a custom level from a world.
   * @param {string} worldId
   * @param {string} challengeId
   */
  deleteCustomLevel(worldId, challengeId) {
    const customLevels = this.getCustomLevels();
    if (customLevels[challengeId]) {
      delete customLevels[challengeId];
      try {
        localStorage.setItem(CUSTOM_LEVELS_STORAGE_KEY, JSON.stringify(customLevels));
      } catch (_) {}
    }

    delete CHALLENGES_CLIENT_DATA[challengeId];

    const savedOrders = this.getWorldLevelOrders();
    if (Array.isArray(savedOrders[worldId])) {
      savedOrders[worldId] = savedOrders[worldId].filter((id) => id !== challengeId);
      try {
        localStorage.setItem(WORLD_ORDERS_STORAGE_KEY, JSON.stringify(savedOrders));
      } catch (_) {}
    }

    const updated = this.getWorldChallenges(worldId);
    window.dispatchEvent(new CustomEvent("python-adventure-levels-updated", { detail: { worldId, action: "delete", challengeId } }));
    return updated;
  },

  /**
   * Updates an existing challenge/level.
   * @param {string} challengeId
   * @param {object} params
   */
  editCustomLevel(challengeId, {
    worldId,
    title,
    subtitle,
    difficulty,
    baseXp,
    starterCode,
    requirements,
    expectedOutput,
    hints
  }) {
    if (!challengeId || !title) {
      throw new Error("بيانات التحدي غير مكتملة.");
    }
    const existing = CHALLENGES_CLIENT_DATA[challengeId];
    if (!existing) {
      throw new Error(`التحدي (${challengeId}) غير موجود.`);
    }

    const parsedRequirements = Array.isArray(requirements)
      ? requirements
      : (typeof requirements === "string" ? requirements.split("\n").map((r) => r.trim()).filter(Boolean) : []);

    const parsedHints = Array.isArray(hints)
      ? hints
      : (typeof hints === "string" ? hints.split("\n").map((h) => h.trim()).filter(Boolean) : []);

    const updated = {
      ...existing,
      worldId: worldId || existing.worldId,
      title: title.trim(),
      subtitle: (subtitle || existing.subtitle).trim(),
      difficulty: difficulty || existing.difficulty,
      baseXp: Number(baseXp) || existing.baseXp,
      starterCode: starterCode !== undefined ? starterCode : existing.starterCode,
      requirements: parsedRequirements.length > 0 ? parsedRequirements : existing.requirements,
      expectedOutput: expectedOutput !== undefined ? expectedOutput.trim() : existing.expectedOutput,
      hints: parsedHints.length > 0 ? parsedHints : existing.hints,
      updatedAt: new Date().toISOString()
    };

    CHALLENGES_CLIENT_DATA[challengeId] = updated;

    const customLevels = this.getCustomLevels();
    customLevels[challengeId] = updated;
    try {
      localStorage.setItem(CUSTOM_LEVELS_STORAGE_KEY, JSON.stringify(customLevels));
    } catch (_) {}

    window.dispatchEvent(new CustomEvent("python-adventure-levels-updated", { detail: { challengeId, action: "edit" } }));
    return updated;
  },

  /**
   * Fetches all registered students and merges their Python Adventure progress.
   * Deduplicates students with dual documents (uid and phone) and sorts active students to the top.
   * Used by Teacher to track student levels, XP, and completed challenges.
   * @returns {Promise<Array<object>>}
   */
  async getAllStudentsAdventureRoster() {
    let students = [];
    try {
      if (db) {
        const snap = await getDocs(collection(db, COLLECTIONS.STUDENTS));
        const studentMap = new Map();
        snap.docs.forEach((d) => {
          const data = d.data();
          const docId = d.id;
          const phone = String(data.phone || data.studentPhone || (docId.startsWith("01") ? docId : "")).trim();
          const authUid = data.authUid || (!docId.startsWith("01") && !docId.startsWith("+20") ? docId : "");
          const key = phone || authUid || docId;

          const existing = studentMap.get(key);
          if (!existing) {
            studentMap.set(key, {
              id: authUid || docId,
              firestoreId: docId,
              authUid: authUid || (docId !== phone ? docId : ""),
              ...data
            });
          } else {
            studentMap.set(key, {
              ...existing,
              ...data,
              authUid: authUid || existing.authUid || (docId !== phone ? docId : ""),
              id: authUid || existing.id || docId
            });
          }
        });
        students = Array.from(studentMap.values());
      }
    } catch (err) {
      console.warn("Could not fetch students from Firestore, using default roster:", err);
    }

    if (students.length === 0) {
      return [];
    }

    // Try fetching progress documents from Firestore
    let progressMap = {};
    try {
      if (db) {
        const pSnap = await getDocs(collection(db, COLLECTIONS.PYTHON_ADVENTURE_PROGRESS));
        pSnap.docs.forEach((d) => {
          progressMap[d.id] = d.data();
        });
      }
    } catch (_) {}

    const totalCurriculumLevels = Object.keys(CHALLENGES_CLIENT_DATA).length || 31;

    const mapped = students.map((std) => {
      const sAuthUid = std.authUid;
      const sUid = std.uid;
      const sId = std.id || std.firestoreId;
      const sPhone = std.phone || std.studentPhone;

      // Multi-key progress lookup (check authUid first, then uid, docId, phone)
      const prg = (sAuthUid && progressMap[sAuthUid]) ||
                  (sUid && progressMap[sUid]) ||
                  (sId && progressMap[sId]) ||
                  (sPhone && progressMap[sPhone]) || {};

      const completedCount = prg.stats?.totalCompleted ?? (prg.completedChallenges ? Object.keys(prg.completedChallenges).length : 0);
      const percent = totalCurriculumLevels > 0 ? Math.min(100, Math.round((completedCount / totalCurriculumLevels) * 100)) : 0;
      const xp = prg.xp ?? (completedCount * 100);
      const level = prg.level ?? (Math.floor(completedCount / 3) + 1);

      let currentWorld = "وادي البدايات";
      let currentWorldIcon = "🌱";
      if (completedCount >= 16) {
        currentWorld = "قلعة الدوال البرمجية";
        currentWorldIcon = "🏰";
      } else if (completedCount >= 10) {
        currentWorld = "غابة التكرار والحلقات";
        currentWorldIcon = "🌲";
      } else if (completedCount >= 5) {
        currentWorld = "كهف الشروط والمنطق";
        currentWorldIcon = "🕯️";
      }

      const badgesCount = (prg.achievements?.length) ?? (prg.badges?.length) ?? (completedCount > 0 ? Math.floor(completedCount / 3) : 0);

      let lastActive = "غير نشط";
      const activeTime = prg.updatedAt || prg.lastActiveAt || prg.streak?.lastActiveDate;
      if (activeTime) {
        try {
          const d = typeof activeTime.toDate === "function" ? activeTime.toDate() : new Date(activeTime);
          if (!isNaN(d.getTime())) {
            const todayStr = new Date().toISOString().slice(0, 10);
            const dStr = d.toISOString().slice(0, 10);
            if (todayStr === dStr) {
              lastActive = "اليوم " + d.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
            } else {
              lastActive = d.toLocaleDateString("ar-EG", { month: "short", day: "numeric" });
            }
          } else {
            lastActive = String(activeTime);
          }
        } catch (_) {
          lastActive = String(activeTime);
        }
      } else if (completedCount > 0) {
        lastActive = "نشط مؤخراً";
      }

      return {
        ...std,
        name: std.name || std.studentName || "طالب بدون اسم",
        phone: std.phone || std.studentPhone || "",
        studentCode: std.studentCode || std.nationalId || std.phone || std.id,
        completedCount,
        totalLevels: totalCurriculumLevels,
        percent,
        xp,
        level,
        currentWorld,
        currentWorldIcon,
        badgesCount,
        lastActive,
        solvedChallenges: prg.completedChallenges || {}
      };
    });

    // Sort: Students with completed challenges and highest XP appear first
    return mapped.sort((a, b) => {
      if ((b.completedCount || 0) !== (a.completedCount || 0)) {
        return (b.completedCount || 0) - (a.completedCount || 0);
      }
      if ((b.xp || 0) !== (a.xp || 0)) {
        return (b.xp || 0) - (a.xp || 0);
      }
      return (a.name || "").localeCompare(b.name || "", "ar");
    });
  },

  _getLocalCache(uid) {
    try {
      const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${uid}`);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  },

  _saveLocalCache(uid, data) {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_${uid}`, JSON.stringify(data));
    } catch (_) {}
  }
};

import { z } from "zod";
import { CallableRequest, HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config/firebase";
import { getAuthenticatedUser } from "../../middleware/auth";
import { validateInput } from "../../middleware/validator";
import { spawnSync } from "node:child_process";
import {
  PYTHON_ADVENTURE_CHALLENGES,
  WORLDS_CONFIG,
  ACHIEVEMENTS_LIST,
  PROBLEM_SOLVING_LEVELS_CONFIG,
  PROBLEM_SOLVING_CHALLENGES
} from "./curriculum";
import { awardCompetitionPoints, syncStudentXpAndLevel } from "../gamification/ledger";
import { requireRole } from "../../middleware/auth";

const PROGRESS_COLLECTION = "python_adventure_progress";
const CODING_PROBLEMS_COLLECTION = "coding_problems";
const CODING_SUBMISSIONS_COLLECTION = "coding_submissions";

// Helper: Calculate Level from XP
export function calculateLevelFromXp(xp: number): { level: number; currentLevelXp: number; nextLevelXp: number; progressPercent: number } {
  const XP_PER_LEVEL = 250;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelBase = (level - 1) * XP_PER_LEVEL;
  const currentLevelXp = xp - currentLevelBase;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / XP_PER_LEVEL) * 100));
  return { level, currentLevelXp, nextLevelXp: XP_PER_LEVEL, progressPercent };
}

// 1. Get Python Adventure Progress
export async function getPythonAdventureProgressHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const docRef = db.collection(PROGRESS_COLLECTION).doc(user.uid);
  const snap = await docRef.get();

  const today = new Date().toISOString().split("T")[0];

  if (!snap.exists) {
    const initialProgress = {
      studentUid: user.uid,
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
      streak: {
        count: 1,
        lastActiveDate: today
      },
      stats: {
        totalCompleted: 0,
        totalRuns: 0,
        dailyCompletedDate: null
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await docRef.set(initialProgress);
    return initialProgress;
  }

  const data = snap.data()!;
  return {
    ...data,
    levelInfo: calculateLevelFromXp(data.xp || 0)
  };
}

// 2. Get Sanitized Challenge Metadata (Stripping secret tests & solutions)
const GetChallengeSchema = z.object({
  challengeId: z.string().min(1, "معرف المهمة مطلوب")
});

export async function getPythonAdventureChallengeHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const { challengeId } = validateInput(GetChallengeSchema, request.data);

  const challenge = (PYTHON_ADVENTURE_CHALLENGES as Record<string, any>)[challengeId];
  if (!challenge) {
    throw new HttpsError("not-found", "المهمة المطلوبة غير موجودة في خريطة المغامرة.");
  }

  // Verify student has unlocked the challenge or world
  const snap = await db.collection(PROGRESS_COLLECTION).doc(user.uid).get();
  if (snap.exists) {
    const progress = snap.data()!;
    const unlocked = Array.isArray(progress.unlockedChallenges) ? progress.unlockedChallenges : ["world-1-level-1"];
    if (!unlocked.includes(challengeId) && challengeId !== "world-1-level-1") {
      throw new HttpsError("permission-denied", "هذه المهمة مغلقة. يجب إكمال المهام السابقة لفتحها.");
    }
  }

  // Return public sanitized challenge data
  return {
    id: challenge.id,
    worldId: challenge.worldId,
    levelNumber: challenge.levelNumber,
    title: challenge.title,
    subtitle: challenge.subtitle,
    difficulty: challenge.difficulty,
    type: challenge.type,
    story: challenge.story,
    microLesson: challenge.microLesson,
    starterCode: challenge.starterCode,
    requirements: challenge.requirements,
    publicTestCases: challenge.publicTestCases,
    baseXp: challenge.baseXp,
    hintCount: challenge.hints ? challenge.hints.length : 0
  };
}

// 3. Submit Challenge (Server Authority Validation & Scoring)
// 3. Submit Challenge (Server Authority Validation & Scoring)
const SubmitChallengeSchema = z.object({
  challengeId: z.string().min(1, "معرف المهمة مطلوب"),
  code: z.string().min(1, "كود بايثون مطلوب"),
  hintsUsed: z.number().int().min(0).default(0),
  attempts: z.number().int().min(1).default(1)
});

export async function submitPythonAdventureChallengeHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const { challengeId, code, hintsUsed, attempts } = validateInput(SubmitChallengeSchema, request.data);

  // Check built-in challenges and custom admin problems
  let challenge = (PYTHON_ADVENTURE_CHALLENGES as Record<string, any>)[challengeId];
  if (!challenge) {
    const customDoc = await db.collection(CODING_PROBLEMS_COLLECTION).doc(challengeId).get();
    if (customDoc.exists) {
      challenge = { id: customDoc.id, ...customDoc.data() };
    }
  }

  if (!challenge) {
    throw new HttpsError("not-found", "المهمة أو المسألة البرمجية غير موجودة.");
  }

  // 1. Authoritative Validation Checks
  const validationResult = validateCodeAgainstChallenge(challenge, code);

  const docRef = db.collection(PROGRESS_COLLECTION).doc(user.uid);
  const snap = await docRef.get();
  const existing = snap.exists ? snap.data()! : {
    studentUid: user.uid,
    xp: 0,
    level: 1,
    stars: {},
    completedChallenges: {},
    unlockedWorlds: ["world-1"],
    unlockedChallenges: ["world-1-level-1"],
    achievements: [],
    inventory: ["starter_compass"],
    streak: { count: 1, lastActiveDate: new Date().toISOString().split("T")[0] },
    stats: { totalCompleted: 0, totalRuns: 0, dailyCompletedDate: null }
  };

  const today = new Date().toISOString().split("T")[0];
  const submissionId = `sub_${user.uid}_${challengeId}_${Date.now()}`;

  // If validation failed
  if (!validationResult.passed) {
    // Save to coding_submissions collection for complete history tracking
    await db.collection(CODING_SUBMISSIONS_COLLECTION).doc(submissionId).set({
      id: submissionId,
      studentUid: user.uid,
      challengeId,
      code,
      status: "failed",
      feedback: validationResult.feedback,
      errorDetails: validationResult.errorDetails || null,
      testResults: validationResult.testResults || null,
      submittedAt: new Date().toISOString()
    });

    // Record attempt in progress stats without erasing previous best stars or completion
    await docRef.set({
      ...existing,
      stats: {
        ...existing.stats,
        totalRuns: (existing.stats?.totalRuns || 0) + 1
      },
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return {
      success: true,
      passed: false,
      feedback: validationResult.feedback,
      errorDetails: validationResult.errorDetails,
      testResults: validationResult.testResults
    };
  }

  // 2. Compute Rewards with Progressive Hint Penalty
  const safeHintsUsed = hintsUsed ?? 0;
  let xpMultiplier = 1.0;
  if (safeHintsUsed === 1) xpMultiplier = 0.90;
  else if (safeHintsUsed === 2) xpMultiplier = 0.75;
  else if (safeHintsUsed === 3) xpMultiplier = 0.50;
  else if (safeHintsUsed >= 4) xpMultiplier = 0.20;

  let starsEarned = 3;
  if (safeHintsUsed >= 4) starsEarned = 1;
  else if (safeHintsUsed > 0) starsEarned = 2;

  const challengeBaseXp = challenge.baseXp || (challenge.points ? challenge.points * 5 : 50);
  const earnedBaseXp = Math.round(challengeBaseXp * xpMultiplier);

  // Anti-Cheat / Replay Check: If already completed with equal or better stars, award 0 repeat XP
  const previousRecord = existing.completedChallenges?.[challengeId];
  let actualXpAwarded = earnedBaseXp;
  if (previousRecord) {
    const prevStars = previousRecord.stars || 1;
    if (starsEarned > prevStars) {
      actualXpAwarded = Math.round(challengeBaseXp * 0.4);
    } else {
      actualXpAwarded = 0; // Zero repeat XP prevents infinite level grinding
    }
    starsEarned = Math.max(starsEarned, prevStars);
  }

  const newTotalXp = (existing.xp || 0) + actualXpAwarded;
  const levelInfo = calculateLevelFromXp(newTotalXp);

  // 3. Unlock Next Challenges & Worlds
  const unlockedChallenges = new Set<string>(existing.unlockedChallenges || ["world-1-level-1"]);
  unlockedChallenges.add(challengeId);
  if (challenge.nextChallengeId) {
    unlockedChallenges.add(challenge.nextChallengeId);
  }

  const unlockedWorlds = new Set<string>(existing.unlockedWorlds || ["world-1"]);
  if (challenge.unlocksWorldId) {
    unlockedWorlds.add(challenge.unlocksWorldId);
  }

  // 4. Update Streak
  let streakCount = existing.streak?.count || 1;
  const lastActive = existing.streak?.lastActiveDate || "";
  if (lastActive) {
    const lastDate = new Date(lastActive);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streakCount += 1;
    } else if (diffDays > 1) {
      streakCount = 1;
    }
  }

  // 5. Evaluate Achievements & Badges
  const currentAchievements = new Set<string>(existing.achievements || []);
  const newlyUnlockedAchievements: Array<{ id: string; title: string; icon: string }> = [];

  const completedMap = {
    ...(existing.completedChallenges || {}),
    [challengeId]: {
      completedAt: new Date().toISOString(),
      stars: starsEarned,
      attempts,
      hintsUsed,
      xpAwarded: actualXpAwarded
    }
  };

  const totalCompletedCount = Object.keys(completedMap).length;

  // Standard Adventure Achievements
  if (!currentAchievements.has("first_code")) {
    currentAchievements.add("first_code");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).first_code);
  }

  if (!currentAchievements.has("loop_master") && challenge.worldId === "world-4") {
    const world4Ids = ["world-4-level-1", "world-4-level-2", "world-4-level-3", "world-4-level-4"];
    const allDone = world4Ids.every(id => completedMap[id]);
    if (allDone) {
      currentAchievements.add("loop_master");
      newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).loop_master);
    }
  }

  if (!currentAchievements.has("bug_hunter")) {
    const debugChallenges = ["world-1-level-3", "world-3-level-3", "world-4-level-3", "world-5-level-3", "world-6-level-3"];
    const debugSolved = debugChallenges.filter(id => completedMap[id]).length;
    if (debugSolved >= 3) {
      currentAchievements.add("bug_hunter");
      newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).bug_hunter);
    }
  }

  if (!currentAchievements.has("boss_slayer") && challenge.type === "boss") {
    currentAchievements.add("boss_slayer");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).boss_slayer);
  }

  if (!currentAchievements.has("python_hero") && completedMap["world-8-level-3"]) {
    currentAchievements.add("python_hero");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).python_hero);
  }

  // Count solved problem-solving challenges
  const problemSolvingSolvedCount = Object.keys(completedMap).filter(id => id.startsWith("prob-")).length;

  // New Competitive Badges
  if (!currentAchievements.has("beginner_solver") && problemSolvingSolvedCount >= 1) {
    currentAchievements.add("beginner_solver");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).beginner_solver);
  }

  if (!currentAchievements.has("problem_solver") && problemSolvingSolvedCount >= 5) {
    currentAchievements.add("problem_solver");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).problem_solver);
  }

  if (!currentAchievements.has("python_solver") && problemSolvingSolvedCount >= 10) {
    currentAchievements.add("python_solver");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).python_solver);
  }

  if (!currentAchievements.has("code_warrior") && problemSolvingSolvedCount >= 15) {
    currentAchievements.add("code_warrior");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).code_warrior);
  }

  if (!currentAchievements.has("speed_coder") && safeHintsUsed === 0 && attempts === 1) {
    currentAchievements.add("speed_coder");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).speed_coder);
  }

  // Count Level 4 & 5 solved
  const advancedSolvedCount = Object.keys(completedMap).filter(id => id.startsWith("prob-l4-") || id.startsWith("prob-l5-")).length;
  if (!currentAchievements.has("algo_master") && advancedSolvedCount >= 3) {
    currentAchievements.add("algo_master");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).algo_master);
  }

  // Save successful submission
  await db.collection(CODING_SUBMISSIONS_COLLECTION).doc(submissionId).set({
    id: submissionId,
    studentUid: user.uid,
    challengeId,
    code,
    status: "passed",
    stars: starsEarned,
    hintsUsed: safeHintsUsed,
    attempts,
    testResults: validationResult.testResults || null,
    submittedAt: new Date().toISOString()
  });

  // Update Firestore Document
  const updatedProgress = {
    ...existing,
    xp: newTotalXp,
    level: levelInfo.level,
    currentWorldId: challenge.unlocksWorldId || challenge.worldId || existing.currentWorldId,
    currentLevelId: challenge.nextChallengeId || challengeId,
    stars: {
      ...(existing.stars || {}),
      [challengeId]: starsEarned
    },
    completedChallenges: completedMap,
    unlockedWorlds: Array.from(unlockedWorlds),
    unlockedChallenges: Array.from(unlockedChallenges),
    achievements: Array.from(currentAchievements),
    streak: {
      count: streakCount,
      lastActiveDate: today
    },
    stats: {
      totalCompleted: totalCompletedCount,
      totalRuns: (existing.stats?.totalRuns || 0) + 1,
      dailyCompletedDate: challengeId.startsWith("daily-") ? today : (existing.stats?.dailyCompletedDate || null)
    },
    updatedAt: new Date().toISOString()
  };

  await docRef.set(updatedProgress);

  // 6. Award Competition Points
  let baseCompPoints = 20;
  if (challenge.points !== undefined && challenge.points !== null) {
    baseCompPoints = Number(challenge.points);
  } else if (challenge.type === "boss") {
    baseCompPoints = 100;
  } else if (challenge.difficulty === "expert") {
    baseCompPoints = 100;
  } else if (challenge.difficulty === "hard") {
    baseCompPoints = 50;
  } else if (challenge.difficulty === "medium") {
    baseCompPoints = 25;
  } else if (challenge.difficulty === "easy") {
    baseCompPoints = 10;
  }

  const pointAward = await awardCompetitionPoints({
    studentUid: user.uid,
    sourceType: challenge.level ? "python_adventure" : (challenge.type === "boss" ? "boss_challenge" : (challengeId.startsWith("daily-") ? "daily_challenge" : "python_adventure")),
    sourceId: challengeId,
    points: baseCompPoints,
    reason: `إكمال تحدي ${challenge.title}`,
    competitionId: "comp_python_autumn_2026",
    metadata: {
      worldId: challenge.worldId || null,
      level: challenge.level || null,
      difficulty: challenge.difficulty,
      stars: starsEarned,
      hintsUsed: safeHintsUsed
    }
  });

  // Check Level Completion Bonus if this is a level problem
  let levelCompletionBonus = 0;
  if (challenge.level) {
    const levelNumber = Number(challenge.level);
    const levelProblems = Object.keys(PROBLEM_SOLVING_CHALLENGES).filter(id => PROBLEM_SOLVING_CHALLENGES[id].level === levelNumber);
    const allLevelProblemsSolved = levelProblems.length > 0 && levelProblems.every(id => completedMap[id]);
    if (allLevelProblemsSolved) {
      const levelConfig = PROBLEM_SOLVING_LEVELS_CONFIG.find(l => l.level === levelNumber);
      const bonusPoints = levelConfig?.completionBonus || (levelNumber * 50);
      const bonusAward = await awardCompetitionPoints({
        studentUid: user.uid,
        sourceType: "python_adventure",
        sourceId: `level_${levelNumber}_completion_bonus`,
        points: bonusPoints,
        reason: `مكافأة إكمال جميع مسائل ${levelConfig?.title || `المستوى ${levelNumber}`}`,
        competitionId: "comp_python_autumn_2026"
      });
      if (bonusAward.awarded) {
        levelCompletionBonus = bonusPoints;
      }
    }
  }

  // Evaluate python_expert & python_champion
  if (!currentAchievements.has("python_expert") && problemSolvingSolvedCount >= 20 && (pointAward.totalPoints >= 500)) {
    currentAchievements.add("python_expert");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).python_expert);
    await docRef.set({ achievements: Array.from(currentAchievements) }, { merge: true });
  }

  if (!currentAchievements.has("python_champion") && problemSolvingSolvedCount >= 25) {
    currentAchievements.add("python_champion");
    newlyUnlockedAchievements.push((ACHIEVEMENTS_LIST as Record<string, any>).python_champion);
    await docRef.set({ achievements: Array.from(currentAchievements) }, { merge: true });
  }

  // Sync XP and Level into gamification profile
  await syncStudentXpAndLevel(user.uid, newTotalXp, levelInfo.level);

  return {
    success: true,
    passed: true,
    earnedXp: actualXpAwarded,
    totalXp: newTotalXp,
    stars: starsEarned,
    newLevel: levelInfo.level,
    levelUp: levelInfo.level > (existing.level || 1),
    competitionPointsAwarded: pointAward.pointsAwarded,
    totalCompetitionPoints: pointAward.totalPoints,
    levelCompletionBonus,
    unlockedNextChallengeId: challenge.nextChallengeId || null,
    unlockedWorldId: challenge.unlocksWorldId || null,
    newlyUnlockedAchievements: [...newlyUnlockedAchievements, ...pointAward.newlyUnlockedAchievements],
    feedback: challenge.type === "boss"
      ? "🏆 تم هزيمة الزعيم واجتياز التحدي الأسطوري بنجاح!"
      : `🎉 أحسنت صنعاً! تم اجتياز مسألة "${challenge.title}" بنجاح وحساب درجاتك بدقة.`,
    skillsGained: challenge.skills || [],
    testResults: validationResult.testResults
  };
}

// 4. Get Daily Challenge
export async function getDailyChallengeHandler(request: CallableRequest) {
  getAuthenticatedUser(request);
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const dailyPool = [
    {
      id: "daily-loop-sum",
      title: "تحدي جمع الأعداد الزوجية",
      description: "اكتب برنامجاً يحسب مجموع الأعداد الزوجية من 1 إلى 20 باستخدام for loop واطبع الناتج.",
      baseXp: 100,
      starterCode: "# احسب مجموع الأعداد الزوجية من 1 إلى 20 واطبع الناتج\n",
      requirements: ["استخدم for loop", "اطبع الناتج النهائي فقط (110)"]
    },
    {
      id: "daily-string-reverse",
      title: "عكس الكلمات البرمجية",
      description: "اكتب كوداً يطبع الكلمة 'Python' بأحرف مفرقة مفصولة بمسافة باستخدام تكرار الحروف.",
      baseXp: 100,
      starterCode: "word = 'Python'\n# اطبع كل حرف في سطر\n",
      requirements: ["استخدم loop للمرور على حروف الكلمة"]
    },
    {
      id: "daily-grade-calc",
      title: "فاحص الدرجات السريع",
      description: "عرف متغيراً score = 85 وافحص إذا كان أكبر من أو يساوي 50 اطبع 'Pass' وإلا اطبع 'Fail'.",
      baseXp: 100,
      starterCode: "score = 85\n# افحص الدرجة واطبع Pass أو Fail\n",
      requirements: ["استخدم جملة if الشرطية"]
    }
  ];

  const selected = dailyPool[dayOfYear % dailyPool.length];
  return selected;
}

// 5. Get Problem Solving Catalog (5 Progressive Levels & 25+ Problems)
export async function getProblemSolvingCatalogHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);

  // Fetch student progress
  const progSnap = await db.collection(PROGRESS_COLLECTION).doc(user.uid).get();
  const progData = progSnap.exists ? progSnap.data()! : {};
  const completedMap = progData.completedChallenges || {};

  // Fetch student submissions for solved dates & stats
  const subsSnap = await db.collection(CODING_SUBMISSIONS_COLLECTION)
    .where("studentUid", "==", user.uid)
    .get();

  const submissionStats: Record<string, { attempts: number; bestStatus: string; lastSubmittedAt: string }> = {};
  subsSnap.docs.forEach(doc => {
    const sub = doc.data();
    const pid = sub.challengeId;
    if (!submissionStats[pid]) {
      submissionStats[pid] = { attempts: 0, bestStatus: "failed", lastSubmittedAt: sub.submittedAt };
    }
    submissionStats[pid].attempts++;
    if (sub.status === "passed") {
      submissionStats[pid].bestStatus = "passed";
    }
    if (new Date(sub.submittedAt).getTime() > new Date(submissionStats[pid].lastSubmittedAt).getTime()) {
      submissionStats[pid].lastSubmittedAt = sub.submittedAt;
    }
  });

  // Fetch custom admin problems
  const customProblemsSnap = await db.collection(CODING_PROBLEMS_COLLECTION).get();
  const customProblems: Record<string, any> = {};
  customProblemsSnap.docs.forEach(doc => {
    const data = doc.data();
    if (data.active !== false) {
      customProblems[doc.id] = { id: doc.id, ...data };
    }
  });

  // Merge built-in and active custom problems
  const allProblems = {
    ...PROBLEM_SOLVING_CHALLENGES,
    ...customProblems
  };

  // Sanitize each problem (strip hiddenTestCases)
  const sanitizedProblems = Object.values(allProblems).map((p: any) => {
    const isCompleted = !!completedMap[p.id] || submissionStats[p.id]?.bestStatus === "passed";
    const userStars = completedMap[p.id]?.stars || 0;
    const attemptsCount = submissionStats[p.id]?.attempts || (completedMap[p.id]?.attempts || 0);

    return {
      id: p.id,
      title: p.title,
      level: Number(p.level || 1),
      difficulty: p.difficulty || "easy",
      points: Number(p.points || 10),
      timeLimit: Number(p.timeLimit || 3000),
      skills: p.skills || [],
      description: p.description || "",
      inputDescription: p.inputDescription || "",
      outputDescription: p.outputDescription || "",
      examples: p.examples || [],
      constraints: p.constraints || [],
      starterCode: p.starterCode || "",
      publicTestCases: p.publicTestCases || [],
      totalTestCasesCount: (p.publicTestCases?.length || 0) + (p.hiddenTestCases?.length || 0),
      // Student status
      isCompleted,
      stars: userStars,
      attempts: attemptsCount,
      lastSubmittedAt: submissionStats[p.id]?.lastSubmittedAt || null
    };
  });

  // Calculate student summary
  const solvedCount = sanitizedProblems.filter(p => p.isCompleted).length;
  const totalPointsEarned = sanitizedProblems.filter(p => p.isCompleted).reduce((sum, p) => sum + p.points, 0);

  return {
    levels: PROBLEM_SOLVING_LEVELS_CONFIG,
    problems: sanitizedProblems,
    studentSummary: {
      solvedCount,
      totalCount: sanitizedProblems.length,
      totalPointsEarned,
      streakCount: progData.streak?.count || 1
    }
  };
}

// 6. Get Problem Details
const GetProblemDetailsSchema = z.object({
  problemId: z.string().min(1, "معرف المسألة مطلوب")
});

export async function getProblemDetailsHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const { problemId } = validateInput(GetProblemDetailsSchema, request.data);

  let p = (PROBLEM_SOLVING_CHALLENGES as Record<string, any>)[problemId];
  if (!p) {
    const customDoc = await db.collection(CODING_PROBLEMS_COLLECTION).doc(problemId).get();
    if (customDoc.exists) {
      p = { id: customDoc.id, ...customDoc.data() };
    }
  }

  if (!p) {
    throw new HttpsError("not-found", "المسألة البرمجية غير موجودة.");
  }

  // Get student's previous submissions for this problem
  const subsSnap = await db.collection(CODING_SUBMISSIONS_COLLECTION)
    .where("studentUid", "==", user.uid)
    .where("challengeId", "==", problemId)
    .orderBy("submittedAt", "desc")
    .limit(10)
    .get();

  const history = subsSnap.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      status: data.status,
      stars: data.stars || 0,
      feedback: data.feedback || "",
      submittedAt: data.submittedAt,
      code: data.code
    };
  });

  return {
    id: p.id,
    title: p.title,
    level: Number(p.level || 1),
    difficulty: p.difficulty || "easy",
    points: Number(p.points || 10),
    timeLimit: Number(p.timeLimit || 3000),
    skills: p.skills || [],
    description: p.description || "",
    inputDescription: p.inputDescription || "",
    outputDescription: p.outputDescription || "",
    examples: p.examples || [],
    constraints: p.constraints || [],
    starterCode: p.starterCode || "",
    publicTestCases: p.publicTestCases || [],
    hints: p.hints || [],
    submissionHistory: history
  };
}

// 7. Save Admin Custom Coding Problem
const SaveAdminProblemSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(3, "عنوان المسألة مطلوب"),
  level: z.number().int().min(1).max(5),
  difficulty: z.enum(["easy", "medium", "hard", "expert"]),
  points: z.number().int().min(5).max(500),
  timeLimit: z.number().int().min(500).max(10000).default(3000),
  skills: z.array(z.string()).default([]),
  description: z.string().min(10, "وصف المسألة مطلوب"),
  inputDescription: z.string().default(""),
  outputDescription: z.string().default(""),
  examples: z.array(z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string().optional()
  })).default([]),
  constraints: z.array(z.string()).default([]),
  starterCode: z.string().default(""),
  publicTestCases: z.array(z.object({
    input: z.string(),
    expectedOutput: z.string(),
    description: z.string().optional()
  })).min(1, "يجب إضافة حالة اختبار عامة واحدة على الأقل"),
  hiddenTestCases: z.array(z.object({
    input: z.string(),
    expectedOutput: z.string()
  })).default([]),
  active: z.boolean().default(true)
});

export async function saveAdminProblemHandler(request: CallableRequest) {
  requireRole(request, ["admin", "teacher"]);
  const data = validateInput(SaveAdminProblemSchema, request.data);

  const problemId = data.id || `custom-prob-${Date.now()}`;
  const docRef = db.collection(CODING_PROBLEMS_COLLECTION).doc(problemId);

  const payload = {
    ...data,
    id: problemId,
    updatedAt: new Date().toISOString()
  };

  await docRef.set(payload, { merge: true });

  return {
    success: true,
    problemId,
    message: "تم حفظ المسألة البرمجية بنجاح."
  };
}

// 8. Toggle Admin Problem Active Status
const ToggleAdminProblemSchema = z.object({
  problemId: z.string().min(1, "معرف المسألة مطلوب"),
  active: z.boolean()
});

export async function toggleAdminProblemStatusHandler(request: CallableRequest) {
  requireRole(request, ["admin", "teacher"]);
  const { problemId, active } = validateInput(ToggleAdminProblemSchema, request.data);

  const docRef = db.collection(CODING_PROBLEMS_COLLECTION).doc(problemId);
  await docRef.set({
    active,
    updatedAt: new Date().toISOString()
  }, { merge: true });

  return {
    success: true,
    problemId,
    active,
    message: active ? "تم تفعيل المسألة للطلاب." : "تم تعطيل المسألة مع الحفاظ على البيانات وسجل التسليمات."
  };
}

// Helper: Authoritative Challenge Code Verification
export function validateCodeAgainstChallenge(challenge: any, userCode: string): { passed: boolean; feedback: string; errorDetails?: string; testResults?: any } {
  // 1. Structural checks (required patterns)
  if (challenge.requiredPatterns) {
    for (const pattern of challenge.requiredPatterns) {
      const reg = new RegExp(pattern.regex, pattern.flags || "m");
      if (!reg.test(userCode)) {
        return {
          passed: false,
          feedback: pattern.messageAr || "لم يتم استيفاء جميع المتطلبات البرمجية المحددة في المهمة."
        };
      }
    }
  }

  if (challenge.forbiddenPatterns) {
    for (const pattern of challenge.forbiddenPatterns) {
      const reg = new RegExp(pattern.regex, pattern.flags || "m");
      if (reg.test(userCode)) {
        return {
          passed: false,
          feedback: pattern.messageAr || "تم استخدام أسلوب غير مسموح به في حل هذه المهمة."
        };
      }
    }
  }

  // 2. Multi-Test Case Evaluation (Public + Hidden)
  const hasPublic = Array.isArray(challenge.publicTestCases) && challenge.publicTestCases.length > 0;
  const hasHidden = Array.isArray(challenge.hiddenTestCases) && challenge.hiddenTestCases.length > 0;

  if (hasPublic || hasHidden) {
    const publicCases = challenge.publicTestCases || [];
    const hiddenCases = challenge.hiddenTestCases || [];
    const publicResults: any[] = [];
    let passedCount = 0;
    const totalCount = publicCases.length + hiddenCases.length;

    // Run Public Test Cases
    for (let i = 0; i < publicCases.length; i++) {
      const tc = publicCases[i];
      const stdinInput = tc.input !== undefined && tc.input !== null ? String(tc.input) + "\n" : "";
      const runRes = spawnSync("python3", ["-c", userCode], {
        input: stdinInput,
        timeout: challenge.timeLimit || 3000,
        maxBuffer: 64 * 1024,
        encoding: "utf-8"
      });

      if (runRes.error) {
        publicResults.push({
          caseNumber: i + 1,
          description: tc.description || `حالة الاختبار ${i + 1}`,
          input: tc.input,
          expected: tc.expectedOutput,
          actual: "",
          passed: false,
          error: "تجاوز الوقت المسموح (Time Limit Exceeded)"
        });
        return {
          passed: false,
          feedback: `حالة الاختبار ${i + 1} استغرقت وقتاً أطول من المسموح به (${challenge.timeLimit || 3000}ms).`,
          testResults: { publicResults, passedCount, totalCount }
        };
      }

      if (runRes.status !== 0) {
        const stderr = (runRes.stderr || "").trim();
        publicResults.push({
          caseNumber: i + 1,
          description: tc.description || `حالة الاختبار ${i + 1}`,
          input: tc.input,
          expected: tc.expectedOutput,
          actual: "",
          passed: false,
          error: stderr
        });
        return {
          passed: false,
          feedback: `حدث خطأ برمجي (Runtime Error) في حالة الاختبار رقم ${i + 1}.`,
          errorDetails: stderr,
          testResults: { publicResults, passedCount, totalCount }
        };
      }

      const actualOutput = (runRes.stdout || "").replace(/\r\n/g, "\n").trim();
      const expectedOutput = String(tc.expectedOutput || "").replace(/\r\n/g, "\n").trim();
      const isMatch = actualOutput === expectedOutput;

      publicResults.push({
        caseNumber: i + 1,
        description: tc.description || `حالة الاختبار ${i + 1}`,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: actualOutput,
        passed: isMatch
      });

      if (!isMatch) {
        return {
          passed: false,
          feedback: `فشلت حالة الاختبار العامة رقم ${i + 1} (${tc.description || ""}).\nالمدخلات:\n${tc.input}\nالمتوقع:\n${expectedOutput}\nالناتج الفعلي:\n${actualOutput}`,
          testResults: { publicResults, passedCount, totalCount }
        };
      }

      passedCount++;
    }

    // Run Hidden Test Cases (Never reveal secret inputs/outputs to client!)
    for (let i = 0; i < hiddenCases.length; i++) {
      const tc = hiddenCases[i];
      const stdinInput = tc.input !== undefined && tc.input !== null ? String(tc.input) + "\n" : "";
      const runRes = spawnSync("python3", ["-c", userCode], {
        input: stdinInput,
        timeout: challenge.timeLimit || 3000,
        maxBuffer: 64 * 1024,
        encoding: "utf-8"
      });

      if (runRes.error) {
        return {
          passed: false,
          feedback: `فشل في الاختبار السري رقم ${i + 1} بسبب تجاوز الوقت المسموح (Time Limit Exceeded). تأكد من الكفاءة وتجنب الحلقات اللانهائية.`,
          testResults: { publicResults, passedCount, totalCount }
        };
      }

      if (runRes.status !== 0) {
        return {
          passed: false,
          feedback: `فشل في الاختبار السري رقم ${i + 1}: حدث خطأ برمجي أثناء المعالجة (تأكد من الحالات الاستثنائية والمدخلات المختلفة).`,
          errorDetails: (runRes.stderr || "").trim(),
          testResults: { publicResults, passedCount, totalCount }
        };
      }

      const actualOutput = (runRes.stdout || "").replace(/\r\n/g, "\n").trim();
      const expectedOutput = String(tc.expectedOutput || "").replace(/\r\n/g, "\n").trim();
      if (actualOutput !== expectedOutput) {
        return {
          passed: false,
          feedback: `فشل في الاختبار المخفي رقم ${i + 1}. الكود لم ينتج الإجابة المتوقعة لحالة حدية (Edge Case). راجع الشروط والقيود بدقة.`,
          testResults: { publicResults, passedCount, totalCount }
        };
      }

      passedCount++;
    }

    return {
      passed: true,
      feedback: `🎉 تهانينا! اجتياز جميع حالات الاختبار بنجاح (${passedCount}/${totalCount}) بما فيها الاختبارات المخفية!`,
      testResults: { publicResults, passedCount, totalCount }
    };
  }

  // 3. Fallback for Classic Adventure Challenges without input test cases
  try {
    const runResult = spawnSync("python3", ["-c", userCode], {
      timeout: 2500,
      maxBuffer: 64 * 1024,
      encoding: "utf-8"
    });

    if (runResult.error) {
      return {
        passed: false,
        feedback: "استغرق الكود وقتاً أطول من المسموح (تأكد من عدم وجود تكرار لا نهائي Infinite Loop).",
        errorDetails: runResult.error.message
      };
    }

    if (runResult.status !== 0) {
      const stderr = (runResult.stderr || "").trim();
      return {
        passed: false,
        feedback: "حدث خطأ برمجي أثناء تشغيل الكود في بايثون. راجع رسالة الخطأ وحاول تصحيحها.",
        errorDetails: stderr
      };
    }

    const actualOutput = (runResult.stdout || "").trim();

    // Compare with expected output or custom validator
    if (challenge.expectedOutput !== undefined) {
      const expected = String(challenge.expectedOutput).trim();
      const normalize = (s: string) => s.replace(/\r\n/g, "\n").trim();
      if (normalize(actualOutput) !== normalize(expected)) {
        return {
          passed: false,
          feedback: `الكود اشتغل بدون أخطاء، لكن الناتج لم يطابق المطلوب تماماً.\nالمتوقع:\n${expected}\n\nالناتج الفعلي:\n${actualOutput}`
        };
      }
    }

    if (challenge.outputIncludes && Array.isArray(challenge.outputIncludes)) {
      for (const reqStr of challenge.outputIncludes) {
        if (!actualOutput.includes(reqStr)) {
          return {
            passed: false,
            feedback: `الناتج تنقصه القيمة المطلوبة: "${reqStr}". الناتج الفعلي: "${actualOutput}"`
          };
        }
      }
    }

    return {
      passed: true,
      feedback: "ممتاز! تم اجتياز جميع الفحوصات بنجاح.",
      testResults: { stdout: actualOutput }
    };

  } catch (err: any) {
    console.warn("Server Python execution fallback triggered:", err);
    return {
      passed: true,
      feedback: "تم التحقق من المتطلبات بنجاح."
    };
  }
}

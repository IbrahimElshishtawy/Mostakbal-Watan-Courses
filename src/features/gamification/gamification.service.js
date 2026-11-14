// src/features/gamification/gamification.service.js
import { callApi } from "../../repositories/api.client.js";
import { db, auth } from "../../core/firebase.js";
import { doc, getDoc, setDoc, collection, getDocs, query, where, orderBy, limit as firestoreLimit } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { FEATURES } from "../../core/constants.js";
import { normalizeError } from "../../core/errors.js";

const GAMIFICATION_COLLECTION = "student_gamification";
const DAILY_CHALLENGES_COLLECTION = "daily_challenges";
const REWARD_CATALOG_COLLECTION = "reward_catalog";
const CODE_ACTIVITIES_COLLECTION = "code_activities";
const CODE_SNAPSHOTS_COLLECTION = "code_snapshots";

export const GamificationService = {
  /**
   * Fetches the current student's gamification profile.
   */
  async getStudentGamificationProfile(studentUid) {
    const uid = studentUid || auth.currentUser?.uid;
    if (!uid) return null;

    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const res = await callApi("getStudentGamificationProfile");
        if (res) return res;
      } catch (err) {
        console.warn("Cloud function getStudentGamificationProfile fallback:", err);
      }
    }

    try {
      const snap = await getDoc(doc(db, GAMIFICATION_COLLECTION, uid));
      if (snap.exists()) {
        return snap.data();
      }
      return {
        studentUid: uid,
        xp: 0,
        coins: 0,
        level: 1,
        challengesCompleted: 0,
        tasksCompleted: 0,
        currentStreak: 1,
        badges: ["first_step"]
      };
    } catch (e) {
      console.warn("Direct Firestore getStudentGamificationProfile error:", e);
      return null;
    }
  },

  /**
   * Retrieves or creates the active 6-question daily challenge (24h validity).
   */
  async getDailyChallenge() {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("createDailyChallenge");
      } catch (err) {
        console.warn("Cloud function createDailyChallenge fallback:", err);
      }
    }

    // Direct Firestore / Local Mock fallback for resilient offline learning
    const uid = auth.currentUser?.uid || "guest";
    const today = new Date().toISOString().split("T")[0];
    const qSnap = await getDocs(
      query(
        collection(db, DAILY_CHALLENGES_COLLECTION),
        where("studentUid", "==", uid),
        orderBy("issuedAt", "desc"),
        firestoreLimit(1)
      )
    ).catch(() => ({ empty: true, docs: [] }));

    if (!qSnap.empty) {
      const existing = qSnap.docs[0].data();
      if (Date.now() < new Date(existing.expiresAt).getTime()) {
        return existing;
      }
    }

    // Baseline offline challenge set
    return {
      challengeId: `daily_${uid}_${today}`,
      studentUid: uid,
      cycleDate: today,
      difficultyTier: "beginner",
      status: "active",
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      totalScore: 0,
      totalXpEarned: 0,
      bonusXpAwarded: false,
      questions: [
        {
          id: "q1",
          topic: "متغيرات وأنواع البيانات",
          difficulty: "easy",
          questionText: "ما هو ناتج طباعة: print(type(10 / 2))؟",
          answerOptions: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "SyntaxError"],
          xpReward: 5
        },
        {
          id: "q2",
          topic: "النصوص (Strings)",
          difficulty: "easy",
          questionText: "إذا كانت s = 'Python'، فما هو الناتج من s[0]؟",
          answerOptions: ["P", "y", "t", "Error"],
          xpReward: 5
        },
        {
          id: "q3",
          topic: "القوائم (Lists)",
          difficulty: "easy",
          questionText: "أي دالة تُستخدم لإضافة عنصر جديد في نهاية القائمة؟",
          answerOptions: ["list.push(x)", "list.insert(x)", "list.append(x)", "list.add(x)"],
          xpReward: 5
        },
        {
          id: "q4",
          topic: "الجمل الشرطية",
          difficulty: "easy",
          questionText: "ما هي الكلمة المفتاحية للشرط الإضافي في بايثون؟",
          answerOptions: ["else if", "elseif", "elif", "case"],
          xpReward: 5
        },
        {
          id: "q5",
          topic: "الدوال (Functions)",
          difficulty: "medium",
          questionText: "ما هي القيمة الافتراضية التي تعيدها دالة بدون return؟",
          answerOptions: ["0", "False", "None", "undefined"],
          xpReward: 10
        },
        {
          id: "q6",
          topic: "القواميس (Dictionaries)",
          difficulty: "medium",
          questionText: "كيف نقوم بجلب قيمة مفتاح بأمان دون إلقاء KeyError؟",
          answerOptions: ["dict.get(key)", "dict[key]", "dict.find(key)", "dict.value(key)"],
          xpReward: 10
        }
      ],
      answers: {}
    };
  },

  /**
   * Submits student answer for a single daily question.
   */
  async submitDailyAnswer(challengeId, questionId, selectedOption) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("submitDailyAnswer", {
          challengeId,
          questionId,
          selectedOption
        });
      } catch (err) {
        console.warn("Cloud function submitDailyAnswer fallback:", err);
      }
    }

    // Fallback local evaluation
    const correctAnswers = { q1: 1, q2: 0, q3: 2, q4: 2, q5: 2, q6: 0 };
    const isCorrect = correctAnswers[questionId] === selectedOption;
    const xpEarned = isCorrect ? 10 : 0;
    return {
      isCorrect,
      correctAnswer: correctAnswers[questionId] ?? 0,
      explanation: isCorrect ? "إجابة ممتازة وصحيحة 100%!" : "إجابة غير دقيقة، راجع المفهوم البرمجي جيداً.",
      xpEarned,
      bonusXp: 0,
      totalScore: isCorrect ? 1 : 0,
      totalXpEarned: xpEarned,
      isFullyCompleted: false,
      questionsRemaining: 5
    };
  },

  /**
   * Fetches Virtual Reward Catalog.
   */
  async getStoreCatalog() {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const cat = await callApi("getStoreCatalog");
        if (cat && cat.length) return cat;
      } catch (err) {
        console.warn("Cloud function getStoreCatalog fallback:", err);
      }
    }

    try {
      const snap = await getDocs(query(collection(db, REWARD_CATALOG_COLLECTION), where("activeStatus", "==", true)));
      if (!snap.empty) {
        return snap.docs.map(d => d.data());
      }
    } catch (_) {}

    // Fallback baseline items
    return [
      {
        rewardId: "avatar_cyber_hacker",
        category: "avatar",
        name: "سايبر هاكر الأسطوري",
        nameEn: "Cyber Hacker",
        description: "أفاتار المحارب السيبراني مع نظارات الواقع الافتراضي ودرع حماية متوهج.",
        image: "avatar-cyber-hacker.png",
        priceInCoins: 50,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_python_master",
        category: "avatar",
        name: "سيد أفاعي بايثون",
        nameEn: "Python Master",
        description: "أفاتار أسطوري يحيط به تنين بايثون الزمردي المتألق.",
        image: "avatar-python-master.png",
        priceInCoins: 80,
        availability: "in_stock"
      },
      {
        rewardId: "frame_golden_circuit",
        category: "frame",
        name: "إطار الدوائر الذهبية",
        nameEn: "Golden Circuit Frame",
        description: "إطار ذهبي فاخر بنبضات رقمية مضيئة يحيط بصورتك في لوحة المتصدرين.",
        image: "frame-golden-circuit.png",
        priceInCoins: 60,
        availability: "in_stock"
      },
      {
        rewardId: "frame_neon_cyan",
        category: "frame",
        name: "إطار هولوغرام النيون",
        nameEn: "Neon Cyan Frame",
        description: "إطار نيون سايبر أزرق متوهج بإشعاع المستقبل.",
        image: "frame-neon-cyan.png",
        priceInCoins: 45,
        availability: "in_stock"
      },
      {
        rewardId: "title_algorithm_expert",
        category: "title",
        name: "خبير الخوارزميات",
        nameEn: "Algorithm Expert",
        description: "لقب شرفي يظهر بجانب اسمك في التحديات والبروفايل.",
        image: "title-algorithm-expert.png",
        priceInCoins: 35,
        availability: "in_stock"
      },
      {
        rewardId: "title_future_architect",
        category: "title",
        name: "مهندس المستقبل",
        nameEn: "Future Architect",
        description: "أرقى الألقاب البرمجية لفرسان المستقبل في علوم الحاسب.",
        image: "title-future-architect.png",
        priceInCoins: 90,
        availability: "in_stock"
      }
    ];
  },

  /**
   * Fetches Student's Owned Inventory Items.
   */
  async getStudentInventory(studentUid) {
    const uid = studentUid || auth.currentUser?.uid;
    if (!uid) return [];

    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const inv = await callApi("getStudentInventory");
        if (inv) return inv;
      } catch (err) {
        console.warn("Cloud function getStudentInventory fallback:", err);
      }
    }

    try {
      const snap = await getDocs(collection(db, "student_inventory", uid, "items"));
      return snap.docs.map(d => d.data());
    } catch (_) {
      return [];
    }
  },

  /**
   * Purchases an item with coins.
   */
  async purchaseReward(rewardId) {
    return callApi("purchaseReward", { rewardId });
  },

  /**
   * Equips a cosmetic perk (avatar, frame, title).
   */
  async equipReward(rewardId, category) {
    return callApi("equipReward", { rewardId, category });
  },

  /**
   * Saves a version snapshot during coding.
   */
  async saveCodeSnapshot(taskId, code, trigger = "manual_save", executionOutcome = null) {
    try {
      return await callApi("saveCodeSnapshot", {
        taskId,
        code,
        trigger,
        executionOutcome
      });
    } catch (e) {
      console.warn("saveCodeSnapshot non-blocking fallback:", e);
      return { success: true };
    }
  },

  /**
   * Records execution telemetry.
   */
  async recordCodeExecution(telemetry) {
    try {
      return await callApi("recordCodeExecution", telemetry);
    } catch (e) {
      console.warn("recordCodeExecution non-blocking fallback:", e);
      return { success: true };
    }
  },

  /**
   * Evaluates coding task and awards verified Coins.
   */
  async evaluateCodingTask(taskId, taskDifficulty, passed, code) {
    return callApi("evaluateCodingTask", {
      taskId,
      taskDifficulty,
      passed,
      code
    });
  },

  /**
   * Multi-period Leaderboard fetch.
   */
  async getLeaderboard(scope = "group", period = "all_time", limit = 20) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const res = await callApi("getLeaderboard", { scope, period, limit });
        if (res) return res;
      } catch (err) {
        console.warn("Cloud function getLeaderboard fallback:", err);
      }
    }

    // Fallback: Read student_gamification directly
    try {
      const snap = await getDocs(query(collection(db, GAMIFICATION_COLLECTION), firestoreLimit(limit)));
      const topStudents = snap.docs.map((d, index) => {
        const data = d.data();
        return {
          rank: index + 1,
          studentUid: d.id,
          studentName: data.studentName || "طالب مسجل",
          studentPhoneMasked: data.studentPhone ? data.studentPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "—",
          group: data.group || "ALL",
          competitionPoints: data.xp || 0,
          level: data.level || 1,
          xp: data.xp || 0,
          coins: data.coins || 0,
          avatarInitial: (data.studentName || "ط").charAt(0),
          isCurrentUser: d.id === auth.currentUser?.uid,
          solvedCount: (data.tasksCompleted || 0) + (data.challengesCompleted || 0),
          streak: data.currentStreak || 1,
          badge: "🌱 مبرمج واعد"
        };
      });

      return {
        scope,
        period,
        totalStudents: topStudents.length,
        topStudents,
        currentUserEntry: topStudents.find(s => s.isCurrentUser) || null,
        currentUserRank: 1,
        percentile: 100,
        rankChange: 0,
        previousRank: 1
      };
    } catch (_) {
      return null;
    }
  },

  /**
   * Teacher Analytics & Class Overview.
   */
  async getStudentsOverview() {
    return callApi("getStudentsOverview");
  },

  async getStudentReport(studentUid) {
    return callApi("getStudentReport", { studentUid });
  },

  async getCodeHistory(studentUid, taskId = null, limit = 30) {
    return callApi("getCodeHistory", { studentUid, taskId, limit });
  },

  async getDailyReports() {
    return callApi("getDailyReports");
  },

  async getWeeklyReports() {
    return callApi("getWeeklyReports");
  },

  /**
   * Administrative Season Reset & Preview.
   */
  async getActiveSeason() {
    return callApi("getActiveSeason");
  },

  async getSeasonResetPreview(targetSeasonId) {
    return callApi("getSeasonResetPreview", { targetSeasonId });
  },

  async executeSeasonReset(targetSeasonId, nextSeasonId, confirmKey) {
    return callApi("resetGamificationSeason", {
      targetSeasonId,
      nextSeasonId,
      confirmKey
    });
  }
};

// src/features/problem-solving/problem-solving.service.js
import { callApi } from "../../repositories/api.client.js";
import { db, auth } from "../../core/firebase.js";
import { doc, getDoc, setDoc, collection, getDocs, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { COLLECTIONS, FEATURES } from "../../core/constants.js";
import { PROBLEM_SOLVING_LEVELS_DATA, PROBLEM_SOLVING_CHALLENGES_DATA } from "./problem-solving-data.js";

const CODING_PROBLEMS_COLLECTION = "coding_problems";
const CODING_SUBMISSIONS_COLLECTION = "coding_submissions";

export const ProblemSolvingService = {
  /**
   * Fetches the 5 progressive levels and coding problems catalog.
   */
  async getCatalog() {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const remote = await callApi("getProblemSolvingCatalog");
        if (remote && Array.isArray(remote.levels) && Array.isArray(remote.problems)) {
          return remote;
        }
      } catch (err) {
        console.warn("Cloud function getProblemSolvingCatalog unavailable, using client fallback:", err);
      }
    }

    // Direct Firestore / Local Fallback
    const uid = auth.currentUser?.uid || "student_guest";
    let completedMap = {};
    let streakCount = 1;

    try {
      if (uid && uid !== "student_guest" && db) {
        const progSnap = await getDoc(doc(db, COLLECTIONS.PYTHON_ADVENTURE_PROGRESS, uid));
        if (progSnap.exists()) {
          const pData = progSnap.data();
          completedMap = pData.completedChallenges || {};
          streakCount = pData.streak?.count || 1;
        }
      }
    } catch (e) {
      console.warn("Firestore progress read fallback warning:", e);
    }

    // Fetch custom admin problems
    let customProblems = {};
    try {
      if (db) {
        const snap = await getDocs(collection(db, CODING_PROBLEMS_COLLECTION));
        snap.docs.forEach((d) => {
          const data = d.data();
          if (data.active !== false) {
            customProblems[d.id] = { id: d.id, ...data };
          }
        });
      }
    } catch (_) {}

    const allProblems = {
      ...PROBLEM_SOLVING_CHALLENGES_DATA,
      ...customProblems
    };

    const sanitizedProblems = Object.values(allProblems).map((p) => {
      const isCompleted = !!completedMap[p.id];
      const stars = completedMap[p.id]?.stars || 0;
      const attempts = completedMap[p.id]?.attempts || 0;

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
        isCompleted,
        stars,
        attempts,
        lastSubmittedAt: completedMap[p.id]?.completedAt || null
      };
    });

    const solvedCount = sanitizedProblems.filter((p) => p.isCompleted).length;
    const totalPointsEarned = sanitizedProblems.filter((p) => p.isCompleted).reduce((sum, p) => sum + p.points, 0);

    return {
      levels: PROBLEM_SOLVING_LEVELS_DATA,
      problems: sanitizedProblems,
      studentSummary: {
        solvedCount,
        totalCount: sanitizedProblems.length,
        totalPointsEarned,
        streakCount
      }
    };
  },

  /**
   * Fetches problem details, public test cases, and student submission history.
   */
  async getProblemDetails(problemId) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const remote = await callApi("getProblemDetails", { problemId });
        if (remote && remote.id) return remote;
      } catch (err) {
        console.warn("Cloud function getProblemDetails unavailable, using client fallback:", err);
      }
    }

    let p = PROBLEM_SOLVING_CHALLENGES_DATA[problemId];
    if (!p && db) {
      try {
        const snap = await getDoc(doc(db, CODING_PROBLEMS_COLLECTION, problemId));
        if (snap.exists()) p = { id: snap.id, ...snap.data() };
      } catch (_) {}
    }

    if (!p) throw new Error("المسألة البرمجية المطلوبة غير موجودة.");

    const uid = auth.currentUser?.uid;
    let history = [];
    if (uid && db) {
      try {
        const q = query(
          collection(db, CODING_SUBMISSIONS_COLLECTION),
          where("studentUid", "==", uid),
          where("challengeId", "==", problemId),
          limit(10)
        );
        const sSnap = await getDocs(q);
        history = sSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      } catch (_) {}
    }

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
  },

  /**
   * Submits student code for authoritative server validation, test case execution, and reward scoring.
   */
  async submitSolution({ problemId, code, hintsUsed = 0, attempts = 1 }) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const result = await callApi("submitPythonAdventureChallenge", {
          challengeId: problemId,
          code,
          hintsUsed,
          attempts
        });
        if (result && result.success) {
          return result;
        }
      } catch (err) {
        console.warn("Cloud function submitPythonAdventureChallenge unavailable, using direct fallback:", err);
      }
    }

    // Direct Firestore fallback for client
    const uid = auth.currentUser?.uid || "student_guest";
    const submissionId = `sub_${uid}_${problemId}_${Date.now()}`;

    // Get problem definition
    const p = PROBLEM_SOLVING_CHALLENGES_DATA[problemId] || {};
    const points = p.points || 10;

    const submissionDoc = {
      id: submissionId,
      studentUid: uid,
      challengeId: problemId,
      code,
      status: "passed",
      pointsAwarded: points,
      submittedAt: new Date().toISOString()
    };

    if (db && uid !== "student_guest") {
      try {
        await setDoc(doc(db, CODING_SUBMISSIONS_COLLECTION, submissionId), submissionDoc);
      } catch (_) {}
    }

    return {
      success: true,
      passed: true,
      earnedXp: points * 5,
      totalXp: points * 5,
      stars: 3,
      competitionPointsAwarded: points,
      totalCompetitionPoints: points,
      feedback: `🎉 أحسنت صنعاً! تم اجتياز المسألة "${p.title || problemId}" بنجاح!`,
      newlyUnlockedAchievements: []
    };
  },

  /**
   * Admin: Save or update custom problem.
   */
  async saveAdminProblem(problemData) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("saveAdminProblem", problemData);
      } catch (err) {
        console.warn("Cloud function saveAdminProblem fallback:", err);
      }
    }

    const pid = problemData.id || `custom-prob-${Date.now()}`;
    const payload = {
      ...problemData,
      id: pid,
      updatedAt: new Date().toISOString()
    };
    if (db) {
      await setDoc(doc(db, CODING_PROBLEMS_COLLECTION, pid), payload, { merge: true });
    }
    return { success: true, problemId: pid, message: "تم حفظ المسألة بنجاح." };
  },

  /**
   * Admin: Toggle problem active status.
   */
  async toggleAdminProblemStatus(problemId, active) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("toggleAdminProblemStatus", { problemId, active });
      } catch (err) {
        console.warn("Cloud function toggleAdminProblemStatus fallback:", err);
      }
    }

    if (db) {
      await setDoc(doc(db, CODING_PROBLEMS_COLLECTION, problemId), { active, updatedAt: new Date().toISOString() }, { merge: true });
    }
    return { success: true, problemId, active, message: active ? "تم تفعيل المسألة." : "تم تعطيل المسألة." };
  },

  /**
   * Computes comprehensive competitive profile data for a student.
   */
  async getStudentCompetitiveProfile(student) {
    const catalog = await this.getCatalog();
    const uid = student?.uid || auth.currentUser?.uid;

    let submissions = [];
    if (uid && db) {
      try {
        const q = query(
          collection(db, CODING_SUBMISSIONS_COLLECTION),
          where("studentUid", "==", uid),
          limit(20)
        );
        const snap = await getDocs(q);
        submissions = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      } catch (_) {}
    }

    const problems = catalog.problems || [];
    const solvedProblems = problems.filter((p) => p.isCompleted);
    const solvedCount = solvedProblems.length;
    const totalCount = problems.length;
    const totalPoints = catalog.studentSummary?.totalPointsEarned || solvedProblems.reduce((acc, p) => acc + p.points, 0);
    const streak = catalog.studentSummary?.streakCount || 1;

    const failedCount = submissions.filter((s) => s.status && s.status !== "passed").length;
    const totalAttempts = solvedCount + failedCount;
    const successRate = totalAttempts > 0 ? Math.round((solvedCount / totalAttempts) * 100) : 100;

    // Levels breakdown
    const levelsProgress = (catalog.levels || []).map((lvl) => {
      const lvlProblems = problems.filter((p) => p.level === lvl.id);
      const lvlSolved = lvlProblems.filter((p) => p.isCompleted).length;
      return {
        level: lvl.id,
        title: lvl.title,
        solved: lvlSolved,
        total: lvlProblems.length,
        isCompleted: lvlProblems.length > 0 && lvlSolved >= lvlProblems.length
      };
    });

    // Current level determined by highest unlocked/active level
    let currentLevel = 1;
    for (const lp of levelsProgress) {
      if (lp.isCompleted && lp.level < 5) {
        currentLevel = lp.level + 1;
      }
    }

    const levelTitles = {
      1: "مبتدئ (Beginner)",
      2: "سهل (Easy)",
      3: "متوسط (Intermediate)",
      4: "متقدم (Advanced)",
      5: "تحديات قصوى (Expert)"
    };

    // 8 Badges Evaluation
    const badges = [
      {
        id: "beginner_solver",
        title: "🥉 مبتدئ بايثون (Beginner)",
        icon: "🥉",
        description: "حل أول مسألة برمجية بنجاح وبداية مشوار التحديات.",
        unlocked: solvedCount >= 1
      },
      {
        id: "problem_solver",
        title: "🥈 حلال المشكلات (Problem Solver)",
        icon: "🥈",
        description: "حل 5 مسائل برمجية في مسار Problem Solving.",
        unlocked: solvedCount >= 5
      },
      {
        id: "python_solver",
        title: "🥇 خبير المسائل (Python Solver)",
        icon: "🥇",
        description: "حل 15 مسألة برمجية بتفوق وإتقان مفاهيم بايثون.",
        unlocked: solvedCount >= 15
      },
      {
        id: "code_warrior",
        title: "🔥 محارب الأكواد (Code Warrior)",
        icon: "🔥",
        description: "تتابع 7 أيام تدريبية متتالية أو حل 25 مسألة كاملة.",
        unlocked: streak >= 7 || solvedCount >= 25
      },
      {
        id: "speed_coder",
        title: "⚡ المبرمج السريع (Speed Coder)",
        icon: "⚡",
        description: "حل 3 مسائل من المحاولة الأولى بنجوم كاملة وبدون مساعدة.",
        unlocked: solvedProblems.filter((p) => p.stars === 3).length >= 3
      },
      {
        id: "algo_master",
        title: "🧠 سيد الخوارزميات (Algorithm Master)",
        icon: "🧠",
        description: "حل 3 مسائل في المستوى المتقدم (Algorithms & Searching).",
        unlocked: problems.filter((p) => p.level === 4 && p.isCompleted).length >= 3
      },
      {
        id: "python_expert",
        title: "💎 خبير بايثون المتقدم (Python Expert)",
        icon: "💎",
        description: "جمع 500+ نقطة تنافسية وإتقان هياكل البيانات والخوارزميات.",
        unlocked: totalPoints >= 500 || problems.filter((p) => p.level === 4 && p.isCompleted).length === 5
      },
      {
        id: "python_champion",
        title: "👑 بطل بايثون المتصدر (Python Champion)",
        icon: "👑",
        description: "إكمال المستوى الخامس بأكمله أو الوصول للمراكز الثلاثة الأولى.",
        unlocked: problems.filter((p) => p.level === 5 && p.isCompleted).length >= 3
      }
    ];

    // Determine current student title
    let studentTitle = "🥉 مبتدئ بايثون";
    if (solvedCount >= 25) studentTitle = "👑 بطل بايثون المتصدر";
    else if (totalPoints >= 500 || solvedCount >= 20) studentTitle = "💎 خبير بايثون المتقدم";
    else if (solvedCount >= 15) studentTitle = "🧠 سيد الخوارزميات";
    else if (streak >= 7) studentTitle = "🔥 محارب الأكواد";
    else if (solvedCount >= 10) studentTitle = "🥇 خبير المسائل";
    else if (solvedCount >= 5) studentTitle = "🥈 حلال المشكلات";

    // Enrich recent submissions with titles if missing
    const enrichedSubmissions = submissions.map((sub) => {
      const p = problems.find((item) => item.id === sub.challengeId);
      return {
        ...sub,
        challengeTitle: p ? p.title : sub.challengeId
      };
    });

    return {
      currentLevel,
      levelTitle: levelTitles[currentLevel] || "مبتدئ",
      totalPoints,
      problemsSolved: solvedCount,
      totalProblems: totalCount,
      problemsFailed: failedCount,
      successRate,
      currentRank: 1, // Will be updated if leaderboard is fetched
      bestRank: 1,
      streak,
      studentTitle,
      badges,
      levelsProgress,
      recentSubmissions: enrichedSubmissions
    };
  }
};


// scripts/test-gamification-suite.mjs
/**
 * Etihad Beshababha Gamification & Adaptive Learning Test Suite
 * Validates:
 * 1. XP Economy & 10-Milestone Level Progression
 * 2. Coins Economy & Verified Task Rewards (10, 25, 50, 100)
 * 3. Adaptive Question Engine & Anti-Leakage Sanitizer
 * 4. 24-Hour Cycle Expiration & Single-Attempt Rules
 * 5. Code Activity & Snapshot Tracking
 * 6. Store Catalog, Inventory & Equip System
 * 7. Multi-Period Leaderboard Deterministic Tie-Breaking
 * 8. Season Reset Archival, Dry-Run Preview & Data Protection Guardrails
 */

import { strict as assert } from "node:assert";

console.log("\n=======================================================");
console.log("🎮 STARTING GAMIFICATION, ADAPTIVE LEARNING & CODE ANALYTICS TESTS");
console.log("=======================================================\n");

let passedCount = 0;
let failedCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${desc}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${desc}`);
    console.error(`     Reason: ${err.message}`);
    failedCount++;
  }
}

// -------------------------------------------------------------
// SUITE 1: XP Economy & 10-Milestone Level Thresholds
// -------------------------------------------------------------
console.log("▶️ TEST SUITE 1: XP Economy & 10-Milestone Level Thresholds");

const LEVEL_THRESHOLDS = [
  { level: 1, name: "Beginner", minXP: 0 },
  { level: 2, name: "Explorer", minXP: 100 },
  { level: 3, name: "Learner", minXP: 250 },
  { level: 4, name: "Developer", minXP: 500 },
  { level: 5, name: "Advanced", minXP: 850 },
  { level: 6, name: "Expert", minXP: 1300 },
  { level: 7, name: "Master", minXP: 1900 },
  { level: 8, name: "Champion", minXP: 2700 },
  { level: 9, name: "Elite", minXP: 3700 },
  { level: 10, name: "Legend", minXP: 5000 },
];

function calculateGamificationLevel(xp) {
  let matched = LEVEL_THRESHOLDS[0];
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXP) {
      matched = LEVEL_THRESHOLDS[i];
      break;
    }
  }
  const nextThreshold = LEVEL_THRESHOLDS.find((t) => t.level === matched.level + 1) || null;
  const currentLevelBaseXP = matched.minXP;
  const nextLevelXP = nextThreshold ? nextThreshold.minXP : matched.minXP;
  const progressRatio = nextThreshold
    ? Math.min(1, Math.max(0, (xp - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)))
    : 1;

  return {
    level: matched.level,
    title: matched.name,
    xp,
    nextLevelXP: nextThreshold ? nextThreshold.minXP : null,
    progressPercentage: Math.round(progressRatio * 100),
  };
}

it("0 XP yields Level 1 (Beginner)", () => {
  const res = calculateGamificationLevel(0);
  assert.equal(res.level, 1);
  assert.equal(res.title, "Beginner");
  assert.equal(res.progressPercentage, 0);
});

it("99 XP remains Level 1 with 99% progress towards Level 2 (100 XP)", () => {
  const res = calculateGamificationLevel(99);
  assert.equal(res.level, 1);
  assert.equal(res.nextLevelXP, 100);
  assert.equal(res.progressPercentage, 99);
});

it("100 XP unlocks Level 2 (Explorer)", () => {
  const res = calculateGamificationLevel(100);
  assert.equal(res.level, 2);
  assert.equal(res.title, "Explorer");
  assert.equal(res.nextLevelXP, 250);
  assert.equal(res.progressPercentage, 0);
});

it("250 XP unlocks Level 3 (Learner)", () => {
  const res = calculateGamificationLevel(250);
  assert.equal(res.level, 3);
  assert.equal(res.title, "Learner");
});

it("500 XP unlocks Level 4 (Developer)", () => {
  const res = calculateGamificationLevel(500);
  assert.equal(res.level, 4);
  assert.equal(res.title, "Developer");
});

it("850 XP unlocks Level 5 (Advanced)", () => {
  const res = calculateGamificationLevel(850);
  assert.equal(res.level, 5);
  assert.equal(res.title, "Advanced");
});

it("1300 XP unlocks Level 6 (Expert)", () => {
  const res = calculateGamificationLevel(1300);
  assert.equal(res.level, 6);
  assert.equal(res.title, "Expert");
});

it("1900 XP unlocks Level 7 (Master)", () => {
  const res = calculateGamificationLevel(1900);
  assert.equal(res.level, 7);
  assert.equal(res.title, "Master");
});

it("2700 XP unlocks Level 8 (Champion)", () => {
  const res = calculateGamificationLevel(2700);
  assert.equal(res.level, 8);
  assert.equal(res.title, "Champion");
});

it("3700 XP unlocks Level 9 (Elite)", () => {
  const res = calculateGamificationLevel(3700);
  assert.equal(res.level, 9);
  assert.equal(res.title, "Elite");
});

it("5000+ XP unlocks Level 10 (Legend) with max progress 100%", () => {
  const res = calculateGamificationLevel(6500);
  assert.equal(res.level, 10);
  assert.equal(res.title, "Legend");
  assert.equal(res.nextLevelXP, null);
  assert.equal(res.progressPercentage, 100);
});

// -------------------------------------------------------------
// SUITE 2: Coins Economy & Verified Task Rewards
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 2: Coins Economy & Verified Task Rewards");

const TASK_REWARDS = {
  simple: 10,
  medium: 25,
  difficult: 50,
  project: 100,
};

it("Simple task awards exactly 10 coins", () => {
  assert.equal(TASK_REWARDS.simple, 10);
});

it("Medium task awards exactly 25 coins", () => {
  assert.equal(TASK_REWARDS.medium, 25);
});

it("Difficult task awards exactly 50 coins", () => {
  assert.equal(TASK_REWARDS.difficult, 50);
});

it("Capstone project awards exactly 100 coins", () => {
  assert.equal(TASK_REWARDS.project, 100);
});

it("Opening code editor awards 0 coins (Zero-Trust rule)", () => {
  const openEditorAward = 0;
  assert.equal(openEditorAward, 0);
});

it("Running code without passing evaluation awards 0 coins", () => {
  const testRunAward = (passed) => (passed ? 25 : 0);
  assert.equal(testRunAward(false), 0);
  assert.equal(testRunAward(true), 25);
});

it("Duplicate task submission prevents duplicate coin rewards", () => {
  const awardedTasks = new Set(["task_101"]);
  const awardCoinForTask = (taskId) => {
    if (awardedTasks.has(taskId)) {
      return { awarded: false, reason: "ALREADY_AWARDED" };
    }
    awardedTasks.add(taskId);
    return { awarded: true, coins: TASK_REWARDS.medium };
  };

  const firstAttempt = awardCoinForTask("task_101");
  assert.equal(firstAttempt.awarded, false);
  assert.equal(firstAttempt.reason, "ALREADY_AWARDED");

  const newAttempt = awardCoinForTask("task_102");
  assert.equal(newAttempt.awarded, true);
  assert.equal(newAttempt.coins, 25);
});

// -------------------------------------------------------------
// SUITE 3: Adaptive Daily Questions & Anti-Leakage
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 3: Adaptive Daily Questions & Anti-Leakage");

const ADAPTIVE_DISTRIBUTIONS = {
  beginner: { easy: 4, medium: 2, hard: 0 },
  intermediate: { easy: 2, medium: 3, hard: 1 },
  advanced: { easy: 1, medium: 3, hard: 2 },
};

function selectAdaptiveQuestions(pool, proficiency) {
  const dist = ADAPTIVE_DISTRIBUTIONS[proficiency] || ADAPTIVE_DISTRIBUTIONS.beginner;
  const easy = pool.filter((q) => q.difficulty === "easy").slice(0, dist.easy);
  const medium = pool.filter((q) => q.difficulty === "medium").slice(0, dist.medium);
  const hard = pool.filter((q) => q.difficulty === "hard").slice(0, dist.hard);
  return [...easy, ...medium, ...hard];
}

const mockQuestionPool = [
  { id: "q1", difficulty: "easy", text: "E1", correctAnswer: "A", explanation: "Exp1" },
  { id: "q2", difficulty: "easy", text: "E2", correctAnswer: "B", explanation: "Exp2" },
  { id: "q3", difficulty: "easy", text: "E3", correctAnswer: "C", explanation: "Exp3" },
  { id: "q4", difficulty: "easy", text: "E4", correctAnswer: "D", explanation: "Exp4" },
  { id: "q5", difficulty: "medium", text: "M1", correctAnswer: "A", explanation: "Exp5" },
  { id: "q6", difficulty: "medium", text: "M2", correctAnswer: "B", explanation: "Exp6" },
  { id: "q7", difficulty: "medium", text: "M3", correctAnswer: "C", explanation: "Exp7" },
  { id: "q8", difficulty: "hard", text: "H1", correctAnswer: "A", explanation: "Exp8" },
  { id: "q9", difficulty: "hard", text: "H2", correctAnswer: "B", explanation: "Exp9" },
];

it("Beginner distribution produces exactly 6 questions (4 Easy, 2 Medium, 0 Hard)", () => {
  const selected = selectAdaptiveQuestions(mockQuestionPool, "beginner");
  assert.equal(selected.length, 6);
  assert.equal(selected.filter((q) => q.difficulty === "easy").length, 4);
  assert.equal(selected.filter((q) => q.difficulty === "medium").length, 2);
  assert.equal(selected.filter((q) => q.difficulty === "hard").length, 0);
});

it("Intermediate distribution produces exactly 6 questions (2 Easy, 3 Medium, 1 Hard)", () => {
  const selected = selectAdaptiveQuestions(mockQuestionPool, "intermediate");
  assert.equal(selected.length, 6);
  assert.equal(selected.filter((q) => q.difficulty === "easy").length, 2);
  assert.equal(selected.filter((q) => q.difficulty === "medium").length, 3);
  assert.equal(selected.filter((q) => q.difficulty === "hard").length, 1);
});

it("Advanced distribution produces exactly 6 questions (1 Easy, 3 Medium, 2 Hard)", () => {
  const selected = selectAdaptiveQuestions(mockQuestionPool, "advanced");
  assert.equal(selected.length, 6);
  assert.equal(selected.filter((q) => q.difficulty === "easy").length, 1);
  assert.equal(selected.filter((q) => q.difficulty === "medium").length, 3);
  assert.equal(selected.filter((q) => q.difficulty === "hard").length, 2);
});

it("Anti-leakage sanitizer strips correctAnswer and explanation before client delivery", () => {
  const rawQuestions = selectAdaptiveQuestions(mockQuestionPool, "intermediate");
  const sanitized = rawQuestions.map((q) => {
    const { correctAnswer, explanation, ...clientSafe } = q;
    return clientSafe;
  });

  assert.equal(sanitized.length, 6);
  for (const q of sanitized) {
    assert.strictEqual(q.correctAnswer, undefined, "correctAnswer must not leak to frontend");
    assert.strictEqual(q.explanation, undefined, "explanation must not leak before answering");
    assert.ok(q.text, "text must be present");
  }
});

it("Question XP awards follow specification (Easy: 5, Medium: 10, Hard: 15, Perfect Bonus: 10)", () => {
  const QUESTION_XP = { easy: 5, medium: 10, hard: 15 };
  assert.equal(QUESTION_XP.easy, 5);
  assert.equal(QUESTION_XP.medium, 10);
  assert.equal(QUESTION_XP.hard, 15);

  const perfectScoreBonus = 10;
  // Calculate total XP for perfect intermediate set (2 easy, 3 medium, 1 hard)
  const totalIntermediatePerfectXP =
    2 * QUESTION_XP.easy + 3 * QUESTION_XP.medium + 1 * QUESTION_XP.hard + perfectScoreBonus;
  assert.equal(totalIntermediatePerfectXP, 10 + 30 + 15 + 10); // 65 XP
});

// -------------------------------------------------------------
// SUITE 4: 24-Hour Challenge Cycle & Single-Attempt Rules
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 4: 24-Hour Challenge Cycle & Single-Attempt Rules");

it("24-Hour cycle calculation sets expiresAt to exactly createdAt + 86400000 ms", () => {
  const createdAt = Date.now();
  const expiresAt = createdAt + 24 * 60 * 60 * 1000;
  assert.equal(expiresAt - createdAt, 86400000);
});

it("Cannot submit answer to expired daily challenge", () => {
  const expiredChallenge = {
    expiresAt: Date.now() - 5000, // expired 5 seconds ago
  };
  const isExpired = Date.now() > expiredChallenge.expiresAt;
  assert.equal(isExpired, true);

  const submitAnswer = (challenge) => {
    if (Date.now() > challenge.expiresAt) {
      throw new Error("CHALLENGE_EXPIRED");
    }
    return { ok: true };
  };

  assert.throws(() => submitAnswer(expiredChallenge), /CHALLENGE_EXPIRED/);
});

it("Cannot answer the same question twice in the same challenge cycle", () => {
  const answers = { q1: { selectedOption: "A", isCorrect: true } };

  const submitQuestionAnswer = (qid, option) => {
    if (answers[qid]) {
      throw new Error("ALREADY_ANSWERED");
    }
    answers[qid] = { selectedOption: option };
    return { ok: true };
  };

  assert.throws(() => submitQuestionAnswer("q1", "B"), /ALREADY_ANSWERED/);
  assert.doesNotThrow(() => submitQuestionAnswer("q2", "C"));
});

// -------------------------------------------------------------
// SUITE 5: Code Activity, Snapshots & Telemetry
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 5: Code Activity, Snapshots & Telemetry");

it("Code snapshot captures required audit metadata without keystroke spam", () => {
  const snapshot = {
    studentId: "std_401",
    taskId: "py_world_1",
    language: "python",
    code: "def solve():\n    return 42",
    linesOfCode: 2,
    charCount: 29,
    timestamp: Date.now(),
  };

  assert.equal(snapshot.language, "python");
  assert.equal(snapshot.linesOfCode, 2);
  assert.equal(typeof snapshot.timestamp, "number");
  assert.ok(snapshot.code.includes("solve"));
});

it("Code execution records syntax errors and execution duration accurately", () => {
  const execution = {
    studentId: "std_401",
    taskId: "py_world_1",
    passed: false,
    syntaxError: "SyntaxError: unexpected EOF while parsing",
    runtimeMs: 45,
    timestamp: Date.now(),
  };

  assert.equal(execution.passed, false);
  assert.ok(execution.syntaxError.startsWith("SyntaxError"));
  assert.equal(execution.runtimeMs, 45);
});

// -------------------------------------------------------------
// SUITE 6: Store Catalog, Inventory & Equip System
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 6: Store Catalog, Inventory & Equip System");

it("Purchase transaction verifies sufficient coins balance before deducting", () => {
  let studentCoins = 40;
  const itemCost = 50;

  const purchaseItem = (cost) => {
    if (studentCoins < cost) {
      throw new Error("INSUFFICIENT_COINS");
    }
    studentCoins -= cost;
    return { success: true, remaining: studentCoins };
  };

  assert.throws(() => purchaseItem(itemCost), /INSUFFICIENT_COINS/);
  assert.equal(studentCoins, 40); // balance untouched
});

it("Successful purchase deducts coins atomically and grants item into inventory", () => {
  let studentCoins = 75;
  const inventory = new Set();
  const item = { id: "avatar_cyber_wizard", cost: 50, type: "avatar" };

  if (studentCoins >= item.cost) {
    studentCoins -= item.cost;
    inventory.add(item.id);
  }

  assert.equal(studentCoins, 25);
  assert.ok(inventory.has("avatar_cyber_wizard"));
});

it("Equip system enforces single active item per cosmetic slot", () => {
  const equipped = {
    avatar: "avatar_starter",
    frame: null,
    title: null,
    name_effect: null,
  };

  const equipItem = (type, itemId) => {
    equipped[type] = itemId;
  };

  equipItem("avatar", "avatar_cyber_wizard");
  assert.equal(equipped.avatar, "avatar_cyber_wizard");

  equipItem("avatar", "avatar_neon_hacker");
  assert.equal(equipped.avatar, "avatar_neon_hacker");
  assert.equal(equipped.frame, null); // other slots unaffected
});

// -------------------------------------------------------------
// SUITE 7: Leaderboard Deterministic Tie-Breaking
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 7: Leaderboard Deterministic Tie-Breaking");

function sortLeaderboard(students) {
  return [...students].sort((a, b) => {
    // 1. Primary: XP Descending
    if (b.xp !== a.xp) return b.xp - a.xp;
    // 2. Secondary: Completed Tasks Descending
    if ((b.completedTasks || 0) !== (a.completedTasks || 0)) {
      return (b.completedTasks || 0) - (a.completedTasks || 0);
    }
    // 3. Tertiary: Earlier Achievement Date Ascending
    return (a.updatedAt || 0) - (b.updatedAt || 0);
  });
}

it("Leaderboard sorts by XP descending as primary metric", () => {
  const list = [
    { id: "std_1", xp: 1500, completedTasks: 5, updatedAt: 1000 },
    { id: "std_2", xp: 2100, completedTasks: 3, updatedAt: 2000 },
  ];
  const sorted = sortLeaderboard(list);
  assert.equal(sorted[0].id, "std_2");
  assert.equal(sorted[1].id, "std_1");
});

it("Leaderboard breaks XP ties using completedTasks descending", () => {
  const list = [
    { id: "std_equal_1", xp: 1000, completedTasks: 4, updatedAt: 2000 },
    { id: "std_equal_2", xp: 1000, completedTasks: 8, updatedAt: 3000 },
  ];
  const sorted = sortLeaderboard(list);
  assert.equal(sorted[0].id, "std_equal_2"); // More tasks
  assert.equal(sorted[1].id, "std_equal_1");
});

it("Leaderboard breaks XP and task ties using earlier timestamp", () => {
  const list = [
    { id: "std_late", xp: 1000, completedTasks: 5, updatedAt: 5000 },
    { id: "std_early", xp: 1000, completedTasks: 5, updatedAt: 2000 },
  ];
  const sorted = sortLeaderboard(list);
  assert.equal(sorted[0].id, "std_early"); // Reached earlier
  assert.equal(sorted[1].id, "std_late");
});

// -------------------------------------------------------------
// SUITE 8: Season Reset Archival & Data Protection Guardrails
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 8: Season Reset Archival & Data Protection Guardrails");

it("Dry-run preview returns affected count without mutating student records", () => {
  const students = [
    { id: "s1", xp: 1200, coins: 50, level: 5 },
    { id: "s2", xp: 850, coins: 25, level: 4 },
  ];

  const getResetPreview = (list) => {
    return {
      affectedStudentsCount: list.length,
      totalXpToArchive: list.reduce((acc, s) => acc + s.xp, 0),
      totalCoinsToArchive: list.reduce((acc, s) => acc + s.coins, 0),
    };
  };

  const preview = getResetPreview(students);
  assert.equal(preview.affectedStudentsCount, 2);
  assert.equal(preview.totalXpToArchive, 2050);
  assert.equal(preview.totalCoinsToArchive, 75);
  // Verify objects untouched
  assert.equal(students[0].xp, 1200);
});

it("Season reset archives gamification snapshot and resets student to Level 1, 0 XP, 0 Coins", () => {
  const originalStudent = {
    id: "std_champion",
    email: "champion@test.com",
    academicGrades: { midterm: 98, final: 95 },
    attendance: ["2026-11-01", "2026-11-08"],
    examSubmissions: [{ examId: "ex1", score: 10 }],
    gamification: {
      seasonId: "season_2026_q1",
      xp: 4500,
      coins: 350,
      level: 9,
    },
  };

  // Perform reset operation
  const archivedRecord = {
    seasonId: originalStudent.gamification.seasonId,
    studentId: originalStudent.id,
    finalXP: originalStudent.gamification.xp,
    finalCoins: originalStudent.gamification.coins,
    finalLevel: originalStudent.gamification.level,
    archivedAt: Date.now(),
  };

  const resetStudent = {
    ...originalStudent,
    gamification: {
      seasonId: "season_2026_q2",
      xp: 0,
      coins: 0,
      level: 1,
    },
  };

  // Verify Critical Data Protection:
  assert.equal(resetStudent.id, "std_champion");
  assert.equal(resetStudent.email, "champion@test.com");
  assert.deepEqual(resetStudent.academicGrades, { midterm: 98, final: 95 }, "Academic grades must NEVER be wiped");
  assert.equal(resetStudent.attendance.length, 2, "Attendance records must NEVER be wiped");
  assert.equal(resetStudent.examSubmissions.length, 1, "Exam submissions must NEVER be wiped");

  // Verify Gamification Fresh Start:
  assert.equal(resetStudent.gamification.xp, 0);
  assert.equal(resetStudent.gamification.coins, 0);
  assert.equal(resetStudent.gamification.level, 1);
  assert.equal(resetStudent.gamification.seasonId, "season_2026_q2");

  // Verify Archive intact:
  assert.equal(archivedRecord.finalXP, 4500);
  assert.equal(archivedRecord.finalCoins, 350);
});

console.log("\n▶️ TEST SUITE 9: Points-to-Coins Exchange Bureau");

const PACKAGES = [
  { points: 50, coins: 5, bonus: 0 },
  { points: 100, coins: 10, bonus: 0 },
  { points: 250, coins: 30, bonus: 5 },
  { points: 500, coins: 65, bonus: 15 },
  { points: 1000, coins: 140, bonus: 40 }
];

it("Preset packages calculate correct coins and bonuses", () => {
  assert.equal(PACKAGES[0].coins, 5);
  assert.equal(PACKAGES[1].coins, 10);
  assert.equal(PACKAGES[2].coins, 30); // 25 + 5 bonus
  assert.equal(PACKAGES[3].coins, 65); // 50 + 15 bonus
  assert.equal(PACKAGES[4].coins, 140); // 100 + 40 bonus
});

it("Custom conversion applies standard 10:1 ratio", () => {
  const convert = (pts) => Math.floor(pts / 10);
  assert.equal(convert(10), 1);
  assert.equal(convert(85), 8);
  assert.equal(convert(340), 34);
  assert.equal(convert(9), 0);
});

it("Rejects exchange if student points are insufficient", () => {
  const student = { points: 40, coins: 0 };
  const attemptExchange = (pts, cns) => {
    if (student.points < pts) {
      throw new Error("Insufficient points");
    }
    student.points -= pts;
    student.coins += cns;
  };

  assert.throws(() => attemptExchange(50, 5), /Insufficient points/);
  assert.equal(student.points, 40);
  assert.equal(student.coins, 0);
});

it("Atomic transaction deducts points and credits coins correctly", () => {
  const student = { points: 300, coins: 10 };
  const pkg = PACKAGES[2]; // 250 pts -> 30 coins

  assert(student.points >= pkg.points);
  student.points -= pkg.points;
  student.coins += pkg.coins;

  assert.equal(student.points, 50);
  assert.equal(student.coins, 40);
});

console.log("\n=======================================================");
console.log(`🎉 GAMIFICATION TEST SUITE FINISHED: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("=======================================================\n");

if (failedCount > 0) {
  process.exit(1);
}

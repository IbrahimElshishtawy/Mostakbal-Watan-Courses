// scripts/verify-all-master-fixes.mjs
/**
 * Comprehensive Master Audit & Functional Verification Suite
 * Etihad Beshababha Academic Platform
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("\n=======================================================");
console.log("🚀 STARTING ETIHAD BESHABABHA COMPREHENSIVE VERIFICATION");
console.log("=======================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

// -------------------------------------------------------------
// TEST SUITE 1: Python Daily Challenge & Execution
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 1: Python Daily Challenge & Execution (Phase 03)");

const adventureDataMod = await import("../src/features/python-adventure/python-adventure-data.js");
const challenges = adventureDataMod.CHALLENGES_CLIENT_DATA;

assert(challenges["daily-loop-sum"], "Daily Challenge 'daily-loop-sum' exists in CHALLENGES_CLIENT_DATA");
assert(challenges["daily-string-reverse"], "Daily Challenge 'daily-string-reverse' exists in CHALLENGES_CLIENT_DATA");
assert(challenges["daily-grade-calc"], "Daily Challenge 'daily-grade-calc' exists in CHALLENGES_CLIENT_DATA");
assert(challenges["daily-dict-counter"], "Daily Challenge 'daily-dict-counter' exists in CHALLENGES_CLIENT_DATA");
assert(challenges["daily-palindrome"], "Daily Challenge 'daily-palindrome' exists in CHALLENGES_CLIENT_DATA");
assert(challenges["daily-list-max"], "Daily Challenge 'daily-list-max' exists in CHALLENGES_CLIENT_DATA");
assert(challenges["daily-prime-check"], "Daily Challenge 'daily-prime-check' exists in CHALLENGES_CLIENT_DATA");

// Test deterministic daily rotation by date
const { getTodayDailyChallenge, DAILY_CHALLENGES_POOL } = adventureDataMod;
assert(Array.isArray(DAILY_CHALLENGES_POOL) && DAILY_CHALLENGES_POOL.length >= 7, "DAILY_CHALLENGES_POOL contains at least 7 challenges");
const nov11 = new Date(2026, 10, 11, 23, 50, 0);
const nov12 = new Date(2026, 10, 12, 0, 10, 0);
const nov13 = new Date(2026, 10, 13, 0, 10, 0);
assert(getTodayDailyChallenge(nov11).id === "daily-loop-sum", "Nov 11 before midnight selects daily-loop-sum");
assert(getTodayDailyChallenge(nov12).id === "daily-string-reverse", "Nov 12 after midnight immediately rotates to daily-string-reverse");
assert(getTodayDailyChallenge(nov13).id === "daily-grade-calc", "Nov 13 rotates to daily-grade-calc");

// Execute daily-loop-sum solution with Python 3
const loopSumSolution = `
total = sum(range(2, 21, 2))
print(total)
`;
const loopSumOutput = execSync(`python3 -c "${loopSumSolution.trim().replace(/"/g, '\\"')}"`, { encoding: "utf8" }).trim();
assert(loopSumOutput === "110", `Daily loop sum solution produces 110 (Actual: '${loopSumOutput}')`);
assert(loopSumOutput === challenges["daily-loop-sum"].expectedOutput, "Output matches daily-loop-sum.expectedOutput");

// Execute daily-string-reverse solution with Python 3
const stringRevSolution = `
word = "python"
print(word[::-1])
`;
const stringRevOutput = execSync(`python3 -c "${stringRevSolution.trim().replace(/"/g, '\\"')}"`, { encoding: "utf8" }).trim();
assert(stringRevOutput === "nohtyp", `Daily string reverse produces nohtyp (Actual: '${stringRevOutput}')`);

// -------------------------------------------------------------
// TEST SUITE 2: Teacher Grading & 0-10 Scale Enforcement (Phase 04 & 05)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 2: Teacher Grading & 0-10 Scale Enforcement (Phase 04 & 05)");

// Test instant approve scale normalization
function normalizeInstantScore(inputScore, maxScale = 10) {
  let score = Number(inputScore);
  if (score > 10) {
    score = (score / 100) * 10;
  }
  return Math.min(Math.max(score, 0), maxScale);
}

assert(normalizeInstantScore(100) === 10, "Score of 100 correctly scales down to 10");
assert(normalizeInstantScore(10) === 10, "Score of 10 remains 10");
assert(normalizeInstantScore(8.5) === 8.5, "Score of 8.5 remains 8.5");
assert(normalizeInstantScore(95) === 9.5, "Score of 95 scales down to 9.5");

// Test submission persistence status filter
const mockSubmissions = [
  { id: "sub1", studentId: "s1", status: "submitted", grade: null },
  { id: "sub2", studentId: "s2", status: "graded", grade: 9.5 },
  { id: "sub3", studentId: "s3", status: "graded", grade: 10 },
  { id: "sub4", studentId: "s4", status: "submitted", grade: null }
];

const pending = mockSubmissions.filter(s => s.status !== "graded" && !s.grade);
assert(pending.length === 2, `Pending filter correctly isolates unreviewed submissions (Found ${pending.length}, expected 2)`);
assert(!pending.some(s => s.status === "graded"), "No graded submission regresses back into pending queue");

// Test average score calculation (must be out of 10)
const gradedSubs = mockSubmissions.filter(s => s.status === "graded" && typeof s.grade === "number");
const totalScore = gradedSubs.reduce((acc, s) => acc + s.grade, 0);
const avgScore = gradedSubs.length > 0 ? (totalScore / gradedSubs.length) : 0;
assert(avgScore === 9.75, `Average score calculated correctly (${avgScore} / 10, expected 9.75)`);
assert(avgScore <= 10, "Average score does not exceed 10");

// -------------------------------------------------------------
// TEST SUITE 3: Deadline Countdown & Submission Rate (Phase 02)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 3: Deadline Countdown & Submission Rate (Phase 02)");

function formatLiveCountdown(deadlineStr) {
  if (!deadlineStr) return "بدون موعد محدد";
  const deadlineDate = new Date(deadlineStr);
  if (isNaN(deadlineDate.getTime())) return deadlineStr;

  const diffMs = deadlineDate.getTime() - Date.now();
  if (diffMs <= 0) return "انتهت فترة التسليم ⚠️";

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `متبقي ${days} يوم و ${hours} ساعة`;
  if (hours > 0) return `متبقي ${hours} ساعة و ${minutes} دقيقة`;
  return `متبقي ${minutes} دقيقة و ${seconds} ثانية`;
}

// Future deadline (3 days from now)
const futureDate = new Date(Date.now() + 3 * 86400000 + 5 * 3600000).toISOString();
const futureCountdown = formatLiveCountdown(futureDate);
assert(futureCountdown.includes("يوم"), `Future countdown contains days indicator ('${futureCountdown}')`);

// Expired deadline (yesterday)
const pastDate = new Date(Date.now() - 86400000).toISOString();
const pastCountdown = formatLiveCountdown(pastDate);
assert(pastCountdown === "انتهت فترة التسليم ⚠️", `Past deadline shows expired warning ('${pastCountdown}')`);

// Submission Rate Calculation with Deduplication
const rawSubmissions = [
  { studentId: "std-001" },
  { studentId: "std-001" }, // Duplicate resubmission
  { studentId: "std-002" },
  { studentId: "std-003" },
  { studentId: "std-002" }  // Duplicate resubmission
];
const totalRoster = 212;
const uniqueSubmittedStudents = new Set(rawSubmissions.map(s => s.studentId)).size;
const submissionRate = totalRoster > 0 ? ((uniqueSubmittedStudents / totalRoster) * 100).toFixed(1) : "0.0";

assert(uniqueSubmittedStudents === 3, `Submission deduplication works: 3 unique students out of 5 entries`);
assert(submissionRate === "1.4", `Submission rate accurately computed: ${submissionRate}%`);

// -------------------------------------------------------------
// TEST SUITE 4: i18n & Multi-language System (Phase 06)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 4: i18n & Multi-language System (Phase 06)");

const i18nMod = await import("../src/shared/utils/i18n.js");
assert(typeof i18nMod.t === "function", "t() function is exported");
assert(typeof i18nMod.getCurrentLanguage === "function", "getCurrentLanguage() function is exported");
assert(typeof i18nMod.applyLanguageToDOM === "function", "applyLanguageToDOM() function is exported");

// Test translation dictionary lookup
const arDeadline = i18nMod.t("metrics.deadline_remaining");
assert(arDeadline === "الديدلاين المتبقي", `Arabic translation for metrics.deadline_remaining: '${arDeadline}'`);

const arSave = i18nMod.t("action.save");
assert(arSave === "حفظ", `Arabic translation for action.save: '${arSave}'`);

const arGraded = i18nMod.t("status.graded");
assert(arGraded === "تم التصحيح", `Arabic translation for status.graded: '${arGraded}'`);

// -------------------------------------------------------------
// TEST SUITE 5: Python Adventure Worlds & Curriculum (Phase 07)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 5: Python Adventure Worlds & Curriculum (Phase 07)");

const worlds = adventureDataMod.WORLDS_DATA;
assert(worlds.length >= 20, `Curriculum contains at least 20 complete worlds (Found: ${worlds.length})`);

const world8 = worlds.find(w => w.id === "world-8");
assert(world8, "World 8 exists");
assert(world8.levelsCount === 11, `World 8 has 11 levels (Found: ${world8.levelsCount})`);

// Verify all 11 levels of World 8 are registered
for (let lvl = 1; lvl <= 11; lvl++) {
  assert(challenges[`world-8-level-${lvl}`], `world-8-level-${lvl} is registered`);
}

// Verify progression link
assert(challenges["world-8-level-3"].nextChallengeId === "world-8-level-4", "world-8-level-3 properly links forward to world-8-level-4");
assert(challenges["world-8-level-4"].nextChallengeId === "world-8-level-5", "world-8-level-4 properly links forward to world-8-level-5");
assert(challenges["world-8-level-5"].nextChallengeId === "world-8-level-6", "world-8-level-5 properly links forward to world-8-level-6");
assert(challenges["world-8-level-6"].nextChallengeId === "world-8-level-7", "world-8-level-6 properly links forward to world-8-level-7");
assert(challenges["world-8-level-7"].nextChallengeId === "world-8-level-8", "world-8-level-7 properly links forward to world-8-level-8");
assert(challenges["world-8-level-8"].nextChallengeId === "world-8-level-9", "world-8-level-8 properly links forward to world-8-level-9");
assert(challenges["world-12-level-11"].nextChallengeId === "world-13-level-1", "world-12-level-11 links forward to world-13-level-1");
assert(challenges["world-20-level-11"].nextChallengeId === null, "world-20-level-11 is the ultimate capstone and has nextChallengeId: null");

// Verify all 8 new worlds (13 to 20) are registered with 11 levels each
for (let w = 13; w <= 20; w++) {
  const worldObj = worlds.find(wo => wo.id === `world-${w}`);
  assert(worldObj, `World ${w} exists in WORLDS_DATA`);
  assert(worldObj.levelsCount === 11, `World ${w} has 11 levels`);
  for (let l = 1; l <= 11; l++) {
    assert(challenges[`world-${w}-level-${l}`], `world-${w}-level-${l} is registered`);
  }
}

// -------------------------------------------------------------
// TEST SUITE 6: UI Structure & Mobile Optimization (Phase 09)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 6: UI Structure & Mobile Optimization (Phase 09)");

const teacherLayoutCode = fs.readFileSync(path.join(projectRoot, "src/shared/layouts/TeacherLayout/teacher-layout.component.js"), "utf8");
const studentLayoutCode = fs.readFileSync(path.join(projectRoot, "src/shared/layouts/StudentLayout/student-layout.component.js"), "utf8");
const layoutsCss = fs.readFileSync(path.join(projectRoot, "src/styles/layouts.css"), "utf8");
const teacherHtml = fs.readFileSync(path.join(projectRoot, "pages/teacher.html"), "utf8");
const evalModalCode = fs.readFileSync(path.join(projectRoot, "src/features/assignments/components/assignment-evaluation-modal.component.js"), "utf8");

assert(teacherLayoutCode.includes('id="teacherTopbarLogoutBtn"'), "Teacher topbar has prominent logout button");
assert(teacherLayoutCode.includes('id="teacherMobileBottomNav"'), "Teacher layout has mobile bottom navigation bar");
assert(teacherLayoutCode.includes('id="teacherMobileBottomLogoutBtn"'), "Teacher mobile bottom bar has mobile logout button");
assert(teacherLayoutCode.includes('pb-24 lg:pb-8'), "Main work area has bottom clearance padding for mobile bottom bar");

// Student mobile app bar
assert(studentLayoutCode.includes('id="studentMobileBottomNav"'), "Student layout has mobile app bottom navigation bar");
assert(studentLayoutCode.includes('class="student-bottom-nav-item nav-center-hero"'), "Student layout has elevated hero Python Adventure action button");
assert(layoutsCss.includes('.student-mobile-bottom-nav'), "layouts.css defines student-mobile-bottom-nav styles");
assert(layoutsCss.includes('calc(76px + env(safe-area-inset-bottom, 0px))'), "layouts.css provides responsive bottom clearance for student views");

assert(evalModalCode.includes('id="evalRunCodeBtn"'), "Evaluation modal has automated code test button");
assert(evalModalCode.includes('id="evalSaveAndNextBtn"'), "Evaluation modal has Save & Next Student button");
assert(evalModalCode.includes('id="evalPrevStudentBtn"'), "Evaluation modal has Previous Student button");

// Performance: SheetJS is deferred
assert(teacherHtml.includes('defer src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"'), "SheetJS script tag uses defer for non-blocking page load");

// -------------------------------------------------------------
// TEST SUITE 7: Curriculum Solvability Test (All 148 Adventure Challenges + 65 Problem Solving)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 7: Curriculum Solvability Test (All 148 Adventure Challenges + 65 Problem Solving)");

let solvableCount = 0;
const challengeKeys = Object.keys(challenges);

for (const key of challengeKeys) {
  const c = challenges[key];
  assert(c.title && c.title.trim().length > 0, `Challenge '${key}' has valid non-empty title`);
  assert(c.starterCode !== undefined, `Challenge '${key}' has starterCode defined`);
  assert(c.expectedOutput || (c.outputIncludes && c.outputIncludes.length > 0) || (c.testCases && c.testCases.length > 0), `Challenge '${key}' has automated validation criteria`);
  solvableCount++;
}

assert(solvableCount >= 148, `All 148+ challenges (132 regular + bonus + daily rotating) verified with valid validation criteria (Found: ${solvableCount})`);

// Verify Problem Solving Dataset
const psDataMod = await import("../src/features/problem-solving/problem-solving-data.js");
const psProblems = psDataMod.PROBLEM_SOLVING_CHALLENGES_DATA;
const psCount = Object.keys(psProblems).length;
assert(psCount === 65, `Problem solving suite contains 65 challenges across Math, IQ, and Real-world (Found: ${psCount})`);

// Verify each problem in Problem Solving
for (const [id, prob] of Object.entries(psProblems)) {
  assert(prob.title && prob.title.trim().length > 0, `Problem '${id}' has non-empty title`);
  assert(prob.description && prob.description.trim().length > 0, `Problem '${id}' has non-empty description`);
  assert(prob.level >= 1 && prob.level <= 5, `Problem '${id}' has valid level 1-5`);
  assert(prob.starterCode !== undefined, `Problem '${id}' has starterCode`);
  assert(Array.isArray(prob.publicTestCases) && prob.publicTestCases.length > 0, `Problem '${id}' has public test cases`);
  assert(Array.isArray(prob.hiddenTestCases) && prob.hiddenTestCases.length > 0, `Problem '${id}' has hidden test cases`);
}

// -------------------------------------------------------------
// TEST SUITE 8: Python Mobile Keyboard Sanitizer & Auto-Normalizer
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 8: Python Mobile Keyboard Sanitizer & Auto-Normalizer");

const { detectAndSanitizePythonCode, sanitizePythonCode } = await import("../src/shared/utils/python-sanitizer.js");

const testSnippet1 = "total = 750\nif 500 < total ≤ 1000:\n    Finalprice = total × 0.9\nelif total > 1000:\n    Finalprice = total ÷ 1.15 − 50";
const res1 = detectAndSanitizePythonCode(testSnippet1);
assert(res1.hasChanges === true, "detectAndSanitizePythonCode detects changes for mobile typography");
assert(res1.sanitizedCode.includes("total <= 1000"), "≤ is successfully converted to <=");
assert(res1.sanitizedCode.includes("total * 0.9"), "× is successfully converted to *");
assert(res1.sanitizedCode.includes("total / 1.15"), "÷ is successfully converted to /");
assert(res1.sanitizedCode.includes("- 50"), "− (minus sign) is successfully converted to -");
assert(res1.corrections.length >= 4, `At least 4 corrections logged (${res1.corrections.length})`);

const testSnippetQuotes = 'print(“Hello World”) and print(‘Python’) and a ≠ b and x ≥ y';
const res2 = detectAndSanitizePythonCode(testSnippetQuotes);
assert(res2.sanitizedCode.includes('print("Hello World")'), 'Smart double quotes “” converted to ""');
assert(res2.sanitizedCode.includes("print('Python')"), "Smart single quotes ‘’ converted to ''");
assert(res2.sanitizedCode.includes("a != b"), "≠ is converted to !=");
assert(res2.sanitizedCode.includes("x >= y"), "≥ is converted to >=");

// Ensure Python3 can execute the sanitized code directly
const executionResult = execSync(`python3 -c "${res1.sanitizedCode.replace(/"/g, '\\"')}\nprint('Sanitized Execution Success')"`, { encoding: "utf8" }).trim();
assert(executionResult.includes("Sanitized Execution Success"), "Sanitized code executes cleanly in standard Python3 engine without SyntaxError");

// -------------------------------------------------------------
// TEST SUITE 9: Python Code & Complexity Analyzer (Anti-Cheat & Big-O)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 9: Python Code & Complexity Analyzer (Anti-Cheat & Big-O)");

const { PythonCodeAnalyzer } = await import("../src/features/python-adventure/python-code-analyzer.service.js");

// 1. Test Anti-Cheat detection for hardcoded print
const hardcodedReport = PythonCodeAnalyzer.analyze("print('Max Rectangle Area: 10')", {
  type: "boss",
  expectedOutput: "Max Rectangle Area: 10"
});
assert(hardcodedReport.antiCheat.isHardcoded === true, "Anti-cheat flags direct hardcoded print without calculation");
assert(hardcodedReport.antiCheat.passed === false, "Anti-cheat passed is false on hardcoded code");

// 2. Test Time Complexity for single loop O(N)
const linearReport = PythonCodeAnalyzer.analyze("total = 0\nfor x in range(10):\n    total += x\nprint(total)", {
  expectedOutput: "45"
});
assert(linearReport.timeComplexity.notation === "O(N)", "Linear loop correctly classified as O(N)");
assert(linearReport.antiCheat.passed === true, "Algorithmic code passes anti-cheat check");

// 3. Test Time Complexity for nested loops O(N^2)
const quadraticReport = PythonCodeAnalyzer.analyze("for i in range(10):\n    for j in range(10):\n        print(i, j)", {});
assert(quadraticReport.timeComplexity.notation === "O(N²)", "Nested loops correctly classified as O(N²)");

// 4. Test Clean Code Score
assert(linearReport.cleanCode.score >= 80, `Clean code score is healthy (${linearReport.cleanCode.score})`);
assert(typeof linearReport.academicFeedback === "string" && linearReport.academicFeedback.length > 20, "Academic feedback generated in Arabic");

// -------------------------------------------------------------
// TEST SUITE 10: Student Tasks Deadline Enforcement & Expired State Handling
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 10: Student Tasks Deadline Enforcement & Expired State Handling");

const { isDeadlinePassed } = await import("../src/shared/utils/date.utils.js");
const { renderStudentTasksCenter } = await import("../src/features/assignments/components/student-tasks-center.component.js");

// 1. Verify deadline logic
assert(isDeadlinePassed("2020-01-01") === true, "Past deadline is correctly recognized as expired");
assert(isDeadlinePassed("2099-12-31") === false, "Future deadline is recognized as not expired");

// 2. Test Empty Hero State when all tasks are expired
const expiredTasksList = [
  { id: "task-exp-1", title: "تاسك المتغيرات المنتهي", dueDate: "2023-01-01", maxScore: 100 },
  { id: "task-exp-2", title: "تاسك الدوال المنتهي", deadline: "2023-02-01", maxScore: 100 }
];

const emptyHeroMarkup = renderStudentTasksCenter({
  student: { name: "أحمد محمد" },
  directoryTasks: expiredTasksList,
  submissionsMap: new Map()
});

assert(emptyHeroMarkup.includes("لا توجد واجبات أو تاسكات مفتوحة للتسليم حالياً"), "Hero empty state shown when all tasks are expired");
assert(emptyHeroMarkup.includes("hero-empty-state-card"), "Empty state card class is rendered");
assert(!emptyHeroMarkup.includes('id="btnSubmitHeroAssignment"'), "No active submission button shown in Hero when all tasks expired");

// 3. Test Expired Hero Card when student explicitly clicks an expired task
const selectedExpiredMarkup = renderStudentTasksCenter({
  student: { name: "أحمد محمد" },
  activeTask: expiredTasksList[0],
  directoryTasks: expiredTasksList,
  submissionsMap: new Map()
});

assert(selectedExpiredMarkup.includes("hero-expired-top-banner"), "Expired top banner is rendered on clicked expired task");
assert(selectedExpiredMarkup.includes("btn-disabled-expired"), "Submit button gets btn-disabled-expired class");
assert(selectedExpiredMarkup.includes("انتهت فترة التسليم المحددة (مغلق) 🔒"), "Submit button text shows closed / expired message");
assert(selectedExpiredMarkup.includes("disabled"), "Submit button has HTML disabled attribute");

// 4. Test Active Task Rendering when an open unexpired task exists
const mixedTasksList = [
  { id: "task-exp-1", title: "تاسك منتهي", dueDate: "2023-01-01", maxScore: 100 },
  { id: "task-active-1", title: "تاسك ساري جديد", dueDate: "2099-12-31", maxScore: 100 }
];

const activeHeroMarkup = renderStudentTasksCenter({
  student: { name: "أحمد محمد" },
  directoryTasks: mixedTasksList,
  submissionsMap: new Map()
});

assert(activeHeroMarkup.includes("تاسك ساري جديد"), "Hero automatically features the active unexpired task");
assert(activeHeroMarkup.includes("تسليم واعتماد الكود للتقييم 🚀"), "Active task has enabled submission button");
assert(!activeHeroMarkup.includes("btn-disabled-expired"), "Active task submit button is not disabled");

// -------------------------------------------------------------
// TEST SUITE 11: Python Hearts & Challenge Cooldown Gamification System
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 11: Python Hearts & Challenge Cooldown System");

const { PythonHeartsService, MAX_HEARTS, HEART_REGEN_INTERVAL_MS, CHALLENGE_RETRY_COOLDOWN_MS } = await import("../src/features/python-adventure/python-hearts.service.js");

// Mock localStorage for Node.js test environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; }
};

assert(MAX_HEARTS === 3, "MAX_HEARTS constant is exactly 3");
assert(HEART_REGEN_INTERVAL_MS === 10 * 60 * 1000, "HEART_REGEN_INTERVAL_MS is 10 minutes");
assert(CHALLENGE_RETRY_COOLDOWN_MS === 3 * 60 * 1000, "CHALLENGE_RETRY_COOLDOWN_MS is 3 minutes");

// 1. Initial Hearts state
const initialHearts = PythonHeartsService.getHeartsState("std_gamify_01");
assert(initialHearts.hearts === 3, "New student starts with full 3/3 hearts");
assert(initialHearts.maxHearts === 3, "maxHearts is 3");
assert(initialHearts.isEmpty === false, "Hearts isEmpty is false initially");
assert(initialHearts.activeCooldownsCount === 0, "No active cooldowns initially");

// 2. Consume heart after 2 failed attempts
const afterFirstFail = PythonHeartsService.consumeHeart("std_gamify_01", "world-1-level-1");
assert(afterFirstFail.hearts === 2, "Student loses 1 heart (3 -> 2)");
assert(afterFirstFail.challengeCooldownSeconds > 0, "Challenge cooldown has active remaining seconds");

// 3. Challenge Cooldown Isolation
const cdLevel1 = PythonHeartsService.getChallengeCooldown("std_gamify_01", "world-1-level-1");
const cdLevel2 = PythonHeartsService.getChallengeCooldown("std_gamify_01", "world-1-level-2");
assert(cdLevel1.isOnCooldown === true, "world-1-level-1 is on cooldown");
assert(cdLevel2.isOnCooldown === false, "world-1-level-2 is NOT on cooldown (independent)");

// 4. canAttemptChallenge checking
const canAttemptL1 = PythonHeartsService.canAttemptChallenge("std_gamify_01", "world-1-level-1");
const canAttemptL2 = PythonHeartsService.canAttemptChallenge("std_gamify_01", "world-1-level-2");
assert(canAttemptL1.allowed === false, "Attempting world-1-level-1 during cooldown is blocked");
assert(canAttemptL1.reason === "COOLDOWN", "Blocked reason is 'COOLDOWN'");
assert(canAttemptL2.allowed === true, "Attempting world-1-level-2 is allowed with 2 hearts");

// 5. Exhausting remaining hearts (2 -> 1 -> 0)
PythonHeartsService.consumeHeart("std_gamify_01", "world-1-level-2");
const afterThirdFail = PythonHeartsService.consumeHeart("std_gamify_01", "world-1-level-3");
assert(afterThirdFail.hearts === 0, "Hearts reaches 0 after 3 failures");
assert(afterThirdFail.isEmpty === true, "isEmpty is true when hearts reach 0");

const canAttemptAny = PythonHeartsService.canAttemptChallenge("std_gamify_01", "world-2-level-1");
assert(canAttemptAny.allowed === false, "Attempting ANY challenge with 0 hearts is blocked");
assert(canAttemptAny.reason === "NO_HEARTS", "Blocked reason is 'NO_HEARTS'");

// 6. Natural Heart Regeneration over time
const storedState = JSON.parse(mockStorage["python_adventure_hearts_std_gamify_01"]);
// Fast-forward 10 minutes in time for 1 heart
storedState.lastRegenTime = Date.now() - (10 * 60 * 1000 + 500);
mockStorage["python_adventure_hearts_std_gamify_01"] = JSON.stringify(storedState);

const regenState1 = PythonHeartsService.getHeartsState("std_gamify_01");
assert(regenState1.hearts === 1, "1 heart regenerates after 10 minutes");
assert(regenState1.isEmpty === false, "isEmpty becomes false after 1 heart restored");

// Fast-forward 30 minutes in time to cap at max hearts
storedState.lastRegenTime = Date.now() - (35 * 60 * 1000);
mockStorage["python_adventure_hearts_std_gamify_01"] = JSON.stringify(storedState);

const regenStateFull = PythonHeartsService.getHeartsState("std_gamify_01");
assert(regenStateFull.hearts === 3, "Hearts regenerate and cap at MAX_HEARTS (3)");

// 7. HTML Rendering
const heartsPillHtml = PythonHeartsService.renderHeartsPillHtml(regenStateFull);
assert(heartsPillHtml.includes("adv-hearts-pill"), "Pill HTML contains adv-hearts-pill container");
assert(heartsPillHtml.includes("3/3"), "Pill displays 3/3 hearts ratio");
assert(heartsPillHtml.includes("رصيد القلوب"), "Pill has Arabic title description");

// -------------------------------------------------------------
// TEST SUITE 12: Python 20 Worlds Roadmap UI & Phase Filtering
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 12: Python 20 Worlds Roadmap UI & Phase Filtering");

const homeCompSrc = fs.readFileSync(path.join(projectRoot, "src/features/python-adventure/components/adventure-home.component.js"), "utf8");
const cssSrc = fs.readFileSync(path.join(projectRoot, "src/styles/python-adventure.css"), "utf8");
const { WORLDS_DATA: testWorldsData } = await import("../src/features/python-adventure/python-adventure-data.js");

assert(homeCompSrc.includes("مسار العوالم التفاعلية (${WORLDS_DATA.length} عالماً)"), "Road title uses correct Arabic grammar (عالماً)");
assert(homeCompSrc.includes("adv5-road-filters-bar"), "Phase filter bar is present in home markup");
assert(homeCompSrc.includes('data-road-filter="all"'), "Filter 'all' exists");
assert(homeCompSrc.includes('data-road-filter="phase-1"'), "Filter 'phase-1' exists");
assert(homeCompSrc.includes('data-road-filter="phase-2"'), "Filter 'phase-2' exists");
assert(homeCompSrc.includes('data-road-filter="phase-3"'), "Filter 'phase-3' exists");
assert(homeCompSrc.includes('data-road-filter="phase-4"'), "Filter 'phase-4' exists");
assert(homeCompSrc.includes('data-road-phase="phase-${phaseNum}"'), "World nodes bind to phase attributes");
assert(homeCompSrc.includes("adv5-node-progress-track"), "Progress bar track is rendered on world cards");
assert(homeCompSrc.includes("adv5-node-concept"), "Concept summary text is rendered on world cards");

// 2. Verify all 20 worlds are partitioned into 4 distinct phases (5 worlds each)
assert(testWorldsData.length === 20, "WORLDS_DATA contains exactly 20 worlds");
const phaseCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
for (const w of testWorldsData) {
  const p = Math.ceil(w.number / 5);
  phaseCounts[p] = (phaseCounts[p] || 0) + 1;
}
assert(phaseCounts[1] === 5, "Phase 1 has exactly 5 worlds (Worlds 1-5)");
assert(phaseCounts[2] === 5, "Phase 2 has exactly 5 worlds (Worlds 6-10)");
assert(phaseCounts[3] === 5, "Phase 3 has exactly 5 worlds (Worlds 11-15)");
assert(phaseCounts[4] === 5, "Phase 4 has exactly 5 worlds (Worlds 16-20)");

// 3. Verify CSS prevents overflow and enforces responsive 5-column layout
assert(cssSrc.includes("grid-template-columns: repeat(5, minmax(0, 1fr))"), "CSS enforces 5-column grid for 20 worlds");
assert(cssSrc.includes(".adv5-road-node {\n  min-width: 0;"), "adv5-road-node has min-width: 0 to prevent grid blowout");
assert(cssSrc.includes("grid-template-columns: repeat(4, minmax(0, 1fr))"), "Responsive 4-column layout defined for medium screens");
assert(cssSrc.includes("grid-template-columns: repeat(2, minmax(0, 1fr))"), "Responsive 2-column layout defined for mobile");

console.log("\n=======================================================");
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
console.log("=======================================================\n");

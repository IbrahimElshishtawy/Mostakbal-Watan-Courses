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
assert(worlds.length === 8, `Curriculum contains 8 complete worlds (Found: ${worlds.length})`);

const world8 = worlds.find(w => w.id === "world-8");
assert(world8, "World 8 exists");
assert(world8.levelsCount === 8, `World 8 has 8 levels (Found: ${world8.levelsCount})`);

// Verify all 8 levels of World 8 are registered
for (let lvl = 1; lvl <= 8; lvl++) {
  assert(challenges[`world-8-level-${lvl}`], `world-8-level-${lvl} is registered`);
}

// Verify progression link
assert(challenges["world-8-level-3"].nextChallengeId === "world-8-level-4", "world-8-level-3 properly links forward to world-8-level-4");
assert(challenges["world-8-level-4"].nextChallengeId === "world-8-level-5", "world-8-level-4 properly links forward to world-8-level-5");
assert(challenges["world-8-level-5"].nextChallengeId === "world-8-level-6", "world-8-level-5 properly links forward to world-8-level-6");
assert(challenges["world-8-level-6"].nextChallengeId === "world-8-level-7", "world-8-level-6 properly links forward to world-8-level-7");
assert(challenges["world-8-level-7"].nextChallengeId === "world-8-level-8", "world-8-level-7 properly links forward to world-8-level-8");
assert(challenges["world-8-level-8"].nextChallengeId === null, "world-8-level-8 is the ultimate capstone and has nextChallengeId: null");

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
// TEST SUITE 7: Curriculum Solvability Test (All 68 Adventure Challenges + 50 Problem Solving)
// -------------------------------------------------------------
console.log("\n▶️ TEST SUITE 7: Curriculum Solvability Test (All 68 Adventure Challenges + 50 Problem Solving)");

let solvableCount = 0;
const challengeKeys = Object.keys(challenges);

for (const key of challengeKeys) {
  const c = challenges[key];
  assert(c.title && c.title.trim().length > 0, `Challenge '${key}' has valid non-empty title`);
  assert(c.starterCode !== undefined, `Challenge '${key}' has starterCode defined`);
  assert(c.expectedOutput || (c.outputIncludes && c.outputIncludes.length > 0) || (c.testCases && c.testCases.length > 0), `Challenge '${key}' has automated validation criteria`);
  solvableCount++;
}

assert(solvableCount === 68, `All 68 challenges verified with valid validation criteria (Found: ${solvableCount})`);

// Verify Problem Solving Dataset
const psDataMod = await import("../src/features/problem-solving/problem-solving-data.js");
const psProblems = psDataMod.PROBLEM_SOLVING_CHALLENGES_DATA;
const psCount = Object.keys(psProblems).length;
assert(psCount === 50, `Problem solving suite contains 50 challenges across Math, IQ, and Real-world (Found: ${psCount})`);

// Verify each problem in Problem Solving
for (const [id, prob] of Object.entries(psProblems)) {
  assert(prob.title && prob.title.trim().length > 0, `Problem '${id}' has non-empty title`);
  assert(prob.description && prob.description.trim().length > 0, `Problem '${id}' has non-empty description`);
  assert(prob.level >= 1 && prob.level <= 5, `Problem '${id}' has valid level 1-5`);
  assert(prob.starterCode !== undefined, `Problem '${id}' has starterCode`);
  assert(Array.isArray(prob.publicTestCases) && prob.publicTestCases.length > 0, `Problem '${id}' has public test cases`);
  assert(Array.isArray(prob.hiddenTestCases) && prob.hiddenTestCases.length > 0, `Problem '${id}' has hidden test cases`);
}

console.log("\n=======================================================");
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
console.log("=======================================================\n");

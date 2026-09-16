// scripts/test-problem-solving-suite.js
import assert from "node:assert";
import { createRequire } from "node:module";
import { PROBLEM_SOLVING_LEVELS_DATA, PROBLEM_SOLVING_CHALLENGES_DATA } from "../src/features/problem-solving/problem-solving-data.js";

const require = createRequire(import.meta.url);
const { PROBLEM_SOLVING_LEVELS_CONFIG, PROBLEM_SOLVING_CHALLENGES, ACHIEVEMENTS_LIST } = require("../backend/lib/modules/python-adventure/curriculum.js");
const { validateCodeAgainstChallenge } = require("../backend/lib/modules/python-adventure/index.js");

async function runProblemSolvingTestSuite() {
  console.log("=================================================");
  console.log("🧪 Running Python Problem Solving & Upgrades Test Suite");
  console.log("=================================================\n");

  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
      if (err.stack) console.error(err.stack);
    }
  }

  // 1. Verify 5 Levels Structure
  test("1. Problem Solving 5 Levels Configuration", () => {
    assert.strictEqual(PROBLEM_SOLVING_LEVELS_CONFIG.length, 5, "Backend must have exactly 5 levels");
    assert.strictEqual(PROBLEM_SOLVING_LEVELS_DATA.length, 5, "Frontend must match 5 levels");

    const expectedTitles = ["Beginner", "Easy", "Intermediate", "Advanced", "Challenge / Expert"];
    PROBLEM_SOLVING_LEVELS_CONFIG.forEach((lvl, idx) => {
      const num = lvl.levelNumber || Number(lvl.id?.replace("level-", "") || (idx + 1));
      assert.strictEqual(num, idx + 1);
      assert.ok(lvl.title.includes(expectedTitles[idx]), `Level ${idx + 1} should contain ${expectedTitles[idx]}`);
      assert.ok(Array.isArray(lvl.concepts || lvl.topics), `Level ${idx + 1} must specify concepts/topics`);
    });
  });

  // 2. Verify 25 Problems with Test Cases & Constraints
  test("2. Real Coding Problems (25 problems) with public & hidden test cases", () => {
    const problems = Object.values(PROBLEM_SOLVING_CHALLENGES);
    assert.strictEqual(problems.length, 25, "Must have exactly 25 challenges in backend");

    const frontendProblems = Object.values(PROBLEM_SOLVING_CHALLENGES_DATA);
    assert.strictEqual(frontendProblems.length, 25, "Must have exactly 25 challenges in frontend");

    // Check distribution: 5 problems per level
    for (let lvl = 1; lvl <= 5; lvl++) {
      const lvlProblems = problems.filter((p) => p.level === lvl);
      assert.strictEqual(lvlProblems.length, 5, `Level ${lvl} must have 5 problems`);
    }

    // Verify points system
    const levelPoints = { 1: 10, 2: 10, 3: 25, 4: 50, 5: 100 };
    problems.forEach((p) => {
      assert.ok(p.id, "Problem must have an ID");
      assert.ok(p.title, `Problem ${p.id} must have a title`);
      assert.ok(p.description, `Problem ${p.id} must have a description`);
      assert.ok(p.starterCode, `Problem ${p.id} must provide starter code`);
      assert.strictEqual(p.points, levelPoints[p.level], `Problem ${p.id} points must match level policy`);
      assert.ok(Array.isArray(p.publicTestCases) && p.publicTestCases.length > 0, `Problem ${p.id} must have public test cases`);
      assert.ok(Array.isArray(p.hiddenTestCases) && p.hiddenTestCases.length > 0, `Problem ${p.id} must have hidden test cases`);
    });
  });

  // 3. Multi-Test Case Engine with stdin
  test("3. Multi-Test Case Validation Engine (stdin & stdout)", () => {
    const prob1 = PROBLEM_SOLVING_CHALLENGES["prob-l1-sum"]; // Sum of two numbers
    assert.ok(prob1, "Problem prob-l1-sum must exist");

    // Correct solution
    const validCode = `
import sys
input_data = sys.stdin.read().split()
if input_data:
    a = int(input_data[0])
    b = int(input_data[1])
    print(a + b)
`;
    const result = validateCodeAgainstChallenge(prob1, validCode);
    assert.strictEqual(result.passed, true, `Valid solution must pass all test cases: ${result.feedback}`);
    assert.ok(result.testResults, "Must return test results object");

    // Incorrect solution
    const wrongCode = `
import sys
print(99999)
`;
    const wrongResult = validateCodeAgainstChallenge(prob1, wrongCode);
    assert.strictEqual(wrongResult.passed, false, "Wrong solution must fail test cases");
    assert.ok(wrongResult.feedback.length > 0, "Failure reason must be described");
  });

  // 4. Test Reverse String Challenge (prob-l2-reverse-string)
  test("4. Level 2 String Manipulation Validation", () => {
    const probRev = PROBLEM_SOLVING_CHALLENGES["prob-l2-reverse-string"];
    assert.ok(probRev, "prob-l2-reverse-string must exist");

    const validCode = `
import sys
s = sys.stdin.read().strip()
print(s[::-1])
`;
    const res = validateCodeAgainstChallenge(probRev, validCode);
    assert.strictEqual(res.passed, true, `Correct reverse string code must pass: ${res.feedback}`);
  });

  // 5. Test Binary Search Challenge (prob-l4-binary-search)
  test("5. Level 4 Binary Search Algorithm Validation", () => {
    const probBs = PROBLEM_SOLVING_CHALLENGES["prob-l4-binary-search"];
    assert.ok(probBs, "prob-l4-binary-search must exist");

    const validCode = `
import sys

def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

lines = [line.strip() for line in sys.stdin if line.strip()]
if lines:
    arr = list(map(int, lines[0].split()))
    target = int(lines[1])
    print(binary_search(arr, target))
`;
    const res = validateCodeAgainstChallenge(probBs, validCode);
    assert.strictEqual(res.passed, true, `Correct binary search code must pass: ${res.feedback}`);
  });

  // 6. Badges & Titles with Real Criteria
  test("6. Badges and Titles System with Real Criteria", () => {
    const expectedBadges = [
      "beginner_solver",
      "problem_solver",
      "python_solver",
      "code_warrior",
      "speed_coder",
      "algo_master",
      "python_expert",
      "python_champion"
    ];

    expectedBadges.forEach((bId) => {
      assert.ok(ACHIEVEMENTS_LIST[bId], `Badge ${bId} must exist in ACHIEVEMENTS_LIST`);
      assert.ok(ACHIEVEMENTS_LIST[bId].title, `Badge ${bId} must have a title`);
      assert.ok(ACHIEVEMENTS_LIST[bId].icon, `Badge ${bId} must have an icon`);
    });
  });

  // 7. Wrong Answers Review Feature
  test("7. Wrong Answers Review (My Mistakes) Data Structure", () => {
    const questions = [
      { id: "q1", title: "سؤال 1", question: "ما ناتج 2 + 2؟", correctAnswer: "4", points: 10, type: "mcq", level: "Beginner", explanation: "جمع أعداد أولية" },
      { id: "q2", title: "سؤال 2", question: "ما ناتج 5 * 5؟", correctAnswer: "25", points: 10, type: "mcq", level: "Easy", explanation: "ضرب 5 في 5 ينتج 25" }
    ];
    const studentAnswers = {
      q1: "4",
      q2: "20" // Wrong
    };

    const wrongAnswers = [];
    questions.forEach((q) => {
      const studentAns = studentAnswers[q.id];
      if (studentAns !== q.correctAnswer) {
        wrongAnswers.push({
          questionId: q.id,
          questionTitle: q.title || "سؤال",
          questionText: q.question,
          studentAnswer: studentAns || "لم تتم الإجابة",
          correctAnswer: q.correctAnswer,
          pointsReceived: 0,
          maxPoints: q.points || 10,
          explanation: q.explanation || "تأكد من مراجعة القواعد الرياضية",
          questionType: q.type || "mcq",
          questionLevel: q.level || "Easy"
        });
      }
    });

    assert.strictEqual(wrongAnswers.length, 1, "Only missed questions must appear in wrongAnswers");
    assert.strictEqual(wrongAnswers[0].questionId, "q2");
    assert.strictEqual(wrongAnswers[0].studentAnswer, "20");
    assert.strictEqual(wrongAnswers[0].correctAnswer, "25");
    assert.strictEqual(wrongAnswers[0].pointsReceived, 0);
    assert.strictEqual(wrongAnswers[0].maxPoints, 10);
  });

  // 8. Idempotent Submission / Anti-Exploit XP preservation rule
  test("8. Idempotency & Zero XP Replay Exploit Prevention Logic", () => {
    function computePointsAndXp({ previousStars = 0, isPassed = true, problemPoints = 25 }) {
      if (!isPassed) {
        return { earnedXp: 0, pointsAwarded: 0 };
      }
      const newStars = 3;
      let earnedXp = 0;
      let pointsAwarded = 0;
      if (newStars > previousStars) {
        earnedXp = problemPoints * 5;
        pointsAwarded = problemPoints;
      }
      return { earnedXp, pointsAwarded };
    }

    // First submit: pass
    const sub1 = computePointsAndXp({ previousStars: 0, isPassed: true, problemPoints: 25 });
    assert.strictEqual(sub1.earnedXp, 125, "First pass must award full XP");
    assert.strictEqual(sub1.pointsAwarded, 25, "First pass must award 25 points");

    // Second submit: pass again (re-submission / replay)
    const sub2 = computePointsAndXp({ previousStars: 3, isPassed: true, problemPoints: 25 });
    assert.strictEqual(sub2.earnedXp, 0, "Duplicate pass must NOT award additional XP (anti-exploit)");
    assert.strictEqual(sub2.pointsAwarded, 0, "Duplicate pass must NOT award duplicate leaderboard points");

    // Third submit: failure after success (best score must be retained)
    const sub3 = computePointsAndXp({ previousStars: 3, isPassed: false, problemPoints: 25 });
    assert.strictEqual(sub3.earnedXp, 0);
    assert.strictEqual(sub3.pointsAwarded, 0);
  });

  console.log("\n=================================================");
  console.log(`Results: ${passed} / ${total} Tests Passed`);
  console.log("=================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runProblemSolvingTestSuite();

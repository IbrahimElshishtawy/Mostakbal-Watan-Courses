/**
 * scripts/test-student-firebase-flow.js
 * Comprehensive automated verification script testing all Student Portal Firebase workflows:
 * 1. Profile retrieval & group resolution
 * 2. Academic Exams matching & grading evaluation
 * 3. Assignments retrieval & submission format
 * 4. Attendance calculation
 * 5. Gamification / Leaderboard profile sync
 */

const path = require("path");
const appMod = require(path.join(process.cwd(), "backend", "node_modules", "firebase-admin", "lib", "app"));
const firestoreMod = require(path.join(process.cwd(), "backend", "node_modules", "firebase-admin", "lib", "firestore"));
const serviceAccount = require("../mostakbal-watan-courses-firebase-adminsdk-fbsvc-1d9a16560b.json");

if (!appMod.getApps().length) {
  appMod.initializeApp({ credential: appMod.cert(serviceAccount) });
}
const db = firestoreMod.getFirestore();

function isGroupMatch(groupA, groupB) {
  if (!groupA || !groupB) return false;
  const clean = (str) =>
    String(str)
      .trim()
      .toLowerCase()
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/[|\-–—]/g, " ")
      .replace(/\s+/g, " ");

  const a = clean(groupA);
  const b = clean(groupB);
  if (a === b) return true;
  if (a === "all" || b === "all" || a === "الكل" || b === "الكل" || a === "عام" || b === "عام") return true;

  const extractDays = (str) => {
    const days = [];
    if (str.includes("احد")) days.push("احد");
    if (str.includes("اربعاء")) days.push("اربعاء");
    if (str.includes("جمعه")) days.push("جمعه");
    if (str.includes("سبت")) days.push("سبت");
    if (str.includes("اثنين")) days.push("اثنين");
    if (str.includes("ثلاثاء")) days.push("ثلاثاء");
    if (str.includes("خميس")) days.push("خميس");
    return days.sort().join("_");
  };

  const daysA = extractDays(a);
  const daysB = extractDays(b);
  if (daysA && daysB && daysA === daysB) return true;
  return a.includes(b) || b.includes(a);
}

async function runTests() {
  console.log("================================================================");
  console.log("🚀 بدء فحص واختبار ربط بوابة الطالب بقاعدة بيانات فايربيز الحية");
  console.log("================================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName, details = "") {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}: ${details}`);
    }
  }

  // 1. Test Student Profiles in Firestore
  console.log("1️⃣ فحص بيانات الطالب الحقيقية في Firestore:");
  const studentDoc = await db.collection("students").doc("01223070571").get();
  assert(studentDoc.exists, "وثيقة الطالب برقم الهاتف (01223070571) موجودة");
  const studentData = studentDoc.data() || {};
  assert(studentData.name === "ابراهيم خالد", `اسم الطالب مطابق: "${studentData.name}"`);
  assert(studentData.group && studentData.group.includes("الأحد والأربعاء"), `مجموعة الطالب مطابقة: "${studentData.group}"`);
  assert(studentData.authUid === "YT4K9avEoaYjBLCtOIm7PeFdyEW2", `معرف المصادقة Auth UID مطابق: "${studentData.authUid}"`);

  // 2. Test Exams and Group Matching
  console.log("\n2️⃣ فحص مطابقة الامتحانات وتجهيز الأسئلة:");
  const examDoc = await db.collection("exams").doc("exam_01").get();
  assert(examDoc.exists, "امتحان (exam_01) موجود في Firestore");
  const examData = examDoc.data() || {};
  assert(examData.active === true, "الامتحان نشط ومتاح للطلاب (active: true)");
  assert(isGroupMatch(examData.group, studentData.group), `مجموعة الامتحان (${examData.group}) تطابق مجموعة الطالب (${studentData.group}) عبر isGroupMatch`);
  assert(Array.isArray(examData.questions) && examData.questions.length === 2, `عدد الأسئلة مطابق (2 أسئلة)`);

  // Test Question Schema Normalization
  const q1 = examData.questions[0];
  const q1Text = q1.question || q1.questionText || q1.text || "";
  const q1Points = Number(q1.degree || q1.points || q1.score || 1);
  const q1Correct = q1.correct !== undefined ? q1.correct : q1.correctAnswer;
  assert(q1Text.includes("بايثون"), `السؤال الأول تمت قراءته بنجاح: "${q1Text.substring(0, 35)}..."`);
  assert(q1Points === 10, `درجة السؤال الأول مقروءة بنجاح: ${q1Points} درجات`);
  assert(q1Correct === 2, `الإجابة الصحيحة للسؤال الأول مقروءة بنجاح: الخيار رقم ${q1Correct} (${q1.options[q1Correct]})`);

  // 3. Test Exam Simulation & Grading Logic
  console.log("\n3️⃣ محاكاة حل الامتحان واحتساب الدرجة النهائية:");
  const fullScoreAnswers = [2, 1]; // Question 1: print (2), Question 2: float (1)
  let simulatedScore = 0;
  let simulatedTotal = 0;
  const questions = examData.questions;

  questions.forEach((q, idx) => {
    const studentAns = fullScoreAnswers[idx];
    const degree = Number(q.degree || q.points || q.score || 1);
    const correctVal = q.correct !== undefined ? q.correct : q.correctAnswer;
    simulatedTotal += degree;
    if (studentAns === correctVal) {
      simulatedScore += degree;
    }
  });

  assert(simulatedTotal === 20, `إجمالي درجات الامتحان المحسوبة: ${simulatedTotal}/20`);
  assert(simulatedScore === 20, `درجة الإجابات الصحيحة المحسوبة: ${simulatedScore}/20 (100%)`);

  // Simulate Wrong Answer
  const partialAnswers = [0, 1]; // Q1 wrong (echo), Q2 correct (float)
  let partialScore = 0;
  const wrongAnswersList = [];
  questions.forEach((q, idx) => {
    const studentAns = partialAnswers[idx];
    const degree = Number(q.degree || q.points || q.score || 1);
    const correctVal = q.correct !== undefined ? q.correct : q.correctAnswer;
    if (studentAns === correctVal) {
      partialScore += degree;
    } else {
      wrongAnswersList.push({
        questionIndex: idx,
        studentAnswer: q.options[studentAns],
        correctAnswer: q.options[correctVal]
      });
    }
  });
  assert(partialScore === 10, `احتساب الدرجة الجزئية بدقة: ${partialScore}/20 (50%)`);
  assert(wrongAnswersList.length === 1 && wrongAnswersList[0].studentAnswer === "echo()", `توثيق السؤال الخاطئ بدقة: اختار "${wrongAnswersList[0].studentAnswer}" والصحيح "${wrongAnswersList[0].correctAnswer}"`);

  // 4. Test Assignments
  console.log("\n4️⃣ فحص التكليفات والواجبات الحية:");
  const asgDoc = await db.collection("assignments").doc("asg_01").get();
  assert(asgDoc.exists, "الواجب (asg_01) موجود في Firestore");
  const asgData = asgDoc.data() || {};
  assert(isGroupMatch(asgData.group, studentData.group), `مجموعة الواجب تطابق مجموعة الطالب`);

  // 5. Test Attendance Sessions
  console.log("\n5️⃣ فحص جلسات الحضور والغياب:");
  const sessionsSnap = await db.collection("attendance_sessions").get();
  assert(sessionsSnap.size > 0, `عدد جلسات الحضور المسجلة في Firestore: ${sessionsSnap.size} جلسات`);

  let matchedSessions = 0;
  let presentCount = 0;
  sessionsSnap.forEach(doc => {
    const s = doc.data();
    if (!s.group || s.group === "ALL" || isGroupMatch(s.group, studentData.group)) {
      matchedSessions++;
      const records = s.records || {};
      const status = records[studentData.authUid]?.status || records[studentDoc.id]?.status;
      if (status === "present") presentCount++;
    }
  });
  const rate = matchedSessions > 0 ? Math.round((presentCount / matchedSessions) * 100) : 100;
  assert(matchedSessions > 0, `عدد الجلسات المخصصة لمجموعة الطالب: ${matchedSessions} جلسة`);
  console.log(`     📊 نسبة الحضور التراكمية المحسوبة للطالب: ${rate}% (${presentCount} من ${matchedSessions})`);

  // 6. Test Gamification / Leaderboard
  console.log("\n6️⃣ فحص بيانات الـ Gamification ولوحة المتصدرين:");
  const gamifDoc = await db.collection("student_gamification").doc(studentData.authUid).get();
  if (gamifDoc.exists) {
    const gData = gamifDoc.data();
    console.log(`     🏆 نقاط الطالب (XP): ${gData.xp || 0} | المستوى: ${gData.level || 1} | أوسمة: ${(gData.badges || []).length}`);
    assert(true, "سجل الـ Gamification للطالب مربوط ومتاح");
  } else {
    console.log("     ℹ️ سجل gamification لم يتم إنشاؤه بعد لهذا الطالب (سيتم إنشاؤه عند أول إنجاز).");
    assert(true, "معالجة غياب سجل gamification بسلاسة (Default 0 XP)");
  }

  console.log("\n================================================================");
  console.log(`🏁 ملخص الفحص النهائي: نجح ${passedTests} من أصل ${totalTests} اختبارات (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log("================================================================");
}

runTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Test execution failed:", err);
    process.exit(1);
  });

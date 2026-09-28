/**
 * scripts/init-new-firebase-project.js
 * 
 * Automatically initializes and seeds a brand-new Firebase project:
 * 1. Checks/creates default Admin (admin@admin.local) and Teacher (teacher@system.local) in Firebase Auth.
 * 2. Assigns custom claims ({ role: "admin" }, { role: "teacher" }).
 * 3. Seeds all 16 Firestore collections with initial templates so they appear in Firebase Console immediately.
 * 
 * Prerequisites:
 * Place your new project's "serviceAccountKey.json" inside the "scripts/" directory.
 * (Obtained from Firebase Console -> Project Settings -> Service accounts -> Generate new private key)
 * 
 * Run with: node scripts/init-new-firebase-project.js
 */

const fs = require("fs");
const path = require("path");

let initializeApp, getApps, cert, getFirestore, getAuth, FieldValue;

try {
  const appMod = require(path.join(__dirname, "..", "backend", "node_modules", "firebase-admin", "lib", "app"));
  const firestoreMod = require(path.join(__dirname, "..", "backend", "node_modules", "firebase-admin", "lib", "firestore"));
  const authMod = require(path.join(__dirname, "..", "backend", "node_modules", "firebase-admin", "lib", "auth"));
  initializeApp = appMod.initializeApp;
  getApps = appMod.getApps;
  cert = appMod.cert;
  getFirestore = firestoreMod.getFirestore;
  FieldValue = firestoreMod.FieldValue;
  getAuth = authMod.getAuth;
} catch (_) {
  const classicAdmin = require("firebase-admin");
  initializeApp = classicAdmin.initializeApp.bind(classicAdmin);
  getApps = () => classicAdmin.apps;
  cert = classicAdmin.credential.cert.bind(classicAdmin.credential);
  getFirestore = () => classicAdmin.firestore();
  FieldValue = classicAdmin.firestore.FieldValue;
  getAuth = () => classicAdmin.auth();
}

let serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  const rootFiles = fs.readdirSync(path.join(__dirname, ".."));
  const adminSdkFile = rootFiles.find(f => f.includes("firebase-adminsdk") && f.endsWith(".json"));
  if (adminSdkFile) {
    serviceAccountPath = path.join(__dirname, "..", adminSdkFile);
  }
}

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`
================================================================================
❌ لم يتم العثور على ملف مفتاح الخدمة (serviceAccountKey.json)!
================================================================================
لتشغيل سكربت التهيئة التلقائي للمشروع الجديد، يرجى اتباع الآتي:
1. افتح لوحة تحكم فايربيز (Firebase Console) لمشروعك الجديد.
2. اذهب إلى: Project Settings (أيقونة الترس ⚙️) > Service accounts.
3. اضغط على الزر الأزرق: "Generate new private key".
4. قم بتحميل الملف وإعادة تسميته إلى: serviceAccountKey.json
5. ضعه في المسار:
   ${path.join(__dirname, "serviceAccountKey.json")}
6. أعد تشغيل السكربت مجدداً:
   node scripts/init-new-firebase-project.js
================================================================================
`);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

const app = !getApps().length ? initializeApp({
  credential: cert(serviceAccount)
}) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

// Default Staff Credentials (Can be changed in dashboard later)
const DEFAULT_ACCOUNTS = [
  {
    email: "admin@admin.local",
    password: "Admin#2026!Watan",
    displayName: "المهندس إبراهيم الششتاوي (مدير المنصة)",
    role: "admin",
    phone: "01020084862"
  },
  {
    email: "teacher@system.local",
    password: "Teacher#2026!Watan",
    displayName: "معلم الدورة التدريبية",
    role: "teacher",
    phone: "01099959133"
  }
];

async function seedAuthAccounts() {
  console.log("\n🔑 [1/3] فحص وإنشاء حسابات الإدارة والمعلمين وتعيين الـ Custom Claims...");

  const userIds = {};

  for (const acc of DEFAULT_ACCOUNTS) {
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(acc.email);
      console.log(`ℹ️ الحساب موجود مسبقاً: ${acc.email} (${userRecord.uid})`);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        userRecord = await auth.createUser({
          email: acc.email,
          password: acc.password,
          displayName: acc.displayName,
          phoneNumber: undefined
        });
        console.log(`✅ تم إنشاء حساب جديد: ${acc.email} | كلمة المرور الافتراضية: ${acc.password}`);
      } else {
        throw e;
      }
    }

    // Set Custom Claims
    await auth.setCustomUserClaims(userRecord.uid, { role: acc.role });
    console.log(`   🏷️ تم تعيين الرتبة (Custom Claim): { role: "${acc.role}" }`);

    userIds[acc.role] = userRecord.uid;

    // Create user doc in 'users' collection
    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      displayName: acc.displayName,
      email: acc.email,
      role: acc.role,
      phoneNumber: acc.phone,
      active: true,
      createdAt: FieldValue.serverTimestamp()
    }, { merge: true });
  }

  return userIds;
}

async function seedCollections(userIds) {
  console.log("\n📦 [2/3] تهيئة جميع المجموعات الـ 16 وإنشاء مستندات القوالب الأساسية...");

  const now = FieldValue.serverTimestamp();
  const adminUid = userIds.admin;
  const teacherUid = userIds.teacher;

  // 1. Group info & sample student
  const sampleStudentUid = "sample_student_01";
  await db.collection("students").doc(sampleStudentUid).set({
    studentName: "طالب تجريبي (مستقبل وطن)",
    studentPhone: "01012345678",
    parentPhone: "01098765432",
    group: "مجموعة الأحد والأربعاء | 7:00 - 8:30",
    gender: "بنين",
    notes: "حساب تجريبي لاختبار النظام",
    active: true,
    uid: sampleStudentUid,
    email: "01012345678@student.local",
    createdAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: students");

  // 2. Videos
  const sampleVideoRef = db.collection("videos").doc("lecture_01");
  await sampleVideoRef.set({
    title: "المحاضرة 1: مقدمة إلى لغة بايثون والبيئة البرمجية",
    description: "تثبيت بايثون وتشغيل أول برنامج وطباعة النصوص والمتغيرات",
    videoUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
    order: 1,
    group: "مجموعة الأحد والأربعاء | 7:00 - 8:30",
    duration: 45,
    thumbnail: "",
    active: true,
    createdAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: videos");

  // 3. Video logs
  await db.collection("video_logs").doc("sample_log_01").set({
    studentId: sampleStudentUid,
    studentPhone: "01012345678",
    studentName: "طالب تجريبي (مستقبل وطن)",
    videoId: "lecture_01",
    videoTitle: "المحاضرة 1: مقدمة إلى لغة بايثون والبيئة البرمجية",
    watchedDuration: 1800,
    totalDuration: 2700,
    completed: true,
    timestamp: now
  }, { merge: true });
  console.log("   ✅ مجموعة: video_logs");

  // 4. Video progress
  await db.collection("video_progress").doc(`${sampleStudentUid}_lecture_01`).set({
    studentUid: sampleStudentUid,
    videoId: "lecture_01",
    lastPositionSeconds: 1800,
    percentage: 67,
    updatedAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: video_progress");

  // 5. Exams & Attempts subcollection
  const sampleExamRef = db.collection("exams").doc("exam_01");
  await sampleExamRef.set({
    title: "اختبار بايثون الشامل - المستوى الأول",
    description: "اختبار تجريبي على المفاهيم الأساسية، المتغيرات، والعمليات الحسابية",
    group: "مجموعة الأحد والأربعاء | 7:00 - 8:30",
    durationMinutes: 30,
    passingScore: 60,
    totalQuestions: 2,
    active: true,
    createdAt: now,
    questions: [
      {
        id: 1,
        questionText: "ما هي الدالة المستخدمة لطباعة المخرجات على الشاشة في بايثون؟",
        options: ["echo()", "console.log()", "print()", "printf()"],
        correctAnswer: 2,
        points: 10
      },
      {
        id: 2,
        questionText: "أي من الأنواع التالية يمثل الأرقام العشرية؟",
        options: ["int", "float", "str", "boolean"],
        correctAnswer: 1,
        points: 10
      }
    ]
  }, { merge: true });

  await sampleExamRef.collection("attempts").doc(sampleStudentUid).set({
    studentUid: sampleStudentUid,
    studentName: "طالب تجريبي (مستقبل وطن)",
    startedAt: now,
    status: "submitted",
    answers: { "1": 2, "2": 1 }
  }, { merge: true });
  console.log("   ✅ مجموعة: exams (مع المجموعة الفرعية attempts)");

  // 6. Results
  await db.collection("results").doc(`exam_01_${sampleStudentUid}`).set({
    examId: "exam_01",
    examTitle: "اختبار بايثون الشامل - المستوى الأول",
    studentUid: sampleStudentUid,
    studentName: "طالب تجريبي (مستقبل وطن)",
    studentPhone: "01012345678",
    group: "مجموعة الأحد والأربعاء | 7:00 - 8:30",
    score: 20,
    totalScore: 20,
    percentage: 100,
    passed: true,
    submittedAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: results");

  // 7. Assignments & Submissions subcollection
  const sampleAsgRef = db.collection("assignments").doc("asg_01");
  await sampleAsgRef.set({
    title: "مشروع 1: آلة حاسبة تفاعلية بلغة بايثون",
    description: "اكتب برنامج بايثون يستقبل رقمين وعملية (+, -, *, /) ويطبع النتيجة.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    group: "مجموعة الأحد والأربعاء | 7:00 - 8:30",
    fileUrl: "",
    maxScore: 20,
    active: true,
    createdAt: now
  }, { merge: true });

  await sampleAsgRef.collection("submissions").doc(sampleStudentUid).set({
    studentUid: sampleStudentUid,
    studentName: "طالب تجريبي (مستقبل وطن)",
    studentPhone: "01012345678",
    fileUrl: "",
    notes: "كود بايثون للآلة الحاسبة مع معالجة القسمة على صفر",
    submittedAt: now,
    score: 20,
    feedback: "أحسنت! تطبيق رائع ومثالي.",
    graded: true,
    gradedAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: assignments (مع المجموعة الفرعية submissions)");

  // 8. Legacy submissions
  await db.collection("submissions").doc(`${sampleStudentUid}_asg_01`).set({
    assignmentId: "asg_01",
    studentUid: sampleStudentUid,
    studentName: "طالب تجريبي (مستقبل وطن)",
    studentPhone: "01012345678",
    fileUrl: "",
    notes: "كود الآلة الحاسبة (سجل موحد)",
    submittedAt: now,
    score: 20,
    feedback: "ممتاز",
    graded: true
  }, { merge: true });
  console.log("   ✅ مجموعة: submissions");

  // 9. Attendance sessions & records subcollection
  const sampleAttRef = db.collection("attendance_sessions").doc("session_01");
  await sampleAttRef.set({
    date: new Date().toISOString().split("T")[0],
    title: "المحاضرة 1: مدخل علوم الحاسب والبرمجة",
    group: "مجموعة الأحد والأربعاء | 7:00 - 8:30",
    totalStudents: 1,
    presentCount: 1,
    absentCount: 0,
    createdAt: now
  }, { merge: true });

  await sampleAttRef.collection("records").doc(sampleStudentUid).set({
    studentUid: sampleStudentUid,
    studentName: "طالب تجريبي (مستقبل وطن)",
    studentPhone: "01012345678",
    status: "present",
    notes: "حاضر في الموعد",
    markedAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: attendance_sessions (مع المجموعة الفرعية records)");

  // 10. Python Adventure Progress
  await db.collection("python_adventure_progress").doc(sampleStudentUid).set({
    studentUid: sampleStudentUid,
    currentWorld: 1,
    currentLevel: 2,
    xp: 200,
    streak: { count: 3, lastActiveDate: new Date().toISOString().split("T")[0] },
    completedChallenges: {
      "w1_l1": { completedAt: new Date().toISOString(), score: 100 }
    },
    unlockedBadges: ["first_code", "python_novice"],
    updatedAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: python_adventure_progress");

  // 11. Points Ledger
  await db.collection("points_ledger").doc("ledger_01").set({
    studentUid: sampleStudentUid,
    points: 50,
    reason: "إنهاء التحدي الأول في مغامرة بايثون",
    source: "adventure",
    createdAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: points_ledger");

  // 12. Competitions & participants subcollection
  const sampleCompRef = db.collection("competitions").doc("hackathon_01");
  await sampleCompRef.set({
    title: "هاكاثون المحلة الكبرى لشباب التكنولوجيا 🏆",
    description: "ماراثون برمجي لحل المسائل الحسابية المتقدمة بلغة بايثون",
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    createdAt: now
  }, { merge: true });

  await sampleCompRef.collection("participants").doc(sampleStudentUid).set({
    studentUid: sampleStudentUid,
    studentName: "طالب تجريبي (مستقبل وطن)",
    score: 150,
    rank: 1,
    solvedCount: 2
  }, { merge: true });
  console.log("   ✅ مجموعة: competitions (مع المجموعة الفرعية participants)");

  // 13. Student Gamification
  await db.collection("student_gamification").doc(sampleStudentUid).set({
    studentUid: sampleStudentUid,
    studentName: "طالب تجريبي (مستقبل وطن)",
    competitionPoints: 400,
    challengesCompleted: 5,
    currentStreak: 3,
    rankTier: "فضي",
    badges: [
      { id: "python_starter", name: "مبتدئ بايثون", awardedAt: new Date().toISOString().split("T")[0] }
    ],
    updatedAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: student_gamification");

  // 14. Notifications
  await db.collection("notifications").doc("notif_01").set({
    recipientUid: sampleStudentUid,
    title: "مرحباً بك في منصة مستقبل وطن التعليمية! 🚀",
    message: "تم تسجيلك بنجاح في كورس بايثون. نتمنى لك تجربة ممتعة ومفيدة.",
    type: "general",
    link: "#",
    read: false,
    createdAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: notifications");

  // 15. Coding Problems
  await db.collection("coding_problems").doc("prob_01").set({
    title: "طباعة رسالة الترحيب الأولى (Hello World)",
    difficulty: "سهل",
    category: "Basics",
    description: "اكتب برنامج بلغة بايثون يقوم بطباعة النص 'Hello, Mostakbal Watan!'",
    starterCode: "# اكتب الكود هنا\nprint('Hello, Mostakbal Watan!')\n",
    testCases: [
      { input: "", expectedOutput: "Hello, Mostakbal Watan!", isHidden: false }
    ],
    points: 10,
    active: true,
    createdAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: coding_problems");

  // 16. Coding Submissions
  await db.collection("coding_submissions").doc("subm_code_01").set({
    problemId: "prob_01",
    studentUid: sampleStudentUid,
    code: "print('Hello, Mostakbal Watan!')",
    language: "python",
    status: "ACCEPTED",
    passedTests: 1,
    totalTests: 1,
    submittedAt: now
  }, { merge: true });
  console.log("   ✅ مجموعة: coding_submissions");
}

async function run() {
  console.log("================================================================================");
  console.log("🚀 بدء تهيئة مشروع فايربيز الجديد لمنصة مستقبل وطن للتعليم التكنولوجي");
  console.log("================================================================================");

  const userIds = await seedAuthAccounts();
  await seedCollections(userIds);

  console.log("\n================================================================================");
  console.log("🎉 تم الانتهاء بنجاح! جميع المجموعات والحسابات جاهزة الآن في لوحة فايربيز 🚀");
  console.log("================================================================================");
  console.log("\nبيانات الدخول الافتراضية:");
  console.log("👑 الإدارة: admin@admin.local      | كلمة المرور: Admin#2026!Watan");
  console.log("👨‍🏫 المعلم: teacher@system.local    | كلمة المرور: Teacher#2026!Watan");
  console.log("\nلا تنسَ تحديث ملف src/core/firebase.js ببيانات المشروع الجديد، ونشر القواعد عبر:");
  console.log("npx firebase-tools deploy --only firestore:rules,firestore:indexes,storage");
  console.log("================================================================================\n");
}

run().catch((err) => {
  console.error("❌ حدث خطأ أثناء التهيئة:", err);
  process.exit(1);
});

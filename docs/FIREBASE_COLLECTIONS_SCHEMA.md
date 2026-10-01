# 🗄️ دليل وهيكل مجموعات فايربيز (Firebase Firestore Schema & Collections Guide)
### منصة اتحاد بشبابها للتعليم التكنولوجي - أمانة أول المحلة الكبرى

هذا الملف يحتوي على التوثيق الشامل لجميع المجموعات (Collections) والمجموعات الفرعية (Subcollections) في قاعدة بيانات **Cloud Firestore**، وهيكل الحقول وأنواعها، بالإضافة إلى خطوات إعداد مشروع Firebase الجديد وربطه بالمنصة بنجاح.

---

## 📑 فهرس المحتويات
1. [نظرة عامة على المجموعات الـ 16](#1-نظرة-عامة-على-المجموعات-الـ-16)
2. [الهيكل التفصيلي لكل مجموعة (Fields, Types & Examples)](#2-الهيكل-التفصيلي-لكل-مجموعة)
3. [نظام المصادقة والرتب (Firebase Authentication & Custom Claims)](#3-نظام-المصادقة-والرتب)
4. [قواعد الأمان والفهارس (Rules & Indexes)](#4-قواعد-الأمان-والفهارس)
5. [خطوات ربط الحساب الجديد بالمشروع (Step-by-Step Setup)](#5-خطوات-ربط-الحساب-الجديد-بالمشروع)
6. [السكربت التلقائي لتهيئة الكولكشنز (Seeding Script)](#6-السكربت-التلقائي-لتهيئة-الكولكشنز)

---

## 1. نظرة عامة على المجموعات الـ 16

| # | اسم المجموعة (Collection) | الوصف | المجموعات الفرعية (Subcollections) |
|---|---|---|---|
| 1 | `users` | الحسابات الرئيسية وبيانات الملف الشخصي | لا يوجد |
| 2 | `students` | سجلات الطلاب الأكاديمية وبيانات أولياء الأمور | لا يوجد |
| 3 | `videos` | الدروس والمحاضرات التعليمية المسجلة | لا يوجد |
| 4 | `video_logs` | سجلات مشاهدات الطلاب وتتبع وقت المشاهدة | لا يوجد |
| 5 | `video_progress` | نسبة التقدم اللحظي لكل طالب في الفيديوهات | لا يوجد |
| 6 | `exams` | بنك الامتحانات والأسئلة ونماذج الإجابة | `attempts` (محاولات الطلاب) |
| 7 | `results` | نتائج وتصحيح امتحانات الطلاب | لا يوجد |
| 8 | `assignments` | الواجبات والمهام المطلوبة من الطلاب | `submissions` (تسليمات الطلاب) |
| 9 | `submissions` | السجل الموحد لتسليمات الواجبات (دعم التوافقية) | لا يوجد |
| 10 | `attendance_sessions` | جلسات الحضور والغياب للمجموعات | `records` (سجل حضور كل طالب) |
| 11 | `python_adventure_progress` | مغامرة بايثون (المراحل، العوالم، الأكواد، XP) | لا يوجد |
| 12 | `points_ledger` | دفتر حركات النقاط لمكافحة التلاعب والتدقيق | لا يوجد |
| 13 | `competitions` | مسابقات البرمجة والفعاليات الدورية | `participants` (المشاركون) |
| 14 | `student_gamification` | نظام الليدربورد، المستويات، الرتب والشارات | لا يوجد |
| 15 | `notifications` | إشعارات وتنبيهات النظام للطلاب والمعلمين | لا يوجد |
| 16 | `coding_problems` | بنك مسائل البرمجة (Python Problem Solving) | لا يوجد |
| 17 | `coding_submissions` | محاولات وأكواد الطلاب لمسائل البرمجة والتست كيسز | لا يوجد |

---

## 2. الهيكل التفصيلي لكل مجموعة

### 1) مجموعة `users`
* **معرف المستند (Document ID):** `userId` (هو نفسه Firebase Auth UID).
* **الحقول:**
```json
{
  "uid": "wJ8sK92mZ...",
  "displayName": "المهندس إبراهيم الششتاوي",
  "email": "admin@admin.local",
  "role": "admin", // القيم المسموحة: "admin" | "teacher" | "student"
  "phoneNumber": "01020084862",
  "active": true,
  "createdAt": "2026-09-28T00:00:00.000Z"
}
```

---

### 2) مجموعة `students`
* **معرف المستند (Document ID):** `studentUid` (يفضل أن يطابق Auth UID أو رقم الهاتف).
* **الحقول:**
```json
{
  "studentName": "أحمد محمد علي",
  "studentPhone": "01012345678",
  "parentPhone": "01098765432",
  "group": "مجموعة الأحد والأربعاء | 7:00 - 8:30",
  "gender": "بنين", // "بنين" أو "بنات"
  "notes": "طالب متميز في الخوارزميات",
  "active": true,
  "createdAt": "2026-09-28T00:00:00.000Z",
  "uid": "wJ8sK92mZ...",
  "email": "01012345678@student.local"
}
```

---

### 3) مجموعة `videos`
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "title": "مقدمة إلى لغة بايثون والمتغيرات",
  "description": "شرح المتغيرات وأنواع البيانات الأساسية في بايثون",
  "videoUrl": "https://www.youtube.com/watch?v=xxxx", // أو رابط Google Drive / MP4
  "order": 1,
  "group": "مجموعة الأحد والأربعاء | 7:00 - 8:30",
  "duration": 45, // المدة بالدقائق
  "thumbnail": "https://...",
  "active": true,
  "createdAt": "2026-09-28T00:00:00.000Z"
}
```

---

### 4) مجموعة `video_logs`
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "studentId": "wJ8sK92mZ...",
  "studentPhone": "01012345678",
  "studentName": "أحمد محمد علي",
  "videoId": "vid_01",
  "videoTitle": "مقدمة إلى لغة بايثون والمتغيرات",
  "watchedDuration": 2400, // بالثواني
  "totalDuration": 2700, // بالثواني
  "completed": true,
  "timestamp": "2026-09-28T00:00:00.000Z"
}
```

---

### 5) مجموعة `video_progress`
* **معرف المستند (Document ID):** `${studentUid}_${videoId}`.
* **الحقول:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "videoId": "vid_01",
  "lastPositionSeconds": 1420,
  "percentage": 85,
  "updatedAt": "2026-09-28T00:00:00.000Z"
}
```

---

### 6) مجموعة `exams` ومجموعتها الفرعية `attempts`
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "title": "اختبار بايثون الشامل - المستوى الأول",
  "description": "اختبار على المتغيرات والجمل الشرطية وحلقات التكرار",
  "group": "مجموعة الأحد والأربعاء | 7:00 - 8:30",
  "durationMinutes": 30,
  "passingScore": 60,
  "totalQuestions": 10,
  "active": true,
  "createdAt": "2026-09-28T00:00:00.000Z",
  "questions": [
    {
      "id": 1,
      "questionText": "ما هي مخرجات print(type(5.0)) في بايثون؟",
      "options": ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
      "correctAnswer": 1, // فهرس الإجابة الصحيحة (0-based)
      "points": 10
    }
  ]
}
```
* **المجموعة الفرعية `exams/{examId}/attempts/{studentUid}`:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "studentName": "أحمد محمد علي",
  "startedAt": "2026-09-28T10:00:00.000Z",
  "submittedAt": "2026-09-28T10:25:00.000Z",
  "status": "submitted", // "in-progress" | "submitted" | "expired"
  "answers": {
    "1": 1
  }
}
```

---

### 7) مجموعة `results`
* **معرف المستند (Document ID):** `${examId}_${studentUid}`.
* **الحقول:**
```json
{
  "examId": "exam_01",
  "examTitle": "اختبار بايثون الشامل - المستوى الأول",
  "studentUid": "wJ8sK92mZ...",
  "studentName": "أحمد محمد علي",
  "studentPhone": "01012345678",
  "group": "مجموعة الأحد والأربعاء | 7:00 - 8:30",
  "score": 90,
  "totalScore": 100,
  "percentage": 90,
  "passed": true,
  "submittedAt": "2026-09-28T10:25:00.000Z",
  "answers": [
    { "questionId": 1, "selectedOption": 1, "isCorrect": true, "pointsAwarded": 10 }
  ]
}
```

---

### 8) مجموعة `assignments` ومجموعتها الفرعية `submissions`
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "title": "مشروع بناء آلة حاسبة بلغة بايثون",
  "description": "اكتب برنامج يستقبل رقمين وعملية حسابية ويطبع الناتج",
  "dueDate": "2026-10-05T23:59:59.000Z",
  "group": "مجموعة الأحد والأربعاء | 7:00 - 8:30",
  "fileUrl": "https://firebasestorage.googleapis.com/.../instructions.pdf",
  "maxScore": 20,
  "active": true,
  "createdAt": "2026-09-28T00:00:00.000Z"
}
```
* **المجموعة الفرعية `assignments/{assignmentId}/submissions/{studentUid}`:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "studentName": "أحمد محمد علي",
  "studentPhone": "01012345678",
  "fileUrl": "https://firebasestorage.googleapis.com/.../submissions/asg_01/wJ8s.../calculator.py",
  "notes": "تم إضافة التحقق من القسمة على صفر",
  "submittedAt": "2026-09-29T14:30:00.000Z",
  "score": 20,
  "feedback": "عمل ممتاز وتنسيق رائع للكود",
  "graded": true,
  "gradedAt": "2026-09-30T10:00:00.000Z"
}
```

---

### 9) مجموعة `submissions` (السجل الموحد)
* **معرف المستند (Document ID):** `${studentUid}_${assignmentId}`.
* نفس حقول المجموعة الفرعية أعلاه (تستخدم لتسريع استعلامات المعلم والإدارة في صفحة واحدة).

---

### 10) مجموعة `attendance_sessions` ومجموعتها الفرعية `records`
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "date": "2026-09-28",
  "title": "المحاضرة الأولى: أساسيات بايثون",
  "group": "مجموعة الأحد والأربعاء | 7:00 - 8:30",
  "totalStudents": 25,
  "presentCount": 23,
  "absentCount": 2,
  "createdAt": "2026-09-28T00:00:00.000Z"
}
```
* **المجموعة الفرعية `attendance_sessions/{sessionId}/records/{studentUid}`:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "studentName": "أحمد محمد علي",
  "studentPhone": "01012345678",
  "status": "present", // القيم: "present" (حاضر) | "absent" (غائب) | "late" (متأخر) | "excused" (معذور)
  "notes": "",
  "markedAt": "2026-09-28T07:15:00.000Z"
}
```

---

### 11) مجموعة `python_adventure_progress` (مغامرة بايثون)
* **معرف المستند (Document ID):** `studentUid`.
* **الحقول:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "currentWorld": 1,
  "currentLevel": 3,
  "xp": 450,
  "streak": {
    "count": 5,
    "lastActiveDate": "2026-09-28"
  },
  "completedChallenges": {
    "w1_l1": { "completedAt": "2026-09-25T12:00:00Z", "score": 100 },
    "w1_l2": { "completedAt": "2026-09-26T14:30:00Z", "score": 100 }
  },
  "unlockedBadges": ["first_code", "python_novice"],
  "updatedAt": "2026-09-28T00:00:00.000Z"
}
```

---

### 12) مجموعة `points_ledger` (دفتر حركات النقاط)
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "points": 50,
  "reason": "إكمال تحدي بايثون: المتغيرات الحسابية",
  "source": "adventure", // "adventure" | "exam" | "attendance" | "assignment" | "manual"
  "createdAt": "2026-09-28T15:00:00.000Z"
}
```

---

### 13) مجموعة `competitions` ومجموعتها الفرعية `participants`
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "title": "هاكاثون المحلة للبرمجة - الموسم الأول",
  "description": "تحديات برمجية لحل مشاكل برمجية معقدة بلغة بايثون",
  "startDate": "2026-10-01T08:00:00.000Z",
  "endDate": "2026-10-07T22:00:00.000Z",
  "status": "upcoming", // "upcoming" | "active" | "ended"
  "createdAt": "2026-09-28T00:00:00.000Z"
}
```
* **المجموعة الفرعية `competitions/{competitionId}/participants/{studentUid}`:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "studentName": "أحمد محمد علي",
  "score": 350,
  "rank": 1,
  "solvedCount": 4
}
```

---

### 14) مجموعة `student_gamification` (الليدربورد والأوسمة)
* **معرف المستند (Document ID):** `studentUid`.
* **الحقول:**
```json
{
  "studentUid": "wJ8sK92mZ...",
  "studentName": "أحمد محمد علي",
  "competitionPoints": 850,
  "challengesCompleted": 12,
  "currentStreak": 5,
  "rankTier": "ذهبي", // برونزي | فضي | ذهبي | بلاتيني | ألماسي
  "badges": [
    { "id": "python_master", "name": "فارس بايثون", "awardedAt": "2026-09-28" }
  ],
  "updatedAt": "2026-09-28T00:00:00.000Z"
}
```

---

### 15) مجموعة `notifications` (التنبيهات)
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "recipientUid": "wJ8sK92mZ...", // أو "ALL" أو معرف المجموعة
  "title": "امتحان جديد متاح الآن! 📝",
  "message": "تم نشر اختبار بايثون الشامل لمجموعتك، بالتوفيق للجميع!",
  "type": "exam_available",
  "link": "#exams",
  "read": false,
  "createdAt": "2026-09-28T16:00:00.000Z"
}
```

---

### 16) مجموعة `coding_problems` (بنك مسائل البرمجة)
* **معرف المستند (Document ID):** توليد تلقائي أو معرف المسألة (مثل `prob_reverse_string`).
* **الحقول:**
```json
{
  "title": "عكس السلسلة النصية (Reverse String)",
  "difficulty": "سهل", // "سهل" | "متوسط" | "صعب"
  "category": "Strings & Slicing",
  "description": "اكتب دالة أو برنامج يستقبل نصاً ويقوم بطباعته بالعكس.",
  "starterCode": "def reverse_string(s):\n    # اكتب كود الحل هنا\n    pass\n",
  "testCases": [
    { "input": "hello", "expectedOutput": "olleh", "isHidden": false },
    { "input": "python", "expectedOutput": "nohtyp", "isHidden": true }
  ],
  "points": 25,
  "active": true,
  "createdAt": "2026-09-28T00:00:00.000Z"
}
```

---

### 17) مجموعة `coding_submissions` (تسليمات مسائل البرمجة)
* **معرف المستند (Document ID):** توليد تلقائي (Auto-generated ID).
* **الحقول:**
```json
{
  "problemId": "prob_reverse_string",
  "studentUid": "wJ8sK92mZ...",
  "code": "s = input()\nprint(s[::-1])",
  "language": "python",
  "status": "ACCEPTED", // "ACCEPTED" | "WRONG_ANSWER" | "TIME_LIMIT_EXCEEDED" | "RUNTIME_ERROR"
  "passedTests": 5,
  "totalTests": 5,
  "submittedAt": "2026-09-28T18:00:00.000Z"
}
```

---

## 3. نظام المصادقة والرتب (Authentication & Custom Claims)

تعتمد المنصة على نمط بريد إلكتروني تلقائي وذكي يسمح للطلاب والمعلمين بالدخول مباشرة باستخدام رقم الهاتف أو اسم المستخدم:

1. **الطلاب (Students):**
   * صيغة البريد في Firebase Auth: `[رقم_الهاتف]@student.local` (مثال: `01012345678@student.local`).
   * الـ Custom Claim: `{ "role": "student" }`.
   * التوجيه عند الدخول: `pages/student.html`.

2. **المعلمون (Teachers):**
   * صيغة البريد في Firebase Auth: `[اسم_المستخدم]@system.local` (مثال: `teacher@system.local`).
   * الـ Custom Claim: `{ "role": "teacher" }`.
   * التوجيه عند الدخول: `pages/teacher.html`.

3. **الإدارة (Admins):**
   * صيغة البريد في Firebase Auth: `[اسم_المستخدم]@admin.local` (مثال: `admin@admin.local`).
   * الـ Custom Claim: `{ "role": "admin" }`.
   * التوجيه عند الدخول: `pages/admin.html`.

> [!TIP]
> لتعيين الرتب (Custom Claims) تلقائياً على أي حسابات تقوم بإنشائها، وفرنا لك سكربت جاهز:
> ```bash
> node scripts/assign-claims.js
> ```

---

## 4. قواعد الأمان والفهارس (Rules & Indexes)

المشروع يحتوي بالفعل على ملفات جاهزة ومعتمدة لحماية وتأمين قاعدة بياناتك:
1. **قواعد فايرستور [firestore.rules](file:///home/ibrahim-elshishtawy/flutter%20project/Mostakbal-Watan-Courses/firestore.rules):** تمنع أي تلاعب وتضمن أن كل طالب يرى بياناته فقط بينما المعلمون والإدارة يديرون كامل المنصة.
2. **فهارس فايرستور [firestore.indexes.json](file:///home/ibrahim-elshishtawy/flutter%20project/Mostakbal-Watan-Courses/firestore.indexes.json):** تحتوي على استعلامات المجموعات الفرعية المركبة (`records`, `submissions`, `results`).
3. **قواعد التخزين [storage.rules](file:///home/ibrahim-elshishtawy/flutter%20project/Mostakbal-Watan-Courses/storage.rules):** تتيح رفع ملفات الواجبات حتى 20 ميجابايت بصيغ محددة (PDF, ZIP, Images, Python).

---

## 5. خطوات ربط الحساب الجديد بالمشروع (Step-by-Step Setup)

عند إنشاء حسابك ومشروعك الجديد في Firebase، اتبع الخطوات التالية:

### الخطوة 1: إنشاء المشروع وتفعيل الخدمات
1. توجه إلى [Firebase Console](https://console.firebase.google.com/) واضغط **Add project**.
2. اختر اسماً لمشروعك (مثال: `mostakbal-watan-prod`).
3. بعد إنشاء المشروع:
   * **Authentication:** ادخل على Authentication > Sign-in method > فعل خيار **Email/Password**.
   * **Firestore Database:** ادخل على Firestore Database > اضغط **Create database** > اختر موقع السيرفر الأقرب (مثال: `europe-west1` أو `europe-west3`).
   * **Storage:** ادخل على Storage > اضغط **Get started** وأكد الإنشاء.

### الخطوة 2: الحصول على مفاتيح الربط (Web App Config)
1. من إعدادات المشروع (Project Settings) > علامة التبويب **General**.
2. في الأسفل عند "Your apps"، اضغط على أيقونة الويب `</>` وسجل تطبيقاً جديداً.
3. انسخ كائن `firebaseConfig`.
4. افتح الملف في مشروعك: [src/core/firebase.js](file:///home/ibrahim-elshishtawy/flutter%20project/Mostakbal-Watan-Courses/src/core/firebase.js).
5. استبدل بيانات `firebaseConfig` بالبيانات الجديدة الخاصة بك:
```javascript
const firebaseConfig = {
  apiKey: "المفتاح_الجديد",
  authDomain: "اسم_مشروعك.firebaseapp.com",
  projectId: "اسم_مشروعك",
  storageBucket: "اسم_مشروعك.firebasestorage.app",
  appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxx"
};
```

### الخطوة 3: نشر القواعد والفهارس للحساب الجديد
من خلال موجه الأوامر (Terminal) في مسار المشروع:
```bash
# 1. تسجيل الدخول بحساب فايربيز الجديد
npx -y firebase-tools login

# 2. ربط المشروع الجديد
npx -y firebase-tools use --add [معرف_المشروع_الجديد]

# 3. نشر القواعد والفهارس
npx -y firebase-tools deploy --only firestore:rules,firestore:indexes,storage
```

---

## 6. السكربت التلقائي لتهيئة الكولكشنز (Seeding Script)

لكي تظهر المجموعات الـ 16 فوراً داخل لوحة تحكم Firestore الخاصة بك دون الحاجة لإدخالها يدوياً مستنداً بمستند، تم إنشاء سكربت تهيئة ذكي في المسار التالي:
[scripts/init-new-firebase-project.js](file:///home/ibrahim-elshishtawy/flutter%20project/Mostakbal-Watan-Courses/scripts/init-new-firebase-project.js)

### كيفية تشغيل السكربت:
1. حمّل ملف مفتاح الخدمة `serviceAccountKey.json` من لوحة Firebase Console:
   * **Project Settings > Service accounts > Generate new private key**.
2. ضع الملف المسمى `serviceAccountKey.json` داخل مجلد `scripts/`.
3. قم بتشغيل السكربت:
```bash
node scripts/init-new-firebase-project.js
```
يقوم هذا السكربت تلقائياً بـ:
* إنشاء حساب الأدمن الافتراضي وتعيين الرتبة له.
* إنشاء حساب المعلم الافتراضي وتعيين الرتبة له.
* إنشاء جميع الـ 16 كولكشن مع بيانات ونماذج أولية مطابقة لمعايير المنصة بنسبة 100%.

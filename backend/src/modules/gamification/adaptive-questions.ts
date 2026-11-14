import { HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config/firebase";
import { DailyChallenge, QuestionBankItem } from "./types";
import { awardXP } from "./economy";

const DAILY_CHALLENGES_COLLECTION = "daily_challenges";
const QUESTION_BANK_COLLECTION = "question_bank";
const GAMIFICATION_COLLECTION = "student_gamification";

// ==========================================
// 1. DEFAULT QUESTION BANK SEEDING
// ==========================================

export const DEFAULT_QUESTIONS: QuestionBankItem[] = [
  // EASY QUESTIONS (5 XP)
  {
    questionId: "q_py_var_01",
    topic: "variables",
    difficulty: "easy",
    questionText: "ما هو ناتج طباعة الكود التالي: print(type(5 / 2))؟",
    answerOptions: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "SyntaxError"],
    correctAnswer: 1,
    explanation: "في بايثون 3، عملية القسمة العادية (/) تعيد دائماً عدداً عشرياً (float) حتى لو كانت الأعداد صحيحة.",
    activeStatus: true,
    xpReward: 5,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_str_01",
    topic: "strings",
    difficulty: "easy",
    questionText: "إذا كانت s = 'Python'، فما هو الناتج من: print(s[1:4])؟",
    answerOptions: ["Pyt", "yth", "ytho", "Pyth"],
    correctAnswer: 1,
    explanation: "عملية التقطيع (slicing) تبدأ من الفهرس 1 (الحرف y) وتنتهي قبل الفهرس 4 مباشرة، فالناتج هو 'yth'.",
    activeStatus: true,
    xpReward: 5,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_list_01",
    topic: "lists",
    difficulty: "easy",
    questionText: "أي من الدوال التالية تُستخدم لإضافة عنصر في نهاية القائمة (List)؟",
    answerOptions: ["list.add(x)", "list.insert(x)", "list.append(x)", "list.push(x)"],
    correctAnswer: 2,
    explanation: "في بايثون تُستخدم الدالة append(x) لإضافة عنصر إلى نهاية القائمة.",
    activeStatus: true,
    xpReward: 5,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_cond_01",
    topic: "conditions",
    difficulty: "easy",
    questionText: "ما هي الكلمة المفتاحية المستخدمة لفحص شرط بديل في بايثون؟",
    answerOptions: ["else if", "elseif", "elif", "case"],
    correctAnswer: 2,
    explanation: "تستخدم بايثون الكلمة المحجوزة elif اختصاراً لـ else if.",
    activeStatus: true,
    xpReward: 5,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_loop_01",
    topic: "loops",
    difficulty: "easy",
    questionText: "كم مرة سيتم طباعة 'Hello' في الكود: for i in range(3): print('Hello')؟",
    answerOptions: ["2 مرات", "3 مرات", "4 مرات", "لا نهائي"],
    correctAnswer: 1,
    explanation: "الدالة range(3) تولد الأرقام 0, 1, 2 أي 3 تكرارات بالضبط.",
    activeStatus: true,
    xpReward: 5,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_bool_01",
    topic: "booleans",
    difficulty: "easy",
    questionText: "ما هي القيمة المنطقية للتعبير: bool('') (سلسلة نصية فارغة)؟",
    answerOptions: ["True", "False", "None", "Error"],
    correctAnswer: 1,
    explanation: "في بايثون، السلاسل النصية والقوائم والمجموعات الفارغة والرقم صفر تعتبر Falsy وتُعطي False.",
    activeStatus: true,
    xpReward: 5,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },

  // MEDIUM QUESTIONS (10 XP)
  {
    questionId: "q_py_func_01",
    topic: "functions",
    difficulty: "medium",
    questionText: "ما هو ناتج استدعاء دالة لا تحتوي على عبارة return صريحة؟",
    answerOptions: ["0", "False", "None", "undefined"],
    correctAnswer: 2,
    explanation: "أي دالة في بايثون لا تحتوي على return أو تنتهي بدون إعادة قيمة تعيد تلقائياً كائن None.",
    activeStatus: true,
    xpReward: 10,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_dict_01",
    topic: "dictionaries",
    difficulty: "medium",
    questionText: "ما هي الطريقة الآمنة لجلب قيمة مفتاح من قاموس دون إلقاء KeyError إذا لم يوجد؟",
    answerOptions: ["dict[key]", "dict.get(key, default)", "dict.find(key)", "dict.value(key)"],
    correctAnswer: 1,
    explanation: "الدالة dict.get(key, default) تعيد القيمة الافتراضية المحددة أو None دون إيقاف البرنامج بخطأ.",
    activeStatus: true,
    xpReward: 10,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_comp_01",
    topic: "comprehensions",
    difficulty: "medium",
    questionText: "ما هو ناتج: [x * 2 for x in range(4) if x % 2 == 0]؟",
    answerOptions: ["[0, 4]", "[0, 2, 4]", "[2, 4]", "[0, 2, 4, 6]"],
    correctAnswer: 0,
    explanation: "قيم range(4) هي 0, 1, 2, 3. الأعداد الزوجية هي 0 و 2 فقط. بضرب كل منهما في 2 الناتج هو [0, 4].",
    activeStatus: true,
    xpReward: 10,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_scope_01",
    topic: "scope",
    difficulty: "medium",
    questionText: "أي كلمة مفتاحية تُستخدم لتعديل متغير معرف في النطاق الخارجي داخل دالة؟",
    answerOptions: ["extern", "global", "outer", "public"],
    correctAnswer: 1,
    explanation: "تُستخدم الكلمة المحجوزة global داخل الدالة للإشارة إلى وتعديل متغير معرف خارجها في النطاق العام.",
    activeStatus: true,
    xpReward: 10,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },

  // HARD QUESTIONS (15 XP)
  {
    questionId: "q_py_algo_01",
    topic: "algorithms",
    difficulty: "hard",
    questionText: "ما هو التعقيد الزمني الزمني (Time Complexity) للبحث في قاموس (Dictionary lookup) في المتوسط؟",
    answerOptions: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctAnswer: 0,
    explanation: "بسبب استخدام جدول الهاش (Hash Table)، يكون الوصول للمفاتيح في القاموس في المتوسط O(1) زمن ثابت.",
    activeStatus: true,
    xpReward: 15,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_mut_01",
    topic: "mutability",
    difficulty: "hard",
    questionText: "ما هي مشكلة استخدام وسيط افتراضي قابل للتعديل مثل def fn(items=[]): items.append(1)؟",
    answerOptions: [
      "لا توجد مشكلة، يتم إنشاء قائمة جديدة في كل استدعاء",
      "القائمة تُنشأ مرة واحدة فقط وتتشارك بين جميع الاستدعاءات مما يؤدي لنتائج غير متوقعة",
      "بايثون سترمي TypeError فوراً عند تعريف الدالة",
      "القائمة ستكون للقراءة فقط"
    ],
    correctAnswer: 1,
    explanation: "في بايثون، يتم تقييم الوسائط الافتراضية مرة واحدة فقط عند تعريف الدالة، وتتشارك نفس الكائن القابل للتعديل عبر الاستدعاءات.",
    activeStatus: true,
    xpReward: 15,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  },
  {
    questionId: "q_py_gen_01",
    topic: "generators",
    difficulty: "hard",
    questionText: "ما الفرق الأساسي بين دالة تستخدم yield ودالة تستخدم return؟",
    answerOptions: [
      "الدالة بـ yield تُنهي البرنامج وتفرغ الذاكرة فوراً",
      "الدالة بـ yield تعيد مولداً (Generator) يحفظ حالة التنفيذ ويولد القيم عند الطلب دون استهلاك ذاكرة القائمة",
      "الدالة بـ return أسرع دائماً لأنها لا تدعم التكرار",
      "لا يوجد فرق جوهري كلاهما يعيد قائمة كاملة"
    ],
    correctAnswer: 1,
    explanation: "المولدات (Generators) تعتمد على التقييم الكسول (Lazy Evaluation) لإنتاج عنصر واحد عند كل طلب مما يوفر الذاكرة بشكل فائق.",
    activeStatus: true,
    xpReward: 15,
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z"
  }
];

/**
 * Ensures Question Bank collection is seeded with core questions.
 */
export async function seedQuestionBankIfNeeded() {
  const bankRef = db.collection(QUESTION_BANK_COLLECTION);
  const snap = await bankRef.limit(1).get();
  if (snap.empty) {
    const batch = db.batch();
    for (const q of DEFAULT_QUESTIONS) {
      batch.set(bankRef.doc(q.questionId), q);
    }
    await batch.commit();
  }
}

// ==========================================
// 2. ADAPTIVE CHALLENGE GENERATION (6 Questions per 24H)
// ==========================================

export async function createOrGetActiveDailyChallenge(studentUid: string, seasonId = "season_2026_01") {
  await seedQuestionBankIfNeeded();

  // 1. Check if an active, unexpired challenge already exists for this student
  const now = Date.now();
  const existingSnap = await db.collection(DAILY_CHALLENGES_COLLECTION)
    .where("studentUid", "==", studentUid)
    .where("seasonId", "==", seasonId)
    .orderBy("issuedAt", "desc")
    .limit(1)
    .get();

  if (!existingSnap.empty) {
    const existing = existingSnap.docs[0].data() as DailyChallenge;
    const expiresTimestamp = new Date(existing.expiresAt).getTime();

    // If still within the 24-hour window, return existing challenge
    if (now < expiresTimestamp && existing.status !== "expired") {
      return sanitizeChallengeForClient(existing);
    }
  }

  // 2. Determine student proficiency tier for adaptive selection
  const gamSnap = await db.collection(GAMIFICATION_COLLECTION).doc(studentUid).get();
  const gamData = gamSnap.exists ? gamSnap.data()! : {};
  const completedCount = Number(gamData.challengesCompleted || 0);

  // Distribution Calibration
  // Beginner: 4 Easy, 2 Medium, 0 Hard
  // Intermediate: 2 Easy, 3 Medium, 1 Hard
  // Advanced: 1 Easy, 3 Medium, 2 Hard
  let tier: "beginner" | "intermediate" | "advanced" = "beginner";
  let targetEasy = 4;
  let targetMedium = 2;
  let targetHard = 0;

  if (completedCount >= 8) {
    tier = "advanced";
    targetEasy = 1;
    targetMedium = 3;
    targetHard = 2;
  } else if (completedCount >= 3) {
    tier = "intermediate";
    targetEasy = 2;
    targetMedium = 3;
    targetHard = 1;
  }

  // 3. Query questions by difficulty
  const questionsSnap = await db.collection(QUESTION_BANK_COLLECTION)
    .where("activeStatus", "==", true)
    .get();

  const allQuestions: QuestionBankItem[] = questionsSnap.docs.map(d => d.data() as QuestionBankItem);
  const easyPool = allQuestions.filter(q => q.difficulty === "easy");
  const mediumPool = allQuestions.filter(q => q.difficulty === "medium");
  const hardPool = allQuestions.filter(q => q.difficulty === "hard");

  function pickRandom<T>(arr: T[], n: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  const selectedEasy = pickRandom(easyPool, targetEasy);
  const selectedMedium = pickRandom(mediumPool, targetMedium);
  const selectedHard = pickRandom(hardPool, targetHard);

  const selectedQuestions = [...selectedEasy, ...selectedMedium, ...selectedHard];

  // Guarantee exactly 6 questions
  while (selectedQuestions.length < 6 && allQuestions.length > selectedQuestions.length) {
    const remaining = allQuestions.filter(q => !selectedQuestions.some(sq => sq.questionId === q.questionId));
    if (remaining.length > 0) selectedQuestions.push(remaining[0]);
    else break;
  }

  const issuedAtDate = new Date();
  const expiresAtDate = new Date(issuedAtDate.getTime() + 24 * 60 * 60 * 1000); // Exactly 24 hours
  const cycleDate = issuedAtDate.toISOString().split("T")[0];
  const challengeId = `daily_${studentUid}_${cycleDate}_${now}`;

  const challengeDoc: DailyChallenge = {
    challengeId,
    studentUid,
    seasonId,
    cycleDate,
    difficultyTier: tier,
    questionIds: selectedQuestions.map(q => q.questionId),
    questions: selectedQuestions.map(q => ({
      id: q.questionId,
      topic: q.topic,
      difficulty: q.difficulty,
      questionText: q.questionText,
      answerOptions: q.answerOptions,
      xpReward: q.xpReward
    })),
    answers: {},
    status: "active",
    issuedAt: issuedAtDate.toISOString(),
    expiresAt: expiresAtDate.toISOString(),
    totalScore: 0,
    totalXpEarned: 0,
    bonusXpAwarded: false
  };

  await db.collection(DAILY_CHALLENGES_COLLECTION).doc(challengeId).set(challengeDoc);

  return sanitizeChallengeForClient(challengeDoc);
}

/**
 * Sanitizes challenge output before sending to frontend (Anti-Leakage).
 */
function sanitizeChallengeForClient(challenge: DailyChallenge) {
  return {
    ...challenge,
    // Ensure correct answers are never sent
    questions: challenge.questions.map(q => ({
      id: q.id,
      topic: q.topic,
      difficulty: q.difficulty,
      questionText: q.questionText,
      answerOptions: q.answerOptions,
      xpReward: q.xpReward
    }))
  };
}

// ==========================================
// 3. SUBMIT DAILY ANSWER WITH ATOMIC XP AWARD
// ==========================================

export async function submitDailyAnswer(options: {
  studentUid: string;
  challengeId: string;
  questionId: string;
  selectedOption: number;
}) {
  const { studentUid, challengeId, questionId, selectedOption } = options;

  const challengeRef = db.collection(DAILY_CHALLENGES_COLLECTION).doc(challengeId);
  const challengeSnap = await challengeRef.get();

  if (!challengeSnap.exists) {
    throw new HttpsError("not-found", "تحدي اليوم المطلوب غير موجود.");
  }

  const challenge = challengeSnap.data() as DailyChallenge;

  // Authorization check
  if (challenge.studentUid !== studentUid) {
    throw new HttpsError("permission-denied", "لا يمكنك الإجابة على تحدي خاص بطالب آخر.");
  }

  // Check 24-hour expiration
  const now = Date.now();
  if (now > new Date(challenge.expiresAt).getTime()) {
    await challengeRef.set({ status: "expired" }, { merge: true });
    throw new HttpsError("failed-precondition", "انتهت فترة الـ 24 ساعة المحددة لهذا التحدي.");
  }

  // Check if question was already answered
  if (challenge.answers && challenge.answers[questionId]) {
    throw new HttpsError("already-exists", "لقد قمت بالإجابة على هذا السؤال مسبقاً.");
  }

  // Fetch full question metadata to check correct answer
  const qSnap = await db.collection(QUESTION_BANK_COLLECTION).doc(questionId).get();
  if (!qSnap.exists) {
    throw new HttpsError("not-found", "بيانات السؤال غير متوفرة في بنك الأسئلة.");
  }

  const question = qSnap.data() as QuestionBankItem;
  const isCorrect = selectedOption === question.correctAnswer;
  const xpEarned = isCorrect ? question.xpReward : 0;

  let totalScore = (challenge.totalScore || 0) + (isCorrect ? 1 : 0);
  let totalXp = (challenge.totalXpEarned || 0) + xpEarned;

  const newAnswers = {
    ...(challenge.answers || {}),
    [questionId]: {
      selectedOption,
      isCorrect,
      xpEarned,
      submittedAt: new Date().toISOString()
    }
  };

  const answeredCount = Object.keys(newAnswers).length;
  let isFullyCompleted = answeredCount >= challenge.questions.length;
  let bonusXp = 0;

  // Award Completion Bonus (+10 XP) when all 6 questions are submitted
  if (isFullyCompleted && !challenge.bonusXpAwarded) {
    bonusXp = 10;
    totalXp += bonusXp;
  }

  // Update challenge document
  await challengeRef.set({
    answers: newAnswers,
    totalScore,
    totalXpEarned: totalXp,
    status: isFullyCompleted ? "completed" : "active",
    completedAt: isFullyCompleted ? new Date().toISOString() : null,
    bonusXpAwarded: isFullyCompleted ? true : challenge.bonusXpAwarded
  }, { merge: true });

  // Award XP via Authoritative Ledger
  if (xpEarned > 0) {
    await awardXP({
      studentUid,
      amount: xpEarned,
      source: "daily_challenge",
      sourceId: `${challengeId}_${questionId}`,
      reason: `إجابة صحيحة على سؤال: ${question.topic} (${question.difficulty})`,
      seasonId: challenge.seasonId
    });
  }

  if (bonusXp > 0) {
    await awardXP({
      studentUid,
      amount: bonusXp,
      source: "bonus",
      sourceId: `${challengeId}_bonus`,
      reason: "مكافأة إكمال جميع أسئلة التحدي اليومي الستة 🎯",
      seasonId: challenge.seasonId
    });

    // Increment completed challenge count on student gamification profile
    const gamRef = db.collection(GAMIFICATION_COLLECTION).doc(studentUid);
    const gamSnap = await gamRef.get();
    if (gamSnap.exists) {
      const prevChallenges = Number(gamSnap.data()?.challengesCompleted || 0);
      await gamRef.set({
        challengesCompleted: prevChallenges + 1,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
  }

  return {
    isCorrect,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    xpEarned,
    bonusXp,
    totalScore,
    totalXpEarned: totalXp,
    isFullyCompleted,
    questionsRemaining: Math.max(0, challenge.questions.length - answeredCount)
  };
}

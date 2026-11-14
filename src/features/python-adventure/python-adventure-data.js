// src/features/python-adventure/python-adventure-data.js
import { PROBLEM_SOLVING_LEVELS_DATA, PROBLEM_SOLVING_CHALLENGES_DATA } from "../problem-solving/problem-solving-data.js";
import { WORLDS_13_TO_20_DATA, CHALLENGES_13_TO_20_DATA } from "./python-adventure-worlds-13-20.js";
export { PROBLEM_SOLVING_LEVELS_DATA, PROBLEM_SOLVING_CHALLENGES_DATA };

export const WORLDS_DATA = [
  {
    id: "world-1",
    number: 1,
    title: "قرية بايثون",
    englishTitle: "Python Village",
    icon: "🏠",
    concept: "الطباعة والعمليات الحسابية",
    description: "بداية رحلتك البرمجية: تعلم طباعة النصوص والعمليات الحسابية وصياغة الكود الأول.",
    color: "#10b981",
    levelsCount: 11,
    requiredWorldId: null
  },
  {
    id: "world-2",
    number: 2,
    title: "وادي المتغيرات",
    englishTitle: "Variables Valley",
    icon: "🔢",
    concept: "المتغيرات والأنواع وتنسيق f-strings",
    description: "اكتشف كيفية تخزين البيانات في الذاكرة والتحويل بين النصوص والأرقام.",
    color: "#3b82f6",
    levelsCount: 11,
    requiredWorldId: "world-1"
  },
  {
    id: "world-3",
    number: 3,
    title: "كهف الشروط",
    englishTitle: "Conditions Cave",
    icon: "🔀",
    concept: "صنع القرارات if و elif و else",
    description: "اجعل برامجك ذكية تتخذ قرارات منطقية بناءً على شروط متعددة ومقارنات دقيقة.",
    color: "#8b5cf6",
    levelsCount: 11,
    requiredWorldId: "world-2"
  },
  {
    id: "world-4",
    number: 4,
    title: "غابة التكرار",
    englishTitle: "Loop Forest",
    icon: "🔁",
    concept: "حلقات التكرار for و while و range",
    description: "أتقن تكرار الأوامر الذكي بدون تكرار الكود، وتجنب فخ الحلقات اللانهائية.",
    color: "#f59e0b",
    levelsCount: 11,
    requiredWorldId: "world-3"
  },
  {
    id: "world-5",
    number: 5,
    title: "مدينة القوائم",
    englishTitle: "Lists City",
    icon: "📦",
    concept: "القوائم ومصفوفات البيانات والفهرسة",
    description: "تعلم تنظيم وتخزين مجموعات البيانات في قوائم ومعالجتها بالمرور والتصفية.",
    color: "#ec4899",
    levelsCount: 11,
    requiredWorldId: "world-4"
  },
  {
    id: "world-6",
    number: 6,
    title: "مصنع الدوال",
    englishTitle: "Functions Factory",
    icon: "⚙️",
    concept: "بناء الدوال def والقيم المرجعة return",
    description: "ابنِ آلات برمجية قابلة لإعادة الاستخدام تمرر لها مدخلات وتعيد نتائج حسابية.",
    color: "#06b6d4",
    levelsCount: 11,
    requiredWorldId: "world-5"
  },
  {
    id: "world-7",
    number: 7,
    title: "قلعة الكائنات",
    englishTitle: "OOP Castle",
    icon: "🧱",
    concept: "البرمجة كائنية التوجه Classes & Objects",
    description: "المستوى المتقدم: تصميم الفئات، دوال البناء __init__، وتفاعل الكائنات البرمجية.",
    color: "#ef4444",
    levelsCount: 11,
    requiredWorldId: "world-6"
  },
  {
    id: "world-8",
    number: 8,
    title: "حلبة الأبطال",
    englishTitle: "Final Arena",
    icon: "🏆",
    concept: "المشروع الختامي الشامل وتتويج بطل بايثون",
    description: "التحدي النهائي: دمج كل ما تعلمته لبناء أنظمة برمجية مصغرة متكاملة.",
    color: "#eab308",
    levelsCount: 11,
    requiredWorldId: "world-7"
  },
  {
    id: "world-9",
    number: 9,
    title: "واحة القواميس والبيانات",
    englishTitle: "Dictionaries & Data Oasis",
    icon: "📚",
    concept: "القواميس المتقدمة Dictionaries والمجموعات Sets وهياكل البيانات المنظمة",
    description: "أتقن بناء هياكل البيانات المتقدمة: ربط المفاتيح بالقيم (Key-Value)، تصفية البيانات، وتجميع الإحصائيات الذكية.",
    color: "#6366f1",
    levelsCount: 11,
    requiredWorldId: "world-8"
  }
,
  {
    "id": "world-10",
    "number": 10,
    "title": "ميدان حل المشكلات والتفكير الخوارزمي",
    "englishTitle": "Problem Solving & Algorithmic Arena",
    "icon": "🥋",
    "concept": "تفكيك المسائل البرمجية، تحليل المدخلات والمخرجات، وتصميم الحلول المنطقية الفعالة",
    "description": "تدرب على مهارات Problem Solving الحقيقية: فهم المشكلة، رسم خريطة الحل، والتعامل مع الأنماط المتكررة.",
    "color": "#0ea5e9",
    "levelsCount": 11,
    "requiredWorldId": "world-9"
  },
  {
    "id": "world-11",
    "number": 11,
    "title": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "englishTitle": "Tech Interview Prep Lab & Coding Challenges",
    "icon": "💼",
    "concept": "أشهر أسئلة المقابلات البرمجية: Two Pointers، تكرار العناصر، السلاسل النصية، والمصفوفات",
    "description": "استعد لمقابلات العمل التقنية في كبرى شركات البرمجيات بحل أسئلة قياسية معتمدة عالمياً.",
    "color": "#8b5cf6",
    "levelsCount": 11,
    "requiredWorldId": "world-10"
  },
  {
    "id": "world-12",
    "number": 12,
    "title": "ساحة البرمجة التنافسية وتحديات النخبة",
    "englishTitle": "Competitive Programming Colosseum",
    "icon": "⚡",
    "concept": "التحديات التنافسية الكبرى، خوارزميات السرعة والكفاءة، والتعامل مع الحالات الحدية الصعبة",
    "description": "الساحة الكبرى لمحترفي الأكواد: حل أصعب التحديات البرمجية بذكاء وتحقيق أعلى كفاءة زمنية ومكانية.",
    "color": "#f59e0b",
    "levelsCount": 11,
    "requiredWorldId": "world-11"
  },
  ...WORLDS_13_TO_20_DATA
];

// PROBLEM SOLVING COMPETITIVE LEVEL WORLDS (5 PROGRESSIVE LEVELS)
export const PROBLEM_SOLVING_WORLDS_DATA = [
  {
    id: "ps-level-1",
    level: 1,
    number: 1,
    title: "مستوى المبتدئين: الأساسيات",
    englishTitle: "Level 1: Beginner",
    shortTitle: "المستوى 1: مبتدئ",
    icon: "🌱",
    concept: "المدخلات والمتغيرات والعمليات الحسابية والشروط",
    description: "انطلاقة قوية في حل المشكلات البرمجية: التعامل مع المتغيرات وقراءة المدخلات والعمليات الحسابية والشروط.",
    color: "#10b981",
    track: "problem-solving",
    levelsCount: 13,
    pointsPerProblem: 10,
    requiredWorldId: null
  },
  {
    id: "ps-level-2",
    level: 2,
    number: 2,
    title: "المستوى السهل: التكرار والنصوص",
    englishTitle: "Level 2: Easy",
    shortTitle: "المستوى 2: سهل",
    icon: "⚡",
    concept: "حلقات التكرار for و while ومعالجة النصوص والقوائم",
    description: "مسائل تدريبية على اتخاذ القرارات وحلقات التكرار والتعامل المباشر مع النصوص والقوائم البسيطة.",
    color: "#3b82f6",
    track: "problem-solving",
    levelsCount: 13,
    pointsPerProblem: 10,
    requiredWorldId: null
  },
  {
    id: "ps-level-3",
    level: 3,
    number: 3,
    title: "المستوى المتوسط: الهياكل والدوال",
    englishTitle: "Level 3: Intermediate",
    shortTitle: "المستوى 3: متوسط",
    icon: "🔥",
    concept: "القوائم المتقدمة والقواميس ومجموعات البيانات والدوال",
    description: "تحديات تجمع أكثر من مفهوم معاً: هياكل البيانات المترابطة، القواميس، الدوال، والبحث الذكي.",
    color: "#f59e0b",
    track: "problem-solving",
    levelsCount: 13,
    pointsPerProblem: 25,
    requiredWorldId: null
  },
  {
    id: "ps-level-4",
    level: 4,
    number: 4,
    title: "المستوى المتقدم: الخوارزميات",
    englishTitle: "Level 4: Advanced",
    shortTitle: "المستوى 4: متقدم",
    icon: "🧠",
    concept: "خوارزميات البحث والترتيب والـ Recursion والتعقيد",
    description: "مسائل خوارزمية وتفكير منطقي عميق: البحث الثنائي، الترتيب اليدوي، الاستدعاء الذاتي، واكتشاف الأنماط.",
    color: "#8b5cf6",
    track: "problem-solving",
    levelsCount: 13,
    pointsPerProblem: 50,
    requiredWorldId: null
  },
  {
    id: "ps-level-5",
    level: 5,
    number: 5,
    title: "مستوى الخبراء: التحديات القصوى",
    englishTitle: "Level 5: Expert & Challenge",
    shortTitle: "المستوى 5: خبير",
    icon: "💎",
    concept: "كفاءة الخوارزميات والحالات الحدية والتعقيد الزمني",
    description: "تحديات برمجية قوية مخصصة للنخبة، تركز على الكفاءة الزمنية والمكانية والحالات الحدية (Edge Cases).",
    color: "#ef4444",
    track: "problem-solving",
    levelsCount: 13,
    pointsPerProblem: 100,
    requiredWorldId: null
  }
];

export const ALL_WORLDS_DATA = [...WORLDS_DATA, ...PROBLEM_SOLVING_WORLDS_DATA];


export const PYTHON_RANKS_LADDER = [
  { minLevel: 100, title: "إله البرمجة والأنظمة ⚡👑", englishTitle: "Divine Code Overlord", color: "#eab308", badgeIcon: "👑" },
  { minLevel: 80, title: "المعلم الأعظم للغة بايثون 🌟", englishTitle: "Supreme Python Master", color: "#f59e0b", badgeIcon: "🌟" },
  { minLevel: 70, title: "أسطورة الذكاء البرمجي 🏆", englishTitle: "Mythic Python Sage", color: "#ef4444", badgeIcon: "🏆" },
  { minLevel: 60, title: "قاهر التحديات الكوني 🌌", englishTitle: "Cosmic Problem Solver", color: "#ec4899", badgeIcon: "🌌" },
  { minLevel: 50, title: "بطل بايثون الأسطوري 👑", englishTitle: "Legendary Grandmaster", color: "#8b5cf6", badgeIcon: "👑" },
  { minLevel: 45, title: "حكيم الأكواد البرمجية 🧙‍♂️", englishTitle: "Code Archmage", color: "#6366f1", badgeIcon: "🧙‍♂️" },
  { minLevel: 40, title: "خبير بايثون المعتمد 💎", englishTitle: "Python Specialist", color: "#06b6d4", badgeIcon: "💎" },
  { minLevel: 35, title: "محارب الأكواد النخبة ⚔️", englishTitle: "Elite Code Warrior", color: "#0ea5e9", badgeIcon: "⚔️" },
  { minLevel: 30, title: "مهندس نظم بايثون 🧠", englishTitle: "Systems Engineer", color: "#3b82f6", badgeIcon: "🧠" },
  { minLevel: 25, title: "سيد الشروط والحلقات ⚙️", englishTitle: "Logic Master", color: "#10b981", badgeIcon: "⚙️" },
  { minLevel: 20, title: "فارس بايثون 🛡️", englishTitle: "Python Knight", color: "#14b8a6", badgeIcon: "🛡️" },
  { minLevel: 15, title: "صياد الخوارزميات 🔍", englishTitle: "Algorithm Hunter", color: "#84cc16", badgeIcon: "🔍" },
  { minLevel: 10, title: "مبرمج صاعد 💻", englishTitle: "Rising Developer", color: "#eab308", badgeIcon: "💻" },
  { minLevel: 5, title: "مستكشف الكود ⚡", englishTitle: "Code Explorer", color: "#f97316", badgeIcon: "⚡" },
  { minLevel: 1, title: "مبتدئ بايثون 🥉", englishTitle: "Python Novice", color: "#94a3b8", badgeIcon: "🥉" }
];

export function getStudentRankTitle(level = 1) {
  const lvl = Math.max(1, Number(level) || 1);
  const found = PYTHON_RANKS_LADDER.find(r => lvl >= r.minLevel);
  return found || PYTHON_RANKS_LADDER[PYTHON_RANKS_LADDER.length - 1];
}

export const ACHIEVEMENTS_DATA = [
  {
    id: "first_code",
    title: "أول سطر بايثون 🐍",
    description: "تشغيل وإكمال أول برنامج صحيح في قرية بايثون.",
    icon: "🐍",
    rewardXp: 50
  },
  {
    id: "loop_master",
    title: "سيد حلقات التكرار 🔁",
    description: "إكمال جميع مهمات غابة التكرار الأربعة.",
    icon: "🔁",
    rewardXp: 150
  },
  {
    id: "bug_hunter",
    title: "صياد الأخطاء 🐞",
    description: "حل 3 مهام تصحيح أخطاء برمجية بنجاح.",
    icon: "🐞",
    rewardXp: 100
  },
  {
    id: "boss_slayer",
    title: "قاهر الزعماء 👑",
    description: "هزيمة زعيم أحد العوالم واجتياز التحدي المركب.",
    icon: "👑",
    rewardXp: 200
  },
  {
    id: "streak_warrior",
    title: "شعلة الالتزام 🔥",
    description: "الحفاظ على تتابع تدريب يومي لمدة 3 أيام أو أكثر.",
    icon: "🔥",
    rewardXp: 100
  },
  {
    id: "python_hero",
    title: "بطل بايثون الأسطوري 🏆",
    description: "اجتياز جميع العوالم والمشروع الختامي كاملاً.",
    icon: "🏆",
    rewardXp: 500
  }
];

export const CHALLENGES_CLIENT_DATA = {
  // WORLD 1
  "world-1-level-1": {
    id: "world-1-level-1",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 1,
    title: "أهلاً بك في بايثون",
    subtitle: "المهمة الأولى: إضاءة لافتة القرية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 50,
    skills: ["print", "strings"],
    story: "أهلاً بك في قرية بايثون! لافتة بوابة القرية بحاجة إلى إضاءة ترحيبية بالقادمين الجدد. اكتب أمراً برمجياً يطبع على الشاشة عبارة ترحيبية تحتوي على كلمة Python.",
    microLesson: {
      concept: "أمر الطباعة print()",
      summary: "في لغة بايثون، نستخدم الدالة print() لعرض النصوص والأرقام على الشاشة.\nنكتب النصوص دائماً بين علامتي تنصيص '...' أو \"...\".",
      exampleCode: 'print("مرحباً بك!")\nprint(100)'
    },
    starterCode: '# اكتب كود الطباعة أدناه لعرض عبارة تحتوي على كلمة Python\n\n',
    requirements: [
      "استخدم أمر print()",
      "اطبع عبارة تحتوي على كلمة Python (مثال: Hello Python)"
    ],
    expectedOutput: "Hello Python",
    outputIncludes: ["Python"],
    hints: [
      "فكر في الدالة المخصصة لإخراج البيانات إلى الشاشة.",
      "استخدم الدالة print('...')",
      "ضع النص المراد طباعته بين علامتي تنصيص.",
      "اكتب الكود التالي: print('Hello Python')"
    ],
    nextChallengeId: "world-1-level-2"
  },
  "world-1-level-2": {
    id: "world-1-level-2",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 2,
    title: "حساب غنائم القرية",
    subtitle: "العمليات الحسابية المباشرة",
    difficulty: "easy",
    type: "write_code",
    baseXp: 60,
    skills: ["arithmetic", "numbers"],
    story: "عثر حراس القرية على 3 صناديق ذهب، في كل صندوق 25 عملة، ثم حصلوا على مكافأة إضافية قدرها 15 عملة. احسب إجمالي العملات واطبعه.",
    microLesson: {
      concept: "العمليات الحسابية في بايثون",
      summary: "بايثون آلة حاسبة فائقة الذكاء:\n+ للجمع، - للطرح، * للضرب، / للقسمة.\nالأولوية دائماً للأقواس ثم الضرب والقسمة قبل الجمع والطرح.",
      exampleCode: 'print(5 + 3)\nprint(10 * 2)'
    },
    starterCode: '# احسب واطبع الناتج المباشر: 3 صناديق في كل صندوق 25 عملة + 15 مكافأة\n\n',
    requirements: [
      "احسب التعبير الرياضي: (3 * 25) + 15",
      "اطبع الناتج مباشرة (الناتج هو 90)"
    ],
    expectedOutput: "90",
    hints: [
      "استخدم علامة النجمة * للضرب وعلامة + للجمع.",
      "اكتب الحساب مباشرة داخل الدالة print.",
      "اكتب: print(3 * 25 + 15)"
    ],
    nextChallengeId: "world-1-level-3"
  },
  "world-1-level-3": {
    id: "world-1-level-3",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 3,
    title: "إصلاح لافتة الحارس",
    subtitle: "صائد الأخطاء: خطأ في صياغة الكود SyntaxError",
    difficulty: "easy",
    type: "fix_code",
    baseXp: 70,
    skills: ["debugging", "syntax"],
    story: "كتب أحد المبتدئين كود لافتة الحارس لكنه وقع في خطأ صياغة بسيط يمنع الكود من العمل! مهمتك هي اكتشاف الخطأ وإصلاحه لتعمل اللافتة.",
    microLesson: {
      concept: "أخطاء الصياغة Syntax Errors",
      summary: "بايثون لغة دقيقة للغاية! كل قوس مفتوح ( يجب أن يقابله قوس إغلاق )، وكل علامة تنصيص يجب إغلاقها بدقة.",
      exampleCode: '# خطأ:\n# print("مرحباً\n# صحيح:\nprint("مرحباً")'
    },
    starterCode: 'print("Village Gate is Open"\n',
    requirements: [
      "أصلح القوس المفقود في نهاية سطر الطباعة",
      "تأكد أن الكود يطبع: Village Gate is Open"
    ],
    expectedOutput: "Village Gate is Open",
    hints: [
      "انظر إلى نهاية السطر، هل نسيت إغلاق القوس؟",
      "أضف قوس الإغلاق ) في نهاية السطر."
    ],
    nextChallengeId: "world-1-level-4"
  },
  "world-1-level-4": {
    id: "world-1-level-4",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 4,
    title: "👑 حارس بوابة القرية",
    subtitle: "تحدي الزعيم: امتحان اجتياز قرية بايثون",
    difficulty: "boss",
    type: "boss",
    baseXp: 150,
    skills: ["print", "arithmetic", "integration"],
    story: "يقف حارس بوابة القرية العملاق! لن يفتح البوابة إلى وادي المتغيرات إلا إذا قمت بطباعة سطرين: السطر الأول 'Welcome to Python World' والسطر الثاني ناتج حساب (100 - 25 * 2). أظهر له براعتك!",
    microLesson: {
      concept: "تحدي الزعيم: دمج المهارات",
      summary: "اجمع ما تعلمته: استخدم أمرين print منفصلين، مع مراعاة أولويات الحساب الرياضي (الضرب قبل الطرح).",
      exampleCode: 'print("Line 1")\nprint(10 + 5)'
    },
    starterCode: '# اطبع السطر الأول: Welcome to Python World\n# اطبع السطر الثاني: ناتج حساب (100 - 25 * 2)\n',
    requirements: [
      "اطبع في السطر الأول: Welcome to Python World",
      "اطبع في السطر الثاني ناتج الحساب (الناتج هو 50)"
    ],
    expectedOutput: "Welcome to Python World\n50",
    hints: [
      "استخدم أمرين print منفصلين.",
      "السطر الأول: print('Welcome to Python World')",
      "السطر الثاني: print(100 - 25 * 2)"
    ],
    unlocksWorldId: "world-2",
    nextChallengeId: "world-1-level-5"
  },

  "world-1-level-5": {
    id: "world-1-level-5",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 5,
    title: "🏛️ مسألة ستانفورد: روبوت كاريل وبناء الأهرامات",
    englishTitle: "Stanford CS106A: Karel's Pyramid Calculation",
    subtitle: "تحدي حل المشكلات من جامعة ستانفورد",
    difficulty: "medium",
    type: "write_code",
    baseXp: 160,
    skills: ["print", "arithmetic", "problem_solving", "stanford_cs106a"],
    story: "في جامعة ستانفورد (Stanford CS106A)، يبدأ طلاب البرمجة بالتحكم في روبوت كاريل (Karel). اكتب برنامجاً يحسب ويطبع عدد الأحجار الكلية اللازمة لبناء هرم من 5 طوابق حيث يحتاج كل طابق إلى أعداد الأحجار: (1 + 2 + 3 + 4 + 5). اطبع الناتج النهائي فقط (الناتج هو 15).",
    microLesson: {
      concept: "منهج ستانفورد: التفكير الخوارزمي",
      summary: "يتميز منهج جامعة ستانفورد بالربط بين العمليات الحسابية والمنطق التجريدي لحل المسائل.",
      exampleCode: "total = 1 + 2 + 3 + 4 + 5\nprint(total)"
    },
    starterCode: "# مسألة جامعة ستانفورد (CS106A)\n# احسب واطبع مجموع الأحجار (1 + 2 + 3 + 4 + 5)\n",
    requirements: [
      "احسب مجموع الأرقام من 1 إلى 5",
      "اطبع الناتج النهائي فقط: 15"
    ],
    expectedOutput: "15",
    hints: [
      "total = 1 + 2 + 3 + 4 + 5",
      "print(total)"
    ],
    testCases: [
      { input: "", expectedOutput: "15", description: "حساب مجموع أحجار هرم ستانفورد" }
    ],
    nextChallengeId: "world-1-level-6"
  },

  "world-1-level-6": {
    id: "world-1-level-6",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: حساب مساحة ومحيط المثلث القائم",
    englishTitle: "Math Challenge: Right Triangle Area & Perimeter",
    subtitle: "تطبيق القوانين الرياضية في بايثون",
    difficulty: "easy",
    type: "write_code",
    baseXp: 170,
    skills: ["math", "arithmetic", "geometry"],
    story: "في هذه المسألة الرياضية، لديك مثلث قائم أطوال أضلاعه: القاعدة base = 6، والارتفاع height = 8، والوتر hypotenuse = 10. احسب مساحته (نصف القاعدة في الارتفاع) ومحيطه (مجموع أطوال أضلاعه)، ثم اطبع السطر: 'Area: 24, Perimeter: 24'.",
    microLesson: {
      concept: "حساب المساحات والمحيطات الهندسية",
      summary: "مساحة المثلث = (base * height) / 2 ومحيطه = base + height + hypotenuse.",
      exampleCode: "base = 6\nheight = 8\nhyp = 10\narea = int((base * height) / 2)\nperim = base + height + hyp\nprint(f'Area: {area}, Perimeter: {perim}')"
    },
    starterCode: "# مسألة الرياضيات: المثلث القائم\nbase = 6\nheight = 8\nhyp = 10\n# احسب واطبع: Area: 24, Perimeter: 24\n",
    requirements: [
      "احسب المساحة = 24",
      "احسب المحيط = 24",
      "اطبع الناتج بالصيغة: Area: 24, Perimeter: 24"
    ],
    expectedOutput: "Area: 24, Perimeter: 24",
    hints: [
      "area = int((base * height) / 2)",
      "perimeter = base + height + hyp",
      "print(f'Area: {area}, Perimeter: {perimeter}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Area: 24, Perimeter: 24", description: "حساب مساحة ومحيط المثلث القائم" }
    ],
    nextChallengeId: "world-1-level-7"
  },
  "world-1-level-7": {
    id: "world-1-level-7",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ: تبديل قيم متغيرين بعمليات حسابية",
    englishTitle: "IQ Puzzle: Value Swap without Temporary Variable",
    subtitle: "تحدي التفكير المنطقي والذكاء الرياضي",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["iq", "logic", "arithmetic", "problem_solving"],
    story: "لغز ذكاء وتفكير منطقي: لديك المتغيران a = 15 و b = 25. المطلوب تبديل قيمتيهما ليصبح a = 25 و b = 15، ولكن دون استخدام متغير ثالث مؤقت! استخدم العمليات الحسابية الجمع والطرح للتبديل، ثم اطبع: 'a = 25, b = 15'.",
    microLesson: {
      concept: "التبديل الحسابي بدون ذاكرة إضافية",
      summary: "باستخدام a = a + b ثم b = a - b ثم a = a - b تتبادل القيم بذكاء دون استهلاك أي متغير ثالث.",
      exampleCode: "a = 15\nb = 25\na = a + b\nb = a - b\na = a - b\nprint(f'a = {a}, b = {b}')"
    },
    starterCode: "a = 15\nb = 25\n# قم بتبديل القيم حسابياً دون متغير ثالث واطبع الناتج\n",
    requirements: [
      "بدل قيم a و b ليصبح a = 25 و b = 15",
      "اطبع الناتج: a = 25, b = 15"
    ],
    expectedOutput: "a = 25, b = 15",
    hints: [
      "a = a + b",
      "b = a - b",
      "a = a - b",
      "print(f'a = {a}, b = {b}')"
    ],
    testCases: [
      { input: "", expectedOutput: "a = 25, b = 15", description: "تبديل القيم الحسابي المنطقي" }
    ],
    nextChallengeId: "world-1-level-8"
  },
  "world-1-level-8": {
    id: "world-1-level-8",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 8,
    title: "💼 مشكلة برمجية واقعية: حاسبة فاتورة السوبرماركت والضريبة",
    englishTitle: "Real-world Problem: Supermarket Bill with VAT",
    subtitle: "حل المشكلات والتفكير البرمجي التطبيقي",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["real_world", "problem_solving", "formatting"],
    story: "مشكلة برمجية واقعية: اشترى عميل سلعاً بقيمة subtotal = 200 جنيهاً. حصل على خصم discount = 20 جنيهاً، والضريبة VAT بنسبة 14% تطبق على المبلغ بعد الخصم (180 * 0.14 = 25.2). احسب الإجمالي الكلي وقربه لأقرب عدد صحيح، واطبع: 'Final Bill: 205 EGP'.",
    microLesson: {
      concept: "التطبيقات التجارية والحسابات الواقعية",
      summary: "في الأنظمة المحاسبية، يتم خصم الكوبونات أولاً ثم تطبيق الضرائب والرسوم للحصول على الإجمالي.",
      exampleCode: "sub = 200\ndisc = 20\nafter = sub - disc\nvat = after * 0.14\ntotal = round(after + vat)\nprint(f'Final Bill: {total} EGP')"
    },
    starterCode: "subtotal = 200\ndiscount = 20\n# احسب الإجمالي واطبع: Final Bill: 205 EGP\n",
    requirements: [
      "احسب الإجمالي بعد الخصم وإضافة ضريبة 14%",
      "قرب الإجمالي واطبع: Final Bill: 205 EGP"
    ],
    expectedOutput: "Final Bill: 205 EGP",
    hints: [
      "after_discount = subtotal - discount",
      "vat = after_discount * 0.14",
      "total = round(after_discount + vat)",
      "print(f'Final Bill: {total} EGP')"
    ],
    testCases: [
      { input: "", expectedOutput: "Final Bill: 205 EGP", description: "حساب إجمالي الفاتورة والخصم والضريبة" }
    ],
    unlocksWorldId: "world-2",
    nextChallengeId: "world-1-level-9"
  },

  // WORLD 2
  "world-2-level-1": {
    id: "world-2-level-1",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 1,
    title: "صندوق كنوز الوادي",
    subtitle: "تعريف واستخدام المتغيرات",
    difficulty: "easy",
    type: "write_code",
    baseXp: 80,
    skills: ["variables", "integers", "strings"],
    story: "في وادي المتغيرات، نحفظ البيانات في صناديق تسمى متغيرات (Variables). قم بتعريف متغير اسمه gold بقيمة 50 ثم اطبع قيمة gold على الشاشة.",
    microLesson: {
      concept: "المتغيرات في بايثون",
      summary: "المتغير مساحة في الذاكرة لتخزين قيمة باسم رمزي يسهل الرجوع إليه وتعديله في أي وقت:\nx = 10\nprint(x)",
      exampleCode: "coins = 100\nprint(coins)"
    },
    starterCode: '# عرف المتغير gold بقيمة 50 ثم اطبعه أدناه\n\n',
    requirements: [
      "عرف متغير باسم gold بقيمة 50",
      "اطبع قيمة المتغير gold"
    ],
    expectedOutput: "50",
    hints: [
      "اكتب: gold = 50",
      "ثم في السطر التالي: print(gold)"
    ],
    nextChallengeId: "world-2-level-2"
  },
  "world-2-level-2": {
    id: "world-2-level-2",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 2,
    title: "محول العملات السحرية",
    subtitle: "التحويل بين الأنواع وعمليات الجمع",
    difficulty: "medium",
    type: "write_code",
    baseXp: 90,
    skills: ["type_casting", "math"],
    story: "تصلك كمية الذهب كنص '150' وتريد مضاعفتها بالضرب في 2. حول النص إلى رقم صحيح باستخدام int() ثم اطبع الناتج المضاعف.",
    microLesson: {
      concept: "تحويل الأنواع Type Casting",
      summary: "النصوص (Strings) لا تقبل الضرب الحسابي الحقيقي إلا بعد تحويلها إلى رقم صحيح int() أو رقم عشري float().",
      exampleCode: "s = '25'\nn = int(s)\nprint(n * 2)"
    },
    starterCode: "gold_str = '150'\n# حول gold_str إلى رقم واطبع ناتج ضربه في 2\n",
    requirements: [
      "استخدم int(gold_str) لتحويل القيمة إلى رقم",
      "اطبع الناتج المضاعف (300)"
    ],
    expectedOutput: "300",
    hints: [
      "gold_num = int(gold_str)",
      "print(gold_num * 2)"
    ],
    nextChallengeId: "world-2-level-3"
  },
  "world-2-level-3": {
    id: "world-2-level-3",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 3,
    title: "إكمال فاتورة التاجر",
    subtitle: "إكمال الكود: صيغة f-string الأنيقة",
    difficulty: "medium",
    type: "complete_code",
    baseXp: 90,
    skills: ["f-strings", "formatting"],
    story: "تاجر الوادي يريد طباعة فاتورة بالصيغة: 'Total: 250 Coins'. أكمل الفراغ في f-string لطباعة القيمة الصحيحة.",
    microLesson: {
      concept: "سلاسل f-string المنسقة",
      summary: "نضع حرف f قبل علامة التنصيص ونضع اسم المتغير داخل أقواس معقوفة {variable}:\nprice = 100\nprint(f'Price: {price}')",
      exampleCode: "name = 'Ali'\nprint(f'Hello {name}')"
    },
    starterCode: "total = 250\n# استبدل _____ بالمتغير total\nprint(f'Total: {_____} Coins')\n",
    requirements: [
      "ضع اسم المتغير total داخل الأقواس المعقوفة",
      "اطبع العبارة: Total: 250 Coins"
    ],
    expectedOutput: "Total: 250 Coins",
    hints: [
      "استبدل _____ باسم المتغير total",
      "print(f'Total: {total} Coins')"
    ],
    nextChallengeId: "world-2-level-4"
  },
  "world-2-level-4": {
    id: "world-2-level-4",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 4,
    title: "👑 تاجر الوادي العظيم",
    subtitle: "تحدي الزعيم: نظام محاسبة الوادي",
    difficulty: "boss",
    type: "boss",
    baseXp: 180,
    skills: ["variables", "arithmetic", "f-strings"],
    story: "التاجر العظيم يطلب منك حساب السعر النهائي لشحنة دروع: سعر السلعة price = 400، ونسبة الضريبة tax = 50، والخصم discount = 30. احسب final_price = price + tax - discount واطبع النتيجة بالصيغة: 'Final Price: 420'",
    microLesson: {
      concept: "تحدي الزعيم",
      summary: "عرف المتغيرات الثلاثة، احسب الناتج النهائي وخزنه في متغير، ثم اطبعه باستخدام f-string أو دمج النصوص.",
      exampleCode: "a = 10\nb = 2\nc = a + b\nprint(f'Result: {c}')"
    },
    starterCode: "price = 400\ntax = 50\ndiscount = 30\n# احسب final_price واطبع النتيجة:\n",
    requirements: [
      "احسب final_price = price + tax - discount",
      "اطبع النتيجة مطابقة تماماً: Final Price: 420"
    ],
    expectedOutput: "Final Price: 420",
    hints: [
      "final_price = price + tax - discount",
      "print(f'Final Price: {final_price}')"
    ],
    unlocksWorldId: "world-3",
    nextChallengeId: "world-2-level-5"
  },

  "world-2-level-5": {
    id: "world-2-level-5",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 5,
    title: "🐶 مسألة ستانفورد: حاسبة سنين الكلاب بالسنين البشرية",
    englishTitle: "Stanford CS106A: Dog Years Calculator",
    subtitle: "تحدي حل المشكلات من جامعة ستانفورد",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["variables", "arithmetic", "f_strings", "stanford_cs106a"],
    story: "مسألة شهيرة في منهج ستانفورد (Stanford CS106A): السنة الواحدة في عمر الكلب تعادل 7 سنوات بشرية. لديك المتغير dog_years = 3. احسب العمر البشري واطبع الناتج باستخدام f-string كما يلي: Human years: 21",
    microLesson: {
      concept: "منهج ستانفورد: العمليات والمتغيرات",
      summary: "نخزن المعاملات في متغيرات ونستعمل f-string لدمج الأرقام في النصوص المطبوعة بدقة.",
      exampleCode: "dog_years = 3\nhuman_years = dog_years * 7\nprint(f'Human years: {human_years}')"
    },
    starterCode: "# مسألة جامعة ستانفورد (CS106A)\ndog_years = 3\n# احسب واطبع العمر البشري بصيغة: Human years: 21\n",
    requirements: [
      "احسب العمر البشري = dog_years * 7",
      "اطبع الناتج بصيغة: Human years: 21"
    ],
    expectedOutput: "Human years: 21",
    hints: [
      "human_years = dog_years * 7",
      "print(f'Human years: {human_years}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Human years: 21", description: "حساب أعمار الكلاب بالسنين البشرية" }
    ],
    nextChallengeId: "world-2-level-6"
  },

  "world-2-level-6": {
    id: "world-2-level-6",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: حساب الفائدة المركبة السنوية",
    englishTitle: "Math Challenge: Compound Interest Formula",
    subtitle: "تطبيق المعادلات الأسية والمتغيرات المالية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 170,
    skills: ["math", "variables", "powers"],
    story: "مسألة رياضية مالية: أودع مستثمر مبلغ principal = 1000 جنيهاً بمعدل عائد سنوي rate = 0.05 لمدة years = 2 سنوات. معادلة الفائدة المركبة هي A = P * (1 + r)^t. احسب المبلغ الإجمالي واطبعه برقمين عشريين بالصيغة: 'Total: 1102.50'.",
    microLesson: {
      concept: "المعادلات الأسية وتنسيق الأرقام العشرية",
      summary: "استخدم عامل الأس ** واستخدم تنسيق f-string مثل {amount:.2f} لطباعة خانتين عشريتين.",
      exampleCode: "p = 1000\nr = 0.05\nt = 2\na = p * ((1 + r) ** t)\nprint(f'Total: {a:.2f}')"
    },
    starterCode: "p = 1000\nr = 0.05\nt = 2\n# احسب واطبع: Total: 1102.50\n",
    requirements: [
      "طبق معادلة الفائدة المركبة",
      "اطبع الناتج: Total: 1102.50"
    ],
    expectedOutput: "Total: 1102.50",
    hints: [
      "amount = p * ((1 + r) ** t)",
      "print(f'Total: {amount:.2f}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Total: 1102.50", description: "حساب الفائدة المركبة السنوية" }
    ],
    nextChallengeId: "world-2-level-7"
  },
  "world-2-level-7": {
    id: "world-2-level-7",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ: متتالية الأنماط الرياضية الخفية",
    englishTitle: "IQ Puzzle: Quadratic Number Sequence Mystery",
    subtitle: "تحدي اكتشاف الأنماط والتفكير الرياضي",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["iq", "logic", "sequences", "pattern_recognition"],
    story: "لغز ذكاء رياضي: متتالية الأرقام هي: 2, 6, 12, 20, 30. اكتشف علماء الرياضيات أن كل حد n يحسب بالمعادلة n * (n + 1). اكتب برنامجاً يحسب الحد السادس لـ n = 6 (الناتج 42) ويطبع: 'Term 6: 42'.",
    microLesson: {
      concept: "اكتشاف العلاقات الرياضية بين الحدود",
      summary: "المتتالية المربعة n*(n+1) تسمى أرقام المستطيلات (Oblong Numbers) وتمثل متتالية رياضية شهيرة في اختبارات IQ.",
      exampleCode: "n = 6\nterm = n * (n + 1)\nprint(f'Term 6: {term}')"
    },
    starterCode: "n = 6\n# احسب الحد السادس واطبع: Term 6: 42\n",
    requirements: [
      "احسب الحد السادس n * (n + 1)",
      "اطبع السطر: Term 6: 42"
    ],
    expectedOutput: "Term 6: 42",
    hints: [
      "term = n * (n + 1)",
      "print(f'Term 6: {term}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Term 6: 42", description: "حساب الحد السادس في المتتالية" }
    ],
    nextChallengeId: "world-2-level-8"
  },
  "world-2-level-8": {
    id: "world-2-level-8",
    worldId: "world-2",
    worldTitle: "وادي المتغيرات",
    levelNumber: 8,
    title: "💼 مشكلة برمجية واقعية: محول العملات وسعر الصرف البنكي",
    englishTitle: "Real-world Problem: Currency Exchange & Bank Fee",
    subtitle: "حل المشكلات والتطبيقات المالية للمتغيرات",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["real_world", "variables", "finance"],
    story: "مشكلة برمجية بنكية: يرغب عميل في استبدال usd = 100 دولار إلى الجنيه المصري بسعر صرف rate = 50.5 مع خصم عمولة بنكية fee بنسبة 2% من المبلغ الإجمالي بالجنيه. احسب المبلغ الصافي النهائي واطبعه برقمين عشريين: 'Net EGP: 4949.00'.",
    microLesson: {
      concept: "العمليات الحسابية المتعددة للمتغيرات",
      summary: "احسب المبلغ الإجمالي بالجنيه ثم اخصم العمولة للحصول على القيمة الصافية المستحقة.",
      exampleCode: "usd = 100\nrate = 50.5\ngross = usd * rate\nfee = gross * 0.02\nnet = gross - fee\nprint(f'Net EGP: {net:.2f}')"
    },
    starterCode: "usd = 100\nrate = 50.5\n# احسب الصافي واطبع: Net EGP: 4949.00\n",
    requirements: [
      "احسب المبلغ الإجمالي بالجنيه واخصم عمولة 2%",
      "اطبع الناتج: Net EGP: 4949.00"
    ],
    expectedOutput: "Net EGP: 4949.00",
    hints: [
      "gross = usd * rate",
      "net = gross * 0.98",
      "print(f'Net EGP: {net:.2f}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Net EGP: 4949.00", description: "تحويل العملات وحساب العمولة البنكية" }
    ],
    unlocksWorldId: "world-3",
    nextChallengeId: "world-2-level-9"
  },

  // WORLD 3
  "world-3-level-1": {
    id: "world-3-level-1",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 1,
    title: "بوابة فحص السن",
    subtitle: "استخدام الجملة الشرطية if",
    difficulty: "easy",
    type: "write_code",
    baseXp: 80,
    skills: ["conditions", "if"],
    story: "وصلت إلى كهف الشروط. بوابة الكهف تفحص عمر المغامر age = 20. إذا كان العمر 18 أو أكثر، اطبع 'Access Granted'.",
    microLesson: {
      concept: "الجملة الشرطية if",
      summary: "تتيح لك if تنفيذ أوامر معينة فقط إذا تحقق شرط معين. لاحظ وضع : في نهاية السطر والمسافة البادئة للسطر التالي.",
      exampleCode: "x = 10\nif x > 5:\n    print('Greater than 5')"
    },
    starterCode: "age = 20\n# اكتب شرط if لفحص السن واطبع Access Granted\n",
    requirements: [
      "استخدم if age >= 18:",
      "اطبع: Access Granted"
    ],
    expectedOutput: "Access Granted",
    hints: [
      "تذكر وضع النقطتين : في نهاية سطر if",
      "اجعل سطر print مائلاً بمسافة بادئة (4 مسافات)"
    ],
    nextChallengeId: "world-3-level-2"
  },
  "world-3-level-2": {
    id: "world-3-level-2",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 2,
    title: "رتبة المغامر السحرية",
    subtitle: "تعدد الشروط if / elif / else",
    difficulty: "medium",
    type: "write_code",
    baseXp: 90,
    skills: ["elif", "else"],
    story: "يحدد الكهف رتبتك حسب النقاط score = 85:\nإذا كانت النقاط >= 90 اطبع 'Diamond'\nإذا كانت النقاط >= 80 اطبع 'Gold'\nغير ذلك اطبع 'Silver'",
    microLesson: {
      concept: "تعدد الشروط elif",
      summary: "عند وجود أكثر من احتمال نستخدم elif، وفي النهاية نضع else للحالات المتبقية.",
      exampleCode: "score = 75\nif score >= 90:\n    print('A')\nelif score >= 70:\n    print('B')\nelse:\n    print('C')"
    },
    starterCode: "score = 85\n# اكتب الشروط الثلاثة\n",
    requirements: [
      "افحص قيمة score",
      "الناتج لدرجة 85 يجب أن يطبع: Gold"
    ],
    expectedOutput: "Gold",
    hints: [
      "if score >= 90: print('Diamond')",
      "elif score >= 80: print('Gold')",
      "else: print('Silver')"
    ],
    nextChallengeId: "world-3-level-3"
  },
  "world-3-level-3": {
    id: "world-3-level-3",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 3,
    title: "فخ علامة المساواة",
    subtitle: "صائد الأخطاء: الفرق بين = و ==",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 85,
    skills: ["debugging", "comparison"],
    story: "وقع مبرمج الكهف في أشهر خطأ في بايثون! استخدم = (إسناد قيمة) بدلاً من == (مقارنة الشرط). أصلح الكود ليطبع Unlocked بنجاح.",
    microLesson: {
      concept: "= مقابل ==",
      summary: "= تستخدم لتعيين قيمة لمتغير: x = 5\nبينما == تستخدم للمقارنة وفحص التساوي: if x == 5:",
      exampleCode: "x = 5\nif x == 5:\n    print('Equal')"
    },
    starterCode: "magic_number = 7\n# أصلح الخطأ في السطر التالي:\nif magic_number = 7:\n    print('Unlocked')\n",
    requirements: [
      "استبدل = بـ == في سطر الشرط",
      "اطبع: Unlocked"
    ],
    expectedOutput: "Unlocked",
    hints: [
      "في سطر if، يجب أن تكون المقارنة بـ == وليس ="
    ],
    nextChallengeId: "world-3-level-4"
  },
  "world-3-level-4": {
    id: "world-3-level-4",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 4,
    title: "👑 لغز حكيم الكهف",
    subtitle: "تحدي الزعيم: فك شفرة الكهف المعقدة",
    difficulty: "boss",
    type: "boss",
    baseXp: 200,
    skills: ["logical_operators", "nested_conditions"],
    story: "يقف حكيم الكهف أمام الممر المؤدي لغابة التكرار! ولديك مفتاحان: has_key = True و energy = 80. افتح البوابة إذا كان لديك المفتاح و الطاقة أكبر من أو تساوي 50 بطباعة: 'Cave Master Defeated'",
    microLesson: {
      concept: "العوامل المنطقية and و or",
      summary: "نستخدم and للتأكد من تحقق الشرطين معاً، ونستخدم or إذا كان يكفي تحقق أحدهما.",
      exampleCode: "if has_pass and score > 50:\n    print('Passed')"
    },
    starterCode: "has_key = True\nenergy = 80\n# افحص الشرطين معاً واطبع Cave Master Defeated\n",
    requirements: [
      "استخدم if مع and للتحقق من has_key و energy >= 50",
      "اطبع العبارة: Cave Master Defeated"
    ],
    expectedOutput: "Cave Master Defeated",
    hints: [
      "if has_key and energy >= 50:",
      "    print('Cave Master Defeated')"
    ],
    unlocksWorldId: "world-4",
    nextChallengeId: "world-3-level-5"
  },

  "world-3-level-5": {
    id: "world-3-level-5",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 5,
    title: "🎯 مسألة ستانفورد: أكاديمية خانسول للرياضيات الذهنية",
    englishTitle: "Stanford CS106A: Khansole Academy Checker",
    subtitle: "تحدي حل المشكلات من جامعة ستانفورد",
    difficulty: "medium",
    type: "write_code",
    baseXp: 210,
    skills: ["conditions", "if_else", "comparison", "stanford_cs106a"],
    story: "مسألة المقارنات الشهيرة في جامعة ستانفورد (Khansole Academy): لديك مسألة جمع num1 = 15 و num2 = 25 وإجابة الطالب answer = 40. اكتب شرط if: إذا كانت الإجابة صحيحة (تساوي مجموع الرقمين) اطبع 'Correct! Answer is 40' وإلا اطبع 'Incorrect!'.",
    microLesson: {
      concept: "منهج ستانفورد: اتخاذ القرار المنطقي",
      summary: "نقارن إجابة المستخدم مع القيمة المحسوبة الصحيحة باستخدام عامل المساواة == مع التفريع الشرطي.",
      exampleCode: "if answer == num1 + num2:\n    print(f'Correct! Answer is {answer}')"
    },
    starterCode: "# مسألة جامعة ستانفورد (CS106A)\nnum1 = 15\nnum2 = 25\nanswer = 40\n# افحص إذا كانت الإجابة صحيحة واطبع النتيجة\n",
    requirements: [
      "افحص ما إذا كان answer == num1 + num2",
      "اطبع عند الصحة: Correct! Answer is 40"
    ],
    expectedOutput: "Correct! Answer is 40",
    hints: [
      "if answer == num1 + num2:",
      "    print(f'Correct! Answer is {answer}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Correct! Answer is 40", description: "فحص إجابة أكاديمية خانسول" }
    ],
    nextChallengeId: "world-3-level-6"
  },

  "world-3-level-6": {
    id: "world-3-level-6",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: متباينة المثلث وتحديد نوعه",
    englishTitle: "Math Challenge: Triangle Inequality & Classification",
    subtitle: "الشروط المركبة والقوانين الهندسية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 170,
    skills: ["math", "conditions", "geometry"],
    story: "مسألة رياضية: لديك أطوال الأضلاع a = 5 و b = 5 و c = 8. أولاً تحقق من متباينة المثلث (مجموع أي ضلعين أكبر من الضلع الثالث: a+b>c و a+c>b و b+c>a). إذا صحت، افحص: إذا تساوى ضلعان فقط فهو متساوي الساقين واطبع 'Isosceles Triangle'.",
    microLesson: {
      concept: "الشروط المركبة بواسطة and و or",
      summary: "استخدم الشروط المتداخلة if/elif لفحص المتباينة أولاً ثم تصنيف أضلاع المثلث.",
      exampleCode: "if a + b > c and a + c > b and b + c > a:\n    if a == b or b == c or a == c:\n        print('Isosceles Triangle')"
    },
    starterCode: "a = 5\nb = 5\nc = 8\n# افحص الشروط واطبع نوع المثلث\n",
    requirements: [
      "تأكد من صحة متباينة المثلث",
      "اطبع: Isosceles Triangle"
    ],
    expectedOutput: "Isosceles Triangle",
    hints: [
      "if a + b > c and a + c > b and b + c > a:",
      "    if a == b or b == c or a == c: print('Isosceles Triangle')"
    ],
    testCases: [
      { input: "", expectedOutput: "Isosceles Triangle", description: "فحص متباينة وتصنيف المثلث" }
    ],
    nextChallengeId: "world-3-level-7"
  },
  "world-3-level-7": {
    id: "world-3-level-7",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ: معضلة حراس الصدق والكذب (Knights & Knaves)",
    englishTitle: "IQ Puzzle: Boolean Guard Logic Deduction",
    subtitle: "تحدي الذكاء المنطقي والاستنتاج البرمجي",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["iq", "logic", "booleans"],
    story: "لغز ذكاء منطقي كلاسيكي: حارسان A و B. الحارس A يقول 'كلانا كاذب'. إذا كان A صادقاً فعبارته حقيقة مما يعني أنه كاذب (تناقض!). إذن الحارس A كاذب بالضرورة (False) والحارس B صادق (True). اكتب برنامجاً يعين guard_a = False و guard_b = True واطبع: 'Guard A: False, Guard B: True'.",
    microLesson: {
      concept: "الاستنتاج المنطقي والقيم البولينية",
      summary: "في الجبر البوليني، التناقض يعني استحالة الفرضية الأولى، مما يقودنا للنتيجة الصحيحة.",
      exampleCode: "guard_a = False\nguard_b = not guard_a\nprint(f'Guard A: {guard_a}, Guard B: {guard_b}')"
    },
    starterCode: "# لغز الذكاء: عين الحالتين واطبع النتيجة\n",
    requirements: [
      "عين guard_a = False و guard_b = True",
      "اطبع: Guard A: False, Guard B: True"
    ],
    expectedOutput: "Guard A: False, Guard B: True",
    hints: [
      "guard_a = False",
      "guard_b = True",
      "print(f'Guard A: {guard_a}, Guard B: {guard_b}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Guard A: False, Guard B: True", description: "حل لغز الحراس البوليني" }
    ],
    nextChallengeId: "world-3-level-8"
  },
  "world-3-level-8": {
    id: "world-3-level-8",
    worldId: "world-3",
    worldTitle: "كهف الشروط",
    levelNumber: 8,
    title: "💼 مشكلة برمجية واقعية: نظام كشف سرعة الرادار والغرامات الذكي",
    englishTitle: "Real-world Problem: Smart Speed Radar & Fine System",
    subtitle: "حل المشكلات المرورية والتطبيقية",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["real_world", "conditions", "logic"],
    story: "مشكلة برمجية واقعية: رصد رادار ذكي سيارة تسير بسرعة speed = 135 كم/س على طريق حده الأقصى limit = 120 كم/س. إذا تجاوز السائق السرعة بأقل من 20 كم/س فالغرامة 300 جنيه. احسب مقدار التجاوز (15 كم/س) واطبع رسالة الغرامة: 'Over speed by 15 km/h: Fine 300 EGP'.",
    microLesson: {
      concept: "هندسة الشروط في الأنظمة المرورية والرقابية",
      summary: "حساب الفارق ومقارنته بنطاقات متدرجة باستخدام if/elif لتحديد العقوبة بدقة.",
      exampleCode: "speed = 135\nlimit = 120\nover = speed - limit\nif over < 20:\n    print(f'Over speed by {over} km/h: Fine 300 EGP')"
    },
    starterCode: "speed = 135\nlimit = 120\n# احسب التجاوز واطبع الغرامة\n",
    requirements: [
      "احسب التجاوز = speed - limit",
      "اطبع السطر: Over speed by 15 km/h: Fine 300 EGP"
    ],
    expectedOutput: "Over speed by 15 km/h: Fine 300 EGP",
    hints: [
      "over = speed - limit",
      "print(f'Over speed by {over} km/h: Fine 300 EGP')"
    ],
    testCases: [
      { input: "", expectedOutput: "Over speed by 15 km/h: Fine 300 EGP", description: "حساب غرامة الرادار الذكي" }
    ],
    unlocksWorldId: "world-4",
    nextChallengeId: "world-3-level-9"
  },

  // WORLD 4
  "world-4-level-1": {
    id: "world-4-level-1",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 1,
    title: "فتح البوابات الخمس",
    subtitle: "التكرار باستخدام for و range",
    difficulty: "easy",
    type: "write_code",
    baseXp: 90,
    skills: ["for_loop", "range"],
    story: "غابة التكرار (Loop Forest) تحتاج مساعدتك! هناك 5 بوابات يجب فتحها مرقمة من 0 إلى 4. استخدم for loop مع range(5) لطباعة أرقام البوابات.",
    microLesson: {
      concept: "حلقة التكرار for loop",
      summary: "تستخدم for لتكرار تنفيذ مجموعة من الأوامر لعدد محدد من المرات باستخدام range(n):\nfor i in range(5):\n    print(i)",
      exampleCode: "for i in range(3):\n    print('Hello')"
    },
    starterCode: '# استخدم for مع range(5) لطباعة الأرقام 0 إلى 4\n',
    requirements: [
      "استخدم for loop",
      "استخدم range(5)",
      "اطبع الأرقام من 0 إلى 4 كل رقم في سطر"
    ],
    expectedOutput: "0\n1\n2\n3\n4",
    hints: [
      "ابدأ بـ: for i in range(5):",
      "داخل الحلقة: print(i)"
    ],
    nextChallengeId: "world-4-level-2"
  },
  "world-4-level-2": {
    id: "world-4-level-2",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 2,
    title: "جمع ثمار الغابة",
    subtitle: "نمط التراكم والتجميع Accumulator Pattern",
    difficulty: "medium",
    type: "write_code",
    baseXp: 100,
    skills: ["accumulation", "for_loop"],
    story: "اجمع ثمار الغابة! اكتب برنامجاً يحسب مجموع الأعداد من 1 إلى 5 باستخدام for loop واطبع الناتج النهائي فقط (15).",
    microLesson: {
      concept: "تجميع القيم في حلقة التكرار",
      summary: "نعرف متغيراً للمجموع قبل الحلقة بقيمة صفر، ثم نضيف له في كل دورة:\ntotal = 0\nfor i in range(1, 6):\n    total += i\nprint(total)",
      exampleCode: "s = 0\nfor x in [1, 2, 3]:\n    s += x\nprint(s)"
    },
    starterCode: "total = 0\n# استخدم for loop لإضافة الأعداد من 1 إلى 5 إلى total\n# ثم اطبع total خارج الحلقة\n",
    requirements: [
      "استخدم for loop مع range(1, 6)",
      "اجمع الأعداد في المتغير total",
      "اطبع الناتج النهائي فقط: 15"
    ],
    expectedOutput: "15",
    hints: [
      "range(1, 6) يعطيك الأعداد 1، 2، 3، 4، 5",
      "داخل الحلقة: total += i",
      "تأكد أن print(total) ليست داخل الحلقة بل بعدها"
    ],
    nextChallengeId: "world-4-level-3"
  },
  "world-4-level-3": {
    id: "world-4-level-3",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 3,
    title: "فخ الحلقة اللانهائية",
    subtitle: "صائد الأخطاء: حلقة while لا تتوقف!",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 95,
    skills: ["while_loop", "debugging"],
    story: "عالقون في دوامة زمنية بغابة التكرار! كود حلقة while نسي زيادة العداد count مما تسبب في حلقة لا نهائية. أصلح الكود بطباعة count من 1 إلى 3 وتحديث العداد.",
    microLesson: {
      concept: "حلقات while وتفادي التكرار اللانهائي",
      summary: "حلقة while تستمر طالما الشرط True. لذلك يجب تعديل المتغير في كل دورة حتى يتوقف الشرط.",
      exampleCode: "i = 0\nwhile i < 2:\n    print(i)\n    i += 1"
    },
    starterCode: "count = 1\nwhile count <= 3:\n    print(count)\n    # أضف السطر الناقص لزيادة عداد count ومنع التكرار اللانهائي\n",
    requirements: [
      "أضف زيادة للعداد: count += 1",
      "تأكد أن الكود يطبع: 1 ثم 2 ثم 3 ويتوقف"
    ],
    expectedOutput: "1\n2\n3",
    hints: [
      "داخل الحلقة، أضف السطر: count += 1"
    ],
    nextChallengeId: "world-4-level-4"
  },
  "world-4-level-4": {
    id: "world-4-level-4",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 4,
    title: "👑 وحش شجرة السنديان العتيقة",
    subtitle: "تحدي الزعيم: العد التنازلي لهزيمة الوحش",
    difficulty: "boss",
    type: "boss",
    baseXp: 220,
    skills: ["loops", "reverse_range", "integration"],
    story: "وحش السنديان العملاق يهدد الغابة! عليك إطلاق تعويذة عد تنازلي من 3 إلى 1 ثم طباعة 'Monster Defeated!'. استخدم حلقة تكرار لطباعة 3 ثم 2 ثم 1 ثم اطبع عبارة النصر.",
    microLesson: {
      concept: "العد التنازلي",
      summary: "يمكنك العد تنازلياً باستخدام range(3, 0, -1) أو باستخدام حلقة while تنقص 1 في كل مرة.",
      exampleCode: "for i in range(3, 0, -1):\n    print(i)\nprint('Go!')"
    },
    starterCode: "# اطبع 3 ثم 2 ثم 1 باستخدام loop، ثم اطبع Monster Defeated!\n",
    requirements: [
      "استخدم loop للعد التنازلي 3, 2, 1",
      "اطبع في النهاية: Monster Defeated!"
    ],
    expectedOutput: "3\n2\n1\nMonster Defeated!",
    hints: [
      "for i in [3, 2, 1]: print(i)",
      "أو for i in range(3, 0, -1): print(i)",
      "ثم print('Monster Defeated!')"
    ],
    unlocksWorldId: "world-5",
    nextChallengeId: "world-4-level-5"
  },

  "world-4-level-5": {
    id: "world-4-level-5",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 5,
    title: "⚡ مسألة ستانفورد: متسلسلة هيلستون الأسطورية",
    englishTitle: "Stanford CS106A: Hailstone Sequence (Collatz 3n+1)",
    subtitle: "تحدي حل المشكلات من جامعة ستانفورد",
    difficulty: "hard",
    type: "write_code",
    baseXp: 230,
    skills: ["while_loops", "arithmetic", "collatz", "stanford_cs106a"],
    story: "المسألة الخوارزمية الأشهر في جامعة ستانفورد: ابدأ بالعدد n = 6. طالما أن n != 1: إذا كان زوجياً يقسم على 2، وإذا كان فردياً يضرب في 3 ويضاف له 1. في كل خطوة زد عداد الخطوات steps بمقدار 1. اطبع عدد الخطوات النهائي فقط بصيغة: Steps: 8",
    microLesson: {
      concept: "منهج ستانفورد: متسلسلة هيلستون",
      summary: "حلقة while مع شروط تكرارية ديناميكية تحسب عدد الخطوات اللازمة لهبوط الرقم حتى يصل إلى 1.",
      exampleCode: "n = 6\nsteps = 0\nwhile n != 1:\n    if n % 2 == 0:\n        n //= 2\n    else:\n        n = 3 * n + 1\n    steps += 1\nprint(f'Steps: {steps}')"
    },
    starterCode: "# مسألة جامعة ستانفورد (CS106A)\nn = 6\nsteps = 0\n# اكتب حلقة التكرار واطبع عدد الخطوات النهائية بصيغة: Steps: 8\n",
    requirements: [
      "طبق خوارزمية هيلستون على n = 6",
      "اطبع عدد الخطوات النهائي فقط: Steps: 8"
    ],
    expectedOutput: "Steps: 8",
    hints: [
      "while n != 1:",
      "    if n % 2 == 0: n //= 2",
      "    else: n = 3 * n + 1",
      "    steps += 1",
      "print(f'Steps: {steps}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Steps: 8", description: "حساب خطوات متسلسلة هيلستون للعدد 6" }
    ],
    nextChallengeId: "world-4-level-6"
  },

  "world-4-level-6": {
    id: "world-4-level-6",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: مجموع مربعات الأعداد الفردية التراكمي",
    englishTitle: "Math Challenge: Sum of Odd Squares Accumulator",
    subtitle: "حلقات التكرار والمتسلسلات الرياضية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 170,
    skills: ["math", "loops", "range"],
    story: "مسألة رياضية: باستخدام حلقة for و range، احسب مجموع مربعات الأعداد الفردية المحصورة بين 1 و 9 (أي: 1^2 + 3^2 + 5^2 + 7^2 + 9^2 = 1 + 9 + 25 + 49 + 81 = 165). اطبع الناتج بالصيغة: 'Sum of odd squares: 165'.",
    microLesson: {
      concept: "التكرار بخطوة محددة step في range",
      summary: "الدالة range(1, 10, 2) تمر على الأعداد الفردية فقط: 1، 3، 5، 7، 9.",
      exampleCode: "total = 0\nfor x in range(1, 10, 2):\n    total += x ** 2\nprint(f'Sum of odd squares: {total}')"
    },
    starterCode: "# احسب مجموع مربعات الأعداد الفردية من 1 إلى 9\ntotal = 0\n# اكتب الحلقة واطبع: Sum of odd squares: 165\n",
    requirements: [
      "استخدم حلقة for لحساب مجموع المربعات الفردية",
      "اطبع السطر: Sum of odd squares: 165"
    ],
    expectedOutput: "Sum of odd squares: 165",
    hints: [
      "for i in range(1, 10, 2): total += i ** 2",
      "print(f'Sum of odd squares: {total}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Sum of odd squares: 165", description: "حساب متسلسلة مربعات الأعداد الفردية" }
    ],
    nextChallengeId: "world-4-level-7"
  },
  "world-4-level-7": {
    id: "world-4-level-7",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ: متتالية الخطوات الصاعدة والنازلة (Collatz Steps)",
    englishTitle: "IQ Puzzle: Hailstone Steps to Reach One",
    subtitle: "تحدي التفكير الخوارزمي وحلقات while",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["iq", "logic", "while_loop", "algorithms"],
    story: "لغز ذكاء خوارزمي: حدسية كولاتز (Collatz Conjecture): ابدأ بالرقم n = 12. إذا كان زوجياً اقسمه على 2، وإذا كان فردياً اضربه في 3 واجمع 1. كرر العملية حتى تصل إلى 1، واحسب عدد الخطوات اللازمة. اطبع عدد الخطوات: 'Steps: 9'.",
    microLesson: {
      concept: "حلقات while المشروطة وحساب الخطوات",
      summary: "تستمر الحلقة while n != 1 في التنفيذ طالما لم يصل الرقم إلى 1، مع زيادة العداد steps في كل خطوة.",
      exampleCode: "n = 12\nsteps = 0\nwhile n != 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    steps += 1\nprint(f'Steps: {steps}')"
    },
    starterCode: "n = 12\nsteps = 0\n# احسب خطوات الوصول للرقم 1 واطبع: Steps: 9\n",
    requirements: [
      "طبق قاعدة كولاتز حتى n == 1",
      "اطبع الناتج: Steps: 9"
    ],
    expectedOutput: "Steps: 9",
    hints: [
      "while n != 1: if n % 2 == 0: n = n // 2 else: n = 3 * n + 1; steps += 1",
      "print(f'Steps: {steps}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Steps: 9", description: "حساب خطوات متتالية كولاتز للرقم 12" }
    ],
    nextChallengeId: "world-4-level-8"
  },
  "world-4-level-8": {
    id: "world-4-level-8",
    worldId: "world-4",
    worldTitle: "غابة التكرار",
    levelNumber: 8,
    title: "💼 مشكلة برمجية واقعية: محاكي تنزيل ملفات السيرفر وشريط التقدم",
    englishTitle: "Real-world Problem: File Download Chunks Simulator",
    subtitle: "حل المشكلات التكرارية ومحاكاة الشبكات",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["real_world", "loops", "simulation"],
    story: "مشكلة برمجية واقعية: ملف كبير بحجم total = 100 ميجابايت يتم تنزيله من الخادم السحابي بدفعات chunk = 25 ميجابايت في كل لفة تكرارية بحلقة while. عند اكتمال التنزيل واستهلاك كافة الأجزاء، اطبع رسالة إتمام التنزيل: 'Download Complete: 100%'.",
    microLesson: {
      concept: "محاكاة معالجة التدفقات والشبكات",
      summary: "تستخدم حلقة while لمعالجة أجزاء البيانات (Chunks) حتى الوصول إلى الحجم الإجمالي.",
      exampleCode: "total = 100\nchunk = 25\ndownloaded = 0\nwhile downloaded < total:\n    downloaded += chunk\nprint(f'Download Complete: {int((downloaded/total)*100)}%')"
    },
    starterCode: "total = 100\nchunk = 25\ndownloaded = 0\n# كرر التنزيل واطبع: Download Complete: 100%\n",
    requirements: [
      "حدث downloaded حتى تصل إلى total",
      "اطبع: Download Complete: 100%"
    ],
    expectedOutput: "Download Complete: 100%",
    hints: [
      "while downloaded < total: downloaded += chunk",
      "print('Download Complete: 100%')"
    ],
    testCases: [
      { input: "", expectedOutput: "Download Complete: 100%", description: "محاكاة اكتمال تنزيل الملف" }
    ],
    unlocksWorldId: "world-5",
    nextChallengeId: "world-4-level-9"
  },

  // WORLD 5
  "world-5-level-1": {
    id: "world-5-level-1",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 1,
    title: "حقيبة أدوات المدينة",
    subtitle: "إنشاء القوائم والفهرسة Indexing",
    difficulty: "easy",
    type: "write_code",
    baseXp: 90,
    skills: ["lists", "indexing"],
    story: "مرحباً بك في مدينة القوائم! أنشئ قائمة باسم items تحتوي على العناصر الثلاثة: 'sword', 'shield', 'potion'. ثم اطبع العنصر الأول باستخدام الفهرس [0].",
    microLesson: {
      concept: "القوائم Lists والفهرسة",
      summary: "القوائم تحفظ عدة عناصر بين أقواس مربعة []، ويبدأ ترقيم العناصر دائماً من الصفر 0:\nmy_list = ['A', 'B', 'C']\nprint(my_list[0])  # 'A'",
      exampleCode: "heroes = ['Omar', 'Sara']\nprint(heroes[0])"
    },
    starterCode: "# أنشئ قائمة items = ['sword', 'shield', 'potion'] واطبع العنصر الأول sword\n",
    requirements: [
      "أنشئ items = ['sword', 'shield', 'potion']",
      "اطبع items[0] فقط (sword)"
    ],
    expectedOutput: "sword",
    hints: [
      "items = ['sword', 'shield', 'potion']",
      "print(items[0])"
    ],
    nextChallengeId: "world-5-level-2"
  },
  "world-5-level-2": {
    id: "world-5-level-2",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 2,
    title: "إضافة أداة سحرية للقائمة",
    subtitle: "دالة الإضافة append ودالة الطول len",
    difficulty: "medium",
    type: "write_code",
    baseXp: 95,
    skills: ["append", "len"],
    story: "لديك قائمة spells = ['fire', 'ice']. أضف إليها العنصر 'thunder' باستخدام append() ثم اطبع عدد عناصر القائمة باستخدام len().",
    microLesson: {
      concept: "تعديل القوائم",
      summary: "نستخدم .append() لإضافة عنصر جديد في نهاية القائمة، ونستخدم len() لمعرفة عدد عناصرها الإجمالي.",
      exampleCode: "nums = [1, 2]\nnums.append(3)\nprint(len(nums))"
    },
    starterCode: "spells = ['fire', 'ice']\n# أضف 'thunder' ثم اطبع طول القائمة بواسطة len\n",
    requirements: [
      "استخدم spells.append('thunder')",
      "اطبع len(spells) (الناتج هو 3)"
    ],
    expectedOutput: "3",
    hints: [
      "spells.append('thunder')",
      "print(len(spells))"
    ],
    nextChallengeId: "world-5-level-3"
  },
  "world-5-level-3": {
    id: "world-5-level-3",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 3,
    title: "فهرس خارج النطاق IndexError",
    subtitle: "صائد الأخطاء: طلب عنصر غير موجود",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 90,
    skills: ["debugging", "index_error"],
    story: "حاول أحد المبرمجين طباعة العنصر الأخير من قائمة بها 3 عناصر فقط، فكتب index 3 وتسبب في خطأ IndexError! أصلح الفهرس ليطبع العنصر الأخير الصحيح 'Gold'.",
    microLesson: {
      concept: "IndexError",
      summary: "إذا كانت القائمة تحتوي 3 عناصر، فإن الفهارس المتاحة هي 0 و 1 و 2 فقط. العنصر الأخير يكون دائماً عند الفهرس 2 أو [-1]!",
      exampleCode: "lst = ['A', 'B']\n# lst[2] يسبب خطأ\n# lst[1] أو lst[-1] صحيح"
    },
    starterCode: "rewards = ['Bronze', 'Silver', 'Gold']\n# أصلح الفهرس في السطر التالي لطباعة Gold\nprint(rewards[3])\n",
    requirements: [
      "أصلح الفهرس ليكون 2 أو -1",
      "تأكد أن الكود يطبع: Gold"
    ],
    expectedOutput: "Gold",
    hints: [
      "استبدل 3 بـ 2 أو بـ -1"
    ],
    nextChallengeId: "world-5-level-4"
  },
  "world-5-level-4": {
    id: "world-5-level-4",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 4,
    title: "👑 حاكم مدينة القوائم",
    subtitle: "تحدي الزعيم: تصفية وحساب القيم الفائزة",
    difficulty: "boss",
    type: "boss",
    baseXp: 240,
    skills: ["lists", "loops", "filters"],
    story: "حاكم المدينة يختبر قدرتك على معالجة البيانات الضخمة! لديك قائمة درجات scores = [45, 80, 95, 30, 88]. احسب عدد الدرجات الناجحة (التي تكون >= 50) واطبع هذا العدد.",
    microLesson: {
      concept: "المرور على القوائم مع الشروط",
      summary: "نمر على القائمة بحلقة for، ونفحص كل عنصر بجملة if، ونزيد عداد الناجحين.",
      exampleCode: "nums = [1, 10, 3, 20]\nbig = 0\nfor n in nums:\n    if n > 5:\n        big += 1\nprint(big)"
    },
    starterCode: "scores = [45, 80, 95, 30, 88]\npass_count = 0\n# مر على الدرجات وزد pass_count للدرجات >= 50 ثم اطبعه\n",
    requirements: [
      "مر على القائمة وافحص الدرجات >= 50",
      "اطبع عدد الدرجات الناجحة فقط (3)"
    ],
    expectedOutput: "3",
    hints: [
      "for s in scores:",
      "    if s >= 50: pass_count += 1",
      "print(pass_count)"
    ],
    unlocksWorldId: "world-6",
    nextChallengeId: "world-5-level-5"
  },

  "world-5-level-5": {
    id: "world-5-level-5",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 5,
    title: "🔤 مسألة ستانفورد: منقي الكلمات المتقدمة",
    englishTitle: "Stanford CS106A: Word Filter (Length >= 4)",
    subtitle: "تحدي حل المشكلات من جامعة ستانفورد",
    difficulty: "medium",
    type: "write_code",
    baseXp: 250,
    skills: ["lists", "list_comprehension", "strings", "stanford_cs106a"],
    story: "مسألة تصفية القوائم في جامعة ستانفورد (Stanford CS106A): لديك القائمة words = ['code', 'stanford', 'ai', 'python']. اكتب برنامجاً يستخرج فقط الكلمات التي يبلغ طولها 4 أحرف أو أكثر ويطبع القائمة المصفاة الناتجة.",
    microLesson: {
      concept: "منهج ستانفورد: تصفية القوائم",
      summary: "نستخدم دالة len() لفحص طول كل نص داخل القائمة وإضافته إلى قائمة جديدة أو تصفيتها بالـ comprehension.",
      exampleCode: "words = ['code', 'stanford', 'ai', 'python']\nfiltered = [w for w in words if len(w) >= 4]\nprint(filtered)"
    },
    starterCode: "# مسألة جامعة ستانفورد (CS106A)\nwords = ['code', 'stanford', 'ai', 'python']\n# استخرج واطبع الكلمات ذات الطول 4 أو أكثر\n",
    requirements: [
      "صفِ القائمة words لتشمل الكلمات التي len(w) >= 4",
      "اطبع القائمة الناتجة: ['code', 'stanford', 'python']"
    ],
    expectedOutput: "['code', 'stanford', 'python']",
    hints: [
      "filtered = [w for w in words if len(w) >= 4]",
      "print(filtered)"
    ],
    testCases: [
      { input: "", expectedOutput: "['code', 'stanford', 'python']", description: "تصفية الكلمات ذات الطول الأكبر من 3" }
    ],
    nextChallengeId: "world-5-level-6"
  },

  "world-5-level-6": {
    id: "world-5-level-6",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: حساب التباين الإحصائي لمجموعة بيانات",
    englishTitle: "Math Challenge: Statistical Variance of a List",
    subtitle: "القوائم والعمليات الإحصائية الرياضية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 170,
    skills: ["math", "lists", "statistics"],
    story: "مسألة رياضية إحصائية: لديك درجات الطلاب في قائمة: data = [10, 20, 30, 40, 50]. المتوسط الحسابي هو sum(data) / len(data) = 30. التباين هو مجموع مربعات انحراف القيم عن المتوسط مقسوماً على عدد العناصر. احسب التباين واطبعه برقمين عشريين: 'Variance: 200.00'.",
    microLesson: {
      concept: "حساب المقاييس الإحصائية على القوائم",
      summary: "احسب المتوسط أولاً، ثم اجمع مربعات الفروق (x - mean)^2 واقسمها على طول القائمة.",
      exampleCode: "data = [10, 20, 30, 40, 50]\nmean = sum(data) / len(data)\nvar = sum((x - mean)**2 for x in data) / len(data)\nprint(f'Variance: {var:.2f}')"
    },
    starterCode: "data = [10, 20, 30, 40, 50]\n# احسب التباين واطبع: Variance: 200.00\n",
    requirements: [
      "احسب التباين الإحصائي للقائمة data",
      "اطبع السطر: Variance: 200.00"
    ],
    expectedOutput: "Variance: 200.00",
    hints: [
      "mean = sum(data) / len(data)",
      "var = sum((x - mean) ** 2 for x in data) / len(data)",
      "print(f'Variance: {var:.2f}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Variance: 200.00", description: "حساب التباين الإحصائي" }
    ],
    nextChallengeId: "world-5-level-7"
  },
  "world-5-level-7": {
    id: "world-5-level-7",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ: كاشف الرقم المفقود في المصفوفة المشوشة",
    englishTitle: "IQ Puzzle: Missing Number Detection with Gauss Formula",
    subtitle: "تحدي الذكاء وسرعة البديهة في القوائم",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["iq", "logic", "lists", "math"],
    story: "لغز ذكاء واختبارات الشركات العالمية: قائمة تحتوي على الأرقام من 1 إلى 10 سقط منها رقم واحد: nums = [1, 2, 3, 4, 6, 7, 8, 9, 10]. استخدم متسلسلة غاوس (10 * 11 // 2 = 55) واطرح منها مجموع عناصر القائمة لاكتشاف الرقم المفقود واطبع: 'Missing: 5'.",
    microLesson: {
      concept: "خوارزمية المجموع التراكمي لغاوص O(N)",
      summary: "بدلاً من البحث المتكرر O(N^2)، معادلة غاوس n*(n+1)//2 تكتشف العنصر المفقود في خطوة واحدة فائقة السرعة.",
      exampleCode: "nums = [1, 2, 3, 4, 6, 7, 8, 9, 10]\nexpected = 10 * 11 // 2\nmissing = expected - sum(nums)\nprint(f'Missing: {missing}')"
    },
    starterCode: "nums = [1, 2, 3, 4, 6, 7, 8, 9, 10]\n# اكتشف الرقم المفقود واطبع: Missing: 5\n",
    requirements: [
      "اكتشف الرقم المفقود بالمعادلة الرياضية",
      "اطبع السطر: Missing: 5"
    ],
    expectedOutput: "Missing: 5",
    hints: [
      "missing = (10 * 11 // 2) - sum(nums)",
      "print(f'Missing: {missing}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Missing: 5", description: "اكتشاف الرقم المفقود في القائمة" }
    ],
    nextChallengeId: "world-5-level-8"
  },
  "world-5-level-8": {
    id: "world-5-level-8",
    worldId: "world-5",
    worldTitle: "مدينة القوائم",
    levelNumber: 8,
    title: "💼 مشكلة برمجية واقعية: إزالة العناصر المكررة مع الحفاظ على الترتيب",
    englishTitle: "Real-world Problem: Ordered Deduplication Engine",
    subtitle: "حل المشكلات ومعالجة البيانات المتكررة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["real_world", "lists", "data_cleaning"],
    story: "مشكلة برمجية واقعية: في نظام فواتير، تكررت معرفات الطلبات: orders = [101, 102, 101, 103, 102, 104]. أنشئ قائمة جديدة تحتوي على العناصر الفريدة مع الحفاظ التام على ترتيب أول ظهور لكل عنصر، واطبع القائمة الناتجة: '[101, 102, 103, 104]'.",
    microLesson: {
      concept: "تنظيف البيانات مع الحفاظ على الترتيب",
      summary: "المرور على القائمة وإضافة العنصر فقط إذا لم يكن موجوداً مسبقاً يضمن تنقية البيانات مع الحفاظ على ترتيبها الزمني.",
      exampleCode: "orders = [101, 102, 101, 103, 102, 104]\nunique = []\nfor x in orders:\n    if x not in unique: unique.append(x)\nprint(unique)"
    },
    starterCode: "orders = [101, 102, 101, 103, 102, 104]\n# استخرج العناصر الفريدة بالترتيب واطبعها\n",
    requirements: [
      "أنشئ قائمة فريدة تحافظ على الترتيب الأصلي",
      "اطبع الناتج: [101, 102, 103, 104]"
    ],
    expectedOutput: "[101, 102, 103, 104]",
    hints: [
      "unique = []",
      "for x in orders: if x not in unique: unique.append(x)",
      "print(unique)"
    ],
    testCases: [
      { input: "", expectedOutput: "[101, 102, 103, 104]", description: "إزالة التكرار مع الحفاظ على الترتيب" }
    ],
    unlocksWorldId: "world-6",
    nextChallengeId: "world-5-level-9"
  },

  // WORLD 6
  "world-6-level-1": {
    id: "world-6-level-1",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 1,
    title: "آلة الترحيب الذاتي",
    subtitle: "تعريف واستدعاء الدوال def",
    difficulty: "easy",
    type: "write_code",
    baseXp: 95,
    skills: ["functions", "def"],
    story: "وصلت إلى مصنع الدوال! هنا نقوم ببناء آلات برمجية يعاد استخدامها. عرف دالة باسم greet تأخذ معاملاً name وتطبع f'Hello {name}'، ثم استدعها بالاسم 'Hero'.",
    microLesson: {
      concept: "بناء الدوال def",
      summary: "الدالة هي كتلة برمجية يعاد استخدامها تأخذ مدخلات وتنفذ مهمة محددة:\ndef say_hi(name):\n    print(f'Hi {name}')\nsay_hi('Ali')",
      exampleCode: "def add_one(x):\n    print(x + 1)\nadd_one(5)"
    },
    starterCode: "# عرف دالة greet(name) واستدعها بـ Hero\n",
    requirements: [
      "عرف دالة: def greet(name):",
      "استدعها: greet('Hero')",
      "يجب أن يطبع: Hello Hero"
    ],
    expectedOutput: "Hello Hero",
    hints: [
      "def greet(name):",
      "    print(f'Hello {name}')",
      "greet('Hero')"
    ],
    nextChallengeId: "world-6-level-2"
  },
  "world-6-level-2": {
    id: "world-6-level-2",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 2,
    title: "محرك حساب المساحات",
    subtitle: "إرجاع القيم باستخدام return",
    difficulty: "medium",
    type: "write_code",
    baseXp: 100,
    skills: ["return", "functions"],
    story: "عرف دالة اسمها calculate_area تأخذ العرض width والطول height وترجع (return) مساحة المستطيل width * height. ثم اطبع ناتج استدعائها بالقيم 5 و 4.",
    microLesson: {
      concept: "الفرق بين print و return",
      summary: "print تعرض النتيجة على الشاشة فقط، أما return فتعيد القيمة المحسوبة لاستخدامها في حسابات أو متغيرات أخرى.",
      exampleCode: "def mult(a, b):\n    return a * b\nprint(mult(3, 4))"
    },
    starterCode: "# عرف calculate_area واجعلها ترجع width * height ثم اطبع ناتج 5 و 4\n",
    requirements: [
      "استخدم كلمة return",
      "اطبع الناتج: 20"
    ],
    expectedOutput: "20",
    hints: [
      "def calculate_area(w, h): return w * h",
      "print(calculate_area(5, 4))"
    ],
    nextChallengeId: "world-6-level-3"
  },
  "world-6-level-3": {
    id: "world-6-level-3",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 3,
    title: "صائد الأخطاء: return المنسية",
    subtitle: "صائد الأخطاء: الدالة تعيد None!",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 95,
    skills: ["debugging", "return_none"],
    story: "الدالة التالية تحسب ضعف الرقم، لكن المبرمج نسي كلمة return فصارت ترجع None! أصلح الدالة لترجع القيمة الصحيحة ليطبع 100.",
    microLesson: {
      concept: "لماذا تظهر None؟",
      summary: "إذا لم تستخدم كلمة return داخل الدالة في بايثون، فإن الدالة ترجع القيمة الخاصة None تلقائياً!",
      exampleCode: "def good():\n    return 10"
    },
    starterCode: "def double_number(x):\n    # أصلح السطر التالي بإرجاع القيمة بدلاً من نسيان return\n    result = x * 2\n\nval = double_number(50)\nprint(val)\n",
    requirements: [
      "أضف return x * 2 داخل الدالة",
      "تأكد أن الناتج المطبوع هو 100"
    ],
    expectedOutput: "100",
    hints: [
      "استبدل result = x * 2 بـ return x * 2"
    ],
    nextChallengeId: "world-6-level-4"
  },
  "world-6-level-4": {
    id: "world-6-level-4",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 4,
    title: "👑 كبير مهندسي المصنع",
    subtitle: "تحدي الزعيم: دالة فاحص الأرقام الزوجية",
    difficulty: "boss",
    type: "boss",
    baseXp: 260,
    skills: ["functions", "modulo", "booleans"],
    story: "كبير مهندسي المصنع يتحداك لبناء دالة ذكية is_even(n) ترجع True إذا كان الرقم زوجياً و False إذا كان فردياً (باستخدام n % 2 == 0). ثم اطبع ناتج استدعائها للرقم 10 ثم للرقم 7 في سطرين.",
    microLesson: {
      concept: "عامل باقي القسمة Modulo %",
      summary: "الرقم الزوجي يقبل القسمة على 2 بدون باقٍ، أي n % 2 == 0:\ndef is_even(n):\n    return n % 2 == 0",
      exampleCode: "print(4 % 2 == 0) # True\nprint(5 % 2 == 0) # False"
    },
    starterCode: "# عرف الدالة is_even واطبع نتيجة 10 ثم 7\n",
    requirements: [
      "عرف دالة is_even(n)",
      "اطبع نتيجة is_even(10) في سطر (True)",
      "اطبع نتيجة is_even(7) في سطر (False)"
    ],
    expectedOutput: "True\nFalse",
    hints: [
      "def is_even(n): return n % 2 == 0",
      "print(is_even(10))",
      "print(is_even(7))"
    ],
    unlocksWorldId: "world-7",
    nextChallengeId: "world-6-level-5"
  },

  "world-6-level-5": {
    id: "world-6-level-5",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 5,
    title: "🔐 مسألة ستانفورد: تشفير قيصر للرسائل السرية",
    englishTitle: "Stanford CS106A: Caesar Cipher Encoder",
    subtitle: "تحدي حل المشكلات من جامعة ستانفورد",
    difficulty: "hard",
    type: "write_code",
    baseXp: 270,
    skills: ["functions", "strings", "ord_chr", "stanford_cs106a"],
    story: "مسألة التشفير الشهيرة في جامعة ستانفورد (Stanford CS106A): عرّف دالة caesar_cipher(text, shift) تأخذ نصاً صغيراً ومقدار إزاحة الحروف، وتقوم بإزاحة الحروف الأبجدية الصغيرة. استدعِ الدالة لتشفير النص 'abc' بإزاحة 2 واطبع الناتج المشفر: cde",
    microLesson: {
      concept: "منهج ستانفورد: دوال معالجة النصوص",
      summary: "يمكن إزاحة الحروف باستخدام chr((ord(c) - ord('a') + shift) % 26 + ord('a')) أو ببناء دالة بسيطة للإزاحة.",
      exampleCode: "def caesar_cipher(text, shift):\n    res = ''\n    for c in text:\n        res += chr((ord(c) - ord('a') + shift) % 26 + ord('a'))\n    return res\nprint(caesar_cipher('abc', 2))"
    },
    starterCode: "# مسألة جامعة ستانفورد (CS106A)\ndef caesar_cipher(text, shift):\n    # اكتب كود دالة التشفير هنا\n    pass\n\nprint(caesar_cipher('abc', 2))\n",
    requirements: [
      "عرّف دالة caesar_cipher(text, shift)",
      "اطبع الناتج المشفر للكلمة 'abc' مع إزاحة 2: cde"
    ],
    expectedOutput: "cde",
    hints: [
      "def caesar_cipher(text, shift):",
      "    return ''.join(chr((ord(c) - 97 + shift) % 26 + 97) for c in text)",
      "print(caesar_cipher('abc', 2))"
    ],
    testCases: [
      { input: "", expectedOutput: "cde", description: "تشفير قيصر للنص abc بإزاحة 2" }
    ],
    nextChallengeId: "world-6-level-6"
  },

  "world-6-level-6": {
    id: "world-6-level-6",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: دالة التحليل إلى العوامل الأولية",
    englishTitle: "Math Challenge: Prime Factorization Function",
    subtitle: "الدوال والرياضيات النظرية المتقدمة",
    difficulty: "easy",
    type: "write_code",
    baseXp: 170,
    skills: ["math", "functions", "prime_numbers"],
    story: "مسألة رياضية: عرف دالة prime_factors(n) تستقبل عدداً صحيحاً وتعيد قائمة بجميع عوامله الأولية. طبق الدالة على الرقم 60 (عوامله هي 2 و 2 و 3 و 5 لأن 2*2*3*5 = 60)، واطبع: 'Factors of 60: [2, 2, 3, 5]'.",
    microLesson: {
      concept: "التحليل الأولي عبر القسمة المتتالية",
      summary: "تبدأ بقسمة n على d = 2 طالما يقبل القسمة، ثم تزيد d تدريجياً لجمع العوامل الأولية.",
      exampleCode: "def prime_factors(n):\n    factors = []\n    d = 2\n    while d * d <= n:\n        while n % d == 0:\n            factors.append(d)\n            n //= d\n        d += 1\n    if n > 1: factors.append(n)\n    return factors\nprint(f'Factors of 60: {prime_factors(60)}')"
    },
    starterCode: "def prime_factors(n):\n    # اكتب كود الدالة هنا\n    pass\n\n# اطبع: Factors of 60: [2, 2, 3, 5]\n",
    requirements: [
      "عرف دالة prime_factors تعيد قائمة العوامل الأولية",
      "اطبع السطر: Factors of 60: [2, 2, 3, 5]"
    ],
    expectedOutput: "Factors of 60: [2, 2, 3, 5]",
    hints: [
      "def prime_factors(n): factors = []; d = 2 ... return factors",
      "print(f'Factors of 60: {prime_factors(60)}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Factors of 60: [2, 2, 3, 5]", description: "تحليل العدد 60 إلى عوامله الأولية" }
    ],
    nextChallengeId: "world-6-level-7"
  },
  "world-6-level-7": {
    id: "world-6-level-7",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ: كاشف الكلمات المتجانسة الحروف (Anagram Checker)",
    englishTitle: "IQ Puzzle: Anagram Frequency Signature",
    subtitle: "تحدي التفكير المنطقي ومعالجة النصوص بالدوال",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["iq", "logic", "strings", "functions"],
    story: "لغز ذكاء النصوص واللغات: الكلمات المتجانسة (Anagrams) هي كلمات تتكون من نفس الحروف بالضبط بإعادة ترتيبها. اكتب دالة is_anagram(s1, s2) تفحص إذا كانت الكلمتان متجانستين. اختبر 'listen' و 'silent' واطبع: 'Anagram: True'.",
    microLesson: {
      concept: "مقارنة النصوص بالترتيب الأبجدي",
      summary: "إذا كانت sorted(s1) == sorted(s2) فهذا يثبت فورياً أن الكلمتين لهما نفس عدد ونوع الحروف بدقة.",
      exampleCode: "def is_anagram(s1, s2):\n    return sorted(s1) == sorted(s2)\nres = is_anagram('listen', 'silent')\nprint(f'Anagram: {res}')"
    },
    starterCode: "def is_anagram(s1, s2):\n    # افحص التجانس\n    pass\n\nres = is_anagram('listen', 'silent')\nprint(f'Anagram: {res}')\n",
    requirements: [
      "عرف دالة is_anagram لفحص التجانس اللغوي",
      "اطبع السطر: Anagram: True"
    ],
    expectedOutput: "Anagram: True",
    hints: [
      "def is_anagram(s1, s2): return sorted(s1) == sorted(s2)",
      "res = is_anagram('listen', 'silent')\nprint(f'Anagram: {res}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Anagram: True", description: "فحص تجانس حروفي الكلمتين" }
    ],
    nextChallengeId: "world-6-level-8"
  },
  "world-6-level-8": {
    id: "world-6-level-8",
    worldId: "world-6",
    worldTitle: "مصنع الدوال",
    levelNumber: 8,
    title: "💼 مشكلة برمجية واقعية: محرك البحث واستخراج الكلمات الأكثر بحثاً",
    englishTitle: "Real-world Problem: Search Trends Frequency Counter",
    subtitle: "حل المشكلات الواقعية ومحركات البيانات",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["real_world", "functions", "dictionaries"],
    story: "مشكلة برمجية واقعية من محركات البحث: لديك سجل استعلامات المستخدمين: queries = ['python', 'ai', 'python', 'django', 'python', 'ai']. اكتب دالة top_query(log) تحسب الكلمة الأكثر تكراراً وتطبع: 'Top Query: python (3 times)'.",
    microLesson: {
      concept: "حساب التكرارات واستخراج القيمة العظمى بالدوال",
      summary: "استخدم القاموس لعد كل كلمة ثم استخدم دالة max(counts, key=counts.get) لاستخراج الكلمة الأكثر شعبية.",
      exampleCode: "def top_query(log):\n    c = {}\n    for q in log: c[q] = c.get(q, 0) + 1\n    best = max(c, key=c.get)\n    return f'{best} ({c[best]} times)'"
    },
    starterCode: "queries = ['python', 'ai', 'python', 'django', 'python', 'ai']\ndef top_query(log):\n    # احسب الأكثر تكراراً\n    pass\n\nprint(f'Top Query: {top_query(queries)}')\n",
    requirements: [
      "عرف دالة top_query لاستخراج الكلمة الأكثر تكراراً",
      "اطبع الناتج: Top Query: python (3 times)"
    ],
    expectedOutput: "Top Query: python (3 times)",
    hints: [
      "counts = {}; for q in log: counts[q] = counts.get(q, 0) + 1",
      "best = max(counts, key=counts.get)",
      "return f'{best} ({counts[best]} times)'"
    ],
    testCases: [
      { input: "", expectedOutput: "Top Query: python (3 times)", description: "استخراج الكلمة الأكثر بحثاً" }
    ],
    unlocksWorldId: "world-7",
    nextChallengeId: "world-6-level-9"
  },

  // WORLD 7
  "world-7-level-1": {
    id: "world-7-level-1",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 1,
    title: "درع الفارس",
    subtitle: "بناء أول كائن وفئة Class & Object",
    difficulty: "medium",
    type: "write_code",
    baseXp: 110,
    skills: ["classes", "objects", "init"],
    story: "أهلاً بك في قلعة الكائنات! أنشئ فئة (Class) باسم Player تمتلك دالة بناء __init__ تأخذ name و health. أنشئ كائناً باسم p1 بالاسم 'Knight' والصحة 100 واطبع p1.name.",
    microLesson: {
      concept: "الفئات والكائنات Classes & Objects",
      summary: "الفئة هي قالب لبناء كائنات ذات خصائص محددة:\nclass Cat:\n    def __init__(self, name):\n        self.name = name\nc = Cat('Kitty')\nprint(c.name)",
      exampleCode: "class Car:\n    def __init__(self, model):\n        self.model = model\nmy_car = Car('Toyota')\nprint(my_car.model)"
    },
    starterCode: "# أنشئ class Player واطبع اسم اللاعب Knight\n",
    requirements: [
      "عرف class Player:",
      "عرف def __init__(self, name, health):",
      "أنشئ p1 = Player('Knight', 100)",
      "اطبع p1.name"
    ],
    expectedOutput: "Knight",
    hints: [
      "class Player:",
      "    def __init__(self, name, health):",
      "        self.name = name",
      "        self.health = health",
      "p1 = Player('Knight', 100)",
      "print(p1.name)"
    ],
    nextChallengeId: "world-7-level-2"
  },
  "world-7-level-2": {
    id: "world-7-level-2",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 2,
    title: "مهارة الهجوم السحري",
    subtitle: "إضافة دوال للفئة Methods",
    difficulty: "medium",
    type: "write_code",
    baseXp: 120,
    skills: ["methods", "self"],
    story: "أضف دالة اسمها attack داخل فئة Player تطبع f'{self.name} attacks!'. أنشئ كائناً بالاسم 'Wizard' واستدعِ دالة attack الخاصة به.",
    microLesson: {
      concept: "دوال الكائنات Methods",
      summary: "الدوال داخل الفئات تسمى Methods ويجب أن يكون معامِلها الأول دائماً هو self للإشارة للكائن الحالي:\nclass Dog:\n    def bark(self):\n        print('Woof!')",
      exampleCode: "class Bot:\n    def ping(self):\n        print('Pong')\nb = Bot()\nb.ping()"
    },
    starterCode: "class Player:\n    def __init__(self, name):\n        self.name = name\n    # أضف دالة attack(self)\n\np = Player('Wizard')\np.attack()\n",
    requirements: [
      "أضف دالة attack تطبع: Wizard attacks!",
      "تأكد من استخدام self.name داخل النص"
    ],
    expectedOutput: "Wizard attacks!",
    hints: [
      "def attack(self):",
      "    print(f'{self.name} attacks!')"
    ],
    nextChallengeId: "world-7-level-3"
  },
  "world-7-level-3": {
    id: "world-7-level-3",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 3,
    title: "صائد الأخطاء: سحر self المفقود",
    subtitle: "صائد الأخطاء: نسيان self في دالة البناء",
    difficulty: "hard",
    type: "fix_code",
    baseXp: 120,
    skills: ["debugging", "self_scope"],
    story: "نسي المبرمج ربط الخاصية بالكائن باستخدام self.power، فتسبب في عدم حفظ الخاصية! أصلح الكود ليتم تخزين self.power = power ويطبع القوة 50.",
    microLesson: {
      concept: "أهمية self.",
      summary: "المتغيرات داخل __init__ تكون محلية وتنتهي عند انتهاء الدالة، ما لم نربطها بالكائن باستخدام self.property = value!",
      exampleCode: "def __init__(self, x):\n    # خطأ: x = x\n    # صحيح:\n    self.x = x"
    },
    starterCode: "class Weapon:\n    def __init__(self, power):\n        # أصلح السطر التالي ليربط الخاصية بـ self\n        power = power\n\nw = Weapon(50)\n# الكود التالي يجب أن يطبع 50 بعد الإصلاح\nprint(w.power)\n",
    requirements: [
      "استبدل power = power بـ self.power = power",
      "تأكد أن الكود يطبع: 50"
    ],
    expectedOutput: "50",
    hints: [
      "غير power = power إلى self.power = power"
    ],
    nextChallengeId: "world-7-level-4"
  },
  "world-7-level-4": {
    id: "world-7-level-4",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 4,
    title: "👑 تنين البرمجة الكائنية الأسطوري",
    subtitle: "تحدي الزعيم: معركة الفئات التفاعلية",
    difficulty: "boss",
    type: "boss",
    baseXp: 300,
    skills: ["oop", "methods", "state_mutation"],
    story: "تنين القلعة يختبر فهمك الكامل! أنشئ فئة Dragon لها خاصية health = 100، ودالة take_damage(self, amount) تنقص مقدار الضرر من الصحة وتطبع الصحة المتبقية f'Dragon Health: {self.health}'. أنشئ التنين وسبب له ضرراً بقيمة 30!",
    microLesson: {
      concept: "تعديل حالة الكائن",
      summary: "تستطيع دوال الكائنات تعديل خصائص الكائن نفسه:\ndef take_damage(self, amount):\n    self.health -= amount",
      exampleCode: "class Account:\n    def __init__(self, bal):\n        self.bal = bal\n    def withdraw(self, m):\n        self.bal -= m"
    },
    starterCode: "# أنشئ class Dragon ونفذ المعركة\n",
    requirements: [
      "عرف class Dragon مع health = 100",
      "أضف دالة take_damage(self, amount) تنقص الصحة وتطبع: Dragon Health: 70",
      "أنشئ التنين واستدعِ take_damage(30)"
    ],
    expectedOutput: "Dragon Health: 70",
    hints: [
      "class Dragon:",
      "    def __init__(self): self.health = 100",
      "    def take_damage(self, amount):",
      "        self.health -= amount",
      "        print(f'Dragon Health: {self.health}')",
      "d = Dragon()",
      "d.take_damage(30)"
    ],
    unlocksWorldId: "world-8",
    nextChallengeId: "world-7-level-5"
  },

  "world-7-level-5": {
    id: "world-7-level-5",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 5,
    title: "💳 مسألة ستانفورد: فئة الحساب البنكي المعتمد",
    englishTitle: "Stanford CS106A: BankAccount Class",
    subtitle: "تحدي حل المشكلات من جامعة ستانفورد",
    difficulty: "hard",
    type: "write_code",
    baseXp: 310,
    skills: ["oop", "classes", "methods", "state_management", "stanford_cs106a"],
    story: "مشروع البرمجة كائنية التوجه الشهير في ستانفورد (Stanford CS106A): صمم فئة BankAccount تأخذ عند الإنشاء owner و balance. تحتوي على دالة deposit(amount) تزيد الرصيد، ودالة status() تطبع f'{self.owner} - Balance: {self.balance}'. أنشئ حساباً للمالك 'Stanford Student' برصيد 1000، ثم أودع 500، ثم استدعِ status() ليطبع: Stanford Student - Balance: 1500",
    microLesson: {
      concept: "منهج ستانفورد: تصميم الكائنات والبيانات المغلفة",
      summary: "فئات بايثون تسمح بتغليف البيانات (Encapsulation) والتحكم في تعديل الرصيد بدوال آمنة.",
      exampleCode: "class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n    def status(self):\n        print(f'{self.owner} - Balance: {self.balance}')"
    },
    starterCode: "# مسألة جامعة ستانفورد (CS106A)\nclass BankAccount:\n    # اكتب كود الفئة هنا\n    pass\n\nacc = BankAccount('Stanford Student', 1000)\nacc.deposit(500)\nacc.status()\n",
    requirements: [
      "صمم class BankAccount مع دوال __init__ و deposit و status",
      "أنشئ الحساب وأودع 500 واطبع: Stanford Student - Balance: 1500"
    ],
    expectedOutput: "Stanford Student - Balance: 1500",
    hints: [
      "class BankAccount:",
      "    def __init__(self, owner, balance): self.owner = owner; self.balance = balance",
      "    def deposit(self, amount): self.balance += amount",
      "    def status(self): print(f'{self.owner} - Balance: {self.balance}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Stanford Student - Balance: 1500", description: "محاكاة الحساب البنكي والإيداع" }
    ],
    nextChallengeId: "world-7-level-6"
  },

  "world-7-level-6": {
    id: "world-7-level-6",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: فئة المتجه الهندسي ثنائي الأبعاد (Vector2D Class)",
    englishTitle: "Math Challenge: Vector2D Magnitude Calculator",
    subtitle: "البرمجة كائنية التوجه والمتجهات الرياضية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 170,
    skills: ["math", "oop", "geometry", "vectors"],
    story: "مسألة رياضية كائنية: صمم فئة باسم Vector2D تستقبل الإحداثيين x و y في دالة البناء __init__. أضف دالة كائنية magnitude(self) تحسب طول المتجه بالجذر التربيعي (x^2 + y^2)^0.5. أنشئ متجهاً v = Vector2D(3, 4) واطبع: 'Magnitude: 5.0'.",
    microLesson: {
      concept: "تمثيل الكائنات الرياضية والهندسية بـ OOP",
      summary: "فئات OOP هي الطريقة القياسية لتمثيل المتجهات والنقاط الهندسية في محركات الألعاب وأنظمة المحاكاة الرياضية.",
      exampleCode: "class Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def magnitude(self):\n        return (self.x**2 + self.y**2)**0.5\nv = Vector2D(3, 4)\nprint(f'Magnitude: {v.magnitude()}')"
    },
    starterCode: "class Vector2D:\n    # عرف دالة __init__ ودالة magnitude\n    pass\n\nv = Vector2D(3, 4)\nprint(f'Magnitude: {v.magnitude()}')\n",
    requirements: [
      "عرف فئة Vector2D مع دالة magnitude()",
      "اطبع السطر: Magnitude: 5.0"
    ],
    expectedOutput: "Magnitude: 5.0",
    hints: [
      "def magnitude(self): return (self.x ** 2 + self.y ** 2) ** 0.5",
      "print(f'Magnitude: {v.magnitude()}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Magnitude: 5.0", description: "حساب معيار المتجه ثنائي الأبعاد" }
    ],
    nextChallengeId: "world-7-level-7"
  },
  "world-7-level-7": {
    id: "world-7-level-7",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ: محاكي آلة بيع المشروبات الذكية (State Machine)",
    englishTitle: "IQ Puzzle: Smart Vending Machine State OOP",
    subtitle: "تحدي التفكير المنطقي وآلات الحالة OOP",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["iq", "logic", "oop", "state_machine"],
    story: "لغز ذكاء الأنظمة المدمجة: صمم فئة VendingMachine بمتغير رصيد balance. أضف دالة buy(self, item, price) تفحص إذا كان الرصيد كافياً للمشروب؛ تخصم السعر وتعيد باقي النقود وتصفر الرصيد. العميل أدخل 20 جنيهاً واشترى 'Coffee' بسعر 15 جنيهاً. اطبع: 'Dispensed: Coffee, Change: 5 EGP'.",
    microLesson: {
      concept: "آلات الحالة البرمجية (State Machines)",
      summary: "إدارة الحالة (State) داخل الكائنات البرمجية تمنع الأخطاء المنطقية وتضمن أمان المعاملات المالية.",
      exampleCode: "class VendingMachine:\n    def __init__(self, balance):\n        self.balance = balance\n    def buy(self, item, price):\n        change = self.balance - price\n        return f'Dispensed: {item}, Change: {change} EGP'\nvm = VendingMachine(20)\nprint(vm.buy('Coffee', 15))"
    },
    starterCode: "class VendingMachine:\n    # اكتب كود الفئة هنا\n    pass\n\nvm = VendingMachine(20)\nprint(vm.buy('Coffee', 15))\n",
    requirements: [
      "صمم فئة VendingMachine مع دالة buy",
      "اطبع: Dispensed: Coffee, Change: 5 EGP"
    ],
    expectedOutput: "Dispensed: Coffee, Change: 5 EGP",
    hints: [
      "class VendingMachine: def __init__(self, balance): self.balance = balance",
      "def buy(self, item, price): change = self.balance - price; return f'Dispensed: {item}, Change: {change} EGP'"
    ],
    testCases: [
      { input: "", expectedOutput: "Dispensed: Coffee, Change: 5 EGP", description: "محاكاة آلة بيع المشروبات الذكية" }
    ],
    nextChallengeId: "world-7-level-8"
  },
  "world-7-level-8": {
    id: "world-7-level-8",
    worldId: "world-7",
    worldTitle: "قلعة الكائنات",
    levelNumber: 8,
    title: "💼 مشكلة برمجية واقعية: نظام إدارة المخازن والشحنات (Inventory System)",
    englishTitle: "Real-world Problem: Warehouse Inventory OOP",
    subtitle: "حل المشكلات التجارية وأنظمة الـ ERP",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["real_world", "oop", "inventory"],
    story: "مشكلة برمجية واقعية من أنظمة إدارة المستودعات: صمم فئة Warehouse تدير قاموس المخزون stock. أضف دوال add(item, qty) و sell(item, qty) و get(item). كان لدى المستودع 20 جهاز 'Laptop'، تم بيع 8 واستلام 5. اطبع المخزون المتبقي: 'Laptop Stock: 17 units'.",
    microLesson: {
      concept: "بناء أنظمة إدارة الموارد OOP",
      summary: "فصل إدارة المخزون في فئة مخصصة يسهل مراقبة الوارد والمنصرف ومنع البيع بالسالب في الأنظمة اللوجستية.",
      exampleCode: "class Warehouse:\n    def __init__(self): self.stock = {}\n    def add(self, item, q): self.stock[item] = self.stock.get(item, 0) + q\n    def sell(self, item, q): self.stock[item] = self.stock.get(item, 0) - q\n    def get(self, item): return self.stock.get(item, 0)\nw = Warehouse()\nw.add('Laptop', 20); w.sell('Laptop', 8); w.add('Laptop', 5)\nstock = w.get('Laptop')\nprint(f'Laptop Stock: {stock} units')"
    },
    starterCode: "class Warehouse:\n    # صمم الفئة وطرق الإضافة والبيع\n    pass\n\nw = Warehouse()\nw.add('Laptop', 20)\nw.sell('Laptop', 8)\nw.add('Laptop', 5)\nstock = w.get('Laptop')\nprint(f'Laptop Stock: {stock} units')\n",
    requirements: [
      "عرف فئة Warehouse تدير حركة البضائع",
      "اطبع السطر: Laptop Stock: 17 units"
    ],
    expectedOutput: "Laptop Stock: 17 units",
    hints: [
      "self.stock[item] = self.stock.get(item, 0) + qty",
      "self.stock[item] -= qty",
      "stock = w.get('Laptop')\nprint(f'Laptop Stock: {stock} units')"
    ],
    testCases: [
      { input: "", expectedOutput: "Laptop Stock: 17 units", description: "إدارة وتحديث مخزون المستودع" }
    ],
    unlocksWorldId: "world-8",
    nextChallengeId: "world-7-level-9"
  },

  // WORLD 8
  "world-8-level-1": {
    id: "world-8-level-1",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 1,
    title: "محلل درجات الطلاب الذكي",
    subtitle: "مشروع مصغر: دمج القوائم وحساب المتوسطات",
    difficulty: "hard",
    type: "write_code",
    baseXp: 200,
    skills: ["integration", "math", "loops", "lists"],
    story: "أهلاً بك في حلبة الأبطال! لديك قائمة درجات طلاب grades = [70, 85, 90, 75]. احسب متوسط الدرجات (مجموع الدرجات مقسوماً على عددها len) واطبع بالصيغة: f'Average: {avg}' مع العلم أن الناتج هو 80.0.",
    microLesson: {
      concept: "المشروع الختامي - الجزء 1",
      summary: "تطبيق عملي يجمع القوائم وحساب المجموع sum أو التكرار مع القسمة لإخراج المتوسط الإحصائي بدقة.",
      exampleCode: "nums = [10, 20]\navg = sum(nums) / len(nums)\nprint(f'Average: {avg}')"
    },
    starterCode: "grades = [70, 85, 90, 75]\n# احسب واطبع Average: 80.0\n",
    requirements: [
      "احسب المتوسط = مجموع grades / عدد grades",
      "اطبع: Average: 80.0"
    ],
    expectedOutput: "Average: 80.0",
    hints: [
      "avg = sum(grades) / len(grades)",
      "print(f'Average: {avg}')"
    ],
    nextChallengeId: "world-8-level-2"
  },
  "world-8-level-2": {
    id: "world-8-level-2",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 2,
    title: "نظام إدارة المهام البرمجية",
    subtitle: "مشروع مصغر: دوال إدارة المهام والتكرار",
    difficulty: "hard",
    type: "write_code",
    baseXp: 250,
    skills: ["lists", "functions", "formatting"],
    story: "اكتب برنامجاً يدير مهام اليوم: عرف دالة display_tasks(tasks) تمر على القائمة وتطبع كل مهمة مسبوقة برقمها الترتيبي بدءاً من 1: f'{index}. {task}'. استدعها بقائمة ['Study', 'Code', 'Play'].",
    microLesson: {
      concept: "ترقيم العناصر بالدوال",
      summary: "يمكنك استخدام عداد يبدأ من 1 أو enumerate(tasks, 1) لترقيم العناصر أثناء الدوران:",
      exampleCode: "items = ['A', 'B']\nfor idx, val in enumerate(items, 1):\n    print(f'{idx}. {val}')"
    },
    starterCode: "# عرف دالة display_tasks واستدعها بقائمة المهام\n",
    requirements: [
      "اطبع كل مهمة في سطر:",
      "1. Study",
      "2. Code",
      "3. Play"
    ],
    expectedOutput: "1. Study\n2. Code\n3. Play",
    hints: [
      "def display_tasks(tasks):",
      "    for i, t in enumerate(tasks, 1):",
      "        print(f'{i}. {t}')",
      "display_tasks(['Study', 'Code', 'Play'])"
    ],
    nextChallengeId: "world-8-level-3"
  },
  "world-8-level-3": {
    id: "world-8-level-3",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 3,
    title: "🏆 بطل بايثون الأسطوري",
    subtitle: "تحدي التخرج النهائي: محرك معركة أبطال بايثون",
    difficulty: "boss",
    type: "boss",
    baseXp: 500,
    skills: ["mastery", "oop", "algorithms", "final_project"],
    story: "المعركة الختامية لمغامرة بايثون! اكتب برنامجاً متكاملاً يعرف class Hero بالاسم hero_name والصحة health. يمتلك دالة heal(amount) تزيد الصحة، ودالة status() تطبع f'{self.hero_name} - HP: {self.health}'. أنشئ بطلاً بالاسم 'Python Hero' وصحة 80، ثم عالجه بـ 20 نقطة، ثم اطبع حالته status()!",
    microLesson: {
      concept: "تتويج بطل بايثون",
      summary: "لقد أتقنت المتغيرات، والشروط، والحلقات، والقوائم، والدوال، والكائنات البرمجية! اجمع كل مهاراتك لاجتياز التحدي الأخير وتتويجك بلقب Python Hero.",
      exampleCode: "class Hero:\n    # بناء الفئة والدوال واستدعاؤها"
    },
    starterCode: "# تحدي التخرج النهائي: ابنِ فئة Hero ونفذ متطلبات المعركة الختامية\n",
    requirements: [
      "عرف class Hero مع دالة __init__ ودالة heal ودالة status",
      "أنشئ بطلاً بالاسم 'Python Hero' وصحة 80",
      "استدعِ heal(20)",
      "استدعِ status() ليطبع: Python Hero - HP: 100"
    ],
    expectedOutput: "Python Hero - HP: 100",
    hints: [
      "class Hero:",
      "    def __init__(self, name, health):",
      "        self.name = name",
      "        self.health = health",
      "    def heal(self, amount):",
      "        self.health += amount",
      "    def status(self):",
      "        print(f'{self.name} - HP: {self.health}')",
      "h = Hero('Python Hero', 80)",
      "h.heal(20)",
      "h.status()"
    ],
    nextChallengeId: "world-8-level-4"
  },
  "world-8-level-4": {
    id: "world-8-level-4",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 4,
    title: "المشروع الختامي: خوارزمية ترتيب درجات الأكاديمية",
    englishTitle: "Academy Data Sorting & Analytics Capstone",
    subtitle: "مشروع مصغر: خوارزميات الترتيب والبحث ومعالجة البيانات",
    difficulty: "hard",
    type: "write_code",
    baseXp: 400,
    maxScore: 10,
    skills: ["algorithms", "sorting", "lists", "problem_solving"],
    story: "في الأكاديمية المركزية، لديك قائمة نتائج طلاب students = [{'name': 'Ali', 'score': 85}, {'name': 'Sara', 'score': 95}, {'name': 'Omar', 'score': 90}]. رتب الطلاب تنازلياً حسب score واطبع كل طالب في سطر بالصيغة: f'{s[\"name\"]}: {s[\"score\"]}'.",
    microLesson: {
      concept: "ترتيب القواميس داخل القوائم",
      summary: "يمكنك استخدام sorted مع دالة lambda لتحديد مفتاح الترتيب key=lambda x: x['score'] وتمرير reverse=True للترتيب التنازلي.",
      exampleCode: "sorted_items = sorted(students, key=lambda s: s['score'], reverse=True)\nfor s in sorted_items:\n    print(f'{s[\"name\"]}: {s[\"score\"]}')"
    },
    starterCode: "students = [{'name': 'Ali', 'score': 85}, {'name': 'Sara', 'score': 95}, {'name': 'Omar', 'score': 90}]\n# رتب تنازلياً حسب score واطبع النتائج\n",
    requirements: [
      "رتب قائمة students تنازلياً حسب score",
      "اطبع كل طالب في سطر:",
      "Sara: 95",
      "Omar: 90",
      "Ali: 85"
    ],
    expectedOutput: "Sara: 95\nOmar: 90\nAli: 85",
    hints: [
      "sorted_students = sorted(students, key=lambda x: x['score'], reverse=True)",
      "for s in sorted_students:",
      "    print(f\"{s['name']}: {s['score']}\")"
    ],
    testCases: [
      { input: "", expectedOutput: "Sara: 95\nOmar: 90\nAli: 85", description: "ترتيب الطلاب تنازلياً" }
    ],
    nextChallengeId: "world-8-level-5"
  },

  "world-8-level-5": {
    id: "world-8-level-5",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 5,
    title: "📊 مشروع ستانفورد الأكبر: محلل تكرار الكلمات والمفردات",
    englishTitle: "Stanford CS106A Capstone: Word Frequency Counter",
    subtitle: "تحدي حل المشكلات والمشاريع من جامعة ستانفورد",
    difficulty: "boss",
    type: "boss",
    baseXp: 500,
    maxScore: 10,
    skills: ["dictionaries", "strings", "data_analysis", "stanford_cs106a"],
    story: "المشروع الختامي الشهير لمعالجة البيانات الضخمة في جامعة ستانفورد (Stanford CS106A): لديك النص text = 'stanford python stanford coding'. قسّم النص إلى كلمات، واحسب عدد مرات تكرار كل كلمة داخل قاموس counts، ثم اطبع تكرار كلمة stanford بصيغة: stanford: 2",
    microLesson: {
      concept: "منهج ستانفورد: عد التكرارات باستخدام القواميس",
      summary: "تقنية معالجة اللغات الطبيعية الأساسية: المرور على الكلمات، وإذا كانت الكلمة في القاموس نزيد عدادها، وإلا نبدأها بـ 1.",
      exampleCode: "text = 'stanford python stanford coding'\ncounts = {}\nfor w in text.split():\n    counts[w] = counts.get(w, 0) + 1\nprint(f'stanford: {counts[\"stanford\"]}')"
    },
    starterCode: "# مشروع جامعة ستانفورد الختامي (CS106A)\ntext = 'stanford python stanford coding'\n# احسب تكرار الكلمات واطبع تكرار كلمة stanford\n",
    requirements: [
      "قسّم النص text إلى كلمات واحسب تكرارها بقاموس counts",
      "اطبع تكرار كلمة stanford بصيغة: stanford: 2"
    ],
    expectedOutput: "stanford: 2",
    hints: [
      "counts = {}",
      "for w in text.split(): counts[w] = counts.get(w, 0) + 1",
      "print(f'stanford: {counts[\"stanford\"]}')"
    ],
    testCases: [
      { input: "", expectedOutput: "stanford: 2", description: "حساب تكرار المفردات في نص ستانفورد" }
    ],
    nextChallengeId: "world-8-level-6"
  },

  "world-8-level-6": {
    id: "world-8-level-6",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 6,
    title: "📐 مسألة الرياضيات: محاكي حساب مساحة المنحنيات بطريقة شبه المنحرف",
    englishTitle: "Math Challenge: Trapezoidal Numerical Integration",
    subtitle: "الحسابات الرياضية والهندسية المتقدمة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 180,
    skills: ["math", "calculus", "algorithms"],
    story: "مسألة رياضية متقدمة: احسب التكامل العددي للدالة f(x) = x^2 من x = 0 إلى x = 3 باستخدام قاعدة شبه المنحرف بفترات h = 1. المعادلة هي: Area = (h/2) * (f(0) + 2*f(1) + 2*f(2) + f(3)) = 0.5 * (0 + 2 + 8 + 9) = 9.5. اطبع السطر: 'Approx Integral: 9.5'.",
    microLesson: {
      concept: "التكامل العددي وقاعدة شبه المنحرف",
      summary: "طريقة شبه المنحرف تقرب المساحة تحت المنحنى عن طريق تقسيمها إلى أشباه منحرفات وجمع مساحاتها.",
      exampleCode: "def f(x): return x ** 2\nh = 1\nintegral = (h / 2) * (f(0) + 2 * f(1) + 2 * f(2) + f(3))\nprint(f'Approx Integral: {integral}')"
    },
    starterCode: "def f(x):\n    return x ** 2\n\n# احسب التكامل العددي بطريقة شبه المنحرف واطبع الناتج\n",
    requirements: [
      "طبق قاعدة شبه المنحرف للدالة f(x) = x^2 من 0 إلى 3",
      "اطبع السطر: Approx Integral: 9.5"
    ],
    expectedOutput: "Approx Integral: 9.5",
    hints: [
      "integral = 0.5 * (f(0) + 2*f(1) + 2*f(2) + f(3))",
      "print(f'Approx Integral: {integral}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Approx Integral: 9.5", description: "حساب التكامل العددي بطريقة شبه المنحرف" }
    ],
    nextChallengeId: "world-8-level-7"
  },
  "world-8-level-7": {
    id: "world-8-level-7",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 7,
    title: "🧠 لغز الذكاء و IQ الأكبر: فاحص صحة صفوف وأعمدة السودوكو",
    englishTitle: "IQ Puzzle: Sudoku Grid Line Validity Engine",
    subtitle: "تحدي الذكاء الخوارزمي والمجموعات البرمجية",
    difficulty: "hard",
    type: "write_code",
    baseXp: 200,
    skills: ["iq", "logic", "sets", "sudoku"],
    story: "لغز ذكاء خوارزمي: في لعبة السودوكو، يجب أن يحتوي كل صف على الأرقام من 1 إلى 9 دون أي تكرار ودون نقصان. لديك الصف row = [5, 3, 4, 6, 7, 8, 9, 1, 2]. اكتب خوارزمية باستخدام set تتحقق من أن طول الصف 9 ومجموعته مطابقة لمجموعة الأرقام من 1 إلى 9، واطبع: 'Sudoku Row Valid: True'.",
    microLesson: {
      concept: "استخدام المجموعات set للتحقق من الشمولية",
      summary: "المقارنة set(row) == set(range(1, 10)) هي أسرع طريقة خوارزمية للتحقق من اكتمال عناصر السودوكو دون تكرار.",
      exampleCode: "row = [5, 3, 4, 6, 7, 8, 9, 1, 2]\nis_valid = len(row) == 9 and set(row) == set(range(1, 10))\nprint(f'Sudoku Row Valid: {is_valid}')"
    },
    starterCode: "row = [5, 3, 4, 6, 7, 8, 9, 1, 2]\n# تحقق من صحة الصف واطبع: Sudoku Row Valid: True\n",
    requirements: [
      "تحقق من أن الصف يضم الأرقام 1-9 بدقة وبلا تكرار",
      "اطبع السطر: Sudoku Row Valid: True"
    ],
    expectedOutput: "Sudoku Row Valid: True",
    hints: [
      "is_valid = len(row) == 9 and set(row) == set(range(1, 10))",
      "print(f'Sudoku Row Valid: {is_valid}')"
    ],
    testCases: [
      { input: "", expectedOutput: "Sudoku Row Valid: True", description: "التحقق من صحة صف السودوكو" }
    ],
    nextChallengeId: "world-8-level-8"
  },
  "world-8-level-8": {
    id: "world-8-level-8",
    worldId: "world-8",
    worldTitle: "حلبة الأبطال",
    levelNumber: 8,
    title: "💼 مشروع التخرج الأكبر: محلل رحلات الطيران ومعدل الالتزام بالمواعيد",
    englishTitle: "Capstone: Flight On-Time Performance Analytics Engine",
    subtitle: "مشروع التخرج البرمجي الشامل وتتويج بطل بايثون",
    difficulty: "hard",
    type: "write_code",
    baseXp: 250,
    skills: ["capstone", "real_world", "analytics", "algorithms"],
    story: "المشروع التطبيقي الأكبر: محرك تحليلات المطارات الذكية. لديك سجل رحلات الطيران flights = [{'id': 'EG101', 'delay': 0}, {'id': 'EG102', 'delay': 15}, {'id': 'EG103', 'delay': 0}, {'id': 'EG104', 'delay': 0}]. الرحلة تعتبر ملتزمة بالميعاد إذا كان تأخيرها 0 دقيقة. احسب نسبة الالتزام بالمواعيد مئوية واطبع: 'On-Time Rate: 75.0%'.",
    microLesson: {
      concept: "مشروع التخرج: تحليل وهندسة البيانات البرمجية",
      summary: "دمج القواميس، القوائم، المرور التكراري، والحسابات الإحصائية لبناء تقارير الأداء اللوجستي الحقيقية.",
      exampleCode: "flights = [{'id': 'EG101', 'delay': 0}, {'id': 'EG102', 'delay': 15}, {'id': 'EG103', 'delay': 0}, {'id': 'EG104', 'delay': 0}]\non_time = sum(1 for f in flights if f['delay'] == 0)\nrate = (on_time / len(flights)) * 100\nprint(f'On-Time Rate: {rate:.1f}%')"
    },
    starterCode: "flights = [\n    {'id': 'EG101', 'delay': 0},\n    {'id': 'EG102', 'delay': 15},\n    {'id': 'EG103', 'delay': 0},\n    {'id': 'EG104', 'delay': 0}\n]\n# احسب واطبع: On-Time Rate: 75.0%\n",
    requirements: [
      "احسب عدد الرحلات التي تأخيرها 0 مقسوماً على الإجمالي",
      "اطبع النسبة المئوية: On-Time Rate: 75.0%"
    ],
    expectedOutput: "On-Time Rate: 75.0%",
    hints: [
      "on_time = sum(1 for f in flights if f['delay'] == 0)",
      "rate = (on_time / len(flights)) * 100",
      "print(f'On-Time Rate: {rate:.1f}%')"
    ],
    testCases: [
      { input: "", expectedOutput: "On-Time Rate: 75.0%", description: "تحليل معدل التزام رحلات الطيران بالمواعيد" }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-8-level-9"
  },

  // ==========================================
  // EXPANDED ADVANCED LEVELS (WORLDS 1-9 & BONUS)
  // ==========================================
  "world-1-level-9": {
    "id": "world-1-level-9",
    "worldId": "world-1",
    "worldTitle": "قرية بايثون",
    "levelNumber": 9,
    "title": "📊 حساب متوسط درجات الطالب والنسبة المئوية",
    "englishTitle": "Student Average & Percentage Calculation",
    "subtitle": "العمليات الحسابية وتنسيق الأرقام العشرية",
    "difficulty": "easy",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
        "arithmetic",
        "variables",
        "float_formatting"
    ],
    "story": "لديك درجات ثلاثة اختبارات: math = 85 و science = 90 و english = 95. احسب المتوسط الحسابي واطبعه بدقة منزلة عشرية واحدة بصيغة: 'Average: 90.0'.",
    "microLesson": {
        "concept": "حساب المتوسط وتنسيق الأرقام العشرية في بايثون",
        "summary": "المتوسط الحسابي هو مجموع القيم مقسوماً على عددها. يمكنك تنسيق الناتج لمنزلة عشرية واحدة باستخدام f-string مع :.1f.",
        "exampleCode": "a = 10\nb = 20\navg = (a + b) / 2\nprint(f'Average: {avg:.1f}')"
    },
    "starterCode": "math = 85\nscience = 90\nenglish = 95\n\n# احسب المتوسط الحسابي واطبعه بصيغة: Average: 90.0\n",
    "requirements": [
        "احسب مجموع الدرجات الثلاث واقسم على 3",
        "اطبع الناتج بدقة منزلة عشرية واحدة بالصيغة المطلوبة تماماً"
    ],
    "expectedOutput": "Average: 90.0",
    "hints": [
        "فكرة الحل: اجمع المتغيرات الثلاثة داخل قوسين ثم اقسم على عددها 3.",
        "للتنسيق العشري الدقيق: استخدم داخل الـ f-string الصيغة {avg:.1f} للحصول على منزلة عشرية واحدة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Average: 90.0",
            "description": "حساب متوسط درجات 85 و 90 و 95"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-1-level-10"
},

  "world-1-level-10": {
    "id": "world-1-level-10",
    "worldId": "world-1",
    "worldTitle": "قرية بايثون",
    "levelNumber": 10,
    "title": "💱 تحويل العملات وسعر الصرف البنكي المعتمد",
    "englishTitle": "Bank Currency Exchange Calculator",
    "subtitle": "المتغيرات والعمليات الحسابية في المعاملات المالية",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "variables",
        "division",
        "fstrings"
    ],
    "story": "عميل في البنك يمتلك مبلغ egp = 7500 جنيهاً، ويريد تحويله إلى دولارات أمريكية علماً بأن سعر صرف الدولار هو usd_rate = 50.0. احسب المبلغ بالدولار واطبعه بصيغة: 'Exchange: 150.0 USD'.",
    "microLesson": {
        "concept": "التحويلات المالية وقسمة الأعداد",
        "summary": "لتحويل العملة المحلية إلى عملة أجنبية، نقسم المبلغ الإجمالي على سعر الصرف.",
        "exampleCode": "total_egp = 5000\nrate = 50.0\nusd = total_egp / rate\nprint(f'Converted: {usd:.1f} USD')"
    },
    "starterCode": "egp = 7500\nusd_rate = 50.0\n\n# احسب المبلغ بالدولار واطبعه بالصيغة: Exchange: 150.0 USD\n",
    "requirements": [
        "اقسم مبلغ الجنيهات على سعر الصرف للحصول على الدولارات",
        "اطبع الناتج بصيغة: Exchange: 150.0 USD"
    ],
    "expectedOutput": "Exchange: 150.0 USD",
    "hints": [
        "فكرة الحل: المعادلة الحسابية هي قسمة egp على usd_rate.",
        "اطبع الناتج باستخدام f-string مع كتابة USD في النهاية."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Exchange: 150.0 USD",
            "description": "تحويل 7500 جنيه بسعر صرف 50.0"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-1-level-11"
},

  "world-1-level-11": {
    "id": "world-1-level-11",
    "worldId": "world-1",
    "worldTitle": "قرية بايثون",
    "levelNumber": 11,
    "title": "👑 زعيم القرية: حاسبة استهلاك الوقود واقتصادية السيارة",
    "englishTitle": "Mini-Boss: Smart Fuel Economy Calculator",
    "subtitle": "تطبيق واقعي متكامل يجمع العمليات والتنسيق الرياضي",
    "difficulty": "medium",
    "type": "boss",
    "baseXp": 220,
    "skills": [
        "arithmetic",
        "real_world",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: قطعت سيارة مسافة distance_km = 450 كيلومتراً، واستهلكت liters = 36 لتراً من البنزين. احسب معدل استهلاك الوقود لكل 100 كيلومتر وفق المعادلة: rate = (liters / distance_km) * 100. اطبع النتيجة بصيغة: 'Fuel Economy: 8.0 L/100km'.",
    "microLesson": {
        "concept": "حساب النسب والمعدلات المركبة",
        "summary": "لحساب المعدل لكل 100 وحدة، نقسم الكمية المستهلكة على المسافة ثم نضرب الناتج في 100.",
        "exampleCode": "liters = 20\nkm = 200\nrate = (liters / km) * 100\nprint(f'Economy: {rate:.1f} L/100km')"
    },
    "starterCode": "distance_km = 450\nliters = 36\n\n# طبق معادلة معدل الاستهلاك واطبع الناتج: Fuel Economy: 8.0 L/100km\n",
    "requirements": [
        "طبق معادلة استهلاك الوقود بدقة",
        "اطبع النتيجة مطابقة تماماً: Fuel Economy: 8.0 L/100km"
    ],
    "expectedOutput": "Fuel Economy: 8.0 L/100km",
    "hints": [
        "فكرة الحل: استخدم المعادلة (liters / distance_km) * 100.",
        "تأكد من ضبط الناتج لمنزلة عشرية واحدة :.1f متبوعاً بـ L/100km."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Fuel Economy: 8.0 L/100km",
            "description": "حساب استهلاك 36 لتراً على مسافة 450 كم"
        }
    ],
    "unlocksWorldId": "world-2",
    "nextChallengeId": "world-2-level-1"
},

  "world-2-level-9": {
    "id": "world-2-level-9",
    "worldId": "world-2",
    "worldTitle": "وادي الشروط والقرارات",
    "levelNumber": 9,
    "title": "🩺 فاحص مؤشر كتلة الجسم الطبي (BMI Status)",
    "englishTitle": "Medical BMI Status Classifier",
    "subtitle": "الشروط المركبة والمقارنات الرقمية المتعددة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "conditions",
        "elif",
        "comparison"
    ],
    "story": "لديك شخص وزنه weight = 72 كجم وطوله height = 1.75 متراً. احسب مؤشر كتلة الجسم bmi = weight / (height ** 2). إذا كان bmi أقل من 18.5 فهو 'Underweight'، وإذا كان بين 18.5 و 25 فهو 'Normal Weight'، وخلاف ذلك 'Overweight'. اطبع النتيجة بصيغة: 'BMI Status: Normal Weight'.",
    "microLesson": {
        "concept": "تصنيف المدى الرقمي باستخدام if و elif",
        "summary": "يمكنك التحقق من وقوع قيمة في نطاق معين باستخدام الشروط المتسلسلة مثل 18.5 <= bmi < 25.",
        "exampleCode": "val = 22\nif val < 18.5:\n    status = 'Low'\nelif val < 25:\n    status = 'Normal'\nelse:\n    status = 'High'"
    },
    "starterCode": "weight = 72\nheight = 1.75\n\n# احسب bmi وحدد التصنيف واطبع: BMI Status: Normal Weight\n",
    "requirements": [
        "احسب مؤشر bmi بقسمة الوزن على مربع الطول",
        "استخدم الشروط لتحديد الحالة واطبع: BMI Status: Normal Weight"
    ],
    "expectedOutput": "BMI Status: Normal Weight",
    "hints": [
        "فكرة الحل: احسب bmi أولاً، ثم استخدم if و elif لفحص النطاقات.",
        "للقيم المعطاة (72 و 1.75) يكون الناتج 23.51 وهو يقع في نطاق Normal Weight."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "BMI Status: Normal Weight",
            "description": "فحص مؤشر كتلة الجسم لشخص وزنه 72 وطوله 1.75"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-2-level-10"
},

  "world-2-level-10": {
    "id": "world-2-level-10",
    "worldId": "world-2",
    "worldTitle": "وادي الشروط والقرارات",
    "levelNumber": 10,
    "title": "🚗 نظام فحص استحقاق رخصة القيادة الذكي",
    "englishTitle": "Smart Driver License Eligibility Checker",
    "subtitle": "المعاملات المنطقية and و or والشروط الثنائية",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "logical_operators",
        "and",
        "conditions"
    ],
    "story": "متقدم للحصول على رخصة قيادة عمره age = 19 واجتاز اختبار فحص النظر eyesight_passed = True. يشترط لمنح الرخصة أن يكون العمر 18 فما فوق واجتياز اختبار النظر معاً. إذا تحقق الشرطان اطبع: 'Driver License: Approved'، وإلا اطبع: 'Driver License: Rejected'.",
    "microLesson": {
        "concept": "دمج الشروط بالمعامل المنطقي and",
        "summary": "المعامل and يتطلب تحقق جميع الشروط معاً ليعطي نتيجة True.",
        "exampleCode": "age = 20\npassed = True\nif age >= 18 and passed:\n    print('Status: Approved')"
    },
    "starterCode": "age = 19\neyesight_passed = True\n\n# تحقق من استحقاق الرخصة واطبع الناتج المطلوب\n",
    "requirements": [
        "تحقق من أن age >= 18 و eyesight_passed هو True",
        "اطبع بصيغة دقيقة: Driver License: Approved"
    ],
    "expectedOutput": "Driver License: Approved",
    "hints": [
        "فكرة الحل: استخدم if مع المعامل and بين شرط العمر وشرط فحص النظر.",
        "اطبع الناتج المطابق للحالة الصحيحة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Driver License: Approved",
            "description": "التحقق من سن 19 وفحص نظر مجتاز"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-2-level-11"
},

  "world-2-level-11": {
    "id": "world-2-level-11",
    "worldId": "world-2",
    "worldTitle": "وادي الشروط والقرارات",
    "levelNumber": 11,
    "title": "👑 زعيم الوادي: نظام تسعير تذاكر قطار تالجو السريع",
    "englishTitle": "Mini-Boss: Talgo Train Dynamic Pricing Engine",
    "subtitle": "شروط متداخلة وحسابات مالية متباينة",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 230,
    "skills": [
        "nested_conditions",
        "real_world",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: سعر التذكرة الأساسي base_price = 300. الراكب طالب passenger_type = 'student' ويستحق خصم 20% على الأساسي. اختار درجة أولى seat_class = 'first' وتتطلب إضافة رسم إضافي قدره 50 جنيهاً بعد احتساب الخصم. احسب السعر النهائي (300 * 0.8 + 50 = 290.0) واطبع: 'Talgo Ticket: 290.0 EGP'.",
    "microLesson": {
        "concept": "الشروط المتتالية وتحديث المتغيرات",
        "summary": "في أنظمة الحجز، يتم حساب الخصم أولاً على السعر الأساسي بناءً على نوع الراكب، ثم إضافة رسوم الدرجة.",
        "exampleCode": "price = 200\nif is_student:\n    price *= 0.8\nif is_vip:\n    price += 30"
    },
    "starterCode": "base_price = 300\npassenger_type = 'student'\nseat_class = 'first'\n\n# احسب السعر النهائي بعد الخصم والرسوم واطبع: Talgo Ticket: 290.0 EGP\n",
    "requirements": [
        "خصم 20% من السعر الأساسي للطلاب",
        "إضافة 50 جنيهاً لركاب الدرجة الأولى",
        "اطبع النتيجة بصيغة: Talgo Ticket: 290.0 EGP"
    ],
    "expectedOutput": "Talgo Ticket: 290.0 EGP",
    "hints": [
        "فكرة الحل: اضرب السعر الأساسي في 0.8 إذا كان طالب، ثم أضف 50 إذا كانت الدرجة first.",
        "اطبع الناتج مع .1f لضمان ظهور 290.0 متبوعة بـ EGP."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Talgo Ticket: 290.0 EGP",
            "description": "حساب تذكرة طالب درجة أولى على تالجو"
        }
    ],
    "unlocksWorldId": "world-3",
    "nextChallengeId": "world-3-level-1"
},

  "world-3-level-9": {
    "id": "world-3-level-9",
    "worldId": "world-3",
    "worldTitle": "غابة التكرار والحلقات",
    "levelNumber": 9,
    "title": "🔢 مجموع مضاعفات العدد 7 في نطاق محدد",
    "englishTitle": "Sum of Multiples of 7 in Range",
    "subtitle": "حلقات التكرار مع خطوة القفز وتراكم القيم",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "for_loops",
        "range",
        "accumulator"
    ],
    "story": "اكتب برنامجاً يجمع جميع مضاعفات العدد 7 المحصورة بين 1 و 50 (أي 7, 14, 21, 28, 35, 42, 49). احسب المجموع التراكمي واطبعه بصيغة: 'Sum of Multiples: 196'.",
    "microLesson": {
        "concept": "حلقة for مع خطوة القفز Step في range",
        "summary": "يمكنك المرور على مضاعفات عدد باستخدام range(start, end, step)، حيث تكون خطوة القفز مساوية للعدد نفسه.",
        "exampleCode": "total = 0\nfor n in range(5, 30, 5):\n    total += n\nprint(f'Sum: {total}')"
    },
    "starterCode": "# اجمع مضاعفات العدد 7 بين 1 و 50 واطبع المجموع: Sum of Multiples: 196\n",
    "requirements": [
        "استخدم حلقة تكرار للمرور على مضاعفات 7 الأقل من 50",
        "اجمع المضاعفات واطبع الناتج: Sum of Multiples: 196"
    ],
    "expectedOutput": "Sum of Multiples: 196",
    "hints": [
        "فكرة الحل: ابدأ متغير المجموع بقيمة 0، ثم استخدم range(7, 50, 7) وأضف كل رقم للمجموع.",
        "اطبع النتيجة النهائية بعد انتهاء الحلقة بصيغة f-string."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Sum of Multiples: 196",
            "description": "جمع مضاعفات 7 حتى 50"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-3-level-10"
},

  "world-3-level-10": {
    "id": "world-3-level-10",
    "worldId": "world-3",
    "worldTitle": "غابة التكرار والحلقات",
    "levelNumber": 10,
    "title": "📈 محاكاة الفائدة المركبة السنوية بحلقة While",
    "englishTitle": "Compound Interest Growth with While Loop",
    "subtitle": "حلقات while وتكرار العمليات حتى تحقق هدف معين",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "while_loops",
        "compound_growth",
        "math"
    ],
    "story": "مستثمر أودع مبلغ balance = 1000 جنيهاً في مشروع بعائد سنوي مركب قدره 10% (أي balance *= 1.10 في نهاية كل سنة). احسب عدد السنوات اللازمة ليتجاوز الرصيد 1500 جنيهاً باستخدام حلقة while. اطبع النتيجة بصيغة: 'Years to Target: 5'.",
    "microLesson": {
        "concept": "حلقة while التكرارية المشروطة",
        "summary": "تستمر حلقة while في العمل طالما أن الشرط صحيح (مثلاً while balance <= target)، ونزيد عداد السنوات مع كل دورة.",
        "exampleCode": "val = 100\nyears = 0\nwhile val < 200:\n    val *= 1.2\n    years += 1"
    },
    "starterCode": "balance = 1000\ntarget = 1500\nyears = 0\n\n# استخدم while لحساب السنوات اللازمة لتجاوز الهدف واطبع: Years to Target: 5\n",
    "requirements": [
        "استمر في تكرار العملية طالما balance <= target",
        "في كل دورة اضرب balance في 1.10 وزد years بواحد",
        "اطبع الناتج: Years to Target: 5"
    ],
    "expectedOutput": "Years to Target: 5",
    "hints": [
        "فكرة الحل: شرط حلقة while هو balance <= target.",
        "في نهاية الحلقة سيكون الرصيد تجاوز 1500 بعد 5 سنوات بالضبط."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Years to Target: 5",
            "description": "حساب سنوات نمو 1000 لتجاوز 1500 بنسبة 10%"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-3-level-11"
},

  "world-3-level-11": {
    "id": "world-3-level-11",
    "worldId": "world-3",
    "worldTitle": "غابة التكرار والحلقات",
    "levelNumber": 11,
    "title": "👑 زعيم الغابة: خوارزمية فحص الأرقام الأولية (Prime Test)",
    "englishTitle": "Mini-Boss: Prime Number Verification Algorithm",
    "subtitle": "الخوارزميات الرياضية وحلقات الفحص مع أعلام الصحة Flag",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 230,
    "skills": [
        "loops",
        "prime_numbers",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: افحص ما إذا كان العدد n = 29 عدداً أولياً (Prime) أم لا. العدد الأولي يقبل القسمة فقط على نفسه وعلى 1. اختبر الأعداد من 2 إلى n - 1، واطبع: 'Prime Check: 29 is Prime'.",
    "microLesson": {
        "concept": "فحص الأولية بالأعلام المنطقية (Boolean Flag)",
        "summary": "نبدأ بافتراض أن العدد أولي is_prime = True، ثم نمر بحلقة على القواسم المحتملة. إذا وجدنا قاسماً يقبل القسمة بدون باقٍ نغير العلم إلى False.",
        "exampleCode": "is_prime = True\nfor i in range(2, num):\n    if num % i == 0:\n        is_prime = False\n        break"
    },
    "starterCode": "n = 29\n\n# افحص هل n عدد أولي واطبع: Prime Check: 29 is Prime\n",
    "requirements": [
        "افحص قواسم العدد من 2 وحتى n - 1",
        "اطبع النتيجة بصيغة: Prime Check: 29 is Prime"
    ],
    "expectedOutput": "Prime Check: 29 is Prime",
    "hints": [
        "فكرة الحل: افترض is_prime = True، واختبر باقي القسمة n % i == 0.",
        "نظراً لأن 29 عدد أولي لا يقبل القسمة، اطبع الصيغة المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Prime Check: 29 is Prime",
            "description": "فحص أولية العدد 29"
        }
    ],
    "unlocksWorldId": "world-4",
    "nextChallengeId": "world-4-level-1"
},

  "world-4-level-9": {
    "id": "world-4-level-9",
    "worldId": "world-4",
    "worldTitle": "كهف النصوص والكلمات",
    "levelNumber": 9,
    "title": "📱 منسق أرقام الهواتف المصرية الذكي (Phone Formatter)",
    "englishTitle": "Egyptian Phone Number Formatter",
    "subtitle": "تقطيع النصوص String Slicing وإعادة التركيب",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "strings",
        "slicing",
        "formatting"
    ],
    "story": "لديك رقم هاتف خام phone = '01018275881'. قم بتقطيعه وإعادة تنسيقه ليظهر برمز الدولة والمسافات الفاصلة بصيغة: 'Formatted Phone: (+20) 010-1827-5881'.",
    "microLesson": {
        "concept": "تقطيع النصوص بالأقواس المعقوفة [start:end]",
        "summary": "يمكنك استخراج أجزاء محددة من النص عبر تحديد مؤشرات البداية والنهاية، ثم دمجها مع رموز أخرى في f-string.",
        "exampleCode": "p = '01234567890'\npart1 = p[0:3]\npart2 = p[3:7]\npart3 = p[7:]"
    },
    "starterCode": "phone = '01018275881'\n\n# نسق رقم الهاتف واطبع: Formatted Phone: (+20) 010-1827-5881\n",
    "requirements": [
        "استخرج أول 3 أرقام (010)، ثم الـ 4 التالية (1827)، ثم الـ 4 الأخيرة (5881)",
        "اطبع بصيغة: Formatted Phone: (+20) 010-1827-5881"
    ],
    "expectedOutput": "Formatted Phone: (+20) 010-1827-5881",
    "hints": [
        "فكرة الحل: استخدم phone[0:3] و phone[3:7] و phone[7:].",
        "ادمج الأجزاء داخل f-string مع رمز الدولة (+20)."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Formatted Phone: (+20) 010-1827-5881",
            "description": "تنسيق رقم 01018275881"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-4-level-10"
},

  "world-4-level-10": {
    "id": "world-4-level-10",
    "worldId": "world-4",
    "worldTitle": "كهف النصوص والكلمات",
    "levelNumber": 10,
    "title": "🔁 فاحص الكلمات المتناظرة المنعكسة (Palindrome)",
    "englishTitle": "Palindrome String Verifier",
    "subtitle": "عكس النصوص بخطوة سالبة [::-1] والمقارنة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "strings",
        "reversing",
        "palindrome"
    ],
    "story": "افحص ما إذا كانت الكلمة word = 'madam' كلمة متناظرة (Palindrome) تقرأ من اليمين كقراءتها من اليسار. قارن الكلمة بمعكوسها واطبع النتيجة بصيغة: 'Palindrome: madam is True'.",
    "microLesson": {
        "concept": "عكس النصوص في بايثون بخطوة [::-1]",
        "summary": "الخطوة -1 في التقطيع تعكس ترتيب حروف النص بالكامل. وإذا تساوى النص مع معكوسه يكون متناظراً.",
        "exampleCode": "w = 'radar'\nis_pal = (w == w[::-1])\nprint(f'Is Palindrome: {is_pal}')"
    },
    "starterCode": "word = 'madam'\n\n# افحص هل الكلمة متناظرة واطبع: Palindrome: madam is True\n",
    "requirements": [
        "اعكس الكلمة وقارنها بالأصل",
        "اطبع الناتج: Palindrome: madam is True"
    ],
    "expectedOutput": "Palindrome: madam is True",
    "hints": [
        "فكرة الحل: استخدم word == word[::-1] للحصول على القيمة المنطقية.",
        "اطبع النتيجة بالصيغة المطلوبة باستخدام f-string."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Palindrome: madam is True",
            "description": "فحص تناظر كلمة madam"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-4-level-11"
},

  "world-4-level-11": {
    "id": "world-4-level-11",
    "worldId": "world-4",
    "worldTitle": "كهف النصوص والكلمات",
    "levelNumber": 11,
    "title": "👑 زعيم الكهف: مستخرج ومحلل النطاق من البريد الإلكتروني",
    "englishTitle": "Mini-Boss: Email Domain Extractor & Normalizer",
    "subtitle": "طرق النصوص split و upper ومعالجة البيانات النصية",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 230,
    "skills": [
        "strings",
        "split",
        "upper",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: لديك عنوان بريد إلكتروني email = 'student@shababha.gov.eg'. استخرج اسم النطاق الذي يلي رمز '@' ثم حول جميع حروفه إلى أحرف كبيرة (UPPERCASE). اطبع الناتج بصيغة: 'Domain: SHABABHA.GOV.EG'.",
    "microLesson": {
        "concept": "تقسيم النصوص بالدالة split() وتحويل الحالة",
        "summary": "تقوم الدالة email.split('@') بتقسيم النص إلى جزأين: اسم المستخدم في الفهرس [0] والنطاق في الفهرس [1]. والدالة .upper() تحول الحروف لكبيرة.",
        "exampleCode": "em = 'user@example.com'\ndom = em.split('@')[1].upper()\nprint(f'Domain: {dom}')"
    },
    "starterCode": "email = 'student@shababha.gov.eg'\n\n# استخرج النطاق وحوله لحروف كبيرة واطبع: Domain: SHABABHA.GOV.EG\n",
    "requirements": [
        "استخرج الجزء بعد علامة @ باستخدام split",
        "حول النطاق إلى حروف كبيرة واطبع: Domain: SHABABHA.GOV.EG"
    ],
    "expectedOutput": "Domain: SHABABHA.GOV.EG",
    "hints": [
        "فكرة الحل: استخدم email.split('@')[1] للوصول للنطاق، ثم طبق دالة .upper().",
        "ادمج النتيجة في جملة الطباعة المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Domain: SHABABHA.GOV.EG",
            "description": "استخراج نطاق student@shababha.gov.eg بحروف كبيرة"
        }
    ],
    "unlocksWorldId": "world-5",
    "nextChallengeId": "world-5-level-1"
},

  "world-5-level-9": {
    "id": "world-5-level-9",
    "worldId": "world-5",
    "worldTitle": "مملكة القوائم والمصفوفات",
    "levelNumber": 9,
    "title": "✨ استبعاد العناصر المكررة والترتيب التصاعدي",
    "englishTitle": "Remove Duplicates and Ascending Sort",
    "subtitle": "التحويل بين المجموعات والقوائم ودوال الترتيب",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "lists",
        "sets",
        "sorted"
    ],
    "story": "لديك قائمة أرقام غير مرتبة وبها عناصر مكررة nums = [15, 3, 9, 3, 21, 15, 7]. استبعد العناصر المكررة ورتب الأرقام تصاعدياً في قائمة جديدة. اطبع القائمة بصيغة: 'Sorted Unique: [3, 7, 9, 15, 21]'.",
    "microLesson": {
        "concept": "استبعاد التكرار والترتيب بالدالة sorted()",
        "summary": "تحويل القائمة إلى set يستبعد التكرارات تلقائياً، وتمريرها إلى الدالة sorted() يرجع قائمة مرتبة تصاعدياً.",
        "exampleCode": "raw = [5, 2, 5, 1, 2]\nres = sorted(list(set(raw)))\nprint(f'Result: {res}')"
    },
    "starterCode": "nums = [15, 3, 9, 3, 21, 15, 7]\n\n# أنشئ قائمة بدون تكرار مرتبة واطبع: Sorted Unique: [3, 7, 9, 15, 21]\n",
    "requirements": [
        "استبعد التكرارات ورتب الأرقام من الأصغر للأكبر",
        "اطبع القائمة بصيغة: Sorted Unique: [3, 7, 9, 15, 21]"
    ],
    "expectedOutput": "Sorted Unique: [3, 7, 9, 15, 21]",
    "hints": [
        "فكرة الحل: استخدم sorted(set(nums)) لإنتاج القائمة المطلوبة في خطوة واحدة.",
        "اطبع الناتج مباشرة مع البادئة Sorted Unique:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Sorted Unique: [3, 7, 9, 15, 21]",
            "description": "ترتيب واستبعاد مكررات [15, 3, 9, 3, 21, 15, 7]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-5-level-10"
},

  "world-5-level-10": {
    "id": "world-5-level-10",
    "worldId": "world-5",
    "worldTitle": "مملكة القوائم والمصفوفات",
    "levelNumber": 10,
    "title": "📊 تصفية المبيعات المرتفعة بقوائم الاستيعاب (List Comprehension)",
    "englishTitle": "Filter High Sales with List Comprehension",
    "subtitle": "التصفية السريعة والذكية للقوائم بأسلوب بايثون الأنيق",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "list_comprehension",
        "filtering",
        "lists"
    ],
    "story": "لديك قائمة مبيعات المنتجات sales = [120, 45, 230, 80, 310, 95]. استخرج فقط أرقام المبيعات التي تتجاوز 100 في قائمة جديدة باستخدام List Comprehension. اطبع الناتج بصيغة: 'Top Sales: [120, 230, 310]'.",
    "microLesson": {
        "concept": "بناء القوائم بأسلوب List Comprehension",
        "summary": "يوفر بايثون صياغة مدمجة لتصفية القوائم: [x for x in list if condition].",
        "exampleCode": "data = [20, 60, 30, 80]\nhigh = [x for x in data if x > 50]\nprint(f'High: {high}')"
    },
    "starterCode": "sales = [120, 45, 230, 80, 310, 95]\n\n# استخرج القيم الأكبر من 100 واطبع: Top Sales: [120, 230, 310]\n",
    "requirements": [
        "استخرج القيم التي تحقق x > 100",
        "اطبع القائمة بصيغة: Top Sales: [120, 230, 310]"
    ],
    "expectedOutput": "Top Sales: [120, 230, 310]",
    "hints": [
        "فكرة الحل: استخدم الصيغة [s for s in sales if s > 100].",
        "اطبع القائمة الناتجة بجوار Top Sales:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Top Sales: [120, 230, 310]",
            "description": "تصفية الأرقام الأكبر من 100 من قائمة المبيعات"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-5-level-11"
},

  "world-5-level-11": {
    "id": "world-5-level-11",
    "worldId": "world-5",
    "worldTitle": "مملكة القوائم والمصفوفات",
    "levelNumber": 11,
    "title": "👑 زعيم المملكة: دمج سجلات الطلاب والدرجات (Zip Engine)",
    "englishTitle": "Mini-Boss: Student Roster Zip & Multi-line Display",
    "subtitle": "دمج القوائم المتناظرة والدوران المشترك",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 230,
    "skills": [
        "zip",
        "lists",
        "loops",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: لديك قائمة بأسماء الطلاب names = ['Ali', 'Sara', 'Omar'] وقائمة بدرجاتهم المقابلة scores = [92, 98, 88]. ادمج القائمتين واطبع كل طالب ودرجته في سطر مستقل بصيغة:\nAli: 92\nSara: 98\nOmar: 88",
    "microLesson": {
        "concept": "الدمج المتزامن للدوال باستخدام zip()",
        "summary": "تسمح الدالة zip(list1, list2) بالمرور على عنصرين متناظرين معاً في نفس الدورة الحلقية.",
        "exampleCode": "keys = ['A', 'B']\nvals = [1, 2]\nfor k, v in zip(keys, vals):\n    print(f'{k}: {v}')"
    },
    "starterCode": "names = ['Ali', 'Sara', 'Omar']\nscores = [92, 98, 88]\n\n# ادمج القائمتين واطبع كل اسم ودرجته في سطر مستقل\n",
    "requirements": [
        "استخدم دالة zip أو حلقة تكرار للمرور على الأسماء والدرجات معاً",
        "اطبع كل سجل في سطر بصيغة: الاسم: الدرجة"
    ],
    "expectedOutput": "Ali: 92\nSara: 98\nOmar: 88",
    "hints": [
        "فكرة الحل: استخدم for name, score in zip(names, scores): ثم اطبع print(f'{name}: {score}').",
        "تأكد من عدم ترك مسافات غير مطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Ali: 92\nSara: 98\nOmar: 88",
            "description": "دمج وطباعة أسماء ودرجات 3 طلاب"
        }
    ],
    "unlocksWorldId": "world-6",
    "nextChallengeId": "world-6-level-1"
},

  "world-6-level-9": {
    "id": "world-6-level-9",
    "worldId": "world-6",
    "worldTitle": "قلعة الدوال والموديولات",
    "levelNumber": 9,
    "title": "📐 دالة حساب مساحة ومحيط الدائرة الدقيقة",
    "englishTitle": "Precise Circle Metrics Function",
    "subtitle": "الدوال التي تعيد قيماً متعددة وحسابات نصف القطر",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "functions",
        "return_multiple",
        "math"
    ],
    "story": "اكتب دالة باسم circle_metrics(r) تأخذ نصف القطر r = 7 وتحسب المساحة area = 3.14 * r * r والمحيط circ = 2 * 3.14 * r بدقة منزلتين عشريتين. استدع الدالة واطبع الناتج بصيغة: 'Area: 153.86, Circumference: 43.96'.",
    "microLesson": {
        "concept": "إرجاع قيم متعددة من الدالة (Tuples)",
        "summary": "يمكن للدالة في بايثون إرجاع أكثر من قيمة مفصولة بفواصل return val1, val2 وتستقبلها في متغيرين.",
        "exampleCode": "def calc(x):\n    return x*2, x*3\ndbl, trp = calc(5)"
    },
    "starterCode": "# عرف دالة circle_metrics(r) واستدعها لنصف قطر 7 واطبع الناتج المطلوب\n",
    "requirements": [
        "عرف الدالة واستخدم 3.14 لقيمة pi",
        "احسب المساحة والمحيط بدقة منزلتين عشريتين واطبع: Area: 153.86, Circumference: 43.96"
    ],
    "expectedOutput": "Area: 153.86, Circumference: 43.96",
    "hints": [
        "فكرة الحل: احسب area = round(3.14 * r * r, 2) و circ = round(2 * 3.14 * r, 2).",
        "أرجع القيمتين أو اطبعهما بصيغة f-string المطلوبة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Area: 153.86, Circumference: 43.96",
            "description": "حساب مساحة ومحيط دائرة نصف قطرها 7"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-6-level-10"
},

  "world-6-level-10": {
    "id": "world-6-level-10",
    "worldId": "world-6",
    "worldTitle": "قلعة الدوال والموديولات",
    "levelNumber": 10,
    "title": "⚡ التصفية بالدوال المجهولة Lambda والتطبيق السريع",
    "englishTitle": "Lambda Functions and Filter Mechanism",
    "subtitle": "الدوال المجهولة في سطر واحد ودالة filter",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "lambda",
        "filter",
        "functions"
    ],
    "story": "لديك قائمة أرقام data = [12, 17, 24, 33, 40, 55]. استخدم دالة lambda مجهولة لاستخراج الأرقام الزوجية فقط في قائمة مرتبة بنفس الترتيب. اطبع الناتج بصيغة: 'Evens: [12, 24, 40]'.",
    "microLesson": {
        "concept": "دوال Lambda السريعة المجهولة",
        "summary": "تتيح lambda كتابة دالة مصغرة في سطر واحد بدون اسم مثل lambda x: x % 2 == 0.",
        "exampleCode": "nums = [1, 2, 3, 4]\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(evens)"
    },
    "starterCode": "data = [12, 17, 24, 33, 40, 55]\n\n# استخرج الأرقام الزوجية واطبع: Evens: [12, 24, 40]\n",
    "requirements": [
        "استخرج الأرقام التي تقبل القسمة على 2 بدون باقٍ",
        "اطبع القائمة بصيغة: Evens: [12, 24, 40]"
    ],
    "expectedOutput": "Evens: [12, 24, 40]",
    "hints": [
        "فكرة الحل: استخدم list(filter(lambda x: x % 2 == 0, data)) أو List Comprehension بشرط الزوجية.",
        "اطبع الناتج بجوار كلمة Evens:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Evens: [12, 24, 40]",
            "description": "استخراج الأرقام الزوجية من [12, 17, 24, 33, 40, 55]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-6-level-11"
},

  "world-6-level-11": {
    "id": "world-6-level-11",
    "worldId": "world-6",
    "worldTitle": "قلعة الدوال والموديولات",
    "levelNumber": 11,
    "title": "👑 زعيم القلعة: مولد الأرقام التسلسلية المشفرة (Token Generator)",
    "englishTitle": "Mini-Boss: Serial Token Generator Function",
    "subtitle": "الدوال ذات المعاملات الافتراضية والدقة الرقمية zfill",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 230,
    "skills": [
        "functions",
        "zfill",
        "string_formatting",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: اكتب دالة باسم generate_token(prefix, num) تستقبل بادئة نصية ورقم تسلسلي، وترجع نصاً مشفراً يبدأ بالبادئة متبوعة بشرطة ثم الرقم مكملاً بأصفار على اليسار ليكون طوله 5 خانات (باستخدام zfill أو :05d). استدع الدالة للقيم prefix = 'EGY' و num = 42 واطبع: 'Token: EGY-00042'.",
    "microLesson": {
        "concept": "إكمال الخانات بالأصفار باستخدام zfill و :05d",
        "summary": "يمكن إكمال الأرقام بأصفار على اليسار إما عبر الدالة str(num).zfill(5) أو عبر التنسيق الرقمي f'{num:05d}'.",
        "exampleCode": "n = 7\ntoken = f'ID-{n:04d}'\nprint(token)"
    },
    "starterCode": "# عرف الدالة واستدعها للقيم EGY و 42 واطبع الناتج المطلوب: Token: EGY-00042\n",
    "requirements": [
        "عرف الدالة generate_token(prefix, num) لترجع النص المطلوب",
        "اطبع الناتج الدقيق: Token: EGY-00042"
    ],
    "expectedOutput": "Token: EGY-00042",
    "hints": [
        "فكرة الحل: داخل الدالة، استخدم return f'{prefix}-{num:05d}'.",
        "استدع الدالة مع 'EGY' و 42 واطبع النتيجة بصيغة Token: ..."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Token: EGY-00042",
            "description": "توليد الرمز التسلسلي لـ EGY و 42"
        }
    ],
    "unlocksWorldId": "world-7",
    "nextChallengeId": "world-7-level-1"
},

  "world-7-level-9": {
    "id": "world-7-level-9",
    "worldId": "world-7",
    "worldTitle": "برج الخوارزميات والبحث",
    "levelNumber": 9,
    "title": "🔍 خوارزمية البحث الخطي مع إرجاع موقع الفهرس",
    "englishTitle": "Linear Search Algorithm with Index Reporting",
    "subtitle": "استكشاف القوائم وخوارزميات البحث التتابعي",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "linear_search",
        "algorithms",
        "loops"
    ],
    "story": "لديك قائمة عناصر arr = [10, 25, 33, 42, 58, 67] وعنصر هدف target = 42. نفذ خوارزمية بحث خطي للمرور على عناصر القائمة وتحديد موقع الفهرس (Index) للهدف. اطبع الناتج بصيغة: 'Found at Index: 3'.",
    "microLesson": {
        "concept": "خوارزمية البحث الخطي (Linear Search)",
        "summary": "تمر الخوارزمية على العناصر واحداً تلو الآخر باستخدام enumerate(arr) لمقارنة كل عنصر بالهدف حتى تجده وترجع موقعه.",
        "exampleCode": "items = [5, 12, 9]\ntarget = 12\nfor idx, val in enumerate(items):\n    if val == target:\n        print(f'Index: {idx}')"
    },
    "starterCode": "arr = [10, 25, 33, 42, 58, 67]\ntarget = 42\n\n# ابحث عن target واطبع موقعه: Found at Index: 3\n",
    "requirements": [
        "ابحث عن الرقم 42 وحدد موقعه في القائمة",
        "اطبع بصيغة دقيقة: Found at Index: 3"
    ],
    "expectedOutput": "Found at Index: 3",
    "hints": [
        "فكرة الحل: استخدم for i, num in enumerate(arr): وعندما يتساوى num مع target اطبع f'Found at Index: {i}'.",
        "يمكنك استخدام arr.index(target) أيضاً للتأكد."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Found at Index: 3",
            "description": "البحث عن 42 في [10, 25, 33, 42, 58, 67]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-7-level-10"
},

  "world-7-level-10": {
    "id": "world-7-level-10",
    "worldId": "world-7",
    "worldTitle": "برج الخوارزميات والبحث",
    "levelNumber": 10,
    "title": "🔄 خوارزمية الفرز الفقاعي اليدوي (Bubble Sort Step)",
    "englishTitle": "Bubble Sort Algorithm Step Implementation",
    "subtitle": "خوارزميات الترتيب ومقارنة وتبديل العناصر المتجاورة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 210,
    "skills": [
        "bubble_sort",
        "algorithms",
        "swapping"
    ],
    "story": "لديك قائمة أرقام غير مرتبة arr = [64, 34, 25, 12, 22]. نفذ خوارزمية الفرز الفقاعي (Bubble Sort) بمقارنة كل عنصرين متجاورين وتبديلهما إن كان الأول أكبر من الثاني حتى تصبح القائمة مرتبة تصاعدياً. اطبع الناتج بصيغة: 'Sorted Array: [12, 22, 25, 34, 64]'.",
    "microLesson": {
        "concept": "خوارزمية الترتيب الفقاعي (Bubble Sort)",
        "summary": "تعتمد الخوارزمية على حلقتين متداخلتين للمرور على القائمة وتبديل أي عنصرين غير مرتبين a[j], a[j+1] = a[j+1], a[j].",
        "exampleCode": "n = len(a)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if a[j] > a[j + 1]:\n            a[j], a[j + 1] = a[j + 1], a[j]"
    },
    "starterCode": "arr = [64, 34, 25, 12, 22]\n\n# طبق خوارزمية الترتيب واطبع: Sorted Array: [12, 22, 25, 34, 64]\n",
    "requirements": [
        "رتب القائمة ترتيباً تصاعدياً صحيحاً",
        "اطبع القائمة المرتبة بصيغة: Sorted Array: [12, 22, 25, 34, 64]"
    ],
    "expectedOutput": "Sorted Array: [12, 22, 25, 34, 64]",
    "hints": [
        "فكرة الحل: نفذ الحلقتين المتداخلتين للفرز الفقاعي أو استخدم الترتيب لتأكيد الناتج النهائي.",
        "اطبع القائمة مطابقة للصيغة المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Sorted Array: [12, 22, 25, 34, 64]",
            "description": "ترتيب القائمة [64, 34, 25, 12, 22] بالفرز الفقاعي"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-7-level-11"
},

  "world-7-level-11": {
    "id": "world-7-level-11",
    "worldId": "world-7",
    "worldTitle": "برج الخوارزميات والبحث",
    "levelNumber": 11,
    "title": "👑 زعيم البرج: خوارزمية متتالية فيبوناتشي التراكمية",
    "englishTitle": "Mini-Boss: Fibonacci Sequence Generator",
    "subtitle": "الأنماط الرياضية وتوليد السلاسل الخوارزمية التراكمية",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 240,
    "skills": [
        "fibonacci",
        "algorithms",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: اكتب خوارزمية لتوليد أول 8 أرقام من متتالية فيبوناتشي الشهيرة (تبدأ بالرقمين 0 و 1، وكل رقم تالٍ هو حاصل جمع الرقمين السابقين له: 0, 1, 1, 2, 3, 5, 8, 13). خزن الأرقام في قائمة واطبعها بصيغة: 'Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]'.",
    "microLesson": {
        "concept": "متتالية فيبوناتشي (Fibonacci Sequence)",
        "summary": "تبدأ المتتالية بـ [0, 1]. وفي كل خطوة جديدة نحسب العنصر الجديد بجمع آخر عنصرين fib[-1] + fib[-2] ونضيفه للقائمة.",
        "exampleCode": "fib = [0, 1]\nfor _ in range(6):\n    fib.append(fib[-1] + fib[-2])\nprint(fib)"
    },
    "starterCode": "# ولد أول 8 أرقام من متتالية فيبوناتشي واطبع: Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]\n",
    "requirements": [
        "ابدأ بالقائمة [0, 1] وأضف 6 عناصر تالية",
        "اطبع القائمة بصيغة: Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]"
    ],
    "expectedOutput": "Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]",
    "hints": [
        "فكرة الحل: أنشئ قائمة fib = [0, 1]، ثم كرر 6 مرات إضافة fib[-1] + fib[-2].",
        "اطبع الناتج النهائي باستخدام f-string مسبوقاً بـ Fibonacci:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]",
            "description": "توليد أول 8 أرقام من فيبوناتشي"
        }
    ],
    "unlocksWorldId": "world-8",
    "nextChallengeId": "world-8-level-1"
},

  "world-8-level-9": {
    "id": "world-8-level-9",
    "worldId": "world-8",
    "worldTitle": "عرش البايثوني الخارق",
    "levelNumber": 9,
    "title": "🛡️ المعالجة الآمنة للاستثناءات البرمجية (Safe ZeroDivision)",
    "englishTitle": "Safe Exception Handling for ZeroDivisionError",
    "subtitle": "بناء أكواد آمنة تتحمل الأخطاء بكتل try-except",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "exceptions",
        "try_except",
        "robustness"
    ],
    "story": "اكتب كتلة try-except لمحاولة قسمة numerator = 100 على denominator = 0. عند اعتراض خطأ القسمة على الصفر ZeroDivisionError التقط الخطأ واطبع رسالة آمنة بصيغة: 'Safe Div: Cannot divide by zero!'.",
    "microLesson": {
        "concept": "معالجة الأخطاء بـ try و except",
        "summary": "تمنع كتل try-except انهيار البرنامج عند حدوث خطأ غير متوقع، وتسمح بالتعامل معه بمرونة.",
        "exampleCode": "try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print('Safe!')"
    },
    "starterCode": "numerator = 100\ndenominator = 0\n\n# استخدم try-except لالتقاط الخطأ وطباعة: Safe Div: Cannot divide by zero!\n",
    "requirements": [
        "ضع عملية القسمة داخل كتلة try",
        "التقط خطأ ZeroDivisionError واطبع: Safe Div: Cannot divide by zero!"
    ],
    "expectedOutput": "Safe Div: Cannot divide by zero!",
    "hints": [
        "فكرة الحل: اكتب try: result = numerator / denominator ثم except ZeroDivisionError: print('Safe Div: Cannot divide by zero!').",
        "تأكد من مطابقة نص الرسالة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Safe Div: Cannot divide by zero!",
            "description": "التقاط خطأ قسمة 100 على صفر بأمان"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-8-level-10"
},

  "world-8-level-10": {
    "id": "world-8-level-10",
    "worldId": "world-8",
    "worldTitle": "عرش البايثوني الخارق",
    "levelNumber": 10,
    "title": "📜 محلل سجلات الخوادم واستخراج الأخطاء (Log Parser)",
    "englishTitle": "Server Log Parser & Error Extractor",
    "subtitle": "معالجة النصوص المنظمة واستخراج البيانات الحساسة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 210,
    "skills": [
        "parsing",
        "strings",
        "filtering"
    ],
    "story": "لديك نص سجلات نظام log = 'INFO:ServerStarted|WARN:HighMemory|ERROR:DbTimeout|INFO:Ready'. قم بتقسيم السجلات واستخراج السجلات التي تبدأ بـ 'ERROR:' فقط في قائمة جديدة. اطبع الناتج بصيغة: \"Errors Found: ['ERROR:DbTimeout']\".",
    "microLesson": {
        "concept": "تحليل نصوص السجلات (Parsing)",
        "summary": "يتم تقسيم السجلات عبر علامة الفصل split('|') ثم تصفية العناصر التي تبدأ بالكلمة المطلوبة entry.startswith('ERROR:').",
        "exampleCode": "entries = 'A:1|B:2|A:3'.split('|')\na_items = [e for e in entries if e.startswith('A:')]"
    },
    "starterCode": "log = 'INFO:ServerStarted|WARN:HighMemory|ERROR:DbTimeout|INFO:Ready'\n\n# استخرج رسائل ERROR واطبع: Errors Found: ['ERROR:DbTimeout']\n",
    "requirements": [
        "قسم النص عند علامة |",
        "استخرج السجلات التي تبدأ بـ ERROR واطبعها بالقائمة المطلوبة"
    ],
    "expectedOutput": "Errors Found: ['ERROR:DbTimeout']",
    "hints": [
        "فكرة الحل: قسم النص باستخدام log.split('|') ثم استخدم List Comprehension مع .startswith('ERROR:').",
        "اطبع النتيجة بجوار Errors Found:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Errors Found: ['ERROR:DbTimeout']",
            "description": "استخراج أخطاء السجل من النص المعطى"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-8-level-11"
},

  "world-8-level-11": {
    "id": "world-8-level-11",
    "worldId": "world-8",
    "worldTitle": "عرش البايثوني الخارق",
    "levelNumber": 11,
    "title": "👑 بوابة العبور: معركة عرش البايثون الملحمية (Grand Finale)",
    "englishTitle": "Grand Finale: Financial Ledger Audit & Net Balance",
    "subtitle": "تدقيق المعاملات المالية المتقدم وفصل الإيداعات عن السحوبات",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 250,
    "skills": [
        "data_audit",
        "math",
        "boss_challenge"
    ],
    "story": "معركة العبور النهائية: لديك قائمة معاملات مصرفية txs = [150, -50, 300, -120, 450]. احسب إجمالي الإيداعات الموجبة (150 + 300 + 450 = 900)، وإجمالي السحوبات السالبة كقيمة موجبة (50 + 120 = 170)، وصافي الرصيد المتبقي (900 - 170 = 730). اطبع النتيجة بصيغة: 'Deposits: 900, Withdrawals: 170, Net Balance: 730'.",
    "microLesson": {
        "concept": "تدقيق البيانات الرقمية والتجميع الشرطي",
        "summary": "يمكن تجميع الإيداعات بشرط x > 0 والسحوبات بشرط x < 0 مع استخدام abs() لتحويل السحوبات لقيم موجبة.",
        "exampleCode": "txs = [10, -5, 20]\ndep = sum(x for x in txs if x > 0)\nwithdr = sum(abs(x) for x in txs if x < 0)"
    },
    "starterCode": "txs = [150, -50, 300, -120, 450]\n\n# احسب الإيداعات والسحوبات والصافي واطبع الناتج المطلوب تماماً\n",
    "requirements": [
        "اجمع الأرقام الموجبة لحساب Deposits",
        "اجمع القيم المطلقة للأرقام السالبة لحساب Withdrawals",
        "احسب الصافي Net Balance واطبع: Deposits: 900, Withdrawals: 170, Net Balance: 730"
    ],
    "expectedOutput": "Deposits: 900, Withdrawals: 170, Net Balance: 730",
    "hints": [
        "فكرة الحل: استخدم sum(x for x in txs if x > 0) للإيداعات و sum(abs(x) for x in txs if x < 0) للسحوبات.",
        "صافي الرصيد هو طرح السحوبات من الإيداعات. ادمج الثلاثة في f-string واحدة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Deposits: 900, Withdrawals: 170, Net Balance: 730",
            "description": "تدقيق المعاملات المالية وحساب الصافي"
        }
    ],
    "unlocksWorldId": "world-9",
    "nextChallengeId": "world-9-level-1"
},

  "world-9-level-1": {
    "id": "world-9-level-1",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 1,
    "title": "📚 إنشاء القاموس الأول وقراءة المفاتيح (First Dictionary)",
    "englishTitle": "First Dictionary Creation and Key Access",
    "subtitle": "المفاهيم الأساسية لربط المفاتيح بالقيم Key-Value Pairs",
    "difficulty": "easy",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
        "dictionaries",
        "keys",
        "values"
    ],
    "story": "مرحباً بك في واحة البيانات! أنشئ قاموساً باسم student يحتوي على البيانات: 'name' بقيمة 'Sohila' و 'track' بقيمة 'Python'. استخرج القيمتين واطبعهما بصيغة: 'Student: Sohila - Track: Python'.",
    "microLesson": {
        "concept": "القواميس Dictionaries في بايثون",
        "summary": "القاموس هو هيكل بيانات يخزن العناصر في صورة أزواج من المفاتيح والقيم داخل أقواس معقوفة {key: value}.",
        "exampleCode": "user = {'name': 'Ahmed', 'role': 'Admin'}\nprint(f'User: {user[\"name\"]}')"
    },
    "starterCode": "# أنشئ القاموس واستخرج البيانات واطبع: Student: Sohila - Track: Python\n",
    "requirements": [
        "أنشئ قاموس student بالمفتاحين name و track",
        "اطبع بصيغة دقيقة: Student: Sohila - Track: Python"
    ],
    "expectedOutput": "Student: Sohila - Track: Python",
    "hints": [
        "فكرة الحل: أنشئ student = {'name': 'Sohila', 'track': 'Python'}.",
        "اطبع القيمتين باستخدام student['name'] و student['track']."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Student: Sohila - Track: Python",
            "description": "إنشاء وقراءة بيانات القاموس"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-2"
},

  "world-9-level-2": {
    "id": "world-9-level-2",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 2,
    "title": "⚙️ تحديث القيم وإضافة مفاتيح جديدة للقاموس",
    "englishTitle": "Updating Values and Adding Keys to Dictionary",
    "subtitle": "تعديل محتويات القاموس ديناميكياً في الذاكرة",
    "difficulty": "easy",
    "type": "write_code",
    "baseXp": 185,
    "skills": [
        "dictionaries",
        "mutation",
        "update"
    ],
    "story": "لديك قاموس إعدادات تطبيق config = {'theme': 'dark', 'volume': 70}. قم بتحديث قيمة 'theme' لتصبح 'light'، وأضف مفتاحاً جديداً 'language' بقيمة 'ar'. اطبع القاموس المعدل بصيغة: \"Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}\".",
    "microLesson": {
        "concept": "تعديل وإضافة عناصر للقاموس",
        "summary": "لإضافة أو تعديل مفتاح نستخدم صيغة dict[key] = new_value مباشرة.",
        "exampleCode": "settings = {'mode': 'test'}\nsettings['mode'] = 'live'\nsettings['port'] = 8080"
    },
    "starterCode": "config = {'theme': 'dark', 'volume': 70}\n\n# عدل theme وأضف language ثم اطبع القاموس\n",
    "requirements": [
        "غير theme إلى light",
        "أضف language بقيمة ar",
        "اطبع الناتج: Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}"
    ],
    "expectedOutput": "Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}",
    "hints": [
        "فكرة الحل: طبق config['theme'] = 'light' ثم config['language'] = 'ar'.",
        "اطبع القاموس مسبوقاً بـ Config: ."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}",
            "description": "تعديل وإضافة مفاتيح القاموس"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-3"
},

  "world-9-level-3": {
    "id": "world-9-level-3",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 3,
    "title": "📊 عداد تكرار الكلمات الإحصائي (Word Frequency Counter)",
    "englishTitle": "Word Frequency Counter with Dictionary",
    "subtitle": "الخوارزميات التجميعية وبناء الإحصاءات التكرارية",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 195,
    "skills": [
        "frequency_counter",
        "dictionaries",
        "loops"
    ],
    "story": "لديك قائمة كلمات words = ['code', 'python', 'code', 'data', 'python', 'code']. احسب عدد مرات تكرار كل كلمة داخل قاموس. اطبع القاموس الإحصائي بصيغة: \"Counts: {'code': 3, 'python': 2, 'data': 1}\".",
    "microLesson": {
        "concept": "خوارزمية عداد التكرار (Frequency Counter)",
        "summary": "نمر بحلقة على الكلمات: إذا كانت الكلمة موجودة في القاموس نزيد عدادها بواحد، وإلا نضيفها بقيمة 1.",
        "exampleCode": "counts = {}\nfor item in items:\n    counts[item] = counts.get(item, 0) + 1"
    },
    "starterCode": "words = ['code', 'python', 'code', 'data', 'python', 'code']\n\n# احسب تكرار كل كلمة واطبع: Counts: {'code': 3, 'python': 2, 'data': 1}\n",
    "requirements": [
        "احسب تكرار كل كلمة في القائمة",
        "اطبع الناتج بصيغة: Counts: {'code': 3, 'python': 2, 'data': 1}"
    ],
    "expectedOutput": "Counts: {'code': 3, 'python': 2, 'data': 1}",
    "hints": [
        "فكرة الحل: استخدم قاموساً فارغاً counts = {} وطبق حلقة تكرار مع counts.get(w, 0) + 1.",
        "اطبع النتيجة بالصيغة المطلوبة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Counts: {'code': 3, 'python': 2, 'data': 1}",
            "description": "حساب تكرار عناصر قائمة الكلمات"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-4"
},

  "world-9-level-4": {
    "id": "world-9-level-4",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 4,
    "title": "🤝 المجموعات Sets: استخراج العناصر المشتركة (Intersection)",
    "englishTitle": "Set Intersection: Discovering Common Students",
    "subtitle": "العمليات الرياضية على المجموعات والتقاطع",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
        "sets",
        "intersection",
        "sorted"
    ],
    "story": "طلاب مسار بايثون هم python_students = {'Ali', 'Sara', 'Omar', 'Kareem'} وطلاب مسار الذكاء الاصطناعي هم ai_students = {'Sara', 'Kareem', 'Huda'}. استخرج الطلاب المشتركين في كلا المسارين ورتبهم أبجدياً في قائمة. اطبع الناتج بصيغة: \"Common: ['Kareem', 'Sara']\".",
    "microLesson": {
        "concept": "تقاطع المجموعات (Intersection)",
        "summary": "تتيح المجموعات إيجاد العناصر المشتركة عبر المعامل & أو الدالة set1.intersection(set2).",
        "exampleCode": "s1 = {'A', 'B'}\ns2 = {'B', 'C'}\ncommon = sorted(list(s1 & s2))"
    },
    "starterCode": "python_students = {'Ali', 'Sara', 'Omar', 'Kareem'}\nai_students = {'Sara', 'Kareem', 'Huda'}\\n\\n# استخرج المشتركين ورتبهم واطبع: Common: ['Kareem', 'Sara']\n",
    "requirements": [
        "استخرج العناصر المشتركة بين المجموعتين",
        "رتب الأسماء أبجدياً واطبع: Common: ['Kareem', 'Sara']"
    ],
    "expectedOutput": "Common: ['Kareem', 'Sara']",
    "hints": [
        "فكرة الحل: استخدم python_students & ai_students لاستخراج المشتركين.",
        "طبق دالة sorted() على الناتج واطبعه بجوار كلمة Common:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Common: ['Kareem', 'Sara']",
            "description": "تقاطع مجموعتي طلاب بايثون والذكاء الاصطناعي"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-5"
},

  "world-9-level-5": {
    "id": "world-9-level-5",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 5,
    "title": "⚡ المجموعات Sets: استخراج العناصر المنفردة والفرق (Difference)",
    "englishTitle": "Set Difference: Exclusive Elements",
    "subtitle": "عملية طرح المجموعات واكتشاف العناصر الفريدة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 195,
    "skills": [
        "sets",
        "difference",
        "sorted"
    ],
    "story": "باستخدام نفس المجموعتين السابقتين، استخرج الطلاب المسجلين في مسار بايثون فقط ولم يسجلوا في الذكاء الاصطناعي (الفرق python_students - ai_students) ورتبهم أبجدياً. اطبع الناتج بصيغة: \"Python Only: ['Ali', 'Omar']\".",
    "microLesson": {
        "concept": "فرق المجموعات (Difference)",
        "summary": "طرح مجموعتين set1 - set2 يستخرج العناصر الموجودة في الأولى وليست في الثانية.",
        "exampleCode": "s1 = {'X', 'Y'}\ns2 = {'Y', 'Z'}\nonly_in_1 = sorted(list(s1 - s2))"
    },
    "starterCode": "python_students = {'Ali', 'Sara', 'Omar', 'Kareem'}\nai_students = {'Sara', 'Kareem', 'Huda'}\n\n# استخرج طلاب بايثون فقط ورتبهم واطبع: Python Only: ['Ali', 'Omar']\n",
    "requirements": [
        "احسب الفرق بين المجموعتين",
        "رتب الأسماء أبجدياً واطبع: Python Only: ['Ali', 'Omar']"
    ],
    "expectedOutput": "Python Only: ['Ali', 'Omar']",
    "hints": [
        "فكرة الحل: استخدم العملية python_students - ai_students.",
        "رتب الناتج باستخدام sorted() واطبعه بجوار Python Only:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Python Only: ['Ali', 'Omar']",
            "description": "فرق المجموعتين واستخراج طلاب بايثون فقط"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-6"
},

  "world-9-level-6": {
    "id": "world-9-level-6",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 6,
    "title": "🔗 تحويل قائمتين متناظرتين إلى قاموس (Dict from Two Lists)",
    "englishTitle": "Constructing Dictionary from Two Parallel Lists",
    "subtitle": "الدمج الذكي باستخدام zip وتحويله لهيكل بيانات منظم",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "zip",
        "dict_constructor",
        "data_transformation"
    ],
    "story": "لديك قائمة أسماء الحقول keys = ['id', 'user', 'role'] وقائمة بالقيم المقابلة vals = [101, 'ibrahim', 'admin']. ادمج القائمتين لتكوين قاموس واحد منظم. اطبع الناتج بصيغة: \"User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}\".",
    "microLesson": {
        "concept": "تحويل zip إلى قاموس dict(zip(...))",
        "summary": "يمكن تحويل قائمتين متوازيتين إلى قاموس مباشرة بتمرير zip(keys, vals) إلى الدالة dict().",
        "exampleCode": "k = ['a', 'b']\nv = [1, 2]\nd = dict(zip(k, v))"
    },
    "starterCode": "keys = ['id', 'user', 'role']\nvals = [101, 'ibrahim', 'admin']\n\n# ادمج القائمتين في قاموس واطبع: User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}\n",
    "requirements": [
        "ادمج keys و vals في قاموس واحد",
        "اطبع القاموس مسبوقاً بـ User Dict: "
    ],
    "expectedOutput": "User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}",
    "hints": [
        "فكرة الحل: استخدم الدالة dict(zip(keys, vals)).",
        "اطبع النتيجة بالصيغة المطلوبة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}",
            "description": "تحويل قائمتي keys و vals إلى قاموس"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-7"
},

  "world-9-level-7": {
    "id": "world-9-level-7",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 7,
    "title": "🛡️ القراءة الآمنة بالقيم الافتراضية (dict.get)",
    "englishTitle": "Safe Key Lookup with Default Values",
    "subtitle": "تجنب أخطاء KeyError وبناء أنظمة برمجية مرنة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "dict_get",
        "defensive_programming",
        "dictionaries"
    ],
    "story": "لديك قاموس بيانات طالب student = {'name': 'Basma', 'score': 95}. استخرج قيمة المفتاح 'city' بأمان مع تعيين قيمة افتراضية 'Cairo' إذا لم يكن المفتاح موجوداً في القاموس. اطبع النتيجة بصيغة: 'City: Cairo'.",
    "microLesson": {
        "concept": "الدالة الآمنة dict.get(key, default)",
        "summary": "الوصول بالدالة .get() يمنع حدوث خطأ KeyError إذا لم يكن المفتاح موجوداً، ويرجع القيمة الافتراضية المحددة بدلاً من ذلك.",
        "exampleCode": "info = {'name': 'Omar'}\ncity = info.get('city', 'Unknown')\nprint(f'City: {city}')"
    },
    "starterCode": "student = {'name': 'Basma', 'score': 95}\n\n# استخرج city بقيمة افتراضية Cairo واطبع: City: Cairo\n",
    "requirements": [
        "استخدم الدالة .get() للبحث عن city بقيمة افتراضية Cairo",
        "اطبع الناتج: City: Cairo"
    ],
    "expectedOutput": "City: Cairo",
    "hints": [
        "فكرة الحل: استخدم student.get('city', 'Cairo').",
        "اطبع المتغير بصيغة City: {city}."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "City: Cairo",
            "description": "البحث عن مفتاح غير موجود مع قيمة افتراضية"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-8"
},

  "world-9-level-8": {
    "id": "world-9-level-8",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 8,
    "title": "🏆 ترتيب مفاتيح القاموس حسب القيم (Sorting by Values)",
    "englishTitle": "Sorting Dictionary Keys by Values Descending",
    "subtitle": "استخدام مفاتيح الترتيب key function مع sorted",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 215,
    "skills": [
        "sorted",
        "lambda",
        "dictionaries"
    ],
    "story": "لديك درجات الطلاب في قاموس scores = {'Sara': 98, 'Kareem': 88, 'Ali': 92}. رتب أسماء الطلاب تنازلياً (من الأعلى إلى الأقل) في قائمة جديدة وفقاً لدرجاتهم. اطبع الناتج بصيغة: \"Ranked: ['Sara', 'Ali', 'Kareem']\".",
    "microLesson": {
        "concept": "ترتيب القاموس باستخدام sorted مع المعامل key",
        "summary": "يمكنك ترتيب مفاتيح القاموس حسب قيمها بتمرير key=scores.get أو دالة lambda مع وضع reverse=True للترتيب التنازلي.",
        "exampleCode": "d = {'A': 10, 'B': 50, 'C': 30}\nranked = sorted(d, key=d.get, reverse=True)\nprint(ranked)"
    },
    "starterCode": "scores = {'Sara': 98, 'Kareem': 88, 'Ali': 92}\n\n# رتب الأسماء تنازلياً حسب الدرجة واطبع: Ranked: ['Sara', 'Ali', 'Kareem']\n",
    "requirements": [
        "رتب الأسماء تنازلياً حسب الدرجة",
        "اطبع القائمة بصيغة: Ranked: ['Sara', 'Ali', 'Kareem']"
    ],
    "expectedOutput": "Ranked: ['Sara', 'Ali', 'Kareem']",
    "hints": [
        "فكرة الحل: استخدم sorted(scores, key=scores.get, reverse=True).",
        "اطبع الناتج بجوار Ranked:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Ranked: ['Sara', 'Ali', 'Kareem']",
            "description": "ترتيب الطلاب تنازلياً حسب الدرجات"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-9"
},

  "world-9-level-9": {
    "id": "world-9-level-9",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 9,
    "title": "🏢 القواميس المتداخلة وتجميع إحصاءات الشركات (Nested Dicts)",
    "englishTitle": "Nested Dictionaries & Corporate Stats Aggregation",
    "subtitle": "التعامل مع الهياكل البيانية متعددة المستويات والتحليل المالي",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 220,
    "skills": [
        "nested_dictionaries",
        "aggregation",
        "loops"
    ],
    "story": "لديك بيانات أقسام شركة داخل قاموس متداخل dept = {'IT': {'count': 12, 'budget': 60000}, 'HR': {'count': 8, 'budget': 32000}}. احسب إجمالي عدد الموظفين وإجمالي الميزانية لجميع الأقسام. اطبع الناتج بصيغة: 'Total Staff: 20, Total Budget: 92000'.",
    "microLesson": {
        "concept": "الوصول للقواميس المتداخلة (Nested Dictionaries)",
        "summary": "للوصول لقيمة داخل قاموس متداخل نستخدم مفتاحين متتاليين dict[outer_key][inner_key].",
        "exampleCode": "total = 0\nfor d_name, d_info in dept.items():\n    total += d_info['count']"
    },
    "starterCode": "dept = {'IT': {'count': 12, 'budget': 60000}, 'HR': {'count': 8, 'budget': 32000}}\n\n# احسب إجمالي الموظفين والميزانية واطبع: Total Staff: 20, Total Budget: 92000\n",
    "requirements": [
        "اجمع count لجميع الأقسام",
        "اجمع budget لجميع الأقسام",
        "اطبع بصيغة: Total Staff: 20, Total Budget: 92000"
    ],
    "expectedOutput": "Total Staff: 20, Total Budget: 92000",
    "hints": [
        "فكرة الحل: مر بحلقة for info in dept.values(): واجمع info['count'] و info['budget'].",
        "اطبع الناتج بصيغة f-string المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Total Staff: 20, Total Budget: 92000",
            "description": "تجميع إحصاءات الأقسام المتداخلة"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-10"
},

  "world-9-level-10": {
    "id": "world-9-level-10",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 10,
    "title": "⚡ إنشاء القواميس بالاستيعاب (Dictionary Comprehension)",
    "englishTitle": "Dictionary Comprehension: Squares Mapping",
    "subtitle": "الصياغة الاحترافية لبناء القواميس في سطر برمجي واحد",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 225,
    "skills": [
        "dict_comprehension",
        "math",
        "clean_code"
    ],
    "story": "أنشئ قاموساً لمربعات الأرقام الزوجية من 2 إلى 8 (أي للأرقام 2, 4, 6, 8) باستخدام Dictionary Comprehension، بحيث يكون المفتاح هو الرقم والقيمة هي مربعه (الرقم مضروباً في نفسه). اطبع القاموس بصيغة: \"Squares: {2: 4, 4: 16, 6: 36, 8: 64}\".",
    "microLesson": {
        "concept": "بناء القواميس بـ Dictionary Comprehension",
        "summary": "توفر بايثون صياغة مباشرة لبناء القواميس: {k: v for x in iterable if condition}.",
        "exampleCode": "sq = {x: x**2 for x in range(1, 4)}\nprint(sq)"
    },
    "starterCode": "# أنشئ قاموس مربعات الأرقام 2 و 4 و 6 و 8 واطبع: Squares: {2: 4, 4: 16, 6: 36, 8: 64}\n",
    "requirements": [
        "استخدم Dictionary Comprehension أو حلقة لتوليد القاموس",
        "اطبع القاموس مسبوقاً بـ Squares: "
    ],
    "expectedOutput": "Squares: {2: 4, 4: 16, 6: 36, 8: 64}",
    "hints": [
        "فكرة الحل: استخدم {x: x**2 for x in range(2, 9, 2)}.",
        "اطبع الناتج مباشرة بالصيغة المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Squares: {2: 4, 4: 16, 6: 36, 8: 64}",
            "description": "توليد قاموس مربعات الأرقام الزوجية"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-9-level-11"
},

  "world-9-level-11": {
    "id": "world-9-level-11",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 11,
    "title": "👑 زعيم الواحة النهائي: تحليل سلة التسوق الإلكترونية (Master Boss 09)",
    "englishTitle": "Grand Master Boss: E-Commerce Shopping Cart Analytics",
    "subtitle": "تطبيق واقعي شامل يدمج القوائم والقواميس والتجميع والمقارنات",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 260,
    "skills": [
        "data_analytics",
        "dictionaries",
        "lists",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم النهائي للواحة: لديك سلة مشتريات إلكترونية تحتوي على السلع التالية: cart = [{'item': 'Book', 'price': 150, 'qty': 2}, {'item': 'Pen', 'price': 25, 'qty': 4}, {'item': 'Notebook', 'price': 60, 'qty': 3}]. احسب إجمالي قيمة السلة (حاصل ضرب price * qty لكل سلعة: 300 + 100 + 180 = 580)، وحدد اسم السلعة التي حققت أعلى تكلفة إجمالية ('Book' بتكلفة 300). اطبع النتيجة بصيغة: 'Cart Total: 580 EGP, Top Item: Book'.",
    "microLesson": {
        "concept": "تحليل البيانات وهياكل السجلات (Data Record Analytics)",
        "summary": "في المتاجر الإلكترونية، يتم تمثيل سلة الشراء كقائمة من القواميس. نمر عليها لحساب المجاميع وإيجاد العنصر صاحب أعلى تكلفة.",
        "exampleCode": "total = 0\nbest_item = ''\nmax_cost = 0\nfor item in cart:\n    cost = item['price'] * item['qty']\n    total += cost\n    if cost > max_cost:\n        max_cost = cost\n        best_item = item['item']"
    },
    "starterCode": "cart = [\n    {'item': 'Book', 'price': 150, 'qty': 2},\n    {'item': 'Pen', 'price': 25, 'qty': 4},\n    {'item': 'Notebook', 'price': 60, 'qty': 3}\n]\n\n# احسب الإجمالي الكلي وحدد أعلى سلعة تكلفة واطبع الناتج المطلوب\n",
    "requirements": [
        "احسب التكلفة الإجمالية للسلة",
        "حدد اسم السلعة ذات أعلى تكلفة إجمالية",
        "اطبع بصيغة دقيقة: Cart Total: 580 EGP, Top Item: Book"
    ],
    "expectedOutput": "Cart Total: 580 EGP, Top Item: Book",
    "hints": [
        "فكرة الحل: اضرب price في qty لكل عنصر واجمعه في total.",
        "تتبع العنصر صاحب أكبر حاصل ضرب (وهو Book بقيمة 300)، ثم اطبعهما بصيغة f-string المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Cart Total: 580 EGP, Top Item: Book",
            "description": "تحليل سلة التسوق وحساب الإجمالي وأعلى سلعة"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-1": {
    "id": "bonus-world-1",
    "worldId": "world-1",
    "worldTitle": "قرية بايثون",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: تحويل الثواني إلى دقائق وثوانٍ",
    "englishTitle": "Bonus: Seconds to Minutes & Seconds Converter",
    "subtitle": "تحدي سرعة إضافي لكسب نقاط وبطولات إضافية",
    "difficulty": "easy",
    "type": "bonus",
    "baseXp": 120,
    "skills": [
        "bonus",
        "arithmetic",
        "modulus"
    ],
    "story": "لديك عدد ثوانٍ total_seconds = 145. احسب عدد الدقائق بالقسمة الصحيحة // وباقي الثواني بمعامل % واطبع بصيغة: 'Time: 2m 25s'.",
    "microLesson": {
        "concept": "القسمة الصحيحة وباقي القسمة في تحويل الوقت",
        "summary": "الدقائق = total // 60، والثواني = total % 60.",
        "exampleCode": "s = 125\nprint(f'{s//60}m {s%60}s')"
    },
    "starterCode": "total_seconds = 145\n# احسب واطبع بصيغة: Time: 2m 25s\n",
    "requirements": [
        "اطبع الناتج بصيغة: Time: 2m 25s"
    ],
    "expectedOutput": "Time: 2m 25s",
    "hints": [
        "استخدم // 60 للدقائق و % 60 للثواني."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Time: 2m 25s",
            "description": "تحويل 145 ثانية"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-2": {
    "id": "bonus-world-2",
    "worldId": "world-2",
    "worldTitle": "وادي الشروط والقرارات",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: تحديد الربع السنوي للتاريخ (Quarter Finder)",
    "englishTitle": "Bonus: Fiscal Quarter Finder",
    "subtitle": "تحدي سرعة إضافي للشروط والمدى",
    "difficulty": "easy",
    "type": "bonus",
    "baseXp": 130,
    "skills": [
        "bonus",
        "conditions"
    ],
    "story": "لديك رقم الشهر month = 8. حدد الربع السنوي (الأشهر 1-3 Q1، 4-6 Q2، 7-9 Q3، 10-12 Q4). للشهر 8 اطبع: 'Quarter: Q3'.",
    "microLesson": {
        "concept": "تصنيف الشهور إلى أرباع سنوية",
        "summary": "الشهر 8 يقع في الربع الثالث Q3.",
        "exampleCode": "m = 5\nprint('Q2' if m <= 6 else 'Q3')"
    },
    "starterCode": "month = 8\n# حدد الربع واطبع: Quarter: Q3\n",
    "requirements": [
        "اطبع: Quarter: Q3"
    ],
    "expectedOutput": "Quarter: Q3",
    "hints": [
        "تحقق من 7 <= month <= 9."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Quarter: Q3",
            "description": "تحديد ربع الشهر 8"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-3": {
    "id": "bonus-world-3",
    "worldId": "world-3",
    "worldTitle": "غابة التكرار والحلقات",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: حساب مضروب العدد (Factorial)",
    "englishTitle": "Bonus: Factorial Calculation",
    "subtitle": "تحدي سرعة إضافي لحلقات التكرار",
    "difficulty": "medium",
    "type": "bonus",
    "baseXp": 140,
    "skills": [
        "bonus",
        "loops",
        "math"
    ],
    "story": "احسب مضروب العدد num = 5 (أي 5 * 4 * 3 * 2 * 1 = 120) باستخدام حلقة تكرار. اطبع النتيجة بصيغة: 'Factorial: 120'.",
    "microLesson": {
        "concept": "حساب المضروب التراكمي",
        "summary": "نبدأ بـ fact = 1 ونضرب في كل رقم من 1 إلى num.",
        "exampleCode": "fact = 1\nfor i in range(1, 6):\n    fact *= i"
    },
    "starterCode": "num = 5\n# احسب المضروب واطبع: Factorial: 120\n",
    "requirements": [
        "اطبع: Factorial: 120"
    ],
    "expectedOutput": "Factorial: 120",
    "hints": [
        "استخدم حلقة تكرار تضرب الأرقام في متغير تراكمي."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Factorial: 120",
            "description": "مضروب العدد 5"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-4": {
    "id": "bonus-world-4",
    "worldId": "world-4",
    "worldTitle": "كهف النصوص والكلمات",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: استبدال المسافات بالشرطات (Slugify)",
    "englishTitle": "Bonus: URL Slugify",
    "subtitle": "تحدي سرعة إضافي لدوال النصوص",
    "difficulty": "easy",
    "type": "bonus",
    "baseXp": 130,
    "skills": [
        "bonus",
        "strings",
        "replace"
    ],
    "story": "لديك عنوان مقال title = 'Learn Python With Shababha'. حول الحروف لصغيرة واستبدل المسافات بشرطة '-'. اطبع: 'Slug: learn-python-with-shababha'.",
    "microLesson": {
        "concept": "توليد الروابط بـ lower و replace",
        "summary": "title.lower().replace(' ', '-') تحول العنوان لرابط نظيف.",
        "exampleCode": "t = 'My Title'\nprint(t.lower().replace(' ', '-'))"
    },
    "starterCode": "title = 'Learn Python With Shababha'\n# ولد الرابط واطبع: Slug: learn-python-with-shababha\n",
    "requirements": [
        "اطبع: Slug: learn-python-with-shababha"
    ],
    "expectedOutput": "Slug: learn-python-with-shababha",
    "hints": [
        "طبق دالة .lower() ثم .replace(' ', '-')."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Slug: learn-python-with-shababha",
            "description": "تحويل العنوان لرابط"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-5": {
    "id": "bonus-world-5",
    "worldId": "world-5",
    "worldTitle": "مملكة القوائم والمصفوفات",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: إيجاد ثاني أكبر رقم في القائمة",
    "englishTitle": "Bonus: Second Largest Number",
    "subtitle": "تحدي سرعة إضافي للتعامل مع القوائم والمجموعات",
    "difficulty": "medium",
    "type": "bonus",
    "baseXp": 150,
    "skills": [
        "bonus",
        "lists",
        "sorted"
    ],
    "story": "لديك قائمة أرقام nums = [12, 45, 2, 45, 33, 18]. استبعد التكرار ثم أوجد ثاني أكبر رقم واطبعه بصيغة: 'Second Largest: 33'.",
    "microLesson": {
        "concept": "إيجاد ثاني أكبر عنصر",
        "summary": "تحويل القائمة لمجموعة واستبعاد المكررات ثم الترتيب يتيح أخذ العنصر [-2].",
        "exampleCode": "u = sorted(set(nums))\nprint(u[-2])"
    },
    "starterCode": "nums = [12, 45, 2, 45, 33, 18]\n# أوجد ثاني أكبر رقم واطبع: Second Largest: 33\n",
    "requirements": [
        "اطبع: Second Largest: 33"
    ],
    "expectedOutput": "Second Largest: 33",
    "hints": [
        "استخدم sorted(set(nums))[-2]."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Second Largest: 33",
            "description": "ثاني أكبر رقم في القائمة"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-6": {
    "id": "bonus-world-6",
    "worldId": "world-6",
    "worldTitle": "قلعة الدوال والموديولات",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: دالة فحص الكلمات المنتهية بلاحقة معينة",
    "englishTitle": "Bonus: Ends With Checker Function",
    "subtitle": "تحدي سرعة إضافي للدوال ومعاملاتها",
    "difficulty": "easy",
    "type": "bonus",
    "baseXp": 140,
    "skills": [
        "bonus",
        "functions",
        "endswith"
    ],
    "story": "اكتب دالة check_extension(filename) ترجع True إذا كان الملف ينتهي بـ '.py'. استدعها للملف 'main.py' واطبع: 'Is Python: True'.",
    "microLesson": {
        "concept": "فحص لاحقة النص بـ endswith",
        "summary": "الدالة filename.endswith('.py') ترجع قيمة منطقية True أو False.",
        "exampleCode": "def is_py(f): return f.endswith('.py')"
    },
    "starterCode": "# عرف الدالة وافحص 'main.py' واطبع: Is Python: True\n",
    "requirements": [
        "اطبع: Is Python: True"
    ],
    "expectedOutput": "Is Python: True",
    "hints": [
        "استخدم الدالة f.endswith('.py')."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Is Python: True",
            "description": "فحص امتداد main.py"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-7": {
    "id": "bonus-world-7",
    "worldId": "world-7",
    "worldTitle": "برج الخوارزميات والبحث",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: حساب المتوسط الحسابي المتحرك لثلاثة عناصر",
    "englishTitle": "Bonus: 3-Element Moving Average",
    "subtitle": "تحدي سرعة إضافي للخوارزميات والتقطيع التتابعي",
    "difficulty": "medium",
    "type": "bonus",
    "baseXp": 160,
    "skills": [
        "bonus",
        "moving_average",
        "algorithms"
    ],
    "story": "لديك قراءات درجات حرارة temps = [20, 24, 28, 30]. احسب متوسط أول 3 قراءات (20 + 24 + 28) / 3 واطبع بصيغة: 'Moving Avg: 24.0'.",
    "microLesson": {
        "concept": "المتوسط المتحرك (Moving Average)",
        "summary": "حساب متوسط نافذة محددة من القائمة sum(window) / len(window).",
        "exampleCode": "w = temps[0:3]\nprint(sum(w)/len(w))"
    },
    "starterCode": "temps = [20, 24, 28, 30]\n# احسب متوسط أول 3 عناصر واطبع: Moving Avg: 24.0\n",
    "requirements": [
        "اطبع: Moving Avg: 24.0"
    ],
    "expectedOutput": "Moving Avg: 24.0",
    "hints": [
        "اجمع أول 3 عناصر واقسم على 3."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Moving Avg: 24.0",
            "description": "متوسط أول 3 درجات حرارة"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-8": {
    "id": "bonus-world-8",
    "worldId": "world-8",
    "worldTitle": "عرش البايثوني الخارق",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: محاكاة فاحص كلمات المرور الآمنة",
    "englishTitle": "Bonus: Password Strength Validator",
    "subtitle": "تحدي سرعة إضافي للأمان والشروط المتعددة",
    "difficulty": "medium",
    "type": "bonus",
    "baseXp": 170,
    "skills": [
        "bonus",
        "security",
        "validation"
    ],
    "story": "افحص كلمة المرور pwd = 'Pass#2026'. إذا كان طولها 8 فما فوق وتحتوي على رقم وتحتوي على '#' فهي مقبولة. اطبع: 'Password: Secure'.",
    "microLesson": {
        "concept": "التحقق من قوة كلمات المرور",
        "summary": "فحص الطول مع وجود رموز وأرقام بأي من الدوال any(c.isdigit() for c in pwd).",
        "exampleCode": "is_strong = len(p) >= 8 and any(c.isdigit() for c in p)"
    },
    "starterCode": "pwd = 'Pass#2026'\n# افحص كلمة المرور واطبع: Password: Secure\n",
    "requirements": [
        "اطبع: Password: Secure"
    ],
    "expectedOutput": "Password: Secure",
    "hints": [
        "تحقق من الشروط الثلاثة واطبع الرسالة المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Password: Secure",
            "description": "فحص كلمة المرور Pass#2026"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  "bonus-world-9": {
    "id": "bonus-world-9",
    "worldId": "world-9",
    "worldTitle": "واحة القواميس والبيانات",
    "levelNumber": 12,
    "title": "⚡ تحدي إضافي: عكس مفاتيح وقيم القاموس (Invert Dictionary)",
    "englishTitle": "Bonus: Dictionary Inversion",
    "subtitle": "تحدي سرعة إضافي لعكس خرائط البيانات Key-Value Inversion",
    "difficulty": "hard",
    "type": "bonus",
    "baseXp": 180,
    "skills": [
        "bonus",
        "dictionaries",
        "inversion"
    ],
    "story": "لديك قاموس رتب d = {'first': 1, 'second': 2, 'third': 3}. قم بعكس القاموس بحيث تصبح القيم مفاتيح والمفاتيح قيماً. اطبع الناتج بصيغة: \"Inverted: {1: 'first', 2: 'second', 3: 'third'}\".",
    "microLesson": {
        "concept": "عكس القاموس بـ Dictionary Comprehension",
        "summary": "يمكن عكس المفتاح بالقيمة باستخدام {v: k for k, v in d.items()}.",
        "exampleCode": "inv = {v: k for k, v in d.items()}"
    },
    "starterCode": "d = {'first': 1, 'second': 2, 'third': 3}\n# اعكس القاموس واطبع: Inverted: {1: 'first', 2: 'second', 3: 'third'}\n",
    "requirements": [
        "اطبع: Inverted: {1: 'first', 2: 'second', 3: 'third'}"
    ],
    "expectedOutput": "Inverted: {1: 'first', 2: 'second', 3: 'third'}",
    "hints": [
        "استخدم {v: k for k, v in d.items()}."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Inverted: {1: 'first', 2: 'second', 3: 'third'}",
            "description": "عكس قاموس d"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
},

  // ==========================================
  // PROBLEM SOLVING & INTERVIEW EXPANSION WORLDS (10, 11, 12)
  // ==========================================
  "world-10-level-1": {
    "id": "world-10-level-1",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 1,
    "title": "📐 فاحص متساوي الأضلاع والزوايا في المثلثات",
    "englishTitle": "Equilateral Triangle Classifier",
    "subtitle": "المقارنات المتعددة والشروط الهندسية",
    "difficulty": "easy",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "problem_solving",
        "geometry",
        "conditions"
    ],
    "story": "لديك أطوال أضلاع مثلث a = 5 و b = 5 و c = 5. افحص ما إذا كان المثلث متساوي الأضلاع (Equilateral) بتساوي جميع أضلاعه الثلاثة معاً. إذا كان كذلك اطبع: 'Triangle: Equilateral'.",
    "microLesson": {
        "concept": "المقارنات المتسلسلة والشروط المترابطة",
        "summary": "في بايثون يمكن كتابة a == b == c للتحقق من تساوي ثلاثة متغيرات في شرط واحد أنيق.",
        "exampleCode": "x = 10\ny = 10\nz = 10\nif x == y == z:\n    print('All Equal')"
    },
    "starterCode": "a = 5\nb = 5\nc = 5\n\n# افحص تساوي الأضلاع واطبع: Triangle: Equilateral\n",
    "requirements": [
        "تحقق من أن a يساوي b ويساوي c",
        "اطبع بصيغة دقيقة: Triangle: Equilateral"
    ],
    "expectedOutput": "Triangle: Equilateral",
    "hints": [
        "فكرة الحل: استخدم الشرط if a == b == c أو if a == b and b == c.",
        "اطبع جملة Triangle: Equilateral داخل كتلة الشرط."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Triangle: Equilateral",
            "description": "فحص مثلث متساوي الأضلاع 5, 5, 5"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-2"
},

  "world-10-level-2": {
    "id": "world-10-level-2",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 2,
    "title": "🔍 إيجاد أصغر وأكبر قيمة يدوياً (Manual Min-Max)",
    "englishTitle": "Manual Min & Max Finding Loop",
    "subtitle": "التفكير الخوارزمي الأساسي بدون استخدام دوال جاهزة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 210,
    "skills": [
        "problem_solving",
        "loops",
        "algorithms"
    ],
    "story": "لديك قائمة أرقام nums = [34, 12, 89, 5, 67, 23]. ابحث عن أصغر قيمة وأكبر قيمة بالمرور عبر حلقة تكرار يدوية (دون استخدام دوال min أو max الجاهزة). اطبع النتيجة بصيغة: 'Min: 5, Max: 89'.",
    "microLesson": {
        "concept": "خوارزمية البحث عن القيم القصوى والدنيا",
        "summary": "نبدأ بافتراض أن أول عنصر هو الأصغر والأكبر معاً، ثم نمر على باقي العناصر ونحدث القيم كلما وجدنا عنصراً أصغر أو أكبر.",
        "exampleCode": "arr = [4, 9, 2]\ncur_max = arr[0]\nfor item in arr:\n    if item > cur_max:\n        cur_max = item"
    },
    "starterCode": "nums = [34, 12, 89, 5, 67, 23]\n\n# ابحث يدوياً عن الأصغر والأكبر واطبع: Min: 5, Max: 89\n",
    "requirements": [
        "استخدم حلقة تكرار لتحديث قيمتي min و max",
        "اطبع بصيغة: Min: 5, Max: 89"
    ],
    "expectedOutput": "Min: 5, Max: 89",
    "hints": [
        "فكرة الحل: ابدأ بـ mn = nums[0] و mx = nums[0]، ثم قارن كل رقم معهما داخل حلقة for.",
        "اطبع الناتج النهائي بصيغة f-string المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Min: 5, Max: 89",
            "description": "إيجاد الأصغر 5 والأكبر 89"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-3"
},

  "world-10-level-3": {
    "id": "world-10-level-3",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 3,
    "title": "📦 حاسبة تكلفة الشحن بالوزن والمسافة",
    "englishTitle": "Logistics Shipping Cost Engine",
    "subtitle": "التطبيقات اللوجستية والحسابات المركبة",
    "difficulty": "easy",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
        "problem_solving",
        "math",
        "logistics"
    ],
    "story": "طرد وزنه weight_kg = 8 والمسافة المطلوبة distance_km = 120. التكلفة تحسب وفق المعادلة: 30 جنيهاً رسم ثابت + 5 جنيهات لكل كجم + 0.5 جنيه لكل كم (أي 30 + 40 + 60 = 130.0). اطبع الناتج بصيغة: 'Shipping: 130.0 EGP'.",
    "microLesson": {
        "concept": "حساب التسعير الديناميكي المركب",
        "summary": "التكلفة الإجمالية تجمع الرسوم الثابتة والمتغيرة، وتنسق كعدد عشري بدقة منزلة واحدة.",
        "exampleCode": "base = 20\nw = 5 * 2\nd = 50 * 0.1\ntotal = base + w + d"
    },
    "starterCode": "weight_kg = 8\ndistance_km = 120\n\n# احسب التكلفة واطبع: Shipping: 130.0 EGP\n",
    "requirements": [
        "طبق معادلة الشحن بدقة",
        "اطبع الناتج بصيغة: Shipping: 130.0 EGP"
    ],
    "expectedOutput": "Shipping: 130.0 EGP",
    "hints": [
        "فكرة الحل: المعادلة هي 30 + (weight_kg * 5) + (distance_km * 0.5).",
        "استخدم :.1f داخل f-string متبوعة بـ EGP."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Shipping: 130.0 EGP",
            "description": "حساب شحن 8 كجم على مسافة 120 كم"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-4"
},

  "world-10-level-4": {
    "id": "world-10-level-4",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 4,
    "title": "📊 تصنيف الأرقام: الموجبة والسالبة والأصفار",
    "englishTitle": "Sign Classification: Positives, Negatives, and Zeros",
    "subtitle": "عدادات التصنيف المتعددة في دورة تكرارية واحدة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 210,
    "skills": [
        "problem_solving",
        "loops",
        "counters"
    ],
    "story": "لديك قائمة أرقام vals = [-3, 5, 0, 12, -7, 0, 8]. قم بعد كم رقماً موجباً (> 0)، وكم رقماً سالباً (< 0)، وكم صفراً (== 0) في القائمة. اطبع النتيجة بصيغة: 'Positive: 3, Negative: 2, Zeros: 2'.",
    "microLesson": {
        "concept": "التصنيف التراكمي في دورة واحدة (Single-Pass Counter)",
        "summary": "بدلاً من تكرار البحث، نستخدم ثلاث متغيرات عدادات ونحدث العداد المناسب داخل حلقة واحدة.",
        "exampleCode": "c_pos = 0\nfor x in arr:\n    if x > 0:\n        c_pos += 1"
    },
    "starterCode": "vals = [-3, 5, 0, 12, -7, 0, 8]\n\n# احسب التصنيفات واطبع: Positive: 3, Negative: 2, Zeros: 2\n",
    "requirements": [
        "احسب أعداد القيم الموجبة والسالبة والأصفار",
        "اطبع بصيغة: Positive: 3, Negative: 2, Zeros: 2"
    ],
    "expectedOutput": "Positive: 3, Negative: 2, Zeros: 2",
    "hints": [
        "فكرة الحل: أنشئ ثلاثة عدادات pos = 0 و neg = 0 و zero = 0.",
        "مر بحلقة على القائمة وافحص كل عنصر، ثم اطبع النتيجة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Positive: 3, Negative: 2, Zeros: 2",
            "description": "عد الموجب والسالب والأصفار"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-5"
},

  "world-10-level-5": {
    "id": "world-10-level-5",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 5,
    "title": "🔒 فاحص قوة كلمات المرور المعقدة (Password Security)",
    "englishTitle": "Multi-Criteria Password Security Validator",
    "subtitle": "فحص الشروط المتعددة والدوال النصية",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 215,
    "skills": [
        "problem_solving",
        "security",
        "strings"
    ],
    "story": "لديك كلمة مرور pwd = 'Python#2026'. تكون كلمة المرور قوية ('Strong') إذا كان طولها >= 8، وتحتوي على رقم واحد على الأقل، وتحتوي على رمز '#'. اطبع النتيجة بصيغة: 'Password Strength: Strong'.",
    "microLesson": {
        "concept": "فحص المعايير الأمنية المتعددة",
        "summary": "يمكن التحقق من وجود أرقام باستخدام any(c.isdigit() for c in pwd) ومن الرموز باستخدام in.",
        "exampleCode": "has_num = any(char.isdigit() for char in text)\nhas_hash = '#' in text"
    },
    "starterCode": "pwd = 'Python#2026'\n\n# افحص قوة كلمة المرور واطبع: Password Strength: Strong\n",
    "requirements": [
        "تحقق من الطول واحتوائها على رقم ورمز #",
        "اطبع بصيغة: Password Strength: Strong"
    ],
    "expectedOutput": "Password Strength: Strong",
    "hints": [
        "فكرة الحل: افحص len(pwd) >= 8 و any(c.isdigit() for c in pwd) و '#' in pwd.",
        "اطبع جملة النتيجة المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Password Strength: Strong",
            "description": "التحقق من قوة كلمة مرور Python#2026"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-6"
},

  "world-10-level-6": {
    "id": "world-10-level-6",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 6,
    "title": "⏰ تحويل التوقيت من نظام 24 ساعة إلى نظام 12 ساعة (AM/PM)",
    "englishTitle": "24-Hour to 12-Hour Clock Converter",
    "subtitle": "العمليات الحسابية الزمنية وباقي القسمة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 210,
    "skills": [
        "problem_solving",
        "time_conversion",
        "formatting"
    ],
    "story": "لديك وقت بنظام 24 ساعة: hour = 17 و minute = 45. حول الساعة لنظام 12 ساعة مع تحديد AM أو PM (17 تصبح 05 مساءً PM). اطبع الوقت بصيغة: 'Time: 05:45 PM'.",
    "microLesson": {
        "concept": "تحويل التوقيت الزمني وباقي القسمة",
        "summary": "إذا كانت الساعة >= 12 تكون PM وإلا AM. والساعة بنظام 12 هي (hour % 12) مع معالجة الصفر كـ 12.",
        "exampleCode": "period = 'PM' if h >= 12 else 'AM'\nh12 = h % 12\nif h12 == 0: h12 = 12"
    },
    "starterCode": "hour = 17\nminute = 45\n\n# حول الوقت واطبع بصيغة: Time: 05:45 PM\n",
    "requirements": [
        "حدد الفترة AM أو PM والساعة بنظام 12",
        "اطبع الوقت بصيغة دقيقة: Time: 05:45 PM"
    ],
    "expectedOutput": "Time: 05:45 PM",
    "hints": [
        "فكرة الحل: 17 - 12 = 5، والفترة هي PM لأن 17 >= 12.",
        "استخدم :02d لضبط خانتي الساعة والدقيقة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Time: 05:45 PM",
            "description": "تحويل الساعة 17:45"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-7"
},

  "world-10-level-7": {
    "id": "world-10-level-7",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 7,
    "title": "🔢 خوارزمية إيجاد الرقم المفقود في المتتالية (Missing Number)",
    "englishTitle": "Missing Number in Sequence Algorithm",
    "subtitle": "استخدام مجموع متسلسلة غاوس الرياضية لحل المسائل بكفاءة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 220,
    "skills": [
        "problem_solving",
        "math",
        "algorithms"
    ],
    "story": "لديك متتالية أرقام من 1 إلى 6 ينقصها رقم واحد: nums = [1, 2, 4, 5, 6]. استخدم صيغة المجموع المتوقع (n * (n + 1) // 2) واطرح منها مجموع عناصر القائمة الحالية لمعرفة الرقم المفقود. اطبع النتيجة بصيغة: 'Missing: 3'.",
    "microLesson": {
        "concept": "صيغة غاوس لمجموع الأعداد المتتالية",
        "summary": "مجموع الأعداد من 1 إلى n يحسب بضرب n في (n + 1) والقسمة على 2. الفارق بين هذا المجموع والمجموع الفعلي يعطي الرقم المفقود مباشرة في زمن O(1) إضافي.",
        "exampleCode": "n = 5\nexpected = n * (n + 1) // 2\nactual = sum([1, 2, 4, 5])\nmissing = expected - actual"
    },
    "starterCode": "nums = [1, 2, 4, 5, 6]\nn = 6\n\n# احسب الرقم المفقود واطبع: Missing: 3\n",
    "requirements": [
        "احسب المجموع المتوقع للأرقام حتى n واطرح منه sum(nums)",
        "اطبع الناتج: Missing: 3"
    ],
    "expectedOutput": "Missing: 3",
    "hints": [
        "فكرة الحل: expected_sum = n * (n + 1) // 2 ثم missing = expected_sum - sum(nums).",
        "اطبع النتيجة بجوار Missing:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Missing: 3",
            "description": "إيجاد الرقم المفقود 3 من 1 إلى 6"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-8"
},

  "world-10-level-8": {
    "id": "world-10-level-8",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 8,
    "title": "⚖️ فاحص توازن الأقواس البسيط (Balanced Parentheses Counter)",
    "englishTitle": "Simple Balanced Parentheses Counter",
    "subtitle": "التحقق من صحة هياكل التعبير البرمجي ومطابقة الأقواس",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 225,
    "skills": [
        "problem_solving",
        "strings",
        "stack_concept"
    ],
    "story": "لديك تعبير يحتوي أقواساً expr = '(()())'. افحص ما إذا كانت الأقواس متوازنة باستخدام عداد يبدأ بـ 0: يزداد بمقدار 1 عند القوس المفتوح '(' وينقص بمقدار 1 عند القوس المغلق ')'. وإذا لم ينزل العداد تحت الصفر وانتهى بـ 0 تكون متوازنة. اطبع: 'Balanced: True'.",
    "microLesson": {
        "concept": "محاكاة المكدس بعداد الأقواس",
        "summary": "لتكون الأقواس متوازنة يجب ألا يغلق قوس قبل أن يفتح (العداد لا يصبح سالباً أبداً) ويجب إغلاق جميع الأقواس في النهاية (العداد = 0).",
        "exampleCode": "bal = 0\nfor ch in s:\n    if ch == '(': bal += 1\n    elif ch == ')': bal -= 1\n    if bal < 0: break"
    },
    "starterCode": "expr = '(()())'\n\n# افحص توازن الأقواس واطبع: Balanced: True\n",
    "requirements": [
        "تتبع العداد لكل قوس وتأكد من توازنه",
        "اطبع النتيجة بصيغة: Balanced: True"
    ],
    "expectedOutput": "Balanced: True",
    "hints": [
        "فكرة الحل: ابدأ بـ count = 0، وزد 1 لكل '(' وانقص 1 لكل ')'.",
        "في النهاية افحص if count == 0 واطبع Balanced: True."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Balanced: True",
            "description": "فحص توازن أقواس (()())"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-9"
},

  "world-10-level-9": {
    "id": "world-10-level-9",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 9,
    "title": "📈 حساب وسيط الأرقام الإحصائي (Median Calculation)",
    "englishTitle": "Statistical Median Value Finder",
    "subtitle": "الترتيب واستخراج نقطة المنتصف الإحصائية",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 220,
    "skills": [
        "problem_solving",
        "statistics",
        "sorting"
    ],
    "story": "لديك قائمة قراءات غير مرتبة data = [7, 1, 9, 3, 5]. رتب القائمة تصاعدياً [1, 3, 5, 7, 9] واستخرج القيمة الوسطى (الوسيط Median وهو العنصر الذي يقع في المنتصف تماماً index = len // 2). اطبع الناتج بصيغة: 'Median: 5'.",
    "microLesson": {
        "concept": "حساب الوسيط الإحصائي (Median)",
        "summary": "لحساب الوسيط، يجب أولاً ترتيب القائمة ترتيباً تصاعدياً، ثم أخذ العنصر في المنتصف للقوائم فردية الطول.",
        "exampleCode": "s = sorted(items)\nmid = s[len(s) // 2]"
    },
    "starterCode": "data = [7, 1, 9, 3, 5]\n\n# رتب واستخرج الوسيط واطبع: Median: 5\n",
    "requirements": [
        "رتب القائمة واستخرج العنصر الأوسط",
        "اطبع بصيغة دقيقة: Median: 5"
    ],
    "expectedOutput": "Median: 5",
    "hints": [
        "فكرة الحل: استخدم sorted(data) ثم خذ العنصر عند الفهرس len(data) // 2.",
        "اطبع الناتج بجوار كلمة Median:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Median: 5",
            "description": "استخراج وسيط [7, 1, 9, 3, 5]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-10"
},

  "world-10-level-10": {
    "id": "world-10-level-10",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 10,
    "title": "🔐 تشفير قيصر التتابعي البسيط (Caesar Cipher Shift)",
    "englishTitle": "Caesar Cipher Character Shift",
    "subtitle": "التحويل بين المحارف وقيم الأسكي بالدالتين ord و chr",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 230,
    "skills": [
        "problem_solving",
        "cryptography",
        "ord_chr"
    ],
    "story": "شفر النص msg = 'ABC' بإزاحة كل حرف بمقدار 3 خانات في الأبجدية الإنجليزية باستخدام الدالتين ord() و chr() (حيث تصبح 'A' -> 'D' و 'B' -> 'E' و 'C' -> 'F'). اطبع الناتج المشفر بصيغة: 'Encrypted: DEF'.",
    "microLesson": {
        "concept": "التحويل بين الأحرف وقيم ASCII",
        "summary": "الدالة ord('A') ترجع القيمة العددية للحرف (65)، وبإضافة الإزاحة ثم استخدام chr() نحصل على الحرف المشفر المقابل.",
        "exampleCode": "shifted_char = chr(ord(ch) + shift)"
    },
    "starterCode": "msg = 'ABC'\nshift = 3\n\n# شفر الرسالة واطبع: Encrypted: DEF\n",
    "requirements": [
        "أزح كل حرف بمقدار 3 خانات",
        "اطبع بصيغة: Encrypted: DEF"
    ],
    "expectedOutput": "Encrypted: DEF",
    "hints": [
        "فكرة الحل: مر بحلقة على حروف msg واستخدم chr(ord(c) + shift) لكل حرف.",
        "اجمع الحروف واطبعها بجوار Encrypted:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Encrypted: DEF",
            "description": "تشفير ABC بإزاحة 3 ليصبح DEF"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-10-level-11"
},

  "world-10-level-11": {
    "id": "world-10-level-11",
    "worldId": "world-10",
    "worldTitle": "ميدان حل المشكلات والتفكير الخوارزمي",
    "levelNumber": 11,
    "title": "👑 زعيم الميدان: محاكي الصراف الآلي وتفكيك الفئات النقدية (ATM Dispenser)",
    "englishTitle": "Grand Boss: Greedy ATM Currency Dispenser",
    "subtitle": "الخوارزميات الطماعة Greedy Algorithms وتفكيك المبالغ لأقل أوراق",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 260,
    "skills": [
        "problem_solving",
        "greedy",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: عميل يسحب مبلغ amount = 780 جنيهاً من الصراف الآلي. الفئات المتاحة هي [200, 100, 50, 20, 10]. لحساب أقل عدد ورقات نقدية ممكنة (الخوارزمية الطماعة Greedy): 3 ورقات فئة 200 (=600)، ثم 1 فئة 100 (=100)، ثم 1 فئة 50 (=50)، ثم 1 فئة 20 (=20)، ثم 1 فئة 10 (=10). إجمالي عدد الأوراق المصروفة هو 7 ورقات. اطبع الناتج بصيغة: 'Total Notes: 7'.",
    "microLesson": {
        "concept": "الخوارزميات الطماعة (Greedy Currency Breakdown)",
        "summary": "لتقليل عدد الأوراق نأخذ أكبر عدد ممكن من أعلى فئة نقدية أولاً بالقسمة الصحيحة // ثم نأخذ الباقي بالمعامل % للفئات التالية.",
        "exampleCode": "for note in notes:\n    count += amount // note\n    amount %= note"
    },
    "starterCode": "amount = 780\ndenominations = [200, 100, 50, 20, 10]\n\n# احسب إجمالي عدد الأوراق النقدية واطبع: Total Notes: 7\n",
    "requirements": [
        "فكك المبلغ لأقل عدد ورقات ممكن باستخدام القسمة الصحيحة وباقي القسمة",
        "اطبع بصيغة دقيقة: Total Notes: 7"
    ],
    "expectedOutput": "Total Notes: 7",
    "hints": [
        "فكرة الحل: ابدأ بـ total_notes = 0، وفي كل فئة أضف amount // d ثم حدث amount = amount % d.",
        "اطبع الناتج النهائي بجوار Total Notes:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Total Notes: 7",
            "description": "صرف 780 جنيهاً بأقل عدد ورقات"
        }
    ],
    "unlocksWorldId": "world-11",
    "nextChallengeId": "world-11-level-1"
},

  "world-11-level-1": {
    "id": "world-11-level-1",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 1,
    "title": "🎯 مسألة الجمع الثنائي الشهيرة لمقابلات العمل (Two Sum Target)",
    "englishTitle": "Two Sum Target Pair Problem",
    "subtitle": "المسألة البرمجية الأشهر عالمياً في اختبارات التوظيف",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 210,
    "skills": [
        "interview_prep",
        "two_sum",
        "algorithms"
    ],
    "story": "أشهر مسألة في مقابلات شركات التكنولوجيا: لديك قائمة أرقام nums = [2, 7, 11, 15] وهدف target = 9. ابحث عن الرقمين اللذين مجموعهما يساوي الهدف (هما 2 و 7). اطبع النتيجة بصيغة: 'Pair: 2 + 7 = 9'.",
    "microLesson": {
        "concept": "مسألة Two Sum والبحث عن المكمل (Complement)",
        "summary": "لكل رقم x، نبحث عما إذا كان المكمل (target - x) موجوداً في القائمة أو تم تخزينه في الذاكرة.",
        "exampleCode": "seen = set()\nfor x in arr:\n    diff = target - x\n    if diff in seen:\n        # found pair!\n    seen.add(x)"
    },
    "starterCode": "nums = [2, 7, 11, 15]\ntarget = 9\n\n# ابحث عن الرقمين واطبع: Pair: 2 + 7 = 9\n",
    "requirements": [
        "ابحث عن الرقمين اللذين يحققان الجمع",
        "اطبع بصيغة: Pair: 2 + 7 = 9"
    ],
    "expectedOutput": "Pair: 2 + 7 = 9",
    "hints": [
        "فكرة الحل: مر بحلقة ثنائية أو استخدم مكمل الجمع target - num.",
        "اطبع الصيغة المطلوبة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Pair: 2 + 7 = 9",
            "description": "إيجاد الزوج 2 و 7 لمجموع 9"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-2"
},

  "world-11-level-2": {
    "id": "world-11-level-2",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 2,
    "title": "↔️ خوارزمية المؤشرين المتعاكسين (Two Pointers In-Place)",
    "englishTitle": "Two Pointers Array Reversal Algorithm",
    "subtitle": "التحكم في المؤشرات بكفاءة الذاكرة الصفرية O(1) Space",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 215,
    "skills": [
        "interview_prep",
        "two_pointers",
        "arrays"
    ],
    "story": "لديك قائمة حروف arr = ['p', 'y', 't', 'h', 'o', 'n']. اعكس ترتيب القائمة يدوياً باستخدام أسلوب المؤشرين: مؤشر في البداية left ومؤشر في النهاية right وتبديل القيم والتحرك نحو الداخل. اطبع القائمة المعكوسة بصيغة: \"Reversed: ['n', 'o', 'h', 't', 'y', 'p']\".",
    "microLesson": {
        "concept": "تقنية المؤشرين (Two Pointers Pattern)",
        "summary": "تقنية برمجية قياسية لتحريك مؤشرين من طرفي المصفوفة والتبديل المباشر حتى يلتقيا في المنتصف.",
        "exampleCode": "l, r = 0, len(a) - 1\nwhile l < r:\n    a[l], a[r] = a[r], a[l]\n    l += 1\n    r -= 1"
    },
    "starterCode": "arr = ['p', 'y', 't', 'h', 'o', 'n']\n\n# اعكس القائمة بأسلوب المؤشرين واطبع النتيجة المطلوبة\n",
    "requirements": [
        "اعكس القائمة واطبعها مطابقة",
        "اطبع الناتج: Reversed: ['n', 'o', 'h', 't', 'y', 'p']"
    ],
    "expectedOutput": "Reversed: ['n', 'o', 'h', 't', 'y', 'p']",
    "hints": [
        "فكرة الحل: طبق حلقة while l < r مع تبديل arr[l], arr[r] = arr[r], arr[l].",
        "اطبع القائمة بعد العكس مسبوقة بـ Reversed: ."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Reversed: ['n', 'o', 'h', 't', 'y', 'p']",
            "description": "عكس حروف python بالمؤشرين"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-3"
},

  "world-11-level-3": {
    "id": "world-11-level-3",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 3,
    "title": "⚡ إزاحة الأصفار إلى نهاية المصفوفة (Move Zeroes to End)",
    "englishTitle": "Move Zeroes to End of Array",
    "subtitle": "إعادة ترتيب البيانات مع الحفاظ على الترتيب النسبي للعناصر",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 215,
    "skills": [
        "interview_prep",
        "arrays",
        "filtering"
    ],
    "story": "سؤال مقابلات شائع: لديك قائمة nums = [0, 1, 0, 3, 12]. انقل جميع الأصفار إلى نهاية القائمة مع الحفاظ على الترتيب النسبي للأرقام غير الصفرية. اطبع القائمة بصيغة: 'Moved: [1, 3, 12, 0, 0]'.",
    "microLesson": {
        "concept": "تجميع العناصر غير الصفرية ثم إكمال الأصفار",
        "summary": "يمكن استخراج الأرقام غير الصفرية في قائمة أولاً، ثم إضافة الأصفار بالعدد المتبقي لنهاية القائمة.",
        "exampleCode": "non_zeros = [x for x in a if x != 0]\nzeros = [0] * (len(a) - len(non_zeros))\nresult = non_zeros + zeros"
    },
    "starterCode": "nums = [0, 1, 0, 3, 12]\n\n# انقل الأصفار للنهاية واطبع: Moved: [1, 3, 12, 0, 0]\n",
    "requirements": [
        "ضع الأرقام غير الصفرية أولاً ثم الأصفار في النهاية",
        "اطبع بصيغة: Moved: [1, 3, 12, 0, 0]"
    ],
    "expectedOutput": "Moved: [1, 3, 12, 0, 0]",
    "hints": [
        "فكرة الحل: اجمع العناصر التي لا تساوي 0، ثم أضف إليها قائمة بالأصفار المتبقية.",
        "اطبع القائمة الناتجة بجوار Moved:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Moved: [1, 3, 12, 0, 0]",
            "description": "إزاحة أصفار [0, 1, 0, 3, 12]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-4"
},

  "world-11-level-4": {
    "id": "world-11-level-4",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 4,
    "title": "🔤 فاحص الجناس الناقص والكلمات المتطابقة (Valid Anagram)",
    "englishTitle": "Valid Anagram String Verifier",
    "subtitle": "المطابقة التكرارية للحروف وهياكل التكرار",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 220,
    "skills": [
        "interview_prep",
        "anagram",
        "strings"
    ],
    "story": "تعتبر كلمتان جناساً ناقصاً (Anagram) إذا كانت الكلمة الثانية تتكون من نفس حروف الكلمة الأولى تماماً بنفس عدد التكرار ولكن بترتيب مختلف. افحص هل s1 = 'listen' و s2 = 'silent' هما Anagram. اطبع: 'Anagram: True'.",
    "microLesson": {
        "concept": "التحقق من الجناس بترتيب الحروف أو عدادات التكرار",
        "summary": "إذا تساوى sorted(s1) مع sorted(s2) وكان الطول متطابقاً، فإن الكلمتين جناس كامل Anagram.",
        "exampleCode": "is_ana = (sorted(w1) == sorted(w2))"
    },
    "starterCode": "s1 = 'listen'\ns2 = 'silent'\n\n# افحص هل الكلمتان Anagram واطبع: Anagram: True\n",
    "requirements": [
        "قارن بين الحروف وترتيبها",
        "اطبع بصيغة: Anagram: True"
    ],
    "expectedOutput": "Anagram: True",
    "hints": [
        "فكرة الحل: استخدم sorted(s1) == sorted(s2) للحصول على القيمة المنطقية.",
        "اطبع النتيجة بالصيغة المطلوبة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Anagram: True",
            "description": "فحص جناس listen و silent"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-5"
},

  "world-11-level-5": {
    "id": "world-11-level-5",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 5,
    "title": "🥇 أول حرف فريد غير مكرر في النص (First Non-Repeating Character)",
    "englishTitle": "First Unique Character in String",
    "subtitle": "دمج الفهرسة وقواميس التكرار في المقابلات",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 225,
    "skills": [
        "interview_prep",
        "strings",
        "frequency"
    ],
    "story": "لديك نص s = 'swiss'. ابحث عن أول حرف في النص يظهر لمرة واحدة فقط دون أن يتكرر في أي مكان آخر (الحرف s يتكرر 3 مرات، والحرف w يظهر مرة واحدة وهو يسبق الحرف i). اطبع الحرف بصيغة: 'First Unique: w'.",
    "microLesson": {
        "concept": "البحث عن العنصر الفريد الترتيبي",
        "summary": "نحسب تكرار كل حرف أولاً، ثم نمر على النص من البداية ونختار أول حرف تكراره يساوي 1.",
        "exampleCode": "for ch in text:\n    if text.count(ch) == 1:\n        return ch"
    },
    "starterCode": "s = 'swiss'\n\n# ابحث عن أول حرف غير مكرر واطبع: First Unique: w\n",
    "requirements": [
        "حدد أول حرف تكراره 1 في النص",
        "اطبع بصيغة: First Unique: w"
    ],
    "expectedOutput": "First Unique: w",
    "hints": [
        "فكرة الحل: مر بحلقة على حروف s، وافحص if s.count(ch) == 1 ثم اطبعه واخرج بـ break.",
        "اطبع الناتج بجوار First Unique:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "First Unique: w",
            "description": "أول حرف فريد في swiss"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-6"
},

  "world-11-level-6": {
    "id": "world-11-level-6",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 6,
    "title": "🔗 دمج مصفوفتين مرتبتين في مصفوفة واحدة (Merge Sorted Arrays)",
    "englishTitle": "Merge Two Sorted Lists",
    "subtitle": "الخوارزمية الكلاسيكية المعتمدة في فرز الدمج Merge Sort",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 220,
    "skills": [
        "interview_prep",
        "merge",
        "arrays"
    ],
    "story": "لديك مصفوفتان مرتبتان مسبقاً: l1 = [1, 3, 5] و l2 = [2, 4, 6]. ادمجهما لإنتاج مصفوفة واحدة مدمجة ومرتبة بالكامل. اطبع النتيجة بصيغة: 'Merged: [1, 2, 3, 4, 5, 6]'.",
    "microLesson": {
        "concept": "دمج المصفوفات المرتبة",
        "summary": "يمكن دمج المصفوفتين ثم ترتيب الناتج بواسطة sorted(l1 + l2) أو بمقارنة الرؤوس.",
        "exampleCode": "merged = sorted(a + b)"
    },
    "starterCode": "l1 = [1, 3, 5]\nl2 = [2, 4, 6]\n\n# ادمج المصفوفتين واطبع: Merged: [1, 2, 3, 4, 5, 6]\n",
    "requirements": [
        "ادمج عناصر القائمتين مع الترتيب الصحيح",
        "اطبع القائمة بصيغة: Merged: [1, 2, 3, 4, 5, 6]"
    ],
    "expectedOutput": "Merged: [1, 2, 3, 4, 5, 6]",
    "hints": [
        "فكرة الحل: استخدم sorted(l1 + l2).",
        "اطبع القائمة المدمجة مسبوقة بـ Merged: ."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Merged: [1, 2, 3, 4, 5, 6]",
            "description": "دمج [1, 3, 5] مع [2, 4, 6]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-7"
},

  "world-11-level-7": {
    "id": "world-11-level-7",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 7,
    "title": "🪟 خوارزمية النافذة المنزلقة لأكبر مجموع (Sliding Window)",
    "englishTitle": "Maximum Sum Subarray of Size K",
    "subtitle": "تقنية النافذة المنزلقة المتقدمة Sliding Window Pattern",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 235,
    "skills": [
        "interview_prep",
        "sliding_window",
        "algorithms"
    ],
    "story": "لديك قائمة أرقام arr = [2, 1, 5, 1, 3, 2] وحجم نافذة k = 3. احسب أكبر مجموع لأي 3 عناصر متتالية (النافذة [5, 1, 3] تعطي أعلى مجموع = 9). اطبع النتيجة بصيغة: 'Max Window Sum: 9'.",
    "microLesson": {
        "concept": "تقنية النافذة المنزلقة (Sliding Window)",
        "summary": "بدلاً من إعادة جمع كل نافذة من الصفر، نحسب مجموع أول k عناصر ثم نطرح العنصر الخارج ونضيف العنصر الداخل في كل خطوة.",
        "exampleCode": "w_sum = sum(arr[:k])\nmax_s = w_sum\nfor i in range(k, len(arr)):\n    w_sum += arr[i] - arr[i - k]\n    max_s = max(max_s, w_sum)"
    },
    "starterCode": "arr = [2, 1, 5, 1, 3, 2]\nk = 3\n\n# احسب أكبر مجموع لنافذة من 3 عناصر واطبع: Max Window Sum: 9\n",
    "requirements": [
        "احسب أعلى مجموع لثلاثة عناصر متتالية",
        "اطبع بصيغة: Max Window Sum: 9"
    ],
    "expectedOutput": "Max Window Sum: 9",
    "hints": [
        "فكرة الحل: مر بحلقة من 0 إلى len(arr) - k + 1 وافحص مجموع كل نافذة sum(arr[i:i+k]).",
        "تتبع القيمة العظمى واطبعها بجوار Max Window Sum:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Max Window Sum: 9",
            "description": "أعلى نافذة ثلاثية في [2, 1, 5, 1, 3, 2]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-8"
},

  "world-11-level-8": {
    "id": "world-11-level-8",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 8,
    "title": "👑 عنصر الأغلبية الأكثر تكراراً (Majority Element)",
    "englishTitle": "Majority Element Finder",
    "subtitle": "خوارزمية تصويت بوير-مور Boyer-Moore Voting",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 225,
    "skills": [
        "interview_prep",
        "majority",
        "algorithms"
    ],
    "story": "عنصر الأغلبية في المصفوفة هو العنصر الذي يظهر أكثر من نصف مرات طول المصفوفة (> n // 2). في القائمة nums = [3, 2, 3, 1, 3, 3, 2] بطول 7، العنصر 3 يتكرر 4 مرات. أوجد هذا العنصر واطبعه بصيغة: 'Majority: 3'.",
    "microLesson": {
        "concept": "عنصر الأغلبية (Majority Element)",
        "summary": "يمكن إيجاده إما بحساب التكرارات، أو بملاحظة أنه إذا رتبنا المصفوفة سيكون عنصر الأغلبية دائماً في المنتصف nums[n // 2].",
        "exampleCode": "nums.sort()\nmajority = nums[len(nums) // 2]"
    },
    "starterCode": "nums = [3, 2, 3, 1, 3, 3, 2]\n\n# أوجد عنصر الأغلبية واطبع: Majority: 3\n",
    "requirements": [
        "استخرج العنصر الأكثر تكراراً المتجاوز للنصف",
        "اطبع بصيغة: Majority: 3"
    ],
    "expectedOutput": "Majority: 3",
    "hints": [
        "فكرة الحل: رتب القائمة sorted(nums) ثم خذ العنصر في المنتصف len(nums) // 2.",
        "اطبع الناتج مسبوقاً بـ Majority: ."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Majority: 3",
            "description": "إيجاد عنصر الأغلبية 3"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-9"
},

  "world-11-level-9": {
    "id": "world-11-level-9",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 9,
    "title": "🗜️ ضغط السلاسل النصية التكراري (Run-Length Compression)",
    "englishTitle": "String Run-Length Compression",
    "subtitle": "خوارزميات الضغط البسيطة ومعالجة السلاسل",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 235,
    "skills": [
        "interview_prep",
        "compression",
        "strings"
    ],
    "story": "سؤال مقابلات شهير: لديك نص متكرر s = 'aaabbc'. قم بضغطه باستبدال كل مجموعة أحرف متتالية بالحرف متبوعاً بعدد تكراره المتتالي ('a3b2c1'). اطبع الناتج بصيغة: 'Compressed: a3b2c1'.",
    "microLesson": {
        "concept": "ضغط الأطوال المتكررة (Run-Length Encoding)",
        "summary": "نمر على حروف النص ونحتفظ بعداد للحرف الحالي، وعند تغير الحرف نلحق الحرف وعدد تكراره بالناتج ثم نعيد تصفير العداد للحرف الجديد.",
        "exampleCode": "# فكرة تتبع التكرارات المتتالية بحلقة وفحص التالي"
    },
    "starterCode": "s = 'aaabbc'\n\n# اضغط النص واطبع: Compressed: a3b2c1\n",
    "requirements": [
        "احسب التكرار المتتالي لكل حرف",
        "اطبع بصيغة: Compressed: a3b2c1"
    ],
    "expectedOutput": "Compressed: a3b2c1",
    "hints": [
        "فكرة الحل: مر بحلقة لتجميع الأحرف وعدد تكرار كل حرف متتالٍ.",
        "اطبع النتيجة بجوار Compressed:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Compressed: a3b2c1",
            "description": "ضغط aaabbc إلى a3b2c1"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-10"
},

  "world-11-level-10": {
    "id": "world-11-level-10",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 10,
    "title": "🏃‍♂️ محاكي لعبة قفزات المصفوفة (Jump Game Reachability)",
    "englishTitle": "Jump Game Reachability Verifier",
    "subtitle": "المسائل الاستدلالية وخوارزميات الوصول للمدى الأقصى",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 240,
    "skills": [
        "interview_prep",
        "greedy",
        "reachability"
    ],
    "story": "لديك مصفوفة قفزات jumps = [2, 3, 1, 1, 4] حيث يمثل كل رقم أقصى عدد خطوات يمكنك قفزها من ذلك الموقع. ابدأ من الفهرس 0، هل يمكن الوصول إلى الفهرس الأخير؟ مع القيم المعطاة يمكن الوصول بنجاح. اطبع النتيجة بصيغة: 'Can Reach: True'.",
    "microLesson": {
        "concept": "تتبع أقصى مدى وصول (Max Reachable Index)",
        "summary": "في كل خطوة نحتفظ بأقصى فهرس يمكن الوصول إليه max_reach = max(max_reach, i + jumps[i]). إذا تجاوزنا الهدف أو وصلناه تكون النتيجة True.",
        "exampleCode": "reach = 0\nfor i, j in enumerate(arr):\n    if i > reach: break\n    reach = max(reach, i + j)"
    },
    "starterCode": "jumps = [2, 3, 1, 1, 4]\n\n# افحص إمكانية الوصول واطبع: Can Reach: True\n",
    "requirements": [
        "تتبع مدى الوصول وتأكد من إمكانية الوصول للنهاية",
        "اطبع: Can Reach: True"
    ],
    "expectedOutput": "Can Reach: True",
    "hints": [
        "فكرة الحل: تتبع أقصى فهرس يمكنك بلوغه، وافحص ما إذا كان >= len(jumps) - 1.",
        "اطبع النتيجة المطلوبة."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Can Reach: True",
            "description": "التحقق من إمكانية الوصول في [2, 3, 1, 1, 4]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-11-level-11"
},

  "world-11-level-11": {
    "id": "world-11-level-11",
    "worldId": "world-11",
    "worldTitle": "مختبر المقابلات التقنية وأسئلة التوظيف",
    "levelNumber": 11,
    "title": "👑 زعيم المقابلات التقنية: محاكي ذاكرة الكاش الذكية LRU (LRU Cache Simulator)",
    "englishTitle": "Grand Boss: LRU Cache Mechanism Simulator",
    "subtitle": "المسألة الذهبية في اختبارات عمالقة التكنولوجيا FAANG",
    "difficulty": "hard",
    "type": "boss",
    "baseXp": 270,
    "skills": [
        "interview_prep",
        "lru_cache",
        "boss_challenge"
    ],
    "story": "تحدي الزعيم: محاكاة ذاكرة تخزين مؤقت Least Recently Used (LRU) بسعة capacity = 3 عناصر. أدخلنا العناصر بالترتيب: ['A', 'B', 'C']. عند استخدام العنصر 'A' ينتقل لنهاية القائمة ليصبح الأحدث استخداماً: ['B', 'C', 'A']. ثم عند إضافة عنصر جديد 'D'، تُحذف القيمة الأقدم استخداماً من البداية ('B') ليحل محلها الجديد وتصبح الذاكرة: ['C', 'A', 'D']. اطبع حالة الذاكرة النهائية بصيغة: \"Cache: ['C', 'A', 'D']\".",
    "microLesson": {
        "concept": "خوارزمية الإحلال بالأقدم استخداماً (LRU Cache)",
        "summary": "عند الوصول لأي عنصر نرفعه إلى نهاية القائمة (أحدث استخدام). وعند امتلاء السعة نحذف العنصر الأول (الفهرس 0 وهو الأقدم).",
        "exampleCode": "# فكرة نقل العنصر المستخدم للنهاية وحذف الأول عند الامتلاء"
    },
    "starterCode": "capacity = 3\n# قم بمحاكاة العمليات واطبع الناتج النهائي للذاكرة: Cache: ['C', 'A', 'D']\n",
    "requirements": [
        "نفذ خطوات تحديث ذاكرة LRU بدقة",
        "اطبع القائمة بصيغة: Cache: ['C', 'A', 'D']"
    ],
    "expectedOutput": "Cache: ['C', 'A', 'D']",
    "hints": [
        "فكرة الحل: ابدأ بـ cache = ['A', 'B', 'C']، ثم cache.remove('A'); cache.append('A')، ثم cache.pop(0); cache.append('D').",
        "اطبع الناتج بجوار كلمة Cache:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Cache: ['C', 'A', 'D']",
            "description": "محاكاة ذاكرة LRU بسعة 3"
        }
    ],
    "unlocksWorldId": "world-12",
    "nextChallengeId": "world-12-level-1"
},

  "world-12-level-1": {
    "id": "world-12-level-1",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 1,
    "title": "⚡ خوارزمية كادان لأكبر مجموع مصفوفة فرعية متصلة (Kadane's Algorithm)",
    "englishTitle": "Kadane's Algorithm for Maximum Subarray",
    "subtitle": "البرمجة الديناميكية الخطية بكفاءة O(N) الزمنية",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 230,
    "skills": [
        "competitive",
        "kadane",
        "dynamic_programming"
    ],
    "story": "تحدي البرمجة التنافسية: لديك مصفوفة أرقام ومعاملات arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]. طبق خوارزمية كادان لإيجاد أكبر مجموع ممكن لمصفوفة فرعية متصلة (المصفوفة الفرعية [4, -1, 2, 1] تعطي المجموع الأقصى 6). اطبع النتيجة بصيغة: 'Max Subarray Sum: 6'.",
    "microLesson": {
        "concept": "خوارزمية كادان (Kadane's Algorithm)",
        "summary": "في كل خطوة نقرر: هل نضيف العنصر الحالي للمجموع التراكمي السابق، أم نبدأ مصفوفة فرعية جديدة من العنصر الحالي max(x, cur_sum + x).",
        "exampleCode": "cur = max_s = arr[0]\nfor x in arr[1:]:\n    cur = max(x, cur + x)\n    max_s = max(max_s, cur)"
    },
    "starterCode": "arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\n\n# طبق خوارزمية كادان واطبع: Max Subarray Sum: 6\n",
    "requirements": [
        "احسب أكبر مجموع لمصفوفة فرعية متصلة",
        "اطبع بصيغة: Max Subarray Sum: 6"
    ],
    "expectedOutput": "Max Subarray Sum: 6",
    "hints": [
        "فكرة الحل: طبق منطق كادان: cur = max(x, cur + x) وتتبع max_sum.",
        "اطبع الناتج مسبوقاً بـ Max Subarray Sum:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Max Subarray Sum: 6",
            "description": "أكبر مجموع مصفوفة فرعية في مصفوفة كادان"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-2"
},

  "world-12-level-2": {
    "id": "world-12-level-2",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 2,
    "title": "🎯 خوارزمية البحث الثنائي الدقيق O(log N) (Binary Search)",
    "englishTitle": "Precise Binary Search with Step Counting",
    "subtitle": "تقسيم مجال البحث لوغاريتمياً بكفاءة عالية",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 235,
    "skills": [
        "competitive",
        "binary_search",
        "complexity"
    ],
    "story": "ابحث عن العنصر target = 23 في القائمة المرتبة arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] باستخدام خوارزمية البحث الثنائي. تتبع موقع الفهرس وعدد خطوات المقارنة. في الخطوة الأولى المنتصف 16، وفي الثانية المنتصف 56، ثم نصل لـ 23 في الفهرس 5. اطبع: 'Index: 5, Comparisons: 2'.",
    "microLesson": {
        "concept": "البحث الثنائي (Binary Search)",
        "summary": "نحدد مؤشري low و high، ونفحص المنتصف mid = (low + high) // 2. إذا كان الهدف أكبر نتحرك لليمين وإلا لليسار مقلصين المجال للنصف في كل خطوة.",
        "exampleCode": "low, high = 0, len(a) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    if a[mid] == target: break\n    elif a[mid] < target: low = mid + 1\n    else: high = mid - 1"
    },
    "starterCode": "arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\ntarget = 23\n\n# ابحث ثنائياً واطبع: Index: 5, Comparisons: 2\n",
    "requirements": [
        "حدد موقع الهدف وعدد خطوات المقارنة",
        "اطبع بصيغة: Index: 5, Comparisons: 2"
    ],
    "expectedOutput": "Index: 5, Comparisons: 2",
    "hints": [
        "فكرة الحل: استخدم عداداً للمقارنات داخل حلقة البحث الثنائي.",
        "اطبع الناتج المطلوب تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Index: 5, Comparisons: 2",
            "description": "البحث الثنائي عن 23"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-3"
},

  "world-12-level-3": {
    "id": "world-12-level-3",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 3,
    "title": "📅 دمج الفترات الزمنية المتداخلة (Merge Overlapping Intervals)",
    "englishTitle": "Merge Overlapping Time Intervals",
    "subtitle": "إدارة الجداول الزمنية والفرز المسبق للفترات",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 240,
    "skills": [
        "competitive",
        "intervals",
        "sorting"
    ],
    "story": "لديك فترات زمنية: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]. قم بدمج أي فترتين متداخلتين (الفترتان [1, 3] و [2, 6] تتداخلان فتندمجان في [1, 6]). اطبع القائمة المدمجة بصيغة: 'Merged Intervals: [[1, 6], [8, 10], [15, 18]]'.",
    "microLesson": {
        "concept": "دمج الفترات المتداخلة (Interval Merging)",
        "summary": "نرتب الفترات حسب البداية، ثم نقارن بداية الفترة الحالية مع نهاية الفترة السابقة. إذا كانت أصغر أو تساويها ندمجهما بتوسيع النهاية max(end1, end2).",
        "exampleCode": "# فكرة مقارنة بداية الفترة الحالية مع نهاية السابقة"
    },
    "starterCode": "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]\n\n# ادمج الفترات المتداخلة واطبع الناتج المطلوب\n",
    "requirements": [
        "ادمج الفترات المتداخلة بالترتيب",
        "اطبع بصيغة: Merged Intervals: [[1, 6], [8, 10], [15, 18]]"
    ],
    "expectedOutput": "Merged Intervals: [[1, 6], [8, 10], [15, 18]]",
    "hints": [
        "فكرة الحل: الفترتان [1, 3] و [2, 6] تندمجان في [1, 6]، وباقي الفترات منفصلة.",
        "اطبع الناتج بجوار Merged Intervals:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Merged Intervals: [[1, 6], [8, 10], [15, 18]]",
            "description": "دمج الفترات المتداخلة"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-4"
},

  "world-12-level-4": {
    "id": "world-12-level-4",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 4,
    "title": "🔢 أطول متتالية أرقام متتالية في مصفوفة غير مرتبة (Longest Consecutive)",
    "englishTitle": "Longest Consecutive Sequence in O(N)",
    "subtitle": "البحث الذكي بالمجموعات Sets بدون ترتيب كامل",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 245,
    "skills": [
        "competitive",
        "sets",
        "consecutive"
    ],
    "story": "لديك مصفوفة أرقام غير مرتبة nums = [100, 4, 200, 1, 3, 2]. أوجد طول أطول متتالية من الأعداد الصحيحة المتتالية (المتتالية 1, 2, 3, 4 طولها 4). اطبع النتيجة بصيغة: 'Longest Sequence: 4'.",
    "microLesson": {
        "concept": "استخدام المجموعات Sets لاكتشاف المتتاليات في O(N)",
        "summary": "نحول الأرقام إلى Set. الرقم يكون بداية متتالية إذا لم يكن (num - 1) موجوداً في المجموعة، ثم نعد الأرقام المتتالية التالية له.",
        "exampleCode": "num_set = set(nums)\nfor x in num_set:\n    if x - 1 not in num_set:\n        # x is start of a sequence!"
    },
    "starterCode": "nums = [100, 4, 200, 1, 3, 2]\n\n# أوجد طول أطول متتالية متتالية واطبع: Longest Sequence: 4\n",
    "requirements": [
        "حدد أطول تتابع للأرقام الصحيحة",
        "اطبع بصيغة: Longest Sequence: 4"
    ],
    "expectedOutput": "Longest Sequence: 4",
    "hints": [
        "فكرة الحل: الأرقام 1, 2, 3, 4 متتالية وتشكل تتابعاً بطول 4.",
        "اطبع النتيجة بجوار Longest Sequence:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Longest Sequence: 4",
            "description": "أطول متتالية متتالية في [100, 4, 200, 1, 3, 2]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-5"
},

  "world-12-level-5": {
    "id": "world-12-level-5",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 5,
    "title": "🌧️ مسألة سعة تخزين مياه الأمطار بين الأعمدة (Trapping Rain Water)",
    "englishTitle": "Trapping Rain Water Simulation",
    "subtitle": "المسألة الهندسية التنافسية الشهيرة لحساب المساحات المحتجزة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 250,
    "skills": [
        "competitive",
        "trapping_water",
        "geometry"
    ],
    "story": "لديك مصفوفة ارتفاعات تضاريس heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]. احسب كمية مياه الأمطار المحتجزة بين الأعمدة بعد هطول المطر (كمية الماء فوق كل عمود هي min(max_left, max_right) - height). إجمالي الماء المحتجز لهذه التضاريس هو 6 وحدات. اطبع: 'Trapped Water: 6 units'.",
    "microLesson": {
        "concept": "حساب كمية المياه المحتجزة (Trapping Rain Water)",
        "summary": "ارتفاع الماء المحتجز عند أي نقطة يحدده العمود الأقصر بين أطول عمود على يساره وأطول عمود على يمينه.",
        "exampleCode": "# فكرة حساب أقصى ارتفاع يساراً ويميناً لكل نقطة"
    },
    "starterCode": "heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]\n\n# احسب كمية المياه المحتجزة واطبع: Trapped Water: 6 units\n",
    "requirements": [
        "احسب كمية المياه المحتجزة بدقة",
        "اطبع بصيغة: Trapped Water: 6 units"
    ],
    "expectedOutput": "Trapped Water: 6 units",
    "hints": [
        "فكرة الحل: كمية الماء الإجمالية المحتجزة بين هذه الأعمدة هي 6 وحدات بالضبط.",
        "اطبع الناتج بجوار Trapped Water: مع كتابة units."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Trapped Water: 6 units",
            "description": "حساب الماء المحتجز لتضاريس heights"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-6"
},

  "world-12-level-6": {
    "id": "world-12-level-6",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 6,
    "title": "🏛️ تحويل الأرقام الرومانية إلى أرقام صحيحة (Roman to Integer)",
    "englishTitle": "Roman Numeral to Integer Parser",
    "subtitle": "معالجة الحالات الاستثنائية والرموز الطرحية في الأرقام القديمة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 240,
    "skills": [
        "competitive",
        "roman_numerals",
        "parsing"
    ],
    "story": "حول الرمز الروماني roman = 'MCMXCIV' إلى عدد صحيح (حيث M=1000 و CM=900 و XC=90 و IV=4، المجموع = 1994). اطبع النتيجة بصيغة: 'Integer Value: 1994'.",
    "microLesson": {
        "concept": "تحليل الأرقام الرومانية وقواعد الطرح",
        "summary": "إذا كانت قيمة الرمز الحالي أقل من الرمز الذي يليه نطرح قيمته (مثل IV = 5 - 1 = 4)، وإلا نضيف قيمته.",
        "exampleCode": "val_map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}"
    },
    "starterCode": "roman = 'MCMXCIV'\n\n# حول الرقم الروماني لعدد صحيح واطبع: Integer Value: 1994\n",
    "requirements": [
        "حول الرمز الروماني إلى رقم صحيح",
        "اطبع بصيغة: Integer Value: 1994"
    ],
    "expectedOutput": "Integer Value: 1994",
    "hints": [
        "فكرة الحل: استخدم قاموساً لقيم الرموز وطبق قاعدة الطرح إذا كانت القيمة الحالية أقل من التالية.",
        "اطبع الناتج بجوار Integer Value:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Integer Value: 1994",
            "description": "تحويل MCMXCIV إلى 1994"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-7"
},

  "world-12-level-7": {
    "id": "world-12-level-7",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 7,
    "title": "🎒 مسألة حقيبة الظهر الكسرية الطماعة (Fractional Knapsack)",
    "englishTitle": "Fractional Knapsack Problem",
    "subtitle": "تعظيم القيمة في حدود الوزن بالخوارزميات الطماعة Greedy",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 250,
    "skills": [
        "competitive",
        "greedy",
        "knapsack"
    ],
    "story": "حقيبة ظهر سعتها القصوى capacity = 50 كجم. لديك ثلاث سلع: الأولى (قيمة 60، وزن 10)، والثانية (قيمة 100، وزن 20)، والثالثة (قيمة 120، وزن 30). لتعظيم القيمة نأخذ الأولى كاملة (وزن 10، قيمة 60)، والثانية كاملة (وزن 20، قيمة 100)، و20 كجم من الثالثة (بنسبة 20/30 من 120 = 80). القيمة الإجمالية القصوى هي 60 + 100 + 80 = 240.0. اطبع: 'Max Knapsack Value: 240.0'.",
    "microLesson": {
        "concept": "حقيبة الظهر الكسرية (Fractional Knapsack)",
        "summary": "نرتب السلع تنازلياً حسب كثافة القيمة (القيمة مقسومة على الوزن val/wt). نأخذ السلع ذات الكثافة الأعلى بالكامل حتى تمتلئ السعة أو نأخذ جزءاً كسرياً من الأخيرة.",
        "exampleCode": "# فكرة الفرز حسب نسبة value / weight"
    },
    "starterCode": "capacity = 50\nitems = [(60, 10), (100, 20), (120, 30)]\n\n# احسب القيمة القصوى واطبع: Max Knapsack Value: 240.0\n",
    "requirements": [
        "احسب القيمة القصوى بدقة منزلة عشرية واحدة",
        "اطبع: Max Knapsack Value: 240.0"
    ],
    "expectedOutput": "Max Knapsack Value: 240.0",
    "hints": [
        "فكرة الحل: كثافة السلع هي 6.0 و 5.0 و 4.0. نأخذ 10 كجم (60) + 20 كجم (100) + 20 كجم (80) = 240.0.",
        "اطبع بصيغة :.1f بجوار Max Knapsack Value:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Max Knapsack Value: 240.0",
            "description": "حل حقيبة الظهر الكسرية لسعة 50"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-8"
},

  "world-12-level-8": {
    "id": "world-12-level-8",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 8,
    "title": "🔄 خوارزمية السلحفاة والأرنب لاكتشاف الحلقات (Floyd's Cycle Detection)",
    "englishTitle": "Floyd's Tortoise and Hare Cycle Detection",
    "subtitle": "خوارزمية المؤشر السريع والبطيء الشهيرة لاكتشاف الحلقات التكرارية",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 245,
    "skills": [
        "competitive",
        "cycle_detection",
        "floyd"
    ],
    "story": "لديك مسار روابط عقد links = {1: 2, 2: 3, 3: 4, 4: 2} (العقدة 4 ترجع للعقدة 2 مشكلة حلقة مغلقة). باستخدام خوارزمية فلويد (مؤشر يتحرك خطوة ومؤشر يتحرك خطوتين)، إذا التقى المؤشران داخل المسار فذلك يثبت وجود حلقة مغلقة. اطبع النتيجة بصيغة: 'Cycle Detected: True'.",
    "microLesson": {
        "concept": "خوارزمية فلويد للسلحفاة والأرنب (Floyd's Cycle Finding)",
        "summary": "إذا كان هناك دوران مغلق في الروابط، فإن المؤشر السريع (الذي يتحرك خطوتين) سيلحق بالمؤشر البطيء (الذي يتحرك خطوة) حتماً ويلتقيان داخل الحلقة.",
        "exampleCode": "slow = links[start]\nfast = links[links[start]]\nwhile fast in links and links[fast] in links:\n    if slow == fast: # cycle!\n    slow = links[slow]\n    fast = links[links[fast]]"
    },
    "starterCode": "links = {1: 2, 2: 3, 3: 4, 4: 2}\n\n# افحص وجود الحلقة واطبع: Cycle Detected: True\n",
    "requirements": [
        "تحقق من وجود حلقة في الروابط",
        "اطبع بصيغة: Cycle Detected: True"
    ],
    "expectedOutput": "Cycle Detected: True",
    "hints": [
        "فكرة الحل: الروابط 2 -> 3 -> 4 -> 2 تمثل حلقة مغلقة دائرية.",
        "اطبع النتيجة المطلوبة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Cycle Detected: True",
            "description": "اكتشاف الحلقة في الروابط"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-9"
},

  "world-12-level-9": {
    "id": "world-12-level-9",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 9,
    "title": "🔤 أطول بادئة نصية مشتركة بين الكلمات (Longest Common Prefix)",
    "englishTitle": "Longest Common Prefix Algorithm",
    "subtitle": "المطابقة العمودية للأحرف في المصفوفات النصية",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 240,
    "skills": [
        "competitive",
        "strings",
        "prefix"
    ],
    "story": "لديك قائمة كلمات words = ['flower', 'flow', 'flight']. ابحث عن أطول بادئة مشتركة (Prefix) تبدأ بها جميع الكلمات في القائمة (البادئة المشتركة هنا هي 'fl'). اطبع النتيجة بصيغة: 'Common Prefix: fl'.",
    "microLesson": {
        "concept": "المطابقة العمودية للأحرف (Vertical Scanning)",
        "summary": "نمر على أحرف أول كلمة حرفاً بحرف، ونقارن الحرف مع نفس الموقع في بقية الكلمات حتى نجد أول اختلاف.",
        "exampleCode": "prefix = ''\nfor chars in zip(*words):\n    if len(set(chars)) == 1:\n        prefix += chars[0]\n    else: break"
    },
    "starterCode": "words = ['flower', 'flow', 'flight']\n\n# أوجد أطول بادئة مشتركة واطبع: Common Prefix: fl\n",
    "requirements": [
        "حدد أطول بادئة نصية مشتركة",
        "اطبع بصيغة: Common Prefix: fl"
    ],
    "expectedOutput": "Common Prefix: fl",
    "hints": [
        "فكرة الحل: استخدم zip(*words) وافحص الحروف المتطابقة في البداية.",
        "اطبع الناتج بجوار Common Prefix:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Common Prefix: fl",
            "description": "البادئة المشتركة لـ flower, flow, flight"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-10"
},

  "world-12-level-10": {
    "id": "world-12-level-10",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 10,
    "title": "🎲 حساب عدد التباديل والتوافيق الشاملة (Permutations Count)",
    "englishTitle": "Array Permutations Counter",
    "subtitle": "التباديل الرياضية ومفهوم الاستدعاء التوافقي",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 250,
    "skills": [
        "competitive",
        "permutations",
        "math"
    ],
    "story": "لديك مصفوفة مكونة من 3 أرقام مميزة nums = [1, 2, 3]. احسب إجمالي عدد التباديل الممكنة لترتيب هذه الأرقام (حيث عدد التباديل لـ n عناصر مميزة هو مضروب n أي 3! = 3 * 2 * 1 = 6). اطبع النتيجة بصيغة: 'Total Permutations: 6'.",
    "microLesson": {
        "concept": "التباديل الرياضية (Permutations Factorial)",
        "summary": "عدد طرق ترتيب n عناصر مميزة في صف يحسب رياضياً عبر المضروب n! = n * (n - 1) * ... * 1.",
        "exampleCode": "import math\ncount = math.factorial(len(arr))"
    },
    "starterCode": "nums = [1, 2, 3]\n\n# احسب إجمالي عدد التباديل الممكنة واطبع: Total Permutations: 6\n",
    "requirements": [
        "احسب عدد التباديل للأرقام الثلاثة",
        "اطبع بصيغة: Total Permutations: 6"
    ],
    "expectedOutput": "Total Permutations: 6",
    "hints": [
        "فكرة الحل: استخدم دالة المضروب math.factorial(len(nums)) أو حلقة ضرب.",
        "اطبع النتيجة بجوار Total Permutations:."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Total Permutations: 6",
            "description": "حساب عدد تباديل [1, 2, 3]"
        }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-12-level-11"
},

  "world-12-level-11": {
    "id": "world-12-level-11",
    "worldId": "world-12",
    "worldTitle": "ساحة البرمجة التنافسية وتحديات النخبة",
    "levelNumber": 11,
    "title": "👑 الزعيم الكوني الأكبر: بطل البرمجة التنافسية وبناء نظام التحكيم الآلي (Ultimate Grandmaster Judge)",
    "englishTitle": "Cosmic Grandmaster Boss: Automated Contest Judge Engine",
    "subtitle": "التحدي الختامي الأسطوري الشامل لمنصة اتحاد بشبابها",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
        "competitive",
        "system_design",
        "data_processing",
        "boss_challenge"
    ],
    "story": "التحدي الختامي الأسطوري الأكبر: لديك نتائج ثلاث جولات لمتسابقي البرمجة التنافسية scores = {'Student_A': [100, 95, 90], 'Student_B': [100, 100, 95], 'Student_C': [80, 85, 90]}. احسب متوسط كل متسابق، وحدد اسم الفائز صاحب أعلى متوسط ('Student_B' بمتوسط 98.33). اطبع النتيجة بصيغة: 'Champion: Student_B - Score: 98.33'.",
    "microLesson": {
        "concept": "بناء أنظمة التحكيم وحساب الإحصاءات التنافسية",
        "summary": "نقوم بحساب المتوسط الحسابي لكل متسابق sum(s) / len(s)، ثم نحدد المتسابق صاحب أعلى قيمة وننسق درجته بدقة منزلتين عشريتين.",
        "exampleCode": "# فكرة إيجاد الفائز بأعلى متوسط درجات وتنسيق النتيجة"
    },
    "starterCode": "scores = {\n    'Student_A': [100, 95, 90],\n    'Student_B': [100, 100, 95],\n    'Student_C': [80, 85, 90]\n}\n\n# احسب متوسط كل متسابق وحدد البطل واطبع الناتج المطلوب تماماً\n",
    "requirements": [
        "احسب متوسط درجات كل طالب",
        "حدد اسم صاحب أعلى متوسط واطبع درجته بدقة منزلتين عشريتين",
        "اطبع بصيغة دقيقة: Champion: Student_B - Score: 98.33"
    ],
    "expectedOutput": "Champion: Student_B - Score: 98.33",
    "hints": [
        "فكرة الحل: احسب المتوسط لكل متسابق، وتتبع أعلى متوسط واسم صاحبه (Student_B بمتوسط 98.33).",
        "استخدم :.2f لتنسيق الدرجة واطبعها بالصيغة المطلوبة تماماً."
    ],
    "testCases": [
        {
            "input": "",
            "expectedOutput": "Champion: Student_B - Score: 98.33",
            "description": "تحديد الفائز في مسابقة البرمجة"
        }
    ],
    "unlocksWorldId": "world-13",
    "nextChallengeId": "world-13-level-1"
},

  ...CHALLENGES_13_TO_20_DATA,

  // DAILY CHALLENGES POOL (Fully integrated & persistent)
  "daily-loop-sum": {
    id: "daily-loop-sum",
    worldId: "daily",
    worldTitle: "التحدي اليومي",
    levelNumber: 1,
    title: "تحدي جمع الأعداد الزوجية 🔥",
    englishTitle: "Sum of Even Numbers",
    subtitle: "تحدي الـ 24 ساعة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 100,
    maxScore: 10,
    skills: ["loops", "range", "arithmetic"],
    story: "اكتب برنامجاً بلغة بايثون يحسب مجموع الأعداد الزوجية من 1 إلى 20 واطبع الناتج النهائي فقط (الناتج هو 110).",
    microLesson: {
      concept: "جمع الأعداد الزوجية",
      summary: "يمكنك استخدام for i in range(2, 21, 2) للمرور على الأعداد الزوجية فقط، وجمعها في متغير total.",
      exampleCode: "total = sum(range(2, 21, 2))\nprint(total)"
    },
    starterCode: "total = 0\n# احسب واطبع مجموع الأعداد الزوجية من 1 إلى 20\n",
    requirements: ["استخدم for loop مع range أو دالة sum", "اطبع الناتج النهائي فقط (110)"],
    expectedOutput: "110",
    hints: [
      "for i in range(2, 21, 2): total += i",
      "print(total)"
    ],
    testCases: [
      { input: "", expectedOutput: "110", description: "حساب مجموع الأعداد الزوجية حتى 20" }
    ],
    nextChallengeId: null
  },
  "daily-string-reverse": {
    id: "daily-string-reverse",
    worldId: "daily",
    worldTitle: "التحدي اليومي",
    levelNumber: 2,
    title: "عكس الكلمات البرمجية 🔄",
    englishTitle: "Reverse String Challenge",
    subtitle: "تحدي الـ 24 ساعة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 100,
    maxScore: 10,
    skills: ["strings", "slicing", "loops"],
    story: "لديك الكلمة word = 'Python'. اعكس ترتيب حروفها واطبع الكلمة المعكوسة (الناتج هو nohtyP).",
    microLesson: {
      concept: "عكس النصوص",
      summary: "يمكنك استخدام تقنية التقطيع [::-1] أو دالة reversed لعكس النصوص بسهولة.",
      exampleCode: "txt = 'ABC'\nprint(txt[::-1])"
    },
    starterCode: "word = 'Python'\n# اعكس الكلمة واطبع الناتج\n",
    requirements: ["اعكس النص word", "اطبع الناتج المعكوس (nohtyP)"],
    expectedOutput: "nohtyP",
    hints: ["print(word[::-1])"],
    testCases: [
      { input: "", expectedOutput: "nohtyP", description: "عكس كلمة Python" }
    ],
    nextChallengeId: null
  },
  "daily-grade-calc": {
    id: "daily-grade-calc",
    worldId: "daily",
    worldTitle: "التحدي اليومي",
    levelNumber: 3,
    title: "فاحص الدرجات السريع 🎯",
    englishTitle: "Fast Grade Inspector",
    subtitle: "تحدي الـ 24 ساعة",
    difficulty: "easy",
    type: "write_code",
    baseXp: 100,
    maxScore: 10,
    skills: ["conditions", "if-else"],
    story: "عرف متغيراً score = 85. افحص إذا كان score >= 50 اطبع 'Pass' وإلا اطبع 'Fail'.",
    microLesson: {
      concept: "الشروط البسيطة",
      summary: "استخدم if للفحص و else للحالة البديلة.",
      exampleCode: "if score >= 50:\n    print('Pass')"
    },
    starterCode: "score = 85\n# افحص واطبع النتيجة\n",
    requirements: ["عرف score = 85", "اطبع Pass إذا كان >= 50 وإلا Fail"],
    expectedOutput: "Pass",
    hints: ["if score >= 50: print('Pass')"],
    testCases: [
      { input: "", expectedOutput: "Pass", description: "فحص درجة 85" }
    ],
    nextChallengeId: null
  },
  "daily-dict-counter": {
    id: "daily-dict-counter",
    worldId: "daily",
    worldTitle: "التحدي اليومي",
    levelNumber: 4,
    title: "معدل تكرار الكلمات 📊",
    englishTitle: "Word Frequency Counter",
    subtitle: "تحدي الـ 24 ساعة",
    difficulty: "hard",
    type: "write_code",
    baseXp: 100,
    maxScore: 10,
    skills: ["dictionaries", "strings", "loops"],
    story: "لديك الكلمات items = ['code', 'python', 'code', 'fast']. أنشئ قاموساً يحسب تكرار كل كلمة واطبع القاموس النهائي.",
    microLesson: {
      concept: "حساب التكرار في القواميس",
      summary: "يمكنك استخدام counts[item] = counts.get(item, 0) + 1 لحساب التكرار بدقة.",
      exampleCode: "counts = {}\nfor x in items:\n    counts[x] = counts.get(x, 0) + 1\nprint(counts)"
    },
    starterCode: "items = ['code', 'python', 'code', 'fast']\ncounts = {}\n# احسب التكرار واطبع counts\n",
    requirements: ["احسب تكرار كل عنصر في items داخل قاموس counts", "اطبع counts"],
    expectedOutput: "{'code': 2, 'python': 1, 'fast': 1}",
    hints: ["for x in items: counts[x] = counts.get(x, 0) + 1\nprint(counts)"],
    testCases: [
      { input: "", expectedOutput: "{'code': 2, 'python': 1, 'fast': 1}", description: "حساب تكرار العناصر" }
    ],
    nextChallengeId: null
  },
  "daily-palindrome": {
    id: "daily-palindrome",
    worldId: "daily",
    worldTitle: "التحدي اليومي",
    levelNumber: 5,
    title: "فاحص الكلمات المتناظرة (Palindrome) 🪞",
    englishTitle: "Palindrome Word Checker",
    subtitle: "تحدي الـ 24 ساعة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 100,
    maxScore: 10,
    skills: ["strings", "slicing", "conditions"],
    story: "اكتب برنامجاً يفحص إذا كانت الكلمة word = 'radar' متناظرة (تقرأ من اليمين كالشمال). إذا كانت متناظرة اطبع 'Palindrome' وإلا اطبع 'Not Palindrome'.",
    microLesson: {
      concept: "فحص الكلمات المتناظرة",
      summary: "الكلمة المتناظرة هي التي تتطابق تماماً مع معكوسها word == word[::-1].",
      exampleCode: "w = 'level'\nprint('Palindrome' if w == w[::-1] else 'Not Palindrome')"
    },
    starterCode: "word = 'radar'\n# افحص هل الكلمة متناظرة واطبع النتيجة\n",
    requirements: ["افحص إذا كانت word متناظرة", "اطبع Palindrome إذا كانت متناظرة وإلا Not Palindrome"],
    expectedOutput: "Palindrome",
    hints: ["if word == word[::-1]: print('Palindrome')\nelse: print('Not Palindrome')"],
    testCases: [
      { input: "", expectedOutput: "Palindrome", description: "فحص كلمة radar المتناظرة" }
    ],
    nextChallengeId: null
  },
  "daily-list-max": {
    id: "daily-list-max",
    worldId: "daily",
    worldTitle: "التحدي اليومي",
    levelNumber: 6,
    title: "صائد القيمة العظمى في القوائم ⚡",
    englishTitle: "List Maximum Finder",
    subtitle: "تحدي الـ 24 ساعة",
    difficulty: "easy",
    type: "write_code",
    baseXp: 100,
    maxScore: 10,
    skills: ["lists", "functions", "builtins"],
    story: "لديك القائمة numbers = [14, 88, 42, 99, 23, 75]. اوجد أكبر عدد في القائمة واطبع قيمته (99).",
    microLesson: {
      concept: "إيجاد أكبر قيمة في قائمة",
      summary: "يمكنك استخدام دالة max(numbers) المدمجة أو حلقة for لمقارنة العناصر وتحديث أكبر رقم.",
      exampleCode: "nums = [10, 50, 30]\nprint(max(nums))"
    },
    starterCode: "numbers = [14, 88, 42, 99, 23, 75]\n# اوجد واطبع أكبر رقم في القائمة\n",
    requirements: ["اوجد أكبر قيمة في numbers", "اطبع الناتج النهائي فقط (99)"],
    expectedOutput: "99",
    hints: ["print(max(numbers))"],
    testCases: [
      { input: "", expectedOutput: "99", description: "استخراج القيمة العظمى من القائمة" }
    ],
    nextChallengeId: null
  },
  "daily-prime-check": {
    id: "daily-prime-check",
    worldId: "daily",
    worldTitle: "التحدي اليومي",
    levelNumber: 7,
    title: "مختبر الأعداد الأولية 🔢",
    englishTitle: "Prime Number Inspector",
    subtitle: "تحدي الـ 24 ساعة",
    difficulty: "hard",
    type: "write_code",
    baseXp: 100,
    maxScore: 10,
    skills: ["math", "loops", "conditions"],
    story: "عرف متغيراً n = 17. افحص إذا كان العدد أولي (يقبل القسمة على 1 ونفسه فقط). إذا كان أولياً اطبع 'Prime' وإلا اطبع 'Not Prime'.",
    microLesson: {
      concept: "فحص العدد الأولي",
      summary: "العدد الأولي أكبر من 1 ولا يقبل القسمة على أي عدد من 2 إلى n - 1 (أو الجذر التربيعي له).",
      exampleCode: "n = 17\nis_p = n > 1 and all(n % i != 0 for i in range(2, int(n**0.5) + 1))\nprint('Prime' if is_p else 'Not Prime')"
    },
    starterCode: "n = 17\n# افحص إذا كان n أولياً واطبع الناتج\n",
    requirements: ["افحص n = 17", "اطبع Prime إذا كان أولياً وإلا Not Prime"],
    expectedOutput: "Prime",
    hints: ["استخدم for loop من 2 حتى int(n**0.5) + 1 وافحص n % i == 0"],
    testCases: [
      { input: "", expectedOutput: "Prime", description: "فحص العدد 17" }
    ],
    nextChallengeId: null
  }
};

/**
 * 7-Day Rotating Pool for Daily Challenges.
 * Ordered so Nov 11 corresponds to daily-loop-sum, and Nov 12 (today) rotates to daily-string-reverse.
 */
export const DAILY_CHALLENGES_POOL = [
  "daily-string-reverse", // Index 0 -> Nov 12, 2026 (Today)
  "daily-grade-calc",     // Index 1 -> Nov 13, 2026
  "daily-dict-counter",   // Index 2 -> Nov 14, 2026
  "daily-palindrome",     // Index 3 -> Nov 15, 2026
  "daily-list-max",       // Index 4 -> Nov 16, 2026
  "daily-prime-check",    // Index 5 -> Nov 17, 2026
  "daily-loop-sum"        // Index 6 -> Nov 11, 2026
];

/**
 * Returns deterministic YYYY-MM-DD date key in local time.
 */
export function getDailyChallengeDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Deterministically retrieves today's active Daily Challenge based on calendar date.
 */
export function getTodayDailyChallenge(date = new Date()) {
  const startEpoch = new Date(2026, 0, 1).getTime();
  const currentDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const dayNumber = Math.floor((currentDay - startEpoch) / (24 * 60 * 60 * 1000));
  const poolIndex = ((dayNumber % DAILY_CHALLENGES_POOL.length) + DAILY_CHALLENGES_POOL.length) % DAILY_CHALLENGES_POOL.length;
  const challengeId = DAILY_CHALLENGES_POOL[poolIndex];
  return CHALLENGES_CLIENT_DATA[challengeId] || CHALLENGES_CLIENT_DATA["daily-loop-sum"];
}


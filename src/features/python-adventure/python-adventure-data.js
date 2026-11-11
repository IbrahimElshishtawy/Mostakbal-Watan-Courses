// src/features/python-adventure/python-adventure-data.js
import { PROBLEM_SOLVING_LEVELS_DATA, PROBLEM_SOLVING_CHALLENGES_DATA } from "../problem-solving/problem-solving-data.js";
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
    levelsCount: 8,
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
    levelsCount: 8,
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
    levelsCount: 8,
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
    levelsCount: 8,
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
    levelsCount: 8,
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
    levelsCount: 8,
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
    levelsCount: 8,
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
    levelsCount: 8,
    requiredWorldId: "world-7"
  }
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
    levelsCount: 10,
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
    levelsCount: 10,
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
    levelsCount: 10,
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
    levelsCount: 10,
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
    levelsCount: 10,
    pointsPerProblem: 100,
    requiredWorldId: null
  }
];

export const ALL_WORLDS_DATA = [...WORLDS_DATA, ...PROBLEM_SOLVING_WORLDS_DATA];

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
    nextChallengeId: "world-2-level-1"
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
    nextChallengeId: "world-3-level-1"
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
    nextChallengeId: "world-4-level-1"
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
    nextChallengeId: "world-5-level-1"
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
    nextChallengeId: "world-6-level-1"
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
    nextChallengeId: "world-7-level-1"
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
    nextChallengeId: "world-8-level-1"
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
    nextChallengeId: null
  },

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
  }
};

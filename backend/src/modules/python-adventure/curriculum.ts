// backend/src/modules/python-adventure/curriculum.ts

export const ACHIEVEMENTS_LIST = {
  first_code: {
    id: "first_code",
    title: "أول سطر بايثون",
    description: "قمت بتشغيل وإكمال أول برنامج بلغة بايثون في مغامرتك.",
    icon: "🐍"
  },
  loop_master: {
    id: "loop_master",
    title: "سيد حلقات التكرار",
    description: "أكملت جميع تحديات غابة التكرار (Loop Forest).",
    icon: "🔁"
  },
  bug_hunter: {
    id: "bug_hunter",
    title: "صياد الأخطاء البرمجية",
    description: "نجحت في حل 3 مهام تصحيح أخطاء (Debugging).",
    icon: "🐞"
  },
  boss_slayer: {
    id: "boss_slayer",
    title: "قاهر الزعماء",
    description: "هزمت زعيم أحد العوالم واجتزت التحدي الأسطوري.",
    icon: "👑"
  },
  python_hero: {
    id: "python_hero",
    title: "بطل بايثون الأسطوري",
    description: "أنهيت المشروع الختامي وأتممت مسار مغامرة بايثون كاملاً!",
    icon: "🏆"
  },
  // New Competitive Titles & Badges
  beginner_solver: {
    id: "beginner_solver",
    title: "🥉 مبتدئ بايثون (Beginner)",
    description: "نجحت في حل أول مسألة برمجية وبدأت رحلتك في التحديات.",
    icon: "🥉"
  },
  problem_solver: {
    id: "problem_solver",
    title: "🥈 حلال المشكلات (Problem Solver)",
    description: "أتممت حل 5 مشكلات برمجية في بايثون بنجاح.",
    icon: "🥈"
  },
  python_solver: {
    id: "python_solver",
    title: "🥇 خبير المسائل (Python Solver)",
    description: "حللت 15 مسألة برمجية بنجاح وأثبتت تمكنك من أساسيات ومفاهيم بايثون.",
    icon: "🥇"
  },
  code_warrior: {
    id: "code_warrior",
    title: "🔥 محارب الأكواد (Code Warrior)",
    description: "حافظت على تتابع 7 أيام متتالية أو قمت بحل 25 مسألة برمجية.",
    icon: "🔥"
  },
  speed_coder: {
    id: "speed_coder",
    title: "⚡ المبرمج السريع (Speed Coder)",
    description: "حللت 3 مسائل برمجية من المحاولة الأولى بنجاح بدون طلب تلميحات.",
    icon: "⚡"
  },
  algo_master: {
    id: "algo_master",
    title: "🧠 سيد الخوارزميات (Algorithm Master)",
    description: "أتقنت 5 مسائل في خوارزميات البحث والترتيب والـ Recursion في المستوى المتقدم.",
    icon: "🧠"
  },
  python_expert: {
    id: "python_expert",
    title: "💎 خبير بايثون المتقدم (Python Expert)",
    description: "حققت 500+ نقطة تنافسية وتجاوزت مسألتين في مستوى الخبير والتحديات القصوى.",
    icon: "💎"
  },
  python_champion: {
    id: "python_champion",
    title: "👑 بطل بايثون المتصدر (Python Champion)",
    description: "بلغت قمة المتصدرين (Top 3) وأكملت المستوى الخامس بكفاءة استثنائية.",
    icon: "👑"
  }
};

export const WORLDS_CONFIG = [
  { id: "world-1", number: 1, title: "قرية بايثون", icon: "🏠", concept: "الطباعة والعمليات الحسابية" },
  { id: "world-2", number: 2, title: "وادي المتغيرات", icon: "🔢", concept: "المتغيرات والأنواع والإدخال" },
  { id: "world-3", number: 3, title: "كهف الشروط", icon: "🔀", concept: "الشروط والمنطق if/elif/else" },
  { id: "world-4", number: 4, title: "غابة التكرار", icon: "🔁", concept: "حلقات التكرار for و while" },
  { id: "world-5", number: 5, title: "مدينة القوائم", icon: "📦", concept: "القوائم والبيانات ومصفوفاتها" },
  { id: "world-6", number: 6, title: "مصنع الدوال", icon: "⚙️", concept: "بناء الدوال واستدعاؤها def" },
  { id: "world-7", number: 7, title: "قلعة الكائنات", icon: "🧱", concept: "البرمجة الكائنية OOP Classes" },
  { id: "world-8", number: 8, title: "حلبة الأبطال", icon: "🏆", concept: "المشروع الختامي الشامل" }
];

export const PYTHON_ADVENTURE_CHALLENGES: Record<string, any> = {
  // WORLD 1: PYTHON VILLAGE
  "world-1-level-1": {
    id: "world-1-level-1",
    worldId: "world-1",
    levelNumber: 1,
    title: "أهلاً بك في بايثون",
    subtitle: "المهمة الأولى: إضاءة لافتة القرية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 50,
    skills: ["print", "strings"],
    story: "أهلاً بك في قرية بايثون (Python Village)! لافتة القرية بحاجة إلى إضاءة ترحيبية بالقادمين الجدد. استخدم أمر print لإرسال رسالة ترحيبية إلى الشاشة.",
    microLesson: {
      title: "أمر الطباعة print()",
      content: "في لغة بايثون، نستخدم الدالة print() لطباعة وعرض أي نصوص أو أرقام على الشاشة.\nنضع النصوص بين علامات تنصيص '...' أو \"...\".",
      exampleCode: 'print("مرحباً بك!")\nprint(100)'
    },
    starterCode: '# اكتب كود الطباعة أدناه\n',
    requirements: [
      "استخدم أمر print()",
      "اطبع العبارة: Hello Python أو مرحباً بايثون"
    ],
    outputIncludes: ["Python"],
    hints: [
      "فكر في الدالة المستخدمة لإخراج النصوص إلى الشاشة.",
      "استخدم print('...')",
      "تأكد من وضع النص بين علامتي تنصيص.",
      "ابدأ بكتابة: print('Hello Python')"
    ],
    nextChallengeId: "world-1-level-2"
  },
  "world-1-level-2": {
    id: "world-1-level-2",
    worldId: "world-1",
    levelNumber: 2,
    title: "حساب غنائم القرية",
    subtitle: "العمليات الحسابية المباشرة",
    difficulty: "easy",
    type: "write_code",
    baseXp: 60,
    skills: ["arithmetic", "numbers"],
    story: "عثر حراس القرية على 3 صناديق ذهب في كل صندوق 25 عملة، ثم حصلوا على مكافأة إضافية قدرها 15 عملة. احسب إجمالي العملات واطبعه.",
    microLesson: {
      title: "الحساب في بايثون",
      content: "تستطيع بايثون إجراء العمليات الحسابية مباشرة كآلة حاسبة ذكية:\n+ للجمع، - للطرح، * للضرب، / للقسمة.",
      exampleCode: 'print(5 + 3)\nprint(10 * 2)'
    },
    starterCode: '# احسب واطبع الناتج المباشر: (3 * 25) + 15\n',
    requirements: [
      "احسب: (3 * 25) + 15",
      "اطبع الناتج مباشرة بدون نصوص إضافية (الناتج هو 90)"
    ],
    expectedOutput: "90",
    hints: [
      "الضرب يكتب بعلامة النجمة * والجمع بعلامة +",
      "اكتب التعبير الرياضي مباشرة داخل print",
      "print(3 * 25 + 15)"
    ],
    nextChallengeId: "world-1-level-3"
  },
  "world-1-level-3": {
    id: "world-1-level-3",
    worldId: "world-1",
    levelNumber: 3,
    title: "إصلاح لافتة الحارس",
    subtitle: "صائد الأخطاء: خطأ في صياغة الكود SyntaxError",
    difficulty: "easy",
    type: "fix_code",
    baseXp: 70,
    skills: ["debugging", "syntax"],
    story: "كتب أحد المبتدئين كود لافتة الحارس لكنه وقع في خطأ صياغة بسيط يمنع الكود من العمل! مهمتك هي اكتشاف الخطأ وإصلاحه لتعمل اللافتة.",
    microLesson: {
      title: "أخطاء الصياغة (Syntax Errors)",
      content: "بايثون لغة دقيقة! كل قوس مفتوح ( يجب أن يغلق بمثله )، وكل علامة تنصيص يجب أن تقفل.",
      exampleCode: '# خطأ: print("مرحبا\n# صحيح: print("مرحبا")'
    },
    starterCode: 'print("Village Gate is Open"\n',
    requirements: [
      "أصلح القوس المفقود في سطر الطباعة",
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
    levelNumber: 4,
    title: "👑 حارس بوابة القرية",
    subtitle: "تحدي الزعيم: امتحان اجتياز قرية بايثون",
    difficulty: "boss",
    type: "boss",
    baseXp: 150,
    skills: ["print", "arithmetic", "integration"],
    story: "يقف حارس بوابة القرية العملاق! لن يفتح البوابة إلى وادي المتغيرات إلا إذا قمت بطباعة سطرين: السطر الأول 'Welcome to Python World' والسطر الثاني ناتج حساب (100 - 25 * 2). أظهر له براعتك!",
    microLesson: {
      title: "تحدي الزعيم",
      content: "اجمع ما تعلمته: الطباعة في سطرين مختلفين والعمليات الحسابية مع مراعاة أولويات العمليات (الضرب قبل الطرح).",
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
    nextChallengeId: "world-2-level-1"
  },

  // WORLD 2: VARIABLES VALLEY
  "world-2-level-1": {
    id: "world-2-level-1",
    worldId: "world-2",
    levelNumber: 1,
    title: "صندوق كنوز الوادي",
    subtitle: "تعريف واستخدام المتغيرات",
    difficulty: "easy",
    type: "write_code",
    baseXp: 80,
    skills: ["variables", "integers", "strings"],
    story: "في وادي المتغيرات (Variables Valley)، نحفظ البيانات في صناديق تسمى متغيرات (Variables). قم بتعريف متغير اسمه gold بقيمة 50، ومتغير اسمه hero_name بقيمة 'Ahmed' أو اسمك، ثم اطبع قيمة gold.",
    microLesson: {
      title: "المتغيرات في بايثون",
      content: "المتغير هو مساحة في الذاكرة لتخزين قيمة باسم يسهل الرجوع إليه:\nx = 10\nname = 'Sarah'\nprint(x)",
      exampleCode: "coins = 100\nprint(coins)"
    },
    starterCode: '# عرف المتغير gold والمتغير hero_name\n',
    requirements: [
      "عرف متغير باسم gold بقيمة عددية",
      "اطبع قيمة gold"
    ],
    requiredPatterns: [
      { regex: "gold\\s*=", messageAr: "يجب تعريف متغير باسم gold." },
      { regex: "print\\s*\\(.*gold.*\\)", messageAr: "يجب طباعة المتغير gold." }
    ],
    hints: [
      "اكتب: gold = 50",
      "ثم في السطر التالي: print(gold)"
    ],
    nextChallengeId: "world-2-level-2"
  },
  "world-2-level-2": {
    id: "world-2-level-2",
    worldId: "world-2",
    levelNumber: 2,
    title: "محول العملات السحرية",
    subtitle: "التحويل بين الأنواع وعمليات الجمع",
    difficulty: "medium",
    type: "write_code",
    baseXp: 90,
    skills: ["type_casting", "math"],
    story: "تصلك كمية الذهب كنص '150' وتريد مضاعفتها بالضرب في 2. حول النص إلى رقم صحيح باستخدام int() ثم اطبع الناتج المضاعف.",
    microLesson: {
      title: "تحويل الأنواع Type Casting",
      content: "النصوص لا يمكن إجراء ضرب حسابي حقيقي عليها إلا بعد تحويلها إلى رقم صحيح باستخدام int() أو رقم عشري باستخدام float().",
      exampleCode: "str_num = '25'\nreal_num = int(str_num)\nprint(real_num * 2)  # 50"
    },
    starterCode: "gold_str = '150'\n# حول gold_str إلى رقم واطبع ناتج ضربه في 2\n",
    requirements: [
      "استخدم int(gold_str) للتحويل",
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
    levelNumber: 3,
    title: "إكمال فاتورة التاجر",
    subtitle: "إكمال الكود: صيغة f-string الأنيقة",
    difficulty: "medium",
    type: "complete_code",
    baseXp: 90,
    skills: ["f-strings", "formatting"],
    story: "تاجر الوادي يريد طباعة فاتورة بالصيغة: 'Total: 250 Coins'. أكمل الفراغ في f-string لطباعة القيمة الصحيحة.",
    microLesson: {
      title: "سلاسل f-string المنسقة",
      content: "نضع حرف f قبل علامة التنصيص ونكتب المتغير داخل أقواس معقوفة {variable}:\nprice = 100\nprint(f'Price: {price}')",
      exampleCode: "name = 'Ali'\nprint(f'Hello {name}')"
    },
    starterCode: "total = 250\n# أكمل الكود التالي لطباعة: Total: 250 Coins\nprint(f'Total: {_____} Coins')\n",
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
    levelNumber: 4,
    title: "👑 تاجر الوادي العظيم",
    subtitle: "تحدي الزعيم: نظام محاسبة الوادي",
    difficulty: "boss",
    type: "boss",
    baseXp: 180,
    skills: ["variables", "arithmetic", "f-strings"],
    story: "التاجر العظيم يطلب منك حساب السعر النهائي لشحنة دروع: سعر السلعة price = 400، ونسبة الضريبة tax = 50، والخصم discount = 30. احسب final_price = price + tax - discount واطبع النتيجة بالصيغة: 'Final Price: 420'",
    microLesson: {
      title: "تحدي الزعيم",
      content: "عرف المتغيرات الثلاثة، احسب الناتج النهائي وخزنه في متغير، ثم اطبعه باستخدام f-string أو دمج النصوص.",
      exampleCode: "a = 10\nb = 2\nc = a + b\nprint(f'Result: {c}')"
    },
    starterCode: "price = 400\ntax = 50\ndiscount = 30\n# احسب final_price واطبع: Final Price: 420\n",
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
    nextChallengeId: "world-3-level-1"
  },

  // WORLD 3: CONDITIONS CAVE
  "world-3-level-1": {
    id: "world-3-level-1",
    worldId: "world-3",
    levelNumber: 1,
    title: "بوابة فحص السن",
    subtitle: "استخدام الجملة الشرطية if",
    difficulty: "easy",
    type: "write_code",
    baseXp: 80,
    skills: ["conditions", "if"],
    story: "وصلت إلى كهف الشروط (Conditions Cave). بوابة الكهف تفحص عمر المغامر age = 20. إذا كان العمر 18 أو أكثر، اطبع 'Access Granted'.",
    microLesson: {
      title: "الجملة الشرطية if",
      content: "تتيح لك if تنفيذ أوامر معينة فقط إذا تحقق شرط معين:\nif age >= 18:\n    print('مسموح')",
      exampleCode: "x = 10\nif x > 5:\n    print('Greater than 5')"
    },
    starterCode: "age = 20\n# اكتب شرط if لفحص إذا كان age >= 18 اطبع Access Granted\n",
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
    levelNumber: 2,
    title: "رتبة المغامر السحرية",
    subtitle: "تعدد الشروط if / elif / else",
    difficulty: "medium",
    type: "write_code",
    baseXp: 90,
    skills: ["elif", "else"],
    story: "يحدد الكهف رتبتك حسب النقاط score = 85:\nإذا كانت النقاط >= 90 اطبع 'Diamond'\nإذا كانت النقاط >= 80 اطبع 'Gold'\nغير ذلك اطبع 'Silver'",
    microLesson: {
      title: "تعدد الشروط elif",
      content: "عند وجود أكثر من احتمال نستخدم elif، وفي النهاية نضع else للحالات المتبقية:\nif x > 90: ...\nelif x > 80: ...\nelse: ...",
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
    levelNumber: 3,
    title: "فخ علامة المساواة",
    subtitle: "صائد الأخطاء: الفرق بين = و ==",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 85,
    skills: ["debugging", "comparison"],
    story: "وقع مبرمج الكهف في أشهر خطأ في بايثون! استخدم = (إسناد قيمة) بدلاً من == (مقارنة الشرط). أصلح الكود ليعمل بنجاح.",
    microLesson: {
      title: "= مقابل ==",
      content: "= تستخدم لتعيين قيمة لمتغير: x = 5\nبينما == تستخدم للمقارنة وفحص التساوي: if x == 5:",
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
    levelNumber: 4,
    title: "👑 لغز حكيم الكهف",
    subtitle: "تحدي الزعيم: فك شفرة الكهف المعقدة",
    difficulty: "boss",
    type: "boss",
    baseXp: 200,
    skills: ["logical_operators", "nested_conditions"],
    story: "يقف حكيم الكهف أمام الممر المؤدي لغابة التكرار! ولديك مفتاحان: has_key = True و energy = 80. افتح البوابة إذا كان لديك المفتاح و الطاقة أكبر من أو تساوي 50 بطباعة: 'Cave Master Defeated'",
    microLesson: {
      title: "العوامل المنطقية and و or",
      content: "نستخدم and للتأكد من تحقق الشرطين معاً:\nif has_pass and score > 50:\n    print('Passed')",
      exampleCode: "x = 10\ny = 20\nif x > 5 and y > 15:\n    print('Both True')"
    },
    starterCode: "has_key = True\nenergy = 80\n# افحص الشرطين معاً باستخدام and\n",
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
    nextChallengeId: "world-4-level-1"
  },

  // WORLD 4: LOOP FOREST
  "world-4-level-1": {
    id: "world-4-level-1",
    worldId: "world-4",
    levelNumber: 1,
    title: "فتح البوابات الخمس",
    subtitle: "التكرار باستخدام for و range",
    difficulty: "easy",
    type: "write_code",
    baseXp: 90,
    skills: ["for_loop", "range"],
    story: "غابة التكرار (Loop Forest) تحتاج مساعدتك! هناك 5 بوابات يجب فتحها مرقمة من 0 إلى 4. استخدم loop بدل تكرار الكود لطباعة أرقام البوابات.",
    microLesson: {
      title: "حلقة التكرار for loop",
      content: "تستخدم for لتكرار تنفيذ مجموعة من الأوامر لعدد محدد من المرات باستخدام range(n):\nfor i in range(5):\n    print(i)",
      exampleCode: "for i in range(3):\n    print('Hello')"
    },
    starterCode: '# استخدم for مع range(5) لطباعة الأرقام من 0 إلى 4\n',
    requirements: [
      "استخدم for loop",
      "استخدم range(5)",
      "اطبع الأرقام من 0 إلى 4 كل رقم في سطر"
    ],
    requiredPatterns: [
      { regex: "for\\s+\\w+\\s+in\\s+range\\s*\\(\\s*5\\s*\\)", messageAr: "يجب استخدام for مع range(5)." }
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
    levelNumber: 2,
    title: "جمع ثمار الغابة",
    subtitle: "نمط التراكم والتجميع Accumulator Pattern",
    difficulty: "medium",
    type: "write_code",
    baseXp: 100,
    skills: ["accumulation", "for_loop"],
    story: "اجمع ثمار الغابة! اكتب برنامجاً يحسب مجموع الأعداد من 1 إلى 5 باستخدام for loop واطبع الناتج النهائي فقط (15).",
    microLesson: {
      title: "تجميع القيم في حلقة التكرار",
      content: "نعرف متغيراً للمجموع قبل الحلقة بقيمة صفر، ثم نضيف له في كل دورة:\ntotal = 0\nfor i in range(1, 4):\n    total += i\nprint(total)",
      exampleCode: "s = 0\nfor x in [1, 2, 3]:\n    s += x\nprint(s)"
    },
    starterCode: "total = 0\n# استخدم for loop لإضافة الأعداد من 1 إلى 5 إلى total\n# ثم اطبع total خارج الحلقة\n",
    requirements: [
      "استخدم for loop مع range(1, 6)",
      "اجمع الأعداد في المتغير total",
      "اطبع الناتج النهائي فقط: 15"
    ],
    requiredPatterns: [
      { regex: "for\\s+", messageAr: "يجب استخدام حلقة التكرار for." }
    ],
    expectedOutput: "15",
    hints: [
      "range(1, 6) يعطيك الأعداد 1، 2، 3، 4، 5",
      "داخل الحلقة: total += i أو total = total + i",
      "تأكد أن print(total) ليست داخل الحلقة بل بعدها بدون مسافة بادئة"
    ],
    nextChallengeId: "world-4-level-3"
  },
  "world-4-level-3": {
    id: "world-4-level-3",
    worldId: "world-4",
    levelNumber: 3,
    title: "فخ الحلقة اللانهائية",
    subtitle: "صائد الأخطاء: حلقة while لا تتوقف!",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 95,
    skills: ["while_loop", "debugging"],
    story: "عالقون في دوامة زمنية بغابة التكرار! كود حلقة while نسي زيادة العداد count مما تسبب في حلقة لا نهائية. أصلح الكود بطباعة count من 1 إلى 3 وتحديث العداد.",
    microLesson: {
      title: "حلقات while وتفادي التكرار اللانهائي",
      content: "حلقة while تستمر طالما الشرط True. لذلك يجب تعديل المتغير في كل دورة حتى يتوقف الشرط:\ncount = 1\nwhile count <= 3:\n    print(count)\n    count += 1",
      exampleCode: "i = 0\nwhile i < 2:\n    print(i)\n    i += 1"
    },
    starterCode: "count = 1\nwhile count <= 3:\n    print(count)\n    # أضف السطر الناقص لزيادة count هنا\n",
    requirements: [
      "أضف زيادة للعداد: count += 1 أو count = count + 1",
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
    levelNumber: 4,
    title: "👑 وحش شجرة السنديان العتيقة",
    subtitle: "تحدي الزعيم: العد التنازلي لهزيمة الوحش",
    difficulty: "boss",
    type: "boss",
    baseXp: 220,
    skills: ["loops", "reverse_range", "integration"],
    story: "وحش السنديان العملاق يهدد الغابة! عليك إطلاق تعويذة عد تنازلي من 3 إلى 1 ثم طباعة 'Monster Defeated!'. استخدم حلقة تكرار لطباعة 3 ثم 2 ثم 1 ثم اطبع عبارة النصر.",
    microLesson: {
      title: "العد التنازلي",
      content: "يمكنك العد تنازلياً باستخدام range(3, 0, -1) أو باستخدام حلقة while تنقص 1 في كل مرة.",
      exampleCode: "for i in range(3, 0, -1):\n    print(i)\nprint('Go!')"
    },
    starterCode: '# اطبع 3 ثم 2 ثم 1 باستخدام loop، ثم اطبع Monster Defeated!\n',
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
    nextChallengeId: "world-5-level-1"
  },

  // WORLD 5: LISTS CITY
  "world-5-level-1": {
    id: "world-5-level-1",
    worldId: "world-5",
    levelNumber: 1,
    title: "حقيبة أدوات المدينة",
    subtitle: "إنشاء القوائم والفهرسة Indexing",
    difficulty: "easy",
    type: "write_code",
    baseXp: 90,
    skills: ["lists", "indexing"],
    story: "مرحباً بك في مدينة القوائم (Lists City)! أنشئ قائمة باسم items تحتوي على العناصر الثلاثة: 'sword', 'shield', 'potion'. ثم اطبع العنصر الأول باستخدام الفهرس [0].",
    microLesson: {
      title: "القوائم Lists والفهرسة",
      content: "القوائم تحفظ عدة عناصر بين أقواس مربعة []، ويبدأ ترقيم العناصر من الصفر 0:\nmy_list = ['A', 'B', 'C']\nprint(my_list[0])  # 'A'",
      exampleCode: "heroes = ['Omar', 'Sara']\nprint(heroes[0])"
    },
    starterCode: '# أنشئ قائمة items واطبع العنصر الأول sword\n',
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
    levelNumber: 2,
    title: "إضافة أداة سحرية للقائمة",
    subtitle: "دالة الإضافة append ودالة الطول len",
    difficulty: "medium",
    type: "write_code",
    baseXp: 95,
    skills: ["append", "len"],
    story: "لديك قائمة spells = ['fire', 'ice']. أضف إليها العنصر 'thunder' باستخدام append() ثم اطبع عدد عناصر القائمة باستخدام len().",
    microLesson: {
      title: "تعديل القوائم",
      content: "نستخدم .append() لإضافة عنصر في نهاية القائمة، ونستخدم len() لمعرفة عدد عناصرها:\nnums = [1, 2]\nnums.append(3)\nprint(len(nums))  # 3",
      exampleCode: "colors = ['red']\ncolors.append('blue')\nprint(len(colors))"
    },
    starterCode: "spells = ['fire', 'ice']\n# أضف 'thunder' ثم اطبع طول القائمة\n",
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
    levelNumber: 3,
    title: "فهرس خارج النطاق IndexError",
    subtitle: "صائد الأخطاء: طلب عنصر غير موجود",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 90,
    skills: ["debugging", "index_error"],
    story: "حاول أحد المبرمجين طباعة العنصر الأخير من قائمة بها 3 عناصر فقط، فكتب index 3 وتسبب في خطأ IndexError! أصلح الفهرس ليطبع العنصر الأخير الصحيح 'Gold'.",
    microLesson: {
      title: "IndexError",
      content: "إذا كانت القائمة تحتوي 3 عناصر، فإن الفهارس المتاحة هي 0 و 1 و 2 فقط. العنصر الأخير يكون دائماً عند الفهرس len - 1 أو الفهرس السالب [-1]!",
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
    levelNumber: 4,
    title: "👑 حاكم مدينة القوائم",
    subtitle: "تحدي الزعيم: تصفية وحساب القيم الفائزة",
    difficulty: "boss",
    type: "boss",
    baseXp: 240,
    skills: ["lists", "loops", "filters"],
    story: "حاكم المدينة يختبر قدرتك على معالجة البيانات الضخمة! لديك قائمة درجات scores = [45, 80, 95, 30, 88]. احسب عدد الدرجات الناجحة (التي تكون >= 50) واطبع هذا العدد.",
    microLesson: {
      title: "المرور على القوائم مع الشروط",
      content: "نمر على القائمة بحلقة for، ونفحص كل عنصر بجملة if، ونزيد عداد الناجحين:\npass_count = 0\nfor s in scores:\n    if s >= 50:\n        pass_count += 1\nprint(pass_count)",
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
    nextChallengeId: "world-6-level-1"
  },

  // WORLD 6: FUNCTIONS FACTORY
  "world-6-level-1": {
    id: "world-6-level-1",
    worldId: "world-6",
    levelNumber: 1,
    title: "آلة الترحيب الذاتي",
    subtitle: "تعريف واستدعاء الدوال def",
    difficulty: "easy",
    type: "write_code",
    baseXp: 95,
    skills: ["functions", "def"],
    story: "وصلت إلى مصنع الدوال (Functions Factory)! هنا نقوم ببناء آلات برمجية يعاد استخدامها. عرف دالة باسم greet تأخذ معاملاً name وتطبع f'Hello {name}'، ثم استدعها بالاسم 'Hero'.",
    microLesson: {
      title: "بناء الدوال def",
      content: "الدالة هي كتلة برمجية يعاد استخدامها وتأخذ مدخلات وتنفذ مهمة محددة:\ndef say_hi(name):\n    print(f'Hi {name}')\nsay_hi('Ali')",
      exampleCode: "def add_one(x):\n    print(x + 1)\nadd_one(5)"
    },
    starterCode: '# عرف دالة greet(name) واستدعها بـ Hero\n',
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
    levelNumber: 2,
    title: "محرك حساب المساحات",
    subtitle: "إرجاع القيم باستخدام return",
    difficulty: "medium",
    type: "write_code",
    baseXp: 100,
    skills: ["return", "functions"],
    story: "عرف دالة اسمها calculate_area تأخذ العرض width والطول height وترجع (return) مساحة المستطيل width * height. ثم اطبع ناتج استدعائها بالقيم 5 و 4.",
    microLesson: {
      title: "الفرق بين print و return",
      content: "print تعرض النتيجة على الشاشة فقط، أما return فتعيد القيمة المحسوبة لاستخدامها في حسابات أخرى:\ndef square(n):\n    return n * n\nresult = square(4)\nprint(result)",
      exampleCode: "def mult(a, b):\n    return a * b\nprint(mult(3, 4))"
    },
    starterCode: '# عرف calculate_area واجعلها ترجع width * height ثم اطبع ناتج 5 و 4\n',
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
    levelNumber: 3,
    title: "صائد الأخطاء: return المنسية",
    subtitle: "صائد الأخطاء: الدالة تعيد None!",
    difficulty: "medium",
    type: "fix_code",
    baseXp: 95,
    skills: ["debugging", "return_none"],
    story: "الدالة التالية تحسب ضعف الرقم، لكن المبرمج نسي كلمة return فصارت ترجع None! أصلح الدالة لترجع القيمة الصحيحة ليطبع 100.",
    microLesson: {
      title: "لماذا تظهر None؟",
      content: "إذا لم تستخدم كلمة return داخل الدالة في بايثون، فإن الدالة ترجع القيمة الخاصة None تلقائياً!",
      exampleCode: "def bad():\n    x = 10\n# bad() تعيد None\ndef good():\n    return 10"
    },
    starterCode: "def double_number(x):\n    # أصلح السطر التالي بإرجاع القيمة بدلاً من طباعتها\n    result = x * 2\n\nval = double_number(50)\nprint(val)\n",
    requirements: [
      "أضف return result داخل الدالة",
      "تأكد أن الناتج المطبوع هو 100"
    ],
    expectedOutput: "100",
    hints: [
      "ضع return result داخل الدالة double_number"
    ],
    nextChallengeId: "world-6-level-4"
  },
  "world-6-level-4": {
    id: "world-6-level-4",
    worldId: "world-6",
    levelNumber: 4,
    title: "👑 كبير مهندسي المصنع",
    subtitle: "تحدي الزعيم: دالة فاحص الأرقام الزوجية",
    difficulty: "boss",
    type: "boss",
    baseXp: 260,
    skills: ["functions", "modulo", "booleans"],
    story: "كبير مهندسي المصنع يتحداك لبناء دالة ذكية is_even(n) ترجع True إذا كان الرقم زوجياً و False إذا كان فردياً (باستخدام n % 2 == 0). ثم اطبع ناتج استدعائها للرقم 10 ثم للرقم 7 في سطرين.",
    microLesson: {
      title: "عامل باقي القسمة Modulo %",
      content: "الرقم الزوجي يقبل القسمة على 2 بدون باقٍ، أي n % 2 == 0:\ndef is_even(n):\n    return n % 2 == 0",
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
    nextChallengeId: "world-7-level-1"
  },

  // WORLD 7: OOP CASTLE
  "world-7-level-1": {
    id: "world-7-level-1",
    worldId: "world-7",
    levelNumber: 1,
    title: "درع الفارس",
    subtitle: "بناء أول كائن وفئة Class & Object",
    difficulty: "medium",
    type: "write_code",
    baseXp: 110,
    skills: ["classes", "objects", "init"],
    story: "أهلاً بك في قلعة الكائنات (OOP Castle)! أنشئ فئة (Class) باسم Player تمتلك دالة بناء __init__ تأخذ name و health. أنشئ كائناً باسم p1 بالاسم 'Knight' والصحة 100 واطبع p1.name.",
    microLesson: {
      title: "الفئات والكائنات Classes & Objects",
      content: "الفئة هي قالب لبناء كائنات ذات خصائص محددة:\nclass Cat:\n    def __init__(self, name):\n        self.name = name\nc = Cat('Kitty')\nprint(c.name)",
      exampleCode: "class Car:\n    def __init__(self, model):\n        self.model = model\nmy_car = Car('Toyota')\nprint(my_car.model)"
    },
    starterCode: '# أنشئ class Player واطبع اسم اللاعب Knight\n',
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
    levelNumber: 2,
    title: "مهارة الهجوم السحري",
    subtitle: "إضافة دوال للفئة Methods",
    difficulty: "medium",
    type: "write_code",
    baseXp: 120,
    skills: ["methods", "self"],
    story: "أضف دالة اسمها attack داخل فئة Player تطبع f'{self.name} attacks!'. أنشئ كائناً بالاسم 'Wizard' واستدعِ دالة attack الخاصة به.",
    microLesson: {
      title: "دوال الكائنات Methods",
      content: "الدوال داخل الفئات تسمى Methods ويجب أن يكون معامِلها الأول دائماً هو self للإشارة للكائن الحالي:\nclass Dog:\n    def bark(self):\n        print('Woof!')",
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
    levelNumber: 3,
    title: "صائد الأخطاء: سحر self المفقود",
    subtitle: "صائد الأخطاء: نسيان self في دالة البناء",
    difficulty: "hard",
    type: "fix_code",
    baseXp: 120,
    skills: ["debugging", "self_scope"],
    story: "نسي المبرمج ربط الخاصية بالكائن باستخدام self.power، فتسبب في عدم حفظ الخاصية! أصلح الكود ليتم تخزين self.power = power ويطبع القوة 50.",
    microLesson: {
      title: "أهمية self.",
      content: "المتغيرات داخل __init__ تكون محلية وتنتهي عند انتهاء الدالة، ما لم نربطها بالكائن باستخدام self.property = value!",
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
    levelNumber: 4,
    title: "👑 تنين البرمجة الكائنية الأسطوري",
    subtitle: "تحدي الزعيم: معركة الفئات التفاعلية",
    difficulty: "boss",
    type: "boss",
    baseXp: 300,
    skills: ["oop", "methods", "state_mutation"],
    story: "تنين القلعة يختبر فهمك الكامل! أنشئ فئة Dragon لها خاصية health = 100، ودالة take_damage(self, amount) تنقص مقدار الضرر من الصحة وتطبع الصحة المتبقية f'Dragon Health: {self.health}'. أنشئ التنين وسبب له ضرراً بقيمة 30!",
    microLesson: {
      title: "تعديل حالة الكائن",
      content: "تستطيع دوال الكائنات تعديل خصائص الكائن نفسه:\ndef take_damage(self, amount):\n    self.health -= amount",
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
    nextChallengeId: "world-8-level-1"
  },

  // WORLD 8: FINAL ARENA
  "world-8-level-1": {
    id: "world-8-level-1",
    worldId: "world-8",
    levelNumber: 1,
    title: "محلل درجات الطلاب الذكي",
    subtitle: "مشروع مصغر: دمج القوائم وحساب المتوسطات",
    difficulty: "hard",
    type: "write_code",
    baseXp: 200,
    skills: ["integration", "math", "loops", "lists"],
    story: "أهلاً بك في حلبة الأبطال (Final Arena)! لديك قائمة درجات طلاب grades = [70, 85, 90, 75]. احسب متوسط الدرجات (مجموع الدرجات مقسوماً على عددها len) واطبع بالصيغة: f'Average: {avg}' مع العلم أن الناتج هو 80.0.",
    microLesson: {
      title: "المشروع الختامي - الجزء 1",
      content: "تطبيق عملي يجمع القوائم وحساب المجموع sum أو التكرار مع القسمة لإخراج المتوسط الإحصائي.",
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
    levelNumber: 2,
    title: "نظام إدارة المهام البرمجية",
    subtitle: "مشروع مصغر: دوال إدارة المهام والتكرار",
    difficulty: "hard",
    type: "write_code",
    baseXp: 250,
    skills: ["lists", "functions", "formatting"],
    story: "اكتب برنامجاً يدير مهام اليوم: عرف دالة display_tasks(tasks) تمر على القائمة وتطبع كل مهمة مسبوقة برقمها الترتيبي بدءاً من 1: f'{index}. {task}'. استدعها بقائمة ['Study', 'Code', 'Play'].",
    microLesson: {
      title: "ترقيم العناصر",
      content: "يمكنك استخدام عداد أو enumerate(tasks, 1) لترقيم العناصر من 1:\nfor i, task in enumerate(tasks, 1):\n    print(f'{i}. {task}')",
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
    levelNumber: 3,
    title: "🏆 بطل بايثون الأسطوري",
    subtitle: "تحدي التخرج النهائي: محرك معركة أبطال بايثون",
    difficulty: "boss",
    type: "boss",
    baseXp: 500,
    skills: ["mastery", "oop", "algorithms", "final_project"],
    story: "المعركة الختامية لمغامرة بايثون! اكتب برنامجاً متكاملاً يعرف class Hero بالاسم hero_name والصحة health. يمتلك دالة heal(amount) تزيد الصحة، ودالة status() تطبع f'{self.hero_name} - HP: {self.health}'. أنشئ بطلاً بالاسم 'Python Hero' وصحة 80، ثم عالجه بـ 20 نقطة، ثم اطبع حالته status()!",
    microLesson: {
      title: "تتويج بطل بايثون",
      content: "لقد أتقنت المتغيرات، والشروط، والحلقات، والقوائم، والدوال، والكائنات البرمجية! اجمع كل مهاراتك لاجتياز التحدي الأخير وتتويجك بلقب Python Hero.",
      exampleCode: "class Hero:\n    # بناء الفئة والدوال واستدعاؤها"
    },
    starterCode: "# ابنِ فئة Hero ونفذ متطلبات المعركة الختامية\n",
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
    nextChallengeId: null
  }
};

// ========================================================
// 5 PROGRESSIVE PROBLEM SOLVING LEVELS CONFIGURATION
// ========================================================
export const PROBLEM_SOLVING_LEVELS_CONFIG = [
  {
    level: 1,
    id: "level-1",
    title: "المستوى الأول: مبتدئ (Beginner)",
    shortTitle: "Level 1: Beginner",
    badge: "Level 1",
    difficulty: "easy",
    color: "#10b981",
    icon: "🌱",
    concepts: ["Variables", "Data Types", "Input / Output", "Operators", "Basic Conditions"],
    description: "أسئلة تأسيسية تركز على إتقان المتغيرات، أنواع البيانات، الإدخال والإخراج، والعمليات الحسابية والشروط الأساسية.",
    pointsPerProblem: 10,
    completionBonus: 50
  },
  {
    level: 2,
    id: "level-2",
    title: "المستوى الثاني: سهل (Easy)",
    shortTitle: "Level 2: Easy",
    badge: "Level 2",
    difficulty: "easy",
    color: "#3b82f6",
    icon: "⚡",
    concepts: ["if / elif / else", "for loops", "while loops", "Basic Strings", "Basic Lists"],
    description: "مسائل تدريبية على اتخاذ القرارات وحلقات التكرار والتعامل المباشر مع النصوص والقوائم البسيطة.",
    pointsPerProblem: 10,
    completionBonus: 75
  },
  {
    level: 3,
    id: "level-3",
    title: "المستوى الثالث: متوسط (Intermediate)",
    shortTitle: "Level 3: Intermediate",
    badge: "Level 3",
    difficulty: "medium",
    color: "#f59e0b",
    icon: "🔥",
    concepts: ["Nested loops", "Lists & Dicts", "Sets & Tuples", "String Manipulation", "Functions"],
    description: "تحديات تجمع أكثر من مفهوم معاً: هياكل البيانات المترابطة، القواميس، الدوال، والبحث الذكي.",
    pointsPerProblem: 25,
    completionBonus: 100
  },
  {
    level: 4,
    id: "level-4",
    title: "المستوى الرابع: متقدم (Advanced)",
    shortTitle: "Level 4: Advanced",
    badge: "Level 4",
    difficulty: "hard",
    color: "#8b5cf6",
    icon: "🧠",
    concepts: ["Algorithms", "Binary Search", "Custom Sorting", "Recursion", "Data Optimization"],
    description: "مسائل خوارزمية وتفكير منطقي عميق: البحث، الترتيب اليدوي، الاستدعاء الذاتي، واكتشاف الأنماط.",
    pointsPerProblem: 50,
    completionBonus: 150
  },
  {
    level: 5,
    id: "level-5",
    title: "المستوى الخامس: خبير / تحدي (Challenge / Expert)",
    shortTitle: "Level 5: Expert",
    badge: "Level 5",
    difficulty: "expert",
    color: "#ef4444",
    icon: "💎",
    concepts: ["Advanced Algorithms", "Edge Cases", "Time & Space Complexity", "Optimization", "Multi-concept"],
    description: "تحديات برمجية قوية مخصصة للنخبة، تركز على الكفاءة الزمنية والمكانية والحالات الحدية (Edge Cases).",
    pointsPerProblem: 100,
    completionBonus: 250
  }
];

// ========================================================
// 25 REAL CODING PROBLEMS ACROSS THE 5 LEVELS
// ========================================================
export const PROBLEM_SOLVING_CHALLENGES: Record<string, any> = {
  // ------------------------------------------------------
  // LEVEL 1: BEGINNER (Variables, Types, IO, Operators, Conditions)
  // ------------------------------------------------------
  "prob-l1-sum": {
    id: "prob-l1-sum",
    title: "مجموع رقمين (Sum of Two Numbers)",
    level: 1,
    difficulty: "easy",
    points: 10,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["variables", "input", "arithmetic"],
    description: "اكتب برنامجاً بلغة بايثون يستقبل رقمين صحيحين (كل رقم في سطر مستقل) ويطبع ناتج جمعهما فقط.",
    inputDescription: "سطران: السطر الأول يحتوي على العدد الصحيح a، والسطر الثاني يحتوي على العدد الصحيح b.",
    outputDescription: "اطبع عدداً صحيحاً واحداً يمثل المجموع a + b.",
    examples: [
      { input: "5\n7", output: "12", explanation: "5 + 7 = 12" },
      { input: "-3\n8", output: "5", explanation: "-3 + 8 = 5" }
    ],
    constraints: ["-10^5 <= a, b <= 10^5"],
    publicTestCases: [
      { input: "5\n7", expectedOutput: "12", description: "جمع عددين موجبين" },
      { input: "-3\n8", expectedOutput: "5", description: "جمع عدد سالب وعدد موجب" }
    ],
    hiddenTestCases: [
      { input: "0\n0", expectedOutput: "0" },
      { input: "150\n350", expectedOutput: "500" },
      { input: "-20\n-30", expectedOutput: "-50" }
    ],
    starterCode: "# اقرأ رقمين واطبع مجموعهما\na = int(input())\nb = int(input())\nprint(a + b)\n"
  },

  "prob-l1-even-odd": {
    id: "prob-l1-even-odd",
    title: "فاحص الرقم الزوجي والفردي (Even or Odd)",
    level: 1,
    difficulty: "easy",
    points: 10,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["conditions", "modulus", "input"],
    description: "اكتب برنامجاً يستقبل رقماً صحيحاً n. إذا كان الرقم زوجياً اطبع كلمة 'Even'، وإذا كان فردياً اطبع كلمة 'Odd'.",
    inputDescription: "سطر واحد يحتوي على عدد صحيح n.",
    outputDescription: "اطبع 'Even' أو 'Odd' بدقة.",
    examples: [
      { input: "4", output: "Even", explanation: "4 يقبل القسمة على 2 بدون باقٍ فهو زوجي." },
      { input: "7", output: "Odd", explanation: "7 عدد فردي." }
    ],
    constraints: ["-10^6 <= n <= 10^6"],
    publicTestCases: [
      { input: "4", expectedOutput: "Even", description: "اختبار عدد زوجي موجب" },
      { input: "7", expectedOutput: "Odd", description: "اختبار عدد فردي موجب" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "Even" },
      { input: "-5", expectedOutput: "Odd" },
      { input: "1000", expectedOutput: "Even" }
    ],
    starterCode: "# اقرأ رقماً وافحص هل هو زوجي أم فردي\nn = int(input())\nif n % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')\n"
  },

  "prob-l1-temp-converter": {
    id: "prob-l1-temp-converter",
    title: "تحويل درجة الحرارة (Temperature Converter)",
    level: 1,
    difficulty: "easy",
    points: 10,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["math", "floats", "formatting"],
    description: "اكتب برنامجاً يستقبل درجة الحرارة بالسيليزيوس C، ويحولها إلى فهرنهايت F وفق القانون: F = (C * 9/5) + 32. اطبع الناتج كعدد عشري بدقة منزلة واحدة.",
    inputDescription: "عدد عشري أو صحيح يمثل درجة الحرارة المئوية C.",
    outputDescription: "درجة الحرارة بالفهرنهايت F.",
    examples: [
      { input: "0", output: "32.0", explanation: "(0 * 9/5) + 32 = 32.0" },
      { input: "100", output: "212.0", explanation: "(100 * 9/5) + 32 = 212.0" }
    ],
    constraints: ["-273.15 <= C <= 1000"],
    publicTestCases: [
      { input: "0", expectedOutput: "32.0", description: "درجة تجمد الماء" },
      { input: "100", expectedOutput: "212.0", description: "درجة غليان الماء" }
    ],
    hiddenTestCases: [
      { input: "25", expectedOutput: "77.0" },
      { input: "-40", expectedOutput: "-40.0" },
      { input: "37", expectedOutput: "98.6" }
    ],
    starterCode: "c = float(input())\nf = (c * 9/5) + 32\nprint(f'{f:.1f}')\n"
  },

  "prob-l1-rect-area": {
    id: "prob-l1-rect-area",
    title: "مساحة ومحيط المستطيل (Rectangle Area & Perimeter)",
    level: 1,
    difficulty: "easy",
    points: 10,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["geometry", "math", "formatting"],
    description: "اكتب برنامجاً يستقبل طول المستطيل L وعرضه W في سطرين منفصلين، ويطبع المساحة والمحيط بالصيغة:\nArea: X\nPerimeter: Y",
    inputDescription: "سطران يحتويان على عددين صحيحين موجبين L و W.",
    outputDescription: "سطران بالصيغة المحددة.",
    examples: [
      { input: "5\n4", output: "Area: 20\nPerimeter: 18", explanation: "المساحة = 5*4=20، المحيط = 2*(5+4)=18" }
    ],
    constraints: ["1 <= L, W <= 10^4"],
    publicTestCases: [
      { input: "5\n4", expectedOutput: "Area: 20\nPerimeter: 18", description: "مستطيل 5x4" }
    ],
    hiddenTestCases: [
      { input: "10\n10", expectedOutput: "Area: 100\nPerimeter: 40" },
      { input: "7\n3", expectedOutput: "Area: 21\nPerimeter: 20" }
    ],
    starterCode: "l = int(input())\nw = int(input())\nprint(f'Area: {l * w}')\nprint(f'Perimeter: {2 * (l + w)}')\n"
  },

  "prob-l1-average": {
    id: "prob-l1-average",
    title: "متوسط ثلاثة أرقام (Average of Three Numbers)",
    level: 1,
    difficulty: "easy",
    points: 10,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["math", "division", "rounding"],
    description: "اكتب برنامجاً يستقبل 3 أعداد صحيحة (كل عدد في سطر) ويطبع متوسطها الحسابي كعدد عشري.",
    inputDescription: "3 أسطر تحتوي على 3 أعداد صحيحة a, b, c.",
    outputDescription: "المتوسط الحسابي للقيم الثلاث.",
    examples: [
      { input: "10\n20\n30", output: "20.0", explanation: "(10+20+30)/3 = 20.0" }
    ],
    constraints: ["-10^4 <= a, b, c <= 10^4"],
    publicTestCases: [
      { input: "10\n20\n30", expectedOutput: "20.0", description: "أعداد متدرجة" }
    ],
    hiddenTestCases: [
      { input: "5\n5\n5", expectedOutput: "5.0" },
      { input: "1\n2\n3", expectedOutput: "2.0" },
      { input: "14\n18\n22", expectedOutput: "18.0" }
    ],
    starterCode: "a = int(input())\nb = int(input())\nc = int(input())\navg = (a + b + c) / 3\nprint(f'{avg:.1f}')\n"
  },

  // ------------------------------------------------------
  // LEVEL 2: EASY (Conditions, Loops, Strings, Lists)
  // ------------------------------------------------------
  "prob-l2-max-num": {
    id: "prob-l2-max-num",
    title: "إيجاد أكبر رقم (Find the Maximum Number)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["logic", "comparisons", "nested_conditions"],
    description: "اكتب برنامجاً يستقبل 3 أرقام صحيحة في 3 أسطر منفصلة، ويطبع الرقم الأكبر بينها بدون استخدام الدالة الجاهزة max().",
    inputDescription: "3 أسطر تحتوي على 3 أرقام صحيحة.",
    outputDescription: "العدد الأكبر بين الأعداد الثلاثة.",
    examples: [
      { input: "12\n45\n23", output: "45", explanation: "45 هو الأكبر بين 12 و 45 و 23." }
    ],
    constraints: ["-10^5 <= x, y, z <= 10^5"],
    publicTestCases: [
      { input: "12\n45\n23", expectedOutput: "45", description: "العدد الثاني هو الأكبر" }
    ],
    hiddenTestCases: [
      { input: "-5\n-1\n-10", expectedOutput: "-1" },
      { input: "100\n100\n50", expectedOutput: "100" }
    ],
    starterCode: "a = int(input())\nb = int(input())\nc = int(input())\n# أوجد الأكبر دون استخدام max()\n"
  },

  "prob-l2-sum-digits": {
    id: "prob-l2-sum-digits",
    title: "مجموع الأرقام الموجبة (Sum of Positive Numbers)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["loops", "filtering", "lists"],
    description: "اقرأ سطراً واحداً يحتوي على أرقام صحيحة مفصولة بمسافات. احسب واطبع مجموع الأرقام الموجبة فقط (الأرقام الأكبر تماماً من الصفر).",
    inputDescription: "سطر من الأرقام الصحيحة مفصولة بمسافة.",
    outputDescription: "مجموع الأرقام الموجبة (0 إذا لم توجد أرقام موجبة).",
    examples: [
      { input: "1 -2 3 4 -5", output: "8", explanation: "الأرقام الموجبة هي 1 و 3 و 4، مجموعها = 8." },
      { input: "-1 -2 -3", output: "0", explanation: "لا توجد أرقام موجبة فالناتج 0." }
    ],
    constraints: ["طول القائمة بين 1 و 100 عنصر"],
    publicTestCases: [
      { input: "1 -2 3 4 -5", expectedOutput: "8", description: "أرقام موجبة وسالبة" },
      { input: "-1 -2 -3", expectedOutput: "0", description: "كل الأرقام سالبة" }
    ],
    hiddenTestCases: [
      { input: "10 20 30", expectedOutput: "60" },
      { input: "0 5 0 15 -10", expectedOutput: "20" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\npos_sum = sum(x for x in nums if x > 0)\nprint(pos_sum)\n"
  },

  "prob-l2-count-char": {
    id: "prob-l2-count-char",
    title: "عد تكرار حرف في نص (Count Character Occurrences)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["strings", "loops", "counters"],
    description: "اكتب برنامجاً يستقبل نصاً في السطر الأول، وحرفاً مفرداً في السطر الثاني، ثم يطبع عدد مرات ظهور هذا الحرف داخل النص.",
    inputDescription: "السطر الأول: نص S، السطر الثاني: حرف C.",
    outputDescription: "عدد تكرار الحرف C في النص S.",
    examples: [
      { input: "programming\nm", output: "2", explanation: "حرف m ظهر مرتين في كلمة programming." }
    ],
    constraints: ["طول النص S لا يتجاوز 1000 حرف"],
    publicTestCases: [
      { input: "programming\nm", expectedOutput: "2", description: "حرف متكرر" }
    ],
    hiddenTestCases: [
      { input: "hello world\nl", expectedOutput: "3" },
      { input: "python\nz", expectedOutput: "0" }
    ],
    starterCode: "text = input()\nchar = input()\ncount = sum(1 for c in text if c == char)\nprint(count)\n"
  },

  "prob-l2-reverse-string": {
    id: "prob-l2-reverse-string",
    title: "عكس النص البرمجي (Reverse String)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["strings", "slicing", "indexing"],
    description: "اكتب برنامجاً يستقبل نصاً ويطبع حروفه معكوسة بالكامل.",
    inputDescription: "سطر واحد يحتوي على نص.",
    outputDescription: "النص بعد عكس ترتيب حروفه.",
    examples: [
      { input: "python", output: "nohtyp", explanation: "عكس كلمة python." }
    ],
    constraints: ["طول النص بين 1 و 500 حرف"],
    publicTestCases: [
      { input: "python", expectedOutput: "nohtyp", description: "كلمة بايثون" }
    ],
    hiddenTestCases: [
      { input: "racecar", expectedOutput: "racecar" },
      { input: "12345", expectedOutput: "54321" }
    ],
    starterCode: "text = input()\nprint(text[::-1])\n"
  },

  "prob-l2-count-evens": {
    id: "prob-l2-count-evens",
    title: "عد الأرقام الزوجية (Count Even Numbers)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["lists", "modulus", "loops"],
    description: "اقرأ قائمة أرقام صحيحة مفصولة بمسافات واطبع عدد الأرقام الزوجية الموجودة فيها.",
    inputDescription: "سطر يحتوي على أرقام صحيحة مفصولة بمسافة.",
    outputDescription: "عدد الأرقام الزوجية.",
    examples: [
      { input: "1 2 3 4 5 6", output: "3", explanation: "الأرقام الزوجية هي 2، 4، 6 وعددها 3." }
    ],
    constraints: ["1 <= طول القائمة <= 100"],
    publicTestCases: [
      { input: "1 2 3 4 5 6", expectedOutput: "3", description: "ستة أرقام متتالية" }
    ],
    hiddenTestCases: [
      { input: "1 3 5 7", expectedOutput: "0" },
      { input: "2 4 8 10 12", expectedOutput: "5" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\nevens = sum(1 for x in nums if x % 2 == 0)\nprint(evens)\n"
  },

  // ------------------------------------------------------
  // LEVEL 3: INTERMEDIATE (Nested loops, Dicts, Sets, Functions)
  // ------------------------------------------------------
  "prob-l3-remove-duplicates": {
    id: "prob-l3-remove-duplicates",
    title: "إزالة العناصر المكررة مع الحفاظ على الترتيب (Remove Duplicates Preserving Order)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["sets", "lists", "order_preservation"],
    description: "اقرأ قائمة أرقام مفصولة بمسافات، وقم بإزالة التكرارات بحيث يتبقى أول ظهور فقط لكل رقم، واطبع القائمة الناتجة مفصولة بمسافات.",
    inputDescription: "سطر يحتوي على أرقام صحيحة.",
    outputDescription: "الأرقام الفريدة مع الحفاظ على ترتيب أول ظهور مفصولة بمسافة.",
    examples: [
      { input: "1 2 2 3 4 4 1 5", output: "1 2 3 4 5", explanation: "تم الإبقاء على أول ظهور للعناصر 1, 2, 3, 4, 5." }
    ],
    constraints: ["1 <= عدد العناصر <= 1000"],
    publicTestCases: [
      { input: "1 2 2 3 4 4 1 5", expectedOutput: "1 2 3 4 5", description: "أرقام بها تكرارات متعددة" }
    ],
    hiddenTestCases: [
      { input: "7 7 7 7", expectedOutput: "7" },
      { input: "5 4 3 2 1", expectedOutput: "5 4 3 2 1" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\nseen = set()\nresult = []\nfor x in nums:\n    if x not in seen:\n        seen.add(x)\n        result.append(x)\nprint(' '.join(map(str, result)))\n"
  },

  "prob-l3-most-frequent": {
    id: "prob-l3-most-frequent",
    title: "أكثر عنصر تكراراً في القائمة (Most Frequent Element)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["dictionaries", "frequency_map", "tuples"],
    description: "اقرأ أرقاماً مفصولة بمسافات. أوجد العنصر الذي تكرر أكبر عدد من المرات واطبع النتيجة بالصيغة:\nElement: X, Count: Y",
    inputDescription: "سطر أرقام صحيحة مفصولة بمسافات.",
    outputDescription: "Element: X, Count: Y (إذا تساوى أكثر من عنصر، اختر أصغر عنصر قيمة).",
    examples: [
      { input: "1 3 2 3 4 3 5", output: "Element: 3, Count: 3", explanation: "الرقم 3 تكرر 3 مرات وهو الأكثر تكراراً." }
    ],
    constraints: ["1 <= عدد العناصر <= 1000"],
    publicTestCases: [
      { input: "1 3 2 3 4 3 5", expectedOutput: "Element: 3, Count: 3", description: "عنصر واضح الأكثر تكراراً" }
    ],
    hiddenTestCases: [
      { input: "9 9 1 1 9", expectedOutput: "Element: 9, Count: 3" },
      { input: "4", expectedOutput: "Element: 4, Count: 1" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\ncounts = {}\nfor x in nums:\n    counts[x] = counts.get(x, 0) + 1\nbest_elem = None\nmax_c = -1\nfor elem in sorted(counts.keys()):\n    if counts[elem] > max_c:\n        max_c = counts[elem]\n        best_elem = elem\nprint(f'Element: {best_elem}, Count: {max_c}')\n"
  },

  "prob-l3-word-frequency": {
    id: "prob-l3-word-frequency",
    title: "تحليل تكرار الكلمات (Word Frequency Counter)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["strings", "dictionaries", "sorting"],
    description: "اقرأ جملة باللغة الإنجليزية، وقم بحساب تكرار كل كلمة، ثم اطبع كل كلمة وتكرارها بالصيغة 'word: count' مرتبة أبجدياً حسب اسم الكلمة تصاعدياً.",
    inputDescription: "سطر واحد يحتوي على كلمات مفصولة بمسافات.",
    outputDescription: "أسطر تمثل كل كلمة وعدد تكرارها مرتبة أبجدياً.",
    examples: [
      { input: "apple banana apple orange banana apple", output: "apple: 3\nbanana: 2\norange: 1", explanation: "apple تكررت 3 مرات، banana مرتان، orange مرة واحدة." }
    ],
    constraints: ["جميع الكلمات بحروف صغيرة (lowercase)"],
    publicTestCases: [
      { input: "apple banana apple orange banana apple", expectedOutput: "apple: 3\nbanana: 2\norange: 1", description: "ثلاث فواكه متكررة" }
    ],
    hiddenTestCases: [
      { input: "cat dog cat", expectedOutput: "cat: 2\ndog: 1" },
      { input: "one", expectedOutput: "one: 1" }
    ],
    starterCode: "words = input().split()\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\nfor w in sorted(counts.keys()):\n    print(f'{w}: {counts[w]}')\n"
  },

  "prob-l3-student-manager": {
    id: "prob-l3-student-manager",
    title: "نظام تصفية الطلاب المتفوقين (Student Records Filter)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["data_structures", "dictionaries", "filtering"],
    description: "اقرأ عدد الطلاب N في السطر الأول، ثم N أسطر يحتوي كل سطر على اسم الطالب ودرجته مفصولين بمسافة. اطبع أسماء ودرجات الطلاب الناجحين (الذين حصلوا على 50 أو أكثر) بنفس ترتيب الإدخال، بالصيغة 'Name: Score'. إذا لم ينجح أحد، اطبع 'None'.",
    inputDescription: "السطر الأول عدد صحيح N، يليه N أسطر من 'الاسم الدرجة'.",
    outputDescription: "قائمة الطلاب الناجحين أو 'None'.",
    examples: [
      { input: "3\nAhmed 85\nSara 45\nOmar 92", output: "Ahmed: 85\nOmar: 92", explanation: "سارة درجتها 45 راسبة، أما أحمد وعمر فدرجاتهما أعلى من 50." }
    ],
    constraints: ["1 <= N <= 100", "0 <= Score <= 100"],
    publicTestCases: [
      { input: "3\nAhmed 85\nSara 45\nOmar 92", expectedOutput: "Ahmed: 85\nOmar: 92", description: "طالبان ناجحان وطالب راسب" }
    ],
    hiddenTestCases: [
      { input: "2\nAli 30\nKhaled 49", expectedOutput: "None" },
      { input: "2\nNour 100\nZaid 50", expectedOutput: "Nour: 100\nZaid: 50" }
    ],
    starterCode: "n = int(input())\npassed = []\nfor _ in range(n):\n    parts = input().split()\n    name = parts[0]\n    score = int(parts[1])\n    if score >= 50:\n        passed.append(f'{name}: {score}')\nif passed:\n    for p in passed:\n        print(p)\nelse:\n    print('None')\n"
  },

  "prob-l3-filter-search": {
    id: "prob-l3-filter-search",
    title: "البحث والتصفية بالقسمة (Divisible Filter Search)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["functions", "lists", "modulus"],
    description: "اقرأ قائمة أرقام في السطر الأول، وقيمة القاسم K في السطر الثاني. اطبع جميع الأرقام التي تقبل القسمة على K بدون باقٍ مفصولة بمسافة. إذا لم يوجد أي رقم يقبل القسمة، اطبع 'None'.",
    inputDescription: "السطر 1: أرقام صحيحة مفصولة بمسافات. السطر 2: القاسم K.",
    outputDescription: "الأرقام التي تقبل القسمة على K أو 'None'.",
    examples: [
      { input: "12 15 20 25 30\n5", output: "15 20 25 30", explanation: "الأرقام التي تقبل القسمة على 5 هي 15، 20، 25، 30." }
    ],
    constraints: ["K >= 1"],
    publicTestCases: [
      { input: "12 15 20 25 30\n5", expectedOutput: "15 20 25 30", description: "أربعة أرقام تقبل القسمة على 5" }
    ],
    hiddenTestCases: [
      { input: "7 11 13\n3", expectedOutput: "None" },
      { input: "4 8 12 16\n4", expectedOutput: "4 8 12 16" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\nk = int(input())\nfiltered = [x for x in nums if x % k == 0]\nif filtered:\n    print(' '.join(map(str, filtered)))\nelse:\n    print('None')\n"
  },

  // ------------------------------------------------------
  // LEVEL 4: ADVANCED (Algorithms, Searching, Sorting, Recursion)
  // ------------------------------------------------------
  "prob-l4-binary-search": {
    id: "prob-l4-binary-search",
    title: "البحث الثنائي (Binary Search Algorithm)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 200,
    timeLimit: 3000,
    skills: ["binary_search", "algorithms", "logarithmic_time"],
    description: "اقرأ مصفوفة مرتبة تصاعدياً في السطر الأول، والهدف Target في السطر الثاني. طبق خوارزمية البحث الثنائي (Binary Search) واطبع الفهرس (0-indexed) للهدف، أو اطبع -1 إذا لم يكن موجوداً.",
    inputDescription: "السطر 1: أرقام مرتبة تصاعدياً. السطر 2: العدد المطلوب البحث عنه Target.",
    outputDescription: "فهرس العنصر أو -1.",
    examples: [
      { input: "2 5 8 12 16 23 38 56 72 91\n23", output: "5", explanation: "العدد 23 يقع في الفهرس رقم 5." },
      { input: "1 3 5 7 9\n4", output: "-1", explanation: "العدد 4 غير موجود في القائمة." }
    ],
    constraints: ["1 <= طول القائمة <= 10^5", "العناصر مرتبة تصاعدياً بشكل مؤكد"],
    publicTestCases: [
      { input: "2 5 8 12 16 23 38 56 72 91\n23", expectedOutput: "5", description: "عنصر موجود في المنتصف" },
      { input: "1 3 5 7 9\n4", expectedOutput: "-1", description: "عنصر غير موجود" }
    ],
    hiddenTestCases: [
      { input: "10 20 30\n10", expectedOutput: "0" },
      { input: "10 20 30\n30", expectedOutput: "2" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\ntarget = int(input())\n\nleft, right = 0, len(nums) - 1\nans = -1\nwhile left <= right:\n    mid = (left + right) // 2\n    if nums[mid] == target:\n        ans = mid\n        break\n    elif nums[mid] < target:\n        left = mid + 1\n    else:\n        right = mid - 1\nprint(ans)\n"
  },

  "prob-l4-custom-sort": {
    id: "prob-l4-custom-sort",
    title: "الترتيب بدون الدوال الجاهزة (Custom Sort Algorithm)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 200,
    timeLimit: 3000,
    skills: ["sorting", "bubble_sort", "selection_sort"],
    description: "اقرأ قائمة أرقام صحيحة مفصولة بمسافات. قم بترتيبها تصاعدياً باستخدام خوارزمية ترتيب يدوية (مثل Bubble Sort أو Selection Sort) دون استخدام دالتي sort() أو sorted() نهائياً. اطبع القائمة المرتبة مفصولة بمسافات.",
    inputDescription: "سطر من الأرقام الصحيحة غير المرتبة.",
    outputDescription: "الأرقام مرتبة تصاعدياً مفصولة بمسافة.",
    examples: [
      { input: "64 25 12 22 11", output: "11 12 22 25 64", explanation: "تم الترتيب تصاعدياً من الأصغر للأكبر." }
    ],
    constraints: ["1 <= عدد العناصر <= 500", "يمنع استخدام sort أو sorted في كود الحل"],
    forbiddenPatterns: [
      { regex: "\\.sort\\s*\\(", messageAr: "ممنوع استخدام الدالة المدمجة .sort() - الهدف هو كتابة خوارزمية ترتيب يدوية." },
      { regex: "sorted\\s*\\(", messageAr: "ممنوع استخدام دالة sorted() الجاهزة." }
    ],
    publicTestCases: [
      { input: "64 25 12 22 11", expectedOutput: "11 12 22 25 64", description: "خمسة أرقام عشوائية" }
    ],
    hiddenTestCases: [
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "-3 0 -10 8", expectedOutput: "-10 -3 0 8" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\nn = len(nums)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if nums[j] > nums[j + 1]:\n            nums[j], nums[j + 1] = nums[j + 1], nums[j]\nprint(' '.join(map(str, nums)))\n"
  },

  "prob-l4-fibonacci-recursive": {
    id: "prob-l4-fibonacci-recursive",
    title: "متتالية فيبوناتشي المحسنة (Fibonacci with Memoization)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 200,
    timeLimit: 3000,
    skills: ["recursion", "memoization", "dynamic_programming"],
    description: "اكتب دالة استدعاء ذاتي (Recursion) لحساب الرقم n في متتالية فيبوناتشي مع تطبيق الـ Memoization لتفادي التكرار والبطء الزمني. تذكر: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).",
    inputDescription: "عدد صحيح موجب n.",
    outputDescription: "قيمة F(n).",
    examples: [
      { input: "7", output: "13", explanation: "F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, F(7)=13." }
    ],
    constraints: ["0 <= n <= 50"],
    publicTestCases: [
      { input: "7", expectedOutput: "13", description: "الرقم السابع" },
      { input: "10", expectedOutput: "55", description: "الرقم العاشر" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
      { input: "20", expectedOutput: "6765" }
    ],
    starterCode: "memo = {}\ndef fib(n):\n    if n <= 0: return 0\n    if n == 1: return 1\n    if n in memo: return memo[n]\n    memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]\n\nn = int(input())\nprint(fib(n))\n"
  },

  "prob-l4-palindrome-pattern": {
    id: "prob-l4-palindrome-pattern",
    title: "فحص التناظر النصي المتقدم (Advanced Palindrome Check)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 200,
    timeLimit: 3000,
    skills: ["string_manipulation", "pointers", "cleaning"],
    description: "اقرأ نصاً وافحص هل هو متناظر (Palindrome) بحيث يُقرأ من اليمين كما من اليسار، مع تجاهل جميع المسافات وعلامات الترقيم والرموز، وتجاهل حالة الأحرف (Case-insensitive). اطبع True أو False.",
    inputDescription: "سطر يحتوي على جملة نصية.",
    outputDescription: "True أو False.",
    examples: [
      { input: "A man, a plan, a canal: Panama", output: "True", explanation: "بعد تصفية الرموز تصبح 'amanaplanacanalpanama' وهي متناظرة تماماً." }
    ],
    constraints: ["1 <= طول النص <= 10^4"],
    publicTestCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "True", description: "جملة متناظرة مشهورة مع علامات ترقيم" },
      { input: "race a car", expectedOutput: "False", description: "جملة غير متناظرة" }
    ],
    hiddenTestCases: [
      { input: "Was it a car or a cat I saw?", expectedOutput: "True" },
      { input: "hello", expectedOutput: "False" }
    ],
    starterCode: "text = input()\nclean = [c.lower() for c in text if c.isalnum()]\nprint(str(clean == clean[::-1]))\n"
  },

  "prob-l4-merge-sorted": {
    id: "prob-l4-merge-sorted",
    title: "دمج قائمتين مرتبتين بكفاءة (Merge Two Sorted Lists)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 200,
    timeLimit: 3000,
    skills: ["two_pointers", "algorithms", "linear_time"],
    description: "اقرأ قائمتين من الأرقام الصحيحة المرتبة تصاعدياً في سطرين منفصلين. قم بدمجهما في قائمة واحدة مرتبة تصاعدياً بتعقيد O(N + M) باستخدام مؤشرين (Two Pointers) دون دمج القائمتين ثم استخدام دالة ترتيب. اطبع القائمة المدمجة مفصولة بمسافات.",
    inputDescription: "السطر 1: أرقام مرتبة للقائمة الأولى. السطر 2: أرقام مرتبة للقائمة الثانية.",
    outputDescription: "القائمة المدمجة مرتبة تصاعدياً.",
    examples: [
      { input: "1 3 5 7\n2 4 6 8", output: "1 2 3 4 5 6 7 8", explanation: "دمج متداخل بكفاءة خطية." }
    ],
    constraints: ["1 <= N, M <= 10^4"],
    publicTestCases: [
      { input: "1 3 5 7\n2 4 6 8", expectedOutput: "1 2 3 4 5 6 7 8", description: "قائمتان متساويتان في الطول" }
    ],
    hiddenTestCases: [
      { input: "1 2\n3 4 5", expectedOutput: "1 2 3 4 5" },
      { input: "5\n1 2 3", expectedOutput: "1 2 3 5" }
    ],
    starterCode: "a = [int(x) for x in input().split()]\nb = [int(x) for x in input().split()]\ni = j = 0\nres = []\nwhile i < len(a) and j < len(b):\n    if a[i] <= b[j]:\n        res.append(a[i])\n        i += 1\n    else:\n        res.append(b[j])\n        j += 1\nres.extend(a[i:])\nres.extend(b[j:])\nprint(' '.join(map(str, res)))\n"
  },

  // ------------------------------------------------------
  // LEVEL 5: CHALLENGE / EXPERT (Advanced DSA, Optimization, Edge Cases)
  // ------------------------------------------------------
  "prob-l5-two-sum": {
    id: "prob-l5-two-sum",
    title: "المجموع المستهدف بكفاءة خطية (Two Sum Target O(N))",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 350,
    timeLimit: 3000,
    skills: ["hash_table", "time_complexity", "optimization"],
    description: "اقرأ قائمة أرقام في السطر الأول، والقيمة المستهدفة Target في السطر الثاني. أوجد فهرسي رقمين مختلفين (i < j) بحيث يكون مجموعهما مساوياً للـ Target تماماً، وذلك بتعقيد زمني خطي O(N) باستخدام Hash Table (Dictionary). اطبع الفهرسين مفصولين بمسافة، أو اطبع 'None' إذا لم يوجد حل.",
    inputDescription: "السطر 1: أرقام صحيحة. السطر 2: العدد المستهدف Target.",
    outputDescription: "الفهرسان i j مفصولين بمسافة حيث i < j، أو 'None'.",
    examples: [
      { input: "2 7 11 15\n9", output: "0 1", explanation: "العنصر 2 في الفهرس 0 والعنصر 7 في الفهرس 1 مجموعهما = 9." },
      { input: "3 2 4\n6", output: "1 2", explanation: "العنصر 2 في الفهرس 1 والعنصر 4 في الفهرس 2 مجموعهما = 6." }
    ],
    constraints: ["2 <= طول القائمة <= 10^5", "الحل يجب أن يعمل في تعقيد زمني O(N)"],
    publicTestCases: [
      { input: "2 7 11 15\n9", expectedOutput: "0 1", description: "أول رقمين يكونان المجموع" },
      { input: "3 2 4\n6", expectedOutput: "1 2", description: "الرقم الثاني والثالث" }
    ],
    hiddenTestCases: [
      { input: "3 3\n6", expectedOutput: "0 1" },
      { input: "1 2 3\n10", expectedOutput: "None" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\ntarget = int(input())\n\nseen = {}\nfound = False\nfor j, val in enumerate(nums):\n    diff = target - val\n    if diff in seen:\n        print(f'{seen[diff]} {j}')\n        found = True\n        break\n    seen[val] = j\nif not found:\n    print('None')\n"
  },

  "prob-l5-longest-unique-substr": {
    id: "prob-l5-longest-unique-substr",
    title: "أطول نص فرعي بدون تكرار (Longest Substring Without Repeating)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 350,
    timeLimit: 3000,
    skills: ["sliding_window", "hash_map", "two_pointers"],
    description: "اقرأ نصاً S وأوجد طول أطول نص فرعي متصل (Substring) لا يحتوي على أي حرف مكرر، باستخدام خوارزمية النافذة المنزلقة (Sliding Window) بتعقيد زمني O(N). اطبع الطول فقط كعدد صحيح.",
    inputDescription: "سطر يحتوي على نص S.",
    outputDescription: "عدد صحيح يمثل طول أطول نص فرعي بدون تكرار.",
    examples: [
      { input: "abcabcbb", output: "3", explanation: "أطول نص فرعي بدون تكرار هو 'abc' بطول 3." },
      { input: "bbbbb", output: "1", explanation: "أطول نص فرعي هو 'b' بطول 1." }
    ],
    constraints: ["0 <= طول النص <= 5 * 10^4"],
    publicTestCases: [
      { input: "abcabcbb", expectedOutput: "3", description: "سلسلة حروف متكررة بنمط" },
      { input: "bbbbb", expectedOutput: "1", description: "حرف واحد مكرر بالكامل" }
    ],
    hiddenTestCases: [
      { input: "pwwkew", expectedOutput: "3" },
      { input: "abcdef", expectedOutput: "6" }
    ],
    starterCode: "s = input()\nlast_pos = {}\nstart = max_len = 0\nfor i, ch in enumerate(s):\n    if ch in last_pos and last_pos[ch] >= start:\n        start = last_pos[ch] + 1\n    last_pos[ch] = i\n    max_len = max(max_len, i - start + 1)\nprint(max_len)\n"
  },

  "prob-l5-balanced-brackets": {
    id: "prob-l5-balanced-brackets",
    title: "التحقق من توازن الأقواس (Balanced Parentheses & Stacks)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 350,
    timeLimit: 3000,
    skills: ["stack", "data_structures", "parsing"],
    description: "اقرأ نصاً يحتوي على أنواع الأقواس المختلفة '()', '[]', '{}'. تحقق هل الأقواس متوازنة تماماً (بحيث يُغلق كل قوس مفتوح بالنوع المقابل له وفي الترتيب السليم). اطبع 'Balanced' أو 'Unbalanced'.",
    inputDescription: "سطر يحتوي على سلسلة من الأقواس.",
    outputDescription: "'Balanced' أو 'Unbalanced'.",
    examples: [
      { input: "{[()]}", output: "Balanced", explanation: "جميع الأقواس متداخلة ومغلقة بترتيب صحيح." },
      { input: "{[(])}", output: "Unbalanced", explanation: "تم إغلاق القوس المربع قبل الدائري وهذا غير متوازن." }
    ],
    constraints: ["1 <= طول النص <= 10^4"],
    publicTestCases: [
      { input: "{[()]}", expectedOutput: "Balanced", description: "أقواس متوازنة تماماً" },
      { input: "{[(])}", expectedOutput: "Unbalanced", description: "أقواس متداخلة خطأ" }
    ],
    hiddenTestCases: [
      { input: "()[]{}", expectedOutput: "Balanced" },
      { input: "(", expectedOutput: "Unbalanced" },
      { input: "][", expectedOutput: "Unbalanced" }
    ],
    starterCode: "s = input()\npairs = {')': '(', ']': '[', '}': '{'}\nstack = []\nbalanced = True\nfor ch in s:\n    if ch in '([{':\n        stack.append(ch)\n    elif ch in ')]}':\n        if not stack or stack.pop() != pairs[ch]:\n            balanced = False\n            break\nif balanced and len(stack) == 0:\n    print('Balanced')\nelse:\n    print('Unbalanced')\n"
  },

  "prob-l5-max-subarray": {
    id: "prob-l5-max-subarray",
    title: "أقصى مجموع لمصفوفة فرعية (Maximum Subarray / Kadane's Algorithm)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 350,
    timeLimit: 3000,
    skills: ["kadane_algorithm", "dynamic_programming", "arrays"],
    description: "اقرأ قائمة أرقام صحيحة قد تحتوي أرقاماً موجبة وسالبة. أوجد أكبر مجموع ممكن لمصفوفة فرعية متصلة غير فارغة (Contiguous Subarray) باستخدام خوارزمية كادان (Kadane's Algorithm) بتعقيد O(N). اطبع الناتج فقط.",
    inputDescription: "سطر يحتوي على أرقام صحيحة مفصولة بمسافة.",
    outputDescription: "أقصى مجموع متصل.",
    examples: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "المصفوفة الفرعية [4, -1, 2, 1] تعطي أكبر مجموع = 6." }
    ],
    constraints: ["1 <= عدد الأرقام <= 10^5"],
    publicTestCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6", description: "مصفوفة مختلطة بمجموع أقصى 6" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "5 4 -1 7 8", expectedOutput: "23" },
      { input: "-1 -2 -3", expectedOutput: "-1" }
    ],
    starterCode: "nums = [int(x) for x in input().split()]\nmax_so_far = current_max = nums[0]\nfor x in nums[1:]:\n    current_max = max(x, current_max + x)\n    max_so_far = max(max_so_far, current_max)\nprint(max_so_far)\n"
  },

  "prob-l5-prime-factors-sieve": {
    id: "prob-l5-prime-factors-sieve",
    title: "غربال الأعداد الأولية (Sieve of Eratosthenes)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 350,
    timeLimit: 3000,
    skills: ["math", "sieve_of_eratosthenes", "number_theory"],
    description: "اقرأ عدداً صحيحاً موجبياً N. اطبع جميع الأعداد الأولية من 2 وحتى N تصاعدياً مفصولة بمسافات، باستخدام غربال إراتوستينس (Sieve of Eratosthenes) بكفاءة عالية.",
    inputDescription: "عدد صحيح N.",
    outputDescription: "الأعداد الأولية حتى N مفصولة بمسافة.",
    examples: [
      { input: "20", output: "2 3 5 7 11 13 17 19", explanation: "الأعداد الأولية الأصغر من أو تساوي 20." }
    ],
    constraints: ["2 <= N <= 10^5"],
    publicTestCases: [
      { input: "20", expectedOutput: "2 3 5 7 11 13 17 19", description: "الأوليات حتى 20" }
    ],
    hiddenTestCases: [
      { input: "2", expectedOutput: "2" },
      { input: "10", expectedOutput: "2 3 5 7" },
      { input: "30", expectedOutput: "2 3 5 7 11 13 17 19 23 29" }
    ],
    starterCode: "n = int(input())\nis_prime = [True] * (n + 1)\nis_prime[0] = is_prime[1] = False\np = 2\nwhile p * p <= n:\n    if is_prime[p]:\n        for i in range(p * p, n + 1, p):\n            is_prime[i] = False\n    p += 1\nprimes = [str(i) for i in range(2, n + 1) if is_prime[i]]\nprint(' '.join(primes))\n"
  }
};

// Merge Problem Solving challenges into main PYTHON_ADVENTURE_CHALLENGES dictionary
Object.assign(PYTHON_ADVENTURE_CHALLENGES, PROBLEM_SOLVING_CHALLENGES);


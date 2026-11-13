// scripts/generate-expansion-definitions.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const targetFile = path.join(projectRoot, "scripts/adventure-expansion-definitions.mjs");

const code = `// scripts/adventure-expansion-definitions.mjs
// Full pedagogical expansion definitions for Python Adventure:
// Worlds 1-8 (Levels 9, 10, 11) + World 9 (Levels 1 to 11) + 9 Bonus Challenges

export const WORLD_9_OBJECT = \`  {
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
  }\`;

export const PYTHON_RANKS_CODE = \`
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
\`;

export const NEW_EXPANSION_CHALLENGES = {
  // ==========================================
  // WORLD 1 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-1-level-9": {
    id: "world-1-level-9",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 9,
    title: "📊 حساب متوسط درجات الطالب والنسبة المئوية",
    englishTitle: "Student Average & Percentage Calculation",
    subtitle: "العمليات الحسابية وتنسيق الأرقام العشرية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 180,
    skills: ["arithmetic", "variables", "float_formatting"],
    story: "لديك درجات ثلاثة اختبارات: math = 85 و science = 90 و english = 95. احسب المتوسط الحسابي واطبعه بدقة منزلة عشرية واحدة بصيغة: 'Average: 90.0'.",
    microLesson: {
      concept: "حساب المتوسط وتنسيق الأرقام العشرية في بايثون",
      summary: "المتوسط الحسابي هو مجموع القيم مقسوماً على عددها. يمكنك تنسيق الناتج لمنزلة عشرية واحدة باستخدام f-string مع :.1f.",
      exampleCode: "# مثال توضيحي لمفهوم المتوسط والتنسيق:\na = 10\\nb = 20\\navg = (a + b) / 2\\nprint(f\\"Average: {avg:.1f}\\")"
    },
    starterCode: "math = 85\\nscience = 90\\nenglish = 95\\n\\n# احسب المتوسط الحسابي واطبعه بصيغة: Average: 90.0\\n",
    requirements: [
      "احسب مجموع الدرجات الثلاث واقسم على 3",
      "اطبع الناتج بدقة منزلة عشرية واحدة بالصيغة المطلوبة تماماً"
    ],
    expectedOutput: "Average: 90.0",
    hints: [
      "فكرة الحل: اجمع المتغيرات الثلاثة داخل قوسين ثم اقسم على عددها 3.",
      "للتنسيق العشري الدقيق: استخدم داخل الـ f-string الصيغة {avg:.1f} للحصول على منزلة عشرية واحدة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Average: 90.0",
        description: "حساب متوسط درجات 85 و 90 و 95"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-1-level-10"
  },

  "world-1-level-10": {
    id: "world-1-level-10",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 10,
    title: "💱 تحويل العملات وسعر الصرف البنكي المعتمد",
    englishTitle: "Bank Currency Exchange Calculator",
    subtitle: "المتغيرات والعمليات الحسابية في المعاملات المالية",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["variables", "division", "fstrings"],
    story: "عميل في البنك يمتلك مبلغ egp = 7500 جنيهاً، ويريد تحويله إلى دولارات أمريكية علماً بأن سعر صرف الدولار هو usd_rate = 50.0. احسب المبلغ بالدولار واطبعه بصيغة: 'Exchange: 150.0 USD'.",
    microLesson: {
      concept: "التحويلات المالية وقسمة الأعداد",
      summary: "لتحويل العملة المحلية إلى عملة أجنبية، نقسم المبلغ الإجمالي على سعر الصرف.",
      exampleCode: "# مثال لمفهوم التحويل المالي:\\ntotal_egp = 5000\\nrate = 50.0\\nusd = total_egp / rate\\nprint(f\\"Converted: {usd:.1f} USD\\")"
    },
    starterCode: "egp = 7500\\nusd_rate = 50.0\\n\\n# احسب المبلغ بالدولار واطبعه بالصيغة: Exchange: 150.0 USD\\n",
    requirements: [
      "اقسم مبلغ الجنيهات على سعر الصرف للحصول على الدولارات",
      "اطبع الناتج بصيغة: Exchange: 150.0 USD"
    ],
    expectedOutput: "Exchange: 150.0 USD",
    hints: [
      "فكرة الحل: المعادلة الحسابية هي قسمة egp على usd_rate.",
      "اطبع الناتج باستخدام f-string مع كتابة USD في النهاية."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Exchange: 150.0 USD",
        description: "تحويل 7500 جنيه بسعر صرف 50.0"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-1-level-11"
  },

  "world-1-level-11": {
    id: "world-1-level-11",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 11,
    title: "👑 زعيم القرية: حاسبة استهلاك الوقود واقتصادية السيارة",
    englishTitle: "Mini-Boss: Smart Fuel Economy Calculator",
    subtitle: "تطبيق واقعي متكامل يجمع العمليات والتنسيق الرياضي",
    difficulty: "medium",
    type: "boss",
    baseXp: 220,
    skills: ["arithmetic", "real_world", "boss_challenge"],
    story: "تحدي الزعيم: قطعت سيارة مسافة distance_km = 450 كيلومتراً، واستهلكت liters = 36 لتراً من البنزين. احسب معدل استهلاك الوقود لكل 100 كيلومتر وفق المعادلة: rate = (liters / distance_km) * 100. اطبع النتيجة بصيغة: 'Fuel Economy: 8.0 L/100km'.",
    microLesson: {
      concept: "حساب النسب والمعدلات المركبة",
      summary: "لحساب المعدل لكل 100 وحدة، نقسم الكمية المستهلكة على المسافة ثم نضرب الناتج في 100.",
      exampleCode: "# فكرة حساب معدل الاستهلاك:\\nliters = 20\\nkm = 200\\nrate = (liters / km) * 100\\nprint(f\\"Economy: {rate:.1f} L/100km\\")"
    },
    starterCode: "distance_km = 450\\nliters = 36\\n\\n# طبق معادلة معدل الاستهلاك واطبع الناتج: Fuel Economy: 8.0 L/100km\\n",
    requirements: [
      "طبق معادلة استهلاك الوقود بدقة",
      "اطبع النتيجة مطابقة تماماً: Fuel Economy: 8.0 L/100km"
    ],
    expectedOutput: "Fuel Economy: 8.0 L/100km",
    hints: [
      "فكرة الحل: استخدم المعادلة (liters / distance_km) * 100.",
      "تأكد من ضبط الناتج لمنزلة عشرية واحدة :.1f متبوعاً بـ L/100km."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Fuel Economy: 8.0 L/100km",
        description: "حساب استهلاك 36 لتراً على مسافة 450 كم"
      }
    ],
    unlocksWorldId: "world-2",
    nextChallengeId: "world-2-level-1"
  },

  // ==========================================
  // WORLD 2 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-2-level-9": {
    id: "world-2-level-9",
    worldId: "world-2",
    worldTitle: "وادي الشروط والقرارات",
    levelNumber: 9,
    title: "🩺 فاحص مؤشر كتلة الجسم الطبي (BMI Status)",
    englishTitle: "Medical BMI Status Classifier",
    subtitle: "الشروط المركبة والمقارنات الرقمية المتعددة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["conditions", "elif", "comparison"],
    story: "لديك شخص وزنه weight = 72 كجم وطوله height = 1.75 متراً. احسب مؤشر كتلة الجسم bmi = weight / (height ** 2). إذا كان bmi أقل من 18.5 فهو 'Underweight'، وإذا كان بين 18.5 و 25 فهو 'Normal Weight'، وخلاف ذلك 'Overweight'. اطبع النتيجة بصيغة: 'BMI Status: Normal Weight'.",
    microLesson: {
      concept: "تصنيف المدى الرقمي باستخدام if و elif",
      summary: "يمكنك التحقق من وقوع قيمة في نطاق معين باستخدام الشروط المتسلسلة مثل 18.5 <= bmi < 25.",
      exampleCode: "# فكرة المقارنة بالمدى:\\nval = 22\\nif val < 18.5:\\n    status = 'Low'\\nelif val < 25:\\n    status = 'Normal'\\nelse:\\n    status = 'High'"
    },
    starterCode: "weight = 72\\nheight = 1.75\\n\\n# احسب bmi وحدد التصنيف واطبع: BMI Status: Normal Weight\\n",
    requirements: [
      "احسب مؤشر bmi بقسمة الوزن على مربع الطول",
      "استخدم الشروط لتحديد الحالة واطبع: BMI Status: Normal Weight"
    ],
    expectedOutput: "BMI Status: Normal Weight",
    hints: [
      "فكرة الحل: احسب bmi أولاً، ثم استخدم if و elif لفحص النطاقات.",
      "للقيم المعطاة (72 و 1.75) يكون الناتج 23.51 وهو يقع في نطاق Normal Weight."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "BMI Status: Normal Weight",
        description: "فحص مؤشر كتلة الجسم لشخص وزنه 72 وطوله 1.75"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-2-level-10"
  },

  "world-2-level-10": {
    id: "world-2-level-10",
    worldId: "world-2",
    worldTitle: "وادي الشروط والقرارات",
    levelNumber: 10,
    title: "🚗 نظام فحص استحقاق رخصة القيادة الذكي",
    englishTitle: "Smart Driver License Eligibility Checker",
    subtitle: "المعاملات المنطقية and و or والشروط الثنائية",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["logical_operators", "and", "conditions"],
    story: "متقدم للحصول على رخصة قيادة عمره age = 19 واجتاز اختبار فحص النظر eyesight_passed = True. يشترط لمنح الرخصة أن يكون العمر 18 فما فوق واجتياز اختبار النظر معاً. إذا تحقق الشرطان اطبع: 'Driver License: Approved'، وإلا اطبع: 'Driver License: Rejected'.",
    microLesson: {
      concept: "دمج الشروط بالمعامل المنطقي and",
      summary: "المعامل and يتطلب تحقق جميع الشروط معاً ليعطي نتيجة True.",
      exampleCode: "# فكرة دمج شرطين:\\nage = 20\\npassed = True\\nif age >= 18 and passed:\\n    print('Status: Approved')"
    },
    starterCode: "age = 19\\neyesight_passed = True\\n\\n# تحقق من استحقاق الرخصة واطبع الناتج المطلوب\\n",
    requirements: [
      "تحقق من أن age >= 18 و eyesight_passed هو True",
      "اطبع بصيغة دقيقة: Driver License: Approved"
    ],
    expectedOutput: "Driver License: Approved",
    hints: [
      "فكرة الحل: استخدم if مع المعامل and بين شرط العمر وشرط فحص النظر.",
      "اطبع الناتج المطابق للحالة الصحيحة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Driver License: Approved",
        description: "التحقق من سن 19 وفحص نظر مجتاز"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-2-level-11"
  },

  "world-2-level-11": {
    id: "world-2-level-11",
    worldId: "world-2",
    worldTitle: "وادي الشروط والقرارات",
    levelNumber: 11,
    title: "👑 زعيم الوادي: نظام تسعير تذاكر قطار تالجو السريع",
    englishTitle: "Mini-Boss: Talgo Train Dynamic Pricing Engine",
    subtitle: "شروط متداخلة وحسابات مالية متباينة",
    difficulty: "hard",
    type: "boss",
    baseXp: 230,
    skills: ["nested_conditions", "real_world", "boss_challenge"],
    story: "تحدي الزعيم: سعر التذكرة الأساسي base_price = 300. الراكب طالب passenger_type = 'student' ويستحق خصم 20% على الأساسي. اختار درجة أولى seat_class = 'first' وتتطلب إضافة رسم إضافي قدره 50 جنيهاً بعد احتساب الخصم. احسب السعر النهائي (300 * 0.8 + 50 = 290.0) واطبع: 'Talgo Ticket: 290.0 EGP'.",
    microLesson: {
      concept: "الشروط المتتالية وتحديث المتغيرات",
      summary: "في أنظمة الحجز، يتم حساب الخصم أولاً على السعر الأساسي بناءً على نوع الراكب، ثم إضافة رسوم الدرجة.",
      exampleCode: "# فكرة الحساب المرحلي:\\nprice = 200\\nif is_student:\\n    price *= 0.8\\nif is_vip:\\n    price += 30"
    },
    starterCode: "base_price = 300\\npassenger_type = 'student'\\nseat_class = 'first'\\n\\n# احسب السعر النهائي بعد الخصم والرسوم واطبع: Talgo Ticket: 290.0 EGP\\n",
    requirements: [
      "خصم 20% من السعر الأساسي للطلاب",
      "إضافة 50 جنيهاً لركاب الدرجة الأولى",
      "اطبع النتيجة بصيغة: Talgo Ticket: 290.0 EGP"
    ],
    expectedOutput: "Talgo Ticket: 290.0 EGP",
    hints: [
      "فكرة الحل: اضرب السعر الأساسي في 0.8 إذا كان طالب، ثم أضف 50 إذا كانت الدرجة first.",
      "اطبع الناتج مع .1f لضمان ظهور 290.0 متبوعة بـ EGP."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Talgo Ticket: 290.0 EGP",
        description: "حساب تذكرة طالب درجة أولى على تالجو"
      }
    ],
    unlocksWorldId: "world-3",
    nextChallengeId: "world-3-level-1"
  },

  // ==========================================
  // WORLD 3 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-3-level-9": {
    id: "world-3-level-9",
    worldId: "world-3",
    worldTitle: "غابة التكرار والحلقات",
    levelNumber: 9,
    title: "🔢 مجموع مضاعفات العدد 7 في نطاق محدد",
    englishTitle: "Sum of Multiples of 7 in Range",
    subtitle: "حلقات التكرار مع خطوة القفز وتراكم القيم",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["for_loops", "range", "accumulator"],
    story: "اكتب برنامجاً يجمع جميع مضاعفات العدد 7 المحصورة بين 1 و 50 (أي 7, 14, 21, 28, 35, 42, 49). احسب المجموع التراكمي واطبعه بصيغة: 'Sum of Multiples: 196'.",
    microLesson: {
      concept: "حلقة for مع خطوة القفز Step في range",
      summary: "يمكنك المرور على مضاعفات عدد باستخدام range(start, end, step)، حيث تكون خطوة القفز مساوية للعدد نفسه.",
      exampleCode: "# فكرة جمع المضاعفات:\\ntotal = 0\\nfor n in range(5, 30, 5):\\n    total += n\\nprint(f\\"Sum: {total}\\")"
    },
    starterCode: "# اجمع مضاعفات العدد 7 بين 1 و 50 واطبع المجموع: Sum of Multiples: 196\\n",
    requirements: [
      "استخدم حلقة تكرار للمرور على مضاعفات 7 الأقل من 50",
      "اجمع المضاعفات واطبع الناتج: Sum of Multiples: 196"
    ],
    expectedOutput: "Sum of Multiples: 196",
    hints: [
      "فكرة الحل: ابدأ متغير المجموع بقيمة 0، ثم استخدم range(7, 50, 7) وأضف كل رقم للمجموع.",
      "اطبع النتيجة النهائية بعد انتهاء الحلقة بصيغة f-string."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Sum of Multiples: 196",
        description: "جمع مضاعفات 7 حتى 50"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-3-level-10"
  },

  "world-3-level-10": {
    id: "world-3-level-10",
    worldId: "world-3",
    worldTitle: "غابة التكرار والحلقات",
    levelNumber: 10,
    title: "📈 محاكاة الفائدة المركبة السنوية بحلقة While",
    englishTitle: "Compound Interest Growth with While Loop",
    subtitle: "حلقات while وتكرار العمليات حتى تحقق هدف معين",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["while_loops", "compound_growth", "math"],
    story: "مستثمر أودع مبلغ balance = 1000 جنيهاً في مشروع بعائد سنوي مركب قدره 10% (أي balance *= 1.10 في نهاية كل سنة). احسب عدد السنوات اللازمة ليتجاوز الرصيد 1500 جنيهاً باستخدام حلقة while. اطبع النتيجة بصيغة: 'Years to Target: 5'.",
    microLesson: {
      concept: "حلقة while التكرارية المشروطة",
      summary: "تستمر حلقة while في العمل طالما أن الشرط صحيح (مثلاً while balance <= target)، ونزيد عداد السنوات مع كل دورة.",
      exampleCode: "# فكرة العد بحلقة while:\\nval = 100\\nyears = 0\\nwhile val < 200:\\n    val *= 1.2\\n    years += 1"
    },
    starterCode: "balance = 1000\\ntarget = 1500\\nyears = 0\\n\\n# استخدم while لحساب السنوات اللازمة لتجاوز الهدف واطبع: Years to Target: 5\\n",
    requirements: [
      "استمر في تكرار العملية طالما balance <= target",
      "في كل دورة اضرب balance في 1.10 وزد years بواحد",
      "اطبع الناتج: Years to Target: 5"
    ],
    expectedOutput: "Years to Target: 5",
    hints: [
      "فكرة الحل: شرط حلقة while هو balance <= target.",
      "في نهاية الحلقة سيكون الرصيد تجاوز 1500 بعد 5 سنوات بالضبط."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Years to Target: 5",
        description: "حساب سنوات نمو 1000 لتجاوز 1500 بنسبة 10%"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-3-level-11"
  },

  "world-3-level-11": {
    id: "world-3-level-11",
    worldId: "world-3",
    worldTitle: "غابة التكرار والحلقات",
    levelNumber: 11,
    title: "👑 زعيم الغابة: خوارزمية فحص الأرقام الأولية (Prime Test)",
    englishTitle: "Mini-Boss: Prime Number Verification Algorithm",
    subtitle: "الخوارزميات الرياضية وحلقات الفحص مع أعلام الصحة Flag",
    difficulty: "hard",
    type: "boss",
    baseXp: 230,
    skills: ["loops", "prime_numbers", "boss_challenge"],
    story: "تحدي الزعيم: افحص ما إذا كان العدد n = 29 عدداً أولياً (Prime) أم لا. العدد الأولي يقبل القسمة فقط على نفسه وعلى 1. اختبر الأعداد من 2 إلى n - 1، واطبع: 'Prime Check: 29 is Prime'.",
    microLesson: {
      concept: "فحص الأولية بالأعلام المنطقية (Boolean Flag)",
      summary: "نبدأ بافتراض أن العدد أولي is_prime = True، ثم نمر بحلقة على القواسم المحتملة. إذا وجدنا قاسماً يقبل القسمة بدون باقٍ نغير العلم إلى False.",
      exampleCode: "# فكرة فحص الأولية:\\nis_prime = True\\nfor i in range(2, num):\\n    if num % i == 0:\\n        is_prime = False\\n        break"
    },
    starterCode: "n = 29\\n\\n# افحص هل n عدد أولي واطبع: Prime Check: 29 is Prime\\n",
    requirements: [
      "افحص قواسم العدد من 2 وحتى n - 1",
      "اطبع النتيجة بصيغة: Prime Check: 29 is Prime"
    ],
    expectedOutput: "Prime Check: 29 is Prime",
    hints: [
      "فكرة الحل: افترض is_prime = True، واختبر باقي القسمة n % i == 0.",
      "نظراً لأن 29 عدد أولي لا يقبل القسمة، اطبع الصيغة المطلوبة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Prime Check: 29 is Prime",
        description: "فحص أولية العدد 29"
      }
    ],
    unlocksWorldId: "world-4",
    nextChallengeId: "world-4-level-1"
  },

  // ==========================================
  // WORLD 4 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-4-level-9": {
    id: "world-4-level-9",
    worldId: "world-4",
    worldTitle: "كهف النصوص والكلمات",
    levelNumber: 9,
    title: "📱 منسق أرقام الهواتف المصرية الذكي (Phone Formatter)",
    englishTitle: "Egyptian Phone Number Formatter",
    subtitle: "تقطيع النصوص String Slicing وإعادة التركيب",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["strings", "slicing", "formatting"],
    story: "لديك رقم هاتف خام phone = '01018275881'. قم بتقطيعه وإعادة تنسيقه ليظهر برمز الدولة والمسافات الفاصلة بصيغة: 'Formatted Phone: (+20) 010-1827-5881'.",
    microLesson: {
      concept: "تقطيع النصوص بالأقواس المعقوفة [start:end]",
      summary: "يمكنك استخراج أجزاء محددة من النص عبر تحديد مؤشرات البداية والنهاية، ثم دمجها مع رموز أخرى في f-string.",
      exampleCode: "# مثال لتقطيع نص الهاتف:\\np = '01234567890'\\npart1 = p[0:3]\\npart2 = p[3:7]\\npart3 = p[7:]"
    },
    starterCode: "phone = '01018275881'\\n\\n# نسق رقم الهاتف واطبع: Formatted Phone: (+20) 010-1827-5881\\n",
    requirements: [
      "استخرج أول 3 أرقام (010)، ثم الـ 4 التالية (1827)، ثم الـ 4 الأخيرة (5881)",
      "اطبع بصيغة: Formatted Phone: (+20) 010-1827-5881"
    ],
    expectedOutput: "Formatted Phone: (+20) 010-1827-5881",
    hints: [
      "فكرة الحل: استخدم phone[0:3] و phone[3:7] و phone[7:].",
      "ادمج الأجزاء داخل f-string مع رمز الدولة (+20)."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Formatted Phone: (+20) 010-1827-5881",
        description: "تنسيق رقم 01018275881"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-4-level-10"
  },

  "world-4-level-10": {
    id: "world-4-level-10",
    worldId: "world-4",
    worldTitle: "كهف النصوص والكلمات",
    levelNumber: 10,
    title: "🔁 فاحص الكلمات المتناظرة المنعكسة (Palindrome)",
    englishTitle: "Palindrome String Verifier",
    subtitle: "عكس النصوص بخطوة سالبة [::-1] والمقارنة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["strings", "reversing", "palindrome"],
    story: "افحص ما إذا كانت الكلمة word = 'madam' كلمة متناظرة (Palindrome) تقرأ من اليمين كقراءتها من اليسار. قارن الكلمة بمعكوسها واطبع النتيجة بصيغة: 'Palindrome: madam is True'.",
    microLesson: {
      concept: "عكس النصوص في بايثون بخطوة [::-1]",
      summary: "الخطوة -1 في التقطيع تعكس ترتيب حروف النص بالكامل. وإذا تساوى النص مع معكوسه يكون متناظراً.",
      exampleCode: "# فكرة فحص التناظر:\\nw = 'radar'\\nis_pal = (w == w[::-1])\\nprint(f\\"Is Palindrome: {is_pal}\\")"
    },
    starterCode: "word = 'madam'\\n\\n# افحص هل الكلمة متناظرة واطبع: Palindrome: madam is True\\n",
    requirements: [
      "اعكس الكلمة وقارنها بالأصل",
      "اطبع الناتج: Palindrome: madam is True"
    ],
    expectedOutput: "Palindrome: madam is True",
    hints: [
      "فكرة الحل: استخدم word == word[::-1] للحصول على القيمة المنطقية.",
      "اطبع النتيجة بالصيغة المطلوبة باستخدام f-string."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Palindrome: madam is True",
        description: "فحص تناظر كلمة madam"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-4-level-11"
  },

  "world-4-level-11": {
    id: "world-4-level-11",
    worldId: "world-4",
    worldTitle: "كهف النصوص والكلمات",
    levelNumber: 11,
    title: "👑 زعيم الكهف: مستخرج ومحلل النطاق من البريد الإلكتروني",
    englishTitle: "Mini-Boss: Email Domain Extractor & Normalizer",
    subtitle: "طرق النصوص split و upper ومعالجة البيانات النصية",
    difficulty: "hard",
    type: "boss",
    baseXp: 230,
    skills: ["strings", "split", "upper", "boss_challenge"],
    story: "تحدي الزعيم: لديك عنوان بريد إلكتروني email = 'student@shababha.gov.eg'. استخرج اسم النطاق الذي يلي رمز '@' ثم حول جميع حروفه إلى أحرف كبيرة (UPPERCASE). اطبع الناتج بصيغة: 'Domain: SHABABHA.GOV.EG'.",
    microLesson: {
      concept: "تقسيم النصوص بالدالة split() وتحويل الحالة",
      summary: "تقوم الدالة email.split('@') بتقسيم النص إلى جزأين: اسم المستخدم في الفهرس [0] والنطاق في الفهرس [1]. والدالة .upper() تحول الحروف لكبيرة.",
      exampleCode: "# فكرة استخراج النطاق:\\nem = 'user@example.com'\\ndom = em.split('@')[1].upper()\\nprint(f\\"Domain: {dom}\\")"
    },
    starterCode: "email = 'student@shababha.gov.eg'\\n\\n# استخرج النطاق وحوله لحروف كبيرة واطبع: Domain: SHABABHA.GOV.EG\\n",
    requirements: [
      "استخرج الجزء بعد علامة @ باستخدام split",
      "حول النطاق إلى حروف كبيرة واطبع: Domain: SHABABHA.GOV.EG"
    ],
    expectedOutput: "Domain: SHABABHA.GOV.EG",
    hints: [
      "فكرة الحل: استخدم email.split('@')[1] للوصول للنطاق، ثم طبق دالة .upper().",
      "ادمج النتيجة في جملة الطباعة المطلوبة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Domain: SHABABHA.GOV.EG",
        description: "استخراج نطاق student@shababha.gov.eg بحروف كبيرة"
      }
    ],
    unlocksWorldId: "world-5",
    nextChallengeId: "world-5-level-1"
  },

  // ==========================================
  // WORLD 5 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-5-level-9": {
    id: "world-5-level-9",
    worldId: "world-5",
    worldTitle: "مملكة القوائم والمصفوفات",
    levelNumber: 9,
    title: "✨ استبعاد العناصر المكررة والترتيب التصاعدي",
    englishTitle: "Remove Duplicates and Ascending Sort",
    subtitle: "التحويل بين المجموعات والقوائم ودوال الترتيب",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["lists", "sets", "sorted"],
    story: "لديك قائمة أرقام غير مرتبة وبها عناصر مكررة nums = [15, 3, 9, 3, 21, 15, 7]. استبعد العناصر المكررة ورتب الأرقام تصاعدياً في قائمة جديدة. اطبع القائمة بصيغة: 'Sorted Unique: [3, 7, 9, 15, 21]'.",
    microLesson: {
      concept: "استبعاد التكرار والترتيب بالدالة sorted()",
      summary: "تحويل القائمة إلى set يستبعد التكرارات تلقائياً، وتمريرها إلى الدالة sorted() يرجع قائمة مرتبة تصاعدياً.",
      exampleCode: "# فكرة استبعاد التكرار والترتيب:\\nraw = [5, 2, 5, 1, 2]\\nres = sorted(list(set(raw)))\\nprint(f\\"Result: {res}\\")"
    },
    starterCode: "nums = [15, 3, 9, 3, 21, 15, 7]\\n\\n# أنشئ قائمة بدون تكرار مرتبة واطبع: Sorted Unique: [3, 7, 9, 15, 21]\\n",
    requirements: [
      "استبعد التكرارات ورتب الأرقام من الأصغر للأكبر",
      "اطبع القائمة بصيغة: Sorted Unique: [3, 7, 9, 15, 21]"
    ],
    expectedOutput: "Sorted Unique: [3, 7, 9, 15, 21]",
    hints: [
      "فكرة الحل: استخدم sorted(set(nums)) لإنتاج القائمة المطلوبة في خطوة واحدة.",
      "اطبع الناتج مباشرة مع البادئة Sorted Unique:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Sorted Unique: [3, 7, 9, 15, 21]",
        description: "ترتيب واستبعاد مكررات [15, 3, 9, 3, 21, 15, 7]"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-5-level-10"
  },

  "world-5-level-10": {
    id: "world-5-level-10",
    worldId: "world-5",
    worldTitle: "مملكة القوائم والمصفوفات",
    levelNumber: 10,
    title: "📊 تصفية المبيعات المرتفعة بقوائم الاستيعاب (List Comprehension)",
    englishTitle: "Filter High Sales with List Comprehension",
    subtitle: "التصفية السريعة والذكية للقوائم بأسلوب بايثون الأنيق",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["list_comprehension", "filtering", "lists"],
    story: "لديك قائمة مبيعات المنتجات sales = [120, 45, 230, 80, 310, 95]. استخرج فقط أرقام المبيعات التي تتجاوز 100 في قائمة جديدة باستخدام List Comprehension. اطبع الناتج بصيغة: 'Top Sales: [120, 230, 310]'.",
    microLesson: {
      concept: "بناء القوائم بأسلوب List Comprehension",
      summary: "يوفر بايثون صياغة مدمجة لتصفية القوائم: [x for x in list if condition].",
      exampleCode: "# مثال لتصفية الأرقام فوق 50:\\ndata = [20, 60, 30, 80]\\nhigh = [x for x in data if x > 50]\\nprint(f\\"High: {high}\\")"
    },
    starterCode: "sales = [120, 45, 230, 80, 310, 95]\\n\\n# استخرج القيم الأكبر من 100 واطبع: Top Sales: [120, 230, 310]\\n",
    requirements: [
      "استخرج القيم التي تحقق x > 100",
      "اطبع القائمة بصيغة: Top Sales: [120, 230, 310]"
    ],
    expectedOutput: "Top Sales: [120, 230, 310]",
    hints: [
      "فكرة الحل: استخدم الصيغة [s for s in sales if s > 100].",
      "اطبع القائمة الناتجة بجوار Top Sales:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Top Sales: [120, 230, 310]",
        description: "تصفية الأرقام الأكبر من 100 من قائمة المبيعات"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-5-level-11"
  },

  "world-5-level-11": {
    id: "world-5-level-11",
    worldId: "world-5",
    worldTitle: "مملكة القوائم والمصفوفات",
    levelNumber: 11,
    title: "👑 زعيم المملكة: دمج سجلات الطلاب والدرجات (Zip Engine)",
    englishTitle: "Mini-Boss: Student Roster Zip & Multi-line Display",
    subtitle: "دمج القوائم المتناظرة والدوران المشترك",
    difficulty: "hard",
    type: "boss",
    baseXp: 230,
    skills: ["zip", "lists", "loops", "boss_challenge"],
    story: "تحدي الزعيم: لديك قائمة بأسماء الطلاب names = ['Ali', 'Sara', 'Omar'] وقائمة بدرجاتهم المقابلة scores = [92, 98, 88]. ادمج القائمتين واطبع كل طالب ودرجته في سطر مستقل بصيغة: 'Ali: 92\\\\nSara: 98\\\\nOmar: 88'.",
    microLesson: {
      concept: "الدمج المتزامن للدوال باستخدام zip()",
      summary: "تسمح الدالة zip(list1, list2) بالمرور على عنصرين متناظرين معاً في نفس الدورة الحلقية.",
      exampleCode: "# فكرة الدمج باستخدام zip:\\nkeys = ['A', 'B']\\nvals = [1, 2]\\nfor k, v in zip(keys, vals):\\n    print(f\\\"{k}: {v}\\\")"
    },
    starterCode: "names = ['Ali', 'Sara', 'Omar']\\nscores = [92, 98, 88]\\n\\n# ادمج القائمتين واطبع كل اسم ودرجته في سطر مستقل\\n",
    requirements: [
      "استخدم دالة zip أو حلقة تكرار للمرور على الأسماء والدرجات معاً",
      "اطبع كل سجل في سطر بصيغة: الاسم: الدرجة"
    ],
    expectedOutput: "Ali: 92\\nSara: 98\\nOmar: 88",
    hints: [
      "فكرة الحل: استخدم for name, score in zip(names, scores): ثم اطبع print(f'{name}: {score}').",
      "تأكد من عدم ترك مسافات غير مطلوبة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Ali: 92\\nSara: 98\\nOmar: 88",
        description: "دمج وطباعة أسماء ودرجات 3 طلاب"
      }
    ],
    unlocksWorldId: "world-6",
    nextChallengeId: "world-6-level-1"
  },

  // ==========================================
  // WORLD 6 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-6-level-9": {
    id: "world-6-level-9",
    worldId: "world-6",
    worldTitle: "قلعة الدوال والموديولات",
    levelNumber: 9,
    title: "📐 دالة حساب مساحة ومحيط الدائرة الدقيقة",
    englishTitle: "Precise Circle Metrics Function",
    subtitle: "الدوال التي تعيد قيماً متعددة وحسابات نصف القطر",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["functions", "return_multiple", "math"],
    story: "اكتب دالة باسم circle_metrics(r) تأخذ نصف القطر r = 7 وتحسب المساحة area = 3.14 * r * r والمحيط circ = 2 * 3.14 * r بدقة منزلتين عشريتين. استدع الدالة واطبع الناتج بصيغة: 'Area: 153.86, Circumference: 43.96'.",
    microLesson: {
      concept: "إرجاع قيم متعددة من الدالة (Tuples)",
      summary: "يمكن للدالة في بايثون إرجاع أكثر من قيمة مفصولة بفواصل return val1, val2 وتستقبلها في متغيرين.",
      exampleCode: "# فكرة إرجاع قيمتين:\\ndef calc(x):\\n    return x*2, x*3\\ndbl, trp = calc(5)"
    },
    starterCode: "# عرف دالة circle_metrics(r) واستدعها لنصف قطر 7 واطبع الناتج المطلوب\\n",
    requirements: [
      "عرف الدالة واستخدم 3.14 لقيمة pi",
      "احسب المساحة والمحيط بدقة منزلتين عشريتين واطبع: Area: 153.86, Circumference: 43.96"
    ],
    expectedOutput: "Area: 153.86, Circumference: 43.96",
    hints: [
      "فكرة الحل: احسب area = round(3.14 * r * r, 2) و circ = round(2 * 3.14 * r, 2).",
      "أرجع القيمتين أو اطبعهما بصيغة f-string المطلوبة تماماً."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Area: 153.86, Circumference: 43.96",
        description: "حساب مساحة ومحيط دائرة نصف قطرها 7"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-6-level-10"
  },

  "world-6-level-10": {
    id: "world-6-level-10",
    worldId: "world-6",
    worldTitle: "قلعة الدوال والموديولات",
    levelNumber: 10,
    title: "⚡ التصفية بالدوال المجهولة Lambda والتطبيق السريع",
    englishTitle: "Lambda Functions and Filter Mechanism",
    subtitle: "الدوال المجهولة في سطر واحد ودالة filter",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["lambda", "filter", "functions"],
    story: "لديك قائمة أرقام data = [12, 17, 24, 33, 40, 55]. استخدم دالة lambda مجهولة لاستخراج الأرقام الزوجية فقط في قائمة مرتبة بنفس الترتيب. اطبع الناتج بصيغة: 'Evens: [12, 24, 40]'.",
    microLesson: {
      concept: "دوال Lambda السريعة المجهولة",
      summary: "تتيح lambda كتابة دالة مصغرة في سطر واحد بدون اسم مثل lambda x: x % 2 == 0.",
      exampleCode: "# فكرة دالة lambda للتصفية:\\nnums = [1, 2, 3, 4]\\nevens = list(filter(lambda x: x % 2 == 0, nums))\\nprint(evens)"
    },
    starterCode: "data = [12, 17, 24, 33, 40, 55]\\n\\n# استخرج الأرقام الزوجية واطبع: Evens: [12, 24, 40]\\n",
    requirements: [
      "استخرج الأرقام التي تقبل القسمة على 2 بدون باقٍ",
      "اطبع القائمة بصيغة: Evens: [12, 24, 40]"
    ],
    expectedOutput: "Evens: [12, 24, 40]",
    hints: [
      "فكرة الحل: استخدم list(filter(lambda x: x % 2 == 0, data)) أو List Comprehension بشرط الزوجية.",
      "اطبع الناتج بجوار كلمة Evens:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Evens: [12, 24, 40]",
        description: "استخراج الأرقام الزوجية من [12, 17, 24, 33, 40, 55]"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-6-level-11"
  },

  "world-6-level-11": {
    id: "world-6-level-11",
    worldId: "world-6",
    worldTitle: "قلعة الدوال والموديولات",
    levelNumber: 11,
    title: "👑 زعيم القلعة: مولد الأرقام التسلسلية المشفرة (Token Generator)",
    englishTitle: "Mini-Boss: Serial Token Generator Function",
    subtitle: "الدوال ذات المعاملات الافتراضية والدقة الرقمية zfill",
    difficulty: "hard",
    type: "boss",
    baseXp: 230,
    skills: ["functions", "zfill", "string_formatting", "boss_challenge"],
    story: "تحدي الزعيم: اكتب دالة باسم generate_token(prefix, num) تستقبل بادئة نصية ورقم تسلسلي، وترجع نصاً مشفراً يبدأ بالبادئة متبوعة بشرطة ثم الرقم مكملاً بأصفار على اليسار ليكون طوله 5 خانات (باستخدام zfill أو :05d). استدع الدالة للقيم prefix = 'EGY' و num = 42 واطبع: 'Token: EGY-00042'.",
    microLesson: {
      concept: "إكمال الخانات بالأصفار باستخدام zfill و :05d",
      summary: "يمكن إكمال الأرقام بأصفار على اليسار إما عبر الدالة str(num).zfill(5) أو عبر التنسيق الرقمي f'{num:05d}'.",
      exampleCode: "# فكرة إكمال الخانات بأصفار:\\nn = 7\\ntoken = f\\"ID-{n:04d}\\"\\nprint(token) # ينتج ID-0007"
    },
    starterCode: "# عرف الدالة واستدعها للقيم EGY و 42 واطبع الناتج المطلوب: Token: EGY-00042\\n",
    requirements: [
      "عرف الدالة generate_token(prefix, num) لترجع النص المطلوب",
      "اطبع الناتج الدقيق: Token: EGY-00042"
    ],
    expectedOutput: "Token: EGY-00042",
    hints: [
      "فكرة الحل: داخل الدالة، استخدم return f'{prefix}-{num:05d}'.",
      "استدع الدالة مع 'EGY' و 42 واطبع النتيجة بصيغة Token: ..."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Token: EGY-00042",
        description: "توليد الرمز التسلسلي لـ EGY و 42"
      }
    ],
    unlocksWorldId: "world-7",
    nextChallengeId: "world-7-level-1"
  },

  // ==========================================
  // WORLD 7 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-7-level-9": {
    id: "world-7-level-9",
    worldId: "world-7",
    worldTitle: "برج الخوارزميات والبحث",
    levelNumber: 9,
    title: "🔍 خوارزمية البحث الخطي مع إرجاع موقع الفهرس",
    englishTitle: "Linear Search Algorithm with Index Reporting",
    subtitle: "استكشاف القوائم وخوارزميات البحث التتابعي",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["linear_search", "algorithms", "loops"],
    story: "لديك قائمة عناصر arr = [10, 25, 33, 42, 58, 67] وعنصر هدف target = 42. نفذ خوارزمية بحث خطي للمرور على عناصر القائمة وتحديد موقع الفهرس (Index) للهدف. اطبع الناتج بصيغة: 'Found at Index: 3'.",
    microLesson: {
      concept: "خوارزمية البحث الخطي (Linear Search)",
      summary: "تمر الخوارزمية على العناصر واحداً تلو الآخر باستخدام enumerate(arr) لمقارنة كل عنصر بالهدف حتى تجده وترجع موقعه.",
      exampleCode: "# فكرة البحث الخطي:\\nitems = [5, 12, 9]\\ntarget = 12\\nfor idx, val in enumerate(items):\\n    if val == target:\\n        print(f\\"Index: {idx}\\")"
    },
    starterCode: "arr = [10, 25, 33, 42, 58, 67]\\ntarget = 42\\n\\n# ابحث عن target واطبع موقعه: Found at Index: 3\\n",
    requirements: [
      "ابحث عن الرقم 42 وحدد موقعه في القائمة",
      "اطبع بصيغة دقيقة: Found at Index: 3"
    ],
    expectedOutput: "Found at Index: 3",
    hints: [
      "فكرة الحل: استخدم for i, num in enumerate(arr): وعندما يتساوى num مع target اطبع f'Found at Index: {i}'.",
      "يمكنك استخدام arr.index(target) أيضاً للتأكد."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Found at Index: 3",
        description: "البحث عن 42 في [10, 25, 33, 42, 58, 67]"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-7-level-10"
  },

  "world-7-level-10": {
    id: "world-7-level-10",
    worldId: "world-7",
    worldTitle: "برج الخوارزميات والبحث",
    levelNumber: 10,
    title: "🔄 خوارزمية الفرز الفقاعي اليدوي (Bubble Sort Step)",
    englishTitle: "Bubble Sort Algorithm Step Implementation",
    subtitle: "خوارزميات الترتيب ومقارنة وتبديل العناصر المتجاورة",
    difficulty: "hard",
    type: "write_code",
    baseXp: 210,
    skills: ["bubble_sort", "algorithms", "swapping"],
    story: "لديك قائمة أرقام غير مرتبة arr = [64, 34, 25, 12, 22]. نفذ خوارزمية الفرز الفقاعي (Bubble Sort) بمقارنة كل عنصرين متجاورين وتبديلهما إن كان الأول أكبر من الثاني حتى تصبح القائمة مرتبة تصاعدياً. اطبع الناتج بصيغة: 'Sorted Array: [12, 22, 25, 34, 64]'.",
    microLesson: {
      concept: "خوارزمية الترتيب الفقاعي (Bubble Sort)",
      summary: "تعتمد الخوارزمية على حلقتين متداخلتين للمرور على القائمة وتبديل أي عنصرين غير مرتبين a[j], a[j+1] = a[j+1], a[j].",
      exampleCode: "# فكرة الترتيب الفقاعي:\\nn = len(a)\\nfor i in range(n):\\n    for j in range(0, n - i - 1):\\n        if a[j] > a[j + 1]:\\n            a[j], a[j + 1] = a[j + 1], a[j]"
    },
    starterCode: "arr = [64, 34, 25, 12, 22]\\n\\n# طبق خوارزمية الترتيب واطبع: Sorted Array: [12, 22, 25, 34, 64]\\n",
    requirements: [
      "رتب القائمة ترتيباً تصاعدياً صحيحاً",
      "اطبع القائمة المرتبة بصيغة: Sorted Array: [12, 22, 25, 34, 64]"
    ],
    expectedOutput: "Sorted Array: [12, 22, 25, 34, 64]",
    hints: [
      "فكرة الحل: نفذ الحلقتين المتداخلتين للفرز الفقاعي أو استخدم الترتيب لتأكيد الناتج النهائي.",
      "اطبع القائمة مطابقة للصيغة المطلوبة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Sorted Array: [12, 22, 25, 34, 64]",
        description: "ترتيب القائمة [64, 34, 25, 12, 22] بالفرز الفقاعي"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-7-level-11"
  },

  "world-7-level-11": {
    id: "world-7-level-11",
    worldId: "world-7",
    worldTitle: "برج الخوارزميات والبحث",
    levelNumber: 11,
    title: "👑 زعيم البرج: خوارزمية متتالية فيبوناتشي التراكمية",
    englishTitle: "Mini-Boss: Fibonacci Sequence Generator",
    subtitle: "الأنماط الرياضية وتوليد السلاسل الخوارزمية التراكمية",
    difficulty: "hard",
    type: "boss",
    baseXp: 240,
    skills: ["fibonacci", "algorithms", "boss_challenge"],
    story: "تحدي الزعيم: اكتب خوارزمية لتوليد أول 8 أرقام من متتالية فيبوناتشي الشهيرة (تبدأ بالرقمين 0 و 1، وكل رقم تالٍ هو حاصل جمع الرقمين السابقين له: 0, 1, 1, 2, 3, 5, 8, 13). خزن الأرقام في قائمة واطبعها بصيغة: 'Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]'.",
    microLesson: {
      concept: "متتالية فيبوناتشي (Fibonacci Sequence)",
      summary: "تبدأ المتتالية بـ [0, 1]. وفي كل خطوة جديدة نحسب العنصر الجديد بجمع آخر عنصرين fib[-1] + fib[-2] ونضيفه للقائمة.",
      exampleCode: "# فكرة توليد المتتالية:\\nfib = [0, 1]\\nfor _ in range(6):\\n    fib.append(fib[-1] + fib[-2])\\nprint(fib)"
    },
    starterCode: "# ولد أول 8 أرقام من متتالية فيبوناتشي واطبع: Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]\\n",
    requirements: [
      "ابدأ بالقائمة [0, 1] وأضف 6 عناصر تالية",
      "اطبع القائمة بصيغة: Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]"
    ],
    expectedOutput: "Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]",
    hints: [
      "فكرة الحل: أنشئ قائمة fib = [0, 1]، ثم كرر 6 مرات إضافة fib[-1] + fib[-2].",
      "اطبع الناتج النهائي باستخدام f-string مسبوقاً بـ Fibonacci:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13]",
        description: "توليد أول 8 أرقام من فيبوناتشي"
      }
    ],
    unlocksWorldId: "world-8",
    nextChallengeId: "world-8-level-1"
  },

  // ==========================================
  // WORLD 8 EXPANSION (LEVELS 9, 10, 11)
  // ==========================================
  "world-8-level-9": {
    id: "world-8-level-9",
    worldId: "world-8",
    worldTitle: "عرش البايثوني الخارق",
    levelNumber: 9,
    title: "🛡️ المعالجة الآمنة للاستثناءات البرمجية (Safe ZeroDivision)",
    englishTitle: "Safe Exception Handling for ZeroDivisionError",
    subtitle: "بناء أكواد آمنة تتحمل الأخطاء بكتل try-except",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["exceptions", "try_except", "robustness"],
    story: "اكتب كتلة try-except لمحاولة قسمة numerator = 100 على denominator = 0. عند اعتراض خطأ القسمة على الصفر ZeroDivisionError التقط الخطأ واطبع رسالة آمنة بصيغة: 'Safe Div: Cannot divide by zero!'.",
    microLesson: {
      concept: "معالجة الأخطاء بـ try و except",
      summary: "تمنع كتل try-except انهيار البرنامج عند حدوث خطأ غير متوقع، وتسمح بالتعامل معه بمرونة.",
      exampleCode: "# فكرة التقاط خطأ القسمة:\\ntry:\\n    res = 10 / 0\\nexcept ZeroDivisionError:\\n    print('Safe!')"
    },
    starterCode: "numerator = 100\\ndenominator = 0\\n\\n# استخدم try-except لالتقاط الخطأ وطباعة: Safe Div: Cannot divide by zero!\\n",
    requirements: [
      "ضع عملية القسمة داخل كتلة try",
      "التقط خطأ ZeroDivisionError واطبع: Safe Div: Cannot divide by zero!"
    ],
    expectedOutput: "Safe Div: Cannot divide by zero!",
    hints: [
      "فكرة الحل: اكتب try: result = numerator / denominator ثم except ZeroDivisionError: print('Safe Div: Cannot divide by zero!').",
      "تأكد من مطابقة نص الرسالة تماماً."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Safe Div: Cannot divide by zero!",
        description: "التقاط خطأ قسمة 100 على صفر بأمان"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-8-level-10"
  },

  "world-8-level-10": {
    id: "world-8-level-10",
    worldId: "world-8",
    worldTitle: "عرش البايثوني الخارق",
    levelNumber: 10,
    title: "📜 محلل سجلات الخوادم واستخراج الأخطاء (Log Parser)",
    englishTitle: "Server Log Parser & Error Extractor",
    subtitle: "معالجة النصوص المنظمة واستخراج البيانات الحساسة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 210,
    skills: ["parsing", "strings", "filtering"],
    story: "لديك نص سجلات نظام log = 'INFO:ServerStarted|WARN:HighMemory|ERROR:DbTimeout|INFO:Ready'. قم بتقسيم السجلات واستخراج السجلات التي تبدأ بـ 'ERROR:' فقط في قائمة جديدة. اطبع الناتج بصيغة: \\"Errors Found: ['ERROR:DbTimeout']\\".",
    microLesson: {
      concept: "تحليل نصوص السجلات (Parsing)",
      summary: "يتم تقسيم السجلات عبر علامة الفصل split('|') ثم تصفية العناصر التي تبدأ بالكلمة المطلوبة entry.startswith('ERROR:').",
      exampleCode: "# فكرة تصفية السجلات:\\nentries = 'A:1|B:2|A:3'.split('|')\\na_items = [e for e in entries if e.startswith('A:')]"
    },
    starterCode: "log = 'INFO:ServerStarted|WARN:HighMemory|ERROR:DbTimeout|INFO:Ready'\\n\\n# استخرج رسائل ERROR واطبع: Errors Found: ['ERROR:DbTimeout']\\n",
    requirements: [
      "قسم النص عند علامة |",
      "استخرج السجلات التي تبدأ بـ ERROR واطبعها بالقائمة المطلوبة"
    ],
    expectedOutput: "Errors Found: ['ERROR:DbTimeout']",
    hints: [
      "فكرة الحل: قسم النص باستخدام log.split('|') ثم استخدم List Comprehension مع .startswith('ERROR:').",
      "اطبع النتيجة بجوار Errors Found:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Errors Found: ['ERROR:DbTimeout']",
        description: "استخراج أخطاء السجل من النص المعطى"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-8-level-11"
  },

  "world-8-level-11": {
    id: "world-8-level-11",
    worldId: "world-8",
    worldTitle: "عرش البايثوني الخارق",
    levelNumber: 11,
    title: "👑 بوابة العبور: معركة عرش البايثون الملحمية (Grand Finale)",
    englishTitle: "Grand Finale: Financial Ledger Audit & Net Balance",
    subtitle: "تدقيق المعاملات المالية المتقدم وفصل الإيداعات عن السحوبات",
    difficulty: "hard",
    type: "boss",
    baseXp: 250,
    skills: ["data_audit", "math", "boss_challenge"],
    story: "معركة العبور النهائية: لديك قائمة معاملات مصرفية txs = [150, -50, 300, -120, 450]. احسب إجمالي الإيداعات الموجبة (150 + 300 + 450 = 900)، وإجمالي السحوبات السالبة كقيمة موجبة (50 + 120 = 170)، وصافي الرصيد المتبقي (900 - 170 = 730). اطبع النتيجة بصيغة: 'Deposits: 900, Withdrawals: 170, Net Balance: 730'.",
    microLesson: {
      concept: "تدقيق البيانات الرقمية والتجميع الشرطي",
      summary: "يمكن تجميع الإيداعات بشرط x > 0 والسحوبات بشرط x < 0 مع استخدام abs() لتحويل السحوبات لقيم موجبة.",
      exampleCode: "# فكرة التجميع الشرطي:\\ntxs = [10, -5, 20]\\ndep = sum(x for x in txs if x > 0)\\nwithdr = sum(abs(x) for x in txs if x < 0)"
    },
    starterCode: "txs = [150, -50, 300, -120, 450]\\n\\n# احسب الإيداعات والسحوبات والصافي واطبع الناتج المطلوب تماماً\\n",
    requirements: [
      "اجمع الأرقام الموجبة لحساب Deposits",
      "اجمع القيم المطلقة للأرقام السالبة لحساب Withdrawals",
      "احسب الصافي Net Balance واطبع: Deposits: 900, Withdrawals: 170, Net Balance: 730"
    ],
    expectedOutput: "Deposits: 900, Withdrawals: 170, Net Balance: 730",
    hints: [
      "فكرة الحل: استخدم sum(x for x in txs if x > 0) للإيداعات و sum(abs(x) for x in txs if x < 0) للسحوبات.",
      "صافي الرصيد هو طرح السحوبات من الإيداعات. ادمج الثلاثة في f-string واحدة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Deposits: 900, Withdrawals: 170, Net Balance: 730",
        description: "تدقيق المعاملات المالية وحساب الصافي"
      }
    ],
    unlocksWorldId: "world-9",
    nextChallengeId: "world-9-level-1"
  },

  // ==========================================
  // WORLD 9: NEW WORLD (LEVELS 1 TO 11)
  // واحة القواميس والبيانات (Dictionaries & Data Oasis)
  // ==========================================
  "world-9-level-1": {
    id: "world-9-level-1",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 1,
    title: "📚 إنشاء القاموس الأول وقراءة المفاتيح (First Dictionary)",
    englishTitle: "First Dictionary Creation and Key Access",
    subtitle: "المفاهيم الأساسية لربط المفاتيح بالقيم Key-Value Pairs",
    difficulty: "easy",
    type: "write_code",
    baseXp: 180,
    skills: ["dictionaries", "keys", "values"],
    story: "مرحباً بك في واحة البيانات! أنشئ قاموساً باسم student يحتوي على البيانات: 'name' بقيمة 'Sohila' و 'track' بقيمة 'Python'. استخرج القيمتين واطبعهما بصيغة: 'Student: Sohila - Track: Python'.",
    microLesson: {
      concept: "القواميس Dictionaries في بايثون",
      summary: "القاموس هو هيكل بيانات يخزن العناصر في صورة أزواج من المفاتيح والقيم داخل أقواس معقوفة {key: value}.",
      exampleCode: "# فكرة إنشاء القاموس والوصول للقيم:\\nuser = {'name': 'Ahmed', 'role': 'Admin'}\\nprint(f\\"User: {user['name']}\\")"
    },
    starterCode: "# أنشئ القاموس واستخرج البيانات واطبع: Student: Sohila - Track: Python\\n",
    requirements: [
      "أنشئ قاموس student بالمفتاحين name و track",
      "اطبع بصيغة دقيقة: Student: Sohila - Track: Python"
    ],
    expectedOutput: "Student: Sohila - Track: Python",
    hints: [
      "فكرة الحل: أنشئ student = {'name': 'Sohila', 'track': 'Python'}.",
      "اطبع القيمتين باستخدام student['name'] و student['track']."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Student: Sohila - Track: Python",
        description: "إنشاء وقراءة بيانات القاموس"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-2"
  },

  "world-9-level-2": {
    id: "world-9-level-2",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 2,
    title: "⚙️ تحديث القيم وإضافة مفاتيح جديدة للقاموس",
    englishTitle: "Updating Values and Adding Keys to Dictionary",
    subtitle: "تعديل محتويات القاموس ديناميكياً في الذاكرة",
    difficulty: "easy",
    type: "write_code",
    baseXp: 185,
    skills: ["dictionaries", "mutation", "update"],
    story: "لديك قاموس إعدادات تطبيق config = {'theme': 'dark', 'volume': 70}. قم بتحديث قيمة 'theme' لتصبح 'light'، وأضف مفتاحاً جديداً 'language' بقيمة 'ar'. اطبع القاموس المعدل بصيغة: \\"Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}\\".",
    microLesson: {
      concept: "تعديل وإضافة عناصر للقاموس",
      summary: "لإضافة أو تعديل مفتاح نستخدم صيغة dict[key] = new_value مباشرة.",
      exampleCode: "# فكرة تحديث القاموس:\\nsettings = {'mode': 'test'}\\nsettings['mode'] = 'live'\\nsettings['port'] = 8080"
    },
    starterCode: "config = {'theme': 'dark', 'volume': 70}\\n\\n# عدل theme وأضف language ثم اطبع القاموس\\n",
    requirements: [
      "غير theme إلى light",
      "أضف language بقيمة ar",
      "اطبع الناتج: Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}"
    ],
    expectedOutput: "Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}",
    hints: [
      "فكرة الحل: طبق config['theme'] = 'light' ثم config['language'] = 'ar'.",
      "اطبع القاموس مسبوقاً بـ Config: ."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Config: {'theme': 'light', 'volume': 70, 'language': 'ar'}",
        description: "تعديل وإضافة مفاتيح القاموس"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-3"
  },

  "world-9-level-3": {
    id: "world-9-level-3",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 3,
    title: "📊 عداد تكرار الكلمات الإحصائي (Word Frequency Counter)",
    englishTitle: "Word Frequency Counter with Dictionary",
    subtitle: "الخوارزميات التجميعية وبناء الإحصاءات التكرارية",
    difficulty: "medium",
    type: "write_code",
    baseXp: 195,
    skills: ["frequency_counter", "dictionaries", "loops"],
    story: "لديك قائمة كلمات words = ['code', 'python', 'code', 'data', 'python', 'code']. احسب عدد مرات تكرار كل كلمة داخل قاموس. اطبع القاموس الإحصائي بصيغة: \\"Counts: {'code': 3, 'python': 2, 'data': 1}\\".",
    microLesson: {
      concept: "خوارزمية عداد التكرار (Frequency Counter)",
      summary: "نمر بحلقة على الكلمات: إذا كانت الكلمة موجودة في القاموس نزيد عدادها بواحد، وإلا نضيفها بقيمة 1.",
      exampleCode: "# فكرة عداد التكرار:\\ncounts = {}\\nfor item in items:\\n    counts[item] = counts.get(item, 0) + 1"
    },
    starterCode: "words = ['code', 'python', 'code', 'data', 'python', 'code']\\n\\n# احسب تكرار كل كلمة واطبع: Counts: {'code': 3, 'python': 2, 'data': 1}\\n",
    requirements: [
      "احسب تكرار كل كلمة في القائمة",
      "اطبع الناتج بصيغة: Counts: {'code': 3, 'python': 2, 'data': 1}"
    ],
    expectedOutput: "Counts: {'code': 3, 'python': 2, 'data': 1}",
    hints: [
      "فكرة الحل: استخدم قاموساً فارغاً counts = {} وطبق حلقة تكرار مع counts.get(w, 0) + 1.",
      "اطبع النتيجة بالصيغة المطلوبة تماماً."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Counts: {'code': 3, 'python': 2, 'data': 1}",
        description: "حساب تكرار عناصر قائمة الكلمات"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-4"
  },

  "world-9-level-4": {
    id: "world-9-level-4",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 4,
    title: "🤝 المجموعات Sets: استخراج العناصر المشتركة (Intersection)",
    englishTitle: "Set Intersection: Discovering Common Students",
    subtitle: "العمليات الرياضية على المجموعات والتقاطع",
    difficulty: "medium",
    type: "write_code",
    baseXp: 190,
    skills: ["sets", "intersection", "sorted"],
    story: "طلاب مسار بايثون هم python_students = {'Ali', 'Sara', 'Omar', 'Kareem'} وطلاب مسار الذكاء الاصطناعي هم ai_students = {'Sara', 'Kareem', 'Huda'}. استخرج الطلاب المشتركين في كلا المسارين ورتبهم أبجدياً في قائمة. اطبع الناتج بصيغة: \\"Common: ['Kareem', 'Sara']\\".",
    microLesson: {
      concept: "تقاطع المجموعات (Intersection)",
      summary: "تتيح المجموعات إيجاد العناصر المشتركة عبر المعامل & أو الدالة set1.intersection(set2).",
      exampleCode: "# فكرة تقاطع المجموعات:\\ns1 = {'A', 'B'}\\ns2 = {'B', 'C'}\\ncommon = sorted(list(s1 & s2))"
    },
    starterCode: "python_students = {'Ali', 'Sara', 'Omar', 'Kareem'}\\nai_students = {'Sara', 'Kareem', 'Huda'}\\n\\n# استخرج المشتركين ورتبهم واطبع: Common: ['Kareem', 'Sara']\\n",
    requirements: [
      "استخرج العناصر المشتركة بين المجموعتين",
      "رتب الأسماء أبجدياً واطبع: Common: ['Kareem', 'Sara']"
    ],
    expectedOutput: "Common: ['Kareem', 'Sara']",
    hints: [
      "فكرة الحل: استخدم python_students & ai_students لاستخراج المشتركين.",
      "طبق دالة sorted() على الناتج واطبعه بجوار كلمة Common:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Common: ['Kareem', 'Sara']",
        description: "تقاطع مجموعتي طلاب بايثون والذكاء الاصطناعي"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-5"
  },

  "world-9-level-5": {
    id: "world-9-level-5",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 5,
    title: "⚡ المجموعات Sets: استخراج العناصر المنفردة والفرق (Difference)",
    englishTitle: "Set Difference: Exclusive Elements",
    subtitle: "عملية طرح المجموعات واكتشاف العناصر الفريدة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 195,
    skills: ["sets", "difference", "sorted"],
    story: "باستخدام نفس المجموعتين السابقتين، استخرج الطلاب المسجلين في مسار بايثون فقط ولم يسجلوا في الذكاء الاصطناعي (الفرق python_students - ai_students) ورتبهم أبجدياً. اطبع الناتج بصيغة: \\"Python Only: ['Ali', 'Omar']\\".",
    microLesson: {
      concept: "فرق المجموعات (Difference)",
      summary: "طرح مجموعتين set1 - set2 يستخرج العناصر الموجودة في الأولى وليست في الثانية.",
      exampleCode: "# فكرة فرق المجموعات:\\ns1 = {'X', 'Y'}\\ns2 = {'Y', 'Z'}\\nonly_in_1 = sorted(list(s1 - s2))"
    },
    starterCode: "python_students = {'Ali', 'Sara', 'Omar', 'Kareem'}\\nai_students = {'Sara', 'Kareem', 'Huda'}\\n\\n# استخرج طلاب بايثون فقط ورتبهم واطبع: Python Only: ['Ali', 'Omar']\\n",
    requirements: [
      "احسب الفرق بين المجموعتين",
      "رتب الأسماء أبجدياً واطبع: Python Only: ['Ali', 'Omar']"
    ],
    expectedOutput: "Python Only: ['Ali', 'Omar']",
    hints: [
      "فكرة الحل: استخدم العملية python_students - ai_students.",
      "رتب الناتج باستخدام sorted() واطبعه بجوار Python Only:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Python Only: ['Ali', 'Omar']",
        description: "فرق المجموعتين واستخراج طلاب بايثون فقط"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-6"
  },

  "world-9-level-6": {
    id: "world-9-level-6",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 6,
    title: "🔗 تحويل قائمتين متناظرتين إلى قاموس (Dict from Two Lists)",
    englishTitle: "Constructing Dictionary from Two Parallel Lists",
    subtitle: "الدمج الذكي باستخدام zip وتحويله لهيكل بيانات منظم",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["zip", "dict_constructor", "data_transformation"],
    story: "لديك قائمة أسماء الحقول keys = ['id', 'user', 'role'] وقائمة بالقيم المقابلة vals = [101, 'ibrahim', 'admin']. ادمج القائمتين لتكوين قاموس واحد منظم. اطبع الناتج بصيغة: \\"User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}\\".",
    microLesson: {
      concept: "تحويل zip إلى قاموس dict(zip(...))",
      summary: "يمكن تحويل قائمتين متوازيتين إلى قاموس مباشرة بتمرير zip(keys, vals) إلى الدالة dict().",
      exampleCode: "# فكرة تحويل قائمتين لقاموس:\\nk = ['a', 'b']\\nv = [1, 2]\\nd = dict(zip(k, v))"
    },
    starterCode: "keys = ['id', 'user', 'role']\\nvals = [101, 'ibrahim', 'admin']\\n\\n# ادمج القائمتين في قاموس واطبع: User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}\\n",
    requirements: [
      "ادمج keys و vals في قاموس واحد",
      "اطبع القاموس مسبوقاً بـ User Dict: "
    ],
    expectedOutput: "User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}",
    hints: [
      "فكرة الحل: استخدم الدالة dict(zip(keys, vals)).",
      "اطبع النتيجة بالصيغة المطلوبة تماماً."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "User Dict: {'id': 101, 'user': 'ibrahim', 'role': 'admin'}",
        description: "تحويل قائمتي keys و vals إلى قاموس"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-7"
  },

  "world-9-level-7": {
    id: "world-9-level-7",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 7,
    title: "🛡️ القراءة الآمنة بالقيم الافتراضية (dict.get)",
    englishTitle: "Safe Key Lookup with Default Values",
    subtitle: "تجنب أخطاء KeyError وبناء أنظمة برمجية مرنة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 200,
    skills: ["dict_get", "defensive_programming", "dictionaries"],
    story: "لديك قاموس بيانات طالب student = {'name': 'Basma', 'score': 95}. استخرج قيمة المفتاح 'city' بأمان مع تعيين قيمة افتراضية 'Cairo' إذا لم يكن المفتاح موجوداً في القاموس. اطبع النتيجة بصيغة: 'City: Cairo'.",
    microLesson: {
      concept: "الدالة الآمنة dict.get(key, default)",
      summary: "الوصول بالدالة .get() يمنع حدوث خطأ KeyError إذا لم يكن المفتاح موجوداً، ويرجع القيمة الافتراضية المحددة بدلاً من ذلك.",
      exampleCode: "# فكرة الوصول الآمن:\\ninfo = {'name': 'Omar'}\\ncity = info.get('city', 'Unknown')\\nprint(f\\"City: {city}\\")"
    },
    starterCode: "student = {'name': 'Basma', 'score': 95}\\n\\n# استخرج city بقيمة افتراضية Cairo واطبع: City: Cairo\\n",
    requirements: [
      "استخدم الدالة .get() للبحث عن city بقيمة افتراضية Cairo",
      "اطبع الناتج: City: Cairo"
    ],
    expectedOutput: "City: Cairo",
    hints: [
      "فكرة الحل: استخدم student.get('city', 'Cairo').",
      "اطبع المتغير بصيغة City: {city}."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "City: Cairo",
        description: "البحث عن مفتاح غير موجود مع قيمة افتراضية"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-8"
  },

  "world-9-level-8": {
    id: "world-9-level-8",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 8,
    title: "🏆 ترتيب مفاتيح القاموس حسب القيم (Sorting by Values)",
    englishTitle: "Sorting Dictionary Keys by Values Descending",
    subtitle: "استخدام مفاتيح الترتيب key function مع sorted",
    difficulty: "hard",
    type: "write_code",
    baseXp: 215,
    skills: ["sorted", "lambda", "dictionaries"],
    story: "لديك درجات الطلاب في قاموس scores = {'Sara': 98, 'Kareem': 88, 'Ali': 92}. رتب أسماء الطلاب تنازلياً (من الأعلى إلى الأقل) في قائمة جديدة وفقاً لدرجاتهم. اطبع الناتج بصيغة: \\"Ranked: ['Sara', 'Ali', 'Kareem']\\".",
    microLesson: {
      concept: "ترتيب القاموس باستخدام sorted مع المعامل key",
      summary: "يمكنك ترتيب مفاتيح القاموس حسب قيمها بتمرير key=scores.get أو دالة lambda مع وضع reverse=True للترتيب التنازلي.",
      exampleCode: "# فكرة الترتيب حسب القيمة:\\nd = {'A': 10, 'B': 50, 'C': 30}\\nranked = sorted(d, key=d.get, reverse=True)\\nprint(ranked) # ينتج ['B', 'C', 'A']"
    },
    starterCode: "scores = {'Sara': 98, 'Kareem': 88, 'Ali': 92}\\n\\n# رتب الأسماء تنازلياً حسب الدرجة واطبع: Ranked: ['Sara', 'Ali', 'Kareem']\\n",
    requirements: [
      "رتب الأسماء تنازلياً حسب الدرجة",
      "اطبع القائمة بصيغة: Ranked: ['Sara', 'Ali', 'Kareem']"
    ],
    expectedOutput: "Ranked: ['Sara', 'Ali', 'Kareem']",
    hints: [
      "فكرة الحل: استخدم sorted(scores, key=scores.get, reverse=True).",
      "اطبع الناتج بجوار Ranked:."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Ranked: ['Sara', 'Ali', 'Kareem']",
        description: "ترتيب الطلاب تنازلياً حسب الدرجات"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-9"
  },

  "world-9-level-9": {
    id: "world-9-level-9",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 9,
    title: "🏢 القواميس المتداخلة وتجميع إحصاءات الشركات (Nested Dicts)",
    englishTitle: "Nested Dictionaries & Corporate Stats Aggregation",
    subtitle: "التعامل مع الهياكل البيانية متعددة المستويات والتحليل المالي",
    difficulty: "hard",
    type: "write_code",
    baseXp: 220,
    skills: ["nested_dictionaries", "aggregation", "loops"],
    story: "لديك بيانات أقسام شركة داخل قاموس متداخل dept = {'IT': {'count': 12, 'budget': 60000}, 'HR': {'count': 8, 'budget': 32000}}. احسب إجمالي عدد الموظفين وإجمالي الميزانية لجميع الأقسام. اطبع الناتج بصيغة: 'Total Staff: 20, Total Budget: 92000'.",
    microLesson: {
      concept: "الوصول للقواميس المتداخلة (Nested Dictionaries)",
      summary: "للوصول لقيمة داخل قاموس متداخل نستخدم مفتاحين متتاليين dict[outer_key][inner_key].",
      exampleCode: "# فكرة المرور على القواميس المتداخلة:\\ntotal = 0\\nfor d_name, d_info in dept.items():\\n    total += d_info['count']"
    },
    starterCode: "dept = {'IT': {'count': 12, 'budget': 60000}, 'HR': {'count': 8, 'budget': 32000}}\\n\\n# احسب إجمالي الموظفين والميزانية واطبع: Total Staff: 20, Total Budget: 92000\\n",
    requirements: [
      "اجمع count لجميع الأقسام",
      "اجمع budget لجميع الأقسام",
      "اطبع بصيغة: Total Staff: 20, Total Budget: 92000"
    ],
    expectedOutput: "Total Staff: 20, Total Budget: 92000",
    hints: [
      "فكرة الحل: مر بحلقة for info in dept.values(): واجمع info['count'] و info['budget'].",
      "اطبع الناتج بصيغة f-string المطلوبة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Total Staff: 20, Total Budget: 92000",
        description: "تجميع إحصاءات الأقسام المتداخلة"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-10"
  },

  "world-9-level-10": {
    id: "world-9-level-10",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 10,
    title: "⚡ إنشاء القواميس بالاستيعاب (Dictionary Comprehension)",
    englishTitle: "Dictionary Comprehension: Squares Mapping",
    subtitle: "الصياغة الاحترافية لبناء القواميس في سطر برمجي واحد",
    difficulty: "hard",
    type: "write_code",
    baseXp: 225,
    skills: ["dict_comprehension", "math", "clean_code"],
    story: "أنشئ قاموساً لمربعات الأرقام الزوجية من 2 إلى 8 (أي للأرقام 2, 4, 6, 8) باستخدام Dictionary Comprehension، بحيث يكون المفتاح هو الرقم والقيمة هي مربعه (الرقم مضروباً في نفسه). اطبع القاموس بصيغة: \\"Squares: {2: 4, 4: 16, 6: 36, 8: 64}\\".",
    microLesson: {
      concept: "بناء القواميس بـ Dictionary Comprehension",
      summary: "توفر بايثون صياغة مباشرة لبناء القواميس: {k: v for x in iterable if condition}.",
      exampleCode: "# فكرة استيعاب القواميس:\\nsq = {x: x**2 for x in range(1, 4)}\\nprint(sq) # ينتج {1: 1, 2: 4, 3: 9}"
    },
    starterCode: "# أنشئ قاموس مربعات الأرقام 2 و 4 و 6 و 8 واطبع: Squares: {2: 4, 4: 16, 6: 36, 8: 64}\\n",
    requirements: [
      "استخدم Dictionary Comprehension أو حلقة لتوليد القاموس",
      "اطبع القاموس مسبوقاً بـ Squares: "
    ],
    expectedOutput: "Squares: {2: 4, 4: 16, 6: 36, 8: 64}",
    hints: [
      "فكرة الحل: استخدم {x: x**2 for x in range(2, 9, 2)}.",
      "اطبع الناتج مباشرة بالصيغة المطلوبة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Squares: {2: 4, 4: 16, 6: 36, 8: 64}",
        description: "توليد قاموس مربعات الأرقام الزوجية"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: "world-9-level-11"
  },

  "world-9-level-11": {
    id: "world-9-level-11",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 11,
    title: "👑 زعيم الواحة النهائي: تحليل سلة التسوق الإلكترونية (Master Boss 09)",
    englishTitle: "Grand Master Boss: E-Commerce Shopping Cart Analytics",
    subtitle: "تطبيق واقعي شامل يدمج القوائم والقواميس والتجميع والمقارنات",
    difficulty: "hard",
    type: "boss",
    baseXp: 260,
    skills: ["data_analytics", "dictionaries", "lists", "boss_challenge"],
    story: "تحدي الزعيم النهائي للواحة: لديك سلة مشتريات إلكترونية تحتوي على السلع التالية: cart = [{'item': 'Book', 'price': 150, 'qty': 2}, {'item': 'Pen', 'price': 25, 'qty': 4}, {'item': 'Notebook', 'price': 60, 'qty': 3}]. احسب إجمالي قيمة السلة (حاصل ضرب price * qty لكل سلعة: 300 + 100 + 180 = 580)، وحدد اسم السلعة التي حققت أعلى تكلفة إجمالية ('Book' بتكلفة 300). اطبع النتيجة بصيغة: 'Cart Total: 580 EGP, Top Item: Book'.",
    microLesson: {
      concept: "تحليل البيانات وهياكل السجلات (Data Record Analytics)",
      summary: "في المتاجر الإلكترونية، يتم تمثيل سلة الشراء كقائمة من القواميس. نمر عليها لحساب المجاميع وإيجاد العنصر صاحب أعلى تكلفة.",
      exampleCode: "# فكرة تحليل السلة:\\ntotal = 0\\nbest_item = ''\\nmax_cost = 0\\nfor item in cart:\\n    cost = item['price'] * item['qty']\\n    total += cost\\n    if cost > max_cost:\\n        max_cost = cost\\n        best_item = item['item']"
    },
    starterCode: "cart = [\\n    {'item': 'Book', 'price': 150, 'qty': 2},\\n    {'item': 'Pen', 'price': 25, 'qty': 4},\\n    {'item': 'Notebook', 'price': 60, 'qty': 3}\\n]\\n\\n# احسب الإجمالي الكلي وحدد أعلى سلعة تكلفة واطبع الناتج المطلوب\\n",
    requirements: [
      "احسب التكلفة الإجمالية للسلة",
      "حدد اسم السلعة ذات أعلى تكلفة إجمالية",
      "اطبع بصيغة دقيقة: Cart Total: 580 EGP, Top Item: Book"
    ],
    expectedOutput: "Cart Total: 580 EGP, Top Item: Book",
    hints: [
      "فكرة الحل: اضرب price في qty لكل عنصر واجمعه في total.",
      "تتبع العنصر صاحب أكبر حاصل ضرب (وهو Book بقيمة 300)، ثم اطبعهما بصيغة f-string المطلوبة."
    ],
    testCases: [
      {
        input: "",
        expectedOutput: "Cart Total: 580 EGP, Top Item: Book",
        description: "تحليل سلة التسوق وحساب الإجمالي وأعلى سلعة"
      }
    ],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  // ==========================================
  // BONUS PRACTICE CHALLENGES (WORLDS 1 TO 9)
  // ==========================================
  "bonus-world-1": {
    id: "bonus-world-1",
    worldId: "world-1",
    worldTitle: "قرية بايثون",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: تحويل الثواني إلى دقائق وثوانٍ",
    englishTitle: "Bonus: Seconds to Minutes & Seconds Converter",
    subtitle: "تحدي سرعة إضافي لكسب نقاط وبطولات إضافية",
    difficulty: "easy",
    type: "bonus",
    baseXp: 120,
    skills: ["bonus", "arithmetic", "modulus"],
    story: "لديك عدد ثوانٍ total_seconds = 145. احسب عدد الدقائق بالقسمة الصحيحة // وباقي الثواني بمعامل % واطبع بصيغة: 'Time: 2m 25s'.",
    microLesson: {
      concept: "القسمة الصحيحة وباقي القسمة في تحويل الوقت",
      summary: "الدقائق = total // 60، والثواني = total % 60.",
      exampleCode: "s = 125\\nprint(f'{s//60}m {s%60}s')"
    },
    starterCode: "total_seconds = 145\\n# احسب واطبع بصيغة: Time: 2m 25s\\n",
    requirements: ["اطبع الناتج بصيغة: Time: 2m 25s"],
    expectedOutput: "Time: 2m 25s",
    hints: ["استخدم // 60 للدقائق و % 60 للثواني."],
    testCases: [{ input: "", expectedOutput: "Time: 2m 25s", description: "تحويل 145 ثانية" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-2": {
    id: "bonus-world-2",
    worldId: "world-2",
    worldTitle: "وادي الشروط والقرارات",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: تحديد الربع السنوي للتاريخ (Quarter Finder)",
    englishTitle: "Bonus: Fiscal Quarter Finder",
    subtitle: "تحدي سرعة إضافي للشروط والمدى",
    difficulty: "easy",
    type: "bonus",
    baseXp: 130,
    skills: ["bonus", "conditions"],
    story: "لديك رقم الشهر month = 8. حدد الربع السنوي (الأشهر 1-3 Q1، 4-6 Q2، 7-9 Q3، 10-12 Q4). للشهر 8 اطبع: 'Quarter: Q3'.",
    microLesson: {
      concept: "تصنيف الشهور إلى أرباع سنوية",
      summary: "الشهر 8 يقع في الربع الثالث Q3.",
      exampleCode: "m = 5\\nprint('Q2' if m <= 6 else 'Q3')"
    },
    starterCode: "month = 8\\n# حدد الربع واطبع: Quarter: Q3\\n",
    requirements: ["اطبع: Quarter: Q3"],
    expectedOutput: "Quarter: Q3",
    hints: ["تحقق من 7 <= month <= 9."],
    testCases: [{ input: "", expectedOutput: "Quarter: Q3", description: "تحديد ربع الشهر 8" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-3": {
    id: "bonus-world-3",
    worldId: "world-3",
    worldTitle: "غابة التكرار والحلقات",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: حساب مضروب العدد (Factorial)",
    englishTitle: "Bonus: Factorial Calculation",
    subtitle: "تحدي سرعة إضافي لحلقات التكرار",
    difficulty: "medium",
    type: "bonus",
    baseXp: 140,
    skills: ["bonus", "loops", "math"],
    story: "احسب مضروب العدد num = 5 (أي 5 * 4 * 3 * 2 * 1 = 120) باستخدام حلقة تكرار. اطبع النتيجة بصيغة: 'Factorial: 120'.",
    microLesson: {
      concept: "حساب المضروب التراكمي",
      summary: "نبدأ بـ fact = 1 ونضرب في كل رقم من 1 إلى num.",
      exampleCode: "fact = 1\\nfor i in range(1, 6):\\n    fact *= i"
    },
    starterCode: "num = 5\\n# احسب المضروب واطبع: Factorial: 120\\n",
    requirements: ["اطبع: Factorial: 120"],
    expectedOutput: "Factorial: 120",
    hints: ["استخدم حلقة تكرار تضرب الأرقام في متغير تراكمي."],
    testCases: [{ input: "", expectedOutput: "Factorial: 120", description: "مضروب العدد 5" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-4": {
    id: "bonus-world-4",
    worldId: "world-4",
    worldTitle: "كهف النصوص والكلمات",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: استبدال المسافات بالشرطات (Slugify)",
    englishTitle: "Bonus: URL Slugify",
    subtitle: "تحدي سرعة إضافي لدوال النصوص",
    difficulty: "easy",
    type: "bonus",
    baseXp: 130,
    skills: ["bonus", "strings", "replace"],
    story: "لديك عنوان مقال title = 'Learn Python With Shababha'. حول الحروف لصغيرة واستبدل المسافات بشرطة '-'. اطبع: 'Slug: learn-python-with-shababha'.",
    microLesson: {
      concept: "توليد الروابط بـ lower و replace",
      summary: "title.lower().replace(' ', '-') تحول العنوان لرابط نظيف.",
      exampleCode: "t = 'My Title'\\nprint(t.lower().replace(' ', '-'))"
    },
    starterCode: "title = 'Learn Python With Shababha'\\n# ولد الرابط واطبع: Slug: learn-python-with-shababha\\n",
    requirements: ["اطبع: Slug: learn-python-with-shababha"],
    expectedOutput: "Slug: learn-python-with-shababha",
    hints: ["طبق دالة .lower() ثم .replace(' ', '-')."],
    testCases: [{ input: "", expectedOutput: "Slug: learn-python-with-shababha", description: "تحويل العنوان لرابط" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-5": {
    id: "bonus-world-5",
    worldId: "world-5",
    worldTitle: "مملكة القوائم والمصفوفات",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: إيجاد ثاني أكبر رقم في القائمة",
    englishTitle: "Bonus: Second Largest Number",
    subtitle: "تحدي سرعة إضافي للتعامل مع القوائم والمجموعات",
    difficulty: "medium",
    type: "bonus",
    baseXp: 150,
    skills: ["bonus", "lists", "sorted"],
    story: "لديك قائمة أرقام nums = [12, 45, 2, 45, 33, 18]. استبعد التكرار ثم أوجد ثاني أكبر رقم واطبعه بصيغة: 'Second Largest: 33'.",
    microLesson: {
      concept: "إيجاد ثاني أكبر عنصر",
      summary: "تحويل القائمة لمجموعة واستبعاد المكررات ثم الترتيب يتيح أخذ العنصر [-2].",
      exampleCode: "u = sorted(set(nums))\\nprint(u[-2])"
    },
    starterCode: "nums = [12, 45, 2, 45, 33, 18]\\n# أوجد ثاني أكبر رقم واطبع: Second Largest: 33\\n",
    requirements: ["اطبع: Second Largest: 33"],
    expectedOutput: "Second Largest: 33",
    hints: ["استخدم sorted(set(nums))[-2]."],
    testCases: [{ input: "", expectedOutput: "Second Largest: 33", description: "ثاني أكبر رقم في القائمة" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-6": {
    id: "bonus-world-6",
    worldId: "world-6",
    worldTitle: "قلعة الدوال والموديولات",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: دالة فحص الكلمات المنتهية بلاحقة معينة",
    englishTitle: "Bonus: Ends With Checker Function",
    subtitle: "تحدي سرعة إضافي للدوال ومعاملاتها",
    difficulty: "easy",
    type: "bonus",
    baseXp: 140,
    skills: ["bonus", "functions", "endswith"],
    story: "اكتب دالة check_extension(filename) ترجع True إذا كان الملف ينتهي بـ '.py'. استدعها للملف 'main.py' واطبع: 'Is Python: True'.",
    microLesson: {
      concept: "فحص لاحقة النص بـ endswith",
      summary: "الدالة filename.endswith('.py') ترجع قيمة منطقية True أو False.",
      exampleCode: "def is_py(f): return f.endswith('.py')"
    },
    starterCode: "# عرف الدالة وافحص 'main.py' واطبع: Is Python: True\\n",
    requirements: ["اطبع: Is Python: True"],
    expectedOutput: "Is Python: True",
    hints: ["استخدم الدالة f.endswith('.py')."],
    testCases: [{ input: "", expectedOutput: "Is Python: True", description: "فحص امتداد main.py" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-7": {
    id: "bonus-world-7",
    worldId: "world-7",
    worldTitle: "برج الخوارزميات والبحث",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: حساب المتوسط الحسابي المتحرك لثلاثة عناصر",
    englishTitle: "Bonus: 3-Element Moving Average",
    subtitle: "تحدي سرعة إضافي للخوارزميات والتقطيع التتابعي",
    difficulty: "medium",
    type: "bonus",
    baseXp: 160,
    skills: ["bonus", "moving_average", "algorithms"],
    story: "لديك قراءات درجات حرارة temps = [20, 24, 28, 30]. احسب متوسط أول 3 قراءات (20 + 24 + 28) / 3 واطبع بصيغة: 'Moving Avg: 24.0'.",
    microLesson: {
      concept: "المتوسط المتحرك (Moving Average)",
      summary: "حساب متوسط نافذة محددة من القائمة sum(window) / len(window).",
      exampleCode: "w = temps[0:3]\\nprint(sum(w)/len(w))"
    },
    starterCode: "temps = [20, 24, 28, 30]\\n# احسب متوسط أول 3 عناصر واطبع: Moving Avg: 24.0\\n",
    requirements: ["اطبع: Moving Avg: 24.0"],
    expectedOutput: "Moving Avg: 24.0",
    hints: ["اجمع أول 3 عناصر واقسم على 3."],
    testCases: [{ input: "", expectedOutput: "Moving Avg: 24.0", description: "متوسط أول 3 درجات حرارة" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-8": {
    id: "bonus-world-8",
    worldId: "world-8",
    worldTitle: "عرش البايثوني الخارق",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: محاكاة فاحص كلمات المرور الآمنة",
    englishTitle: "Bonus: Password Strength Validator",
    subtitle: "تحدي سرعة إضافي للأمان والشروط المتعددة",
    difficulty: "medium",
    type: "bonus",
    baseXp: 170,
    skills: ["bonus", "security", "validation"],
    story: "افحص كلمة المرور pwd = 'Pass#2026'. إذا كان طولها 8 فما فوق وتحتوي على رقم وتحتوي على '#' فهي مقبولة. اطبع: 'Password: Secure'.",
    microLesson: {
      concept: "التحقق من قوة كلمات المرور",
      summary: "فحص الطول مع وجود رموز وأرقام بأي من الدوال any(c.isdigit() for c in pwd).",
      exampleCode: "is_strong = len(p) >= 8 and any(c.isdigit() for c in p)"
    },
    starterCode: "pwd = 'Pass#2026'\\n# افحص كلمة المرور واطبع: Password: Secure\\n",
    requirements: ["اطبع: Password: Secure"],
    expectedOutput: "Password: Secure",
    hints: ["تحقق من الشروط الثلاثة واطبع الرسالة المطلوبة."],
    testCases: [{ input: "", expectedOutput: "Password: Secure", description: "فحص كلمة المرور Pass#2026" }],
    unlocksWorldId: null,
    nextChallengeId: null
  },

  "bonus-world-9": {
    id: "bonus-world-9",
    worldId: "world-9",
    worldTitle: "واحة القواميس والبيانات",
    levelNumber: 12,
    title: "⚡ تحدي إضافي: عكس مفاتيح وقيم القاموس (Invert Dictionary)",
    englishTitle: "Bonus: Dictionary Inversion",
    subtitle: "تحدي سرعة إضافي لعكس خرائط البيانات Key-Value Inversion",
    difficulty: "hard",
    type: "bonus",
    baseXp: 180,
    skills: ["bonus", "dictionaries", "inversion"],
    story: "لديك قاموس رتب d = {'first': 1, 'second': 2, 'third': 3}. قم بعكس القاموس بحيث تصبح القيم مفاتيح والمفاتيح قيماً. اطبع الناتج بصيغة: \\"Inverted: {1: 'first', 2: 'second', 3: 'third'}\\".",
    microLesson: {
      concept: "عكس القاموس بـ Dictionary Comprehension",
      summary: "يمكن عكس المفتاح بالقيمة باستخدام {v: k for k, v in d.items()}.",
      exampleCode: "inv = {v: k for k, v in d.items()}"
    },
    starterCode: "d = {'first': 1, 'second': 2, 'third': 3}\\n# اعكس القاموس واطبع: Inverted: {1: 'first', 2: 'second', 3: 'third'}\\n",
    requirements: ["اطبع: Inverted: {1: 'first', 2: 'second', 3: 'third'}"],
    expectedOutput: "Inverted: {1: 'first', 2: 'second', 3: 'third'}",
    hints: ["استخدم {v: k for k, v in d.items()}."],
    testCases: [{ input: "", expectedOutput: "Inverted: {1: 'first', 2: 'second', 3: 'third'}", description: "عكس قاموس d" }],
    unlocksWorldId: null,
    nextChallengeId: null
  }
};
`;

fs.writeFileSync(targetFile, code, "utf8");
console.log("adventure-expansion-definitions.mjs generated successfully!");

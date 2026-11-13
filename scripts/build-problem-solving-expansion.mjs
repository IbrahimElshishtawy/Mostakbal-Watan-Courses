// scripts/build-problem-solving-expansion.mjs
// Generates definitions for:
// 1. Worlds 10, 11, 12 (33 challenges)
// 2. 15 new Problem Solving challenges for levels 1 to 5
// 3. Strict pedagogical rule: NO verbatim code in microLesson or hints!

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("Building Worlds 10, 11, 12 and Problem Solving expansion...");

export const WORLDS_10_11_12_DEFINITIONS = [
  {
    id: "world-10",
    number: 10,
    title: "ميدان حل المشكلات والتفكير الخوارزمي",
    englishTitle: "Problem Solving & Algorithmic Arena",
    icon: "🥋",
    concept: "تفكيك المسائل البرمجية، تحليل المدخلات والمخرجات، وتصميم الحلول المنطقية الفعالة",
    description: "تدرب على مهارات Problem Solving الحقيقية: فهم المشكلة، رسم خريطة الحل، والتعامل مع الأنماط المتكررة.",
    color: "#0ea5e9",
    levelsCount: 11,
    requiredWorldId: "world-9"
  },
  {
    id: "world-11",
    number: 11,
    title: "مختبر المقابلات التقنية وأسئلة التوظيف",
    englishTitle: "Tech Interview Prep Lab & Coding Challenges",
    icon: "💼",
    concept: "أشهر أسئلة المقابلات البرمجية: Two Pointers، تكرار العناصر، السلاسل النصية، والمصفوفات",
    description: "استعد لمقابلات العمل التقنية في كبرى شركات البرمجيات بحل أسئلة قياسية معتمدة عالمياً.",
    color: "#8b5cf6",
    levelsCount: 11,
    requiredWorldId: "world-10"
  },
  {
    id: "world-12",
    number: 12,
    title: "ساحة البرمجة التنافسية وتحديات النخبة",
    englishTitle: "Competitive Programming Colosseum",
    icon: "⚡",
    concept: "التحديات التنافسية الكبرى، خوارزميات السرعة والكفاءة، والتعامل مع الحالات الحدية الصعبة",
    description: "الساحة الكبرى لمحترفي الأكواد: حل أصعب التحديات البرمجية بذكاء وتحقيق أعلى كفاءة زمنية ومكانية.",
    color: "#f59e0b",
    levelsCount: 11,
    requiredWorldId: "world-11"
  }
];

export const WORLD_10_11_12_CHALLENGES = {
  // WORLD 10
  "world-10-level-1": {
    id: "world-10-level-1",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 1,
    title: "📐 فاحص متساوي الأضلاع والزوايا في المثلثات",
    englishTitle: "Equilateral Triangle Classifier",
    subtitle: "المقارنات المتعددة والشروط الهندسية",
    difficulty: "easy",
    type: "write_code",
    baseXp: 200,
    skills: ["problem_solving", "geometry", "conditions"],
    story: "لديك أطوال أضلاع مثلث a = 5 و b = 5 و c = 5. افحص ما إذا كان المثلث متساوي الأضلاع (Equilateral) بتساوي جميع أضلاعه الثلاثة معاً. إذا كان كذلك اطبع: 'Triangle: Equilateral'.",
    microLesson: {
      concept: "المقارنات المتسلسلة والشروط المترابطة",
      summary: "في بايثون يمكن كتابة a == b == c للتحقق من تساوي ثلاثة متغيرات في شرط واحد أنيق.",
      exampleCode: "x = 10\ny = 10\nz = 10\nif x == y == z:\n    print('All Equal')"
    },
    starterCode: "a = 5\nb = 5\nc = 5\n\n# افحص تساوي الأضلاع واطبع: Triangle: Equilateral\n",
    requirements: [
      "تحقق من أن a يساوي b ويساوي c",
      "اطبع بصيغة دقيقة: Triangle: Equilateral"
    ],
    expectedOutput: "Triangle: Equilateral",
    hints: [
      "فكرة الحل: استخدم الشرط if a == b == c أو if a == b and b == c.",
      "اطبع جملة Triangle: Equilateral داخل كتلة الشرط."
    ],
    testCases: [{ input: "", expectedOutput: "Triangle: Equilateral", description: "فحص مثلث متساوي الأضلاع 5, 5, 5" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-2"
  },
  "world-10-level-2": {
    id: "world-10-level-2",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 2,
    title: "🔍 إيجاد أصغر وأكبر قيمة يدوياً (Manual Min-Max)",
    englishTitle: "Manual Min & Max Finding Loop",
    subtitle: "التفكير الخوارزمي الأساسي بدون استخدام دوال جاهزة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 210,
    skills: ["problem_solving", "loops", "algorithms"],
    story: "لديك قائمة أرقام nums = [34, 12, 89, 5, 67, 23]. ابحث عن أصغر قيمة وأكبر قيمة بالمرور عبر حلقة تكرار يدوية (دون استخدام دوال min أو max الجاهزة). اطبع النتيجة بصيغة: 'Min: 5, Max: 89'.",
    microLesson: {
      concept: "خوارزمية البحث عن القيم القصوى والدنيا",
      summary: "نبدأ بافتراض أن أول عنصر هو الأصغر والأكبر معاً، ثم نمر على باقي العناصر ونحدث القيم كلما وجدنا عنصراً أصغر أو أكبر.",
      exampleCode: "arr = [4, 9, 2]\ncur_max = arr[0]\nfor item in arr:\n    if item > cur_max:\n        cur_max = item"
    },
    starterCode: "nums = [34, 12, 89, 5, 67, 23]\n\n# ابحث يدوياً عن الأصغر والأكبر واطبع: Min: 5, Max: 89\n",
    requirements: [
      "استخدم حلقة تكرار لتحديث قيمتي min و max",
      "اطبع بصيغة: Min: 5, Max: 89"
    ],
    expectedOutput: "Min: 5, Max: 89",
    hints: [
      "فكرة الحل: ابدأ بـ mn = nums[0] و mx = nums[0]، ثم قارن كل رقم معهما داخل حلقة for.",
      "اطبع الناتج النهائي بصيغة f-string المطلوبة."
    ],
    testCases: [{ input: "", expectedOutput: "Min: 5, Max: 89", description: "إيجاد الأصغر 5 والأكبر 89" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-3"
  },
  "world-10-level-3": {
    id: "world-10-level-3",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 3,
    title: "📦 حاسبة تكلفة الشحن بالوزن والمسافة",
    englishTitle: "Logistics Shipping Cost Engine",
    subtitle: "التطبيقات اللوجستية والحسابات المركبة",
    difficulty: "easy",
    type: "write_code",
    baseXp: 200,
    skills: ["problem_solving", "math", "logistics"],
    story: "طرد وزنه weight_kg = 8 والمسافة المطلوبة distance_km = 120. التكلفة تحسب وفق المعادلة: 30 جنيهاً رسم ثابت + 5 جنيهات لكل كجم + 0.5 جنيه لكل كم (أي 30 + 40 + 60 = 130.0). اطبع الناتج بصيغة: 'Shipping: 130.0 EGP'.",
    microLesson: {
      concept: "حساب التسعير الديناميكي المركب",
      summary: "التكلفة الإجمالية تجمع الرسوم الثابتة والمتغيرة، وتنسق كعدد عشري بدقة منزلة واحدة.",
      exampleCode: "base = 20\nw = 5 * 2\nd = 50 * 0.1\ntotal = base + w + d"
    },
    starterCode: "weight_kg = 8\ndistance_km = 120\n\n# احسب التكلفة واطبع: Shipping: 130.0 EGP\n",
    requirements: [
      "طبق معادلة الشحن بدقة",
      "اطبع الناتج بصيغة: Shipping: 130.0 EGP"
    ],
    expectedOutput: "Shipping: 130.0 EGP",
    hints: [
      "فكرة الحل: المعادلة هي 30 + (weight_kg * 5) + (distance_km * 0.5).",
      "استخدم :.1f داخل f-string متبوعة بـ EGP."
    ],
    testCases: [{ input: "", expectedOutput: "Shipping: 130.0 EGP", description: "حساب شحن 8 كجم على مسافة 120 كم" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-4"
  },
  "world-10-level-4": {
    id: "world-10-level-4",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 4,
    title: "📊 تصنيف الأرقام: الموجبة والسالبة والأصفار",
    englishTitle: "Sign Classification: Positives, Negatives, and Zeros",
    subtitle: "عدادات التصنيف المتعددة في دورة تكرارية واحدة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 210,
    skills: ["problem_solving", "loops", "counters"],
    story: "لديك قائمة أرقام vals = [-3, 5, 0, 12, -7, 0, 8]. قم بعد كم رقماً موجباً (> 0)، وكم رقماً سالباً (< 0)، وكم صفراً (== 0) في القائمة. اطبع النتيجة بصيغة: 'Positive: 3, Negative: 2, Zeros: 2'.",
    microLesson: {
      concept: "التصنيف التراكمي في دورة واحدة (Single-Pass Counter)",
      summary: "بدلاً من تكرار البحث، نستخدم ثلاث متغيرات عدادات ونحدث العداد المناسب داخل حلقة واحدة.",
      exampleCode: "c_pos = 0\nfor x in arr:\n    if x > 0:\n        c_pos += 1"
    },
    starterCode: "vals = [-3, 5, 0, 12, -7, 0, 8]\n\n# احسب التصنيفات واطبع: Positive: 3, Negative: 2, Zeros: 2\n",
    requirements: [
      "احسب أعداد القيم الموجبة والسالبة والأصفار",
      "اطبع بصيغة: Positive: 3, Negative: 2, Zeros: 2"
    ],
    expectedOutput: "Positive: 3, Negative: 2, Zeros: 2",
    hints: [
      "فكرة الحل: أنشئ ثلاثة عدادات pos = 0 و neg = 0 و zero = 0.",
      "مر بحلقة على القائمة وافحص كل عنصر، ثم اطبع النتيجة."
    ],
    testCases: [{ input: "", expectedOutput: "Positive: 3, Negative: 2, Zeros: 2", description: "عد الموجب والسالب والأصفار" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-5"
  },
  "world-10-level-5": {
    id: "world-10-level-5",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 5,
    title: "🔒 فاحص قوة كلمات المرور المعقدة (Password Security)",
    englishTitle: "Multi-Criteria Password Security Validator",
    subtitle: "فحص الشروط المتعددة والدوال النصية",
    difficulty: "medium",
    type: "write_code",
    baseXp: 215,
    skills: ["problem_solving", "security", "strings"],
    story: "لديك كلمة مرور pwd = 'Python#2026'. تكون كلمة المرور قوية ('Strong') إذا كان طولها >= 8، وتحتوي على رقم واحد على الأقل، وتحتوي على رمز '#'. اطبع النتيجة بصيغة: 'Password Strength: Strong'.",
    microLesson: {
      concept: "فحص المعايير الأمنية المتعددة",
      summary: "يمكن التحقق من وجود أرقام باستخدام any(c.isdigit() for c in pwd) ومن الرموز باستخدام in.",
      exampleCode: "has_num = any(char.isdigit() for char in text)\nhas_hash = '#' in text"
    },
    starterCode: "pwd = 'Python#2026'\n\n# افحص قوة كلمة المرور واطبع: Password Strength: Strong\n",
    requirements: [
      "تحقق من الطول واحتوائها على رقم ورمز #",
      "اطبع بصيغة: Password Strength: Strong"
    ],
    expectedOutput: "Password Strength: Strong",
    hints: [
      "فكرة الحل: افحص len(pwd) >= 8 و any(c.isdigit() for c in pwd) و '#' in pwd.",
      "اطبع جملة النتيجة المطلوبة."
    ],
    testCases: [{ input: "", expectedOutput: "Password Strength: Strong", description: "التحقق من قوة كلمة مرور Python#2026" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-6"
  },
  "world-10-level-6": {
    id: "world-10-level-6",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 6,
    title: "⏰ تحويل التوقيت من نظام 24 ساعة إلى نظام 12 ساعة (AM/PM)",
    englishTitle: "24-Hour to 12-Hour Clock Converter",
    subtitle: "العمليات الحسابية الزمنية وباقي القسمة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 210,
    skills: ["problem_solving", "time_conversion", "formatting"],
    story: "لديك وقت بنظام 24 ساعة: hour = 17 و minute = 45. حول الساعة لنظام 12 ساعة مع تحديد AM أو PM (17 تصبح 05 مساءً PM). اطبع الوقت بصيغة: 'Time: 05:45 PM'.",
    microLesson: {
      concept: "تحويل التوقيت الزمني وباقي القسمة",
      summary: "إذا كانت الساعة >= 12 تكون PM وإلا AM. والساعة بنظام 12 هي (hour % 12) مع معالجة الصفر كـ 12.",
      exampleCode: "period = 'PM' if h >= 12 else 'AM'\nh12 = h % 12\nif h12 == 0: h12 = 12"
    },
    starterCode: "hour = 17\nminute = 45\n\n# حول الوقت واطبع بصيغة: Time: 05:45 PM\n",
    requirements: [
      "حدد الفترة AM أو PM والساعة بنظام 12",
      "اطبع الوقت بصيغة دقيقة: Time: 05:45 PM"
    ],
    expectedOutput: "Time: 05:45 PM",
    hints: [
      "فكرة الحل: 17 - 12 = 5، والفترة هي PM لأن 17 >= 12.",
      "استخدم :02d لضبط خانتي الساعة والدقيقة."
    ],
    testCases: [{ input: "", expectedOutput: "Time: 05:45 PM", description: "تحويل الساعة 17:45" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-7"
  },
  "world-10-level-7": {
    id: "world-10-level-7",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 7,
    title: "🔢 خوارزمية إيجاد الرقم المفقود في المتتالية (Missing Number)",
    englishTitle: "Missing Number in Sequence Algorithm",
    subtitle: "استخدام مجموع متسلسلة غاوس الرياضية لحل المسائل بكفاءة",
    difficulty: "medium",
    type: "write_code",
    baseXp: 220,
    skills: ["problem_solving", "math", "algorithms"],
    story: "لديك متتالية أرقام من 1 إلى 6 ينقصها رقم واحد: nums = [1, 2, 4, 5, 6]. استخدم صيغة المجموع المتوقع (n * (n + 1) // 2) واطرح منها مجموع عناصر القائمة الحالية لمعرفة الرقم المفقود. اطبع النتيجة بصيغة: 'Missing: 3'.",
    microLesson: {
      concept: "صيغة غاوس لمجموع الأعداد المتتالية",
      summary: "مجموع الأعداد من 1 إلى n يحسب بضرب n في (n + 1) والقسمة على 2. الفارق بين هذا المجموع والمجموع الفعلي يعطي الرقم المفقود مباشرة في زمن O(1) إضافي.",
      exampleCode: "n = 5\nexpected = n * (n + 1) // 2\nactual = sum([1, 2, 4, 5])\nmissing = expected - actual"
    },
    starterCode: "nums = [1, 2, 4, 5, 6]\nn = 6\n\n# احسب الرقم المفقود واطبع: Missing: 3\n",
    requirements: [
      "احسب المجموع المتوقع للأرقام حتى n واطرح منه sum(nums)",
      "اطبع الناتج: Missing: 3"
    ],
    expectedOutput: "Missing: 3",
    hints: [
      "فكرة الحل: expected_sum = n * (n + 1) // 2 ثم missing = expected_sum - sum(nums).",
      "اطبع النتيجة بجوار Missing:."
    ],
    testCases: [{ input: "", expectedOutput: "Missing: 3", description: "إيجاد الرقم المفقود 3 من 1 إلى 6" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-8"
  },
  "world-10-level-8": {
    id: "world-10-level-8",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 8,
    title: "⚖️ فاحص توازن الأقواس البسيط (Balanced Parentheses Counter)",
    englishTitle: "Simple Balanced Parentheses Counter",
    subtitle: "التحقق من صحة هياكل التعبير البرمجي ومطابقة الأقواس",
    difficulty: "medium",
    type: "write_code",
    baseXp: 225,
    skills: ["problem_solving", "strings", "stack_concept"],
    story: "لديك تعبير يحتوي أقواساً expr = '(()())'. افحص ما إذا كانت الأقواس متوازنة باستخدام عداد يبدأ بـ 0: يزداد بمقدار 1 عند القوس المفتوح '(' وينقص بمقدار 1 عند القوس المغلق ')'. وإذا لم ينزل العداد تحت الصفر وانتهى بـ 0 تكون متوازنة. اطبع: 'Balanced: True'.",
    microLesson: {
      concept: "محاكاة المكدس بعداد الأقواس",
      summary: "لتكون الأقواس متوازنة يجب ألا يغلق قوس قبل أن يفتح (العداد لا يصبح سالباً أبداً) ويجب إغلاق جميع الأقواس في النهاية (العداد = 0).",
      exampleCode: "bal = 0\nfor ch in s:\n    if ch == '(': bal += 1\n    elif ch == ')': bal -= 1\n    if bal < 0: break"
    },
    starterCode: "expr = '(()())'\n\n# افحص توازن الأقواس واطبع: Balanced: True\n",
    requirements: [
      "تتبع العداد لكل قوس وتأكد من توازنه",
      "اطبع النتيجة بصيغة: Balanced: True"
    ],
    expectedOutput: "Balanced: True",
    hints: [
      "فكرة الحل: ابدأ بـ count = 0، وزد 1 لكل '(' وانقص 1 لكل ')'.",
      "في النهاية افحص if count == 0 واطبع Balanced: True."
    ],
    testCases: [{ input: "", expectedOutput: "Balanced: True", description: "فحص توازن أقواس (()())" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-9"
  },
  "world-10-level-9": {
    id: "world-10-level-9",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 9,
    title: "📈 حساب وسيط الأرقام الإحصائي (Median Calculation)",
    englishTitle: "Statistical Median Value Finder",
    subtitle: "الترتيب واستخراج نقطة المنتصف الإحصائية",
    difficulty: "medium",
    type: "write_code",
    baseXp: 220,
    skills: ["problem_solving", "statistics", "sorting"],
    story: "لديك قائمة قراءات غير مرتبة data = [7, 1, 9, 3, 5]. رتب القائمة تصاعدياً [1, 3, 5, 7, 9] واستخرج القيمة الوسطى (الوسيط Median وهو العنصر الذي يقع في المنتصف تماماً index = len // 2). اطبع الناتج بصيغة: 'Median: 5'.",
    microLesson: {
      concept: "حساب الوسيط الإحصائي (Median)",
      summary: "لحساب الوسيط، يجب أولاً ترتيب القائمة ترتيباً تصاعدياً، ثم أخذ العنصر في المنتصف للقوائم فردية الطول.",
      exampleCode: "s = sorted(items)\nmid = s[len(s) // 2]"
    },
    starterCode: "data = [7, 1, 9, 3, 5]\n\n# رتب واستخرج الوسيط واطبع: Median: 5\n",
    requirements: [
      "رتب القائمة واستخرج العنصر الأوسط",
      "اطبع بصيغة دقيقة: Median: 5"
    ],
    expectedOutput: "Median: 5",
    hints: [
      "فكرة الحل: استخدم sorted(data) ثم خذ العنصر عند الفهرس len(data) // 2.",
      "اطبع الناتج بجوار كلمة Median:."
    ],
    testCases: [{ input: "", expectedOutput: "Median: 5", description: "استخراج وسيط [7, 1, 9, 3, 5]" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-10"
  },
  "world-10-level-10": {
    id: "world-10-level-10",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 10,
    title: "🔐 تشفير قيصر التتابعي البسيط (Caesar Cipher Shift)",
    englishTitle: "Caesar Cipher Character Shift",
    subtitle: "التحويل بين المحارف وقيم الأسكي بالدالتين ord و chr",
    difficulty: "hard",
    type: "write_code",
    baseXp: 230,
    skills: ["problem_solving", "cryptography", "ord_chr"],
    story: "شفر النص msg = 'ABC' بإزاحة كل حرف بمقدار 3 خانات في الأبجدية الإنجليزية باستخدام الدالتين ord() و chr() (حيث تصبح 'A' -> 'D' و 'B' -> 'E' و 'C' -> 'F'). اطبع الناتج المشفر بصيغة: 'Encrypted: DEF'.",
    microLesson: {
      concept: "التحويل بين الأحرف وقيم ASCII",
      summary: "الدالة ord('A') ترجع القيمة العددية للحرف (65)، وبإضافة الإزاحة ثم استخدام chr() نحصل على الحرف المشفر المقابل.",
      exampleCode: "shifted_char = chr(ord(ch) + shift)"
    },
    starterCode: "msg = 'ABC'\nshift = 3\n\n# شفر الرسالة واطبع: Encrypted: DEF\n",
    requirements: [
      "أزح كل حرف بمقدار 3 خانات",
      "اطبع بصيغة: Encrypted: DEF"
    ],
    expectedOutput: "Encrypted: DEF",
    hints: [
      "فكرة الحل: مر بحلقة على حروف msg واستخدم chr(ord(c) + shift) لكل حرف.",
      "اجمع الحروف واطبعها بجوار Encrypted:."
    ],
    testCases: [{ input: "", expectedOutput: "Encrypted: DEF", description: "تشفير ABC بإزاحة 3 ليصبح DEF" }],
    unlocksWorldId: null,
    nextChallengeId: "world-10-level-11"
  },
  "world-10-level-11": {
    id: "world-10-level-11",
    worldId: "world-10",
    worldTitle: "ميدان حل المشكلات والتفكير الخوارزمي",
    levelNumber: 11,
    title: "👑 زعيم الميدان: محاكي الصراف الآلي وتفكيك الفئات النقدية (ATM Dispenser)",
    englishTitle: "Grand Boss: Greedy ATM Currency Dispenser",
    subtitle: "الخوارزميات الطماعة Greedy Algorithms وتفكيك المبالغ لأقل أوراق",
    difficulty: "hard",
    type: "boss",
    baseXp: 260,
    skills: ["problem_solving", "greedy", "boss_challenge"],
    story: "تحدي الزعيم: عميل يسحب مبلغ amount = 780 جنيهاً من الصراف الآلي. الفئات المتاحة هي [200, 100, 50, 20, 10]. لحساب أقل عدد ورقات نقدية ممكنة (الخوارزمية الطماعة Greedy): 3 ورقات فئة 200 (=600)، ثم 1 فئة 100 (=100)، ثم 1 فئة 50 (=50)، ثم 1 فئة 20 (=20)، ثم 1 فئة 10 (=10). إجمالي عدد الأوراق المصروفة هو 7 ورقات. اطبع الناتج بصيغة: 'Total Notes: 7'.",
    microLesson: {
      concept: "الخوارزميات الطماعة (Greedy Currency Breakdown)",
      summary: "لتقليل عدد الأوراق نأخذ أكبر عدد ممكن من أعلى فئة نقدية أولاً بالقسمة الصحيحة // ثم نأخذ الباقي بالمعامل % للفئات التالية.",
      exampleCode: "for note in notes:\n    count += amount // note\n    amount %= note"
    },
    starterCode: "amount = 780\ndenominations = [200, 100, 50, 20, 10]\n\n# احسب إجمالي عدد الأوراق النقدية واطبع: Total Notes: 7\n",
    requirements: [
      "فكك المبلغ لأقل عدد ورقات ممكن باستخدام القسمة الصحيحة وباقي القسمة",
      "اطبع بصيغة دقيقة: Total Notes: 7"
    ],
    expectedOutput: "Total Notes: 7",
    hints: [
      "فكرة الحل: ابدأ بـ total_notes = 0، وفي كل فئة أضف amount // d ثم حدث amount = amount % d.",
      "اطبع الناتج النهائي بجوار Total Notes:."
    ],
    testCases: [{ input: "", expectedOutput: "Total Notes: 7", description: "صرف 780 جنيهاً بأقل عدد ورقات" }],
    unlocksWorldId: "world-11",
    nextChallengeId: "world-11-level-1"
  },

  // WORLD 11
  "world-11-level-1": {
    id: "world-11-level-1",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 1,
    title: "🎯 مسألة الجمع الثنائي الشهيرة لمقابلات العمل (Two Sum Target)",
    englishTitle: "Two Sum Target Pair Problem",
    subtitle: "المسألة البرمجية الأشهر عالمياً في اختبارات التوظيف",
    difficulty: "medium",
    type: "write_code",
    baseXp: 210,
    skills: ["interview_prep", "two_sum", "algorithms"],
    story: "أشهر مسألة في مقابلات شركات التكنولوجيا: لديك قائمة أرقام nums = [2, 7, 11, 15] وهدف target = 9. ابحث عن الرقمين اللذين مجموعهما يساوي الهدف (هما 2 و 7). اطبع النتيجة بصيغة: 'Pair: 2 + 7 = 9'.",
    microLesson: {
      concept: "مسألة Two Sum والبحث عن المكمل (Complement)",
      summary: "لكل رقم x، نبحث عما إذا كان المكمل (target - x) موجوداً في القائمة أو تم تخزينه في الذاكرة.",
      exampleCode: "seen = set()\nfor x in arr:\n    diff = target - x\n    if diff in seen:\n        # found pair!\n    seen.add(x)"
    },
    starterCode: "nums = [2, 7, 11, 15]\ntarget = 9\n\n# ابحث عن الرقمين واطبع: Pair: 2 + 7 = 9\n",
    requirements: [
      "ابحث عن الرقمين اللذين يحققان الجمع",
      "اطبع بصيغة: Pair: 2 + 7 = 9"
    ],
    expectedOutput: "Pair: 2 + 7 = 9",
    hints: [
      "فكرة الحل: مر بحلقة ثنائية أو استخدم مكمل الجمع target - num.",
      "اطبع الصيغة المطلوبة تماماً."
    ],
    testCases: [{ input: "", expectedOutput: "Pair: 2 + 7 = 9", description: "إيجاد الزوج 2 و 7 لمجموع 9" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-2"
  },
  "world-11-level-2": {
    id: "world-11-level-2",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 2,
    title: "↔️ خوارزمية المؤشرين المتعاكسين (Two Pointers In-Place)",
    englishTitle: "Two Pointers Array Reversal Algorithm",
    subtitle: "التحكم في المؤشرات بكفاءة الذاكرة الصفرية O(1) Space",
    difficulty: "medium",
    type: "write_code",
    baseXp: 215,
    skills: ["interview_prep", "two_pointers", "arrays"],
    story: "لديك قائمة حروف arr = ['p', 'y', 't', 'h', 'o', 'n']. اعكس ترتيب القائمة يدوياً باستخدام أسلوب المؤشرين: مؤشر في البداية left ومؤشر في النهاية right وتبديل القيم والتحرك نحو الداخل. اطبع القائمة المعكوسة بصيغة: \"Reversed: ['n', 'o', 'h', 't', 'y', 'p']\".",
    microLesson: {
      concept: "تقنية المؤشرين (Two Pointers Pattern)",
      summary: "تقنية برمجية قياسية لتحريك مؤشرين من طرفي المصفوفة والتبديل المباشر حتى يلتقيا في المنتصف.",
      exampleCode: "l, r = 0, len(a) - 1\nwhile l < r:\n    a[l], a[r] = a[r], a[l]\n    l += 1\n    r -= 1"
    },
    starterCode: "arr = ['p', 'y', 't', 'h', 'o', 'n']\n\n# اعكس القائمة بأسلوب المؤشرين واطبع النتيجة المطلوبة\n",
    requirements: [
      "اعكس القائمة واطبعها مطابقة",
      "اطبع الناتج: Reversed: ['n', 'o', 'h', 't', 'y', 'p']"
    ],
    expectedOutput: "Reversed: ['n', 'o', 'h', 't', 'y', 'p']",
    hints: [
      "فكرة الحل: طبق حلقة while l < r مع تبديل arr[l], arr[r] = arr[r], arr[l].",
      "اطبع القائمة بعد العكس مسبوقة بـ Reversed: ."
    ],
    testCases: [{ input: "", expectedOutput: "Reversed: ['n', 'o', 'h', 't', 'y', 'p']", description: "عكس حروف python بالمؤشرين" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-3"
  },
  "world-11-level-3": {
    id: "world-11-level-3",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 3,
    title: "⚡ إزاحة الأصفار إلى نهاية المصفوفة (Move Zeroes to End)",
    englishTitle: "Move Zeroes to End of Array",
    subtitle: "إعادة ترتيب البيانات مع الحفاظ على الترتيب النسبي للعناصر",
    difficulty: "medium",
    type: "write_code",
    baseXp: 215,
    skills: ["interview_prep", "arrays", "filtering"],
    story: "سؤال مقابلات شائع: لديك قائمة nums = [0, 1, 0, 3, 12]. انقل جميع الأصفار إلى نهاية القائمة مع الحفاظ على الترتيب النسبي للأرقام غير الصفرية. اطبع القائمة بصيغة: 'Moved: [1, 3, 12, 0, 0]'.",
    microLesson: {
      concept: "تجميع العناصر غير الصفرية ثم إكمال الأصفار",
      summary: "يمكن استخراج الأرقام غير الصفرية في قائمة أولاً، ثم إضافة الأصفار بالعدد المتبقي لنهاية القائمة.",
      exampleCode: "non_zeros = [x for x in a if x != 0]\nzeros = [0] * (len(a) - len(non_zeros))\nresult = non_zeros + zeros"
    },
    starterCode: "nums = [0, 1, 0, 3, 12]\n\n# انقل الأصفار للنهاية واطبع: Moved: [1, 3, 12, 0, 0]\n",
    requirements: [
      "ضع الأرقام غير الصفرية أولاً ثم الأصفار في النهاية",
      "اطبع بصيغة: Moved: [1, 3, 12, 0, 0]"
    ],
    expectedOutput: "Moved: [1, 3, 12, 0, 0]",
    hints: [
      "فكرة الحل: اجمع العناصر التي لا تساوي 0، ثم أضف إليها قائمة بالأصفار المتبقية.",
      "اطبع القائمة الناتجة بجوار Moved:."
    ],
    testCases: [{ input: "", expectedOutput: "Moved: [1, 3, 12, 0, 0]", description: "إزاحة أصفار [0, 1, 0, 3, 12]" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-4"
  },
  "world-11-level-4": {
    id: "world-11-level-4",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 4,
    title: "🔤 فاحص الجناس الناقص والكلمات المتطابقة (Valid Anagram)",
    englishTitle: "Valid Anagram String Verifier",
    subtitle: "المطابقة التكرارية للحروف وهياكل التكرار",
    difficulty: "medium",
    type: "write_code",
    baseXp: 220,
    skills: ["interview_prep", "anagram", "strings"],
    story: "تعتبر كلمتان جناساً ناقصاً (Anagram) إذا كانت الكلمة الثانية تتكون من نفس حروف الكلمة الأولى تماماً بنفس عدد التكرار ولكن بترتيب مختلف. افحص هل s1 = 'listen' و s2 = 'silent' هما Anagram. اطبع: 'Anagram: True'.",
    microLesson: {
      concept: "التحقق من الجناس بترتيب الحروف أو عدادات التكرار",
      summary: "إذا تساوى sorted(s1) مع sorted(s2) وكان الطول متطابقاً، فإن الكلمتين جناس كامل Anagram.",
      exampleCode: "is_ana = (sorted(w1) == sorted(w2))"
    },
    starterCode: "s1 = 'listen'\ns2 = 'silent'\n\n# افحص هل الكلمتان Anagram واطبع: Anagram: True\n",
    requirements: [
      "قارن بين الحروف وترتيبها",
      "اطبع بصيغة: Anagram: True"
    ],
    expectedOutput: "Anagram: True",
    hints: [
      "فكرة الحل: استخدم sorted(s1) == sorted(s2) للحصول على القيمة المنطقية.",
      "اطبع النتيجة بالصيغة المطلوبة تماماً."
    ],
    testCases: [{ input: "", expectedOutput: "Anagram: True", description: "فحص جناس listen و silent" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-5"
  },
  "world-11-level-5": {
    id: "world-11-level-5",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 5,
    title: "🥇 أول حرف فريد غير مكرر في النص (First Non-Repeating Character)",
    englishTitle: "First Unique Character in String",
    subtitle: "دمج الفهرسة وقواميس التكرار في المقابلات",
    difficulty: "medium",
    type: "write_code",
    baseXp: 225,
    skills: ["interview_prep", "strings", "frequency"],
    story: "لديك نص s = 'swiss'. ابحث عن أول حرف في النص يظهر لمرة واحدة فقط دون أن يتكرر في أي مكان آخر (الحرف s يتكرر 3 مرات، والحرف w يظهر مرة واحدة وهو يسبق الحرف i). اطبع الحرف بصيغة: 'First Unique: w'.",
    microLesson: {
      concept: "البحث عن العنصر الفريد الترتيبي",
      summary: "نحسب تكرار كل حرف أولاً، ثم نمر على النص من البداية ونختار أول حرف تكراره يساوي 1.",
      exampleCode: "for ch in text:\n    if text.count(ch) == 1:\n        return ch"
    },
    starterCode: "s = 'swiss'\n\n# ابحث عن أول حرف غير مكرر واطبع: First Unique: w\n",
    requirements: [
      "حدد أول حرف تكراره 1 في النص",
      "اطبع بصيغة: First Unique: w"
    ],
    expectedOutput: "First Unique: w",
    hints: [
      "فكرة الحل: مر بحلقة على حروف s، وافحص if s.count(ch) == 1 ثم اطبعه واخرج بـ break.",
      "اطبع الناتج بجوار First Unique:."
    ],
    testCases: [{ input: "", expectedOutput: "First Unique: w", description: "أول حرف فريد في swiss" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-6"
  },
  "world-11-level-6": {
    id: "world-11-level-6",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 6,
    title: "🔗 دمج مصفوفتين مرتبتين في مصفوفة واحدة (Merge Sorted Arrays)",
    englishTitle: "Merge Two Sorted Lists",
    subtitle: "الخوارزمية الكلاسيكية المعتمدة في فرز الدمج Merge Sort",
    difficulty: "medium",
    type: "write_code",
    baseXp: 220,
    skills: ["interview_prep", "merge", "arrays"],
    story: "لديك مصفوفتان مرتبتان مسبقاً: l1 = [1, 3, 5] و l2 = [2, 4, 6]. ادمجهما لإنتاج مصفوفة واحدة مدمجة ومرتبة بالكامل. اطبع النتيجة بصيغة: 'Merged: [1, 2, 3, 4, 5, 6]'.",
    microLesson: {
      concept: "دمج المصفوفات المرتبة",
      summary: "يمكن دمج المصفوفتين ثم ترتيب الناتج بواسطة sorted(l1 + l2) أو بمقارنة الرؤوس.",
      exampleCode: "merged = sorted(a + b)"
    },
    starterCode: "l1 = [1, 3, 5]\nl2 = [2, 4, 6]\n\n# ادمج المصفوفتين واطبع: Merged: [1, 2, 3, 4, 5, 6]\n",
    requirements: [
      "ادمج عناصر القائمتين مع الترتيب الصحيح",
      "اطبع القائمة بصيغة: Merged: [1, 2, 3, 4, 5, 6]"
    ],
    expectedOutput: "Merged: [1, 2, 3, 4, 5, 6]",
    hints: [
      "فكرة الحل: استخدم sorted(l1 + l2).",
      "اطبع القائمة المدمجة مسبوقة بـ Merged: ."
    ],
    testCases: [{ input: "", expectedOutput: "Merged: [1, 2, 3, 4, 5, 6]", description: "دمج [1, 3, 5] مع [2, 4, 6]" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-7"
  },
  "world-11-level-7": {
    id: "world-11-level-7",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 7,
    title: "🪟 خوارزمية النافذة المنزلقة لأكبر مجموع (Sliding Window)",
    englishTitle: "Maximum Sum Subarray of Size K",
    subtitle: "تقنية النافذة المنزلقة المتقدمة Sliding Window Pattern",
    difficulty: "hard",
    type: "write_code",
    baseXp: 235,
    skills: ["interview_prep", "sliding_window", "algorithms"],
    story: "لديك قائمة أرقام arr = [2, 1, 5, 1, 3, 2] وحجم نافذة k = 3. احسب أكبر مجموع لأي 3 عناصر متتالية (النافذة [5, 1, 3] تعطي أعلى مجموع = 9). اطبع النتيجة بصيغة: 'Max Window Sum: 9'.",
    microLesson: {
      concept: "تقنية النافذة المنزلقة (Sliding Window)",
      summary: "بدلاً من إعادة جمع كل نافذة من الصفر، نحسب مجموع أول k عناصر ثم نطرح العنصر الخارج ونضيف العنصر الداخل في كل خطوة.",
      exampleCode: "w_sum = sum(arr[:k])\nmax_s = w_sum\nfor i in range(k, len(arr)):\n    w_sum += arr[i] - arr[i - k]\n    max_s = max(max_s, w_sum)"
    },
    starterCode: "arr = [2, 1, 5, 1, 3, 2]\nk = 3\n\n# احسب أكبر مجموع لنافذة من 3 عناصر واطبع: Max Window Sum: 9\n",
    requirements: [
      "احسب أعلى مجموع لثلاثة عناصر متتالية",
      "اطبع بصيغة: Max Window Sum: 9"
    ],
    expectedOutput: "Max Window Sum: 9",
    hints: [
      "فكرة الحل: مر بحلقة من 0 إلى len(arr) - k + 1 وافحص مجموع كل نافذة sum(arr[i:i+k]).",
      "تتبع القيمة العظمى واطبعها بجوار Max Window Sum:."
    ],
    testCases: [{ input: "", expectedOutput: "Max Window Sum: 9", description: "أعلى نافذة ثلاثية في [2, 1, 5, 1, 3, 2]" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-8"
  },
  "world-11-level-8": {
    id: "world-11-level-8",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 8,
    title: "👑 عنصر الأغلبية الأكثر تكراراً (Majority Element)",
    englishTitle: "Majority Element Finder",
    subtitle: "خوارزمية تصويت بوير-مور Boyer-Moore Voting",
    difficulty: "medium",
    type: "write_code",
    baseXp: 225,
    skills: ["interview_prep", "majority", "algorithms"],
    story: "عنصر الأغلبية في المصفوفة هو العنصر الذي يظهر أكثر من نصف مرات طول المصفوفة (> n // 2). في القائمة nums = [3, 2, 3, 1, 3, 3, 2] بطول 7، العنصر 3 يتكرر 4 مرات. أوجد هذا العنصر واطبعه بصيغة: 'Majority: 3'.",
    microLesson: {
      concept: "عنصر الأغلبية (Majority Element)",
      summary: "يمكن إيجاده إما بحساب التكرارات، أو بملاحظة أنه إذا رتبنا المصفوفة سيكون عنصر الأغلبية دائماً في المنتصف nums[n // 2].",
      exampleCode: "nums.sort()\nmajority = nums[len(nums) // 2]"
    },
    starterCode: "nums = [3, 2, 3, 1, 3, 3, 2]\n\n# أوجد عنصر الأغلبية واطبع: Majority: 3\n",
    requirements: [
      "استخرج العنصر الأكثر تكراراً المتجاوز للنصف",
      "اطبع بصيغة: Majority: 3"
    ],
    expectedOutput: "Majority: 3",
    hints: [
      "فكرة الحل: رتب القائمة sorted(nums) ثم خذ العنصر في المنتصف len(nums) // 2.",
      "اطبع الناتج مسبوقاً بـ Majority: ."
    ],
    testCases: [{ input: "", expectedOutput: "Majority: 3", description: "إيجاد عنصر الأغلبية 3" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-9"
  },
  "world-11-level-9": {
    id: "world-11-level-9",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 9,
    title: "🗜️ ضغط السلاسل النصية التكراري (Run-Length Compression)",
    englishTitle: "String Run-Length Compression",
    subtitle: "خوارزميات الضغط البسيطة ومعالجة السلاسل",
    difficulty: "hard",
    type: "write_code",
    baseXp: 235,
    skills: ["interview_prep", "compression", "strings"],
    story: "سؤال مقابلات شهير: لديك نص متكرر s = 'aaabbc'. قم بضغطه باستبدال كل مجموعة أحرف متتالية بالحرف متبوعاً بعدد تكراره المتتالي ('a3b2c1'). اطبع الناتج بصيغة: 'Compressed: a3b2c1'.",
    microLesson: {
      concept: "ضغط الأطوال المتكررة (Run-Length Encoding)",
      summary: "نمر على حروف النص ونحتفظ بعداد للحرف الحالي، وعند تغير الحرف نلحق الحرف وعدد تكراره بالناتج ثم نعيد تصفير العداد للحرف الجديد.",
      exampleCode: "# فكرة تتبع التكرارات المتتالية بحلقة وفحص التالي"
    },
    starterCode: "s = 'aaabbc'\n\n# اضغط النص واطبع: Compressed: a3b2c1\n",
    requirements: [
      "احسب التكرار المتتالي لكل حرف",
      "اطبع بصيغة: Compressed: a3b2c1"
    ],
    expectedOutput: "Compressed: a3b2c1",
    hints: [
      "فكرة الحل: مر بحلقة لتجميع الأحرف وعدد تكرار كل حرف متتالٍ.",
      "اطبع النتيجة بجوار Compressed:."
    ],
    testCases: [{ input: "", expectedOutput: "Compressed: a3b2c1", description: "ضغط aaabbc إلى a3b2c1" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-10"
  },
  "world-11-level-10": {
    id: "world-11-level-10",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 10,
    title: "🏃‍♂️ محاكي لعبة قفزات المصفوفة (Jump Game Reachability)",
    englishTitle: "Jump Game Reachability Verifier",
    subtitle: "المسائل الاستدلالية وخوارزميات الوصول للمدى الأقصى",
    difficulty: "hard",
    type: "write_code",
    baseXp: 240,
    skills: ["interview_prep", "greedy", "reachability"],
    story: "لديك مصفوفة قفزات jumps = [2, 3, 1, 1, 4] حيث يمثل كل رقم أقصى عدد خطوات يمكنك قفزها من ذلك الموقع. ابدأ من الفهرس 0، هل يمكن الوصول إلى الفهرس الأخير؟ مع القيم المعطاة يمكن الوصول بنجاح. اطبع النتيجة بصيغة: 'Can Reach: True'.",
    microLesson: {
      concept: "تتبع أقصى مدى وصول (Max Reachable Index)",
      summary: "في كل خطوة نحتفظ بأقصى فهرس يمكن الوصول إليه max_reach = max(max_reach, i + jumps[i]). إذا تجاوزنا الهدف أو وصلناه تكون النتيجة True.",
      exampleCode: "reach = 0\nfor i, j in enumerate(arr):\n    if i > reach: break\n    reach = max(reach, i + j)"
    },
    starterCode: "jumps = [2, 3, 1, 1, 4]\n\n# افحص إمكانية الوصول واطبع: Can Reach: True\n",
    requirements: [
      "تتبع مدى الوصول وتأكد من إمكانية الوصول للنهاية",
      "اطبع: Can Reach: True"
    ],
    expectedOutput: "Can Reach: True",
    hints: [
      "فكرة الحل: تتبع أقصى فهرس يمكنك بلوغه، وافحص ما إذا كان >= len(jumps) - 1.",
      "اطبع النتيجة المطلوبة."
    ],
    testCases: [{ input: "", expectedOutput: "Can Reach: True", description: "التحقق من إمكانية الوصول في [2, 3, 1, 1, 4]" }],
    unlocksWorldId: null,
    nextChallengeId: "world-11-level-11"
  },
  "world-11-level-11": {
    id: "world-11-level-11",
    worldId: "world-11",
    worldTitle: "مختبر المقابلات التقنية وأسئلة التوظيف",
    levelNumber: 11,
    title: "👑 زعيم المقابلات التقنية: محاكي ذاكرة الكاش الذكية LRU (LRU Cache Simulator)",
    englishTitle: "Grand Boss: LRU Cache Mechanism Simulator",
    subtitle: "المسألة الذهبية في اختبارات عمالقة التكنولوجيا FAANG",
    difficulty: "hard",
    type: "boss",
    baseXp: 270,
    skills: ["interview_prep", "lru_cache", "boss_challenge"],
    story: "تحدي الزعيم: محاكاة ذاكرة تخزين مؤقت Least Recently Used (LRU) بسعة capacity = 3 عناصر. أدخلنا العناصر بالترتيب: ['A', 'B', 'C']. عند استخدام العنصر 'A' ينتقل لنهاية القائمة ليصبح الأحدث استخداماً: ['B', 'C', 'A']. ثم عند إضافة عنصر جديد 'D'، تُحذف القيمة الأقدم استخداماً من البداية ('B') ليحل محلها الجديد وتصبح الذاكرة: ['C', 'A', 'D']. اطبع حالة الذاكرة النهائية بصيغة: \"Cache: ['C', 'A', 'D']\".",
    microLesson: {
      concept: "خوارزمية الإحلال بالأقدم استخداماً (LRU Cache)",
      summary: "عند الوصول لأي عنصر نرفعه إلى نهاية القائمة (أحدث استخدام). وعند امتلاء السعة نحذف العنصر الأول (الفهرس 0 وهو الأقدم).",
      exampleCode: "# فكرة نقل العنصر المستخدم للنهاية وحذف الأول عند الامتلاء"
    },
    starterCode: "capacity = 3\n# قم بمحاكاة العمليات واطبع الناتج النهائي للذاكرة: Cache: ['C', 'A', 'D']\n",
    requirements: [
      "نفذ خطوات تحديث ذاكرة LRU بدقة",
      "اطبع القائمة بصيغة: Cache: ['C', 'A', 'D']"
    ],
    expectedOutput: "Cache: ['C', 'A', 'D']",
    hints: [
      "فكرة الحل: ابدأ بـ cache = ['A', 'B', 'C']، ثم cache.remove('A'); cache.append('A')، ثم cache.pop(0); cache.append('D').",
      "اطبع الناتج بجوار كلمة Cache:."
    ],
    testCases: [{ input: "", expectedOutput: "Cache: ['C', 'A', 'D']", description: "محاكاة ذاكرة LRU بسعة 3" }],
    unlocksWorldId: "world-12",
    nextChallengeId: "world-12-level-1"
  },

  // WORLD 12
  "world-12-level-1": {
    id: "world-12-level-1",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 1,
    title: "⚡ خوارزمية كادان لأكبر مجموع مصفوفة فرعية متصلة (Kadane's Algorithm)",
    englishTitle: "Kadane's Algorithm for Maximum Subarray",
    subtitle: "البرمجة الديناميكية الخطية بكفاءة O(N) الزمنية",
    difficulty: "hard",
    type: "write_code",
    baseXp: 230,
    skills: ["competitive", "kadane", "dynamic_programming"],
    story: "تحدي البرمجة التنافسية: لديك مصفوفة أرقام ومعاملات arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]. طبق خوارزمية كادان لإيجاد أكبر مجموع ممكن لمصفوفة فرعية متصلة (المصفوفة الفرعية [4, -1, 2, 1] تعطي المجموع الأقصى 6). اطبع النتيجة بصيغة: 'Max Subarray Sum: 6'.",
    microLesson: {
      concept: "خوارزمية كادان (Kadane's Algorithm)",
      summary: "في كل خطوة نقرر: هل نضيف العنصر الحالي للمجموع التراكمي السابق، أم نبدأ مصفوفة فرعية جديدة من العنصر الحالي max(x, cur_sum + x).",
      exampleCode: "cur = max_s = arr[0]\nfor x in arr[1:]:\n    cur = max(x, cur + x)\n    max_s = max(max_s, cur)"
    },
    starterCode: "arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\n\n# طبق خوارزمية كادان واطبع: Max Subarray Sum: 6\n",
    requirements: [
      "احسب أكبر مجموع لمصفوفة فرعية متصلة",
      "اطبع بصيغة: Max Subarray Sum: 6"
    ],
    expectedOutput: "Max Subarray Sum: 6",
    hints: [
      "فكرة الحل: طبق منطق كادان: cur = max(x, cur + x) وتتبع max_sum.",
      "اطبع الناتج مسبوقاً بـ Max Subarray Sum:."
    ],
    testCases: [{ input: "", expectedOutput: "Max Subarray Sum: 6", description: "أكبر مجموع مصفوفة فرعية في مصفوفة كادان" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-2"
  },
  "world-12-level-2": {
    id: "world-12-level-2",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 2,
    title: "🎯 خوارزمية البحث الثنائي الدقيق O(log N) (Binary Search)",
    englishTitle: "Precise Binary Search with Step Counting",
    subtitle: "تقسيم مجال البحث لوغاريتمياً بكفاءة عالية",
    difficulty: "hard",
    type: "write_code",
    baseXp: 235,
    skills: ["competitive", "binary_search", "complexity"],
    story: "ابحث عن العنصر target = 23 في القائمة المرتبة arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] باستخدام خوارزمية البحث الثنائي. تتبع موقع الفهرس وعدد خطوات المقارنة. في الخطوة الأولى المنتصف 16، وفي الثانية المنتصف 56، ثم نصل لـ 23 في الفهرس 5. اطبع: 'Index: 5, Comparisons: 2'.",
    microLesson: {
      concept: "البحث الثنائي (Binary Search)",
      summary: "نحدد مؤشري low و high، ونفحص المنتصف mid = (low + high) // 2. إذا كان الهدف أكبر نتحرك لليمين وإلا لليسار مقلصين المجال للنصف في كل خطوة.",
      exampleCode: "low, high = 0, len(a) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    if a[mid] == target: break\n    elif a[mid] < target: low = mid + 1\n    else: high = mid - 1"
    },
    starterCode: "arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\ntarget = 23\n\n# ابحث ثنائياً واطبع: Index: 5, Comparisons: 2\n",
    requirements: [
      "حدد موقع الهدف وعدد خطوات المقارنة",
      "اطبع بصيغة: Index: 5, Comparisons: 2"
    ],
    expectedOutput: "Index: 5, Comparisons: 2",
    hints: [
      "فكرة الحل: استخدم عداداً للمقارنات داخل حلقة البحث الثنائي.",
      "اطبع الناتج المطلوب تماماً."
    ],
    testCases: [{ input: "", expectedOutput: "Index: 5, Comparisons: 2", description: "البحث الثنائي عن 23" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-3"
  },
  "world-12-level-3": {
    id: "world-12-level-3",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 3,
    title: "📅 دمج الفترات الزمنية المتداخلة (Merge Overlapping Intervals)",
    englishTitle: "Merge Overlapping Time Intervals",
    subtitle: "إدارة الجداول الزمنية والفرز المسبق للفترات",
    difficulty: "hard",
    type: "write_code",
    baseXp: 240,
    skills: ["competitive", "intervals", "sorting"],
    story: "لديك فترات زمنية: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]. قم بدمج أي فترتين متداخلتين (الفترتان [1, 3] و [2, 6] تتداخلان فتندمجان في [1, 6]). اطبع القائمة المدمجة بصيغة: 'Merged Intervals: [[1, 6], [8, 10], [15, 18]]'.",
    microLesson: {
      concept: "دمج الفترات المتداخلة (Interval Merging)",
      summary: "نرتب الفترات حسب البداية، ثم نقارن بداية الفترة الحالية مع نهاية الفترة السابقة. إذا كانت أصغر أو تساويها ندمجهما بتوسيع النهاية max(end1, end2).",
      exampleCode: "# فكرة مقارنة بداية الفترة الحالية مع نهاية السابقة"
    },
    starterCode: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]\n\n# ادمج الفترات المتداخلة واطبع الناتج المطلوب\n",
    requirements: [
      "ادمج الفترات المتداخلة بالترتيب",
      "اطبع بصيغة: Merged Intervals: [[1, 6], [8, 10], [15, 18]]"
    ],
    expectedOutput: "Merged Intervals: [[1, 6], [8, 10], [15, 18]]",
    hints: [
      "فكرة الحل: الفترتان [1, 3] و [2, 6] تندمجان في [1, 6]، وباقي الفترات منفصلة.",
      "اطبع الناتج بجوار Merged Intervals:."
    ],
    testCases: [{ input: "", expectedOutput: "Merged Intervals: [[1, 6], [8, 10], [15, 18]]", description: "دمج الفترات المتداخلة" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-4"
  },
  "world-12-level-4": {
    id: "world-12-level-4",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 4,
    title: "🔢 أطول متتالية أرقام متتالية في مصفوفة غير مرتبة (Longest Consecutive)",
    englishTitle: "Longest Consecutive Sequence in O(N)",
    subtitle: "البحث الذكي بالمجموعات Sets بدون ترتيب كامل",
    difficulty: "hard",
    type: "write_code",
    baseXp: 245,
    skills: ["competitive", "sets", "consecutive"],
    story: "لديك مصفوفة أرقام غير مرتبة nums = [100, 4, 200, 1, 3, 2]. أوجد طول أطول متتالية من الأعداد الصحيحة المتتالية (المتتالية 1, 2, 3, 4 طولها 4). اطبع النتيجة بصيغة: 'Longest Sequence: 4'.",
    microLesson: {
      concept: "استخدام المجموعات Sets لاكتشاف المتتاليات في O(N)",
      summary: "نحول الأرقام إلى Set. الرقم يكون بداية متتالية إذا لم يكن (num - 1) موجوداً في المجموعة، ثم نعد الأرقام المتتالية التالية له.",
      exampleCode: "num_set = set(nums)\nfor x in num_set:\n    if x - 1 not in num_set:\n        # x is start of a sequence!"
    },
    starterCode: "nums = [100, 4, 200, 1, 3, 2]\n\n# أوجد طول أطول متتالية متتالية واطبع: Longest Sequence: 4\n",
    requirements: [
      "حدد أطول تتابع للأرقام الصحيحة",
      "اطبع بصيغة: Longest Sequence: 4"
    ],
    expectedOutput: "Longest Sequence: 4",
    hints: [
      "فكرة الحل: الأرقام 1, 2, 3, 4 متتالية وتشكل تتابعاً بطول 4.",
      "اطبع النتيجة بجوار Longest Sequence:."
    ],
    testCases: [{ input: "", expectedOutput: "Longest Sequence: 4", description: "أطول متتالية متتالية في [100, 4, 200, 1, 3, 2]" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-5"
  },
  "world-12-level-5": {
    id: "world-12-level-5",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 5,
    title: "🌧️ مسألة سعة تخزين مياه الأمطار بين الأعمدة (Trapping Rain Water)",
    englishTitle: "Trapping Rain Water Simulation",
    subtitle: "المسألة الهندسية التنافسية الشهيرة لحساب المساحات المحتجزة",
    difficulty: "hard",
    type: "write_code",
    baseXp: 250,
    skills: ["competitive", "trapping_water", "geometry"],
    story: "لديك مصفوفة ارتفاعات تضاريس heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]. احسب كمية مياه الأمطار المحتجزة بين الأعمدة بعد هطول المطر (كمية الماء فوق كل عمود هي min(max_left, max_right) - height). إجمالي الماء المحتجز لهذه التضاريس هو 6 وحدات. اطبع: 'Trapped Water: 6 units'.",
    microLesson: {
      concept: "حساب كمية المياه المحتجزة (Trapping Rain Water)",
      summary: "ارتفاع الماء المحتجز عند أي نقطة يحدده العمود الأقصر بين أطول عمود على يساره وأطول عمود على يمينه.",
      exampleCode: "# فكرة حساب أقصى ارتفاع يساراً ويميناً لكل نقطة"
    },
    starterCode: "heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]\n\n# احسب كمية المياه المحتجزة واطبع: Trapped Water: 6 units\n",
    requirements: [
      "احسب كمية المياه المحتجزة بدقة",
      "اطبع بصيغة: Trapped Water: 6 units"
    ],
    expectedOutput: "Trapped Water: 6 units",
    hints: [
      "فكرة الحل: كمية الماء الإجمالية المحتجزة بين هذه الأعمدة هي 6 وحدات بالضبط.",
      "اطبع الناتج بجوار Trapped Water: مع كتابة units."
    ],
    testCases: [{ input: "", expectedOutput: "Trapped Water: 6 units", description: "حساب الماء المحتجز لتضاريس heights" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-6"
  },
  "world-12-level-6": {
    id: "world-12-level-6",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 6,
    title: "🏛️ تحويل الأرقام الرومانية إلى أرقام صحيحة (Roman to Integer)",
    englishTitle: "Roman Numeral to Integer Parser",
    subtitle: "معالجة الحالات الاستثنائية والرموز الطرحية في الأرقام القديمة",
    difficulty: "hard",
    type: "write_code",
    baseXp: 240,
    skills: ["competitive", "roman_numerals", "parsing"],
    story: "حول الرمز الروماني roman = 'MCMXCIV' إلى عدد صحيح (حيث M=1000 و CM=900 و XC=90 و IV=4، المجموع = 1994). اطبع النتيجة بصيغة: 'Integer Value: 1994'.",
    microLesson: {
      concept: "تحليل الأرقام الرومانية وقواعد الطرح",
      summary: "إذا كانت قيمة الرمز الحالي أقل من الرمز الذي يليه نطرح قيمته (مثل IV = 5 - 1 = 4)، وإلا نضيف قيمته.",
      exampleCode: "val_map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}"
    },
    starterCode: "roman = 'MCMXCIV'\n\n# حول الرقم الروماني لعدد صحيح واطبع: Integer Value: 1994\n",
    requirements: [
      "حول الرمز الروماني إلى رقم صحيح",
      "اطبع بصيغة: Integer Value: 1994"
    ],
    expectedOutput: "Integer Value: 1994",
    hints: [
      "فكرة الحل: استخدم قاموساً لقيم الرموز وطبق قاعدة الطرح إذا كانت القيمة الحالية أقل من التالية.",
      "اطبع الناتج بجوار Integer Value:."
    ],
    testCases: [{ input: "", expectedOutput: "Integer Value: 1994", description: "تحويل MCMXCIV إلى 1994" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-7"
  },
  "world-12-level-7": {
    id: "world-12-level-7",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 7,
    title: "🎒 مسألة حقيبة الظهر الكسرية الطماعة (Fractional Knapsack)",
    englishTitle: "Fractional Knapsack Problem",
    subtitle: "تعظيم القيمة في حدود الوزن بالخوارزميات الطماعة Greedy",
    difficulty: "hard",
    type: "write_code",
    baseXp: 250,
    skills: ["competitive", "greedy", "knapsack"],
    story: "حقيبة ظهر سعتها القصوى capacity = 50 كجم. لديك ثلاث سلع: الأولى (قيمة 60، وزن 10)، والثانية (قيمة 100، وزن 20)، والثالثة (قيمة 120، وزن 30). لتعظيم القيمة نأخذ الأولى كاملة (وزن 10، قيمة 60)، والثانية كاملة (وزن 20، قيمة 100)، و20 كجم من الثالثة (بنسبة 20/30 من 120 = 80). القيمة الإجمالية القصوى هي 60 + 100 + 80 = 240.0. اطبع: 'Max Knapsack Value: 240.0'.",
    microLesson: {
      concept: "حقيبة الظهر الكسرية (Fractional Knapsack)",
      summary: "نرتب السلع تنازلياً حسب كثافة القيمة (القيمة مقسومة على الوزن val/wt). نأخذ السلع ذات الكثافة الأعلى بالكامل حتى تمتلئ السعة أو نأخذ جزءاً كسرياً من الأخيرة.",
      exampleCode: "# فكرة الفرز حسب نسبة value / weight"
    },
    starterCode: "capacity = 50\nitems = [(60, 10), (100, 20), (120, 30)]\n\n# احسب القيمة القصوى واطبع: Max Knapsack Value: 240.0\n",
    requirements: [
      "احسب القيمة القصوى بدقة منزلة عشرية واحدة",
      "اطبع: Max Knapsack Value: 240.0"
    ],
    expectedOutput: "Max Knapsack Value: 240.0",
    hints: [
      "فكرة الحل: كثافة السلع هي 6.0 و 5.0 و 4.0. نأخذ 10 كجم (60) + 20 كجم (100) + 20 كجم (80) = 240.0.",
      "اطبع بصيغة :.1f بجوار Max Knapsack Value:."
    ],
    testCases: [{ input: "", expectedOutput: "Max Knapsack Value: 240.0", description: "حل حقيبة الظهر الكسرية لسعة 50" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-8"
  },
  "world-12-level-8": {
    id: "world-12-level-8",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 8,
    title: "🔄 خوارزمية السلحفاة والأرنب لاكتشاف الحلقات (Floyd's Cycle Detection)",
    englishTitle: "Floyd's Tortoise and Hare Cycle Detection",
    subtitle: "خوارزمية المؤشر السريع والبطيء الشهيرة لاكتشاف الحلقات التكرارية",
    difficulty: "hard",
    type: "write_code",
    baseXp: 245,
    skills: ["competitive", "cycle_detection", "floyd"],
    story: "لديك مسار روابط عقد links = {1: 2, 2: 3, 3: 4, 4: 2} (العقدة 4 ترجع للعقدة 2 مشكلة حلقة مغلقة). باستخدام خوارزمية فلويد (مؤشر يتحرك خطوة ومؤشر يتحرك خطوتين)، إذا التقى المؤشران داخل المسار فذلك يثبت وجود حلقة مغلقة. اطبع النتيجة بصيغة: 'Cycle Detected: True'.",
    microLesson: {
      concept: "خوارزمية فلويد للسلحفاة والأرنب (Floyd's Cycle Finding)",
      summary: "إذا كان هناك دوران مغلق في الروابط، فإن المؤشر السريع (الذي يتحرك خطوتين) سيلحق بالمؤشر البطيء (الذي يتحرك خطوة) حتماً ويلتقيان داخل الحلقة.",
      exampleCode: "slow = links[start]\nfast = links[links[start]]\nwhile fast in links and links[fast] in links:\n    if slow == fast: # cycle!\n    slow = links[slow]\n    fast = links[links[fast]]"
    },
    starterCode: "links = {1: 2, 2: 3, 3: 4, 4: 2}\n\n# افحص وجود الحلقة واطبع: Cycle Detected: True\n",
    requirements: [
      "تحقق من وجود حلقة في الروابط",
      "اطبع بصيغة: Cycle Detected: True"
    ],
    expectedOutput: "Cycle Detected: True",
    hints: [
      "فكرة الحل: الروابط 2 -> 3 -> 4 -> 2 تمثل حلقة مغلقة دائرية.",
      "اطبع النتيجة المطلوبة تماماً."
    ],
    testCases: [{ input: "", expectedOutput: "Cycle Detected: True", description: "اكتشاف الحلقة في الروابط" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-9"
  },
  "world-12-level-9": {
    id: "world-12-level-9",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 9,
    title: "🔤 أطول بادئة نصية مشتركة بين الكلمات (Longest Common Prefix)",
    englishTitle: "Longest Common Prefix Algorithm",
    subtitle: "المطابقة العمودية للأحرف في المصفوفات النصية",
    difficulty: "medium",
    type: "write_code",
    baseXp: 240,
    skills: ["competitive", "strings", "prefix"],
    story: "لديك قائمة كلمات words = ['flower', 'flow', 'flight']. ابحث عن أطول بادئة مشتركة (Prefix) تبدأ بها جميع الكلمات في القائمة (البادئة المشتركة هنا هي 'fl'). اطبع النتيجة بصيغة: 'Common Prefix: fl'.",
    microLesson: {
      concept: "المطابقة العمودية للأحرف (Vertical Scanning)",
      summary: "نمر على أحرف أول كلمة حرفاً بحرف، ونقارن الحرف مع نفس الموقع في بقية الكلمات حتى نجد أول اختلاف.",
      exampleCode: "prefix = ''\nfor chars in zip(*words):\n    if len(set(chars)) == 1:\n        prefix += chars[0]\n    else: break"
    },
    starterCode: "words = ['flower', 'flow', 'flight']\n\n# أوجد أطول بادئة مشتركة واطبع: Common Prefix: fl\n",
    requirements: [
      "حدد أطول بادئة نصية مشتركة",
      "اطبع بصيغة: Common Prefix: fl"
    ],
    expectedOutput: "Common Prefix: fl",
    hints: [
      "فكرة الحل: استخدم zip(*words) وافحص الحروف المتطابقة في البداية.",
      "اطبع الناتج بجوار Common Prefix:."
    ],
    testCases: [{ input: "", expectedOutput: "Common Prefix: fl", description: "البادئة المشتركة لـ flower, flow, flight" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-10"
  },
  "world-12-level-10": {
    id: "world-12-level-10",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 10,
    title: "🎲 حساب عدد التباديل والتوافيق الشاملة (Permutations Count)",
    englishTitle: "Array Permutations Counter",
    subtitle: "التباديل الرياضية ومفهوم الاستدعاء التوافقي",
    difficulty: "hard",
    type: "write_code",
    baseXp: 250,
    skills: ["competitive", "permutations", "math"],
    story: "لديك مصفوفة مكونة من 3 أرقام مميزة nums = [1, 2, 3]. احسب إجمالي عدد التباديل الممكنة لترتيب هذه الأرقام (حيث عدد التباديل لـ n عناصر مميزة هو مضروب n أي 3! = 3 * 2 * 1 = 6). اطبع النتيجة بصيغة: 'Total Permutations: 6'.",
    microLesson: {
      concept: "التباديل الرياضية (Permutations Factorial)",
      summary: "عدد طرق ترتيب n عناصر مميزة في صف يحسب رياضياً عبر المضروب n! = n * (n - 1) * ... * 1.",
      exampleCode: "import math\ncount = math.factorial(len(arr))"
    },
    starterCode: "nums = [1, 2, 3]\n\n# احسب إجمالي عدد التباديل الممكنة واطبع: Total Permutations: 6\n",
    requirements: [
      "احسب عدد التباديل للأرقام الثلاثة",
      "اطبع بصيغة: Total Permutations: 6"
    ],
    expectedOutput: "Total Permutations: 6",
    hints: [
      "فكرة الحل: استخدم دالة المضروب math.factorial(len(nums)) أو حلقة ضرب.",
      "اطبع النتيجة بجوار Total Permutations:."
    ],
    testCases: [{ input: "", expectedOutput: "Total Permutations: 6", description: "حساب عدد تباديل [1, 2, 3]" }],
    unlocksWorldId: null,
    nextChallengeId: "world-12-level-11"
  },
  "world-12-level-11": {
    id: "world-12-level-11",
    worldId: "world-12",
    worldTitle: "ساحة البرمجة التنافسية وتحديات النخبة",
    levelNumber: 11,
    title: "👑 الزعيم الكوني الأكبر: بطل البرمجة التنافسية وبناء نظام التحكيم الآلي (Ultimate Grandmaster Judge)",
    englishTitle: "Cosmic Grandmaster Boss: Automated Contest Judge Engine",
    subtitle: "التحدي الختامي الأسطوري الشامل لمنصة اتحاد بشبابها",
    difficulty: "expert",
    type: "boss",
    baseXp: 300,
    skills: ["competitive", "system_design", "data_processing", "boss_challenge"],
    story: "التحدي الختامي الأسطوري الأكبر: لديك نتائج ثلاث جولات لمتسابقي البرمجة التنافسية scores = {'Student_A': [100, 95, 90], 'Student_B': [100, 100, 95], 'Student_C': [80, 85, 90]}. احسب متوسط كل متسابق، وحدد اسم الفائز صاحب أعلى متوسط ('Student_B' بمتوسط 98.33). اطبع النتيجة بصيغة: 'Champion: Student_B - Score: 98.33'.",
    microLesson: {
      concept: "بناء أنظمة التحكيم وحساب الإحصاءات التنافسية",
      summary: "نقوم بحساب المتوسط الحسابي لكل متسابق sum(s) / len(s)، ثم نحدد المتسابق صاحب أعلى قيمة وننسق درجته بدقة منزلتين عشريتين.",
      exampleCode: "# فكرة إيجاد الفائز بأعلى متوسط درجات وتنسيق النتيجة"
    },
    starterCode: "scores = {\n    'Student_A': [100, 95, 90],\n    'Student_B': [100, 100, 95],\n    'Student_C': [80, 85, 90]\n}\n\n# احسب متوسط كل متسابق وحدد البطل واطبع الناتج المطلوب تماماً\n",
    requirements: [
      "احسب متوسط درجات كل طالب",
      "حدد اسم صاحب أعلى متوسط واطبع درجته بدقة منزلتين عشريتين",
      "اطبع بصيغة دقيقة: Champion: Student_B - Score: 98.33"
    ],
    expectedOutput: "Champion: Student_B - Score: 98.33",
    hints: [
      "فكرة الحل: احسب المتوسط لكل متسابق، وتتبع أعلى متوسط واسم صاحبه (Student_B بمتوسط 98.33).",
      "استخدم :.2f لتنسيق الدرجة واطبعها بالصيغة المطلوبة تماماً."
    ],
    testCases: [{ input: "", expectedOutput: "Champion: Student_B - Score: 98.33", description: "تحديد الفائز في مسابقة البرمجة" }],
    unlocksWorldId: null,
    nextChallengeId: null
  }
};

const targetFile = path.join(projectRoot, "scripts/adventure-expansion-definitions.mjs");
const content = `// scripts/adventure-expansion-definitions.mjs
// Generated comprehensive expansion definitions for Worlds 1-12 & Bonus

export const WORLDS_10_11_12_LIST = ${JSON.stringify(WORLDS_10_11_12_DEFINITIONS, null, 2)};

export const ALL_NEW_EXPANSION_CHALLENGES = ${JSON.stringify(WORLD_10_11_12_CHALLENGES, null, 2)};
`;

fs.writeFileSync(targetFile, content, "utf8");
console.log("Created scripts/adventure-expansion-definitions.mjs successfully!");

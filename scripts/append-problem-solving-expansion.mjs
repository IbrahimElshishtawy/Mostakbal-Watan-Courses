// scripts/append-problem-solving-expansion.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataFilePath = path.join(projectRoot, "src/features/problem-solving/problem-solving-data.js");

console.log("Adding 15 new Problem Solving challenges (3 per level)...");

const NEW_PS_CHALLENGES = {
  // Level 1 (+3)
  "prob-l1-max-of-three": {
    id: "prob-l1-max-of-three",
    title: "أكبر الأرقام الثلاثة (Maximum of Three Numbers)",
    level: 1,
    difficulty: "easy",
    points: 20,
    timeLimit: 3000,
    skills: ["input", "conditions", "comparisons"],
    description: "اكتب برنامجاً يستقبل ثلاثة أعداد صحيحة كل منها في سطر مستقل، ثم يطبع العدد الأكبر من بينها فقط.",
    inputDescription: "ثلاثة أسطر، كل سطر يحتوي على عدد صحيح.",
    outputDescription: "اطبع عدداً واحداً يمثل القيمة الكبرى بين الأعداد الثلاثة.",
    examples: [
      { input: "10\n25\n15", output: "25", explanation: "العدد 25 هو الأكبر بين الأرقام الثلاثة." },
      { input: "-5\n-2\n-9", output: "-2", explanation: "في الأعداد السالبة، -2 هو الأكبر." }
    ],
    constraints: ["-1000 <= كل عدد <= 1000"],
    starterCode: "# اقرأ الأعداد الثلاثة واطبع الأكبر من بينها\n",
    publicTestCases: [
      { input: "10\n25\n15", expectedOutput: "25" },
      { input: "-5\n-2\n-9", expectedOutput: "-2" }
    ],
    hiddenTestCases: [
      { input: "100\n100\n50", expectedOutput: "100" },
      { input: "0\n0\n0", expectedOutput: "0" }
    ],
    hints: [
      "فكرة التفكير: قارن الرقم الأول بالثاني ثم قارن الأكبر منهما بالثالث، أو استخدم دالة max()."
    ]
  },
  "prob-l1-leap-year": {
    id: "prob-l1-leap-year",
    title: "فاحص السنة الكبيسة المبسط (Leap Year Simple)",
    level: 1,
    difficulty: "easy",
    points: 20,
    timeLimit: 3000,
    skills: ["input", "conditions", "modulus"],
    description: "اكتب برنامجاً يستقبل سنة كعدد صحيح. إذا كانت السنة تقبل القسمة على 4 بدون باقٍ اطبع 'Leap Year' وإلا اطبع 'Common Year'.",
    inputDescription: "سطر واحد يحتوي على سنة صحيحة (مثال: 2024).",
    outputDescription: "اطبع 'Leap Year' أو 'Common Year'.",
    examples: [
      { input: "2024", output: "Leap Year", explanation: "2024 تقبل القسمة على 4." },
      { input: "2023", output: "Common Year", explanation: "2023 لا تقبل القسمة على 4." }
    ],
    constraints: ["1900 <= year <= 2100"],
    starterCode: "# اقرأ السنة وافحص قابليتها للقسمة على 4\n",
    publicTestCases: [
      { input: "2024", expectedOutput: "Leap Year" },
      { input: "2023", expectedOutput: "Common Year" }
    ],
    hiddenTestCases: [
      { input: "2020", expectedOutput: "Leap Year" },
      { input: "2025", expectedOutput: "Common Year" }
    ],
    hints: [
      "فكرة التفكير: استخدم معامل باقي القسمة % 4 للتحقق من انعدام الباقي."
    ]
  },
  "prob-l1-absolute-diff": {
    id: "prob-l1-absolute-diff",
    title: "حساب الفرق المطلق بين قيمتين (Absolute Difference)",
    level: 1,
    difficulty: "easy",
    points: 20,
    timeLimit: 3000,
    skills: ["arithmetic", "math", "input"],
    description: "اكتب برنامجاً يستقبل عددين صحيحين كل منهما في سطر، ويحسب الفرق المطلق (الموجب دائماً) بينهما.",
    inputDescription: "سطران، في كل سطر عدد صحيح a ثم b.",
    outputDescription: "اطبع الفرق المطلق بين العددين كعدد صحيح موجب.",
    examples: [
      { input: "15\n30", output: "15", explanation: "|15 - 30| = 15" },
      { input: "50\n20", output: "30", explanation: "|50 - 20| = 30" }
    ],
    constraints: ["-10000 <= a, b <= 10000"],
    starterCode: "# اقرأ العددين واطبع الفرق المطلق\n",
    publicTestCases: [
      { input: "15\n30", expectedOutput: "15" },
      { input: "50\n20", expectedOutput: "30" }
    ],
    hiddenTestCases: [
      { input: "-5\n5", expectedOutput: "10" },
      { input: "0\n0", expectedOutput: "0" }
    ],
    hints: [
      "فكرة التفكير: الفرق المطلق يعني تجريد الناتج من الإشارة السالبة باستخدام دالة abs()."
    ]
  },

  // Level 2 (+3)
  "prob-l2-vowel-counter": {
    id: "prob-l2-vowel-counter",
    title: "عد حروف العلة في النصوص (Vowels Counter)",
    level: 2,
    difficulty: "easy",
    points: 30,
    timeLimit: 3000,
    skills: ["strings", "loops", "conditions"],
    description: "اكتب برنامجاً يستقبل جملة نصية، ثم يحسب ويطبع عدد حروف العلة الإنجليزية (a, e, i, o, u) الموجودة فيها بغض النظر عن حالة الحرف (كبير أو صغير).",
    inputDescription: "سطر واحد يحتوي على نص.",
    outputDescription: "اطبع عدداً صحيحاً يمثل مجموع حروف العلة.",
    examples: [
      { input: "python programming", output: "4", explanation: "الحروف هي o, o, a, i (4 حروف)." },
      { input: "hello world", output: "3", explanation: "الحروف هي e, o, o (3 حروف)." }
    ],
    constraints: ["طول النص بين 1 و 500 حرف"],
    starterCode: "# اقرأ النص وعد حروف العلة\n",
    publicTestCases: [
      { input: "python programming", expectedOutput: "4" },
      { input: "hello world", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "rhythm", expectedOutput: "0" },
      { input: "AEIOU", expectedOutput: "5" }
    ],
    hints: [
      "فكرة التفكير: حول النص إلى حروف صغيرة ثم مر على حروفه وتحقق هل الحرف ينتمي لمجموعة حروف العلة 'aeiou'."
    ]
  },
  "prob-l2-sum-of-evens": {
    id: "prob-l2-sum-of-evens",
    title: "مجموع الأعداد الزوجية في نطاق محدد (Sum of Evens)",
    level: 2,
    difficulty: "easy",
    points: 30,
    timeLimit: 3000,
    skills: ["loops", "range", "accumulator"],
    description: "اكتب برنامجاً يستقبل عددين start و end، ويحسب حاصل جمع جميع الأعداد الزوجية المحصورة بينهما (بما في ذلك طرفي النطاق إذا كانا زوجيين).",
    inputDescription: "سطران، الأول للبداية start والثاني للنهاية end.",
    outputDescription: "اطبع عدداً صحيحاً يمثل المجموع التراكمي للأرقام الزوجية.",
    examples: [
      { input: "1\n10", output: "30", explanation: "الأعداد 2+4+6+8+10 = 30." },
      { input: "4\n8", output: "18", explanation: "الأعداد 4+6+8 = 18." }
    ],
    constraints: ["1 <= start <= end <= 1000"],
    starterCode: "# اقرأ البداية والنهاية واجمع الأرقام الزوجية\n",
    publicTestCases: [
      { input: "1\n10", expectedOutput: "30" },
      { input: "4\n8", expectedOutput: "18" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "0" },
      { input: "2\n2", expectedOutput: "2" }
    ],
    hints: [
      "فكرة التفكير: مر بحلقة for من start إلى end + 1 وافحص باقي القسمة على 2 قبل الإضافة للمجموع."
    ]
  },
  "prob-l2-char-frequency": {
    id: "prob-l2-char-frequency",
    title: "عد تكرار حرف محدد في جملة (Character Frequency)",
    level: 2,
    difficulty: "easy",
    points: 30,
    timeLimit: 3000,
    skills: ["strings", "count", "input"],
    description: "اكتب برنامجاً يستقبل في السطر الأول نصاً، وفي السطر الثاني حرفاً واحداً، ثم يطبع عدد مرات ظهور هذا الحرف في النص.",
    inputDescription: "السطر الأول نص، والسطر الثاني حرف مفرد.",
    outputDescription: "اطبع عدداً صحيحاً يمثل تكرار الحرف.",
    examples: [
      { input: "shababha\na", output: "3", explanation: "الحرف a ظهر 3 مرات." },
      { input: "banana\nn", output: "2", explanation: "الحرف n ظهر مرتين." }
    ],
    constraints: ["طول النص حتى 200 حرف"],
    starterCode: "# اقرأ النص والحرف واطبع عدد مرات ظهوره\n",
    publicTestCases: [
      { input: "shababha\na", expectedOutput: "3" },
      { input: "banana\nn", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "code\nz", expectedOutput: "0" },
      { input: "aaaa\na", expectedOutput: "4" }
    ],
    hints: [
      "فكرة التفكير: يمكن استخدام دالة .count() أو المرور بحلقة تكرار مع عداد."
    ]
  },

  // Level 3 (+3)
  "prob-l3-list-intersection": {
    id: "prob-l3-list-intersection",
    title: "الأرقام المشتركة بين قائمتين (List Intersection)",
    level: 3,
    difficulty: "medium",
    points: 50,
    timeLimit: 3000,
    skills: ["sets", "intersection", "sorting"],
    description: "اكتب برنامجاً يستقبل في السطر الأول أرقاماً مفصولة بمسافات، وفي السطر الثاني أرقاماً مفصولة بمسافات. استخرج الأرقام المشتركة واطبعها مرتبة تصاعدياً ومفصولة بمسافات.",
    inputDescription: "سطران، كل سطر يحتوي على أعداد صحيحة مفصولة بمسافات.",
    outputDescription: "اطبع الأرقام المشتركة بدون تكرار مرتبة تصاعدياً ومفصولة بمسافة.",
    examples: [
      { input: "1 2 3 4\n3 4 5 6", output: "3 4", explanation: "الأرقام المشتركة هي 3 و 4." },
      { input: "10 20 30\n40 50 20", output: "20", explanation: "الرقم المشترك الوحيد هو 20." }
    ],
    constraints: ["كل قائمة تحتوي حتى 100 عنصر"],
    starterCode: "# اقرأ القائمتين واستخرج الأرقام المشتركة مرتبة\n",
    publicTestCases: [
      { input: "1 2 3 4\n3 4 5 6", expectedOutput: "3 4" },
      { input: "10 20 30\n40 50 20", expectedOutput: "20" }
    ],
    hiddenTestCases: [
      { input: "5 5 1 2\n2 5 9", expectedOutput: "2 5" },
      { input: "100 200\n300 100", expectedOutput: "100" }
    ],
    hints: [
      "فكرة التفكير: حول السطرين لمجموعتين set واستخدم تقاطع المجموعات & ثم رتب الناتج."
    ]
  },
  "prob-l3-word-reverser": {
    id: "prob-l3-word-reverser",
    title: "عكس كل كلمة في الجملة بمكانها (Reverse Each Word)",
    level: 3,
    difficulty: "medium",
    points: 50,
    timeLimit: 3000,
    skills: ["strings", "split", "slicing"],
    description: "اكتب برنامجاً يستقبل جملة نصية مفصولة بمسافات، ويقوم بعكس حروف كل كلمة بمفردها مع الحفاظ على ترتيب الكلمات في الجملة.",
    inputDescription: "سطر واحد يحتوي على كلمات مفصولة بمسافات.",
    outputDescription: "اطبع الجملة بحيث تعكس حروف كل كلمة.",
    examples: [
      { input: "hello world python", output: "olleh dlrow nohtyp", explanation: "عكس hello هو olleh وهكذا." },
      { input: "shababha courses", output: "ahbabahs sesruoc", explanation: "عكس الكلمتين." }
    ],
    constraints: ["طول الجملة حتى 200 حرف"],
    starterCode: "# اقرأ الجملة واعكس حروف كل كلمة\n",
    publicTestCases: [
      { input: "hello world python", expectedOutput: "olleh dlrow nohtyp" },
      { input: "shababha courses", expectedOutput: "ahbabahs sesruoc" }
    ],
    hiddenTestCases: [
      { input: "cat dog", expectedOutput: "tac god" },
      { input: "a bb ccc", expectedOutput: "a bb ccc" }
    ],
    hints: [
      "فكرة التفكير: قسم الجملة بالدالة split()، ثم اعكس كل كلمة بواسطة [::-1] وادمجهم بـ ' '.join()."
    ]
  },
  "prob-l3-dict-invert": {
    id: "prob-l3-dict-invert",
    title: "عكس قاموس المفاتيح والقيم (Dictionary Inverter)",
    level: 3,
    difficulty: "medium",
    points: 50,
    timeLimit: 3000,
    skills: ["dictionaries", "comprehensions", "sorting"],
    description: "اكتب برنامجاً يستقبل أزواج مفاتيح وقيم بصيغة key:val مفصولة بمسافات (مثل A:1 B:2 C:3). اعكس القاموس لتصبح القيم مفاتيح واطبع الأزواج الجديدة بصيغة val:key مرتبة تصاعدياً حسب المفتاح الجديد.",
    inputDescription: "سطر واحد يحتوي على أزواج مفصولة بمسافات.",
    outputDescription: "اطبع الأزواج المعكوسة مفصولة بمسافات.",
    examples: [
      { input: "A:1 B:2 C:3", output: "1:A 2:B 3:C", explanation: "تم عكس كل زوج." },
      { input: "x:10 y:20", output: "10:x 20:y", explanation: "المفتاح أصبح 10 و 20." }
    ],
    constraints: ["القيم فريدة دائماً"],
    starterCode: "# اقرأ الأزواج واعكس المفاتيح بالقيم\n",
    publicTestCases: [
      { input: "A:1 B:2 C:3", expectedOutput: "1:A 2:B 3:C" },
      { input: "x:10 y:20", output: "10:x 20:y", expectedOutput: "10:x 20:y" }
    ],
    hiddenTestCases: [
      { input: "first:1 second:2", expectedOutput: "1:first 2:second" }
    ],
    hints: [
      "فكرة التفكير: فكك الأزواج بالتقسيم عند ':' ثم اعكس الموقع واطبعها مرتبة."
    ]
  },

  // Level 4 (+3)
  "prob-l4-binary-search": {
    id: "prob-l4-binary-search",
    title: "خوارزمية البحث الثنائي المباشر (Binary Search Direct)",
    level: 4,
    difficulty: "hard",
    points: 80,
    timeLimit: 3000,
    skills: ["algorithms", "binary_search", "complexity"],
    description: "اكتب برنامجاً يستقبل في السطر الأول قائمة أرقام مرتبة تصاعدياً ومفصولة بمسافات، وفي السطر الثاني رقماً هدفاً target. ابحث عن موقع الفهرس (0-based) للهدف واطبعه، وإذا لم يكن موجوداً اطبع -1.",
    inputDescription: "السطر الأول قائمة مرتبة، والسطر الثاني رقم صحيح.",
    outputDescription: "اطبع رقم الفهرس أو -1.",
    examples: [
      { input: "2 5 8 12 16 23\n12", output: "3", explanation: "الرقم 12 يقع في الفهرس 3." },
      { input: "10 20 30\n25", output: "-1", explanation: "الرقم 25 غير موجود." }
    ],
    constraints: ["القائمة مرتبة دائماً"],
    starterCode: "# نفذ البحث الثنائي واطبع موقع الفهرس\n",
    publicTestCases: [
      { input: "2 5 8 12 16 23\n12", expectedOutput: "3" },
      { input: "10 20 30\n25", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1 3 5 7 9\n7", expectedOutput: "3" },
      { input: "5\n5", expectedOutput: "0" }
    ],
    hints: [
      "فكرة التفكير: استخدم مؤشرين low و high وحساب المنتصف في كل خطوة لتقليص نطاق البحث."
    ]
  },
  "prob-l4-valid-parentheses": {
    id: "prob-l4-valid-parentheses",
    title: "فاحص الأقواس المتنوعة بالمكدس (Valid Multi-Parentheses)",
    level: 4,
    difficulty: "hard",
    points: 80,
    timeLimit: 3000,
    skills: ["stack", "strings", "algorithms"],
    description: "اكتب برنامجاً يستقبل نصاً يحتوي على أقواس من ثلاثة أنواع: () و [] و {}. تحقق هل الأقواس متطابقة ومغلقة بترتيب صحيح باستخدام بنية المكدس (Stack). اطبع 'True' أو 'False'.",
    inputDescription: "سطر واحد يحتوي على نص الأقواس.",
    outputDescription: "اطبع 'True' إذا كانت صحيحة، أو 'False'.",
    examples: [
      { input: "{[()]}", output: "True", explanation: "جميع الأقواس مغلقة بترتيبها الصحيح." },
      { input: "{[(])}", output: "False", explanation: "أغلقت الأقواس بترتيب خاطئ." }
    ],
    constraints: ["طول النص حتى 100 حرف"],
    starterCode: "# افحص صحة تداخل الأقواس باستخدام المكدس\n",
    publicTestCases: [
      { input: "{[()]}", expectedOutput: "True" },
      { input: "{[(])}", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "()[]{}", expectedOutput: "True" },
      { input: "(]", expectedOutput: "False" }
    ],
    hints: [
      "فكرة التفكير: استخدم قائمة كمكدس stack: أضف القوس المفتوح، وعند القوس المغلق افحص هل يطابق قمة المكدس."
    ]
  },
  "prob-l4-matrix-transpose": {
    id: "prob-l4-matrix-transpose",
    title: "تدوير المصفوفة الثنائية (2x2 Matrix Transpose)",
    level: 4,
    difficulty: "hard",
    points: 80,
    timeLimit: 3000,
    skills: ["matrices", "nested_lists", "linear_algebra"],
    description: "اكتب برنامجاً يستقبل صفي مصفوفة 2x2 (كل صف في سطر مفصولاً بمسافة)، ويقوم بتدوير المصفوفة بجعل الصفوف أعمدة والأعمدة صفوفاً، ثم يطبع المصفوفة المدورة.",
    inputDescription: "سطران، كل سطر يحتوي على عددين مفصولين بمسافة.",
    outputDescription: "سطران، يمثلان صفوف المصفوفة المدورة.",
    examples: [
      { input: "1 2\n3 4", output: "1 3\n2 4", explanation: "تم تبديل الصفوف بالأعمدة." }
    ],
    constraints: ["الأعداد صحيحة"],
    starterCode: "# اقرأ المصفوفة واطبع تدويرها\n",
    publicTestCases: [
      { input: "1 2\n3 4", expectedOutput: "1 3\n2 4" }
    ],
    hiddenTestCases: [
      { input: "5 6\n7 8", expectedOutput: "5 7\n6 8" }
    ],
    hints: [
      "فكرة التفكير: إذا كانت العناصر a b في السطر الأول و c d في الثاني، فإن التدوير يكون a c ثم b d."
    ]
  },

  // Level 5 (+3)
  "prob-l5-kadane-max-subarray": {
    id: "prob-l5-kadane-max-subarray",
    title: "أكبر مجموع مصفوفة فرعية متصلة (Kadane's Algorithm)",
    level: 5,
    difficulty: "expert",
    points: 150,
    timeLimit: 3000,
    skills: ["dynamic_programming", "kadane", "optimization"],
    description: "اكتب برنامجاً يستقبل في سطر واحد أرقاماً مفصولة بمسافات (تحتوي قيماً موجبة وسالبة). احسب واطبع أكبر مجموع ممكن لأي مصفوفة فرعية متصلة باستخدام خوارزمية كادان.",
    inputDescription: "سطر واحد يحتوي على أعداد صحيحة مفصولة بمسافات.",
    outputDescription: "اطبع عدداً واحداً يمثل المجموع الأقصى.",
    examples: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "المصفوفة الفرعية [4, -1, 2, 1] مجموعها 6." },
      { input: "1 2 3 -2 5", output: "9", explanation: "المجموع الكلي باستثناء -2 أو معها يعطي 9." }
    ],
    constraints: ["طول القائمة حتى 1000 عنصر"],
    starterCode: "# طبق خوارزمية كادان واطبع المجموع الأقصى\n",
    publicTestCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6" },
      { input: "1 2 3 -2 5", expectedOutput: "9" }
    ],
    hiddenTestCases: [
      { input: "-1 -2 -3", expectedOutput: "-1" },
      { input: "5 4 -1 7 8", expectedOutput: "23" }
    ],
    hints: [
      "فكرة التفكير: تتبع المجموع الحالي cur = max(x, cur + x) وقارنه مع max_sum في كل خطوة."
    ]
  },
  "prob-l5-merge-intervals": {
    id: "prob-l5-merge-intervals",
    title: "دمج الفترات المتداخلة (Merge Intervals)",
    level: 5,
    difficulty: "expert",
    points: 150,
    timeLimit: 3000,
    skills: ["intervals", "sorting", "algorithms"],
    description: "اكتب برنامجاً يستقبل فترات رقمية مفصولة بفواصل منقوطة مثل '1,3;2,6;8,10'. ادمج الفترات المتداخلة واطبع النتيجة بنفس التنسيق.",
    inputDescription: "سطر واحد يحتوي فترات بصيغة start,end مفصولة بـ ;",
    outputDescription: "اطبع الفترات المدمجة مفصولة بـ ;",
    examples: [
      { input: "1,3;2,6;8,10", output: "1,6;8,10", explanation: "الفترتان [1,3] و [2,6] اندمجتا في [1,6]." }
    ],
    constraints: ["الفترات صحيحة"],
    starterCode: "# ادمج الفترات المتداخلة واطبع الناتج\n",
    publicTestCases: [
      { input: "1,3;2,6;8,10", expectedOutput: "1,6;8,10" }
    ],
    hiddenTestCases: [
      { input: "1,4;4,5", expectedOutput: "1,5" }
    ],
    hints: [
      "فكرة التفكير: رتب الفترات حسب البداية، ثم وسع نهاية الفترة السابقة إذا بدأت الحالية قبل انتهائها."
    ]
  },
  "prob-l5-longest-increasing-subsequence": {
    id: "prob-l5-longest-increasing-subsequence",
    title: "أطول متتالية متزايدة (Longest Increasing Subsequence)",
    level: 5,
    difficulty: "expert",
    points: 150,
    timeLimit: 3000,
    skills: ["dynamic_programming", "subsequence", "lis"],
    description: "اكتب برنامجاً يستقبل في سطر واحد أرقاماً مفصولة بمسافات. احسب واطبع طول أطول متتالية متزايدة قطعياً (Longest Strictly Increasing Subsequence).",
    inputDescription: "سطر واحد يحتوي أعداداً صحيحة مفصولة بمسافات.",
    outputDescription: "اطبع رقماً واحداً يمثل طول المتتالية المتزايدة.",
    examples: [
      { input: "10 9 2 5 3 7 101 18", output: "4", explanation: "المتتالية 2, 3, 7, 101 طولها 4." }
    ],
    constraints: ["طول القائمة حتى 100 عنصر"],
    starterCode: "# احسب طول أطول متتالية متزايدة LIS\n",
    publicTestCases: [
      { input: "10 9 2 5 3 7 101 18", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "0 1 0 3 2 3", expectedOutput: "4" },
      { input: "7 7 7", expectedOutput: "1" }
    ],
    hints: [
      "فكرة التفكير: استخدم مصفوفة برمجة ديناميكية dp حيث dp[i] هو طول أطول متتالية تنتهي عند العنصر i."
    ]
  }
};

let content = fs.readFileSync(dataFilePath, "utf8");

// Update levelsCount in PROBLEM_SOLVING_LEVELS_DATA from 10 to 13
content = content.replace(/(id:\s*"level-[1-5]"[\s\S]*?levelsCount:\s*)10/g, "$113");

// Add challenges before the closing bracket of PROBLEM_SOLVING_CHALLENGES_DATA
let serialized = "";
for (const [id, ch] of Object.entries(NEW_PS_CHALLENGES)) {
  if (!content.includes(`"${id}"`)) {
    serialized += `  "${id}": ${JSON.stringify(ch, null, 4)},\n\n`;
  }
}

if (serialized) {
  content = content.replace(
    /(export const PROBLEM_SOLVING_CHALLENGES_DATA = \{)/,
    `$1\n${serialized}`
  );
  fs.writeFileSync(dataFilePath, content, "utf8");
  console.log("Successfully added 15 new Problem Solving challenges!");
} else {
  console.log("Challenges already present.");
}

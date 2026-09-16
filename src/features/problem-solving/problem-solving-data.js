// src/features/problem-solving/problem-solving-data.js

export const PROBLEM_SOLVING_LEVELS_DATA = [
  {
    level: 1,
    id: "level-1",
    title: "المستوى الأول: مبتدئ (Beginner)",
    shortTitle: "المستوى 1: مبتدئ",
    badge: "Level 1",
    difficulty: "easy",
    color: "#10b981",
    icon: "🥉",
    concepts: ["Variables", "Data Types", "Input / Output", "Operators", "Basic Conditions"],
    description: "انطلاقة قوية في حل المشكلات البرمجية: التعامل مع المتغيرات، قراءة المدخلات، العمليات الحسابية، والشروط البسيطة.",
    pointsPerProblem: 10,
    completionBonus: 50
  },
  {
    level: 2,
    id: "level-2",
    title: "المستوى الثاني: سهل (Easy)",
    shortTitle: "المستوى 2: سهل",
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
    shortTitle: "المستوى 3: متوسط",
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
    shortTitle: "المستوى 4: متقدم",
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
    shortTitle: "المستوى 5: خبير",
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

export const PROBLEM_SOLVING_CHALLENGES_DATA = {
  // LEVEL 1: BEGINNER
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
    skills: ["arithmetic", "floating_point", "input"],
    description: "اكتب برنامجاً يستقبل درجة الحرارة بالسيليزيوس C (عدد صحيح أو عشري)، ويقوم بتحويلها إلى فهرنهايت F باستخدام القانون: F = (C * 9/5) + 32 وطباعة الناتج كعدد صحيح مقرب أو عشري بصيغة round(F, 1).",
    inputDescription: "سطر واحد يحتوي على قيمة C.",
    outputDescription: "اطبع الناتج مقرباً لرقم عشري واحد round(F, 1).",
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
      { input: "37", expectedOutput: "98.6" },
      { input: "-40", expectedOutput: "-40.0" }
    ],
    starterCode: "c = float(input())\nf = (c * 9 / 5) + 32\nprint(round(f, 1))\n"
  },
  "prob-l1-rect-area": {
    id: "prob-l1-rect-area",
    title: "مساحة ومحيط المستطيل (Rectangle Area & Perimeter)",
    level: 1,
    difficulty: "easy",
    points: 10,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["geometry", "arithmetic", "input"],
    description: "اكتب برنامجاً يستقبل طول المستطيل length وعرضه width (سطران)، ويطبع المساحة في السطر الأول، والمحيط في السطر الثاني.",
    inputDescription: "السطر الأول: length، السطر الثاني: width.",
    outputDescription: "سطران: الأول مساحة المستطيل، الثاني محيط المستطيل.",
    examples: [
      { input: "5\n3", output: "15\n16", explanation: "المساحة = 5*3 = 15، المحيط = 2*(5+3) = 16" }
    ],
    constraints: ["1 <= length, width <= 10^4"],
    publicTestCases: [
      { input: "5\n3", expectedOutput: "15\n16", description: "مستطيل بأبعاد 5 و 3" }
    ],
    hiddenTestCases: [
      { input: "10\n10", expectedOutput: "100\n40" },
      { input: "1\n1", expectedOutput: "1\n4" }
    ],
    starterCode: "l = int(input())\nw = int(input())\nprint(l * w)\nprint(2 * (l + w))\n"
  },
  "prob-l1-pass-fail": {
    id: "prob-l1-pass-fail",
    title: "حاسبة نتيجة الطالب (Pass or Fail)",
    level: 1,
    difficulty: "easy",
    points: 10,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["conditions", "relational_operators"],
    description: "استقبل درجة الطالب grade من 0 إلى 100. إذا كانت الدرجة >= 50 اطبع 'Pass'، وإلا اطبع 'Fail'.",
    inputDescription: "عدد صحيح grade يمثل درجة الطالب.",
    outputDescription: "اطبع 'Pass' أو 'Fail'.",
    examples: [
      { input: "75", output: "Pass", explanation: "75 >= 50 ناجح." },
      { input: "49", output: "Fail", explanation: "49 < 50 راسب." }
    ],
    constraints: ["0 <= grade <= 100"],
    publicTestCases: [
      { input: "75", expectedOutput: "Pass", description: "درجة أعلى من 50" },
      { input: "49", expectedOutput: "Fail", description: "درجة أقل من 50" }
    ],
    hiddenTestCases: [
      { input: "50", expectedOutput: "Pass" },
      { input: "0", expectedOutput: "Fail" },
      { input: "100", expectedOutput: "Pass" }
    ],
    starterCode: "score = int(input())\nif score >= 50:\n    print('Pass')\nelse:\n    print('Fail')\n"
  },

  // LEVEL 2: EASY
  "prob-l2-max-three": {
    id: "prob-l2-max-three",
    title: "أكبر رقم بين ثلاثة أرقام (Max of Three)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["conditionals", "logical_operators"],
    description: "استقبل 3 أرقام صحيحة مفصولة بمسافة في سطر واحد، واطبع الرقم الأكبر بينهم.",
    inputDescription: "سطر واحد يحتوي على 3 أعداد صحيحة a b c.",
    outputDescription: "اطبع العدد الأكبر فقط.",
    examples: [
      { input: "10 25 15", output: "25", explanation: "25 هو الأكبر." }
    ],
    constraints: ["-10^6 <= a, b, c <= 10^6"],
    publicTestCases: [
      { input: "10 25 15", expectedOutput: "25", description: "العدد الأكبر في المنتصف" },
      { input: "100 20 5", expectedOutput: "100", description: "العدد الأكبر في البداية" }
    ],
    hiddenTestCases: [
      { input: "5 5 5", expectedOutput: "5" },
      { input: "-10 -2 -50", expectedOutput: "-2" }
    ],
    starterCode: "a, b, c = map(int, input().split())\nprint(max(a, b, c))\n"
  },
  "prob-l2-sum-to-n": {
    id: "prob-l2-sum-to-n",
    title: "مجموع الأرقام من 1 إلى N (Sum 1 to N)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["loops", "for_loop", "math"],
    description: "استقبل عدداً صحيحاً موجبياً N، واحسب مجموع جميع الأعداد الصحيحة من 1 إلى N واطبع الناتج.",
    inputDescription: "سطر واحد يحتوي على عدد صحيح موجب N.",
    outputDescription: "اطبع المجموع الكلي من 1 إلى N.",
    examples: [
      { input: "5", output: "15", explanation: "1 + 2 + 3 + 4 + 5 = 15" }
    ],
    constraints: ["1 <= N <= 10^5"],
    publicTestCases: [
      { input: "5", expectedOutput: "15", description: "مجموع حتى 5" },
      { input: "10", expectedOutput: "55", description: "مجموع حتى 10" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "100", expectedOutput: "5050" }
    ],
    starterCode: "n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint(total)\n"
  },
  "prob-l2-reverse-string": {
    id: "prob-l2-reverse-string",
    title: "عكس النص (Reverse String)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["strings", "slicing", "loops"],
    description: "استقبل نصاً s واطبع النص معكوساً.",
    inputDescription: "سطر واحد يحتوي على النص s.",
    outputDescription: "اطبع النص معكوساً.",
    examples: [
      { input: "python", output: "nohtyp", explanation: "عكس كلمة python" }
    ],
    constraints: ["1 <= len(s) <= 1000"],
    publicTestCases: [
      { input: "python", expectedOutput: "nohtyp", description: "عكس كلمة بحروف إنجليزية" },
      { input: "radar", expectedOutput: "radar", description: "كلمة متناظرة" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "hello world", expectedOutput: "dlrow olleh" }
    ],
    starterCode: "s = input()\nprint(s[::-1])\n"
  },
  "prob-l2-count-evens": {
    id: "prob-l2-count-evens",
    title: "عد الأعداد الزوجية في قائمة (Count Even Numbers)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["lists", "loops", "modulus"],
    description: "السطر الأول يحتوي على عدد عناصر القائمة n. السطر الثاني يحتوي على n أعداد صحيحة مفصولة بمسافة. احسب عدد الأرقام الزوجية في القائمة واطبعه.",
    inputDescription: "السطر 1: n\nالسطر 2: n أعداد صحيحة",
    outputDescription: "اطبع عدد الأعداد الزوجية.",
    examples: [
      { input: "5\n1 2 3 4 6", output: "3", explanation: "الأعداد الزوجية هي 2، 4، 6 وعددهم 3." }
    ],
    constraints: ["1 <= n <= 1000"],
    publicTestCases: [
      { input: "5\n1 2 3 4 6", expectedOutput: "3", description: "3 أعداد زوجية" }
    ],
    hiddenTestCases: [
      { input: "3\n1 3 5", expectedOutput: "0" },
      { input: "4\n2 4 6 8", expectedOutput: "4" }
    ],
    starterCode: "n = int(input())\nnums = list(map(int, input().split()))\ncount = sum(1 for x in nums if x % 2 == 0)\nprint(count)\n"
  },
  "prob-l2-vowel-counter": {
    id: "prob-l2-vowel-counter",
    title: "عد حروف العلة (Count Vowels)",
    level: 2,
    difficulty: "easy",
    points: 10,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["strings", "loops", "membership"],
    description: "استقبل نصاً واطبع عدد حروف العلة الإنجليزية (a, e, i, o, u) بغض النظر عن حالة الحرف (كبيرة أو صغيرة).",
    inputDescription: "سطر واحد يحتوي على نص.",
    outputDescription: "اطبع عدداً صحيحاً يمثل مجموع حروف العلة.",
    examples: [
      { input: "Education", output: "5", explanation: "الحروف e, u, a, i, o مجموعها 5." }
    ],
    constraints: ["1 <= len(s) <= 500"],
    publicTestCases: [
      { input: "Education", expectedOutput: "5", description: "كلمة بحروف علة متعددة" }
    ],
    hiddenTestCases: [
      { input: "xyz", expectedOutput: "0" },
      { input: "AEIOUaeiou", expectedOutput: "10" }
    ],
    starterCode: "s = input().lower()\nvowels = set('aeiou')\nprint(sum(1 for char in s if char in vowels))\n"
  },

  // LEVEL 3: INTERMEDIATE
  "prob-l3-remove-duplicates": {
    id: "prob-l3-remove-duplicates",
    title: "إزالة التكرار مع الحفاظ على الترتيب (Remove Duplicates Preserving Order)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 80,
    timeLimit: 3000,
    skills: ["sets", "lists", "order_preservation"],
    description: "استقبل قائمة من الأعداد الصحيحة في سطر واحد مفصولة بمسافة، وقم بطباعة العناصر بدون تكرار مع الحفاظ التام على ترتيب أول ظهور لكل عنصر، مفصولة بمسافة.",
    inputDescription: "سطر واحد يحتوي على أعداد صحيحة.",
    outputDescription: "اطبع الأعداد الفريدة مفصولة بمسافة.",
    examples: [
      { input: "1 3 2 3 1 4 5 2", output: "1 3 2 4 5", explanation: "تم استبعاد التكرارات وحفظ ترتيب ظهورها الأول." }
    ],
    constraints: ["1 <= len(nums) <= 10^4"],
    publicTestCases: [
      { input: "1 3 2 3 1 4 5 2", expectedOutput: "1 3 2 4 5", description: "قائمة بها تكرارات متعددة" }
    ],
    hiddenTestCases: [
      { input: "5 5 5 5", expectedOutput: "5" },
      { input: "10 20 30", expectedOutput: "10 20 30" }
    ],
    starterCode: "nums = list(map(int, input().split()))\nseen = set()\nres = []\nfor x in nums:\n    if x not in seen:\n        seen.add(x)\n        res.append(x)\nprint(*(res))\n"
  },
  "prob-l3-most-frequent": {
    id: "prob-l3-most-frequent",
    title: "العنصر الأكثر تكراراً (Most Frequent Element)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 80,
    timeLimit: 3000,
    skills: ["dictionaries", "frequency_map", "max_by_key"],
    description: "استقبل قائمة أرقام في سطر واحد. أوجد الرقم الذي تكرر أكبر عدد من المرات واطبع قيمته. إذا تساوى أكثر من رقم في أعلى تكرار، اطبع الأصغر قيمة بينهم.",
    inputDescription: "سطر واحد به أعداد صحيحة مفصولة بمسافة.",
    outputDescription: "اطبع الرقم الأكثر تكراراً.",
    examples: [
      { input: "1 3 2 2 3 3 1", output: "3", explanation: "3 تكرر 3 مرات وهو الأكثر." },
      { input: "4 4 2 2", output: "2", explanation: "تساوى 4 و 2، الرقم الأصغر هو 2." }
    ],
    constraints: ["1 <= len(nums) <= 10^4"],
    publicTestCases: [
      { input: "1 3 2 2 3 3 1", expectedOutput: "3", description: "رقم تكرر أكثر من البقية" },
      { input: "4 4 2 2", expectedOutput: "2", description: "تساوي تكرار فيتم اختيار الأصغر" }
    ],
    hiddenTestCases: [
      { input: "100", expectedOutput: "100" },
      { input: "5 5 6 6 7 7", expectedOutput: "5" }
    ],
    starterCode: "nums = list(map(int, input().split()))\nfreq = {}\nfor x in nums:\n    freq[x] = freq.get(x, 0) + 1\n# فرز حسب أعلى تكرار ثم أصغر قيمة\nbest = min(freq.keys(), key=lambda x: (-freq[x], x))\nprint(best)\n"
  },
  "prob-l3-anagram-check": {
    id: "prob-l3-anagram-check",
    title: "فاحص الجناس التام (Anagram Checker)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 80,
    timeLimit: 3000,
    skills: ["strings", "sorting", "dictionaries"],
    description: "استقبل كلمتين (كل كلمة في سطر). تحقق هل الكلمتان Anagram (تتكونان من نفس الحروف بنفس عدد التكرار بغض النظر عن الترتيب). اطبع 'True' أو 'False'.",
    inputDescription: "سطران: الكلمة الأولى والكلمة الثانية.",
    outputDescription: "اطبع 'True' أو 'False'.",
    examples: [
      { input: "listen\nsilent", output: "True", explanation: "نفس الحروف مكررة بنفس العدد." },
      { input: "rat\ncar", output: "False", explanation: "الحروف مختلفة." }
    ],
    constraints: ["1 <= len(s1), len(s2) <= 10^4"],
    publicTestCases: [
      { input: "listen\nsilent", expectedOutput: "True", description: "جناس صحيح" },
      { input: "rat\ncar", expectedOutput: "False", description: "كلمات مختلفة" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "True" },
      { input: "aabbcc\nabc", expectedOutput: "False" }
    ],
    starterCode: "s1 = input().strip().lower()\ns2 = input().strip().lower()\nif sorted(s1) == sorted(s2):\n    print('True')\nelse:\n    print('False')\n"
  },
  "prob-l3-student-grades-dict": {
    id: "prob-l3-student-grades-dict",
    title: "نظام متوسط درجات الطلاب (Student Grades System)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 85,
    timeLimit: 3000,
    skills: ["dictionaries", "functions", "data_aggregation"],
    description: "السطر الأول يحتوي على عدد الطلاب n. يليه n أسطر، كل سطر يحتوي على: اسم الطالب يليه درجاته مفصولة بمسافة (مثال: Ali 80 90 85). اطبع اسم كل طالب وبجواره متوسط درجاته مقرباً لمنزلة عشرية واحدة round(avg, 1) بنفس ترتيب الإدخال.",
    inputDescription: "السطر 1: n\nالأسطر التالية: Name grade1 grade2 ...",
    outputDescription: "اطبع كل طالب: Name avg",
    examples: [
      { input: "2\nOmar 90 80\nSara 100 95 90", output: "Omar 85.0\nSara 95.0", explanation: "متوسط عمر 85، متوسط سارة 95" }
    ],
    constraints: ["1 <= n <= 100"],
    publicTestCases: [
      { input: "2\nOmar 90 80\nSara 100 95 90", expectedOutput: "Omar 85.0\nSara 95.0", description: "طالبان بدرجات مختلفة" }
    ],
    hiddenTestCases: [
      { input: "1\nAli 100", expectedOutput: "Ali 100.0" }
    ],
    starterCode: "n = int(input())\nfor _ in range(n):\n    parts = input().split()\n    name = parts[0]\n    grades = list(map(float, parts[1:]))\n    avg = sum(grades) / len(grades)\n    print(f'{name} {round(avg, 1)}')\n"
  },
  "prob-l3-matrix-transpose": {
    id: "prob-l3-matrix-transpose",
    title: "تدوير المصفوفة (Matrix Transpose)",
    level: 3,
    difficulty: "medium",
    points: 25,
    baseXp: 85,
    timeLimit: 3000,
    skills: ["nested_lists", "matrices", "loops"],
    description: "استقبل عدد الصفوف r وعدد الأعمدة c في السطر الأول. يليه r أسطر كل سطر به c أرقام تمثل المصفوفة. اطبع منقول المصفوفة (Transpose Matrix) بحيث تصبح الصفوف أعمدة والأعمدة صفوفاً.",
    inputDescription: "السطر 1: r c\nالأسطر التالية: عناصر المصفوفة",
    outputDescription: "اطبع المصفوفة الناتجة (c صفوف كل صف به r أرقام مفصولة بمسافة).",
    examples: [
      { input: "2 3\n1 2 3\n4 5 6", output: "1 4\n2 5\n3 6", explanation: "تحويل مصفوفة 2x3 إلى 3x2" }
    ],
    constraints: ["1 <= r, c <= 50"],
    publicTestCases: [
      { input: "2 3\n1 2 3\n4 5 6", expectedOutput: "1 4\n2 5\n3 6", description: "مصفوفة مستطيلة 2x3" }
    ],
    hiddenTestCases: [
      { input: "1 1\n7", expectedOutput: "7" }
    ],
    starterCode: "r, c = map(int, input().split())\nmatrix = [list(map(int, input().split())) for _ in range(r)]\nfor j in range(c):\n    col = [str(matrix[i][j]) for i in range(r)]\n    print(' '.join(col))\n"
  },

  // LEVEL 4: ADVANCED
  "prob-l4-binary-search": {
    id: "prob-l4-binary-search",
    title: "البحث الثنائي الفعال (Binary Search)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 120,
    timeLimit: 2000,
    skills: ["algorithms", "binary_search", "time_complexity"],
    description: "السطر الأول: عدد عناصر القائمة n والرقم المستهدف target. السطر الثاني: n أعداد صحيحة مرتبة تصاعدياً. نفذ خوارزمية Binary Search لإيجاد 0-based index للرقم target. إذا لم يكن موجوداً اطبع -1.",
    inputDescription: "السطر 1: n target\nالسطر 2: n أعداد مرتبة تصاعدياً",
    outputDescription: "اطبع مؤشر العنصر (Index) أو -1.",
    examples: [
      { input: "5 7\n1 3 5 7 9", output: "3", explanation: "الرقم 7 يقع في المؤشر index 3." },
      { input: "4 6\n1 2 4 8", output: "-1", explanation: "الرقم 6 غير موجود في القائمة." }
    ],
    constraints: ["1 <= n <= 10^5", "العناصر مرتبة تماماً"],
    publicTestCases: [
      { input: "5 7\n1 3 5 7 9", expectedOutput: "3", description: "عنصر موجود" },
      { input: "4 6\n1 2 4 8", expectedOutput: "-1", description: "عنصر غير موجود" }
    ],
    hiddenTestCases: [
      { input: "1 5\n5", expectedOutput: "0" },
      { input: "6 1\n1 2 3 4 5 6", expectedOutput: "0" },
      { input: "6 6\n1 2 3 4 5 6", expectedOutput: "5" }
    ],
    starterCode: "n, target = map(int, input().split())\narr = list(map(int, input().split()))\nlow, high = 0, n - 1\nans = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target:\n        ans = mid\n        break\n    elif arr[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(ans)\n"
  },
  "prob-l4-custom-bubble-sort": {
    id: "prob-l4-custom-bubble-sort",
    title: "الترتيب اليدوي بدون دوال جاهزة (Manual Sort)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 120,
    timeLimit: 3000,
    skills: ["algorithms", "sorting", "nested_loops"],
    description: "استقبل قائمة أرقام في سطر واحد. قم بترتيب القائمة تصاعدياً باستخدام خوارزمية ترتيب يدوية (مثل Bubble Sort أو Selection Sort) واطبع الناتج مفصولاً بمسافة. يمنع استخدام .sort() أو sorted().",
    inputDescription: "سطر واحد يحتوي على أعداد صحيحة.",
    outputDescription: "اطبع الأعداد مرتبة تصاعدياً مفصولة بمسافة.",
    forbiddenPatterns: [
      { regex: "\\.sort\\s*\\(", messageAr: "يمنع استخدام دالة .sort() الجاهزة في هذا التحدي الخوارزمي." },
      { regex: "sorted\\s*\\(", messageAr: "يمنع استخدام دالة sorted() الجاهزة في هذا التحدي الخوارزمي." }
    ],
    examples: [
      { input: "64 34 25 12 22 11 90", output: "11 12 22 25 34 64 90", explanation: "ترتيب القائمة تصاعدياً" }
    ],
    constraints: ["1 <= len(nums) <= 500"],
    publicTestCases: [
      { input: "64 34 25 12 22 11 90", expectedOutput: "11 12 22 25 34 64 90", description: "ترتيب عناصر موجبة عشوائية" }
    ],
    hiddenTestCases: [
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "1 2 3", expectedOutput: "1 2 3" }
    ],
    starterCode: "nums = list(map(int, input().split()))\nn = len(nums)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if nums[j] > nums[j + 1]:\n            nums[j], nums[j + 1] = nums[j + 1], nums[j]\nprint(*(nums))\n"
  },
  "prob-l4-recursive-fib": {
    id: "prob-l4-recursive-fib",
    title: "متتالية فيبوناتشي (Fibonacci Number)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 120,
    timeLimit: 2000,
    skills: ["recursion", "dynamic_programming", "memoization"],
    description: "متتالية فيبوناتشي تبدأ بـ F(0) = 0, F(1) = 1، وكل رقم تالٍ يساوي مجموع الرقمين السابقين F(n) = F(n-1) + F(n-2). استقبل n واطبع قيمة F(n).",
    inputDescription: "سطر واحد يحتوي على عدد صحيح n.",
    outputDescription: "اطبع قيمة F(n).",
    examples: [
      { input: "6", output: "8", explanation: "0, 1, 1, 2, 3, 5, 8" }
    ],
    constraints: ["0 <= n <= 50"],
    publicTestCases: [
      { input: "6", expectedOutput: "8", description: "F(6) = 8" },
      { input: "10", expectedOutput: "55", description: "F(10) = 55" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
      { input: "30", expectedOutput: "832040" }
    ],
    starterCode: "n = int(input())\nif n == 0:\n    print(0)\nelse:\n    a, b = 0, 1\n    for _ in range(n - 1):\n        a, b = b, a + b\n    print(b)\n"
  },
  "prob-l4-valid-parentheses": {
    id: "prob-l4-valid-parentheses",
    title: "توازن الأقواس البرمجية (Valid Parentheses)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 130,
    timeLimit: 2000,
    skills: ["data_structures", "stack", "strings"],
    description: "استقبل نصاً يحتوي فقط على الأقواس '()[]{}'. تحقق هل تسلسل الأقواس صحيح ومتوازن (كل قوس يُغلق بنفس نوعه وبترتيب سليم). اطبع 'Valid' أو 'Invalid'.",
    inputDescription: "سطر واحد يحتوي على نص الأقواس.",
    outputDescription: "اطبع 'Valid' أو 'Invalid'.",
    examples: [
      { input: "()[]{}", output: "Valid", explanation: "جميع الأقواس متطابقة ومغلقة بترتيب سليم." },
      { input: "(]", output: "Invalid", explanation: "قوس دائري أُغلق بمربع." }
    ],
    constraints: ["1 <= len(s) <= 10^4"],
    publicTestCases: [
      { input: "()[]{}", expectedOutput: "Valid", description: "أقواس متوازنة" },
      { input: "(]", expectedOutput: "Invalid", description: "نوع إغلاق غير متطابق" }
    ],
    hiddenTestCases: [
      { input: "([{}])", expectedOutput: "Valid" },
      { input: "((", expectedOutput: "Invalid" },
      { input: "]", expectedOutput: "Invalid" }
    ],
    starterCode: "s = input().strip()\nstack = []\nmapping = {')': '(', ']': '[', '}': '{'}\nis_valid = True\nfor char in s:\n    if char in mapping.values():\n        stack.append(char)\n    elif char in mapping:\n        if not stack or stack[-1] != mapping[char]:\n            is_valid = False\n            break\n        stack.pop()\n    else:\n        is_valid = False\n        break\nif is_valid and len(stack) == 0:\n    print('Valid')\nelse:\n    print('Invalid')\n"
  },
  "prob-l4-longest-consecutive": {
    id: "prob-l4-longest-consecutive",
    title: "أطول تتابع متتالي (Longest Consecutive Sequence)",
    level: 4,
    difficulty: "hard",
    points: 50,
    baseXp: 140,
    timeLimit: 2000,
    skills: ["hash_set", "algorithms", "optimization"],
    description: "استقبل قائمة أرقام صحيحة غير مرتبة في سطر واحد. أوجد طول أطول تتابع من الأرقام المتتالية (بحيث كل رقم يزيد 1 عن السابق) بكفاءة O(n).",
    inputDescription: "سطر واحد يحتوي على أعداد صحيحة مفصولة بمسافة.",
    outputDescription: "اطبع طول أطول متتالية.",
    examples: [
      { input: "100 4 200 1 3 2", output: "4", explanation: "الأرقام 1, 2, 3, 4 متتالية وطولها 4." }
    ],
    constraints: ["0 <= len(nums) <= 10^5"],
    publicTestCases: [
      { input: "100 4 200 1 3 2", expectedOutput: "4", description: "تتابع 1..4" }
    ],
    hiddenTestCases: [
      { input: "0 3 7 2 5 8 4 6 0 1", expectedOutput: "9" },
      { input: "9", expectedOutput: "1" }
    ],
    starterCode: "line = input().strip()\nif not line:\n    print(0)\nelse:\n    nums = set(map(int, line.split()))\n    longest = 0\n    for x in nums:\n        if x - 1 not in nums:\n            curr = x\n            streak = 1\n            while curr + 1 in nums:\n                curr += 1\n                streak += 1\n            longest = max(longest, streak)\n    print(longest)\n"
  },

  // LEVEL 5: CHALLENGE / EXPERT
  "prob-l5-two-sum-linear": {
    id: "prob-l5-two-sum-linear",
    title: "تحدي مجموع الزوجين بالزمن الخطي O(N)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 200,
    timeLimit: 1500,
    skills: ["hash_table", "time_complexity", "optimization"],
    description: "السطر الأول: n والهدف target. السطر الثاني: n أعداد صحيحة. أوجد مؤشري (0-based indices) لرقمين مجموعهما يساوي target تماماً، واطبعهما مفصولين بمسافة (المؤشر الأصغر أولاً). يجب إنجاز الحل بزمن خطي O(n).",
    inputDescription: "السطر 1: n target\nالسطر 2: n أعداد صحيحة",
    outputDescription: "اطبع المؤشرين: i j",
    examples: [
      { input: "4 9\n2 7 11 15", output: "0 1", explanation: "العنصران 2 و 7 في المؤشرات 0 و 1 مجموعهما 9." }
    ],
    constraints: ["2 <= n <= 10^5", "يوجد حل فريد مضمون"],
    publicTestCases: [
      { input: "4 9\n2 7 11 15", expectedOutput: "0 1", description: "أول عنصرين" },
      { input: "3 6\n3 2 4", expectedOutput: "1 2", description: "عنصران في المنتصف والنهاية" }
    ],
    hiddenTestCases: [
      { input: "2 6\n3 3", expectedOutput: "0 1" }
    ],
    starterCode: "n, target = map(int, input().split())\nnums = list(map(int, input().split()))\nseen = {}\nfor idx, val in enumerate(nums):\n    diff = target - val\n    if diff in seen:\n        print(f'{seen[diff]} {idx}')\n        break\n    seen[val] = idx\n"
  },
  "prob-l5-trapping-rain-water": {
    id: "prob-l5-trapping-rain-water",
    title: "حساب مياه الأمطار المحتجزة (Trapping Rain Water)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 220,
    timeLimit: 2000,
    skills: ["two_pointers", "algorithms", "optimization"],
    description: "استقبل قائمة أطوال جدران تمثل خريطة ارتفاعات، حيث عرض كل جدار = 1. احسب كمية مياه الأمطار الإجمالية التي يمكن احتجازها بين الجدران بعد هطول المطر.",
    inputDescription: "سطر واحد به أعداد صحيحة تمثل ارتفاع الجدران.",
    outputDescription: "اطبع كمية المياه المحتجزة.",
    examples: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "كمية المياه المحتجزة بين الجدران هي 6 وحدات." }
    ],
    constraints: ["1 <= len(height) <= 2 * 10^4"],
    publicTestCases: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6", description: "خريطة ارتفاعات قياسية" },
      { input: "4 2 0 3 2 5", expectedOutput: "9", description: "حوض مياه عميق" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "0" },
      { input: "5 4 1 2", expectedOutput: "1" }
    ],
    starterCode: "h = list(map(int, input().split()))\nif not h:\n    print(0)\nelse:\n    left, right = 0, len(h) - 1\n    left_max, right_max = h[left], h[right]\n    water = 0\n    while left < right:\n        if left_max < right_max:\n            left += 1\n            left_max = max(left_max, h[left])\n            water += left_max - h[left]\n        else:\n            right -= 1\n            right_max = max(right_max, h[right])\n            water += right_max - h[right]\n    print(water)\n"
  },
  "prob-l5-longest-valid-parens": {
    id: "prob-l5-longest-valid-parens",
    title: "أطول سلسلة أقواس متطابقة متصلة (Longest Valid Parentheses)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 240,
    timeLimit: 2000,
    skills: ["stack", "dynamic_programming", "edge_cases"],
    description: "استقبل نصاً يتكون من الأقواس الدائرية '(' و ')' فقط. أوجد طول أطول جزء متصل (Substring) متوازن تماماً وصحيح القواعد.",
    inputDescription: "سطر واحد يحتوي على نص الأقواس.",
    outputDescription: "اطبع طول أطول سلسلة صحيحة.",
    examples: [
      { input: "(()", output: "2", explanation: "أطول جزء صالح هو '()' وطوله 2." },
      { input: ")()())", output: "4", explanation: "أطول جزء صالح هو '()()' وطوله 4." }
    ],
    constraints: ["0 <= len(s) <= 3 * 10^4"],
    publicTestCases: [
      { input: "(()", expectedOutput: "2", description: "قوس مفتوح زائد" },
      { input: ")()())", expectedOutput: "4", description: "سلسلة صحيحة بطول 4" }
    ],
    hiddenTestCases: [
      { input: "", expectedOutput: "0" },
      { input: "()(())", expectedOutput: "6" }
    ],
    starterCode: "s = input().strip()\nstack = [-1]\nmax_len = 0\nfor i, ch in enumerate(s):\n    if ch == '(':\n        stack.append(i)\n    else:\n        stack.pop()\n        if not stack:\n            stack.append(i)\n        else:\n            max_len = max(max_len, i - stack[-1])\nprint(max_len)\n"
  },
  "prob-l5-merge-intervals": {
    id: "prob-l5-merge-intervals",
    title: "دمج الفترات الزمنية المتداخلة (Merge Intervals)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 220,
    timeLimit: 2000,
    skills: ["intervals", "sorting", "greedy"],
    description: "السطر الأول يحتوي على عدد الفترات n. يليه n أسطر، كل سطر يحتوي على بداية ونهاية الفترة start end. قم بدمج جميع الفترات المتداخلة واطبع الفترات الناتجة مرتبة حسب البداية، كل فترة في سطر.",
    inputDescription: "السطر 1: n\nالأسطر التالية: start end",
    outputDescription: "اطبع الفترات المدمجة: start end في كل سطر.",
    examples: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", output: "1 6\n8 10\n15 18", explanation: "تم دمج الفترتين [1, 3] و [2, 6] لتصبحا [1, 6]." }
    ],
    constraints: ["1 <= n <= 10^4"],
    publicTestCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "1 6\n8 10\n15 18", description: "فترات متداخلة وغير متداخلة" }
    ],
    hiddenTestCases: [
      { input: "2\n1 4\n4 5", expectedOutput: "1 5" }
    ],
    starterCode: "n = int(input())\nintervals = []\nfor _ in range(n):\n    intervals.append(list(map(int, input().split())))\nintervals.sort(key=lambda x: x[0])\nmerged = [intervals[0]]\nfor current in intervals[1:]:\n    prev = merged[-1]\n    if current[0] <= prev[1]:\n        prev[1] = max(prev[1], current[1])\n    else:\n        merged.append(current)\nfor it in merged:\n    print(f'{it[0]} {it[1]}')\n"
  },
  "prob-l5-lru-cache": {
    id: "prob-l5-lru-cache",
    title: "محاكي الذاكرة المؤقتة (LRU Cache Simulator)",
    level: 5,
    difficulty: "expert",
    points: 100,
    baseXp: 250,
    timeLimit: 2500,
    skills: ["data_structures", "ordered_dict", "system_design"],
    description: "قم بمحاكاة LRU (Least Recently Used) Cache بسعة محددة capacity. السطر الأول: capacity وعدد العمليات q. تليها q أسطر:\n- 'SET key value': يضع المفتاح وقيمته في الكاش (وإذا امتلأت السعة، يتم استبعاد العنصر الأقل استخداماً مؤخراً).\n- 'GET key': يطبع قيمة المفتاح أو -1 إذا لم يكن موجوداً، ويجعله الأكثر استخداماً مؤخراً.",
    inputDescription: "السطر 1: capacity q\nالأسطر التالية: SET k v أو GET k",
    outputDescription: "لكل عملية GET، اطبع القيمة المسترجعة في سطر.",
    examples: [
      { input: "2 5\nSET 1 10\nSET 2 20\nGET 1\nSET 3 30\nGET 2", output: "10\n-1", explanation: "استبعاد 2 لأن 1 تم استخدامه مؤخراً بعملية GET 1." }
    ],
    constraints: ["1 <= capacity <= 1000", "1 <= q <= 2000"],
    publicTestCases: [
      { input: "2 5\nSET 1 10\nSET 2 20\nGET 1\nSET 3 30\nGET 2", expectedOutput: "10\n-1", description: "اختبار استبعاد العنصر الأقل استخداماً" }
    ],
    hiddenTestCases: [
      { input: "1 3\nSET 5 50\nGET 5\nGET 6", expectedOutput: "50\n-1" }
    ],
    starterCode: "from collections import OrderedDict\ncap, q = map(int, input().split())\ncache = OrderedDict()\nfor _ in range(q):\n    parts = input().split()\n    op = parts[0]\n    if op == 'SET':\n        k, v = parts[1], parts[2]\n        if k in cache:\n            cache.move_to_end(k)\n        cache[k] = v\n        if len(cache) > cap:\n            cache.popitem(last=False)\n    elif op == 'GET':\n        k = parts[1]\n        if k in cache:\n            cache.move_to_end(k)\n            print(cache[k])\n        else:\n            print('-1')\n"
  }
};

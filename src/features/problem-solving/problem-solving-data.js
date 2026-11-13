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
    pointsPerProblem: 20,
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
    pointsPerProblem: 30,
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
    pointsPerProblem: 50,
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
    pointsPerProblem: 80,
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
    pointsPerProblem: 150,
    completionBonus: 250
  }
];

export const PROBLEM_SOLVING_CHALLENGES_DATA = {
  "prob-l2-string-length": {
    "id": "prob-l2-string-length",
    "title": "طول السلسلة النصية بدون دالة len",
    "level": 2,
    "difficulty": "easy",
    "points": 30,
    "timeLimit": 3000,
    "skills": [
        "strings",
        "loops",
        "accumulator"
    ],
    "description": "اكتب برنامجاً يستقبل نصاً ويحسب طوله (عدد أحرفه) باستخدام حلقة تكرار وعداد يدوي دون استخدام دالة len() الجاهزة.",
    "inputDescription": "سطر واحد يحتوي على نص.",
    "outputDescription": "اطبع عدداً صحيحاً يمثل طول النص.",
    "examples": [
        {
            "input": "shababha",
            "output": "8",
            "explanation": "طول الكلمة 8 أحرف."
        }
    ],
    "constraints": [
        "طول النص حتى 500 حرف"
    ],
    "starterCode": "# احسب طول النص يدوياً بدون len\n",
    "publicTestCases": [
        {
            "input": "shababha",
            "expectedOutput": "8"
        },
        {
            "input": "hello",
            "expectedOutput": "5"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "",
            "expectedOutput": "0"
        },
        {
            "input": "a",
            "expectedOutput": "1"
        }
    ],
    "hints": [
        "فكرة التفكير: ابدأ بعداد count = 0 ومر بحلقة على الحروف وزد العداد بواحد."
    ]
},

  "prob-l4-rotate-array": {
    "id": "prob-l4-rotate-array",
    "title": "تدوير المصفوفة بمقدار k خطوات (Rotate Array by K)",
    "level": 4,
    "difficulty": "hard",
    "points": 80,
    "timeLimit": 3000,
    "skills": [
        "arrays",
        "rotation",
        "slicing"
    ],
    "description": "اكتب برنامجاً يستقبل في السطر الأول أرقاماً مفصولة بمسافات، وفي السطر الثاني عدداً صحيحاً k. قم بتدوير المصفوفة لليمين بمقدار k خطوات واطبع المصفوفة الناتجة مفصولة بمسافات.",
    "inputDescription": "السطر الأول أرقام مفصولة بمسافات، والسطر الثاني k.",
    "outputDescription": "اطبع الأرقام بعد التدوير مفصولة بمسافات.",
    "examples": [
        {
            "input": "1 2 3 4 5\n2",
            "output": "4 5 1 2 3",
            "explanation": "تدوير خطوتين لليمين."
        }
    ],
    "constraints": [
        "1 <= k <= 1000"
    ],
    "starterCode": "# دور المصفوفة واطبع الناتج مفصولاً بمسافات\n",
    "publicTestCases": [
        {
            "input": "1 2 3 4 5\n2",
            "expectedOutput": "4 5 1 2 3"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "10 20 30\n1",
            "expectedOutput": "30 10 20"
        },
        {
            "input": "1 2\n0",
            "expectedOutput": "1 2"
        }
    ],
    "hints": [
        "فكرة التفكير: التدوير بمقدار k يعادل تقطيع arr[-k:] + arr[:-k] مع أخذ k % len(arr)."
    ]
},

  "prob-l4-two-sum-sorted": {
    "id": "prob-l4-two-sum-sorted",
    "title": "مجموع الهدف في مصفوفة مرتبة بالمؤشرين (Two Sum Sorted)",
    "level": 4,
    "difficulty": "hard",
    "points": 80,
    "timeLimit": 3000,
    "skills": [
        "two_pointers",
        "sorting",
        "binary_search"
    ],
    "description": "اكتب برنامجاً يستقبل مصفوفة مرتبة في السطر الأول، ورقم هدف target في السطر الثاني. ابحث عن أول زوج يحقق المجموع واطبعه مفصولاً بعلامة + ومساواة (مثال: 2 + 7 = 9).",
    "inputDescription": "السطر الأول أرقام مرتبة، والسطر الثاني هدف الجمع.",
    "outputDescription": "اطبع بصيغة a + b = target.",
    "examples": [
        {
            "input": "2 7 11 15\n9",
            "output": "2 + 7 = 9",
            "explanation": "2 + 7 = 9."
        }
    ],
    "constraints": [
        "يوجد حل دائماً"
    ],
    "starterCode": "# ابحث عن الزوج واطبع: a + b = target\n",
    "publicTestCases": [
        {
            "input": "2 7 11 15\n9",
            "expectedOutput": "2 + 7 = 9"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "1 2 3 4 6\n10",
            "expectedOutput": "4 + 6 = 10"
        }
    ],
    "hints": [
        "فكرة التفكير: استخدم مؤشرين left و right وحركهما بناءً على مقارنة المجموع مع الهدف."
    ]
},

  "prob-l5-matrix-zeroes": {
    "id": "prob-l5-matrix-zeroes",
    "title": "تصفير الصفوف والأعمدة المحتوية على أصفار (Set Matrix Zeroes)",
    "level": 5,
    "difficulty": "expert",
    "points": 150,
    "timeLimit": 3000,
    "skills": [
        "matrices",
        "in_place",
        "optimization"
    ],
    "description": "اكتب برنامجاً يستقبل مصفوفة 2x2 (كل صف في سطر). إذا وجد صفر في أي موقع، صفر كامل الصف وكامل العمود الذي يقع فيه الصفر واطبع المصفوفة الناتجة.",
    "inputDescription": "سطران، في كل سطر عددان مفصولان بمسافة.",
    "outputDescription": "سطران يمثلان المصفوفة الناتجة.",
    "examples": [
        {
            "input": "1 0\n2 3",
            "output": "0 0\n2 0",
            "explanation": "تم تصفير الصف الأول والعمود الثاني."
        }
    ],
    "constraints": [
        "مصفوفة 2x2"
    ],
    "starterCode": "# صفر الصفوف والأعمدة المحتوية على أصفار\n",
    "publicTestCases": [
        {
            "input": "1 0\n2 3",
            "expectedOutput": "0 0\n2 0"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "1 2\n3 4",
            "expectedOutput": "1 2\n3 4"
        },
        {
            "input": "0 0\n1 2",
            "expectedOutput": "0 0\n0 0"
        }
    ],
    "hints": [
        "فكرة التفكير: حدد الصفوف والأعمدة التي بها أصفار أولاً، ثم صفرها في الخطوة الثانية."
    ]
},


  "prob-l1-max-of-three": {
    "id": "prob-l1-max-of-three",
    "title": "أكبر الأرقام الثلاثة (Maximum of Three Numbers)",
    "level": 1,
    "difficulty": "easy",
    "points": 20,
    "timeLimit": 3000,
    "skills": [
        "input",
        "conditions",
        "comparisons"
    ],
    "description": "اكتب برنامجاً يستقبل ثلاثة أعداد صحيحة كل منها في سطر مستقل، ثم يطبع العدد الأكبر من بينها فقط.",
    "inputDescription": "ثلاثة أسطر، كل سطر يحتوي على عدد صحيح.",
    "outputDescription": "اطبع عدداً واحداً يمثل القيمة الكبرى بين الأعداد الثلاثة.",
    "examples": [
        {
            "input": "10\n25\n15",
            "output": "25",
            "explanation": "العدد 25 هو الأكبر بين الأرقام الثلاثة."
        },
        {
            "input": "-5\n-2\n-9",
            "output": "-2",
            "explanation": "في الأعداد السالبة، -2 هو الأكبر."
        }
    ],
    "constraints": [
        "-1000 <= كل عدد <= 1000"
    ],
    "starterCode": "# اقرأ الأعداد الثلاثة واطبع الأكبر من بينها\n",
    "publicTestCases": [
        {
            "input": "10\n25\n15",
            "expectedOutput": "25"
        },
        {
            "input": "-5\n-2\n-9",
            "expectedOutput": "-2"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "100\n100\n50",
            "expectedOutput": "100"
        },
        {
            "input": "0\n0\n0",
            "expectedOutput": "0"
        }
    ],
    "hints": [
        "فكرة التفكير: قارن الرقم الأول بالثاني ثم قارن الأكبر منهما بالثالث، أو استخدم دالة max()."
    ]
},

  "prob-l1-leap-year": {
    "id": "prob-l1-leap-year",
    "title": "فاحص السنة الكبيسة المبسط (Leap Year Simple)",
    "level": 1,
    "difficulty": "easy",
    "points": 20,
    "timeLimit": 3000,
    "skills": [
        "input",
        "conditions",
        "modulus"
    ],
    "description": "اكتب برنامجاً يستقبل سنة كعدد صحيح. إذا كانت السنة تقبل القسمة على 4 بدون باقٍ اطبع 'Leap Year' وإلا اطبع 'Common Year'.",
    "inputDescription": "سطر واحد يحتوي على سنة صحيحة (مثال: 2024).",
    "outputDescription": "اطبع 'Leap Year' أو 'Common Year'.",
    "examples": [
        {
            "input": "2024",
            "output": "Leap Year",
            "explanation": "2024 تقبل القسمة على 4."
        },
        {
            "input": "2023",
            "output": "Common Year",
            "explanation": "2023 لا تقبل القسمة على 4."
        }
    ],
    "constraints": [
        "1900 <= year <= 2100"
    ],
    "starterCode": "# اقرأ السنة وافحص قابليتها للقسمة على 4\n",
    "publicTestCases": [
        {
            "input": "2024",
            "expectedOutput": "Leap Year"
        },
        {
            "input": "2023",
            "expectedOutput": "Common Year"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "2020",
            "expectedOutput": "Leap Year"
        },
        {
            "input": "2025",
            "expectedOutput": "Common Year"
        }
    ],
    "hints": [
        "فكرة التفكير: استخدم معامل باقي القسمة % 4 للتحقق من انعدام الباقي."
    ]
},

  "prob-l1-absolute-diff": {
    "id": "prob-l1-absolute-diff",
    "title": "حساب الفرق المطلق بين قيمتين (Absolute Difference)",
    "level": 1,
    "difficulty": "easy",
    "points": 20,
    "timeLimit": 3000,
    "skills": [
        "arithmetic",
        "math",
        "input"
    ],
    "description": "اكتب برنامجاً يستقبل عددين صحيحين كل منهما في سطر، ويحسب الفرق المطلق (الموجب دائماً) بينهما.",
    "inputDescription": "سطران، في كل سطر عدد صحيح a ثم b.",
    "outputDescription": "اطبع الفرق المطلق بين العددين كعدد صحيح موجب.",
    "examples": [
        {
            "input": "15\n30",
            "output": "15",
            "explanation": "|15 - 30| = 15"
        },
        {
            "input": "50\n20",
            "output": "30",
            "explanation": "|50 - 20| = 30"
        }
    ],
    "constraints": [
        "-10000 <= a, b <= 10000"
    ],
    "starterCode": "# اقرأ العددين واطبع الفرق المطلق\n",
    "publicTestCases": [
        {
            "input": "15\n30",
            "expectedOutput": "15"
        },
        {
            "input": "50\n20",
            "expectedOutput": "30"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "-5\n5",
            "expectedOutput": "10"
        },
        {
            "input": "0\n0",
            "expectedOutput": "0"
        }
    ],
    "hints": [
        "فكرة التفكير: الفرق المطلق يعني تجريد الناتج من الإشارة السالبة باستخدام دالة abs()."
    ]
},

  "prob-l2-sum-of-evens": {
    "id": "prob-l2-sum-of-evens",
    "title": "مجموع الأعداد الزوجية في نطاق محدد (Sum of Evens)",
    "level": 2,
    "difficulty": "easy",
    "points": 30,
    "timeLimit": 3000,
    "skills": [
        "loops",
        "range",
        "accumulator"
    ],
    "description": "اكتب برنامجاً يستقبل عددين start و end، ويحسب حاصل جمع جميع الأعداد الزوجية المحصورة بينهما (بما في ذلك طرفي النطاق إذا كانا زوجيين).",
    "inputDescription": "سطران، الأول للبداية start والثاني للنهاية end.",
    "outputDescription": "اطبع عدداً صحيحاً يمثل المجموع التراكمي للأرقام الزوجية.",
    "examples": [
        {
            "input": "1\n10",
            "output": "30",
            "explanation": "الأعداد 2+4+6+8+10 = 30."
        },
        {
            "input": "4\n8",
            "output": "18",
            "explanation": "الأعداد 4+6+8 = 18."
        }
    ],
    "constraints": [
        "1 <= start <= end <= 1000"
    ],
    "starterCode": "# اقرأ البداية والنهاية واجمع الأرقام الزوجية\n",
    "publicTestCases": [
        {
            "input": "1\n10",
            "expectedOutput": "30"
        },
        {
            "input": "4\n8",
            "expectedOutput": "18"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "1\n1",
            "expectedOutput": "0"
        },
        {
            "input": "2\n2",
            "expectedOutput": "2"
        }
    ],
    "hints": [
        "فكرة التفكير: مر بحلقة for من start إلى end + 1 وافحص باقي القسمة على 2 قبل الإضافة للمجموع."
    ]
},

  "prob-l2-char-frequency": {
    "id": "prob-l2-char-frequency",
    "title": "عد تكرار حرف محدد في جملة (Character Frequency)",
    "level": 2,
    "difficulty": "easy",
    "points": 30,
    "timeLimit": 3000,
    "skills": [
        "strings",
        "count",
        "input"
    ],
    "description": "اكتب برنامجاً يستقبل في السطر الأول نصاً، وفي السطر الثاني حرفاً واحداً، ثم يطبع عدد مرات ظهور هذا الحرف في النص.",
    "inputDescription": "السطر الأول نص، والسطر الثاني حرف مفرد.",
    "outputDescription": "اطبع عدداً صحيحاً يمثل تكرار الحرف.",
    "examples": [
        {
            "input": "shababha\na",
            "output": "3",
            "explanation": "الحرف a ظهر 3 مرات."
        },
        {
            "input": "banana\nn",
            "output": "2",
            "explanation": "الحرف n ظهر مرتين."
        }
    ],
    "constraints": [
        "طول النص حتى 200 حرف"
    ],
    "starterCode": "# اقرأ النص والحرف واطبع عدد مرات ظهوره\n",
    "publicTestCases": [
        {
            "input": "shababha\na",
            "expectedOutput": "3"
        },
        {
            "input": "banana\nn",
            "expectedOutput": "2"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "code\nz",
            "expectedOutput": "0"
        },
        {
            "input": "aaaa\na",
            "expectedOutput": "4"
        }
    ],
    "hints": [
        "فكرة التفكير: يمكن استخدام دالة .count() أو المرور بحلقة تكرار مع عداد."
    ]
},

  "prob-l3-list-intersection": {
    "id": "prob-l3-list-intersection",
    "title": "الأرقام المشتركة بين قائمتين (List Intersection)",
    "level": 3,
    "difficulty": "medium",
    "points": 50,
    "timeLimit": 3000,
    "skills": [
        "sets",
        "intersection",
        "sorting"
    ],
    "description": "اكتب برنامجاً يستقبل في السطر الأول أرقاماً مفصولة بمسافات، وفي السطر الثاني أرقاماً مفصولة بمسافات. استخرج الأرقام المشتركة واطبعها مرتبة تصاعدياً ومفصولة بمسافات.",
    "inputDescription": "سطران، كل سطر يحتوي على أعداد صحيحة مفصولة بمسافات.",
    "outputDescription": "اطبع الأرقام المشتركة بدون تكرار مرتبة تصاعدياً ومفصولة بمسافة.",
    "examples": [
        {
            "input": "1 2 3 4\n3 4 5 6",
            "output": "3 4",
            "explanation": "الأرقام المشتركة هي 3 و 4."
        },
        {
            "input": "10 20 30\n40 50 20",
            "output": "20",
            "explanation": "الرقم المشترك الوحيد هو 20."
        }
    ],
    "constraints": [
        "كل قائمة تحتوي حتى 100 عنصر"
    ],
    "starterCode": "# اقرأ القائمتين واستخرج الأرقام المشتركة مرتبة\n",
    "publicTestCases": [
        {
            "input": "1 2 3 4\n3 4 5 6",
            "expectedOutput": "3 4"
        },
        {
            "input": "10 20 30\n40 50 20",
            "expectedOutput": "20"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "5 5 1 2\n2 5 9",
            "expectedOutput": "2 5"
        },
        {
            "input": "100 200\n300 100",
            "expectedOutput": "100"
        }
    ],
    "hints": [
        "فكرة التفكير: حول السطرين لمجموعتين set واستخدم تقاطع المجموعات & ثم رتب الناتج."
    ]
},

  "prob-l3-word-reverser": {
    "id": "prob-l3-word-reverser",
    "title": "عكس كل كلمة في الجملة بمكانها (Reverse Each Word)",
    "level": 3,
    "difficulty": "medium",
    "points": 50,
    "timeLimit": 3000,
    "skills": [
        "strings",
        "split",
        "slicing"
    ],
    "description": "اكتب برنامجاً يستقبل جملة نصية مفصولة بمسافات، ويقوم بعكس حروف كل كلمة بمفردها مع الحفاظ على ترتيب الكلمات في الجملة.",
    "inputDescription": "سطر واحد يحتوي على كلمات مفصولة بمسافات.",
    "outputDescription": "اطبع الجملة بحيث تعكس حروف كل كلمة.",
    "examples": [
        {
            "input": "hello world python",
            "output": "olleh dlrow nohtyp",
            "explanation": "عكس hello هو olleh وهكذا."
        },
        {
            "input": "shababha courses",
            "output": "ahbabahs sesruoc",
            "explanation": "عكس الكلمتين."
        }
    ],
    "constraints": [
        "طول الجملة حتى 200 حرف"
    ],
    "starterCode": "# اقرأ الجملة واعكس حروف كل كلمة\n",
    "publicTestCases": [
        {
            "input": "hello world python",
            "expectedOutput": "olleh dlrow nohtyp"
        },
        {
            "input": "shababha courses",
            "expectedOutput": "ahbabahs sesruoc"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "cat dog",
            "expectedOutput": "tac god"
        },
        {
            "input": "a bb ccc",
            "expectedOutput": "a bb ccc"
        }
    ],
    "hints": [
        "فكرة التفكير: قسم الجملة بالدالة split()، ثم اعكس كل كلمة بواسطة [::-1] وادمجهم بـ ' '.join()."
    ]
},

  "prob-l3-dict-invert": {
    "id": "prob-l3-dict-invert",
    "title": "عكس قاموس المفاتيح والقيم (Dictionary Inverter)",
    "level": 3,
    "difficulty": "medium",
    "points": 50,
    "timeLimit": 3000,
    "skills": [
        "dictionaries",
        "comprehensions",
        "sorting"
    ],
    "description": "اكتب برنامجاً يستقبل أزواج مفاتيح وقيم بصيغة key:val مفصولة بمسافات (مثل A:1 B:2 C:3). اعكس القاموس لتصبح القيم مفاتيح واطبع الأزواج الجديدة بصيغة val:key مرتبة تصاعدياً حسب المفتاح الجديد.",
    "inputDescription": "سطر واحد يحتوي على أزواج مفصولة بمسافات.",
    "outputDescription": "اطبع الأزواج المعكوسة مفصولة بمسافات.",
    "examples": [
        {
            "input": "A:1 B:2 C:3",
            "output": "1:A 2:B 3:C",
            "explanation": "تم عكس كل زوج."
        },
        {
            "input": "x:10 y:20",
            "output": "10:x 20:y",
            "explanation": "المفتاح أصبح 10 و 20."
        }
    ],
    "constraints": [
        "القيم فريدة دائماً"
    ],
    "starterCode": "# اقرأ الأزواج واعكس المفاتيح بالقيم\n",
    "publicTestCases": [
        {
            "input": "A:1 B:2 C:3",
            "expectedOutput": "1:A 2:B 3:C"
        },
        {
            "input": "x:10 y:20",
            "output": "10:x 20:y",
            "expectedOutput": "10:x 20:y"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "first:1 second:2",
            "expectedOutput": "1:first 2:second"
        }
    ],
    "hints": [
        "فكرة التفكير: فكك الأزواج بالتقسيم عند ':' ثم اعكس الموقع واطبعها مرتبة."
    ]
},

  "prob-l4-matrix-transpose": {
    "id": "prob-l4-matrix-transpose",
    "title": "تدوير المصفوفة الثنائية (2x2 Matrix Transpose)",
    "level": 4,
    "difficulty": "hard",
    "points": 80,
    "timeLimit": 3000,
    "skills": [
        "matrices",
        "nested_lists",
        "linear_algebra"
    ],
    "description": "اكتب برنامجاً يستقبل صفي مصفوفة 2x2 (كل صف في سطر مفصولاً بمسافة)، ويقوم بتدوير المصفوفة بجعل الصفوف أعمدة والأعمدة صفوفاً، ثم يطبع المصفوفة المدورة.",
    "inputDescription": "سطران، كل سطر يحتوي على عددين مفصولين بمسافة.",
    "outputDescription": "سطران، يمثلان صفوف المصفوفة المدورة.",
    "examples": [
        {
            "input": "1 2\n3 4",
            "output": "1 3\n2 4",
            "explanation": "تم تبديل الصفوف بالأعمدة."
        }
    ],
    "constraints": [
        "الأعداد صحيحة"
    ],
    "starterCode": "# اقرأ المصفوفة واطبع تدويرها\n",
    "publicTestCases": [
        {
            "input": "1 2\n3 4",
            "expectedOutput": "1 3\n2 4"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "5 6\n7 8",
            "expectedOutput": "5 7\n6 8"
        }
    ],
    "hints": [
        "فكرة التفكير: إذا كانت العناصر a b في السطر الأول و c d في الثاني، فإن التدوير يكون a c ثم b d."
    ]
},

  "prob-l5-kadane-max-subarray": {
    "id": "prob-l5-kadane-max-subarray",
    "title": "أكبر مجموع مصفوفة فرعية متصلة (Kadane's Algorithm)",
    "level": 5,
    "difficulty": "expert",
    "points": 150,
    "timeLimit": 3000,
    "skills": [
        "dynamic_programming",
        "kadane",
        "optimization"
    ],
    "description": "اكتب برنامجاً يستقبل في سطر واحد أرقاماً مفصولة بمسافات (تحتوي قيماً موجبة وسالبة). احسب واطبع أكبر مجموع ممكن لأي مصفوفة فرعية متصلة باستخدام خوارزمية كادان.",
    "inputDescription": "سطر واحد يحتوي على أعداد صحيحة مفصولة بمسافات.",
    "outputDescription": "اطبع عدداً واحداً يمثل المجموع الأقصى.",
    "examples": [
        {
            "input": "-2 1 -3 4 -1 2 1 -5 4",
            "output": "6",
            "explanation": "المصفوفة الفرعية [4, -1, 2, 1] مجموعها 6."
        },
        {
            "input": "1 2 3 -2 5",
            "output": "9",
            "explanation": "المجموع الكلي باستثناء -2 أو معها يعطي 9."
        }
    ],
    "constraints": [
        "طول القائمة حتى 1000 عنصر"
    ],
    "starterCode": "# طبق خوارزمية كادان واطبع المجموع الأقصى\n",
    "publicTestCases": [
        {
            "input": "-2 1 -3 4 -1 2 1 -5 4",
            "expectedOutput": "6"
        },
        {
            "input": "1 2 3 -2 5",
            "expectedOutput": "9"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "-1 -2 -3",
            "expectedOutput": "-1"
        },
        {
            "input": "5 4 -1 7 8",
            "expectedOutput": "23"
        }
    ],
    "hints": [
        "فكرة التفكير: تتبع المجموع الحالي cur = max(x, cur + x) وقارنه مع max_sum في كل خطوة."
    ]
},

  "prob-l5-longest-increasing-subsequence": {
    "id": "prob-l5-longest-increasing-subsequence",
    "title": "أطول متتالية متزايدة (Longest Increasing Subsequence)",
    "level": 5,
    "difficulty": "expert",
    "points": 150,
    "timeLimit": 3000,
    "skills": [
        "dynamic_programming",
        "subsequence",
        "lis"
    ],
    "description": "اكتب برنامجاً يستقبل في سطر واحد أرقاماً مفصولة بمسافات. احسب واطبع طول أطول متتالية متزايدة قطعياً (Longest Strictly Increasing Subsequence).",
    "inputDescription": "سطر واحد يحتوي أعداداً صحيحة مفصولة بمسافات.",
    "outputDescription": "اطبع رقماً واحداً يمثل طول المتتالية المتزايدة.",
    "examples": [
        {
            "input": "10 9 2 5 3 7 101 18",
            "output": "4",
            "explanation": "المتتالية 2, 3, 7, 101 طولها 4."
        }
    ],
    "constraints": [
        "طول القائمة حتى 100 عنصر"
    ],
    "starterCode": "# احسب طول أطول متتالية متزايدة LIS\n",
    "publicTestCases": [
        {
            "input": "10 9 2 5 3 7 101 18",
            "expectedOutput": "4"
        }
    ],
    "hiddenTestCases": [
        {
            "input": "0 1 0 3 2 3",
            "expectedOutput": "4"
        },
        {
            "input": "7 7 7",
            "expectedOutput": "1"
        }
    ],
    "hints": [
        "فكرة التفكير: استخدم مصفوفة برمجة ديناميكية dp حيث dp[i] هو طول أطول متتالية تنتهي عند العنصر i."
    ]
},


  // LEVEL 1: BEGINNER
  "prob-l1-sum": {
    id: "prob-l1-sum",
    title: "مجموع رقمين (Sum of Two Numbers)",
    level: 1,
    difficulty: "easy",
    points: 20,
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
    points: 20,
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
    points: 20,
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
    points: 20,
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
    points: 20,
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
  "prob-l1-stanford-pythagorean": {
    id: "prob-l1-stanford-pythagorean",
    title: "نظرية فيثاغورس (Stanford Pythagorean Theorem)",
    level: 1,
    difficulty: "easy",
    points: 20,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["variables", "input", "math", "stanford_cs106a"],
    description: "مسألة كلاسيكية في منهج ستانفورد CS106A: اقرأ طولي ضلعي القائمة a و b في مثلث قائم الزاوية (كل رقم في سطر مستقل). احسب طول الوتر c = sqrt(a^2 + b^2) واطبع الناتج كعدد صحيح int.",
    inputDescription: "سطران: السطر 1 يحتوي على a، والسطر 2 يحتوي على b.",
    outputDescription: "اطبع عدداً صحيحاً يمثل طول الوتر.",
    examples: [
      { input: "3\n4", output: "5", explanation: "الجذر التربيعي لـ (9 + 16) هو 5." },
      { input: "6\n8", output: "10", explanation: "الجذر التربيعي لـ (36 + 64) هو 10." }
    ],
    constraints: ["1 <= a, b <= 10^4"],
    publicTestCases: [
      { input: "3\n4", expectedOutput: "5", description: "مثلث 3 و 4 و 5 الشهير" },
      { input: "6\n8", expectedOutput: "10", description: "مثلث 6 و 8 و 10" }
    ],
    hiddenTestCases: [
      { input: "5\n12", expectedOutput: "13" },
      { input: "9\n12", expectedOutput: "15" }
    ],
    starterCode: "import math\na = float(input())\nb = float(input())\nc = math.sqrt(a**2 + b**2)\nprint(int(c))\n"
  },
  "prob-l1-stanford-seconds": {
    id: "prob-l1-stanford-seconds",
    title: "محول الثواني إلى دقائق وثواني (Stanford Seconds Converter)",
    level: 1,
    difficulty: "easy",
    points: 20,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["variables", "arithmetic", "division", "stanford_cs106a"],
    description: "مسألة ستانفورد لتحويل الوقت: استقبل عدداً صحيحاً total_seconds يمثل عدد الثواني الإجمالي. احسب عدد الدقائق والثواني المتبقية واطبع الناتج بالصيغة: f'{mins}m {secs}s'.",
    inputDescription: "سطر واحد يحتوي على عدد صحيح يمثل الثواني.",
    outputDescription: "اطبع بالصيغة: Xm Ys",
    examples: [
      { input: "125", output: "2m 5s", explanation: "125 ثانية تساوي دقيقتين و 5 ثوانٍ." },
      { input: "60", output: "1m 0s", explanation: "60 ثانية تساوي دقيقة واحدة بالضبط." }
    ],
    constraints: ["0 <= total_seconds <= 10^6"],
    publicTestCases: [
      { input: "125", expectedOutput: "2m 5s", description: "تحويل 125 ثانية" },
      { input: "60", expectedOutput: "1m 0s", description: "تحويل 60 ثانية" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0m 0s" },
      { input: "365", expectedOutput: "6m 5s" }
    ],
    starterCode: "s = int(input())\nmins = s // 60\nsecs = s % 60\nprint(f'{mins}m {secs}s')\n"
  },

  // LEVEL 2: EASY
  "prob-l2-max-three": {
    id: "prob-l2-max-three",
    title: "أكبر رقم بين ثلاثة أرقام (Max of Three)",
    level: 2,
    difficulty: "easy",
    points: 30,
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
    points: 30,
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
    points: 30,
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
    points: 30,
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
    points: 30,
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
  "prob-l2-stanford-sentinel": {
    id: "prob-l2-stanford-sentinel",
    title: "المتوسط الحسابي بالحارس (Stanford Sentinel Average)",
    level: 2,
    difficulty: "easy",
    points: 30,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["while_loops", "sentinel", "average", "stanford_cs106a"],
    description: "مسألة الحارس (Sentinel Loop) الشهيرة في جامعة ستانفورد: اقرأ أعداداً صحيحة في أسطر متتالية حتى يُدخل المستخدم العدد -1 (علامة التوقف). احسب المتوسط الحسابي للأرقام كعدد صحيح مقرب int(average) واطبعه. (إذا لم يدخل أرقاماً اطبع 0).",
    inputDescription: "أسطر متتالية تنتهي بـ -1.",
    outputDescription: "اطبع عدداً صحيحاً واحداً يمثل المتوسط الحسابي.",
    examples: [
      { input: "10\n20\n30\n-1", output: "20", explanation: "المتوسط الحسابي لـ (10 + 20 + 30) / 3 = 20." },
      { input: "5\n15\n-1", output: "10", explanation: "المتوسط الحسابي هو 10." }
    ],
    constraints: ["كل رقم >= 0 ما عدا -1"],
    publicTestCases: [
      { input: "10\n20\n30\n-1", expectedOutput: "20", description: "ثلاثة أرقام موجبة مع -1" },
      { input: "5\n15\n-1", expectedOutput: "10", description: "رقمين مع -1" }
    ],
    hiddenTestCases: [
      { input: "-1", expectedOutput: "0" },
      { input: "100\n-1", expectedOutput: "100" }
    ],
    starterCode: "nums = []\nwhile True:\n    try:\n        x = int(input())\n        if x == -1:\n            break\n        nums.append(x)\n    except:\n        break\nprint(sum(nums) // len(nums) if nums else 0)\n"
  },
  "prob-l2-stanford-fizzbuzz": {
    id: "prob-l2-stanford-fizzbuzz",
    title: "تحدي فيزبز المطور (Stanford Extended FizzBuzz)",
    level: 2,
    difficulty: "easy",
    points: 30,
    baseXp: 60,
    timeLimit: 3000,
    skills: ["loops", "conditions", "modulo", "stanford_cs106a"],
    description: "مسألة المقابلات الكلاسيكية في ستانفورد: استقبل عدداً صحيحاً n. اطبع في سطر واحد مفصولاً بمسافة الأعداد من 1 إلى n، مع استبدال مضاعفات 3 بـ 'Fizz'، ومضاعفات 5 بـ 'Buzz'، ومضاعفات 3 و 5 معاً بـ 'FizzBuzz'.",
    inputDescription: "سطر واحد يحتوي على العدد الصحيح n.",
    outputDescription: "اطبع المتتالية مفصولة بمسافة.",
    examples: [
      { input: "5", output: "1 2 Fizz 4 Buzz", explanation: "الأرقام من 1 إلى 5 مع استبدال 3 بـ Fizz و 5 بـ Buzz." }
    ],
    constraints: ["1 <= n <= 100"],
    publicTestCases: [
      { input: "5", expectedOutput: "1 2 Fizz 4 Buzz", description: "أول 5 أرقام" },
      { input: "15", expectedOutput: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz", description: "أول 15 رقماً حتى مضاعف 15 المشترك" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "3", expectedOutput: "1 2 Fizz" }
    ],
    starterCode: "n = int(input())\nres = []\nfor i in range(1, n + 1):\n    if i % 15 == 0:\n        res.append('FizzBuzz')\n    elif i % 3 == 0:\n        res.append('Fizz')\n    elif i % 5 == 0:\n        res.append('Buzz')\n    else:\n        res.append(str(i))\nprint(' '.join(res))\n"
  },

  // LEVEL 3: INTERMEDIATE
  "prob-l3-remove-duplicates": {
    id: "prob-l3-remove-duplicates",
    title: "إزالة التكرار مع الحفاظ على الترتيب (Remove Duplicates Preserving Order)",
    level: 3,
    difficulty: "medium",
    points: 80,
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
    points: 50,
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
    points: 50,
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
    points: 50,
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
    points: 50,
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
  "prob-l3-stanford-dna": {
    id: "prob-l3-stanford-dna",
    title: "النسخ التكميلي لسلاسل الحمض النووي (Stanford DNA Reverse Complement)",
    level: 3,
    difficulty: "medium",
    points: 50,
    baseXp: 90,
    timeLimit: 3000,
    skills: ["strings", "bioinformatics", "dictionaries", "stanford_cs106a"],
    description: "مسألة المعلوماتية الحيوية الكلاسيكية في جامعة ستانفورد: استقبل سلسلة DNA مكونة من الحروف A, T, C, G. اعكس السلسلة بالكامل واستبدل كل قاعدة بنظيرتها التكميلية (A <-> T و C <-> G) واطبع السلسلة الناتجة.",
    inputDescription: "سطر واحد يحتوي على سلسلة DNA.",
    outputDescription: "اطبع السلسلة المعكوسة والمكملة.",
    examples: [
      { input: "ATCG", output: "CGAT", explanation: "معكوس ATCG هو GCTA ومكمله التناظري هو CGAT." },
      { input: "AAAACCCGGT", output: "ACCGGGTTTT", explanation: "النسخ التكميلي المعكوس للسلسلة." }
    ],
    constraints: ["1 <= len(seq) <= 10^4"],
    publicTestCases: [
      { input: "ATCG", expectedOutput: "CGAT", description: "سلسلة أساسية ATCG" },
      { input: "AAAACCCGGT", expectedOutput: "ACCGGGTTTT", description: "سلسلة مكررة" }
    ],
    hiddenTestCases: [
      { input: "A", expectedOutput: "T" },
      { input: "C", expectedOutput: "G" }
    ],
    starterCode: "seq = input().strip().upper()\ncomp = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}\nprint(''.join(comp.get(b, b) for b in reversed(seq)))\n"
  },
  "prob-l3-stanford-clean-list": {
    id: "prob-l3-stanford-clean-list",
    title: "التقاطع المرتب لقائمتين (Stanford Sorted List Intersection)",
    level: 3,
    difficulty: "medium",
    points: 50,
    baseXp: 90,
    timeLimit: 3000,
    skills: ["lists", "sets", "sorting", "stanford_cs106a"],
    description: "مسألة القوائم الشهيرة في ستانفورد: السطر الأول يحتوي على القائمة الأولى مفصولة بمسافة، والسطر الثاني القائمة الثانية. استخرج العناصر المشتركة بين القائمتين واطبعها مرتبة تصاعدياً وبدون تكرار في سطر واحد مفصولة بمسافة.",
    inputDescription: "سطران: القائمة 1 والقائمة 2.",
    outputDescription: "اطبع الأرقام المشتركة مرتبة مفصولة بمسافة.",
    examples: [
      { input: "1 2 2 3 4\n2 2 4 6", output: "2 4", explanation: "الأرقام المشتركة بدون تكرار هي 2 و 4." }
    ],
    constraints: ["1 <= len(nums) <= 10^4"],
    publicTestCases: [
      { input: "1 2 2 3 4\n2 2 4 6", expectedOutput: "2 4", description: "تقاطع قائمتين بأرقام مكررة" },
      { input: "5 10 15\n10 20 30", expectedOutput: "10", description: "عنصر مشترك واحد" }
    ],
    hiddenTestCases: [
      { input: "1 2 3\n4 5 6", expectedOutput: "" },
      { input: "7 8 9\n9 8 7", expectedOutput: "7 8 9" }
    ],
    starterCode: "l1 = set(map(int, input().split()))\nl2 = set(map(int, input().split()))\ncommon = sorted(l1.intersection(l2))\nprint(' '.join(map(str, common)))\n"
  },

  // LEVEL 4: ADVANCED
  "prob-l4-binary-search": {
    id: "prob-l4-binary-search",
    title: "البحث الثنائي الفعال (Binary Search)",
    level: 4,
    difficulty: "hard",
    points: 80,
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
    points: 80,
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
    points: 80,
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
    points: 80,
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
    points: 80,
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
  "prob-l4-stanford-pascal": {
    id: "prob-l4-stanford-pascal",
    title: "مثلث باسكال التوليدي (Stanford Pascal Triangle Row)",
    level: 4,
    difficulty: "hard",
    points: 80,
    baseXp: 120,
    timeLimit: 2000,
    skills: ["combinatorics", "recursion", "dynamic_programming", "stanford_cs106a"],
    description: "مسألة الرياضيات التوافقية الشهيرة في ستانفورد: استقبل رقماً صحيحاً n (حيث n يبدأ من 0). قم بحساب وطباعة أرقام الصف رقم n في مثلث باسكال مفصولة بمسافة في سطر واحد.",
    inputDescription: "سطر واحد يحتوي على العدد الصحيح n.",
    outputDescription: "اطبع أرقام الصف مفصولة بمسافة.",
    examples: [
      { input: "3", output: "1 3 3 1", explanation: "الصف الثالث في مثلث باسكال هو 1 3 3 1." },
      { input: "4", output: "1 4 6 4 1", explanation: "الصف الرابع هو 1 4 6 4 1." }
    ],
    constraints: ["0 <= n <= 30"],
    publicTestCases: [
      { input: "3", expectedOutput: "1 3 3 1", description: "الصف رقم 3" },
      { input: "4", expectedOutput: "1 4 6 4 1", description: "الصف رقم 4" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "1" },
      { input: "1", expectedOutput: "1 1" }
    ],
    starterCode: "n = int(input())\nrow = [1]\nfor _ in range(n):\n    row = [1] + [row[i] + row[i + 1] for i in range(len(row) - 1)] + [1]\nprint(' '.join(map(str, row)))\n"
  },
  "prob-l4-stanford-subsets": {
    id: "prob-l4-stanford-subsets",
    title: "توليد المجموعات الجزئية (Stanford Subsets Count)",
    level: 4,
    difficulty: "hard",
    points: 80,
    baseXp: 120,
    timeLimit: 2000,
    skills: ["math", "powers", "combinatorics", "stanford_cs106a"],
    description: "مسألة التوليد الرياضي في ستانفورد: استقبل عدداً صحيحاً n يمثل عدد العناصر الفريدة. اطبع إجمالي عدد المجموعات الجزئية (Power Set Size) المحسوبة بالعلاقة 2^n.",
    inputDescription: "سطر واحد يحتوي على العدد الصحيح n.",
    outputDescription: "اطبع عدداً صحيحاً يمثل 2^n.",
    examples: [
      { input: "3", output: "8", explanation: "2^3 = 8 مجموعات جزئية." },
      { input: "5", output: "32", explanation: "2^5 = 32 مجموعة جزئية." }
    ],
    constraints: ["0 <= n <= 60"],
    publicTestCases: [
      { input: "3", expectedOutput: "8", description: "مجموعة من 3 عناصر" },
      { input: "5", expectedOutput: "32", description: "مجموعة من 5 عناصر" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "1" },
      { input: "10", expectedOutput: "1024" }
    ],
    starterCode: "n = int(input())\nprint(2 ** n)\n"
  },

  // LEVEL 5: CHALLENGE / EXPERT
  "prob-l5-two-sum-linear": {
    id: "prob-l5-two-sum-linear",
    title: "تحدي مجموع الزوجين بالزمن الخطي O(N)",
    level: 5,
    difficulty: "expert",
    points: 150,
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
    points: 150,
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
    points: 150,
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
    points: 150,
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
    points: 150,
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
  },
  "prob-l5-stanford-matrix-spiral": {
    id: "prob-l5-stanford-matrix-spiral",
    title: "مصفوفة الحلزون الرياضية (Stanford Spiral Matrix Walk)",
    level: 5,
    difficulty: "expert",
    points: 150,
    baseXp: 250,
    timeLimit: 2500,
    skills: ["matrix", "simulation", "algorithms", "stanford_cs106a"],
    description: "مسألة جامعة ستانفورد الكلاسيكية في الخوارزميات المتقدمة: السطر الأول يحتوي على عدد الصفوف r والأعمدة c. يليه r أسطر تمثل عناصر المصفوفة. اطبع عناصر المصفوفة بالكامل بالترتيب الحلزوني (Spiral Order) باتجاه عقارب الساعة في سطر واحد مفصولة بمسافة.",
    inputDescription: "السطر 1: r c\nالأسطر التالية: عناصر المصفوفة",
    outputDescription: "اطبع العناصر مفصولة بمسافة.",
    examples: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", output: "1 2 3 6 9 8 7 4 5", explanation: "المسار الحلزوني لمصفوفة 3x3." },
      { input: "2 2\n1 2\n3 4", output: "1 2 4 3", explanation: "المسار الحلزوني لمصفوفة 2x2." }
    ],
    constraints: ["1 <= r, c <= 50"],
    publicTestCases: [
      { input: "3 3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 2 3 6 9 8 7 4 5", description: "مصفوفة مربعة 3x3" },
      { input: "2 2\n1 2\n3 4", expectedOutput: "1 2 4 3", description: "مصفوفة مربعة 2x2" }
    ],
    hiddenTestCases: [
      { input: "1 3\n10 20 30", expectedOutput: "10 20 30" },
      { input: "3 1\n5\n6\n7", expectedOutput: "5 6 7" }
    ],
    starterCode: "r, c = map(int, input().split())\nmat = [list(map(int, input().split())) for _ in range(r)]\nres = []\ntop, bottom, left, right = 0, r - 1, 0, c - 1\nwhile top <= bottom and left <= right:\n    for j in range(left, right + 1):\n        res.append(mat[top][j])\n    top += 1\n    for i in range(top, bottom + 1):\n        res.append(mat[i][right])\n    right -= 1\n    if top <= bottom:\n        for j in range(right, left - 1, -1):\n            res.append(mat[bottom][j])\n        bottom -= 1\n    if left <= right:\n        for i in range(bottom, top - 1, -1):\n            res.append(mat[i][left])\n        left += 1\nprint(' '.join(map(str, res)))\n"
  },
  "prob-l5-stanford-median": {
    id: "prob-l5-stanford-median",
    title: "الوسيط لقائمتين مرتبتين (Stanford Median of Two Sorted Lists)",
    level: 5,
    difficulty: "expert",
    points: 150,
    baseXp: 250,
    timeLimit: 2500,
    skills: ["binary_search", "divide_and_conquer", "median", "stanford_cs106a"],
    description: "مسألة الخوارزميات المتقدمة لجامعة ستانفورد: السطر الأول يحتوي على القائمة المرتبة nums1، والسطر الثاني القائمة المرتبة nums2. احسب الوسيط الحسابي (Median) لكافة العناصر بعد دمجها واطبع الوسيط بصيغة عدد عشري بدقة منزلة واحدة (مثال: 2.0 أو 2.5).",
    inputDescription: "سطران: القائمة 1 والقائمة 2.",
    outputDescription: "اطبع الوسيط الحسابي بصيغة عدد عشري.",
    examples: [
      { input: "1 3\n2", output: "2.0", explanation: "العناصر المدمجة [1, 2, 3] والوسيط هو 2.0." },
      { input: "1 2\n3 4", output: "2.5", explanation: "العناصر المدمجة [1, 2, 3, 4] والوسيط هو (2 + 3) / 2 = 2.5." }
    ],
    constraints: ["1 <= len(nums1) + len(nums2) <= 10^5"],
    publicTestCases: [
      { input: "1 3\n2", expectedOutput: "2.0", description: "مجموع فردي للعناصر" },
      { input: "1 2\n3 4", expectedOutput: "2.5", description: "مجموع زوجي للعناصر" }
    ],
    hiddenTestCases: [
      { input: "0 0\n0 0", expectedOutput: "0.0" },
      { input: "1\n", expectedOutput: "1.0" }
    ],
    starterCode: "line1 = input().strip()\nline2 = input().strip()\nl1 = list(map(int, line1.split())) if line1 else []\nl2 = list(map(int, line2.split())) if line2 else []\nmerged = sorted(l1 + l2)\nn = len(merged)\nif n % 2 == 1:\n    ans = float(merged[n // 2])\nelse:\n    ans = (merged[n // 2 - 1] + merged[n // 2]) / 2.0\nprint(f'{ans:.1f}')\n"
  },
  // ==========================================
  // LEVEL 1: MATH, IQ & REAL-WORLD CHALLENGES
  // ==========================================
  "prob-l1-math-circle-metrics": {
    id: "prob-l1-math-circle-metrics",
    title: "📐 مسألة رياضيات: مساحة ومحيط الدائرة (Circle Metrics)",
    level: 1,
    difficulty: "easy",
    points: 20,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["math", "geometry", "variables", "arithmetic"],
    description: "اكتب برنامجاً بلغة بايثون يستقبل نصف قطر الدائرة r (عدد صحيح) ويحسب مساحة الدائرة ومحيطها بالاعتماد على الثابت التقريبي pi = 3.14159. اطبع الناتج في سطر واحد بالصيغة: 'Area: X.XX, Circumference: Y.YY' مقرباً لأقرب رقمين عشريين.",
    inputDescription: "سطر واحد يحتوي على العدد الصحيح r (نصف القطر).",
    outputDescription: "اطبع بالصيغة المحددة: Area: {area:.2f}, Circumference: {circ:.2f}",
    examples: [
      { input: "7", output: "Area: 153.94, Circumference: 43.98", explanation: "pi * 7^2 = 153.93791 -> 153.94 و 2 * pi * 7 = 43.98226 -> 43.98" },
      { input: "10", output: "Area: 314.16, Circumference: 62.83", explanation: "pi * 100 = 314.159 -> 314.16" }
    ],
    constraints: ["1 <= r <= 1000"],
    publicTestCases: [
      { input: "7", expectedOutput: "Area: 153.94, Circumference: 43.98", description: "حساب مساحة ومحيط دائرة نصف قطرها 7" },
      { input: "10", expectedOutput: "Area: 314.16, Circumference: 62.83", description: "حساب دائرة نصف قطرها 10" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "Area: 3.14, Circumference: 6.28" },
      { input: "15", expectedOutput: "Area: 706.86, Circumference: 94.25" }
    ],
    starterCode: "# احسب مساحة ومحيط الدائرة\nr = int(input())\npi = 3.14159\narea = pi * (r ** 2)\ncirc = 2 * pi * r\nprint(f'Area: {area:.2f}, Circumference: {circ:.2f}')\n"
  },

  "prob-l1-iq-digit-sum": {
    id: "prob-l1-iq-digit-sum",
    title: "🧩 مسألة ذكاء: مجموع خانات الرقم وسر التناغم (Sum of Digits)",
    level: 1,
    difficulty: "easy",
    points: 20,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["iq", "logic", "strings", "arithmetic"],
    description: "مسألة ذكاء ونمط رياضي لاختبار قدرة التفكير السريع: اكتب برنامجاً يستقبل عدداً صحيحاً موجباً n ويحسب مجموع أرقام خاناته (Digits Sum). مثلاً إذا كان العدد 942، فإن الناتج هو 9 + 4 + 2 = 15.",
    inputDescription: "سطر واحد يحتوي على العدد الصحيح n.",
    outputDescription: "اطبع عدداً صحيحاً واحداً يمثل مجموع الخانات.",
    examples: [
      { input: "942", output: "15", explanation: "9 + 4 + 2 = 15" },
      { input: "105", output: "6", explanation: "1 + 0 + 5 = 6" }
    ],
    constraints: ["1 <= n <= 10^9"],
    publicTestCases: [
      { input: "942", expectedOutput: "15", description: "مجموع خانات 942" },
      { input: "105", expectedOutput: "6", description: "مجموع خانات 105" }
    ],
    hiddenTestCases: [
      { input: "7", expectedOutput: "7" },
      { input: "9999", expectedOutput: "36" },
      { input: "100000", expectedOutput: "1" }
    ],
    starterCode: "# احسب مجموع خانات العدد المدخل\ns = input().strip()\ntotal = sum(int(d) for d in s)\nprint(total)\n"
  },

  "prob-l1-real-parking-fee": {
    id: "prob-l1-real-parking-fee",
    title: "💼 مشكلة برمجية واقعية: حاسبة رسوم ساحة الانتظار الذكية (Smart Parking Fee Calculator)",
    level: 1,
    difficulty: "easy",
    points: 20,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["real_world", "conditions", "arithmetic"],
    description: "في مواقف السيارات الذكية بالمولات: الساعة الأولى دائماً تكلفتها 10 جنيهات. كل ساعة إضافية تكلفتها 5 جنيهات. وإذا تجاوزت فترة الانتظار 5 ساعات بالكامل، يُمنح العميل خصماً تشجيعياً قدره 10 جنيهات على الإجمالي النهائي. اكتب برنامجاً يستقبل عدد الساعات الصحيح h ويطبع: 'Total Fee: X EGP'.",
    inputDescription: "عدد الساعات الصحيح h (h >= 1).",
    outputDescription: "اطبع: Total Fee: {fee} EGP",
    examples: [
      { input: "3", output: "Total Fee: 20 EGP", explanation: "الساعة الأولى 10 + ساعتان إضافيتان (2*5=10) = 20 جنيه" },
      { input: "6", output: "Total Fee: 25 EGP", explanation: "الأولى 10 + 5 ساعات (25) = 35 - 10 خصم = 25 جنيه" }
    ],
    constraints: ["1 <= h <= 24"],
    publicTestCases: [
      { input: "3", expectedOutput: "Total Fee: 20 EGP", description: "حساب رسوم 3 ساعات" },
      { input: "6", expectedOutput: "Total Fee: 25 EGP", description: "حساب رسوم 6 ساعات وتطبيق الخصم" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "Total Fee: 10 EGP" },
      { input: "5", expectedOutput: "Total Fee: 30 EGP" },
      { input: "8", expectedOutput: "Total Fee: 35 EGP" }
    ],
    starterCode: "# احسب رسوم ساحة الانتظار الذكية\nh = int(input())\nfee = 10 + (h - 1) * 5\nif h > 5:\n    fee -= 10\nprint(f'Total Fee: {fee} EGP')\n"
  },

  // ==========================================
  // LEVEL 2: MATH, IQ & REAL-WORLD CHALLENGES
  // ==========================================
  "prob-l2-math-gcd": {
    id: "prob-l2-math-gcd",
    title: "📐 مسألة رياضيات: القاسم المشترك الأكبر (GCD - Euclidean Algorithm)",
    level: 2,
    difficulty: "easy",
    points: 30,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["math", "loops", "euclidean"],
    description: "اكتب برنامجاً بلغة بايثون يستقبل عددين صحيحين موجبين a و b في سطرين مستقلين، ويحسب القاسم المشترك الأكبر (GCD) لهما باستخدام حلقة التكرار أو خوارزمية إقليدس الشهيرة، ثم اطبع الناتج.",
    inputDescription: "سطران: السطر الأول العدد a، والسطر الثاني العدد b.",
    outputDescription: "اطبع القاسم المشترك الأكبر كعدد صحيح فردي.",
    examples: [
      { input: "48\n18", output: "6", explanation: "القاسم المشترك الأكبر لـ 48 و 18 هو 6" },
      { input: "100\n25", output: "25", explanation: "القاسم المشترك الأكبر هو 25" }
    ],
    constraints: ["1 <= a, b <= 10^9"],
    publicTestCases: [
      { input: "48\n18", expectedOutput: "6", description: "حساب GCD للعددين 48 و 18" },
      { input: "100\n25", expectedOutput: "25", description: "حساب GCD للعددين 100 و 25" }
    ],
    hiddenTestCases: [
      { input: "17\n19", expectedOutput: "1" },
      { input: "54\n24", expectedOutput: "6" },
      { input: "270\n192", expectedOutput: "6" }
    ],
    starterCode: "import math\na = int(input())\nb = int(input())\nprint(math.gcd(a, b))\n"
  },

  "prob-l2-iq-missing-number": {
    id: "prob-l2-iq-missing-number",
    title: "🧩 مسألة ذكاء: الرقم المفقود في متسلسلة الأعداد (Missing Number in Series)",
    level: 2,
    difficulty: "easy",
    points: 30,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["iq", "logic", "arrays", "math"],
    description: "لغز ذكاء كلاسيكي: لديك متسلسلة تحتوي على جميع الأعداد الصحيحة من 1 إلى n باستثناء رقم واحد مفقود. استقبل n في السطر الأول، ثم قائمة الأعداد المتبقية في السطر الثاني مفصولة بمسافات. حدد الرقم المفقود فوراً واطبعه.",
    inputDescription: "السطر الأول: العدد الصحيح n. السطر الثاني: n-1 أعداد صحيحة مفصولة بمسافات.",
    outputDescription: "اطبع العدد المفقود فقط.",
    examples: [
      { input: "5\n1 2 4 5", output: "3", explanation: "الرقم 3 هو الرقم الوحيد الناقص من 1 إلى 5" },
      { input: "4\n2 3 4", output: "1", explanation: "الرقم 1 هو المفقود" }
    ],
    constraints: ["2 <= n <= 10^5"],
    publicTestCases: [
      { input: "5\n1 2 4 5", expectedOutput: "3", description: "العثور على الرقم الناقص 3" },
      { input: "4\n2 3 4", expectedOutput: "1", description: "العثور على الرقم الناقص 1" }
    ],
    hiddenTestCases: [
      { input: "6\n1 2 3 4 5", expectedOutput: "6" },
      { input: "10\n1 2 3 4 5 6 7 8 10", expectedOutput: "9" }
    ],
    starterCode: "# حدد الرقم المفقود عبر مجموع المتسلسلة n*(n+1)//2\nn = int(input())\nnums = list(map(int, input().split()))\nexpected = n * (n + 1) // 2\nactual = sum(nums)\nprint(expected - actual)\n"
  },

  "prob-l2-real-tiered-discount": {
    id: "prob-l2-real-tiered-discount",
    title: "💼 مشكلة برمجية واقعية: محرك فواتير المتجر الإلكتروني (E-Commerce Tiered Discount Engine)",
    level: 2,
    difficulty: "easy",
    points: 30,
    baseXp: 50,
    timeLimit: 3000,
    skills: ["real_world", "lists", "conditions", "arithmetic"],
    description: "في منصة تجارة إلكترونية، يستقبل البرنامج أسعار السلع في سلة العميل في سطر واحد مفصولة بمسافات. يحسب الإجمالي الفرعي (Subtotal): إذا كان أقل من 200 جنيه فلا يوجد خصم وتكلفة الشحن 30 جنيهاً. إذا كان من 200 إلى أقل من 500 يمنح خصم 10% وتكلفة الشحن 15 جنيهاً. إذا كان 500 فأكثر يمنح خصم 20% والشحن مجاني (0 جنيه). اطبع النتيجة: 'Subtotal: S, Discount: D, Final: F'.",
    inputDescription: "سطر واحد يحتوي على أسعار السلع كأعداد صحيحة مفصولة بمسافات.",
    outputDescription: "اطبع: Subtotal: {subtotal}, Discount: {discount:.1f}, Final: {final:.1f}",
    examples: [
      { input: "50 70 60", output: "Subtotal: 180, Discount: 0.0, Final: 210.0", explanation: "الإجمالي 180 < 200، الخصم 0 والشحن 30 -> النهائي 210.0" },
      { input: "200 150", output: "Subtotal: 350, Discount: 35.0, Final: 330.0", explanation: "الإجمالي 350، الخصم 10% (35.0) والشحن 15 -> النهائي 330.0" }
    ],
    constraints: ["أسعار السلع أعداد صحيحة موجبة"],
    publicTestCases: [
      { input: "50 70 60", expectedOutput: "Subtotal: 180, Discount: 0.0, Final: 210.0", description: "شريحة أقل من 200" },
      { input: "200 150", expectedOutput: "Subtotal: 350, Discount: 35.0, Final: 330.0", description: "شريحة الخصم 10%" }
    ],
    hiddenTestCases: [
      { input: "600", expectedOutput: "Subtotal: 600, Discount: 120.0, Final: 480.0" },
      { input: "100 100", expectedOutput: "Subtotal: 200, Discount: 20.0, Final: 195.0" }
    ],
    starterCode: "# محرك فواتير المتجر الإلكتروني\nprices = list(map(int, input().split()))\nsubtotal = sum(prices)\nif subtotal < 200:\n    disc = 0.0\n    ship = 30\nelif subtotal < 500:\n    disc = subtotal * 0.10\n    ship = 15\nelse:\n    disc = subtotal * 0.20\n    ship = 0\nfinal = subtotal - disc + ship\nprint(f'Subtotal: {subtotal}, Discount: {disc:.1f}, Final: {final:.1f}')\n"
  },

  // ==========================================
  // LEVEL 3: MATH, IQ & REAL-WORLD CHALLENGES
  // ==========================================
  "prob-l3-math-prime-factors": {
    id: "prob-l3-math-prime-factors",
    title: "📐 مسألة رياضيات: التحليل إلى العوامل الأولية (Prime Factorization)",
    level: 3,
    difficulty: "medium",
    points: 50,
    baseXp: 75,
    timeLimit: 3000,
    skills: ["math", "algorithms", "factorization"],
    description: "اكتب برنامجاً بلغة بايثون يستقبل عدداً صحيحاً n >= 2، ويقوم بتحليله إلى عوامله الأولية بالكامل، ثم اطبع هذه العوامل مرتبة تصاعدياً ومفصولة بمسافات.",
    inputDescription: "سطر واحد يحتوي على العدد الصحيح n.",
    outputDescription: "اطبع العوامل الأولية مفصولة بمسافات.",
    examples: [
      { input: "60", output: "2 2 3 5", explanation: "60 = 2 * 2 * 3 * 5" },
      { input: "84", output: "2 2 3 7", explanation: "84 = 2 * 2 * 3 * 7" }
    ],
    constraints: ["2 <= n <= 10^7"],
    publicTestCases: [
      { input: "60", expectedOutput: "2 2 3 5", description: "تحليل العدد 60" },
      { input: "84", expectedOutput: "2 2 3 7", description: "تحليل العدد 84" }
    ],
    hiddenTestCases: [
      { input: "13", expectedOutput: "13" },
      { input: "100", expectedOutput: "2 2 5 5" },
      { input: "315", expectedOutput: "3 3 5 7" }
    ],
    starterCode: "# تحليل العدد إلى عوامله الأولية\nn = int(input())\nfactors = []\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        factors.append(d)\n        n //= d\n    d += 1\nif n > 1:\n    factors.append(n)\nprint(' '.join(map(str, factors)))\n"
  },

  "prob-l3-iq-matrix-diagonal-difference": {
    id: "prob-l3-iq-matrix-diagonal-difference",
    title: "🧩 مسألة ذكاء: فارق قطري المصفوفة المربعة (Diagonal Absolute Difference)",
    level: 3,
    difficulty: "medium",
    points: 50,
    baseXp: 75,
    timeLimit: 3000,
    skills: ["iq", "logic", "matrices", "math"],
    description: "تحدي ذكاء وتحليل هندسي: لديك مصفوفة مربعة بأبعاد n x n. المطلوب حساب القيمة المطلقة للفارق بين مجموع عناصر القطر الرئيسي ومجموع عناصر القطر الثانوي: |sum(primary) - sum(secondary)|.",
    inputDescription: "السطر الأول: العدد الصحيح n. تليها n أسطر، كل سطر يحتوي على n أعداد صحيحة تمثل صفوف المصفوفة.",
    outputDescription: "اطبع القيمة المطلقة للفارق كعدد صحيح فردي.",
    examples: [
      { input: "3\n11 2 4\n4 5 6\n10 8 -12", output: "15", explanation: "الرئيسي: 11 + 5 + (-12) = 4. الثانوي: 4 + 5 + 10 = 19. الفارق: |4 - 19| = 15" },
      { input: "2\n1 2\n3 4", output: "0", explanation: "الرئيسي: 1 + 4 = 5. الثانوي: 2 + 3 = 5. |5 - 5| = 0" }
    ],
    constraints: ["1 <= n <= 100", "-1000 <= element <= 1000"],
    publicTestCases: [
      { input: "3\n11 2 4\n4 5 6\n10 8 -12", expectedOutput: "15", description: "فارق قطري مصفوفة 3x3" },
      { input: "2\n1 2\n3 4", expectedOutput: "0", description: "فارق قطري مصفوفة 2x2" }
    ],
    hiddenTestCases: [
      { input: "3\n1 2 3\n4 5 6\n9 8 9", expectedOutput: "2" },
      { input: "1\n42", expectedOutput: "0" }
    ],
    starterCode: "# احسب الفارق المطلق بين قطري المصفوفة\nn = int(input())\nmat = [list(map(int, input().split())) for _ in range(n)]\nprimary = sum(mat[i][i] for i in range(n))\nsecondary = sum(mat[i][n - 1 - i] for i in range(n))\nprint(abs(primary - secondary))\n"
  },

  "prob-l3-real-word-frequency": {
    id: "prob-l3-real-word-frequency",
    title: "💼 مشكلة برمجية واقعية: محلل الكلمات الدلالية ومحرك البحث (Keyword Search Indexer)",
    level: 3,
    difficulty: "medium",
    points: 50,
    baseXp: 75,
    timeLimit: 3000,
    skills: ["real_world", "dictionaries", "strings", "sorting"],
    description: "في محركات البحث وتحليل البيانات الضخمة، يُطلب استخراج أهم الكلمات الأكثر تكراراً بعد استبعاد كلمات التوقف (Stop Words). يستقبل البرنامج فقرة نصية في السطر الأول، وقائمة كلمات التوقف في السطر الثاني (مفصولة بمسافات). المطلوب استخراج أكثر كلمتين تكراراً (مع الترتيب التنازلي للتكرار، ثم الأبجدي في حالة التساوي) وطباعتهما بالصيغة: 'word1: count1, word2: count2'.",
    inputDescription: "السطر الأول: نص المقال. السطر الثاني: كلمات التوقف المستبعدة مفصولة بمسافات.",
    outputDescription: "اطبع السطر بالصيغة: {w1}: {c1}, {w2}: {c2}",
    examples: [
      { input: "python is great and python is fast and powerful\nis and", output: "python: 2, fast: 1", explanation: "بعد حذف is و and، الكلمات المتبقية: python(2) ثم fast(1) ترتيباً أبجدياً" },
      { input: "data data science data code code test\ntest", output: "data: 3, code: 2", explanation: "data تكررت 3 مرات و code تكررت مرتين" }
    ],
    constraints: ["الكلمات تتكون من حروف صغيرة"],
    publicTestCases: [
      { input: "python is great and python is fast and powerful\nis and", expectedOutput: "python: 2, fast: 1", description: "استخراج الكلمات الأكثر تكراراً" },
      { input: "data data science data code code test\ntest", expectedOutput: "data: 3, code: 2", description: "ترتيب الكلمات الأكثر تكراراً" }
    ],
    hiddenTestCases: [
      { input: "a b c a b a\nx y", expectedOutput: "a: 3, b: 2" },
      { input: "apple banana apple orange apple banana\npear", expectedOutput: "apple: 3, banana: 2" }
    ],
    starterCode: "# فهرسة وتحليل تكرار الكلمات الدلالية\ntext = input().split()\nstop_words = set(input().split())\ncounts = {}\nfor w in text:\n    if w not in stop_words:\n        counts[w] = counts.get(w, 0) + 1\nsorted_words = sorted(counts.items(), key=lambda x: (-x[1], x[0]))\nw1, c1 = sorted_words[0]\nw2, c2 = sorted_words[1]\nprint(f'{w1}: {c1}, {w2}: {c2}')\n"
  },

  // ==========================================
  // LEVEL 4: MATH, IQ & REAL-WORLD CHALLENGES
  // ==========================================
  "prob-l4-math-collatz-conjecture": {
    id: "prob-l4-math-collatz-conjecture",
    title: "📐 مسألة رياضيات: متتالية كولاتز الأطول وعدد الخطوات (Collatz Conjecture Steps)",
    level: 4,
    difficulty: "hard",
    points: 80,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["math", "recursion", "loops", "number_theory"],
    description: "حدسية كولاتز (معضلة 3n + 1 الشهيرة): لأي عدد صحيح موجب n، إذا كان زوجياً يقسم على 2، وإذا كان فردياً يضرب في 3 ويضاف إليه 1، وتكرر العملية حتى يصل إلى 1. اكتب برنامجاً يحسب عدد الخطوات للوصول إلى 1 وأقصى قيمة وصل إليها الرقم أثناء المتتالية، ثم اطبع: 'Steps: S, Max: M'.",
    inputDescription: "سطر واحد يحتوي على العدد الصحيح n.",
    outputDescription: "اطبع: Steps: {steps}, Max: {max_val}",
    examples: [
      { input: "6", output: "Steps: 8, Max: 16", explanation: "6->3->10->5->16->8->4->2->1 استغرقت 8 خطوات وأقصى قيمة هي 16" },
      { input: "11", output: "Steps: 14, Max: 52", explanation: "11 استغرقت 14 خطوة وأقصى قيمة بلغت 52" }
    ],
    constraints: ["1 <= n <= 10^5"],
    publicTestCases: [
      { input: "6", expectedOutput: "Steps: 8, Max: 16", description: "متتالية كولاتز للعدد 6" },
      { input: "11", expectedOutput: "Steps: 14, Max: 52", description: "متتالية كولاتز للعدد 11" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "Steps: 0, Max: 1" },
      { input: "7", expectedOutput: "Steps: 16, Max: 52" },
      { input: "27", expectedOutput: "Steps: 111, Max: 9232" }
    ],
    starterCode: "# متتالية كولاتز وحساب الخطوات والذروة\nn = int(input())\nsteps = 0\nmax_val = n\nwhile n != 1:\n    if n % 2 == 0:\n        n //= 2\n    else:\n        n = 3 * n + 1\n    steps += 1\n    if n > max_val:\n        max_val = n\nprint(f'Steps: {steps}, Max: {max_val}')\n"
  },

  "prob-l4-iq-tower-of-hanoi": {
    id: "prob-l4-iq-tower-of-hanoi",
    title: "🧩 مسألة ذكاء: لغز أبراج هانوي والتفكير العودي (Tower of Hanoi Move Counter)",
    level: 4,
    difficulty: "hard",
    points: 80,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["iq", "logic", "recursion", "divide_and_conquer"],
    description: "لغز الذكاء الرياضي التاريخي 'أبراج هانوي': لديك 3 أعمدة (A و B و C) و n أقراص مرتبة على العمود A. المطلوب نقلها إلى العمود C باستخدام B كعمود مساعد دون وضع قرص أكبر فوق قرص أصغر. استقبل n، واطبع في السطر الأول إجمالي عدد الحركات الأقل (2^n - 1)، متبوعة بخطوات التحريك بالصيغة 'from -> to' في كل سطر.",
    inputDescription: "العدد الصحيح n (عدد الأقراص).",
    outputDescription: "السطر الأول: Total Moves: {moves}. ثم خطوات التحريك كل خطوة في سطر.",
    examples: [
      { input: "2", output: "Total Moves: 3\nA -> B\nA -> C\nB -> C", explanation: "أقل عدد حركات هو 3 حركات" },
      { input: "3", output: "Total Moves: 7\nA -> C\nA -> B\nC -> B\nA -> C\nB -> A\nB -> C\nA -> C", explanation: "7 حركات لنقل 3 أقراص" }
    ],
    constraints: ["1 <= n <= 4"],
    publicTestCases: [
      { input: "2", expectedOutput: "Total Moves: 3\nA -> B\nA -> C\nB -> C", description: "حل أبراج هانوي لقرصين" },
      { input: "3", expectedOutput: "Total Moves: 7\nA -> C\nA -> B\nC -> B\nA -> C\nB -> A\nB -> C\nA -> C", description: "حل أبراج هانوي لثلاثة أقراص" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "Total Moves: 1\nA -> C" },
      { input: "4", expectedOutput: "Total Moves: 15\nA -> B\nA -> C\nB -> C\nA -> B\nC -> A\nC -> B\nA -> B\nA -> C\nB -> C\nB -> A\nC -> A\nB -> C\nA -> B\nA -> C\nB -> C" }
    ],
    starterCode: "# حل أبراج هانوي عودياً\ndef hanoi(n, src, dst, aux, moves):\n    if n == 1:\n        moves.append(f'{src} -> {dst}')\n        return\n    hanoi(n - 1, src, aux, dst, moves)\n    moves.append(f'{src} -> {dst}')\n    hanoi(n - 1, aux, dst, src, moves)\n\nn = int(input())\nmoves = []\nhanoi(n, 'A', 'C', 'B', moves)\nprint(f'Total Moves: {len(moves)}')\nfor m in moves:\n    print(m)\n"
  },

  "prob-l4-real-rate-limiter": {
    id: "prob-l4-real-rate-limiter",
    title: "💼 مشكلة برمجية واقعية: محاكي حماية الخوادم والحد من الطلبات (Sliding Window Rate Limiter)",
    level: 4,
    difficulty: "hard",
    points: 80,
    baseXp: 100,
    timeLimit: 3000,
    skills: ["real_world", "sliding_window", "queues", "algorithms"],
    description: "في هندسة البرمجيات السحابية، تحمي منظومات Rate Limiter الخوادم من الضغط الزائد. الخوارزمية تسمح بحد أقصى K طلبات خلال نافذة زمنية مدتها W ثانية. لكل طلب قادم في وقت t، يتم فحص الطلبات السابقة المقبولة التي وقعت في الفترة [t - W + 1, t]: إذا كان عددها أقل من K يُقبل الطلب (ALLOWED)، وإذا كان K فأكثر يُرفض (BLOCKED). استقبل K و W في السطر الأول، وتوقيتات الطلبات في السطر الثاني مفصولة بمسافات، واطبع نتيجة كل طلب مفصولة بمسافات.",
    inputDescription: "السطر الأول: K و W. السطر الثاني: قائمة التوقيتات كأعداد صحيحة مرتبة تصاعدياً.",
    outputDescription: "اطبع قائمة الحالات (ALLOWED أو BLOCKED) مفصولة بمسافات.",
    examples: [
      { input: "3 10\n1 2 5 10 11", output: "ALLOWED ALLOWED ALLOWED BLOCKED ALLOWED", explanation: "عند 10 توجد 3 طلبات سابقة في نافذة 10 ثوان فيتم حجبه، وعند 11 يخرج الطلب 1 من النافذة فيسمح به" },
      { input: "2 5\n1 2 3 7", output: "ALLOWED ALLOWED BLOCKED ALLOWED", explanation: "الطلب 3 محجوب لأن 1 و 2 استهلكا الحد الأقصى 2 في النافذة" }
    ],
    constraints: ["1 <= K <= 100", "1 <= W <= 1000"],
    publicTestCases: [
      { input: "3 10\n1 2 5 10 11", expectedOutput: "ALLOWED ALLOWED ALLOWED BLOCKED ALLOWED", description: "محاكاة Rate Limiter لنافذة 10 ثوان وحد 3 طلبات" },
      { input: "2 5\n1 2 3 7", expectedOutput: "ALLOWED ALLOWED BLOCKED ALLOWED", description: "محاكاة Rate Limiter لنافذة 5 ثوان وحد طلبين" }
    ],
    hiddenTestCases: [
      { input: "1 5\n1 2 6 7", expectedOutput: "ALLOWED BLOCKED ALLOWED BLOCKED" },
      { input: "3 10\n1 2 3 4", expectedOutput: "ALLOWED ALLOWED ALLOWED BLOCKED" }
    ],
    starterCode: "# محاكي Rate Limiter بالنافذة المنزلقة\nK, W = map(int, input().split())\ntimestamps = list(map(int, input().split()))\nallowed_times = []\nresults = []\nfor t in timestamps:\n    # تصفية الطلبات المقبولة خارج النافذة [t - W + 1, t]\n    allowed_times = [at for at in allowed_times if at >= t - W + 1]\n    if len(allowed_times) < K:\n        results.append('ALLOWED')\n        allowed_times.append(t)\n    else:\n        results.append('BLOCKED')\nprint(' '.join(results))\n"
  },

  // ==========================================
  // LEVEL 5: MATH, IQ & REAL-WORLD CHALLENGES
  // ==========================================
  "prob-l5-math-matrix-determinant": {
    id: "prob-l5-math-matrix-determinant",
    title: "📐 مسألة رياضيات: محدد المصفوفات المربعة وحساب كرامر (Matrix Determinant Engine)",
    level: 5,
    difficulty: "hard",
    points: 150,
    baseXp: 150,
    timeLimit: 3000,
    skills: ["math", "linear_algebra", "recursion", "matrices"],
    description: "في الجبر الخطي والرسوميات الحاسوبية، محدد المصفوفة (Determinant) له أهمية قصوى. اكتب برنامجاً يستقبل بعد المصفوفة المربعة N في السطر الأول، تليها N أسطر تمثل عناصر المصفوفة، ويحسب المحدد بدقة بطريقة الاستدعاء الذاتي (Laplace expansion) ويطبع المحدد كعدد صحيح فردي.",
    inputDescription: "السطر الأول: العدد الصحيح N (1 <= N <= 3). تليها N أسطر كل سطر يحتوي على N أعداد صحيحة.",
    outputDescription: "اطبع قيمة المحدد كعدد صحيح فردي.",
    examples: [
      { input: "2\n1 2\n3 4", output: "-2", explanation: "1*4 - 2*3 = 4 - 6 = -2" },
      { input: "3\n6 1 1\n4 -2 5\n2 8 7", output: "-306", explanation: "محدد مصفوفة 3x3 بحساب المرافقات = -306" }
    ],
    constraints: ["1 <= N <= 3", "-100 <= element <= 100"],
    publicTestCases: [
      { input: "2\n1 2\n3 4", expectedOutput: "-2", description: "محدد مصفوفة 2x2" },
      { input: "3\n6 1 1\n4 -2 5\n2 8 7", expectedOutput: "-306", description: "محدد مصفوفة 3x3" }
    ],
    hiddenTestCases: [
      { input: "1\n7", expectedOutput: "7" },
      { input: "3\n1 2 3\n0 4 5\n0 0 6", expectedOutput: "24" },
      { input: "2\n5 -3\n-2 4", expectedOutput: "14" }
    ],
    starterCode: "# حساب محدد المصفوفة عودياً\ndef get_det(mat):\n    n = len(mat)\n    if n == 1:\n        return mat[0][0]\n    if n == 2:\n        return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]\n    det = 0\n    for c in range(n):\n        sub = [row[:c] + row[c+1:] for row in mat[1:]]\n        det += ((-1) ** c) * mat[0][c] * get_det(sub)\n    return det\n\nN = int(input())\nmat = [list(map(int, input().split())) for _ in range(N)]\nprint(get_det(mat))\n"
  },

  "prob-l5-iq-knight-shortest-path": {
    id: "prob-l5-iq-knight-shortest-path",
    title: "🧩 مسألة ذكاء: أقصر مسار لحصان الشطرنج (Knight Shortest Path on Chessboard)",
    level: 5,
    difficulty: "hard",
    points: 150,
    baseXp: 150,
    timeLimit: 3000,
    skills: ["iq", "logic", "bfs", "graphs", "shortest_path"],
    description: "لغز حركة حصان الشطرنج الشهير (Knight's Tour & Shortest Path): الحصان يتحرك على شكل حرف L (مربعان في اتجاه ومربع في الاتجاه المتعامد). في رقعة شطرنج أبعادها 8x8 (الأعمدة من a إلى h، والصفوف من 1 إلى 8)، استقبل مربع البداية ومربع الهدف مفصولين بمسافة (مثال: 'a1 c2')، واحسب أقل عدد من النقلات للوصول إلى الهدف باستخدام خوارزمية BFS، واطبع: 'Shortest Path: {moves} moves'.",
    inputDescription: "سطر واحد يحتوي على مربعين بنظام الشطرنج مثل a1 c2.",
    outputDescription: "اطبع: Shortest Path: {moves} moves",
    examples: [
      { input: "a1 c2", output: "Shortest Path: 1 moves", explanation: "نقلة واحدة مباشرة على شكل حرف L" },
      { input: "a1 h8", output: "Shortest Path: 6 moves", explanation: "أقصر مسار من زاوية الرقعة إلى الزاوية المقابلة هو 6 نقلات" }
    ],
    constraints: ["المربعات صالحة ضمن الرقعة 8x8"],
    publicTestCases: [
      { input: "a1 c2", expectedOutput: "Shortest Path: 1 moves", description: "أقصر مسار لنقلة واحدة مباشرة" },
      { input: "a1 h8", expectedOutput: "Shortest Path: 6 moves", description: "أقصر مسار للزاوية المقابلة" }
    ],
    hiddenTestCases: [
      { input: "b1 c3", expectedOutput: "Shortest Path: 1 moves" },
      { input: "a1 a1", expectedOutput: "Shortest Path: 0 moves" },
      { input: "e4 e6", expectedOutput: "Shortest Path: 2 moves" }
    ],
    starterCode: "from collections import deque\n\ndef parse_sq(sq):\n    return (ord(sq[0]) - ord('a'), int(sq[1]) - 1)\n\nstart_str, target_str = input().split()\ns = parse_sq(start_str)\nt = parse_sq(target_str)\n\nmoves = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)]\nvisited = {s}\nq = deque([(s[0], s[1], 0)])\nans = 0\n\nwhile q:\n    r, c, d = q.popleft()\n    if (r, c) == t:\n        ans = d\n        break\n    for dr, dc in moves:\n        nr, nc = r + dr, c + dc\n        if 0 <= nr < 8 and 0 <= nc < 8 and (nr, nc) not in visited:\n            visited.add((nr, nc))\n            q.append((nr, nc, d + 1))\n\nprint(f'Shortest Path: {ans} moves')\n"
  },

  "prob-l5-real-event-scheduler": {
    id: "prob-l5-real-event-scheduler",
    title: "💼 مشكلة برمجية واقعية: محرك جدولة قاعات الاجتماعات السحابية (Meeting Rooms Capacity Optimizer)",
    level: 5,
    difficulty: "hard",
    points: 150,
    baseXp: 150,
    timeLimit: 3000,
    skills: ["real_world", "greedy", "sorting", "interval_scheduling"],
    description: "في أنظمة إدارة المكاتب الذكية وحجز الموارد السحابية، لديك قائمة بمواعيد اجتماعات مطلوب عقدها، كل اجتماع محدد بوقت البداية ووقت النهاية [start, end]. المطلوب تحديد أقل عدد من قاعات الاجتماعات اللازمة بحيث يمكن استضافة جميع الاجتماعات دون أي تداخل في القاعات. استقبل عدد الاجتماعات M في السطر الأول، تليها M أسطر تحتوي على start و end، واطبع: 'Minimum Rooms: {rooms}'.",
    inputDescription: "السطر الأول: عدد الاجتماعات M. تليها M أسطر يحتوي كل منها على start و end كأعداد صحيحة.",
    outputDescription: "اطبع: Minimum Rooms: {rooms}",
    examples: [
      { input: "3\n0 30\n5 10\n15 20", output: "Minimum Rooms: 2", explanation: "الاجتماع 0-30 يتداخل مع 5-10 و 15-20، لكن 5-10 و 15-20 لا يتداخلان معاً فنحتاج قاعتين فقط" },
      { input: "3\n7 10\n2 4\n12 14", output: "Minimum Rooms: 1", explanation: "لا يوجد أي تداخل، قاعة واحدة تكفي" }
    ],
    constraints: ["1 <= M <= 10^4", "0 <= start < end <= 10^6"],
    publicTestCases: [
      { input: "3\n0 30\n5 10\n15 20", expectedOutput: "Minimum Rooms: 2", description: "حساب أقل قاعات لتداخل جزئي" },
      { input: "3\n7 10\n2 4\n12 14", expectedOutput: "Minimum Rooms: 1", description: "اجتماعات بدون تداخل" }
    ],
    hiddenTestCases: [
      { input: "4\n1 4\n2 5\n3 6\n4 7", expectedOutput: "Minimum Rooms: 3" },
      { input: "1\n9 17", expectedOutput: "Minimum Rooms: 1" },
      { input: "5\n1 10\n2 7\n3 19\n8 12\n10 20", expectedOutput: "Minimum Rooms: 4" }
    ],
    starterCode: "# تحسين وجدولة قاعات الاجتماعات السحابية\nimport heapq\nM = int(input())\nintervals = [list(map(int, input().split())) for _ in range(M)]\nintervals.sort(key=lambda x: x[0])\nrooms = []\nfor start, end in intervals:\n    if rooms and rooms[0] <= start:\n        heapq.heappop(rooms)\n    heapq.heappush(rooms, end)\nprint(f'Minimum Rooms: {len(rooms)}')\n"
  }

};

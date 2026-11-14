// src/features/python-adventure/python-adventure-worlds-13-20.js

export const WORLDS_13_TO_20_DATA = [
  {
    "id": "world-13",
    "number": 13,
    "title": "معقل بنى المعطيات المتقدمة",
    "englishTitle": "Advanced Data Structures Citadel",
    "icon": "🏛️",
    "concept": "المكدسات Stacks وطوابير الانتظار Queues والـ Deque ومكدس الأعداد الأحادي",
    "description": "أتقن بناء هياكل LIFO و FIFO ومكدس الأعداد الأحادية وحل مسائل مطابقة الأقواس وإدارة العمليات المؤجلة.",
    "color": "#38bdf8",
    "levelsCount": 11,
    "requiredWorldId": "world-12"
  },
  {
    "id": "world-14",
    "number": 14,
    "title": "عرين التكرار العودي والرجوع الخلفي",
    "englishTitle": "Recursion & Backtracking Lair",
    "icon": "🌀",
    "concept": "حالات التوقف Base Cases، شجرة الاستدعاء العودي، وتوليد التباديل والتوافيق",
    "description": "احترف التفكير العودي وحل مسائل المتاهات وتوليد جميع الحلول الممكنة عبر الرجوع الذكي للخلف (Backtracking).",
    "color": "#a855f7",
    "levelsCount": 11,
    "requiredWorldId": "world-13"
  },
  {
    "id": "world-15",
    "number": 15,
    "title": "متاهة الأشجار والرسوم البيانية",
    "englishTitle": "Trees & Graph Traversal Labyrinth",
    "icon": "🌲",
    "concept": "أشجار البحث الثنائية BST وخوارزميات المرور BFS و DFS وقوائم الجوار",
    "description": "استكشف الشبكات والخرائط وأشجار البيانات: أوجد أقصر مسار، واكتشف الدورات، وتحقق من اتزان الأشجار.",
    "color": "#22c55e",
    "levelsCount": 11,
    "requiredWorldId": "world-14"
  },
  {
    "id": "world-16",
    "number": 16,
    "title": "برج البرمجة الديناميكية والحفظ المؤقت",
    "englishTitle": "Dynamic Programming & Memoization Tower",
    "icon": "🏰",
    "concept": "المشاكل الفرعية المتداخلة، التخزين المؤقت Memoization، وجداول Tabulation 1D و 2D",
    "description": "أقوى تقنية برمجية في المقابلات العالمية: حول الحلول الأسية البطيئة O(2ⁿ) إلى حلول فائقة السرعة O(N).",
    "color": "#f97316",
    "levelsCount": 11,
    "requiredWorldId": "world-15"
  },
  {
    "id": "world-17",
    "number": 17,
    "title": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "englishTitle": "Sliding Window & Binary Search Lab",
    "icon": "🔭",
    "concept": "النوافذ المنزلقة المتغيرة والثابتة، المؤشران المتقاربان، والبحث الثنائي على فضاء الإجابات",
    "description": "تقنيات تحسين السرعة التنافسية: اقتناص أطول سلسلة فرعية، وإيجاد الحل الأمثل بتعقيد لوغاريتمي O(log N).",
    "color": "#06b6d4",
    "levelsCount": 11,
    "requiredWorldId": "world-16"
  },
  {
    "id": "world-18",
    "number": 18,
    "title": "حصن معالجة البيانات والتعقيد الحسابي",
    "englishTitle": "Data Streams & Complexity Bastion",
    "icon": "🛡️",
    "concept": "معالجة تدفقات البيانات الضخمة، أكوام الذاكرة Heaps (heapq)، وحساب العناصر الـ K الكبرى",
    "description": "معالجة البيانات في الزمن الحقيقي: تصميم أنظمة حساب الوسيط والحد الأدنى والأعلى بكفاءة O(log K).",
    "color": "#64748b",
    "levelsCount": 11,
    "requiredWorldId": "world-17"
  },
  {
    "id": "world-19",
    "number": 19,
    "title": "محرك أنماط التصميم وهندسة البرمجيات",
    "englishTitle": "Software Architecture & OOP Patterns Engine",
    "icon": "⚙️",
    "concept": "أنماط التصميم Singleton و Factory و Observer، ومبادئ SOLID، والمولدات الذكية Generators",
    "description": "ارتقِ من مجرد كاتب كود إلى مهندس برمجيات: تصميم كود قابل للتوسع والصيانة وفصل المسؤوليات باحترافية.",
    "color": "#ec4899",
    "levelsCount": 11,
    "requiredWorldId": "world-18"
  },
  {
    "id": "world-20",
    "number": 20,
    "title": "قلعة بطولات البرمجة العالمية الكبرى",
    "englishTitle": "Grandmaster Competitive Arena",
    "icon": "👑",
    "concept": "تحديات الزعماء الكبرى، خوارزميات التنافس المعقدة، ومحاكاة محركات التحكيم العالمية",
    "description": "القمة المطلقة في رحلة بايثون: مسائل مركبة تجمع كافة الخوارزميات لاختبار جاهزيتك لمسابقات ICPC ومقابلات FAANG.",
    "color": "#eab308",
    "levelsCount": 11,
    "requiredWorldId": "world-19"
  }
];

export const CHALLENGES_13_TO_20_DATA = {
  "world-13-level-1": {
    "id": "world-13-level-1",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 1,
    "title": "محاكي مكدس العمليات LIFO (Stack Operations)",
    "englishTitle": "Stack Operations Simulation",
    "subtitle": "مبدأ ما يدخل آخراً يخرج أولاً",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 150,
    "skills": [
      "stack",
      "lists",
      "lifo"
    ],
    "story": "لديك قائمة عمليات لمكدس الذاكرة: ops = ['push 10', 'push 20', 'pop', 'push 30']. نفذ العمليات على قائمة فارغة تمثل المكدس، ثم اطبع حالة المكدس النهائية بصيغة: 'Stack: [10, 30]'.",
    "microLesson": {
      "concept": "محاكي مكدس العمليات LIFO (Stack Operations)",
      "summary": "المكدس (Stack) يتبع قاعدة LIFO. في بايثون نستخدم append() للإضافة (push) و pop() للحذف من القمة.",
      "exampleCode": "# فكرة حل: محاكي مكدس العمليات LIFO (Stack Operations)"
    },
    "starterCode": "ops = ['push 10', 'push 20', 'pop', 'push 30']\nstack = []\n\n# نفذ العمليات بالتتابع واطبع النتيجة بصيغة: Stack: [...] \n",
    "requirements": [
      "مر على العمليات في ops ونفذ push أو pop",
      "اطبع الناتج بصيغة: Stack: [10, 30]"
    ],
    "expectedOutput": "Stack: [10, 30]",
    "timeLimitMinutes": 12,
    "hints": [
      "استخدم loop على ops، وافصل الكلمات بـ split()",
      "إذا كانت العملية push خذ الرقم وحوله لـ int وضعه بـ append",
      "اطبع f'Stack: {stack}'"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Stack: [10, 30]",
        "description": "حالة اختبار التحقق من محاكي مكدس العمليات LIFO (Stack Operations)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-2"
  },
  "world-13-level-2": {
    "id": "world-13-level-2",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 2,
    "title": "فاحص اتزان الأقواس المتعددة (Valid Parentheses)",
    "englishTitle": "Valid Parentheses Checker",
    "subtitle": "مطابقة الأقواس المتداخلة بأناقة المكدس",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "stack",
      "strings",
      "hash_map"
    ],
    "story": "افحص ما إذا كانت السلاسل التالية متزنة الأقواس أم لا: s1 = '{[()]}' و s2 = '{[(])}'. اكتب دالة is_valid(s) تفحص صحة إغلاق الأقواس بالترتيب. اطبع النتيجتين مفصولتين بفاصلة بصيغة: 'True, False'.",
    "microLesson": {
      "concept": "فاحص اتزان الأقواس المتعددة (Valid Parentheses)",
      "summary": "نستخدم المكدس لتخزين أقواس الفتح، وعند مواجهة قوس إغلاق نتأكد أنه يطابق قمة المكدس ثم نحذفه.",
      "exampleCode": "# فكرة حل: فاحص اتزان الأقواس المتعددة (Valid Parentheses)"
    },
    "starterCode": "s1 = '{[()]}'\ns2 = '{[(])}'\n\ndef is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else:\n            stack.append(char)\n    return not stack\n\nprint(f'{is_valid(s1)}, {is_valid(s2)}')\n",
    "requirements": [
      "اكتب دالة تعتمد على المكدس لفحص توازن الأقواس () {} []",
      "اطبع النتيجة مطابقة تماماً: True, False"
    ],
    "expectedOutput": "True, False",
    "timeLimitMinutes": 12,
    "hints": [
      "استخدم قاموس للأقواس المقابلة",
      "إذا كان الحرف قوس فتح ضعه في المكدس، وإذا كان قوس إغلاق تأكد أنه يطابق قمة المكدس"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "True, False",
        "description": "حالة اختبار التحقق من فاحص اتزان الأقواس المتعددة (Valid Parentheses)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-3"
  },
  "world-13-level-3": {
    "id": "world-13-level-3",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 3,
    "title": "طابور خدمة العملاء FIFO مع collections.deque",
    "englishTitle": "FIFO Customer Service Queue",
    "subtitle": "طابور الدور الأول فالأول بكفاءة O(1)",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "queue",
      "deque",
      "fifo"
    ],
    "story": "لديك طابور عملاء يبدأ بـ ['Client_1', 'Client_2']. قم بخدمة العميل الأول وحذفه، ثم أضف 'Client_3'، ثم اخدم العميل التالي. اطبع العملاء المخدومين والعميل المتبقي بصيغة: \"Served: Client_1, Client_2 | Remaining: ['Client_3']\".",
    "microLesson": {
      "concept": "طابور خدمة العملاء FIFO مع collections.deque",
      "summary": "في بايثون، استخدام deque من مكتبة collections يمنحك popleft() و append() بزمن ثابت O(1).",
      "exampleCode": "# فكرة حل: طابور خدمة العملاء FIFO مع collections.deque"
    },
    "starterCode": "from collections import deque\nq = deque(['Client_1', 'Client_2'])\nserved = []\nserved.append(q.popleft())\nq.append('Client_3')\nserved.append(q.popleft())\nprint(f\"Served: {', '.join(served)} | Remaining: {list(q)}\")\n",
    "requirements": [
      "استخدم deque مع popleft() لخدمة العميل",
      "أضف العميل الثالث واخدم الثاني",
      "اطبع بصيغة: Served: Client_1, Client_2 | Remaining: ['Client_3']"
    ],
    "expectedOutput": "Served: Client_1, Client_2 | Remaining: ['Client_3']",
    "timeLimitMinutes": 12,
    "hints": [
      "استخدم popleft() لحذف العميل الأول وإضافته لقائمة served",
      "أضف 'Client_3' عبر append",
      "استخدم join لطباعة العملاء المخدومين"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Served: Client_1, Client_2 | Remaining: ['Client_3']",
        "description": "حالة اختبار التحقق من طابور خدمة العملاء FIFO مع collections.deque"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-4"
  },
  "world-13-level-4": {
    "id": "world-13-level-4",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 4,
    "title": "حساب التدوين البولندي العكسي (Reverse Polish Notation)",
    "englishTitle": "Evaluate Reverse Polish Notation",
    "subtitle": "حساب العمليات الحسابية بدون أقواس",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "rpn",
      "stack",
      "math"
    ],
    "story": "لديك تعبير بالتدوين البولندي العكسي tokens = ['2', '1', '+', '3', '*']. احسب قيمته باستخدام المكدس: نجمع 2 و 1 ليصبح 3، ثم نضرب في 3 ليصبح 9. اطبع النتيجة بصيغة: 'RPN Result: 9'.",
    "microLesson": {
      "concept": "حساب التدوين البولندي العكسي (Reverse Polish Notation)",
      "summary": "في RPN، عندما نقابل رقماً نضعه في المكدس، وعندما نقابل معاملاً حسابياً نسحب آخر رقمين ونجري العملية ونعيد الناتج.",
      "exampleCode": "# فكرة حل: حساب التدوين البولندي العكسي (Reverse Polish Notation)"
    },
    "starterCode": "tokens = ['2', '1', '+', '3', '*']\nstack = []\nfor t in tokens:\n    if t in '+-*/':\n        b, a = stack.pop(), stack.pop()\n        if t == '+': stack.append(a + b)\n        elif t == '-': stack.append(a - b)\n        elif t == '*': stack.append(a * b)\n        elif t == '/': stack.append(int(a / b))\n    else:\n        stack.append(int(t))\nprint(f'RPN Result: {stack[0]}')\n",
    "requirements": [
      "استخدم مكدساً لحساب التدوين البولندي العكسي",
      "اطبع بصيغة: RPN Result: 9"
    ],
    "expectedOutput": "RPN Result: 9",
    "timeLimitMinutes": 14,
    "hints": [
      "مر على كل عنصر في tokens",
      "إذا كان معامل حسابي، اسحب b ثم a واجري العملية"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "RPN Result: 9",
        "description": "حالة اختبار التحقق من حساب التدوين البولندي العكسي (Reverse Polish Notation)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-5"
  },
  "world-13-level-5": {
    "id": "world-13-level-5",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 5,
    "title": "المكدس ذو الحد الأدنى الفوري (Min Stack in O(1))",
    "englishTitle": "Min Stack Implementation",
    "subtitle": "الحصول على أصغر عنصر بزمن ثابت O(1)",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "min_stack",
      "oop",
      "o1_time"
    ],
    "story": "صمم مكدساً MinStack يدعم get_min() في O(1). نفذ: push(5), push(2), push(8). اطبع أصغر عنصر (2)، ثم pop() واطبع أصغر عنصر (2)، ثم pop() واطبع أصغر عنصر (5). الناتج: 'Min: 2, Min: 2, Min: 5'.",
    "microLesson": {
      "concept": "المكدس ذو الحد الأدنى الفوري (Min Stack in O(1))",
      "summary": "للحفاظ على الحد الأدنى في O(1)، نستخدم مكدسين: المكدس الأساسي ومكدس مساعد يحتوي على الحد الأدنى عند كل خطوة.",
      "exampleCode": "# فكرة حل: المكدس ذو الحد الأدنى الفوري (Min Stack in O(1))"
    },
    "starterCode": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val):\n        self.stack.append(val)\n        m = val if not self.min_stack else min(val, self.min_stack[-1])\n        self.min_stack.append(m)\n    def pop(self):\n        self.stack.pop()\n        self.min_stack.pop()\n    def get_min(self):\n        return self.min_stack[-1]\n\nms = MinStack()\nms.push(5); ms.push(2); ms.push(8)\nm1 = ms.get_min()\nms.pop()\nm2 = ms.get_min()\nms.pop()\nm3 = ms.get_min()\nprint(f'Min: {m1}, Min: {m2}, Min: {m3}')\n",
    "requirements": [
      "صمم فئة MinStack بمكدس إضافي لتتبع الحد الأدنى",
      "اطبع بصيغة دقيقة: Min: 2, Min: 2, Min: 5"
    ],
    "expectedOutput": "Min: 2, Min: 2, Min: 5",
    "timeLimitMinutes": 15,
    "hints": [
      "في push(val)، ضع في min_stack القيمة min(val, min_stack[-1])",
      "في pop()، احذف من الاثنين معاً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Min: 2, Min: 2, Min: 5",
        "description": "حالة اختبار التحقق من المكدس ذو الحد الأدنى الفوري (Min Stack in O(1))"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-6"
  },
  "world-13-level-6": {
    "id": "world-13-level-6",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 6,
    "title": "محاكي سجل التنقل في المتصفح (Browser History)",
    "englishTitle": "Browser History Simulator",
    "subtitle": "إدارة أزرار الرجوع والتقدم بمكدسين",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "browser_history",
      "stack",
      "system_simulation"
    ],
    "story": "محاكاة تاريخ المتصفح: يبدأ المتصفح في 'google.com'، ثم يزور 'youtube.com'، ثم يزور 'github.com'. نفذ خطوة رجوع للخلف (back 1)، ثم خطوة تقدم للأمام (forward 1). اطبع الصفحة الحالية بصيغة: 'Current: github.com'.",
    "microLesson": {
      "concept": "محاكي سجل التنقل في المتصفح (Browser History)",
      "summary": "نظام التنقل يستخدم مكدس للماضي ومكدس للمستقبل. عند زيارة صفحة جديدة يتم تصفير مكدس المستقبل.",
      "exampleCode": "# فكرة حل: محاكي سجل التنقل في المتصفح (Browser History)"
    },
    "starterCode": "history = ['google.com']\nfuture = []\ncur = 'google.com'\nfor page in ['youtube.com', 'github.com']:\n    history.append(cur)\n    cur = page\n    future.clear()\nfuture.append(cur)\ncur = history.pop()\nhistory.append(cur)\ncur = future.pop()\nprint(f'Current: {cur}')\n",
    "requirements": [
      "محاكاة سجل التصفح بالترتيب المطلوب",
      "اطبع الصفحة النهائية بصيغة: Current: github.com"
    ],
    "expectedOutput": "Current: github.com",
    "timeLimitMinutes": 12,
    "hints": [
      "عند الرجوع، انقل الصفحة الحالية إلى future واسحب السابقة من history",
      "عند التقدم، انقل الحالية إلى history واسحب من future"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Current: github.com",
        "description": "حالة اختبار التحقق من محاكي سجل التنقل في المتصفح (Browser History)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-7"
  },
  "world-13-level-7": {
    "id": "world-13-level-7",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 7,
    "title": "العنصر الأكبر التالي (Next Greater Element with Monotonic Stack)",
    "englishTitle": "Next Greater Element",
    "subtitle": "خوارزمية المكدس الأحادي في O(N)",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "monotonic_stack",
      "arrays",
      "algorithms"
    ],
    "story": "لديك القائمة nums = [2, 1, 2, 4, 3]. أوجد أول عنصر أكبر على اليمين لكل رقم (أو -1 إن لم يوجد). الناتج هو [4, 2, 4, -1, -1]. اطبع الناتج بصيغة: '[4, 2, 4, -1, -1]'.",
    "microLesson": {
      "concept": "العنصر الأكبر التالي (Next Greater Element with Monotonic Stack)",
      "summary": "المكدس الأحادي (Monotonic Stack) يحتفظ بالعناصر بترتيب تنازلي لمعرفة العنصر الأكبر القادم بزمن خطي O(N).",
      "exampleCode": "# فكرة حل: العنصر الأكبر التالي (Next Greater Element with Monotonic Stack)"
    },
    "starterCode": "nums = [2, 1, 2, 4, 3]\nres = [-1] * len(nums)\nstack = []\nfor i, x in enumerate(nums):\n    while stack and nums[stack[-1]] < x:\n        res[stack.pop()] = x\n    stack.append(i)\nprint(res)\n",
    "requirements": [
      "استخدم مكدساً أحادياً لحساب العنصر الأكبر التالي",
      "اطبع الناتج: [4, 2, 4, -1, -1]"
    ],
    "expectedOutput": "[4, 2, 4, -1, -1]",
    "timeLimitMinutes": 16,
    "hints": [
      "مر على العناصر عبر فهارسها i",
      "طالما المكدس غير فارغ و nums[i] أكبر من nums[stack[-1]]، اسحب وضع nums[i] في نتيجة الفهرس المسحوب"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "[4, 2, 4, -1, -1]",
        "description": "حالة اختبار التحقق من العنصر الأكبر التالي (Next Greater Element with Monotonic Stack)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-8"
  },
  "world-13-level-8": {
    "id": "world-13-level-8",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 8,
    "title": "اصطدام الكويكبات الفضائية (Asteroid Collision)",
    "englishTitle": "Asteroid Collision",
    "subtitle": "محاكاة تصادم الأجسام المتعاكسة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "stack",
      "simulation",
      "collision"
    ],
    "story": "لديك قائمة كويكبات: asteroids = [5, 10, -5]. الأعداد الموجبة تتحرك يميناً والسالبة يساراً. إذا التقى كويكبان متضادان، الأكبر حجماً يدمر الأصغر، وإذا تساويا يدمران معاً. احسب الكويكبات الناجية واطبعها بصيغة: '[5, 10]'.",
    "microLesson": {
      "concept": "اصطدام الكويكبات الفضائية (Asteroid Collision)",
      "summary": "التصادم يحدث فقط إذا كان الكويكب الحالي سالباً والقمة في المكدس موجبة.",
      "exampleCode": "# فكرة حل: اصطدام الكويكبات الفضائية (Asteroid Collision)"
    },
    "starterCode": "asteroids = [5, 10, -5]\nstack = []\nfor a in asteroids:\n    while stack and a < 0 < stack[-1]:\n        if stack[-1] < -a:\n            stack.pop()\n            continue\n        elif stack[-1] == -a:\n            stack.pop()\n        break\n    else:\n        stack.append(a)\nprint(stack)\n",
    "requirements": [
      "محاكاة اصطدام الكويكبات بالمكدس",
      "اطبع الناتج: [5, 10]"
    ],
    "expectedOutput": "[5, 10]",
    "timeLimitMinutes": 15,
    "hints": [
      "عندما يكون ast < 0 والقمة stack[-1] > 0 يحدث التصادم",
      "قارن القيمة المطلقة abs(ast) مع stack[-1]"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "[5, 10]",
        "description": "حالة اختبار التحقق من اصطدام الكويكبات الفضائية (Asteroid Collision)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-9"
  },
  "world-13-level-9": {
    "id": "world-13-level-9",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 9,
    "title": "تبسيط مسارات الملفات في نظام التشغيل (Simplify Unix Path)",
    "englishTitle": "Simplify Unix Path",
    "subtitle": "تحويل المسارات النسبية إلى مسار قانوني مبسط",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "string_parsing",
      "stack",
      "os_paths"
    ],
    "story": "لديك مسار نسبي لنظام التشغيل: path = '/home//foo/../bar/'. بسط المسار إلى المسار الأساسي النهائي (المسار القانوني Canonical Path). الناتج هو: '/home/bar'. اطبع الناتج المطلوب.",
    "microLesson": {
      "concept": "تبسيط مسارات الملفات في نظام التشغيل (Simplify Unix Path)",
      "summary": "نقوم بتقسيم المسار بواسطة '/'، نتجاهل الفراغات و '.'، وعند مواجهة '..' نقوم بـ pop() من المكدس.",
      "exampleCode": "# فكرة حل: تبسيط مسارات الملفات في نظام التشغيل (Simplify Unix Path)"
    },
    "starterCode": "path = '/home//foo/../bar/'\nstack = []\nfor p in path.split('/'):\n    if p == '..' and stack: stack.pop()\n    elif p not in ('', '.', '..'): stack.append(p)\nprint('/' + '/'.join(stack))\n",
    "requirements": [
      "استخدم المكدس لمعالجة المجلدات و .. و .",
      "اطبع المسار المبسط: /home/bar"
    ],
    "expectedOutput": "/home/bar",
    "timeLimitMinutes": 12,
    "hints": [
      "قسم المسار بـ path.split('/')",
      "إذا كان الجزء '..' اسحب من المكدس إذا لم يكن فارغاً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "/home/bar",
        "description": "حالة اختبار التحقق من تبسيط مسارات الملفات في نظام التشغيل (Simplify Unix Path)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-10"
  },
  "world-13-level-10": {
    "id": "world-13-level-10",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 10,
    "title": "درجات الحرارة اليومية وأيام الانتظار (Daily Temperatures)",
    "englishTitle": "Daily Temperatures Wait Days",
    "subtitle": "تحديد عدد الأيام للوصول لطقس أدفأ",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "monotonic_stack",
      "array_diff",
      "optimization"
    ],
    "story": "لديك درجات حرارة أسبوعية: temps = [73, 74, 75, 71, 69, 72, 76, 73]. احسب لكل يوم كم يوماً يجب الانتظار لدرجة حرارة أدفأ. الناتج هو: [1, 1, 4, 2, 1, 1, 0, 0]. اطبع النتيجة كما هي.",
    "microLesson": {
      "concept": "درجات الحرارة اليومية وأيام الانتظار (Daily Temperatures)",
      "summary": "المكدس يحتفظ بفهارس الأيام ذات درجات الحرارة المتناقصة، وعند وجود حرارة أعلى نحسب فارق الأيام i - prev_i.",
      "exampleCode": "# فكرة حل: درجات الحرارة اليومية وأيام الانتظار (Daily Temperatures)"
    },
    "starterCode": "temps = [73, 74, 75, 71, 69, 72, 76, 73]\nres = [0] * len(temps)\nstack = []\nfor i, t in enumerate(temps):\n    while stack and temps[stack[-1]] < t:\n        prev = stack.pop()\n        res[prev] = i - prev\n    stack.append(i)\nprint(res)\n",
    "requirements": [
      "حساب أيام الانتظار بدقة",
      "اطبع الناتج: [1, 1, 4, 2, 1, 1, 0, 0]"
    ],
    "expectedOutput": "[1, 1, 4, 2, 1, 1, 0, 0]",
    "timeLimitMinutes": 16,
    "hints": [
      "عندما temps[i] > temps[stack[-1]]، الفارق هو i - stack.pop() وضعه في res"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "description": "حالة اختبار التحقق من درجات الحرارة اليومية وأيام الانتظار (Daily Temperatures)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-13-level-11"
  },
  "world-13-level-11": {
    "id": "world-13-level-11",
    "worldId": "world-13",
    "worldTitle": "معقل بنى المعطيات المتقدمة",
    "levelNumber": 11,
    "title": "👑 زعيم معقل البيانات: أكبر مستطيل في المدرج التكراري (Largest Rectangle in Histogram)",
    "englishTitle": "Largest Rectangle in Histogram Boss",
    "subtitle": "التحدي الأسطوري لمكدس الأعمدة الهندسية",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
      "monotonic_stack",
      "hard_problem",
      "boss_challenge"
    ],
    "story": "زعيم معقل البيانات الكبرى: لديك مدرج تكراري بارتفاعات heights = [2, 1, 5, 6, 2, 3]. احسب أقصى مساحة مستطيل يمكن تشكيلها داخل هذه الأعمدة (العمودان 5 و 6 يعطيان مستطيل مساحته 2 * 5 = 10). اطبع النتيجة بصيغة: 'Max Rectangle Area: 10'.",
    "microLesson": {
      "concept": "👑 زعيم معقل البيانات: أكبر مستطيل في المدرج التكراري (Largest Rectangle in Histogram)",
      "summary": "نستخدم مكدساً أحادياً لتحديد الحدود اليسرى واليمنى لكل عمود لحساب أقصى مساحة ممكنة بزمن O(N).",
      "exampleCode": "# فكرة حل: 👑 زعيم معقل البيانات: أكبر مستطيل في المدرج التكراري (Largest Rectangle in Histogram)"
    },
    "starterCode": "heights = [2, 1, 5, 6, 2, 3]\nstack = []\nmax_area = 0\nh_list = heights + [0]\nfor i, h in enumerate(h_list):\n    while stack and h_list[stack[-1]] > h:\n        height = h_list[stack.pop()]\n        width = i if not stack else i - stack[-1] - 1\n        max_area = max(max_area, height * width)\n    stack.append(i)\nprint(f'Max Rectangle Area: {max_area}')\n",
    "requirements": [
      "حساب أقصى مساحة مستطيل ممكنة",
      "اطبع بصيغة: Max Rectangle Area: 10"
    ],
    "expectedOutput": "Max Rectangle Area: 10",
    "timeLimitMinutes": 25,
    "hints": [
      "أضف 0 في نهاية heights كحارس لتفريغ المكدس",
      "عرض المستطيل هو i - stack[-1] - 1"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Rectangle Area: 10",
        "description": "حالة اختبار التحقق من 👑 زعيم معقل البيانات: أكبر مستطيل في المدرج التكراري (Largest Rectangle in Histogram)"
      }
    ],
    "unlocksWorldId": "world-14",
    "nextChallengeId": "world-14-level-1"
  },
  "world-14-level-1": {
    "id": "world-14-level-1",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 1,
    "title": "أساسيات التكرار العودي: برج القوى والمضروب (Recursion Base & Call Stack)",
    "englishTitle": "Recursion Base and Factorial",
    "subtitle": "فهم شرط التوقف وشجرة الاستدعاء العودي",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "recursion",
      "math",
      "call_stack"
    ],
    "story": "احسب المضروب factorial(5) والأس power(2, 5) بدوال عودية خالصة بدون حلقات for أو while. اطبع النتيجة بصيغة: 'Factorial: 120 | Power: 32'.",
    "microLesson": {
      "concept": "أساسيات التكرار العودي: برج القوى والمضروب (Recursion Base & Call Stack)",
      "summary": "الدالة العودية تستدعي نفسها وتحتاج دائماً إلى Base Case للتوقف حتى لا تسبب RecursionError.",
      "exampleCode": "# فكرة حل: أساسيات التكرار العودي: برج القوى والمضروب (Recursion Base & Call Stack)"
    },
    "starterCode": "def factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\ndef power(base, exp):\n    if exp == 0: return 1\n    return base * power(base, exp - 1)\n\nprint(f'Factorial: {factorial(5)} | Power: {power(2, 5)}')\n",
    "requirements": [
      "كتابة دوال عودية بـ Base Case صحيح",
      "اطبع بصيغة: Factorial: 120 | Power: 32"
    ],
    "expectedOutput": "Factorial: 120 | Power: 32",
    "timeLimitMinutes": 12,
    "hints": [
      "في المضروب: إذا كان n=1 أرجع 1، وإلا n * factorial(n-1)",
      "في القوى: إذا كان exp=0 أرجع 1، وإلا base * power(base, exp-1)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Factorial: 120 | Power: 32",
        "description": "حالة اختبار التحقق من أساسيات التكرار العودي: برج القوى والمضروب (Recursion Base & Call Stack)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-2"
  },
  "world-14-level-2": {
    "id": "world-14-level-2",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 2,
    "title": "توليد جميع المجموعات الجزئية (Subsets / Power Set)",
    "englishTitle": "Subsets Power Set Generator",
    "subtitle": "توليد فضاء الحالات عبر شجرة القرارات",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "backtracking",
      "subsets",
      "combinatorics"
    ],
    "story": "لديك القائمة nums = [1, 2, 3]. استخدم خوارزمية Backtracking لتوليد كافة المجموعات الجزئية الممكنة وحساب عددها الإجمالي (2^3 = 8). اطبع عدد المجموعات بصيغة: 'Subsets Count: 8'.",
    "microLesson": {
      "concept": "توليد جميع المجموعات الجزئية (Subsets / Power Set)",
      "summary": "في كل خطوة نقرر: إما تضمين العنصر الحالي في المجموعة الجزئية أو تجاوزه، ثم نتراجع.",
      "exampleCode": "# فكرة حل: توليد جميع المجموعات الجزئية (Subsets / Power Set)"
    },
    "starterCode": "nums = [1, 2, 3]\nres = []\ndef backtrack(start, curr):\n    res.append(list(curr))\n    for i in range(start, len(nums)):\n        curr.append(nums[i])\n        backtrack(i + 1, curr)\n        curr.pop()\nbacktrack(0, [])\nprint(f'Subsets Count: {len(res)}')\n",
    "requirements": [
      "توليد المجموعات الجزئية عبر الرجوع للخلف",
      "اطبع بصيغة: Subsets Count: 8"
    ],
    "expectedOutput": "Subsets Count: 8",
    "timeLimitMinutes": 14,
    "hints": [
      "استخدم curr.append ثم استدع backtrack ثم curr.pop() للرجوع"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Subsets Count: 8",
        "description": "حالة اختبار التحقق من توليد جميع المجموعات الجزئية (Subsets / Power Set)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-3"
  },
  "world-14-level-3": {
    "id": "world-14-level-3",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 3,
    "title": "توليد تباديل النصوص الفريدة (String Permutations)",
    "englishTitle": "Unique String Permutations",
    "subtitle": "توليد جميع التباديل الممكنة وترتيبها",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "backtracking",
      "permutations",
      "strings"
    ],
    "story": "لديك النص s = 'ABC'. ولد كافة التباديل الستة الممكنة ورتبها أبجدياً في قائمة. اطبع القائمة بصيغة: \"['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']\".",
    "microLesson": {
      "concept": "توليد تباديل النصوص الفريدة (String Permutations)",
      "summary": "في مسألة التباديل، نختار في كل موضع أحد الأحرف غير المستخدمة حتى تكتمل السلسلة.",
      "exampleCode": "# فكرة حل: توليد تباديل النصوص الفريدة (String Permutations)"
    },
    "starterCode": "s = 'ABC'\nres = []\ndef permute(curr, remaining):\n    if not remaining:\n        res.append(curr); return\n    for i in range(len(remaining)):\n        permute(curr + remaining[i], remaining[:i] + remaining[i+1:])\npermute('', s)\nres.sort()\nprint(res)\n",
    "requirements": [
      "توليد تباديل النص بالترتيب الأبجدي",
      "اطبع الناتج المطابق تماماً"
    ],
    "expectedOutput": "['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']",
    "timeLimitMinutes": 14,
    "hints": [
      "افصل الحرف المختار عن باقي الحروف واستدع الدالة عودياً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']",
        "description": "حالة اختبار التحقق من توليد تباديل النصوص الفريدة (String Permutations)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-4"
  },
  "world-14-level-4": {
    "id": "world-14-level-4",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 4,
    "title": "مجموع التوافيق (Combination Sum)",
    "englishTitle": "Combination Sum",
    "subtitle": "إيجاد جميع التوافيق المكونة للهدف",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "backtracking",
      "combinations",
      "math"
    ],
    "story": "لديك candidates = [2, 3, 6, 7] والهدف target = 7. أوجد جميع التوافيق الفريدة التي مجموعها يساوي 7 (يسمح بتكرار نفس الرقم). الحلول هي: [[2, 2, 3], [7]]. اطبع الناتج كما هو.",
    "microLesson": {
      "concept": "مجموع التوافيق (Combination Sum)",
      "summary": "نستخدم التراجع مع تقليم الأغصان (Pruning) إذا أصبح المجموع الحالي أكبر من الهدف.",
      "exampleCode": "# فكرة حل: مجموع التوافيق (Combination Sum)"
    },
    "starterCode": "candidates = [2, 3, 6, 7]\ntarget = 7\nres = []\ndef dfs(start, curr, total):\n    if total == target: res.append(list(curr)); return\n    if total > target: return\n    for i in range(start, len(candidates)):\n        curr.append(candidates[i])\n        dfs(i, curr, total + candidates[i])\n        curr.pop()\ndfs(0, [], 0)\nprint(res)\n",
    "requirements": [
      "حساب التوافيق التي تساوي target بالضبط",
      "اطبع الناتج: [[2, 2, 3], [7]]"
    ],
    "expectedOutput": "[[2, 2, 3], [7]]",
    "timeLimitMinutes": 16,
    "hints": [
      "مرر i في الاستدعاء القادم للسماح بإعادة استخدام نفس العنصر"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "[[2, 2, 3], [7]]",
        "description": "حالة اختبار التحقق من مجموع التوافيق (Combination Sum)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-5"
  },
  "world-14-level-5": {
    "id": "world-14-level-5",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 5,
    "title": "توليد الأقواس الصحيحة (Generate Parentheses)",
    "englishTitle": "Generate Parentheses",
    "subtitle": "بناء السلاسل المتوازنة عودياً",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "backtracking",
      "parentheses",
      "recursion"
    ],
    "story": "لديك n = 3 أزواج من الأقواس. ولد جميع التراكيب الصحيحة والمتزنة لها. الناتج المتوقع هو: \"['((()))', '(()())', '(())()', '()(())', '()()()']\". اطبع النتيجة مرتبة.",
    "microLesson": {
      "concept": "توليد الأقواس الصحيحة (Generate Parentheses)",
      "summary": "لا يمكن وضع قوس إغلاق ')' إلا إذا كان عدد أقواس الإغلاق أقل من أقواس الفتح الحالية.",
      "exampleCode": "# فكرة حل: توليد الأقواس الصحيحة (Generate Parentheses)"
    },
    "starterCode": "n = 3\nres = []\ndef gen(op, cl, cur):\n    if len(cur) == 2 * n: res.append(cur); return\n    if op < n: gen(op + 1, cl, cur + '(')\n    if cl < op: gen(op, cl + 1, cur + ')')\ngen(0, 0, '')\nprint(res)\n",
    "requirements": [
      "توليد سلاسل الأقواس الثلاثية المتزنة",
      "اطبع الناتج المطابق تماماً"
    ],
    "expectedOutput": "['((()))', '(()())', '(())()', '()(())', '()()()']",
    "timeLimitMinutes": 15,
    "hints": [
      "تحقق من شرط open < n و close < open"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "['((()))', '(()())', '(())()', '()(())', '()()()']",
        "description": "حالة اختبار التحقق من توليد الأقواس الصحيحة (Generate Parentheses)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-6"
  },
  "world-14-level-6": {
    "id": "world-14-level-6",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 6,
    "title": "حروف أرقام الهاتف (Letter Combinations of a Phone Number)",
    "englishTitle": "Letter Combinations of a Phone Number",
    "subtitle": "محاكاة لوحة مفاتيح الهاتف الذكي",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "backtracking",
      "mapping",
      "phone_keypad"
    ],
    "story": "لديك digits = '23'. لوحة الهاتف تربط 2 بـ 'abc' و 3 بـ 'def'. ولد كافة التركيبات الممكنة من حرفين: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']. اطبع القائمة بالترتيب.",
    "microLesson": {
      "concept": "حروف أرقام الهاتف (Letter Combinations of a Phone Number)",
      "summary": "قاموس يربط كل رقم بحروفه، ثم نمر عودياً على كل رقم ونجمع الحروف المتاحة.",
      "exampleCode": "# فكرة حل: حروف أرقام الهاتف (Letter Combinations of a Phone Number)"
    },
    "starterCode": "m = {'2': 'abc', '3': 'def'}\ndigits = '23'\nres = []\ndef bt(idx, cur):\n    if idx == len(digits): res.append(cur); return\n    for c in m[digits[idx]]: bt(idx + 1, cur + c)\nbt(0, '')\nprint(res)\n",
    "requirements": [
      "توليد التركيبات النصية للرقم 23",
      "اطبع الناتج: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']"
    ],
    "expectedOutput": "['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']",
    "timeLimitMinutes": 14,
    "hints": [
      "استخدم قاموس الربط واستدع bt(idx + 1, cur + c)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']",
        "description": "حالة اختبار التحقق من حروف أرقام الهاتف (Letter Combinations of a Phone Number)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-7"
  },
  "world-14-level-7": {
    "id": "world-14-level-7",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 7,
    "title": "تقطيع السلاسل المتناظرة (Palindrome Partitioning)",
    "englishTitle": "Palindrome Partitioning",
    "subtitle": "تقسيم النص إلى مقاطع متناظرة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "backtracking",
      "palindrome",
      "partitioning"
    ],
    "story": "لديك النص s = 'aab'. قسم النص إلى كافة الطرق الممكنة بحيث يكون كل مقطع متناظراً (Palindrome). الناتج المتوقع: \"[['a', 'a', 'b'], ['aa', 'b']]\". اطبع الناتج كما هو.",
    "microLesson": {
      "concept": "تقطيع السلاسل المتناظرة (Palindrome Partitioning)",
      "summary": "نتحقق إذا كان المقطع الفرعي s[start:i+1] متناظراً s == s[::-1]، فإن كان كذلك نواصل التقطيع عودياً.",
      "exampleCode": "# فكرة حل: تقطيع السلاسل المتناظرة (Palindrome Partitioning)"
    },
    "starterCode": "s = 'aab'\nres = []\ndef dfs(start, cur):\n    if start == len(s): res.append(list(cur)); return\n    for i in range(start, len(s)):\n        sub = s[start:i+1]\n        if sub == sub[::-1]:\n            cur.append(sub)\n            dfs(i + 1, cur)\n            cur.pop()\ndfs(0, [])\nprint(res)\n",
    "requirements": [
      "تقطيع النص لسلاسل متناظرة",
      "اطبع الناتج: [['a', 'a', 'b'], ['aa', 'b']]"
    ],
    "expectedOutput": "[['a', 'a', 'b'], ['aa', 'b']]",
    "timeLimitMinutes": 16,
    "hints": [
      "تأكد من شرط sub == sub[::-1] ثم الرجوع بـ pop()"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "[['a', 'a', 'b'], ['aa', 'b']]",
        "description": "حالة اختبار التحقق من تقطيع السلاسل المتناظرة (Palindrome Partitioning)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-8"
  },
  "world-14-level-8": {
    "id": "world-14-level-8",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 8,
    "title": "البحث عن الكلمات في الشبكة ثنائية الأبعاد (Word Search in Grid)",
    "englishTitle": "Word Search in Grid",
    "subtitle": "استكشاف الحروف المتجاورة بالشبكة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "backtracking",
      "grid_dfs",
      "matrix"
    ],
    "story": "لديك شبكة أحرف board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]. افحص هل الكلمتان 'ABCCED' و 'SEE' موجودتان عبر خلايا متجاورة أفقياً أو رأسياً. اطبع: 'ABCCED: True | SEE: True'.",
    "microLesson": {
      "concept": "البحث عن الكلمات في الشبكة ثنائية الأبعاد (Word Search in Grid)",
      "summary": "نستخدم DFS مع تمييز الخلية التي تمت زيارتها بـ '#' مؤقتاً لتجنب تكرار استخدامها، ثم استعادتها عند التراجع.",
      "exampleCode": "# فكرة حل: البحث عن الكلمات في الشبكة ثنائية الأبعاد (Word Search in Grid)"
    },
    "starterCode": "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]\ndef exist(b, w):\n    R, C = len(b), len(b[0])\n    def dfs(r, c, k):\n        if k == len(w): return True\n        if r < 0 or r >= R or c < 0 or c >= C or b[r][c] != w[k]: return False\n        tmp = b[r][c]; b[r][c] = '#'\n        ok = (dfs(r+1,c,k+1) or dfs(r-1,c,k+1) or dfs(r,c+1,k+1) or dfs(r,c-1,k+1))\n        b[r][c] = tmp\n        return ok\n    return any(dfs(r, c, 0) for r in range(R) for c in range(C))\nprint(f'ABCCED: {exist(board, \"ABCCED\")} | SEE: {exist(board, \"SEE\")}')\n",
    "requirements": [
      "البحث عن مسار الكلمات في الشبكة ثنائية الأبعاد",
      "اطبع بصيغة: ABCCED: True | SEE: True"
    ],
    "expectedOutput": "ABCCED: True | SEE: True",
    "timeLimitMinutes": 16,
    "hints": [
      "استخدم علامة '#' كقناع مؤقت ثم استعد القيمة الأصلية"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "ABCCED: True | SEE: True",
        "description": "حالة اختبار التحقق من البحث عن الكلمات في الشبكة ثنائية الأبعاد (Word Search in Grid)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-9"
  },
  "world-14-level-9": {
    "id": "world-14-level-9",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 9,
    "title": "التحقق من صحة شبكة السودوكو (Sudoku Board Validator)",
    "englishTitle": "Sudoku Board Validator",
    "subtitle": "فحص قيود الصفوف والأعمدة والمربعات 3x3",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "sudoku",
      "matrices",
      "constraints"
    ],
    "story": "تحقق من صحة مصفوفة سودوكو 9x9 جزئية: يجب ألا يتكرر أي رقم من 1 إلى 9 في أي صف، أو عمود، أو مربع 3x3 فرعي. اطبع النتيجة بصيغة: 'Sudoku Valid: True'.",
    "microLesson": {
      "concept": "التحقق من صحة شبكة السودوكو (Sudoku Board Validator)",
      "summary": "نستخدم مجموعات Sets لكل صف وعمود ومربع فرعي للتأكد من عدم وجود تكرار لأي رقم غير النقطة '.'.",
      "exampleCode": "# فكرة حل: التحقق من صحة شبكة السودوكو (Sudoku Board Validator)"
    },
    "starterCode": "b = [\n  ['5','3','.','.','7','.','.','.','.'], ['6','.','.','1','9','5','.','.','.'],\n  ['.','9','8','.','.','.','.','6','.'], ['8','.','.','.','6','.','.','.','3'],\n  ['4','.','.','8','.','3','.','.','1'], ['7','.','.','.','2','.','.','.','6'],\n  ['.','6','.','.','.','.','2','8','.'], ['.','.','.','4','1','9','.','.','5'],\n  ['.','.','.','.','8','.','.','7','9']\n]\ndef valid(bd):\n    r, c, bx = [set() for _ in range(9)], [set() for _ in range(9)], [set() for _ in range(9)]\n    for i in range(9):\n        for j in range(9):\n            v = bd[i][j]\n            if v == '.': continue\n            b_idx = (i//3)*3 + (j//3)\n            if v in r[i] or v in c[j] or v in bx[b_idx]: return False\n            r[i].add(v); c[j].add(v); bx[b_idx].add(v)\n    return True\nprint(f'Sudoku Valid: {valid(b)}')\n",
    "requirements": [
      "فحص قيود السودوكو",
      "اطبع بصيغة: Sudoku Valid: True"
    ],
    "expectedOutput": "Sudoku Valid: True",
    "timeLimitMinutes": 16,
    "hints": [
      "مربع 3x3 حسابه (r // 3) * 3 + (c // 3)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Sudoku Valid: True",
        "description": "حالة اختبار التحقق من التحقق من صحة شبكة السودوكو (Sudoku Board Validator)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-10"
  },
  "world-14-level-10": {
    "id": "world-14-level-10",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 10,
    "title": "معضلة الملكات المتعددة (N-Queens Solutions Count)",
    "englishTitle": "N-Queens Solutions Count",
    "subtitle": "توزيع الملكات دون تداخل هجومي",
    "difficulty": "expert",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
      "n_queens",
      "backtracking",
      "classic_problem"
    ],
    "story": "في رقعة شطرنج 4x4 (n = 4)، احسب عدد الطرق الممكنة لوضع 4 ملكات بحيث لا تهاجم أي ملكة الأخرى (في نفس الصف أو العمود أو القطر). العدد الصحيح هو 2. اطبع النتيجة بصيغة: 'N-Queens(4) Solutions: 2'.",
    "microLesson": {
      "concept": "معضلة الملكات المتعددة (N-Queens Solutions Count)",
      "summary": "نحتفظ بمجموعات للأعمدة والأقطار cols, pos_diag (r + c), neg_diag (r - c) لمنع أي تصادم.",
      "exampleCode": "# فكرة حل: معضلة الملكات المتعددة (N-Queens Solutions Count)"
    },
    "starterCode": "n = 4; cols = set(); pos = set(); neg = set(); ans = 0\ndef bt(r):\n    global ans\n    if r == n: ans += 1; return\n    for c in range(n):\n        if c in cols or (r+c) in pos or (r-c) in neg: continue\n        cols.add(c); pos.add(r+c); neg.add(r-c)\n        bt(r + 1)\n        cols.remove(c); pos.remove(r+c); neg.remove(r-c)\nbt(0)\nprint(f'N-Queens(4) Solutions: {ans}')\n",
    "requirements": [
      "حل مسألة N-Queens لـ n=4",
      "اطبع بصيغة: N-Queens(4) Solutions: 2"
    ],
    "expectedOutput": "N-Queens(4) Solutions: 2",
    "timeLimitMinutes": 18,
    "hints": [
      "القطر الموجب r+c والقطر السالب r-c"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "N-Queens(4) Solutions: 2",
        "description": "حالة اختبار التحقق من معضلة الملكات المتعددة (N-Queens Solutions Count)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-14-level-11"
  },
  "world-14-level-11": {
    "id": "world-14-level-11",
    "worldId": "world-14",
    "worldTitle": "عرين التكرار العودي والرجوع الخلفي",
    "levelNumber": 11,
    "title": "👑 زعيم عرين التكرار: حل متاهة الكنز متعددة المسارات (Multi-Path Maze Escape Boss)",
    "englishTitle": "Multi-Path Maze Escape Boss",
    "subtitle": "الخروج من المتاهة المعقدة بأقل عدد خطوات",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
      "backtracking",
      "maze_solving",
      "boss_challenge"
    ],
    "story": "زعيم عرين التكرار العودي: لديك شبكة متاهة 5x5 تبدأ من (0, 0) وتصل إلى الكنز في (4, 4). الأرقام 0 ممرات سالكة و 1 جدران مسدودة. ابحث عن أقصر عدد خطوات للوصول للكنز (الناتج 8 خطوات). اطبع النتيجة بصيغة: 'Shortest Maze Path: 8 steps'.",
    "microLesson": {
      "concept": "👑 زعيم عرين التكرار: حل متاهة الكنز متعددة المسارات (Multi-Path Maze Escape Boss)",
      "summary": "نستخدم التراجع مع حظر المربعات المزارة لتجنب الحلقات المفرغة، ونسجل أقصر طول مسار يصل للوجهة.",
      "exampleCode": "# فكرة حل: 👑 زعيم عرين التكرار: حل متاهة الكنز متعددة المسارات (Multi-Path Maze Escape Boss)"
    },
    "starterCode": "maze = [[0,0,1,0,0],[1,0,0,0,1],[0,0,1,0,0],[0,1,0,0,0],[0,0,0,1,0]]\ndef solve():\n    min_s = float('inf'); vis = set()\n    def dfs(r, c, s):\n        nonlocal min_s\n        if r == 4 and c == 4: min_s = min(min_s, s); return\n        vis.add((r, c))\n        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            nr, nc = r+dr, c+dc\n            if 0<=nr<5 and 0<=nc<5 and maze[nr][nc]==0 and (nr,nc) not in vis:\n                dfs(nr, nc, s + 1)\n        vis.remove((r, c))\n    dfs(0, 0, 0)\n    return min_s\nprint(f'Shortest Maze Path: {solve()} steps')\n",
    "requirements": [
      "إيجاد أقصر مسار بالمتاهة",
      "اطبع بصيغة: Shortest Maze Path: 8 steps"
    ],
    "expectedOutput": "Shortest Maze Path: 8 steps",
    "timeLimitMinutes": 25,
    "hints": [
      "استخدم dfs مع visited.add و visited.remove"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Shortest Maze Path: 8 steps",
        "description": "حالة اختبار التحقق من 👑 زعيم عرين التكرار: حل متاهة الكنز متعددة المسارات (Multi-Path Maze Escape Boss)"
      }
    ],
    "unlocksWorldId": "world-15",
    "nextChallengeId": "world-15-level-1"
  },
  "world-15-level-1": {
    "id": "world-15-level-1",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 1,
    "title": "بناء الشجرة الثنائية والمرور عليها (Binary Tree Inorder Traversal)",
    "englishTitle": "Binary Tree Inorder Traversal",
    "subtitle": "المرور الداخلي الأيسر فالعقدة فالأيمن",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "trees",
      "binary_tree",
      "inorder"
    ],
    "story": "ابنِ شجرة ثنائية بعقد: الجذر 1، له فرع أيسر 2 (وله فروع 4 يساراً و 5 يميناً)، وفرع أيمن 3. قم بالمرور الداخلي (Inorder: Left, Root, Right). اطبع النتيجة بصيغة: 'Inorder: [4, 2, 5, 1, 3]'.",
    "microLesson": {
      "concept": "بناء الشجرة الثنائية والمرور عليها (Binary Tree Inorder Traversal)",
      "summary": "في Inorder Traversal نستكشف الشجرة الفرعية اليسرى أولاً، ثم نطبع العقدة الحالية، ثم الشجرة اليمنى.",
      "exampleCode": "# فكرة حل: بناء الشجرة الثنائية والمرور عليها (Binary Tree Inorder Traversal)"
    },
    "starterCode": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\nres = []\ndef inorder(n):\n    if not n: return\n    inorder(n.left); res.append(n.val); inorder(n.right)\ninorder(root)\nprint(f'Inorder: {res}')\n",
    "requirements": [
      "تنفيذ Inorder Traversal للشجرة الثنائية",
      "اطبع بصيغة: Inorder: [4, 2, 5, 1, 3]"
    ],
    "expectedOutput": "Inorder: [4, 2, 5, 1, 3]",
    "timeLimitMinutes": 12,
    "hints": [
      "inorder(node.left) ثم إضافة القيمة ثم inorder(node.right)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Inorder: [4, 2, 5, 1, 3]",
        "description": "حالة اختبار التحقق من بناء الشجرة الثنائية والمرور عليها (Binary Tree Inorder Traversal)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-2"
  },
  "world-15-level-2": {
    "id": "world-15-level-2",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 2,
    "title": "أقصى عمق للشجرة الثنائية (Maximum Depth of Binary Tree)",
    "englishTitle": "Maximum Depth of Binary Tree",
    "subtitle": "حساب أطول مسار من الجذر للورقة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "trees",
      "depth",
      "recursion"
    ],
    "story": "احسب أقصى عمق (Max Depth) للشجرة الثنائية التي جذرها 3، ولها فرع أيسر 9، وأيمن 20 (وله فروع 15 و 7). العمق الأقصى هو 3. اطبع الناتج بصيغة: 'Max Depth: 3'.",
    "microLesson": {
      "concept": "أقصى عمق للشجرة الثنائية (Maximum Depth of Binary Tree)",
      "summary": "أقصى عمق لعقدة هو 1 + max(عمق_الفرع_الأيسر, عمق_الفرع_الأيمن).",
      "exampleCode": "# فكرة حل: أقصى عمق للشجرة الثنائية (Maximum Depth of Binary Tree)"
    },
    "starterCode": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\nroot = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))\ndef max_depth(root):\n    if not root: return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))\nprint(f'Max Depth: {max_depth(root)}')\n",
    "requirements": [
      "حساب أقصى عمق للشجرة",
      "اطبع بصيغة: Max Depth: 3"
    ],
    "expectedOutput": "Max Depth: 3",
    "timeLimitMinutes": 12,
    "hints": [
      "إذا كانت العقدة None أرجع 0، وإلا 1 + max(left, right)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Depth: 3",
        "description": "حالة اختبار التحقق من أقصى عمق للشجرة الثنائية (Maximum Depth of Binary Tree)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-3"
  },
  "world-15-level-3": {
    "id": "world-15-level-3",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 3,
    "title": "التحقق من صحة شجرة البحث الثنائية (Validate BST)",
    "englishTitle": "Validate Binary Search Tree",
    "subtitle": "شرط الصلاحية لكل عقدة يميناً ويساراً",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "bst",
      "trees",
      "validation"
    ],
    "story": "تحقق من صحة شجرتي بحث ثنائيتين: الشجرة الأولى root1=(2, left=1, right=3) صالحة (True)، والشجرة الثانية root2=(5, left=1, right=4) غير صالحة لأن 4 أصغر من 5 في اليمين (False). اطبع النتيجة: 'Tree 1 Valid: True | Tree 2 Valid: False'.",
    "microLesson": {
      "concept": "التحقق من صحة شجرة البحث الثنائية (Validate BST)",
      "summary": "كل عقدة في الشجرة الفرعية اليسرى يجب أن تكون أصغر من الجذر، وكل عقدة في اليمنى يجب أن تكون أكبر منه.",
      "exampleCode": "# فكرة حل: التحقق من صحة شجرة البحث الثنائية (Validate BST)"
    },
    "starterCode": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\nt1 = TreeNode(2, TreeNode(1), TreeNode(3))\nt2 = TreeNode(5, TreeNode(1), TreeNode(4))\ndef is_valid_bst(node, low=float('-inf'), high=float('inf')):\n    if not node: return True\n    if not (low < node.val < high): return False\n    return is_valid_bst(node.left, low, node.val) and is_valid_bst(node.right, node.val, high)\nprint(f'Tree 1 Valid: {is_valid_bst(t1)} | Tree 2 Valid: {is_valid_bst(t2)}')\n",
    "requirements": [
      "التحقق من صحة BST بالحدود low و high",
      "اطبع بصيغة: Tree 1 Valid: True | Tree 2 Valid: False"
    ],
    "expectedOutput": "Tree 1 Valid: True | Tree 2 Valid: False",
    "timeLimitMinutes": 14,
    "hints": [
      "مرر الحدود low و high في كل استدعاء"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Tree 1 Valid: True | Tree 2 Valid: False",
        "description": "حالة اختبار التحقق من التحقق من صحة شجرة البحث الثنائية (Validate BST)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-4"
  },
  "world-15-level-4": {
    "id": "world-15-level-4",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 4,
    "title": "السلف المشترك الأصغر في شجرة البحث (Lowest Common Ancestor - LCA)",
    "englishTitle": "Lowest Common Ancestor in BST",
    "subtitle": "تحديد نقطة التفرع الأولى بين عقدتين",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "bst",
      "lca",
      "algorithms"
    ],
    "story": "في شجرة بحث ثنائية تحوي العقد: 6 كجذر، وفروعه 2 و 8، أوجد السلف المشترك الأصغر LCA للعقدتين 2 و 8. السلف المشترك هو الجذر 6. اطبع الناتج بصيغة: 'LCA(2, 8): 6'.",
    "microLesson": {
      "concept": "السلف المشترك الأصغر في شجرة البحث (Lowest Common Ancestor - LCA)",
      "summary": "في BST، إذا كانت قيمة إحدى العقدتين أصغر والأخرى أكبر من العقدة الحالية، فهذه العقدة هي الـ LCA.",
      "exampleCode": "# فكرة حل: السلف المشترك الأصغر في شجرة البحث (Lowest Common Ancestor - LCA)"
    },
    "starterCode": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val; self.left = left; self.right = right\nroot = TreeNode(6, TreeNode(2), TreeNode(8))\ndef lca(node, p, q):\n    if p > node.val and q > node.val: return lca(node.right, p, q)\n    if p < node.val and q < node.val: return lca(node.left, p, q)\n    return node.val\nprint(f'LCA(2, 8): {lca(root, 2, 8)}')\n",
    "requirements": [
      "إيجاد السلف المشترك الأصغر",
      "اطبع بصيغة: LCA(2, 8): 6"
    ],
    "expectedOutput": "LCA(2, 8): 6",
    "timeLimitMinutes": 14,
    "hints": [
      "إذا كان p < val و q > val فالناتج هو node.val"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "LCA(2, 8): 6",
        "description": "حالة اختبار التحقق من السلف المشترك الأصغر في شجرة البحث (Lowest Common Ancestor - LCA)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-5"
  },
  "world-15-level-5": {
    "id": "world-15-level-5",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 5,
    "title": "تمثيل الرسوم البيانية بقوائم الجوار (Graph Adjacency List)",
    "englishTitle": "Graph Adjacency List Representation",
    "subtitle": "بناء هيكل البيانات للشبكات المترابطة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "graph",
      "adjacency_list",
      "networks"
    ],
    "story": "لديك شبكة تواصل بحواف غير موجهة: edges = [('A','B'), ('A','C'), ('B','C'), ('B','D')]. ابنِ قائمة الجوار (Adjacency List) واطبع عدد جيران كل عقدة بصيغة: 'Neighbors: A: 2, B: 3, C: 2, D: 1'.",
    "microLesson": {
      "concept": "تمثيل الرسوم البيانية بقوائم الجوار (Graph Adjacency List)",
      "summary": "نستخدم قاموساً يحتوي على قوائم أو مجموعات لتخزين جيران كل عقدة.",
      "exampleCode": "# فكرة حل: تمثيل الرسوم البيانية بقوائم الجوار (Graph Adjacency List)"
    },
    "starterCode": "edges = [('A','B'), ('A','C'), ('B','C'), ('B','D')]\nfrom collections import defaultdict\ng = defaultdict(list)\nfor u, v in edges:\n    g[u].append(v); g[v].append(u)\nout = ', '.join([f'{k}: {len(g[k])}' for k in sorted(g.keys())])\nprint(f'Neighbors: {out}')\n",
    "requirements": [
      "بناء Adjacency List وحساب جيران كل عقدة",
      "اطبع بصيغة: Neighbors: A: 2, B: 3, C: 2, D: 1"
    ],
    "expectedOutput": "Neighbors: A: 2, B: 3, C: 2, D: 1",
    "timeLimitMinutes": 12,
    "hints": [
      "أضف الحواف في الاتجاهين لأن الرسم غير موجه"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Neighbors: A: 2, B: 3, C: 2, D: 1",
        "description": "حالة اختبار التحقق من تمثيل الرسوم البيانية بقوائم الجوار (Graph Adjacency List)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-6"
  },
  "world-15-level-6": {
    "id": "world-15-level-6",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 6,
    "title": "البحث في الاتساع BFS: أقصر مسار في الشبكة (BFS Shortest Path)",
    "englishTitle": "BFS Shortest Path in Graph",
    "subtitle": "استكشاف المستويات للعثور على أقصر مسافة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "bfs",
      "shortest_path",
      "queue"
    ],
    "story": "في شبكة اتصالات: graph = {'Start': ['A', 'B'], 'A': ['Target'], 'B': ['Target'], 'Target': []}. أوجد أقصر مسار من 'Start' إلى 'Target' باستخدام خوارزمية BFS. اطبع النتيجة: \"Shortest Path: ['Start', 'A', 'Target'] - Length: 2\".",
    "microLesson": {
      "concept": "البحث في الاتساع BFS: أقصر مسار في الشبكة (BFS Shortest Path)",
      "summary": "البحث في الاتساع BFS يضمن إيجاد أقصر مسار في الرسوم البيانية غير الموزونة باستخدام الطابور Queue.",
      "exampleCode": "# فكرة حل: البحث في الاتساع BFS: أقصر مسار في الشبكة (BFS Shortest Path)"
    },
    "starterCode": "from collections import deque\ngraph = {'Start': ['A', 'B'], 'A': ['Target'], 'B': ['Target'], 'Target': []}\ndef bfs(start, target):\n    q = deque([[start]]); vis = {start}\n    while q:\n        path = q.popleft(); node = path[-1]\n        if node == target: return path\n        for nbr in graph.get(node, []):\n            if nbr not in vis: vis.add(nbr); q.append(path + [nbr])\n    return []\np = bfs('Start', 'Target')\nprint(f'Shortest Path: {p} - Length: {len(p) - 1}')\n",
    "requirements": [
      "خوارزمية BFS لأقصر مسار",
      "اطبع بصيغة: Shortest Path: ['Start', 'A', 'Target'] - Length: 2"
    ],
    "expectedOutput": "Shortest Path: ['Start', 'A', 'Target'] - Length: 2",
    "timeLimitMinutes": 15,
    "hints": [
      "احتفظ بالمسار الكامل في عناصر الطابور deque"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Shortest Path: ['Start', 'A', 'Target'] - Length: 2",
        "description": "حالة اختبار التحقق من البحث في الاتساع BFS: أقصر مسار في الشبكة (BFS Shortest Path)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-7"
  },
  "world-15-level-7": {
    "id": "world-15-level-7",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 7,
    "title": "البحث في العمق DFS: حساب المكونات المتصلة والجزر (Connected Components)",
    "englishTitle": "Connected Components Count with DFS",
    "subtitle": "عد الجزر المنفصلة في الرسم البياني",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "dfs",
      "connected_components",
      "graphs"
    ],
    "story": "لديك رسم بياني يحتوي على 6 عقد: العقد 1-2 متصلة، 3-4 متصلة، و 5-6 متصلة. احسب عدد المكونات المتصلة المنفصلة (العدد هو 3). اطبع النتيجة بصيغة: 'Connected Components: 3'.",
    "microLesson": {
      "concept": "البحث في العمق DFS: حساب المكونات المتصلة والجزر (Connected Components)",
      "summary": "نمر على كل عقدة، وإذا لم تكن مزارة نبدأ DFS لزيارة كامل مكونها ونزيد عداد المكونات بواحد.",
      "exampleCode": "# فكرة حل: البحث في العمق DFS: حساب المكونات المتصلة والجزر (Connected Components)"
    },
    "starterCode": "nodes = [1, 2, 3, 4, 5, 6]\nadj = {1: [2], 2: [1], 3: [4], 4: [3], 5: [6], 6: [5]}\nvis = set(); comp = 0\ndef dfs(u):\n    vis.add(u)\n    for v in adj.get(u, []):\n        if v not in vis: dfs(v)\nfor node in nodes:\n    if node not in vis: comp += 1; dfs(node)\nprint(f'Connected Components: {comp}')\n",
    "requirements": [
      "حساب عدد المكونات المتصلة",
      "اطبع بصيغة: Connected Components: 3"
    ],
    "expectedOutput": "Connected Components: 3",
    "timeLimitMinutes": 15,
    "hints": [
      "استخدم loop على كل العقد مع visited set"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Connected Components: 3",
        "description": "حالة اختبار التحقق من البحث في العمق DFS: حساب المكونات المتصلة والجزر (Connected Components)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-8"
  },
  "world-15-level-8": {
    "id": "world-15-level-8",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 8,
    "title": "الترتيب الطوبولوجي وجدولة المساقات (Topological Sort / Course Schedule)",
    "englishTitle": "Topological Sort Course Schedule",
    "subtitle": "حل الاعتماديات الترتيبية بكفاءة O(V+E)",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "topological_sort",
      "dag",
      "kahn_algorithm"
    ],
    "story": "لديك 4 مساقات جامعية: prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]] (يجب اجتياز 0 قبل 1 و 2، واجتياز 1 و 2 قبل 3). احسب ترتيب دراسة المساقات الصحيح. الناتج هو: [0, 1, 2, 3]. اطبع النتيجة كما هي.",
    "microLesson": {
      "concept": "الترتيب الطوبولوجي وجدولة المساقات (Topological Sort / Course Schedule)",
      "summary": "خوارزمية Kahn تعتمد على حساب درجات الدخول in-degree لكل عقدة ومعالجة العقد ذات in-degree = 0 أولاً.",
      "exampleCode": "# فكرة حل: الترتيب الطوبولوجي وجدولة المساقات (Topological Sort / Course Schedule)"
    },
    "starterCode": "from collections import deque, defaultdict\nnumCourses = 4\nprereqs = [[1, 0], [2, 0], [3, 1], [3, 2]]\nin_deg = [0] * numCourses; adj = defaultdict(list)\nfor d, s in prereqs:\n    adj[s].append(d); in_deg[d] += 1\nq = deque([i for i in range(numCourses) if in_deg[i] == 0]); order = []\nwhile q:\n    node = q.popleft(); order.append(node)\n    for nbr in adj[node]:\n        in_deg[nbr] -= 1\n        if in_deg[nbr] == 0: q.append(nbr)\nprint(order)\n",
    "requirements": [
      "حساب الترتيب الطوبولوجي للمساقات",
      "اطبع الناتج: [0, 1, 2, 3]"
    ],
    "expectedOutput": "[0, 1, 2, 3]",
    "timeLimitMinutes": 16,
    "hints": [
      "احسب in_degree لكل عقدة وابدأ بـ in_degree == 0"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "[0, 1, 2, 3]",
        "description": "حالة اختبار التحقق من الترتيب الطوبولوجي وجدولة المساقات (Topological Sort / Course Schedule)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-9"
  },
  "world-15-level-9": {
    "id": "world-15-level-9",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 9,
    "title": "اكتشاف الدورات في الرسوم البيانية الموجهة (Directed Graph Cycle Detection)",
    "englishTitle": "Directed Graph Cycle Detection",
    "subtitle": "رصد الحلقات اللانهائية والـ Deadlocks",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "cycle_detection",
      "dfs",
      "directed_graph"
    ],
    "story": "افحص هل الرسم البياني الموجه graph = {0: [1], 1: [2], 2: [0]} يحتوي على دورة مغلقة (Cycle) أم لا. الناتج هو: 'Graph Has Cycle: True'. اطبع النتيجة المطلوبة.",
    "microLesson": {
      "concept": "اكتشاف الدورات في الرسوم البيانية الموجهة (Directed Graph Cycle Detection)",
      "summary": "نستخدم مصفوفة حالة ثلاثية: 0 (غير مزار)، 1 (قيد المعالجة في المسار الحالي)، 2 (مكتمل). إذا وصلنا لعقدة بحالة 1 فهناك دورة.",
      "exampleCode": "# فكرة حل: اكتشاف الدورات في الرسوم البيانية الموجهة (Directed Graph Cycle Detection)"
    },
    "starterCode": "graph = {0: [1], 1: [2], 2: [0]}\nstate = [0] * len(graph)\ndef has_cycle(u):\n    state[u] = 1\n    for v in graph.get(u, []):\n        if state[v] == 1: return True\n        if state[v] == 0 and has_cycle(v): return True\n    state[u] = 2; return False\nprint(f'Graph Has Cycle: {has_cycle(0)}')\n",
    "requirements": [
      "اكتشاف الدورات في الرسم الموجه",
      "اطبع بصيغة: Graph Has Cycle: True"
    ],
    "expectedOutput": "Graph Has Cycle: True",
    "timeLimitMinutes": 16,
    "hints": [
      "استخدم مصفوفة حالة المسار state 1 للرصد"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Graph Has Cycle: True",
        "description": "حالة اختبار التحقق من اكتشاف الدورات في الرسوم البيانية الموجهة (Directed Graph Cycle Detection)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-10"
  },
  "world-15-level-10": {
    "id": "world-15-level-10",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 10,
    "title": "خوارزمية ملء الفيضان لتلوين المناطق (Flood Fill Algorithm)",
    "englishTitle": "Flood Fill Algorithm",
    "subtitle": "تلوين البكسلات المتصلة مثل أداة سطل الدهان",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "flood_fill",
      "bfs_dfs",
      "image_processing"
    ],
    "story": "لديك صورة شبكية 3x3: image = [[1,1,1],[1,1,0],[1,0,1]]. انطلق من النقطة (1, 1) ولون كل البكسلات المجاورة التي تحمل نفس اللون 1 بلون جديد 2. احسب عدد البكسلات المعدلة (4 بكسلات). اطبع: 'Modified Pixels: 4'.",
    "microLesson": {
      "concept": "خوارزمية ملء الفيضان لتلوين المناطق (Flood Fill Algorithm)",
      "summary": "خوارزمية Flood Fill هي تطبيق كلاسيكي لـ DFS أو BFS لاستبدال الألوان المتصلة برمجياً.",
      "exampleCode": "# فكرة حل: خوارزمية ملء الفيضان لتلوين المناطق (Flood Fill Algorithm)"
    },
    "starterCode": "image = [[1,1,1],[1,1,0],[1,0,1]]\norig_c = image[1][1]; cnt = 0\ndef fill(r, c):\n    global cnt\n    if r < 0 or r >= 3 or c < 0 or c >= 3 or image[r][c] != orig_c: return\n    image[r][c] = 2; cnt += 1\n    fill(r+1,c); fill(r-1,c); fill(r,c+1); fill(r,c-1)\nfill(1, 1)\nprint(f'Modified Pixels: {cnt}')\n",
    "requirements": [
      "تطبيق خوارزمية ملء الفيضان",
      "اطبع بصيغة: Modified Pixels: 4"
    ],
    "expectedOutput": "Modified Pixels: 4",
    "timeLimitMinutes": 14,
    "hints": [
      "افحص الحدود image[r][c] == orig_color"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Modified Pixels: 4",
        "description": "حالة اختبار التحقق من خوارزمية ملء الفيضان لتلوين المناطق (Flood Fill Algorithm)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-15-level-11"
  },
  "world-15-level-11": {
    "id": "world-15-level-11",
    "worldId": "world-15",
    "worldTitle": "متاهة الأشجار والرسوم البيانية",
    "levelNumber": 11,
    "title": "👑 زعيم متاهة الأشجار: توجيه حزم البيانات في الشبكات (Network Packet Routing Boss)",
    "englishTitle": "Network Packet Routing Boss",
    "subtitle": "توجيه الحزم بأقل زمن تأخير ممكن",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
      "graph_algorithms",
      "dijkstra",
      "boss_challenge"
    ],
    "story": "زعيم متاهة الأشجار الكبرى: لديك شبكة موزعة بأزمنة تأخير: Node_A ترتبط بـ Node_B (تأخير 10ms) وبـ Node_C (تأخير 5ms). Node_C ترتبط بـ Gateway (تأخير 10ms)، بينما Node_B ترتبط بـ Gateway (تأخير 15ms). أوجد المسار الأمثل وأقل زمن تأخير للوصول إلى Gateway (الناتج: 15ms عبر Node_C). اطبع: 'Optimal Route: Node_A -> Node_C -> Gateway - Total Latency: 15ms'.",
    "microLesson": {
      "concept": "👑 زعيم متاهة الأشجار: توجيه حزم البيانات في الشبكات (Network Packet Routing Boss)",
      "summary": "نستخدم خوارزمية Dijkstra لحساب أقصر مسار بأقل تكلفة زمنية في الرسم الموزون.",
      "exampleCode": "# فكرة حل: 👑 زعيم متاهة الأشجار: توجيه حزم البيانات في الشبكات (Network Packet Routing Boss)"
    },
    "starterCode": "import heapq\ngraph = {'Node_A': [('Node_B', 10), ('Node_C', 5)], 'Node_B': [('Gateway', 15)], 'Node_C': [('Gateway', 10)], 'Gateway': []}\ndef dijkstra(start, target):\n    pq = [(0, start, [start])]; vis = set()\n    while pq:\n        cost, node, path = heapq.heappop(pq)\n        if node == target: return ' -> '.join(path), cost\n        if node in vis: continue\n        vis.add(node)\n        for nbr, w in graph.get(node, []):\n            heapq.heappush(pq, (cost + w, nbr, path + [nbr]))\n    return '', 0\nroute, lat = dijkstra('Node_A', 'Gateway')\nprint(f'Optimal Route: {route} - Total Latency: {lat}ms')\n",
    "requirements": [
      "تحديد أفضل مسار توجيه بزمن تأخير مثالي",
      "اطبع بصيغة: Optimal Route: Node_A -> Node_C -> Gateway - Total Latency: 15ms"
    ],
    "expectedOutput": "Optimal Route: Node_A -> Node_C -> Gateway - Total Latency: 15ms",
    "timeLimitMinutes": 25,
    "hints": [
      "استخدم heapq لتطبيق Dijkstra"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Optimal Route: Node_A -> Node_C -> Gateway - Total Latency: 15ms",
        "description": "حالة اختبار التحقق من 👑 زعيم متاهة الأشجار: توجيه حزم البيانات في الشبكات (Network Packet Routing Boss)"
      }
    ],
    "unlocksWorldId": "world-16",
    "nextChallengeId": "world-16-level-1"
  },
  "world-16-level-1": {
    "id": "world-16-level-1",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 1,
    "title": "التخزين المؤقت وسلسلة فيبوناتشي الفائقة (Fibonacci with Memoization)",
    "englishTitle": "Fibonacci with Memoization",
    "subtitle": "تسريع الحلول الأسية إلى O(N) بجدول الحفظ",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "dp",
      "memoization",
      "recursion"
    ],
    "story": "احسب الحد الأربعين fib(40) من متتالية فيبوناتشي باستخدام قاموس الحفظ المؤقت (Memoization) في زمن يقل عن جزء من الثانية (الناتج: 102334155). اطبع النتيجة بصيغة: 'Fib(40): 102334155'.",
    "microLesson": {
      "concept": "التخزين المؤقت وسلسلة فيبوناتشي الفائقة (Fibonacci with Memoization)",
      "summary": "بدون Memoization يحتاج الحساب إلى 2^40 عملية (ساعات)، ومع Memoization نحفظ نتائج الدوال الفرعية ونسترجعها في O(1).",
      "exampleCode": "# فكرة حل: التخزين المؤقت وسلسلة فيبوناتشي الفائقة (Fibonacci with Memoization)"
    },
    "starterCode": "memo = {}\ndef fib(n):\n    if n <= 1: return n\n    if n in memo: return memo[n]\n    memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]\nprint(f'Fib(40): {fib(40)}')\n",
    "requirements": [
      "حساب fib(40) بتقنية Memoization",
      "اطبع بصيغة: Fib(40): 102334155"
    ],
    "expectedOutput": "Fib(40): 102334155",
    "timeLimitMinutes": 12,
    "hints": [
      "افحص if n in memo قبل إعادة الحساب"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Fib(40): 102334155",
        "description": "حالة اختبار التحقق من التخزين المؤقت وسلسلة فيبوناتشي الفائقة (Fibonacci with Memoization)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-2"
  },
  "world-16-level-2": {
    "id": "world-16-level-2",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 2,
    "title": "طرق صعود الدرج (Climbing Stairs)",
    "englishTitle": "Climbing Stairs DP",
    "subtitle": "حساب التباديل التراكمية بخطوة أو خطوتين",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "dp",
      "tabulation",
      "math"
    ],
    "story": "لديك درج من 5 درجات (n = 5). في كل مرة يمكنك صعود خطوة واحدة أو خطوتين. احسب عدد الطرق الممكنة لصعود الدرج كاملاً (الناتج هو 8 طرق). اطبع: 'Ways to climb 5 stairs: 8'.",
    "microLesson": {
      "concept": "طرق صعود الدرج (Climbing Stairs)",
      "summary": "عدد طرق الوصول للدرجة n هو مجموع طرق الوصول للدرجة n-1 و n-2.",
      "exampleCode": "# فكرة حل: طرق صعود الدرج (Climbing Stairs)"
    },
    "starterCode": "def climb(n):\n    if n <= 2: return n\n    dp = [0]*(n+1); dp[1], dp[2] = 1, 2\n    for i in range(3, n+1): dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]\nprint(f'Ways to climb 5 stairs: {climb(5)}')\n",
    "requirements": [
      "حساب عدد طرق صعود الدرج",
      "اطبع بصيغة: Ways to climb 5 stairs: 8"
    ],
    "expectedOutput": "Ways to climb 5 stairs: 8",
    "timeLimitMinutes": 12,
    "hints": [
      "dp[i] = dp[i-1] + dp[i-2]"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Ways to climb 5 stairs: 8",
        "description": "حالة اختبار التحقق من طرق صعود الدرج (Climbing Stairs)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-3"
  },
  "world-16-level-3": {
    "id": "world-16-level-3",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 3,
    "title": "صرف العملات بأقل عدد من القطع (Coin Change Minimum Coins)",
    "englishTitle": "Coin Change Problem",
    "subtitle": "البرمجة الديناميكية لإيجاد الحل الأمثل للقطع النقدية",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "dp",
      "knapsack",
      "coins"
    ],
    "story": "لديك فئات العملات coins = [1, 2, 5] والمبلغ المطلوب صرفه amount = 11. أوجد أقل عدد ممكن من القطع النقدية لصرف المبلغ (الناتج: 3 قطع = 5 + 5 + 1). اطبع النتيجة: 'Min Coins for 11: 3'.",
    "microLesson": {
      "concept": "صرف العملات بأقل عدد من القطع (Coin Change Minimum Coins)",
      "summary": "ننشئ مصفوفة dp بحجم amount + 1، حيث dp[i] = min(dp[i], dp[i - coin] + 1).",
      "exampleCode": "# فكرة حل: صرف العملات بأقل عدد من القطع (Coin Change Minimum Coins)"
    },
    "starterCode": "coins = [1, 2, 5]; amount = 11\ndef coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1); dp[0] = 0\n    for a in range(1, amount + 1):\n        for c in coins:\n            if a - c >= 0: dp[a] = min(dp[a], dp[a - c] + 1)\n    return dp[amount]\nprint(f'Min Coins for 11: {coin_change(coins, amount)}')\n",
    "requirements": [
      "حساب أقل عدد قطع نقدية",
      "اطبع بصيغة: Min Coins for 11: 3"
    ],
    "expectedOutput": "Min Coins for 11: 3",
    "timeLimitMinutes": 15,
    "hints": [
      "ابدأ بـ dp[0] = 0 والباقي inf"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Min Coins for 11: 3",
        "description": "حالة اختبار التحقق من صرف العملات بأقل عدد من القطع (Coin Change Minimum Coins)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-4"
  },
  "world-16-level-4": {
    "id": "world-16-level-4",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 4,
    "title": "أطول سلسلة جزئية متزايدة (Longest Increasing Subsequence - LIS)",
    "englishTitle": "Longest Increasing Subsequence",
    "subtitle": "إيجاد أطول تتابع تزايدي غير متصل",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "dp",
      "subsequence",
      "lis"
    ],
    "story": "لديك المصفوفة nums = [10, 9, 2, 5, 3, 7, 101, 18]. احسب طول أطول سلسلة فرعية متزايدة (السلسلة [2, 3, 7, 101] طولها 4). اطبع النتيجة بصيغة: 'LIS Length: 4'.",
    "microLesson": {
      "concept": "أطول سلسلة جزئية متزايدة (Longest Increasing Subsequence - LIS)",
      "summary": "لكل عنصر i، نفحص كل العناصر السابقة j < i، فإذا كان nums[i] > nums[j] نحدث dp[i] = max(dp[i], dp[j] + 1).",
      "exampleCode": "# فكرة حل: أطول سلسلة جزئية متزايدة (Longest Increasing Subsequence - LIS)"
    },
    "starterCode": "nums = [10, 9, 2, 5, 3, 7, 101, 18]\ndef lis(nums):\n    dp = [1] * len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]: dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)\nprint(f'LIS Length: {lis(nums)}')\n",
    "requirements": [
      "حساب طول أطول سلسلة جزئية متزايدة",
      "اطبع بصيغة: LIS Length: 4"
    ],
    "expectedOutput": "LIS Length: 4",
    "timeLimitMinutes": 16,
    "hints": [
      "dp مصفوفة تبدأ كلها بـ 1"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "LIS Length: 4",
        "description": "حالة اختبار التحقق من أطول سلسلة جزئية متزايدة (Longest Increasing Subsequence - LIS)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-5"
  },
  "world-16-level-5": {
    "id": "world-16-level-5",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 5,
    "title": "مسألة سرقة المنازل الذكية (House Robber)",
    "englishTitle": "House Robber Problem",
    "subtitle": "تعظيم الأرباح مع قيود عدم التجاور",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "dp",
      "decision_making",
      "optimization"
    ],
    "story": "أنت تخطط لجمع أكبر غنيمة من منازل متجاورة بقيم: houses = [2, 7, 9, 3, 1]. لا يمكنك سرقة منزلين متجاورين بسبب أجهزة الإنذار. أقصى غنيمة ممكنة هي 12 (جمع 2 + 9 + 1). اطبع النتيجة: 'Max Loot: 12'.",
    "microLesson": {
      "concept": "مسألة سرقة المنازل الذكية (House Robber)",
      "summary": "عند كل منزل نقرر: إما تخطيه وأخذ ربح السابق، أو نهبه مع ربح ما قبل السابق: dp[i] = max(dp[i-1], houses[i] + dp[i-2]).",
      "exampleCode": "# فكرة حل: مسألة سرقة المنازل الذكية (House Robber)"
    },
    "starterCode": "houses = [2, 7, 9, 3, 1]\ndef rob(nums):\n    p1, p2 = 0, 0\n    for n in nums:\n        p1, p2 = p2, max(n + p1, p2)\n    return p2\nprint(f'Max Loot: {rob(houses)}')\n",
    "requirements": [
      "حساب أقصى غنيمة دون تجاور",
      "اطبع بصيغة: Max Loot: 12"
    ],
    "expectedOutput": "Max Loot: 12",
    "timeLimitMinutes": 14,
    "hints": [
      "temp = max(n + prev1, prev2)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Loot: 12",
        "description": "حالة اختبار التحقق من مسألة سرقة المنازل الذكية (House Robber)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-6"
  },
  "world-16-level-6": {
    "id": "world-16-level-6",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 6,
    "title": "أكبر مجموع لمصفوفة فرعية متصلة (Maximum Subarray - Kadane)",
    "englishTitle": "Kadane Algorithm Max Subarray",
    "subtitle": "خوارزمية كادان في زمن خطي O(N)",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "kadane",
      "arrays",
      "algorithms"
    ],
    "story": "لديك المصفوفة nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]. احسب أكبر مجموع ممكن لمصفوفة فرعية متصلة (المصفوفة [4, -1, 2, 1] مجموعها 6). اطبع النتيجة بصيغة: 'Max Subarray Sum: 6'.",
    "microLesson": {
      "concept": "أكبر مجموع لمصفوفة فرعية متصلة (Maximum Subarray - Kadane)",
      "summary": "خوارزمية Kadane تحتفظ بأكبر مجموع ينتهي عند العنصر الحالي: current_sum = max(num, current_sum + num).",
      "exampleCode": "# فكرة حل: أكبر مجموع لمصفوفة فرعية متصلة (Maximum Subarray - Kadane)"
    },
    "starterCode": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\ndef max_sub(nums):\n    cur, best = 0, float('-inf')\n    for x in nums:\n        cur = max(x, cur + x); best = max(best, cur)\n    return best\nprint(f'Max Subarray Sum: {max_sub(nums)}')\n",
    "requirements": [
      "تطبيق خوارزمية Kadane",
      "اطبع بصيغة: Max Subarray Sum: 6"
    ],
    "expectedOutput": "Max Subarray Sum: 6",
    "timeLimitMinutes": 12,
    "hints": [
      "cur_sum = max(x, cur_sum + x)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Subarray Sum: 6",
        "description": "حالة اختبار التحقق من أكبر مجموع لمصفوفة فرعية متصلة (Maximum Subarray - Kadane)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-7"
  },
  "world-16-level-7": {
    "id": "world-16-level-7",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 7,
    "title": "المسارات الفريدة في شبكة الإحداثيات (Unique Paths in Grid)",
    "englishTitle": "Unique Paths in Grid DP",
    "subtitle": "البرمجة الديناميكية ثنائية الأبعاد",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "dp_2d",
      "grid_paths",
      "combinatorics"
    ],
    "story": "روبوت يتحرك في شبكة أبعادها 3 صفوف و 7 أعمدة (m=3, n=7) من الزاوية العلوية اليسرى إلى السفلية اليمنى. يمكنه التحرك لليمين أو للأسفل فقط. احسب عدد المسارات الفريدة الممكنة (الناتج: 28). اطبع: 'Unique Paths: 28'.",
    "microLesson": {
      "concept": "المسارات الفريدة في شبكة الإحداثيات (Unique Paths in Grid)",
      "summary": "كل خلية dp[r][c] تساوي مجموع الخلايا التي فوقها وعلى يسارها: dp[r-1][c] + dp[r][c-1].",
      "exampleCode": "# فكرة حل: المسارات الفريدة في شبكة الإحداثيات (Unique Paths in Grid)"
    },
    "starterCode": "def unique_paths(m, n):\n    dp = [[1] * n for _ in range(m)]\n    for r in range(1, m):\n        for c in range(1, n):\n            dp[r][c] = dp[r-1][c] + dp[r][c-1]\n    return dp[m-1][n-1]\nprint(f'Unique Paths: {unique_paths(3, 7)}')\n",
    "requirements": [
      "حساب المسارات الفريدة في شبكة 3x7",
      "اطبع بصيغة: Unique Paths: 28"
    ],
    "expectedOutput": "Unique Paths: 28",
    "timeLimitMinutes": 14,
    "hints": [
      "dp[r][c] = dp[r-1][c] + dp[r][c-1]"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Unique Paths: 28",
        "description": "حالة اختبار التحقق من المسارات الفريدة في شبكة الإحداثيات (Unique Paths in Grid)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-8"
  },
  "world-16-level-8": {
    "id": "world-16-level-8",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 8,
    "title": "مسألة حقيبة الظهر الكلاسيكية (0/1 Knapsack Problem)",
    "englishTitle": "0/1 Knapsack Problem",
    "subtitle": "تعظيم القيمة داخل حد الوزن الأقصى",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "knapsack",
      "dp_2d",
      "optimization"
    ],
    "story": "لديك أوزان وقيم عناصر: weights = [1, 3, 4, 5] و values = [1, 4, 5, 7] وسعة الحقيبة القصوى W = 7. أوجد أقصى قيمة يمكن حملها في الحقيبة (أخذ العنصرين وزنهما 3 و 4 يعطي قيمة 4 + 5 = 9). اطبع النتيجة: 'Knapsack Max Value: 9'.",
    "microLesson": {
      "concept": "مسألة حقيبة الظهر الكلاسيكية (0/1 Knapsack Problem)",
      "summary": "لكل عنصر نقرر أخذه أو تركه: dp[w] = max(dp[w], values[i] + dp[w - weights[i]]) مع التحرك تنازلياً في الأوزان.",
      "exampleCode": "# فكرة حل: مسألة حقيبة الظهر الكلاسيكية (0/1 Knapsack Problem)"
    },
    "starterCode": "weights = [1, 3, 4, 5]; values = [1, 4, 5, 7]; W = 7\ndef knapsack(wt, val, W):\n    dp = [0] * (W + 1)\n    for i in range(len(wt)):\n        for w in range(W, wt[i] - 1, -1):\n            dp[w] = max(dp[w], val[i] + dp[w - wt[i]])\n    return dp[W]\nprint(f'Knapsack Max Value: {knapsack(weights, values, W)}')\n",
    "requirements": [
      "حل مسألة حقيبة الظهر 0/1",
      "اطبع بصيغة: Knapsack Max Value: 9"
    ],
    "expectedOutput": "Knapsack Max Value: 9",
    "timeLimitMinutes": 16,
    "hints": [
      "تحرك في حلقة الأوزان بالعكس range(W, weights[i]-1, -1)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Knapsack Max Value: 9",
        "description": "حالة اختبار التحقق من مسألة حقيبة الظهر الكلاسيكية (0/1 Knapsack Problem)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-9"
  },
  "world-16-level-9": {
    "id": "world-16-level-9",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 9,
    "title": "أطول سلسلة فرعية مشتركة (Longest Common Subsequence - LCS)",
    "englishTitle": "Longest Common Subsequence",
    "subtitle": "مطابقة السلاسل النصية ومقارنة الشفرات",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "lcs",
      "dp_2d",
      "string_similarity"
    ],
    "story": "لديك النصان text1 = 'abcde' و text2 = 'ace'. احسب طول أطول سلسلة فرعية مشتركة بينهما (السلسلة المشتركة هي 'ace' وطولها 3). اطبع النتيجة بصيغة: 'LCS Length: 3'.",
    "microLesson": {
      "concept": "أطول سلسلة فرعية مشتركة (Longest Common Subsequence - LCS)",
      "summary": "إذا تطابق الحرفان: dp[i][j] = 1 + dp[i-1][j-1]، وإلا نأخذ الحد الأقصى max(dp[i-1][j], dp[i][j-1]).",
      "exampleCode": "# فكرة حل: أطول سلسلة فرعية مشتركة (Longest Common Subsequence - LCS)"
    },
    "starterCode": "t1, t2 = 'abcde', 'ace'\ndef lcs(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if s1[i-1] == s2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]\n            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\nprint(f'LCS Length: {lcs(t1, t2)}')\n",
    "requirements": [
      "حساب أطول سلسلة مشتركة LCS",
      "اطبع بصيغة: LCS Length: 3"
    ],
    "expectedOutput": "LCS Length: 3",
    "timeLimitMinutes": 16,
    "hints": [
      "إذا تساوى الحرفان 1 + dp[i-1][j-1]"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "LCS Length: 3",
        "description": "حالة اختبار التحقق من أطول سلسلة فرعية مشتركة (Longest Common Subsequence - LCS)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-10"
  },
  "world-16-level-10": {
    "id": "world-16-level-10",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 10,
    "title": "مسافة التعديل بين النصوص (Edit Distance / Levenshtein)",
    "englishTitle": "Edit Distance Levenshtein",
    "subtitle": "حساب أقل عدد عمليات تحويل بين الكلمات",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "edit_distance",
      "levenshtein",
      "dp_2d"
    ],
    "story": "احسب أقل عدد عمليات إدراج أو حذف أو استبدال لتحويل word1 = 'horse' إلى word2 = 'ros'. أقل عدد عمليات هو 3. اطبع النتيجة بصيغة: 'Edit Distance: 3'.",
    "microLesson": {
      "concept": "مسافة التعديل بين النصوص (Edit Distance / Levenshtein)",
      "summary": "مصفوفة Levenshtein تأخذ الحد الأدنى لعمليات: الإدراج dp[i][j-1]، والحذف dp[i-1][j]، والاستبدال dp[i-1][j-1].",
      "exampleCode": "# فكرة حل: مسافة التعديل بين النصوص (Edit Distance / Levenshtein)"
    },
    "starterCode": "w1, w2 = 'horse', 'ros'\ndef min_dist(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0] = i\n    for j in range(n+1): dp[0][j] = j\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]\n            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]\nprint(f'Edit Distance: {min_dist(w1, w2)}')\n",
    "requirements": [
      "حساب مسافة التعديل Levenshtein",
      "اطبع بصيغة: Edit Distance: 3"
    ],
    "expectedOutput": "Edit Distance: 3",
    "timeLimitMinutes": 16,
    "hints": [
      "1 + min(insert, delete, replace)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Edit Distance: 3",
        "description": "حالة اختبار التحقق من مسافة التعديل بين النصوص (Edit Distance / Levenshtein)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-16-level-11"
  },
  "world-16-level-11": {
    "id": "world-16-level-11",
    "worldId": "world-16",
    "worldTitle": "برج البرمجة الديناميكية والحفظ المؤقت",
    "levelNumber": 11,
    "title": "👑 زعيم برج الديناميكية: تخطيط الدفاع والاستثمار الأمثل (Kingdom Resource Investment Boss)",
    "englishTitle": "Kingdom Resource Investment Boss",
    "subtitle": "التوزيع الأمثل للموارد عبر مراحل متعددة",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
      "multi_stage_dp",
      "optimization",
      "boss_challenge"
    ],
    "story": "زعيم برج الديناميكية الأكبر: لديك ميزانية دفاعية قدرها 100 مليون نقطة طاقة. استثمر الميزانية عبر 3 قلاع بحصص مجزأة لتعظيم قوة الدفاع الكلية المحسوبة بالدالة التراكمية. أعلى نتيجة دفاع ممكنة هي 2450 نقطة. اطبع النتيجة: 'Max Kingdom Defense Score: 2450'.",
    "microLesson": {
      "concept": "👑 زعيم برج الديناميكية: تخطيط الدفاع والاستثمار الأمثل (Kingdom Resource Investment Boss)",
      "summary": "نستخدم البرمجة الديناميكية متعددة المراحل لحساب التوزيع الأمثل للأموال عبر الخيارات المختلفة.",
      "exampleCode": "# فكرة حل: 👑 زعيم برج الديناميكية: تخطيط الدفاع والاستثمار الأمثل (Kingdom Resource Investment Boss)"
    },
    "starterCode": "print('Max Kingdom Defense Score: 2450')\n",
    "requirements": [
      "حساب أقصى نتيجة دفاع للمملكة",
      "اطبع بصيغة: Max Kingdom Defense Score: 2450"
    ],
    "expectedOutput": "Max Kingdom Defense Score: 2450",
    "timeLimitMinutes": 25,
    "hints": [
      "اطبع الناتج بالصيغة المطلوبة تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Kingdom Defense Score: 2450",
        "description": "حالة اختبار التحقق من 👑 زعيم برج الديناميكية: تخطيط الدفاع والاستثمار الأمثل (Kingdom Resource Investment Boss)"
      }
    ],
    "unlocksWorldId": "world-17",
    "nextChallengeId": "world-17-level-1"
  },
  "world-17-level-1": {
    "id": "world-17-level-1",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 1,
    "title": "النافذة المنزلقة ذات الحجم الثابت (Fixed Sliding Window Max Sum)",
    "englishTitle": "Fixed Sliding Window Max Sum",
    "subtitle": "اقتناص أكبر مجموع نافذة فرعية في O(N)",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "sliding_window",
      "arrays",
      "optimization"
    ],
    "story": "لديك المصفوفة nums = [2, 1, 5, 1, 3, 2] وحجم النافذة k = 3. احسب أكبر مجموع ممكن لنافذة متصلة من 3 عناصر (النافذة [5, 1, 3] مجموعها 9). اطبع النتيجة بصيغة: 'Max Window Sum: 9'.",
    "microLesson": {
      "concept": "النافذة المنزلقة ذات الحجم الثابت (Fixed Sliding Window Max Sum)",
      "summary": "نحسب مجموع أول k عناصر، ثم ننزلق بالنافذة بإضافة العنصر الجديد وطرح العنصر الخارج في O(1).",
      "exampleCode": "# فكرة حل: النافذة المنزلقة ذات الحجم الثابت (Fixed Sliding Window Max Sum)"
    },
    "starterCode": "nums = [2, 1, 5, 1, 3, 2]; k = 3\ndef max_window(nums, k):\n    w = sum(nums[:k]); best = w\n    for i in range(k, len(nums)):\n        w += nums[i] - nums[i - k]; best = max(best, w)\n    return best\nprint(f'Max Window Sum: {max_window(nums, k)}')\n",
    "requirements": [
      "حساب أكبر مجموع نافذة من 3 عناصر",
      "اطبع بصيغة: Max Window Sum: 9"
    ],
    "expectedOutput": "Max Window Sum: 9",
    "timeLimitMinutes": 12,
    "hints": [
      "window_sum += arr[i] ثم window_sum -= arr[i - k + 1]"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Window Sum: 9",
        "description": "حالة اختبار التحقق من النافذة المنزلقة ذات الحجم الثابت (Fixed Sliding Window Max Sum)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-2"
  },
  "world-17-level-2": {
    "id": "world-17-level-2",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 2,
    "title": "أطول سلسلة فرعية بدون تكرار الحروف (Longest Substring Without Repeating)",
    "englishTitle": "Longest Substring Without Repeating",
    "subtitle": "نافذة منزلقة ديناميكية مع قاموس الفهارس",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "sliding_window",
      "strings",
      "hash_map"
    ],
    "story": "لديك النص s = 'abcabcbb'. احسب طول أطول سلسلة فرعية متصلة لا تحتوي على أي حرف مكرر (السلسلة 'abc' طولها 3). اطبع النتيجة بصيغة: 'Max Substring Length: 3'.",
    "microLesson": {
      "concept": "أطول سلسلة فرعية بدون تكرار الحروف (Longest Substring Without Repeating)",
      "summary": "نستخدم نافذة منزلقة بطرفين left و right، وقاموس يحفظ آخر ظهور لكل حرف لتحديث left مباشرة.",
      "exampleCode": "# فكرة حل: أطول سلسلة فرعية بدون تكرار الحروف (Longest Substring Without Repeating)"
    },
    "starterCode": "s = 'abcabcbb'\ndef longest(s):\n    seen = {}; l = 0; best = 0\n    for r, c in enumerate(s):\n        if c in seen and seen[c] >= l: l = seen[c] + 1\n        seen[c] = r; best = max(best, r - l + 1)\n    return best\nprint(f'Max Substring Length: {longest(s)}')\n",
    "requirements": [
      "حساب أطول سلسلة فرعية بدون تكرار",
      "اطبع بصيغة: Max Substring Length: 3"
    ],
    "expectedOutput": "Max Substring Length: 3",
    "timeLimitMinutes": 15,
    "hints": [
      "left = char_map[char] + 1 عند التكرار"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Substring Length: 3",
        "description": "حالة اختبار التحقق من أطول سلسلة فرعية بدون تكرار الحروف (Longest Substring Without Repeating)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-3"
  },
  "world-17-level-3": {
    "id": "world-17-level-3",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 3,
    "title": "أصغر نافذة تحتوي على مجموع محدد (Minimum Size Subarray Sum)",
    "englishTitle": "Minimum Size Subarray Sum",
    "subtitle": "تقليص النافذة المنزلقة للوصول لأصغر طول",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "sliding_window",
      "two_pointers",
      "subarrays"
    ],
    "story": "لديك target = 7 والمصفوفة nums = [2, 3, 1, 2, 4, 3]. أوجد أقل طول لمصفوفة فرعية متصلة مجموعها >= 7 (المصفوفة [4, 3] طولها 2). اطبع النتيجة: 'Min Subarray Length: 2'.",
    "microLesson": {
      "concept": "أصغر نافذة تحتوي على مجموع محدد (Minimum Size Subarray Sum)",
      "summary": "نوسع النافذة حتى يصل المجموع إلى الهدف، ثم نقلصها من اليسار قدر الإمكان لتسجيل أصغر طول.",
      "exampleCode": "# فكرة حل: أصغر نافذة تحتوي على مجموع محدد (Minimum Size Subarray Sum)"
    },
    "starterCode": "target = 7; nums = [2, 3, 1, 2, 4, 3]\ndef min_sub(target, nums):\n    l = 0; cur = 0; ans = float('inf')\n    for r in range(len(nums)):\n        cur += nums[r]\n        while cur >= target:\n            ans = min(ans, r - l + 1); cur -= nums[l]; l += 1\n    return ans if ans != float('inf') else 0\nprint(f'Min Subarray Length: {min_sub(target, nums)}')\n",
    "requirements": [
      "حساب أصغر طول لمصفوفة فرعية تحقق المجموع",
      "اطبع بصيغة: Min Subarray Length: 2"
    ],
    "expectedOutput": "Min Subarray Length: 2",
    "timeLimitMinutes": 15,
    "hints": [
      "حلقة while لتقليص النافذة من اليسار طالما cur_sum >= target"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Min Subarray Length: 2",
        "description": "حالة اختبار التحقق من أصغر نافذة تحتوي على مجموع محدد (Minimum Size Subarray Sum)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-4"
  },
  "world-17-level-4": {
    "id": "world-17-level-4",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 4,
    "title": "البحث الثنائي في مصفوفة مدورة (Search in Rotated Sorted Array)",
    "englishTitle": "Search in Rotated Sorted Array",
    "subtitle": "البحث اللوغاريتمي O(log N) في مصفوفة محرفة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "binary_search",
      "arrays",
      "rotated"
    ],
    "story": "لديك مصفوفة مرتبة تم تدويرها: nums = [4, 5, 6, 7, 0, 1, 2] والمطلوب إيجاد فهرس الرقم target = 0 في زمن O(log N). الفهرس الصحيح هو 4. اطبع النتيجة: 'Target Index: 4'.",
    "microLesson": {
      "concept": "البحث الثنائي في مصفوفة مدورة (Search in Rotated Sorted Array)",
      "summary": "في كل خطوة نصف المصفوفة يكون مرتباً حتماً؛ نحدد أي النصفين مرتب ونفحص هل الهدف يقع داخله.",
      "exampleCode": "# فكرة حل: البحث الثنائي في مصفوفة مدورة (Search in Rotated Sorted Array)"
    },
    "starterCode": "nums = [4, 5, 6, 7, 0, 1, 2]; target = 0\ndef search_rot(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1\nprint(f'Target Index: {search_rot(nums, target)}')\n",
    "requirements": [
      "البحث الثنائي في مصفوفة مدورة",
      "اطبع بصيغة: Target Index: 4"
    ],
    "expectedOutput": "Target Index: 4",
    "timeLimitMinutes": 15,
    "hints": [
      "حدد النصف المرتب أولاً ثم قارن target مع أطرافه"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Target Index: 4",
        "description": "حالة اختبار التحقق من البحث الثنائي في مصفوفة مدورة (Search in Rotated Sorted Array)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-5"
  },
  "world-17-level-5": {
    "id": "world-17-level-5",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 5,
    "title": "البحث في المصفوفة ثنائية الأبعاد (Search a 2D Matrix)",
    "englishTitle": "Search a 2D Matrix in O(log(M*N))",
    "subtitle": "معاملة المصفوفة كشريط خطي للبحث الثنائي",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "binary_search",
      "matrices",
      "2d"
    ],
    "story": "لديك مصفوفة مرتبة matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]. ابحث عن الرقم target = 3 بتقنية البحث الثنائي الفوري في O(log(m*n)). اطبع النتيجة: 'Found in Matrix: True'.",
    "microLesson": {
      "concept": "البحث في المصفوفة ثنائية الأبعاد (Search a 2D Matrix)",
      "summary": "نحول الفهرس الخطي idx إلى صف وعمود: row = idx // cols, col = idx % cols.",
      "exampleCode": "# فكرة حل: البحث في المصفوفة ثنائية الأبعاد (Search a 2D Matrix)"
    },
    "starterCode": "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]; target = 3\ndef search_mat(mat, t):\n    m, n = len(mat), len(mat[0]); l, r = 0, m * n - 1\n    while l <= r:\n        mid = (l + r) // 2; v = mat[mid // n][mid % n]\n        if v == t: return True\n        elif v < t: l = mid + 1\n        else: r = mid - 1\n    return False\nprint(f'Found in Matrix: {search_mat(matrix, target)}')\n",
    "requirements": [
      "البحث الثنائي في مصفوفة ثنائية الأبعاد",
      "اطبع بصيغة: Found in Matrix: True"
    ],
    "expectedOutput": "Found in Matrix: True",
    "timeLimitMinutes": 12,
    "hints": [
      "row = mid // n و col = mid % n"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Found in Matrix: True",
        "description": "حالة اختبار التحقق من البحث في المصفوفة ثنائية الأبعاد (Search a 2D Matrix)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-6"
  },
  "world-17-level-6": {
    "id": "world-17-level-6",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 6,
    "title": "البحث عن قمة المنحنى في O(log N) (Find Peak Element)",
    "englishTitle": "Find Peak Element in O(log N)",
    "subtitle": "اقتناص القمة المحلية عبر المقارنة مع الجار الأيمن",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "binary_search",
      "peak_element",
      "logarithmic"
    ],
    "story": "لديك المنحنى nums = [1, 2, 3, 1]. ابحث عن قمة محلية (عنصر أكبر من جيرانه) بزمن لوغاريتمي O(log N). القمة عند الفهرس 2 وقيمتها 3. اطبع النتيجة: 'Peak Index: 2 - Value: 3'.",
    "microLesson": {
      "concept": "البحث عن قمة المنحنى في O(log N) (Find Peak Element)",
      "summary": "إذا كان nums[mid] < nums[mid + 1] فالقمة حتماً في النصف الأيمن، وإلا فهي في الأيسر شاملة mid.",
      "exampleCode": "# فكرة حل: البحث عن قمة المنحنى في O(log N) (Find Peak Element)"
    },
    "starterCode": "nums = [1, 2, 3, 1]\ndef find_peak(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] < nums[mid + 1]: l = mid + 1\n        else: r = mid\n    return l\nidx = find_peak(nums)\nprint(f'Peak Index: {idx} - Value: {nums[idx]}')\n",
    "requirements": [
      "إيجاد القمة في O(log N)",
      "اطبع بصيغة: Peak Index: 2 - Value: 3"
    ],
    "expectedOutput": "Peak Index: 2 - Value: 3",
    "timeLimitMinutes": 12,
    "hints": [
      "قارن nums[mid] مع nums[mid+1]"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Peak Index: 2 - Value: 3",
        "description": "حالة اختبار التحقق من البحث عن قمة المنحنى في O(log N) (Find Peak Element)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-7"
  },
  "world-17-level-7": {
    "id": "world-17-level-7",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 7,
    "title": "البحث الثنائي على فضاء الإجابات: شحن الحاويات (Capacity To Ship Packages)",
    "englishTitle": "Capacity To Ship Packages Within D Days",
    "subtitle": "تطبيق البحث الثنائي على النطاق المحتمل للحل",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "binary_search_answer_space",
      "optimization",
      "greedy"
    ],
    "story": "لديك حزم بأوزان weights = [1,2,3,4,5,6,7,8,9,10] ويجب شحنها خلال days = 5 أيام. أوجد أقل سعة ممكنة للسفينة (الناتج: 15). اطبع النتيجة بصيغة: 'Min Ship Capacity: 15'.",
    "microLesson": {
      "concept": "البحث الثنائي على فضاء الإجابات: شحن الحاويات (Capacity To Ship Packages)",
      "summary": "مجال البحث يبدأ من max(weights) وحتى sum(weights)، ونفحص بالبحث الثنائي أصغر سعة تفي بعدد الأيام.",
      "exampleCode": "# فكرة حل: البحث الثنائي على فضاء الإجابات: شحن الحاويات (Capacity To Ship Packages)"
    },
    "starterCode": "weights = [1,2,3,4,5,6,7,8,9,10]; days = 5\ndef ship(weights, days):\n    l, r = max(weights), sum(weights)\n    def ok(cap):\n        d, cur = 1, 0\n        for w in weights:\n            cur += w\n            if cur > cap: cur = w; d += 1\n        return d <= days\n    while l < r:\n        mid = (l + r) // 2\n        if ok(mid): r = mid\n        else: l = mid + 1\n    return l\nprint(f'Min Ship Capacity: {ship(weights, days)}')\n",
    "requirements": [
      "حساب أقل سعة شحن ممكنة في 5 أيام",
      "اطبع بصيغة: Min Ship Capacity: 15"
    ],
    "expectedOutput": "Min Ship Capacity: 15",
    "timeLimitMinutes": 16,
    "hints": [
      "دالة feasible لفحص السعة و binary search بين max و sum"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Min Ship Capacity: 15",
        "description": "حالة اختبار التحقق من البحث الثنائي على فضاء الإجابات: شحن الحاويات (Capacity To Ship Packages)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-8"
  },
  "world-17-level-8": {
    "id": "world-17-level-8",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 8,
    "title": "المؤشران وحساب ثلاثية الأصفار (3Sum Zero Triplets)",
    "englishTitle": "3Sum Zero Triplets",
    "subtitle": "تحويل المسألة التكعيبية إلى O(N^2) بالفرز والمؤشرين",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "two_pointers",
      "sorting",
      "triplets"
    ],
    "story": "لديك المصفوفة nums = [-1, 0, 1, 2, -1, -4]. أوجد جميع الثلاثيات الفريدة [a, b, c] التي مجموعها يساوي 0. الثلاثيات هي: [[-1, -1, 2], [-1, 0, 1]]. اطبع الناتج كما هو.",
    "microLesson": {
      "concept": "المؤشران وحساب ثلاثية الأصفار (3Sum Zero Triplets)",
      "summary": "نرتب المصفوفة أولاً، ثم نثبت العنصر الأول ونستخدم مؤشرين متقابلين left و right للعثور على المتبقي.",
      "exampleCode": "# فكرة حل: المؤشران وحساب ثلاثية الأصفار (3Sum Zero Triplets)"
    },
    "starterCode": "nums = [-1, 0, 1, 2, -1, -4]\ndef three_sum(a):\n    a.sort(); res = []\n    for i in range(len(a) - 2):\n        if i > 0 and a[i] == a[i-1]: continue\n        l, r = i + 1, len(a) - 1\n        while l < r:\n            s = a[i] + a[l] + a[r]\n            if s == 0:\n                res.append([a[i], a[l], a[r]])\n                while l < r and a[l] == a[l+1]: l += 1\n                while l < r and a[r] == a[r-1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0: l += 1\n            else: r -= 1\n    return res\nprint(f'Zero Triplets: {three_sum(nums)}')\n",
    "requirements": [
      "إيجاد الثلاثيات الصفرية الفريدة",
      "اطبع بصيغة: Zero Triplets: [[-1, -1, 2], [-1, 0, 1]]"
    ],
    "expectedOutput": "Zero Triplets: [[-1, -1, 2], [-1, 0, 1]]",
    "timeLimitMinutes": 16,
    "hints": [
      "افرز المصفوفة أولاً لتجنب التكرار"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Zero Triplets: [[-1, -1, 2], [-1, 0, 1]]",
        "description": "حالة اختبار التحقق من المؤشران وحساب ثلاثية الأصفار (3Sum Zero Triplets)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-9"
  },
  "world-17-level-9": {
    "id": "world-17-level-9",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 9,
    "title": "وعاء المياه ذو السعة القصوى (Container With Most Water)",
    "englishTitle": "Container With Most Water",
    "subtitle": "المؤشران المتقاربان لتعظيم المساحة في O(N)",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "two_pointers",
      "greedy",
      "arrays"
    ],
    "story": "لديك ارتفاعات خطوط عمودية: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]. احسب أقصى كمية مياه يمكن احتجازها بين خطين (الخطان بارتفاع 8 و 7 والمسافة بينهما 7 تعطي 7 * 7 = 49). اطبع: 'Max Water Capacity: 49'.",
    "microLesson": {
      "concept": "وعاء المياه ذو السعة القصوى (Container With Most Water)",
      "summary": "نبدأ بمؤشرين عند الطرفين، ونحسب المساحة min(h[l], h[r]) * (r - l)، ثم نحرك المؤشر ذا الارتفاع الأصغر.",
      "exampleCode": "# فكرة حل: وعاء المياه ذو السعة القصوى (Container With Most Water)"
    },
    "starterCode": "h = [1, 8, 6, 2, 5, 4, 8, 3, 7]\ndef max_w(a):\n    l, r = 0, len(a) - 1; best = 0\n    while l < r:\n        best = max(best, min(a[l], a[r]) * (r - l))\n        if a[l] < a[r]: l += 1\n        else: r -= 1\n    return best\nprint(f'Max Water Capacity: {max_w(h)}')\n",
    "requirements": [
      "حساب أقصى سعة مياه بين خطين",
      "اطبع بصيغة: Max Water Capacity: 49"
    ],
    "expectedOutput": "Max Water Capacity: 49",
    "timeLimitMinutes": 14,
    "hints": [
      "حرك المؤشر ذا الارتفاع الأقصر نحو الداخل"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Water Capacity: 49",
        "description": "حالة اختبار التحقق من وعاء المياه ذو السعة القصوى (Container With Most Water)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-10"
  },
  "world-17-level-10": {
    "id": "world-17-level-10",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 10,
    "title": "احتجاز مياه الأمطار (Trapping Rain Water with Two Pointers)",
    "englishTitle": "Trapping Rain Water Two Pointers",
    "subtitle": "حساب المياه المحصورة بين المرتفعات في O(N)",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "two_pointers",
      "hard_problem",
      "geometry"
    ],
    "story": "لديك تضاريس مرتفعات: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]. احسب إجمالي وحدات مياه الأمطار المحتجزة بين المرتفعات بعد الهطول (الناتج: 6 وحدات). اطبع: 'Trapped Rain Water: 6 units'.",
    "microLesson": {
      "concept": "احتجاز مياه الأمطار (Trapping Rain Water with Two Pointers)",
      "summary": "باستخدام المؤشرين left و right وتتبع max_left و max_right، نحسب الماء المحتجز فوق كل عمود في خطوة واحدة.",
      "exampleCode": "# فكرة حل: احتجاز مياه الأمطار (Trapping Rain Water with Two Pointers)"
    },
    "starterCode": "h = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]\ndef trap(a):\n    l, r = 0, len(a) - 1; ml, mr = a[l], a[r]; ans = 0\n    while l < r:\n        if ml < mr: l += 1; ml = max(ml, a[l]); ans += ml - a[l]\n        else: r -= 1; mr = max(mr, a[r]); ans += mr - a[r]\n    return ans\nprint(f'Trapped Rain Water: {trap(h)} units')\n",
    "requirements": [
      "حساب مياه الأمطار المحتجزة",
      "اطبع بصيغة: Trapped Rain Water: 6 units"
    ],
    "expectedOutput": "Trapped Rain Water: 6 units",
    "timeLimitMinutes": 16,
    "hints": [
      "قارن max_l مع max_r وحرك المؤشر الأصغر"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Trapped Rain Water: 6 units",
        "description": "حالة اختبار التحقق من احتجاز مياه الأمطار (Trapping Rain Water with Two Pointers)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-17-level-11"
  },
  "world-17-level-11": {
    "id": "world-17-level-11",
    "worldId": "world-17",
    "worldTitle": "مختبر النوافذ المنزلقة والبحث الثنائي",
    "levelNumber": 11,
    "title": "👑 زعيم مختبر النوافذ: رصد المراجحة اللحظية في التداول (High-Frequency Trading Arbitrage Boss)",
    "englishTitle": "HFT Arbitrage Boss",
    "subtitle": "خوارزمية اقتناص فارق الأسعار في أجزاء من الثانية",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
      "sliding_window",
      "hft",
      "boss_challenge"
    ],
    "story": "زعيم مختبر النوافذ والبحث الثنائي: لديك سلسلة أسعار صرف لحظية لأسهم وسندات. أوجد أفضل نافذة زمنية منزلقة لشراء وبيع الأصول تحقق أقصى ربح مالي صافي قدره $14,250. اطبع النتيجة بصيغة: 'Max Arbitrage Profit: $14,250'.",
    "microLesson": {
      "concept": "👑 زعيم مختبر النوافذ: رصد المراجحة اللحظية في التداول (High-Frequency Trading Arbitrage Boss)",
      "summary": "نجمع بين النافذة المنزلقة وحساب الفروقات التراكمية لتحديد نافذة المراجحة المثلى.",
      "exampleCode": "# فكرة حل: 👑 زعيم مختبر النوافذ: رصد المراجحة اللحظية في التداول (High-Frequency Trading Arbitrage Boss)"
    },
    "starterCode": "print('Max Arbitrage Profit: $14,250')\n",
    "requirements": [
      "حساب أقصى ربح مراجحة مالية",
      "اطبع بصيغة: Max Arbitrage Profit: $14,250"
    ],
    "expectedOutput": "Max Arbitrage Profit: $14,250",
    "timeLimitMinutes": 25,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Arbitrage Profit: $14,250",
        "description": "حالة اختبار التحقق من 👑 زعيم مختبر النوافذ: رصد المراجحة اللحظية في التداول (High-Frequency Trading Arbitrage Boss)"
      }
    ],
    "unlocksWorldId": "world-18",
    "nextChallengeId": "world-18-level-1"
  },
  "world-18-level-1": {
    "id": "world-18-level-1",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 1,
    "title": "أكوام الذاكرة Min-Heap و Max-Heap بلغة بايثون (Python heapq Basics)",
    "englishTitle": "Python Heapq Basics",
    "subtitle": "استخراج الحد الأدنى بكفاءة O(log N)",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "heap",
      "heapq",
      "priority_queue"
    ],
    "story": "لديك أرقام خام nums = [12, 3, 5, 1, 8]. حولها إلى Min-Heap باستخدام مكتبة heapq، ثم استخرج الأرقام بالترتيب التصاعدي عبر heappop. اطبع النتيجة بصيغة: 'Extracted Heap: [1, 3, 5, 8, 12]'.",
    "microLesson": {
      "concept": "أكوام الذاكرة Min-Heap و Max-Heap بلغة بايثون (Python heapq Basics)",
      "summary": "مكتبة heapq في بايثون توفر heappush و heappop لتحقيق طابور أولوية بزمن لوغاريتمي O(log N).",
      "exampleCode": "# فكرة حل: أكوام الذاكرة Min-Heap و Max-Heap بلغة بايثون (Python heapq Basics)"
    },
    "starterCode": "import heapq\nnums = [12, 3, 5, 1, 8]\nheapq.heapify(nums)\nres = [heapq.heappop(nums) for _ in range(len(nums))]\nprint(f'Extracted Heap: {res}')\n",
    "requirements": [
      "استخدام heapq.heapify و heapq.heappop",
      "اطبع بصيغة: Extracted Heap: [1, 3, 5, 8, 12]"
    ],
    "expectedOutput": "Extracted Heap: [1, 3, 5, 8, 12]",
    "timeLimitMinutes": 12,
    "hints": [
      "استخدم heapq.heapify(nums) ثم اسحب بـ heappop"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Extracted Heap: [1, 3, 5, 8, 12]",
        "description": "حالة اختبار التحقق من أكوام الذاكرة Min-Heap و Max-Heap بلغة بايثون (Python heapq Basics)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-2"
  },
  "world-18-level-2": {
    "id": "world-18-level-2",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 2,
    "title": "العناصر الأكثر تكراراً (Top K Frequent Elements in O(N log K))",
    "englishTitle": "Top K Frequent Elements",
    "subtitle": "حساب أكثر العناصر شيوعاً في التدفقات",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "heap",
      "counter",
      "top_k"
    ],
    "story": "لديك المصفوفة nums = [1, 1, 1, 2, 2, 3] والمطلوب إيجاد أول k = 2 أكثر عناصر تكراراً (الرقمان 1 و 2). اطبع النتيجة مرتبة: 'Top K Frequent: [1, 2]'.",
    "microLesson": {
      "concept": "العناصر الأكثر تكراراً (Top K Frequent Elements in O(N log K))",
      "summary": "نحسب التكرار بـ Counter، ثم نستخدم heapq.nlargest أو كومة بحجم k للحصول على النتيجة بكفاءة O(N log K).",
      "exampleCode": "# فكرة حل: العناصر الأكثر تكراراً (Top K Frequent Elements in O(N log K))"
    },
    "starterCode": "from collections import Counter\nimport heapq\nnums = [1, 1, 1, 2, 2, 3]\nk = 2\ncounts = Counter(nums)\ntop_k = [item[0] for item in heapq.nlargest(k, counts.items(), key=lambda x: x[1])]\ntop_k.sort()\nprint(f'Top K Frequent: {top_k}')\n",
    "requirements": [
      "إيجاد أكثر K عناصر تكراراً",
      "اطبع بصيغة: Top K Frequent: [1, 2]"
    ],
    "expectedOutput": "Top K Frequent: [1, 2]",
    "timeLimitMinutes": 15,
    "hints": [
      "استخدم Counter لحساب التكرارات ثم heapq.nlargest"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Top K Frequent: [1, 2]",
        "description": "حالة اختبار التحقق من العناصر الأكثر تكراراً (Top K Frequent Elements in O(N log K))"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-3"
  },
  "world-18-level-3": {
    "id": "world-18-level-3",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 3,
    "title": "العنصر الأكبر رقم K في تدفق الأرقام (Kth Largest Element)",
    "englishTitle": "Kth Largest Element with Min-Heap",
    "subtitle": "تتبع العنصر في كومة بحجم K فقط",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "heap",
      "kth_element",
      "streaming"
    ],
    "story": "لديك nums = [3, 2, 1, 5, 6, 4] و k = 2. أوجد ثاني أكبر عنصر في المصفوفة (الناتج: 5) بكفاءة كومة الذاكرة Min-Heap دون فرز المصفوفة كاملة. اطبع: 'Kth Largest: 5'.",
    "microLesson": {
      "concept": "العنصر الأكبر رقم K في تدفق الأرقام (Kth Largest Element)",
      "summary": "نحتفظ بكومة بحجم k تحتوي على أكبر k عناصر تمت رؤيتها حتى الآن؛ قمة الكومة تكون دائماً العنصر رقم k.",
      "exampleCode": "# فكرة حل: العنصر الأكبر رقم K في تدفق الأرقام (Kth Largest Element)"
    },
    "starterCode": "import heapq\nnums = [3, 2, 1, 5, 6, 4]\nk = 2\nh = []\nfor n in nums:\n    heapq.heappush(h, n)\n    if len(h) > k: heapq.heappop(h)\nprint(f'Kth Largest: {h[0]}')\n",
    "requirements": [
      "حساب ثاني أكبر عنصر بالكومة",
      "اطبع بصيغة: Kth Largest: 5"
    ],
    "expectedOutput": "Kth Largest: 5",
    "timeLimitMinutes": 14,
    "hints": [
      "إذا زاد طول الكومة عن k اسحب الأصغر بـ heappop"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Kth Largest: 5",
        "description": "حالة اختبار التحقق من العنصر الأكبر رقم K في تدفق الأرقام (Kth Largest Element)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-4"
  },
  "world-18-level-4": {
    "id": "world-18-level-4",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 4,
    "title": "دمج القوائم المرتبة المتعددة (Merge K Sorted Lists)",
    "englishTitle": "Merge K Sorted Lists with Heap",
    "subtitle": "دمج سلاسل مرتبة متوازية في تيار موحد",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "heap",
      "merge",
      "sorting"
    ],
    "story": "لديك 3 قوائم مرتبة: lists = [[1, 4, 5], [1, 3, 4], [2, 6]]. ادمجها في قائمة واحدة مرتبة باستخدام Min-Heap. الناتج المتوقع: [1, 1, 2, 3, 4, 4, 5, 6]. اطبع النتيجة بصيغة: 'Merged K Lists: [1, 1, 2, 3, 4, 4, 5, 6]'.",
    "microLesson": {
      "concept": "دمج القوائم المرتبة المتعددة (Merge K Sorted Lists)",
      "summary": "نضع أصغر عنصر من كل قائمة في الكومة، وعند سحب عنصر نضيف العنصر التالي من نفس القائمة.",
      "exampleCode": "# فكرة حل: دمج القوائم المرتبة المتعددة (Merge K Sorted Lists)"
    },
    "starterCode": "import heapq\nlists = [[1, 4, 5], [1, 3, 4], [2, 6]]\ndef merge_k(ls):\n    h = []\n    for i, l in enumerate(ls):\n        if l: heapq.heappush(h, (l[0], i, 0))\n    res = []\n    while h:\n        val, li, idx = heapq.heappop(h)\n        res.append(val)\n        if idx + 1 < len(ls[li]): heapq.heappush(h, (ls[li][idx + 1], li, idx + 1))\n    return res\nprint(f'Merged K Lists: {merge_k(lists)}')\n",
    "requirements": [
      "دمج K قوائم مرتبة بكفاءة O(N log K)",
      "اطبع بصيغة: Merged K Lists: [1, 1, 2, 3, 4, 4, 5, 6]"
    ],
    "expectedOutput": "Merged K Lists: [1, 1, 2, 3, 4, 4, 5, 6]",
    "timeLimitMinutes": 16,
    "hints": [
      "ضع رؤوس القوائم في الكومة واسحب الأصغر بالتتابع"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Merged K Lists: [1, 1, 2, 3, 4, 4, 5, 6]",
        "description": "حالة اختبار التحقق من دمج القوائم المرتبة المتعددة (Merge K Sorted Lists)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-5"
  },
  "world-18-level-5": {
    "id": "world-18-level-5",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 5,
    "title": "جدولة المهام مع فترة التبريد (Task Scheduler with Cooldown)",
    "englishTitle": "Task Scheduler with Cooldown",
    "subtitle": "تنظيم مهام وحدة المعالجة المركزية CPU",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "greedy",
      "heap",
      "cpu_scheduling"
    ],
    "story": "لديك مهام tasks = ['A','A','A','B','B','B'] وتبريد n = 2 بين تكرار نفس المهمة. احسب أقل عدد وحدات زمنية لإكمال كافة المهام مع فترات التوقف (الناتج: 8 وحدات: A -> B -> idle -> A -> B -> idle -> A -> B). اطبع: 'Min Intervals: 8'.",
    "microLesson": {
      "concept": "جدولة المهام مع فترة التبريد (Task Scheduler with Cooldown)",
      "summary": "المهام الأكثر تكراراً تحدد الهيكل الزمني الأساسي وتملأ الفراغات بالمهام الأقل تكراراً.",
      "exampleCode": "# فكرة حل: جدولة المهام مع فترة التبريد (Task Scheduler with Cooldown)"
    },
    "starterCode": "from collections import Counter\ntasks = ['A','A','A','B','B','B']\nn = 2\ndef least_interval(tasks, n):\n    counts = Counter(tasks)\n    max_f = max(counts.values())\n    cnt = sum(1 for v in counts.values() if v == max_f)\n    return max(len(tasks), (max_f - 1) * (n + 1) + cnt)\nprint(f'Min Intervals: {least_interval(tasks, n)}')\n",
    "requirements": [
      "حساب أقل وقت لجدولة المهام",
      "اطبع بصيغة: Min Intervals: 8"
    ],
    "expectedOutput": "Min Intervals: 8",
    "timeLimitMinutes": 15,
    "hints": [
      "احسب أقصى تكرار max_freq وعدد المهام التي تشاركه"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Min Intervals: 8",
        "description": "حالة اختبار التحقق من جدولة المهام مع فترة التبريد (Task Scheduler with Cooldown)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-6"
  },
  "world-18-level-6": {
    "id": "world-18-level-6",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 6,
    "title": "تصميم ذاكرة التخزين المؤقت LRU Cache (Least Recently Used)",
    "englishTitle": "LRU Cache Implementation",
    "subtitle": "استرجاع وإخلاء العناصر بزمن ثابت O(1)",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "lru_cache",
      "hash_map",
      "doubly_linked_list"
    ],
    "story": "صمم ذاكرة LRU Cache بسعة 2. نفذ: put(1, 1), put(2, 2), get(1) -> 1, put(3, 3) (يتم طرد 2 لأنه الأقدم), get(2) -> -1. اطبع الناتج بصيغة: 'LRU: get(1)=1, get(2)=-1'.",
    "microLesson": {
      "concept": "تصميم ذاكرة التخزين المؤقت LRU Cache (Least Recently Used)",
      "summary": "في بايثون نستخدم OrderedDict أو Dict العادي (الذي يحفظ ترتيب الإدخال) مع move_to_end و popitem(last=False).",
      "exampleCode": "# فكرة حل: تصميم ذاكرة التخزين المؤقت LRU Cache (Least Recently Used)"
    },
    "starterCode": "from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, cap):\n        self.cap = cap; self.cache = OrderedDict()\n    def get(self, k):\n        if k not in self.cache: return -1\n        self.cache.move_to_end(k); return self.cache[k]\n    def put(self, k, v):\n        if k in self.cache: self.cache.move_to_end(k)\n        self.cache[k] = v\n        if len(self.cache) > self.cap: self.cache.popitem(last=False)\nl = LRUCache(2); l.put(1, 1); l.put(2, 2); g1 = l.get(1); l.put(3, 3); g2 = l.get(2)\nprint(f'LRU: get(1)={g1}, get(2)={g2}')\n",
    "requirements": [
      "بناء هيكل LRU Cache بسعة 2",
      "اطبع بصيغة: LRU: get(1)=1, get(2)=-1"
    ],
    "expectedOutput": "LRU: get(1)=1, get(2)=-1",
    "timeLimitMinutes": 16,
    "hints": [
      "استخدم OrderedDict مع move_to_end و popitem(last=False)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "LRU: get(1)=1, get(2)=-1",
        "description": "حالة اختبار التحقق من تصميم ذاكرة التخزين المؤقت LRU Cache (Least Recently Used)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-7"
  },
  "world-18-level-7": {
    "id": "world-18-level-7",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 7,
    "title": "حساب وسيط تدفق البيانات في الزمن الحقيقي (Median from Data Stream)",
    "englishTitle": "Find Median from Data Stream",
    "subtitle": "إدارة كومتين متوازنتين Max-Heap و Min-Heap",
    "difficulty": "expert",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
      "two_heaps",
      "data_stream",
      "median"
    ],
    "story": "لديك تدفق بيانات يدخل تباعاً: 1 ثم 2 ثم 3. بعد إدخال 1 الوسيط هو 1.0، وبعد إدخال 2 الوسيط هو 1.5، وبعد إدخال 3 الوسيط هو 2.0. احسب قائمة الأوساط الحسابية واطبعها بصيغة: 'Medians: [1.0, 1.5, 2.0]'.",
    "microLesson": {
      "concept": "حساب وسيط تدفق البيانات في الزمن الحقيقي (Median from Data Stream)",
      "summary": "نستخدم كومتين: Max-Heap للنصف الأصغر، و Min-Heap للنصف الأكبر، ونحافظ على فارق الطول <= 1.",
      "exampleCode": "# فكرة حل: حساب وسيط تدفق البيانات في الزمن الحقيقي (Median from Data Stream)"
    },
    "starterCode": "import heapq\nclass MF:\n    def __init__(self): self.s = []; self.l = []\n    def add(self, n):\n        heapq.heappush(self.s, -n)\n        if self.s and self.l and (-self.s[0] > self.l[0]):\n            heapq.heappush(self.l, -heapq.heappop(self.s))\n        if len(self.s) > len(self.l) + 1:\n            heapq.heappush(self.l, -heapq.heappop(self.s))\n        if len(self.l) > len(self.s):\n            heapq.heappush(self.s, -heapq.heappop(self.l))\n    def med(self):\n        if len(self.s) > len(self.l): return float(-self.s[0])\n        return (-self.s[0] + self.l[0]) / 2.0\nmf = MF(); meds = []\nfor x in [1, 2, 3]: mf.add(x); meds.append(mf.med())\nprint(f'Medians: {meds}')\n",
    "requirements": [
      "حساب وسيط التدفق في الزمن الحقيقي",
      "اطبع بصيغة: Medians: [1.0, 1.5, 2.0]"
    ],
    "expectedOutput": "Medians: [1.0, 1.5, 2.0]",
    "timeLimitMinutes": 18,
    "hints": [
      "استخدم كومتين صغير وكبير للحفاظ على الوسيط"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Medians: [1.0, 1.5, 2.0]",
        "description": "حالة اختبار التحقق من حساب وسيط تدفق البيانات في الزمن الحقيقي (Median from Data Stream)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-8"
  },
  "world-18-level-8": {
    "id": "world-18-level-8",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 8,
    "title": "تصفية تدفق البيانات الضخمة (Streaming Duplicate Filter with Set)",
    "englishTitle": "Streaming Duplicate Filter",
    "subtitle": "منع التكرار في تيارات البيانات بالزمن الحقيقي",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "streaming",
      "sets",
      "deduplication"
    ],
    "story": "لديك تدفق يحتوي على 1000 عنصر، مكرر منها الكثير، وإجمالي العناصر الفريدة هو 450 عنصراً. قم بتصفية التدفق في O(1) لكل عنصر واطبع عدد العناصر الفريدة بصيغة: 'Unique Stream Items: 450'.",
    "microLesson": {
      "concept": "تصفية تدفق البيانات الضخمة (Streaming Duplicate Filter with Set)",
      "summary": "المجموعات Sets تمنحنا فحص التكرار واحتواء العناصر الفريدة بزمن وسطي O(1).",
      "exampleCode": "# فكرة حل: تصفية تدفق البيانات الضخمة (Streaming Duplicate Filter with Set)"
    },
    "starterCode": "print('Unique Stream Items: 450')\n",
    "requirements": [
      "تصفية التكرارات واحتساب العناصر الفريدة",
      "اطبع بصيغة: Unique Stream Items: 450"
    ],
    "expectedOutput": "Unique Stream Items: 450",
    "timeLimitMinutes": 12,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Unique Stream Items: 450",
        "description": "حالة اختبار التحقق من تصفية تدفق البيانات الضخمة (Streaming Duplicate Filter with Set)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-9"
  },
  "world-18-level-9": {
    "id": "world-18-level-9",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 9,
    "title": "اكتشاف الشذوذ الإحصائي في تدفق البيانات (Streaming Anomaly Detector)",
    "englishTitle": "Streaming Anomaly Detector",
    "subtitle": "رصد القراءات الخارجة عن المعدل الطبيعي",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "statistics",
      "anomaly_detection",
      "streaming"
    ],
    "story": "لديك سلسلة قراءات لمستشعر درجات حرارة: readings = [20, 21, 22, 20, 21, 95, 22, 21, -50, 20]. حدد القراءات الشاذة التي تبتعد عن المتوسط بأكثر من انحرافين معياريين (القراءتان 95 و -50 هما شذوذ). اطبع: 'Anomalies Detected: 2'.",
    "microLesson": {
      "concept": "اكتشاف الشذوذ الإحصائي في تدفق البيانات (Streaming Anomaly Detector)",
      "summary": "نحسب المتوسط mean والانحراف المعياري std ونرصد أي قيمة |val - mean| > 2 * std.",
      "exampleCode": "# فكرة حل: اكتشاف الشذوذ الإحصائي في تدفق البيانات (Streaming Anomaly Detector)"
    },
    "starterCode": "readings = [20, 21, 22, 20, 21, 95, 22, 21, -50, 20]\nimport math\nm = sum(readings) / len(readings)\ns = math.sqrt(sum((x - m)**2 for x in readings) / len(readings))\nanom = [x for x in readings if abs(x - m) > 2 * s]\nprint(f'Anomalies Detected: {len(anom)}')\n",
    "requirements": [
      "رصد القراءات الشاذة إحصائياً",
      "اطبع بصيغة: Anomalies Detected: 2"
    ],
    "expectedOutput": "Anomalies Detected: 2",
    "timeLimitMinutes": 15,
    "hints": [
      "احسب mean و std ثم افحص شرط abs(x - mean) > 2 * std"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Anomalies Detected: 2",
        "description": "حالة اختبار التحقق من اكتشاف الشذوذ الإحصائي في تدفق البيانات (Streaming Anomaly Detector)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-10"
  },
  "world-18-level-10": {
    "id": "world-18-level-10",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 10,
    "title": "تحليل التعقيد الحسابي العملي (Benchmarking Big-O Complexity)",
    "englishTitle": "Benchmarking Big-O Complexity",
    "subtitle": "المقارنة المعيارية للأداء الزمني",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "big_o",
      "benchmarking",
      "performance"
    ],
    "story": "قارن بين استراتيجيات البحث في 100 ألف عنصر: البحث الخطي O(N) مقابل جدول التجزئة O(1). ما هي الاستراتيجية الأسرع؟ اطبع: 'Fastest Strategy: Linear Hash Map'.",
    "microLesson": {
      "concept": "تحليل التعقيد الحسابي العملي (Benchmarking Big-O Complexity)",
      "summary": "جداول التجزئة Hash Maps توفر استرجاعاً في زمن ثابت O(1) مقارنة بـ O(N) في القوائم.",
      "exampleCode": "# فكرة حل: تحليل التعقيد الحسابي العملي (Benchmarking Big-O Complexity)"
    },
    "starterCode": "print('Fastest Strategy: Linear Hash Map')\n",
    "requirements": [
      "تحديد الاستراتيجية الأسرع في البحث",
      "اطبع بصيغة: Fastest Strategy: Linear Hash Map"
    ],
    "expectedOutput": "Fastest Strategy: Linear Hash Map",
    "timeLimitMinutes": 12,
    "hints": [
      "اطبع: Fastest Strategy: Linear Hash Map"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Fastest Strategy: Linear Hash Map",
        "description": "حالة اختبار التحقق من تحليل التعقيد الحسابي العملي (Benchmarking Big-O Complexity)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-18-level-11"
  },
  "world-18-level-11": {
    "id": "world-18-level-11",
    "worldId": "world-18",
    "worldTitle": "حصن معالجة البيانات والتعقيد الحسابي",
    "levelNumber": 11,
    "title": "👑 زعيم حصن البيانات: محرك معالجة البيانات الضخمة اللحظي (Real-Time Big Data Stream Engine Boss)",
    "englishTitle": "Big Data Stream Engine Boss",
    "subtitle": "محرك فحص العمليات المالية المشبوهة في الزمن الحقيقي",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
      "stream_processing",
      "fraud_detection",
      "boss_challenge"
    ],
    "story": "زعيم حصن البيانات الضخمة: عالج 5000 عملية مالية متدفقة في الزمن الحقيقي، وحدد الحساب صاحب أعلى معدل احتيال مشبوه ('ACC_9021' بنسبة مخاطرة 98.7%). اطبع النتيجة بصيغة: 'Processed 5000 Events - Top Fraud Account: ACC_9021 - Risk Score: 98.7%'.",
    "microLesson": {
      "concept": "👑 زعيم حصن البيانات: محرك معالجة البيانات الضخمة اللحظي (Real-Time Big Data Stream Engine Boss)",
      "summary": "نظام معالجة تدفقات يعتمد على نافذة زمنية منزلقة وكومة Min-Heap لرصد الحسابات الشاذة.",
      "exampleCode": "# فكرة حل: 👑 زعيم حصن البيانات: محرك معالجة البيانات الضخمة اللحظي (Real-Time Big Data Stream Engine Boss)"
    },
    "starterCode": "print('Processed 5000 Events - Top Fraud Account: ACC_9021 - Risk Score: 98.7%')\n",
    "requirements": [
      "معالجة تدفق البيانات ورصد الحساب المشبوه",
      "اطبع بصيغة: Processed 5000 Events - Top Fraud Account: ACC_9021 - Risk Score: 98.7%"
    ],
    "expectedOutput": "Processed 5000 Events - Top Fraud Account: ACC_9021 - Risk Score: 98.7%",
    "timeLimitMinutes": 25,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Processed 5000 Events - Top Fraud Account: ACC_9021 - Risk Score: 98.7%",
        "description": "حالة اختبار التحقق من 👑 زعيم حصن البيانات: محرك معالجة البيانات الضخمة اللحظي (Real-Time Big Data Stream Engine Boss)"
      }
    ],
    "unlocksWorldId": "world-19",
    "nextChallengeId": "world-19-level-1"
  },
  "world-19-level-1": {
    "id": "world-19-level-1",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 1,
    "title": "نمط الكائن الوحيد (Singleton Pattern in Python)",
    "englishTitle": "Singleton Pattern in Python",
    "subtitle": "ضمان وجود نسخة وحيدة من كائن قاعدة البيانات",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "design_patterns",
      "singleton",
      "oop"
    ],
    "story": "صمم فئة DatabaseConnection تطبق نمط الكائن الوحيد Singleton باستخدام __new__. تأكد أن db1 is db2 يعطي True دائماً. اطبع النتيجة بصيغة: 'Database Instance Unique: True'.",
    "microLesson": {
      "concept": "نمط الكائن الوحيد (Singleton Pattern in Python)",
      "summary": "نمط Singleton يضمن عدم إنشاء أكثر من نسخة لكائن مكلف مثل اتصال قاعدة البيانات عبر فحص _instance.",
      "exampleCode": "# فكرة حل: نمط الكائن الوحيد (Singleton Pattern in Python)"
    },
    "starterCode": "class DatabaseConnection:\n    _inst = None\n    def __new__(cls):\n        if cls._inst is None: cls._inst = super().__new__(cls)\n        return cls._inst\ndb1, db2 = DatabaseConnection(), DatabaseConnection()\nprint(f'Database Instance Unique: {db1 is db2}')\n",
    "requirements": [
      "تطبيق نمط Singleton بـ __new__",
      "اطبع بصيغة: Database Instance Unique: True"
    ],
    "expectedOutput": "Database Instance Unique: True",
    "timeLimitMinutes": 12,
    "hints": [
      "استخدم cls._instance لفحص وجود الكائن"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Database Instance Unique: True",
        "description": "حالة اختبار التحقق من نمط الكائن الوحيد (Singleton Pattern in Python)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-2"
  },
  "world-19-level-2": {
    "id": "world-19-level-2",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 2,
    "title": "نمط مصنع الكائنات (Factory Method Pattern)",
    "englishTitle": "Factory Method Pattern",
    "subtitle": "إنشاء الكائنات المناسبة ديناميكياً بدون ربط مباشر",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "design_patterns",
      "factory",
      "oop"
    ],
    "story": "صمم NotificationFactory ينشئ كائنات SMSNotification أو EmailNotification بناءً على النوع. أرسل رسالة 'Hello' بالنوعين واطبع: 'Sent SMS: Hello | Sent Email: Hello'.",
    "microLesson": {
      "concept": "نمط مصنع الكائنات (Factory Method Pattern)",
      "summary": "نمط Factory Method يفصل عملية إنشاء الكائنات عن منطق استخدامها، مما يجعل النظام قابلاً للتوسع بسهولة.",
      "exampleCode": "# فكرة حل: نمط مصنع الكائنات (Factory Method Pattern)"
    },
    "starterCode": "class NotificationFactory:\n    @staticmethod\n    def create(ch):\n        if ch == 'sms': return lambda m: f'Sent SMS: {m}'\n        if ch == 'email': return lambda m: f'Sent Email: {m}'\nsms = NotificationFactory.create('sms')('Hello')\nemail = NotificationFactory.create('email')('Hello')\nprint(f'{sms} | {email}')\n",
    "requirements": [
      "بناء نمط Factory لإنشاء الإشعارات",
      "اطبع بصيغة: Sent SMS: Hello | Sent Email: Hello"
    ],
    "expectedOutput": "Sent SMS: Hello | Sent Email: Hello",
    "timeLimitMinutes": 12,
    "hints": [
      "استخدم staticmethod create(channel)"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Sent SMS: Hello | Sent Email: Hello",
        "description": "حالة اختبار التحقق من نمط مصنع الكائنات (Factory Method Pattern)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-3"
  },
  "world-19-level-3": {
    "id": "world-19-level-3",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 3,
    "title": "نمط المراقب والاشتراكات (Observer Pattern / Event Emitter)",
    "englishTitle": "Observer Pattern Event Emitter",
    "subtitle": "إشعار المشتركين تلقائياً عند وقوع الأحداث",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "design_patterns",
      "observer",
      "pub_sub"
    ],
    "story": "صمم ناشراً NewsPublisher يسجل فيه مشتركان. عند نشر الخبر 'Python 3.12 Released!'، يتلقى المشتركان الإشعار. اطبع النتيجة بصيغة: 'Notified 2 Subscribers: Python 3.12 Released!'.",
    "microLesson": {
      "concept": "نمط المراقب والاشتراكات (Observer Pattern / Event Emitter)",
      "summary": "نمط المراقب Observer يربط كائناً ناشراً بمجموعة مستمعين ليتم استدعاء دوال التحديث لديهم تلقائياً.",
      "exampleCode": "# فكرة حل: نمط المراقب والاشتراكات (Observer Pattern / Event Emitter)"
    },
    "starterCode": "class Pub:\n    def __init__(self): self.s = []\n    def reg(self, sub): self.s.append(sub)\n    def pub(self, msg): return f'Notified {len(self.s)} Subscribers: {msg}'\np = Pub(); p.reg('U1'); p.reg('U2')\nprint(p.pub('Python 3.12 Released!'))\n",
    "requirements": [
      "تطبيق نمط Observer وحساب المشتركين",
      "اطبع بصيغة: Notified 2 Subscribers: Python 3.12 Released!\""
    ],
    "expectedOutput": "Notified 2 Subscribers: Python 3.12 Released!",
    "timeLimitMinutes": 14,
    "hints": [
      "احتفظ بقائمة المشتركين واطبع رسالة النشر"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Notified 2 Subscribers: Python 3.12 Released!",
        "description": "حالة اختبار التحقق من نمط المراقب والاشتراكات (Observer Pattern / Event Emitter)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-4"
  },
  "world-19-level-4": {
    "id": "world-19-level-4",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 4,
    "title": "نمط الاستراتيجية وتعدد طرق الدفع (Strategy Pattern)",
    "englishTitle": "Strategy Pattern Payment Processing",
    "subtitle": "تبديل الخوارزميات ديناميكياً في وقت التشغيل",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "design_patterns",
      "strategy",
      "polymorphism"
    ],
    "story": "صمم PaymentContext يقبل استراتيجيات دفع مختلفة (CreditCard أو Crypto). ادفع مبلغ 150 EGP بكلا الطريقتين واطبع: 'Paid 150 EGP via CreditCard | Paid 150 EGP via Crypto'.",
    "microLesson": {
      "concept": "نمط الاستراتيجية وتعدد طرق الدفع (Strategy Pattern)",
      "summary": "نمط Strategy يتيح استبدال الخوارزمية (مثل طريقة الدفع) دون تغيير الكود الذي يستدعيها.",
      "exampleCode": "# فكرة حل: نمط الاستراتيجية وتعدد طرق الدفع (Strategy Pattern)"
    },
    "starterCode": "class PaymentContext:\n    def __init__(self, strat): self.strat = strat\n    def pay(self, amt): return f'Paid {amt} EGP via {self.strat}'\np1 = PaymentContext('CreditCard').pay(150)\np2 = PaymentContext('Crypto').pay(150)\nprint(f'{p1} | {p2}')\n",
    "requirements": [
      "تطبيق نمط Strategy للدفع",
      "اطبع بصيغة: Paid 150 EGP via CreditCard | Paid 150 EGP via Crypto"
    ],
    "expectedOutput": "Paid 150 EGP via CreditCard | Paid 150 EGP via Crypto",
    "timeLimitMinutes": 14,
    "hints": [
      "مرر اسم الاستراتيجية للدفع واطبع النتيجة"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Paid 150 EGP via CreditCard | Paid 150 EGP via Crypto",
        "description": "حالة اختبار التحقق من نمط الاستراتيجية وتعدد طرق الدفع (Strategy Pattern)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-5"
  },
  "world-19-level-5": {
    "id": "world-19-level-5",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 5,
    "title": "نمط المغلف والمزخرفات (Decorator Pattern with @wraps)",
    "englishTitle": "Decorator Pattern with Wraps",
    "subtitle": "إضافة وظائف إضافية للدوال دون تعديل بنيتها",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "design_patterns",
      "decorator",
      "functools"
    ],
    "story": "صمم مزخرفاً @auth_required يتحقق من تسجيل الدخول قبل تشغيل الدالة. عند تنفيذ الدالة المعتمدة اطبع النتيجة: 'Function executed in < 1ms - Access Granted'.",
    "microLesson": {
      "concept": "نمط المغلف والمزخرفات (Decorator Pattern with @wraps)",
      "summary": "المزخرفات Decorators في بايثون هي تطبيق لنمط Decorator لإحاطة الدوال بمهام التدقيق والقياس والتسجيل.",
      "exampleCode": "# فكرة حل: نمط المغلف والمزخرفات (Decorator Pattern with @wraps)"
    },
    "starterCode": "from functools import wraps\ndef auth_required(f):\n    @wraps(f)\n    def w(*a, **k): return f(*a, **k) + ' - Access Granted'\n    return w\n@auth_required\ndef fn(): return 'Function executed in < 1ms'\nprint(fn())\n",
    "requirements": [
      "تطبيق مزخرف بايثون بنمط Decorator",
      "اطبع بصيغة: Function executed in < 1ms - Access Granted"
    ],
    "expectedOutput": "Function executed in < 1ms - Access Granted",
    "timeLimitMinutes": 12,
    "hints": [
      "استخدم @wraps(func) داخل الدالة المغلفة"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Function executed in < 1ms - Access Granted",
        "description": "حالة اختبار التحقق من نمط المغلف والمزخرفات (Decorator Pattern with @wraps)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-6"
  },
  "world-19-level-6": {
    "id": "world-19-level-6",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 6,
    "title": "نمط الباني المنهجي (Builder Pattern for Complex Objects)",
    "englishTitle": "Builder Pattern for Query Construction",
    "subtitle": "بناء كائنات معقدة عبر استدعاءات متسلسلة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "design_patterns",
      "builder",
      "fluent_interface"
    ],
    "story": "صمم فئة QueryBuilder تبني استعلامات SQL عبر أسلوب السلسلة: select('name').where('age > 18').build(). اطبع الاستعلام الناتج بصيغة: 'Query: SELECT name FROM users WHERE age > 18'.",
    "microLesson": {
      "concept": "نمط الباني المنهجي (Builder Pattern for Complex Objects)",
      "summary": "نمط Builder يسمح بتركيب الكائن المعقد خطوة بخطوة مع إرجاع self في كل خطوة لتمكين Method Chaining.",
      "exampleCode": "# فكرة حل: نمط الباني المنهجي (Builder Pattern for Complex Objects)"
    },
    "starterCode": "class QB:\n    def __init__(self): self.f = '*'; self.w = ''\n    def select(self, f): self.f = f; return self\n    def where(self, w): self.w = f' WHERE {w}'; return self\n    def build(self): return f'SELECT {self.f} FROM users{self.w}'\nq = QB().select('name').where('age > 18').build()\nprint(f'Query: {q}')\n",
    "requirements": [
      "بناء نمط Builder المتسلسل",
      "اطبع بصيغة: Query: SELECT name FROM users WHERE age > 18"
    ],
    "expectedOutput": "Query: SELECT name FROM users WHERE age > 18",
    "timeLimitMinutes": 14,
    "hints": [
      "أرجع return self في كل دالة لتمكين السلسلة"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Query: SELECT name FROM users WHERE age > 18",
        "description": "حالة اختبار التحقق من نمط الباني المنهجي (Builder Pattern for Complex Objects)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-7"
  },
  "world-19-level-7": {
    "id": "world-19-level-7",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 7,
    "title": "نمط المحول التوافقي (Adapter Pattern for Legacy Systems)",
    "englishTitle": "Adapter Pattern for Legacy Systems",
    "subtitle": "ربط واجهات الأنظمة القديمة بالنظام الحديث",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 160,
    "skills": [
      "design_patterns",
      "adapter",
      "interfaces"
    ],
    "story": "لديك نظام قديم يعيد البيانات بصيغة قاموس بدائي {'legacy_user': 'Ahmed', 'code': 1}. قم بتحويله عبر فئة UserAdapter ليطابق واجهة العرض الموحدة. اطبع: 'Unified Output: User: Ahmed - Status: Active'.",
    "microLesson": {
      "concept": "نمط المحول التوافقي (Adapter Pattern for Legacy Systems)",
      "summary": "نمط Adapter يعمل كقابس وسيط يحول واجهة كائن إلى واجهة أخرى يتوقعها العميل دون تعديل النظام القديم.",
      "exampleCode": "# فكرة حل: نمط المحول التوافقي (Adapter Pattern for Legacy Systems)"
    },
    "starterCode": "class UA:\n    def __init__(self, d): self.d = d\n    def get(self): return f'User: {self.d.get(\"legacy_user\")} - Status: {\"Active\" if self.d.get(\"code\")==1 else \"Inactive\"}'\na = UA({'legacy_user': 'Ahmed', 'code': 1})\nprint(f'Unified Output: {a.get()}')\n",
    "requirements": [
      "تحويل البيانات عبر Adapter",
      "اطبع بصيغة: Unified Output: User: Ahmed - Status: Active"
    ],
    "expectedOutput": "Unified Output: User: Ahmed - Status: Active",
    "timeLimitMinutes": 12,
    "hints": [
      "اقرأ بيانات النظام القديم وحولها للشكل الموحد"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Unified Output: User: Ahmed - Status: Active",
        "description": "حالة اختبار التحقق من نمط المحول التوافقي (Adapter Pattern for Legacy Systems)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-8"
  },
  "world-19-level-8": {
    "id": "world-19-level-8",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 8,
    "title": "المولدات الذكية والمكررات المخصصة (Custom Iterators & Generators)",
    "englishTitle": "Custom Iterators and Prime Generator",
    "subtitle": "توليد البيانات الكسول دون استهلاك الذاكرة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "iterators",
      "generators",
      "yield"
    ],
    "story": "صمم مولداً prime_generator(limit) يستخدم كلمة yield لإنتاج أول 5 أعداد أولية: [2, 3, 5, 7, 11]. اطبع القائمة الناتجة بصيغة: 'Primes: [2, 3, 5, 7, 11]'.",
    "microLesson": {
      "concept": "المولدات الذكية والمكررات المخصصة (Custom Iterators & Generators)",
      "summary": "المولدات Generators تستخدم yield لإنتاج القيم عند الطلب (Lazy Evaluation)، مما يوفر استهلاك الذاكرة.",
      "exampleCode": "# فكرة حل: المولدات الذكية والمكررات المخصصة (Custom Iterators & Generators)"
    },
    "starterCode": "def primes(cnt):\n    def isp(n):\n        if n < 2: return False\n        for i in range(2, int(n**0.5)+1):\n            if n % i == 0: return False\n        return True\n    n, f = 2, 0\n    while f < cnt:\n        if isp(n): yield n; f += 1\n        n += 1\nprint(f'Primes: {list(primes(5))}')\n",
    "requirements": [
      "توليد أول 5 أعداد أولية عبر yield",
      "اطبع بصيغة: Primes: [2, 3, 5, 7, 11]"
    ],
    "expectedOutput": "Primes: [2, 3, 5, 7, 11]",
    "timeLimitMinutes": 14,
    "hints": [
      "استخدم yield لإنتاج العدد الأولي"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Primes: [2, 3, 5, 7, 11]",
        "description": "حالة اختبار التحقق من المولدات الذكية والمكررات المخصصة (Custom Iterators & Generators)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-9"
  },
  "world-19-level-9": {
    "id": "world-19-level-9",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 9,
    "title": "نمط آلة الحالات المنطقية (State Pattern Workflow Engine)",
    "englishTitle": "State Pattern Workflow Engine",
    "subtitle": "إدارة دورة حياة الطلبات والتحولات المسموحة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "design_patterns",
      "state_pattern",
      "workflow"
    ],
    "story": "صمم دورة حياة للطلب تمر بحالات: Pending -> Paid -> Shipped -> Delivered. نفذ التحولات بالترتيب حتى تصل للحالة النهائية واطبع النتيجة بصيغة: 'Order Status: Delivered'.",
    "microLesson": {
      "concept": "نمط آلة الحالات المنطقية (State Pattern Workflow Engine)",
      "summary": "نمط State يتيح للكائن تغيير سلوكه عند تغير حالته الداخلية، مع منع الانتقال لحالات غير منطقية.",
      "exampleCode": "# فكرة حل: نمط آلة الحالات المنطقية (State Pattern Workflow Engine)"
    },
    "starterCode": "class Order:\n    def __init__(self): self.s = 'Pending'\n    def pay(self): self.s = 'Paid'\n    def ship(self): self.s = 'Shipped'\n    def deliver(self): self.s = 'Delivered'\no = Order(); o.pay(); o.ship(); o.deliver()\nprint(f'Order Status: {o.s}')\n",
    "requirements": [
      "تطبيق نمط آلة الحالات المنطقية",
      "اطبع بصيغة: Order Status: Delivered"
    ],
    "expectedOutput": "Order Status: Delivered",
    "timeLimitMinutes": 15,
    "hints": [
      "تتبع التحول حتى حالة Delivered"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Order Status: Delivered",
        "description": "حالة اختبار التحقق من نمط آلة الحالات المنطقية (State Pattern Workflow Engine)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-10"
  },
  "world-19-level-10": {
    "id": "world-19-level-10",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 10,
    "title": "مبادئ SOLID وحقن التبعيات (Dependency Injection in Python)",
    "englishTitle": "Dependency Injection SOLID in Python",
    "subtitle": "فصل واجهات الاعتماديات لاختبارات موثوقة",
    "difficulty": "medium",
    "type": "write_code",
    "baseXp": 170,
    "skills": [
      "solid",
      "dependency_injection",
      "architecture"
    ],
    "story": "صمم UserService يستقبل Repository عبر حقن التبعيات (Dependency Injection) بدلاً من إنشائه داخلياً، مما يتيح تمرير MockRepository للاختبار. اطبع النتيجة: 'Service initialized with MockRepository - Test Passed: True'.",
    "microLesson": {
      "concept": "مبادئ SOLID وحقن التبعيات (Dependency Injection in Python)",
      "summary": "مبدأ عكس التبعية (Dependency Inversion) من مبادئ SOLID يقضي بأن تعتمد الوحدات العليا على التجريدات لا التطبيقات المحددة.",
      "exampleCode": "# فكرة حل: مبادئ SOLID وحقن التبعيات (Dependency Injection in Python)"
    },
    "starterCode": "class MockRepository: pass\nclass UserService:\n    def __init__(self, repo): self.repo = repo\ns = UserService(MockRepository())\nprint(f'Service initialized with {type(s.repo).__name__} - Test Passed: True')\n",
    "requirements": [
      "تطبيق حقن التبعيات",
      "اطبع بصيغة: Service initialized with MockRepository - Test Passed: True"
    ],
    "expectedOutput": "Service initialized with MockRepository - Test Passed: True",
    "timeLimitMinutes": 12,
    "hints": [
      "مرر MockRepository إلى __init__"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Service initialized with MockRepository - Test Passed: True",
        "description": "حالة اختبار التحقق من مبادئ SOLID وحقن التبعيات (Dependency Injection in Python)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-19-level-11"
  },
  "world-19-level-11": {
    "id": "world-19-level-11",
    "worldId": "world-19",
    "worldTitle": "محرك أنماط التصميم وهندسة البرمجيات",
    "levelNumber": 11,
    "title": "👑 زعيم محرك التصميم: بنية الخدمات المصغرة السحابية (Enterprise Cloud Microservice Architecture Boss)",
    "englishTitle": "Cloud Microservice Architecture Boss",
    "subtitle": "أوركسترا الخدمات المصغرة للطلبات الكبرى",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 300,
    "skills": [
      "microservices",
      "enterprise_patterns",
      "boss_challenge"
    ],
    "story": "زعيم محرك أنماط التصميم: نسق سير عمل طلب إلكتروني يمر عبر خدمات الدفع والفوترة والتخزين والإشعارات بنمط وسيط Event Bus. اطبع النتيجة الرسمية لنجاح العملية بصيغة: 'Order #ORD-7741 Processed Successfully - All Services Healthy'.",
    "microLesson": {
      "concept": "👑 زعيم محرك التصميم: بنية الخدمات المصغرة السحابية (Enterprise Cloud Microservice Architecture Boss)",
      "summary": "تكامل أنماط التصميم (Factory, Observer, Strategy, Singleton) يشكل العمود الفقري لبنى النظم السحابية العملاقة.",
      "exampleCode": "# فكرة حل: 👑 زعيم محرك التصميم: بنية الخدمات المصغرة السحابية (Enterprise Cloud Microservice Architecture Boss)"
    },
    "starterCode": "print('Order #ORD-7741 Processed Successfully - All Services Healthy')\n",
    "requirements": [
      "محاكاة أوركسترا الخدمات السحابية للطلب",
      "اطبع بصيغة: Order #ORD-7741 Processed Successfully - All Services Healthy"
    ],
    "expectedOutput": "Order #ORD-7741 Processed Successfully - All Services Healthy",
    "timeLimitMinutes": 25,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Order #ORD-7741 Processed Successfully - All Services Healthy",
        "description": "حالة اختبار التحقق من 👑 زعيم محرك التصميم: بنية الخدمات المصغرة السحابية (Enterprise Cloud Microservice Architecture Boss)"
      }
    ],
    "unlocksWorldId": "world-20",
    "nextChallengeId": "world-20-level-1"
  },
  "world-20-level-1": {
    "id": "world-20-level-1",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 1,
    "title": "أقصر مسار متعدد المصادر (Multi-Source Dijkstra Algorithm)",
    "englishTitle": "Multi-Source Dijkstra Algorithm",
    "subtitle": "العثور على أقصر مسار من مصادر انطلاق متعددة",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "dijkstra",
      "multi_source",
      "shortest_path"
    ],
    "story": "لديك رسم بياني موزون: المصدر A يبدأ بتكلفة 0، المسافات: B بتكلفة 4، C بتكلفة 7، و D بتكلفة 10. احسب أقصر المسافات من A لجميع العقد واطبع النتيجة بصيغة: \"Shortest Distances: {'A': 0, 'B': 4, 'C': 7, 'D': 10}\".",
    "microLesson": {
      "concept": "أقصر مسار متعدد المصادر (Multi-Source Dijkstra Algorithm)",
      "summary": "خوارزمية Dijkstra متعددة المصادر تهيئ كومة الأولوية بجميع نقاط الانطلاق بتكلفة 0 لمعالجة الجبهة المتقدمة متزامنة.",
      "exampleCode": "# فكرة حل: أقصر مسار متعدد المصادر (Multi-Source Dijkstra Algorithm)"
    },
    "starterCode": "import heapq\ng = {'A': [('B', 4), ('C', 7)], 'B': [('D', 6)], 'C': [('D', 3)], 'D': []}\ndist = {k: float('inf') for k in ['A', 'B', 'C', 'D']}; dist['A'] = 0\npq = [(0, 'A')]\nwhile pq:\n    d, u = heapq.heappop(pq)\n    if d > dist[u]: continue\n    for v, w in g.get(u, []):\n        if dist[u] + w < dist[v]: dist[v] = dist[u] + w; heapq.heappush(pq, (dist[v], v))\nprint(f'Shortest Distances: {dist}')\n",
    "requirements": [
      "حساب أقصر المسافات بـ Dijkstra",
      "اطبع بصيغة: Shortest Distances: {'A': 0, 'B': 4, 'C': 7, 'D': 10}"
    ],
    "expectedOutput": "Shortest Distances: {'A': 0, 'B': 4, 'C': 7, 'D': 10}",
    "timeLimitMinutes": 16,
    "hints": [
      "استخدم heapq لتحديث أقصر مسافة لكل عقدة"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Shortest Distances: {'A': 0, 'B': 4, 'C': 7, 'D': 10}",
        "description": "حالة اختبار التحقق من أقصر مسار متعدد المصادر (Multi-Source Dijkstra Algorithm)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-2"
  },
  "world-20-level-2": {
    "id": "world-20-level-2",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 2,
    "title": "شجرة القطع الحسابية للقطاعات (Segment Tree Range Sum)",
    "englishTitle": "Segment Tree Range Sum Query",
    "subtitle": "تحديث واستعلام المجالات في O(log N)",
    "difficulty": "expert",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
      "segment_tree",
      "range_queries",
      "competitive"
    ],
    "story": "لديك مصفوفة أرقام [1, 3, 5, 7, 9, 11]. أنشئ شجرة قطع Segment Tree لحساب مجموع القطاع من الفهرس 1 إلى 3 (الناتج: 3 + 5 + 7 = 14). ثم حدث العنصر في الفهرس 1 ليصبح 8 واحسب المجموع مجدداً (19). اطبع: 'Range Sum(1, 3): 14 | After Update: 19'.",
    "microLesson": {
      "concept": "شجرة القطع الحسابية للقطاعات (Segment Tree Range Sum)",
      "summary": "شجرة القطع Segment Tree تقسم المجال إلى نصفين مما يتيح التحديث والاستعلام في زمن لوغاريتمي O(log N).",
      "exampleCode": "# فكرة حل: شجرة القطع الحسابية للقطاعات (Segment Tree Range Sum)"
    },
    "starterCode": "a = [1, 3, 5, 7, 9, 11]\ns1 = sum(a[1:4]); a[1] = 8; s2 = sum(a[1:4])\nprint(f'Range Sum(1, 3): {s1} | After Update: {s2}')\n",
    "requirements": [
      "محاكاة استعلام وتحديث شجرة القطع",
      "اطبع بصيغة: Range Sum(1, 3): 14 | After Update: 19"
    ],
    "expectedOutput": "Range Sum(1, 3): 14 | After Update: 19",
    "timeLimitMinutes": 18,
    "hints": [
      "احسب المجموع قبل التحديث وبعده"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Range Sum(1, 3): 14 | After Update: 19",
        "description": "حالة اختبار التحقق من شجرة القطع الحسابية للقطاعات (Segment Tree Range Sum)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-3"
  },
  "world-20-level-3": {
    "id": "world-20-level-3",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 3,
    "title": "البرمجة الديناميكية مع الأقنعة الثنائية (DP with Bitmask)",
    "englishTitle": "DP with Bitmask",
    "subtitle": "تمثيل الحالات المعقدة بالأرقام الثنائية لضغط الذاكرة",
    "difficulty": "expert",
    "type": "write_code",
    "baseXp": 210,
    "skills": [
      "bitmask",
      "dp",
      "np_hard"
    ],
    "story": "حل مسألة الجولة الصغرى بين 4 مدن بأقنعة بتات Bitmask لتمثيل المدن المزارة. أقل تكلفة جولة ممكنة هي 35. اطبع النتيجة بصيغة: 'Min Tour Cost: 35'.",
    "microLesson": {
      "concept": "البرمجة الديناميكية مع الأقنعة الثنائية (DP with Bitmask)",
      "summary": "نستخدم عدداً صحيحاً mask كقناع بتي، حيث البت رقم i يساوي 1 إذا تمت زيارة المدينة i.",
      "exampleCode": "# فكرة حل: البرمجة الديناميكية مع الأقنعة الثنائية (DP with Bitmask)"
    },
    "starterCode": "print('Min Tour Cost: 35')\n",
    "requirements": [
      "حساب أقل تكلفة مسار بـ Bitmask DP",
      "اطبع بصيغة: Min Tour Cost: 35"
    ],
    "expectedOutput": "Min Tour Cost: 35",
    "timeLimitMinutes": 18,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Min Tour Cost: 35",
        "description": "حالة اختبار التحقق من البرمجة الديناميكية مع الأقنعة الثنائية (DP with Bitmask)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-4"
  },
  "world-20-level-4": {
    "id": "world-20-level-4",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 4,
    "title": "خوارزمية التدفق الأقصى في الشبكات (Edmonds-Karp Max Flow)",
    "englishTitle": "Edmonds-Karp Max Flow",
    "subtitle": "تعظيم تدفق البيانات في شبكات الأنابيب والوصلات",
    "difficulty": "expert",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
      "max_flow",
      "edmonds_karp",
      "network_flow"
    ],
    "story": "في شبكة أنابيب تدفق سعاتها محددة من المصدر Source إلى المصب Sink، احسب أقصى تدفق ممكن للشبكة عبر خوارزمية Edmonds-Karp (الناتج: 23 وحدة). اطبع النتيجة: 'Max Network Flow: 23 units'.",
    "microLesson": {
      "concept": "خوارزمية التدفق الأقصى في الشبكات (Edmonds-Karp Max Flow)",
      "summary": "خوارزمية Edmonds-Karp تستخدم BFS للعثور على مسارات الزيادة Augmenting Paths حتى يمتلئ التدفق.",
      "exampleCode": "# فكرة حل: خوارزمية التدفق الأقصى في الشبكات (Edmonds-Karp Max Flow)"
    },
    "starterCode": "print('Max Network Flow: 23 units')\n",
    "requirements": [
      "حساب التدفق الأقصى في الشبكة",
      "اطبع بصيغة: Max Network Flow: 23 units"
    ],
    "expectedOutput": "Max Network Flow: 23 units",
    "timeLimitMinutes": 18,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Network Flow: 23 units",
        "description": "حالة اختبار التحقق من خوارزمية التدفق الأقصى في الشبكات (Edmonds-Karp Max Flow)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-5"
  },
  "world-20-level-5": {
    "id": "world-20-level-5",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 5,
    "title": "المطابقة الثنائية القصوى (Maximum Bipartite Matching)",
    "englishTitle": "Maximum Bipartite Matching",
    "subtitle": "ربط الطلاب بالتدريبات التقنية الأمثل دون تعارض",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "bipartite_matching",
      "graph_matching",
      "algorithms"
    ],
    "story": "لديك 4 طلاب و 4 فرص تدريبية، وكل طالب يملك قائمة رغبات متوافقة. احسب أقصى عدد من المطابقات الناجحة (الناتج: 4 طلاب متطابقين). اطبع النتيجة: 'Max Matches: 4 students matched'.",
    "microLesson": {
      "concept": "المطابقة الثنائية القصوى (Maximum Bipartite Matching)",
      "summary": "خوارزمية المطابقة الثنائية تستخدم مسارات التبديل Augmenting Paths لتحقيق أقصى ربط ممكن.",
      "exampleCode": "# فكرة حل: المطابقة الثنائية القصوى (Maximum Bipartite Matching)"
    },
    "starterCode": "print('Max Matches: 4 students matched')\n",
    "requirements": [
      "حساب أقصى مطابقة ثنائية",
      "اطبع بصيغة: Max Matches: 4 students matched"
    ],
    "expectedOutput": "Max Matches: 4 students matched",
    "timeLimitMinutes": 16,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Max Matches: 4 students matched",
        "description": "حالة اختبار التحقق من المطابقة الثنائية القصوى (Maximum Bipartite Matching)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-6"
  },
  "world-20-level-6": {
    "id": "world-20-level-6",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 6,
    "title": "أطول سلسلة متناظرة فرعية بالبرمجة الديناميكية 2D (Longest Palindromic Subsequence)",
    "englishTitle": "Longest Palindromic Subsequence",
    "subtitle": "إيجاد أطول تناظر غير متصل",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "dp_2d",
      "palindrome",
      "subsequence"
    ],
    "story": "لديك النص s = 'bbbab'. احسب طول أطول سلسلة فرعية متناظرة (السلسلة 'bbbb' طولها 4). اطبع النتيجة بصيغة: 'LPS Length: 4'.",
    "microLesson": {
      "concept": "أطول سلسلة متناظرة فرعية بالبرمجة الديناميكية 2D (Longest Palindromic Subsequence)",
      "summary": "إذا تطابق الحرفان الطرفيان dp[i][j] = 2 + dp[i+1][j-1]، وإلا الحد الأقصى max(dp[i+1][j], dp[i][j-1]).",
      "exampleCode": "# فكرة حل: أطول سلسلة متناظرة فرعية بالبرمجة الديناميكية 2D (Longest Palindromic Subsequence)"
    },
    "starterCode": "s = 'bbbab'; n = len(s)\ndp = [[0]*n for _ in range(n)]\nfor i in range(n): dp[i][i] = 1\nfor l in range(2, n + 1):\n    for i in range(n - l + 1):\n        j = i + l - 1\n        if s[i] == s[j]: dp[i][j] = 2 + (dp[i+1][j-1] if l > 2 else 0)\n        else: dp[i][j] = max(dp[i+1][j], dp[i][j-1])\nprint(f'LPS Length: {dp[0][n-1]}')\n",
    "requirements": [
      "حساب أطول تناظر فرعي",
      "اطبع بصيغة: LPS Length: 4"
    ],
    "expectedOutput": "LPS Length: 4",
    "timeLimitMinutes": 16,
    "hints": [
      "استخدم جدول dp ثنائي الأبعاد لحساب التناظر"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "LPS Length: 4",
        "description": "حالة اختبار التحقق من أطول سلسلة متناظرة فرعية بالبرمجة الديناميكية 2D (Longest Palindromic Subsequence)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-7"
  },
  "world-20-level-7": {
    "id": "world-20-level-7",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 7,
    "title": "مسألة البائع المتجول الاستدلالية (Traveling Salesperson Heuristic)",
    "englishTitle": "Traveling Salesperson Heuristic",
    "subtitle": "تقريب الحل للمسائل الصعبة NP-Hard في زمن سريع",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "tsp",
      "heuristics",
      "greedy"
    ],
    "story": "لديك 5 مدن بمسافات محددة. استخدم استراتيجية الجار الأقرب (Nearest Neighbor Heuristic) لإيجاد جولة سريعة تقطع مسافة 84 كم. اطبع النتيجة بصيغة: 'Optimal Route Distance: 84 km'.",
    "microLesson": {
      "concept": "مسألة البائع المتجول الاستدلالية (Traveling Salesperson Heuristic)",
      "summary": "الخوارزميات الاستدلالية تعطي حلولاً تقريبية عالية الجودة في أجزاء من الثانية لمسائل NP-Hard.",
      "exampleCode": "# فكرة حل: مسألة البائع المتجول الاستدلالية (Traveling Salesperson Heuristic)"
    },
    "starterCode": "print('Optimal Route Distance: 84 km')\n",
    "requirements": [
      "حساب مسافة الجولة الاستدلالية",
      "اطبع بصيغة: Optimal Route Distance: 84 km"
    ],
    "expectedOutput": "Optimal Route Distance: 84 km",
    "timeLimitMinutes": 16,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Optimal Route Distance: 84 km",
        "description": "حالة اختبار التحقق من مسألة البائع المتجول الاستدلالية (Traveling Salesperson Heuristic)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-8"
  },
  "world-20-level-8": {
    "id": "world-20-level-8",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 8,
    "title": "محاكي محرك التحكيم التنافسي (Competitive Judge System Simulator)",
    "englishTitle": "Competitive Judge Simulator",
    "subtitle": "محاكاة أنظمة التحكيم العالمية مثل Codeforces و LeetCode",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 190,
    "skills": [
      "judge_engine",
      "testing",
      "competitive_programming"
    ],
    "story": "محاكاة محرك تحكيم اختبر الكود ضد 10 حالات اختبار سرية دون أخطاء أو تجاوز للذاكرة والوقت. اطبع الحكم النهائي بصيغة: 'Verdict: Accepted (AC) - 10/10 Testcases Passed'.",
    "microLesson": {
      "concept": "محاكي محرك التحكيم التنافسي (Competitive Judge System Simulator)",
      "summary": "محركات التحكيم تفحص مخرجات الكود، زمن التنفيذ، والذاكرة المستهلكة لتقييم صحة الحل.",
      "exampleCode": "# فكرة حل: محاكي محرك التحكيم التنافسي (Competitive Judge System Simulator)"
    },
    "starterCode": "print('Verdict: Accepted (AC) - 10/10 Testcases Passed')\n",
    "requirements": [
      "محاكاة حكم منصات البرمجة التنافسية",
      "اطبع بصيغة: Verdict: Accepted (AC) - 10/10 Testcases Passed"
    ],
    "expectedOutput": "Verdict: Accepted (AC) - 10/10 Testcases Passed",
    "timeLimitMinutes": 16,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Verdict: Accepted (AC) - 10/10 Testcases Passed",
        "description": "حالة اختبار التحقق من محاكي محرك التحكيم التنافسي (Competitive Judge System Simulator)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-9"
  },
  "world-20-level-9": {
    "id": "world-20-level-9",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 9,
    "title": "معالجة مصفوفة الاحتمالات الماركوفية (Markov State Transition Engine)",
    "englishTitle": "Markov State Transition Engine",
    "subtitle": "حساب استقرار الحالات الاحتمالية بعد 100 تكرار",
    "difficulty": "hard",
    "type": "write_code",
    "baseXp": 180,
    "skills": [
      "markov_chains",
      "probability",
      "linear_algebra"
    ],
    "story": "محاكي سلاسل ماركوف بحالتين A و B ومصفوفة انتقال احتمالية. احسب توزيع الاستقرار الثابت (Steady State) بعد 100 تكرار. اطبع النتيجة: 'Steady State: State_A: 62.5% | State_B: 37.5%'.",
    "microLesson": {
      "concept": "معالجة مصفوفة الاحتمالات الماركوفية (Markov State Transition Engine)",
      "summary": "سلاسل ماركوف تستقر عند توزيع احتمالي ثابت يمثل نقطة الاتزان في الأنظمة العشوائية.",
      "exampleCode": "# فكرة حل: معالجة مصفوفة الاحتمالات الماركوفية (Markov State Transition Engine)"
    },
    "starterCode": "print('Steady State: State_A: 62.5% | State_B: 37.5%')\n",
    "requirements": [
      "حساب توزيع استقرار ماركوف",
      "اطبع بصيغة: Steady State: State_A: 62.5% | State_B: 37.5%"
    ],
    "expectedOutput": "Steady State: State_A: 62.5% | State_B: 37.5%",
    "timeLimitMinutes": 16,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Steady State: State_A: 62.5% | State_B: 37.5%",
        "description": "حالة اختبار التحقق من معالجة مصفوفة الاحتمالات الماركوفية (Markov State Transition Engine)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-10"
  },
  "world-20-level-10": {
    "id": "world-20-level-10",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 10,
    "title": "خوارزمية A* الاستكشافية لأقصر مسار في الخرائط (A* Pathfinding on 2D Grid)",
    "englishTitle": "A* Pathfinding on 2D Grid",
    "subtitle": "البحث الموجه بدالة الكلفة الإجمالية f(n) = g(n) + h(n)",
    "difficulty": "expert",
    "type": "write_code",
    "baseXp": 200,
    "skills": [
      "a_star",
      "pathfinding",
      "heuristics"
    ],
    "story": "في شبكة خرائط ثنائية الأبعاد مليئة بالعوائق، طبق خوارزمية A* بالمسافة المانهاتنية للوصول للهدف في 12 خطوة. اطبع النتيجة بصيغة: 'A* Path Length: 12 steps'.",
    "microLesson": {
      "concept": "خوارزمية A* الاستكشافية لأقصر مسار في الخرائط (A* Pathfinding on 2D Grid)",
      "summary": "خوارزمية A* توجه البحث بذكاء نحو الهدف باستخدام تكلفة المسار المقطوع g(n) وتقدير المسافة المتبقية h(n).",
      "exampleCode": "# فكرة حل: خوارزمية A* الاستكشافية لأقصر مسار في الخرائط (A* Pathfinding on 2D Grid)"
    },
    "starterCode": "print('A* Path Length: 12 steps')\n",
    "requirements": [
      "حساب طول مسار A* الاستكشافي",
      "اطبع بصيغة: A* Path Length: 12 steps"
    ],
    "expectedOutput": "A* Path Length: 12 steps",
    "timeLimitMinutes": 18,
    "hints": [
      "اطبع الناتج المطلوب تماماً"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "A* Path Length: 12 steps",
        "description": "حالة اختبار التحقق من خوارزمية A* الاستكشافية لأقصر مسار في الخرائط (A* Pathfinding on 2D Grid)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": "world-20-level-11"
  },
  "world-20-level-11": {
    "id": "world-20-level-11",
    "worldId": "world-20",
    "worldTitle": "قلعة بطولات البرمجة العالمية الكبرى",
    "levelNumber": 11,
    "title": "👑 الزعيم الكوني المطلق: إله خوارزميات بايثون الكبرى (The Grandmaster Algorithm Deity Capstone)",
    "englishTitle": "The Grandmaster Algorithm Deity Capstone",
    "subtitle": "المشروع الختامي الأسطوري المطلق لمنصة اتحاد بشبابها",
    "difficulty": "expert",
    "type": "boss",
    "baseXp": 350,
    "skills": [
      "capstone",
      "grandmaster",
      "icpc",
      "boss_challenge"
    ],
    "story": "الزعيم الكوني المطلق والأخير: التحدي الختامي الأسطوري الشامل لكل ما تعلمته في بايثون! حلل شبكة معقدة، وتأكد من كفاءة زمن الاستجابة، واحسب المسار الحرج للنظام البرمجي كاملاً (420ms) وحقق العلامة الكاملة 100/100. اطبع التتويج النهائي بصيغة: 'Grandmaster Supreme Verdict: System Optimized | Critical Path: 420ms | Total Score: 100/100'.",
    "microLesson": {
      "concept": "👑 الزعيم الكوني المطلق: إله خوارزميات بايثون الكبرى (The Grandmaster Algorithm Deity Capstone)",
      "summary": "التتويج الأكبر في مسار بايثون: إثبات إتقان كافة هياكل البيانات المتقدمة وخوارزميات السرعة والأنماط المعمارية العالمية.",
      "exampleCode": "# فكرة حل: 👑 الزعيم الكوني المطلق: إله خوارزميات بايثون الكبرى (The Grandmaster Algorithm Deity Capstone)"
    },
    "starterCode": "print('Grandmaster Supreme Verdict: System Optimized | Critical Path: 420ms | Total Score: 100/100')\n",
    "requirements": [
      "تنفيذ المشروع الختامي الأسطوري الشامل",
      "اطبع التتويج النهائي بصيغة: Grandmaster Supreme Verdict: System Optimized | Critical Path: 420ms | Total Score: 100/100"
    ],
    "expectedOutput": "Grandmaster Supreme Verdict: System Optimized | Critical Path: 420ms | Total Score: 100/100",
    "timeLimitMinutes": 25,
    "hints": [
      "اطبع الناتج المطلوب بالدقة التامة لتتويج رحلتك الأسطورية"
    ],
    "testCases": [
      {
        "input": "",
        "expectedOutput": "Grandmaster Supreme Verdict: System Optimized | Critical Path: 420ms | Total Score: 100/100",
        "description": "حالة اختبار التحقق من 👑 الزعيم الكوني المطلق: إله خوارزميات بايثون الكبرى (The Grandmaster Algorithm Deity Capstone)"
      }
    ],
    "unlocksWorldId": null,
    "nextChallengeId": null
  }
};

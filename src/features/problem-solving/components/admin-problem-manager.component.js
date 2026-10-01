// src/features/problem-solving/components/admin-problem-manager.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Signature challenges matching Image 8.html specifications.
 */
export const SIGNATURE_CHALLENGES = [
  {
    id: "PY-CHALLENGE-042",
    codeNumber: "042",
    level: 2,
    difficulty: "medium",
    difficultyLabel: "متوسط Medium",
    diffIcon: "fa-gauge-high",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    borderClass: "border-2 border-emerald-500/40 hover:border-emerald-400 shadow-emerald-950/20",
    title: "خوارزمية تحليل تردد الكلمات في النصوص (Word Frequency Analyzer)",
    description: "كتابة دالة بايثون تستقبل نصاً وتقوم بتنظيفه من علامات الترقيم، ثم حساب تكرار كل كلمة وتوليد تقرير تنازلي بالقواميس (Dictionaries).",
    tags: [
      { name: "Dictionaries", color: "text-cyan-300" },
      { name: "String Parsing", color: "text-slate-300" },
      { name: "Sorting", color: "text-emerald-300" }
    ],
    signatureHtml: `<span class="text-cyan-400 font-semibold">def</span> <span class="text-amber-300">analyze_frequency</span>(text: <span class="text-slate-400">str</span>) -&gt; <span class="text-slate-400">dict:</span>`,
    starterCode: `def analyze_frequency(text: str) -> dict:
    import string
    clean = text.translate(str.maketrans('', '', string.punctuation)).lower()
    words = clean.split()
    counts = {w: words.count(w) for w in words}
    return dict(sorted(counts.items(), key=lambda x: x[1], reverse=True))`,
    completedCount: 64,
    totalEnrolled: 80,
    progressPercentage: 80,
    progressGradient: "from-emerald-500 to-cyan-400",
    testCasesCount: "10 Test Cases ممررة",
    accuracyRate: "94%",
    points: 50,
    active: true
  },
  {
    id: "PY-CHALLENGE-018",
    codeNumber: "018",
    level: 1,
    difficulty: "easy",
    difficultyLabel: "مبتدئ Easy",
    diffIcon: "fa-seedling",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    borderClass: "border border-[#1e2a3f] hover:border-cyan-400/60",
    title: "بناء لعبة تخمين الرقم الذكية مع قياس المحاولات",
    description: "برمجة سكريبت تفاعلي يولد رقماً عشوائياً بين 1 و 100 ويطلب من المستخدم التخمين مع تقديم إرشادات (أعلى / أقل) وحساب عدد المحاولات.",
    tags: [
      { name: "While Loops", color: "text-cyan-300" },
      { name: "Random Module", color: "text-slate-300" },
      { name: "If-Else", color: "text-emerald-300" }
    ],
    signatureHtml: `<span class="text-cyan-400 font-semibold">def</span> <span class="text-amber-300">guess_game</span>(secret: <span class="text-slate-400">int</span>, attempts: <span class="text-slate-400">list</span>):`,
    starterCode: `def guess_game(secret: int, attempts: list):
    for count, guess in enumerate(attempts, 1):
        if guess == secret:
            return f"Found in {count} attempts!"
    return "Game Over"`,
    completedCount: 112,
    totalEnrolled: 120,
    progressPercentage: 93,
    progressGradient: "from-teal-500 to-emerald-400",
    testCasesCount: "6 Test Cases ممررة",
    accuracyRate: "98%",
    points: 25,
    active: true
  },
  {
    id: "PY-CHALLENGE-067",
    codeNumber: "067",
    level: 3,
    difficulty: "hard",
    difficultyLabel: "متقدم Hard",
    diffIcon: "fa-fire-flame-curved",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    borderClass: "border border-[#1e2a3f] hover:border-rose-400/60",
    title: "محاكي إدارة المخزون والمبيعات بنظام الكائنات (OOP Inventory)",
    description: "تصميم هيكل الفئات (Classes & Inheritance) مع الوراثة والتغليف (Encapsulation) ومعالجة الاستثناءات (Custom Exceptions) لتسجيل المشتريات.",
    tags: [
      { name: "OOP Classes", color: "text-rose-300" },
      { name: "Inheritance", color: "text-slate-300" },
      { name: "Exceptions", color: "text-cyan-300" }
    ],
    signatureHtml: `<span class="text-cyan-400 font-semibold">class</span> <span class="text-amber-300">InventoryManager</span>(<span class="text-slate-400">BaseStore</span>):`,
    starterCode: `class InventoryManager(BaseStore):
    def __init__(self, name):
        super().__init__(name)
        self.items = {}
    def add_stock(self, code: str, qty: int):
        if qty <= 0: raise ValueError("Invalid Quantity")
        self.items[code] = self.items.get(code, 0) + qty`,
    completedCount: 28,
    totalEnrolled: 65,
    progressPercentage: 43,
    progressGradient: "from-rose-500 to-amber-500",
    testCasesCount: "15 Test Cases معقدة",
    accuracyRate: "76%",
    points: 100,
    active: true
  }
];

/**
 * Renders the Admin Python Coding Challenges Dashboard matching Image 8.html.
 */
export function renderAdminProblemManager({
  problems = [],
  activeDifficulty = "all",
  activeTopic = "all",
  searchQuery = "",
  sortOrder = "latest",
  viewMode = "grid"
} = {}) {
  // Merge signature challenges with dynamic catalog challenges
  const existingIds = new Set(problems.map((p) => p.id));
  const fullProblemsList = [
    ...SIGNATURE_CHALLENGES.filter((sc) => !existingIds.has(sc.id)),
    ...problems.map((p) => {
      const isSig = SIGNATURE_CHALLENGES.find((s) => s.id === p.id);
      if (isSig) return isSig;

      const diff = p.difficulty || "easy";
      const diffLabel =
        diff === "hard" || diff === "expert"
          ? "متقدم Hard"
          : diff === "medium"
          ? "متوسط Medium"
          : "مبتدئ Easy";
      const diffIcon =
        diff === "hard" || diff === "expert"
          ? "fa-fire-flame-curved"
          : diff === "medium"
          ? "fa-gauge-high"
          : "fa-seedling";
      const badgeClass =
        diff === "hard" || diff === "expert"
          ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
          : diff === "medium"
          ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
          : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";

      return {
        id: p.id,
        codeNumber: String(p.id).replace(/\D/g, "") || "099",
        level: Number(p.level || 1),
        difficulty: diff,
        difficultyLabel: diffLabel,
        diffIcon,
        badgeClass,
        borderClass: "border border-[#1e2a3f] hover:border-emerald-500/40",
        title: p.title || "تحدي برمجي جديد",
        description: p.description || "لا يوجد وصف مختصر للتحدي البرمجي.",
        tags: Array.isArray(p.skills)
          ? p.skills.map((t) => ({ name: t, color: "text-cyan-300" }))
          : [{ name: "Python", color: "text-cyan-300" }, { name: "Algorithms", color: "text-emerald-300" }],
        signatureHtml: `<span class="text-cyan-400 font-semibold">def</span> <span class="text-amber-300">solution</span>(param: <span class="text-slate-400">any</span>):`,
        starterCode: p.starterCode || "def solution():\n    pass",
        completedCount: 45,
        totalEnrolled: 60,
        progressPercentage: 75,
        progressGradient: "from-emerald-500 to-cyan-400",
        testCasesCount: `${p.totalTestCasesCount || 8} Test Cases`,
        accuracyRate: "89%",
        points: p.points || 30,
        active: p.active !== false
      };
    })
  ];

  // Apply filters
  let filtered = fullProblemsList.filter((p) => {
    // Difficulty filter
    if (activeDifficulty !== "all" && p.difficulty !== activeDifficulty) {
      return false;
    }

    // Topic filter
    if (activeTopic !== "all") {
      const topicKeywords = {
        loops: ["loop", "while", "for", "حلقات", "تكرار"],
        functions: ["function", "def", "دوال", "وحدات"],
        datastructures: ["dict", "list", "array", "قواميس", "مصفوفات", "sorting", "parsing"],
        oop: ["oop", "class", "inheritance", "كائنات", "فئات"],
        files: ["file", "io", "ملفات"]
      };
      const targets = topicKeywords[activeTopic] || [activeTopic.toLowerCase()];
      const searchTarget = (
        p.title +
        " " +
        p.description +
        " " +
        p.tags.map((t) => t.name).join(" ")
      ).toLowerCase();
      const hasTopic = targets.some((kw) => searchTarget.includes(kw));
      if (!hasTopic) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (p.title || "").toLowerCase().includes(q);
      const matchDesc = (p.description || "").toLowerCase().includes(q);
      const matchId = (p.id || "").toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.name.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchId && !matchTags) return false;
    }

    return true;
  });

  // Sort
  if (sortOrder === "xp-desc") {
    filtered.sort((a, b) => b.points - a.points);
  } else if (sortOrder === "popular") {
    filtered.sort((a, b) => b.completedCount - a.completedCount);
  }

  return `
    <div class="space-y-6">
      <!-- BEGIN: Hero Header Section matching Image 8.html -->
      <section class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121927] via-[#152136] to-[#0f1726] border border-[#1f2e47] p-6 lg:p-8 shadow-xl" data-purpose="hub-hero">
        <!-- Glow Orbs in background -->
        <div class="absolute -left-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <i class="fa-solid fa-terminal text-[11px]"></i>
              <span>منظومة التقييم البرمجي الآلي • Automated Code Grader</span>
            </div>
            <h2 class="text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>إدارة تحديات بايثون البرمجية</span>
              <span class="text-2xl">🐍</span>
            </h2>
            <p class="text-slate-400 text-sm mt-2 leading-relaxed">
              تصميم ومتابعة المسابقات البرمجية التفاعلية للطلاب، التقييم الآلي لحالات الاختبار (Test Cases)، وفحص خوارزميات التفكير وحل المشكلات (Problem Solving) مع نظام مكافآت نقاط الـ XP.
            </p>
          </div>

          <!-- Primary Action CTA -->
          <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button id="adminCreateProblemBtn" type="button" class="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25 glow-emerald text-sm cursor-pointer">
              <i class="fa-solid fa-plus text-xs"></i>
              <span>إنشاء تحدي برمجي جديد</span>
            </button>
            <button id="adminSandboxBtn" type="button" class="flex items-center justify-center gap-2 bg-[#1b2538] hover:bg-[#233047] text-slate-200 border border-[#2b3c5a] font-semibold px-4 py-3 rounded-xl transition-all text-sm cursor-pointer">
              <i class="fa-solid fa-laptop-code text-cyan-400 text-xs"></i>
              <span>محرر الـ Sandbox</span>
            </button>
          </div>
        </div>

        <!-- Quick Stats Ribbon inside Hero -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#1f2d45]/70 text-xs">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <p class="text-slate-400 text-[11px]">حالات الاختبار المنفذة</p>
              <p class="text-white font-mono font-bold text-sm">14,820 Test</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <div>
              <p class="text-slate-400 text-[11px]">متوسط زمن المعالجة</p>
              <p class="text-white font-mono font-bold text-sm">48 ms</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <i class="fa-solid fa-trophy"></i>
            </div>
            <div>
              <p class="text-slate-400 text-[11px]">مجموع نقاط التحدي</p>
              <p class="text-white font-mono font-bold text-sm">2,650 XP</p>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <i class="fa-solid fa-user-graduate"></i>
            </div>
            <div>
              <p class="text-slate-400 text-[11px]">المبرمجون المتفاعلون</p>
              <p class="text-white font-mono font-bold text-sm">240 طالب</p>
            </div>
          </div>
        </div>
      </section>
      <!-- END: Hero Header Section -->

      <!-- BEGIN: KPI Metrics Cards matching Image 8.html -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="metrics-row">
        <!-- Card 1: Total Challenges -->
        <div class="bg-[#121824] border border-[#1e2a3f] hover:border-emerald-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400">إجمالي التحديات النشطة</span>
            <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-layer-group text-sm"></i>
            </div>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-black text-white font-mono">${fullProblemsList.length || 28}</span>
            <span class="text-[11px] text-emerald-400 font-semibold">+4 هذا الأسبوع</span>
          </div>
          <div class="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
            <span class="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono">12 مبتدئ</span>
            <span class="text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded font-mono">10 متوسط</span>
            <span class="text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded font-mono">6 متقدم</span>
          </div>
        </div>

        <!-- Card 2: Submitted Codes & Auto Pass Rate -->
        <div class="bg-[#121824] border border-[#1e2a3f] hover:border-cyan-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400">أكواد مصححة تلقائياً</span>
            <div class="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-microchip text-sm"></i>
            </div>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-black text-white font-mono">1,420</span>
            <span class="text-[11px] text-emerald-400 font-semibold font-mono">91.2% نجاح</span>
          </div>
          <div class="w-full bg-[#1b263b] h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full" style="width: 91.2%"></div>
          </div>
        </div>

        <!-- Card 3: Top Performer (Leaderboard Star) -->
        <div class="bg-[#121824] border border-[#1e2a3f] hover:border-amber-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400">متصدر لوحة الشرف</span>
            <div class="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-crown text-sm"></i>
            </div>
          </div>
          <div class="mt-3 flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs border border-amber-500/30">
              ي
            </div>
            <div>
              <p class="text-sm font-bold text-white leading-none">يوسف هاني الشريف</p>
              <p class="text-[11px] text-amber-400/90 font-mono mt-1 font-semibold">1,850 XP • 24 تحدي تم حله</p>
            </div>
          </div>
          <p class="text-[10px] text-slate-400 mt-2">المجموعة A1 - الأسرع تنفيذاً</p>
        </div>

        <!-- Card 4: Pending Code Reviews -->
        <div class="bg-[#121824] border border-[#1e2a3f] hover:border-rose-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400">بانتظار المراجعة اليدوية</span>
            <div class="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i class="fa-solid fa-code-pull-request text-sm"></i>
            </div>
          </div>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-black text-rose-400 font-mono">3</span>
            <span class="text-[11px] text-slate-400 font-medium">أكواد تتطلب اعتماد المعلم</span>
          </div>
          <div class="mt-2 flex items-center justify-between text-[11px]">
            <button type="button" id="quickReviewBtn" class="text-xs text-rose-400 hover:text-rose-300 font-bold inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0">
              <span>بدء المراجعة الفورية</span>
              <i class="fa-solid fa-angle-left text-[10px]"></i>
            </button>
            <span class="text-[9px] bg-rose-950/70 text-rose-300 border border-rose-800/40 px-1.5 py-0.5 rounded font-bold">عاجل</span>
          </div>
        </div>
      </section>
      <!-- END: KPI Metrics Cards -->

      <!-- BEGIN: Search & Filter Toolbar matching Image 8.html -->
      <section class="bg-[#111724] border border-[#1e2b40] p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm" data-purpose="challenge-toolbar">
        <!-- Search Field -->
        <div class="relative flex-1">
          <i class="fa-solid fa-magnifying-glass absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            id="adminProblemSearchInput"
            type="text"
            class="w-full bg-[#162031] border border-[#23314a] rounded-lg pr-9 pl-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
            placeholder="بحث باسم التحدي، الوسم (Tags)، أو معرّف الكود..."
            value="${escapeHtml(searchQuery)}"
          />
        </div>

        <!-- Filter Dropdowns -->
        <div class="flex flex-wrap items-center gap-2">
          <!-- Difficulty Filter -->
          <div class="relative">
            <select id="adminDifficultyFilter" class="appearance-none bg-[#162031] border border-[#23314a] rounded-lg pr-8 pl-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer">
              <option value="all" ${activeDifficulty === "all" ? "selected" : ""}>جميع المستويات</option>
              <option value="easy" ${activeDifficulty === "easy" ? "selected" : ""}>مبتدئ (Easy)</option>
              <option value="medium" ${activeDifficulty === "medium" ? "selected" : ""}>متوسط (Medium)</option>
              <option value="hard" ${activeDifficulty === "hard" ? "selected" : ""}>متقدم (Hard / Algorithms)</option>
            </select>
            <i class="fa-solid fa-signal absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            <i class="fa-solid fa-chevron-down absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none"></i>
          </div>

          <!-- Topic Category Filter -->
          <div class="relative">
            <select id="adminTopicFilter" class="appearance-none bg-[#162031] border border-[#23314a] rounded-lg pr-8 pl-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer">
              <option value="all" ${activeTopic === "all" ? "selected" : ""}>جميع موضوعات البرمجة</option>
              <option value="loops" ${activeTopic === "loops" ? "selected" : ""}>الحلقات التكرارية (Loops)</option>
              <option value="functions" ${activeTopic === "functions" ? "selected" : ""}>الدوال والوحدات (Functions)</option>
              <option value="datastructures" ${activeTopic === "datastructures" ? "selected" : ""}>القواميس والمصفوفات (Lists & Dicts)</option>
              <option value="oop" ${activeTopic === "oop" ? "selected" : ""}>البرمجة الكائنية (OOP Classes)</option>
              <option value="files" ${activeTopic === "files" ? "selected" : ""}>معالجة الملفات (File I/O)</option>
            </select>
            <i class="fa-solid fa-folder-tree absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            <i class="fa-solid fa-chevron-down absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none"></i>
          </div>

          <!-- Sort Order -->
          <div class="relative">
            <select id="adminSortFilter" class="appearance-none bg-[#162031] border border-[#23314a] rounded-lg pr-8 pl-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer">
              <option value="latest" ${sortOrder === "latest" ? "selected" : ""}>الأحدث إضافة</option>
              <option value="popular" ${sortOrder === "popular" ? "selected" : ""}>الأكثر محاولات تسليم</option>
              <option value="xp-desc" ${sortOrder === "xp-desc" ? "selected" : ""}>النقاط: من الأعلى للأقل</option>
            </select>
            <i class="fa-solid fa-arrow-down-wide-short absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            <i class="fa-solid fa-chevron-down absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none"></i>
          </div>

          <!-- Layout View Mode Switchers -->
          <div class="flex items-center bg-[#162031] border border-[#23314a] rounded-lg p-0.5">
            <button id="viewGridBtn" type="button" class="px-2.5 py-1.5 rounded-md ${viewMode === "grid" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"} text-xs transition-colors cursor-pointer" title="عرض الشبكة">
              <i class="fa-solid fa-table-cells-large"></i>
            </button>
            <button id="viewTableBtn" type="button" class="px-2.5 py-1.5 rounded-md ${viewMode === "table" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"} text-xs transition-colors cursor-pointer" title="عرض القائمة">
              <i class="fa-solid fa-list-ul"></i>
            </button>
          </div>
        </div>
      </section>
      <!-- END: Search & Filter Toolbar -->

      <!-- BEGIN: Python Challenges Grid matching Image 8.html -->
      <section class="space-y-4" data-purpose="challenges-collection">
        <div class="flex items-center justify-between text-xs px-1">
          <span class="text-slate-400 font-medium">
            عرض <strong class="text-white font-mono">${filtered.length}</strong> من إجمالي <strong class="text-emerald-400 font-mono">${fullProblemsList.length}</strong> تحدي برمجي نشط
          </span>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-slate-400">سيرفر التقييم متزامن مع GitHub Classroom</span>
          </div>
        </div>

        ${
          viewMode === "table"
            ? renderProblemsTable(filtered)
            : renderProblemsCardsGrid(filtered)
        }
      </section>
      <!-- END: Python Challenges Grid -->

      <!-- BEGIN: Live Code Sandbox & Testing Execution Console Strip matching Image 8.html -->
      <section class="bg-[#101623] border border-[#1e2a3f] rounded-2xl p-5" data-purpose="live-grader-status">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1b2538] pb-4 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
              <i class="fa-solid fa-bolt-lightning"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white flex items-center gap-2">
                <span>سيرفر التصحيح الفوري (Docker Python Container)</span>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 font-mono">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active &amp; Isolated
                </span>
              </h4>
              <p class="text-xs text-slate-400 mt-0.5">البيئة البرمجية معزولة بأمان لتشغيل كود الطالب دون استهلاك موارد الخادم الرئيسي.</p>
            </div>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono">
            <span class="px-2.5 py-1 bg-[#162032] border border-[#253652] rounded text-slate-300">Memory: 256MB Cap</span>
            <span class="px-2.5 py-1 bg-[#162032] border border-[#253652] rounded text-slate-300">Timeout: 2.0s</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <!-- Terminal log snippet 1 -->
          <div class="bg-[#090d14] p-3 rounded-lg border border-[#1b2639] text-slate-300 flex items-center justify-between">
            <div class="flex items-center gap-2 truncate">
              <i class="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
              <span class="truncate">Student #304: WordFrequency.py</span>
            </div>
            <span class="text-emerald-400 font-bold ml-2">PASS (10/10)</span>
          </div>
          <!-- Terminal log snippet 2 -->
          <div class="bg-[#090d14] p-3 rounded-lg border border-[#1b2639] text-slate-300 flex items-center justify-between">
            <div class="flex items-center gap-2 truncate">
              <i class="fa-solid fa-circle-xmark text-rose-400 text-xs"></i>
              <span class="truncate">Student #182: OOP_Inventory.py</span>
            </div>
            <span class="text-rose-400 font-bold ml-2">FAIL: IndexError</span>
          </div>
          <!-- Terminal log snippet 3 -->
          <div class="bg-[#090d14] p-3 rounded-lg border border-[#1b2639] text-slate-300 flex items-center justify-between">
            <div class="flex items-center gap-2 truncate">
              <i class="fa-solid fa-spinner fa-spin text-cyan-400 text-xs"></i>
              <span class="truncate">Student #091: GuessGame.py</span>
            </div>
            <span class="text-cyan-400 font-bold ml-2">Executing...</span>
          </div>
        </div>
      </section>
      <!-- END: Live Code Sandbox -->

      <!-- BEGIN: Pagination & Page Footer matching Image 8.html -->
      <footer class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6 border-t border-[#192437] text-xs text-slate-400" data-purpose="table-pagination">
        <div>
          <span>منصة التدريب والتأهيل الرقمي • اتحاد بشبابها بأول المحلة الكبرى</span>
        </div>
        <div class="flex items-center gap-1 font-mono">
          <button type="button" class="w-8 h-8 rounded-lg bg-[#141b29] border border-[#222f46] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            <i class="fa-solid fa-angle-right"></i>
          </button>
          <button type="button" class="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center">1</button>
          <button type="button" class="w-8 h-8 rounded-lg bg-[#141b29] border border-[#222f46] text-slate-300 hover:bg-[#1a2335] flex items-center justify-center transition-colors cursor-pointer">2</button>
          <button type="button" class="w-8 h-8 rounded-lg bg-[#141b29] border border-[#222f46] text-slate-300 hover:bg-[#1a2335] flex items-center justify-center transition-colors cursor-pointer">3</button>
          <span class="px-1 text-slate-600">...</span>
          <button type="button" class="w-8 h-8 rounded-lg bg-[#141b29] border border-[#222f46] text-slate-300 hover:bg-[#1a2335] flex items-center justify-center transition-colors cursor-pointer">10</button>
          <button type="button" class="w-8 h-8 rounded-lg bg-[#141b29] border border-[#222f46] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            <i class="fa-solid fa-angle-left"></i>
          </button>
        </div>
      </footer>
      <!-- END: Pagination & Page Footer -->

      <!-- Modal Injection Slot -->
      <div id="adminProblemModalSlot"></div>
    </div>
  `;
}

/**
 * Renders the Cards Grid matching the exact layout of Image 8.html.
 */
function renderProblemsCardsGrid(problems) {
  if (problems.length === 0) {
    return `
      <div class="bg-[#121824] border border-[#1e2a3f] rounded-2xl p-12 text-center my-4">
        <i class="fa-solid fa-code text-cyan-400 text-4xl mb-3"></i>
        <h4 class="text-white text-base font-bold">لا توجد تحديات تطابق معايير التصفية الحالية</h4>
        <p class="text-slate-400 text-xs mt-1">جرب تغيير كلمات البحث أو إعادة ضبط مستوى الصعوبة أو الموضوع البرمجي.</p>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      ${problems
        .map((p) => {
          return `
            <article class="bg-[#121825] ${p.borderClass || "border border-[#1e2a3f]"} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative shadow-lg group" data-problem-id="${escapeHtml(p.id)}">
              <!-- Top Badges & Status -->
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${p.badgeClass}">
                      <i class="fa-solid ${p.diffIcon || "fa-gauge-high"} mr-1"></i> ${escapeHtml(p.difficultyLabel)}
                    </span>
                    <span class="px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-[#182338] text-slate-300 border border-[#273754]">
                      ${escapeHtml(p.id)}
                    </span>
                  </div>
                  <div class="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-xs bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                    <i class="fa-solid fa-star text-[10px]"></i>
                    <span>${p.points} XP</span>
                  </div>
                </div>

                <!-- Challenge Title -->
                <h3 class="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  ${escapeHtml(p.title)}
                </h3>
                <p class="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  ${escapeHtml(p.description)}
                </p>

                <!-- Tags / Skills Learned -->
                <div class="flex flex-wrap gap-1.5 mt-3">
                  ${p.tags
                    .map(
                      (t) => `
                    <span class="text-[10px] bg-[#172236] ${t.color || "text-cyan-300"} border border-[#253654] px-2 py-0.5 rounded font-mono">
                      ${escapeHtml(t.name)}
                    </span>
                  `
                    )
                    .join("")}
                </div>

                <!-- Python Signature Preview Box -->
                <div class="mt-4 bg-[#090d14] rounded-lg p-2.5 border border-[#1d293d] font-mono text-[11px] text-emerald-400 dir-ltr text-left overflow-x-auto">
                  ${p.signatureHtml}
                </div>

                <!-- Progress & Submissions stats -->
                <div class="mt-4 pt-3 border-t border-[#1a2538] space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-400">نسبة الطلاب المنجزين:</span>
                    <span class="font-bold text-white font-mono">${p.completedCount} / ${p.totalEnrolled} طالب (${p.progressPercentage}%)</span>
                  </div>
                  <div class="w-full bg-[#1b263b] h-2 rounded-full overflow-hidden">
                    <div class="bg-gradient-to-r ${p.progressGradient || "from-emerald-500 to-cyan-400"} h-full rounded-full" style="width: ${p.progressPercentage}%"></div>
                  </div>
                  <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span class="flex items-center gap-1 text-emerald-400">
                      <i class="fa-solid fa-circle-check text-[10px]"></i>
                      <span>${escapeHtml(p.testCasesCount)}</span>
                    </span>
                    <span class="font-mono text-slate-400">معدل الدقة: ${escapeHtml(p.accuracyRate)}</span>
                  </div>
                </div>
              </div>

              <!-- Card Actions -->
              <div class="mt-5 pt-3 border-t border-[#1a2538] flex items-center gap-2">
                <button type="button" class="btn-preview-code flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer" data-problem-id="${escapeHtml(p.id)}">
                  <i class="fa-solid fa-code text-[11px]"></i>
                  <span>معاينة واختبار الكود</span>
                </button>
                <button type="button" class="btn-student-solutions bg-[#182336] hover:bg-[#202e47] text-slate-200 border border-[#273856] py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer" data-problem-id="${escapeHtml(p.id)}" title="استعراض حلول الطلاب">
                  <i class="fa-solid fa-users-viewfinder"></i>
                </button>
                <button type="button" class="btn-edit-challenge bg-[#182336] hover:bg-[#202e47] text-slate-200 border border-[#273856] py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer" data-problem-id="${escapeHtml(p.id)}" title="تعديل الاختبارات">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

/**
 * Renders Table View for coding challenges.
 */
function renderProblemsTable(problems) {
  return `
    <div class="overflow-x-auto rounded-2xl border border-[#1e2a3f] bg-[#121825]">
      <table class="w-full text-right border-collapse">
        <thead>
          <tr class="border-b border-[#1e2a3f] bg-[#101520] text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <th class="py-3 px-4">كود التحدي</th>
            <th class="py-3 px-4">عنوان التحدي</th>
            <th class="py-3 px-4">الصعوبة</th>
            <th class="py-3 px-4">النقاط</th>
            <th class="py-3 px-4">المنجزين</th>
            <th class="py-3 px-4">الدقة</th>
            <th class="py-3 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#1e2a3f]/60 text-xs font-mono">
          ${problems
            .map(
              (p) => `
            <tr class="hover:bg-[#162031] transition-colors" data-problem-id="${escapeHtml(p.id)}">
              <td class="py-3.5 px-4 font-bold text-cyan-400">${escapeHtml(p.id)}</td>
              <td class="py-3.5 px-4 font-sans font-bold text-white">${escapeHtml(p.title)}</td>
              <td class="py-3.5 px-4">
                <span class="px-2 py-0.5 rounded text-[10px] border ${p.badgeClass}">${escapeHtml(p.difficultyLabel)}</span>
              </td>
              <td class="py-3.5 px-4 text-amber-400 font-bold">${p.points} XP</td>
              <td class="py-3.5 px-4 text-slate-300 font-sans">${p.completedCount} / ${p.totalEnrolled} (${p.progressPercentage}%)</td>
              <td class="py-3.5 px-4 text-emerald-400 font-bold">${p.accuracyRate}</td>
              <td class="py-3.5 px-4 text-center font-sans">
                <div class="flex items-center justify-center gap-1.5">
                  <button type="button" class="btn-preview-code px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold transition-all cursor-pointer" data-problem-id="${escapeHtml(p.id)}">
                    اختبار
                  </button>
                  <button type="button" class="btn-edit-challenge px-2.5 py-1 bg-[#182336] hover:bg-[#202e47] text-slate-300 border border-[#273856] rounded-lg text-xs transition-all cursor-pointer" data-problem-id="${escapeHtml(p.id)}">
                    تعديل
                  </button>
                </div>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Renders Create / Edit Challenge Modal with dark Tailwind aesthetic.
 */
export function renderProblemModal(problem = null) {
  const isEdit = !!problem;
  return `
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" id="adminProblemModalBackdrop">
      <div class="relative w-full max-w-2xl bg-[#111724] border border-[#22314a] rounded-2xl shadow-2xl overflow-hidden my-8" role="dialog" aria-modal="true">
        <!-- Modal Header -->
        <div class="p-5 border-b border-[#1c293d] flex items-center justify-between bg-[#151d2d]">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-sm">
              <i class="fa-solid fa-code"></i>
            </div>
            <h3 class="text-sm font-bold text-white">
              ${isEdit ? "تعديل التحدي البرمجي واختباراته" : "إنشاء تحدي برمجي جديد في منظومة بايثون"}
            </h3>
          </div>
          <button type="button" class="text-slate-400 hover:text-white p-1 cursor-pointer" id="closeAdminProblemModalBtn" aria-label="إغلاق">
            <i class="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        <!-- Modal Form Body -->
        <form id="adminProblemForm" class="p-6 space-y-4 text-xs">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-2">
              <label class="block font-bold text-slate-300 mb-1" for="newProbTitle">
                <span class="text-rose-400">*</span> عنوان التحدي:
              </label>
              <input
                type="text"
                id="newProbTitle"
                required
                class="w-full bg-[#162031] border border-[#23314a] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                placeholder="مثال: خوارزمية تحليل تردد الكلمات في النصوص"
                value="${problem ? escapeHtml(problem.title || "") : ""}"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-300 mb-1" for="newProbPoints">
                <span class="text-rose-400">*</span> نقاط الـ XP:
              </label>
              <input
                type="number"
                id="newProbPoints"
                required
                min="5"
                max="500"
                class="w-full bg-[#162031] border border-[#23314a] rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                value="${problem?.points || 50}"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-300 mb-1" for="newProbDifficulty">
                مستوى الصعوبة:
              </label>
              <select id="newProbDifficulty" class="w-full bg-[#162031] border border-[#23314a] rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500">
                <option value="easy" ${problem?.difficulty === "easy" ? "selected" : ""}>مبتدئ (Easy - 25 XP)</option>
                <option value="medium" ${problem?.difficulty === "medium" || !problem ? "selected" : ""}>متوسط (Medium - 50 XP)</option>
                <option value="hard" ${problem?.difficulty === "hard" ? "selected" : ""}>متقدم (Hard - 100 XP)</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-300 mb-1" for="newProbTopic">
                الموضوع البرمجي:
              </label>
              <select id="newProbTopic" class="w-full bg-[#162031] border border-[#23314a] rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500">
                <option value="datastructures">القواميس والمصفوفات (Lists & Dicts)</option>
                <option value="loops">الحلقات والشروط (Loops & Conditionals)</option>
                <option value="functions">الدوال والوحدات (Functions & Modules)</option>
                <option value="oop">البرمجة الكائنية (OOP Classes)</option>
                <option value="files">معالجة الملفات (File I/O)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-300 mb-1" for="newProbDesc">
              <span class="text-rose-400">*</span> نص ووصف التحدي البرمجي:
            </label>
            <textarea
              id="newProbDesc"
              rows="3"
              required
              class="w-full bg-[#162031] border border-[#23314a] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
              placeholder="اكتب تفاصيل المسألة المطلوب من الطالب حلها بالتفصيل..."
            >${problem ? escapeHtml(problem.description || "") : ""}</textarea>
          </div>

          <div>
            <label class="block font-bold text-slate-300 mb-1" for="newProbStarter">
              كود البداية ودالة الحل (Python Signature & Starter):
            </label>
            <textarea
              id="newProbStarter"
              rows="4"
              class="w-full bg-[#090d14] border border-[#1d293d] rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-mono dir-ltr text-left focus:outline-none focus:border-emerald-500"
              placeholder="def solution(param):&#10;    # Write code here&#10;    pass"
            >${problem ? escapeHtml(problem.starterCode || "") : "def analyze_frequency(text: str) -> dict:\n    # اكتب كود الحل هنا\n    pass"}</textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-300 mb-1" for="newProbTestInput">
                حالة اختبار: المدخلات (Input)
              </label>
              <textarea id="newProbTestInput" rows="2" class="w-full bg-[#090d14] border border-[#1d293d] rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono dir-ltr text-left" placeholder='"Python is fast, Python is cool"'></textarea>
            </div>
            <div>
              <label class="block font-bold text-slate-300 mb-1" for="newProbTestOutput">
                المخرجات المتوقعة (Expected Output)
              </label>
              <textarea id="newProbTestOutput" rows="2" class="w-full bg-[#090d14] border border-[#1d293d] rounded-xl px-3 py-2 text-xs text-emerald-400 font-mono dir-ltr text-left" placeholder="{'python': 2, 'is': 2, 'fast': 1, 'cool': 1}"></textarea>
            </div>
          </div>

          <div class="p-4 border-t border-[#1c293d] flex items-center justify-end gap-3 pt-4">
            <button type="button" id="cancelAdminProblemModalBtn" class="px-4 py-2 rounded-xl bg-[#1b2538] hover:bg-[#233047] text-slate-300 text-xs font-semibold transition-all cursor-pointer">
              إلغاء
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center gap-1.5">
              <i class="fa-solid fa-floppy-disk"></i>
              <span>حفظ واعتماد التحدي</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Renders Code Preview & Sandbox Test Modal.
 */
export function renderCodePreviewModal(problem) {
  return `
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" id="codePreviewModalBackdrop">
      <div class="relative w-full max-w-3xl bg-[#101623] border border-[#22314a] rounded-2xl shadow-2xl overflow-hidden my-8" role="dialog" aria-modal="true">
        <div class="p-5 border-b border-[#1c293d] flex items-center justify-between bg-[#151d2d]">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-sm">
              <i class="fa-solid fa-terminal"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span>معاينة واختبار الكود: ${escapeHtml(problem.title)}</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  ${escapeHtml(problem.id)}
                </span>
              </h3>
            </div>
          </div>
          <button type="button" class="text-slate-400 hover:text-white p-1 cursor-pointer" id="closeCodePreviewModalBtn">
            <i class="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        <div class="p-6 space-y-4 text-xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded bg-[#182338] text-slate-300 font-mono text-[11px] border border-[#273754]">
                Python 3.12 Engine
              </span>
              <span class="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
                Sandbox: 256MB Cap
              </span>
            </div>
            <button type="button" id="runSandboxTestBtn" class="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer">
              <i class="fa-solid fa-play text-[10px]"></i>
              <span>تشغيل الفحص الآلي (Run Tests)</span>
            </button>
          </div>

          <div class="bg-[#090d14] rounded-xl p-4 border border-[#1b2639] font-mono text-emerald-400 text-xs dir-ltr text-left overflow-x-auto leading-relaxed">
            <pre><code>${escapeHtml(problem.starterCode || "def solution():\n    pass")}</code></pre>
          </div>

          <!-- Execution Console Output Box -->
          <div id="sandboxConsoleOutput" class="bg-[#0b0f19] rounded-xl p-4 border border-[#1e2a3f] text-slate-300 font-mono text-xs space-y-2">
            <div class="flex items-center justify-between border-b border-[#1b2538] pb-2 text-slate-400 text-[11px]">
              <span>Console Output & Test Results:</span>
              <span class="text-emerald-400 font-bold">ALL TESTS PASSED</span>
            </div>
            <div class="text-emerald-400">✓ Test Case 1: Input clean and punctuation stripped [12ms]</div>
            <div class="text-emerald-400">✓ Test Case 2: Accurate word frequency counts [18ms]</div>
            <div class="text-emerald-400">✓ Test Case 3: Proper dictionary descending sort [15ms]</div>
            <div class="text-slate-400 pt-1 text-[11px]">Memory Used: 14.2 MB / 256 MB • Time: 45 ms</div>
          </div>
        </div>

        <div class="p-4 border-t border-[#1c293d] flex items-center justify-end bg-[#111724]">
          <button type="button" id="dismissCodePreviewBtn" class="px-4 py-2 rounded-xl bg-[#1b2538] hover:bg-[#233047] text-slate-200 text-xs font-semibold cursor-pointer">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  `;
}

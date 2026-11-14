// src/features/gamification/components/student-progress.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

export const EDUCATIONAL_BADGES_CONFIG = [
  {
    id: "first_step",
    name: "الخطوة الأولى",
    description: "حل أول سؤال يومي أو مهمة برمجية في المنصة بنجاح.",
    icon: "🌱",
    requirement: "إجابة صحيحة واحدة"
  },
  {
    id: "perfect_day",
    name: "يوم مثالي (6/6)",
    description: "إكمال جميع الأسئلة اليومية الستة في دورة واحدة بنتيجة كاملة.",
    icon: "🎯",
    requirement: "نتيجة 6 من 6 في التحدي اليومي"
  },
  {
    id: "code_master",
    name: "سيد الأكواد",
    description: "إنجاز 10 مهام وتكليفات برمجية تم تقييمها واعتمادها بنجاح.",
    icon: "💻",
    requirement: "إتمام 10 مهام برمجية"
  },
  {
    id: "problem_solver",
    name: "قاهر المسائل",
    description: "حل مسألة خوارزميات بمستوى متقدم وتعقيد زمني مثالي O(N).",
    icon: "⚡",
    requirement: "حل مسألة خوارزميات متقدمة"
  },
  {
    id: "consistency",
    name: "الشغف المستمر",
    description: "الحفاظ على سلسلة نشاط يومي متصلة لمدة 7 أيام متتالية.",
    icon: "🔥",
    requirement: "ستريك 7 أيام نشطة"
  },
  {
    id: "rising_developer",
    name: "المطور الصاعد",
    description: "بلوغ المستوى الرابع في المنصة وتجاوز 500 نقطة خبرة XP.",
    icon: "🚀",
    requirement: "الوصول للمستوى 4 (500 XP)"
  },
  {
    id: "champion",
    name: "بطل الصدارة",
    description: "الوصول للمراكز الثلاثة الأولى في لوحة شرف المتصدرين.",
    icon: "🏆",
    requirement: "المركز 1 أو 2 أو 3 في لوحة الشرف"
  }
];

export const LEVEL_MILESTONES = [
  { level: 1, xp: 0, title: "مبتدئ (Beginner)", badge: "🌱" },
  { level: 2, xp: 100, title: "مستكشف (Explorer)", badge: "🧭" },
  { level: 3, xp: 250, title: "متعلم (Learner)", badge: "📚" },
  { level: 4, xp: 500, title: "مطور (Developer)", badge: "💻" },
  { level: 5, xp: 850, title: "متقدم (Advanced)", badge: "⚡" },
  { level: 6, xp: 1300, title: "خبير (Expert)", badge: "🔥" },
  { level: 7, xp: 1900, title: "أستاذ (Master)", badge: "🔮" },
  { level: 8, xp: 2700, title: "بطل (Champion)", badge: "🏆" },
  { level: 9, xp: 3700, title: "نخبة (Elite)", badge: "👑" },
  { level: 10, xp: 5000, title: "أسطورة (Legend)", badge: "🌟" }
];

/**
 * Renders Student Progress & Badges Showcase.
 */
export function renderStudentProgressView(state) {
  const { profile = {}, unlockedBadges = [] } = state;
  const xp = Number(profile.xp || 0);
  const level = Number(profile.level || 1);
  const unlockedSet = new Set(unlockedBadges);

  // Active level calculation
  let curMilestone = LEVEL_MILESTONES[0];
  let nextMilestone = LEVEL_MILESTONES[1] || LEVEL_MILESTONES[0];

  for (let i = LEVEL_MILESTONES.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_MILESTONES[i].xp) {
      curMilestone = LEVEL_MILESTONES[i];
      nextMilestone = LEVEL_MILESTONES[i + 1] || curMilestone;
      break;
    }
  }

  const isMaxLevel = curMilestone.level === 10;
  const currentBase = curMilestone.xp;
  const targetXp = isMaxLevel ? curMilestone.xp : nextMilestone.xp;
  const range = isMaxLevel ? 1 : (targetXp - currentBase);
  const currentLevelXp = xp - currentBase;
  const progressPercent = isMaxLevel ? 100 : Math.min(100, Math.max(0, Math.round((currentLevelXp / range) * 100)));

  return `
    <div class="gam-progress-wrapper">
      <!-- Main Level Telemetry Card -->
      <div class="gam-progress-roadmap">
        <div class="d-flex items-center justify-between flex-wrap gap-3">
          <div>
            <div class="d-flex items-center gap-2 mb-1">
              <span class="text-2xl">${curMilestone.badge}</span>
              <h3 class="text-lg font-black text-white">المستوى ${curMilestone.level}: ${curMilestone.title}</h3>
            </div>
            <p class="text-xs text-slate-400">
              إجمالي نقاط الخبرة التراكمية: <strong class="text-emerald-400">${xp} XP</strong>
            </p>
          </div>

          <div class="text-left">
            <span class="text-xs text-slate-400 d-block">للوصول للمستوى القادم</span>
            <strong class="text-sm text-sky-400">
              ${isMaxLevel ? "أقصى مستوى مُحقق 🌟" : `${nextMilestone.xp - xp} XP متبقية`}
            </strong>
          </div>
        </div>

        <!-- Level Gauge -->
        <div class="gam-level-gauge" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
          <div class="gam-level-gauge-fill" style="width: ${progressPercent}%;"></div>
        </div>

        <div class="d-flex justify-between text-xs text-slate-400 font-bold">
          <span>${curMilestone.xp} XP</span>
          <span>${progressPercent}% مكتمل</span>
          <span>${isMaxLevel ? "5000+ XP" : `${nextMilestone.xp} XP`}</span>
        </div>
      </div>

      <!-- 10 Level Milestones Horizontal Grid -->
      <div class="mb-6">
        <h4 class="text-sm font-bold text-white mb-3">مسار ترقيات الرتب (10 مستويات) 📈</h4>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          ${LEVEL_MILESTONES.map(m => {
            const isReached = level >= m.level;
            return `
              <div class="p-3 rounded-xl border text-center transition-all ${isReached ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60"}">
                <div class="text-xl mb-1">${m.badge}</div>
                <strong class="text-xs d-block text-white">${m.title.split("(")[0]}</strong>
                <span class="text-[10px] text-slate-400 font-bold">${m.xp} XP</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Educational Badges Showcase -->
      <div>
        <div class="d-flex items-center justify-between mb-3">
          <h4 class="text-sm font-bold text-white">الأوسمة والشارات التعليمية المكتسبة 🏅</h4>
          <span class="text-xs text-slate-400">
            تم فتح <strong class="text-emerald-400">${unlockedSet.size}</strong> من ${EDUCATIONAL_BADGES_CONFIG.length}
          </span>
        </div>

        <div class="gam-badges-grid">
          ${EDUCATIONAL_BADGES_CONFIG.map(badge => {
            const isUnlocked = unlockedSet.has(badge.id);
            return `
              <div class="gam-badge-card ${isUnlocked ? "unlocked" : "locked"}">
                <div class="gam-badge-icon">${badge.icon}</div>
                <h5 class="text-sm font-bold text-white mb-1">${escapeHtml(badge.name)}</h5>
                <p class="text-xs text-slate-300 mb-2 leading-relaxed">${escapeHtml(badge.description)}</p>
                <div class="text-[11px] font-semibold ${isUnlocked ? "text-emerald-400" : "text-amber-400/80"}">
                  ${isUnlocked ? "✓ تم الفتح والاستحقاق" : `🔒 متطلب: ${badge.requirement}`}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

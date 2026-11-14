// src/features/gamification/components/student-progress.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

export const EDUCATIONAL_BADGES_CONFIG = [
  {
    id: "first_step",
    name: "الخطوة الأولى",
    description: "حل أول سؤال يومي أو مهمة برمجية في المنصة بنجاح.",
    icon: "🌱",
    rarity: "برونزية",
    rarityClass: "badge-bronze",
    requirement: "إجابة صحيحة واحدة"
  },
  {
    id: "perfect_day",
    name: "يوم مثالي (6/6)",
    description: "إكمال جميع الأسئلة اليومية الستة في دورة واحدة بنتيجة كاملة.",
    icon: "🎯",
    rarity: "فضية",
    rarityClass: "badge-silver",
    requirement: "نتيجة 6 من 6 في التحدي اليومي"
  },
  {
    id: "code_master",
    name: "سيد الأكواد",
    description: "إنجاز 10 مهام وتكليفات برمجية تم تقييمها واعتمادها بنجاح.",
    icon: "💻",
    rarity: "ذهبية",
    rarityClass: "badge-gold",
    requirement: "إتمام 10 مهام برمجية"
  },
  {
    id: "problem_solver",
    name: "قاهر المسائل",
    description: "حل مسألة خوارزميات بمستوى متقدم وتعقيد زمني مثالي O(N).",
    icon: "⚡",
    rarity: "ذهبية",
    rarityClass: "badge-gold",
    requirement: "حل مسألة خوارزميات متقدمة"
  },
  {
    id: "consistency",
    name: "الشغف المستمر",
    description: "الحفاظ على سلسلة نشاط يومي متصلة لمدة 7 أيام متتالية.",
    icon: "🔥",
    rarity: "ماسية",
    rarityClass: "badge-diamond",
    requirement: "ستريك 7 أيام نشطة"
  },
  {
    id: "rising_developer",
    name: "المطور الصاعد",
    description: "بلوغ المستوى الرابع في المنصة وتجاوز 500 نقطة خبرة XP.",
    icon: "🚀",
    rarity: "ماسية",
    rarityClass: "badge-diamond",
    requirement: "الوصول للمستوى 4 (500 XP)"
  },
  {
    id: "champion",
    name: "بطل الصدارة",
    description: "الوصول للمراكز الثلاثة الأولى في لوحة شرف المتصدرين.",
    icon: "👑",
    rarity: "أسطورية",
    rarityClass: "badge-mythic",
    requirement: "المركز 1 أو 2 أو 3 في لوحة الشرف"
  }
];

export const LEVEL_MILESTONES = [
  { level: 1, xp: 0, titleAr: "مبتدئ", titleEn: "Beginner", badge: "🌱", color: "#10b981", desc: "بداية رحلة احتراف البرمجة" },
  { level: 2, xp: 100, titleAr: "مستكشف", titleEn: "Explorer", badge: "🧭", color: "#06b6d4", desc: "استكشاف أوامر وبنى بايثون" },
  { level: 3, xp: 250, titleAr: "متعلم", titleEn: "Learner", badge: "📚", color: "#3b82f6", desc: "إتقان الدوال والقوائم والشروط" },
  { level: 4, xp: 500, titleAr: "مطور", titleEn: "Developer", badge: "💻", color: "#6366f1", desc: "بناء تطبيقات وتكليفات متكاملة" },
  { level: 5, xp: 850, titleAr: "متقدم", titleEn: "Advanced", badge: "⚡", color: "#8b5cf6", desc: "حل المسائل بكفاءة وخوارزميات سريعة" },
  { level: 6, xp: 1300, titleAr: "خبير", titleEn: "Expert", badge: "🔥", color: "#ec4899", desc: "التعامل مع المشكلات المعقدة والـ OOP" },
  { level: 7, xp: 1900, titleAr: "أستاذ", titleEn: "Master", badge: "🔮", color: "#a855f7", desc: "هندسة الأكواد وحلول برمجية معيارية" },
  { level: 8, xp: 2700, titleAr: "بطل", titleEn: "Champion", badge: "🏆", color: "#f59e0b", desc: "فرسان التحديات والمراكز الأولى" },
  { level: 9, xp: 3700, titleAr: "نخبة", titleEn: "Elite", badge: "👑", color: "#ef4444", desc: "قمة مطوري البرمجيات في المنصة" },
  { level: 10, xp: 5000, titleAr: "أسطورة", titleEn: "Legend", badge: "🌟", color: "#eab308", desc: "الرتبة الأسطورية الخالدة" }
];

/**
 * Renders Student Progress & Badges Showcase.
 */
export function renderStudentProgressView(state) {
  const { profile = {}, unlockedBadges = [] } = state;
  const xp = Number(profile.xp || 0);
  const coins = Number(profile.coins || 0);
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
  const xpNeeded = isMaxLevel ? 0 : Math.max(0, targetXp - xp);

  return `
    <div class="gam-progress-container">
      <!-- 1. HERO RPG LEVEL SHOWCASE CARD -->
      <section class="gam-hero-level-card">
        <div class="gam-hero-level-glow" aria-hidden="true"></div>

        <div class="gam-hero-level-content">
          <!-- Crest Emblem -->
          <div class="gam-hero-emblem-wrap">
            <div class="gam-hero-emblem" style="--rank-color: ${curMilestone.color}">
              <span class="gam-hero-emblem-icon">${curMilestone.badge}</span>
              <span class="gam-hero-emblem-rank">Lv.${curMilestone.level}</span>
            </div>
          </div>

          <!-- Level Information & Bio -->
          <div class="gam-hero-details">
            <div class="gam-hero-header-row">
              <span class="gam-rank-tag" style="background: ${curMilestone.color}20; color: ${curMilestone.color}; border: 1px solid ${curMilestone.color}50;">
                المستوى ${curMilestone.level} • ${curMilestone.titleAr} (${curMilestone.titleEn})
              </span>
              <span class="gam-season-active-tag">الموسم الحالي 2026/2027 ⚡</span>
            </div>

            <h2 class="gam-hero-title">
              رتبة <span style="color: ${curMilestone.color}; text-shadow: 0 0 15px ${curMilestone.color}80;">${curMilestone.titleAr}</span>
            </h2>
            <p class="gam-hero-subtitle">${curMilestone.desc}</p>

            <!-- Currency & Stats Strip -->
            <div class="gam-hero-stats-strip">
              <div class="gam-stat-chip xp-chip">
                <span class="chip-icon">⚡</span>
                <div class="chip-info">
                  <span class="chip-label">نقاط الخبرة XP</span>
                  <strong class="chip-val">${xp.toLocaleString()} XP</strong>
                </div>
              </div>

              <div class="gam-stat-chip coins-chip">
                <span class="chip-icon">🪙</span>
                <div class="chip-info">
                  <span class="chip-label">رصيد العملات الذهبية</span>
                  <strong class="chip-val">${coins.toLocaleString()} Coin</strong>
                </div>
              </div>

              <div class="gam-stat-chip streak-chip">
                <span class="chip-icon">🔥</span>
                <div class="chip-info">
                  <span class="chip-label">سلسلة النشاط</span>
                  <strong class="chip-val">${Number(profile.currentStreak || 1)} يوم متصل</strong>
                </div>
              </div>

              <div class="gam-stat-chip badges-chip">
                <span class="chip-icon">🏅</span>
                <div class="chip-info">
                  <span class="chip-label">الأوسمة المكتسبة</span>
                  <strong class="chip-val">${unlockedSet.size} من ${EDUCATIONAL_BADGES_CONFIG.length}</strong>
                </div>
              </div>
            </div>

            <!-- Animated Level Progress Gauge -->
            <div class="gam-gauge-block">
              <div class="gam-gauge-header">
                <span class="gam-gauge-label">
                  التقدم نحو <strong style="color: ${nextMilestone.color};">${nextMilestone.titleAr} (${nextMilestone.titleEn})</strong>
                </span>
                <span class="gam-gauge-percent">${progressPercent}%</span>
              </div>

              <div class="gam-hero-gauge-track">
                <div class="gam-hero-gauge-bar" style="width: ${progressPercent}%; --bar-color: ${curMilestone.color};">
                  <span class="gam-gauge-glow-head"></span>
                </div>
              </div>

              <div class="gam-gauge-footer">
                <span>${currentBase} XP</span>
                <span class="gam-xp-remaining">
                  ${isMaxLevel ? "✨ تم الوصول إلى الرتبة الأسطورية القصوى!" : `🎯 متبقي ${xpNeeded} XP للترقية`}
                </span>
                <span>${isMaxLevel ? "5,000+ XP" : `${targetXp} XP`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. THE 10-RANK PROGRESSION PATHWAY -->
      <section class="gam-pathway-section">
        <div class="gam-section-heading">
          <div>
            <h3 class="gam-heading-title">
              <span class="heading-icon">📈</span>
              <span>مسار الرتب والمستويات العشرة (10 Ranks Pathway)</span>
            </h3>
            <p class="gam-heading-desc">كل إنجاز وسؤال برمجي يقربك من الرتبة التالية ويفتح لك مزايا حصرية في المتجر ولوحة الشرف</p>
          </div>
          <span class="gam-ranks-counter">10 مستويات معتمدة</span>
        </div>

        <div class="gam-ranks-grid">
          ${LEVEL_MILESTONES.map((m) => {
            const isCurrent = level === m.level;
            const isAchieved = level > m.level;
            const isLocked = level < m.level;

            let cardStateClass = "is-locked";
            if (isCurrent) cardStateClass = "is-current";
            else if (isAchieved) cardStateClass = "is-achieved";

            return `
              <div class="gam-rank-node ${cardStateClass}" style="--node-color: ${m.color}">
                <!-- Node Status Badge -->
                <div class="rank-node-badge">
                  ${isCurrent ? '<span class="status-pill current-pill">أنت هنا 📍</span>' : ""}
                  ${isAchieved ? '<span class="status-pill achieved-pill">مكتمل ✓</span>' : ""}
                  ${isLocked ? '<span class="status-pill locked-pill">🔒 قفل</span>' : ""}
                </div>

                <!-- Rank Emblem -->
                <div class="rank-node-icon-box">
                  <span class="rank-node-icon">${m.badge}</span>
                  <span class="rank-node-lvl">Lv.${m.level}</span>
                </div>

                <!-- Rank Titles -->
                <h4 class="rank-node-title">${escapeHtml(m.titleAr)}</h4>
                <span class="rank-node-en">${escapeHtml(m.titleEn)}</span>
                <p class="rank-node-desc">${escapeHtml(m.desc)}</p>

                <!-- XP Requirement -->
                <div class="rank-node-footer">
                  <span class="xp-threshold">${m.xp.toLocaleString()} XP</span>
                  ${isCurrent ? `<span class="rank-progress-hint">${progressPercent}% مكتمل</span>` : ""}
                  ${isLocked ? `<span class="rank-lock-hint">متبقي ${Math.max(0, m.xp - xp)} XP</span>` : ""}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </section>

      <!-- 3. EDUCATIONAL BADGES & ACHIEVEMENTS SHOWCASE -->
      <section class="gam-badges-section">
        <div class="gam-section-heading">
          <div>
            <h3 class="gam-heading-title">
              <span class="heading-icon">🏅</span>
              <span>الأوسمة والشارات الأكاديمية التنافسية</span>
            </h3>
            <p class="gam-heading-desc">أوسمة تخلد تميزك البرمجي، التزامك اليومي، وتفوقك في حل المسائل والتحديات</p>
          </div>
          <span class="gam-badge-counter-pill">
            تم استحقاق <strong class="unlocked-num">${unlockedSet.size}</strong> من ${EDUCATIONAL_BADGES_CONFIG.length} شارات
          </span>
        </div>

        <div class="gam-achieve-grid">
          ${EDUCATIONAL_BADGES_CONFIG.map((badge) => {
            const isUnlocked = unlockedSet.has(badge.id);

            return `
              <div class="gam-achieve-card ${isUnlocked ? "is-unlocked" : "is-locked"} ${badge.rarityClass}">
                <div class="achieve-card-header">
                  <span class="achieve-rarity-pill">${badge.rarity}</span>
                  <span class="achieve-status-icon">${isUnlocked ? "✓" : "🔒"}</span>
                </div>

                <div class="achieve-icon-wrapper">
                  <span class="achieve-medal-icon">${badge.icon}</span>
                  <div class="achieve-medal-halo" aria-hidden="true"></div>
                </div>

                <h4 class="achieve-title">${escapeHtml(badge.name)}</h4>
                <p class="achieve-desc">${escapeHtml(badge.description)}</p>

                <div class="achieve-footer">
                  ${isUnlocked
                    ? '<span class="achieve-earned-tag">✓ وسام مُكتسب ومُفعّل بالملف</span>'
                    : `<span class="achieve-req-tag"><i class="fa-solid fa-crosshairs"></i> ${escapeHtml(badge.requirement)}</span>`
                  }
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    </div>
  `;
}

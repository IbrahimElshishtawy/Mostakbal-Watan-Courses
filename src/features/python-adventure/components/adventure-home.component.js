// src/features/python-adventure/components/adventure-home.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { WORLDS_DATA } from "../python-adventure-data.js";

/**
 * Renders the Python Adventure Student Experience Home matching Image 5.png.
 * @param {object} props
 * @param {object} props.student
 * @param {object} props.progress
 * @param {Function} [props.onContinue]
 * @param {Function} [props.onNavigate]
 * @returns {string} HTML markup
 */
export function renderAdventureHome({ student, progress, onContinue, onNavigate }) {
  const studentName = student?.studentName || student?.name || "إبراهيم خالد";
  const safeName = escapeHtml(studentName);
  const studentGroup = escapeHtml(student?.studentGroup || student?.group || "مسار بايثون وهندسة النظم");

  // Progression metrics with defaults matching Image 5.png
  const xp = progress?.xp ?? 350;
  const targetXp = 250;
  const currentLevelXp = 180;
  const remainingXp = 70;
  const streak = progress?.streak?.count ?? 3;
  const totalStars = progress?.stars ? Object.values(progress.stars).reduce((a, b) => a + b, 0) : 12;
  const unlockedBadges = 3;
  const totalBadges = 8;
  const currentWorldName = "قرية بايثون";
  const completedMissions = 4;
  const totalMissions = 5;
  const accuracy = progress?.accuracy ?? 96;
  const totalCodeMissions = 8;

  return `
    <div class="adventure-image5-container" dir="rtl">
      <!-- 1. Top Header Bar -->
      <header class="adv5-topbar">
        <!-- Breadcrumb (Right to left) -->
        <nav aria-label="Breadcrumb" class="adv5-breadcrumbs">
          <span class="adv5-crumb-root">منصة اتحاد بشبابها</span>
          <span class="adv5-crumb-sep">/</span>
          <span class="adv5-crumb-mid">بوابة الطالب</span>
          <span class="adv5-crumb-sep">/</span>
          <span class="adv5-crumb-active font-mono">
            مغامرة بايثون التفاعلية (Python Adventure Quest)
          </span>
        </nav>

        <!-- Left Controls -->
        <div class="adv5-header-controls">
          <!-- Live Server Pill -->
          <div class="adv5-live-pill">
            <span class="adv5-pulse-dot"></span>
            <span>الخادم النشط: Delta-01 المحلة</span>
          </div>

          <!-- Season Badge -->
          <div class="adv5-season-badge">
            <i class="fa-regular fa-calendar-check text-brand-cyan"></i>
            <span>الموسم 2026 / 2027</span>
          </div>

          <!-- Notification Bell -->
          <button type="button" class="adv5-icon-btn" id="adv5NotificationBtn" title="الإشعارات" aria-label="الإشعارات">
            <i class="fa-regular fa-bell"></i>
            <span class="adv5-bell-dot"></span>
          </button>

          <!-- Help Button -->
          <button type="button" class="adv5-icon-btn" id="adv5HelpBtn" title="دليل المغامرة" aria-label="دليل المغامرة">
            <i class="fa-regular fa-circle-question"></i>
          </button>

          <!-- Avatar Button -->
          <button type="button" class="adv5-avatar-btn" id="adv5ProfileBtn" title="الملف التعريفي" aria-label="الملف التعريفي">
            <i class="fa-regular fa-circle-user text-brand-cyan text-base"></i>
          </button>
        </div>
      </header>

      <!-- Status & Progression Bar (5 Metric Cards Grid) -->
      <section class="adv5-metrics-grid" data-purpose="progression-kpis">
        <!-- Card 1: الرتبة والمستوى (Level 1: Python Novice) -->
        <div class="adv5-metric-card cyan-tint">
          <div class="adv5-metric-header">
            <span class="adv5-level-pill font-mono">Level 1</span>
            <span class="adv5-metric-xp-ratio font-mono">${currentLevelXp} / ${targetXp} XP</span>
          </div>
          <div class="adv5-metric-body">
            <div class="adv5-metric-info">
              <h3 class="adv5-metric-title">مبتدئ بايثون</h3>
              <p class="adv5-metric-subtitle">الرتبة الحالية • Python Novice</p>
            </div>
            <div class="adv5-metric-icon-box text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
              <i class="fa-solid fa-award"></i>
            </div>
          </div>
          <div class="adv5-metric-progress">
            <div class="adv5-metric-bar">
              <div class="adv5-metric-fill" style="width: 72%;"></div>
            </div>
            <div class="adv5-metric-progress-footer font-mono">
              <span>متبقي ${remainingXp} XP</span>
              <span>التقدم نحو Level 2: Apprentice</span>
            </div>
          </div>
        </div>

        <!-- Card 2: التتابع اليومي (Daily Streak) -->
        <div class="adv5-metric-card">
          <div class="adv5-metric-header">
            <span class="adv5-card-label">التتابع اليومي</span>
            <div class="adv5-metric-icon-box text-amber-400 bg-amber-500/10 border-amber-500/20 small">
              <i class="fa-solid fa-fire"></i>
            </div>
          </div>
          <div class="adv5-metric-body-stacked">
            <h2 class="adv5-metric-huge text-white font-mono">${streak} <span class="adv5-metric-subtext">أيام متواصلة</span></h2>
            <p class="adv5-metric-note text-amber-400">
              <span class="adv5-fire-icon">🔥</span> شعلة الالتزام مشتعلة
            </p>
          </div>
        </div>

        <!-- Card 3: النجوم والأوسمة -->
        <div class="adv5-metric-card">
          <div class="adv5-metric-header">
            <span class="adv5-card-label">النجوم والأوسمة</span>
            <div class="adv5-metric-icon-box text-purple-400 bg-purple-500/10 border-purple-500/20 small">
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <div class="adv5-metric-body-stacked">
            <h2 class="adv5-metric-huge text-white font-mono">${totalStars} <span class="text-amber-400">⭐</span> <span class="adv5-metric-subtext">نجمة</span></h2>
            <p class="adv5-metric-note text-slate-400 font-mono">
              أوسمة مفتوحة: ${unlockedBadges} من ${totalBadges}
            </p>
          </div>
        </div>

        <!-- Card 4: العالم الحالي -->
        <div class="adv5-metric-card">
          <div class="adv5-metric-header">
            <span class="adv5-card-label">العالم الحالي</span>
            <div class="adv5-metric-icon-box text-blue-400 bg-blue-500/10 border-blue-500/20 small">
              <i class="fa-solid fa-globe"></i>
            </div>
          </div>
          <div class="adv5-metric-body-stacked">
            <h2 class="adv5-metric-huge text-white">${currentWorldName}</h2>
            <p class="adv5-metric-note text-slate-400">
              <span>عالم 1 • البدايات</span>
              <span class="adv5-dot-sep">•</span>
              <span class="font-mono">${completedMissions} / ${totalMissions} مكتملة</span>
            </p>
          </div>
        </div>

        <!-- Card 5: التحديات المنجزة -->
        <div class="adv5-metric-card">
          <div class="adv5-metric-header">
            <span class="adv5-card-label">التحديات المنجزة</span>
            <div class="adv5-metric-icon-box text-emerald-400 bg-emerald-500/10 border-emerald-500/20 small">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div class="adv5-metric-body-stacked">
            <h2 class="adv5-metric-huge text-white font-mono">${totalCodeMissions} <span class="adv5-metric-subtext">مهمات كود</span></h2>
            <p class="adv5-metric-note text-emerald-400 font-mono">
              معدل الدقة البرمجية: ${accuracy}%
            </p>
          </div>
        </div>
      </section>


      <!-- 5. Exploration & Coding Activities Center (5 Portals) -->
      <section class="adv5-portals-section">
        <div class="adv5-section-header">
          <div class="adv5-section-title-wrap">
            <i class="fa-solid fa-compass text-brand-cyan text-lg"></i>
            <h2 class="adv5-section-title">مركز الاستكشاف والأنشطة البرمجية</h2>
          </div>
          <span class="adv5-section-subtitle">5 بوابات تدريبية متخصصة ومتاحة لك الآن</span>
        </div>

        <div class="adv5-portals-grid">
          <!-- Portal 1: خريطة العوالم -->
          <div class="adv5-portal-card" data-adv-portal="world-map">
            <div class="adv5-portal-top">
              <div class="adv5-portal-icon-box text-blue-400 bg-blue-500/10 border-blue-500/20">
                <i class="fa-solid fa-map-location-dot"></i>
              </div>
              <h3 class="adv5-portal-title">خريطة العوالم</h3>
            </div>
            <p class="adv5-portal-desc">
              8 عوالم برمجية من قرية بايثون وحتى حلبة الأبطال والذكاء الاصطناعي والمشروع الختامي.
            </p>
            <div class="adv5-portal-footer">
              <span class="adv5-portal-tag">عالم 1 مفتوح</span>
              <span class="adv5-portal-action">
                <span>فتح الخريطة</span>
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </div>
          </div>

          <!-- Portal 2: التحدي اليومي -->
          <div class="adv5-portal-card" data-adv-portal="daily">
            <div class="adv5-portal-top">
              <div class="adv5-portal-icon-box text-rose-400 bg-rose-500/10 border-rose-500/20">
                <i class="fa-solid fa-bullseye"></i>
              </div>
              <div class="flex items-center gap-1.5">
                <h3 class="adv5-portal-title">التحدي اليومي</h3>
                <span class="adv5-badge-quick">سريع</span>
              </div>
            </div>
            <p class="adv5-portal-desc">
              تحد سريع كل 24 ساعة يمنحك +100 XP إضافية ويحافظ على استمرار شعلة التتابع اليومي.
            </p>
            <div class="adv5-portal-footer">
              <span class="adv5-portal-tag font-mono text-amber-400">+100 XP</span>
              <span class="adv5-portal-action">
                <span>بدء التحدي اليومي</span>
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </div>
          </div>

          <!-- Portal 3: شجرة المهارات والتمكن -->
          <div class="adv5-portal-card" data-adv-portal="skill-tree">
            <div class="adv5-portal-top">
              <div class="adv5-portal-icon-box text-purple-400 bg-purple-500/10 border-purple-500/20">
                <i class="fa-solid fa-sitemap"></i>
              </div>
              <h3 class="adv5-portal-title">شجرة المهارات والتمكن</h3>
            </div>
            <p class="adv5-portal-desc">
              متابعة نسبة إتقانك لمفاهيم الشروط، الحلقات، القوائم، والدوال وتطورك الأكاديمي.
            </p>
            <div class="adv5-portal-footer">
              <span class="adv5-portal-tag font-mono text-purple-300">الإتقان: 65%</span>
              <span class="adv5-portal-action">
                <span>عرض الشجرة</span>
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </div>
          </div>

          <!-- Portal 4: لوحة الإنجازات والأوسمة -->
          <div class="adv5-portal-card" data-adv-portal="achievements">
            <div class="adv5-portal-top">
              <div class="adv5-portal-icon-box text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                <i class="fa-solid fa-medal"></i>
              </div>
              <h3 class="adv5-portal-title">لوحة الإنجازات والأوسمة</h3>
            </div>
            <p class="adv5-portal-desc">
              أوسمة وجوائز برمجية تفتحها مع كل انتصار وتحقيق إنجاز حقيقي في حل المشكلات البرمجية.
            </p>
            <div class="adv5-portal-footer">
              <span class="adv5-portal-tag text-emerald-400">3 أوسمة محققة</span>
              <span class="adv5-portal-action">
                <span>استعراض الأوسمة</span>
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </div>
          </div>

          <!-- Portal 5: الملف البرمجي والحقيبة -->
          <div class="adv5-portal-card" data-adv-portal="profile">
            <div class="adv5-portal-top">
              <div class="adv5-portal-icon-box text-slate-400 bg-slate-500/10 border-slate-500/20">
                <i class="fa-solid fa-box-archive"></i>
              </div>
              <h3 class="adv5-portal-title">الملف البرمجي والحقيبة</h3>
            </div>
            <p class="adv5-portal-desc">
              سجل إحصائياتك الشخصية، دقة الحلول، ومخزون الأكواد والدوال البرمجية التي برمجتها بنفسك.
            </p>
            <div class="adv5-portal-footer">
              <span class="adv5-portal-tag text-slate-300">8 سكريبتات محفوظة</span>
              <span class="adv5-portal-action">
                <span>عرض الحقيبة</span>
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. World Progress Road (مسار العوالم الثمانية) -->
      <section class="adv5-world-road-card">
        <div class="adv5-world-road-header">
          <div>
            <h2 class="adv5-road-title">مسار العوالم الثمانية (World Progress Road)</h2>
            <p class="adv5-road-subtitle">خريطة الرحلة البرمجية</p>
          </div>
          <div class="adv5-road-slider-wrap font-mono">
            <div class="adv5-road-slider-bar">
              <div class="adv5-road-slider-fill" style="width: 12.5%;"></div>
            </div>
            <span>العالم 1 من 8</span>
          </div>
        </div>

        <div class="adv5-road-nodes-grid">
          <!-- Node 1: قرية بايثون (Active / Open) -->
          <div class="adv5-road-node active" data-world-node="world-1">
            <div class="adv5-node-bubble cyan">1</div>
            <h4 class="adv5-node-name">قرية بايثون</h4>
            <span class="adv5-node-sub status-open font-mono">مفتوح (4/5)</span>
          </div>

          <!-- Node 2: غابة الشروط -->
          <div class="adv5-road-node next" data-world-node="world-2">
            <div class="adv5-node-bubble dark font-mono">2</div>
            <h4 class="adv5-node-name">غابة الشروط</h4>
            <span class="adv5-node-sub text-slate-400">المرحلة التالية</span>
          </div>

          <!-- Node 3: كهف الحلقات (Locked) -->
          <div class="adv5-road-node locked" data-world-node="world-3">
            <div class="adv5-node-bubble lock">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h4 class="adv5-node-name">كهف الحلقات</h4>
            <span class="adv5-node-sub text-slate-500">مقفل</span>
          </div>

          <!-- Node 4: قلعة الدوال (Locked) -->
          <div class="adv5-road-node locked" data-world-node="world-4">
            <div class="adv5-node-bubble lock">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h4 class="adv5-node-name">قلعة الدوال</h4>
            <span class="adv5-node-sub text-slate-500">مقفل</span>
          </div>

          <!-- Node 5: محيط المصفوفات (Locked) -->
          <div class="adv5-road-node locked" data-world-node="world-5">
            <div class="adv5-node-bubble lock">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h4 class="adv5-node-name">محيط المصفوفات</h4>
            <span class="adv5-node-sub text-slate-500">مقفل</span>
          </div>

          <!-- Node 6: برج الكائنات OOP (Locked) -->
          <div class="adv5-road-node locked" data-world-node="world-6">
            <div class="adv5-node-bubble lock">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h4 class="adv5-node-name">برج الكائنات OOP</h4>
            <span class="adv5-node-sub text-slate-500">مقفل</span>
          </div>

          <!-- Node 7: وادي الذكاء AI (Locked) -->
          <div class="adv5-road-node locked" data-world-node="world-7">
            <div class="adv5-node-bubble lock">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h4 class="adv5-node-name">وادي الذكاء AI</h4>
            <span class="adv5-node-sub text-slate-500">مقفل</span>
          </div>

          <!-- Node 8: حلبة النهائي (Project) -->
          <div class="adv5-road-node finish" data-world-node="world-8">
            <div class="adv5-node-bubble trophy">
              <i class="fa-solid fa-award text-amber-400"></i>
            </div>
            <h4 class="adv5-node-name">حلبة النهائي</h4>
            <span class="adv5-node-sub text-amber-400/80">المشروع التخرج</span>
          </div>
        </div>
      </section>
    </div>
  `;
}

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
          <span class="adv5-crumb-root">منصة مستقبل وطن</span>
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

      <!-- 2. Hero Banner: أهلاً إبراهيم خالد! تحدي وادي بايثون بانتظارك 🐍 -->
      <section class="adv5-hero-card">
        <div class="adv5-hero-main">
          <!-- Tags Header -->
          <div class="adv5-hero-tags">
            <span class="adv5-hero-pulse-tag">
              <span class="adv5-pulse-dot cyan"></span>
              تحدي برمجي تفاعلي مباشر • الموسم النشط
            </span>
            <span class="adv5-engine-tag font-mono">Python 3.12 Engine</span>
          </div>

          <!-- Title -->
          <h1 class="adv5-hero-title">
            أهلاً <span class="text-brand-cyan">${safeName}</span>! تحدي وادي بايثون بانتظارك 🐍
          </h1>

          <!-- Description -->
          <p class="adv5-hero-desc">
            خُضْ مغامرة وادي المتغيرات والمنطق البرمجي، حُلّ التحديات الشيقة مباشرة داخل المتصفح، واجمع نقاط الخبرة XP والأوسمة لتتصدر لوحة الشرف بين زملائك بأمانة المحلة.
          </p>

          <!-- Status strip -->
          <div class="adv5-hero-status-strip">
            <div class="adv5-status-step">
              <i class="fa-solid fa-circle-check text-emerald-400"></i>
              <span>المرحلة الحالية: وادي المتغيرات (Variables Valley)</span>
            </div>
            <div class="adv5-status-xp-pill font-mono">
              <i class="fa-solid fa-bolt text-amber-400"></i>
              <span>+50 XP لكل مستوى تجتازه</span>
            </div>
          </div>
        </div>

        <!-- Left Actions in Hero -->
        <div class="adv5-hero-actions-col">
          <button type="button" class="adv5-btn-hero-primary" id="heroQuestStartBtn">
            <span>خوض تحدي بايثون الآن</span>
            <i class="fa-solid fa-rocket"></i>
          </button>
          <button type="button" class="adv5-btn-hero-glass" id="heroLeaderboardBtn">
            <span>لوحة المتصدرين</span>
            <i class="fa-solid fa-trophy text-amber-400"></i>
          </button>
        </div>
      </section>

      <!-- 3. Status & Progression Bar (5 Metric Cards Grid) -->
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

      <!-- 4. Middle Split Section: Leaderboard (Left) & Active Quest Spotlight (Right) -->
      <section class="adv5-middle-split-grid">
        <!-- Right Column: المهمة الحالية النشطة (Active Quest Spotlight) -->
        <div class="adv5-quest-spotlight-card">
          <!-- Quest Header Bar -->
          <div class="adv5-quest-top-bar">
            <div class="adv5-quest-tag-group">
              <span class="adv5-quest-badge">
                <i class="fa-solid fa-gamepad text-brand-cyan"></i>
                المهمة الحالية النشطة
              </span>
              <span class="adv5-difficulty-badge font-mono">
                مستوى الصعوبة: متوسط ⚡
              </span>
            </div>
            <div class="adv5-countdown-badge font-mono">
              <span class="adv5-clock-icon">⏱️</span>
              <span id="adv5CountdownText">الموقت التنازلي للتحدي: 14:28 دقيقة</span>
            </div>
          </div>

          <!-- Quest Title & Context -->
          <div class="adv5-quest-header-body">
            <span class="adv5-quest-world-tag font-mono">عالم 1 • وادي المتغيرات والبيانات</span>
            <h2 class="adv5-quest-title">
              تحدي 05: لغز السلاسل النصية والدوال الرياضية المعقدة (String Manipulation Boss) 🧩
            </h2>
            <p class="adv5-quest-desc">
              قم بكتابة سكريبت بايثون يقوم بقراءة الرسالة السرية المشفرة المكونة من أرقام وحروف، استخراج المتغيرات النصية وحساب المجموع الكلي للقيم العددية الزوجية، ثم طباعة النص الناتج بصيغة Uppercase منظمة.
            </p>
          </div>

          <!-- Code Editor Window (IDE style with terminal dots) -->
          <div class="adv5-code-terminal">
            <div class="adv5-terminal-header">
              <div class="adv5-terminal-dots">
                <span class="t-dot dot-red"></span>
                <span class="t-dot dot-yellow"></span>
                <span class="t-dot dot-green"></span>
              </div>
              <span class="adv5-terminal-filename font-mono">solution_quest_05.py</span>
              <button type="button" class="adv5-btn-copy-code font-mono" id="btnCopyQuestCode">
                <i class="fa-regular fa-copy"></i>
                <span>نسخ الكود الأولي</span>
              </button>
            </div>
            <div class="adv5-code-body font-mono" dir="ltr">
<pre><code><span class="py-kw">def</span> <span class="py-fn">decode_telemetry</span>(stream_payload: <span class="py-type">str</span>) -> <span class="py-type">dict</span>:
    <span class="py-cmt"># TODO: قم باستخراج الأرقام وحساب المجموع - ${safeName}</span>
    tokens = stream_payload.split(<span class="py-str">":"</span>)
    valid_checksum = <span class="py-fn">sum</span>([<span class="py-fn">int</span>(x) <span class="py-kw">for</span> x <span class="py-kw">in</span> tokens[<span class="py-num">1</span>] <span class="py-kw">if</span> <span class="py-fn">int</span>(x) % <span class="py-num">2</span> == <span class="py-num">0</span>])
    <span class="py-kw">return</span> {<span class="py-str">"status"</span>: <span class="py-bool">True</span>, <span class="py-str">"code"</span>: valid_checksum}</code></pre>
            </div>
          </div>

          <!-- Rewards Strip -->
          <div class="adv5-rewards-strip">
            <div class="adv5-rewards-list">
              <span class="adv5-reward-label">المكافأة عند الحل الصحيح:</span>
              <span class="adv5-reward-pill cyan font-mono">
                <i class="fa-solid fa-bolt"></i> +50 XP
              </span>
              <span class="adv5-reward-pill purple">
                <i class="fa-solid fa-shield-halved"></i> وسام المفكك الذكي
              </span>
              <span class="adv5-reward-pill rose font-mono">
                <i class="fa-solid fa-gem"></i> +20 جوهرة
              </span>
            </div>
            <span class="adv5-peers-stat font-mono">نسبة نجاح الزملاء: 74%</span>
          </div>

          <!-- Actions Row -->
          <div class="adv5-quest-actions-row">
            <button type="button" class="adv5-btn-play-now" id="btnContinuePlayQuest">
              <span>استكمال اللعب وخوض التحدي</span>
              <i class="fa-solid fa-shield-cat text-lg"></i>
            </button>
            <button type="button" class="adv5-btn-open-map" id="btnOpenWorldMap8">
              <i class="fa-solid fa-map"></i>
              <span>خريطة العوالم (8 عوالم)</span>
            </button>
            <button type="button" class="adv5-btn-sandbox" id="btnOpenCloudLab">
              <i class="fa-solid fa-laptop-code text-cyan-400"></i>
              <span>مختبر الأكواد السحابي</span>
            </button>
          </div>
        </div>

        <!-- Left Column: لوحة أبطال المحلة (Leaderboard) -->
        <div class="adv5-leaderboard-card">
          <div class="adv5-lb-header">
            <div class="adv5-lb-title-wrap">
              <i class="fa-solid fa-trophy text-amber-400 text-lg"></i>
              <h3 class="adv5-lb-title">لوحة أبطال المحلة</h3>
            </div>
            <span class="adv5-live-tag">مباشر</span>
          </div>

          <p class="adv5-lb-subtitle">المراكز الأولى بين متدربي دفعة بايثون وهندسة النظم 2026:</p>

          <div class="adv5-lb-list">
            <!-- Rank 1 -->
            <div class="adv5-lb-item rank-1">
              <div class="adv5-lb-badge purple-circle font-mono">1</div>
              <div class="adv5-lb-info">
                <h4 class="adv5-lb-name">أحمد علاء السيد</h4>
                <p class="adv5-lb-tier">Level 4 • بايثون ماستر</p>
              </div>
              <div class="adv5-lb-score font-mono">
                <strong class="adv5-lb-xp">XP 820</strong>
                <span class="adv5-lb-medals">18 وسام</span>
              </div>
            </div>

            <!-- Rank 2 -->
            <div class="adv5-lb-item rank-2">
              <div class="adv5-lb-badge slate-circle font-mono">2</div>
              <div class="adv5-lb-info">
                <h4 class="adv5-lb-name">مريم السيد الشريف</h4>
                <p class="adv5-lb-tier">Level 3 • كودر متقدم</p>
              </div>
              <div class="adv5-lb-score font-mono">
                <strong class="adv5-lb-xp">XP 760</strong>
                <span class="adv5-lb-medals">15 وسام</span>
              </div>
            </div>

            <!-- Rank 3 -->
            <div class="adv5-lb-item rank-3">
              <div class="adv5-lb-badge amber-circle font-mono">3</div>
              <div class="adv5-lb-info">
                <h4 class="adv5-lb-name">محمود طارق البدري</h4>
                <p class="adv5-lb-tier">Level 2 • مبرمج واعد</p>
              </div>
              <div class="adv5-lb-score font-mono">
                <strong class="adv5-lb-xp">XP 540</strong>
                <span class="adv5-lb-medals">10 أوسمة</span>
              </div>
            </div>

            <!-- Rank 4: Current Student (You) -->
            <div class="adv5-lb-item rank-me">
              <div class="adv5-lb-badge cyan-circle font-mono">4</div>
              <div class="adv5-lb-info">
                <div class="flex items-center gap-1.5">
                  <h4 class="adv5-lb-name text-white">${safeName}</h4>
                  <span class="adv5-you-tag">أنت</span>
                </div>
                <p class="adv5-lb-tier text-cyan-400 font-mono">Level 1 • متبقي 190 XP للمركز 3</p>
              </div>
              <div class="adv5-lb-score font-mono">
                <strong class="adv5-lb-xp text-brand-cyan">XP 350</strong>
                <span class="adv5-lb-medals">3 أوسمة</span>
              </div>
            </div>
          </div>

          <!-- Bottom Booster Banner -->
          <div class="adv5-lb-footer-card">
            <span class="adv5-booster-text">هل يمكنك كسر حاجز 500 XP اليوم؟</span>
            <button type="button" class="adv5-btn-booster" id="btnGoXpBoost">
              <span>انطلق الآن</span>
              <i class="fa-solid fa-bolt text-amber-400"></i>
            </button>
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

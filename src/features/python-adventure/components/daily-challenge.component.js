// src/features/python-adventure/components/daily-challenge.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Daily Challenge Screen with a professional, gamified design.
 */
export function renderDailyChallenge({ daily, progress }) {
  const streak = progress?.streak?.count || 1;
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = progress?.stats?.dailyCompletedDate === today;

  // Days of the week in Arabic (Starting from Saturday as index 0)
  const weekDays = [
    { key: "sat", name: "السبت" },
    { key: "sun", name: "الأحد" },
    { key: "mon", name: "الاثنين" },
    { key: "tue", name: "الثلاثاء" },
    { key: "wed", name: "الأربعاء" },
    { key: "thu", name: "الخميس" },
    { key: "fri", name: "الجمعة" }
  ];

  // Saturday is 0, Sunday is 1, ..., Friday is 6
  const jsDay = new Date().getDay(); // 0 is Sun, 6 is Sat
  const todayIndex = (jsDay + 1) % 7;

  // Pre-calculate countdown to midnight
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diffMs = Math.max(0, midnight - now);
  const initialHours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, "0");
  const initialMins = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const initialSecs = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, "0");

  const requirements = daily?.requirements && daily.requirements.length > 0
    ? daily.requirements
    : ["استخدم for loop مع range", "اطبع الناتج النهائي فقط (110)"];

  return `
    <div class="adventure-daily-wrapper">
      <!-- Top Navigation & Action Header -->
      <div class="daily-header-glass">
        <div class="daily-header-right">
          <button type="button" class="daily-back-btn" id="dailyBackBtn" title="العودة لمغامرة بايثون">
            <span class="back-arrow">➔</span>
            <span>العودة للرئيسية</span>
          </button>
          <div class="daily-title-meta">
            <div class="daily-badge-pill">
              <span class="live-pulse-dot"></span>
              <span>التحدي اليومي المتجدد</span>
            </div>
            <h1 class="daily-main-title">🎯 التحدي اليومي وسلسلة الالتزام</h1>
            <p class="daily-main-desc">
              تحدٍ برمجي استراتيجي يُطرح كل 24 ساعة يمنحك <strong>+100 XP</strong> و <strong>+50 كوينز</strong> مع مضاعفة سلسلة الالتزام اليومية.
            </p>
          </div>
        </div>

        <!-- Top Countdown & Status Widget -->
        <div class="daily-header-left">
          <div class="daily-timer-card">
            <div class="timer-card-label">
              <span class="timer-icon">⏳</span>
              <span>ينتهي التحدي خلال:</span>
            </div>
            <div class="timer-countdown-display" id="dailyCountdownWidget">
              <div class="timer-unit">
                <span class="timer-digit" id="dailyCountdownHours">${initialHours}</span>
                <span class="timer-unit-label">ساعة</span>
              </div>
              <span class="timer-sep">:</span>
              <div class="timer-unit">
                <span class="timer-digit" id="dailyCountdownMins">${initialMins}</span>
                <span class="timer-unit-label">دقيقة</span>
              </div>
              <span class="timer-sep">:</span>
              <div class="timer-unit">
                <span class="timer-digit" id="dailyCountdownSecs">${initialSecs}</span>
                <span class="timer-unit-label">ثانية</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main 2-Column Responsive Layout -->
      <div class="daily-challenge-layout-grid">

        <!-- Primary Quest Card (Right Column) -->
        <div class="daily-quest-main-col">
          <div class="daily-quest-hero-card">
            
            <!-- Hero Top Meta & Badges -->
            <div class="quest-hero-top">
              <div class="quest-tags-wrap">
                <span class="quest-tag difficulty-medium">⚡ المستوى: متوسط</span>
                <span class="quest-tag topic-tag">🐍 بايثون: الحلقات والمدى (Loops)</span>
                <span class="quest-tag time-tag">⏱️ 3 - 5 دقائق</span>
              </div>
              <div class="quest-rewards-ribbon">
                <div class="reward-pill xp-pill" title="نقاط خبرة مضاعفة">
                  <span class="pill-icon">✨</span>
                  <span>+100 XP</span>
                </div>
                <div class="reward-pill coins-pill" title="عملات ذهبية">
                  <span class="pill-icon">🪙</span>
                  <span>+50</span>
                </div>
              </div>
            </div>

            <!-- Hero Body -->
            <div class="quest-hero-body">
              <div class="quest-title-row">
                <div class="quest-flame-badge">
                  <span class="flame-emoji">🔥</span>
                </div>
                <div class="quest-title-text">
                  <h2 class="quest-heading">${escapeHtml(daily?.title || "تحدي جمع الأعداد الزوجية 🔥")}</h2>
                  <p class="quest-subtext">تحدي الـ 24 ساعة لترسيخ التفكير الخوارزمي وبناء العادات البرمجية</p>
                </div>
              </div>

              <!-- Problem Statement Container -->
              <div class="quest-statement-box">
                <div class="box-title">
                  <span class="statement-icon">📝</span>
                  <span>نص المهمة البرمجية:</span>
                </div>
                <p class="statement-desc">
                  ${escapeHtml(daily?.description || "اكتب برنامجاً بلغة بايثون يحسب مجموع الأعداد الزوجية من 1 إلى 20 واطبع الناتج النهائي فقط (الناتج هو 110).")}
                </p>
              </div>

              <!-- Expected Terminal Output Specification -->
              <div class="quest-output-spec">
                <div class="output-spec-header">
                  <span>🖥️ المخرجات المستهدفة في الطرفية (Expected Terminal Output):</span>
                </div>
                <div class="output-spec-code">
                  <code>&gt;&gt; 110</code>
                </div>
              </div>

              <!-- Requirements Checklist -->
              <div class="quest-requirements-card">
                <h4 class="req-title">
                  <span>🎯 الشروط والمتطلبات البرمجية:</span>
                </h4>
                <div class="req-grid">
                  ${requirements.map((req) => `
                    <div class="req-item">
                      <div class="req-check-icon">✓</div>
                      <span class="req-text">${escapeHtml(req)}</span>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Smart Pro-Tip Box -->
              <div class="quest-pro-tip">
                <div class="pro-tip-icon">💡</div>
                <div class="pro-tip-content">
                  <strong>تلميح برمجي ذكي:</strong>
                  <p>يمكنك استخدام خاصية الخطوة <code>step</code> في دالة <code>range(2, 21, 2)</code> للمرور مباشرة على الأعداد الزوجية وجمعها في متغير تراكمي دون الحاجة لفحص كل عدد بشرط <code>if</code>.</p>
                </div>
              </div>
            </div>

            <!-- Action / CTA Area -->
            <div class="quest-hero-footer">
              ${isDoneToday ? `
                <div class="quest-completed-state">
                  <div class="completed-badge-icon">🎉</div>
                  <div class="completed-text-wrap">
                    <h4 class="completed-title">أحسنت صنعاً! لقد أتممت تحدي اليوم بنجاح 🌟</h4>
                    <p class="completed-desc">تمت إضافة <strong>+100 XP</strong> إلى رصيدك وتثبيت شعلة التزامك اليومية. سيتوفر التحدي الجديد تلقائياً بعد منتصف الليل.</p>
                  </div>
                  <button type="button" class="btn btn-outline-primary btn-review-quest" id="startDailyChallengeBtn">
                    <span>🔄 مراجعة الكود والحل مجدداً</span>
                  </button>
                </div>
              ` : `
                <div class="quest-action-bar">
                  <button type="button" class="btn-grand-quest" id="startDailyChallengeBtn">
                    <span class="btn-shine"></span>
                    <span class="btn-icon">⚔️</span>
                    <div class="btn-text-group">
                      <span class="btn-label">خوض التحدي اليومي الآن</span>
                      <span class="btn-subtext">فتح المحرر التفاعلي المباشر واختبار الكود</span>
                    </div>
                  </button>
                  <div class="quest-guarantee-note">
                    <span>🛡️ بيئة بايثون سحابية فورية ومصحح ذكي للأخطاء البرمجية</span>
                  </div>
                </div>
              `}
            </div>

          </div>
        </div>

        <!-- Sidebar Hub (Left Column) -->
        <div class="daily-sidebar-col">

          <!-- 1. Flame & Streak Reactor Card -->
          <div class="daily-side-card streak-reactor-card">
            <div class="side-card-header">
              <span class="side-card-icon">🔥</span>
              <h3 class="side-card-title">مفاعل سلسلة الالتزام</h3>
            </div>

            <div class="streak-circle-container">
              <div class="streak-pulse-ring ring-1"></div>
              <div class="streak-pulse-ring ring-2"></div>
              <div class="streak-circle-core">
                <span class="flame-big-emoji">🔥</span>
                <span class="streak-big-number">${streak}</span>
                <span class="streak-big-label">أيام متتالية</span>
              </div>
            </div>

            <!-- 7-Day Weekly Streak Tracker -->
            <div class="weekly-streak-section">
              <div class="weekly-streak-title">
                <span>مسار الأسبوع الحالي</span>
                <span class="weekly-streak-rate ${isDoneToday ? "rate-done" : "rate-pending"}">
                  ${isDoneToday ? "مكتمل لليوم ✅" : "بانتظار الإنجاز ⚡"}
                </span>
              </div>
              <div class="weekly-days-row">
                ${weekDays.map((d, idx) => {
                  const isPast = idx < todayIndex;
                  const isToday = idx === todayIndex;
                  const isDone = isPast || (isToday && isDoneToday);
                  return `
                    <div class="week-day-col ${isDone ? "completed" : ""} ${isToday ? "today" : ""}">
                      <span class="day-name">${d.name}</span>
                      <div class="day-bubble ${isDone ? "bubble-done" : isToday ? "bubble-active" : "bubble-empty"}" title="${d.name}">
                        ${isDone ? "🔥" : isToday ? "⚡" : "○"}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            <div class="streak-quote-box">
              <p class="quote-text">"الالتزام اليومي لمدة 10 دقائق يصنع فارقاً أسرع بعشر مرات من التعلم المتقطع."</p>
            </div>
          </div>

          <!-- 2. Daily Rewards Loot Card -->
          <div class="daily-side-card rewards-loot-card">
            <div class="side-card-header">
              <span class="side-card-icon">🎁</span>
              <h3 class="side-card-title">مكافآت التحدي اليومي</h3>
            </div>
            <div class="rewards-loot-list">
              <div class="loot-item">
                <div class="loot-icon-wrap loot-xp">✨</div>
                <div class="loot-details">
                  <strong>+100 XP خبرة</strong>
                  <p>رفع تصنيفك ومستواك في لوحة المتصدرين</p>
                </div>
              </div>
              <div class="loot-item">
                <div class="loot-icon-wrap loot-coins">🪙</div>
                <div class="loot-details">
                  <strong>+50 عملة ذهبية</strong>
                  <p>لشراء ثيمات المحرر وفتح التلميحات المتقدمة</p>
                </div>
              </div>
              <div class="loot-item">
                <div class="loot-icon-wrap loot-shield">🛡️</div>
                <div class="loot-details">
                  <strong>تأمين الشعلة</strong>
                  <p>حماية سلسلة أيامك وتثبيت استمراريتك</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Rules & Motivation Card -->
          <div class="daily-side-card rules-card">
            <div class="side-card-header">
              <span class="side-card-icon">📌</span>
              <h3 class="side-card-title">إرشادات وقواعد التحدي</h3>
            </div>
            <ul class="rules-list">
              <li>
                <span class="rule-bullet">⏰</span>
                <span>يتجدد التحدي تلقائياً كل ليلة عند الساعة 12:00 منتصف الليل.</span>
              </li>
              <li>
                <span class="rule-bullet">🎯</span>
                <span>يجب تشغيل الكود واجتياز جميع حالات الاختبار بنجاح للتأكيد.</span>
              </li>
              <li>
                <span class="rule-bullet">🏆</span>
                <span>أصحاب أطول السلاسل يحصلون على أوسمة تميز حصرية وشهادات تكريم.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  `;
}


// src/features/python-adventure/components/adventure-home.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { WORLDS_DATA } from "../python-adventure-data.js";

/**
 * Renders the Game Home Dashboard.
 */
export function renderAdventureHome({ student, progress, onContinue, onNavigate }) {
  const xp = progress?.xp || 2330;
  const level = progress?.level || 1;
  const streak = progress?.streak?.count || 3;
  const totalStars = progress?.stars ? Object.values(progress.stars).reduce((a, b) => a + b, 0) : 12;
  const completedCount = progress?.completedChallenges ? Object.keys(progress.completedChallenges).length : 4;
  const accuracy = progress?.accuracy || 96;

  const studentDisplayName = student?.studentName || student?.name || "بطل البرمجة";

  return `
    <div class="adventure-home-wrapper" dir="rtl">
      <!-- 1. Hero Banner (Images 5 & 9) -->
      <div class="adventure-hero-banner mb-6">
        <div class="adventure-hero-top-row">
          <div class="adventure-stage-badge">
            <span class="pulse-dot"></span>
            <span>المرحلة الحالية: وادي المتغيرات (Variables Valley) 🏔️</span>
          </div>
        </div>
        <h1 class="adventure-hero-title">مرحباً بك يا ${escapeHtml(studentDisplayName)}! ⚔️</h1>
        <p class="adventure-hero-subtitle">
          أكمل التحديات البرمجية واهزم عقبات الكود لتفتح العوالم القادمة وترتقي في لوحة شرف مستقبل وطن.
        </p>
      </div>

      <!-- 2. Five Adventure Stats Cards Row (Image 5.png) -->
      <div class="adventure-five-stats-grid mb-6">
        <!-- Card 1: Level -->
        <div class="adv-stat-card purple">
          <span class="stat-card-title">المستوى الحالي (Level 01)</span>
          <strong class="stat-card-val text-purple-400">مبتدئ واعد (Novice)</strong>
          <div class="stat-card-progress-box">
            <div class="stat-card-bar"><div class="stat-card-fill" style="width: 65%;"></div></div>
            <small class="stat-card-sub">65% نحو Level 02</small>
          </div>
        </div>

        <!-- Card 2: Streak -->
        <div class="adv-stat-card flame">
          <span class="stat-card-title">الستريك اليومي</span>
          <strong class="stat-card-val text-amber-400">🔥 ${streak} أيام متتالية</strong>
          <small class="stat-card-sub">حافظ على الممارسة اليومية</small>
        </div>

        <!-- Card 3: Stars -->
        <div class="adv-stat-card gold">
          <span class="stat-card-title">النجوم والأوسمة</span>
          <strong class="stat-card-val text-yellow-400">⭐ ${totalStars} نجمة</strong>
          <small class="stat-card-sub">متبقي 8 لفتح الصندوق الفضي</small>
        </div>

        <!-- Card 4: Active World -->
        <div class="adv-stat-card emerald">
          <span class="stat-card-title">العالم النشط</span>
          <strong class="stat-card-val text-emerald-400">قرية بايثون</strong>
          <small class="stat-card-sub">${completedCount} / 5 مهام منجزة</small>
        </div>

        <!-- Card 5: Accuracy -->
        <div class="adv-stat-card cyan">
          <span class="stat-card-title">دقة الحلول البرمجية</span>
          <strong class="stat-card-val text-cyan-400">🎯 ${accuracy}%</strong>
          <small class="stat-card-sub">دقة الاختبارات القياسية</small>
        </div>
      </div>

      <!-- 3. Middle Split Section: Active Mission Spotlight & Mini Leaderboard -->
      <div class="adventure-middle-split mb-8">
        <!-- Right: Current Active Mission Spotlight (Image 5.png) -->
        <div class="adventure-mission-spotlight">
          <div class="mission-spotlight-header">
            <div class="mission-spotlight-badge">
              <span>⚔️ المهمة الرئيسية النشطة</span>
            </div>
            <h3 class="mission-spotlight-title">تحدي 05: لغز السلاسل النصية والدوال الرياضية المعقدة (String Manipulation Boss)</h3>
            <p class="mission-spotlight-desc">
              اكتب دالة بلغة بايثون تستقبل جملة نصية وتقوم بحساب الكلمات الأكثر تكراراً وتنسيق النتيجة كقاموس Dictionary مع معالجة المسافات وعلامات الترقيم.
            </p>
          </div>

          <!-- Code Terminal Preview Box -->
          <div class="mission-code-terminal">
            <div class="terminal-bar">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="terminal-title">python_mission_boss.py</span>
            </div>
            <pre class="terminal-code"><code><span class="code-kw">def</span> <span class="code-fn">string_frequency_boss</span>(text: str) -> dict:
    <span class="code-cmt"># Clean text and count word frequency</span>
    <span class="code-cmt"># Return top recurring words in descending order</span>
    <span class="code-kw">pass</span></code></pre>
          </div>

          <!-- Mission Rewards Strip -->
          <div class="mission-rewards-strip">
            <span class="reward-pill xp"><span class="pill-icon">💎</span> <strong>+50 XP</strong></span>
            <span class="reward-pill star"><span class="pill-icon">⭐</span> <strong>نجمة ذهبية</strong></span>
            <span class="reward-pill time"><span class="pill-icon">⏱️</span> <strong>15 دقيقة</strong></span>
          </div>

          <!-- Mission Actions -->
          <div class="mission-action-row">
            <button type="button" class="btn-start-quest" id="adventureStartMissionBtn">
              <span>ابدأ كتابة الكود والقتال</span>
              <span class="btn-icon">⚔️</span>
            </button>
            <button type="button" class="btn-hint-quest" id="adventureShowHintBtn">
              <span>عرض التلميح البرمجي</span>
              <span class="btn-icon">💡</span>
            </button>
          </div>
        </div>

        <!-- Left: Knights Mini Leaderboard (Image 5.png) -->
        <div class="adventure-knights-leaderboard">
          <div class="knights-header">
            <div class="d-flex items-center gap-2">
              <span class="knights-icon">🏆</span>
              <h4 class="knights-title">فرسان وادي بايثون</h4>
            </div>
            <span class="badge badge-gold">تحديث مباشر</span>
          </div>

          <div class="knights-list">
            <!-- Knight 1 -->
            <div class="knight-row rank-1">
              <div class="knight-rank">🥇 #1</div>
              <div class="knight-info">
                <strong class="knight-name">عمر أحمد الشناوي</strong>
                <small class="knight-badge text-gold">👑 بطل المسار الأول</small>
              </div>
              <div class="knight-xp">3,120 XP</div>
            </div>

            <!-- Knight 2 -->
            <div class="knight-row rank-2">
              <div class="knight-rank">🥈 #2</div>
              <div class="knight-info">
                <strong class="knight-name">مريم محمود السيد</strong>
                <small class="knight-badge text-cyan">🥈 الوصيف</small>
              </div>
              <div class="knight-xp">2,750 XP</div>
            </div>

            <!-- Knight 3 -->
            <div class="knight-row rank-3">
              <div class="knight-rank">🥉 #3</div>
              <div class="knight-info">
                <strong class="knight-name">زياد طارق البدوي</strong>
                <small class="knight-badge text-amber">🥉 المركز الثالث</small>
              </div>
              <div class="knight-xp">2,450 XP</div>
            </div>

            <!-- Knight 4 (You) -->
            <div class="knight-row rank-4 is-me">
              <div class="knight-rank">🚀 #4</div>
              <div class="knight-info">
                <strong class="knight-name">${escapeHtml(studentDisplayName)} (أنت)</strong>
                <small class="knight-badge text-emerald">🔥 صاعد بقوة</small>
              </div>
              <div class="knight-xp">2,330 XP</div>
            </div>
          </div>

          <div class="knights-footer">
            <button type="button" class="btn-knights-full" id="advOpenFullLeaderboardBtn">
              <span>عرض لوحة الشرف الكاملة</span>
              <span>←</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Exploration & Activities Center (5 Portals) -->
      <div class="adventure-portals-section mb-8">
        <h2 class="portals-section-title">مركز الاستكشاف والأنشطة البرمجية</h2>
        <div class="adventure-portals-grid">
          <!-- Portal 1 -->
          <div class="adventure-portal-card" data-adv-action="world-map">
            <div class="portal-icon emerald">🗺️</div>
            <div class="portal-body">
              <h4>خريطة العوالم التفاعلية</h4>
              <p>تنقل بين الوديان السبعة وافتح القلاع والمناطق البرمجية الجديدة.</p>
              <span class="portal-link">فتح الخريطة ➔</span>
            </div>
          </div>

          <!-- Portal 2 -->
          <div class="adventure-portal-card" data-adv-action="duels">
            <div class="portal-icon red">⚔️</div>
            <div class="portal-body">
              <h4>معارك الكود والمبارزة</h4>
              <p>تحدَّ زملاءك في سباق حل الألغاز واكسب مكافآت المبارزة المزدوجة.</p>
              <span class="portal-link">دخول الحلبة ➔</span>
            </div>
          </div>

          <!-- Portal 3 -->
          <div class="adventure-portal-card" data-adv-action="bank">
            <div class="portal-icon gold">🧠</div>
            <div class="portal-body">
              <h4>بنك الخوارزميات اليومي</h4>
              <p>مسائل يومية سريعة بمستويات متدرجة تحافظ على شعلة تتابعك.</p>
              <span class="portal-link">حل مسائل اليوم ➔</span>
            </div>
          </div>

          <!-- Portal 4 -->
          <div class="adventure-portal-card" data-adv-action="projects">
            <div class="portal-icon purple">🛡️</div>
            <div class="portal-body">
              <h4>قلعة المشاريع الكبرى</h4>
              <p>بناء تطبيقات واقعية عملية متكاملة تعتمد على بايثون وقواعد البيانات.</p>
              <span class="portal-link">دخول القلعة ➔</span>
            </div>
          </div>

          <!-- Portal 5 -->
          <div class="adventure-portal-card" data-adv-action="badges">
            <div class="portal-icon blue">📜</div>
            <div class="portal-body">
              <h4>قاعة الأوسمة والإنجازات</h4>
              <p>استعراض الشارات والجوائز المكتسبة وشهادات الجدارة الصادرة.</p>
              <span class="portal-link">قاعة التكريم ➔</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. 8-World Track Road (Image 9.png) -->
      <div class="adventure-world-track-section mb-6">
        <div class="world-track-header">
          <h2 class="world-track-title">مسار العوالم الثمانية (World Progress Road)</h2>
          <span class="world-track-subtitle">رحلتك من الصفر وحتى هندسة البرمجيات والذكاء الاصطناعي</span>
        </div>

        <div class="world-track-nodes-row">
          <div class="world-node completed">
            <div class="node-circle">✅</div>
            <strong class="node-title">قرية بايثون</strong>
            <small class="node-sub">مكتمل 5/5</small>
          </div>

          <div class="world-node active">
            <div class="node-circle pulse">⚡</div>
            <strong class="node-title">وادي المتغيرات</strong>
            <small class="node-sub text-cyan-400">نشط الآن (4/5)</small>
          </div>

          <div class="world-node locked">
            <div class="node-circle">🔒</div>
            <strong class="node-title">كهف الشروط</strong>
            <small class="node-sub">مغلق</small>
          </div>

          <div class="world-node locked">
            <div class="node-circle">🔒</div>
            <strong class="node-title">برج الحلقات</strong>
            <small class="node-sub">مغلق</small>
          </div>

          <div class="world-node locked">
            <div class="node-circle">🔒</div>
            <strong class="node-title">غابة الدوال</strong>
            <small class="node-sub">مغلق</small>
          </div>

          <div class="world-node locked">
            <div class="node-circle">🔒</div>
            <strong class="node-title">مملكة الهياكل</strong>
            <small class="node-sub">مغلق</small>
          </div>

          <div class="world-node locked">
            <div class="node-circle">🔒</div>
            <strong class="node-title">أرض الكائنات OOP</strong>
            <small class="node-sub">مغلق</small>
          </div>

          <div class="world-node locked">
            <div class="node-circle">🔒</div>
            <strong class="node-title">قمة الذكاء الاصطناعي</strong>
            <small class="node-sub">مغلق</small>
          </div>
        </div>
      </div>
    </div>
  `;
}

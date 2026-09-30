// src/features/leaderboard/components/leaderboard.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Signature students matching Image 6.jpeg specifications.
 */
export const SIGNATURE_LEADERBOARD_STUDENTS = [
  {
    rank: 1,
    studentName: "عمر أحمد الشناوي",
    avatarInitial: "ع",
    group: "المجموعة 01",
    accuracy: "98.5%",
    tasksCount: 32,
    competitionPoints: 3120,
    status: "👑 بطل المسار الأول",
    statusVariant: "gold",
    badge: "بطل بايثون",
    levelTitle: "المستوى 04 • متقدم",
    isCurrentUser: false
  },
  {
    rank: 2,
    studentName: "مريم محمود السيد",
    avatarInitial: "م",
    group: "المجموعة 02",
    accuracy: "99.1%",
    tasksCount: 28,
    competitionPoints: 2750,
    status: "🥈 المركز الثاني",
    statusVariant: "silver",
    badge: "فارسة الخوارزميات",
    levelTitle: "المستوى 04 • متقدم",
    isCurrentUser: false
  },
  {
    rank: 3,
    studentName: "زياد طارق البدوي",
    avatarInitial: "ز",
    group: "المجموعة 01",
    accuracy: "95.8%",
    tasksCount: 24,
    competitionPoints: 2450,
    status: "🥉 المركز الثالث",
    statusVariant: "bronze",
    badge: "متقن الهياكل",
    levelTitle: "المستوى 03 • متوسط",
    isCurrentUser: false
  },
  {
    rank: 4,
    studentName: "إبراهيم خالد",
    avatarInitial: "إ",
    group: "المجموعة 01",
    accuracy: "97.4%",
    tasksCount: 22,
    competitionPoints: 2330,
    status: "🚀 صاعد بقوة",
    statusVariant: "emerald",
    badge: "مهندس نظم واعد",
    levelTitle: "المستوى 03 • متوسط",
    streak: 14,
    isCurrentUser: true
  },
  {
    rank: 5,
    studentName: "سارة كمال النجار",
    avatarInitial: "س",
    group: "المجموعة 01",
    accuracy: "94.2%",
    tasksCount: 20,
    competitionPoints: 2190,
    status: "🔥 متألق",
    statusVariant: "amber",
    badge: "مبرمج نشط",
    levelTitle: "المستوى 03 • متوسط",
    isCurrentUser: false
  },
  {
    rank: 6,
    studentName: "أحمد سامي غنيم",
    avatarInitial: "أ",
    group: "المجموعة 02",
    accuracy: "92.0%",
    tasksCount: 19,
    competitionPoints: 2050,
    status: "✓ ملتزم",
    statusVariant: "blue",
    badge: "عاشق بايثون",
    levelTitle: "المستوى 02 • سهل",
    isCurrentUser: false
  },
  {
    rank: 7,
    studentName: "نور الدين فؤاد",
    avatarInitial: "ن",
    group: "المجموعة 01",
    accuracy: "96.0%",
    tasksCount: 18,
    competitionPoints: 1980,
    status: "⚡ صاعد",
    statusVariant: "cyan",
    badge: "متقن الشروط",
    levelTitle: "المستوى 02 • سهل",
    isCurrentUser: false
  },
  {
    rank: 8,
    studentName: "يوسف مصطفى الباز",
    avatarInitial: "ي",
    group: "المجموعة 02",
    accuracy: "90.5%",
    tasksCount: 16,
    competitionPoints: 1820,
    status: "✓ ملتزم",
    statusVariant: "blue",
    badge: "مستكشف",
    levelTitle: "المستوى 02 • سهل",
    isCurrentUser: false
  }
];

/**
 * Renders the Leaderboard UI matching Image 6.jpeg specifications.
 */
export function renderLeaderboardView({
  scope = "global",
  groupName = "ALL",
  totalStudents = 42,
  topStudents = [],
  currentUserEntry = null,
  currentUserRank = 4,
  percentile = 92
}) {
  // Use signature student dataset merged if topStudents has fewer entries
  let students = topStudents && topStudents.length >= 4 ? topStudents : SIGNATURE_LEADERBOARD_STUDENTS;

  const top1 = students[0] || SIGNATURE_LEADERBOARD_STUDENTS[0];
  const top2 = students[1] || SIGNATURE_LEADERBOARD_STUDENTS[1];
  const top3 = students[2] || SIGNATURE_LEADERBOARD_STUDENTS[2];

  return `
    <div class="lb-view-wrapper" dir="rtl">
      <!-- 1. Header & Live Metrics (Image 6.jpeg) -->
      <div class="lb-hero-header-card mb-6">
        <div class="lb-header-text-row">
          <div>
            <h1 class="lb-main-title">لوحة المتصدرين والأبطال 🏆</h1>
            <p class="lb-main-subtitle">
              التصنيف الأكاديمي المباشر لطلاب مسار بايثون والذكاء الاصطناعي - تحديث فوري بناءً على المهام والاختبارات.
            </p>
          </div>
          <!-- Live Telemetry Badges -->
          <div class="lb-telemetry-pills">
            <span class="telemetry-pill users"><span class="pill-dot green"></span> 👥 42 طالب متنافس</span>
            <span class="telemetry-pill xp">⚡ متوسط النقاط: 1,850 XP</span>
            <span class="telemetry-pill sync">🔄 المزامنة: فورية (22ms)</span>
          </div>
        </div>

        <!-- Filter Scope Pills -->
        <div class="lb-filter-pills-row mt-4" role="tablist">
          <button type="button" class="lb-filter-btn ${scope === "global" ? "active" : ""}" data-scope="global">
            <span>مسار بايثون العام (الكل)</span>
          </button>
          <button type="button" class="lb-filter-btn ${scope === "group1" ? "active" : ""}" data-scope="group1">
            <span>المجموعة 01</span>
          </button>
          <button type="button" class="lb-filter-btn ${scope === "group2" ? "active" : ""}" data-scope="group2">
            <span>المجموعة 02</span>
          </button>
          <button type="button" class="lb-filter-btn ${scope === "monthly" ? "active" : ""}" data-scope="monthly">
            <span>متصدرو الشهر ⭐</span>
          </button>
        </div>
      </div>

      <!-- 2. 3D Podium for Top 3 (منصة التتويج - Image 6.jpeg) -->
      <div class="lb-podium-section mb-6">
        <div class="lb-podium-grid">
          <!-- Rank 2: Silver (Right side in RTL) -->
          <div class="podium-pillar rank-2">
            <div class="podium-card-content silver-glow">
              <div class="podium-crown silver">🥈</div>
              <div class="podium-avatar silver">
                <span>${escapeHtml(top2.avatarInitial || "م")}</span>
              </div>
              <h3 class="podium-name">${escapeHtml(top2.studentName)}</h3>
              <span class="podium-group">${escapeHtml(top2.group || "المجموعة 02")}</span>
              <strong class="podium-xp text-cyan-400">${top2.competitionPoints || 2750} XP</strong>
              <div class="podium-badge silver">🥈 المركز الثاني</div>
              <small class="podium-stats">🎯 ${top2.tasksCount || 28} مهمة • دقة ${top2.accuracy || "99.1%"}</small>
            </div>
            <div class="podium-step step-2">
              <span class="step-num">2</span>
            </div>
          </div>

          <!-- Rank 1: Gold (Center & Tallest) -->
          <div class="podium-pillar rank-1">
            <div class="podium-card-content gold-glow">
              <div class="podium-crown gold">👑</div>
              <div class="podium-avatar gold">
                <span>${escapeHtml(top1.avatarInitial || "ع")}</span>
              </div>
              <h3 class="podium-name">${escapeHtml(top1.studentName)}</h3>
              <span class="podium-group">${escapeHtml(top1.group || "المجموعة 01")}</span>
              <strong class="podium-xp text-amber-400">${top1.competitionPoints || 3120} XP</strong>
              <div class="podium-badge gold">👑 بطل المسار الأول</div>
              <small class="podium-stats">🎯 ${top1.tasksCount || 32} مهمة • دقة ${top1.accuracy || "98.5%"}</small>
            </div>
            <div class="podium-step step-1">
              <span class="step-num">1</span>
            </div>
          </div>

          <!-- Rank 3: Bronze (Left side in RTL) -->
          <div class="podium-pillar rank-3">
            <div class="podium-card-content bronze-glow">
              <div class="podium-crown bronze">🥉</div>
              <div class="podium-avatar bronze">
                <span>${escapeHtml(top3.avatarInitial || "ز")}</span>
              </div>
              <h3 class="podium-name">${escapeHtml(top3.studentName)}</h3>
              <span class="podium-group">${escapeHtml(top3.group || "المجموعة 01")}</span>
              <strong class="podium-xp text-yellow-500">${top3.competitionPoints || 2450} XP</strong>
              <div class="podium-badge bronze">🥉 المركز الثالث</div>
              <small class="podium-stats">🎯 ${top3.tasksCount || 24} مهمة • دقة ${top3.accuracy || "95.8%"}</small>
            </div>
            <div class="podium-step step-3">
              <span class="step-num">3</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Personal Student Standing Bar (Image 6.jpeg) -->
      <div class="lb-personal-standing-bar mb-6">
        <div class="personal-standing-rank">
          <span class="rank-label">ترتيبك الحالي</span>
          <span class="rank-number">#${currentUserRank || 4}</span>
        </div>

        <div class="personal-standing-info">
          <div class="d-flex items-center gap-2">
            <strong class="student-name">إبراهيم خالد (أنت)</strong>
            <span class="badge badge-success">طالب متميز</span>
          </div>
          <p class="motivation-notice">
            🚀 يفصلك <strong>120 نقطة</strong> فقط عن المركز الثالث! واصل تسليم الواجبات والتحديات لترتقي لمنصة التتويج.
          </p>
        </div>

        <div class="personal-standing-stats">
          <div class="stat-pill">
            <span class="pill-title">مجموع النقاط</span>
            <strong class="pill-value text-gold">2,330 XP</strong>
          </div>
          <div class="stat-pill">
            <span class="pill-title">التاسكات المنجزة</span>
            <strong class="pill-value">22 مهمة</strong>
          </div>
          <div class="stat-pill">
            <span class="pill-title">دقة الكود</span>
            <strong class="pill-value text-cyan-400">97.4%</strong>
          </div>
          <div class="stat-pill">
            <span class="pill-title">التتابع</span>
            <strong class="pill-value text-rose-400">🔥 14 يوم</strong>
          </div>
        </div>
      </div>

      <!-- 4. Two-Column Lower Split (Image 6.jpeg) -->
      <div class="lb-split-grid">
        <!-- Right Column: Full Leaderboard Table (70%) -->
        <div class="lb-table-container">
          <div class="lb-table-card">
            <div class="lb-table-card-header">
              <div>
                <h3 class="card-title">جدول الترتيب العام المعتمد</h3>
                <p class="card-subtitle">الترتيب تنازلي وفق إجمالي نقاط XP ونسبة دقة الكود والتسليمات.</p>
              </div>
              <span class="badge badge-gold">الموسم الحالي</span>
            </div>

            <div class="table-responsive">
              <table class="lb-full-table">
                <thead>
                  <tr>
                    <th>الترتيب</th>
                    <th>الطالب</th>
                    <th>المجموعة</th>
                    <th>دقة الكود</th>
                    <th>التاسكات المنجزة</th>
                    <th>مجموع النقاط XP</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  ${students.map((st) => {
                    const isTop1 = st.rank === 1;
                    const isTop2 = st.rank === 2;
                    const isTop3 = st.rank === 3;
                    const rankClass = isTop1 ? "gold" : isTop2 ? "silver" : isTop3 ? "bronze" : "";
                    const rankBadge = isTop1 ? "🥇 #1" : isTop2 ? "🥈 #2" : isTop3 ? "🥉 #3" : `#${st.rank}`;

                    return `
                      <tr class="lb-table-row ${st.isCurrentUser ? 'is-me' : ''}">
                        <td class="font-bold">
                          <span class="rank-pill ${rankClass}">${rankBadge}</span>
                        </td>
                        <td>
                          <div class="student-cell">
                            <div class="avatar avatar-sm ${rankClass}">
                              ${escapeHtml(st.avatarInitial || st.studentName?.charAt(0) || "ط")}
                            </div>
                            <div>
                              <strong class="student-name">${escapeHtml(st.studentName)}</strong>
                              ${st.isCurrentUser ? '<span class="you-badge">أنت</span>' : ''}
                            </div>
                          </div>
                        </td>
                        <td class="text-slate-400 text-xs">${escapeHtml(st.group || "المجموعة 01")}</td>
                        <td class="font-bold text-cyan-400">${st.accuracy || "96%"}</td>
                        <td class="text-slate-300 font-semibold">${st.tasksCount || st.solvedCount || 20} مهمة</td>
                        <td class="font-bold text-amber-400 font-mono">${(st.competitionPoints || 1500).toLocaleString()} XP</td>
                        <td>
                          <span class="status-chip ${st.statusVariant || 'blue'}">${escapeHtml(st.status || st.badge || "✓ ملتزم")}</span>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Left Column: Side Info Cards (30%) -->
        <div class="lb-side-cards-column">
          <!-- Card 1: Monthly Honor Rewards -->
          <div class="card lb-side-card rewards-card p-5 mb-4">
            <div class="d-flex items-center gap-2 mb-3">
              <span class="side-card-icon">🎁</span>
              <h4 class="side-card-title">جوائز ولوحة شرف الشهر</h4>
            </div>
            <ul class="rewards-list">
              <li>
                <span class="reward-icon">🥇</span>
                <div>
                  <strong>المركز الأول:</strong>
                  <p>شهادة تفوق معتمدة من حزب مستقبل وطن + درع التميز البرمجي.</p>
                </div>
              </li>
              <li>
                <span class="reward-icon">🥈</span>
                <div>
                  <strong>المركز الثاني:</strong>
                  <p>منحة تدريبية متقدمة في الذكاء الاصطناعي وبايثون المتقدم.</p>
                </div>
              </li>
              <li>
                <span class="reward-icon">🥉</span>
                <div>
                  <strong>المركز الثالث:</strong>
                  <p>مكافأة تقديرية مع إبراز الاسم في لوحة الشرف الرسمية للأمانة.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Card 2: Central Evaluation System -->
          <div class="card lb-side-card eval-card p-5 mb-4">
            <div class="d-flex items-center gap-2 mb-3">
              <span class="side-card-icon">📊</span>
              <h4 class="side-card-title">منظومة التقييم المركزية</h4>
            </div>
            <p class="text-xs text-slate-400 mb-3">يتم حساب النقاط التنافسية آلياً وفق المعايير المعتمدة:</p>
            <div class="eval-weights-list">
              <div class="eval-weight-row">
                <span>الاختبارات المعتمدة</span>
                <strong class="text-cyan-400">40%</strong>
              </div>
              <div class="eval-weight-row">
                <span>المهام البرمجية والتاسكات</span>
                <strong class="text-amber-400">35%</strong>
              </div>
              <div class="eval-weight-row">
                <span>الحضور والالتزام الأكاديمي</span>
                <strong class="text-emerald-400">15%</strong>
              </div>
              <div class="eval-weight-row">
                <span>التحديات اليومية ومغامرة بايثون</span>
                <strong class="text-purple-400">10%</strong>
              </div>
            </div>
          </div>

          <!-- Card 3: Weekend Challenge Banner -->
          <div class="card lb-side-card weekend-card p-5">
            <div class="d-flex items-center gap-2 mb-2">
              <span class="side-card-icon">🔥</span>
              <h4 class="side-card-title">تحدي عطلة نهاية الأسبوع</h4>
            </div>
            <p class="text-xs text-slate-300 mb-3">
              حل لغز الخوارزمية الفائقة واحصل على <strong>+250 XP</strong> إضافية لأول 5 طلاب يقدمون حلاً مثالياً خالياً من الأخطاء.
            </p>
            <button type="button" class="btn btn-gold btn-sm w-full" id="joinWeekendChallengeBtn">
              <span>انضم للتحدي الآن 🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

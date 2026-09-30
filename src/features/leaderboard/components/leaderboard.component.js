// src/features/leaderboard/components/leaderboard.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Signature students matching Image 6.jpeg exact specifications.
 */
export const SIGNATURE_LEADERBOARD_STUDENTS = [
  {
    rank: 1,
    studentName: "عمر أحمد الشناوي",
    role: "خبير بايثون الأسطوري (Python Wizard) ✨",
    cohort: "دفعة 2026",
    badge: "بطل التحديات 🏅",
    badgeType: "gold",
    streak: 28,
    accuracy: "100%",
    tasksDone: 25,
    tasksTotal: 25,
    xp: 2840,
    examRate: "100% كامل",
    medalsCount: "24 وسام",
    bugFree: "خالٍ من الأخطاء ⚡",
    isCurrentUser: false
  },
  {
    rank: 2,
    studentName: "مريم محمود السيد",
    role: "مهندسة الخوارزميات (Algorithm Master)",
    cohort: "دفعة 2026",
    badge: "الدقة التامة ⚡",
    badgeType: "silver",
    streak: 21,
    accuracy: "98.9%",
    tasksDone: 24,
    tasksTotal: 25,
    xp: 2610,
    techBadges: "18 شارة إنجاز تقنية 🛡️",
    isCurrentUser: false
  },
  {
    rank: 3,
    studentName: "زياد طارق البدوي",
    role: "صائد الاستثناءات (Bug Hunter)",
    cohort: "دفعة 2026",
    badge: "كود خالٍ من الثغرات 🛡️",
    badgeType: "bronze",
    streak: null,
    accuracy: "96.5%",
    tasksDone: 23,
    tasksTotal: 25,
    xp: 2450,
    techBadges: "15 شارة إنجاز تقنية 🛡️",
    isCurrentUser: false
  },
  {
    rank: 4,
    studentName: "إبراهيم خالد",
    role: "مسار بايثون الاحترافي",
    cohort: "أنت (حسابك الشخصي)",
    badge: "نجم السرعة ⚡",
    badgeType: "cyan",
    streak: 14,
    accuracy: "97.4%",
    tasksDone: 22,
    tasksTotal: 25,
    xp: 2330,
    isCurrentUser: true,
    pointsToThird: 120
  },
  {
    rank: 5,
    studentName: "كريم سامي رضوان",
    role: "مطور برمجيات واعد",
    cohort: "دفعة 2026",
    badge: "12 مهمة سريعة 🚀",
    badgeType: "default",
    streak: null,
    accuracy: "94.2%",
    tasksDone: 21,
    tasksTotal: 25,
    xp: 2210,
    isCurrentUser: false
  },
  {
    rank: 6,
    studentName: "نورهان مصطفى جاد",
    role: "مطورة بايثون وهندسة بيانات",
    cohort: "دفعة 2026",
    badge: "حلول مبتكرة ⭐",
    badgeType: "gold-subtle",
    streak: null,
    accuracy: "93.8%",
    tasksDone: 20,
    tasksTotal: 25,
    xp: 2140,
    isCurrentUser: false
  },
  {
    rank: 7,
    studentName: "أحمد شريف النجار",
    role: "عاشق الهياكل البرمجية",
    cohort: "دفعة 2026",
    badge: null,
    streak: 9,
    accuracy: "92.0%",
    tasksDone: 19,
    tasksTotal: 25,
    xp: 2020,
    isCurrentUser: false
  },
  {
    rank: 8,
    studentName: "يوسف حسام الدين",
    role: "طالب نشط بالواجبات",
    cohort: "دفعة 2026",
    badge: "التفكير المنطقي 🧠",
    badgeType: "default",
    streak: null,
    accuracy: "90.5%",
    tasksDone: 18,
    tasksTotal: 25,
    xp: 1940,
    isCurrentUser: false
  },
  {
    rank: 9,
    studentName: "سارة عبد العزيز",
    role: "مواظبة متميزة",
    cohort: "دفعة 2026",
    badge: "الالتزام التام ✨",
    badgeType: "default",
    streak: null,
    accuracy: "89.4%",
    tasksDone: 17,
    tasksTotal: 25,
    xp: 1860,
    isCurrentUser: false
  },
  {
    rank: 10,
    studentName: "خالد وليد الشافعي",
    role: "صعود متواصل",
    cohort: "دفعة 2026",
    badge: "أسرع تقدم 📈",
    badgeType: "default",
    streak: null,
    accuracy: "88.1%",
    tasksDone: 16,
    tasksTotal: 25,
    xp: 1790,
    isCurrentUser: false
  }
];

/**
 * Renders the Leaderboard View matching Image 6.jpeg exact design and layout.
 */
export function renderLeaderboardView({
  scope = "group",
  student = null,
  totalStudents = 42,
  averageXp = "1,850 XP"
} = {}) {
  const currentStudentName = student?.studentName || student?.name || "إبراهيم خالد";
  const safeStudentName = escapeHtml(currentStudentName);

  // Top 3 for Podium
  const top1 = SIGNATURE_LEADERBOARD_STUDENTS[0];
  const top2 = SIGNATURE_LEADERBOARD_STUDENTS[1];
  const top3 = SIGNATURE_LEADERBOARD_STUDENTS[2];
  const currentUser = SIGNATURE_LEADERBOARD_STUDENTS.find(s => s.isCurrentUser) || SIGNATURE_LEADERBOARD_STUDENTS[3];

  return `
    <div class="lb-page-container" dir="rtl">
      <!-- 1. Top Header Bar -->
      <header class="lb-topbar">
        <nav aria-label="Breadcrumb" class="lb-breadcrumbs">
          <span class="lb-crumb-root">منصة مستقبل وطن</span>
          <span class="lb-crumb-sep">/</span>
          <span class="lb-crumb-mid">بوابة الطالب</span>
          <span class="lb-crumb-sep">/</span>
          <span class="lb-crumb-active">لوحة المتصدرين والأبطال 🏆</span>
        </nav>

        <div class="lb-topbar-controls">
          <div class="lb-live-sync-pill">
            <span class="lb-pulse-dot"></span>
            <span>خادم النتائج الحية: متزامن (22ms)</span>
          </div>

          <div class="lb-season-pill">
            <i class="fa-regular fa-calendar-check text-brand-cyan"></i>
            <span>موسم: 2026/2027</span>
          </div>

          <button type="button" class="lb-icon-btn" id="lbNotificationBtn" title="الإشعارات" aria-label="الإشعارات">
            <i class="fa-regular fa-bell"></i>
            <span class="lb-bell-dot"></span>
          </button>

          <button type="button" class="lb-icon-btn" id="lbHelpBtn" title="المساعدة ودليل التصنيف" aria-label="المساعدة ودليل التصنيف">
            <i class="fa-regular fa-circle-question"></i>
          </button>

          <button type="button" class="lb-avatar-btn" id="lbProfileBtn" title="حسابي الشخصي" aria-label="حسابي الشخصي">
            <i class="fa-regular fa-circle-user text-brand-cyan text-base"></i>
          </button>
        </div>
      </header>

      <!-- 2. Filter Tabs & Live Telemetry KPIs -->
      <section class="lb-filter-telemetry-row">
        <!-- Scope Tabs -->
        <div class="lb-filter-tabs" role="tablist">
          <button type="button" class="lb-filter-tab ${scope === 'group' ? 'active' : ''}" data-scope="group">
            <span class="tab-active-dot"></span>
            <span>مجموعتي الدراسية (الأحد والأربعاء | 7:00 - 8:30)</span>
          </button>

          <button type="button" class="lb-filter-tab ${scope === 'global' ? 'active' : ''}" data-scope="global">
            <i class="fa-solid fa-globe"></i>
            <span>الترتيب العام للمنصة (الكل)</span>
          </button>

          <button type="button" class="lb-filter-tab ${scope === 'weekly' ? 'active' : ''}" data-scope="weekly">
            <i class="fa-solid fa-medal text-amber-400"></i>
            <span>أبطال هذا الأسبوع</span>
          </button>
        </div>

        <!-- Telemetry KPIs -->
        <div class="lb-telemetry-cards">
          <div class="lb-telemetry-card">
            <span class="lb-telemetry-label">المتنافسين</span>
            <span class="lb-telemetry-val font-mono">👥 ${totalStudents} طالباً</span>
          </div>

          <div class="lb-telemetry-card">
            <span class="lb-telemetry-label">متوسط النقاط</span>
            <span class="lb-telemetry-val font-mono text-cyan-400">⚡ ${averageXp}</span>
          </div>

          <div class="lb-telemetry-card live-card">
            <span class="lb-telemetry-label">تحديث النتائج</span>
            <span class="lb-telemetry-val live-badge-glow font-mono">
              <span class="lb-pulse-dot"></span>
              لحظي (Live)
            </span>
          </div>
        </div>
      </section>

      <!-- 3. Hall of Fame 3D Podium (ثلاثي الصدارة لمسار هندسة بايثون) -->
      <section class="lb-podium-wrapper">
        <div class="lb-podium-header">
          <span class="lb-podium-tag">قاعة الشرف الأكاديمية • TOP 3</span>
          <h2 class="lb-podium-title">
            <span>ثلاثي الصدارة لمسار هندسة بايثون</span>
            <i class="fa-solid fa-star text-amber-400"></i>
          </h2>
        </div>

        <div class="lb-podium-grid">
          <!-- Rank 2: Silver (Right in RTL) -->
          <div class="lb-podium-card rank-silver">
            <div class="podium-crown-badge silver">
              <span class="crown-inner-label">
                <small>2#</small>
                <span>فضي</span>
              </span>
            </div>

            <div class="podium-avatar-box">
              <i class="fa-solid fa-user"></i>
            </div>

            <h3 class="podium-user-name">${escapeHtml(top2.studentName)}</h3>
            <p class="podium-user-role">${escapeHtml(top2.role)}</p>

            <div class="podium-xp-score-wrap">
              <span class="podium-xp-label">إجمالي النقاط:</span>
              <span class="podium-xp-number font-mono">XP ${top2.xp.toLocaleString()}</span>
            </div>

            <div class="podium-mini-stats-grid font-mono">
              <div class="podium-stat-pill">
                <span>المهام: </span>
                <strong>${top2.tasksDone} / ${top2.tasksTotal}</strong>
              </div>
              <div class="podium-stat-pill">
                <span>الدقة: </span>
                <strong>${top2.accuracy}</strong>
              </div>
            </div>

            <div class="podium-card-footer-badge">
              <i class="fa-solid fa-shield-halved text-cyan-400"></i>
              <span>${top2.techBadges}</span>
            </div>
          </div>

          <!-- Rank 1: Gold (Center & Elevated) -->
          <div class="lb-podium-card rank-gold">
            <div class="podium-crown-badge gold">
              <span class="crown-inner-label">
                <i class="fa-solid fa-crown text-amber-200"></i>
                <span>المركز 1 الأول</span>
              </span>
            </div>

            <div class="podium-avatar-box">
              <i class="fa-solid fa-user-ninja"></i>
            </div>

            <h3 class="podium-user-name">${escapeHtml(top1.studentName)}</h3>
            <p class="podium-user-role">${escapeHtml(top1.role)}</p>

            <div class="podium-xp-score-wrap">
              <span class="podium-xp-label text-amber-400 font-bold">النقاط الكلية: ✪</span>
              <span class="podium-xp-number font-mono">XP ${top1.xp.toLocaleString()}</span>
            </div>

            <div class="podium-mini-stats-grid font-mono">
              <div class="podium-stat-pill success">
                <span>إنجاز المهام: </span>
                <strong>${top1.tasksDone} / ${top1.tasksTotal} مكتمل</strong>
              </div>
              <div class="podium-stat-pill success">
                <span>معدل الاختبارات: </span>
                <strong>${top1.examRate}</strong>
              </div>
              <div class="podium-stat-pill streak">
                <span>تتابع </span>
                <strong>${top1.streak} يوم 🔥</strong>
              </div>
              <div class="podium-stat-pill">
                <strong>${top1.bugFree}</strong>
              </div>
            </div>

            <div class="podium-card-footer-badge text-amber-400 font-bold">
              <i class="fa-solid fa-award"></i>
              <span>${top1.medalsCount}</span>
            </div>
          </div>

          <!-- Rank 3: Bronze (Left in RTL) -->
          <div class="lb-podium-card rank-bronze">
            <div class="podium-crown-badge bronze">
              <span class="crown-inner-label">
                <small>3#</small>
                <span>برونزي</span>
              </span>
            </div>

            <div class="podium-avatar-box">
              <i class="fa-solid fa-user"></i>
            </div>

            <h3 class="podium-user-name">${escapeHtml(top3.studentName)}</h3>
            <p class="podium-user-role">${escapeHtml(top3.role)}</p>

            <div class="podium-xp-score-wrap">
              <span class="podium-xp-label">إجمالي النقاط:</span>
              <span class="podium-xp-number font-mono">XP ${top3.xp.toLocaleString()}</span>
            </div>

            <div class="podium-mini-stats-grid font-mono">
              <div class="podium-stat-pill">
                <span>المهام: </span>
                <strong>${top3.tasksDone} / ${top3.tasksTotal}</strong>
              </div>
              <div class="podium-stat-pill">
                <span>الدقة: </span>
                <strong>${top3.accuracy}</strong>
              </div>
            </div>

            <div class="podium-card-footer-badge">
              <i class="fa-solid fa-shield-halved text-amber-500"></i>
              <span>${top3.techBadges}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Personal Student Standing Strip (إبراهيم خالد - أنت) -->
      <section class="lb-standing-strip">
        <div class="lb-standing-right">
          <div class="lb-rank-box-badge font-mono">
            #${currentUser.rank}
          </div>

          <div class="lb-standing-identity">
            <div class="lb-standing-name-row">
              <h3 class="lb-standing-name">${safeStudentName}</h3>
              <span class="lb-you-badge">أنت (حسابك الشخصي)</span>
            </div>
            <p class="lb-standing-motivation">
              متبقي ${currentUser.pointsToThird} XP لتخطي المركز الثالث والوصول لمنصة التتويج 🏅
            </p>
          </div>
        </div>

        <div class="lb-standing-metrics font-mono">
          <div class="lb-standing-metric-item">
            <span class="m-title">مجموع النقاط</span>
            <span class="m-value text-cyan-400">XP ${currentUser.xp.toLocaleString()}</span>
          </div>

          <div class="lb-standing-metric-item">
            <span class="m-title">المهام المنجزة</span>
            <span class="m-value">${currentUser.tasksDone} مهمة</span>
          </div>

          <div class="lb-standing-metric-item">
            <span class="m-title">سلسلة التتابع</span>
            <span class="m-value text-amber-400">🔥 ${currentUser.streak} يوم</span>
          </div>

          <div class="lb-standing-metric-item">
            <span class="m-title">دقة الأكواد</span>
            <span class="m-value text-emerald-400">${currentUser.accuracy}</span>
          </div>
        </div>

        <button type="button" class="lb-btn-analyze" id="lbBtnAnalyze">
          <i class="fa-solid fa-chart-line text-cyan-400"></i>
          <span>تحليل أدائي ومقارنة النقاط</span>
        </button>
      </section>

      <!-- 5. Split Grid: Table on Right (70%), Sidebar Cards on Left (30%) -->
      <div class="lb-main-split-grid">
        <!-- Right Column: Full Leaderboard Table -->
        <section class="lb-table-card">
          <div class="lb-table-card-header">
            <h3 class="lb-table-title">
              <i class="fa-solid fa-table-list text-cyan-400"></i>
              <span>جدول الترتيب الكامل لمجموعة الأحد والأربعاء</span>
            </h3>
            <span class="lb-table-count font-mono">المعروض: 10 من أصل ${totalStudents} طالباً</span>
          </div>

          <div class="table-responsive">
            <table class="lb-custom-table">
              <thead>
                <tr>
                  <th style="width: 70px;">الترتيب</th>
                  <th>اسم الطالب والمسار</th>
                  <th>الشارات والأوسمة</th>
                  <th style="width: 90px;">دقة الحلول</th>
                  <th style="width: 80px;">المهام</th>
                  <th style="width: 100px;">مجموع XP</th>
                  <th style="width: 50px;">الملف</th>
                </tr>
              </thead>
              <tbody>
                ${SIGNATURE_LEADERBOARD_STUDENTS.map((st) => {
                  const isGold = st.rank === 1;
                  const isSilver = st.rank === 2;
                  const isBronze = st.rank === 3;
                  const isMe = st.isCurrentUser;

                  const rankColorClass = isGold ? "gold" : isSilver ? "silver" : isBronze ? "bronze" : isMe ? "cyan" : "";
                  const rankIcon = isGold ? "🏆" : isSilver ? "🥈" : isBronze ? "🥉" : isMe ? "🔵" : "";

                  return `
                    <tr class="lb-custom-row ${isMe ? 'row-is-me' : ''}" data-student-rank="${st.rank}">
                      <!-- 1. Rank -->
                      <td>
                        <span class="rank-table-badge ${rankColorClass} font-mono">
                          #${st.rank} ${rankIcon}
                        </span>
                      </td>

                      <!-- 2. Student Info -->
                      <td>
                        <div class="student-table-cell">
                          <h4 class="student-table-name">
                            ${isMe ? safeStudentName : escapeHtml(st.studentName)}
                            ${isMe ? '<span class="lb-you-badge">أنت</span>' : ''}
                          </h4>
                          <span class="student-table-cohort">${escapeHtml(st.role)}</span>
                        </div>
                      </td>

                      <!-- 3. Badges & Streak -->
                      <td>
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${st.badge ? `
                            <span class="badge-tag-pill ${st.badgeType === 'cyan' ? 'cyan' : ''}">
                              ${escapeHtml(st.badge)}
                            </span>
                          ` : ''}
                          ${st.streak ? `
                            <span class="badge-tag-pill streak font-mono">
                              🔥 ${st.streak}
                            </span>
                          ` : ''}
                        </div>
                      </td>

                      <!-- 4. Accuracy -->
                      <td class="font-mono font-bold text-slate-200">
                        ${st.accuracy}
                      </td>

                      <!-- 5. Tasks -->
                      <td class="font-mono text-slate-300">
                        <span class="font-bold text-white">${st.tasksDone}</span>
                        <span class="text-slate-500">/${st.tasksTotal}</span>
                      </td>

                      <!-- 6. Total XP -->
                      <td class="font-mono font-bold ${isGold ? 'text-amber-400' : isMe ? 'text-cyan-400' : 'text-white'}">
                        ${st.xp.toLocaleString()} <span class="text-xs text-slate-400">XP</span>
                      </td>

                      <!-- 7. View Action -->
                      <td>
                        <button type="button" class="btn-view-profile-icon" data-view-student="${st.rank}" title="عرض ملف الطالب" aria-label="عرض ملف الطالب">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>

          <div class="lb-table-footer-row">
            <button type="button" class="btn-expand-list" id="lbBtnExpandList">
              <span>عرض بقية القائمة</span>
              <i class="fa-solid fa-chevron-down text-xs"></i>
            </button>
            <span class="pagination-info-text font-mono">الصفحة 1 من 5 (إجمالي الطلاب: ${totalStudents})</span>
          </div>
        </section>

        <!-- Left Column: Sidebar Cards (30%) -->
        <aside class="lb-sidebar-column">
          <!-- Card 1: مكافآت لوحة الشرف الشهرية -->
          <div class="lb-side-card">
            <div class="lb-side-card-header">
              <h4 class="lb-side-card-title">
                <i class="fa-solid fa-gift text-amber-400"></i>
                <span>مكافآت لوحة الشرف الشهرية</span>
              </h4>
              <p class="lb-side-card-subtitle">حوائز المتصدرين الثلاثة الأوائل</p>
            </div>

            <div class="lb-rewards-list">
              <div class="lb-reward-item">
                <span class="lb-reward-icon text-amber-400">📜</span>
                <div class="lb-reward-content">
                  <h5>شهادة تميز معتمدة رسمياً</h5>
                  <p>موقعة من أمانة العمل الجماهيري والمشرف الأكاديمي م/ إبراهيم الششتتاوي.</p>
                </div>
              </div>

              <div class="lb-reward-item">
                <span class="lb-reward-icon text-cyan-400">💻</span>
                <div class="lb-reward-content">
                  <h5>أولوية الترشيح للمشاريع البرمجية</h5>
                  <p>الانضمام لفريق تطوير منصات مستقبل وطن الكبرى للمحترفين.</p>
                </div>
              </div>

              <div class="lb-reward-item">
                <span class="lb-reward-icon text-purple-400">⭐</span>
                <div class="lb-reward-content">
                  <h5>شارة "الأبطال" الدائمة</h5>
                  <p>تثبيت وسام التميز في الحساب الشخصي يظهر في جميع الأنشطة والامتحانات.</p>
                </div>
              </div>
            </div>

            <div class="lb-rewards-timer-box font-mono">
              <i class="fa-regular fa-clock"></i>
              <span>إغلاق تصنيف دورة مايو: خلال 6 أيام و 14 ساعة</span>
            </div>
          </div>

          <!-- Card 2: المرجع الأكاديمي والتوثيق -->
          <div class="lb-side-card">
            <div class="lb-side-card-header">
              <h4 class="lb-side-card-title">
                <i class="fa-solid fa-book-bookmark text-cyan-400"></i>
                <span>المرجع الأكاديمي والتوثيق</span>
              </h4>
              <p class="lb-side-card-subtitle">نظام الرصد المركزي</p>
            </div>

            <p class="text-xs text-slate-300 leading-relaxed mb-2">
              تمت ترقية لوحة المتصدرين من الشاشة الثابتة السابقة في بوابة الطالب إلى منظومة الرصد الحي المتزامن لحظياً.
            </p>

            <div class="lb-doc-preview-box">
              <div class="lb-doc-preview-header font-mono">
                <span>سجل المنظومة الأكاديمية</span>
                <span class="text-emerald-400">v2.6.4 Live</span>
              </div>
              <div class="lb-doc-preview-mockup">
                <span>[Academic Leaderboard Engine :: Sync Active]</span>
              </div>
            </div>

            <a href="javascript:void(0)" class="lb-doc-link" id="lbFairXpDocLink">
              <i class="fa-solid fa-scale-balanced text-xs"></i>
              <span>خوارزمية الحساب: Fair-XP Algorithm • اللائحة ←</span>
            </a>
          </div>

          <!-- Card 3: تحدي عطلة نهاية الأسبوع -->
          <div class="lb-side-card lb-challenge-card">
            <span class="lb-challenge-tag font-mono">
              <i class="fa-solid fa-bolt"></i>
              <span>تحدي عطلة نهاية الأسبوع +250 XP إضافي</span>
            </span>

            <h4 class="lb-challenge-title">خوارزمية الترتيب العكسي للسلاسل النصية</h4>
            <p class="lb-challenge-desc">
              حل المسألة بأقل من 4 أسطر كود لربح وسام "المبرمج المقتصد" ورفع ترتيبك للمركز الثالث فوراً!
            </p>

            <button type="button" class="lb-btn-challenge-action" id="lbJoinWeekendBtn">
              <i class="fa-solid fa-code"></i>
              <span>فتح محرر الأكواد والبدء في التحدي { }</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  `;
}

// src/features/leaderboard/components/leaderboard.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Leaderboard View dynamically bound to live Firestore data.
 */
export function renderLeaderboardView({
  scope = "group",
  student = null,
  totalStudents = 0,
  averageXp = "0 XP",
  leaderboardData = null
} = {}) {
  const topStudents = leaderboardData?.topStudents || [];
  const groupName = leaderboardData?.groupName || student?.group || student?.studentGroup || "مجموعتي الدراسية";
  const currentUser = leaderboardData?.currentUserEntry || {
    rank: 1,
    studentName: student?.studentName || student?.name || "حسابي الشخصي",
    role: "مسار بايثون الاحترافي",
    badge: "⚡ مبرمج نشط",
    badgeType: "cyan",
    streak: 1,
    accuracy: "100%",
    tasksDone: 0,
    tasksTotal: 10,
    xp: 0
  };

  const safeStudentName = escapeHtml(currentUser.studentName);

  // Top 3 Podium Students
  const top1 = topStudents[0] || null;
  const top2 = topStudents[1] || null;
  const top3 = topStudents[2] || null;

  // Motivation Calculation
  let motivationText = "أنت في صدارة الترتيب الأكاديمي! حافظ على هذا المستوى المتميز 🏆";
  if (currentUser.rank > 3 && top3) {
    const diff = Math.max(10, (top3.xp || 0) - (currentUser.xp || 0) + 10);
    motivationText = `متبقي ${diff.toLocaleString()} XP للوصول إلى منصة التتويج وتخطي المركز الثالث 🏅`;
  } else if (currentUser.rank === 2 || currentUser.rank === 3) {
    motivationText = "أنت ضمن ثلاثي الصدارة لقاعة الشرف الأكاديمية! خطوة واحدة تفصلك عن المركز الأول 🌟";
  }

  return `
    <div class="lb-page-container" dir="rtl">
      <!-- 1. Top Header Bar -->
      <header class="lb-topbar">
        <nav aria-label="Breadcrumb" class="lb-breadcrumbs">
          <span class="lb-crumb-root">منصة اتحاد بشبابها</span>
          <span class="lb-crumb-sep">/</span>
          <span class="lb-crumb-mid">بوابة الطالب</span>
          <span class="lb-crumb-sep">/</span>
          <span class="lb-crumb-active">لوحة المتصدرين والأبطال 🏆</span>
        </nav>

        <div class="lb-topbar-controls">
          <div class="lb-live-sync-pill">
            <span class="lb-pulse-dot"></span>
            <span>بيانات حية متزامنة من Firebase</span>
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
            <span>مجموعتي (${escapeHtml(groupName)})</span>
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
              لحظي (Firestore)
            </span>
          </div>
        </div>
      </section>

      <!-- 3. Hall of Fame 3D Podium -->
      <section class="lb-podium-wrapper">
        <div class="lb-podium-header">
          <span class="lb-podium-tag">قاعة الشرف الأكاديمية • TOP 3</span>
          <h2 class="lb-podium-title">
            <span>ثلاثي الصدارة لمسار هندسة البرمجيات وبايثون</span>
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

            <h3 class="podium-user-name">${top2 ? escapeHtml(top2.studentName) : "في انتظار المنافس"}</h3>
            <p class="podium-user-role">${top2 ? escapeHtml(top2.levelTitle || top2.role || "مبرمج واعد") : "المقعد متاح للتنافس"}</p>

            <div class="podium-xp-score-wrap">
              <span class="podium-xp-label">إجمالي النقاط:</span>
              <span class="podium-xp-number font-mono">XP ${top2 ? (top2.xp || 0).toLocaleString() : 0}</span>
            </div>

            <div class="podium-mini-stats-grid font-mono">
              <div class="podium-stat-pill">
                <span>المهام: </span>
                <strong>${top2 ? `${top2.tasksDone} منجز` : "0"}</strong>
              </div>
              <div class="podium-stat-pill">
                <span>الدقة: </span>
                <strong>${top2 ? top2.accuracy : "—"}</strong>
              </div>
            </div>

            <div class="podium-card-footer-badge">
              <i class="fa-solid fa-shield-halved text-cyan-400"></i>
              <span>${top2 ? top2.techBadges : "وسام التنافس 🛡️"}</span>
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

            <h3 class="podium-user-name">${top1 ? escapeHtml(top1.studentName) : "في انتظار بطل الصدارة"}</h3>
            <p class="podium-user-role">${top1 ? escapeHtml(top1.levelTitle || top1.role || "خبير بايثون الأسطوري") : "كن أول من يحصد المركز الأول"}</p>

            <div class="podium-xp-score-wrap">
              <span class="podium-xp-label text-amber-400 font-bold">النقاط الكلية: ✪</span>
              <span class="podium-xp-number font-mono">XP ${top1 ? (top1.xp || 0).toLocaleString() : 0}</span>
            </div>

            <div class="podium-mini-stats-grid font-mono">
              <div class="podium-stat-pill success">
                <span>إنجاز المهام: </span>
                <strong>${top1 ? `${top1.tasksDone} مكتمل` : "0"}</strong>
              </div>
              <div class="podium-stat-pill success">
                <span>المستوى: </span>
                <strong>${top1 ? `مستوى ${top1.level}` : "1"}</strong>
              </div>
              <div class="podium-stat-pill streak">
                <span>تتابع </span>
                <strong>${top1 ? `${top1.streak} يوم 🔥` : "1 يوم"}</strong>
              </div>
              <div class="podium-stat-pill">
                <strong>كود معتمد ⚡</strong>
              </div>
            </div>

            <div class="podium-card-footer-badge text-amber-400 font-bold">
              <i class="fa-solid fa-award"></i>
              <span>${top1 ? (top1.badge || "بطل الدورة 🥇") : "شارة الصدارة 🥇"}</span>
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

            <h3 class="podium-user-name">${top3 ? escapeHtml(top3.studentName) : "في انتظار المنافس"}</h3>
            <p class="podium-user-role">${top3 ? escapeHtml(top3.levelTitle || top3.role || "مبرمج واعد") : "المقعد متاح للتنافس"}</p>

            <div class="podium-xp-score-wrap">
              <span class="podium-xp-label">إجمالي النقاط:</span>
              <span class="podium-xp-number font-mono">XP ${top3 ? (top3.xp || 0).toLocaleString() : 0}</span>
            </div>

            <div class="podium-mini-stats-grid font-mono">
              <div class="podium-stat-pill">
                <span>المهام: </span>
                <strong>${top3 ? `${top3.tasksDone} منجز` : "0"}</strong>
              </div>
              <div class="podium-stat-pill">
                <span>الدقة: </span>
                <strong>${top3 ? top3.accuracy : "—"}</strong>
              </div>
            </div>

            <div class="podium-card-footer-badge">
              <i class="fa-solid fa-shield-halved text-amber-500"></i>
              <span>${top3 ? top3.techBadges : "وسام التنافس 🛡️"}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Personal Student Standing Strip -->
      <section class="lb-standing-strip">
        <div class="lb-standing-right">
          <div class="lb-rank-box-badge font-mono">
            #${currentUser.rank || 1}
          </div>

          <div class="lb-standing-identity">
            <div class="lb-standing-name-row">
              <h3 class="lb-standing-name">${safeStudentName}</h3>
              <span class="lb-you-badge">أنت (حسابك الشخصي)</span>
            </div>
            <p class="lb-standing-motivation">
              ${motivationText}
            </p>
          </div>
        </div>

        <div class="lb-standing-metrics font-mono">
          <div class="lb-standing-metric-item">
            <span class="m-title">مجموع النقاط</span>
            <span class="m-value text-cyan-400">XP ${(currentUser.xp || 0).toLocaleString()}</span>
          </div>

          <div class="lb-standing-metric-item">
            <span class="m-title">المهام والتحديات</span>
            <span class="m-value">${currentUser.tasksDone || 0} منجز</span>
          </div>

          <div class="lb-standing-metric-item">
            <span class="m-title">سلسلة التتابع</span>
            <span class="m-value text-amber-400">🔥 ${currentUser.streak || 1} يوم</span>
          </div>

          <div class="lb-standing-metric-item">
            <span class="m-title">المستوى الحالي</span>
            <span class="m-value text-emerald-400">مستوى ${currentUser.level || 1}</span>
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
              <span>جدول الترتيب الفعلي (${escapeHtml(groupName)})</span>
            </h3>
            <span class="lb-table-count font-mono">المعروض: ${topStudents.length} من أصل ${totalStudents} طالباً</span>
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
                ${topStudents.length > 0 ? topStudents.map((st) => {
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
                            ${escapeHtml(st.studentName)}
                            ${isMe ? '<span class="lb-you-badge">أنت</span>' : ''}
                          </h4>
                          <span class="student-table-cohort">${escapeHtml(st.levelTitle || `مستوى ${st.level}`)}</span>
                        </div>
                      </td>

                      <!-- 3. Badges & Streak -->
                      <td>
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${st.badge ? `
                            <span class="badge-tag-pill ${st.badgeType === 'cyan' ? 'cyan' : st.badgeType === 'gold' ? 'gold' : ''}">
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
                        ${st.accuracy || "100%"}
                      </td>

                      <!-- 5. Tasks -->
                      <td class="font-mono text-slate-300">
                        <span class="font-bold text-white">${st.tasksDone}</span>
                        <span class="text-slate-500">/${st.tasksTotal}</span>
                      </td>

                      <!-- 6. Total XP -->
                      <td class="font-mono font-bold ${isGold ? 'text-amber-400' : isMe ? 'text-cyan-400' : 'text-white'}">
                        ${(st.xp || 0).toLocaleString()} <span class="text-xs text-slate-400">XP</span>
                      </td>

                      <!-- 7. View Action -->
                      <td>
                        <button type="button" class="btn-view-profile-icon" data-view-student="${st.rank}" title="عرض معلومات الطالب" aria-label="عرض معلومات الطالب">
                          <i class="fa-regular fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join("") : `
                  <tr>
                    <td colspan="7" class="text-center text-muted p-8">
                      لا يوجد طلاب مسجلون في هذا التصنيف حالياً. خض أول تحدي واعتلِ الصدارة! 🚀
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <div class="lb-table-footer-row">
            <button type="button" class="btn-expand-list" id="lbBtnExpandList">
              <span>عرض الترتيب المحدث</span>
              <i class="fa-solid fa-rotate-right text-xs"></i>
            </button>
            <span class="pagination-info-text font-mono">إجمالي الطلاب المحدث: ${totalStudents} طالباً</span>
          </div>
        </section>

        <!-- Left Column: Sidebar Cards (30%) -->
        <aside class="lb-sidebar-column">
          <!-- Card 1: مكافآت لوحة الشرف الشهرية -->
          <div class="lb-side-card">
            <div class="lb-side-card-header">
              <h4 class="lb-side-card-title">
                <i class="fa-solid fa-gift text-amber-400"></i>
                <span>مكافآت لوحة الشرف</span>
              </h4>
              <p class="lb-side-card-subtitle">حوائز المتصدرين الثلاثة الأوائل</p>
            </div>

            <div class="lb-rewards-list">
              <div class="lb-reward-item">
                <span class="lb-reward-icon text-amber-400">📜</span>
                <div class="lb-reward-content">
                  <h5>شهادة تميز معتمدة رسمياً</h5>
                  <p>موقعة من أمانة العمل والمشرف الأكاديمي م/ إبراهيم الششتتاوي.</p>
                </div>
              </div>

              <div class="lb-reward-item">
                <span class="lb-reward-icon text-cyan-400">💻</span>
                <div class="lb-reward-content">
                  <h5>أولوية الترشيح للمشاريع البرمجية</h5>
                  <p>الانضمام لفريق تطوير منصات اتحاد بشبابها للمحترفين.</p>
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
              <span>نظام التنافس المستمر - النقاط تتحدث تلقائياً</span>
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
              منظومة الرصد الحي المتزامن لحظياً مع قاعدة بيانات الدورة لضمان الشفافية والأداء الأكاديمي الفعلي.
            </p>

            <div class="lb-doc-preview-box">
              <div class="lb-doc-preview-header font-mono">
                <span>سجل المنظومة الأكاديمية</span>
                <span class="text-emerald-400">Firestore Live</span>
              </div>
              <div class="lb-doc-preview-mockup">
                <span>[Academic Leaderboard Engine :: Firestore Sync]</span>
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
              <span>تحديات بايثون المباشرة</span>
            </span>

            <h4 class="lb-challenge-title">مغامرة ومستويات بايثون البرمجية</h4>
            <p class="lb-challenge-desc">
              حل المهام التفاعلية واجتز الاختبارات لرفع رصيدك من الـ XP والصعود إلى منصة التتويج!
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

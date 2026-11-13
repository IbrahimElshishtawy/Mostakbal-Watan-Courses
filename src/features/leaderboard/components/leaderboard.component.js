// src/features/leaderboard/components/leaderboard.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { getHonoraryEngineerTitle, getChallengeHonorTitle } from "../leaderboard-audio.service.js";

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

  const title1 = top1 ? getHonoraryEngineerTitle(top1.studentName) : "المهندس";
  const challengeTitle1 = top1 ? getChallengeHonorTitle(top1, 1) : "بطل التحديات الأول 👑 | خبير بايثون الأسطوري 🐍";

  const title2 = top2 ? getHonoraryEngineerTitle(top2.studentName) : "المهندس";
  const challengeTitle2 = top2 ? getChallengeHonorTitle(top2, 2) : "وصيف البطولة 🥈 | مهندس الخوارزميات المتقدمة 🧠";

  const title3 = top3 ? getHonoraryEngineerTitle(top3.studentName) : "المهندس";
  const challengeTitle3 = top3 ? getChallengeHonorTitle(top3, 3) : "فارس التحديات 🥉 | صائد الثغرات البرمجية 🛡️";

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
        <div class="lb-podium-ambient-glow" aria-hidden="true"></div>

        <div class="lb-podium-header">
          <div class="lb-celebration-particles" aria-hidden="true">
            <span class="particle p1">✨</span>
            <span class="particle p2">⭐</span>
            <span class="particle p3">🌟</span>
            <span class="particle p4">✨</span>
            <span class="particle p5">🔥</span>
          </div>
          <span class="lb-podium-tag">قاعة الشرف الأكاديمية • <bdi>TOP 3</bdi> 🏆</span>
          <h2 class="lb-podium-title">
            <span>ثلاثي الصدارة لمسار هندسة البرمجيات وبايثون</span>
            <i class="fa-solid fa-crown text-amber-400 lb-header-crown"></i>
          </h2>
          <p class="lb-podium-subtitle text-slate-400 text-xs mt-1">فرسان القمة أصحاب أعلى معدلات الإنجاز وتجميع نقاط الخبرة البرمجية</p>

          <!-- Action Audio Broadcast Bar (Voice & SFX) -->
          <div class="lb-action-broadcast-wrap">
            <button type="button" class="lb-action-audio-btn" id="lbActionAudioBtn" title="بث إعلان وتتويج الأبطال صوتياً بنظام أكشن">
              <span class="btn-action-glow"></span>
              <span class="audio-btn-icon" id="lbAudioIcon">⚡</span>
              <span class="audio-btn-text" id="lbAudioText">بث إعلان وتتويج الأبطال (Action Audio) 🔊</span>
              <div class="audio-wave-bars d-none" id="lbAudioWaveBars">
                <span class="bar b1"></span>
                <span class="bar b2"></span>
                <span class="bar b3"></span>
                <span class="bar b4"></span>
                <span class="bar b5"></span>
              </div>
            </button>
            <span class="lb-action-hint">مؤثرات صوتية وإذاعة سينمائية حماسية لتتويج أبطال المراكز الثلاثة الأولى 🎬🏆</span>
          </div>
        </div>

        <div class="lb-podium-grid">
          <!-- Rank 2: Silver (Right in RTL) -->
          <div class="lb-podium-card rank-silver" data-podium-rank="2" style="--card-delay: 0.15s;">
            <div class="podium-card-shine" aria-hidden="true"></div>
            
            <div class="podium-hero-crown silver" aria-hidden="true">
              <span class="crown-icon-3d">🥈</span>
            </div>
            
            <div class="podium-rank-tag silver">
              <i class="fa-solid fa-medal"></i>
              <span>المركز الثاني</span>
            </div>

            <div class="podium-avatar-box silver-glow">
              <div class="avatar-ring-pulse silver"></div>
              <span class="avatar-initials">${top2 ? escapeHtml(top2.studentName.trim().charAt(0) || "🥈") : "🥈"}</span>
              <span class="podium-avatar-rank-pill silver">#2</span>
            </div>

            <div class="podium-identity-wrap">
              <span class="honorary-eng-badge silver">${title2}</span>
              <h3 class="podium-user-name">${top2 ? escapeHtml(top2.studentName) : "في انتظار المنافس"}</h3>
            </div>
            <div class="podium-user-role-wrap">
              <span class="podium-user-role-badge silver">${top2 ? escapeHtml(challengeTitle2) : "المقعد متاح للتنافس"}</span>
            </div>

            <div class="podium-xp-score-wrap silver-xp">
              <div class="xp-energy-bar">
                <span class="xp-lightning">⚡</span>
                <span class="podium-xp-label">إجمالي النقاط:</span>
              </div>
              <div class="podium-xp-number font-mono">
                <span class="xp-val">${top2 ? (top2.xp || 0).toLocaleString() : 0}</span>
                <span class="xp-unit">XP</span>
              </div>
            </div>

            <div class="podium-stats-container font-mono">
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-emerald-400"><span class="stat-icon">📋</span> ${top2 ? `${top2.tasksDone} مكتمل` : "0"}</div>
                <div class="stat-chip-lbl">إنجاز المهام</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-cyan-400"><span class="stat-icon">🎓</span> ${top2 ? `مستوى ${top2.level}` : "1"}</div>
                <div class="stat-chip-lbl">الرتبة البرمجية</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-amber-400"><span class="stat-icon">🔥</span> ${top2 ? `${top2.streak} يوم` : "1 يوم"}</div>
                <div class="stat-chip-lbl">أيام التتابع</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-emerald-400"><span class="stat-icon">🎯</span> ${top2 ? top2.accuracy : "100%"}</div>
                <div class="stat-chip-lbl">دقة الإجابات</div>
              </div>
            </div>

            <div class="podium-card-footer-badge">
              <i class="fa-solid fa-shield-halved text-cyan-400"></i>
              <span>${top2 ? top2.techBadges : "وسام التنافس 🛡️"}</span>
            </div>
          </div>

          <!-- Rank 1: Gold (Center & Elevated) -->
          <div class="lb-podium-card rank-gold" data-podium-rank="1" style="--card-delay: 0.35s;">
            <div class="podium-card-shine" aria-hidden="true"></div>
            <div class="gold-halo-light" aria-hidden="true"></div>

            <div class="podium-hero-crown gold floating-crown" aria-hidden="true">
              <span class="crown-icon-3d">👑</span>
            </div>

            <div class="podium-rank-tag gold">
              <i class="fa-solid fa-crown text-amber-300"></i>
              <span>المركز الأول • البطل</span>
            </div>

            <div class="podium-avatar-box gold-glow">
              <div class="avatar-ring-pulse gold"></div>
              <span class="avatar-initials">${top1 ? escapeHtml(top1.studentName.trim().charAt(0) || "👑") : "👑"}</span>
              <span class="podium-avatar-rank-pill gold">#1 🏆</span>
            </div>

            <div class="podium-identity-wrap">
              <span class="honorary-eng-badge gold">${title1}</span>
              <h3 class="podium-user-name">${top1 ? escapeHtml(top1.studentName) : "في انتظار بطل الصدارة"}</h3>
            </div>
            <div class="podium-user-role-wrap">
              <span class="podium-user-role-badge gold">${top1 ? escapeHtml(challengeTitle1) : "كن أول من يحصد الصدارة"}</span>
            </div>

            <div class="podium-xp-score-wrap gold-xp">
              <div class="xp-energy-bar">
                <span class="xp-lightning gold-pulse">⚡</span>
                <span class="podium-xp-label text-amber-400 font-bold">النقاط الكلية ✪</span>
              </div>
              <div class="podium-xp-number font-mono">
                <span class="xp-val">${top1 ? (top1.xp || 0).toLocaleString() : 0}</span>
                <span class="xp-unit">XP</span>
              </div>
            </div>

            <div class="podium-stats-container font-mono">
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-emerald-400"><span class="stat-icon">📋</span> ${top1 ? `${top1.tasksDone} مكتمل` : "0"}</div>
                <div class="stat-chip-lbl">إنجاز المهام</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-cyan-400"><span class="stat-icon">🎓</span> ${top1 ? `مستوى ${top1.level}` : "1"}</div>
                <div class="stat-chip-lbl">الرتبة البرمجية</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-amber-400"><span class="stat-icon">🔥</span> ${top1 ? `${top1.streak} يوم` : "1 يوم"}</div>
                <div class="stat-chip-lbl">أيام التتابع</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-emerald-400"><span class="stat-icon">🎯</span> ${top1 ? top1.accuracy : "100%"}</div>
                <div class="stat-chip-lbl">دقة الإجابات</div>
              </div>
            </div>

            <div class="podium-card-footer-badge gold">
              <i class="fa-solid fa-award"></i>
              <span>${top1 ? (top1.badge || "بطل الدورة 🥇") : "شارة الصدارة 🥇"}</span>
            </div>
          </div>

          <!-- Rank 3: Bronze (Left in RTL) -->
          <div class="lb-podium-card rank-bronze" data-podium-rank="3" style="--card-delay: 0.25s;">
            <div class="podium-card-shine" aria-hidden="true"></div>
            
            <div class="podium-hero-crown bronze" aria-hidden="true">
              <span class="crown-icon-3d">🥉</span>
            </div>

            <div class="podium-rank-tag bronze">
              <i class="fa-solid fa-award"></i>
              <span>المركز الثالث</span>
            </div>

            <div class="podium-avatar-box bronze-glow">
              <div class="avatar-ring-pulse bronze"></div>
              <span class="avatar-initials">${top3 ? escapeHtml(top3.studentName.trim().charAt(0) || "🥉") : "🥉"}</span>
              <span class="podium-avatar-rank-pill bronze">#3</span>
            </div>

            <div class="podium-identity-wrap">
              <span class="honorary-eng-badge bronze">${title3}</span>
              <h3 class="podium-user-name">${top3 ? escapeHtml(top3.studentName) : "في انتظار المنافس"}</h3>
            </div>
            <div class="podium-user-role-wrap">
              <span class="podium-user-role-badge bronze">${top3 ? escapeHtml(challengeTitle3) : "المقعد متاح للتنافس"}</span>
            </div>

            <div class="podium-xp-score-wrap bronze-xp">
              <div class="xp-energy-bar">
                <span class="xp-lightning">⚡</span>
                <span class="podium-xp-label">إجمالي النقاط:</span>
              </div>
              <div class="podium-xp-number font-mono">
                <span class="xp-val">${top3 ? (top3.xp || 0).toLocaleString() : 0}</span>
                <span class="xp-unit">XP</span>
              </div>
            </div>

            <div class="podium-stats-container font-mono">
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-emerald-400"><span class="stat-icon">📋</span> ${top3 ? `${top3.tasksDone} مكتمل` : "0"}</div>
                <div class="stat-chip-lbl">إنجاز المهام</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-cyan-400"><span class="stat-icon">🎓</span> ${top3 ? `مستوى ${top3.level}` : "1"}</div>
                <div class="stat-chip-lbl">الرتبة البرمجية</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-amber-400"><span class="stat-icon">🔥</span> ${top3 ? `${top3.streak} يوم` : "1 يوم"}</div>
                <div class="stat-chip-lbl">أيام التتابع</div>
              </div>
              <div class="podium-stat-chip">
                <div class="stat-chip-val font-mono text-emerald-400"><span class="stat-icon">🎯</span> ${top3 ? top3.accuracy : "100%"}</div>
                <div class="stat-chip-lbl">دقة الإجابات</div>
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
              <h3 class="lb-standing-name">
                <span class="engineer-title-badge cyan">${getHonoraryEngineerTitle(currentUser.studentName)}</span>
                ${safeStudentName}
              </h3>
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
                ${topStudents.length > 0 ? topStudents.map((st, idx) => {
                  const isGold = st.rank === 1;
                  const isSilver = st.rank === 2;
                  const isBronze = st.rank === 3;
                  const isMe = st.isCurrentUser;

                  const rankColorClass = isGold ? "gold" : isSilver ? "silver" : isBronze ? "bronze" : isMe ? "cyan" : "";
                  const rankIcon = isGold ? "🏆" : isSilver ? "🥈" : isBronze ? "🥉" : isMe ? "🔵" : "";

                  return `
                    <tr class="lb-custom-row ${isMe ? 'row-is-me' : ''}" data-student-rank="${st.rank}" style="--row-delay: ${(Math.min(idx * 0.045, 0.7) + 0.45).toFixed(3)}s;">
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
                            <span class="engineer-title-badge ${rankColorClass}">${getHonoraryEngineerTitle(st.studentName)}</span>
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
                  <p>موقعة من إدارة اتحاد بشبابها والمشرف الأكاديمي م/ إبراهيم الششتتاوي.</p>
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

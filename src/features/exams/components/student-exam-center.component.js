import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { formatDate, formatDateTime } from "../../../shared/utils/date.utils.js";

/**
 * Returns formatted grade badge text and styling for a given percentage.
 * @param {number} percentage
 * @returns {{ label: string, pillClass: string }}
 */
function getGradeBadge(percentage) {
  const p = Number(percentage) || 0;
  if (p >= 95) return { label: "امتياز مع مرتبة الشرف 🏆", pillClass: "pill-emerald-honor" };
  if (p >= 85) return { label: "امتياز معتمد ✔️", pillClass: "pill-emerald" };
  if (p >= 75) return { label: "جيد جداً مرتفع ⚡", pillClass: "pill-cyan" };
  if (p >= 65) return { label: "جيد معتمد", pillClass: "pill-blue" };
  if (p >= 50) return { label: "ناجح", pillClass: "pill-slate" };
  return { label: "دون حد الاجتياز", pillClass: "pill-rose" };
}

/**
 * Renders the Student Exam & Assessment Center UI with an executive,
 * state-of-the-art cyber-glassmorphic design system.
 *
 * @param {object} props
 * @param {object} props.student
 * @param {object} [props.activeExam]
 * @param {Array} [props.upcomingExams]
 * @param {Array} [props.pastExams]
 * @param {object} [props.stats]
 * @returns {string} HTML markup
 */
export function renderStudentExamCenter({
  student,
  activeExam = null,
  upcomingExams = [],
  pastExams = [],
  stats = null
}) {
  const n1 = (student?.name || "").trim();
  const n2 = (student?.studentName || "").trim();
  const safeStudentName = escapeHtml((n1 && n1 !== "طالب مسجل") ? n1 : ((n2 && n2 !== "طالب مسجل") ? n2 : (n1 || n2 || "طالب مسجل")));
  const g1 = (student?.group || "").trim();
  const g2 = (student?.studentGroup || "").trim();
  const studentTrack = escapeHtml((g1 && g1 !== "ALL") ? g1 : ((g2 && g2 !== "ALL") ? g2 : (g1 || g2 || "مسار بايثون وهندسة النظم")));

  // Dynamic statistics
  const activeCount = stats?.activeCount ?? (activeExam ? 1 : 0);
  const passedCount = stats?.passedCount ?? pastExams.filter((e) => {
    const pct = Number(e.result?.percentage ?? e.score ?? 0);
    const pass = Number(e.passDegree ?? e.passingScore ?? 50);
    return pct >= pass;
  }).length;
  const totalCompleted = pastExams.length;
  const avgScore = stats?.averageScore ?? (() => {
    let sum = 0;
    let count = 0;
    pastExams.forEach((e) => {
      const p = e.result?.percentage ?? e.score;
      if (p !== undefined && p !== null) {
        sum += Number(p);
        count++;
      }
    });
    return count > 0 ? `${Math.round(sum / count)}%` : "—";
  })();
  const certificatesCount = stats?.certificatesCount ?? (passedCount > 0 ? (passedCount >= 2 ? "02" : "01") : "00");

  return `
    <div class="student-exam-center-page" dir="rtl">
      <!-- 1. Executive Hero Command Center Banner -->
      <div class="exam-hero-executive-card mb-6">
        <div class="exam-hero-ambient-glow cyan-glow" aria-hidden="true"></div>
        <div class="exam-hero-ambient-glow purple-glow" aria-hidden="true"></div>

        <div class="exam-hero-content-row">
          <div class="exam-hero-lead-box">
            <div class="exam-hero-academic-tag">
              <span class="tag-live-radar">
                <span class="radar-ping"></span>
                <span class="radar-dot"></span>
              </span>
              <span>بوابة التقييم الأكاديمي المباشر • الموسم التدريبي 2026/2027</span>
              <span class="tag-security-badge"><i class="fa-solid fa-shield-halved"></i> تشفير 256-bit</span>
            </div>

            <h2 class="exam-hero-main-title">
              مركز الاختبارات والتقييم الذكي
            </h2>

            <p class="exam-hero-main-desc">
              منظومة الامتحانات البرمجية التفاعلية لطلاب <span class="student-track-badge"><i class="fa-solid fa-code-branch"></i> ${studentTrack}</span>. استعرض الاختبارات المتاحة، ابدأ التقييم الفوري، وراجع تحليلات أدائك المعتمدة بدقة متناهية.
            </p>
          </div>

          <div class="exam-hero-tools-box">
            <button type="button" class="btn-exam-cyber-tool primary-cyber" id="btnRunExamSystemCheck" title="فحص كاميرا المتصفح والاتصال بالخادم">
              <span class="cyber-tool-icon"><i class="fa-solid fa-microchip"></i></span>
              <div class="cyber-tool-text">
                <span class="cyber-tool-title">فحص البيئة الامتحانية</span>
                <span class="cyber-tool-status">System Readiness: OK</span>
              </div>
            </button>

            <button type="button" class="btn-exam-cyber-tool secondary-cyber" id="btnOpenStudentGuide" title="دليل الإرشادات وقواعد النزاهة الرقمية">
              <span class="cyber-tool-icon"><i class="fa-solid fa-book-bookmark"></i></span>
              <div class="cyber-tool-text">
                <span class="cyber-tool-title">دليل وضوابط الاختبار</span>
                <span class="cyber-tool-status">شروط النزاهة الرقمية</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Cybernetic KPI Metrics Strip (4 Dynamic Themed Cards) -->
      <div class="exam-stats-strip-grid mb-6">
        <!-- Metric 1: الامتحانات النشطة (Active Exams - Neon Cyan) -->
        <div class="exam-stat-card theme-cyan ${activeCount > 0 ? 'is-highlighted-active' : ''}">
          <div class="stat-card-header">
            <div class="stat-card-icon-wrap cyan-tint">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <span class="stat-card-label">الامتحانات النشطة المتاحة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-cyan-glow font-mono">${activeCount < 10 ? `0${activeCount}` : activeCount}</span>
          </div>
          <div class="stat-card-footer">
            ${activeCount > 0
              ? `<span class="stat-chip-pill active-cyan"><span class="chip-ping"></span>جاهز للبدء فوراً</span>`
              : `<span class="stat-chip-pill inactive-slate">لا توجد اختبارات نشطة الآن</span>`
            }
          </div>
          <div class="stat-card-beam-glow cyan-beam"></div>
        </div>

        <!-- Metric 2: الاختبارات المجتازة (Passed Exams - Emerald Neon) -->
        <div class="exam-stat-card theme-emerald">
          <div class="stat-card-header">
            <div class="stat-card-icon-wrap emerald-tint">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <span class="stat-card-label">الاختبارات المجتازة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-emerald-glow font-mono">${passedCount < 10 ? `0${passedCount}` : passedCount}</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-chip-pill neutral-slate">من أصل ${totalCompleted} اختبارات منجزة</span>
          </div>
          <div class="stat-card-beam-glow emerald-beam"></div>
        </div>

        <!-- Metric 3: المعدل التراكمي (GPA / Performance - Royal Violet) -->
        <div class="exam-stat-card theme-violet">
          <div class="stat-card-header">
            <div class="stat-card-icon-wrap violet-tint">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <span class="stat-card-label">المعدل التراكمي للاختبارات</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-violet-glow font-mono">${avgScore}</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-chip-pill ${avgScore !== '—' ? 'active-emerald' : 'pending-amber'}">
              ${avgScore !== "—" ? `⚡ الأداء الأكاديمي: ${avgScore}` : "في انتظار التقييم"}
            </span>
          </div>
          <div class="stat-card-beam-glow violet-beam"></div>
        </div>

        <!-- Metric 4: الشهادات والاعتمادات (Certificates & Honors - Radiant Amber) -->
        <div class="exam-stat-card theme-amber">
          <div class="stat-card-header">
            <div class="stat-card-icon-wrap amber-tint">
              <i class="fa-solid fa-award"></i>
            </div>
            <span class="stat-card-label">الشهادات المكتسبة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-amber-glow font-mono">${certificatesCount}</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-chip-pill ${passedCount > 0 ? 'active-gold' : 'neutral-slate'}">
              ${passedCount > 0 ? "معتمد في المسار 🎓" : "تمنح فور اجتياز الاختبارات"}
            </span>
          </div>
          <div class="stat-card-beam-glow amber-beam"></div>
        </div>
      </div>

      <!-- 3. Featured Active Exam Hero Card OR Exam Readiness Console -->
      ${activeExam ? `
        <div class="featured-active-exam-card mb-8">
          <div class="featured-exam-top-strip">
            <div class="featured-tags-group">
              <span class="featured-status-pill">
                <span class="pulse-dot"></span>
                <span>متاح الآن للإجراء الفوري</span>
              </span>
              <span class="featured-track-label"><i class="fa-solid fa-tag"></i> ${studentTrack}</span>
              <span class="featured-code-chip font-mono">CODE: ${escapeHtml(activeExam.code || activeExam.id)}</span>
            </div>
          </div>

          <div class="featured-exam-headings">
            <h3 class="featured-exam-title">
              ${escapeHtml(activeExam.title || "الامتحان الأكاديمي")}
            </h3>
            <p class="featured-exam-desc">
              ${escapeHtml(activeExam.description || "اختبار شامل لقياس المفاهيم والمهارات البرمجية مع تصحيح وحساب فوري للدرجات والنتائج.")}
            </p>
          </div>

          <div class="featured-exam-split-grid mb-6">
            <!-- Left Column: Terminal Sandbox Window -->
            <div class="exam-sandbox-window" dir="ltr">
              <div class="sandbox-window-topbar">
                <div class="window-dots">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-yellow"></span>
                  <span class="dot dot-green"></span>
                </div>
                <span class="window-filename">exam_session.py</span>
                <span class="window-lang-tag">Python 3.12</span>
              </div>
              <pre class="sandbox-code-content"><code><span class="c-comment"># Interactive Academic Exam Session</span>
<span class="c-keyword">def</span> <span class="c-fn">verify_candidate_session</span>():
    candidate_name = <span class="c-string">"${safeStudentName}"</span>
    session_id     = <span class="c-string">"${escapeHtml(activeExam.id)}"</span>
    exam_questions = ${activeExam.totalQuestions || 1}
    <span class="c-keyword">return</span> {<span class="c-string">"status"</span>: <span class="c-string">"AUTHORIZED"</span>, <span class="c-string">"ready"</span>: <span class="c-builtin">True</span>}

<span class="c-comment"># System: Anti-Cheat & Sandbox Initialized</span></code></pre>
              <div class="sandbox-window-footer">
                <span class="footer-dot-green"></span>
                <span>بيئة الاختبار متصلة ومؤمنة</span>
                <span class="footer-latency font-mono">Status: 200 OK • Sandbox Active</span>
              </div>
            </div>

            <!-- Right Column: Exam Specs & Integrity Warning -->
            <div class="exam-specs-column">
              <div class="exam-specs-2x2-grid mb-4">
                <div class="exam-spec-item">
                  <div class="spec-icon-box cyan"><i class="fa-solid fa-clock"></i></div>
                  <div class="spec-text">
                    <span class="spec-label">المدة الزمنية</span>
                    <strong class="spec-val font-mono">${activeExam.duration || 30} دقيقة</strong>
                  </div>
                </div>

                <div class="exam-spec-item">
                  <div class="spec-icon-box purple"><i class="fa-solid fa-circle-question"></i></div>
                  <div class="spec-text">
                    <span class="spec-label">عدد الأسئلة</span>
                    <strong class="spec-val font-mono">${activeExam.totalQuestions || 0} أسئلة</strong>
                  </div>
                </div>

                <div class="exam-spec-item">
                  <div class="spec-icon-box amber"><i class="fa-solid fa-star"></i></div>
                  <div class="spec-text">
                    <span class="spec-label">درجة الاجتياز</span>
                    <strong class="spec-val font-mono">${activeExam.passDegree || activeExam.passingScore || 60}%</strong>
                  </div>
                </div>

                <div class="exam-spec-item">
                  <div class="spec-icon-box emerald"><i class="fa-solid fa-shield-halved"></i></div>
                  <div class="spec-text">
                    <span class="spec-label">نظام المراقبة</span>
                    <strong class="spec-val text-emerald-400">حفظ تلقائي معتمد</strong>
                  </div>
                </div>
              </div>

              <!-- Integrity Rules Box -->
              <div class="exam-integrity-rules-box">
                <div class="rules-box-header">
                  <span class="rules-shield-icon"><i class="fa-solid fa-lock"></i></span>
                  <strong>قواعد النزاهة الرقمية المعتمدة:</strong>
                </div>
                <p class="rules-box-desc">
                  يتم حفظ إجاباتك تلقائياً عند اختيار كل سؤال. لا تقم بتحديث الصفحة أو إغلاق المتصفح أثناء تشغيل مؤقت الاختبار لضمان توثيق النتيجة.
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons Footer -->
          <div class="featured-exam-action-bar">
            <button type="button" class="btn-enter-exam-hall" id="btnEnterExamHall" data-exam-id="${escapeHtml(activeExam.id)}">
              <span class="btn-enter-icon"><i class="fa-solid fa-play"></i></span>
              <span>دخول قاعة الاختبار الآن</span>
            </button>
            <button type="button" class="btn-exam-guidelines" id="btnExamGuidelines">
              <span class="guidelines-icon"><i class="fa-solid fa-circle-info"></i></span>
              <span>الإرشادات وشروط التقييم الأكاديمي</span>
            </button>
          </div>
        </div>
      ` : `
        <!-- High-Tech Exam Readiness & Integrity Showcase Console -->
        <div class="exam-readiness-console-card mb-8">
          <div class="readiness-header-row">
            <div class="readiness-badge-lead">
              <div class="readiness-shield-wrap">
                <div class="readiness-ping-ring"></div>
                <div class="readiness-shield-icon">
                  <i class="fa-solid fa-shield-halved"></i>
                </div>
              </div>
              <div>
                <div class="readiness-status-tag">
                  <span class="readiness-dot"></span>
                  <span>المنظومة الامتحانية في أتم الجاهزية والاستقرار</span>
                </div>
                <h3 class="readiness-main-title">لا توجد امتحانات نشطة مفتوحة للبدء حالياً</h3>
                <p class="readiness-sub-desc">
                  أنت على اطلاع تام بكافة متطلباتك الامتحانية. راجع قائمة الامتحانات المجدولة القادمة أدناه أو تصفح سجل نتائجك المعتمدة.
                </p>
              </div>
            </div>
          </div>

          <!-- 3 System Readiness Features -->
          <div class="readiness-pillars-grid">
            <div class="readiness-pillar-item">
              <div class="pillar-icon-box cyan">
                <i class="fa-solid fa-bolt-lightning"></i>
              </div>
              <div class="pillar-text">
                <strong class="pillar-title">محرك التصحيح الذكي</strong>
                <p class="pillar-desc">تصحيح فوري لإجابات الاختيار من متعدد واختبارات الكود البرمجي وحساب دقيق للنتائج.</p>
              </div>
            </div>

            <div class="readiness-pillar-item">
              <div class="pillar-icon-box emerald">
                <i class="fa-solid fa-cloud-arrow-up"></i>
              </div>
              <div class="pillar-text">
                <strong class="pillar-title">حفظ مسودات تلقائي</strong>
                <p class="pillar-desc">مزامنة سحابية لحظية لكل إجابة لضمان أمان درجاتك في حال انقطاع الاتصال المفاجئ.</p>
              </div>
            </div>

            <div class="readiness-pillar-item">
              <div class="pillar-icon-box violet">
                <i class="fa-solid fa-award"></i>
              </div>
              <div class="pillar-text">
                <strong class="pillar-title">تقارير واعتمادات فورية</strong>
                <p class="pillar-desc">توليد شهادة اجتياز وتقرير تحليلي مفصل للمهارات ونقاط القوة فور اعتماد الاختبار.</p>
              </div>
            </div>
          </div>
        </div>
      `}

      <!-- 4. Filter & Tabs Toolbar -->
      <div class="exam-toolbar-row mb-6">
        <div class="exam-toolbar-tabs" role="tablist">
          <button type="button" class="exam-tab-pill is-active" data-exam-tab="active">
            <span class="tab-pill-icon"><i class="fa-solid fa-bolt"></i></span>
            <span>الامتحانات النشطة والمتاحة</span>
            <span class="tab-pill-badge">${activeCount}</span>
          </button>
          <button type="button" class="exam-tab-pill" data-exam-tab="upcoming">
            <span class="tab-pill-icon"><i class="fa-solid fa-calendar-days"></i></span>
            <span>المجدولة والقادمة</span>
            <span class="tab-pill-badge">${upcomingExams.length}</span>
          </button>
          <button type="button" class="exam-tab-pill" data-exam-tab="completed">
            <span class="tab-pill-icon"><i class="fa-solid fa-circle-check"></i></span>
            <span>السابقة والنتائج المعتمدة</span>
            <span class="tab-pill-badge">${pastExams.length}</span>
          </button>
        </div>
      </div>

      <!-- 5. Scheduled & Upcoming Exams Section -->
      <section class="exam-section-block mb-8" id="secUpcomingExams">
        <div class="exam-section-title-wrap mb-4">
          <div class="section-title-box">
            <div class="section-title-icon-box cyan">
              <i class="fa-solid fa-calendar-days"></i>
            </div>
            <div>
              <h3 class="exam-section-title">الاختبارات المجدولة والقادمة</h3>
              <span class="exam-section-subtitle">التقويم الأكاديمي لمواعيد التقييمات المستقبلية</span>
            </div>
          </div>
        </div>

        <div class="scheduled-exams-grid">
          ${upcomingExams.length > 0 ? upcomingExams.map((exam) => `
            <div class="scheduled-exam-card">
              <div class="scheduled-card-top">
                <span class="pill-days-left pill-blue"><i class="fa-solid fa-clock"></i> مجدول</span>
                <span class="scheduled-code font-mono">${escapeHtml(exam.code || exam.id)}</span>
              </div>
              <h4 class="scheduled-card-title">${escapeHtml(exam.title || "اختبار قادم")}</h4>
              <p class="scheduled-card-desc">
                ${escapeHtml(exam.description || "اختبار دوري مجدول ضمن المسار التدريبي لقياس المهارات المكتسبة.")}
              </p>
              <div class="scheduled-card-meta-row">
                <div class="scheduled-meta-item">
                  <span class="meta-icon"><i class="fa-solid fa-calendar"></i></span>
                  <span>${formatDate(exam.startDate || exam.dateDisplay || new Date())}</span>
                </div>
                <div class="scheduled-meta-item">
                  <span class="meta-icon"><i class="fa-solid fa-hourglass-half"></i></span>
                  <span>${exam.duration || 30} دقيقة</span>
                </div>
                <div class="scheduled-meta-item">
                  <span class="meta-icon"><i class="fa-solid fa-circle-question"></i></span>
                  <span>${exam.totalQuestions || 0} أسئلة</span>
                </div>
                <button type="button" class="btn-add-calendar" data-exam-reminder="${escapeHtml(exam.code || exam.id)}">
                  <span><i class="fa-solid fa-bell"></i></span>
                  <span>تذكير</span>
                </button>
              </div>
            </div>
          `).join("") : `
            <div class="col-span-full exam-empty-state-card">
              <div class="empty-state-icon-box">
                <i class="fa-solid fa-calendar-check"></i>
              </div>
              <h4 class="empty-state-title">لا توجد اختبارات مجدولة قادمة حالياً</h4>
              <p class="empty-state-desc">سيتم إخطارك فور إعلان أي اختبار جديد عبر مركز الإشعارات والتنبيهات 🔔.</p>
            </div>
          `}
        </div>
      </section>

      <!-- 6. Completed Exams & Reports Table -->
      <section class="exam-section-block mb-8" id="secCompletedExams">
        <div class="exam-table-header-bar mb-4">
          <div class="section-title-box">
            <div class="section-title-icon-box emerald">
              <i class="fa-solid fa-square-poll-vertical"></i>
            </div>
            <div>
              <h3 class="exam-section-title">سجل الاختبارات المكتملة وتقارير التحليل</h3>
              <span class="exam-section-subtitle">بيانات النتائج المعتمدة، التقديرات، ونسب الإنجاز</span>
            </div>
          </div>
          <div class="exam-gpa-stat-pill">
            <span class="gpa-label">المعدل التراكمي العام:</span>
            <strong class="gpa-score-val font-mono">${avgScore}</strong>
          </div>
        </div>

        <div class="exam-table-container">
          <table class="exam-records-table">
            <thead>
              <tr>
                <th>اسم الاختبار والوحدة</th>
                <th>تاريخ الإجراء</th>
                <th>المدة المستغرقة</th>
                <th>الدرجة النهائية</th>
                <th>التقدير والاعتماد</th>
                <th>إجراءات المراجعة</th>
              </tr>
            </thead>
            <tbody>
              ${pastExams.length > 0 ? pastExams.map((exam) => {
                const res = exam.result || {};
                const pct = res.percentage ?? exam.score ?? 0;
                const badge = getGradeBadge(pct);
                return `
                  <tr>
                    <td>
                      <div class="table-exam-identity">
                        <strong class="table-exam-name">${escapeHtml(exam.title || res.examTitle || "اختبار أكاديمي")}</strong>
                        <span class="table-exam-subcode font-mono">${escapeHtml(exam.code || exam.id)} • ${exam.totalQuestions || res.totalQuestions || 0} أسئلة</span>
                      </div>
                    </td>
                    <td class="text-slate-300 font-mono">
                      <div>${formatDate(res.submittedAt || res.createdAt || exam.dateDisplay || new Date())}</div>
                    </td>
                    <td class="text-slate-300 font-mono">
                      <span>${res.durationMinutes || exam.duration || 30} دقيقة</span>
                    </td>
                    <td>
                      <div class="table-score-box">
                        <strong class="score-val ${pct >= 60 ? 'text-emerald-400' : 'text-rose-400'} font-mono">${pct}%</strong>
                        ${res.score !== undefined && res.totalPoints ? `<span class="score-denom font-mono">(${res.score}/${res.totalPoints})</span>` : ""}
                      </div>
                    </td>
                    <td>
                      <span class="table-badge-pill ${badge.pillClass}">${badge.label}</span>
                    </td>
                    <td>
                      <button type="button" class="btn-table-action" data-review-result="${escapeHtml(exam.id)}" data-exam-id="${escapeHtml(exam.id)}">
                        <span><i class="fa-solid fa-eye"></i></span>
                        <span>استعراض تقرير النتيجة</span>
                      </button>
                    </td>
                  </tr>
                `;
              }).join("") : `
                <tr>
                  <td colspan="6" class="p-8 text-center text-slate-400">
                    <div class="table-empty-wrap">
                      <div class="table-empty-icon"><i class="fa-solid fa-chart-simple"></i></div>
                      <strong class="table-empty-title">لم تجتز أي اختبارات بعد</strong>
                      <p class="table-empty-sub">ستظهر هنا سجلات نتائجك، تقديراتك الرسمية، وتقارير مراجعة الإجابات فور خوضك لأول اختبار.</p>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

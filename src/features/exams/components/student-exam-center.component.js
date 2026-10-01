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
 * Renders the Student Exam & Assessment Center UI matching Image 7.png,
 * dynamically bound to real Firestore exams and student results.
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
  const safeStudentName = escapeHtml(student?.name || student?.studentName || "طالب مسجل");
  const studentTrack = escapeHtml(student?.group || student?.studentGroup || "مسار بايثون وهندسة النظم");

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
      <!-- 1. Top Header Section -->
      <div class="exam-center-top-header mb-6">
        <div class="exam-header-lead">
          <div class="exam-header-academic-tag">
            <span class="tag-pulse-dot"></span>
            <span>بوابة التقييم الأكاديمي المباشر • الموسم التدريبي 2026/2027</span>
          </div>
          <h2 class="exam-header-main-title">مركز الاختبارات والتقييم الذكي</h2>
          <p class="exam-header-main-desc">
            منظومة الامتحانات البرمجية التفاعلية لطلاب ${studentTrack}. استعرض الاختبارات المتاحة، ابدأ الاختبار الفوري، وراجع تحليلات أدائك المعتمدة.
          </p>
        </div>

        <div class="exam-header-tools">
          <button type="button" class="btn-exam-header-tool" id="btnRunExamSystemCheck">
            <span class="tool-icon">((•))</span>
            <span>فحص البيئة الامتحانية</span>
          </button>
          <button type="button" class="btn-exam-header-tool" id="btnOpenStudentGuide">
            <span class="tool-icon">📖</span>
            <span>دليل الطالب</span>
          </button>
        </div>
      </div>

      <!-- 2. Top Stats Strip (4 Real Metric Cards) -->
      <div class="exam-stats-strip-grid mb-6">
        <!-- Metric 1: الامتحانات النشطة المتاحة -->
        <div class="exam-stat-card ${activeCount > 0 ? 'is-active-cyan' : ''}">
          <div class="stat-card-header">
            <span class="stat-card-icon cyan-tint">⚡</span>
            <span class="stat-card-label">الامتحانات النشطة المتاحة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-cyan-400 font-mono">${activeCount < 10 ? `0${activeCount}` : activeCount}</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-footer-text">${activeCount > 0 ? "جاهز للبدء فوراً" : "لا توجد اختبارات نشطة الآن"}</span>
          </div>
          ${activeCount > 0 ? '<div class="stat-card-accent-bar cyan-bar"></div>' : ''}
        </div>

        <!-- Metric 2: الاختبارات المجتازة -->
        <div class="exam-stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon purple-tint">✔️</span>
            <span class="stat-card-label">الاختبارات المجتازة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-slate-100 font-mono">${passedCount < 10 ? `0${passedCount}` : passedCount}</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-footer-text">من أصل ${totalCompleted} اختبارات منجزة</span>
          </div>
        </div>

        <!-- Metric 3: المعدل التراكمي للاختبارات -->
        <div class="exam-stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon teal-tint">📈</span>
            <span class="stat-card-label">المعدل التراكمي للاختبارات</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-slate-100 font-mono">${avgScore}</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-pill-badge emerald">
              ${avgScore !== "—" ? `⚡ الأداء الأكاديمي: ${avgScore}` : "في انتظار التقييم"}
            </span>
          </div>
        </div>

        <!-- Metric 4: الشهادات المكتسبة -->
        <div class="exam-stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon pink-tint">🎖️</span>
            <span class="stat-card-label">الشهادات المكتسبة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-slate-100 font-mono">${certificatesCount}</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-footer-text">${passedCount > 0 ? "معتمد في المسار" : "تمنح فور اجتياز الاختبارات"}</span>
          </div>
        </div>
      </div>

      <!-- 3. Featured Active Exam Hero Card -->
      ${activeExam ? `
        <div class="featured-active-exam-card mb-8">
          <div class="featured-exam-top-strip">
            <div class="featured-tags-group">
              <span class="featured-status-pill">
                <span class="pulse-dot"></span>
                <span>متاح الآن للإجراء الفوري</span>
              </span>
              <span class="featured-track-label">${studentTrack}</span>
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
              </div>
              <pre class="sandbox-code-content"><code><span class="c-comment"># Interactive Exam Session</span>
<span class="c-keyword">def</span> <span class="c-fn">verify_candidate</span>():
    student = <span class="c-string">"${safeStudentName}"</span>
    exam_id = <span class="c-string">"${escapeHtml(activeExam.id)}"</span>
    <span class="c-keyword">return</span> {<span class="c-string">"status"</span>: <span class="c-string">"READY"</span>, <span class="c-string">"questions"</span>: ${activeExam.totalQuestions || 1}}

<span class="c-comment"># Engine State: Online and Protected</span></code></pre>
              <div class="sandbox-window-footer">
                <span class="footer-dot-green"></span>
                <span>بيئة الامتحان متصلة</span>
                <span class="footer-latency font-mono">Status: 200 OK</span>
              </div>
            </div>

            <!-- Right Column: Exam Specs & Integrity Warning -->
            <div class="exam-specs-column">
              <div class="exam-specs-2x2-grid mb-4">
                <div class="exam-spec-item">
                  <span class="spec-icon">⏱️</span>
                  <div class="spec-text">
                    <span class="spec-label">المدة الزمنية</span>
                    <strong class="spec-val font-mono">${activeExam.duration || 30} دقيقة</strong>
                  </div>
                </div>

                <div class="exam-spec-item">
                  <span class="spec-icon">❓</span>
                  <div class="spec-text">
                    <span class="spec-label">عدد الأسئلة</span>
                    <strong class="spec-val font-mono">${activeExam.totalQuestions || 0} أسئلة</strong>
                  </div>
                </div>

                <div class="exam-spec-item">
                  <span class="spec-icon">⭐</span>
                  <div class="spec-text">
                    <span class="spec-label">درجة الاجتياز</span>
                    <strong class="spec-val font-mono">${activeExam.passDegree || activeExam.passingScore || 60}%</strong>
                  </div>
                </div>

                <div class="exam-spec-item">
                  <span class="spec-icon">🔒</span>
                  <div class="spec-text">
                    <span class="spec-label">نظام المراقبة</span>
                    <strong class="spec-val text-emerald-400">حفظ تلقائي معتمد</strong>
                  </div>
                </div>
              </div>

              <!-- Integrity Rules Box -->
              <div class="exam-integrity-rules-box">
                <div class="rules-box-header">
                  <span class="rules-shield-icon">🛡️</span>
                  <strong>قواعد النزاهة الرقمية:</strong>
                </div>
                <p class="rules-box-desc">
                  يتم حفظ إجاباتك تلقائياً عند اختيار كل سؤال. لا تقم بتحديث الصفحة أو إغلاق المتصفح أثناء تشغيل مؤقت الامتحان.
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons Footer -->
          <div class="featured-exam-action-bar">
            <button type="button" class="btn-enter-exam-hall" id="btnEnterExamHall" data-exam-id="${escapeHtml(activeExam.id)}">
              <span class="btn-enter-icon">▷</span>
              <span>دخول قاعة الاختبار الآن</span>
            </button>
            <button type="button" class="btn-exam-guidelines" id="btnExamGuidelines">
              <span class="guidelines-icon">ℹ️</span>
              <span>الإرشادات وشروط التقييم</span>
            </button>
          </div>
        </div>
      ` : `
        <!-- Informative Banner when no exam is currently live -->
        <div class="glass-card p-6 mb-8 text-center border border-brand-border">
          <div class="max-w-md mx-auto space-y-2">
            <span style="font-size: 2.5rem;">🎉</span>
            <h3 class="text-white font-bold text-base">لا توجد امتحانات نشطة مفتوحة للبدء الآن</h3>
            <p class="text-slate-400 text-xs leading-relaxed">
              أنت على اطلاع بكافة متطلباتك الامتحانية. راجع قائمة الامتحانات المجدولة القادمة أدناه أو تصفح سجل نتائجك المعتمدة.
            </p>
          </div>
        </div>
      `}

      <!-- 4. Filter & Tabs Toolbar -->
      <div class="exam-toolbar-row mb-6">
        <div class="exam-toolbar-tabs" role="tablist">
          <button type="button" class="exam-tab-pill is-active" data-exam-tab="active">
            <span>الامتحانات النشطة والمتاحة (${activeCount})</span>
          </button>
          <button type="button" class="exam-tab-pill" data-exam-tab="upcoming">
            <span>المجدولة والقادمة (${upcomingExams.length})</span>
          </button>
          <button type="button" class="exam-tab-pill" data-exam-tab="completed">
            <span>السابقة والنتائج المعتمدة (${pastExams.length})</span>
          </button>
        </div>
      </div>

      <!-- 5. Scheduled & Upcoming Exams Section -->
      <section class="exam-section-block mb-8" id="secUpcomingExams">
        <div class="exam-section-title-wrap mb-4">
          <h3 class="exam-section-title">
            <span class="sec-icon">📅</span>
            <span>الاختبارات المجدولة والقادمة</span>
          </h3>
          <span class="exam-section-subtitle">التقويم الأكاديمي للاختبارات</span>
        </div>

        <div class="scheduled-exams-grid">
          ${upcomingExams.length > 0 ? upcomingExams.map((exam) => `
            <div class="scheduled-exam-card">
              <div class="scheduled-card-top">
                <span class="pill-days-left pill-blue">مجدول</span>
                <span class="scheduled-code font-mono">${escapeHtml(exam.code || exam.id)}</span>
              </div>
              <h4 class="scheduled-card-title">${escapeHtml(exam.title || "اختبار قادم")}</h4>
              <p class="scheduled-card-desc">
                ${escapeHtml(exam.description || "اختبار دوري مجدول ضمن المسار التدريبي.")}
              </p>
              <div class="scheduled-card-meta-row">
                <div class="scheduled-meta-item">
                  <span class="meta-icon">📅</span>
                  <span>${formatDate(exam.startDate || exam.dateDisplay || new Date())}</span>
                </div>
                <div class="scheduled-meta-item">
                  <span class="meta-icon">⏱️</span>
                  <span>${exam.duration || 30} دقيقة</span>
                </div>
                <div class="scheduled-meta-item">
                  <span class="meta-icon">❓</span>
                  <span>${exam.totalQuestions || 0} أسئلة</span>
                </div>
                <button type="button" class="btn-add-calendar" data-exam-reminder="${escapeHtml(exam.code || exam.id)}">
                  <span>🔔</span>
                  <span>تذكير</span>
                </button>
              </div>
            </div>
          `).join("") : `
            <div class="col-span-full p-6 text-center text-slate-400 bg-brand-surface/40 border border-brand-border rounded-xl">
              <span class="text-2xl block mb-2">📅</span>
              <p class="text-xs">لا توجد اختبارات مجدولة قادمة حالياً. سيتم إخطارك فور إعلان أي اختبار جديد.</p>
            </div>
          `}
        </div>
      </section>

      <!-- 6. Completed Exams & Reports Table -->
      <section class="exam-section-block mb-8" id="secCompletedExams">
        <div class="exam-table-header-bar mb-4">
          <h3 class="exam-section-title">
            <span class="sec-icon text-emerald-400">✔️</span>
            <span>سجل الاختبارات المكتملة وتقارير التحليل</span>
          </h3>
          <div class="exam-gpa-stat">
            <span>المعدل التراكمي العام:</span>
            <strong class="gpa-score font-mono">${avgScore}</strong>
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
                        <span>👁️</span>
                        <span>استعراض تقرير النتيجة</span>
                      </button>
                    </td>
                  </tr>
                `;
              }).join("") : `
                <tr>
                  <td colspan="6" class="p-8 text-center text-slate-400">
                    لم تجتز أي اختبارات بعد. ستظهر نتائجك وتقاريرك الأكاديمية هنا فور أداء الاختبارات.
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

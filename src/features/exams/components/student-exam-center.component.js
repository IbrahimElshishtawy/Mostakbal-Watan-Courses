import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Student Exam & Assessment Center UI matching Image 7.png.
 * @param {object} props
 * @param {object} props.student
 * @param {object} [props.activeExam]
 * @param {Array} [props.upcomingExams]
 * @param {Array} [props.pastExams]
 * @returns {string} HTML markup
 */
export function renderStudentExamCenter({
  student,
  activeExam = null,
  upcomingExams = [],
  pastExams = []
}) {
  const safeStudentName = escapeHtml(student?.name || student?.studentName || "إبراهيم خالد");

  return `
    <div class="student-exam-center-page" dir="rtl">
      <!-- 1. Top Header Section (مركز الاختبارات والتقييم الذكي) -->
      <div class="exam-center-top-header mb-6">
        <div class="exam-header-lead">
          <div class="exam-header-academic-tag">
            <span class="tag-pulse-dot"></span>
            <span>بوابة التقييم الأكاديمي المباشر • Academic Session 2026-Q4</span>
          </div>
          <h2 class="exam-header-main-title">مركز الاختبارات والتقييم الذكي</h2>
          <p class="exam-header-main-desc">
            منظومة الإمتحانات البرمجية المعزولة لطلاب مسار بايثون وهندسة النظم. استعرض الاختبارات النشطة، راجع تحليلات الأداء، وتأكد من استيفاء شروط النزاهة الرقمية.
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

      <!-- 2. Top Stats Strip (4 Metric Cards) -->
      <div class="exam-stats-strip-grid mb-6">
        <!-- Metric 1: الامتحانات النشطة المتاحة -->
        <div class="exam-stat-card is-active-cyan">
          <div class="stat-card-header">
            <span class="stat-card-icon cyan-tint">⚡</span>
            <span class="stat-card-label">الامتحانات النشطة المتاحة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-cyan-400">01</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-footer-text">جاهز للبدء فوراً</span>
          </div>
          <div class="stat-card-accent-bar cyan-bar"></div>
        </div>

        <!-- Metric 2: الاختبارات المجتازة -->
        <div class="exam-stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon purple-tint">✔️</span>
            <span class="stat-card-label">الاختبارات المجتازة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-slate-100">03</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-footer-text">من أصل 6 اختبارات</span>
          </div>
        </div>

        <!-- Metric 3: المعدل التراكمي للاختبارات -->
        <div class="exam-stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon teal-tint">📈</span>
            <span class="stat-card-label">المعدل التراكمي للاختبارات</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-slate-100">96.0%</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-pill-badge emerald">⚡ ممتاز</span>
          </div>
        </div>

        <!-- Metric 4: الشهادات المكتسبة -->
        <div class="exam-stat-card">
          <div class="stat-card-header">
            <span class="stat-card-icon pink-tint">🎖️</span>
            <span class="stat-card-label">الشهادات المكتسبة</span>
          </div>
          <div class="stat-card-body">
            <span class="stat-card-value text-slate-100">01</span>
          </div>
          <div class="stat-card-footer">
            <span class="stat-footer-text">بايثون التأسيسي المعتمد</span>
          </div>
        </div>
      </div>

      <!-- 3. Featured Active Exam Hero Card (الاختبار الشامل) -->
      <div class="featured-active-exam-card mb-8">
        <div class="featured-exam-top-strip">
          <div class="featured-tags-group">
            <span class="featured-status-pill">
              <span class="pulse-dot"></span>
              <span>متاح الآن للإجراء الفوري</span>
            </span>
            <span class="featured-track-label">مسار: أساسيات بايثون وهندسة المنطق</span>
            <span class="featured-code-chip">CODE: PY-101-MID</span>
          </div>
        </div>

        <div class="featured-exam-headings">
          <h3 class="featured-exam-title">
            الاختبار الشامل: أساسيات بايثون والتفكير الخوارزمي (Level 1 Comprehensive)
          </h3>
          <p class="featured-exam-desc">
            يغطي هذا الامتحان بنى التحكم البرمجية (Loops & Conditionals)، معالجة القوائم والقواميس (Lists & Dictionaries)، وكتابة الدوال المعيارية النظيفة مع اختبار عملي مباشر داخل بيئة التجميع السحابية.
          </p>
        </div>

        <!-- Two-column Body: Left Sandbox + Right Specs -->
        <div class="featured-exam-split-grid mb-6">
          <!-- Left Column: Terminal Sandbox Window -->
          <div class="exam-sandbox-window" dir="ltr">
            <div class="sandbox-window-topbar">
              <div class="window-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="window-filename">exam_environment_v3.py</span>
            </div>
            <pre class="sandbox-code-content"><code><span class="c-comment"># Live Python Engine</span>
<span class="c-comment">Evaluation Sandbox</span>
<span class="c-keyword">def</span> <span class="c-fn">solve_task</span>(student_id: <span class="c-builtin">str</span>):
    candidate = <span class="c-string">"${safeStudentName}"</span>
    status = <span class="c-string">"VERIFIED_ELGIBLE"</span>
    <span class="c-keyword">return</span> {<span class="c-string">"auth"</span>: <span class="c-keyword">True</span>, <span class="c-string">"q_total"</span>: 25}

<span class="c-comment"># Output: READY [Status: 200 OK]</span></code></pre>
            <div class="sandbox-window-footer">
              <span class="footer-dot-green"></span>
              <span>بث الامتحان متصل</span>
              <span class="footer-latency">Latency: 28ms</span>
            </div>
          </div>

          <!-- Right Column: Exam Specs & Integrity Warning -->
          <div class="exam-specs-column">
            <!-- 2x2 Specs Grid -->
            <div class="exam-specs-2x2-grid mb-4">
              <div class="exam-spec-item">
                <span class="spec-icon">⏱️</span>
                <div class="spec-text">
                  <span class="spec-label">المدة الزمنية</span>
                  <strong class="spec-val">45 دقيقة</strong>
                </div>
              </div>

              <div class="exam-spec-item">
                <span class="spec-icon">❓</span>
                <div class="spec-text">
                  <span class="spec-label">عدد الأسئلة</span>
                  <strong class="spec-val">25 سؤالاً (MCQ + كود)</strong>
                </div>
              </div>

              <div class="exam-spec-item">
                <span class="spec-icon">⭐</span>
                <div class="spec-text">
                  <span class="spec-label">الدرجة الكلية</span>
                  <strong class="spec-val">100 نقطة</strong>
                </div>
              </div>

              <div class="exam-spec-item">
                <span class="spec-icon">🔒</span>
                <div class="spec-text">
                  <span class="spec-label">الإغلاق التلقائي</span>
                  <strong class="spec-val" id="examCountdownTimer">خلال 02:40:15</strong>
                </div>
              </div>
            </div>

            <!-- Integrity Rules Box -->
            <div class="exam-integrity-rules-box">
              <div class="rules-box-header">
                <span class="rules-shield-icon">🛡️</span>
                <strong>قواعد النزاهة والمراقبة الرقمية:</strong>
              </div>
              <p class="rules-box-desc">
                محاولة واحدة فقط مصرح بها. يتم قفل التبويبات الخارجية ومراقبة حركة المؤشر بواسطة محرك الاختبار. تشغيل ومخرجات بايثون تختبر في سحابة معزولة.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="featured-exam-action-bar">
          <button type="button" class="btn-enter-exam-hall" id="btnEnterExamHall" data-exam-id="PY-101-MID">
            <span class="btn-enter-icon">▷</span>
            <span>دخول قاعة الاختبار الآن</span>
          </button>
          <button type="button" class="btn-exam-guidelines" id="btnExamGuidelines">
            <span class="guidelines-icon">ℹ️</span>
            <span>الإرشادات وشروط التقييم</span>
          </button>
        </div>
      </div>

      <!-- 4. Filter & Tabs Toolbar -->
      <div class="exam-toolbar-row mb-6">
        <div class="exam-toolbar-tabs" role="tablist">
          <button type="button" class="exam-tab-pill is-active" data-exam-tab="active">
            <span>الامتحانات النشطة والمتاحة (1)</span>
          </button>
          <button type="button" class="exam-tab-pill" data-exam-tab="upcoming">
            <span>المجدولة والقادمة (2)</span>
          </button>
          <button type="button" class="exam-tab-pill" data-exam-tab="completed">
            <span>السابقة والنتائج المعتمدة (3)</span>
          </button>
        </div>

        <div class="exam-toolbar-filter">
          <div class="exam-custom-select-wrap">
            <select class="exam-filter-select" id="examTrackFilterSelect" title="تصفية حسب المسار الأكاديمي">
              <option value="ALL">جميع المسارات الأكاديمية</option>
              <option value="python">أساسيات بايثون وهندسة النظم</option>
              <option value="oop">البرمجة كائنية التوجه OOP</option>
              <option value="projects">مشاريع التخرج العملية</option>
            </select>
            <span class="select-arrow-icon">⌄</span>
          </div>
          <button type="button" class="btn-toolbar-filter-icon" title="تصفية إضافية">
            <span>☰</span>
          </button>
        </div>
      </div>

      <!-- 5. Scheduled & Upcoming Exams Section (الاختبارات المجدولة والقادمة) -->
      <section class="exam-section-block mb-8" id="secUpcomingExams">
        <div class="exam-section-title-wrap mb-4">
          <h3 class="exam-section-title">
            <span class="sec-icon">📅</span>
            <span>الاختبارات المجدولة والقادمة</span>
          </h3>
          <span class="exam-section-subtitle">التقويم الأكاديمي لشهر أكتوبر 2026</span>
        </div>

        <div class="scheduled-exams-grid">
          <!-- Card 1: OOP & Data Structures -->
          <div class="scheduled-exam-card">
            <div class="scheduled-card-top">
              <span class="pill-days-left pill-blue">خلال 4 أيام</span>
              <span class="scheduled-code">CS-202-OOP</span>
            </div>
            <h4 class="scheduled-card-title">اختبار البرمجة كائنية التوجه (OOP & Data Structures)</h4>
            <p class="scheduled-card-desc">
              تقييم متقدم يشمل تطبيق مبادئ الوراثة، الكبسلة، وتعدد الأشكال (Polymorphism) على نماذج بيانات واقعية.
            </p>
            <div class="scheduled-card-meta-row">
              <div class="scheduled-meta-item">
                <span class="meta-icon">📅</span>
                <span>الأحد 5 أكتوبر 2026</span>
              </div>
              <div class="scheduled-meta-item">
                <span class="meta-icon">⏱️</span>
                <span>07:00 PM (توقيت القاهرة)</span>
              </div>
              <div class="scheduled-meta-item">
                <span class="meta-avatar">م</span>
                <span>إشراف: م / إبراهيم الششتاوي</span>
              </div>
              <button type="button" class="btn-add-calendar" data-exam-reminder="CS-202-OOP">
                <span>🔔</span>
                <span>إضافة للتقويم</span>
              </button>
            </div>
          </div>

          <!-- Card 2: Midterm Practical Assessment -->
          <div class="scheduled-exam-card">
            <div class="scheduled-card-top">
              <span class="pill-days-left pill-indigo">خلال 11 يوماً</span>
              <span class="scheduled-code">PRJ-301-MID</span>
            </div>
            <h4 class="scheduled-card-title">المشروع التقييمي العملي النصفي Midterm Practical (Assessment)</h4>
            <p class="scheduled-card-desc">
              بناء نظام مصغر لإدارة السجلات وقواعد البيانات باستخدام Python & SQLite مع توثيق الكود عبر GitHub.
            </p>
            <div class="scheduled-card-meta-row">
              <div class="scheduled-meta-item">
                <span class="meta-icon">📅</span>
                <span>الاثنين 12 أكتوبر 2026</span>
              </div>
              <div class="scheduled-meta-item">
                <span class="meta-icon">⏱️</span>
                <span>08:30 PM (تسليم مباشر)</span>
              </div>
              <div class="scheduled-meta-item">
                <span class="meta-avatar">ل</span>
                <span>لجنة التحكيم المركزية</span>
              </div>
              <button type="button" class="btn-add-calendar" data-exam-reminder="PRJ-301-MID">
                <span>🔔</span>
                <span>إضافة للتقويم</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Completed Exams & Reports Table (سجل الاختبارات المكتملة وتقارير التحليل) -->
      <section class="exam-section-block mb-8" id="secCompletedExams">
        <div class="exam-table-header-bar mb-4">
          <h3 class="exam-section-title">
            <span class="sec-icon text-emerald-400">✔️</span>
            <span>سجل الاختبارات المكتملة وتقارير التحليل</span>
          </h3>
          <div class="exam-gpa-stat">
            <span>متوسط الإنجاز العام:</span>
            <strong class="gpa-score">96 / 100</strong>
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
              <!-- Row 1 -->
              <tr>
                <td>
                  <div class="table-exam-identity">
                    <strong class="table-exam-name">كويز 1: المتغيرات وأنواع البيانات الأساسية</strong>
                    <span class="table-exam-subcode">15 QZ-PY-01 سؤالاً</span>
                  </div>
                </td>
                <td class="text-slate-300">
                  <div>24 سبتمبر</div>
                  <small class="text-slate-500">2026</small>
                </td>
                <td class="text-slate-300">
                  <span>18 دقيقة</span>
                  <small class="text-slate-500">من 30 د</small>
                </td>
                <td>
                  <div class="table-score-box">
                    <strong class="score-val text-emerald-400">98</strong>
                    <span class="score-denom">/ 100</span>
                  </div>
                </td>
                <td>
                  <span class="table-badge-pill pill-emerald">امتياز معتمد ✔️</span>
                </td>
                <td>
                  <button type="button" class="btn-table-action" data-review-quiz="QZ-PY-01">
                    <span>👁️</span>
                    <span>استعراض الإجابات وملاحظات المصحح</span>
                  </button>
                </td>
              </tr>

              <!-- Row 2 -->
              <tr>
                <td>
                  <div class="table-exam-identity">
                    <strong class="table-exam-name">كويز 2: الجمل الشرطية والتحكم في التدفق (Conditionals)</strong>
                    <span class="table-exam-subcode">20 QZ-PY-02 سؤالاً</span>
                  </div>
                </td>
                <td class="text-slate-300">
                  <div>17 سبتمبر</div>
                  <small class="text-slate-500">2026</small>
                </td>
                <td class="text-slate-300">
                  <span>24 دقيقة</span>
                  <small class="text-slate-500">من 30 د</small>
                </td>
                <td>
                  <div class="table-score-box">
                    <strong class="score-val text-cyan-400">94</strong>
                    <span class="score-denom">/ 100</span>
                  </div>
                </td>
                <td>
                  <span class="table-badge-pill pill-cyan">ممتاز مرتفع</span>
                </td>
                <td>
                  <button type="button" class="btn-table-action" data-review-quiz="QZ-PY-02">
                    <span>👁️</span>
                    <span>استعراض الإجابات</span>
                  </button>
                </td>
              </tr>

              <!-- Row 3 -->
              <tr>
                <td>
                  <div class="table-exam-identity">
                    <strong class="table-exam-name">التحدي السريع للخوارزميات والمنطق البرمجي</strong>
                    <span class="table-exam-subcode">SPD-ALG-01 • اختبار كود عملي</span>
                  </div>
                </td>
                <td class="text-slate-300">
                  <div>10 سبتمبر</div>
                  <small class="text-slate-500">2026</small>
                </td>
                <td class="text-slate-300">
                  <span>35 دقيقة</span>
                  <small class="text-slate-500">من 40 د</small>
                </td>
                <td>
                  <div class="table-score-box">
                    <strong class="score-val text-emerald-400">96</strong>
                    <span class="score-denom">/ 100</span>
                  </div>
                </td>
                <td>
                  <span class="table-badge-pill pill-emerald-honor">امتياز مع مرتبة الشرف</span>
                </td>
                <td>
                  <button type="button" class="btn-table-action" data-download-certificate="SPD-ALG-01">
                    <span>🎖️</span>
                    <span>تحميل الشهادة المصغرة</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 7. Bottom System Integrity Check Card (جاهزية منصة المراقبة والتحقق الفني) -->
      <div class="system-integrity-banner-card">
        <div class="integrity-main-row">
          <div class="integrity-brand-info">
            <div class="integrity-icon-wrap">
              <span class="integrity-icon">🛡️</span>
            </div>
            <div>
              <h4 class="integrity-heading">جاهزية منصة المراقبة والتحقق الفني (System Integrity Check)</h4>
              <p class="integrity-desc">جميع المتطلبات مستوفاة لاجتياز الاختبارات المعزولة دون عوائق برمجية.</p>
            </div>
          </div>

          <div class="integrity-status-pill">
            <span class="status-pulse-dot"></span>
            <span>SYSTEM READY FOR EXECUTION</span>
          </div>
        </div>

        <div class="integrity-chips-grid">
          <div class="integrity-chip">
            <span class="chip-icon">📹</span>
            <span>الكاميرا الرقمية</span>
            <span class="chip-status text-emerald-400">متصلة ومصرح بها ✔️</span>
          </div>

          <div class="integrity-chip">
            <span class="chip-icon">📶</span>
            <span>سرعة الاتصال</span>
            <span class="chip-status text-emerald-400">48 Mbps (مستقرة) ✔️</span>
          </div>

          <div class="integrity-chip">
            <span class="chip-icon">🛡️</span>
            <span>المتصفح الآمن</span>
            <span class="chip-status text-cyan-400">Chrome Sandbox ✔️</span>
          </div>

          <div class="integrity-chip">
            <span class="chip-icon">💻</span>
            <span>محرك بايثون</span>
            <span class="chip-status text-cyan-400">Python 3.12.3 OK ✔️</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

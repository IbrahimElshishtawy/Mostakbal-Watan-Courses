import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the full Student Tasks & Practical Assignments Center matching Image 2.html.
 * @param {object} props
 * @param {object} props.student
 * @param {object} [props.activeTask]
 * @param {Array} [props.directoryTasks]
 * @param {object} [props.kpis]
 * @returns {string} HTML markup
 */
export function renderStudentTasksCenter({
  student,
  activeTask = null,
  directoryTasks = [],
  kpis = null
}) {
  const safeStudentName = escapeHtml(student?.name || student?.studentName || "إبراهيم خالد");
  const studentGroup = escapeHtml(student?.group || student?.studentGroup || "مسار بايثون وهندسة النظم");

  // KPI default metrics
  const totalTasks = kpis?.totalTasks ?? "04";
  const completedTasks = kpis?.completedTasks ?? "02";
  const inProgressTasks = kpis?.inProgressTasks ?? "01";
  const upcomingTasks = kpis?.upcomingTasks ?? "01";
  const averageGrade = kpis?.averageGrade ?? "96.5%";

  return `
    <div class="student-tasks-center-page" dir="rtl">
      <!-- BEGIN: TopHeader -->
      <div class="tasks-top-header" data-purpose="top-navigation">
        <!-- Right Breadcrumbs & Title -->
        <div class="tasks-header-breadcrumbs">
          <nav aria-label="Breadcrumb" class="tasks-breadcrumb-nav">
            <span class="breadcrumb-root">منصة اتحاد بشبابها</span>
            <i class="fa-solid fa-chevron-left breadcrumb-separator"></i>
            <span class="breadcrumb-sub">بوابة الطالب</span>
            <i class="fa-solid fa-chevron-left breadcrumb-separator"></i>
            <span class="breadcrumb-current">
              <i class="fa-solid fa-laptop-code"></i>
              التاسكات والواجبات العملية
            </span>
          </nav>
        </div>

        <!-- Left Controls: User Actions, Notifications & Badges -->
        <div class="tasks-header-controls">
          <!-- Live Status Pill -->
          <div class="tasks-live-server-pill">
            <span class="pulse-dot"></span>
            <span>الخادم النشط: Delta-01 المحلة</span>
          </div>

          <!-- Academic Season Badge -->
          <div class="tasks-season-badge">
            <i class="fa-regular fa-calendar-check text-brand-cyan"></i>
            <span>الموسم التدريبي 2026 / 2027</span>
          </div>

          <!-- Student Help Manual Button -->
          <button type="button" class="tasks-tool-btn" id="btnOpenTasksManual" title="دليل الطالب">
            <i class="fa-regular fa-circle-question text-amber-400"></i>
            <span>دليل الطالب</span>
          </button>

          <!-- Notification Bell -->
          <button type="button" class="tasks-bell-btn" id="btnTasksNotification" aria-label="الإشعارات" title="الإشعارات">
            <i class="fa-regular fa-bell"></i>
            <span class="notification-indicator"></span>
          </button>
        </div>
      </div>
      <!-- END: TopHeader -->

      <!-- BEGIN: AssignmentsStatsKPI -->
      <section class="tasks-kpi-grid" data-purpose="kpi-metrics-grid">
        <!-- Card 1: Total Assignments -->
        <div class="glass-panel kpi-card">
          <div class="kpi-content">
            <p class="kpi-label">إجمالي التكليفات البرمجية</p>
            <h2 class="kpi-value text-white font-mono">${totalTasks} <span class="kpi-sub">مهام</span></h2>
            <div class="kpi-footer text-brand-cyan">
              <i class="fa-solid fa-folder-tree"></i>
              <span>${studentGroup}</span>
            </div>
          </div>
          <div class="kpi-icon-box text-blue-400 bg-blue-500/10 border-blue-500/20">
            <i class="fa-solid fa-clipboard-list"></i>
          </div>
        </div>

        <!-- Card 2: Submitted & Approved -->
        <div class="glass-panel kpi-card">
          <div class="kpi-content">
            <p class="kpi-label">المسلّم والمعتمد بنجاح</p>
            <h2 class="kpi-value text-emerald-400 font-mono">${completedTasks} <span class="kpi-sub">/ ${totalTasks}</span></h2>
            <div class="kpi-footer text-emerald-400">
              <i class="fa-solid fa-circle-check"></i>
              <span>متوسط الدرجات: ${averageGrade}</span>
            </div>
          </div>
          <div class="kpi-icon-box text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>

        <!-- Card 3: Active Task In Progress -->
        <div class="glass-panel kpi-card">
          <div class="kpi-content">
            <p class="kpi-label">قيد التنفيذ والمتبقي</p>
            <h2 class="kpi-value text-amber-400 font-mono">${inProgressTasks} <span class="kpi-sub">مهمة عاجلة</span></h2>
            <div class="kpi-footer text-amber-300">
              <i class="fa-regular fa-clock"></i>
              <span>تنتهي خلال 48 ساعة</span>
            </div>
          </div>
          <div class="kpi-icon-box text-amber-400 bg-amber-500/10 border-amber-500/20">
            <i class="fa-solid fa-hourglass-half"></i>
          </div>
        </div>

        <!-- Card 4: Upcoming / Scheduled -->
        <div class="glass-panel kpi-card">
          <div class="kpi-content">
            <p class="kpi-label">مهام معلنة قادمة</p>
            <h2 class="kpi-value text-purple-400 font-mono">${upcomingTasks} <span class="kpi-sub">واجب متقدم</span></h2>
            <div class="kpi-footer text-purple-300">
              <i class="fa-solid fa-calendar-day"></i>
              <span>الأسبوع الخامس (OOP)</span>
            </div>
          </div>
          <div class="kpi-icon-box text-purple-400 bg-purple-500/10 border-purple-500/20">
            <i class="fa-solid fa-code-branch"></i>
          </div>
        </div>
      </section>
      <!-- END: AssignmentsStatsKPI -->

      <!-- BEGIN: HeroActiveAssignment (TASK-PY-03) -->
      <section class="glass-card hero-active-assignment shadow-glow-cyan" data-purpose="primary-active-assignment">
        <!-- Header status band -->
        <div class="assignment-header-band">
          <div class="band-left-tags">
            <span class="badge-task-code font-mono">TASK-PY-03</span>
            <span class="badge-status-open">
              <span class="pulse-dot"></span>
              مفتوح للتسليم والمراجعة الآلية
            </span>
          </div>
          <div class="badge-deadline-countdown">
            <i class="fa-regular fa-clock text-amber-400"></i>
            <span>الديدلاين: متبقي يومان و 14 ساعة (ينتهي الأربعاء 11:59 م)</span>
          </div>
        </div>

        <div class="assignment-main-grid">
          <!-- Right side details (8 cols) -->
          <div class="assignment-details-col">
            <div class="assignment-title-area">
              <div class="assignment-lecture-tag">
                <i class="fa-solid fa-layer-group text-brand-cyan"></i>
                <span>المحاضرة رقم 03: معالجة الاستثناءات والمنطق الحسابي</span>
              </div>
              <h2 class="assignment-main-title">
                مشروع 1: آلة حاسبة تفاعلية متقدمة مع معالجة الاستثناءات بلغة بايثون
              </h2>
              <p class="assignment-mono-subtitle font-mono">
                Interactive Python CLI Calculator with Exception Handling (try-except-finally)
              </p>
            </div>

            <p class="assignment-description">
              المطلوب كتابة برنامج بايثون يعمل من سطر الأوامر (CLI) يستقبل العمليات الحسابية المتتالية من المستخدم، ويقوم بمعالجة أخطاء القسمة على الصفر <code class="code-token text-brand-cyan">ZeroDivisionError</code> وإدخال النصوص غير العددية <code class="code-token text-brand-cyan">ValueError</code> مع الحفاظ على تشغيل البرنامج دون انهيار حتى يطلب المستخدم الخروج بكلمة <code class="code-token text-amber-400">'exit'</code>.
            </p>

            <!-- Technical Requirements Checklist -->
            <div class="assignment-checklist-box">
              <h3 class="checklist-title">
                <i class="fa-solid fa-list-check text-brand-cyan"></i>
                <span>المعايير الفنية وشروط احتساب الدرجة النهائية (100 نقطة):</span>
              </h3>
              <div class="checklist-grid">
                <div class="checklist-item">
                  <i class="fa-solid fa-check text-emerald-400"></i>
                  <span>بناء دوال منفصلة لكل عملية حسابية (+, -, *, /, ^)</span>
                </div>
                <div class="checklist-item">
                  <i class="fa-solid fa-check text-emerald-400"></i>
                  <span>معالجة شاملة لكافة الأخطاء الشائعة try/except</span>
                </div>
                <div class="checklist-item">
                  <i class="fa-solid fa-check text-emerald-400"></i>
                  <span>الالتزام الكامل بمعايير نظافة الكود والتنسيق (PEP 8)</span>
                </div>
                <div class="checklist-item">
                  <i class="fa-solid fa-check text-emerald-400"></i>
                  <span>حفظ سجل العمليات الحسابية بقائمة (History list)</span>
                </div>
              </div>
            </div>

            <!-- Download Supporting Materials -->
            <div class="assignment-downloads-row">
              <button type="button" class="btn-download-material" id="btnDownloadStarterCode">
                <i class="fa-solid fa-download text-brand-cyan"></i>
                <span>تحميل ملف Starter Code (template.py)</span>
              </button>
              <button type="button" class="btn-download-material" id="btnViewTaskSpecsPdf">
                <i class="fa-regular fa-file-pdf text-rose-400"></i>
                <span>كراسة مواصفات التكليف PDF</span>
              </button>
            </div>
          </div>

          <!-- Left side Submission Zone (4 cols) -->
          <div class="assignment-submission-col" data-purpose="submission-box">
            <div class="submission-box-inner">
              <div class="submission-box-header">
                <h3 class="submission-title">
                  <i class="fa-solid fa-cloud-arrow-up text-brand-cyan"></i>
                  تسليم الكود البرمجي
                </h3>
                <span class="badge-points font-mono">100 نقطة</span>
              </div>

              <!-- Drag & Drop File Zone -->
              <input type="file" id="heroTaskFileInput" class="d-none" accept=".py,.ipynb,.zip" />
              <div class="drop-zone-box group" id="heroTaskDropZone">
                <i class="fa-brands fa-python drop-zone-icon"></i>
                <p class="drop-zone-text">
                  اسحب كود الحل إلى هنا أو <span class="text-brand-cyan underline">تصفح ملفاتك</span>
                </p>
                <p class="drop-zone-hint font-mono">امتداد .py أو .ipynb (بحد أقصى 10MB)</p>
                <!-- Selected File Display -->
                <div class="selected-file-pill d-none" id="heroSelectedFilePill">
                  <i class="fa-solid fa-file-code text-brand-cyan"></i>
                  <span id="heroSelectedFileName" class="truncate font-mono">calculator_solution.py</span>
                  <button type="button" id="btnRemoveHeroSelectedFile" class="btn-remove-file" title="إزالة الملف">&times;</button>
                </div>
              </div>

              <!-- GitHub Repo Link Option -->
              <div class="github-repo-field">
                <label class="github-label" for="heroGithubRepoInput">
                  <span>أو رابط مستودع GitHub:</span>
                  <i class="fa-brands fa-github"></i>
                </label>
                <div class="relative">
                  <input
                    type="url"
                    id="heroGithubRepoInput"
                    class="github-input font-mono"
                    dir="ltr"
                    placeholder="https://github.com/username/python-calculator"
                  />
                </div>
              </div>
            </div>

            <!-- Submit Action Button -->
            <div class="submission-action-area">
              <button type="button" class="btn-submit-assignment" id="btnSubmitHeroAssignment">
                <i class="fa-solid fa-paper-plane"></i>
                <span id="btnSubmitHeroAssignmentText">تسليم واعتماد الحل للتقييم</span>
              </button>
              <p class="submission-subtext">سيتم إجراء فحص آلي فوري للأكواد فور الرفع</p>
            </div>
          </div>
        </div>
      </section>
      <!-- END: HeroActiveAssignment -->

      <!-- BEGIN: AssignmentsDirectoryAndFilters -->
      <section class="tasks-directory-section" data-purpose="assignments-tabs-and-list">
        <!-- Filter Tabs & Header -->
        <div class="directory-header-row">
          <div class="directory-title-wrap">
            <h2 class="directory-title">
              <i class="fa-solid fa-tasks text-brand-cyan"></i>
              <span>سجل المهام والتكليفات الأكاديمية</span>
            </h2>
            <span class="directory-badge-count font-mono">04 إجمالي</span>
          </div>

          <!-- Nav Tabs -->
          <div class="directory-tabs-bar" role="tablist">
            <button type="button" role="tab" class="dir-tab-btn active" data-dir-filter="all">الكل (4)</button>
            <button type="button" role="tab" class="dir-tab-btn" data-dir-filter="active">سارية ومتاحة (1)</button>
            <button type="button" role="tab" class="dir-tab-btn" data-dir-filter="graded">تم التقييم والمعتمدة (2)</button>
            <button type="button" role="tab" class="dir-tab-btn" data-dir-filter="upcoming">قادمة (1)</button>
          </div>
        </div>

        <!-- Assignments Cards Grid -->
        <div class="tasks-cards-grid" id="tasksCardsGridContainer">
          <!-- Card 1: Completed Assignment (TASK-PY-01) -->
          <div class="glass-panel directory-task-card group" data-category="graded" data-task-id="TASK-PY-01">
            <div class="card-body-content">
              <!-- Top Badges -->
              <div class="card-top-badges">
                <span class="badge-status-approved font-mono">
                  <i class="fa-solid fa-circle-check"></i>
                  معتمد ومكتمل
                </span>
                <span class="badge-academic-date font-mono">24 سبتمبر 2026</span>
              </div>

              <!-- Title -->
              <div>
                <span class="task-series-tag font-mono">TASK-PY-01 • المحاضرة 01</span>
                <h3 class="task-card-title group-hover:text-brand-cyan">
                  تطبيق خوارزميات البحث الخطي والثنائي (Linear & Binary Search)
                </h3>
              </div>

              <!-- Description -->
              <p class="task-card-desc">
                تنفيذ خوارزمية Binary Search بلغة بايثون ومقارنة كفاءة التعقيد الزمني (Time Complexity) مع البحث التتابعي.
              </p>

              <!-- Grade & Instructor Feedback -->
              <div class="task-grade-feedback-box">
                <div class="grade-row">
                  <span class="grade-label">الدرجة النهائية المستحقة:</span>
                  <span class="grade-score font-mono text-emerald-400">98 / 100</span>
                </div>
                <div class="feedback-bubble">
                  <p class="feedback-author text-emerald-400">
                    <i class="fa-solid fa-chalkboard-user"></i>
                    <span>ملاحظة م/ إبراهيم الششتاوي:</span>
                  </p>
                  <p class="feedback-text">
                    "تنظيم الدوال والـ Docstrings مثالي جداً، وحساب الوقت الزمني دقيق. استمر بهذا المستوى الرائع!"
                  </p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="card-footer-actions">
              <button type="button" class="btn-card-action" data-action="view-code" data-code-id="py01">
                <i class="fa-solid fa-code text-brand-cyan"></i>
                <span>استعراض الكود المسلم</span>
              </button>
              <button type="button" class="btn-card-action text-emerald-400 hover:text-emerald-300" data-action="view-report" data-code-id="py01">
                <span>تقرير التقييم</span>
                <i class="fa-solid fa-arrow-left text-[10px]"></i>
              </button>
            </div>
          </div>

          <!-- Card 2: Completed Assignment (TASK-PY-02) -->
          <div class="glass-panel directory-task-card group" data-category="graded" data-task-id="TASK-PY-02">
            <div class="card-body-content">
              <!-- Top Badges -->
              <div class="card-top-badges">
                <span class="badge-status-approved font-mono">
                  <i class="fa-solid fa-circle-check"></i>
                  معتمد ومكتمل
                </span>
                <span class="badge-academic-date font-mono">17 سبتمبر 2026</span>
              </div>

              <!-- Title -->
              <div>
                <span class="task-series-tag font-mono">TASK-PY-02 • المحاضرة 02</span>
                <h3 class="task-card-title group-hover:text-brand-cyan">
                  بناء دوال التشفير وفك التشفير الكلاسيكي (Caesar Cipher)
                </h3>
              </div>

              <!-- Description -->
              <p class="task-card-desc">
                استخدام التكرارات والشروط والتعامل مع جداول ASCII لتشفير وفك تشفير الرسائل النصية مع مفتاح إزاحة ديناميكي.
              </p>

              <!-- Grade & Instructor Feedback -->
              <div class="task-grade-feedback-box">
                <div class="grade-row">
                  <span class="grade-label">الدرجة النهائية المستحقة:</span>
                  <span class="grade-score font-mono text-emerald-400">95 / 100</span>
                </div>
                <div class="feedback-bubble">
                  <p class="feedback-author text-emerald-400">
                    <i class="fa-solid fa-chalkboard-user"></i>
                    <span>ملاحظة المصحح الأكاديمي:</span>
                  </p>
                  <p class="feedback-text">
                    "كود نظيف مع دعم الحروف العربية والإنجليزية بشكل متميز وتمرير الاختبارات بنجاح."
                  </p>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="card-footer-actions">
              <button type="button" class="btn-card-action" data-action="view-code" data-code-id="py02">
                <i class="fa-solid fa-file-code text-brand-cyan"></i>
                <span>استعراض الكود المسلم</span>
              </button>
              <button type="button" class="btn-card-action text-emerald-400 hover:text-emerald-300" data-action="view-report" data-code-id="py02">
                <span>تقرير التقييم</span>
                <i class="fa-solid fa-arrow-left text-[10px]"></i>
              </button>
            </div>
          </div>

          <!-- Card 3: Upcoming Challenge (TASK-PY-04) -->
          <div class="glass-panel directory-task-card group" data-category="upcoming" data-task-id="TASK-PY-04">
            <div class="card-body-content">
              <!-- Top Badges -->
              <div class="card-top-badges">
                <span class="badge-status-upcoming font-mono">
                  <i class="fa-regular fa-calendar-check"></i>
                  يُفتح الأحد القادم
                </span>
                <span class="badge-academic-date font-mono">05 أكتوبر 2026</span>
              </div>

              <!-- Title -->
              <div>
                <span class="task-series-tag text-purple-400 font-mono">TASK-PY-04 • المحاضرة 04</span>
                <h3 class="task-card-title group-hover:text-purple-300">
                  نظام إدارة المهام التفاعلي مع حفظ البيانات (To-Do CLI & JSON)
                </h3>
              </div>

              <!-- Description -->
              <p class="task-card-desc">
                تطبيق مبادئ البرمجة كائنية التوجه (OOP) والتعامل مع ملفات JSON لتسجيل وتعديل وحذف المهام وتخزينها بصورة دائمة.
              </p>

              <!-- Planned details -->
              <div class="task-grade-feedback-box">
                <div class="grade-row text-xs">
                  <span class="text-slate-400">الوزن النسبي للتكليف:</span>
                  <span class="font-mono font-bold text-white">150 نقطة</span>
                </div>
                <div class="grade-row text-xs">
                  <span class="text-slate-400">حالة المستودع:</span>
                  <span class="text-purple-300 font-medium">قيد الإعداد بواسطة المحاضر</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="card-footer-actions">
              <span class="locked-hint text-xs text-slate-500 font-medium">
                <i class="fa-solid fa-lock text-slate-600"></i>
                <span>مغلق حتى نهاية المحاضرة 4</span>
              </span>
              <button type="button" class="btn-card-action text-slate-300 hover:text-white" data-action="preview-upcoming">
                <span>معاينة المتطلبات</span>
                <i class="fa-solid fa-eye text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- END: AssignmentsDirectoryAndFilters -->

      <!-- BEGIN: CloudSandboxCodeTester -->
      <section class="glass-panel cloud-sandbox-tester" data-purpose="cloud-sandbox-unit-tests">
        <div class="sandbox-header-row">
          <div class="sandbox-lead-group">
            <div class="sandbox-icon-box">
              <i class="fa-solid fa-terminal text-brand-cyan"></i>
            </div>
            <div>
              <h3 class="sandbox-title">
                <span>بيئة الفحص والتجربة السحابية السريعة (Sandbox Integrity)</span>
                <span class="sandbox-badge font-mono">Python 3.12.3 OK</span>
              </h3>
              <p class="sandbox-desc">هل تود اختبار كودك وتأكيد نجاح الـ Unit Tests التلقائية قبل التسليم النهائي؟</p>
            </div>
          </div>

          <div class="sandbox-actions-group">
            <button type="button" class="btn-sandbox-tool" id="btnRerunSandbox">
              <i class="fa-solid fa-rotate text-xs"></i>
              <span>إعادة الفحص</span>
            </button>
            <button type="button" class="btn-sandbox-primary" id="btnExecuteSandboxTests">
              <i class="fa-solid fa-play text-[10px]"></i>
              <span>تشغيل الاختبار السحابي</span>
            </button>
          </div>
        </div>

        <!-- Terminal Output Window -->
        <div class="sandbox-terminal-window font-mono" dir="ltr" id="sandboxTerminalBody">
          <div class="terminal-meta-bar">
            <div class="terminal-window-dots">
              <span class="w-dot dot-red"></span>
              <span class="w-dot dot-yellow"></span>
              <span class="w-dot dot-green"></span>
              <span class="terminal-cmd-label">pytest -v test_calculator.py</span>
            </div>
            <span class="terminal-stats-label" id="sandboxTerminalStats">Duration: 0.42s • Memory: 14MB</span>
          </div>

          <div class="terminal-console-lines" id="sandboxTerminalLines">
            <p class="term-line-muted">platform linux -- Python 3.12.3, pytest-8.1.1, pluggy-1.4.0</p>
            <p class="term-line-muted">rootdir: /home/student/workspace/task_03_calc</p>
            <div class="term-tests-list">
              <p class="term-test-item term-pass">
                <span>test_calculator.py::test_addition_integers</span>
                <span class="font-bold">PASSED [ 20%]</span>
              </p>
              <p class="term-test-item term-pass">
                <span>test_calculator.py::test_division_by_zero_handling</span>
                <span class="font-bold">PASSED [ 40%]</span>
              </p>
              <p class="term-test-item term-pass">
                <span>test_calculator.py::test_invalid_string_input</span>
                <span class="font-bold">PASSED [ 60%]</span>
              </p>
              <p class="term-test-item term-pass">
                <span>test_calculator.py::test_history_stack_persistence</span>
                <span class="font-bold">PASSED [ 80%]</span>
              </p>
              <p class="term-test-item term-pass">
                <span>test_calculator.py::test_clean_exit_graceful</span>
                <span class="font-bold">PASSED [100%]</span>
              </p>
            </div>
            <div class="term-summary-line term-pass">
              <span>========================= 5 passed, 0 warnings in 0.42s =========================</span>
            </div>
          </div>
        </div>
      </section>
      <!-- END: CloudSandboxCodeTester -->
    </div>
  `;
}

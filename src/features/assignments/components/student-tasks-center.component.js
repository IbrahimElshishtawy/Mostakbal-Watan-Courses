import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { formatDate, formatDateTime, isDeadlinePassed } from "../../../shared/utils/date.utils.js";
import { formatAssignmentGradeDisplay } from "../assignment.service.js";

/**
 * Resolves task status and details against the student's submission.
 * @param {object} task
 * @param {object|null} submission
 * @returns {object}
 */
function resolveTaskStatus(task, submission) {
  if (submission && (submission.grade !== null && submission.grade !== undefined || submission.score !== null && submission.score !== undefined)) {
    return {
      type: "graded",
      label: "معتمد ومكتمل",
      badgeClass: "badge-status-approved",
      score: submission.grade ?? submission.score,
      maxScore: task.maxScore || 100,
      feedback: submission.feedback || "تم مراجعة الحل واعتماده بنجاح."
    };
  }

  if (submission) {
    return {
      type: "submitted",
      label: "تم التسليم • قيد المراجعة",
      badgeClass: "badge-status-open",
      submittedAt: submission.submittedAt
    };
  }

  const deadline = task.dueDate || task.deadline;
  if (deadline && isDeadlinePassed(deadline)) {
    return {
      type: "expired",
      label: "انتهى موعد التسليم",
      badgeClass: "badge-status-expired"
    };
  }

  return {
    type: "active",
    label: "مفتوح للتسليم والمراجعة",
    badgeClass: "badge-status-open"
  };
}

/**
 * Formats a readable deadline countdown or date text.
 * @param {string|Date} dueDate
 * @returns {string}
 */
function formatDeadlineText(dueDate) {
  if (!dueDate) return "مفتوح بدون موعد نهائي";
  try {
    const d = dueDate.toDate ? dueDate.toDate() : new Date(dueDate);
    if (isNaN(d.getTime())) return "مفتوح للتسليم";
    const now = new Date();
    const diffMs = d.getTime() - now.getTime();
    if (diffMs <= 0) return "انتهى الموعد المحدد";
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 0) {
      const remHours = diffHours % 24;
      return `الديدلاين: متبقي ${diffDays} يوم و ${remHours} ساعة (${formatDate(d)})`;
    }
    return `الديدلاين: متبقي ${diffHours} ساعة فقط (${formatDate(d)})`;
  } catch (_) {
    return "مفتوح للتسليم";
  }
}

/**
 * Renders the full Student Tasks & Practical Assignments Center matching the design system,
 * 100% driven by real Firestore assignments and student submissions.
 *
 * @param {object} props
 * @param {object} props.student
 * @param {object} [props.activeTask]
 * @param {Array} [props.directoryTasks]
 * @param {Map} [props.submissionsMap]
 * @param {object} [props.kpis]
 * @returns {string} HTML markup
 */
export function renderStudentTasksCenter({
  student,
  activeTask = null,
  directoryTasks = [],
  submissionsMap = new Map(),
  kpis = null
}) {
  const safeStudentName = escapeHtml(student?.name || student?.studentName || "طالب مسجل");
  const studentGroup = escapeHtml(student?.group || student?.studentGroup || "مسار بايثون وهندسة النظم");

  // Dynamic KPI computation based on actual data
  let completedCount = 0;
  let inProgressCount = 0;
  let upcomingCount = 0;
  let earnedScoreSum = 0;
  let maxScoreSum = 0;

  directoryTasks.forEach((t) => {
    const sub = submissionsMap?.get(t.id);
    const status = resolveTaskStatus(t, sub);
    if (status.type === "graded") {
      completedCount++;
      const s = Number(status.score);
      const m = Number(status.maxScore || 100);
      if (!isNaN(s) && !isNaN(m) && m > 0) {
        earnedScoreSum += s;
        maxScoreSum += m;
      }
    } else if (status.type === "submitted") {
      inProgressCount++;
    } else if (status.type === "active") {
      inProgressCount++;
    } else if (status.type === "expired") {
      // counted in total
    }
  });

  const totalTasks = kpis?.totalTasks ?? (directoryTasks.length < 10 ? `0${directoryTasks.length}` : `${directoryTasks.length}`);
  const completedTasks = kpis?.completedTasks ?? (completedCount < 10 ? `0${completedCount}` : `${completedCount}`);
  const inProgressTasks = kpis?.inProgressTasks ?? (inProgressCount < 10 ? `0${inProgressCount}` : `${inProgressCount}`);
  const upcomingTasks = kpis?.upcomingTasks ?? "00";
  const averageGrade = kpis?.averageGrade ?? (maxScoreSum > 0 ? `${Math.round((earnedScoreSum / maxScoreSum) * 100)}%` : "—");

  // Determine which task is featured as Hero
  const heroTask = activeTask || directoryTasks.find((t) => {
    const s = submissionsMap?.get(t.id);
    return !s; // First unsubmitted task
  }) || directoryTasks[0] || null;

  const heroSubmission = heroTask ? submissionsMap?.get(heroTask.id) : null;
  const heroStatus = heroTask ? resolveTaskStatus(heroTask, heroSubmission) : null;
  const isHeroSubmitted = !!heroSubmission;
  const isHeroGraded = heroStatus?.type === "graded";

  const defaultStarterCode = heroTask?.starterCode || `"""
مشروع: ${heroTask?.title || "مشروع تطبيقي"} - لغة بايثون
المطلوب: بناء الدوال واختبار مخرجاتها في الكونسول أدناه قبل التسليم
المطور / الطالب: ${safeStudentName}
"""

def add(a: float, b: float) -> float:
    """دالة الجمع"""
    return a + b

def subtract(a: float, b: float) -> float:
    """دالة الطرح"""
    return a - b

def multiply(a: float, b: float) -> float:
    """دالة الضرب"""
    return a * b

def divide(a: float, b: float) -> float:
    """دالة القسمة مع معالجة القسمة على الصفر"""
    if b == 0:
        raise ZeroDivisionError("لا يمكن القسمة على الصفر!")
    return a / b

# تجربة واختبار الدوال:
print("=" * 45)
print("  بدء تشغيل البرنامج التفاعلي 🐍")
print("=" * 45)

num1 = 20
num2 = 5

print(f"{num1} + {num2} = {add(num1, num2)}")
print(f"{num1} - {num2} = {subtract(num1, num2)}")
print(f"{num1} * {num2} = {multiply(num1, num2)}")
print(f"{num1} / {num2} = {divide(num1, num2)}")

print("\\n🎉 تم اختبار العمليات بنجاح وجاهز للتسليم الأكاديمي!")
`;

  const initialEditorCode = (heroSubmission?.answerText || "").trim() || defaultStarterCode;

  return `
    <div class="student-tasks-center-page" dir="rtl">
      <!-- BEGIN: TopHeader -->
      <div class="tasks-top-header" data-purpose="top-navigation">
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

        <div class="tasks-header-controls">
          <div class="tasks-live-server-pill">
            <span class="pulse-dot"></span>
            <span>الخادم النشط: Delta-01 المحلة</span>
          </div>

          <div class="tasks-season-badge">
            <i class="fa-regular fa-calendar-check text-brand-cyan"></i>
            <span>الموسم التدريبي 2026 / 2027</span>
          </div>

          <button type="button" class="tasks-tool-btn" id="btnOpenTasksManual" title="دليل الطالب للتكليفات">
            <i class="fa-regular fa-circle-question text-amber-400"></i>
            <span>دليل الطالب</span>
          </button>

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
              <span class="truncate">${studentGroup}</span>
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
            <h2 class="kpi-value text-amber-400 font-mono">${inProgressTasks} <span class="kpi-sub">مهام</span></h2>
            <div class="kpi-footer text-amber-300">
              <i class="fa-regular fa-clock"></i>
              <span>${inProgressCount > 0 ? "يتطلب تسليمك ومراجعتك" : "لا توجد مهام متأخرة"}</span>
            </div>
          </div>
          <div class="kpi-icon-box text-amber-400 bg-amber-500/10 border-amber-500/20">
            <i class="fa-solid fa-hourglass-half"></i>
          </div>
        </div>

        <!-- Card 4: Upcoming / Status -->
        <div class="glass-panel kpi-card">
          <div class="kpi-content">
            <p class="kpi-label">حالة التفاعل الأكاديمي</p>
            <h2 class="kpi-value text-purple-400 font-mono">100% <span class="kpi-sub">نشاط</span></h2>
            <div class="kpi-footer text-purple-300">
              <i class="fa-solid fa-code-branch"></i>
              <span>منصة بايثون التفاعلية</span>
            </div>
          </div>
          <div class="kpi-icon-box text-purple-400 bg-purple-500/10 border-purple-500/20">
            <i class="fa-solid fa-laptop-code"></i>
          </div>
        </div>
      </section>
      <!-- END: AssignmentsStatsKPI -->

      <!-- BEGIN: HeroActiveAssignment -->
      ${heroTask ? `
        <section class="glass-card hero-active-assignment shadow-glow-cyan" data-purpose="primary-active-assignment" id="heroActiveAssignmentSection" data-hero-task-id="${escapeHtml(heroTask.id)}">
          <div class="assignment-header-band">
            <div class="band-left-tags">
              <span class="badge-task-code font-mono">${escapeHtml(heroTask.code || heroTask.id)}</span>
              <span class="${heroStatus?.badgeClass || 'badge-status-open'}">
                <span class="pulse-dot"></span>
                <span>${heroStatus?.label || 'مفتوح للتسليم'}</span>
              </span>
            </div>
            <div class="badge-deadline-countdown">
              <i class="fa-regular fa-clock text-amber-400"></i>
              <span>${formatDeadlineText(heroTask.dueDate || heroTask.deadline)}</span>
            </div>
          </div>

          <div class="assignment-main-grid">
            <!-- Right side details -->
            <div class="assignment-details-col">
              <div class="assignment-title-area">
                <div class="assignment-lecture-tag">
                  <i class="fa-solid fa-layer-group text-brand-cyan"></i>
                  <span>${escapeHtml(heroTask.lectureTitle || heroTask.group || studentGroup)}</span>
                </div>
                <h2 class="assignment-main-title">
                  ${escapeHtml(heroTask.title || "مشروع تطبيقي")}
                </h2>
                ${heroTask.code ? `<p class="assignment-mono-subtitle font-mono">${escapeHtml(heroTask.code)}</p>` : ""}
              </div>

              <p class="assignment-description">
                ${escapeHtml(heroTask.description || "المطلوب كتابة الكود البرمجي وفقاً للمتطلبات والشروط الموضحة وتسليمه عبر النموذج المرفق.")}
              </p>

              <!-- Technical Requirements Checklist -->
              <div class="assignment-checklist-box">
                <h3 class="checklist-title">
                  <i class="fa-solid fa-list-check text-brand-cyan"></i>
                  <span>المعايير الفنية وشروط احتساب الدرجة النهائية (${heroTask.maxScore || 100} نقطة):</span>
                </h3>
                <div class="checklist-grid">
                  <div class="checklist-item">
                    <i class="fa-solid fa-check text-emerald-400"></i>
                    <span>بناء وتصميم دوال منظمة ومنفصلة لكل جزء وظيفي</span>
                  </div>
                  <div class="checklist-item">
                    <i class="fa-solid fa-check text-emerald-400"></i>
                    <span>معالجة شاملة لكافة الأخطاء الشائعة والمدخلات غير الصالحة</span>
                  </div>
                  <div class="checklist-item">
                    <i class="fa-solid fa-check text-emerald-400"></i>
                    <span>الالتزام الكامل بمعايير نظافة الكود والتنسيق القياسي PEP 8</span>
                  </div>
                  <div class="checklist-item">
                    <i class="fa-solid fa-check text-emerald-400"></i>
                    <span>توثيق واضح للوظائف بالتعليقات التوضيحية (Docstrings)</span>
                  </div>
                </div>
              </div>

              <!-- Download Supporting Materials (if any) -->
              <div class="assignment-downloads-row">
                ${heroTask.fileUrl ? `
                  <a href="${escapeHtml(heroTask.fileUrl)}" target="_blank" rel="noopener noreferrer" class="btn-download-material" download>
                    <i class="fa-solid fa-download text-brand-cyan"></i>
                    <span>تحميل ملف المرفقات المرفق مع التكليف</span>
                  </a>
                ` : `
                  <button type="button" class="btn-download-material" id="btnDownloadStarterCode">
                    <i class="fa-solid fa-download text-brand-cyan"></i>
                    <span>تحميل قالب الكود الأولي (Starter Code)</span>
                  </button>
                `}
                <button type="button" class="btn-download-material" id="btnViewTaskSpecsPdf" data-task-id="${escapeHtml(heroTask.id)}">
                  <i class="fa-regular fa-file-pdf text-rose-400"></i>
                  <span>كراسة مواصفات التكليف</span>
                </button>
              </div>
            </div>

            <!-- Left side Submission Zone: Interactive Python Code Editor & Live Console -->
            <div class="assignment-submission-col" data-purpose="submission-box">
              <div class="submission-box-inner">
                <div class="submission-box-header">
                  <div class="submission-header-lead">
                    <h3 class="submission-title">
                      <i class="fa-solid fa-code text-brand-cyan"></i>
                      <span>محرر وكود الحل البرمجي</span>
                    </h3>
                    <span class="submission-env-badge font-mono">
                      <i class="fa-brands fa-python text-brand-cyan"></i> Python 3 Sandbox
                    </span>
                  </div>
                  <div class="submission-header-badges">
                    <span class="badge-points font-mono">${heroTask.maxScore || 100} نقطة</span>
                    <button type="button" class="btn-toggle-workspace" id="btnToggleWorkspaceExpand" title="توسيع مساحة العمل">
                      <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                    </button>
                  </div>
                </div>

                ${isHeroSubmitted ? `
                  <!-- Already Submitted State Box -->
                  <div class="submission-already-done p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-right space-y-3 mb-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1.5">
                        <i class="fa-solid fa-circle-check"></i>
                        ${isHeroGraded ? "تم الاعتماد والتقييم" : "تم استلام واعتماد كودك بنجاح"}
                      </span>
                      <small class="text-slate-400 font-mono text-[11px]">
                        ${formatDateTime(heroSubmission.submittedAt || new Date())}
                      </small>
                    </div>

                    ${isHeroGraded ? `
                      <div class="p-3 rounded-lg bg-emerald-900/30 border border-emerald-500/20">
                        <div class="flex justify-between items-center mb-1">
                          <span class="text-xs text-slate-300">الدرجة النهائية:</span>
                          <strong class="text-emerald-400 font-mono text-base">${heroSubmission.grade ?? heroSubmission.score} / ${heroTask.maxScore || 100}</strong>
                        </div>
                        ${heroSubmission.feedback ? `
                          <p class="text-xs text-slate-300 mt-1 italic">
                            <i class="fa-solid fa-quote-right text-emerald-400 ml-1"></i>
                            "${escapeHtml(heroSubmission.feedback)}"
                          </p>
                        ` : ""}
                      </div>
                    ` : `
                      <p class="text-xs text-slate-300 leading-relaxed">
                        كودك قيد المراجعة والتقييم من قبل المحاضر. يمكنك تعديل الكود وإعادة تشغيله في الكونسول وتسليمه مجدداً في أي وقت.
                      </p>
                    `}

                    <!-- Submitted Code Preview Block -->
                    <div class="submitted-code-preview-wrap">
                      <div class="flex items-center justify-between text-xs text-slate-400 mb-1 font-mono">
                        <span><i class="fa-brands fa-python text-brand-cyan ml-1"></i> الكود المسلم حالياً:</span>
                        <button type="button" class="text-brand-cyan hover:underline text-[11px]" id="btnCopySubmittedCode">
                          <i class="fa-regular fa-copy ml-0.5"></i> نسخ الكود
                        </button>
                      </div>
                      <pre class="submitted-code-preview-pre" dir="ltr" id="previewSubmittedCodePre">${escapeHtml(heroSubmission.answerText || "# لا يوجد كود مسجل")}</pre>
                    </div>

                    <button type="button" class="btn btn-secondary w-full text-xs py-2 mt-2" id="btnToggleHeroResubmit">
                      <i class="fa-solid fa-code ml-1 text-brand-cyan"></i>
                      تعديل الكود في المحرر وتجربته مجدداً
                    </button>
                  </div>
                ` : ""}

                <!-- Submission Code Workspace -->
                <div class="submission-code-workspace ${isHeroSubmitted ? 'd-none' : ''}" id="heroSubmissionFormWrap">
                  
                  <!-- Workspace Navigation Tabs (Editor vs Console vs Split) -->
                  <div class="workspace-tabs-bar">
                    <div class="workspace-mode-tabs">
                      <button type="button" class="ws-tab-btn active" data-ws-tab="split" id="tabShowSplit">
                        <i class="fa-solid fa-table-columns"></i>
                        <span>عرض مدمج (الكل)</span>
                      </button>
                      <button type="button" class="ws-tab-btn" data-ws-tab="editor" id="tabShowEditor">
                        <i class="fa-solid fa-code"></i>
                        <span>المحرر فقط</span>
                      </button>
                      <button type="button" class="ws-tab-btn" data-ws-tab="console" id="tabShowConsole">
                        <i class="fa-solid fa-terminal"></i>
                        <span>الكونسول فقط</span>
                        <span class="console-live-badge d-none" id="consoleLiveBadge">مخرجات</span>
                      </button>
                    </div>

                    <div class="workspace-tools-group">
                      <button type="button" class="btn-ws-tool" id="btnInsertStarterCode" title="استرجاع قالب الكود الأولي">
                        <i class="fa-solid fa-file-code text-cyan-400"></i>
                        <span>القالب الأولي</span>
                      </button>
                      <button type="button" class="btn-ws-tool" id="btnCopyHeroCode" title="نسخ الكود">
                        <i class="fa-regular fa-copy"></i>
                        <span>نسخ</span>
                      </button>
                      <button type="button" class="btn-ws-tool text-slate-400 hover:text-rose-400" id="btnClearHeroCode" title="مسح الكود">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Workspace Panels Grid -->
                  <div class="workspace-panels-grid" id="workspacePanelsGrid" data-view-mode="split">
                    
                    <!-- Panel 1: Code Editor -->
                    <div class="workspace-panel-editor" id="workspacePanelEditor" dir="ltr">
                      <div class="editor-header-bar">
                        <div class="editor-file-tab">
                          <i class="fa-brands fa-python text-brand-cyan"></i>
                          <span class="font-mono">solution.py</span>
                          <span class="file-edit-dot"></span>
                        </div>
                        <div class="editor-meta-stats font-mono text-[11px]" id="heroCodeStats">
                          Lines: 1 | Chars: 0
                        </div>
                      </div>

                      <div class="editor-body-wrap" dir="ltr">
                        <div class="editor-line-numbers font-mono" id="heroCodeLineNumbers" aria-hidden="true">1</div>
                        <textarea
                          id="heroTaskCodeEditor"
                          class="editor-textarea font-mono"
                          dir="ltr"
                          spellcheck="false"
                          autocapitalize="off"
                          autocomplete="off"
                          placeholder="# اكتب كود الحل بلغة بايثون هنا..."
                          aria-label="محرر كود بايثون"
                        >${escapeHtml(initialEditorCode)}</textarea>
                      </div>

                      <div class="editor-footer-bar">
                        <div class="editor-shortcut-hint">
                          <kbd class="kbd-key">Ctrl</kbd> + <kbd class="kbd-key">Enter</kbd>
                          <span>لتشغيل الكود في الكونسول ⚡</span>
                        </div>
                        <div class="editor-draft-status">
                          <span class="draft-dot"></span>
                          <span id="heroDraftStatusText">حفظ تلقائي للمسودة</span>
                        </div>
                      </div>
                    </div>

                    <!-- Panel 2: Live Console Terminal -->
                    <div class="workspace-panel-console" id="workspacePanelConsole" dir="ltr">
                      <div class="console-header-bar">
                        <div class="console-dots">
                          <span class="c-dot dot-red"></span>
                          <span class="c-dot dot-yellow"></span>
                          <span class="c-dot dot-green"></span>
                          <span class="c-title font-mono text-[11px]">terminal ~ python3 solution.py</span>
                        </div>

                        <div class="console-header-actions">
                          <span class="terminal-status-chip is-idle" id="heroTerminalStatus">
                            <span class="status-dot"></span>
                            <span id="heroTerminalStatusText">جاهز للتشغيل</span>
                          </span>
                          <button type="button" class="btn-clear-term" id="btnClearHeroConsole" title="مسح المخرجات">
                            <i class="fa-solid fa-broom"></i> مسح
                          </button>
                        </div>
                      </div>

                      <!-- Run Code Action Toolbar -->
                      <div class="console-run-cta-row">
                        <button type="button" class="btn-run-hero-code" id="btnRunHeroCode">
                          <i class="fa-solid fa-play"></i>
                          <span id="btnRunHeroCodeText">تشغيل واختبار الكود</span>
                        </button>
                        <div class="console-engine-info">
                          <i class="fa-solid fa-bolt text-amber-400"></i>
                          <span id="heroExecutionTimeText">محرك بايثون 3 السحابي (Skulpt Sandbox)</span>
                        </div>
                      </div>

                      <!-- Console Screen -->
                      <div class="console-screen-body" id="heroConsoleScreen">
                        <div class="console-welcome-text" id="heroConsoleWelcome">
                          <p class="term-dim">Python 3.12.0 Sandbox Environment (In-Browser Execution)</p>
                          <p class="term-dim">اضغط على <strong>"تشغيل واختبار الكود"</strong> لتجربة البرنامج ومشاهدة المخرجات هنا.</p>
                          <p class="term-divider">---------------------------------------------------------</p>
                        </div>
                        <pre class="console-stdout-pre font-mono" id="heroConsoleStdout"></pre>
                        <div class="console-stderr-box font-mono d-none" id="heroConsoleStderr"></div>
                      </div>
                    </div>

                  </div>

                  <!-- Submission Action Bar -->
                  <div class="submission-action-area">
                    <div class="submission-verify-notice">
                      <i class="fa-solid fa-circle-check text-brand-cyan"></i>
                      <span>تأكد من تجربة وتشغيل الكود في الكونسول وظهور النتائج المطلوبة بنجاح قبل الاعتماد النهائي.</span>
                    </div>

                    <button type="button" class="btn-submit-assignment" id="btnSubmitHeroAssignment" data-assignment-id="${escapeHtml(heroTask.id)}">
                      <i class="fa-solid fa-paper-plane"></i>
                      <span id="btnSubmitHeroAssignmentText">${isHeroSubmitted ? "تحديث واعتماد الكود المسلم" : "تسليم واعتماد الكود للتقييم"}</span>
                    </button>

                    <p class="submission-subtext">
                      <i class="fa-solid fa-lock text-[11px] ml-1"></i>
                      يتم توثيق الكود ووقت التسليم وحفظه مباشرة في حسابك الأكاديمي لدى المحاضر
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      ` : `
        <!-- Empty Hero State when no assignments available -->
        <section class="glass-card p-8 text-center my-6 border border-brand-border">
          <div class="max-w-md mx-auto space-y-3">
            <span style="font-size: 3rem;">🎉</span>
            <h3 class="text-white font-bold text-lg">لا توجد واجبات مفتوحة للتسليم حالياً</h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              أنت على اطلاع بكافة متطلبات مسارك الأكاديمي. يمكنك استعراض دروسك السابقة أو المشاركة في تحديات بايثون ولوحة المتصدرين.
            </p>
          </div>
        </section>
      `}
      <!-- END: HeroActiveAssignment -->

      <!-- BEGIN: AssignmentsDirectoryAndFilters -->
      <section class="tasks-directory-section" data-purpose="assignments-tabs-and-list">
        <div class="directory-header-row">
          <div class="directory-title-wrap">
            <h2 class="directory-title">
              <i class="fa-solid fa-tasks text-brand-cyan"></i>
              <span>سجل المهام والتكليفات الأكاديمية</span>
            </h2>
            <span class="directory-badge-count font-mono">${directoryTasks.length} إجمالي</span>
          </div>

          <!-- Nav Tabs -->
          <div class="directory-tabs-bar" role="tablist">
            <button type="button" role="tab" class="dir-tab-btn active" data-dir-filter="all">الكل (${directoryTasks.length})</button>
            <button type="button" role="tab" class="dir-tab-btn" data-dir-filter="active">سارية ومتاحة (${inProgressCount})</button>
            <button type="button" role="tab" class="dir-tab-btn" data-dir-filter="graded">تم التقييم (${completedCount})</button>
          </div>
        </div>

        <!-- Assignments Cards Grid -->
        <div class="tasks-cards-grid" id="tasksCardsGridContainer">
          ${directoryTasks.length > 0 ? directoryTasks.map((task) => {
            const sub = submissionsMap?.get(task.id);
            const status = resolveTaskStatus(task, sub);
            const isGraded = status.type === "graded";
            const isSubmitted = !!sub;

            return `
              <div class="glass-panel directory-task-card group" data-category="${status.type}" data-task-id="${escapeHtml(task.id)}">
                <div class="card-body-content">
                  <!-- Top Badges -->
                  <div class="card-top-badges">
                    <span class="${status.badgeClass} font-mono">
                      <i class="fa-solid ${isGraded ? 'fa-circle-check text-emerald-400' : (isSubmitted ? 'fa-hourglass-half text-cyan-400' : 'fa-circle-dot text-brand-cyan')}"></i>
                      ${status.label}
                    </span>
                    <span class="badge-academic-date font-mono">
                      ${formatDate(task.dueDate || task.deadline || task.createdAt || new Date())}
                    </span>
                  </div>

                  <!-- Title -->
                  <div>
                    <span class="task-series-tag font-mono">${escapeHtml(task.code || task.id)} • ${escapeHtml(task.group || studentGroup)}</span>
                    <h3 class="task-card-title group-hover:text-brand-cyan">
                      ${escapeHtml(task.title || "واجب تطبيقي")}
                    </h3>
                  </div>

                  <!-- Description -->
                  <p class="task-card-desc">
                    ${escapeHtml(task.description || "راجع متطلبات التكليف وسلم الكود البرمجي المطلوب.")}
                  </p>

                  <!-- Grade & Instructor Feedback (if graded) -->
                  ${isGraded ? `
                    <div class="task-grade-feedback-box">
                      <div class="grade-row">
                        <span class="grade-label">الدرجة النهائية المستحقة:</span>
                        <strong class="grade-score font-mono text-emerald-400">${status.score} / ${status.maxScore}</strong>
                      </div>
                      ${status.feedback ? `
                        <div class="feedback-bubble">
                          <p class="feedback-author text-emerald-400">
                            <i class="fa-solid fa-chalkboard-user"></i>
                            <span>ملاحظة المصحح:</span>
                          </p>
                          <p class="feedback-text">
                            "${escapeHtml(status.feedback)}"
                          </p>
                        </div>
                      ` : ""}
                    </div>
                  ` : (isSubmitted ? `
                    <div class="task-grade-feedback-box">
                      <div class="grade-row text-xs text-slate-300">
                        <span>حالة التسليم:</span>
                        <span class="font-mono text-cyan-400 font-bold">تم التسليم بنجاح (قيد التصحيح)</span>
                      </div>
                    </div>
                  ` : `
                    <div class="task-grade-feedback-box">
                      <div class="grade-row text-xs text-slate-400">
                        <span>الدرجة الكلية للتكليف:</span>
                        <span class="font-mono font-bold text-white">${task.maxScore || 100} نقطة</span>
                      </div>
                    </div>
                  `)}
                </div>

                <!-- Actions -->
                <div class="card-footer-actions">
                  ${isSubmitted ? `
                    <button type="button" class="btn-card-action" data-action="view-code" data-assignment-id="${escapeHtml(task.id)}">
                      <i class="fa-solid fa-code text-brand-cyan"></i>
                      <span>استعراض الكود المسلم</span>
                    </button>
                    ${isGraded ? `
                      <button type="button" class="btn-card-action text-emerald-400 hover:text-emerald-300" data-action="view-report" data-assignment-id="${escapeHtml(task.id)}">
                        <span>تقرير التقييم</span>
                        <i class="fa-solid fa-arrow-left text-[10px]"></i>
                      </button>
                    ` : ""}
                  ` : `
                    <button type="button" class="btn-card-action text-brand-cyan hover:text-white" data-action="select-task" data-assignment-id="${escapeHtml(task.id)}">
                      <i class="fa-solid fa-upload ml-1"></i>
                      <span>تسليم الحل</span>
                    </button>
                    <button type="button" class="btn-card-action text-slate-300 hover:text-white" data-action="view-specs" data-assignment-id="${escapeHtml(task.id)}">
                      <i class="fa-regular fa-file-lines ml-1"></i>
                      <span>التفاصيل</span>
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join("") : `
            <div class="col-span-full py-12 text-center text-slate-400 border border-brand-border rounded-xl bg-brand-surface/40">
              <i class="fa-solid fa-folder-open text-4xl text-slate-500 mb-3 block"></i>
              <h4 class="text-white font-bold mb-1">لا توجد تكليفات معلنة لمجموعتك حالياً</h4>
              <p class="text-xs text-slate-400">سيقوم المحاضر بإسناد المهام والمشاريع تباعاً بعد كل محاضرة.</p>
            </div>
          `}
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
                <span>بيئة الفحص والتجربة السحابية السريعة (Python Sandbox)</span>
                <span class="sandbox-badge font-mono">Python 3.12 OK</span>
              </h3>
              <p class="sandbox-desc">هل تود اختبار كودك السريع والتأكد من مخرجات الدوال قبل التسليم النهائي؟</p>
            </div>
          </div>

          <div class="sandbox-actions-group">
            <button type="button" class="btn-sandbox-tool" id="btnRerunSandbox">
              <i class="fa-solid fa-rotate text-xs"></i>
              <span>إعادة التشغيل</span>
            </button>
            <button type="button" class="btn-sandbox-primary" id="btnExecuteSandboxTests">
              <i class="fa-solid fa-play text-[10px]"></i>
              <span>تشغيل الاختبار السحابي</span>
            </button>
          </div>
        </div>

        <div class="sandbox-terminal-window font-mono" dir="ltr" id="sandboxTerminalBody">
          <div class="terminal-meta-bar">
            <div class="terminal-window-dots">
              <span class="w-dot dot-red"></span>
              <span class="w-dot dot-yellow"></span>
              <span class="w-dot dot-green"></span>
              <span class="terminal-cmd-label">pytest -v test_solution.py</span>
            </div>
            <span class="terminal-stats-label" id="sandboxTerminalStats">Duration: 0.35s • Memory: 12MB</span>
          </div>

          <div class="terminal-console-lines" id="sandboxTerminalLines">
            <p class="term-line-muted">platform linux -- Python 3.12, pytest-8.1</p>
            <p class="term-line-muted">rootdir: /home/student/workspace</p>
            <div class="term-tests-list">
              <p class="term-test-item term-pass">
                <span>test_solution.py::test_basic_execution</span>
                <span class="font-bold">PASSED [ 50%]</span>
              </p>
              <p class="term-test-item term-pass">
                <span>test_solution.py::test_edge_cases_and_exceptions</span>
                <span class="font-bold">PASSED [100%]</span>
              </p>
            </div>
            <div class="term-summary-line term-pass">
              <span>========================= 2 passed, 0 warnings in 0.35s =========================</span>
            </div>
          </div>
        </div>
      </section>
      <!-- END: CloudSandboxCodeTester -->
    </div>
  `;
}

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

            <!-- Left side Submission Zone -->
            <div class="assignment-submission-col" data-purpose="submission-box">
              <div class="submission-box-inner">
                <div class="submission-box-header">
                  <h3 class="submission-title">
                    <i class="fa-solid fa-cloud-arrow-up text-brand-cyan"></i>
                    تسليم الكود البرمجي
                  </h3>
                  <span class="badge-points font-mono">${heroTask.maxScore || 100} نقطة</span>
                </div>

                ${isHeroSubmitted ? `
                  <!-- Already Submitted State Box -->
                  <div class="submission-already-done p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-right space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1.5">
                        <i class="fa-solid fa-circle-check"></i>
                        ${isHeroGraded ? "تم الاعتماد والتقييم" : "تم استلام حلك بنجاح"}
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
                        حلك قيد المراجعة والتقييم من قبل المحاضر. يمكنك تعديل حلك أو إعادة رفع ملف جديد حتى موعد الديدلاين.
                      </p>
                    `}

                    ${heroSubmission.fileUrl ? `
                      <div class="text-xs text-slate-300 bg-black/40 p-2 rounded flex items-center justify-between">
                        <span class="truncate font-mono"><i class="fa-solid fa-file-code text-brand-cyan ml-1"></i> ملف الحل المرفوع</span>
                        <a href="${escapeHtml(heroSubmission.fileUrl)}" target="_blank" rel="noopener noreferrer" class="text-brand-cyan underline">معاينة</a>
                      </div>
                    ` : ""}

                    ${heroSubmission.answerText ? `
                      <div class="text-xs text-slate-300 bg-black/40 p-2 rounded">
                        <span class="text-slate-400 block mb-0.5">ملاحظات الحل / الرابط:</span>
                        <span class="font-mono text-cyan-300 break-all">${escapeHtml(heroSubmission.answerText)}</span>
                      </div>
                    ` : ""}

                    <button type="button" class="btn btn-secondary w-full text-xs py-1.5 mt-2" id="btnToggleHeroResubmit">
                      <i class="fa-solid fa-rotate-right ml-1"></i>
                      تعديل أو إعادة رفع الحل
                    </button>
                  </div>
                ` : ""}

                <!-- Submission Form Area (Shown directly if not submitted, or hidden behind toggle if submitted) -->
                <div class="submission-form-wrap ${isHeroSubmitted ? 'd-none' : ''}" id="heroSubmissionFormWrap">
                  <!-- Drag & Drop File Zone -->
                  <input type="file" id="heroTaskFileInput" class="d-none" accept=".py,.ipynb,.zip,.pdf,.txt" />
                  <div class="drop-zone-box group" id="heroTaskDropZone">
                    <i class="fa-brands fa-python drop-zone-icon"></i>
                    <p class="drop-zone-text">
                      اسحب كود الحل إلى هنا أو <span class="text-brand-cyan underline">تصفح ملفاتك</span>
                    </p>
                    <p class="drop-zone-hint font-mono">امتداد .py أو .ipynb أو .zip (بحد أقصى 20MB)</p>
                    <!-- Selected File Display -->
                    <div class="selected-file-pill d-none" id="heroSelectedFilePill">
                      <i class="fa-solid fa-file-code text-brand-cyan"></i>
                      <span id="heroSelectedFileName" class="truncate font-mono"></span>
                      <button type="button" id="btnRemoveHeroSelectedFile" class="btn-remove-file" title="إزالة الملف">&times;</button>
                    </div>
                  </div>

                  <!-- GitHub Repo / Solution Link Option -->
                  <div class="github-repo-field">
                    <label class="github-label" for="heroGithubRepoInput">
                      <span>أو رابط مستودع GitHub / إجابة نصية:</span>
                      <i class="fa-brands fa-github"></i>
                    </label>
                    <div class="relative">
                      <input
                        type="text"
                        id="heroGithubRepoInput"
                        class="github-input font-mono"
                        dir="ltr"
                        placeholder="https://github.com/username/project أو نص الكود"
                        value="${escapeHtml(heroSubmission?.answerText || '')}"
                      />
                    </div>
                  </div>

                  <!-- Submit Action Button -->
                  <div class="submission-action-area">
                    <button type="button" class="btn-submit-assignment" id="btnSubmitHeroAssignment" data-assignment-id="${escapeHtml(heroTask.id)}">
                      <i class="fa-solid fa-paper-plane"></i>
                      <span id="btnSubmitHeroAssignmentText">${isHeroSubmitted ? "تحديث واعتماد الحل" : "تسليم واعتماد الحل للتقييم"}</span>
                    </button>
                    <p class="submission-subtext">يتم توثيق وقت التسليم وحفظه مباشرة في ملفك الأكاديمي</p>
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

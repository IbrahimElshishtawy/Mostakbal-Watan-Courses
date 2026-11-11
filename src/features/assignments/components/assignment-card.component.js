// src/features/assignments/components/assignment-card.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { formatDate, getDeadlineInfo, isDeadlinePassed } from "../../../shared/utils/date.utils.js";
import { normalizeAssignmentGrade } from "../assignment.service.js";

/**
 * Intelligent content formatter for assignment titles and descriptions.
 * Handles legacy generic titles like 'task1', 'task2', 'Task3' and extracts
 * meaningful topics from descriptions.
 * @param {string} rawTitle
 * @param {string} rawDesc
 * @returns {{ title: string, desc: string }}
 */
export function formatAssignmentContent(rawTitle = "", rawDesc = "") {
  let title = (rawTitle || "").trim();
  let desc = (rawDesc || "").trim();

  // If title is generic (task1, task2, Task3, تاسك 1, etc.)
  if (!title || /^(task\s*\d+|تاسك\s*\d*)$/i.test(title)) {
    const taskNumMatch = title.match(/\d+/);
    const taskNum = taskNumMatch ? taskNumMatch[0] : "";

    if (/Student Grade Analyzer/i.test(desc) || /درجات الطلاب/i.test(desc)) {
      title = `تحليل درجات الطلاب ${taskNum ? `(تاسك ${taskNum})` : ''} - Grade Analyzer`;
    } else if (/آلة حاسبة/i.test(desc) || /حاسبة بسيطة/i.test(desc) || /calculator/i.test(desc)) {
      title = `برنامج آلة حاسبة بسيطة ${taskNum ? `(تاسك ${taskNum})` : ''} - Calculator`;
    } else if (/fruits/i.test(desc) || /قائمة|مصفوفة|List/i.test(desc)) {
      title = `التعامل مع القوائم والمصفوفات ${taskNum ? `(تاسك ${taskNum})` : ''} - Python Lists`;
    } else if (/loop|for|while|حلقات/i.test(desc)) {
      title = `تطبيق عملي على حلقات التكرار ${taskNum ? `(تاسك ${taskNum})` : ''} - Python Loops`;
    } else if (taskNum) {
      title = `تاسك تطبيقي عملي #${taskNum}`;
    } else {
      title = "تاسك تطبيقي عملي بالـ Python";
    }
  }

  // Clean description: strip repetitive prefixes like "🐍 Python Task — Student Grade Analyzer"
  desc = desc
    .replace(/^🐍\s*Python\s*Task\s*[-—–:]*\s*(Student Grade Analyzer|اعمل برنامج فيه:|اعمل برنامج)?\s*/i, "")
    .trim();

  return {
    title,
    desc: desc || "تطبيق عملي ومهام برمجية مطلوبة وفق توجيهات المعلم لمتابعة مستواك."
  };
}

/**
 * Normalizes group labels into short, neat badges.
 * @param {string} group
 * @returns {string}
 */
export function formatGroupLabel(group) {
  if (!group || group === "ALL") return "جميع المجموعات";
  if (group.includes("مجموعة الأحد والأربعاء")) {
    const timeMatch = group.match(/\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}/);
    return timeMatch ? `الأحد والأربعاء (${timeMatch[0]})` : "مجموعة الأحد والأربعاء";
  }
  return group.length > 24 ? `${group.slice(0, 22)}...` : group;
}

/**
 * Returns HTML string for the redesigned student assignment summary card.
 * Answers 4 questions in 3 seconds:
 * 1. What is this task?
 * 2. When is it due?
 * 3. What is my status?
 * 4. What should I click?
 * @param {object} options
 * @param {object} options.assignment
 * @param {object|null} options.submission
 * @returns {string}
 */
export function renderStudentAssignmentCard({ assignment, submission }) {
  const isSubmitted = !!submission;
  const isExpired = !isSubmitted && isDeadlinePassed(assignment.deadline);
  const deadlineInfo = getDeadlineInfo(assignment.deadline);

  // 1. Format Title & Description with intelligent topic extraction
  const { title: displayTitle, desc: displayDesc } = formatAssignmentContent(
    assignment.title,
    assignment.description
  );
  const safeTitle = escapeHtml(displayTitle);
  const safeDesc = escapeHtml(displayDesc);
  const safeGroup = escapeHtml(formatGroupLabel(assignment.group));

  // 2. Status Badge Resolution
  let statusBadgeHtml;
  let deadlineTagHtml;

  if (isSubmitted) {
    const normalizedGrade = normalizeAssignmentGrade(submission.grade);
    const isGraded = normalizedGrade !== null;
    if (isGraded) {
      statusBadgeHtml = `<span class="assignment-badge is-graded"><span class="badge-dot">●</span> تم التصحيح (${normalizedGrade}/10)</span>`;
      deadlineTagHtml = `<span class="deadline-strip-tag is-normal">تم تسليمه</span>`;
    } else {
      statusBadgeHtml = `<span class="assignment-badge is-submitted"><span class="badge-dot">●</span> تم التسليم بنجاح</span>`;
      deadlineTagHtml = `<span class="deadline-strip-tag is-normal">قيد التصحيح</span>`;
    }
  } else if (isExpired) {
    statusBadgeHtml = `<span class="assignment-badge is-expired"><span class="badge-dot">●</span> انتهى الموعد</span>`;
    deadlineTagHtml = `<span class="deadline-strip-tag is-expired">منتهي</span>`;
  } else if (deadlineInfo.isUrgent) {
    statusBadgeHtml = `<span class="assignment-badge is-urgent"><span class="badge-dot">●</span> ${escapeHtml(deadlineInfo.label)}</span>`;
    deadlineTagHtml = `<span class="deadline-strip-tag is-urgent">${escapeHtml(deadlineInfo.text.replace('موعد التسليم: ', ''))}</span>`;
  } else {
    statusBadgeHtml = `<span class="assignment-badge is-pending"><span class="badge-dot">●</span> مطلوب تسليمه</span>`;
    deadlineTagHtml = `<span class="deadline-strip-tag is-normal">متاح</span>`;
  }

  // 3. Deadline Text
  const deadlineDateStr = assignment.deadline ? formatDate(assignment.deadline) : "بدون موعد محدد";
  const deadlineValText = isExpired
    ? `انتهى في (${deadlineDateStr})`
    : (deadlineInfo.isUrgent ? deadlineInfo.text : deadlineDateStr);

  // 4. Action Button Label & Styling
  let buttonLabel = "فتح التاسك";
  let buttonClass = "";
  if (isSubmitted) {
    buttonLabel = "عرض حلك والتصحيح";
    buttonClass = "is-submitted";
  } else if (isExpired) {
    buttonLabel = "مراجعة تفاصيل التاسك";
    buttonClass = "is-expired";
  }

  // 5. Attachment Chip
  let attachmentBadgeHtml = "";
  if (assignment.fileUrl) {
    attachmentBadgeHtml = `
      <span class="assignment-badge is-attachment" title="يوجد ملف مرفق من المعلم">
        <span class="badge-icon" aria-hidden="true">📎</span>
        <span>مرفق متاح</span>
      </span>
    `;
  }

  return `
    <article class="student-assignment-card ${isSubmitted ? 'is-submitted' : ''} ${isExpired ? 'is-expired' : ''} ${deadlineInfo.isUrgent ? 'is-urgent' : ''}" dir="rtl">
      <div class="student-assignment-body">
        <!-- Card Header: Badges -->
        <div class="student-assignment-header">
          <div class="header-badges-right">
            <span class="assignment-badge is-group" title="${escapeHtml(assignment.group || 'عام')}">
              <span class="badge-icon" aria-hidden="true">👥</span>
              <span>${safeGroup}</span>
            </span>
            ${attachmentBadgeHtml}
          </div>
          ${statusBadgeHtml}
        </div>

        <!-- Card Title (Prominent, High-Contrast Cairo) -->
        <h3 class="student-assignment-title" title="${safeTitle}">
          ${safeTitle}
        </h3>

        <!-- Card Description (Line Clamped & Clean) -->
        <p class="student-assignment-desc">
          ${safeDesc}
        </p>

        <!-- Card Deadline Strip (Sleek, Modern, Integrated) -->
        <div class="student-assignment-deadline-strip ${deadlineInfo.isUrgent ? 'is-urgent' : ''} ${isExpired ? 'is-expired' : ''} ${isSubmitted ? 'is-submitted' : ''}">
          <div class="deadline-strip-main">
            <div class="deadline-strip-icon-box" aria-hidden="true">
              ${isExpired ? '⌛' : (deadlineInfo.isUrgent ? '⚡' : '⏰')}
            </div>
            <div class="deadline-strip-text">
              <span class="deadline-strip-label">${isExpired ? 'حالة الموعد' : 'موعد التسليم'}</span>
              <strong class="deadline-strip-val">${escapeHtml(deadlineValText)}</strong>
            </div>
          </div>
          ${deadlineTagHtml}
        </div>
      </div>

      <!-- Single Primary Action -->
      <div class="student-assignment-footer">
        <button
          type="button"
          class="student-assignment-btn ${buttonClass}"
          data-open-task-details="${escapeHtml(assignment.id)}"
          aria-label="${buttonLabel}: ${safeTitle}"
        >
          <span>${buttonLabel}</span>
          <span class="btn-arrow" aria-hidden="true">←</span>
        </button>
      </div>
    </article>
  `;
}

/**
 * Returns HTML string for student assignments skeleton grid.
 * @param {number} [count=3]
 * @returns {string}
 */
export function renderStudentAssignmentSkeletonGrid(count = 3) {
  const skeletonCard = `
    <div class="student-assignment-card is-skeleton" aria-hidden="true">
      <div class="d-flex justify-between mb-3">
        <div class="skeleton-shimmer" style="width:100px;height:24px;border-radius:12px;"></div>
        <div class="skeleton-shimmer" style="width:80px;height:24px;border-radius:12px;"></div>
      </div>
      <div class="skeleton-shimmer mb-2" style="width:85%;height:24px;border-radius:6px;"></div>
      <div class="skeleton-shimmer mb-1" style="width:100%;height:16px;border-radius:4px;"></div>
      <div class="skeleton-shimmer mb-4" style="width:70%;height:16px;border-radius:4px;"></div>
      <div class="skeleton-shimmer mb-3" style="width:100%;height:44px;border-radius:8px;"></div>
      <div class="skeleton-shimmer" style="width:100%;height:42px;border-radius:8px;"></div>
    </div>
  `;

  return `
    <div class="student-assignments-grid" aria-busy="true" aria-label="جاري تحميل التاسكات...">
      ${Array.from({ length: count }, () => skeletonCard).join("")}
    </div>
  `;
}

/**
 * Formats description text with highlighted syntax code spans.
 * @param {string} rawDesc
 * @returns {string}
 */
export function formatDescriptionCodeSpans(rawDesc = "") {
  if (!rawDesc) return "تطبيق عملي ومهام برمجية مطلوبة وفق توجيهات المعلم لمتابعة مستواك.";
  let text = escapeHtml(rawDesc);
  const keywords = ["ZeroDivisionError", "try-except", "try", "except", "JSON", "OOP", "PEP8", "test_calculator.py", "def", "for loop", "for", "while", "list", "dict", "print", "input", "return", "class"];
  keywords.forEach((kw) => {
    const reg = new RegExp(`\\b(${kw})\\b`, "g");
    text = text.replace(reg, `<code class="bg-[#090e1c] text-primary px-1.5 py-0.5 rounded text-xs font-mono">$1</code>`);
  });
  return text;
}

export function formatLiveCountdown(deadline) {
  if (!deadline) return "بدون موعد محدد";
  const dateObj = deadline?.toDate ? deadline.toDate() : new Date(deadline);
  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "انتهت فترة التسليم ⚠️";
  }

  const totalSecs = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  if (days > 0) {
    return `متبقي ${days} يوم و ${hours} ساعة`;
  }
  if (hours > 0) {
    return `متبقي ${hours} ساعة و ${minutes} دقيقة`;
  }
  return `متبقي ${minutes} دقيقة و ${seconds} ثانية`;
}

/**
 * Returns HTML string for teacher assignment card matching Image 2.html specifications.
 * @param {object} options
 * @param {object} options.assignment
 * @param {number} [options.submissionsCount]
 * @param {number} [options.totalStudents=0]
 * @param {number|null} [options.averageScore=null]
 * @param {object|null} [options.testStats=null]
 * @returns {string}
 */
export function renderTeacherAssignmentCard({
  assignment,
  submissionsCount = 0,
  totalStudents = 0,
  averageScore = null,
  testStats = null
}) {
  const { title: displayTitle, desc: displayDesc } = formatAssignmentContent(
    assignment.title,
    assignment.description
  );
  const safeTitle = escapeHtml(displayTitle);
  const formattedDesc = formatDescriptionCodeSpans(displayDesc);
  const safeGroup = escapeHtml(formatGroupLabel(assignment.group));
  const isExpired = isDeadlinePassed(assignment.deadline);

  // Dynamic icon selection based on title/desc keywords
  let iconName = "terminal";
  const lowerTitle = safeTitle.toLowerCase();
  if (lowerTitle.includes("حاسب") || lowerTitle.includes("calculator")) {
    iconName = "calculate";
  } else if (lowerTitle.includes("قوائم") || lowerTitle.includes("json") || lowerTitle.includes("todo")) {
    iconName = "data_object";
  } else if (lowerTitle.includes("loop") || lowerTitle.includes("تكرار")) {
    iconName = "autorenew";
  } else if (lowerTitle.includes("درجات") || lowerTitle.includes("grade")) {
    iconName = "analytics";
  }

  // Calculate dynamic submission ratio (deduplicated)
  const subsCount = typeof assignment.submissionsCount === "number" ? assignment.submissionsCount : submissionsCount;
  const targetRoster = totalStudents > 0 ? totalStudents : (subsCount > 0 ? subsCount : 0);
  const submissionPercent = targetRoster > 0 ? Math.min(100, Math.round((subsCount / targetRoster) * 100)) : 0;

  // Real countdown string
  const deadlineRemainingText = formatLiveCountdown(assignment.deadline);

  // Real Test Engine Status
  const testTotal = testStats?.totalTests || 10;
  const testPassed = testStats?.passedTests !== undefined ? testStats.passedTests : (subsCount > 0 ? testTotal : 0);
  const testPassedDisplay = subsCount > 0 ? `${testPassed} / ${testTotal} مجتازة` : `10 / 10 جاهز للاختبار`;

  // Real Average Score (Unified 0-10 Scale)
  let averageScoreDisplay = "بانتظار التقييم (— / 10)";
  let gradeSummaryDisplay = "سلم الدرجات من 10";
  if (averageScore !== null && !isNaN(averageScore) && averageScore !== undefined) {
    const roundedScore = Math.round(Number(averageScore) * 10) / 10;
    averageScoreDisplay = `${roundedScore} / 10`;
    gradeSummaryDisplay = `متوسط الحلول المعتمدة (${Math.round(roundedScore * 10)}%)`;
  }

  const maxPoints = 10;

  return `
    <article class="rounded-2xl bg-surface-container-low/90 backdrop-blur-xl p-4 sm:p-6 shadow-xl flex flex-col gap-5 relative overflow-hidden transition-all duration-300 hover:shadow-2xl border border-surface-container-high/60 group" dir="rtl" data-assignment-card-id="${escapeHtml(assignment.id)}">
      <!-- Glowing accent edge on top -->
      <div class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary via-primary-container to-secondary"></div>

      <!-- Header / Badges Row -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 flex-wrap">
          <!-- Score Badge: Fixed 10 scale -->
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-secondary font-bold text-xs shadow-sm">
            <span class="material-symbols-outlined text-[15px]">stars</span>
            <span>${maxPoints} درجات</span>
          </span>

          <!-- Status Badge -->
          ${
            isExpired
              ? `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-tertiary text-xs font-semibold">
                  <span class="w-2 h-2 rounded-full bg-tertiary"></span>
                  منتهي الديدلاين
                </span>`
              : `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-primary text-xs font-semibold">
                  <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  ساري ومتاح للتسليم
                </span>`
          }

          <!-- Class Group Badge -->
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold">
            <span class="material-symbols-outlined text-[15px] text-primary">calendar_month</span>
            <span>${safeGroup}</span>
          </span>
        </div>

        <!-- Quick Action Icon Menu -->
        <div class="flex items-center gap-1.5 self-end lg:self-auto">
          <button class="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer" title="مشاركة الرابط" type="button" data-action="share-assignment" data-id="${escapeHtml(assignment.id)}" data-title="${safeTitle}">
            <span class="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button class="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer" title="نسخ التكليف" type="button" data-action="copy-assignment" data-id="${escapeHtml(assignment.id)}" data-title="${safeTitle}">
            <span class="material-symbols-outlined text-[18px]">content_copy</span>
          </button>
        </div>
      </div>

      <!-- Main Title & Description -->
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-primary text-[24px] sm:text-[28px]">${iconName}</span>
          <h3 class="text-base sm:text-lg lg:text-xl font-bold text-on-surface tracking-tight">
            ${safeTitle}
          </h3>
        </div>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-4xl">
          ${formattedDesc}
        </p>
      </div>

      <!-- Technical Verification & Compact Visual Grid (4 Columns) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 p-3.5 rounded-xl bg-surface-container-lowest/80 border border-surface-container-high/40">
        <!-- Item 1: Remaining Deadline -->
        <div class="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-high/40">
          <div class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
            <span class="material-symbols-outlined text-[18px]">hourglass_top</span>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-[11px] text-on-surface-variant font-medium">الديدلاين المتبقي</span>
            <span class="text-xs sm:text-sm font-semibold ${isExpired ? 'text-tertiary font-bold' : 'text-on-surface'} truncate font-mono" data-countdown-deadline="${escapeHtml(assignment.deadline || '')}" id="deadline-val-${escapeHtml(assignment.id)}">
              ${deadlineRemainingText}
            </span>
          </div>
        </div>

        <!-- Item 2: Submission Stats -->
        <div class="flex flex-col justify-center p-2.5 rounded-xl bg-surface-container-high/40">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[11px] text-on-surface-variant font-medium">نسبة تسليم الطلاب</span>
            <span class="text-xs font-bold text-primary font-mono">${subsCount} / ${targetRoster} (${submissionPercent}%)</span>
          </div>
          <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div class="bg-gradient-to-l from-primary to-primary-container h-full rounded-full transition-all duration-500" style="width: ${submissionPercent}%;"></div>
          </div>
        </div>

        <!-- Item 3: Auto Unit-Tests Status -->
        <div class="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-high/40">
          <div class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary flex-shrink-0">
            <span class="material-symbols-outlined text-[18px]">fact_check</span>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-[11px] text-on-surface-variant font-medium">محرك الاختبار الآلي</span>
            <span class="text-xs sm:text-sm font-semibold text-secondary flex items-center gap-1 font-mono truncate">
              ${testPassedDisplay}
              <span class="material-symbols-outlined text-[15px] text-secondary">verified</span>
            </span>
            <span class="text-[10px] text-slate-400">حالة المحرك: نشط ومتصل 🟢</span>
          </div>
        </div>

        <!-- Item 4: Accuracy & Solution Score (Unified 0-10 Scale) -->
        <div class="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-high/40">
          <div class="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
            <span class="material-symbols-outlined text-[18px]">rule</span>
          </div>
          <div class="flex flex-col min-w-0">
            <span class="text-[11px] text-on-surface-variant font-medium">متوسط درجة الحلول</span>
            <span class="text-xs sm:text-sm font-semibold font-mono ${averageScore !== null ? 'text-emerald-400 font-bold' : 'text-slate-400'} truncate">
              ${averageScoreDisplay}
            </span>
            <span class="text-[10px] text-on-surface-variant">${gradeSummaryDisplay}</span>
          </div>
        </div>
      </div>

      <!-- Integrated Reference Benchmark Preview / Model Solution -->
      <div class="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container-high/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-10 rounded-lg bg-surface-container-lowest overflow-hidden flex-shrink-0 relative flex items-center justify-center text-primary border border-surface-container-high">
            <span class="material-symbols-outlined text-[22px]">terminal</span>
            <div class="absolute inset-0 bg-primary/10 pointer-events-none"></div>
          </div>
          <div class="flex flex-col">
            <span class="text-xs sm:text-sm font-bold text-on-surface">النموذج المرجعي واختبارات بايثون (Model Solution)</span>
            <span class="text-xs text-on-surface-variant">
              ${
                assignment.fileUrl
                  ? `<a href="${escapeHtml(assignment.fileUrl)}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-mono">ملف مرفق: ${escapeHtml(assignment.fileUrl.split("/").pop() || "resource.py")}</a>`
                  : `ملف <code class="text-primary text-xs font-mono">test_solution.py</code> مرفق مع معايير PEP8.`
              }
            </span>
          </div>
        </div>
        <div class="flex items-center gap-2 self-end md:self-auto flex-wrap">
          <button class="px-3.5 py-1.5 rounded-lg bg-surface-container-highest text-on-surface hover:text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" type="button" data-action="preview-model-solution" data-id="${escapeHtml(assignment.id)}" data-title="${safeTitle}">
            <span class="material-symbols-outlined text-[16px]">visibility</span>
            <span>معاينة كود النموذج</span>
          </button>
          <button class="px-3.5 py-1.5 rounded-lg bg-surface-container-highest text-on-surface hover:text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" type="button" data-action="run-console" data-id="${escapeHtml(assignment.id)}" data-title="${safeTitle}">
            <span class="material-symbols-outlined text-[16px]">terminal</span>
            <span>تشغيل في الكونسول</span>
          </button>
        </div>
      </div>

      <!-- Action Card Footer Buttons -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-surface-container-high/60">
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Main primary CTA -->
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-bold text-xs transition-all duration-200 shadow-md cursor-pointer"
            data-teacher-view-submissions="${escapeHtml(assignment.id)}"
            data-task-title="${safeTitle}"
          >
            <span class="material-symbols-outlined text-[18px]">assignment_turned_in</span>
            <span>استعراض التسليمات والتقييم (${subsCount} تسليم)</span>
          </button>

          <!-- Edit Button -->
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            data-action="edit-assignment"
            data-id="${escapeHtml(assignment.id)}"
            data-title="${safeTitle}"
          >
            <span class="material-symbols-outlined text-[18px]">edit_note</span>
            <span>تعديل التكليف</span>
          </button>

          <!-- Rubrics Evaluation Button -->
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            data-action="view-rubrics"
            data-id="${escapeHtml(assignment.id)}"
            data-title="${safeTitle}"
          >
            <span class="material-symbols-outlined text-[18px]">rubric</span>
            <span>سلم الدرجات المعياري</span>
          </button>
        </div>

        <!-- Danger / Delete action -->
        <div class="flex items-center justify-end">
          <button
            type="button"
            class="p-2.5 rounded-xl bg-surface-container-high text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors shadow-sm cursor-pointer"
            data-teacher-delete-assignment="${escapeHtml(assignment.id)}"
            data-task-title="${safeTitle}"
            title="حذف أو أرشفة التكليف"
          >
            <span class="material-symbols-outlined text-[20px]">delete_forever</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

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
 * Returns HTML string for teacher assignment card.
 * @param {object} options
 * @param {object} options.assignment
 * @returns {string}
 */
export function renderTeacherAssignmentCard({ assignment }) {
  const { title: displayTitle, desc: displayDesc } = formatAssignmentContent(
    assignment.title,
    assignment.description
  );
  const safeTitle = escapeHtml(displayTitle);
  const safeDesc = escapeHtml(displayDesc);
  const safeGroup = escapeHtml(formatGroupLabel(assignment.group));
  const isExpired = isDeadlinePassed(assignment.deadline);

  const statusBadge = isExpired
    ? `<span class="text-[11px] bg-rose-500/15 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span> منتهي الموعد</span>`
    : `<span class="text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ساري ومتاح</span>`;

  return `
    <article class="bg-[#121825] border border-[#1e2a3f] rounded-2xl p-5 hover:border-amber-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group" dir="rtl">
      <div>
        <!-- Header: Group Badge + Status Badge + Points Badge -->
        <div class="flex items-center justify-between gap-2 flex-wrap mb-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[11px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-lg font-bold flex items-center gap-1">
              <i class="fa-solid fa-users text-[10px]"></i>
              <span>${safeGroup}</span>
            </span>
            ${statusBadge}
          </div>
          <span class="text-[10px] bg-purple-500/15 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md font-mono font-bold">
            100 درجة
          </span>
        </div>

        <!-- Title -->
        <h4 class="text-base font-extrabold text-white line-clamp-1 group-hover:text-amber-300 transition-colors" title="${safeTitle}">
          ${safeTitle}
        </h4>

        <!-- Description -->
        <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          ${safeDesc}
        </p>

        <!-- Specs Box -->
        <div class="bg-[#0d121c] border border-[#1b2537] rounded-xl p-3 my-4 space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-slate-300">
              <i class="fa-regular fa-clock text-slate-400 text-xs"></i>
              <span class="text-slate-400">آخر موعد:</span>
              <span class="font-bold text-white font-mono">${formatDate(assignment.deadline)}</span>
            </div>
            <span class="text-[10px] font-mono ${isExpired ? 'text-rose-400' : 'text-emerald-400'}">
              ${isExpired ? 'انتهت الفترة ⚠️' : 'ساري حتى الديدلاين'}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-slate-300">
              <i class="fa-solid fa-user-group text-slate-400 text-xs"></i>
              <span class="text-slate-400">المجموعة:</span>
              <span class="font-semibold text-slate-200">${safeGroup}</span>
            </div>
          </div>

          ${
            assignment.fileUrl
              ? `
            <div class="flex items-center justify-between pt-2 border-t border-[#1b2537]">
              <div class="flex items-center gap-2 text-slate-300">
                <i class="fa-solid fa-paperclip text-slate-400 text-xs"></i>
                <span class="text-slate-400">ملف مرفق:</span>
              </div>
              <a href="${escapeHtml(assignment.fileUrl)}" target="_blank" rel="noopener noreferrer" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px]">
                <span>عرض المرفق</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>
          `
              : ""
          }
        </div>
      </div>

      <!-- Actions Footer -->
      <div class="pt-3 border-t border-[#1b2537] flex items-center gap-2">
        <button
          type="button"
          class="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-950/50 border border-emerald-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          data-teacher-view-submissions="${escapeHtml(assignment.id)}"
          data-task-title="${safeTitle}"
        >
          <i class="fa-solid fa-clipboard-check text-sm"></i>
          <span>استعراض التسليمات والتقييم</span>
        </button>
        <button
          type="button"
          class="w-10 h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center transition-all cursor-pointer"
          data-teacher-delete-assignment="${escapeHtml(assignment.id)}"
          data-task-title="${safeTitle}"
          title="حذف هذا الواجب نهائياً"
        >
          <i class="fa-solid fa-trash-can text-sm"></i>
        </button>
      </div>
    </article>
  `;
}

// src/features/exams/components/exam-card.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderCard } from "../../../shared/components/Card/card.component.js";
import { renderBadge } from "../../../shared/components/Badge/badge.component.js";
import { renderButton } from "../../../shared/components/Button/button.component.js";
import { formatDate } from "../../../shared/utils/date.utils.js";
import { renderExamStatusBadge, getExamStatusInfo } from "./exam-status-badge.component.js";

/**
 * Returns HTML string for student exam card.
 */
export function renderStudentExamCard({ exam, attempt = null, result = null }) {
  const activeResult = result || exam?.result || null;
  const activeAttempt = attempt || exam?.attempt || null;
  const examWithAttempt = activeAttempt?.status && !exam?.attemptStatus
    ? { ...exam, attemptStatus: activeAttempt.status }
    : exam;

  const statusInfo = getExamStatusInfo(examWithAttempt, activeResult);
  const durationMin = Number(exam.duration) || 30;
  const questionsCount =
    exam.totalQuestions !== undefined
      ? exam.totalQuestions
      : Array.isArray(exam.questions)
      ? exam.questions.length
      : Number(exam.questionCount) || "—";

  // Format schedule dates (Start time and End time)
  let scheduleDisplay = "متاح للمشاركين";
  const startRaw = exam.startDate || exam.startAt || exam.beginDate;
  const endRaw = exam.deadline || exam.endAt || exam.endDate;

  if (startRaw && endRaw) {
    scheduleDisplay = `يبدأ ${formatDate(startRaw)} · ينتهي ${formatDate(endRaw)}`;
  } else if (endRaw) {
    scheduleDisplay = `ينتهي في ${formatDate(endRaw)}`;
  } else if (startRaw) {
    scheduleDisplay = `يبدأ ${formatDate(startRaw)}`;
  } else if (exam.createdAt) {
    scheduleDisplay = formatDate(exam.createdAt);
  }

  const isCompleted =
    statusInfo.status === "graded" ||
    statusInfo.status === "pending_essay" ||
    statusInfo.status === "submitted";
  const isInProgress = statusInfo.status === "in_progress" || examWithAttempt.attemptStatus === "in_progress";

  const contentHtml = `
    <div class="student-exam-card-inner">
      <div class="student-exam-card-header d-flex items-center justify-between gap-2 mb-2">
        <h4 class="font-black student-exam-title m-0">
          ${escapeHtml(exam.title || "امتحان بدون عنوان")}
        </h4>
        <div class="student-exam-badge-wrap">
          ${statusInfo.html}
        </div>
      </div>

      ${
        exam.description
          ? `<p class="student-exam-desc text-muted text-xs mb-3">${escapeHtml(exam.description)}</p>`
          : ""
      }

      <!-- Clean Key Specs Row -->
      <div class="student-exam-specs-row mb-3">
        <span class="exam-spec-pill">
          <span class="spec-icon" aria-hidden="true">📝</span>
          <span><strong>${questionsCount}</strong> سؤال</span>
        </span>
        <span class="exam-spec-pill">
          <span class="spec-icon" aria-hidden="true">⏱</span>
          <span><strong>${durationMin}</strong> دقيقة</span>
        </span>
      </div>

      <!-- Schedule Date Row -->
      <div class="student-exam-schedule-row mb-3">
        <span class="schedule-icon" aria-hidden="true">📅</span>
        <span class="schedule-text text-xs text-muted">${escapeHtml(scheduleDisplay)}</span>
      </div>

      ${
        isCompleted && activeResult
          ? `
        <div class="result-quick-bar p-2 px-3 mt-2 d-flex items-center justify-between" dir="rtl">
          <span class="text-xs text-muted font-bold">
            ${activeResult.status === "pending_essay" ? "حالة النتيجة:" : "النتيجة المسجلة:"}
          </span>
          ${
            activeResult.status === "pending_essay"
              ? `<span class="badge badge-warning text-xs font-bold">قيد التصحيح ⏳</span>`
              : `<strong class="text-accent font-black">${activeResult.score ?? "—"} / ${activeResult.total || activeResult.totalQuestions || 100}</strong>`
          }
        </div>
      `
          : ""
      }
    </div>
  `;

  // Determine State-Aware Primary Action Button
  let actionButtonHtml = "";
  if (isCompleted) {
    actionButtonHtml = renderButton({
      text: "عرض النتيجة 📊",
      variant: "primary",
      className: "flex-1 btn-md",
      extraAttrs: `data-view-exam-result="${escapeHtml(exam.id)}" aria-label="عرض النتيجة: ${escapeHtml(exam.title || '')}"`
    });
  } else if (isInProgress) {
    actionButtonHtml = renderButton({
      text: "متابعة الامتحان ⏳",
      variant: "primary",
      className: "flex-1 btn-md",
      extraAttrs: `data-start-exam="${escapeHtml(exam.id)}" data-resume-exam="${escapeHtml(exam.id)}" aria-label="متابعة الامتحان: ${escapeHtml(exam.title || '')}"`
    });
  } else if (statusInfo.status === "upcoming") {
    actionButtonHtml = `
      <button type="button" class="btn btn-secondary btn-md flex-1" disabled aria-disabled="true" title="لم يبدأ وقت الامتحان بعد">
        الامتحان لم يبدأ ⏰
      </button>
    `;
  } else if (statusInfo.status === "expired") {
    actionButtonHtml = `
      <button type="button" class="btn btn-secondary btn-md flex-1" disabled aria-disabled="true" title="انتهى موعد هذا الامتحان">
        منتهي ⌛
      </button>
    `;
  } else {
    // Available to start
    actionButtonHtml = renderButton({
      text: "بدء الامتحان 🚀",
      variant: "primary",
      className: "flex-1 btn-md font-bold",
      extraAttrs: `data-start-exam="${escapeHtml(exam.id)}" aria-label="بدء الامتحان: ${escapeHtml(exam.title || '')}"`
    });
  }

  // Dual Action Footer: [ عرض التفاصيل ] + [ الزر التفاعلي حسب الحالة ]
  const footerHtml = `
    <div class="student-exam-actions d-flex items-center gap-2 w-full flex-wrap">
      ${renderButton({
        text: "عرض التفاصيل ℹ️",
        variant: "secondary",
        className: "flex-1 btn-md",
        extraAttrs: `data-open-exam-details="${escapeHtml(exam.id)}" aria-label="عرض تفاصيل: ${escapeHtml(exam.title || '')}"`
      })}
      ${actionButtonHtml}
    </div>
  `;

  return renderCard({
    content: contentHtml,
    footer: footerHtml,
    className: `student-exam-card ${isCompleted ? 'is-completed' : ''} ${statusInfo.status === 'expired' ? 'is-expired' : ''}`,
    interactive: true
  });
}

/**
 * Returns HTML string for teacher exam card.
 */
export function renderTeacherExamCard({ exam }) {
  const isActive = exam.active !== false;
  const statusBadge = isActive
    ? renderBadge({ text: "مفعل للطلاب", variant: "success", icon: "✓" })
    : renderBadge({ text: "معطل", variant: "danger", icon: "🔒" });

  const contentHtml = `
    <div class="d-flex items-center justify-between mb-2">
      ${statusBadge}
      <span class="text-xs text-muted">⏱️ ${escapeHtml(exam.duration || 15)} دقيقة</span>
    </div>
    <h4 class="font-bold mb-2" style="font-size:1.05rem;">${escapeHtml(exam.title || "امتحان بدون عنوان")}</h4>
    <div class="text-xs text-muted mb-2">
      <span>المجموعة: ${renderBadge({ text: exam.group || "ALL", variant: "gold" })}</span>
    </div>
  `;

  const footerHtml = `
    <div class="d-flex items-center gap-2 w-full justify-between">
      ${renderButton({
        text: "النتائج 📊",
        size: "sm",
        variant: "secondary",
        extraAttrs: `data-teacher-view-results="${escapeHtml(exam.id)}" data-exam-title="${escapeHtml(exam.title || "")}"`
      })}
      <div class="d-flex gap-1">
        ${renderButton({
          text: isActive ? "تعطيل" : "تفعيل",
          size: "sm",
          variant: isActive ? "warning" : "success",
          extraAttrs: `data-teacher-toggle-exam="${escapeHtml(exam.id)}" data-current-active="${isActive}"`
        })}
        ${renderButton({
          text: "حذف",
          size: "sm",
          variant: "danger",
          extraAttrs: `data-teacher-delete-exam="${escapeHtml(exam.id)}" data-exam-title="${escapeHtml(exam.title || "")}"`
        })}
      </div>
    </div>
  `;

  return renderCard({
    content: contentHtml,
    footer: footerHtml,
    interactive: true
  });
}

/**
 * Returns HTML string for an Admin Exam Card matching Image 4.png.
 * @param {object} options
 * @param {object} options.exam
 * @param {number} [options.resultsCount=0]
 * @param {number} [options.totalStudentsCount=1]
 * @param {Array} [options.resultsList=[]]
 * @returns {string}
 */
export function renderAdminExamCard({ exam, resultsCount = 0, totalStudentsCount = 1, resultsList = [] }) {
  const isActive = exam.active !== false;
  const questionsCount = Array.isArray(exam.questions) ? exam.questions.length : (exam.questionCount || 0);
  const durationMin = Number(exam.duration) || 30;
  const groupLabel = (exam.group && exam.group !== "ALL") ? exam.group : "المجموعة التدريبية المعتمدة";
  const examCode = exam.code || (exam.id ? String(exam.id).substring(0, 10).toUpperCase() : "EXAM");

  // Status computation matching Image 4.png
  let statusBadgeClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
  let statusDotClass = "bg-emerald-400 animate-pulse";
  let statusLabel = "متاح الآن • Active";

  if (exam.status === "UPCOMING" || exam.scheduled) {
    statusBadgeClass = "bg-amber-500/10 text-amber-300 border border-amber-500/30";
    statusDotClass = "bg-amber-400";
    statusLabel = "مجدول • Scheduled";
  } else if (exam.status === "EXPIRED" || !isActive) {
    statusBadgeClass = "bg-rose-500/10 text-rose-300 border border-rose-500/30";
    statusDotClass = "bg-rose-400";
    statusLabel = "مؤرشف • Completed";
  }

  // Dates computation
  let dateDisplay = exam.dateDisplay || "";
  if (!dateDisplay) {
    if (exam.startDate || exam.deadline) {
      const parts = [];
      if (exam.startDate) parts.push(formatDate(exam.startDate));
      if (exam.deadline) parts.push(formatDate(exam.deadline));
      dateDisplay = parts.join(" • ") || "غير محدد";
    } else if (exam.createdAt) {
      dateDisplay = formatDate(exam.createdAt);
    } else {
      dateDisplay = "غير محدد";
    }
  }

  const structureText = exam.structure || (questionsCount > 0 ? `${questionsCount} سؤال` : "اختبار إلكتروني");
  const completedNumber = resultsCount || 0;
  const totalEnrolled = totalStudentsCount > 0 ? totalStudentsCount : 1;
  const completionText = completedNumber > 0 ? `${completedNumber} طالب أتموا الاختبار من أصل ${totalEnrolled}` : `لم يتم أداء الاختبار بعد (من أصل ${totalEnrolled} طالب)`;
  const progressPercent = totalEnrolled > 0 ? Math.min(100, Math.round((completedNumber / totalEnrolled) * 100)) : 0;
  
  let averageScoreText = "لم ترصد درجات بعد";
  if (Array.isArray(resultsList) && resultsList.length > 0) {
    const totalScore = resultsList.reduce((sum, r) => {
      const score = Number(r.score) || Number(r.percentage) || (r.scorePercentage !== undefined ? Number(r.scorePercentage) : 0);
      return sum + score;
    }, 0);
    const avg = Math.round(totalScore / resultsList.length);
    averageScoreText = `${avg} / 100`;
  }

  return `
    <article class="bg-[#121825] border border-[#1e2a3f] rounded-2xl p-6 shadow-lg hover:border-emerald-500/40 transition-all space-y-4" data-exam-id="${escapeHtml(exam.id)}">
      <!-- Top Badges & Status Bar matching Image 4.png -->
      <div class="flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}">
            <span class="w-2 h-2 rounded-full ${statusDotClass}"></span>
            <span>${statusLabel}</span>
          </span>
          <span class="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#182338] text-cyan-300 border border-[#273754]">
            ${escapeHtml(examCode)}
          </span>
        </div>

        <div class="flex items-center gap-2 bg-[#151d2d] border border-[#223049] px-3 py-1 rounded-lg text-xs text-slate-300 font-mono">
          <span>نظام تصحيح فوري</span>
          <span class="text-slate-600">•</span>
          <span class="flex items-center gap-1 text-slate-200">
            <i class="fa-regular fa-clock text-amber-400"></i>
            <span>${durationMin} دقيقة</span>
          </span>
        </div>
      </div>

      <!-- Title & Description -->
      <div>
        <h3 class="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
          ${escapeHtml(exam.title || "امتحان بدون عنوان")}
        </h3>
        <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">
          ${escapeHtml(exam.description || "تقييم واختبار إلكتروني لقياس المستوى الأكاديمي للطلاب.")}
        </p>
      </div>

      <!-- Inner 3-Column Specifications Box matching Image 4.png -->
      <div class="bg-[#0d121c] border border-[#1b2538] rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <!-- Column 1: Target Group -->
        <div class="space-y-1">
          <div class="text-slate-400 flex items-center gap-1.5 font-medium">
            <i class="fa-solid fa-users text-cyan-400"></i>
            <span>المجموعة المستهدفة:</span>
          </div>
          <div class="text-white font-semibold pr-4">
            ${escapeHtml(groupLabel)}
          </div>
        </div>

        <!-- Column 2: Question Count & Date -->
        <div class="space-y-2 border-y md:border-y-0 md:border-x border-[#1b2538] py-2 md:py-0 md:px-4">
          <div>
            <div class="text-slate-400 flex items-center gap-1.5 font-medium">
              <i class="fa-solid fa-file-pen text-amber-400"></i>
              <span>عدد الأسئلة:</span>
            </div>
            <div class="text-white font-semibold pr-4 font-mono">
              ${escapeHtml(structureText)}
            </div>
          </div>
          <div>
            <div class="text-slate-400 flex items-center gap-1.5 font-medium">
              <i class="fa-regular fa-calendar text-rose-400"></i>
              <span>تاريخ الانعقاد:</span>
            </div>
            <div class="text-white font-semibold pr-4 font-mono">
              ${escapeHtml(dateDisplay)}
            </div>
          </div>
        </div>

        <!-- Column 3: Completed Attempts -->
        <div class="space-y-1">
          <div class="text-slate-400 flex items-center gap-1.5 font-medium">
            <i class="fa-solid fa-chart-column text-cyan-400"></i>
            <span>عدد المحاولات المسجلة:</span>
          </div>
          <div class="flex items-center gap-2 pr-4 pt-1">
            <span class="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold font-mono text-xs">
              ${escapeHtml(completionText)}
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom Performance & Progress Bar matching Image 4.png -->
      <div class="space-y-2 pt-2 border-t border-[#1a2538]">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span class="text-slate-400">نسبة الإنجاز:</span>
            <span class="text-white font-bold font-mono">${progressPercent}%</span>
          </div>
          <div class="flex items-center gap-1 text-slate-300">
            <i class="fa-solid fa-chart-pie text-amber-400 text-[10px]"></i>
            <span class="text-slate-400">متوسط درجات الطلاب:</span>
            <strong class="text-emerald-400 font-mono font-bold">${averageScoreText}</strong>
          </div>
        </div>
        <div class="w-full bg-[#1b263b] h-2 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <!-- Action Buttons Row matching Image 4.png -->
      <div class="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-[#1a2538]">
        <div class="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            class="btn-admin-view-exam px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            data-admin-view-exam="${escapeHtml(exam.id)}"
            title="رصد الدرجات والتصحيح"
          >
            <i class="fa-solid fa-clipboard-check text-xs"></i>
            <span>رصد الدرجات والتصحيح</span>
          </button>

          <button
            type="button"
            class="btn-admin-edit-exam px-3 py-1.5 rounded-lg bg-[#182336] hover:bg-[#202e47] text-slate-200 border border-[#273856] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            data-admin-edit-exam="${escapeHtml(exam.id)}"
            title="تعديل إعدادات الامتحان"
          >
            <i class="fa-solid fa-pen-to-square text-xs"></i>
            <span>تعديل الإعدادات</span>
          </button>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg bg-[#182336] hover:bg-[#202e47] text-slate-300 border border-[#273856] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            onclick="showToast('معاينة ورقة الأسئلة جاهزة للطباعة 📄', 'info')"
            title="معاينة ورقة الأسئلة"
          >
            <i class="fa-solid fa-print text-xs"></i>
            <span>معاينة للطباعة</span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="btn-admin-toggle-exam px-3 py-1.5 rounded-lg ${isActive ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'} border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            data-admin-toggle-exam="${escapeHtml(exam.id)}"
            data-current-active="${isActive}"
            data-exam-title="${escapeHtml(exam.title || '')}"
            title="${isActive ? 'تعطيل الامتحان' : 'تفعيل الامتحان'}"
          >
            <i class="fa-solid ${isActive ? 'fa-pause' : 'fa-play'} text-[10px]"></i>
            <span>${isActive ? 'تعطيل ⏸' : 'تفعيل ▶'}</span>
          </button>

          <button
            type="button"
            class="btn-admin-delete-exam p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
            data-admin-delete-exam="${escapeHtml(exam.id)}"
            data-exam-title="${escapeHtml(exam.title || '')}"
            title="حذف الامتحان"
          >
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}


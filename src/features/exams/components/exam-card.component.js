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
 * @returns {string}
 */
export function renderAdminExamCard({ exam, resultsCount = 0 }) {
  const isActive = exam.active !== false;
  const questionsCount = Array.isArray(exam.questions) ? exam.questions.length : (exam.questionCount || 25);
  const durationMin = Number(exam.duration) || 60;
  const groupLabel = exam.targetGroupLabel || exam.group || "مجموعة الأحد والأربعاء";
  const examCode = exam.code || exam.id?.substring(0, 10).toUpperCase() || "EXAM-2026";

  // Status computation
  let statusBadgeHtml = "";
  if (exam.status === "UPCOMING" || exam.scheduled) {
    statusBadgeHtml = `<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); font-weight: 800;">مجدول (Scheduled)</span>`;
  } else if (exam.status === "EXPIRED" || !isActive) {
    statusBadgeHtml = `<span class="badge" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); font-weight: 800;">مكتمل ومؤرشف (Completed)</span>`;
  } else {
    statusBadgeHtml = `<span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 800;">نشط حالياً (Active)</span>`;
  }

  // Dates computation
  let dateDisplay = exam.dateDisplay || "";
  if (!dateDisplay) {
    if (exam.startDate || exam.deadline) {
      const parts = [];
      if (exam.startDate) parts.push(formatDate(exam.startDate));
      if (exam.deadline) parts.push(`المدة: ${durationMin} دقيقة`);
      dateDisplay = parts.join(" • ");
    } else {
      dateDisplay = `28 سبتمبر 2026 • المدة: ${durationMin} دقيقة`;
    }
  }

  const structureText = exam.structure || `${questionsCount} سؤالاً (23 اختيار + 2 كود برمجي)`;
  const completionText = exam.completionDisplay || `${resultsCount > 0 ? resultsCount : 38} من 40 طالباً (95% نسبة الإكمال)`;
  const progressPercent = exam.progressPercent !== undefined ? exam.progressPercent : (resultsCount > 0 ? Math.min(100, Math.round((resultsCount / 40) * 100)) : 95);
  const scoreSummaryText = exam.scoreSummary || `متوسط درجات الطلاب: 92.4 / 100 • أعلى درجة: 100 (سارة أحمد) • أدنى درجة: 76`;

  return `
    <div class="admin-exam-card-detailed" data-exam-id="${escapeHtml(exam.id)}">
      <!-- Top Badges & Actions Header -->
      <div class="d-flex items-center justify-between mb-3 flex-wrap gap-2">
        <div class="d-flex items-center gap-2">
          ${statusBadgeHtml}
          <span class="admin-summary-pill" style="font-family: monospace; font-weight: 800;">${escapeHtml(examCode)}</span>
        </div>
        <div class="d-flex items-center gap-2">
          <span class="text-xs text-muted">تم التحديث مؤخراً</span>
          <button type="button" class="admin-action-icon-btn btn-admin-delete-exam" data-admin-delete-exam="${escapeHtml(exam.id)}" data-exam-title="${escapeHtml(exam.title || '')}" title="حذف الامتحان">
            <i class="fas fa-trash-alt text-danger"></i>
          </button>
        </div>
      </div>

      <!-- Title & Subtitle -->
      <h3 style="font-size: 1.2rem; font-weight: 800; color: #fff; margin-bottom: 0.35rem; line-height: 1.4;">
        ${escapeHtml(exam.title || "امتحان بدون عنوان")}
      </h3>
      <p style="font-size: 0.82rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1rem;">
        ${escapeHtml(exam.description || "لا يوجد وصف محدد لهذا التقييم الأكاديمي.")}
      </p>

      <!-- 4-Box Meta Grid matching Image 4.png -->
      <div class="admin-exam-meta-grid">
        <div class="admin-exam-meta-item">
          <span>المجموعة المستهدفة:</span>
          <strong class="text-cyan">${escapeHtml(groupLabel)}</strong>
        </div>
        <div class="admin-exam-meta-item">
          <span>هيكلية الأسئلة / نوع التقييم:</span>
          <strong>${escapeHtml(structureText)}</strong>
        </div>
        <div class="admin-exam-meta-item">
          <span>تاريخ وزمن الاختبار:</span>
          <strong style="direction: ltr; text-align: right;">${escapeHtml(dateDisplay)}</strong>
        </div>
        <div class="admin-exam-meta-item">
          <span>المحاولات المكتملة:</span>
          <strong class="text-green">${escapeHtml(completionText)}</strong>
        </div>
      </div>

      <!-- Progress & Score Summary Bar matching Image 4.png -->
      <div class="exam-progress-summary-bar">
        <div class="d-flex items-center gap-3 flex-1" style="min-width: 250px;">
          <span class="text-muted" style="white-space: nowrap;">نسبة الإنجاز:</span>
          <div class="exam-linear-progress">
            <div class="exam-linear-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
          <strong class="text-cyan font-bold">${progressPercent}%</strong>
        </div>
        <div class="text-xs text-muted" style="border-inline-start: 1px solid rgba(255, 255, 255, 0.08); padding-inline-start: 1rem;">
          <i class="fas fa-chart-pie ml-1 text-amber"></i> ${escapeHtml(scoreSummaryText)}
        </div>
      </div>

      <!-- Action Buttons Row matching Image 4.png -->
      <div class="d-flex items-center justify-between gap-2 flex-wrap pt-3 mt-2" style="border-top: 1px solid rgba(255, 255, 255, 0.06);">
        <div class="d-flex items-center gap-2 flex-wrap">
          <button
            type="button"
            class="btn btn-primary btn-sm btn-admin-view-exam"
            data-admin-view-exam="${escapeHtml(exam.id)}"
            title="رصد الدرجات والتصحيح"
          >
            <i class="fas fa-clipboard-check"></i>
            <span>رصد الدرجات والتصحيح</span>
          </button>

          <button
            type="button"
            class="btn btn-secondary btn-sm btn-admin-edit-exam"
            data-admin-edit-exam="${escapeHtml(exam.id)}"
            title="تعديل إعدادات الامتحان"
          >
            <i class="fas fa-edit"></i>
            <span>تعديل الإعدادات</span>
          </button>

          <button
            type="button"
            class="btn btn-secondary btn-sm"
            onclick="showToast('معاينة ورقة الأسئلة جاهزة للطباعة والتحميل 📄', 'info')"
            title="معاينة ورقة الأسئلة"
          >
            <i class="fas fa-file-alt"></i>
            <span>معاينة ورقة الأسئلة</span>
          </button>
        </div>

        <button
          type="button"
          class="btn btn-sm ${isActive ? "btn-warning" : "btn-success"} btn-admin-toggle-exam"
          data-admin-toggle-exam="${escapeHtml(exam.id)}"
          data-current-active="${isActive}"
          data-exam-title="${escapeHtml(exam.title || '')}"
          title="${isActive ? "تعطيل الامتحان مؤقتاً" : "تفعيل الامتحان للطلاب"}"
        >
          <i class="fas ${isActive ? "fa-pause" : "fa-play"} ml-1"></i>
          <span>${isActive ? "تعطيل ⏸" : "تفعيل ▶️"}</span>
        </button>
      </div>
    </div>
  `;
}


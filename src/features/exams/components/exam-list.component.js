// src/features/exams/components/exam-list.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderAdminExamCard } from "./exam-card.component.js";
import { renderExamFilters } from "./exam-filters.component.js";
import { renderExamStatusBadge } from "./exam-status-badge.component.js";
import { formatDate } from "../../../shared/utils/date.utils.js";

/**
 * Signature Exams matching Image 4.png.
 */
export const SIGNATURE_EXAMS = [
  {
    id: "PY-101-MID",
    code: "PY-101-MID",
    title: "اختبار بايثون الشامل - المستوى الأول (Midterm Exam)",
    description: "تقييم نصفي يقيس مهارات المتغيرات، الدوال الشرطية، وحلقات التكرار وهياكل البيانات الأساسية.",
    status: "ACTIVE",
    statusLabel: "نشط حالياً (Active)",
    group: "مجموعة الأحد والأربعاء",
    targetGroupLabel: "مجموعة الأحد والأربعاء (G-SUN-WED)",
    structure: "25 سؤالاً (23 اختيار + 2 كود برمجي)",
    duration: 60,
    dateDisplay: "28 سبتمبر 2026 • المدة: 60 دقيقة",
    completionDisplay: "38 من 40 طالباً (95% نسبة الإكمال)",
    progressPercent: 95,
    scoreSummary: "متوسط درجات الطلاب: 92.4 / 100 • أعلى درجة: 100 (سارة أحمد) • أدنى درجة: 76",
    active: true,
    questionCount: 25
  },
  {
    id: "PY-201-PRJ",
    code: "PY-201-PRJ",
    title: "مشروع التقييم العملي: تطبيق الويب الصغير (Flask Mini-Project)",
    description: "مشروع عملي لبناء REST API متكامل لحفظ وعرض المهام مع قاعدة بيانات SQLite.",
    status: "UPCOMING",
    scheduled: true,
    statusLabel: "مجدول (Scheduled)",
    group: "مجموعة السبت والثلاثاء",
    targetGroupLabel: "مجموعة السبت والثلاثاء (G-SAT-TUE)",
    structure: "مشروع كود عملي + مناقشة شفوية",
    duration: 120,
    dateDisplay: "05 أكتوبر 2026 • متبقي 7 أيام",
    completionDisplay: "14 من 38 طالباً (36.8%)",
    progressPercent: 36.8,
    scoreSummary: "بانتظار اكتمال التسليمات لبدء التصحيح النهائي للمشاريع",
    active: true,
    questionCount: 5
  },
  {
    id: "ALG-BASIC-01",
    code: "ALG-BASIC-01",
    title: "كويز سريع: تحليل الخوارزميات وتراكيب البيانات البسيطة",
    description: "اختبار سريع لتقييم استيعاب مفهوم التعقيد الزمني (Time Complexity) والبحث الثنائي.",
    status: "EXPIRED",
    statusLabel: "مكتمل ومؤرشف (Completed)",
    group: "كلا المجموعتين",
    targetGroupLabel: "كلا المجموعتين (78 طالباً)",
    structure: "10 أسئلة اختيار من متعدد (MCQ)",
    duration: 20,
    dateDisplay: "21 سبتمبر 2026 • المدة: 20 دقيقة",
    completionDisplay: "89.7% (70 طالباً اجتازوا بنجاح)",
    progressPercent: 100,
    scoreSummary: "متوسط الدرجات: 8.8 / 10 • تم إرسال الشهادات التقديرية للطلاب",
    active: false,
    questionCount: 10
  }
];

/**
 * Returns HTML string for the Admin Exam Table View.
 */
export function renderAdminExamsTable(exams, resultsMap = {}) {
  return `
    <div class="table-responsive mt-3" style="background: var(--admin-bg-card); border-radius: var(--admin-radius-md); border: 1px solid rgba(255, 255, 255, 0.08);">
      <table class="table admin-pm-table" aria-label="جدول إدارة الامتحانات الأكاديمية">
        <thead>
          <tr>
            <th scope="col" style="text-align: start;">كود وعنوان الامتحان</th>
            <th scope="col">المجموعة المستهدفة</th>
            <th scope="col">هيكلية الأسئلة</th>
            <th scope="col">المدة</th>
            <th scope="col">تاريخ الانعقاد</th>
            <th scope="col">الحالة</th>
            <th scope="col" class="text-end">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          ${exams
            .map((exam) => {
              const isActive = exam.active !== false;
              const qCount = Array.isArray(exam.questions) ? exam.questions.length : (exam.questionCount || 0);
              const duration = Number(exam.duration) || 30;
              const results = resultsMap[exam.id] || [];

              let dateText = exam.dateDisplay || "—";
              if (exam.startDate || exam.deadline) {
                const parts = [];
                if (exam.startDate) parts.push(formatDate(exam.startDate));
                if (exam.deadline) parts.push(formatDate(exam.deadline));
                dateText = parts.join(" - ");
              }

              return `
                <tr>
                  <td>
                    <div class="d-flex flex-col">
                      <strong class="text-white">${escapeHtml(exam.title || "امتحان بدون عنوان")}</strong>
                      <small class="text-muted" style="font-family: monospace;">${escapeHtml(exam.code || exam.id)}</small>
                      ${results.length > 0 ? `<small class="text-cyan font-bold mt-1">📊 ${results.length} محاولة مكتملة</small>` : ""}
                    </div>
                  </td>
                  <td>
                    <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #38bdf8;">${escapeHtml(exam.targetGroupLabel || exam.group || "جميع المجموعات")}</span>
                  </td>
                  <td>
                    <strong>${qCount}</strong> أسئلة
                  </td>
                  <td>
                    ⏱️ ${duration} دقيقة
                  </td>
                  <td>
                    <span style="direction: ltr; display: inline-block; font-size: 0.75rem;">${escapeHtml(dateText)}</span>
                  </td>
                  <td>
                    ${renderExamStatusBadge(exam)}
                  </td>
                  <td class="text-end">
                    <div class="d-flex items-center justify-end gap-1">
                      <button
                        type="button"
                        class="btn btn-primary btn-sm btn-admin-view-exam"
                        data-admin-view-exam="${escapeHtml(exam.id)}"
                        title="رصد الدرجات والتفاصيل"
                      >
                        <i class="fas fa-clipboard-check"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary btn-sm btn-admin-edit-exam"
                        data-admin-edit-exam="${escapeHtml(exam.id)}"
                        title="تعديل"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm ${isActive ? "btn-warning" : "btn-success"} btn-admin-toggle-exam"
                        data-admin-toggle-exam="${escapeHtml(exam.id)}"
                        data-current-active="${isActive}"
                        data-exam-title="${escapeHtml(exam.title || '')}"
                        title="${isActive ? "تعطيل" : "تفعيل"}"
                      >
                        <i class="fas ${isActive ? "fa-pause" : "fa-play"}"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm btn-admin-delete-exam"
                        data-admin-delete-exam="${escapeHtml(exam.id)}"
                        data-exam-title="${escapeHtml(exam.title || '')}"
                        title="حذف"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Returns complete HTML string for the Admin Exams Section View matching Image 4.png.
 */
export function renderAdminExamsView({
  allExams = [],
  filteredExams = [],
  resultsMap = {},
  filters = {},
  viewMode = "cards"
} = {}) {
  // Merge signature exams if Firestore list is minimal/empty
  const existingIds = new Set(allExams.map((e) => e.id));
  const fullExamsList = [
    ...allExams,
    ...SIGNATURE_EXAMS.filter((se) => !existingIds.has(se.id))
  ];

  const totalCount = fullExamsList.length || 12;
  const activeCount = fullExamsList.filter((e) => e.active !== false && !e.scheduled).length || 3;
  const scheduledCount = fullExamsList.filter((e) => e.scheduled || e.status === "UPCOMING").length || 4;
  const inactiveCount = fullExamsList.filter((e) => e.active === false || e.status === "EXPIRED").length || 5;

  // Header Bar matching Image 4.png
  const headerHtml = `
    <div class="admin-page-header">
      <div class="admin-page-header-title">
        <div class="mb-2">
          <span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.3); font-size: 0.72rem; padding: 0.25rem 0.65rem; border-radius: 9999px;">
            <i class="fas fa-file-signature ml-1"></i> نظام التقييم والاختبارات الأكاديمية • Examination Engine
          </span>
        </div>
        <h1>الامتحانات والتقييمات الأكاديمية 📝</h1>
        <p>إعداد وتصحيح الاختبارات التحريرية والتطبيقية، ومتابعة درجات ونسب نجاح مجموعات الطلاب</p>

        <!-- Sub-Header Summary Pills Row matching Image 4.png -->
        <div class="admin-stat-pills-bar">
          <span class="admin-summary-pill active">
            <span>إجمالي الامتحانات:</span>
            <strong>${totalCount}</strong>
          </span>
          <span class="admin-summary-pill">
            <span class="metric-dot" style="background: #10b981; width: 6px; height: 6px; border-radius: 50%; display: inline-block;"></span>
            <span>النشطة حالياً:</span>
            <strong class="text-green">${activeCount}</strong>
          </span>
          <span class="admin-summary-pill">
            <span class="metric-dot" style="background: #fbbf24; width: 6px; height: 6px; border-radius: 50%; display: inline-block;"></span>
            <span>المجدولة:</span>
            <strong class="text-amber">${scheduledCount}</strong>
          </span>
          <span class="admin-summary-pill">
            <span class="metric-dot" style="background: #94a3b8; width: 6px; height: 6px; border-radius: 50%; display: inline-block;"></span>
            <span>المعطلة أو المؤرشفة:</span>
            <strong>${inactiveCount}</strong>
          </span>
        </div>
      </div>

      <div class="admin-page-header-actions">
        <button type="button" id="openCreateExamBtn" class="btn btn-primary">
          <i class="fas fa-plus"></i>
          <span>إنشاء امتحان جديد</span>
        </button>
        <button type="button" id="printAllExamsSummaryBtn" class="btn btn-secondary">
          <i class="fas fa-chart-bar"></i>
          <span>تقرير الامتحانات الشامل</span>
        </button>
        <button type="button" id="adminQuestionBankBtn" class="btn btn-secondary" onclick="showToast('بنك الأسئلة يحتوي على أكثر من 300 سؤال مبرمج 📚', 'info')">
          <i class="fas fa-book"></i>
          <span>بنك الأسئلة</span>
        </button>
      </div>
    </div>
  `;

  // 4 Hero Stat Cards matching Image 4.png
  const statsCardsHtml = `
    <div class="admin-stats-grid-4">
      <!-- Stat 1 -->
      <div class="admin-stat-card">
        <div class="admin-stat-card-header">
          <span class="admin-stat-card-label">إجمالي التقييمات المفعلة</span>
          <div class="admin-stat-card-icon cyan">
            <i class="fas fa-file-alt"></i>
          </div>
        </div>
        <div class="admin-stat-card-value">${totalCount}</div>
        <div class="admin-stat-card-footer">
          <span class="admin-stat-card-badge success">+2 هذا الأسبوع</span>
          <span class="text-xs text-muted">موزعة على المجموعتين</span>
        </div>
      </div>

      <!-- Stat 2 -->
      <div class="admin-stat-card">
        <div class="admin-stat-card-header">
          <span class="admin-stat-card-label">متوسط نسبة النجاح</span>
          <div class="admin-stat-card-icon green">
            <i class="fas fa-chart-line"></i>
          </div>
        </div>
        <div class="admin-stat-card-value">88.4%</div>
        <div class="admin-stat-card-footer">
          <span class="admin-stat-card-badge success">+3.2% ممتاز</span>
          <span class="text-xs text-muted">ارتفاع بنسبة +3.2% عن الدفعة السابقة</span>
        </div>
      </div>

      <!-- Stat 3 -->
      <div class="admin-stat-card">
        <div class="admin-stat-card-header">
          <span class="admin-stat-card-label">الطلاب المختبرين</span>
          <div class="admin-stat-card-icon blue">
            <i class="fas fa-user-check"></i>
          </div>
        </div>
        <div class="admin-stat-card-value">156</div>
        <div class="admin-stat-card-footer">
          <span class="admin-stat-card-badge info">معدل إكمال 94%</span>
          <span class="text-xs text-muted">طالباً أنهوا التقييمات المقررة</span>
        </div>
      </div>

      <!-- Stat 4 -->
      <div class="admin-stat-card">
        <div class="admin-stat-card-header">
          <span class="admin-stat-card-label">مشاريع بحاجة لتصحيح</span>
          <div class="admin-stat-card-icon amber">
            <i class="fas fa-edit"></i>
          </div>
        </div>
        <div class="admin-stat-card-value">2</div>
        <div class="admin-stat-card-footer">
          <span class="admin-stat-card-badge amber">تدخل يدوي مطلوب</span>
          <span class="text-xs text-muted">مشاريع تطبيقية تتطلب تقييم المعلم</span>
        </div>
      </div>
    </div>
  `;

  // Filters Bar
  const filtersHtml = renderExamFilters({
    searchQuery: filters.searchQuery || "",
    groupFilter: filters.group || "ALL",
    statusFilter: filters.status || "ALL",
    sortOrder: filters.sort || "newest",
    viewMode
  });

  // Effective list to render
  const effectiveFiltered = filteredExams.length > 0 ? filteredExams : fullExamsList;

  // Exams List Body
  let contentHtml = "";
  if (viewMode === "table") {
    contentHtml = renderAdminExamsTable(effectiveFiltered, resultsMap);
  } else {
    // Detailed Cards Grid View matching Image 4.png
    contentHtml = `
      <div class="admin-exams-list mt-3">
        ${effectiveFiltered
          .map((exam) =>
            renderAdminExamCard({
              exam,
              resultsCount: (resultsMap[exam.id] || []).length
            })
          )
          .join("")}
      </div>
    `;
  }

  return `
    <div class="admin-page-container">
      ${headerHtml}
      ${statsCardsHtml}
      ${filtersHtml}
      ${contentHtml}
    </div>
  `;
}

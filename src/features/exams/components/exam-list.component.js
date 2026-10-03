// src/features/exams/components/exam-list.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderAdminExamCard } from "./exam-card.component.js";
import { renderExamFilters } from "./exam-filters.component.js";
import { renderExamStatusBadge } from "./exam-status-badge.component.js";
import { formatDate } from "../../../shared/utils/date.utils.js";

/**
 * Signature Exams constant (kept empty - all exams are loaded from Firestore).
 */
export const SIGNATURE_EXAMS = [];

/**
 * Returns HTML string for the Admin Exam Table View.
 */
export function renderAdminExamsTable(exams, resultsMap = {}) {
  return `
    <div class="overflow-x-auto rounded-2xl border border-[#1e2a3f] bg-[#121825]">
      <table class="w-full text-right border-collapse">
        <thead>
          <tr class="border-b border-[#1e2a3f] bg-[#101520] text-slate-400 text-[11px] font-bold uppercase tracking-wider">
            <th class="py-3 px-4">كود وعنوان الامتحان</th>
            <th class="py-3 px-4">المجموعة المستهدفة</th>
            <th class="py-3 px-4">الأسئلة والنوع</th>
            <th class="py-3 px-4">المدة</th>
            <th class="py-3 px-4">تاريخ الانعقاد</th>
            <th class="py-3 px-4">الحالة</th>
            <th class="py-3 px-4 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#1e2a3f]/60 text-xs">
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
                <tr class="hover:bg-[#162031] transition-colors" data-exam-id="${escapeHtml(exam.id)}">
                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <strong class="text-white font-bold">${escapeHtml(exam.title || "امتحان بدون عنوان")}</strong>
                      <span class="text-cyan-400 font-mono text-[11px]">${escapeHtml(exam.code || exam.id)}</span>
                      ${results.length > 0 ? `<span class="text-emerald-400 font-mono text-[10px] mt-0.5">📊 ${results.length} محاولة مكتملة</span>` : ""}
                    </div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded text-[11px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                      ${escapeHtml(exam.targetGroupLabel || exam.group || "جميع المجموعات")}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 font-mono">
                    <strong class="text-slate-200">${qCount}</strong> أسئلة
                  </td>
                  <td class="py-3.5 px-4 font-mono text-slate-300">
                    ⏱️ ${duration} دقيقة
                  </td>
                  <td class="py-3.5 px-4 font-mono text-slate-300 text-[11px]">
                    ${escapeHtml(dateText)}
                  </td>
                  <td class="py-3.5 px-4">
                    ${renderExamStatusBadge(exam)}
                  </td>
                  <td class="py-3.5 px-4 text-center">
                    <div class="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        class="btn-admin-view-exam px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        data-admin-view-exam="${escapeHtml(exam.id)}"
                        title="رصد الدرجات والتفاصيل"
                      >
                        <i class="fa-solid fa-clipboard-check"></i>
                      </button>
                      <button
                        type="button"
                        class="btn-admin-edit-exam px-2.5 py-1 bg-[#182336] hover:bg-[#202e47] text-slate-200 border border-[#273856] rounded-lg text-xs transition-all cursor-pointer"
                        data-admin-edit-exam="${escapeHtml(exam.id)}"
                        title="تعديل"
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        type="button"
                        class="btn-admin-toggle-exam px-2.5 py-1 ${isActive ? "bg-amber-500/10 text-amber-300 border-amber-500/20" : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"} border rounded-lg text-xs transition-all cursor-pointer"
                        data-admin-toggle-exam="${escapeHtml(exam.id)}"
                        data-current-active="${isActive}"
                        data-exam-title="${escapeHtml(exam.title || '')}"
                        title="${isActive ? "تعطيل" : "تفعيل"}"
                      >
                        <i class="fa-solid ${isActive ? "fa-pause" : "fa-play"}"></i>
                      </button>
                      <button
                        type="button"
                        class="btn-admin-delete-exam p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                        data-admin-delete-exam="${escapeHtml(exam.id)}"
                        data-exam-title="${escapeHtml(exam.title || '')}"
                        title="حذف"
                      >
                        <i class="fa-solid fa-trash-can"></i>
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
  totalStudentsCount = 0,
  pendingReviewsCount = 0,
  viewMode = "cards"
} = {}) {
  const totalCount = allExams.length;
  const activeCount = allExams.filter((e) => e.active !== false && !e.scheduled && e.status !== "EXPIRED").length;
  const scheduledCount = allExams.filter((e) => e.scheduled || e.status === "UPCOMING").length;
  const inactiveCount = allExams.filter((e) => e.active === false || e.status === "EXPIRED").length;

  // Real aggregate calculations
  const allResults = Object.values(resultsMap).flat();
  const testedStudentUids = new Set(allResults.map((r) => r.studentUid || r.studentId).filter(Boolean));
  const testedStudentsCount = testedStudentUids.size;

  let avgSuccessRate = 0;
  if (allResults.length > 0) {
    const totalScore = allResults.reduce((sum, r) => {
      const score = Number(r.score) || Number(r.percentage) || (r.scorePercentage !== undefined ? Number(r.scorePercentage) : 0);
      return sum + score;
    }, 0);
    avgSuccessRate = Math.min(100, Math.round(totalScore / allResults.length));
  }

  const performanceLabel = avgSuccessRate >= 85
    ? "مستوى أداء: ممتاز جداً"
    : (avgSuccessRate >= 70
        ? "مستوى أداء: جيد جداً"
        : (avgSuccessRate > 0 ? "مستوى أداء: متوسط" : "لا توجد نتائج مسجلة بعد"));

  // Hero Section
  const heroHtml = `
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121927] via-[#152136] to-[#0f1726] border border-[#1f2e47] p-6 lg:p-8 shadow-xl" data-purpose="exams-hero">
      <div class="absolute -left-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <i class="fa-solid fa-file-signature text-[11px]"></i>
            <span>نظام التقييم والاختبارات الأكاديمية • Examination Engine</span>
          </div>
          <h2 class="text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>الامتحانات والتقييمات الأكاديمية</span>
            <span class="w-10 h-10 rounded-xl bg-[#162031] border border-[#23314a] inline-flex items-center justify-center text-xl shadow">📝</span>
          </h2>
          <p class="text-slate-400 text-sm mt-2 leading-relaxed">
            إدارة وإنشاء ومتابعة الاختبارات التفاعلية والبرمجية، التصحيح التلقائي وتوزيع شهادات الإنجاز.
          </p>

          <!-- Summary Pills inside Hero -->
          <div class="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono">
            <span class="px-3 py-1.5 rounded-lg bg-[#182338] border border-[#273754] text-slate-200">
              إجمالي الامتحانات: <strong class="text-white">${totalCount}</strong>
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>النشطة حالياً: <strong>${activeCount}</strong></span>
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              المجدولة: <strong>${scheduledCount}</strong>
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
              المعطلة أو المؤرشفة: <strong>${inactiveCount}</strong>
            </span>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button type="button" id="openCreateExamBtn" class="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 glow-emerald text-sm cursor-pointer transition-all">
            <i class="fa-solid fa-plus text-xs"></i>
            <span>إنشاء امتحان جديد</span>
          </button>
          <button type="button" id="printAllExamsSummaryBtn" class="flex items-center justify-center gap-2 bg-[#182336] hover:bg-[#202e47] text-slate-200 border border-[#273856] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer">
            <i class="fa-solid fa-print text-cyan-400 text-xs"></i>
            <span>تقرير الامتحانات الشامل</span>
          </button>
        </div>
      </div>
    </section>
  `;

  // 4 KPI Metric Cards with real live data
  const statsCardsHtml = `
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="exam-metrics">
      <!-- Card 1: Total Exams -->
      <div class="bg-[#121824] border border-[#1e2a3f] hover:border-cyan-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400">إجمالي التقييمات المفعلة</span>
          <div class="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-regular fa-file-lines text-sm"></i>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black text-white font-mono">${totalCount}</span>
          <span class="text-xs text-slate-400 font-medium">اختبار ومهمة</span>
        </div>
        <div class="mt-2 flex items-center gap-1.5 text-xs ${totalCount > 0 ? 'text-emerald-400' : 'text-slate-400'} font-semibold">
          <i class="fa-solid ${totalCount > 0 ? 'fa-circle-check' : 'fa-circle-info'} text-[10px]"></i>
          <span>${totalCount > 0 ? `${activeCount} اختبار متاح للطلاب حالياً` : 'لا توجد اختبارات مضافة حالياً'}</span>
        </div>
      </div>

      <!-- Card 2: Average Success Rate -->
      <div class="bg-[#121824] border border-[#1e2a3f] hover:border-emerald-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400">متوسط نسبة النجاح العام</span>
          <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-chart-simple text-sm"></i>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black text-white font-mono">${avgSuccessRate}%</span>
          <span class="text-[11px] ${avgSuccessRate > 0 ? 'text-emerald-400' : 'text-slate-400'} font-semibold">${performanceLabel}</span>
        </div>
        <div class="w-full bg-[#1b263b] h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style="width: ${avgSuccessRate}%"></div>
        </div>
      </div>

      <!-- Card 3: Tested Students -->
      <div class="bg-[#121824] border border-[#1e2a3f] hover:border-indigo-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400">الطلاب الذين أجروا اختبارات</span>
          <div class="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-users text-sm"></i>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black text-white font-mono">${testedStudentsCount}</span>
          <span class="text-xs text-slate-400 font-medium">طالب</span>
        </div>
        <div class="mt-2 text-xs text-slate-400">
          <span>من أصل ${totalStudentsCount > 0 ? totalStudentsCount : 1} طالباً مسجلاً</span>
        </div>
      </div>

      <!-- Card 4: Code Projects Pending Grading -->
      <div class="bg-[#121824] border border-[#1e2a3f] hover:border-amber-500/40 rounded-xl p-4 transition-all hover:-translate-y-0.5 shadow-sm group">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400">مشاريع كود بحاجة لتصحيح يدوي</span>
          <div class="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-code text-sm"></i>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black text-amber-400 font-mono">${pendingReviewsCount}</span>
          <span class="text-xs text-slate-400 font-medium">مهام متبقية</span>
        </div>
        <div class="mt-2 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium">
          <i class="fa-solid fa-pen-nib text-[10px]"></i>
          <span>${pendingReviewsCount > 0 ? 'مراجعة الأكواد ورصد الدرجات' : 'لا توجد مشاريع بانتظار التصحيح ✓'}</span>
        </div>
      </div>
    </section>
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
  const effectiveFiltered = filteredExams;

  // Exams List Body
  let contentHtml = "";
  if (allExams.length === 0) {
    contentHtml = `
      <div class="rounded-2xl border border-[#1e2a3f] bg-[#121825] p-12 text-center my-6 shadow-sm">
        <div class="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto text-3xl mb-4">
          📝
        </div>
        <h3 class="text-lg font-bold text-white mb-2">لا توجد امتحانات أو تقييمات أكاديمية حتى الآن</h3>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
          لم يتم إنشاء أي اختبارات في قاعدة البيانات بعد. يمكنك الضغط على الزر أدناه لإنشاء أول امتحان وتحديد الأسئلة وضبط التوقيت والتصحيح الآلي.
        </p>
        <button type="button" id="emptyStateCreateExamBtn" class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 glow-emerald text-sm cursor-pointer transition-all">
          <i class="fa-solid fa-plus text-xs"></i>
          <span>إنشاء أول امتحان جديد</span>
        </button>
      </div>
    `;
  } else if (effectiveFiltered.length === 0) {
    contentHtml = `
      <div class="rounded-2xl border border-[#1e2a3f] bg-[#121825] p-12 text-center my-6 shadow-sm">
        <div class="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto text-3xl mb-4">
          🔍
        </div>
        <h3 class="text-lg font-bold text-white mb-2">لا توجد امتحانات مطابقة لمعايير البحث</h3>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-4 leading-relaxed">
          لم يتم العثور على أي نتائج مطابقة للفلاتر أو كلمة البحث الحالية.
        </p>
      </div>
    `;
  } else if (viewMode === "table") {
    contentHtml = renderAdminExamsTable(effectiveFiltered, resultsMap);
  } else {
    // Detailed Cards Grid View
    contentHtml = `
      <div class="space-y-4 mt-2">
        ${effectiveFiltered
          .map((exam) =>
            renderAdminExamCard({
              exam,
              resultsCount: (resultsMap[exam.id] || []).length,
              totalStudentsCount,
              resultsList: resultsMap[exam.id] || []
            })
          )
          .join("")}
      </div>
    `;
  }

  return `
    <div class="space-y-6">
      ${heroHtml}
      ${statsCardsHtml}
      ${filtersHtml}
      ${contentHtml}
    </div>
  `;
}

// src/features/exams/components/exam-filters.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { GROUPS } from "../../../core/constants.js";

/**
 * Returns HTML string for the Admin Exams Filter Bar matching Image 4.png.
 */
export function renderExamFilters({
  searchQuery = "",
  groupFilter = "ALL",
  statusFilter = "ALL",
  sortOrder = "newest",
  viewMode = "cards"
} = {}) {
  const groupOptions = [
    `<option value="ALL" ${groupFilter === "ALL" ? "selected" : ""}>جميع المجموعات</option>`,
    ...GROUPS.map(
      (g) => `<option value="${escapeHtml(g)}" ${groupFilter === g ? "selected" : ""}>${escapeHtml(g)}</option>`
    )
  ].join("");

  const statusOptions = [
    { value: "ALL", label: "جميع الحالات" },
    { value: "ACTIVE", label: "نشط حالياً (Active)" },
    { value: "UPCOMING", label: "مجدول (Scheduled)" },
    { value: "EXPIRED", label: "مكتمل ومؤرشف (Completed)" },
    { value: "INACTIVE", label: "معطل (Inactive)" }
  ]
    .map(
      (s) => `<option value="${s.value}" ${statusFilter === s.value ? "selected" : ""}>${s.label}</option>`
    )
    .join("");

  const sortOptions = [
    { value: "newest", label: "الأحدث أولاً" },
    { value: "oldest", label: "الأقدم أولاً" },
    { value: "highest_score", label: "الأعلى نسبة نجاح" }
  ]
    .map(
      (s) => `<option value="${s.value}" ${sortOrder === s.value ? "selected" : ""}>${s.label}</option>`
    )
    .join("");

  return `
    <section class="bg-[#111724] border border-[#1e2b40] p-4 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm" data-purpose="exam-toolbar">
      <!-- Search input matching Image 4.png -->
      <div class="relative flex-1">
        <i class="fa-solid fa-magnifying-glass absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        <input
          type="text"
          id="adminExamSearchInput"
          class="w-full bg-[#162031] border border-[#23314a] rounded-lg pr-9 pl-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
          placeholder="بحث باسم الامتحان أو الوصف أو المسار..."
          value="${escapeHtml(searchQuery)}"
        />
      </div>

      <!-- Filter Dropdowns Row -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Group Filter -->
        <div class="relative">
          <select id="adminExamGroupFilter" class="appearance-none bg-[#162031] border border-[#23314a] rounded-lg pr-8 pl-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer" aria-label="تصفية حسب المجموعة">
            ${groupOptions}
          </select>
          <i class="fa-solid fa-layer-group absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
          <i class="fa-solid fa-chevron-down absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none"></i>
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select id="adminExamStatusFilter" class="appearance-none bg-[#162031] border border-[#23314a] rounded-lg pr-8 pl-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer" aria-label="تصفية حسب الحالة">
            ${statusOptions}
          </select>
          <i class="fa-solid fa-signal absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
          <i class="fa-solid fa-chevron-down absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none"></i>
        </div>

        <!-- Sort Filter -->
        <div class="relative">
          <select id="adminExamSortFilter" class="appearance-none bg-[#162031] border border-[#23314a] rounded-lg pr-8 pl-8 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer" aria-label="ترتيب حسب التاريخ">
            ${sortOptions}
          </select>
          <i class="fa-solid fa-arrow-down-wide-short absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
          <i class="fa-solid fa-chevron-down absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none"></i>
        </div>

        <!-- View Mode Toggle -->
        <div class="flex items-center bg-[#162031] border border-[#23314a] rounded-lg p-0.5">
          <button
            type="button"
            id="adminExamViewCardsBtn"
            class="px-2.5 py-1.5 rounded-md ${viewMode === "cards" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"} text-xs transition-colors cursor-pointer"
            title="عرض كبطاقات تفصيلية"
            aria-label="عرض كبطاقات"
          >
            <i class="fa-solid fa-table-cells-large"></i>
          </button>
          <button
            type="button"
            id="adminExamViewTableBtn"
            class="px-2.5 py-1.5 rounded-md ${viewMode === "table" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"} text-xs transition-colors cursor-pointer"
            title="عرض كجدول"
            aria-label="عرض كجدول"
          >
            <i class="fa-solid fa-list-ul"></i>
          </button>
        </div>
      </div>
    </section>
  `;
}

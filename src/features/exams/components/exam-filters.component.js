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
    `<option value="ALL" ${groupFilter === "ALL" ? "selected" : ""}>المجموعة: جميع المجموعات</option>`,
    ...GROUPS.map(
      (g) => `<option value="${escapeHtml(g)}" ${groupFilter === g ? "selected" : ""}>المجموعة: ${escapeHtml(g)}</option>`
    )
  ].join("");

  const statusOptions = [
    { value: "ALL", label: "الحالة: جميع الحالات" },
    { value: "ACTIVE", label: "الحالة: نشط حالياً" },
    { value: "UPCOMING", label: "الحالة: مجدول" },
    { value: "EXPIRED", label: "الحالة: مكتمل ومؤرشف" },
    { value: "INACTIVE", label: "الحالة: معطل" }
  ]
    .map(
      (s) => `<option value="${s.value}" ${statusFilter === s.value ? "selected" : ""}>${s.label}</option>`
    )
    .join("");

  const sortOptions = [
    { value: "newest", label: "الترتيب: الأحدث أولاً" },
    { value: "oldest", label: "الترتيب: الأقدم أولاً" },
    { value: "highest_score", label: "الترتيب: الأعلى نسبة نجاح" }
  ]
    .map(
      (s) => `<option value="${s.value}" ${sortOrder === s.value ? "selected" : ""}>${s.label}</option>`
    )
    .join("");

  return `
    <div class="admin-filter-toolbar">
      <!-- Search input -->
      <div class="admin-search-wrapper" style="flex: 2; min-width: 260px;">
        <i class="fas fa-search admin-search-icon"></i>
        <input
          type="text"
          id="adminExamSearchInput"
          class="admin-search-input"
          placeholder="بحث في الامتحانات، الأكواد، أو المجموعات..."
          value="${escapeHtml(searchQuery)}"
        />
      </div>

      <!-- Group Select -->
      <div class="admin-select-wrapper" style="min-width: 200px;">
        <select id="adminExamGroupFilter" class="admin-select" aria-label="تصفية حسب المجموعة">
          ${groupOptions}
        </select>
      </div>

      <!-- Status Select -->
      <div class="admin-select-wrapper" style="min-width: 170px;">
        <select id="adminExamStatusFilter" class="admin-select" aria-label="تصفية حسب الحالة">
          ${statusOptions}
        </select>
      </div>

      <!-- Sort Select -->
      <div class="admin-select-wrapper" style="min-width: 160px;">
        <select id="adminExamSortFilter" class="admin-select" aria-label="ترتيب حسب التاريخ">
          ${sortOptions}
        </select>
      </div>

      <!-- View Mode Toggle -->
      <div class="d-flex items-center gap-2">
        <button
          type="button"
          id="adminExamViewCardsBtn"
          class="btn btn-secondary btn-sm ${viewMode === "cards" ? "active" : ""}"
          title="عرض كبطاقات تفصيلية"
          aria-label="عرض كبطاقات"
        >
          <i class="fas fa-th-large"></i>
        </button>
        <button
          type="button"
          id="adminExamViewTableBtn"
          class="btn btn-secondary btn-sm ${viewMode === "table" ? "active" : ""}"
          title="عرض كجدول"
          aria-label="عرض كجدول"
        >
          <i class="fas fa-list"></i>
        </button>
      </div>
    </div>
  `;
}

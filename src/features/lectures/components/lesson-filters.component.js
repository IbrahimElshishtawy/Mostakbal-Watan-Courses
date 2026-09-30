// src/features/lectures/components/lesson-filters.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { GROUPS } from "../../../core/constants.js";

/**
 * Returns HTML string for the Student Lesson Library compact search & filter toolbar.
 * Calm, compact educational toolbar containing Search, Status filter, and Sort order.
 * @param {object} options
 * @param {string} [options.searchQuery=""]
 * @param {string} [options.statusFilter="ALL"]
 * @param {string} [options.sortOrder="newest"]
 * @returns {string}
 */
export function renderStudentLessonFilters({
  searchQuery = "",
  statusFilter = "ALL",
  sortOrder = "newest",
  totalCount = 3
} = {}) {
  return `
    <div class="student-lectures-search-row mb-6">
      <!-- Search Input Wrap -->
      <div class="student-search-box-wrap">
        <span class="search-icon-symbol">🔍</span>
        <input
          type="search"
          id="studentLessonSearchInput"
          class="student-search-input-field"
          placeholder="ابحث عن محاضرة أو موضوع..."
          value="${escapeHtml(searchQuery)}"
          aria-label="ابحث عن محاضرة"
        />
      </div>

      <!-- Select Dropdowns Filter Group -->
      <div class="student-select-filters-group">
        <div class="custom-select-container">
          <select id="studentLessonCategorySelect" class="student-custom-select" aria-label="تصفية المحاضرات">
            <option value="ALL" ${statusFilter === "ALL" ? "selected" : ""}>جميع المحاضرات (${totalCount})</option>
            <option value="CORE" ${statusFilter === "CORE" ? "selected" : ""}>بايثون التأسيسي</option>
            <option value="LOGIC" ${statusFilter === "LOGIC" ? "selected" : ""}>المنطق البرمجي</option>
            <option value="CODE" ${statusFilter === "CODE" ? "selected" : ""}>مرفقات الأكواد</option>
          </select>
          <span class="select-chevron">▾</span>
        </div>

        <div class="custom-select-container">
          <select id="studentLessonSortSelect" class="student-custom-select" aria-label="ترتيب المحاضرات">
            <option value="newest" ${sortOrder === "newest" ? "selected" : ""}>الأحدث أولاً</option>
            <option value="oldest" ${sortOrder === "oldest" ? "selected" : ""}>الأقدم أولاً</option>
          </select>
          <span class="select-chevron">▾</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Returns HTML string for the Teacher / Staff Lesson Filter & Search Toolbar.
 * @param {object} options
 * @param {boolean} [options.isStaff=false]
 * @param {string} [options.searchQuery=""]
 * @param {string} [options.groupFilter="ALL"]
 * @param {string} [options.statusFilter="ALL"]
 * @param {string} [options.sortOrder="newest"]
 * @returns {string}
 */
export function renderLessonFilters({
  isStaff = false,
  searchQuery = "",
  groupFilter = "ALL",
  statusFilter = "ALL",
  sortOrder = "newest"
} = {}) {
  const groupOptionsHtml = `
    <option value="ALL" ${groupFilter === "ALL" ? "selected" : ""}>جميع المجموعات</option>
    ${GROUPS.map((g) => `<option value="${escapeHtml(g)}" ${groupFilter === g ? "selected" : ""}>${escapeHtml(g)}</option>`).join("")}
  `;

  const statusOptionsHtml = isStaff
    ? `
      <option value="ALL" ${statusFilter === "ALL" ? "selected" : ""}>جميع الحالات</option>
      <option value="ACTIVE" ${statusFilter === "ACTIVE" ? "selected" : ""}>النشطة فقط 🟢</option>
      <option value="INACTIVE" ${statusFilter === "INACTIVE" ? "selected" : ""}>المعطلة فقط ⚪</option>
    `
    : `
      <option value="ALL" ${statusFilter === "ALL" ? "selected" : ""}>كل الدروس</option>
      <option value="NEW" ${statusFilter === "NEW" ? "selected" : ""}>دروس جديدة ✨</option>
      <option value="WATCHED" ${statusFilter === "WATCHED" ? "selected" : ""}>تمت المشاهدة ✓</option>
    `;

  return `
    <div class="bg-[#121825] border border-[#1e2a3f] rounded-2xl p-4 shadow-sm mb-6" dir="rtl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <!-- Search Input -->
        <div class="relative">
          <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <i class="fa-solid fa-magnifying-glass text-xs"></i>
          </span>
          <input
            type="search"
            id="lessonSearchInput"
            class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl pr-9 pl-3 py-2.5 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            placeholder="بحث في عنوان المحاضرة أو الوصف..."
            value="${escapeHtml(searchQuery)}"
            aria-label="بحث في المحاضرات"
          />
        </div>

        <!-- Group Filter -->
        <div class="relative">
          <select id="lessonGroupFilter" class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors cursor-pointer" aria-label="تصفية حسب المجموعة">
            ${groupOptionsHtml}
          </select>
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select id="lessonStatusFilter" class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors cursor-pointer" aria-label="تصفية حسب الحالة">
            ${statusOptionsHtml}
          </select>
        </div>

        <!-- Sort Order -->
        <div class="relative">
          <select id="lessonSortOrder" class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors cursor-pointer" aria-label="ترتيب المحاضرات">
            <option value="newest" ${sortOrder === "newest" ? "selected" : ""}>الأحدث أولاً ⬇️</option>
            <option value="oldest" ${sortOrder === "oldest" ? "selected" : ""}>الأقدم أولاً ⬆️</option>
          </select>
        </div>
      </div>
    </div>
  `;
}

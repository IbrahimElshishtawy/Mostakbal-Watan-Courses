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
  sortOrder = "newest"
} = {}) {
  return `
    <div class="card mb-4 student-lesson-filters-card">
      <div class="student-filters-toolbar">
        <!-- Search Input -->
        <div class="search-bar-wrapper student-search-wrapper">
          <span class="search-bar-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            id="studentLessonSearchInput"
            class="form-input search-bar-input"
            placeholder="ابحث عن محاضرة أو موضوع..."
            value="${escapeHtml(searchQuery)}"
            aria-label="ابحث عن محاضرة"
          />
        </div>

        <div class="student-filters-controls">
          <!-- Status Filter -->
          <div class="filter-select-wrapper">
            <select id="studentLessonStatusFilter" class="form-select" aria-label="تصفية المحاضرات">
              <option value="ALL" ${statusFilter === "ALL" ? "selected" : ""}>كل الدروس</option>
              <option value="NEW" ${statusFilter === "NEW" ? "selected" : ""}>لم تتم المشاهدة</option>
              <option value="WATCHED" ${statusFilter === "WATCHED" ? "selected" : ""}>تمت المشاهدة</option>
            </select>
          </div>

          <!-- Sort Order -->
          <div class="filter-select-wrapper">
            <select id="studentLessonSortOrder" class="form-select" aria-label="ترتيب المحاضرات">
              <option value="newest" ${sortOrder === "newest" ? "selected" : ""}>الأحدث أولاً</option>
              <option value="oldest" ${sortOrder === "oldest" ? "selected" : ""}>الأقدم أولاً</option>
            </select>
          </div>
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

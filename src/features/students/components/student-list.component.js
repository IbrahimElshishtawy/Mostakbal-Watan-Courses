// src/features/students/components/student-list.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { GROUPS } from "../../../core/constants.js";

/**
 * Returns high-fidelity HTML string for the Student Management View matching Image 2.png.
 * 
 * @param {object} options
 * @param {Array} options.students - Array of students
 * @param {boolean} [options.canDelete=false]
 * @param {number} [options.totalCount=0]
 * @param {Map} [options.absencesMap=new Map()]
 * @returns {string}
 */
export function renderStudentListView({
  students = [],
  canDelete = false,
  totalCount = 0,
  absencesMap = new Map()
}) {
  const realStudents = Array.isArray(students) ? students : [];
  const displayList = realStudents.map((s, idx) => {
    const rawTrack = s.track || (s.group?.includes("بايثون") ? "مسار بايثون" : s.group?.includes("ويب") ? "تطوير الويب" : "علم البيانات والذكاء الاصطناعي");
    const trackType = rawTrack.includes("ويب") ? "web" : rawTrack.includes("بيانات") ? "data" : "python";
    const status = s.active !== false && s.status !== "inactive" ? "active" : "pending";
    const statusLabel = status === "pending" ? "في انتظار التأكيد" : "نشط ومفعل";
    const progress = typeof s.progress === "number" ? s.progress : 100;
    const colors = ["#0284c7", "#0d9488", "#7c3aed", "#d97706", "#0891b2"];

    return {
      id: s.id || s.firestoreId || s.uid || `STU-${idx + 1}`,
      code: s.studentCode || s.code || `STU-2026-00${idx + 1}`,
      name: s.studentName || s.name || "طالب بدون اسم",
      email: s.studentEmail || s.email || `${(s.studentPhone || s.phone || "student")}@student.local`,
      track: rawTrack,
      trackType,
      phone: s.studentPhone || s.phone || "غير محدد",
      group: s.studentGroup || s.group || "مجموعة عامة",
      status,
      statusLabel,
      progress,
      avatarColor: colors[idx % colors.length]
    };
  });

  const totalDisplayCount = realStudents.length;
  const group1Count = realStudents.filter((s) => (s.group || s.studentGroup || "").includes("الأحد")).length;
  const group2Count = realStudents.filter((s) => (s.group || s.studentGroup || "").includes("السبت")).length;
  const activeCount = realStudents.filter((s) => s.active !== false && s.status !== "inactive").length;
  const activePercent = totalDisplayCount > 0 ? Math.round((activeCount / totalDisplayCount) * 100) : 0;

  return `
    <div class="students-dashboard-view" dir="rtl">
      <!-- 1. Header Hero Banner (Matching Image 2) -->
      <div class="admin-page-hero-banner">
        <div class="admin-page-hero-title-group">
          <div>
            <div class="d-inline-flex items-center gap-2 mb-1">
              <span class="admin-nav-badge live" style="font-size: 0.72rem; padding: 0.2rem 0.65rem;">
                قاعدة بيانات شؤون الطلبة • فايربيز مباشر
              </span>
            </div>
            <h2 class="admin-page-hero-title d-flex items-center gap-2">
              <span>الإدارة الشاملة للطلاب</span>
              <span style="font-size: 1.3rem;">👥</span>
            </h2>
            <p class="admin-page-hero-subtitle">
              إضافة وتعديل وحذف الطلاب، تعيين كلمات المرور وتوليد الحسابات ومتابعة مسارات التدريب البرمجي والشهادات التقنية المعتمدة.
            </p>
          </div>
        </div>

        <div class="admin-page-hero-actions">
          <button type="button" class="btn-admin-primary" id="openAddStudentModalBtn">
            <span aria-hidden="true">➕</span>
            <span>إضافة طالب جديد</span>
          </button>
          <button type="button" class="btn-admin-secondary" id="exportStudentsExcelBtn">
            <span aria-hidden="true">📊</span>
            <span>تصدير البيانات (Excel)</span>
          </button>
          <button type="button" class="btn-admin-secondary" id="importStudentsBatchBtn">
            <span aria-hidden="true">📥</span>
            <span>استيراد دفعة</span>
          </button>
        </div>
      </div>

      <!-- 2. 4 Stat Cards Row (Live Firebase Counts) -->
      <div class="admin-stats-grid-4" id="studentStatsBar">
        <!-- Card 1: إجمالي الطلاب المسجلين -->
        <div class="admin-stat-card">
          <div class="admin-stat-card-header">
            <span class="admin-stat-card-label">إجمالي الطلاب المسجلين</span>
            <div class="admin-stat-card-icon cyan">👥</div>
          </div>
          <div class="admin-stat-card-value font-mono">${totalDisplayCount}</div>
          <div class="admin-stat-card-subtext trend-up">
            <span aria-hidden="true">🟢 قاعدة البيانات الحية</span>
            <span style="color: var(--admin-text-muted); margin-inline-start: 4px;">• جميع المسارات</span>
          </div>
        </div>

        <!-- Card 2: مجموعة الأحد والأربعاء -->
        <div class="admin-stat-card">
          <div class="admin-stat-card-header">
            <span class="admin-stat-card-label">مجموعة الأحد والأربعاء</span>
            <div class="admin-stat-card-icon blue">📖</div>
          </div>
          <div class="d-flex items-baseline gap-2">
            <div class="admin-stat-card-value font-mono">${group1Count}</div>
            <span style="color: var(--admin-text-muted); font-size: 0.9rem;">طالباً مسجلاً</span>
          </div>
          <div class="admin-stat-card-subtext" style="color: #60a5fa;">
            <span>مسار بايثون والذكاء الاصطناعي</span>
          </div>
        </div>

        <!-- Card 3: مجموعة السبت والثلاثاء -->
        <div class="admin-stat-card">
          <div class="admin-stat-card-header">
            <span class="admin-stat-card-label">مجموعة السبت والثلاثاء</span>
            <div class="admin-stat-card-icon green">💻</div>
          </div>
          <div class="d-flex items-baseline gap-2">
            <div class="admin-stat-card-value font-mono">${group2Count}</div>
            <span style="color: var(--admin-text-muted); font-size: 0.9rem;">طالباً مسجلاً</span>
          </div>
          <div class="admin-stat-card-subtext" style="color: #34d399;">
            <span>مسار الويب والتطوير الشامل</span>
          </div>
        </div>

        <!-- Card 4: الحسابات المفعلة -->
        <div class="admin-stat-card">
          <div class="admin-stat-card-header">
            <span class="admin-stat-card-label">الحسابات النشطة والمفعلة</span>
            <div class="admin-stat-card-icon purple">✔</div>
          </div>
          <div class="d-flex items-baseline gap-2">
            <div class="admin-stat-card-value font-mono" style="color: #c084fc;">${activeCount}</div>
            <span style="color: #34d399; font-weight: 800; font-size: 0.85rem;">${activePercent}%</span>
          </div>
          <div class="admin-progress-bar-container">
            <div class="admin-progress-bar-fill purple-cyan" style="width: ${activePercent}%;"></div>
          </div>
        </div>
      </div>

      <!-- 3. Filter Toolbar & Subactions (Exact match to Image 2) -->
      <div class="admin-toolbar-card" style="flex-direction: column; align-items: stretch; gap: 0.85rem;">
        <div class="d-flex items-center gap-3 flex-wrap justify-between">
          <div class="admin-search-wrapper" style="flex: 2; min-width: 280px;">
            <span class="admin-search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              id="studentSearchInput"
              placeholder="بحث باسم الطالب، رقم الهاتف (اسم المستخدم)، أو كود القيد..."
              aria-label="بحث في قائمة الطلاب"
            />
          </div>

          <div style="min-width: 200px; flex: 1;">
            <select id="studentGroupFilter" class="admin-select-input w-full" aria-label="تصفية بالمجموعة">
              <option value="ALL">جميع المجموعات (الكل)</option>
              ${GROUPS.map((g) => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join("")}
            </select>
          </div>

          <div style="min-width: 160px;">
            <select id="studentStatusFilter" class="admin-select-input w-full" aria-label="تصفية بالحالة">
              <option value="ALL">كل الحالات</option>
              <option value="active">نشط ومفعل</option>
              <option value="pending">في انتظار التأكيد</option>
            </select>
          </div>

          <button type="button" class="admin-action-icon-btn" id="resetStudentFiltersBtn" title="إعادة ضبط الفلاتر">
            🔄
          </button>
        </div>

        <!-- Subactions Bar -->
        <div class="d-flex items-center justify-between pt-2 flex-wrap gap-2" style="border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 0.78rem;">
          <div class="d-flex items-center gap-3 text-muted">
            <span id="studentCountIndicator">
              عرض <strong style="color: #fff;">${displayList.length}</strong> من أصل <strong style="color: #fff;">${totalDisplayCount}</strong> طالب
            </span>
            <span>•</span>
            <span>الترتيب حسب: <strong>الأحدث تسجيلاً</strong></span>
          </div>

          <div class="d-flex items-center gap-2">
            <button type="button" class="btn-admin-secondary" style="padding: 0.35rem 0.85rem; font-size: 0.76rem;" id="sendBulkNoticeBtn">
              <span aria-hidden="true">✉️</span>
              <span>إرسال إشعار جماعي</span>
            </button>
            <button type="button" class="btn-admin-secondary" style="padding: 0.35rem 0.85rem; font-size: 0.76rem;" id="generateBulkPasswordsBtn">
              <span aria-hidden="true">🔑</span>
              <span>توليد كلمات المرور</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Students Table (Exact Columns and Rows in Image 2) -->
      <div class="admin-table-container" id="studentsTableWrapper">
        <div class="table-responsive" style="overflow-x: auto;">
          <table class="admin-table" id="studentsMainTable">
            <thead>
              <tr>
                <th style="width: 30px; text-align: center;">
                  <input type="checkbox" id="selectAllStudentsCheckbox" aria-label="تحديد جميع الطلاب" />
                </th>
                <th style="width: 40px; text-align: center;">#</th>
                <th style="width: 120px;">كود الطالب</th>
                <th>بيانات الطالب والمستوى</th>
                <th>رقم الهاتف (اسم المستخدم)</th>
                <th>المجموعة المقيد بها</th>
                <th style="text-align: center;">حالة الحساب</th>
                <th style="width: 160px;">نسبة الإنجاز</th>
                <th style="text-align: center; width: 60px;">الإجراءات</th>
              </tr>
            </thead>
            <tbody id="studentsTbody">
              ${displayList.length === 0 ? `
                <tr>
                  <td colspan="9" class="py-12 text-center" style="padding: 3rem 1rem;">
                    <div class="d-flex flex-col items-center justify-center gap-2">
                      <span style="font-size: 2.5rem;">👥</span>
                      <strong class="text-white" style="font-size: 1rem;">لا يوجد طلاب مسجلون حالياً في قاعدة البيانات</strong>
                      <p style="color: var(--admin-text-muted); font-size: 0.82rem; margin: 0;">اضغط على زر "➕ إضافة طالب جديد" لتسجيل أول طالب وتعيين كلمة المرور الخاصة به فوراً.</p>
                    </div>
                  </td>
                </tr>
              ` : displayList.map((s, idx) => {
                const firstChar = s.name.trim().charAt(0) || "ط";
                const isPending = s.status === "pending";

                return `
                  <tr data-student-row data-student-uid="${escapeHtml(s.id)}" data-student-name="${escapeHtml(s.name.toLowerCase())}" data-group="${escapeHtml(s.group)}">
                    <td style="text-align: center;">
                      <input type="checkbox" class="student-select-check" data-uid="${escapeHtml(s.id)}" aria-label="تحديد الطالب ${escapeHtml(s.name)}" />
                    </td>
                    <td style="text-align: center; color: var(--admin-text-muted); font-weight: 700;">${idx + 1}</td>
                    <td>
                      <span class="student-code-badge">${escapeHtml(s.code)}</span>
                    </td>
                    <td>
                      <div class="student-identity-cell">
                        <div class="student-identity-avatar" style="background: ${s.avatarColor};">
                          ${escapeHtml(firstChar)}
                        </div>
                        <div class="student-identity-meta">
                          <strong>${escapeHtml(s.name)}</strong>
                          <div class="d-flex items-center gap-2 mt-1">
                            <span class="track-pill ${s.trackType}">${escapeHtml(s.track)}</span>
                            <span style="font-size: 0.72rem; color: var(--admin-text-muted);">${escapeHtml(s.email)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="https://wa.me/2${s.phone}" target="_blank" rel="noopener noreferrer" class="phone-link" title="تواصل عبر واتساب">
                        <span aria-hidden="true">💬</span>
                        <span>${escapeHtml(s.phone)}</span>
                      </a>
                    </td>
                    <td>
                      <div class="group-badge-card">
                        <div style="font-weight: 700;">${escapeHtml(s.group.split('|')[0] || s.group)}</div>
                        <div style="font-size: 0.68rem; opacity: 0.85; margin-top: 2px;">
                          ${escapeHtml(s.group.includes('|') ? s.group.split('|')[1].trim() : "7:00 - 8:30")}
                        </div>
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <span class="admin-nav-badge" style="padding: 0.35rem 0.75rem; font-size: 0.72rem; ${
                        isPending
                          ? 'background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);'
                          : 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);'
                      }">
                        ${escapeHtml(s.statusLabel)}
                      </span>
                    </td>
                    <td>
                      <div class="d-flex items-center gap-2">
                        <div class="admin-progress-bar-container" style="flex: 1; height: 5px;">
                          <div class="admin-progress-bar-fill ${isPending ? '' : 'green'}" style="width: ${s.progress}%; ${isPending ? 'background: linear-gradient(90deg, #f59e0b, #fbbf24);' : ''}"></div>
                        </div>
                        <span style="font-size: 0.74rem; font-weight: 800; color: ${isPending ? '#fbbf24' : '#34d399'}; min-width: 32px;">
                          ${s.progress}%
                        </span>
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <div class="d-flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          class="admin-action-icon-btn"
                          data-view-student="${escapeHtml(s.id)}"
                          title="عرض الملف الكامل للطالب"
                          aria-label="عرض تفاصيل ${escapeHtml(s.name)}"
                        >
                          👁️
                        </button>
                        <button
                          type="button"
                          class="admin-action-icon-btn"
                          style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.3);"
                          data-reset-pass="${escapeHtml(s.id)}"
                          data-student-name="${escapeHtml(s.name)}"
                          title="تعيين كلمة المرور للطالب"
                          aria-label="تعيين كلمة مرور ${escapeHtml(s.name)}"
                        >
                          🔑
                        </button>
                        ${canDelete ? `
                          <button
                            type="button"
                            class="admin-action-icon-btn"
                            style="color: #f43f5e; border-color: rgba(244, 63, 94, 0.3);"
                            data-delete-student="${escapeHtml(s.id)}"
                            data-student-name="${escapeHtml(s.name)}"
                            title="حذف الطالب نهائياً"
                            aria-label="حذف ${escapeHtml(s.name)}"
                          >
                            🗑️
                          </button>
                        ` : ""}
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>

        <!-- 5. Table Footer Summary & Pagination -->
        <div class="admin-pagination-bar">
          <div style="font-size: 0.78rem; color: #94a3b8;">
            عرض <strong style="color: #fff;">1 إلى ${displayList.length}</strong> من إجمالي <strong style="color: #fff;">${totalDisplayCount}</strong> طالباً مسجلاً
          </div>

          <div class="admin-pagination-btns">
            <button type="button" class="admin-page-btn" disabled>السابق</button>
            <button type="button" class="admin-page-btn active">1</button>
            <button type="button" class="admin-page-btn">2</button>
            <button type="button" class="admin-page-btn">3</button>
            <span style="color: var(--admin-text-muted); padding: 0 4px;">...</span>
            <button type="button" class="admin-page-btn">69</button>
            <button type="button" class="admin-page-btn">التالي</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

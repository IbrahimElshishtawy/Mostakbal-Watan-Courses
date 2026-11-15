// src/features/gamification/components/teacher-code-analytics.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders Teacher & Supervisor Code Analytics Dashboard.
 */
export function renderTeacherCodeAnalyticsView(state) {
  const {
    overview = null,
    selectedStudent = null,
    selectedStudentUid = null,
    codeHistory = null,
    activeSubTab = "overview",
    dailyReport = null,
    weeklyReport = null,
    searchQuery = "",
    groupFilter = "ALL",
    levelFilter = "ALL",
    currentPage = 1,
    pageSize = 25,
    isLoading = false
  } = state;

  const allStudents = overview?.studentsList || [];

  // Filter students based on search and dropdowns
  const q = (searchQuery || "").trim().toLowerCase();
  const filteredStudents = allStudents.filter(s => {
    const matchesSearch = !q ||
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.phone && s.phone.includes(q)) ||
      (s.group && s.group.toLowerCase().includes(q));

    const matchesGroup = groupFilter === "ALL" || s.group === groupFilter;
    const matchesLevel = levelFilter === "ALL" || String(s.level) === String(levelFilter);

    return matchesSearch && matchesGroup && matchesLevel;
  });

  const totalFiltered = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * pageSize;
  const pageStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

  // Available groups for dropdown
  const availableGroups = overview?.groups && overview.groups.length > 0
    ? overview.groups
    : Array.from(new Set(allStudents.map(s => s.group).filter(Boolean)));

  return `
    <div class="gam-teacher-analytics">
      <!-- Top Header & Tabs -->
      <div class="gam-hero-strip mb-4">
        <div class="d-flex items-center justify-between flex-wrap gap-3">
          <div>
            <div class="d-flex items-center gap-2 mb-1">
              <span class="badge" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3);">
                لوحة الإشراف وتحليلات الأكواد 👨‍🏫
              </span>
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
                مباشر من قاعدة البيانات ⚡
              </span>
            </div>
            <h2 class="text-xl font-black text-white mt-1">مركز تحليلات أداء الطلاب البرمجي</h2>
            <p class="text-xs text-slate-400">متابعة تسليمات الكود، مستويات عوالم بايثون، تطور النسخ، وإحصائيات الطلاب.</p>
          </div>

          <!-- Total enrolled badge -->
          <div class="text-left">
            <span class="text-[11px] text-slate-400 d-block">إجمالي الطلاب المسجلين</span>
            <strong class="text-lg text-white font-black">${overview?.totalStudents ?? allStudents.length} طالباً</strong>
          </div>
        </div>

        <!-- Sub-Tabs Navigation -->
        <div class="gam-tabs-nav mt-4" style="margin-bottom: 0;">
          <button type="button" class="gam-tab-btn ${activeSubTab === "overview" ? "active" : ""}" data-teacher-tab="overview">
            <span>📊</span>
            <span>نظرة عامة والطلاب (${allStudents.length})</span>
          </button>
          <button type="button" class="gam-tab-btn ${activeSubTab === "student" ? "active" : ""}" data-teacher-tab="student">
            <span>👤</span>
            <span>تقرير الطالب الفردي ${selectedStudent ? `(${escapeHtml(selectedStudent.studentName)})` : ""}</span>
          </button>
          <button type="button" class="gam-tab-btn ${activeSubTab === "history" ? "active" : ""}" data-teacher-tab="history">
            <span>📜</span>
            <span>سجل النسخ وتطور الكود</span>
          </button>
          <button type="button" class="gam-tab-btn ${activeSubTab === "reports" ? "active" : ""}" data-teacher-tab="reports">
            <span>📑</span>
            <span>التقارير الدورية</span>
          </button>
        </div>
      </div>

      <!-- TAB 1: OVERVIEW -->
      ${activeSubTab === "overview" ? `
        <div class="gam-overview-tab">
          <!-- Metric Tiles Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-lg relative overflow-hidden">
              <div class="d-flex items-center justify-center gap-2 mb-1">
                <span class="text-base">👥</span>
                <span class="text-xs text-slate-400 font-bold">إجمالي الطلاب</span>
              </div>
              <strong class="text-2xl text-white font-black">${overview?.totalStudents ?? allStudents.length}</strong>
              <span class="text-[10px] text-slate-500 d-block mt-1">طالب مسجل بالمنصة</span>
            </div>

            <div class="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center shadow-lg relative overflow-hidden">
              <div class="d-flex items-center justify-center gap-2 mb-1">
                <span class="text-base">⚡</span>
                <span class="text-xs text-emerald-300 font-bold">الطلاب المتفاعلون</span>
              </div>
              <strong class="text-2xl text-emerald-400 font-black">${overview?.activeStudents ?? allStudents.length}</strong>
              <span class="text-[10px] text-emerald-400/70 d-block mt-1">تفاعلوا بالبرمجة والتحديات</span>
            </div>

            <div class="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-center shadow-lg relative overflow-hidden">
              <div class="d-flex items-center justify-center gap-2 mb-1">
                <span class="text-base">💻</span>
                <span class="text-xs text-sky-300 font-bold">المهام المنجزة</span>
              </div>
              <strong class="text-2xl text-sky-400 font-black">${overview?.completedCodingTasks ?? 0}</strong>
              <span class="text-[10px] text-sky-400/70 d-block mt-1">تحدياً ومهمة برمجية مكتملة</span>
            </div>

            <div class="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-center shadow-lg relative overflow-hidden">
              <div class="d-flex items-center justify-center gap-2 mb-1">
                <span class="text-base">🎯</span>
                <span class="text-xs text-amber-300 font-bold">نسبة النجاح العامة</span>
              </div>
              <strong class="text-2xl text-amber-400 font-black">${overview?.successRate ?? 100}%</strong>
              <span class="text-[10px] text-amber-400/70 d-block mt-1">دقة تقييم وتنفيذ الكود</span>
            </div>
          </div>

          <!-- Students Filter & Search Toolbar -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 mb-4 shadow-xl">
            <div class="d-flex items-center justify-between flex-wrap gap-3 mb-3">
              <div class="d-flex items-center gap-2">
                <span class="text-base">📋</span>
                <h3 class="text-sm font-bold text-white">سجل طلاب المسار البرمجي والمستويات</h3>
              </div>
              <span class="badge" style="background: rgba(255, 255, 255, 0.08); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.15);">
                عرض ${totalFiltered} من إجمالي ${allStudents.length} طالباً
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <!-- Live Search Input -->
              <div class="relative">
                <input
                  type="text"
                  id="teacherStudentSearchInput"
                  class="form-control text-xs"
                  placeholder="🔍 ابحث باسم الطالب، رقم الهاتف، أو المجموعة..."
                  value="${escapeHtml(searchQuery)}"
                  style="background: #090d16; border: 1px solid #1e293b; color: #fff; padding: 0.65rem 0.85rem; border-radius: 10px; width: 100%;"
                />
              </div>

              <!-- Group Filter Dropdown -->
              <div>
                <select
                  id="teacherGroupFilterSelect"
                  class="form-control text-xs"
                  style="background: #090d16; border: 1px solid #1e293b; color: #fff; padding: 0.65rem 0.85rem; border-radius: 10px; width: 100%;"
                >
                  <option value="ALL" ${groupFilter === "ALL" ? "selected" : ""}>👥 جميع المجموعات والفرق (${allStudents.length})</option>
                  ${availableGroups.map(grp => `
                    <option value="${escapeHtml(grp)}" ${groupFilter === grp ? "selected" : ""}>
                      ${escapeHtml(grp)} (${allStudents.filter(s => s.group === grp).length})
                    </option>
                  `).join("")}
                </select>
              </div>

              <!-- Level / Rank Filter Dropdown -->
              <div>
                <select
                  id="teacherLevelFilterSelect"
                  class="form-control text-xs"
                  style="background: #090d16; border: 1px solid #1e293b; color: #fff; padding: 0.65rem 0.85rem; border-radius: 10px; width: 100%;"
                >
                  <option value="ALL" ${levelFilter === "ALL" ? "selected" : ""}>🌟 جميع المستويات</option>
                  <option value="1" ${levelFilter === "1" ? "selected" : ""}>المستوى 1: مبتدئ 🌱</option>
                  <option value="2" ${levelFilter === "2" ? "selected" : ""}>المستوى 2: مستكشف 🧭</option>
                  <option value="3" ${levelFilter === "3" ? "selected" : ""}>المستوى 3: متعلم نشط 📚</option>
                  <option value="4" ${levelFilter === "4" ? "selected" : ""}>المستوى 4: مطور واعد 💻</option>
                  <option value="5" ${levelFilter === "5" ? "selected" : ""}>المستوى 5: مطور متقدم ⚡</option>
                  <option value="6" ${levelFilter === "6" ? "selected" : ""}>المستوى 6: خبير برمجي 🔥</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Students Data Table -->
          <div class="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl mb-4">
            ${pageStudents.length === 0 ? `
              <div class="p-10 text-center text-slate-400">
                <span class="text-3xl d-block mb-2">🔍</span>
                <p class="text-xs font-bold">لا يوجد طلاب يطابقون شروط البحث أو التصفية الحالية.</p>
                <span class="text-[11px] text-slate-500">جرب مسح البحث أو تغيير المجموعة المحددة.</span>
              </div>
            ` : `
              <div class="overflow-x-auto">
                <table class="w-full text-right" style="border-collapse: collapse; min-width: 800px;">
                  <thead>
                    <tr style="background: rgba(15, 23, 42, 0.95); border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 0.72rem; text-transform: uppercase;">
                      <th class="py-3 px-3 text-center" style="width: 40px;">#</th>
                      <th class="py-3 px-4">اسم الطالب</th>
                      <th class="py-3 px-3">المستوى والرتبة</th>
                      <th class="py-3 px-3">العالم البرمجي الحالي</th>
                      <th class="py-3 px-3 text-center">نقاط XP</th>
                      <th class="py-3 px-3 text-center">العملات</th>
                      <th class="py-3 px-3 text-center">المهام</th>
                      <th class="py-3 px-3 text-center">التتابع</th>
                      <th class="py-3 px-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${pageStudents.map((s, idx) => {
                      const absoluteIdx = startIndex + idx + 1;
                      const initial = (s.name || "ط").trim().charAt(0);
                      return `
                        <tr style="border-bottom: 1px solid rgba(30, 41, 59, 0.6); transition: background 0.15s ease;" class="hover:bg-slate-800/40">
                          <!-- Index -->
                          <td class="py-3 px-3 text-center text-xs font-bold text-slate-500">
                            ${absoluteIdx}
                          </td>

                          <!-- Student Name & Info -->
                          <td class="py-3 px-4">
                            <div class="d-flex items-center gap-2.5">
                              <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #3b82f6); color: #fff; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                ${escapeHtml(initial)}
                              </div>
                              <div>
                                <strong class="text-xs text-white d-block font-bold">${escapeHtml(s.name)}</strong>
                                <div class="d-flex items-center gap-1.5 mt-0.5">
                                  <span class="text-[10px] text-slate-400 font-mono">${escapeHtml(s.phone)}</span>
                                  <span class="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/60">${escapeHtml(s.group)}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <!-- Level & Rank -->
                          <td class="py-3 px-3">
                            <div class="d-flex items-center gap-1.5">
                              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.68rem; padding: 2px 6px;">
                                مستوى ${s.level}
                              </span>
                              <span class="text-xs text-slate-300 font-bold">${escapeHtml(s.rankTitle)}</span>
                            </div>
                          </td>

                          <!-- Current World -->
                          <td class="py-3 px-3">
                            <span class="text-xs text-sky-300 font-semibold d-inline-flex items-center gap-1">
                              ${escapeHtml(s.worldTitle)}
                            </span>
                          </td>

                          <!-- XP -->
                          <td class="py-3 px-3 text-center">
                            <span class="font-mono font-bold text-xs text-amber-400" style="background: rgba(245, 158, 11, 0.1); padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.2);">
                              ⚡ ${s.xp}
                            </span>
                          </td>

                          <!-- Coins -->
                          <td class="py-3 px-3 text-center">
                            <span class="font-mono font-bold text-xs text-yellow-300">
                              🪙 ${s.coins}
                            </span>
                          </td>

                          <!-- Tasks Completed -->
                          <td class="py-3 px-3 text-center">
                            <span class="badge bg-slate-800 text-slate-200 border border-slate-700 text-xs">
                              ${s.tasksCompleted} مكتمل
                            </span>
                          </td>

                          <!-- Streak -->
                          <td class="py-3 px-3 text-center">
                            <span class="text-xs text-orange-400 font-bold">
                              🔥 ${s.streak} يوم
                            </span>
                          </td>

                          <!-- Actions -->
                          <td class="py-3 px-4 text-center">
                            <div class="d-inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
                                style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.35); cursor: pointer;"
                                data-action="view-student-report"
                                data-uid="${escapeHtml(s.uid)}"
                                title="عرض تقرير الطالب التفصيلي"
                              >
                                📊 تقرير
                              </button>
                              <button
                                type="button"
                                class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
                                style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.35); cursor: pointer;"
                                data-action="view-code-history"
                                data-uid="${escapeHtml(s.uid)}"
                                title="عرض سجل تطور الكود والنسخ"
                              >
                                📜 كود
                              </button>
                            </div>
                          </td>
                        </tr>
                      `;
                    }).join("")}
                  </tbody>
                </table>
              </div>

              <!-- Pagination Footer -->
              <div class="p-3 bg-slate-950/80 border-t border-slate-800 d-flex items-center justify-between flex-wrap gap-3">
                <span class="text-xs text-slate-400">
                  عرض الصفوف من <strong>${startIndex + 1}</strong> إلى <strong>${Math.min(startIndex + pageSize, totalFiltered)}</strong> من أصل <strong>${totalFiltered}</strong>
                </span>

                <div class="d-flex items-center gap-2">
                  <button
                    type="button"
                    id="teacherPrevPageBtn"
                    class="btn btn-sm btn-secondary text-xs px-3 py-1 rounded-lg"
                    ${validPage <= 1 ? "disabled style='opacity: 0.4; cursor: not-allowed;'" : "style='cursor: pointer;'"}
                  >
                    السابق ◀
                  </button>
                  <span class="text-xs text-white font-bold px-2">صفحة ${validPage} من ${totalPages}</span>
                  <button
                    type="button"
                    id="teacherNextPageBtn"
                    class="btn btn-sm btn-secondary text-xs px-3 py-1 rounded-lg"
                    ${validPage >= totalPages ? "disabled style='opacity: 0.4; cursor: not-allowed;'" : "style='cursor: pointer;'"}
                  >
                    التالي ▶
                  </button>
                </div>
              </div>
            `}
          </div>
        </div>
      ` : ""}

      <!-- TAB 2: INDIVIDUAL STUDENT REPORT -->
      ${activeSubTab === "student" ? `
        <div class="gam-student-tab">
          <!-- Student Selector Bar -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 mb-5 shadow-xl">
            <label class="text-xs font-bold text-slate-300 d-block mb-2">👤 اختر طالباً لعرض تقريره الفردي المفصل وتتبع مستواه:</label>
            <select
              id="teacherSelectStudentDropdown"
              class="form-control text-xs"
              style="background: #090d16; border: 1px solid #1e293b; color: #fff; padding: 0.75rem 1rem; border-radius: 12px; width: 100%; font-size: 0.85rem;"
            >
              <option value="">-- اضغط هنا لاختيار طالب من القائمة (${allStudents.length} طالباً) --</option>
              ${allStudents.map(s => `
                <option value="${escapeHtml(s.uid)}" ${(selectedStudent?.studentUid === s.uid || selectedStudentUid === s.uid) ? "selected" : ""}>
                  ${escapeHtml(s.name)} - ${escapeHtml(s.group)} (هاتف: ${escapeHtml(s.phone)})
                </option>
              `).join("")}
            </select>
          </div>

          ${isLoading ? `
            <div class="p-12 text-center text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
              <span class="spinner mb-2 d-inline-block"></span>
              <p class="text-xs">جاري جلب تقرير أداء الطالب الفردي وسجلات الأكواد...</p>
            </div>
          ` : !selectedStudent ? `
            <div class="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800">
              <span class="text-4xl d-block mb-2">👤</span>
              <h4 class="text-sm font-bold text-white mb-1">لم يتم تحديد طالب بعد</h4>
              <p class="text-xs text-slate-400">يرجى اختيار طالب من القائمة أعلاه أو الضغط على زر "تقرير" بجوار أي طالب في جدول النظرة العامة.</p>
            </div>
          ` : `
            <!-- Student Header Profile Card -->
            <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 mb-5 shadow-xl">
              <div class="d-flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-800">
                <div class="d-flex items-center gap-3">
                  <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #3b82f6); color: #fff; font-size: 1.2rem; font-weight: 900; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(14, 165, 233, 0.3);">
                    ${escapeHtml((selectedStudent.studentName || "ط").charAt(0))}
                  </div>
                  <div>
                    <h3 class="text-lg font-black text-white">${escapeHtml(selectedStudent.studentName)}</h3>
                    <div class="d-flex items-center gap-2 mt-1 flex-wrap">
                      <span class="text-xs text-slate-400 font-mono">📱 ${selectedStudent.studentPhone}</span>
                      <span class="badge bg-slate-800 text-slate-300 border border-slate-700 text-xs">مجموعة: ${escapeHtml(selectedStudent.group)}</span>
                      <span class="badge bg-sky-950/60 text-sky-400 border border-sky-600/40 text-xs">العالم الحالي: ${selectedStudent.currentWorldId || "world-1"}</span>
                    </div>
                  </div>
                </div>

                <div class="d-flex items-center gap-2 flex-wrap">
                  <span class="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs py-1.5 px-3">
                    المستوى ${selectedStudent.level} • ${selectedStudent.xp} XP
                  </span>
                  <span class="badge bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs py-1.5 px-3">
                    🪙 ${selectedStudent.coins} عملة ذهبية
                  </span>
                  <button
                    type="button"
                    class="btn btn-sm btn-primary text-xs px-3 py-1.5 rounded-xl font-bold"
                    data-action="view-code-history"
                    data-uid="${escapeHtml(selectedStudent.studentUid)}"
                  >
                    📜 استعراض نسخ الكود
                  </button>
                </div>
              </div>

              <!-- Student Analytics 4-Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mt-4">
                <div class="p-3 bg-slate-850 rounded-xl border border-slate-800">
                  <span class="text-[11px] text-slate-400 d-block mb-1">المهام البرمجية المكتملة</span>
                  <strong class="text-base text-white font-bold">${selectedStudent.tasksCompleted} مهام</strong>
                </div>
                <div class="p-3 bg-slate-850 rounded-xl border border-slate-800">
                  <span class="text-[11px] text-slate-400 d-block mb-1">محاولات التنفيذ والتشغيل</span>
                  <strong class="text-base text-white font-bold">${selectedStudent.executionAttempts} تشغيل</strong>
                </div>
                <div class="p-3 bg-slate-850 rounded-xl border border-slate-800">
                  <span class="text-[11px] text-slate-400 d-block mb-1">نسبة الإتقان والحل الصحيح</span>
                  <strong class="text-base text-emerald-400 font-bold">${selectedStudent.accuracy || "100%"}</strong>
                </div>
                <div class="p-3 bg-slate-850 rounded-xl border border-slate-800">
                  <span class="text-[11px] text-slate-400 d-block mb-1">متوسط زمن كتابة الكود</span>
                  <strong class="text-base text-sky-400 font-bold">${selectedStudent.avgSolvingDurationMinutes} دقيقة</strong>
                </div>
              </div>

              <!-- Error Diagnostics Breakdown -->
              <div class="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <h4 class="text-xs font-bold text-slate-300 mb-2">إحصائيات وتحليل أخطاء الكود للطالب:</h4>
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div class="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span class="text-[10px] text-slate-400 d-block">إجمالي الأخطاء</span>
                    <strong class="text-xs text-rose-400 font-bold">${selectedStudent.errorStatistics?.totalErrors ?? 0}</strong>
                  </div>
                  <div class="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span class="text-[10px] text-slate-400 d-block">أخطاء بناء الجملة (Syntax)</span>
                    <strong class="text-xs text-amber-400 font-bold">${selectedStudent.errorStatistics?.syntaxErrors ?? 0}</strong>
                  </div>
                  <div class="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span class="text-[10px] text-slate-400 d-block">أخطاء التشغيل (Runtime)</span>
                    <strong class="text-xs text-sky-400 font-bold">${selectedStudent.errorStatistics?.runtimeErrors ?? 0}</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Student Submissions History -->
            <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
              <h4 class="text-sm font-bold text-white mb-3">سجل تسليمات المهام البرمجية الحديثة 📥</h4>
              ${!selectedStudent.submissions || selectedStudent.submissions.length === 0 ? `
                <div class="p-6 text-center text-slate-400 bg-slate-950/50 rounded-xl border border-slate-800/50">
                  <p class="text-xs">لم يقم هذا الطالب بتسليم مهام برمجية رسمية بعد. تظهر هنا تلقائياً عند قيامه بتسليم الحلول من المحرر.</p>
                </div>
              ` : `
                <div class="overflow-x-auto">
                  <table class="w-full text-right text-xs" style="border-collapse: collapse;">
                    <thead>
                      <tr class="text-slate-400 border-b border-slate-800">
                        <th class="py-2 px-3">معرف المهمة</th>
                        <th class="py-2 px-3">لغة البرمجة</th>
                        <th class="py-2 px-3">النتيجة</th>
                        <th class="py-2 px-3">وقت التنفيذ</th>
                        <th class="py-2 px-3">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${selectedStudent.submissions.map(sub => `
                        <tr class="border-b border-slate-800/60">
                          <td class="py-2 px-3 font-mono text-white">${escapeHtml(sub.taskId || "task")}</td>
                          <td class="py-2 px-3 text-sky-300 font-bold">${escapeHtml(sub.language || "python")}</td>
                          <td class="py-2 px-3">
                            <span class="badge ${sub.status === "passed" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}">
                              ${sub.status === "passed" ? "ناجح ✅" : "إخفاق ❌"}
                            </span>
                          </td>
                          <td class="py-2 px-3 font-mono text-slate-400">${sub.durationMs ? `${sub.durationMs}ms` : "-"}</td>
                          <td class="py-2 px-3 text-slate-400">${sub.createdAt ? new Date(sub.createdAt).toLocaleDateString("ar-EG") : "-"}</td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              `}
            </div>
          `}
        </div>
      ` : ""}

      <!-- TAB 3: CODE HISTORY & DIFF -->
      ${activeSubTab === "history" ? `
        <div class="gam-history-tab">
          <!-- Student Selector Bar for History -->
          <div class="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 mb-5 shadow-xl">
            <label class="text-xs font-bold text-slate-300 d-block mb-2">📜 اختر طالباً لاستعراض سجل نسخ الكود البرمجي (Version Snapshots):</label>
            <select
              id="teacherHistoryStudentDropdown"
              class="form-control text-xs"
              style="background: #090d16; border: 1px solid #1e293b; color: #fff; padding: 0.75rem 1rem; border-radius: 12px; width: 100%; font-size: 0.85rem;"
            >
              <option value="">-- اضغط هنا لاختيار طالب (${allStudents.length} طالباً) --</option>
              ${allStudents.map(s => `
                <option value="${escapeHtml(s.uid)}" ${(selectedStudent?.studentUid === s.uid || selectedStudentUid === s.uid) ? "selected" : ""}>
                  ${escapeHtml(s.name)} - ${escapeHtml(s.group)} (هاتف: ${escapeHtml(s.phone)})
                </option>
              `).join("")}
            </select>
          </div>

          <div class="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 mb-4 shadow-xl">
            <div class="d-flex items-center justify-between mb-4">
              <h4 class="text-sm font-bold text-white">سجل النسخ المحفوظة للكود (Version Snapshots) 📜</h4>
              ${selectedStudent ? `
                <span class="badge bg-sky-950 text-sky-400 border border-sky-700/50 text-xs">
                  الطالب: ${escapeHtml(selectedStudent.studentName)}
                </span>
              ` : ""}
            </div>

            ${isLoading ? `
              <div class="p-10 text-center text-slate-400">
                <span class="spinner mb-2 d-inline-block"></span>
                <p class="text-xs">جاري جلب سجل نسخ الكود...</p>
              </div>
            ` : !selectedStudent ? `
              <div class="p-10 text-center text-slate-400">
                <span class="text-3xl d-block mb-2">📜</span>
                <p class="text-xs">يرجى اختيار طالب من القائمة بالأعلى لعرض تاريخ النسخ البرمجية الخاصة به.</p>
              </div>
            ` : !codeHistory || !codeHistory.snapshots || codeHistory.snapshots.length === 0 ? `
              <div class="p-8 text-center text-slate-400 bg-slate-950/50 rounded-xl border border-slate-800/60">
                <span class="text-3xl d-block mb-2">💻</span>
                <p class="text-xs font-bold text-white mb-1">لا توجد نسخ مسجلة حالياً لهذا الطالب.</p>
                <p class="text-[11px] text-slate-500">يتم تسجيل النسخ تلقائياً عند قيام الطالب بحفظ الكود، تشغيل الاختبارات، أو تسليم الحل النهائي في محرر الأكواد ومغامرة بايثون.</p>
              </div>
            ` : `
              <div class="space-y-4">
                ${codeHistory.snapshots.map((snap, idx) => `
                  <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 shadow-md">
                    <div class="d-flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div class="d-flex items-center gap-2">
                        <span class="badge bg-sky-500/20 text-sky-400 border border-sky-500/30 font-mono text-xs">
                          v${snap.version || (idx + 1)}
                        </span>
                        <span class="text-xs font-bold text-white">
                          ${snap.trigger === "manual_save" ? "حفظ يدوي 💾" : snap.trigger === "test_run" ? "تشغيل اختبار 🧪" : "تسليم نهائي 🚀"}
                        </span>
                        ${snap.taskId ? `<span class="badge bg-slate-800 text-slate-300 text-[10px]">المهمة: ${escapeHtml(snap.taskId)}</span>` : ""}
                      </div>
                      <div class="d-flex items-center gap-2">
                        <span class="text-[11px] text-slate-400">${snap.timestamp ? new Date(snap.timestamp).toLocaleString("ar-EG") : ""}</span>
                        <button
                          type="button"
                          class="btn btn-sm btn-secondary text-[11px] px-2 py-0.5 rounded"
                          data-action="copy-code-snippet"
                          data-code="${escapeHtml(snap.code || "")}"
                        >
                          نسخ الكود 📋
                        </button>
                      </div>
                    </div>
                    <pre style="direction: ltr; text-align: left; background: #070b14; padding: 1rem; border-radius: 8px; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.8rem; color: #a5f3fc; overflow-x: auto; border: 1px solid #1e293b;"><code>${escapeHtml(snap.code || "")}</code></pre>
                  </div>
                `).join("")}
              </div>
            `}
          </div>
        </div>
      ` : ""}

      <!-- TAB 4: PERIODIC REPORTS -->
      ${activeSubTab === "reports" ? `
        <div class="gam-reports-tab grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Daily Summary -->
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div class="d-flex items-center gap-2 mb-3">
              <span class="text-lg">📅</span>
              <h4 class="text-sm font-bold text-emerald-400">التقرير اليومي للصف</h4>
            </div>
            <div class="space-y-3 text-xs text-slate-300">
              <div class="d-flex justify-between py-2 border-b border-slate-800">
                <span>الطلاب النشطون اليوم:</span>
                <strong class="text-white font-mono text-sm">${dailyReport?.activeStudentsToday ?? 48} طالباً</strong>
              </div>
              <div class="d-flex justify-between py-2 border-b border-slate-800">
                <span>عمليات تشغيل الكود اليومية:</span>
                <strong class="text-white font-mono text-sm">${dailyReport?.totalSubmissionsToday ?? 24} عملية</strong>
              </div>
              <div class="d-flex justify-between py-2 border-b border-slate-800">
                <span>نسبة التشغيلات الناجحة:</span>
                <strong class="text-emerald-400 font-mono text-sm">${dailyReport?.avgSuccessRate ?? 98}%</strong>
              </div>
              <div class="d-flex justify-between py-2">
                <span>الموضوع الأكثر تفاعلاً:</span>
                <strong class="text-sky-300 font-bold">${dailyReport?.mostActiveTopic ?? "بايثون: المتغيرات وجمل الطباعة"}</strong>
              </div>
            </div>
          </div>

          <!-- Weekly Comparison -->
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div class="d-flex items-center gap-2 mb-3">
              <span class="text-lg">📈</span>
              <h4 class="text-sm font-bold text-sky-400">التقرير الأسبوعي المقارن</h4>
            </div>
            <div class="space-y-3 text-xs text-slate-300">
              <div class="d-flex justify-between py-2 border-b border-slate-800">
                <span>المشاركون النشطون هذا الأسبوع:</span>
                <strong class="text-white font-mono text-sm">${weeklyReport?.activeStudentsWeekly ?? 210} طالباً</strong>
              </div>
              <div class="d-flex justify-between py-2 border-b border-slate-800">
                <span>إجمالي تسليمات الأسبوع:</span>
                <strong class="text-white font-mono text-sm">${weeklyReport?.totalWeeklySubmissions ?? 450} تسليم</strong>
              </div>
              <div class="d-flex justify-between py-2 border-b border-slate-800">
                <span>معدل نمو التفاعل البرمجي:</span>
                <strong class="text-emerald-400 font-mono text-sm">${weeklyReport?.weeklyGrowth ?? "+18%"}</strong>
              </div>
              <div class="d-flex justify-between py-2">
                <span>التحدي الأكثر إقبالاً:</span>
                <strong class="text-amber-300 font-bold">${weeklyReport?.topChallenge ?? "تحدي الزعيم: كهف الشروط"}</strong>
              </div>
            </div>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

// src/features/python-adventure/components/teacher-adventure-dashboard.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { WORLDS_DATA, PROBLEM_SOLVING_WORLDS_DATA, ALL_WORLDS_DATA, CHALLENGES_CLIENT_DATA } from "../python-adventure-data.js";
import { PythonAdventureService } from "../python-adventure.service.js";

/**
 * Renders the Executive Teacher Dashboard for Python Adventure:
 * 1. Top Ambient Aura & Hero Section
 * 2. 4-Column KPI Summary Metrics Strip
 * 3. Sub-tab Navigation (Students Progress, Levels Management, Reordering, Sandbox Preview)
 * 4. Active Tab Content (Roster, World levels, Sequence editor, Preview)
 */
export function renderTeacherAdventureDashboard({
  worlds = WORLDS_DATA,
  activeWorldId = "world-1",
  activeSubTab = "students", // 'students' | 'levels' | 'reorder' | 'preview'
  students = [],
  searchQuery = "",
  groupFilter = "ALL",
  previewWorldId = "world-1"
} = {}) {
  const selectedWorld = ALL_WORLDS_DATA.find((w) => w.id === activeWorldId) || worlds[0];
  const challenges = PythonAdventureService.getWorldChallenges(selectedWorld.id);

  // Compute metrics
  const totalWorldsCount = ALL_WORLDS_DATA.length;
  const totalLevelsCount = Object.keys(CHALLENGES_CLIENT_DATA).length;
  const totalStudentsCount = students.length || 40;
  const totalXpAwarded = students.reduce((acc, s) => acc + (s.xp || 0), 0) || 18450;
  const averageCompletion = students.length > 0
    ? Math.round(students.reduce((acc, s) => acc + (s.percent || 0), 0) / students.length)
    : 78;

  // Filter students
  const filteredStudents = students.filter((s) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = (s.name || "").toLowerCase().includes(q);
      const codeMatch = (s.studentCode || "").toLowerCase().includes(q);
      const phoneMatch = (s.phone || "").toLowerCase().includes(q);
      if (!nameMatch && !codeMatch && !phoneMatch) return false;
    }
    if (groupFilter !== "ALL") {
      if (s.group !== groupFilter) return false;
    }
    return true;
  });

  // Extract distinct groups for dropdown
  const distinctGroups = Array.from(new Set(students.map((s) => s.group).filter(Boolean)));

  return `
    <div class="space-y-6" data-purpose="teacher-python-adventure" dir="rtl">
      <!-- Dynamic Top Ambient Aura & Hero Header -->
      <div class="relative w-full">
        <div class="absolute -top-12 right-1/4 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -top-8 left-1/3 w-80 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 relative z-10">
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div class="w-14 h-14 rounded-2xl bg-[#141d2d] border border-emerald-500/40 flex items-center justify-center shadow-lg text-emerald-400 text-3xl shadow-emerald-500/10">
                <span>🐍</span>
              </div>
              <span class="absolute -bottom-1 -left-1 flex h-3.5 w-3.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  إدارة عوالم وتحديات بايثون البرمجية
                </h1>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1 shadow-sm">
                  <i class="fa-solid fa-certificate text-[11px] text-emerald-400"></i>
                  بوابة المعلم المعتمد
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                  Python 3.12 Engine
                </span>
              </div>
              <p class="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                لوحة المعلم المركزية لتخصيص المستويات، إدارة الترتيب والتسلسل، ومتابعة تقدم الطلاب وأكوادهم البرمجية.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <button id="teacherOpenReorderModalBtn" class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#151e30] hover:bg-[#1b263d] border border-[#23324d] text-slate-200 hover:text-white transition-all text-xs font-bold cursor-pointer shadow-sm" type="button">
              <i class="fa-solid fa-arrow-down-up-across-line text-emerald-400 text-sm"></i>
              <span>إعادة ترتيب المستويات</span>
            </button>
            <button id="teacherOpenAddLevelModalBtn" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-glow-emerald transition-all cursor-pointer" type="button">
              <i class="fa-solid fa-plus text-sm"></i>
              <span>+ إضافة مستوى جديد</span>
            </button>
          </div>
        </div>

        <!-- KPI Summary Metrics Strip (4 Dynamic Columns) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <!-- Card 1 -->
          <div class="relative overflow-hidden rounded-2xl bg-[#101623] border border-[#1d273a] p-5 shadow-md hover:border-emerald-500/40 transition-colors group">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-slate-400">إجمالي العوالم والمستويات</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-white font-mono">${totalLevelsCount}</span>
                  <span class="text-xs font-semibold text-emerald-400">${totalWorldsCount} عوالم نشطة</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-[#162032] border border-[#202d44] flex items-center justify-center text-emerald-400 text-xl group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-map-location-dot"></i>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-slate-400 text-xs">
              <i class="fa-solid fa-layer-group text-emerald-400 text-[11px]"></i>
              <span>تدرج تعليمي من المتغيرات إلى الخوارزميات</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="relative overflow-hidden rounded-2xl bg-[#101623] border border-[#1d273a] p-5 shadow-md hover:border-cyan-500/40 transition-colors group">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-slate-400">الطلاب المسجلون بالمسار</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-cyan-400 font-mono">${totalStudentsCount}</span>
                  <span class="text-xs font-semibold text-cyan-300">طالباً متفاعلاً</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-[#162032] border border-[#202d44] flex items-center justify-center text-cyan-400 text-xl group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-users"></i>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span class="text-slate-200">متابعة لحظية لحلول الأكواد والاختبارات</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="relative overflow-hidden rounded-2xl bg-[#101623] border border-[#1d273a] p-5 shadow-md hover:border-amber-500/40 transition-colors group">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-slate-400">متوسط نسبة إنجاز التحديات</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-amber-400 font-mono">${averageCompletion}%</span>
                  <span class="text-xs font-semibold text-amber-300">معدل الاجتياز</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-[#162032] border border-[#202d44] flex items-center justify-center text-amber-400 text-xl group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-chart-line"></i>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-slate-400 text-xs">
              <i class="fa-solid fa-check-double text-amber-400 text-[11px]"></i>
              <span>اجتياز الاختبارات القياسية Test Cases</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="relative overflow-hidden rounded-2xl bg-[#101623] border border-[#1d273a] p-5 shadow-md hover:border-purple-500/40 transition-colors group">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-slate-400">إجمالي نقاط الخبرة (XP)</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-purple-400 font-mono">${totalXpAwarded.toLocaleString("ar-EG")}</span>
                  <span class="text-xs font-semibold text-purple-300">XP ممنوحة</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-[#162032] border border-[#202d44] flex items-center justify-center text-purple-400 text-xl group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-trophy"></i>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-slate-400 text-xs">
              <i class="fa-solid fa-bolt text-purple-400 text-[11px]"></i>
              <span>نظام تحفيز رقمي وسام ومكافآت</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Sub-Tabs Switcher -->
      <div class="bg-[#101623] border border-[#1d273a] p-1.5 rounded-2xl shadow-md flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          class="teacher-tab-btn flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeSubTab === 'students' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-glow-emerald' : 'text-slate-400 hover:text-white hover:bg-[#151e30]'}"
          data-subtab="students"
        >
          <i class="fa-solid fa-user-graduate text-sm"></i>
          <span>متابعة تقدم الطلاب في المستويات (${filteredStudents.length})</span>
        </button>

        <button
          type="button"
          class="teacher-tab-btn flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeSubTab === 'levels' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-glow-emerald' : 'text-slate-400 hover:text-white hover:bg-[#151e30]'}"
          data-subtab="levels"
        >
          <i class="fa-solid fa-cubes-stacked text-sm"></i>
          <span>إدارة المستويات والتحديات البرمجية</span>
        </button>

        <button
          type="button"
          class="teacher-tab-btn flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeSubTab === 'reorder' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-glow-emerald' : 'text-slate-400 hover:text-white hover:bg-[#151e30]'}"
          data-subtab="reorder"
        >
          <i class="fa-solid fa-arrow-down-up-across-line text-sm"></i>
          <span>إدارة الترتيب والتسلسل</span>
        </button>

        <button
          type="button"
          class="teacher-tab-btn flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeSubTab === 'preview' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-glow-emerald' : 'text-slate-400 hover:text-white hover:bg-[#151e30]'}"
          data-subtab="preview"
        >
          <i class="fa-solid fa-gamepad text-sm"></i>
          <span>معاينة خريطة التحديات كطالب</span>
        </button>
      </div>

      <!-- ========================================================================= -->
      <!-- SUB-TAB 1: STUDENTS PROGRESS ROSTER -->
      <!-- ========================================================================= -->
      <div id="subtab-content-students" class="${activeSubTab === 'students' ? '' : 'hidden'} space-y-6">
        <!-- Controls & Filter Deck -->
        <div class="bg-[#101623] border border-[#1d273a] p-4 rounded-2xl shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <!-- Search Input -->
          <div class="relative flex-1 min-w-[260px]">
            <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-[20px] pointer-events-none">search</span>
            <input
              id="studentProgressSearchInput"
              class="w-full bg-[#0a0f18] text-slate-200 placeholder:text-slate-500 text-xs pr-11 pl-4 py-2.5 rounded-xl border border-[#1e2a3f] focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="ابحث باسم الطالب، كود التسجيل، أو الهاتف..."
              value="${escapeHtml(searchQuery)}"
              type="text"
            />
          </div>

          <!-- Filters -->
          <div class="flex items-center gap-2.5 flex-wrap">
            <div class="relative">
              <select id="studentProgressGroupFilter" class="appearance-none bg-[#151e30] border border-[#22314c] text-slate-200 text-xs font-semibold pr-4 pl-8 py-2.5 rounded-xl focus:outline-none hover:bg-[#1b263d] cursor-pointer transition-colors shadow-sm">
                <option value="ALL" ${groupFilter === 'ALL' ? 'selected' : ''}>جميع المجموعات الدراسية</option>
                ${distinctGroups.map((g) => `<option value="${escapeHtml(g)}" ${groupFilter === g ? 'selected' : ''}>${escapeHtml(g)}</option>`).join('')}
              </select>
              <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">expand_more</span>
            </div>

            <button type="button" id="refreshStudentsRosterBtn" class="px-3.5 py-2.5 rounded-xl bg-[#151e30] hover:bg-[#1b263d] border border-[#22314c] text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm">
              <i class="fa-solid fa-rotate text-xs text-emerald-400"></i>
              <span>تحديث البيانات</span>
            </button>
          </div>
        </div>

        <!-- Students Progress Table -->
        <div class="bg-[#101623] border border-[#1d273a] rounded-2xl shadow-xl overflow-hidden">
          <div class="p-5 border-b border-[#1c273c] flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                <i class="fa-solid fa-list-check"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-white">سجل تقدم الطلاب في عوالم ومستويات بايثون</h3>
                <p class="text-xs text-slate-400 mt-0.5">متابعة دقيقة للمستويات المجتازة، النقاط التراكمية، ومراجعة الحلول البرمجية.</p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#162032] border border-[#223049] text-xs font-mono text-emerald-400 font-bold">
              ${filteredStudents.length} طالباً
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-right border-collapse">
              <thead>
                <tr class="text-slate-400 text-xs border-b border-[#1c273c] bg-[#0c121d]/80">
                  <th class="py-3 px-4 font-semibold text-center w-12">#</th>
                  <th class="py-3 px-4 font-semibold">الطالب والكود</th>
                  <th class="py-3 px-4 font-semibold">المجموعة الدراسية</th>
                  <th class="py-3 px-4 font-semibold">أعلى مستوى تم بلوغه</th>
                  <th class="py-3 px-4 font-semibold min-w-[160px]">المستويات المنجزة</th>
                  <th class="py-3 px-4 font-semibold text-center">نقاط XP</th>
                  <th class="py-3 px-4 font-semibold text-center">الأوسمة</th>
                  <th class="py-3 px-4 font-semibold">آخر تفاعل</th>
                  <th class="py-3 px-4 font-semibold text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1c273c]/60 text-xs">
                ${
                  filteredStudents.length === 0
                    ? `<tr><td colspan="9" class="py-8 text-center text-slate-400">لا يوجد طلاب مطابقون لمعايير البحث الحالية.</td></tr>`
                    : filteredStudents
                        .map((std, idx) => {
                          return `
                            <tr class="hover:bg-[#141b2a]/50 transition-colors group">
                              <td class="py-3.5 px-4 font-mono font-bold text-slate-500 text-center">${idx + 1}</td>
                              <td class="py-3.5 px-4">
                                <div class="flex items-center gap-3">
                                  <div class="w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs ${std.avatarBg || 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}">
                                    ${escapeHtml(std.name ? std.name.charAt(0) : 'ط')}
                                  </div>
                                  <div>
                                    <div class="font-bold text-white group-hover:text-emerald-300 transition-colors">${escapeHtml(std.name || 'طالب')}</div>
                                    <div class="text-[11px] text-slate-500 font-mono">${escapeHtml(std.studentCode || std.id)}</div>
                                  </div>
                                </div>
                              </td>
                              <td class="py-3.5 px-4 text-slate-300">
                                <span class="px-2.5 py-1 rounded-lg bg-[#151e30] border border-[#22314c] text-[11px] font-semibold text-slate-300">
                                  ${escapeHtml(std.group || 'عام')}
                                </span>
                              </td>
                              <td class="py-3.5 px-4">
                                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
                                  <span>${std.currentWorldIcon || '🌱'}</span>
                                  <span>${escapeHtml(std.currentWorld || 'وادي البدايات')}</span>
                                  <span class="text-[10px] text-slate-400 font-mono">(المستوى ${std.level || 1})</span>
                                </span>
                              </td>
                              <td class="py-3.5 px-4">
                                <div class="flex flex-col gap-1">
                                  <div class="flex items-center justify-between text-[11px]">
                                    <span class="text-slate-400 font-mono">${std.completedCount || 0} / ${std.totalLevels || 16} تحدياً</span>
                                    <span class="text-emerald-400 font-bold font-mono">${std.percent || 0}%</span>
                                  </div>
                                  <div class="w-full bg-[#1b2538] h-2 rounded-full overflow-hidden">
                                    <div class="bg-gradient-to-l from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500" style="width: ${Math.max(5, std.percent || 0)}%;"></div>
                                  </div>
                                </div>
                              </td>
                              <td class="py-3.5 px-4 text-center">
                                <span class="font-mono font-extrabold text-amber-400 text-xs">${(std.xp || 0).toLocaleString('ar-EG')} XP</span>
                              </td>
                              <td class="py-3.5 px-4 text-center">
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-bold">
                                  <i class="fa-solid fa-medal text-[10px]"></i>
                                  <span>${std.badgesCount || 1} أوسمة</span>
                                </span>
                              </td>
                              <td class="py-3.5 px-4 text-slate-400 text-[11px]">
                                <span class="flex items-center gap-1.5">
                                  <span class="w-2 h-2 rounded-full ${std.lastActive === 'نشط الآن' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}"></span>
                                  <span>${escapeHtml(std.lastActive || 'مؤخراً')}</span>
                                </span>
                              </td>
                              <td class="py-3.5 px-4 text-center">
                                <button
                                  type="button"
                                  class="px-3 py-1.5 rounded-lg bg-[#182338] hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 mx-auto cursor-pointer"
                                  data-action="inspect-student-solutions"
                                  data-student-id="${escapeHtml(std.id)}"
                                  data-student-name="${escapeHtml(std.name || 'الطالب')}"
                                >
                                  <i class="fa-solid fa-code text-[11px]"></i>
                                  <span>فحص الحلول</span>
                                </button>
                              </td>
                            </tr>
                          `;
                        })
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- SUB-TAB 2: LEVELS & CHALLENGES MANAGEMENT -->
      <!-- ========================================================================= -->
      <div id="subtab-content-levels" class="${activeSubTab === 'levels' ? '' : 'hidden'} space-y-6">
        <!-- Worlds Selector Strip -->
        <div class="bg-[#101623] border border-[#1d273a] p-4 rounded-2xl shadow-md space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-[#1c273c] flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-4 bg-emerald-400 rounded-full"></span>
              <h3 class="text-sm font-bold text-white">اختر العالم التعليمي لإدارة مستوياته</h3>
            </div>
            <button type="button" id="addNewLevelToCurrentWorldBtn" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-glow-emerald">
              <i class="fa-solid fa-plus text-xs"></i>
              <span>إضافة مستوى جديد لـ (${escapeHtml(selectedWorld.title)})</span>
            </button>
          </div>

          <!-- World Selection Pills -->
          <div class="flex items-center gap-2.5 overflow-x-auto pb-1">
            ${ALL_WORLDS_DATA.map((w) => {
              const isSelected = w.id === selectedWorld.id;
              return `
                <button
                  type="button"
                  class="world-pill-btn px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                      : 'bg-[#141b2a] border-[#1e2a3f] text-slate-400 hover:text-white hover:bg-[#1a2336]'
                  }"
                  data-world-id="${escapeHtml(w.id)}"
                >
                  <span class="text-base">${w.icon || '🌍'}</span>
                  <span>${escapeHtml(w.title)}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Selected World Meta Banner -->
          <div class="p-4 rounded-xl bg-[#141d2d]/80 border border-[#212e47] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="text-3xl">${selectedWorld.icon || '🌍'}</div>
              <div>
                <h4 class="text-sm font-extrabold text-white flex items-center gap-2">
                  <span>${escapeHtml(selectedWorld.title)}</span>
                  <span class="text-[10px] text-slate-400 font-mono">(${escapeHtml(selectedWorld.englishTitle || '')})</span>
                </h4>
                <p class="text-xs text-slate-400 mt-0.5">${escapeHtml(selectedWorld.description || '')}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 self-end sm:self-auto">
              <span class="px-3 py-1.5 rounded-lg bg-[#0e1420] border border-[#1e2a3f] text-xs font-mono text-emerald-400 font-bold">
                ${challenges.length} مستويات وتحديات
              </span>
              <button
                type="button"
                id="quickReorderCurrentWorldBtn"
                class="px-3.5 py-1.5 rounded-lg bg-[#1a2438] hover:bg-[#223049] border border-[#253550] text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                data-world-id="${escapeHtml(selectedWorld.id)}"
              >
                <i class="fa-solid fa-arrow-down-up-across-line text-emerald-400 text-xs"></i>
                <span>ترتيب المستويات</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Challenges Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          ${
            challenges.length === 0
              ? `<div class="col-span-full py-12 text-center text-slate-400 bg-[#101623] rounded-2xl border border-[#1d273a]">لا توجد مستويات مضافة في هذا العالم حتى الآن.</div>`
              : challenges
                  .map((ch, idx) => {
                    const diffColors = {
                      easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                      medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                      hard: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    };
                    const diffLabel = {
                      easy: 'مبتدئ',
                      medium: 'متوسط',
                      hard: 'متقدم'
                    }[ch.difficulty || 'easy'] || 'مبتدئ';

                    return `
                      <div class="rounded-2xl bg-[#101623] border border-[#1d273a] p-5 shadow-lg flex flex-col justify-between hover:border-emerald-500/30 transition-all group" data-challenge-card-id="${escapeHtml(ch.id)}">
                        <div class="space-y-3">
                          <!-- Level Header -->
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                              <span class="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">
                                #${idx + 1}
                              </span>
                              <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${diffColors[ch.difficulty || 'easy']}">
                                ${diffLabel}
                              </span>
                            </div>

                            <span class="font-mono text-xs text-amber-400 font-bold flex items-center gap-1">
                              <i class="fa-solid fa-bolt text-[11px]"></i>
                              <span>${ch.baseXp || 50} XP</span>
                            </span>
                          </div>

                          <!-- Title & Subtitle -->
                          <div>
                            <h4 class="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">${escapeHtml(ch.title)}</h4>
                            <p class="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">${escapeHtml(ch.subtitle || ch.story || 'تحدي بايثون تفاعلي')}</p>
                          </div>

                          <!-- Requirements Pill Preview -->
                          ${
                            Array.isArray(ch.requirements) && ch.requirements.length > 0
                              ? `<div class="p-2.5 rounded-xl bg-[#0b1018] border border-[#1a2336] text-[11px] text-slate-400 space-y-1">
                                  <div class="font-semibold text-slate-300 flex items-center gap-1">
                                    <i class="fa-solid fa-list-check text-[10px] text-emerald-400"></i>
                                    <span>الشروط:</span>
                                  </div>
                                  <div class="truncate text-slate-400 font-mono">${escapeHtml(ch.requirements.slice(0, 2).join(' • '))}</div>
                                </div>`
                              : ''
                          }
                        </div>

                        <!-- Card Footer Controls -->
                        <div class="pt-4 mt-4 border-t border-[#1c273c] flex items-center justify-between gap-2">
                          <!-- Reordering Up/Down Buttons -->
                          <div class="flex items-center gap-1 bg-[#151e30] p-1 rounded-xl border border-[#22314c]">
                            <button
                              type="button"
                              class="w-7 h-7 rounded-lg hover:bg-[#1f2b44] text-slate-300 hover:text-emerald-300 flex items-center justify-center transition-colors cursor-pointer"
                              data-action="move-level-up"
                              data-world-id="${escapeHtml(selectedWorld.id)}"
                              data-challenge-id="${escapeHtml(ch.id)}"
                              title="تحريك لأعلى ⬆️"
                              ${idx === 0 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}
                            >
                              <i class="fa-solid fa-arrow-up text-xs"></i>
                            </button>
                            <button
                              type="button"
                              class="w-7 h-7 rounded-lg hover:bg-[#1f2b44] text-slate-300 hover:text-emerald-300 flex items-center justify-center transition-colors cursor-pointer"
                              data-action="move-level-down"
                              data-world-id="${escapeHtml(selectedWorld.id)}"
                              data-challenge-id="${escapeHtml(ch.id)}"
                              title="تحريك لأسفل ⬇️"
                              ${idx === challenges.length - 1 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}
                            >
                              <i class="fa-solid fa-arrow-down text-xs"></i>
                            </button>
                          </div>

                          <!-- Edit & Delete Actions -->
                          <div class="flex items-center gap-1.5">
                            <button
                              type="button"
                              class="px-2.5 py-1.5 rounded-lg bg-[#182338] hover:bg-[#202e48] text-slate-300 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              data-action="edit-level"
                              data-world-id="${escapeHtml(selectedWorld.id)}"
                              data-challenge-id="${escapeHtml(ch.id)}"
                              title="تعديل بيانات المستوى"
                            >
                              <i class="fa-solid fa-pen-to-square text-xs"></i>
                              <span>تعديل</span>
                            </button>

                            <button
                              type="button"
                              class="p-1.5 rounded-lg bg-[#182338] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                              data-action="delete-level"
                              data-world-id="${escapeHtml(selectedWorld.id)}"
                              data-challenge-id="${escapeHtml(ch.id)}"
                              data-challenge-title="${escapeHtml(ch.title)}"
                              title="حذف هذا المستوى"
                            >
                              <i class="fa-solid fa-trash-can text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')
          }
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- SUB-TAB 3: LEVEL REORDERING & SEQUENCE -->
      <!-- ========================================================================= -->
      <div id="subtab-content-reorder" class="${activeSubTab === 'reorder' ? '' : 'hidden'} space-y-6">
        <div class="bg-[#101623] border border-[#1d273a] p-6 rounded-2xl shadow-xl space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c273c]">
            <div>
              <h3 class="text-base font-extrabold text-white flex items-center gap-2">
                <i class="fa-solid fa-arrow-down-up-across-line text-emerald-400"></i>
                <span>إدارة الترتيب والتسلسل لمستويات: ${escapeHtml(selectedWorld.title)}</span>
              </h3>
              <p class="text-xs text-slate-400 mt-1">
                استخدم أزرار التحريك ⬆️ و ⬇️ لتحديد التسلسل الدقيق الذي سيفتحه الطلاب في خريطة اللعبة.
              </p>
            </div>

            <div class="flex items-center gap-2">
              <label for="reorderWorldSelect" class="text-xs text-slate-400 font-semibold">العالم:</label>
              <select id="reorderWorldSelect" class="bg-[#0b1018] border border-[#1f2b42] text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer">
                ${ALL_WORLDS_DATA.map((w) => `<option value="${escapeHtml(w.id)}" ${w.id === selectedWorld.id ? 'selected' : ''}>${w.icon} ${escapeHtml(w.title)}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Reorderable List Items -->
          <div id="reorderItemsList" class="space-y-2.5">
            ${challenges.map((ch, idx) => `
              <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#0c121d] border border-[#1c273c] hover:border-emerald-500/30 transition-colors" data-challenge-id="${escapeHtml(ch.id)}">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-lg bg-[#151e30] border border-[#22314c] font-mono text-emerald-400 font-bold text-xs flex items-center justify-center">
                    #${idx + 1}
                  </span>
                  <div>
                    <div class="text-xs font-bold text-white">${escapeHtml(ch.title)}</div>
                    <div class="text-[11px] text-slate-400 font-mono">${escapeHtml(ch.id)} • ${ch.baseXp || 50} XP</div>
                  </div>
                </div>

                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    class="p-2 rounded-lg bg-[#151e30] hover:bg-[#1e2a44] text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer"
                    data-action="reorder-up"
                    data-challenge-id="${escapeHtml(ch.id)}"
                    ${idx === 0 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}
                    title="تحريك لأعلى"
                  >
                    <i class="fa-solid fa-arrow-up text-xs"></i>
                  </button>
                  <button
                    type="button"
                    class="p-2 rounded-lg bg-[#151e30] hover:bg-[#1e2a44] text-slate-300 hover:text-emerald-300 transition-colors cursor-pointer"
                    data-action="reorder-down"
                    data-challenge-id="${escapeHtml(ch.id)}"
                    ${idx === challenges.length - 1 ? 'disabled style="opacity:0.3;cursor:not-allowed;"' : ''}
                    title="تحريك لأسفل"
                  >
                    <i class="fa-solid fa-arrow-down text-xs"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pt-4 border-t border-[#1c273c] flex items-center justify-between">
            <span class="text-xs text-slate-400 flex items-center gap-1.5">
              <i class="fa-solid fa-circle-info text-emerald-400 text-xs"></i>
              <span>يتم حفظ وتطبيق الترتيب فورياً وتحديث خريطة الطلاب مباشرة.</span>
            </span>
            <button type="button" id="saveReorderedSequenceBtn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-glow-emerald transition-all cursor-pointer">
              <i class="fa-solid fa-check text-xs ml-1"></i>
              <span>تأكيد واعتماد الترتيب</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- SUB-TAB 4: STUDENT GAMEPLAY PREVIEW -->
      <!-- ========================================================================= -->
      <div id="subtab-content-preview" class="${activeSubTab === 'preview' ? '' : 'hidden'} space-y-6">
        <div class="bg-[#101623] border border-[#1d273a] p-4 rounded-2xl shadow-md flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-lg">
              <i class="fa-solid fa-gamepad"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">معاينة تجربة وخريطة الطالب (Sandbox Live Preview)</h3>
              <p class="text-xs text-slate-400 mt-0.5">يمكنك هنا خوض التحديات، فحص المحرر، وتجربة تشغيل كود بايثون كما يراه الطالب تماماً.</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" id="launchFullStudentSandboxBtn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-glow-cyan">
              <i class="fa-solid fa-play text-xs"></i>
              <span>خوض تحدي تجريبي الآن</span>
            </button>
          </div>
        </div>

        <div id="teacherLivePreviewContainer" class="rounded-2xl border border-[#1d273a] overflow-hidden min-h-[500px]">
          <!-- Student World Map or Sandbox loaded dynamically -->
        </div>
      </div>
    </div>
  `;
}

/**
 * Returns HTML for the Student Solutions Inspection Modal.
 */
export function renderStudentSolutionsModal(student, challengesList = []) {
  return `
    <div id="studentSolutionsInspectModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" dir="rtl">
      <div class="relative w-full max-w-3xl bg-[#101623] border border-[#1e2a3f] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <!-- Top Bar -->
        <div class="p-5 border-b border-[#1c273c] flex items-center justify-between gap-4 bg-[#131b2c]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg font-bold">
              ${escapeHtml(student.name ? student.name.charAt(0) : 'ط')}
            </div>
            <div>
              <h3 class="text-sm font-extrabold text-white flex items-center gap-2">
                <span>سجل حلول وأكواد الطالب: ${escapeHtml(student.name || 'طالب')}</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">${escapeHtml(student.studentCode || '')}</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">المجموعة: ${escapeHtml(student.group || 'عام')} • إجمالي XP: ${student.xp || 0}</p>
            </div>
          </div>

          <button type="button" id="closeStudentSolutionsModalBtn" class="w-8 h-8 rounded-lg bg-[#182236] hover:bg-[#202d47] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto space-y-4 flex-1">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 rounded-xl bg-[#0c121d] border border-[#1c273c] text-center">
              <span class="text-[11px] text-slate-400">التحديات المكتملة</span>
              <div class="text-base font-extrabold text-emerald-400 font-mono mt-0.5">${student.completedCount || 0}</div>
            </div>
            <div class="p-3 rounded-xl bg-[#0c121d] border border-[#1c273c] text-center">
              <span class="text-[11px] text-slate-400">نسبة التقدم</span>
              <div class="text-base font-extrabold text-cyan-400 font-mono mt-0.5">${student.percent || 0}%</div>
            </div>
            <div class="p-3 rounded-xl bg-[#0c121d] border border-[#1c273c] text-center">
              <span class="text-[11px] text-slate-400">نقاط الخبرة</span>
              <div class="text-base font-extrabold text-amber-400 font-mono mt-0.5">${student.xp || 0} XP</div>
            </div>
            <div class="p-3 rounded-xl bg-[#0c121d] border border-[#1c273c] text-center">
              <span class="text-[11px] text-slate-400">الأوسمة المفتوحة</span>
              <div class="text-base font-extrabold text-purple-400 font-mono mt-0.5">${student.badgesCount || 1}</div>
            </div>
          </div>

          <h4 class="text-xs font-bold text-slate-300 pt-2 border-t border-[#1c273c]">أحدث التحديات والحلول المسجلة:</h4>
          <div class="space-y-3">
            ${
              challengesList.length === 0
                ? `<div class="p-4 rounded-xl bg-[#0c121d] text-center text-xs text-slate-400">لا توجد سجلات أكواد مسجلة لهذا الطالب حتى الآن.</div>`
                : challengesList.map((item, idx) => `
                    <div class="p-4 rounded-xl bg-[#0c121d] border border-[#1c273c] space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-white flex items-center gap-1.5">
                          <i class="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
                          <span>${escapeHtml(item.title || `تحدي ${idx + 1}`)}</span>
                        </span>
                        <span class="text-[10px] text-slate-400 font-mono">نجوم: ⭐⭐⭐</span>
                      </div>
                      <div class="p-3 rounded-lg bg-[#070a10] border border-[#141b27] font-mono text-xs text-emerald-300 overflow-x-auto text-left" dir="ltr">
                        <pre><code>${escapeHtml(item.code || "# كود الطالب المحفوظ\nprint('Hello World')")}</code></pre>
                      </div>
                    </div>
                  `).join('')
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

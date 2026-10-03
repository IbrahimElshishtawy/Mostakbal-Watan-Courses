// src/features/attendance/components/attendance-sheet.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Returns high-fidelity HTML string for Attendance Management View matching Image 2.html.
 * 
 * @param {object} options
 * @param {Array} options.students
 * @param {Array} options.sessions
 * @param {string} [options.selectedSessionId="new"]
 * @param {object|null} [options.selectedSession=null]
 * @param {Map} [options.sessionRecords=new Map()]
 * @returns {string}
 */
export function renderAttendanceManagementView({
  students = [],
  sessions = [],
  selectedSessionId = "new",
  selectedSession = null,
  sessionRecords = new Map()
} = {}) {
  const today = new Date().toISOString().slice(0, 10);
  const isNewSession = selectedSessionId === "new" || !selectedSession;

  const currentTitle = !isNewSession ? (selectedSession?.title || selectedSession?.name || "") : "المحاضرة 4 - الدوال والمصفوفات البرمجية";
  const currentDate = !isNewSession ? (selectedSession?.date || selectedSession?.sessionDate || today) : today;
  const currentGroup = !isNewSession ? (selectedSession?.group || "group_sun_wed") : "group_sun_wed";

  // Authoritative student roster list from Firestore
  const displayStudents = Array.isArray(students) ? students : [];

  // Calculate live initial counts
  let presentCount = 0;
  let absentCount = 0;
  let excusedCount = 0;

  displayStudents.forEach((s) => {
    const sId = s.id || s.firestoreId || s.uid;
    const status = sessionRecords.get(sId) || (isNewSession ? "absent" : "present");
    if (status === "present") presentCount++;
    else if (status === "absent") absentCount++;
    else if (status === "excused") excusedCount++;
  });

  const totalStudents = displayStudents.length;
  const sessionRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  return `
    <div class="space-y-6" data-purpose="primary-workspace" dir="rtl">
      <!-- Top Title Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-surface-border/60">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <div class="h-10 w-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-accent-cyan text-xl">
              <i class="fa-solid fa-chart-column"></i>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">إدارة الغياب والحضور العام</h1>
          </div>
          <p class="text-sm text-slate-400 max-w-2xl leading-relaxed">
            تسجيل الحضور المركزي لجميع المجموعات التدريبية ومتابعة تقارير الانضباط وسجلات الطلاب التاريخية للمسار البرمجي.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2.5 rounded-xl bg-surface-card hover:bg-surface-lighter border border-surface-border text-slate-300 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all" id="historySessionsBtn" type="button">
            <i class="fa-solid fa-clock-rotate-left text-brand-400"></i>
            <span>سجل الجلسات السابقة</span>
          </button>
          <button class="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all" id="exportFullReportBtn" type="button">
            <i class="fa-solid fa-file-excel"></i>
            <span>تصدير تقرير شامل</span>
          </button>
        </div>
      </div>

      <!-- BEGIN: StatCardsGrid with Live Firebase Metrics -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-metrics-overview">
        <!-- Metric 1: Total Enrolled -->
        <div class="glass-panel p-5 rounded-2xl border border-surface-border relative overflow-hidden group hover:border-brand-500/40 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">إجمالي طلاب البرنامج</span>
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center text-base">
              <i class="fa-solid fa-users"></i>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-white font-mono" id="stat-total-students">${totalStudents}</span>
            <span class="text-xs text-slate-400 font-medium">طالباً مسجلاً</span>
          </div>
          <div class="mt-3 flex items-center gap-2 text-xs text-emerald-400">
            <i class="fa-solid fa-signal"></i>
            <span>مزامنة مباشرة مع فايربيز</span>
          </div>
        </div>

        <!-- Metric 2: Attendance Rate -->
        <div class="glass-panel p-5 rounded-2xl border border-surface-border relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">نسبة حضور الجلسة</span>
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-base">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-white font-mono" id="stat-attendance-rate">${sessionRate}%</span>
            <span class="text-xs text-emerald-400 font-medium font-mono">${sessionRate >= 80 ? "ممتاز" : (sessionRate >= 50 ? "متوسط" : "قيد الرصد")}</span>
          </div>
          <div class="mt-3 w-full bg-surface-lowest rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full" style="width: ${sessionRate}%"></div>
          </div>
        </div>

        <!-- Metric 3: Present in Session -->
        <div class="glass-panel p-5 rounded-2xl border border-surface-border relative overflow-hidden group hover:border-accent-cyan/40 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">حاضرون في جلسة اليوم</span>
            <div class="w-10 h-10 rounded-xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center text-base">
              <i class="fa-solid fa-user-check"></i>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-accent-cyan font-mono" id="stat-present-count">${presentCount}</span>
            <span class="text-xs text-slate-400 font-medium">من أصل ${totalStudents} طالب</span>
          </div>
          <div class="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <span class="inline-block w-2 h-2 rounded-full bg-accent-cyan"></span>
            <span>نسبة الحضور: <strong class="text-accent-cyan">${sessionRate}%</strong></span>
          </div>
        </div>

        <!-- Metric 4: Absent Students -->
        <div class="glass-panel p-5 rounded-2xl border border-surface-border relative overflow-hidden group hover:border-rose-500/40 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-400">الغياب المرصود حالياً</span>
            <div class="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-base">
              <i class="fa-solid fa-user-xmark"></i>
            </div>
          </div>
          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-rose-400 font-mono" id="stat-absent-count">${absentCount}</span>
            <span class="text-xs text-slate-400 font-medium">طلاب متغيبين</span>
          </div>
          <div class="mt-3 flex items-center gap-1.5 text-xs text-rose-400">
            <i class="fa-solid fa-circle-check text-[11px]"></i>
            <span>تحديث فوري للسجلات</span>
          </div>
        </div>
      </section>

      <!-- BEGIN: NewSessionCreationSection matching Image 2.html -->
      <section class="glass-panel rounded-2xl p-6 border border-surface-border shadow-xl relative overflow-hidden" data-purpose="session-registration-card">
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-surface-border/70">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-accent-cyan shadow-glow-cyan"></span>
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <i class="fa-regular fa-clipboard text-accent-cyan"></i>
              <span>تسجيل جلسة حضور وغياب جديدة</span>
            </h2>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-brand-500/20 text-accent-cyan text-xs font-semibold border border-brand-500/30">
              <i class="fa-solid fa-bolt mr-1"></i> جلسة جديدة نشطة
            </span>
            <span class="text-xs text-slate-400 hidden sm:inline">يتم ضبط الطلاب تلقائياً (غياب) حتى يتم تأكيد الحضور</span>
          </div>
        </div>

        <form class="space-y-4" id="sessionForm">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Input 1: Session Date -->
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1.5" for="session-date">
                <span class="text-rose-400">*</span> تاريخ الانعقاد:
              </label>
              <div class="relative">
                <input class="glass-input w-full rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono focus:ring-1 focus:ring-accent-cyan focus:border-accent-cyan" id="session-date" type="date" value="${escapeHtml(currentDate)}"/>
                <i class="fa-regular fa-calendar absolute left-3.5 top-3.5 text-slate-500 pointer-events-none text-sm"></i>
              </div>
            </div>

            <!-- Input 2: Session Selection / Topic -->
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1.5" for="session-list">
                <span class="text-rose-400">*</span> اختر الجلسة الدراسية:
              </label>
              <div class="relative">
                <select class="glass-input w-full rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:ring-1 focus:ring-accent-cyan focus:border-accent-cyan appearance-none cursor-pointer" id="session-list">
                  <option value="new" ${isNewSession ? "selected" : ""}>[+ جلسة جديدة ] - بدء رصد جلسة جديدة</option>
                  ${sessions.map((s) => `
                    <option value="${escapeHtml(s.id)}" ${selectedSessionId === s.id ? "selected" : ""}>
                      ${escapeHtml(s.name || s.title || `جلسة ${s.sessionNumber || ''}`)} (${escapeHtml(s.date || s.sessionDate || '')})
                    </option>
                  `).join("")}
                  ${sessions.length === 0 ? `
                    <option value="sess_03">الجلسة 03 - الدوال ومصفوفات البيانات (2026-09-25)</option>
                    <option value="sess_02">الجلسة 02 - هياكل التحكم وحلقات التكرار (2026-09-21)</option>
                    <option value="sess_01">الجلسة 01 - مقدمة بايثون وبيئة التطوير (2026-09-18)</option>
                  ` : ""}
                </select>
                <i class="fa-solid fa-chevron-down absolute left-3.5 top-3.5 text-slate-500 pointer-events-none text-xs"></i>
              </div>
            </div>

            <!-- Input 3: Lecture Title -->
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1.5" for="session-title">
                عنوان الجلسة / المحاضرة:
              </label>
              <div class="relative">
                <input class="glass-input w-full rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-accent-cyan" id="session-title" placeholder="مثال: المحاضرة 4 - الدوال والمصفوفات وقواعد البيانات" type="text" value="${escapeHtml(currentTitle)}"/>
                <i class="fa-solid fa-code absolute left-3.5 top-3.5 text-slate-500 pointer-events-none text-xs"></i>
              </div>
            </div>

            <!-- Input 4: Target Group -->
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1.5" for="session-group">
                المجموعة المستهدفة:
              </label>
              <div class="relative">
                <select class="glass-input w-full rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:ring-1 focus:ring-accent-cyan appearance-none cursor-pointer" id="session-group">
                  <option value="unified_group" selected>المجموعة التدريبية المعتمدة (الدفعة الموحدة)</option>
                </select>
                <i class="fa-solid fa-layer-group absolute left-3.5 top-3.5 text-slate-500 pointer-events-none text-xs"></i>
              </div>
            </div>
          </div>

          <!-- Quick Action Row -->
          <div class="flex flex-wrap items-center justify-between pt-2 gap-3">
            <div class="flex items-center gap-2 text-xs text-slate-400">
              <i class="fa-solid fa-circle-info text-brand-400"></i>
              <span>المشرف المسؤول عن توثيق الحضور: <strong class="text-slate-200">أحمد ممدوح</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <button class="px-5 py-2 rounded-xl bg-surface-lighter hover:bg-surface-border text-slate-300 text-xs font-semibold transition-all" id="resetSessionFormBtn" type="button">
                مسح البيانات
              </button>
              <button class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-cyan hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-glow-cyan transition-all flex items-center gap-2" id="openRosterBtn" type="button">
                <i class="fa-solid fa-folder-open"></i>
                <span>بدء فتح الكشف ورصد الحضور</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      <!-- BEGIN: AttendanceRosterTableSection matching Image 2.html -->
      <section class="glass-panel rounded-2xl border border-surface-border shadow-2xl overflow-hidden" data-purpose="attendance-roster-table">
        <!-- Table Control Toolbar -->
        <div class="p-4 sm:p-5 border-b border-surface-border bg-surface-lowest/50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <!-- Right: Search & Filtering -->
          <div class="flex flex-wrap items-center gap-3 flex-1">
            <div class="relative min-w-[260px] flex-1 max-w-md">
              <input class="glass-input w-full rounded-xl pr-10 pl-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500" id="search-input" placeholder="بحث باسم الطالب، كود التسجيل، أو الهاتف..." type="text"/>
              <i class="fa-solid fa-magnifying-glass absolute right-3.5 top-3 text-slate-500 text-xs sm:text-sm pointer-events-none"></i>
            </div>
            <!-- Status Filter -->
            <div class="flex items-center rounded-xl bg-surface-card border border-surface-border p-1 text-xs">
              <button class="px-2.5 py-1 rounded-lg bg-brand-500 text-white font-bold filter-status-btn active" data-filter="all">الكل</button>
              <button class="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white filter-status-btn" data-filter="present">حاضر (${presentCount})</button>
              <button class="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white filter-status-btn" data-filter="absent">غائب (${absentCount})</button>
            </div>
          </div>

          <!-- Left: Batch Operations & Save Roster -->
          <div class="flex flex-wrap items-center gap-2.5">
            <!-- Quick Batch Buttons -->
            <div class="flex items-center gap-1.5 bg-surface-card p-1 rounded-xl border border-surface-border">
              <button class="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all flex items-center gap-1.5" id="mark-all-present" title="تحديد جميع الطلاب كحاضرين" type="button">
                <i class="fa-solid fa-check-double text-[11px]"></i>
                <span>الكل حاضر</span>
              </button>
              <button class="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-bold transition-all flex items-center gap-1.5" id="mark-all-absent" title="تحديد جميع الطلاب كغائبين" type="button">
                <i class="fa-solid fa-xmark text-[11px]"></i>
                <span>الكل غائب</span>
              </button>
            </div>

            <!-- Save & Submit Roster Button -->
            <button class="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-glow-emerald transition-all flex items-center gap-2" id="save-roster-btn" type="button">
              <i class="fa-solid fa-floppy-disk text-base"></i>
              <span>حفظ واعتماد الكشف</span>
            </button>
          </div>
        </div>

        <!-- Roster Table Responsive Wrapper -->
        <div class="overflow-x-auto">
          <table class="w-full text-right border-collapse">
            <thead>
              <tr class="border-b border-surface-border bg-surface-card/60 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th class="py-3 px-4 w-12 text-center" scope="col">#</th>
                <th class="py-3 px-4" scope="col">كود الطالب</th>
                <th class="py-3 px-4 min-w-[220px]" scope="col">اسم الطالب وبيانات الدورة</th>
                <th class="py-3 px-4" scope="col">المجموعة المعتمدة</th>
                <th class="py-3 px-4" scope="col">رقم الهاتف / واتساب</th>
                <th class="py-3 px-4 text-center min-w-[260px]" scope="col">تسجيل ورصد الحالة</th>
                <th class="py-3 px-4 text-center" scope="col">إجراءات سريعة</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-border/50 text-xs sm:text-sm" id="student-roster-rows">
              ${displayStudents
                .map((student, idx) => {
                  let isPresent = false;
                  let isAbsent = true;
                  let isExcused = false;
                  if (!isNewSession) {
                    const currentStatus = sessionRecords.get(student.id) || student.defaultStatus || "absent";
                    isPresent = currentStatus === "present";
                    isAbsent = currentStatus === "absent";
                    isExcused = currentStatus === "excused";
                  }
                  const rowBgClass = isAbsent ? "bg-rose-500/[0.02]" : "";

                  return `
                    <tr class="hover:bg-surface-lighter/50 transition-colors group ${rowBgClass}" data-student-id="${escapeHtml(student.id)}">
                      <td class="py-3.5 px-4 font-mono font-bold text-slate-400 text-center">${idx + 1}</td>
                      <td class="py-3.5 px-4 font-mono text-xs text-accent-cyan font-semibold">${escapeHtml(student.studentCode || student.id)}</td>
                      <td class="py-3.5 px-4">
                        <div class="flex items-center gap-3">
                          <div class="w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs ${student.avatarBg || 'bg-brand-500/10 border-brand-500/20 text-brand-400'}">
                            ${escapeHtml(student.avatarLetter || student.name?.charAt(0) || 'ط')}
                          </div>
                          <div>
                            <div class="font-bold text-white group-hover:text-accent-cyan transition-colors">${escapeHtml(student.name)}</div>
                            <div class="text-[11px] text-slate-400 flex items-center gap-2">
                              <span>${escapeHtml(student.track || 'مسار: بايثون الأساسي')}</span>
                              <span class="text-slate-600">•</span>
                              <span class="text-emerald-400 font-mono">حضور: ${escapeHtml(student.attendanceRate || '100%')}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-semibold">
                          <i class="fa-solid fa-graduation-cap text-[10px]"></i> ${escapeHtml(student.group || 'المجموعة المعتمدة')}
                        </span>
                      </td>
                      <td class="py-3.5 px-4 font-mono text-slate-300 text-xs">
                        <div class="flex items-center gap-2">
                          <span>${escapeHtml(student.phone || '01000000000')}</span>
                          <a class="text-emerald-400 hover:text-emerald-300 p-1" href="https://wa.me/2${escapeHtml(student.phone || '')}" rel="noopener" target="_blank" title="مراسلة عبر واتساب">
                            <i class="fa-brands fa-whatsapp text-sm"></i>
                          </a>
                        </div>
                      </td>
                      <td class="py-3.5 px-4">
                        <!-- Attendance Switch Buttons -->
                        <div class="flex items-center justify-center gap-1 bg-surface-lowest p-1 rounded-xl border border-surface-border">
                          <button
                            class="status-btn ${isPresent ? 'active-present' : 'border-transparent text-slate-400 hover:text-slate-200'} px-3.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5"
                            data-action-status="present"
                            data-student-id="${escapeHtml(student.id)}"
                            type="button"
                          >
                            <i class="fa-solid fa-check text-[11px]"></i>
                            <span>حاضر</span>
                          </button>

                          <button
                            class="status-btn ${isAbsent ? 'active-absent' : 'border-transparent text-slate-400 hover:text-slate-200'} px-3.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5"
                            data-action-status="absent"
                            data-student-id="${escapeHtml(student.id)}"
                            type="button"
                          >
                            <i class="fa-solid fa-xmark text-[11px]"></i>
                            <span>غائب</span>
                          </button>

                          <button
                            class="status-btn ${isExcused ? 'active-excused' : 'border-transparent text-slate-400 hover:text-slate-200'} px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5"
                            data-action-status="excused"
                            data-student-id="${escapeHtml(student.id)}"
                            type="button"
                          >
                            <i class="fa-solid fa-hand-holding-medical text-[11px]"></i>
                            <span>عذر</span>
                          </button>
                        </div>
                      </td>
                      <td class="py-3.5 px-4 text-center">
                        <div class="flex items-center justify-center gap-2">
                          <button class="p-1.5 rounded-lg text-slate-400 hover:text-brand-400 hover:bg-surface-card transition-colors student-note-btn" data-student-id="${escapeHtml(student.id)}" title="إضافة ملاحظة سلوكية" type="button">
                            <i class="fa-regular fa-comment-dots"></i>
                          </button>
                          <button class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-card transition-colors student-profile-btn" data-student-id="${escapeHtml(student.id)}" title="الملف الكامل للطالب" type="button">
                            <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
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

        <!-- Table Footer / Pagination matching Image 2.html -->
        <div class="p-4 border-t border-surface-border bg-surface-lowest/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span>عرض 1 إلى ${displayStudents.length} من إجمالي 24 طالب مسجل</span>
            <span class="text-slate-600">|</span>
            <span class="text-emerald-400 font-semibold" id="footer-present-count">${presentCount || 22} حاضر</span>
            <span class="text-slate-600">•</span>
            <span class="text-rose-400 font-semibold" id="footer-absent-count">${absentCount || 2} غائب</span>
            <span class="text-slate-600">•</span>
            <span class="text-amber-400 font-semibold" id="footer-excused-count">${excusedCount || 1} معتذر</span>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border hover:bg-surface-lighter text-slate-400 hover:text-white disabled:opacity-50" disabled="">
              <i class="fa-solid fa-chevron-right ml-1"></i> السابق
            </button>
            <div class="flex items-center gap-1 font-mono">
              <button class="w-8 h-8 rounded-lg bg-brand-500 text-white font-bold">1</button>
              <button class="w-8 h-8 rounded-lg hover:bg-surface-lighter text-slate-400">2</button>
              <button class="w-8 h-8 rounded-lg hover:bg-surface-lighter text-slate-400">3</button>
            </div>
            <button class="px-3 py-1.5 rounded-lg bg-surface-card border border-surface-border hover:bg-surface-lighter text-slate-300 hover:text-white">
              التالي <i class="fa-solid fa-chevron-left mr-1"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
}

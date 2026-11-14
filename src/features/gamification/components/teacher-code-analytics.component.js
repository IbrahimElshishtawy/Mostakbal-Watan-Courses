// src/features/gamification/components/teacher-code-analytics.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders Teacher & Supervisor Code Analytics Dashboard.
 */
export function renderTeacherCodeAnalyticsView(state) {
  const {
    overview = null,
    selectedStudent = null,
    codeHistory = null,
    activeSubTab = "overview",
    dailyReport = null,
    weeklyReport = null,
    isLoading = false
  } = state;

  return `
    <div class="gam-teacher-analytics">
      <!-- Top Header & Tabs -->
      <div class="gam-hero-strip mb-4">
        <div>
          <span class="badge" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3);">
            لوحة الإشراف وتحليلات الأكواد 👨‍🏫
          </span>
          <h2 class="text-xl font-black text-white mt-1">مركز تحليلات أداء الطلاب البرمجي</h2>
          <p class="text-xs text-slate-400">متابعة تسليمات الكود، تطور النسخ، إحصائيات الأخطاء، والتقارير الأسبوعية.</p>
        </div>

        <!-- Sub-Tabs Navigation -->
        <div class="gam-tabs-nav" style="margin-bottom: 0;">
          <button type="button" class="gam-tab-btn ${activeSubTab === "overview" ? "active" : ""}" data-teacher-tab="overview">
            <span>📊</span>
            <span>نظرة عامة للصف</span>
          </button>
          <button type="button" class="gam-tab-btn ${activeSubTab === "student" ? "active" : ""}" data-teacher-tab="student">
            <span>👤</span>
            <span>تقرير الطالب الفردي</span>
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
            <div class="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <span class="text-xs text-slate-400 font-bold d-block mb-1">إجمالي الطلاب</span>
              <strong class="text-2xl text-white font-black">${overview?.totalStudents ?? 0}</strong>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <span class="text-xs text-emerald-300 font-bold d-block mb-1">الطلاب النشطون</span>
              <strong class="text-2xl text-emerald-400 font-black">${overview?.activeStudents ?? 0}</strong>
            </div>
            <div class="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-center">
              <span class="text-xs text-sky-300 font-bold d-block mb-1">المهام المنجزة</span>
              <strong class="text-2xl text-sky-400 font-black">${overview?.completedCodingTasks ?? 0}</strong>
            </div>
            <div class="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center">
              <span class="text-xs text-amber-300 font-bold d-block mb-1">نسبة النجاح العامة</span>
              <strong class="text-2xl text-amber-400 font-black">${overview?.successRate ?? 100}%</strong>
            </div>
          </div>

          <!-- Students with declining activity -->
          ${overview?.decliningStudents && overview.decliningStudents.length > 0 ? `
            <div class="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 mb-6">
              <h4 class="text-sm font-bold text-rose-300 mb-2 d-flex items-center gap-2">
                <span>⚠️</span>
                <span>تنبيه المتابعة الأكاديمية: طلاب بحاجة لتشجيع ومتابعة (${overview.decliningStudents.length})</span>
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                ${overview.decliningStudents.map(s => `
                  <div class="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 d-flex justify-between items-center">
                    <strong class="text-white">${escapeHtml(s.name)}</strong>
                    <span class="text-slate-400 text-[11px]">آخر نشاط: ${s.lastActive?.split("T")[0] || "منذ فترة"}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>
      ` : ""}

      <!-- TAB 2: INDIVIDUAL STUDENT REPORT -->
      ${activeSubTab === "student" ? `
        <div class="gam-student-tab">
          ${!selectedStudent ? `
            <div class="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800">
              <p class="text-xs text-slate-400">يرجى تحديد أو إدخال معرف الطالب لعرض تقريره الفردي المفصل.</p>
            </div>
          ` : `
            <div class="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 mb-6">
              <div class="d-flex items-center justify-between flex-wrap gap-3 mb-4 pb-4 border-b border-slate-800">
                <div class="d-flex items-center gap-3">
                  <div class="avatar avatar-md font-bold">${(selectedStudent.studentName || "ط").charAt(0)}</div>
                  <div>
                    <h3 class="text-base font-bold text-white">${escapeHtml(selectedStudent.studentName)}</h3>
                    <span class="text-xs text-slate-400">${selectedStudent.studentPhone} • المجموعة: ${selectedStudent.group}</span>
                  </div>
                </div>

                <div class="d-flex gap-2">
                  <span class="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    المستوى ${selectedStudent.level} • ${selectedStudent.xp} XP
                  </span>
                  <span class="badge bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    🪙 ${selectedStudent.coins} عملة
                  </span>
                </div>
              </div>

              <!-- Metrics subgrid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mb-4">
                <div class="p-3 bg-slate-800/40 rounded-xl">
                  <span class="text-[11px] text-slate-400 d-block">المهام المكتملة</span>
                  <strong class="text-sm text-white">${selectedStudent.tasksCompleted}</strong>
                </div>
                <div class="p-3 bg-slate-800/40 rounded-xl">
                  <span class="text-[11px] text-slate-400 d-block">محاولات التنفيذ</span>
                  <strong class="text-sm text-white">${selectedStudent.executionAttempts}</strong>
                </div>
                <div class="p-3 bg-slate-800/40 rounded-xl">
                  <span class="text-[11px] text-slate-400 d-block">معدل الأخطاء</span>
                  <strong class="text-sm text-rose-400">${selectedStudent.errorStatistics?.totalErrors ?? 0} خطأ</strong>
                </div>
                <div class="p-3 bg-slate-800/40 rounded-xl">
                  <span class="text-[11px] text-slate-400 d-block">متوسط وقت الحل</span>
                  <strong class="text-sm text-sky-400">${selectedStudent.avgSolvingDurationMinutes} دقيقة</strong>
                </div>
              </div>
            </div>
          `}
        </div>
      ` : ""}

      <!-- TAB 3: CODE HISTORY & DIFF -->
      ${activeSubTab === "history" ? `
        <div class="gam-history-tab">
          <div class="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 mb-4">
            <h4 class="text-sm font-bold text-white mb-3">سجل النسخ المحفوظة للكود (Version Snapshots) 📜</h4>
            
            ${!codeHistory || !codeHistory.snapshots || codeHistory.snapshots.length === 0 ? `
              <p class="text-xs text-slate-400 text-center py-6">لا توجد نسخ مسجلة حالياً لهذا الطالب.</p>
            ` : `
              <div class="space-y-3">
                ${codeHistory.snapshots.map((snap, idx) => `
                  <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div class="d-flex items-center justify-between mb-2">
                      <span class="text-xs font-bold text-white">النسخة v${snap.version} (${snap.trigger === "manual_save" ? "حفظ يدوي 💾" : snap.trigger === "test_run" ? "تشغيل اختبار 🧪" : "تسليم نهائي 🚀"})</span>
                      <span class="text-[11px] text-slate-400">${new Date(snap.timestamp).toLocaleString("ar-EG")}</span>
                    </div>
                    <pre style="direction: ltr; text-align: left; background: #070b14; padding: 0.75rem; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: #a5f3fc; overflow-x: auto;"><code>${escapeHtml(snap.code)}</code></pre>
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
          <div class="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h4 class="text-sm font-bold text-emerald-400 mb-2">📅 التقرير اليومي للصف</h4>
            <div class="space-y-2 text-xs text-slate-300">
              <div class="d-flex justify-between">
                <span>الطلاب النشطون اليوم:</span>
                <strong class="text-white">${dailyReport?.activeStudentsToday ?? 0}</strong>
              </div>
              <div class="d-flex justify-between">
                <span>عمليات تشغيل الكود اليومية:</span>
                <strong class="text-white">${dailyReport?.totalDailyExecutions ?? 0}</strong>
              </div>
              <div class="d-flex justify-between">
                <span>التشغيلات الناجحة:</span>
                <strong class="text-emerald-400">${dailyReport?.successfulRuns ?? 0}</strong>
              </div>
              <div class="d-flex justify-between">
                <span>أخطاء بناء الجملة (Syntax Errors):</span>
                <strong class="text-amber-400">${dailyReport?.syntaxErrors ?? 0}</strong>
              </div>
            </div>
          </div>

          <!-- Weekly Comparison -->
          <div class="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h4 class="text-sm font-bold text-sky-400 mb-2">📈 التقرير الأسبوعي المقارن</h4>
            <p class="text-xs text-slate-300 mb-3 leading-relaxed">
              ${weeklyReport?.summary || "جاري تجميع بيانات الأداء الأسبوعي مقارنة بالأسبوع الماضي."}
            </p>
            <div class="text-xs text-slate-400">
              إجمالي المهام المفتوحة هذا الأسبوع: <strong class="text-white">${weeklyReport?.totalWeeklyTasksStarted ?? 0}</strong>
            </div>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

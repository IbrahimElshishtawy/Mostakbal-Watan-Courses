// src/features/gamification/components/admin-gamification-center.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders Administrative Gamification & Season Management Center.
 */
export function renderAdminGamificationCenterView(state) {
  const {
    activeSeason = null,
    resetPreview = null,
    isLoading = false,
    activeAdminTab = "seasons",
    auditLogs = []
  } = state;

  return `
    <div class="gam-admin-center">
      <div class="gam-hero-strip mb-4">
        <div>
          <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3);">
            لوحة الإدارة والتحكم الشامل 🛡️
          </span>
          <h2 class="text-xl font-black text-white mt-1">إدارة المواسم واقتصاد النقاط والعملات</h2>
          <p class="text-xs text-slate-400">التحكم في بدء المواسم، الأرشفة الآمنة، مراجعة سجلات التدقيق، وضبط إعدادات الأسئلة.</p>
        </div>

        <div class="gam-tabs-nav" style="margin-bottom: 0;">
          <button type="button" class="gam-tab-btn ${activeAdminTab === "seasons" ? "active" : ""}" data-admin-tab="seasons">
            <span>🔄</span>
            <span>إدارة المواسم وإعادة التعيين</span>
          </button>
          <button type="button" class="gam-tab-btn ${activeAdminTab === "economy" ? "active" : ""}" data-admin-tab="economy">
            <span>⚙️</span>
            <span>إعدادات الاقتصاد والتوزيع</span>
          </button>
          <button type="button" class="gam-tab-btn ${activeAdminTab === "audit" ? "active" : ""}" data-admin-tab="audit">
            <span>📜</span>
            <span>سجل التدقيق الأمني (Audit Logs)</span>
          </button>
        </div>
      </div>

      <!-- TAB 1: SEASON MANAGEMENT -->
      ${activeAdminTab === "seasons" ? `
        <div class="gam-admin-seasons space-y-4">
          <!-- Active Season Card -->
          <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div class="d-flex items-center justify-between flex-wrap gap-2 mb-3">
              <div>
                <span class="text-xs text-slate-400 font-bold d-block">الموسم النشط حالياً</span>
                <h3 class="text-lg font-black text-white">${escapeHtml(activeSeason?.title || "الموسم 2026 / 2027")}</h3>
              </div>
              <span class="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-3 py-1">
                حالة الموسم: نشط (Active) ✓
              </span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300 mb-4">
              <div class="p-2.5 rounded-xl bg-slate-800/40">
                <span class="text-slate-400 d-block mb-0.5">معرف الموسم:</span>
                <strong class="text-white">${activeSeason?.seasonId || "season_2026_01"}</strong>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-800/40">
                <span class="text-slate-400 d-block mb-0.5">تاريخ البداية:</span>
                <strong class="text-white">${activeSeason?.startDate?.split("T")[0] || "2026-09-01"}</strong>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-800/40">
                <span class="text-slate-400 d-block mb-0.5">مضاعف النقاط:</span>
                <strong class="text-white">${activeSeason?.xpMultiplier || 1.0}x</strong>
              </div>
            </div>
          </div>

          <!-- Controlled Fresh Start & Archival Section -->
          <div class="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <div class="d-flex items-center gap-2 mb-2 text-amber-400 font-bold">
              <span>⚠️</span>
              <h4 class="text-sm">إعادة تعيين وبدء موسم جديد آمن (Fresh Start / Season Reset)</h4>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">
              يقوم هذا الإجراء بأرشفة نقاط الطلاب، مستوياتهم، ومراكزهم للموسم الحالي بشكل دائم في <code class="text-amber-300">season_archives</code>،
              ثم إعادة ضبط المستويات للمستوى 1 و 0 XP و 0 Coins لبدء منافسة جديدة شريفة.
              <strong class="text-white d-block mt-1">🔒 ضمان الأمان المطلق: لن يتم مسح أي حساب طالب، أو درجات امتحانات، أو غياب، أو واجبات إطلاقاً.</strong>
            </p>

            <div class="d-flex gap-3 flex-wrap">
              <button type="button" class="btn btn-secondary text-xs font-bold px-4 py-2" id="gamDryRunPreviewBtn" ${isLoading ? "disabled" : ""}>
                معاينة تجريبية قبل التنفيذ (Dry-Run Preview) 🔍
              </button>
            </div>

            <!-- Dry Run Preview Result Box -->
            ${resetPreview ? `
              <div class="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 animate-fadeIn text-xs">
                <h5 class="font-bold text-white mb-2">📋 نتائج المعاينة التجريبية للموسم (${escapeHtml(resetPreview.targetSeasonId)}):</h5>
                <ul class="space-y-1 text-slate-300 mb-3">
                  <li>• عدد الطلاب المؤهلين للأرشفة والبدء الجديد: <strong class="text-emerald-400 font-bold">${resetPreview.eligibleStudents} طالب</strong></li>
                  <li>• إجمالي نقاط الخبرة المراد أرشفاتها: <strong class="text-amber-400 font-bold">${resetPreview.totalCurrentXp} XP</strong></li>
                  <li>• إجمالي العملات المؤرشفة: <strong class="text-amber-400 font-bold">${resetPreview.totalCurrentCoins} عملة</strong></li>
                </ul>

                <div class="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-300 mb-3 text-[11px]">
                  <strong>الضمانات المحمية:</strong>
                  <ul class="mt-1 space-y-0.5">
                    ${(resetPreview.guaranteedProtection || []).map(g => `<li>✓ ${escapeHtml(g)}</li>`).join("")}
                  </ul>
                </div>

                <!-- Confirmation Form -->
                <div class="p-3 rounded-lg bg-red-950/30 border border-red-500/40">
                  <span class="text-red-400 font-bold d-block mb-1">تأكيد التنفيذ الإداري النهائي:</span>
                  <p class="text-[11px] text-slate-400 mb-2">للتأكيد، اكتب رمز الأمان: <code class="text-red-300">CONFIRM_SEASON_RESET_2026</code></p>
                  
                  <div class="d-flex gap-2 flex-wrap">
                    <input type="text" id="gamAdminConfirmKeyInput" placeholder="CONFIRM_SEASON_RESET_2026" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs" style="width: 260px;" />
                    <input type="text" id="gamNextSeasonIdInput" value="season_2027_01" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs" style="width: 160px;" />
                    <button type="button" id="gamExecuteResetBtn" class="btn btn-danger text-xs font-bold px-4 py-1.5">
                      تأكيد الأرشفة وبدء الموسم الجديد 🚀
                    </button>
                  </div>
                </div>
              </div>
            ` : ""}
          </div>
        </div>
      ` : ""}

      <!-- TAB 2: ECONOMY CONFIGURATION -->
      ${activeAdminTab === "economy" ? `
        <div class="gam-admin-economy p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs">
          <h4 class="text-sm font-bold text-white mb-2">معدلات توزيع النقاط والعملات في النظام ⚙️</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
            <div class="p-3 bg-slate-800/40 rounded-xl">
              <strong class="text-white d-block mb-1">مكافآت التحدي اليومي (XP):</strong>
              <div>• السؤال السهل: <strong>+5 XP</strong></div>
              <div>• السؤال المتوسط: <strong>+10 XP</strong></div>
              <div>• السؤال الصعب: <strong>+15 XP</strong></div>
              <div>• بونص إكمال الستة أسئلة: <strong>+10 XP</strong></div>
            </div>

            <div class="p-3 bg-slate-800/40 rounded-xl">
              <strong class="text-white d-block mb-1">مكافآت التكليفات البرمجية (العملات):</strong>
              <div>• مهمة بسيطة: <strong>+10 عملات</strong></div>
              <div>• مهمة متوسطة: <strong>+25 عملة</strong></div>
              <div>• مهمة صعبة: <strong>+50 عملة</strong></div>
              <div>• مشروع متكامل: <strong>+100 عملة</strong></div>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- TAB 3: AUDIT LOGS -->
      ${activeAdminTab === "audit" ? `
        <div class="gam-admin-audit p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h4 class="text-sm font-bold text-white mb-3">سجل تدقيق الإجراءات الإدارية 📜</h4>
          ${auditLogs.length === 0 ? `
            <p class="text-xs text-slate-400 text-center py-6">لا توجد عمليات مسجلة حتى الآن.</p>
          ` : `
            <div class="space-y-2 text-xs">
              ${auditLogs.map(log => `
                <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 d-flex justify-between items-center">
                  <div>
                    <strong class="text-emerald-400">${escapeHtml(log.action)}</strong>
                    <span class="text-slate-400 text-[11px] mr-2">بواسطة: ${escapeHtml(log.adminEmail || "Admin")}</span>
                  </div>
                  <span class="text-slate-500 text-[11px]">${log.timestamp?.split("T")[0] || ""}</span>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      ` : ""}
    </div>
  `;
}

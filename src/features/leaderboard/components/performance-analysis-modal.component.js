// src/features/leaderboard/components/performance-analysis-modal.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderModal, openModal, closeModal } from "../../../shared/components/Modal/modal.component.js";

export const PERFORMANCE_MODAL_ID = "leaderboardPerformanceAnalysisModal";

/**
 * Renders the HTML body content for the Personal Performance & Points Comparison Modal.
 */
export function renderPerformanceAnalysisModalContent({ currentUser = {}, topStudents = [], totalStudents = 220 }) {
  const rank = currentUser.rank || 1;
  const currentXp = currentUser.xp || 0;
  const level = currentUser.level || 1;
  const streak = currentUser.streak || 1;
  const tasksDone = currentUser.tasksDone || currentUser.solvedCount || 0;
  const accuracy = currentUser.accuracy || "100%";

  // Find 1st place champion
  const top1 = topStudents[0] || null;
  const top1Xp = top1?.xp || 0;
  const gapToTop1 = Math.max(0, top1Xp - currentXp);

  // Find 3rd place (Podium threshold)
  const top3 = topStudents[2] || topStudents[topStudents.length - 1] || null;
  const top3Xp = top3?.xp || 0;
  const gapToTop3 = Math.max(0, top3Xp - currentXp + (rank > 3 ? 10 : 0));

  // Find competitor directly ahead (rank - 1)
  const aheadCompetitor = rank > 1 ? (topStudents[rank - 2] || null) : null;
  const aheadXp = aheadCompetitor?.xp || 0;
  const gapToAhead = Math.max(5, aheadXp - currentXp + 5);

  // Calculate podium progress percentage
  const targetPodiumXp = Math.max(100, top3Xp > 0 ? top3Xp : 100);
  const podiumPercent = Math.min(100, Math.round((currentXp / targetPodiumXp) * 100));

  // Next level calculation
  const nextLevelXp = level * 150;
  const levelPercent = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  return `
    <div class="lb-perf-modal-wrap" style="text-align: right; direction: rtl; font-family: 'Cairo', system-ui, sans-serif;">
      <!-- Hero Standing Header -->
      <div class="p-4 rounded-2xl mb-4" style="background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1px solid rgba(56, 189, 248, 0.4); box-shadow: 0 4px 20px rgba(14, 165, 233, 0.15);">
        <div class="d-flex items-center justify-between flex-wrap gap-3">
          <div class="d-flex items-center gap-3">
            <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: 2px solid #38bdf8; color: #fff; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 900; box-shadow: 0 0 15px rgba(56, 189, 248, 0.4); flex-shrink: 0;">
              #${rank}
            </div>
            <div>
              <div class="d-flex items-center gap-2">
                <span class="badge" style="background: rgba(14, 165, 233, 0.2); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.4); font-size: 0.72rem; padding: 2px 8px; border-radius: 6px;">المهندس</span>
                <h3 class="text-base font-black text-white m-0">${escapeHtml(currentUser.studentName || "حسابك الشخصي")}</h3>
                <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); font-size: 0.7rem; padding: 2px 6px; border-radius: 6px;">أنت (حسابك الشخصي)</span>
              </div>
              <p class="text-xs text-slate-300 mt-1 mb-0">
                الترتيب الحالي: <strong>المركز #${rank}</strong> من أصل <strong>${totalStudents}</strong> طالباً مسجلاً بالمسار.
              </p>
            </div>
          </div>

          <div class="d-flex items-center gap-2">
            <span class="badge font-mono font-bold" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 0.85rem; padding: 4px 10px; border-radius: 8px;">
              ⚡ ${currentXp.toLocaleString()} XP
            </span>
            <span class="badge font-bold" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.8rem; padding: 4px 10px; border-radius: 8px;">
              المستوى ${level}
            </span>
          </div>
        </div>
      </div>

      <!-- Podium Gap & Next Milestone Banner -->
      <div class="p-4 rounded-2xl mb-4" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(245, 158, 11, 0.35);">
        <div class="d-flex items-center justify-between mb-2">
          <div class="d-flex items-center gap-2">
            <span class="text-lg">🥉</span>
            <strong class="text-sm font-bold text-amber-300">مسافة الصعود نحو منصة التتويج (Top 3)</strong>
          </div>
          <span class="text-xs font-mono font-bold text-amber-400">
            ${rank <= 3 ? "🏆 أنت بالفعل ضمن ثلاثي الصدارة!" : `متبقي ${gapToTop3.toLocaleString()} XP للتتويج`}
          </span>
        </div>

        <div style="background: rgba(30, 41, 59, 0.6); border-radius: 9999px; height: 10px; overflow: hidden; position: relative;" class="mb-2">
          <div style="width: ${rank <= 3 ? 100 : podiumPercent}%; background: linear-gradient(90deg, #f59e0b, #38bdf8); height: 100%; border-radius: 9999px; transition: width 0.6s ease;"></div>
        </div>

        <p class="text-xs text-slate-300 m-0 leading-relaxed">
          ${rank === 1
            ? "👑 تهانينا! أنت تتربع على قمة لوحة الشرف بالمركز الأول. استمر في حل التحديات للحفاظ على اللقب!"
            : rank <= 3
            ? "🎉 أنت الآن على منصة التتويج ضمن أفضل 3 مبرمجين بالدفعة! حل تحديات إضافية يقربك من المركز الأول."
            : `للوصول إلى منصة التتويج وتخطي المركز الثالث، تحتاج إلى جمع <strong>${gapToTop3.toLocaleString()} XP</strong> إضافية. يمكنك تحقيقها بإتمام تحديات بايثون والتحدي اليومي.`}
        </p>
      </div>

      <!-- Head-to-Head Comparison Cards (3 Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <!-- Card 1: Top 1 Champion -->
        <div class="p-3.5 rounded-xl text-center" style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25);">
          <span class="text-xs text-amber-400 font-bold d-block mb-1">🥇 المركز الأول (البطل)</span>
          <strong class="text-xs text-white d-block truncate mb-1">${escapeHtml(top1?.studentName || "المتصدر الأول")}</strong>
          <span class="text-[11px] font-mono text-amber-300 d-block font-bold">${top1Xp.toLocaleString()} XP</span>
          <span class="text-[10px] text-slate-400 d-block mt-1">الفارق معك: +${gapToTop1.toLocaleString()} XP</span>
        </div>

        <!-- Card 2: 3rd Place (Podium) -->
        <div class="p-3.5 rounded-xl text-center" style="background: rgba(217, 119, 6, 0.08); border: 1px solid rgba(217, 119, 6, 0.25);">
          <span class="text-xs text-orange-400 font-bold d-block mb-1">🥉 المركز الثالث (التتويج)</span>
          <strong class="text-xs text-white d-block truncate mb-1">${escapeHtml(top3?.studentName || "صاحب المركز 3")}</strong>
          <span class="text-[11px] font-mono text-orange-300 d-block font-bold">${top3Xp.toLocaleString()} XP</span>
          <span class="text-[10px] text-slate-400 d-block mt-1">الفارق للتتويج: +${gapToTop3.toLocaleString()} XP</span>
        </div>

        <!-- Card 3: Direct Ahead Competitor -->
        <div class="p-3.5 rounded-xl text-center" style="background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.25);">
          <span class="text-xs text-sky-400 font-bold d-block mb-1">⬆️ المنافس المباشر #${Math.max(1, rank - 1)}</span>
          <strong class="text-xs text-white d-block truncate mb-1">${aheadCompetitor ? escapeHtml(aheadCompetitor.studentName) : "أنت في المقدمة!"}</strong>
          <span class="text-[11px] font-mono text-sky-300 d-block font-bold">${aheadCompetitor ? `${aheadXp.toLocaleString()} XP` : "—"}</span>
          <span class="text-[10px] text-slate-400 d-block mt-1">${aheadCompetitor ? `متبقي ${gapToAhead.toLocaleString()} XP لتخطيه` : "لا يوجد منافس أمامك"}</span>
        </div>
      </div>

      <!-- Points Breakdown & Economy Matrix -->
      <div class="p-4 rounded-2xl mb-4" style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.08);">
        <h4 class="text-xs font-bold text-slate-200 mb-3 d-flex items-center gap-2">
          <span>💡</span>
          <span>خطة تحصيل النقاط السريعة ومصادر الـ XP في المنصة:</span>
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
          <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 d-flex items-start gap-2.5">
            <span class="text-xl">🐍</span>
            <div>
              <strong class="text-white d-block font-bold">مغامرة وتحديات بايثون (20 عالماً)</strong>
              <span class="text-slate-400 text-[11px] d-block mt-0.5">
                كل مستوى تحله يمنحك من <strong>+10 إلى +50 XP</strong> فورية مع بونص الزعيم 👑.
              </span>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 d-flex items-start gap-2.5">
            <span class="text-xl">🎯</span>
            <div>
              <strong class="text-white d-block font-bold">التحدي اليومي السريع (24 ساعة)</strong>
              <span class="text-slate-400 text-[11px] d-block mt-0.5">
                6 أسئلة متدرجة يومياً تمنحك <strong>+100 XP</strong> دفعة واحدة وتزيد سلسلة نشاطك.
              </span>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 d-flex items-start gap-2.5">
            <span class="text-xl">🔥</span>
            <div>
              <strong class="text-white d-block font-bold">سلسلة التتابع والمواظبة (Streak)</strong>
              <span class="text-slate-400 text-[11px] d-block mt-0.5">
                الدخول اليومي المستمر يمنحك شارات حصرية ودرع الصدارة لحماية نقاطك.
              </span>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 d-flex items-start gap-2.5">
            <span class="text-xl">📋</span>
            <div>
              <strong class="text-white d-block font-bold">التاسكات والواجبات البرمجية</strong>
              <span class="text-slate-400 text-[11px] d-block mt-0.5">
                تسليم تكليفات المحاضرات وتدريبات الكود يرفع تقييمك العام ونقاط الخبرة.
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Stats 4-Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-2 text-center">
        <div class="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
          <span class="text-[10px] text-slate-400 d-block">إجمالي النقاط</span>
          <strong class="text-sm font-mono text-cyan-400">${currentXp} XP</strong>
        </div>
        <div class="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
          <span class="text-[10px] text-slate-400 d-block">المهام والتحديات</span>
          <strong class="text-sm text-white">${tasksDone} منجز</strong>
        </div>
        <div class="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
          <span class="text-[10px] text-slate-400 d-block">دقة الحلول</span>
          <strong class="text-sm text-emerald-400 font-bold">${accuracy}</strong>
        </div>
        <div class="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800">
          <span class="text-[10px] text-slate-400 d-block">سلسلة التتابع</span>
          <strong class="text-sm text-amber-400 font-bold">🔥 ${streak} يوم</strong>
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates and displays the interactive Performance Analysis Modal.
 */
export function openPerformanceAnalysisModal({ currentUser = {}, topStudents = [], totalStudents = 220, onNavigate = null } = {}) {
  // Remove existing modal instance if present
  const existing = document.getElementById(PERFORMANCE_MODAL_ID);
  if (existing) existing.remove();

  const bodyHtml = renderPerformanceAnalysisModalContent({
    currentUser,
    topStudents,
    totalStudents
  });

  const footerHtml = `
    <div class="d-flex items-center justify-between w-full flex-wrap gap-2.5" style="direction: rtl;">
      <div class="d-flex items-center gap-2">
        <button
          type="button"
          id="perfModalGoToAdventureBtn"
          class="btn btn-primary text-xs font-bold px-4 py-2 rounded-xl"
          style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: 1px solid #38bdf8; box-shadow: 0 0 15px rgba(56, 189, 248, 0.35); cursor: pointer;"
        >
          🚀 فتح مغامرة بايثون لجمع XP
        </button>

        <button
          type="button"
          id="perfModalGoToDailyBtn"
          class="btn btn-warning text-xs font-bold px-4 py-2 rounded-xl"
          style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); border: 1px solid #fbbf24; color: #fff; cursor: pointer;"
        >
          🎯 التحدي اليومي السريع (+100 XP)
        </button>
      </div>

      <button
        type="button"
        class="btn btn-secondary text-xs px-3 py-2 rounded-xl"
        data-modal-close="${PERFORMANCE_MODAL_ID}"
        style="cursor: pointer;"
      >
        إغلاق النافذة
      </button>
    </div>
  `;

  const modalHtml = renderModal({
    id: PERFORMANCE_MODAL_ID,
    title: "📊 تحليل الأداء التنافسي ومقارنة النقاط",
    bodyHtml,
    footerHtml,
    maxWidth: "680px"
  });

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Wire buttons inside modal
  const modalEl = document.getElementById(PERFORMANCE_MODAL_ID);
  if (modalEl) {
    modalEl.querySelector("#perfModalGoToAdventureBtn")?.addEventListener("click", () => {
      closeModal(PERFORMANCE_MODAL_ID);
      if (typeof onNavigate === "function") {
        onNavigate("python-adventure");
      } else {
        const advBtn = document.querySelector('.sidebar-item[data-section="python-adventure"]');
        if (advBtn) advBtn.click();
      }
    });

    modalEl.querySelector("#perfModalGoToDailyBtn")?.addEventListener("click", () => {
      closeModal(PERFORMANCE_MODAL_ID);
      if (typeof onNavigate === "function") {
        onNavigate("gamification");
      } else {
        const gamBtn = document.querySelector('.sidebar-item[data-section="gamification"]');
        if (gamBtn) gamBtn.click();
      }
    });
  }

  openModal(PERFORMANCE_MODAL_ID);
}

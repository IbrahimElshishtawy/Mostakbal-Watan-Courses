// src/features/gamification/components/points-exchange.component.js

export const EXCHANGE_PACKAGES = [
  {
    id: "pack_starter",
    title: "حزمة الانطلاق",
    points: 50,
    coins: 5,
    bonusCoins: 0,
    icon: "🪙",
    tag: "للمبتدئين",
    color: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(15, 23, 42, 0.9))"
  },
  {
    id: "pack_coder",
    title: "حزمة المطورين",
    points: 100,
    coins: 10,
    bonusCoins: 0,
    icon: "💻",
    tag: "الأكثر شيوعاً",
    color: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.9))"
  },
  {
    id: "pack_pro",
    title: "حزمة التميز",
    points: 250,
    coins: 30,
    bonusCoins: 5,
    icon: "⚡",
    tag: "+5 كوينز بونص! 🔥",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(15, 23, 42, 0.9))"
  },
  {
    id: "pack_champion",
    title: "حزمة الأبطال",
    points: 500,
    coins: 65,
    bonusCoins: 15,
    icon: "🏆",
    tag: "+15 كوين بونص! 🚀",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(15, 23, 42, 0.9))"
  },
  {
    id: "pack_legend",
    title: "حزمة الأساطير",
    points: 1000,
    coins: 140,
    bonusCoins: 40,
    icon: "👑",
    tag: "+40 كوين بونص ملكي! 🌟",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.22), rgba(15, 23, 42, 0.9))"
  }
];

/**
 * Renders the Points-to-Coins Exchange Bureau.
 */
export function renderPointsExchangeView(state) {
  const { profile = {}, isExchanging = false } = state;

  const currentPoints = Math.max(
    Number(profile.xp || 0),
    Number(profile.points || 0),
    Number(profile.competitionPoints || 0)
  );
  const currentCoins = Number(profile.coins || 0);

  return `
    <div class="gam-exchange-wrapper">
      <!-- 1. Exchange Bureau Hero Strip -->
      <div class="gam-hero-strip" style="background: radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.12), rgba(15, 23, 42, 0.85));">
        <div>
          <div class="d-flex items-center gap-2 mb-1">
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
              بنك وصرافة النقاط 🏦
            </span>
            <span class="text-xs text-slate-400">
              المعدل الأساسي: <strong class="text-amber-400">10 نقاط = 1 كوين ذهبي 🪙</strong>
            </span>
          </div>
          <h2 class="text-xl font-black text-white">صرافة تحويل النقاط إلى عملات (Coins)</h2>
          <p class="text-xs text-slate-400" style="max-width: 650px;">
            حوّل نقاطك التعليمية والتنافسية المكتسبة إلى عملات ذهبية لتتمكن من شراء شخصيات الأفاتار، وإطارات المتصدرين، والألقاب الشرفية، وتأثيرات الأسماء من متجر المكافآت.
          </p>
        </div>

        <div class="d-flex items-center gap-3 flex-wrap">
          <div class="gam-balance-card xp-card">
            <span style="font-size: 1.4rem;">💎</span>
            <div>
              <span class="text-xs text-emerald-300 d-block font-normal">نقاطك المتاحة للتحويل</span>
              <strong class="text-xl font-black" id="exchangeAvailablePoints">${currentPoints.toLocaleString()} نقطة</strong>
            </div>
          </div>

          <div class="gam-balance-card coins-card">
            <span style="font-size: 1.4rem;">🪙</span>
            <div>
              <span class="text-xs text-amber-300 d-block font-normal">رصيدك الحالي من العملات</span>
              <strong class="text-xl font-black" id="exchangeAvailableCoins">${currentCoins.toLocaleString()} Coin</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Instant Exchange Bundles Section -->
      <div class="mb-5">
        <div class="d-flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <h3 class="text-base font-black text-white d-flex items-center gap-2">
              <span>⚡</span>
              <span>حزم التحويل الفوري السريعة</span>
            </h3>
            <p class="text-xs text-slate-400">اختر إحدى الحزم المعتمدة مع مكافآت وبونص إضافي على الحزم الأكبر:</p>
          </div>
          <button type="button" class="btn btn-secondary text-xs px-3 py-1.5 font-bold" id="exchangeGoToStoreBtn">
            <span>🛍️ تصفح متجر المكافآت</span>
          </button>
        </div>

        <div class="gam-exchange-bundles-grid">
          ${EXCHANGE_PACKAGES.map((pkg) => {
            const canAfford = currentPoints >= pkg.points;
            return `
              <div class="gam-exchange-card ${canAfford ? 'can-afford' : 'cannot-afford'}" style="--pkg-color: ${pkg.color}; background: ${pkg.gradient};">
                <div class="exchange-card-top">
                  <span class="exchange-pkg-tag">${pkg.tag}</span>
                  <span class="exchange-pkg-icon">${pkg.icon}</span>
                </div>

                <div class="exchange-card-body">
                  <h4 class="exchange-pkg-title">${pkg.title}</h4>
                  
                  <div class="exchange-flow-box">
                    <div class="exchange-from">
                      <span class="flow-label">استبدال</span>
                      <strong class="flow-val points-val">${pkg.points.toLocaleString()} 💎</strong>
                    </div>

                    <div class="exchange-arrow">
                      <span>➡️</span>
                    </div>

                    <div class="exchange-to">
                      <span class="flow-label">ستحصل على</span>
                      <strong class="flow-val coins-val">+${pkg.coins} 🪙</strong>
                    </div>
                  </div>

                  ${pkg.bonusCoins > 0 ? `
                    <div class="exchange-bonus-pill">
                      <span>🎁 يتضمن ${pkg.bonusCoins} عملات بونص مجاني!</span>
                    </div>
                  ` : `
                    <div class="exchange-standard-rate">
                      <span>معدل تحويل رسمي: 10:1</span>
                    </div>
                  `}
                </div>

                <div class="exchange-card-footer">
                  <button type="button" 
                          class="btn-exchange-action ${canAfford ? 'btn-enabled' : 'btn-disabled'}"
                          data-exchange-pack-id="${pkg.id}"
                          data-points="${pkg.points}"
                          data-coins="${pkg.coins}"
                          ${!canAfford || isExchanging ? 'disabled' : ''}>
                    ${isExchanging ? `
                      <span class="spinner-small"></span>
                      <span>جاري التحويل...</span>
                    ` : canAfford ? `
                      <span>استبدال فوري الآن</span>
                      <span>⚡</span>
                    ` : `
                      <span>نقاطك غير كافية 🔒</span>
                    `}
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- 3. Custom Points Converter Calculator -->
      <div class="gam-custom-exchange-card">
        <div class="custom-card-header">
          <div class="d-flex items-center gap-2">
            <span style="font-size: 1.5rem;">🧮</span>
            <div>
              <h3 class="text-base font-black text-white">محول النقاط المخصص (Custom Converter)</h3>
              <p class="text-xs text-slate-400">حدد بنفسك أي عدد تريده من النقاط وسيقوم النظام باحتساب وتحويل العملات فورياً:</p>
            </div>
          </div>
          <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            الحد الأدنى للتحويل: 10 نقاط
          </span>
        </div>

        <div class="custom-converter-grid">
          <!-- Input Side -->
          <div class="converter-input-box">
            <label for="customPointsInput" class="text-xs text-slate-300 font-bold mb-2 d-block">
              عدد النقاط التي تريد استبدالها:
            </label>
            <div class="input-with-action">
              <input type="number" 
                     id="customPointsInput" 
                     class="gam-number-input" 
                     min="10" 
                     step="10" 
                     max="${currentPoints}" 
                     value="${Math.min(100, Math.floor(currentPoints / 10) * 10)}" 
                     placeholder="أدخل عدد النقاط..." />
              <span class="input-unit">نقطة 💎</span>
            </div>

            <!-- Quick Percentage Pills -->
            <div class="quick-percent-row mt-2">
              <span class="text-xs text-slate-400">اختيار سريع:</span>
              <button type="button" class="btn-percent-pill" data-percent="25">25%</button>
              <button type="button" class="btn-percent-pill" data-percent="50">50%</button>
              <button type="button" class="btn-percent-pill" data-percent="75">75%</button>
              <button type="button" class="btn-percent-pill max-pill" data-percent="100">100% (كل النقاط)</button>
            </div>
          </div>

          <!-- Conversion Preview Box -->
          <div class="converter-result-box">
            <span class="text-xs text-amber-300 font-bold d-block mb-1">العملات الذهبية التي ستضاف إلى رصيدك:</span>
            <div class="coins-preview-huge">
              <span id="customCoinsGainPreview" class="text-2xl font-black text-white font-mono">
                +${Math.floor(Math.min(100, Math.floor(currentPoints / 10) * 10) / 10)}
              </span>
              <span class="text-amber-400 font-bold">Coin 🪙</span>
            </div>
            <p class="text-xs text-slate-400 mt-1" id="customExchangeFormula">
              معدل الاحتساب: كل 10 نقاط تمنحك عملة ذهبية واحدة.
            </p>
          </div>

          <!-- Execution Action Box -->
          <div class="converter-action-box">
            <button type="button" 
                    class="btn btn-warning w-100 py-3 font-black text-sm d-flex items-center justify-center gap-2" 
                    id="executeCustomExchangeBtn"
                    ${currentPoints < 10 || isExchanging ? 'disabled' : ''}
                    style="border-radius: 12px; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; color: #000; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);">
              <span>🔄</span>
              <span>تأكيد تبديل النقاط الآن</span>
            </button>
            <span class="text-xs text-center d-block text-slate-400 mt-2">
              العملية فورية وآمنة وتُسجل في محفظتك تلقائياً.
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

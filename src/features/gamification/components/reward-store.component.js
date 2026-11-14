// src/features/gamification/components/reward-store.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Virtual Reward Store Showcase.
 */
export function renderRewardStoreView(state) {
  const { catalog = [], inventory = [], currentCoins = 0, activeCategory = "all", isPurchasing = false } = state;

  const ownedRewardIds = new Set(inventory.map(item => item.rewardId));

  const filteredItems = activeCategory === "all"
    ? catalog
    : catalog.filter(item => item.category === activeCategory);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "avatar": return "👤";
      case "frame": return "🖼️";
      case "title": return "👑";
      case "name_effect": return "✨";
      default: return "🎁";
    }
  };

  return `
    <div class="gam-store-wrapper">
      <!-- Store Top Bar with Coin Telemetry -->
      <div class="gam-hero-strip">
        <div>
          <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);">
            متجر المكافآت والألقاب الافتراضية 🛍️
          </span>
          <h2 class="text-xl font-black text-white mt-1">سوق فرسان الأكواد</h2>
          <p class="text-xs text-slate-400">استبدل عملاتك الذهبية المكتسبة من إنجاز المهام البرمجية بمظاهر وألقاب حصرية.</p>
        </div>

        <div class="gam-balance-card coins-card">
          <span style="font-size: 1.4rem;">🪙</span>
          <div>
            <span class="text-xs text-amber-300 d-block font-normal">رصيدك الحالي</span>
            <strong class="text-lg">${currentCoins} عملة</strong>
          </div>
        </div>
      </div>

      <!-- Store Filter Tabs -->
      <div class="gam-tabs-nav mb-4" role="tablist">
        <button type="button" class="gam-tab-btn ${activeCategory === "all" ? "active" : ""}" data-store-cat="all">
          <span>🌟</span>
          <span>جميع المكافآت</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "avatar" ? "active" : ""}" data-store-cat="avatar">
          <span>👤</span>
          <span>شخصيات الأفاتار</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "frame" ? "active" : ""}" data-store-cat="frame">
          <span>🖼️</span>
          <span>إطارات المتصدرين</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "title" ? "active" : ""}" data-store-cat="title">
          <span>👑</span>
          <span>الألقاب الشرفية</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "name_effect" ? "active" : ""}" data-store-cat="name_effect">
          <span>✨</span>
          <span>تأثيرات الأسماء</span>
        </button>
      </div>

      <!-- Items Grid -->
      <div class="gam-store-grid">
        ${filteredItems.length === 0 ? `
          <div class="p-8 text-center text-slate-400 col-span-full">
            لا توجد عناصر متاحة في هذا التصنيف حالياً.
          </div>
        ` : filteredItems.map(item => {
          const isOwned = ownedRewardIds.has(item.rewardId);
          const canAfford = currentCoins >= item.priceInCoins;

          return `
            <div class="gam-store-card" id="card-${item.rewardId}">
              <div class="gam-store-thumb">
                <span>${getCategoryIcon(item.category)}</span>
              </div>

              <h4 class="text-base font-bold text-white mb-1">${escapeHtml(item.name)}</h4>
              <span class="text-xs text-sky-400 font-semibold mb-2">${escapeHtml(item.nameEn || "")}</span>
              <p class="text-xs text-slate-400 mb-3 leading-relaxed" style="min-height: 48px;">
                ${escapeHtml(item.description)}
              </p>

              <div class="gam-store-price-tag">
                <span>🪙</span>
                <span>${item.priceInCoins} عملة ذهبية</span>
              </div>

              ${isOwned ? `
                <button type="button" class="btn btn-secondary w-full text-xs font-bold py-2" disabled>
                  <span>مملوك في حقيبتك ✓</span>
                </button>
              ` : `
                <button type="button" 
                        class="gam-store-buy-btn" 
                        data-buy-reward-id="${item.rewardId}"
                        data-buy-price="${item.priceInCoins}"
                        data-buy-name="${escapeHtml(item.name)}"
                        ${!canAfford || isPurchasing ? "disabled" : ""}>
                  ${isPurchasing ? "جاري الشراء... ⏳" : canAfford ? "شراء الآن 🛍️" : "رصيد عملات غير كافٍ 🔒"}
                </button>
              `}
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

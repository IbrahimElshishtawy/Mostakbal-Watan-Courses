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

  const getCategoryMeta = (cat) => {
    switch (cat) {
      case "avatar":
        return { label: "شخصية أفاتار", icon: "👤", color: "#38bdf8", tagBg: "rgba(56, 189, 248, 0.15)" };
      case "frame":
        return { label: "إطار متصدرين", icon: "🖼️", color: "#10b981", tagBg: "rgba(16, 185, 129, 0.15)" };
      case "title":
        return { label: "لقب شرفي", icon: "👑", color: "#f59e0b", tagBg: "rgba(245, 158, 11, 0.15)" };
      case "name_effect":
        return { label: "تأثير اسم", icon: "✨", color: "#a855f7", tagBg: "rgba(168, 85, 247, 0.15)" };
      default:
        return { label: "مكافأة", icon: "🎁", color: "#cbd5e1", tagBg: "rgba(255, 255, 255, 0.1)" };
    }
  };

  const categoryCounts = {
    all: catalog.length,
    avatar: catalog.filter(i => i.category === "avatar").length,
    frame: catalog.filter(i => i.category === "frame").length,
    title: catalog.filter(i => i.category === "title").length,
    name_effect: catalog.filter(i => i.category === "name_effect").length
  };

  return `
    <div class="gam-store-wrapper">
      <!-- Store Top Bar with Coin Telemetry -->
      <div class="gam-hero-strip">
        <div>
          <div class="d-flex items-center gap-2 mb-1">
            <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);">
              سوق فرسان الأكواد والمكافآت 🛍️
            </span>
            <span class="text-xs text-slate-400">
              متوفر <strong class="text-amber-400">${catalog.length}</strong> عنصراً حصرياً
            </span>
          </div>
          <h2 class="text-xl font-black text-white">متجر المكافآت والألقاب الافتراضية</h2>
          <p class="text-xs text-slate-400">
            العملات الذهبية تُكتسب حصرياً عبر تقييم التكليفات البرمجية واعتمادها بنجاح. استبدلها هنا لتخصيص حضورك الرقمي.
          </p>
        </div>

        <div class="gam-balance-card coins-card">
          <span style="font-size: 1.5rem;">🪙</span>
          <div>
            <span class="text-xs text-amber-300 d-block font-normal">رصيدك المتاح للشراء</span>
            <strong class="text-xl font-black">${currentCoins.toLocaleString()} Coin</strong>
          </div>
        </div>
      </div>

      <!-- Store Filter Tabs with Real Counters -->
      <div class="gam-tabs-nav mb-4" role="tablist">
        <button type="button" class="gam-tab-btn ${activeCategory === "all" ? "active" : ""}" data-store-cat="all">
          <span>🌟</span>
          <span>جميع المكافآت (${categoryCounts.all})</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "avatar" ? "active" : ""}" data-store-cat="avatar">
          <span>👤</span>
          <span>شخصيات الأفاتار (${categoryCounts.avatar})</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "frame" ? "active" : ""}" data-store-cat="frame">
          <span>🖼️</span>
          <span>إطارات المتصدرين (${categoryCounts.frame})</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "title" ? "active" : ""}" data-store-cat="title">
          <span>👑</span>
          <span>الألقاب الشرفية (${categoryCounts.title})</span>
        </button>
        <button type="button" class="gam-tab-btn ${activeCategory === "name_effect" ? "active" : ""}" data-store-cat="name_effect">
          <span>✨</span>
          <span>تأثيرات الأسماء (${categoryCounts.name_effect})</span>
        </button>
      </div>

      <!-- Items Grid -->
      <div class="gam-store-grid">
        ${filteredItems.length === 0 ? `
          <div class="p-12 text-center text-slate-400 col-span-full">
            <span style="font-size: 3rem;" class="mb-2 d-block">📦</span>
            <h4 class="text-base font-bold text-white mb-1">لا توجد عناصر متاحة في هذا التصنيف حالياً</h4>
            <p class="text-xs text-slate-500">جاري إضافة المزيد من المظاهر الحصرية قريباً.</p>
          </div>
        ` : filteredItems.map(item => {
          const isOwned = ownedRewardIds.has(item.rewardId);
          const canAfford = currentCoins >= item.priceInCoins;
          const meta = getCategoryMeta(item.category);
          const itemIcon = item.icon || meta.icon;

          return `
            <div class="gam-store-card" id="card-${item.rewardId}">
              <!-- Header Strip: Category Pill & Ownership -->
              <div class="d-flex justify-between items-center mb-2">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" 
                      style="background: ${meta.tagBg}; color: ${meta.color}; border: 1px solid ${meta.color}40;">
                  ${meta.icon} ${meta.label}
                </span>
                ${isOwned ? `
                  <span class="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    مملوك ✓
                  </span>
                ` : `
                  <span class="text-[10px] text-slate-400 font-mono">
                    #${escapeHtml(item.rewardId.split('_').slice(1).join('_'))}
                  </span>
                `}
              </div>

              <!-- Animated Visual Thumbnail -->
              <div class="gam-store-thumb" style="--thumb-accent: ${meta.color}">
                <span class="gam-store-glyph">${itemIcon}</span>
              </div>

              <!-- Title & Translation -->
              <h4 class="text-base font-bold text-white mb-0.5">${escapeHtml(item.name)}</h4>
              <span class="text-xs text-sky-400 font-semibold mb-2 d-block font-mono">${escapeHtml(item.nameEn || "")}</span>

              <!-- Description -->
              <p class="text-xs text-slate-400 mb-3 leading-relaxed" style="min-height: 44px;">
                ${escapeHtml(item.description)}
              </p>

              <!-- Price Box -->
              <div class="gam-store-price-tag">
                <span>🪙</span>
                <strong>${item.priceInCoins} عملة ذهبية</strong>
              </div>

              <!-- Action Button -->
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

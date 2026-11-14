// src/features/gamification/components/student-inventory.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Student's Inventory & Equipped Cosmetic Perks.
 */
export function renderStudentInventoryView(state) {
  const { inventory = [], catalog = [], equippedItems = {}, isEquipping = false } = state;

  const catalogMap = new Map(catalog.map(item => [item.rewardId, item]));

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case "avatar": return "شخصية الأفاتار";
      case "frame": return "إطار المتصدرين";
      case "title": return "اللقب الشرفي";
      case "name_effect": return "تأثير الاسم";
      default: return "عنصر تجميلي";
    }
  };

  return `
    <div class="gam-inventory-wrapper">
      <div class="gam-hero-strip mb-4">
        <div>
          <span class="badge" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3);">
            حقيبة المقتنيات البرمجية 🎒
          </span>
          <h2 class="text-xl font-black text-white mt-1">عناصري ومظهري الأكاديمي</h2>
          <p class="text-xs text-slate-400">إدارة الألقاب والإطارات المجهزة التي تظهر لزملائك في لوحة الشرف.</p>
        </div>

        <div class="text-xs text-slate-300 font-bold">
          إجمالي العناصر المملوكة: <strong class="text-white text-base">${inventory.length}</strong>
        </div>
      </div>

      <!-- Currently Equipped Preview Banner -->
      <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 mb-6 d-flex items-center justify-between flex-wrap gap-4">
        <div class="d-flex items-center gap-3">
          <div class="gam-avatar-frame ${equippedItems.frameId || ""}" style="width: 52px; height: 52px; font-size: 1.4rem;">
            <span>${equippedItems.avatarId ? "👤" : "ط"}</span>
          </div>
          <div>
            <span class="text-xs text-slate-400 d-block">اللقب والمظهر المفعّل حالياً:</span>
            <strong class="text-white text-sm">
              ${equippedItems.titleId ? (catalogMap.get(equippedItems.titleId)?.name || equippedItems.titleId) : "بدون لقب مخصص"}
            </strong>
          </div>
        </div>

        <div class="d-flex gap-2 text-xs">
          <span class="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
            الإطار: <strong class="text-white">${equippedItems.frameId ? (catalogMap.get(equippedItems.frameId)?.name || equippedItems.frameId) : "افتراضي"}</strong>
          </span>
        </div>
      </div>

      <!-- Inventory Items Grid -->
      ${inventory.length === 0 ? `
        <div class="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <div class="text-4xl mb-3">🛍️</div>
          <h3 class="text-base font-bold text-white mb-2">حقيبتك فارغة حالياً</h3>
          <p class="text-xs text-slate-400 mb-4">أنجز المهام البرمجية واكسب العملات الذهبية لشراء أروع الإطارات والألقاب من المتجر.</p>
          <button type="button" class="btn btn-primary px-5 py-2 text-xs font-bold" id="gamGoToStoreBtn">
            استكشاف متجر المكافآت 🚀
          </button>
        </div>
      ` : `
        <div class="gam-store-grid">
          ${inventory.map(item => {
            const meta = catalogMap.get(item.rewardId) || {
              name: item.rewardId,
              description: "عنصر مخصص من متجر الأكاديمية.",
              category: item.category
            };

            const isEquipped = (
              equippedItems.avatarId === item.rewardId ||
              equippedItems.frameId === item.rewardId ||
              equippedItems.titleId === item.rewardId ||
              equippedItems.nameEffectId === item.rewardId
            );

            return `
              <div class="gam-store-card ${isEquipped ? "border-emerald-500/50" : ""}">
                <div class="gam-store-thumb">
                  <span>${item.category === "frame" ? "🖼️" : item.category === "title" ? "👑" : "✨"}</span>
                </div>

                <span class="badge mb-1 text-xs" style="background: rgba(148, 163, 184, 0.15); color: #cbd5e1;">
                  ${getCategoryLabel(item.category)}
                </span>
                <h4 class="text-base font-bold text-white mb-1">${escapeHtml(meta.name)}</h4>
                <p class="text-xs text-slate-400 mb-4 leading-relaxed">
                  ${escapeHtml(meta.description)}
                </p>

                ${isEquipped ? `
                  <button type="button" class="btn btn-secondary w-full text-xs font-bold py-2 text-emerald-400 border-emerald-500/30" disabled>
                    ✓ مُرتدى ومُفعّل
                  </button>
                ` : `
                  <button type="button" 
                          class="btn btn-primary w-full text-xs font-bold py-2"
                          data-equip-reward-id="${item.rewardId}"
                          data-equip-category="${item.category}"
                          ${isEquipping ? "disabled" : ""}>
                    ${isEquipping ? "جاري التفعيل... ⏳" : "ارتداء وتفعيل ✨"}
                  </button>
                `}
              </div>
            `;
          }).join("")}
        </div>
      `}
    </div>
  `;
}

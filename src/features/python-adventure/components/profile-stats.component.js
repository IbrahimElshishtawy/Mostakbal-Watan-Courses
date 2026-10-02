// src/features/python-adventure/components/profile-stats.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderAvatar } from "../../../shared/components/Avatar/avatar.component.js";

/**
 * Renders the Player Profile, Analytics, and Gamified Inventory screen.
 */
export function renderProfileStats({ student, progress }) {
  const name = student?.studentName || student?.name || "المغامر";
  const phone = student?.studentPhone || student?.phone || "";
  const xp = progress?.xp || 0;
  const level = progress?.level || 1;
  const streak = progress?.streak?.count || 1;
  const totalStars = Object.values(progress?.stars || {}).reduce((a, b) => a + b, 0);
  const completedCount = Object.keys(progress?.completedChallenges || {}).length;
  const totalRuns = progress?.stats?.totalRuns || completedCount;

  // Level XP calculations (e.g. 500 XP per level)
  const xpPerLevel = 500;
  const currentLevelBaseXp = (level - 1) * xpPerLevel;
  const nextLevelXp = level * xpPerLevel;
  const xpInCurrentLevel = Math.max(0, xp - currentLevelBaseXp);
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpPerLevel) * 100));
  const xpRemaining = Math.max(0, nextLevelXp - xp);

  const successRate = totalRuns > 0 ? Math.min(100, Math.round((completedCount / totalRuns) * 100)) : 100;

  // Gamified RPG-style inventory items with rarity tiers
  const inventoryItems = [
    {
      id: "starter_compass",
      name: "بوصلة المغامر 🧭",
      rarity: "common",
      rarityLabel: "أساسي • Common",
      desc: "أداة ملاحة ذكية ترشدك نحو مسارات كود بايثون وحل الخوارزميات الأولى بنجاح.",
      requiredLevel: 1
    },
    {
      id: "loop_key",
      name: "مفتاح التكرار السحري 🔑",
      rarity: "rare",
      rarityLabel: "نادر • Rare",
      desc: "يفتح بوابات وتحديات حلقات for و while المعقدة مع خوارزميات التكرار المتقدمة.",
      requiredLevel: 2
    },
    {
      id: "debug_gem",
      name: "جوهرة فحص الأخطاء 💎",
      rarity: "epic",
      rarityLabel: "ملحمي • Epic",
      desc: "تكتشف أخطاء الصياغة والمسافات البادئة (Indentation) فورياً قبل تنفيذ الكود.",
      requiredLevel: 3
    },
    {
      id: "hero_crest",
      name: "وسام بطل بايثون 🛡️",
      rarity: "legendary",
      rarityLabel: "أسطوري • Legendary",
      desc: "درع الشرف والبسالة الممنوح لأبطال الأكاديمية بعد اجتياز تحديات العوالم.",
      requiredLevel: 4
    },
    {
      id: "ai_core",
      name: "شريحة الذكاء الاصطناعي 🧠",
      rarity: "mythic",
      rarityLabel: "خرافي • Mythic",
      desc: "تتيح لك تحليل كودك البرمجي ضد نماذج الذكاء الاصطناعي ومقارنة الأداء الحسابي.",
      requiredLevel: 5
    },
    {
      id: "streak_potion",
      name: "إكسير الاستمرارية 🧪",
      rarity: "exotic",
      rarityLabel: "استثنائي • Exotic",
      desc: "مكافأة الاستمرارية اليومية؛ تمنحك مضاعفة تلقائية لجوائز التحديات اليومية.",
      requiredLevel: 6
    }
  ];

  const ownedItemsCount = inventoryItems.filter(item => level >= item.requiredLevel).length;

  return `
    <div class="adventure-profile-wrapper">
      
      <!-- Top Action & Navigation Header -->
      <div class="daily-header-glass profile-header-glass">
        <div class="daily-header-right">
          <button type="button" class="daily-back-btn" id="profileBackBtn" title="العودة لمغامرة بايثون">
            <span class="back-arrow">➔</span>
            <span>العودة للرئيسية</span>
          </button>
          <div class="daily-title-meta">
            <div class="daily-badge-pill profile-badge-pill">
              <span class="live-pulse-dot"></span>
              <span>الملف البرمجي والعتاد الشخصي</span>
            </div>
            <h1 class="daily-main-title">👤 الملف البرمجي والحقيبة الرقمية</h1>
            <p class="daily-main-desc">
              سجل إنجازاتك الشخصية، الإحصائيات التحليلية الواقعية، ومخزون الأوسمة والعتاد التقني المكتسب.
            </p>
          </div>
        </div>

        <!-- Top Profile Quick Meta -->
        <div class="daily-header-left">
          <div class="profile-quick-stats-pill">
            <div class="quick-pill-item">
              <span class="quick-pill-icon">⚡</span>
              <span>المستوى: <strong>Level ${level}</strong></span>
            </div>
            <div class="quick-pill-sep"></div>
            <div class="quick-pill-item">
              <span class="quick-pill-icon">🔥</span>
              <span>السلسلة: <strong>${streak} أيام</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gamer Hero ID Grand Card -->
      <div class="profile-grand-id-card">
        <div class="profile-id-ambient-glow"></div>
        <div class="profile-id-content">
          
          <!-- Identity Info (Right side in RTL) -->
          <div class="profile-id-main-info">
            <div class="profile-avatar-wrapper">
              <div class="profile-avatar-aura"></div>
              <div class="profile-avatar-ring">
                ${renderAvatar({ name, size: "xl" })}
              </div>
              <div class="profile-avatar-lvl-badge">LVL ${level}</div>
            </div>

            <div class="profile-identity-text">
              <div class="profile-role-row">
                <span class="profile-status-dot"></span>
                <span class="profile-role-badge">مغامر بايثون نشط • Python Adventurer</span>
                <span class="profile-season-tag">موسم 2026 / 2027</span>
              </div>
              <h2 class="profile-display-name">${escapeHtml(name)}</h2>
              <div class="profile-meta-tags">
                <span class="profile-meta-item">
                  <span class="meta-icon">🆔</span>
                  <span>المعرف: <code>${escapeHtml(phone || "Student-" + student?.id?.slice(0, 8))}</code></span>
                </span>
                <span class="profile-meta-item">
                  <span class="meta-icon">🏛️</span>
                  <span>أمانة أول المحلة الكبرى</span>
                </span>
                <span class="profile-meta-item">
                  <span class="meta-icon">💻</span>
                  <span>بيئة كود تفاعلية</span>
                </span>
              </div>
            </div>
          </div>

          <!-- XP Progress Reactor Box (Left side in RTL) -->
          <div class="profile-id-xp-box">
            <div class="xp-box-header">
              <span class="xp-box-title">التقدم نحو المستوى القادم (Level ${level + 1})</span>
              <span class="xp-box-percent">${levelProgressPercent}%</span>
            </div>
            <div class="xp-box-progress-track">
              <div class="xp-box-progress-bar" style="width: ${levelProgressPercent}%;">
                <span class="xp-bar-glow"></span>
              </div>
            </div>
            <div class="xp-box-footer">
              <span class="xp-counter"><strong>${xp}</strong> / ${nextLevelXp} XP إجمالي</span>
              <span class="xp-remaining">تبقّى <strong>${xpRemaining} XP</strong> للترقية</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Real Analytics Metrics Grid -->
      <div class="profile-stats-grid">
        
        <div class="profile-metric-card metric-completed">
          <div class="metric-icon-wrap">🎯</div>
          <div class="metric-data-wrap">
            <div class="metric-top-row">
              <strong class="metric-number">${completedCount}</strong>
              <span class="metric-trend text-success">مكتمل</span>
            </div>
            <h4 class="metric-label">التحديات والمهمات المنجزة</h4>
            <p class="metric-subtext">من أصل 31 مهمة برمجية في عوالم بايثون</p>
          </div>
        </div>

        <div class="profile-metric-card metric-stars">
          <div class="metric-icon-wrap">⭐</div>
          <div class="metric-data-wrap">
            <div class="metric-top-row">
              <strong class="metric-number">${totalStars}</strong>
              <span class="metric-trend text-warning">نجمة ذهبية</span>
            </div>
            <h4 class="metric-label">إجمالي نجوم الإتقان</h4>
            <p class="metric-subtext">تقييم الكفاءة ودقة الحلول البرمجية</p>
          </div>
        </div>

        <div class="profile-metric-card metric-streak">
          <div class="metric-icon-wrap">🔥</div>
          <div class="metric-data-wrap">
            <div class="metric-top-row">
              <strong class="metric-number">${streak} <span class="metric-unit">أيام</span></strong>
              <span class="metric-trend text-danger">مضاعف 1.2x</span>
            </div>
            <h4 class="metric-label">سلسلة الالتزام الحالية</h4>
            <p class="metric-subtext">استمرارية يومية متواصلة لحفظ الشعلة</p>
          </div>
        </div>

        <div class="profile-metric-card metric-accuracy">
          <div class="metric-icon-wrap">📈</div>
          <div class="metric-data-wrap">
            <div class="metric-top-row">
              <strong class="metric-number">${successRate}%</strong>
              <span class="metric-trend text-info">دقة عالية</span>
            </div>
            <h4 class="metric-label">معدل الدقة والنجاح</h4>
            <p class="metric-subtext">نسبة اجتياز الاختبارات من التشغيل الأول</p>
          </div>
        </div>

      </div>

      <!-- Gamified Inventory Section -->
      <div class="profile-inventory-section">
        <div class="inventory-section-header">
          <div class="inv-header-title">
            <span class="inv-header-icon">🎒</span>
            <div>
              <h3 class="section-title">حقيبة الأدوات والأوسمة الرقمية (Inventory)</h3>
              <p class="section-subtitle">عتاد برمجي نادر وأدوات تفتح تلقائياً مع تقدمك وصعودك في المستويات</p>
            </div>
          </div>
          <div class="inv-counter-badge">
            <span>المقتنيات: <strong>${ownedItemsCount} / ${inventoryItems.length}</strong></span>
          </div>
        </div>

        <div class="inventory-cards-grid">
          ${inventoryItems.map((item) => {
            const hasItem = level >= item.requiredLevel;
            return `
              <div class="inv-card-item rarity-${item.rarity} ${hasItem ? "owned" : "locked"}">
                <div class="inv-card-top">
                  <span class="inv-rarity-tag">${item.rarityLabel}</span>
                  <span class="inv-status-icon">${hasItem ? "✅" : "🔒"}</span>
                </div>

                <div class="inv-card-visual">
                  <div class="inv-icon-box">
                    <span class="inv-emoji">${item.name.split(" ").pop()}</span>
                  </div>
                </div>

                <div class="inv-card-body">
                  <h4 class="inv-item-name">${escapeHtml(item.name)}</h4>
                  <p class="inv-item-desc">${escapeHtml(item.desc)}</p>
                </div>

                <div class="inv-card-footer">
                  ${hasItem ? `
                    <div class="inv-status-pill owned-pill">
                      <span class="pill-dot"></span>
                      <span>في الحقيبة مفعّل</span>
                    </div>
                  ` : `
                    <div class="inv-status-pill locked-pill">
                      <span>يفتح عند المستوى ${item.requiredLevel}</span>
                    </div>
                  `}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

    </div>
  `;
}


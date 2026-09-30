// src/features/profile/components/theme-picker.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Returns HTML string for the platform settings and theme selector view matching
 * the ultra-premium dark glassmorphism design system of the platform.
 */
export function renderThemePickerView({
  currentTheme = "green",
  currentFont = 100,
  currentLang = "ar",
  soundFx = true,
  clickSound = true,
  examAlerts = true,
  rankAlerts = true,
  lectureAlerts = true,
  cacheSize = "48 KB"
} = {}) {
  const themes = [
    {
      id: "green",
      name: "الأخضر الرسمي",
      tag: "الافتراضي والمعتمد",
      accent: "#10b981",
      previewGradient: "linear-gradient(135deg, #10b981 0%, #064e3b 100%)",
      glowColor: "rgba(16, 185, 129, 0.35)",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      badgeColor: "#34d399",
      description: "السمة الرسمية المعتمدة لحزب مستقبل وطن، تمنح الواجهة وقاراً وأناقة مؤسسية."
    },
    {
      id: "cyan",
      name: "الأزرق السماوي (Tech Delta)",
      tag: "مستحسن للمطورين",
      accent: "#0284c7",
      previewGradient: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
      glowColor: "rgba(56, 189, 248, 0.35)",
      badgeBg: "rgba(56, 189, 248, 0.15)",
      badgeColor: "#38bdf8",
      description: "نمط برمجي تقني مريح للعين، مصمم خصيصاً لجلسات البرمجة وحل المسائل الطويلة."
    },
    {
      id: "purple",
      name: "البنفسجي الملكي (Royal Nebula)",
      tag: "مظهر ليلي فاخر",
      accent: "#7c3aed",
      previewGradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
      glowColor: "rgba(124, 58, 237, 0.35)",
      badgeBg: "rgba(124, 58, 237, 0.15)",
      badgeColor: "#c084fc",
      description: "مظهر داكن راقٍ مستوحى من الفضاء والابتكار، يعزز الهدوء والتركيز أثناء الاستذكار."
    },
    {
      id: "gold",
      name: "الذهبي الراقي (Honor Gold)",
      tag: "لوحة الأبطال والتكريم",
      accent: "#d97706",
      previewGradient: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
      glowColor: "rgba(217, 119, 6, 0.35)",
      badgeBg: "rgba(217, 119, 6, 0.15)",
      badgeColor: "#fbbf24",
      description: "سمة التميز والتكريم المستوحاة من كؤوس المتفوقين في لوحة المتصدرين الأسبوعية."
    }
  ];

  const currentThemeObj = themes.find((t) => t.id === currentTheme) || themes[0];

  return `
    <div class="student-settings-page-wrapper" dir="rtl">
      <!-- 1. Top Header Bar -->
      <header class="st-topbar">
        <nav aria-label="Breadcrumb" class="st-breadcrumbs">
          <span class="st-crumb-root">منصة مستقبل وطن</span>
          <span class="st-crumb-sep">/</span>
          <span class="st-crumb-mid">بوابة الطالب</span>
          <span class="st-crumb-sep">/</span>
          <span class="st-crumb-active">إعدادات المنصة والمظهر ⚙️</span>
        </nav>

        <div class="st-topbar-controls">
          <div class="st-season-pill font-mono">
            <i class="fa-regular fa-calendar-check text-cyan-400"></i>
            <span>الموسم : 2026 / 2027</span>
          </div>

          <div class="st-ping-pill font-mono">
            <span class="st-ping-dot"></span>
            <span>خادم دلتا-01 : متصل</span>
          </div>

          <div class="st-ssl-pill font-mono">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Bit SSL-256</span>
          </div>

          <button type="button" class="st-btn-guide" id="stGuideBtn">
            <i class="fa-regular fa-circle-question text-cyan-400"></i>
            <span>دليل التخصيص</span>
          </button>
        </div>
      </header>

      <!-- 2. Section Header Title -->
      <div class="st-section-header">
        <div class="st-header-badge">
          <i class="fa-solid fa-sliders text-cyan-400"></i>
          <span>لوحة التحكم والتخصيص الشاملة</span>
        </div>
        <h2 id="heading-settings" class="st-section-title">⚙️ تخصيص المنصة والمظهر العام</h2>
        <p class="st-section-desc">
          قم بتخصيص السمة اللونية لواجهتك، ضبط حجم الخط للقراءة المريحة، تفعيل المؤثرات الصوتية، وإدارة المزامنة السحابية لحسابك الأكاديمي.
        </p>
      </div>

      <!-- 3. Main Settings Grid -->
      <div class="st-settings-grid">
        
        <!-- SECTION A: Theme Picker (Full Width) -->
        <div class="st-card st-card-full">
          <div class="st-card-header">
            <div class="st-card-icon-wrap" style="background: rgba(16, 185, 129, 0.12); color: #34d399;">
              <i class="fa-solid fa-palette"></i>
            </div>
            <div>
              <h3 class="st-card-title">سمة ولون واجهة المنصة (Theme Palette)</h3>
              <p class="st-card-subtitle">اختر النمط اللوني المفضل لديك، يتم تحديث ألوان النظام بالكامل فورياً وحفظها في حسابك.</p>
            </div>
          </div>

          <div class="st-themes-grid">
            ${themes
              .map((theme) => {
                const isActive = theme.id === currentTheme;
                return `
                <div
                  class="st-theme-card ${isActive ? "active" : ""}"
                  data-theme-choice="${theme.id}"
                  role="button"
                  tabindex="0"
                  aria-pressed="${isActive}"
                  style="--theme-accent: ${theme.accent}; --theme-glow: ${theme.glowColor};"
                >
                  <div class="st-theme-card-top">
                    <span class="st-theme-tag" style="background: ${theme.badgeBg}; color: ${theme.badgeColor};">
                      ${theme.tag}
                    </span>
                    ${
                      isActive
                        ? `<span class="st-theme-active-badge"><i class="fa-solid fa-circle-check"></i> السمة النشطة</span>`
                        : `<span class="st-theme-select-hint"><i class="fa-regular fa-circle"></i> اختيار</span>`
                    }
                  </div>

                  <div class="st-theme-swatch-box">
                    <div class="st-theme-swatch-gradient" style="background: ${theme.previewGradient};">
                      <div class="st-theme-swatch-mockup">
                        <div class="st-mockup-bar"></div>
                        <div class="st-mockup-chips">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 class="st-theme-name">${theme.name}</h4>
                  <p class="st-theme-desc">${theme.description}</p>
                </div>
              `;
              })
              .join("")}
          </div>
        </div>

        <!-- SECTION B: Typography & Font Scaling -->
        <div class="st-card">
          <div class="st-card-header">
            <div class="st-card-icon-wrap" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8;">
              <i class="fa-solid fa-font"></i>
            </div>
            <div>
              <h3 class="st-card-title">حجم الخط وسهولة القراءة (Text Scale)</h3>
              <p class="st-card-subtitle">تحكم في مقياس النصوص البرمجية والشاشات لراحة عينيك.</p>
            </div>
          </div>

          <div class="st-font-controls-box">
            <div class="st-font-stepper">
              <button type="button" id="fontDecBtn" class="st-stepper-btn" aria-label="تصغير الخط">
                <i class="fa-solid fa-minus"></i>
                <span>A−</span>
              </button>
              <div class="st-font-display-wrap">
                <span id="fontScaleDisplay" class="st-font-display-val font-mono">${currentFont}%</span>
                <span class="st-font-display-label">المقياس الحالي</span>
              </div>
              <button type="button" id="fontIncBtn" class="st-stepper-btn" aria-label="تكبير الخط">
                <i class="fa-solid fa-plus"></i>
                <span>A+</span>
              </button>
            </div>

            <!-- Quick Presets -->
            <div class="st-font-presets">
              <button type="button" class="st-preset-btn ${currentFont === 85 ? "active" : ""}" data-font-preset="85">85% مدمج</button>
              <button type="button" class="st-preset-btn ${currentFont === 100 ? "active" : ""}" data-font-preset="100">100% قياسي</button>
              <button type="button" class="st-preset-btn ${currentFont === 115 ? "active" : ""}" data-font-preset="115">115% كبير</button>
              <button type="button" class="st-preset-btn ${currentFont === 130 ? "active" : ""}" data-font-preset="130">130% مكبّر</button>
            </div>

            <!-- Live Text & Code Preview -->
            <div class="st-font-preview-card" id="stFontPreviewBox">
              <div class="st-preview-header font-mono">
                <i class="fa-solid fa-code text-cyan-400"></i>
                <span>معاينة حية للمحتوى والكود (Live Render)</span>
              </div>
              <p class="st-preview-text">
                منصة مستقبل وطن توفر للطلاب بيئة تعلم ذكية ومتطورة متصلة بمختبرات بايثون والسحابة.
              </p>
              <div class="st-preview-code font-mono">
                <span class="st-code-kw">def</span> <span class="st-code-fn">welcome_student</span>():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="st-code-ret">return</span> <span class="st-code-str">"🚀 انطلق نحو هندسة البرمجيات والذكاء الاصطناعي"</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION C: Language & Timezone -->
        <div class="st-card">
          <div class="st-card-header">
            <div class="st-card-icon-wrap" style="background: rgba(168, 85, 247, 0.12); color: #c084fc;">
              <i class="fa-solid fa-globe"></i>
            </div>
            <div>
              <h3 class="st-card-title">لغة الواجهة والمنطقة الزمنية (Language)</h3>
              <p class="st-card-subtitle">تحديد لغة واجهة النظام واتجاه العرض والتقويم.</p>
            </div>
          </div>

          <div class="st-field-group">
            <label for="platformLanguageSelect" class="st-field-label">لغة عرض المنصة:</label>
            <div class="st-select-wrapper">
              <select id="platformLanguageSelect" class="st-custom-select">
                <option value="ar" ${currentLang === "ar" ? "selected" : ""}>🇪🇬 العربية (Arabic) — من اليمين لليسار</option>
                <option value="en" ${currentLang === "en" ? "selected" : ""}>🇬🇧 English (الإنجليزية) — Left to Right</option>
              </select>
              <i class="fa-solid fa-chevron-down st-select-arrow"></i>
            </div>
          </div>

          <div class="st-timezone-box font-mono">
            <div class="st-tz-icon">
              <i class="fa-solid fa-clock-rotate-left text-cyan-400"></i>
            </div>
            <div class="st-tz-info">
              <span class="st-tz-title">توقيت القاهرة الرسمي (GMT+3)</span>
              <span class="st-tz-desc">مزامنة تلقائية مع السيرفر لحساب مواعيد الامتحانات والواجبات بدقة ثانية.</span>
            </div>
            <span class="st-tz-badge">مُزامن ✓</span>
          </div>
        </div>

        <!-- SECTION D: Interactive Audio FX -->
        <div class="st-card">
          <div class="st-card-header">
            <div class="st-card-icon-wrap" style="background: rgba(245, 158, 11, 0.12); color: #fbbf24;">
              <i class="fa-solid fa-volume-high"></i>
            </div>
            <div>
              <h3 class="st-card-title">المؤثرات الصوتية والتفاعلية (Audio FX)</h3>
              <p class="st-card-subtitle">أصوات الإنجاز وحل التحديات وتفاعلات الواجهة الممتعة.</p>
            </div>
          </div>

          <div class="st-toggles-list">
            <div class="st-toggle-row">
              <div class="st-toggle-info">
                <span class="st-toggle-title">أصوات الإنجاز والانتصار في بايثون 🎮</span>
                <span class="st-toggle-desc">تشغيل مؤثر صوتي عند اجتياز كويز، حل تحدي برمجي، أو زيادة نقاط XP.</span>
              </div>
              <label class="st-switch">
                <input type="checkbox" id="stSoundFxToggle" ${soundFx ? "checked" : ""}>
                <span class="st-slider"></span>
              </label>
            </div>

            <div class="st-toggle-row">
              <div class="st-toggle-info">
                <span class="st-toggle-title">أصوات التفاعل مع القوائم والأزرار 🎧</span>
                <span class="st-toggle-desc">نقرات صوتية ناعمة عند التنقل بين أقسام المنصة ولوحة الأبطال.</span>
              </div>
              <label class="st-switch">
                <input type="checkbox" id="stClickSoundToggle" ${clickSound ? "checked" : ""}>
                <span class="st-slider"></span>
              </label>
            </div>
          </div>

          <div class="st-test-audio-wrap">
            <button type="button" id="stTestAudioBtn" class="st-btn-test-sound">
              <i class="fa-solid fa-play"></i>
              <span>تجربة نغمة الإنجاز الآن 🔊</span>
            </button>
            <span class="st-test-audio-hint">استمع إلى نموذج الصوت المركب عبر متصفحك</span>
          </div>
        </div>

        <!-- SECTION E: Smart Push Notifications -->
        <div class="st-card">
          <div class="st-card-header">
            <div class="st-card-icon-wrap" style="background: rgba(59, 130, 246, 0.12); color: #60a5fa;">
              <i class="fa-solid fa-bell"></i>
            </div>
            <div>
              <h3 class="st-card-title">التنبيهات الأكاديمية الذكية (Notifications)</h3>
              <p class="st-card-subtitle">اختر الإشعارات الفورية التي ترغب في تلقيها على المنصة.</p>
            </div>
          </div>

          <div class="st-toggles-list">
            <div class="st-toggle-row">
              <div class="st-toggle-info">
                <span class="st-toggle-title">اقتراب موعد تسليم التاسكات والواجبات 📋</span>
                <span class="st-toggle-desc">تنبيه ذكي قبل موعد الإغلاق بـ 24 ساعة لضمان نيل الدرجة النهائية.</span>
              </div>
              <label class="st-switch">
                <input type="checkbox" id="stExamAlertsToggle" ${examAlerts ? "checked" : ""}>
                <span class="st-slider"></span>
              </label>
            </div>

            <div class="st-toggle-row">
              <div class="st-toggle-info">
                <span class="st-toggle-title">تغير الترتيب في لوحة المتصدرين 🏆</span>
                <span class="st-toggle-desc">إشعار فوري عند صعودك للمراكز الأولى أو تقدم أحد زملائك عليك.</span>
              </div>
              <label class="st-switch">
                <input type="checkbox" id="stRankAlertsToggle" ${rankAlerts ? "checked" : ""}>
                <span class="st-slider"></span>
              </label>
            </div>

            <div class="st-toggle-row">
              <div class="st-toggle-info">
                <span class="st-toggle-title">نشر فيديوهات ومحاضرات جديدة 🎥</span>
                <span class="st-toggle-desc">إشعار فور رفع شرح جديد من محاضري أمانة أول المحلة الكبرى.</span>
              </div>
              <label class="st-switch">
                <input type="checkbox" id="stLectureAlertsToggle" ${lectureAlerts ? "checked" : ""}>
                <span class="st-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- SECTION F: Storage & Cloud Sync Diagnostics (Full Width) -->
        <div class="st-card st-card-full">
          <div class="st-card-header">
            <div class="st-card-icon-wrap" style="background: rgba(14, 165, 233, 0.12); color: #38bdf8;">
              <i class="fa-solid fa-cloud-arrow-up"></i>
            </div>
            <div>
              <h3 class="st-card-title">إدارة التخزين المؤقت والمزامنة السحابية (Cloud & Storage)</h3>
              <p class="st-card-subtitle">تشخيص حالة الاتصال مع خوادم مستقبل وطن وإدارة ملفات التخزين المؤقتة.</p>
            </div>
          </div>

          <div class="st-sync-telemetry-grid">
            <div class="st-telemetry-box">
              <span class="st-telemetry-label">حالة خادم السحابة:</span>
              <div class="st-telemetry-val text-emerald-400 font-mono">
                <span class="st-ping-dot"></span> متصل (Ping 18ms)
              </div>
              <span class="st-telemetry-sub">Delta-01 Node (Alexandria Gateway)</span>
            </div>

            <div class="st-telemetry-box">
              <span class="st-telemetry-label">بيانات الكاش المخزنة محلياً:</span>
              <div class="st-telemetry-val text-cyan-400 font-mono" id="stCacheSizeDisplay">
                ${cacheSize}
              </div>
              <span class="st-telemetry-sub">ملفات الدروس ومسودات الأكواد المؤقتة</span>
            </div>

            <div class="st-telemetry-box">
              <span class="st-telemetry-label">آخر مزامنة ناجحة:</span>
              <div class="st-telemetry-val text-slate-200 font-mono" id="stLastSyncDisplay">
                منذ لحظات ✓
              </div>
              <span class="st-telemetry-sub">محدث تلقائياً مع السجل السحابي</span>
            </div>
          </div>

          <div class="st-storage-actions-row">
            <button type="button" id="stSyncNowBtn" class="st-btn-sync">
              <i class="fa-solid fa-rotate"></i>
              <span>مزامنة البيانات السحابية الآن 🔄</span>
            </button>

            <button type="button" id="stClearCacheBtn" class="st-btn-clear-cache">
              <i class="fa-solid fa-broom"></i>
              <span>تنظيف الذاكرة المؤقتة (Cache) 🧹</span>
            </button>

            <button type="button" id="stResetDefaultsBtn" class="st-btn-reset-defaults">
              <i class="fa-solid fa-arrow-rotate-left"></i>
              <span>إعادة ضبط المصنع للتفضيلات ⟲</span>
            </button>
          </div>
        </div>

      </div>

      <!-- 4. Sticky Bottom Action Bar -->
      <div class="st-action-bar">
        <div class="st-action-summary">
          <span class="st-summary-pill font-mono">
            <i class="fa-solid fa-circle-dot text-emerald-400"></i>
            <span>السمة: <strong>${currentThemeObj.name}</strong></span>
          </span>
          <span class="st-summary-pill font-mono">
            <i class="fa-solid fa-font text-cyan-400"></i>
            <span>الخط: <strong>${currentFont}%</strong></span>
          </span>
          <span class="st-summary-pill font-mono">
            <i class="fa-solid fa-language text-purple-400"></i>
            <span>اللغة: <strong>${currentLang === "ar" ? "العربية" : "English"}</strong></span>
          </span>
        </div>

        <button type="button" id="stSaveAllBtn" class="st-btn-save-all">
          <i class="fa-solid fa-check-double"></i>
          <span>حفظ وتثبيت التفضيلات الآن ✓</span>
        </button>
      </div>

    </div>
  `;
}

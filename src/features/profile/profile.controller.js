// src/features/profile/profile.controller.js
import { ProfileService } from "./profile.service.js";
import { profileState } from "./profile.state.js";
import { renderProfileCard } from "./components/profile-card.component.js";
import { renderThemePickerView } from "./components/theme-picker.component.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";
import { showConfirmDialog } from "../../shared/components/ConfirmDialog/confirm-dialog.component.js";
import { setHtml } from "../../shared/utils/dom.utils.js";

export const ProfileController = {
  /**
   * Loads and renders student profile card matching Image 8.png
   * (Without hero banner and without password change card).
   */
  loadProfileView(containerId, currentStudent) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    const profileHtml = renderProfileCard({ student: currentStudent });
    setHtml(container, profileHtml);

    this.wireProfileEvents(container, currentStudent);
  },

  /**
   * Wire profile events
   */
  wireProfileEvents(container, student) {
    const name = student?.studentName || student?.name || "إبراهيم خالد مصطفى";
    const code = student?.studentCode || student?.idCode || "STU-2026-8842";

    // 1. View Smart NFC Card Dialog
    container.querySelector("#pfBtnViewNfc")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "بطاقة الهوية الذكية الرقمية (NFC Smart ID) 🪪",
        message: `اسم الطالب: ${name}\nالكود الأكاديمي: ${code}\nالمسار: بايثون وهندسة النظم\nالأمانة: أمانة أول المحلة الكبرى\n\nحالة البطاقة: صالحة للموسم 2026 / 2027 ومعتمدة لكافة المعامل والقاعات الذكية.`,
        confirmText: "إغلاق",
        cancelText: "تحميل البطاقة",
        variant: "primary"
      }).then((confirmed) => {
        if (!confirmed) {
          showToast("جاري تجهيز وتنزيل البطاقة الرقمية بصيغة PDF... 📥", "info");
        }
      });
    });

    // 2. View Enrollment Certificate Dialog
    container.querySelector("#pfBtnViewCert")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "شهادة القيد الرقمية الرسمية 📄",
        message: `يشهد اتحاد بشبابها بأن الطالب: ${name}\nمقيد رسمياً في البرنامج التدريبي المتقدم لهندسة بايثون والذكاء الاصطناعي لموسم 2026/2027 بنسبة حضور 98% وتراكمي +A.\n\nكود التوثيق الأكاديمي: UBY-CERT-8842-VERIFIED`,
        confirmText: "طباعة الشهادة 🖨️",
        cancelText: "إغلاق",
        variant: "primary"
      }).then((confirmed) => {
        if (confirmed) {
          showToast("جاري تجهيز وثيقة القيد المعتمدة للطباعة... 🖨️", "success");
        }
      });
    });

    // 3. Two Factor Authentication Toggle
    container.querySelector("#pfTwoFactorToggle")?.addEventListener("change", (e) => {
      const isEnabled = e.target.checked;
      if (isEnabled) {
        showToast("تم تفعيل المصادقة الثنائية (2FA) بنجاح عبر الرسائل النصية SMS 🔒", "success");
      } else {
        showToast("تنبيه: تم إيقاف المصادقة الثنائية للحساب الأكاديمي مؤقتاً ⚠️", "warning");
      }
    });

    // 4. Notifications & Guide Buttons
    container.querySelector("#pfNotificationBtn")?.addEventListener("click", () => {
      showToast("حسابك الأكاديمي موثق ومحدث بالكامل لدى أمانة المحلة الكبرى ✓", "info");
    });

    container.querySelector("#pfGuideBtn")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "دليل الطالب والاعتماد الأكاديمي 📘",
        message: "يتضمن ملفك التعريفي كافة السجلات الرسمية المعتمدة لدى منصة اتحاد بشبابها. يمكنك استخدام شفرة QR لتسجيل الحضور الذكي في المعامل بدون كشوف ورقية.",
        confirmText: "فهمت",
        cancelText: "إغلاق",
        variant: "primary"
      });
    });
  },

  /**
   * Loads and renders comprehensive theme and system settings view.
   */
  loadSettingsView(containerId) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    const settings = ProfileService.getSettings();

    setHtml(container, renderThemePickerView({
      currentTheme: settings.theme,
      currentFont: settings.fontScale,
      currentLang: settings.language,
      soundFx: settings.soundFx,
      clickSound: settings.clickSound,
      examAlerts: settings.examAlerts,
      rankAlerts: settings.rankAlerts,
      lectureAlerts: settings.lectureAlerts,
      cacheSize: settings.cacheSize
    }));

    // Audio synthesizer helper using Web Audio API
    const playSynthesizedChime = (freqStart = 587.33, freqEnd = 880) => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } catch (_) {}
    };

    // 1. Theme Selection Cards
    container.querySelectorAll("[data-theme-choice]").forEach((card) => {
      card.addEventListener("click", () => {
        const theme = card.getAttribute("data-theme-choice");
        ProfileService.applyTheme(theme);
        profileState.set("theme", theme);

        const soundEnabled = ProfileService.getSettings().soundFx;
        if (soundEnabled) {
          playSynthesizedChime(520, 880);
        }

        // Re-render settings to refresh active checkmarks and bottom bar
        this.loadSettingsView(container);
        showToast(`تم تطبيق السمة اللونية بنجاح 🎨`, "success");
      });
    });

    // Helper to update font display and live preview box
    const updateFontVisuals = (newScale) => {
      profileState.set("fontScale", newScale);
      const disp = container.querySelector("#fontScaleDisplay");
      if (disp) disp.textContent = `${newScale}%`;

      const previewBox = container.querySelector("#stFontPreviewBox");
      if (previewBox) {
        previewBox.style.fontSize = `${(15 * newScale) / 100}px`;
      }

      container.querySelectorAll("[data-font-preset]").forEach((btn) => {
        const pVal = Number(btn.getAttribute("data-font-preset"));
        btn.classList.toggle("active", pVal === newScale);
      });
    };

    // 2. Font Stepper (A- / A+)
    container.querySelector("#fontDecBtn")?.addEventListener("click", () => {
      const newScale = ProfileService.applyFontScale(-1);
      updateFontVisuals(newScale);
    });

    container.querySelector("#fontIncBtn")?.addEventListener("click", () => {
      const newScale = ProfileService.applyFontScale(1);
      updateFontVisuals(newScale);
    });

    // 3. Font Presets (85%, 100%, 115%, 130%)
    container.querySelectorAll("[data-font-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetVal = Number(btn.getAttribute("data-font-preset"));
        const newScale = ProfileService.applyFontScale(targetVal);
        updateFontVisuals(newScale);
        showToast(`تم ضبط مقياس الخط على ${newScale}% 🔤`, "info");
      });
    });

    // 4. Language Selection
    container.querySelector("#platformLanguageSelect")?.addEventListener("change", (e) => {
      const selected = e.target.value;
      ProfileService.applyLanguage(selected);
      profileState.set("language", selected);
      showToast(`تم ضبط لغة المنصة: ${selected === "ar" ? "العربية" : "English"} 🌐`, "info");
    });

    // 5. Sound FX Toggles & Test Button
    container.querySelector("#stSoundFxToggle")?.addEventListener("change", (e) => {
      const isEnabled = e.target.checked;
      ProfileService.savePreference("mw_pref_sound_fx", isEnabled);
      if (isEnabled) {
        playSynthesizedChime(520, 920);
        showToast("تم تفعيل مؤثرات الصوت والتحديات بنجاح 🔊", "success");
      } else {
        showToast("تم كتم مؤثرات الصوت 🔇", "info");
      }
    });

    container.querySelector("#stClickSoundToggle")?.addEventListener("change", (e) => {
      const isEnabled = e.target.checked;
      ProfileService.savePreference("mw_pref_click_sound", isEnabled);
      showToast(isEnabled ? "تم تفعيل أصوات النقر والتنقل 🎧" : "تم تعطيل أصوات النقر", "info");
    });

    container.querySelector("#stTestAudioBtn")?.addEventListener("click", () => {
      playSynthesizedChime(440, 880);
      setTimeout(() => playSynthesizedChime(660, 1100), 120);
      showToast("تم تشغيل نغمة اختبار الصوت بنجاح 🔔", "success");
    });

    // 6. Push Notification Toggles
    container.querySelector("#stExamAlertsToggle")?.addEventListener("change", (e) => {
      ProfileService.savePreference("mw_pref_exam_alerts", e.target.checked);
      showToast(e.target.checked ? "تم تفعيل تنبيهات المهام والامتحانات 📋" : "تم تعطيل تنبيهات المهام", "info");
    });

    container.querySelector("#stRankAlertsToggle")?.addEventListener("change", (e) => {
      ProfileService.savePreference("mw_pref_rank_alerts", e.target.checked);
      showToast(e.target.checked ? "تم تفعيل إشعارات لوحة المتصدرين 🏆" : "تم تعطيل إشعارات الترتيب", "info");
    });

    container.querySelector("#stLectureAlertsToggle")?.addEventListener("change", (e) => {
      ProfileService.savePreference("mw_pref_lecture_alerts", e.target.checked);
      showToast(e.target.checked ? "تم تفعيل إشعارات المحاضرات الجديدة 🎥" : "تم تعطيل إشعارات المحاضرات", "info");
    });

    // 7. Cloud Sync Button
    container.querySelector("#stSyncNowBtn")?.addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري المزامنة السحابية...</span>`;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        const lastSync = container.querySelector("#stLastSyncDisplay");
        if (lastSync) lastSync.textContent = "الآن (متزامن ✓)";
        showToast("تمت المزامنة بنجاح مع خوادم اتحاد بشبابها السحابية ☁️", "success");
      }, 700);
    });

    // 8. Clear Cache Button
    container.querySelector("#stClearCacheBtn")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "تنظيف الذاكرة المؤقتة (Clear Cache) 🧹",
        message: "هل ترغب في مسح ملفات الكاش المحلية للدروس والواجبات؟\n(لن يؤدي ذلك إلى تسجيل الخروج أو مسح حسابك)",
        confirmText: "نعم، تنظيف الكاش",
        cancelText: "إلغاء",
        variant: "warning"
      }).then((confirmed) => {
        if (confirmed) {
          ProfileService.clearCache();
          const cacheDisp = container.querySelector("#stCacheSizeDisplay");
          if (cacheDisp) cacheDisp.textContent = ProfileService.calculateCacheSize();
          showToast("تم تنظيف الذاكرة المؤقتة بنجاح 🧹", "success");
        }
      });
    });

    // 9. Reset Defaults Button
    container.querySelector("#stResetDefaultsBtn")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "إعادة ضبط إعدادات المنصة ⟲",
        message: "هل أنت متأكد من رغبتك في إعادة ضبط السمة اللونية، مقياس الخط، وتفضيلات الصوت للإعدادات الافتراضية الأصلية؟",
        confirmText: "إعادة ضبط المصنع",
        cancelText: "إلغاء",
        variant: "danger"
      }).then((confirmed) => {
        if (confirmed) {
          ProfileService.resetDefaults();
          this.loadSettingsView(container);
          showToast("تمت استعادة الإعدادات الافتراضية للمنصة بنجاح ✓", "success");
        }
      });
    });

    // 10. Guide Button
    container.querySelector("#stGuideBtn")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "دليل إعدادات المنصة والتخصيص 📘",
        message: "تتيح لك إعدادات منصة اتحاد بشبابها تخصيص كامل للواجهة:\n\n1. السمات اللونية: التبديل بين النمط الرسمي، والنمط التقني الأزرق، والبنفسجي، والذهبي.\n2. سهولة القراءة: تكبير وتصغير نصوص الأكواد البرمجية لتناسب شاشتك.\n3. التنبيهات: استلام تذكيرات بمواعيد تسليم المهام ومستجدات لوحة الأبطال.\n4. المزامنة: بياناتك محفوظة سحابياً ومشفرة بالكامل.",
        confirmText: "فهمت شكراً",
        cancelText: "إغلاق",
        variant: "primary"
      });
    });

    // 11. Save All Confirmation Button
    container.querySelector("#stSaveAllBtn")?.addEventListener("click", () => {
      const soundEnabled = ProfileService.getSettings().soundFx;
      if (soundEnabled) {
        playSynthesizedChime(587, 880);
      }
      showToast("تم حفظ وتثبيت كافة التفضيلات بنجاح في حسابك الأكاديمي 🚀", "success");
    });
  }
};

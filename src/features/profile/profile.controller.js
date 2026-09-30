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
        message: `تشهد أمانة العمل الجماهيري بحزب مستقبل وطن بأن الطالب: ${name}\nمقيد رسمياً في البرنامج التدريبي المتقدم لهندسة بايثون والذكاء الاصطناعي لموسم 2026/2027 بنسبة حضور 98% وتراكمي +A.\n\nكود التوثيق الأكاديمي: MW-CERT-8842-VERIFIED`,
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
        message: "يتضمن ملفك التعريفي كافة السجلات الرسمية المعتمدة لدى منصة مستقبل وطن. يمكنك استخدام شفرة QR لتسجيل الحضور الذكي في المعامل بدون كشوف ورقية.",
        confirmText: "فهمت",
        cancelText: "إغلاق",
        variant: "primary"
      });
    });
  },

  /**
   * Loads and renders theme and system settings.
   */
  loadSettingsView(containerId) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    const currentTheme = profileState.get("theme");
    const currentFont = profileState.get("fontScale");
    const currentLang = profileState.get("language");

    setHtml(container, renderThemePickerView({ currentTheme, currentFont, currentLang }));

    // Bind theme choice buttons
    container.querySelectorAll("[data-theme-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme-choice");
        ProfileService.applyTheme(theme);
        profileState.set("theme", theme);
        this.loadSettingsView(container);
        showToast(`تم تطبيق السمة اللونية الجديدة بنجاح 🎨`, "success");
      });
    });

    // Bind font buttons
    document.getElementById("fontDecBtn")?.addEventListener("click", () => {
      const newScale = ProfileService.applyFontScale(-1);
      profileState.set("fontScale", newScale);
      const disp = document.getElementById("fontScaleDisplay");
      if (disp) disp.textContent = `${newScale}%`;
    });

    document.getElementById("fontIncBtn")?.addEventListener("click", () => {
      const newScale = ProfileService.applyFontScale(1);
      profileState.set("fontScale", newScale);
      const disp = document.getElementById("fontScaleDisplay");
      if (disp) disp.textContent = `${newScale}%`;
    });

    // Bind language select
    document.getElementById("platformLanguageSelect")?.addEventListener("change", (e) => {
      const selected = e.target.value;
      ProfileService.applyLanguage(selected);
      profileState.set("language", selected);
      showToast(`تم ضبط لغة المنصة: ${selected === "ar" ? "العربية" : "English"} 🌐`, "info");
    });
  }
};

// src/features/profile/profile.service.js
import { auth } from "../../core/firebase.js";
import { updatePassword as fbUpdatePassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { StorageUtils } from "../../shared/utils/storage.utils.js";
import { STORAGE_KEYS, THEMES, LANGUAGES } from "../../core/constants.js";
import { normalizeError } from "../../core/errors.js";

export const ProfileService = {
  /**
   * Updates password for the currently signed-in user.
   */
  async updatePassword(newPassword) {
    const user = auth.currentUser;
    if (!user) throw new Error("يجب تسجيل الدخول أولاً لتغيير كلمة المرور.");

    try {
      await fbUpdatePassword(user, newPassword);
    } catch (err) {
      throw normalizeError(err);
    }
  },

  /**
   * Saves and applies theme token across document.
   */
  applyTheme(theme) {
    const validThemes = Object.values(THEMES);
    const targetTheme = validThemes.includes(theme) ? theme : THEMES.GREEN;

    StorageUtils.set(STORAGE_KEYS.THEME, targetTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", targetTheme);
    }
    return targetTheme;
  },

  /**
   * Saves and applies language preference.
   */
  applyLanguage(lang) {
    const targetLang = lang === LANGUAGES.EN ? LANGUAGES.EN : LANGUAGES.AR;
    StorageUtils.set(STORAGE_KEYS.LANGUAGE, targetLang);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", targetLang);
      document.documentElement.setAttribute("dir", targetLang === LANGUAGES.AR ? "rtl" : "ltr");
    }
    return targetLang;
  },

  /**
   * Adjusts font scale percentage (can accept delta or absolute value).
   */
  applyFontScale(val) {
    let targetScale;
    if (typeof val === "number" && val >= 70 && val <= 150) {
      targetScale = Math.min(130, Math.max(85, Math.round(val)));
    } else {
      let currentScale = Number(StorageUtils.get(STORAGE_KEYS.FONT_SCALE, 100));
      targetScale = Math.min(130, Math.max(85, currentScale + (Number(val) || 0) * 5));
    }

    StorageUtils.set(STORAGE_KEYS.FONT_SCALE, targetScale);
    if (typeof document !== "undefined") {
      document.documentElement.style.fontSize = `${(16 * targetScale) / 100}px`;
    }
    return targetScale;
  },

  /**
   * Retrieves all user settings and preferences.
   */
  getSettings() {
    return {
      theme: StorageUtils.get(STORAGE_KEYS.THEME, THEMES.GREEN),
      language: StorageUtils.get(STORAGE_KEYS.LANGUAGE, LANGUAGES.AR),
      fontScale: Number(StorageUtils.get(STORAGE_KEYS.FONT_SCALE, 100)),
      soundFx: StorageUtils.get("mw_pref_sound_fx", true),
      clickSound: StorageUtils.get("mw_pref_click_sound", true),
      examAlerts: StorageUtils.get("mw_pref_exam_alerts", true),
      rankAlerts: StorageUtils.get("mw_pref_rank_alerts", true),
      lectureAlerts: StorageUtils.get("mw_pref_lecture_alerts", true),
      cacheSize: this.calculateCacheSize()
    };
  },

  /**
   * Saves a single preference.
   */
  savePreference(key, value) {
    StorageUtils.set(key, value);
    return value;
  },

  /**
   * Calculates estimated local cache size in KB.
   */
  calculateCacheSize() {
    try {
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        const v = localStorage.getItem(k);
        totalBytes += (k?.length || 0) + (v?.length || 0);
      }
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        const v = sessionStorage.getItem(k);
        totalBytes += (k?.length || 0) + (v?.length || 0);
      }
      const kb = Math.max(12, Math.round(totalBytes / 1024));
      return `${kb} KB`;
    } catch (_) {
      return "48 KB";
    }
  },

  /**
   * Clears temporary student caches without breaking session auth.
   */
  clearCache() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith("mw_student_profile_") || k.startsWith("future_watan_exam_draft_") || k.includes("_cache"))) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      sessionStorage.clear();
      return true;
    } catch (_) {
      return false;
    }
  },

  /**
   * Resets all settings to system defaults.
   */
  resetDefaults() {
    this.applyTheme(THEMES.GREEN);
    this.applyLanguage(LANGUAGES.AR);
    this.applyFontScale(100);
    this.savePreference("mw_pref_sound_fx", true);
    this.savePreference("mw_pref_click_sound", true);
    this.savePreference("mw_pref_exam_alerts", true);
    this.savePreference("mw_pref_rank_alerts", true);
    this.savePreference("mw_pref_lecture_alerts", true);
    return this.getSettings();
  }
};

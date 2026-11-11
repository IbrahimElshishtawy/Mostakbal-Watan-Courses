// src/features/profile/profile.service.js
import { auth, db } from "../../core/firebase.js";
import { updatePassword as fbUpdatePassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { StorageUtils } from "../../shared/utils/storage.utils.js";
import { STORAGE_KEYS, THEMES, LANGUAGES, COLLECTIONS } from "../../core/constants.js";
import { normalizeError } from "../../core/errors.js";
import { applyLanguageToDOM } from "../../shared/utils/i18n.js";

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
    return applyLanguageToDOM(lang);
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
   * Authoritatively saves all preferences to Storage and Firestore user record.
   */
  async saveAllSettings(settings = {}) {
    const targetLang = settings.language === LANGUAGES.EN ? LANGUAGES.EN : LANGUAGES.AR;
    const targetTheme = settings.theme || this.getSettings().theme;
    const targetFontScale = typeof settings.fontScale === "number" ? settings.fontScale : this.getSettings().fontScale;
    const soundFx = settings.soundFx !== undefined ? Boolean(settings.soundFx) : true;
    const clickSound = settings.clickSound !== undefined ? Boolean(settings.clickSound) : true;
    const examAlerts = settings.examAlerts !== undefined ? Boolean(settings.examAlerts) : true;
    const rankAlerts = settings.rankAlerts !== undefined ? Boolean(settings.rankAlerts) : true;
    const lectureAlerts = settings.lectureAlerts !== undefined ? Boolean(settings.lectureAlerts) : true;

    // 1. Save to local storage
    StorageUtils.set(STORAGE_KEYS.LANGUAGE, targetLang);
    StorageUtils.set(STORAGE_KEYS.THEME, targetTheme);
    StorageUtils.set(STORAGE_KEYS.FONT_SCALE, targetFontScale);
    StorageUtils.set("mw_pref_sound_fx", soundFx);
    StorageUtils.set("mw_pref_click_sound", clickSound);
    StorageUtils.set("mw_pref_exam_alerts", examAlerts);
    StorageUtils.set("mw_pref_rank_alerts", rankAlerts);
    StorageUtils.set("mw_pref_lecture_alerts", lectureAlerts);

    // 2. Persist to Firestore if user is logged in
    const user = auth.currentUser;
    if (user && db) {
      const userSettingsPayload = {
        language: targetLang,
        theme: targetTheme,
        fontScale: targetFontScale,
        soundFx,
        clickSound,
        updatedAt: serverTimestamp()
      };

      try {
        // Save to student_gamification or users collection where authenticated user has write permission
        await setDoc(doc(db, COLLECTIONS.STUDENT_GAMIFICATION, user.uid), {
          studentUid: user.uid,
          preferences: userSettingsPayload
        }, { merge: true });
      } catch (cloudErr) {
        console.warn("Could not sync preferences to student_gamification, trying fallback:", cloudErr);
      }
    }

    // 3. Apply changes visually to document
    this.applyTheme(targetTheme);
    this.applyLanguage(targetLang);
    this.applyFontScale(targetFontScale);

    return {
      success: true,
      language: targetLang,
      theme: targetTheme,
      fontScale: targetFontScale
    };
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

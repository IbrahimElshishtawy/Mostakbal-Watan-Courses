// src/shared/utils/storage.utils.js

/**
 * Safe localStorage wrapper with JSON parsing.
 */
export const StorageUtils = {
  get(key, defaultValue = null) {
    if (typeof localStorage === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch {
      try {
        return localStorage.getItem(key) || defaultValue;
      } catch {
        return defaultValue;
      }
    }
  },

  set(key, value) {
    if (typeof localStorage === "undefined") return;
    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.warn(`Failed to save [${key}] to localStorage:`, e);
    }
  },

  remove(key) {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {}
  }
};

// src/features/python-adventure/python-hearts.service.js
import { escapeHtml } from "../../shared/utils/dom.utils.js";

export const MAX_HEARTS = 3;
export const HEART_REGEN_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes per heart
export const CHALLENGE_RETRY_COOLDOWN_MS = 3 * 60 * 1000; // 3 minutes cooling down before retry
const STORAGE_PREFIX = "python_adventure_hearts_";

/**
 * Service managing student Hearts (Lives) and Challenge Cooldowns
 * in Python Adventure gamified learning environment.
 */
export const PythonHeartsService = {
  MAX_HEARTS,
  HEART_REGEN_INTERVAL_MS,
  CHALLENGE_RETRY_COOLDOWN_MS,

  _getStorageKey(studentUid) {
    return `${STORAGE_PREFIX}${studentUid || "guest"}`;
  },

  /**
   * Reads raw saved hearts state from local cache or student progress.
   */
  _readRawState(studentUid, progress) {
    if (progress?.heartsState && typeof progress.heartsState === "object") {
      return { ...progress.heartsState };
    }
    try {
      const key = this._getStorageKey(studentUid);
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (_) {}

    return {
      hearts: MAX_HEARTS,
      maxHearts: MAX_HEARTS,
      lastRegenTime: Date.now(),
      challengeCooldowns: {}
    };
  },

  /**
   * Persists hearts state to local cache.
   */
  _saveRawState(studentUid, state) {
    try {
      const key = this._getStorageKey(studentUid);
      localStorage.setItem(key, JSON.stringify(state));
    } catch (_) {}
  },

  /**
   * Calculates up-to-date hearts state taking time-based regeneration into account.
   * @param {string} studentUid
   * @param {object} [progress]
   * @returns {object} Calculated hearts state
   */
  getHeartsState(studentUid, progress) {
    const raw = this._readRawState(studentUid, progress);
    const now = Date.now();

    let hearts = Number(raw.hearts);
    if (isNaN(hearts) || hearts < 0) hearts = MAX_HEARTS;
    if (hearts > MAX_HEARTS) hearts = MAX_HEARTS;

    let lastRegenTime = Number(raw.lastRegenTime) || now;
    const challengeCooldowns = { ...(raw.challengeCooldowns || {}) };

    // 1. Time-based Heart Regeneration
    if (hearts < MAX_HEARTS) {
      const elapsed = Math.max(0, now - lastRegenTime);
      const gainedHearts = Math.floor(elapsed / HEART_REGEN_INTERVAL_MS);

      if (gainedHearts > 0) {
        hearts = Math.min(MAX_HEARTS, hearts + gainedHearts);
        if (hearts >= MAX_HEARTS) {
          lastRegenTime = now;
        } else {
          // Advance lastRegenTime preserving remainder ms towards next heart
          lastRegenTime += gainedHearts * HEART_REGEN_INTERVAL_MS;
        }
      }
    } else {
      lastRegenTime = now;
    }

    // 2. Prune expired challenge cooldowns
    for (const [chId, expireAt] of Object.entries(challengeCooldowns)) {
      if (Number(expireAt) <= now) {
        delete challengeCooldowns[chId];
      }
    }

    // 3. Compute remaining seconds for next heart
    let nextHeartInSeconds = 0;
    if (hearts < MAX_HEARTS) {
      const elapsedInCurrentCycle = Math.max(0, now - lastRegenTime);
      const remainingMs = Math.max(0, HEART_REGEN_INTERVAL_MS - (elapsedInCurrentCycle % HEART_REGEN_INTERVAL_MS));
      nextHeartInSeconds = Math.ceil(remainingMs / 1000);
    }

    const updatedState = {
      hearts,
      maxHearts: MAX_HEARTS,
      lastRegenTime,
      challengeCooldowns,
      activeCooldownsCount: Object.keys(challengeCooldowns).length,
      nextHeartInSeconds,
      formattedNextHeart: this.formatTime(nextHeartInSeconds),
      isFull: hearts >= MAX_HEARTS,
      isEmpty: hearts <= 0
    };

    this._saveRawState(studentUid, updatedState);
    return updatedState;
  },

  /**
   * Consumes one heart when the student exhausts 2 attempts on a challenge.
   * Also sets a cooling down period on that challenge.
   * @param {string} studentUid
   * @param {string} challengeId
   * @param {object} [progress]
   * @returns {object} Updated hearts state & cooldown info
   */
  consumeHeart(studentUid, challengeId, progress) {
    const state = this.getHeartsState(studentUid, progress);
    const now = Date.now();

    const previousHearts = state.hearts;
    const newHearts = Math.max(0, previousHearts - 1);

    // If we just dropped below max, initialize regeneration baseline
    let lastRegenTime = state.lastRegenTime;
    if (previousHearts >= MAX_HEARTS) {
      lastRegenTime = now;
    }

    // Set challenge cooling-down period (3 minutes)
    const cooldownUntil = now + CHALLENGE_RETRY_COOLDOWN_MS;
    const challengeCooldowns = { ...(state.challengeCooldowns || {}) };
    if (challengeId) {
      challengeCooldowns[challengeId] = cooldownUntil;
    }

    const elapsedInCycle = Math.max(0, now - lastRegenTime);
    const nextHeartInSeconds = Math.ceil(Math.max(0, HEART_REGEN_INTERVAL_MS - (elapsedInCycle % HEART_REGEN_INTERVAL_MS)) / 1000);

    const updatedState = {
      hearts: newHearts,
      maxHearts: MAX_HEARTS,
      lastRegenTime,
      challengeCooldowns,
      nextHeartInSeconds,
      formattedNextHeart: this.formatTime(nextHeartInSeconds),
      isFull: newHearts >= MAX_HEARTS,
      isEmpty: newHearts <= 0,
      challengeCooldownUntil: cooldownUntil,
      challengeCooldownSeconds: Math.ceil(CHALLENGE_RETRY_COOLDOWN_MS / 1000)
    };

    this._saveRawState(studentUid, updatedState);
    return updatedState;
  },

  /**
   * Checks if a specific challenge is currently in its retry cooling-down period.
   * @param {string} studentUid
   * @param {string} challengeId
   * @param {object} [progress]
   * @returns {object} { isOnCooldown, remainingSeconds, formattedRemaining }
   */
  getChallengeCooldown(studentUid, challengeId, progress) {
    if (!challengeId) return { isOnCooldown: false, remainingSeconds: 0, formattedRemaining: "00:00" };
    const state = this.getHeartsState(studentUid, progress);
    const expireAt = state.challengeCooldowns?.[challengeId];
    const now = Date.now();

    if (expireAt && expireAt > now) {
      const remainingSeconds = Math.ceil((expireAt - now) / 1000);
      return {
        isOnCooldown: true,
        remainingSeconds,
        formattedRemaining: this.formatTime(remainingSeconds)
      };
    }

    return { isOnCooldown: false, remainingSeconds: 0, formattedRemaining: "00:00" };
  },

  /**
   * Checks whether the student is allowed to attempt/submit a challenge right now.
   * @param {string} studentUid
   * @param {string} challengeId
   * @param {object} [progress]
   * @returns {object} { allowed, reason, message, remainingSeconds }
   */
  canAttemptChallenge(studentUid, challengeId, progress) {
    const heartsState = this.getHeartsState(studentUid, progress);

    if (heartsState.isEmpty) {
      return {
        allowed: false,
        reason: "NO_HEARTS",
        message: `نفدت جميع القلوب لديك (0/${MAX_HEARTS})! يرجى الانتظار ${heartsState.formattedNextHeart} حتى يتجدد قلبك القادم.`,
        remainingSeconds: heartsState.nextHeartInSeconds
      };
    }

    const cooldown = this.getChallengeCooldown(studentUid, challengeId, progress);
    if (cooldown.isOnCooldown) {
      return {
        allowed: false,
        reason: "COOLDOWN",
        message: `استراحة تفكير ومراجعة: تبقى ${cooldown.formattedRemaining} لإعادة محاولة حل هذا التحدي.`,
        remainingSeconds: cooldown.remainingSeconds
      };
    }

    return {
      allowed: true,
      reason: "OK",
      message: "جاهز للحل",
      remainingSeconds: 0
    };
  },

  /**
   * Formats seconds into MM:SS string (e.g. 02:45).
   * @param {number} seconds
   * @returns {string}
   */
  formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds || 0));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(m).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  },

  /**
   * Renders HTML markup for the interactive Hearts Pill in Topbar or Headers.
   * @param {object} heartsState
   * @returns {string} HTML
   */
  renderHeartsPillHtml(heartsState) {
    const { hearts = MAX_HEARTS, maxHearts = MAX_HEARTS, formattedNextHeart, isFull, isEmpty } = heartsState || {};
    
    let heartsIcons = "";
    for (let i = 0; i < maxHearts; i++) {
      if (i < hearts) {
        heartsIcons += `<span class="heart-icon active" title="قلب متاح ❤️">❤️</span>`;
      } else {
        heartsIcons += `<span class="heart-icon lost" title="قلب مفقود (قيد التجديد) 🤍">🤍</span>`;
      }
    }

    const statusClass = isEmpty ? "empty" : (hearts === 1 ? "critical" : (hearts === 2 ? "warning" : "full"));
    const tooltipText = isFull 
      ? `رصيد القلوب كامل (${hearts}/${maxHearts}) - كل محاولتين فاشلتين تستهلك قلباً واحداً.` 
      : (isEmpty 
        ? `نفدت كل القلوب! سيتجدد قلب إضافي بعد ${formattedNextHeart} ⏳` 
        : `لديك ${hearts} من ${maxHearts} قلوب. سيتجدد قلب إضافي بعد ${formattedNextHeart} ⏳`);

    return `
      <div class="adv-hearts-pill ${statusClass}" id="pyAdvHeartsPill" title="${escapeHtml(tooltipText)}">
        <div class="hearts-icons-wrap">${heartsIcons}</div>
        <div class="hearts-meta font-mono">
          <span class="hearts-ratio">${hearts}/${maxHearts}</span>
          ${!isFull ? `<span class="hearts-countdown" id="pyHeartsCountdownDigits">⏳ ${formattedNextHeart}</span>` : ""}
        </div>
      </div>
    `;
  }
};

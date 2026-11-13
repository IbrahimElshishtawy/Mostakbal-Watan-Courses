// src/features/leaderboard/leaderboard-audio.service.js
/**
 * Leaderboard Action Audio & Speech Announcement Service
 * Delivers dynamic Arabic voice broadcast for Top 1 & Top 2 champions
 * with cinematic Web Audio API sound effects and honorary titles.
 */

/**
 * Determines the gender-aware honorary engineering title in Arabic ("المهندسة" or "المهندس").
 * Respects Egyptian and Arabic naming conventions and exceptions.
 * @param {string} fullName
 * @returns {"المهندسة" | "المهندس"}
 */
export function getHonoraryEngineerTitle(fullName) {
  if (!fullName || typeof fullName !== "string") return "المهندس";
  const clean = fullName.trim().replace(/^(?:أ\.\s*|م\.\s*|مهندس(?:ة)?\s*[\/:\-]?\s*)/i, "").trim();
  const firstWord = clean.split(/\s+/)[0] || "";

  // Common male exceptions that end in ة or resemble female morphology
  const maleExceptions = new Set([
    "حمزة", "أسامة", "اسامة", "طلحة", "قتادة", "عكرمة", "عبيدة", "حذيفة", "معاوية",
    "جمعة", "عطية", "شحاتة", "سلامة", "شيبة", "عرفة", "طه", "عبده", "رضا", "ضياء",
    "علاء", "بهاء", "عصام", "هشام", "حسام", "إسلام", "اسلام", "يحيى", "يحيي", "عيسى", "موسى"
  ]);

  if (maleExceptions.has(firstWord)) {
    return "المهندس";
  }

  // Explicit female names common in Arabic / Egypt
  const femaleNames = new Set([
    "سهيلة", "مريم", "روان", "تسنيم", "هاجر", "ريم", "نور", "سلمى", "سلمي", "ياسمين",
    "شهد", "بسنت", "مي", "هدير", "رنا", "دينا", "إسراء", "اسراء", "أسماء", "اسماء",
    "آلاء", "الاء", "شيماء", "دنيا", "نيرة", "فرح", "ملك", "شروق", "مرام", "تقى", "تقي",
    "رضوى", "رضوي", "نورهان", "نادين", "جودي", "جنى", "جني", "كارما", "تاليا", "ليلى", "ليلي",
    "ماهينور", "بسملة", "نجلاء", "رغد", "رحمة", "رؤى", "رؤي", "إيمان", "ايمان", "حنان",
    "إيناس", "ايناس", "نهى", "نهي", "دعاء", "وفاء", "زينب", "رشا", "داليا", "سمر",
    "نرمين", "مروة", "عبير", "إلهام", "الهام", "صفاء", "سناء", "ولاء", "نجوى", "نجوي",
    "شيرين", "بسمة", "آية", "اية", "منة", "منه", "جنة", "جنه", "ندى", "ندي",
    "هبة", "هبه", "حبيبة", "حبيبه", "فاطمة", "فاطمه", "سارة", "ساره", "خديجة", "عائشة",
    "أميرة", "اميرة", "أروى", "اروى", "ميادة", "خلود", "شمس", "حنين", "سندس", "سما",
    "هدى", "هدي", "منى", "مني", "ضحى", "ضحي", "فدوى", "فدوي", "لبنى", "لبني"
  ]);

  if (femaleNames.has(firstWord)) {
    return "المهندسة";
  }

  // Feminine endings in Arabic: ة or specific combinations
  if (firstWord.endsWith("ة") || firstWord.endsWith("اء") || firstWord.endsWith("ات") || firstWord.endsWith("ى")) {
    return "المهندسة";
  }

  return "المهندس";
}

/**
 * Returns formatted challenge honor title ("المسمى في التحدي")
 * @param {object} student
 * @param {number} rank
 * @returns {string}
 */
export function getChallengeHonorTitle(student, rank) {
  if (rank === 1) {
    return "بطل التحديات الأول 👑 | خبير بايثون الأسطوري 🐍";
  }
  if (rank === 2) {
    return "وصيف البطولة 🥈 | مهندس الخوارزميات المتقدمة 🧠";
  }
  if (rank === 3) {
    return "فارس التحديات 🥉 | صائد الثغرات البرمجية 🛡️";
  }
  return student?.levelTitle || "مطور برمجيات واعد ⚡";
}

/**
 * Web Audio API & Speech Synthesis Controller
 */
class LeaderboardAudioServiceClass {
  constructor() {
    this._audioCtx = null;
    this._isAnnouncing = false;
    this._currentUtterance = null;
  }

  /**
   * Initializes or resumes AudioContext upon user gesture
   */
  _getAudioContext() {
    if (!this._audioCtx || this._audioCtx.state === "closed") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this._audioCtx = new AudioContextClass();
      }
    }
    if (this._audioCtx && this._audioCtx.state === "suspended") {
      this._audioCtx.resume();
    }
    return this._audioCtx;
  }

  /**
   * Plays a majestic Action Brass Fanfare chords using native Web Audio oscillators
   */
  playActionFanfare() {
    const ctx = this._getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Heroic brass chords: G3, C4, E4, G4, C5, E5
    const notes = [196.00, 261.63, 329.63, 392.00, 523.25, 659.25];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Rich brass timbre
      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      // Low pass filter for warm trumpet presence
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(800, now + 1.2);

      // Attack - Decay - Sustain - Release Envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.08 + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + 1.45);
    });
  }

  /**
   * Plays a cinematic action impact boom / sub-bass hit
   */
  playCinematicImpact() {
    const ctx = this._getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pitch drop for dramatic action impact
    osc.type = "sine";
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.35);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  /**
   * Plays a sparkling crystalline victory arpeggio chime
   */
  playVictoryArpeggio() {
    const ctx = this._getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.65);
    });
  }

  /**
   * Launches celebratory multi-color confetti explosion on the screen
   */
  triggerConfetti() {
    const container = document.querySelector(".lb-podium-wrapper") || document.body;
    const count = 35;
    const colors = ["#f59e0b", "#38bdf8", "#ec4899", "#10b981", "#e2e8f0", "#a855f7"];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "lb-action-confetti-particle";
      const bg = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.floor(Math.random() * 8) + 6;
      const left = Math.floor(Math.random() * 80) + 10;
      const xVel = (Math.random() - 0.5) * 300;
      const rot = Math.floor(Math.random() * 720) - 360;

      particle.style.cssText = `
        position: absolute;
        top: 20%;
        left: ${left}%;
        width: ${size}px;
        height: ${size * (Math.random() > 0.5 ? 1.6 : 1)}px;
        background-color: ${bg};
        border-radius: ${Math.random() > 0.4 ? "50%" : "2px"};
        pointer-events: none;
        z-index: 9999;
        transform: translate3d(0, 0, 0) rotate(0deg);
        opacity: 1;
        transition: transform 1.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.4s ease-out;
      `;

      container.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate3d(${xVel}px, ${Math.random() * 260 + 120}px, 0) rotate(${rot}deg)`;
        particle.style.opacity = "0";
      });

      setTimeout(() => {
        particle.remove();
      }, 1500);
    }
  }

  /**
   * Finds the best Arabic voice supported by the client browser
   */
  _getArabicVoice() {
    if (!window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural Arabic voices
    const arVoice = voices.find((v) => v.lang.startsWith("ar-EG") || v.lang.startsWith("ar-SA") || v.lang.startsWith("ar"));
    return arVoice || voices.find((v) => v.lang.includes("ar")) || null;
  }

  /**
   * Stops any ongoing speech and effects
   */
  stopAnnouncement() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this._isAnnouncing = false;
  }

  /**
   * Returns whether an announcement is currently active
   */
  isAnnouncing() {
    return this._isAnnouncing;
  }

  /**
   * Formulates and broadcasts the Action Voice Announcement for Top 1 and Top 2
   * @param {object} params
   * @param {object} params.top1 - Top 1 student entry
   * @param {object} params.top2 - Top 2 student entry
   * @param {function} params.onStart - Callback when speech starts
   * @param {function} params.onEnd - Callback when speech finishes or canceled
   * @param {function} params.onFocusRank - Callback with (rank) to highlight podium cards
   */
  async announceTopChampions({
    top1 = null,
    top2 = null,
    onStart = () => {},
    onEnd = () => {},
    onFocusRank = () => {}
  } = {}) {
    if (this._isAnnouncing) {
      this.stopAnnouncement();
      onEnd();
      return;
    }

    if (!window.speechSynthesis) {
      console.warn("SpeechSynthesis is not supported in this browser.");
      onEnd();
      return;
    }

    this._isAnnouncing = true;
    onStart();

    // 1. Initial Action Fanfare & Confetti
    this.playCinematicImpact();
    this.playActionFanfare();
    this.triggerConfetti();

    // Prepare student data
    const name1 = top1?.studentName || "بطل الدورة";
    const title1 = getHonoraryEngineerTitle(name1);
    const challengeRole1 = "خبير بايثون الأسطوري وبطل التحديات الأول";
    const xp1 = top1?.xp ? `${top1.xp.toLocaleString()} نقطة` : "";

    const name2 = top2?.studentName || "وصيف البطولة";
    const title2 = getHonoraryEngineerTitle(name2);
    const challengeRole2 = "مهندس الخوارزميات المتقدمة ووصيف البطولة";
    const xp2 = top2?.xp ? `${top2.xp.toLocaleString()} نقطة` : "";

    // Arabic Action Broadcast Script
    const speechSegments = [
      {
        text: `أهلاً بكم في قاعة الشرف وتتويج الأبطال!`,
        action: () => {
          onFocusRank(0);
        },
        delayAfter: 350
      },
      {
        text: `في المركز الأول وبطل الصدارة: ${title1} ${name1}! ${challengeRole1} برصيد ${xp1}!`,
        action: () => {
          onFocusRank(1);
          this.playCinematicImpact();
          this.playVictoryArpeggio();
          this.triggerConfetti();
        },
        delayAfter: 500
      },
      {
        text: `وفي المركز الثاني ووصيف البطولة: ${title2} ${name2}! ${challengeRole2} برصيد ${xp2}!`,
        action: () => {
          onFocusRank(2);
          this.playActionFanfare();
          this.triggerConfetti();
        },
        delayAfter: 400
      },
      {
        text: `تحية فخر وإجلال لمهندسي المستقبل في منصة اتحاد بشبابها! عاااش يا أبطال!`,
        action: () => {
          onFocusRank(0);
          this.playVictoryArpeggio();
          this.playActionFanfare();
          this.triggerConfetti();
        },
        delayAfter: 200
      }
    ];

    // Ensure voices are loaded
    let voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) {
      await new Promise((res) => {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          res();
        };
        setTimeout(res, 300);
      });
    }

    const arVoice = this._getArabicVoice();

    // Play segments sequentially
    for (const segment of speechSegments) {
      if (!this._isAnnouncing) break;

      segment.action();

      await new Promise((resolve) => {
        const utter = new SpeechSynthesisUtterance(segment.text);
        utter.lang = "ar-SA";
        if (arVoice) utter.voice = arVoice;
        utter.rate = 0.96;
        utter.pitch = 1.05;
        utter.volume = 1.0;

        utter.onend = () => {
          setTimeout(resolve, segment.delayAfter || 200);
        };
        utter.onerror = () => {
          resolve();
        };

        this._currentUtterance = utter;
        window.speechSynthesis.speak(utter);
      });
    }

    this._isAnnouncing = false;
    onFocusRank(0);
    onEnd();
  }
}

export const LeaderboardAudioService = new LeaderboardAudioServiceClass();

import { db } from "../../config/firebase";
import { StudentGamificationProfile } from "./types";

// ==========================================
// 1. CONFIGURABLE LEVEL THRESHOLDS & TITLES
// ==========================================

export interface LevelThreshold {
  level: number;
  minXp: number;
  titleAr: string;
  titleEn: string;
  badge: string;
}

export const DEFAULT_LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, minXp: 0, titleAr: "مبتدئ", titleEn: "Beginner", badge: "🌱" },
  { level: 2, minXp: 100, titleAr: "مستكشف", titleEn: "Explorer", badge: "🧭" },
  { level: 3, minXp: 250, titleAr: "متعلم نشط", titleEn: "Learner", badge: "📚" },
  { level: 4, minXp: 500, titleAr: "مطور واعد", titleEn: "Developer", badge: "💻" },
  { level: 5, minXp: 850, titleAr: "مطور متقدم", titleEn: "Advanced", badge: "⚡" },
  { level: 6, minXp: 1300, titleAr: "خبير برمجي", titleEn: "Expert", badge: "🔥" },
  { level: 7, minXp: 1900, titleAr: "أستاذ الأكواد", titleEn: "Master", badge: "🔮" },
  { level: 8, minXp: 2700, titleAr: "بطل المسار", titleEn: "Champion", badge: "🏆" },
  { level: 9, minXp: 3700, titleAr: "نخبة المطورين", titleEn: "Elite", badge: "👑" },
  { level: 10, minXp: 5000, titleAr: "أسطورة البرمجة", titleEn: "Legend", badge: "🌟" }
];

export const TASK_COIN_REWARDS = {
  simple: 10,
  medium: 25,
  difficult: 50,
  project: 100
};

/**
 * Calculates current level and progress from XP.
 */
export function calculateGamificationLevel(xp: number, thresholds = DEFAULT_LEVEL_THRESHOLDS) {
  let activeLevel = thresholds[0];
  let nextLevel = thresholds[1] || thresholds[0];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i].minXp) {
      activeLevel = thresholds[i];
      nextLevel = thresholds[i + 1] || activeLevel;
      break;
    }
  }

  const isMaxLevel = activeLevel.level === thresholds[thresholds.length - 1].level;
  const currentBase = activeLevel.minXp;
  const targetXp = isMaxLevel ? activeLevel.minXp : nextLevel.minXp;
  const range = isMaxLevel ? 1 : (targetXp - currentBase);
  const currentLevelXp = xp - currentBase;
  const progressPercent = isMaxLevel ? 100 : Math.min(100, Math.max(0, Math.round((currentLevelXp / range) * 100)));

  return {
    level: activeLevel.level,
    levelTitleAr: activeLevel.titleAr,
    levelTitleEn: activeLevel.titleEn,
    levelBadge: activeLevel.badge,
    currentLevelXp,
    requiredLevelXp: targetXp - currentBase,
    progressPercent,
    isMaxLevel
  };
}

// ==========================================
// 2. AUTHORITATIVE XP & COINS LEDGER ENGINES
// ==========================================

const GAMIFICATION_COLLECTION = "student_gamification";
const XP_LEDGER_COLLECTION = "xp_ledger";
const COIN_LEDGER_COLLECTION = "coin_ledger";

export interface AwardXpOptions {
  studentUid: string;
  amount: number;
  source: "daily_challenge" | "coding_task" | "bonus" | "season_reset";
  sourceId: string;
  reason: string;
  seasonId?: string;
}

export interface AwardCoinsOptions {
  studentUid: string;
  amount: number;
  source: "coding_task" | "store_purchase" | "season_reset";
  sourceId: string;
  reason: string;
  seasonId?: string;
}

/**
 * Authoritatively awards XP with deterministic idempotency.
 */
export async function awardXP(options: AwardXpOptions) {
  const { studentUid, amount, source, sourceId, reason, seasonId = "season_2026_01" } = options;

  if (amount <= 0) {
    return { awarded: false, amount: 0, reason: "القيمة يجب أن تكون موجبة" };
  }

  const ledgerEntryId = `xp_${studentUid}_${source}_${sourceId}`;
  const ledgerDocRef = db.collection(XP_LEDGER_COLLECTION).doc(ledgerEntryId);
  const gamDocRef = db.collection(GAMIFICATION_COLLECTION).doc(studentUid);

  let newTotalXp = 0;
  let newLevel = 1;
  let levelUp = false;

  await db.runTransaction(async (t) => {
    const existingSnap = await t.get(ledgerDocRef);
    if (existingSnap.exists) {
      const gamSnap = await t.get(gamDocRef);
      newTotalXp = gamSnap.exists ? (gamSnap.data()?.xp || 0) : 0;
      newLevel = gamSnap.exists ? (gamSnap.data()?.level || 1) : 1;
      return;
    }

    const gamSnap = await t.get(gamDocRef);
    const prevData = gamSnap.exists ? gamSnap.data()! : {};
    const prevXp = Number(prevData.xp || 0);
    const prevLevel = Number(prevData.level || 1);

    newTotalXp = prevXp + amount;
    const levelCalc = calculateGamificationLevel(newTotalXp);
    newLevel = levelCalc.level;
    levelUp = newLevel > prevLevel;

    t.set(gamDocRef, {
      ...prevData,
      studentUid,
      xp: newTotalXp,
      level: newLevel,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    t.set(ledgerDocRef, {
      entryId: ledgerEntryId,
      studentUid,
      seasonId,
      amount,
      source,
      sourceId,
      reason,
      balanceAfter: newTotalXp,
      timestamp: new Date().toISOString()
    });
  });

  return {
    awarded: true,
    amount,
    totalXp: newTotalXp,
    level: newLevel,
    levelUp
  };
}

/**
 * Authoritatively awards Coins with deterministic idempotency.
 */
export async function awardCoins(options: AwardCoinsOptions) {
  const { studentUid, amount, source, sourceId, reason, seasonId = "season_2026_01" } = options;

  if (amount <= 0) {
    return { awarded: false, amount: 0, reason: "عدد العملات يجب أن يكون أكبر من الصفر" };
  }

  const ledgerEntryId = `coin_${studentUid}_${source}_${sourceId}`;
  const ledgerDocRef = db.collection(COIN_LEDGER_COLLECTION).doc(ledgerEntryId);
  const gamDocRef = db.collection(GAMIFICATION_COLLECTION).doc(studentUid);

  let newTotalCoins = 0;

  await db.runTransaction(async (t) => {
    const existingSnap = await t.get(ledgerDocRef);
    if (existingSnap.exists) {
      const gamSnap = await t.get(gamDocRef);
      newTotalCoins = gamSnap.exists ? (gamSnap.data()?.coins || 0) : 0;
      return;
    }

    const gamSnap = await t.get(gamDocRef);
    const prevData = gamSnap.exists ? gamSnap.data()! : {};
    const prevCoins = Number(prevData.coins || 0);

    newTotalCoins = prevCoins + amount;

    t.set(gamDocRef, {
      ...prevData,
      studentUid,
      coins: newTotalCoins,
      tasksCompleted: (prevData.tasksCompleted || 0) + (source === "coding_task" ? 1 : 0),
      updatedAt: new Date().toISOString()
    }, { merge: true });

    t.set(ledgerDocRef, {
      entryId: ledgerEntryId,
      studentUid,
      seasonId,
      amount,
      source,
      sourceId,
      reason,
      balanceAfter: newTotalCoins,
      timestamp: new Date().toISOString()
    });
  });

  return {
    awarded: true,
    amount,
    totalCoins: newTotalCoins
  };
}

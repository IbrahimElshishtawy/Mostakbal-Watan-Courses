import { HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config/firebase";
import { Season, SeasonArchive } from "./types";

const SEASONS_COLLECTION = "seasons";
const SEASON_ARCHIVES_COLLECTION = "season_archives";
const GAMIFICATION_COLLECTION = "student_gamification";
const AUDIT_LOGS_COLLECTION = "audit_logs";

/**
 * Fetches the currently active season metadata or initializes default.
 */
export async function getActiveSeason(): Promise<Season> {
  const activeSnap = await db.collection(SEASONS_COLLECTION)
    .where("status", "==", "active")
    .limit(1)
    .get();

  if (!activeSnap.empty) {
    return activeSnap.docs[0].data() as Season;
  }

  // Fallback: Default Season 1
  const defaultSeason: Season = {
    seasonId: "season_2026_01",
    title: "الموسم الأول: انطلاقة بايثون 2026 / 2027",
    status: "active",
    startDate: new Date("2026-09-01T00:00:00.000Z").toISOString(),
    endDate: new Date("2027-06-30T23:59:59.000Z").toISOString(),
    xpMultiplier: 1.0,
    totalParticipants: 0,
    totalXpAwarded: 0,
    totalCoinsAwarded: 0
  };

  await db.collection(SEASONS_COLLECTION).doc(defaultSeason.seasonId).set(defaultSeason, { merge: true });
  return defaultSeason;
}

/**
 * Generates a safe Dry-Run Preview of a season reset without mutating data.
 */
export async function getSeasonResetPreview(targetSeasonId: string) {
  const gamSnap = await db.collection(GAMIFICATION_COLLECTION).get();
  
  let eligibleStudents = 0;
  let totalCurrentXp = 0;
  let totalCurrentCoins = 0;
  const sampleProfiles: Array<{ uid: string; name: string; xp: number; level: number; coins: number }> = [];

  gamSnap.docs.forEach((doc) => {
    const data = doc.data();
    eligibleStudents++;
    const xp = Number(data.xp || 0);
    const coins = Number(data.coins || 0);
    const level = Number(data.level || 1);
    totalCurrentXp += xp;
    totalCurrentCoins += coins;

    if (sampleProfiles.length < 5) {
      sampleProfiles.push({
        uid: doc.id,
        name: data.studentName || "طالب مسجل",
        xp,
        level,
        coins
      });
    }
  });

  return {
    targetSeasonId,
    eligibleStudents,
    totalCurrentXp,
    totalCurrentCoins,
    sampleProfiles,
    guaranteedProtection: [
      "حسابات الطلاب (Firebase Auth Users) لن تُمَس إطلاقاً.",
      "سجلات الامتحانات والنتائج الأكاديمية محفوظة 100%.",
      "كافة واجبات وتكليفات الطلاب وملفات الحلول آمنة بالكامل.",
      "سجلات الحضور والغياب التاريخية مستمرة بلا تعديل.",
      "أكواد الطلاب البرمجية وتاريخ المحاولات محفوظ."
    ]
  };
}

/**
 * Executes an authoritative, idempotent Season Reset.
 * Archives current gamification stats to `season_archives` and resets live stats to Level 1, 0 XP, 0 Coins.
 */
export async function executeSeasonReset(options: {
  targetSeasonId: string;
  nextSeasonId: string;
  adminUid: string;
  adminEmail: string;
}) {
  const { targetSeasonId, nextSeasonId, adminUid, adminEmail } = options;
  const resetExecutionId = `reset_${targetSeasonId}_${Date.now()}`;
  const now = new Date().toISOString();

  // 1. Fetch current season
  const currentSeasonRef = db.collection(SEASONS_COLLECTION).doc(targetSeasonId);
  const currentSeasonSnap = await currentSeasonRef.get();
  if (currentSeasonSnap.exists && currentSeasonSnap.data()?.status === "archived") {
    throw new HttpsError("failed-precondition", "هذا الموسم تم أرشفته وإعادة تعيينه مسبقاً.");
  }

  // 2. Query all student gamification records
  const gamSnap = await db.collection(GAMIFICATION_COLLECTION).get();
  let archivedCount = 0;

  // Process in batches of 400 for Firestore limit compliance
  const batchSize = 400;
  const chunks: Array<FirebaseFirestore.QueryDocumentSnapshot[]> = [];
  let curChunk: FirebaseFirestore.QueryDocumentSnapshot[] = [];

  gamSnap.docs.forEach((doc) => {
    curChunk.push(doc);
    if (curChunk.length >= batchSize) {
      chunks.push(curChunk);
      curChunk = [];
    }
  });
  if (curChunk.length > 0) chunks.push(curChunk);

  for (const chunk of chunks) {
    const batch = db.batch();

    for (const doc of chunk) {
      const data = doc.data();
      const studentUid = doc.id;
      const archiveDocId = `${targetSeasonId}_${studentUid}`;
      const archiveRef = db.collection(SEASON_ARCHIVES_COLLECTION).doc(archiveDocId);

      const archiveRecord: SeasonArchive = {
        archiveId: archiveDocId,
        seasonId: targetSeasonId,
        studentUid,
        studentName: data.studentName || "طالب مسجل",
        group: data.group || "ALL",
        finalLevel: Number(data.level || 1),
        finalXp: Number(data.xp || 0),
        finalCoins: Number(data.coins || 0),
        finalRank: Number(data.rank || 0),
        unlockedBadges: Array.isArray(data.badges) ? data.badges : (data.achievements || []),
        tasksCompleted: Number(data.tasksCompleted || 0),
        challengesCompleted: Number(data.challengesCompleted || 0),
        archivedAt: now,
        resetExecutionId
      };

      batch.set(archiveRef, archiveRecord, { merge: true });

      // Reset live gamification profile for the fresh season
      batch.set(doc.ref, {
        ...data,
        activeSeasonId: nextSeasonId,
        level: 1,
        xp: 0,
        coins: 0,
        currentStreak: 1,
        challengesCompleted: 0,
        tasksCompleted: 0,
        rank: 0,
        previousRank: 0,
        rankChange: 0,
        updatedAt: now
      }, { merge: true });

      archivedCount++;
    }

    await batch.commit();
  }

  // 3. Update Season statuses
  await currentSeasonRef.set({
    status: "archived",
    archivedAt: now,
    resetExecutionId
  }, { merge: true });

  const nextSeasonRef = db.collection(SEASONS_COLLECTION).doc(nextSeasonId);
  await nextSeasonRef.set({
    seasonId: nextSeasonId,
    title: `الموسم الجديد: ${nextSeasonId}`,
    status: "active",
    startDate: now,
    endDate: new Date(Date.now() + 180 * 24 * 3600 * 1000).toISOString(),
    xpMultiplier: 1.0,
    totalParticipants: archivedCount,
    totalXpAwarded: 0,
    totalCoinsAwarded: 0
  }, { merge: true });

  // 4. Log Immutable Audit Record
  await db.collection(AUDIT_LOGS_COLLECTION).doc(resetExecutionId).set({
    logId: resetExecutionId,
    adminUid,
    adminEmail,
    action: "season_reset",
    details: {
      fromSeasonId: targetSeasonId,
      toSeasonId: nextSeasonId,
      studentsReset: archivedCount
    },
    timestamp: now
  });

  return {
    success: true,
    resetExecutionId,
    studentsReset: archivedCount,
    fromSeasonId: targetSeasonId,
    toSeasonId: nextSeasonId,
    timestamp: now
  };
}

// scripts/reset-students-gamification.mjs
import { db } from "../backend/lib/config/firebase.js";

async function resetAllStudentsGamification() {
  console.log("=================================================");
  console.log("🔄 STARTING AUTHORITATIVE GAMIFICATION RESET 🔄");
  console.log("=================================================");

  const seasonId = "season_2026_pre_reset";
  const now = new Date().toISOString();
  const today = now.split("T")[0];

  // 1. Process python_adventure_progress
  const pySnap = await db.collection("python_adventure_progress").get();
  console.log(`\nFound ${pySnap.size} documents in 'python_adventure_progress'.`);

  let batch = db.batch();
  let opCount = 0;
  let pyResetCount = 0;

  for (const doc of pySnap.docs) {
    const data = doc.data();
    const uid = doc.id;

    // Archive old progress first
    const archiveRef = db.collection("season_archives").doc(`${seasonId}_py_${uid}`);
    batch.set(archiveRef, {
      studentUid: uid,
      seasonId,
      originalCollection: "python_adventure_progress",
      archivedData: data,
      archivedAt: now
    });
    opCount++;

    // Reset to World 1, Level 1, 0 XP, Level 1
    const resetPyData = {
      studentUid: uid,
      currentWorldId: "world-1",
      currentLevelId: "world-1-level-1",
      xp: 0,
      level: 1,
      stars: {},
      completedChallenges: {},
      unlockedWorlds: ["world-1"],
      unlockedChallenges: ["world-1-level-1"],
      achievements: [],
      inventory: ["starter_compass"],
      streak: { count: 1, lastActiveDate: today },
      stats: { totalCompleted: 0, totalRuns: 0, dailyCompletedDate: null },
      updatedAt: now
    };

    batch.set(doc.ref, resetPyData);
    opCount++;
    pyResetCount++;

    if (opCount >= 400) {
      await batch.commit();
      batch = db.batch();
      opCount = 0;
      console.log(`Committed batch of python_adventure_progress resets...`);
    }
  }

  if (opCount > 0) {
    await batch.commit();
    batch = db.batch();
    opCount = 0;
  }
  console.log(`✅ Successfully reset ${pyResetCount} python_adventure_progress docs to World 1, Level 1, 0 XP.`);

  // 2. Process student_gamification
  const gamSnap = await db.collection("student_gamification").get();
  console.log(`\nFound ${gamSnap.size} documents in 'student_gamification'.`);

  let gamResetCount = 0;

  for (const doc of gamSnap.docs) {
    const data = doc.data();
    const uid = doc.id;

    // Archive old gamification
    const archiveRef = db.collection("season_archives").doc(`${seasonId}_gam_${uid}`);
    batch.set(archiveRef, {
      studentUid: uid,
      seasonId,
      originalCollection: "student_gamification",
      archivedData: data,
      archivedAt: now
    });
    opCount++;

    // Reset points, xp, coins to 0, level to 1
    const resetGamData = {
      studentUid: uid,
      studentName: data.studentName || "طالب",
      group: data.group || "ALL",
      xp: 0,
      points: 0,
      competitionPoints: 0,
      coins: 0,
      level: 1,
      challengesCompleted: 0,
      tasksCompleted: 0,
      currentStreak: 1,
      badges: ["first_step"],
      equippedItems: {},
      updatedAt: now
    };

    batch.set(doc.ref, resetGamData);
    opCount++;
    gamResetCount++;

    if (opCount >= 400) {
      await batch.commit();
      batch = db.batch();
      opCount = 0;
      console.log(`Committed batch of student_gamification resets...`);
    }
  }

  if (opCount > 0) {
    await batch.commit();
  }
  console.log(`✅ Successfully reset ${gamResetCount} student_gamification docs to Level 1, 0 XP, 0 Coins.`);

  // 3. Reset audit log
  await db.collection("audit_logs").add({
    action: "ADMIN_FULL_GAMIFICATION_RESET",
    performedBy: "admin_request",
    details: `Reset ${pyResetCount} adventure progress docs and ${gamResetCount} gamification docs to stage 1 and 0 points.`,
    timestamp: now
  });

  console.log("\n=================================================");
  console.log("🎉 ALL STUDENTS SUCCESSFULLY RESET TO STAGE 1 & 0 POINTS!");
  console.log("=================================================");
}

resetAllStudentsGamification()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Reset error:", err);
    process.exit(1);
  });

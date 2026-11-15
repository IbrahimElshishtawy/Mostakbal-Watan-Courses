// scripts/reset-all-students-complete.mjs
import { db } from "../backend/lib/config/firebase.js";

async function resetAllStudentsComplete() {
  console.log("==================================================================");
  console.log("🌟 STARTING COMPREHENSIVE SEASON RESET FOR ALL 440+ STUDENTS 🌟");
  console.log("==================================================================");

  const seasonId = "season_2026_v2";
  const now = new Date().toISOString();
  const today = now.split("T")[0];

  // 1. Fetch ALL students from `students` collection
  const studentsSnap = await db.collection("students").get();
  console.log(`Found ${studentsSnap.size} students in 'students' collection.`);

  let batch = db.batch();
  let opCount = 0;
  let studentsProcessed = 0;

  for (const doc of studentsSnap.docs) {
    const studentData = doc.data();
    const docId = doc.id; // e.g. "01223070571"
    const authUid = studentData.authUid || studentData.uid;

    const uidsToReset = new Set([docId]);
    if (authUid) {
      uidsToReset.add(authUid);
    }

    for (const uid of uidsToReset) {
      // A. Reset python_adventure_progress
      const pyRef = db.collection("python_adventure_progress").doc(uid);
      const cleanPyData = {
        seasonId,
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
      batch.set(pyRef, cleanPyData);
      opCount++;

      // B. Reset student_gamification
      const gamRef = db.collection("student_gamification").doc(uid);
      const cleanGamData = {
        seasonId,
        studentUid: uid,
        xp: 0,
        points: 0,
        competitionPoints: 0,
        coins: 0,
        level: 1,
        challengesCompleted: 0,
        tasksCompleted: 0,
        currentStreak: 1,
        badges: ["first_step"],
        equippedAvatar: null,
        equippedFrame: null,
        equippedTitle: null,
        equippedNameEffect: null,
        purchasedRewards: [],
        updatedAt: now
      };
      batch.set(gamRef, cleanGamData);
      opCount++;

      if (opCount >= 400) {
        await batch.commit();
        console.log(`Committed batch at ${opCount} operations...`);
        batch = db.batch();
        opCount = 0;
      }
    }

    studentsProcessed++;
  }

  // Also catch any orphan records in python_adventure_progress not tied to docId
  const existingPySnap = await db.collection("python_adventure_progress").get();
  for (const pyDoc of existingPySnap.docs) {
    const uid = pyDoc.id;
    const pyRef = db.collection("python_adventure_progress").doc(uid);
    batch.set(pyRef, {
      seasonId,
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
    }, { merge: true });
    opCount++;

    if (opCount >= 400) {
      await batch.commit();
      batch = db.batch();
      opCount = 0;
    }
  }

  if (opCount > 0) {
    await batch.commit();
  }

  console.log(`\n✅ SUCCESSFULLY RESET ${studentsProcessed} STUDENTS!`);
  console.log(`- All students now start at World 1, Level 1 (World-1-Level-1).`);
  console.log(`- Completed challenges: 0.`);
  console.log(`- XP: 0, Level: 1, Coins: 0.`);
  console.log(`- Season ID: ${seasonId}.`);
}

resetAllStudentsComplete()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Reset failed:", err);
    process.exit(1);
  });

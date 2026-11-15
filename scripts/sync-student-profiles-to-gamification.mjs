// scripts/sync-student-profiles-to-gamification.mjs
import { db } from "../backend/lib/config/firebase.js";

async function syncStudentProfiles() {
  console.log("==================================================================");
  console.log("👥 SYNCING REAL STUDENT NAMES & GROUPS TO GAMIFICATION PROFILES 👥");
  console.log("==================================================================");

  const studentsSnap = await db.collection("students").get();
  console.log(`Found ${studentsSnap.size} students in 'students' collection.`);

  let batch = db.batch();
  let opCount = 0;
  let syncedCount = 0;

  for (const doc of studentsSnap.docs) {
    const data = doc.data();
    const docId = doc.id;
    const authUid = data.authUid || data.uid;

    const studentName = (data.name || data.studentName || "").trim();
    const studentPhone = (data.phone || data.studentPhone || docId).trim();
    const group = (data.group || data.studentGroup || "المجموعة التدريبية المعتمدة").trim();

    if (!studentName) continue;

    const uidsToSync = new Set([docId]);
    if (authUid) uidsToSync.add(authUid);

    for (const uid of uidsToSync) {
      const gamRef = db.collection("student_gamification").doc(uid);
      batch.set(gamRef, {
        studentUid: uid,
        name: studentName,
        studentName: studentName,
        phone: studentPhone,
        studentPhone: studentPhone,
        group: group,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      opCount++;

      const pyRef = db.collection("python_adventure_progress").doc(uid);
      batch.set(pyRef, {
        studentUid: uid,
        name: studentName,
        studentName: studentName,
        phone: studentPhone,
        group: group,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      opCount++;

      if (opCount >= 400) {
        await batch.commit();
        console.log(`Committed batch at ${opCount} operations...`);
        batch = db.batch();
        opCount = 0;
      }
    }

    syncedCount++;
  }

  if (opCount > 0) {
    await batch.commit();
  }

  console.log(`\n✅ SUCCESSFULLY SYNCED ${syncedCount} STUDENTS' REAL NAMES & GROUPS!`);
}

syncStudentProfiles()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Sync failed:", err);
    process.exit(1);
  });

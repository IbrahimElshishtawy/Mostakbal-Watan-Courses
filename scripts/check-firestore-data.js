// scripts/check-firestore-data.js
import { db } from "../backend/lib/config/firebase.js";

async function inspect() {
  console.log("=== CHECKING FIRESTORE DATA ===");

  try {
    const studentsSnap = await db.collection("students").limit(10).get();
    console.log(`Found ${studentsSnap.size} students in 'students' collection.`);
    studentsSnap.docs.forEach(d => {
      const data = d.data();
      console.log(`- Student [${d.id}]: name="${data.name || data.studentName}", phone="${data.phone || data.studentPhone}", group="${data.group || data.studentGroup}"`);
    });

    const pySnap = await db.collection("python_adventure_progress").get();
    console.log(`\nFound ${pySnap.size} docs in 'python_adventure_progress':`);
    pySnap.docs.forEach(d => {
      const data = d.data();
      const completedCount = Object.keys(data.completedChallenges || {}).length;
      console.log(`- Progress [${d.id}]: xp=${data.xp}, level=${data.level}, totalCompleted=${completedCount}, keys=${Object.keys(data.completedChallenges || {}).join(", ")}`);
    });

    const gamSnap = await db.collection("student_gamification").get();
    console.log(`\nFound ${gamSnap.size} docs in 'student_gamification':`);
    gamSnap.docs.forEach(d => {
      const data = d.data();
      console.log(`- Gamification [${d.id}]: points=${data.competitionPoints}, challenges=${data.challengesCompleted}, streak=${data.currentStreak}`);
    });

  } catch (err) {
    console.error("Inspect error:", err);
  }
}

inspect().then(() => process.exit(0));

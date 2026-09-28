/**
 * scripts/backup-firestore.js
 * 
 * Exports all 16 Firestore collections and subcollections into local JSON files in scripts/backup/
 * Run with: node scripts/backup-firestore.js
 */

const fs = require("fs");
const path = require("path");

let admin;
try {
  admin = require("firebase-admin");
} catch (_) {
  admin = require(path.join(__dirname, "..", "backend", "node_modules", "firebase-admin"));
}

// Check for explicit serviceAccountKey.json or default app
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
if (!admin.apps.length) {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    admin.initializeApp();
  }
}

const db = admin.firestore();

const COLLECTIONS = [
  { name: "users", subcollections: [] },
  { name: "students", subcollections: [] },
  { name: "videos", subcollections: [] },
  { name: "video_logs", subcollections: [] },
  { name: "video_progress", subcollections: [] },
  { name: "exams", subcollections: ["attempts"] },
  { name: "results", subcollections: [] },
  { name: "assignments", subcollections: ["submissions"] },
  { name: "submissions", subcollections: [] },
  { name: "attendance_sessions", subcollections: ["records"] },
  { name: "python_adventure_progress", subcollections: [] },
  { name: "points_ledger", subcollections: [] },
  { name: "competitions", subcollections: ["participants"] },
  { name: "student_gamification", subcollections: [] },
  { name: "notifications", subcollections: [] },
  { name: "coding_problems", subcollections: [] },
  { name: "coding_submissions", subcollections: [] }
];

async function run() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(__dirname, "backup", timestamp);
  fs.mkdirSync(backupDir, { recursive: true });

  console.log(`📁 Exporting Firestore data to: ${backupDir}`);

  for (const item of COLLECTIONS) {
    const colName = item.name;
    console.log(`\nExporting collection: ${colName}...`);
    try {
      const snap = await db.collection(colName).get();
      const docs = [];

      for (const d of snap.docs) {
        const docData = { id: d.id, ...d.data() };

        // Fetch subcollections if any
        if (item.subcollections && item.subcollections.length > 0) {
          docData._subcollections = {};
          for (const subName of item.subcollections) {
            const subSnap = await db.collection(colName).doc(d.id).collection(subName).get();
            docData._subcollections[subName] = subSnap.docs.map(subDoc => ({
              id: subDoc.id,
              ...subDoc.data()
            }));
          }
        }

        docs.push(docData);
      }

      const filePath = path.join(backupDir, `${colName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(docs, null, 2), "utf8");
      console.log(`✅ Saved ${docs.length} documents to ${colName}.json`);
    } catch (err) {
      console.warn(`⚠️ Warning: Could not export ${colName}:`, err.message);
    }
  }

  console.log(`\n🎉 Backup finished successfully! Exported to:\n${backupDir}`);
}

run().catch(err => {
  console.error("❌ Backup failed:", err);
  process.exit(1);
});

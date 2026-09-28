/**
 * scripts/restore-firestore.js
 * 
 * Restores collections and subcollections from a local JSON backup into Firestore.
 * 
 * Usage:
 * node scripts/restore-firestore.js [optional_path_to_backup_folder]
 * If no path is provided, it uses the most recent backup inside scripts/backup/
 */

const fs = require("fs");
const path = require("path");

let admin;
try {
  admin = require("firebase-admin");
} catch (_) {
  admin = require(path.join(__dirname, "..", "backend", "node_modules", "firebase-admin"));
}

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

async function run() {
  const backupBaseDir = path.join(__dirname, "backup");
  let targetDir = process.argv[2];

  if (!targetDir) {
    if (!fs.existsSync(backupBaseDir)) {
      console.error("❌ لم يتم العثور على مجلد النسخ الاحتياطية (scripts/backup). يرجى تشغيل backup-firestore.js أولاً.");
      process.exit(1);
    }
    const backups = fs.readdirSync(backupBaseDir)
      .map(name => ({ name, fullPath: path.join(backupBaseDir, name) }))
      .filter(item => fs.statSync(item.fullPath).isDirectory())
      .sort((a, b) => b.name.localeCompare(a.name));

    if (backups.length === 0) {
      console.error("❌ لا توجد أي نسخ احتياطية داخل scripts/backup.");
      process.exit(1);
    }

    targetDir = backups[0].fullPath;
  }

  console.log(`📥 جاري استيراد البيانات من المجلد: ${targetDir}`);

  const files = fs.readdirSync(targetDir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const colName = path.basename(file, ".json");
    const filePath = path.join(targetDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!Array.isArray(content)) continue;

    console.log(`\nاستيراد مجموعة [${colName}] (${content.length} مستند)...`);

    for (const docItem of content) {
      const { id, _subcollections, ...data } = docItem;
      const docRef = id ? db.collection(colName).doc(id) : db.collection(colName).doc();

      await docRef.set(data, { merge: true });

      // Restore subcollections if present
      if (_subcollections && typeof _subcollections === "object") {
        for (const [subName, subDocs] of Object.entries(_subcollections)) {
          if (Array.isArray(subDocs)) {
            for (const subItem of subDocs) {
              const { id: subId, ...subData } = subItem;
              const subDocRef = subId ? docRef.collection(subName).doc(subId) : docRef.collection(subName).doc();
              await subDocRef.set(subData, { merge: true });
            }
          }
        }
      }
    }

    console.log(`✅ تم استيراد [${colName}] بنجاح`);
  }

  console.log("\n🎉 اكتملت عملية الاستعادة بنجاح إلى قاعدة بيانات فايرستور!");
}

run().catch(err => {
  console.error("❌ فشلت عملية الاستعادة:", err);
  process.exit(1);
});

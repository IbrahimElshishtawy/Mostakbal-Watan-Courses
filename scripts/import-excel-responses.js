/**
 * scripts/import-excel-responses.js
 *
 * Imports students from `(الردود).xlsx` (via data/excel_responses_students.json)
 * into Firebase:
 * 1. Firebase Auth user with email: <phone>@student.local
 * 2. Password: Last 6 digits of National ID
 * 3. Custom Claims: role: "student", group, phone
 * 4. Firestore "students" collection (keyed by uid and phone)
 * 5. Firestore "users" collection (keyed by uid)
 */

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const fs = require("fs");
const path = require("path");
const admin = require("../backend/node_modules/firebase-admin");
const { getAuth } = require("../backend/node_modules/firebase-admin/lib/auth");
const { getFirestore, FieldValue } = require("../backend/node_modules/firebase-admin/lib/firestore");

const serviceAccountPath = path.resolve(__dirname, "../mostakbal-watan-courses-firebase-adminsdk-fbsvc-1d9a16560b.json");
if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Service account file not found:", serviceAccountPath);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
const app = admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

const auth = getAuth(app);
const db = getFirestore(app);

const studentsDataPath = path.resolve(__dirname, "../data/excel_responses_students.json");
if (!fs.existsSync(studentsDataPath)) {
  console.error("❌ Data file not found:", studentsDataPath);
  process.exit(1);
}

const students = JSON.parse(fs.readFileSync(studentsDataPath, "utf-8"));

async function processStudent(student, index, total) {
  let phone = String(student.phone || "").trim().replace(/[\s\-_]/g, "");
  const email = `${phone}@student.local`;
  const nid = String(student.national_id || "").trim();
  const password = String(student.password || (nid.length >= 6 ? nid.slice(-6) : "123456")).trim();
  const group = student.group || (student.level === "خريج جامعي" ? "خريجون" : "المجموعة التدريبية المعتمدة");
  const aliasPhone = student.aliasPhone || null;

  let userRecord = null;
  let isNew = false;

  try {
    userRecord = await auth.getUserByEmail(email);
  } catch (err) {
    if (err.code !== "auth/user-not-found") throw err;
  }

  let uid = "";
  if (userRecord) {
    await auth.updateUser(userRecord.uid, {
      password: password,
      displayName: student.name
    });
    uid = userRecord.uid;
  } else {
    const newUser = await auth.createUser({
      email: email,
      password: password,
      displayName: student.name
    });
    uid = newUser.uid;
    isNew = true;
  }

  // Set Custom Claims
  await auth.setCustomUserClaims(uid, {
    role: "student",
    group: group,
    phone: phone
  });

  // If aliasPhone exists, also configure alias account
  if (aliasPhone) {
    try {
      const aliasEmail = `${aliasPhone}@student.local`;
      let aliasUser = null;
      try {
        aliasUser = await auth.getUserByEmail(aliasEmail);
      } catch (e) {
        if (e.code !== "auth/user-not-found") throw e;
      }
      if (aliasUser) {
        await auth.updateUser(aliasUser.uid, { password: password, displayName: student.name });
      } else {
        await auth.createUser({ email: aliasEmail, password: password, displayName: student.name });
      }
    } catch (aliasErr) {
      console.warn(`[Warning] Could not set alias user for ${aliasPhone}:`, aliasErr.message);
    }
  }

  const now = new Date();
  const studentPayload = {
    registrationId: student.id,
    name: student.name,
    studentName: student.name,
    phone: phone,
    studentPhone: phone,
    nationalId: nid,
    whatsapp: phone,
    governorate: "الغربية",
    address: student.residence || "",
    status: student.level === "خريج جامعي" ? "خريج" : "طالب",
    academicYear: student.level || "طالب جامعي (كلية / معهد)",
    collegeUniversity: "",
    readiness: "مستعد",
    pass: password,
    password: password,
    active: true,
    authUid: uid,
    role: "student",
    group: group,
    registeredAt: student.timestamp || now.toISOString(),
    sourceFile: "(الردود).xlsx",
    updatedAt: FieldValue.serverTimestamp()
  };

  // Firestore batch write
  const batch = db.batch();
  batch.set(db.collection("students").doc(uid), studentPayload, { merge: true });
  if (uid !== phone) {
    batch.set(db.collection("students").doc(phone), studentPayload, { merge: true });
  }
  if (aliasPhone && aliasPhone !== phone && uid !== aliasPhone) {
    batch.set(db.collection("students").doc(aliasPhone), studentPayload, { merge: true });
  }
  batch.set(db.collection("users").doc(uid), {
    name: student.name,
    phone: phone,
    email: email,
    role: "student",
    group: group,
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });

  await batch.commit();

  return {
    id: student.id,
    name: student.name,
    phone: phone,
    email: email,
    password: password,
    uid: uid,
    status: isNew ? "created" : "updated"
  };
}

async function runWorkerPool(items, concurrency, taskFn) {
  const results = [];
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      const item = items[idx];
      try {
        const res = await taskFn(item, idx + 1, items.length);
        results.push(res);
        console.log(`[${results.length}/${items.length}] ✅ [${res.status}] ${item.name} | Phone: ${item.phone} | Pass: ${res.password}`);
      } catch (err) {
        console.error(`[Error] ❌ Failed to process ${item.name} (${item.phone}):`, err.message);
        results.push({ name: item.name, phone: item.phone, error: err.message });
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  console.log(`🚀 Starting student import from (الردود).xlsx... Total: ${students.length}`);
  console.log("⏱️ Concurrency: 5 workers\n");

  const startTime = Date.now();
  const results = await runWorkerPool(students, 5, processStudent);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  const successful = results.filter((r) => !r.error);
  const created = results.filter((r) => r.status === "created");
  const updated = results.filter((r) => r.status === "updated");
  const failed = results.filter((r) => r.error);

  console.log("\n=================================");
  console.log("🎉 IMPORT SUMMARY FOR (الردود).xlsx");
  console.log("=================================");
  console.log(`⏱️ Time elapsed: ${elapsed}s`);
  console.log(`📊 Total Processed: ${results.length}`);
  console.log(`✨ Newly Created Accounts: ${created.length}`);
  console.log(`🔄 Updated Existing Accounts: ${updated.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log("\nFailed records:");
    failed.forEach((f) => console.log(`- ${f.name} (${f.phone}): ${f.error}`));
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Fatal Error:", err);
    process.exit(1);
  });

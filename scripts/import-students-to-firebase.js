/**
 * scripts/import-students-to-firebase.js
 *
 * Fast concurrent import of students into Firebase:
 * 1. Creates/Updates Firebase Auth user with email: <phone>@student.local
 * 2. Password: Last 6 digits of National ID (nid.slice(-6))
 * 3. Sets custom claims: role: "student"
 * 4. Saves student profiles to Firestore "students" and "users" collections
 */

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const fs = require("fs");
const path = require("path");
const admin = require("../backend/node_modules/firebase-admin");
const { getAuth } = require("../backend/node_modules/firebase-admin/lib/auth");
const { getFirestore } = require("../backend/node_modules/firebase-admin/lib/firestore");

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

const studentsDataPath = path.resolve(__dirname, "../students_registration.json");
const students = JSON.parse(fs.readFileSync(studentsDataPath, "utf-8"));

async function processStudent(student, index, total) {
  let phone = String(student.phone || "").trim().replace(/[\s\-_]/g, "");
  
  // Normalize Egyptian phone prefixes (+20, 0020, 201...) to 01...
  if (phone.startsWith("+20")) {
    phone = "0" + phone.slice(3);
  } else if (phone.startsWith("0020")) {
    phone = "0" + phone.slice(4);
  } else if (phone.startsWith("201") && phone.length === 12) {
    phone = "0" + phone.slice(2);
  }

  // Handle typo phone vs whatsapp (e.g. 011143583884 vs 01114358384)
  let aliasPhone = null;
  if (phone === "011143583884" && student.whatsapp === "01114358384") {
    aliasPhone = "011143583884";
    phone = "01114358384";
  }

  const email = `${phone}@student.local`;
  const nid = String(student.national_id || "").trim();
  const password = nid.length >= 6 ? nid.slice(-6) : (phone.length >= 6 ? phone.slice(-6) : "123456");
  const group = student.academic_year || (student.status === "خريج" ? "خريجون" : "المجموعة التدريبية");

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

  // If aliasPhone exists, also ensure alias account exists for fallback
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
      console.warn(`[Warning] Could not create alias user for ${aliasPhone}:`, aliasErr.message);
    }
  }

  const now = new Date();
  const studentPayload = {
    registrationId: student.id,
    originalRowId: student.id,
    submissionRowIds: student.submission_row_ids || [],
    name: student.name,
    studentName: student.name,
    phone: phone,
    studentPhone: phone,
    nationalId: nid,
    whatsapp: student.whatsapp || phone,
    governorate: student.governorate || "",
    address: student.address || "",
    status: student.status || "طالب",
    academicYear: student.academic_year || "",
    collegeUniversity: student.college_university || "",
    readiness: student.readiness || "",
    expectations: student.expectations || "",
    pass: password,
    password: password,
    active: true,
    authUid: uid,
    role: "student",
    group: group,
    registeredAt: student.registered_at || now.toISOString(),
    updatedAt: now
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
    updatedAt: now
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
        const res = await taskFn(item, idx, items.length);
        results.push({ success: true, ...res });
        console.log(`[${results.length}/${items.length}] ✅ ${item.name} (${item.phone}@student.local) -> Pass: ${res.password}`);
      } catch (err) {
        console.error(`[${results.length + 1}/${items.length}] ❌ Failed ${item.name} (${item.phone}):`, err.message);
        results.push({ success: false, id: item.id, name: item.name, phone: item.phone, error: err.message });
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  console.log(`🚀 Starting parallel import of ${students.length} students into Firebase (Concurrency: 8)...`);
  const startTime = Date.now();

  const results = await runWorkerPool(students, 8, processStudent);

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const successCount = results.filter(r => r.success).length;
  const createdCount = results.filter(r => r.success && r.status === "created").length;
  const updatedCount = results.filter(r => r.success && r.status === "updated").length;
  const failedCount = results.filter(r => !r.success).length;

  const report = {
    total: students.length,
    success: successCount,
    created: createdCount,
    updated: updatedCount,
    failed: failedCount,
    durationSeconds: parseFloat(durationSec),
    details: results
  };

  const reportPath = path.resolve(__dirname, "../data/import_result.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");

  console.log("\n==========================================");
  console.log(`🎉 Import completed in ${durationSec}s!`);
  console.log(`- Total Students: ${students.length}`);
  console.log(`- Successful: ${successCount} (Created: ${createdCount}, Updated: ${updatedCount})`);
  console.log(`- Failed: ${failedCount}`);
  console.log(`- Full report saved to: ${reportPath}`);
  console.log("==========================================");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });

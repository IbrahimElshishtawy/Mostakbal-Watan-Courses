/**
 * scripts/update-attendance-sessions.js
 *
 * Deletes obsolete attendance sessions, populates the 24 newly scheduled sessions
 * with the updated timing (12:30 PM - 2:00 PM), and posts notification reminders for students.
 */

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const path = require("path");
const admin = require("../backend/node_modules/firebase-admin");
const { getFirestore, FieldValue } = require("../backend/node_modules/firebase-admin/lib/firestore");

const serviceAccount = require("../mostakbal-watan-courses-firebase-adminsdk-fbsvc-1d9a16560b.json");
const app = admin.initializeApp({
  credential: admin.cert(serviceAccount)
});
const db = getFirestore(app);

const SESSIONS_DATA = [
  { num: 1, day: "الأحد", date: "2026-11-08", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 2, day: "الإثنين", date: "2026-11-09", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 3, day: "الأحد", date: "2026-11-22", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 4, day: "الإثنين", date: "2026-11-23", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 5, day: "الأربعاء", date: "2026-11-25", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 6, day: "الخميس", date: "2026-11-26", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 7, day: "الأحد", date: "2026-11-29", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 8, day: "الإثنين", date: "2026-11-30", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 9, day: "الأحد", date: "2026-12-06", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 10, day: "الإثنين", date: "2026-12-07", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 11, day: "الأحد", date: "2026-12-13", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 12, day: "الإثنين", date: "2026-12-14", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 13, day: "الأربعاء", date: "2026-12-16", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 14, day: "الخميس", date: "2026-12-17", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 15, day: "الأحد", date: "2026-12-20", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 16, day: "الإثنين", date: "2026-12-21", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 17, day: "الأحد", date: "2027-01-03", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 18, day: "الإثنين", date: "2027-01-04", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 19, day: "الأحد", date: "2027-01-10", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 20, day: "الإثنين", date: "2027-01-11", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 21, day: "الأربعاء", date: "2027-01-13", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 22, day: "الخميس", date: "2027-01-14", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 23, day: "الأحد", date: "2027-01-17", time: "12:30 ظهراً - 2:00 ظهراً" },
  { num: 24, day: "الإثنين", date: "2027-01-18", time: "12:30 ظهراً - 2:00 ظهراً" }
];

async function main() {
  console.log("🚀 Starting Attendance Sessions Reset and Update...");

  // 1. Delete Old Sessions
  const oldSessionsSnap = await db.collection("attendance_sessions").get();
  console.log(`Found ${oldSessionsSnap.size} existing attendance sessions to remove.`);

  for (const doc of oldSessionsSnap.docs) {
    console.log(`- Deleting old session: ${doc.id} [${doc.data().name || doc.data().title || "Untitled"}]`);
    // Delete subcollection records if any
    const recordsSnap = await doc.ref.collection("records").get();
    if (!recordsSnap.empty) {
      const batch = db.batch();
      recordsSnap.docs.forEach((r) => batch.delete(r.ref));
      await batch.commit();
      console.log(`  Deleted ${recordsSnap.size} records in subcollection for ${doc.id}`);
    }
    await doc.ref.delete();
  }
  console.log("✅ All old sessions and their records removed successfully.");

  // 2. Add 24 New Sessions
  console.log(`\n📅 Adding ${SESSIONS_DATA.length} new sessions with timing: 12:30 ظهراً - 2:00 ظهراً...`);

  for (const item of SESSIONS_DATA) {
    const docId = `session_${String(item.num).padStart(2, "0")}`;
    const sessionName = `المحاضرة ${item.num} - ${item.day} (12:30 ظهراً - 2:00 ظهراً)`;

    const sessionPayload = {
      sessionNumber: item.num,
      name: sessionName,
      title: sessionName,
      day: item.day,
      date: item.date,
      time: item.time,
      timeSlot: "12:30 PM - 02:00 PM",
      group: "ALL",
      totalCount: 0,
      presentCount: 0,
      absentCount: 0,
      records: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    await db.collection("attendance_sessions").doc(docId).set(sessionPayload);
    console.log(`  + Created: ${docId} | ${item.date} (${item.day}) | ${sessionName}`);
  }
  console.log("✅ All 24 new sessions added successfully.");

  // 3. Create Notifications
  console.log("\n🔔 Creating notification announcements for students...");

  // Notification 1: Comprehensive Schedule Update & Time Change Announcement
  const scheduleNotifRef = db.collection("notifications").doc();
  await scheduleNotifRef.set({
    id: scheduleNotifRef.id,
    recipientUid: "ALL",
    title: "📢 تحديث هام: اعتماد جدول المحاضرات الجديد (12:30 ظهراً - 2:00 ظهراً)",
    body: "أعزاءنا الطلاب، يرجى العلم بأنه تم اعتماد ورفع جدول ومواعيد محاضرات كورس البرمجة بالكامل (24 محاضرة). تم تعديل التوقيت الرسمي للمحاضرات ليكون من الساعة 12:30 ظهراً وحتى 2:00 ظهراً. يرجى مراجعة سجل الحضور للاطلاع على التواريخ كاملة والالتزام بالحضور.",
    type: "lecture_reminder",
    deepLink: "attendance",
    metadata: {
      type: "schedule_update",
      timing: "12:30 ظهراً - 2:00 ظهراً",
      totalSessions: 24,
      startDate: "2026-11-08",
      endDate: "2027-01-18"
    },
    read: false,
    createdAt: FieldValue.serverTimestamp()
  });
  console.log(`  + Created announcement notification [${scheduleNotifRef.id}]`);

  // Notification 2: Today's Lecture Reminder (Session 2 - Monday 2026-11-09)
  const todayNotifRef = db.collection("notifications").doc();
  await todayNotifRef.set({
    id: todayNotifRef.id,
    recipientUid: "ALL",
    title: "⏰ تذكير: موعد محاضرة اليوم (الإثنين 9 نوفمبر - 12:30 ظهراً)",
    body: "نذكركم بانعقاد المحاضرة رقم 2 اليوم الإثنين في تمام الساعة 12:30 ظهراً وحتى 2:00 ظهراً. نرجو من جميع الطلاب التواجد في الموعد المحدد لتسجيل الحضور والغياب.",
    type: "lecture_reminder",
    deepLink: "attendance",
    metadata: {
      type: "session_reminder",
      sessionNumber: 2,
      date: "2026-11-09",
      time: "12:30 ظهراً - 2:00 ظهراً"
    },
    read: false,
    createdAt: FieldValue.serverTimestamp()
  });
  console.log(`  + Created today's session reminder notification [${todayNotifRef.id}]`);

  console.log("\n🎉 ALL OPERATIONS COMPLETED SUCCESSFULLY!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Fatal Error:", err);
    process.exit(1);
  });

// src/features/notifications/notifications.service.js
import { db } from "../../core/firebase.js";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { COLLECTIONS, NOTIFICATION_TYPES } from "../../core/constants.js";
import { normalizeError } from "../../core/errors.js";

export { NOTIFICATION_TYPES };

export const NotificationsService = {
  /**
   * Fetches notifications for a specific recipient user.
   * Supports backward-compatible query fallbacks if compound indexes are missing.
   * Also dynamically checks and injects live academic alerts (such as attendance warnings).
   * @param {string} userId
   * @param {number} [maxLimit=30]
   * @param {object|null} [studentContext=null]
   * @returns {Promise<Array>}
   */
  async getUserNotifications(userId, maxLimit = 30, studentContext = null) {
    if (!userId) return [];

    let list = [];

    try {
      const notifRef = collection(db, COLLECTIONS.NOTIFICATIONS);

      // Attempt ordered query
      let docs = [];
      try {
        const q = query(
          notifRef,
          where("recipientUid", "in", [userId, "all", "ALL"]),
          orderBy("createdAt", "desc"),
          limit(maxLimit)
        );
        const snap = await getDocs(q);
        docs = snap.docs;
      } catch (orderErr) {
        // Fallback without compound index
        const qFallback = query(
          notifRef,
          where("recipientUid", "in", [userId, "all", "ALL"]),
          limit(maxLimit * 2)
        );
        const snap = await getDocs(qFallback);
        docs = snap.docs;
      }

      list = docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          recipientUid: data.recipientUid || userId,
          title: data.title || "إشعار جديد",
          body: data.body || "",
          type: data.type || NOTIFICATION_TYPES.ANNOUNCEMENT,
          deepLink: data.deepLink || null,
          metadata: data.metadata || {},
          read: Boolean(data.read),
          readAt: data.readAt || null,
          createdAt: data.createdAt || null
        };
      });
    } catch (err) {
      console.warn("Error fetching user notifications from Firestore:", err?.message || err);
    }

    // Dynamic Academic & Attendance Alert Integration
    if (studentContext) {
      try {
        const { AttendanceService } = await import("../attendance/attendance.service.js");
        const attData = await AttendanceService.getStudentAttendance(studentContext).catch(() => null);

        if (attData && typeof attData.attendanceRate === "number" && attData.totalSessions > 0) {
          const rate = Math.round(attData.attendanceRate);
          if (rate < 75) {
            const notifId = `att_warning_${studentContext.id || studentContext.phone || userId}`;
            const isRead = localStorage.getItem(`mw_notif_read_${notifId}`) === "true";

            list.unshift({
              id: notifId,
              recipientUid: userId,
              title: "تنبيه نسبة الحضور التراكمي",
              body: `نسبة حضورك التراكمية الحالية هي ${rate}% (${rate < 50 ? 'نسبة منخفضة جداً' : 'أقل من الحد الأدنى 75%'}). تنبيه أكاديمي: يرجى متابعة تسجيل الحضور مع المهندس إبراهيم الششتواي لتفادي استبعادك من الاختبارات النهائية والمشروع الختامي.`,
              type: NOTIFICATION_TYPES.ATTENDANCE_WARNING,
              deepLink: "attendance",
              metadata: {
                attendanceRate: rate,
                totalSessions: attData.totalSessions,
                presentCount: attData.presentCount,
                absentCount: attData.absentCount
              },
              read: isRead,
              readAt: isRead ? new Date() : null,
              createdAt: { toMillis: () => Date.now() }
            });
          }
        }
      } catch (attErr) {
        console.warn("Notifications attendance check non-blocking warning:", attErr);
      }
    }

    // Sort in memory (newest first)
    list.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      return timeB - timeA;
    });

    return list.slice(0, maxLimit);
  },

  /**
   * Marks a notification as read.
   * @param {string} notificationId
   */
  async markAsRead(notificationId) {
    if (!notificationId) return;

    if (notificationId.startsWith("att_warning_") || notificationId.startsWith("sys_")) {
      try {
        localStorage.setItem(`mw_notif_read_${notificationId}`, "true");
      } catch (_) {}
      return { success: true };
    }

    try {
      await updateDoc(doc(db, COLLECTIONS.NOTIFICATIONS, notificationId), {
        read: true,
        readAt: serverTimestamp()
      });
      return { success: true };
    } catch (err) {
      throw normalizeError(err);
    }
  },

  /**
   * Marks all unread notifications for a user as read.
   * @param {string} userId
   * @param {object|null} [studentContext=null]
   */
  async markAllAsRead(userId, studentContext = null) {
    if (!userId) return;
    try {
      const items = await this.getUserNotifications(userId, 50, studentContext);
      const unread = items.filter((n) => !n.read);
      await Promise.all(
        unread.map((n) => this.markAsRead(n.id).catch(() => {}))
      );
      return { success: true, markedCount: unread.length };
    } catch (err) {
      throw normalizeError(err);
    }
  },

  /**
   * Creates a notification record in Firestore.
   * @param {object} params
   * @param {string} params.recipientUid
   * @param {string} params.title
   * @param {string} params.body
   * @param {string} [params.type]
   * @param {string} [params.deepLink]
   * @param {object} [params.metadata]
   */
  async createNotification({ recipientUid, title, body, type = NOTIFICATION_TYPES.ANNOUNCEMENT, deepLink = null, metadata = {} }) {
    try {
      const ref = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
        recipientUid,
        title: title.trim(),
        body: (body || "").trim(),
        type,
        deepLink,
        metadata,
        read: false,
        createdAt: serverTimestamp()
      });
      return { id: ref.id, success: true };
    } catch (err) {
      console.warn("Failed to create notification:", err?.message || err);
      return { success: false };
    }
  }
};

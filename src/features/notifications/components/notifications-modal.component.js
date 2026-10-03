// src/features/notifications/components/notifications-modal.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderModal } from "../../../shared/components/Modal/modal.component.js";
import { formatDate } from "../../../shared/utils/date.utils.js";
import { NOTIFICATION_TYPES } from "../../../core/constants.js";

export const NOTIFICATIONS_MODAL_ID = "appNotificationsModal";

/**
 * Friendly relative time formatter in Arabic.
 * @param {Date|string|number|object} dateVal
 * @returns {string}
 */
export function formatRelativeTime(dateVal) {
  if (!dateVal) return "اليوم";
  let dateObj;
  if (typeof dateVal?.toDate === "function") {
    dateObj = dateVal.toDate();
  } else if (dateVal instanceof Date) {
    dateObj = dateVal;
  } else {
    dateObj = new Date(dateVal);
  }
  if (isNaN(dateObj.getTime())) return "اليوم";

  const diffSec = Math.floor((Date.now() - dateObj.getTime()) / 1000);
  if (diffSec < 60) return "منذ لحظات";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "أمس";
  if (diffDays < 7) return `منذ ${diffDays} أيام`;
  return formatDate(dateObj);
}

/**
 * Returns HTML string for the Notification Bell Button to mount in Navbars.
 * @param {number} [unreadCount=0]
 * @returns {string}
 */
export function renderNotificationBellButton(unreadCount = 0) {
  const hasUnread = unreadCount > 0;
  return `
    <button
      type="button"
      id="openNotificationsModalBtn"
      class="pro-bell-btn relative inline-flex items-center justify-center cursor-pointer transition-all"
      aria-label="عرض الإشعارات (${unreadCount} إشعار غير مقروء)"
      title="مركز الإشعارات والتنبيهات الأكاديمية"
    >
      <div class="bell-icon-inner text-slate-300 hover:text-white">
        <i class="fa-solid fa-bell"></i>
      </div>
      ${hasUnread ? `<span class="bell-ping-ring"></span>` : ""}
      <span
        class="bell-badge-pill font-mono"
        id="notificationsUnreadBadge"
        style="${hasUnread ? 'display:flex;' : 'display:none;'}"
      >
        ${unreadCount > 9 ? "9+" : unreadCount}
      </span>
    </button>
  `;
}

/**
 * Returns HTML string for the Notifications Modal shell.
 */
export function renderNotificationsModal() {
  return renderModal({
    id: NOTIFICATIONS_MODAL_ID,
    title: `
      <div class="notif-modal-header-box">
        <div class="notif-modal-header-lead">
          <div class="notif-modal-avatar-glow">
            <i class="fa-solid fa-bell text-cyan-400"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-white font-extrabold text-base m-0 leading-tight">مركز الإشعارات والتنبيهات</h3>
              <span id="notifUnreadHeaderBadge" class="notif-header-unread-pill font-mono" style="display:none;"></span>
            </div>
            <p class="text-xs text-slate-400 m-0 mt-0.5">التنبيهات الأكاديمية، التكليفات، ومستجدات المنصة</p>
          </div>
        </div>
        <button
          type="button"
          id="markAllNotificationsReadBtn"
          class="notif-header-mark-all-btn"
          title="تحديد كافة التنبيهات كمقروءة"
        >
          <i class="fa-solid fa-check-double text-cyan-400"></i>
          <span>قراءة الكل</span>
        </button>
      </div>
    `,
    bodyHtml: `
      <div class="notif-modal-content-shell" dir="rtl">
        <!-- Filter Tabs Bar -->
        <div class="notif-tabs-bar" id="notifFilterTabsBar">
          <button type="button" class="notif-tab-item active" data-notif-filter="all">
            <i class="fa-solid fa-inbox"></i>
            <span>الكل</span>
          </button>
          <button type="button" class="notif-tab-item" data-notif-filter="unread">
            <i class="fa-solid fa-envelope-open-text"></i>
            <span>غير مقروءة</span>
            <span class="notif-tab-counter font-mono" id="notifTabCounterUnread" style="display:none;">0</span>
          </button>
          <button type="button" class="notif-tab-item" data-notif-filter="tasks">
            <i class="fa-solid fa-file-pen"></i>
            <span>المهام والامتحانات</span>
          </button>
          <button type="button" class="notif-tab-item" data-notif-filter="attendance">
            <i class="fa-solid fa-calendar-check"></i>
            <span>الحضور والنظام</span>
          </button>
        </div>

        <!-- Notification Cards Slot -->
        <div id="notificationsListBodySlot" class="notif-cards-scroll-slot">
          <div class="notif-loading-box">
            <div class="spinner"></div>
            <span>جاري مزامنة الإشعارات...</span>
          </div>
        </div>
      </div>
    `,
    footerHtml: `
      <div class="flex items-center justify-between w-full pt-1">
        <span class="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
          <i class="fa-solid fa-shield-halved text-emerald-400"></i>
          <span>مزامنة سحابية مباشرة ⚡</span>
        </span>
        <button type="button" class="btn btn-secondary btn-sm rounded-xl px-4 py-1.5 text-xs font-bold" data-modal-close="${NOTIFICATIONS_MODAL_ID}">
          إغلاق
        </button>
      </div>
    `,
    maxWidth: "580px"
  });
}

/**
 * Returns metadata for notification styling based on type.
 */
function getNotificationMeta(type) {
  switch (type) {
    case NOTIFICATION_TYPES.EXAM_AVAILABLE:
      return {
        icon: '<i class="fa-solid fa-file-signature"></i>',
        label: "امتحان جديد",
        badgeColor: "rgba(245, 158, 11, 0.15)",
        textColor: "#fbbf24",
        iconGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
        glowColor: "rgba(245, 158, 11, 0.3)"
      };
    case NOTIFICATION_TYPES.EXAM_RESULT:
      return {
        icon: '<i class="fa-solid fa-graduation-cap"></i>',
        label: "نتيجة امتحان",
        badgeColor: "rgba(16, 185, 129, 0.15)",
        textColor: "#34d399",
        iconGradient: "linear-gradient(135deg, #10b981, #059669)",
        glowColor: "rgba(16, 185, 129, 0.3)"
      };
    case NOTIFICATION_TYPES.ASSIGNMENT_NEW:
      return {
        icon: '<i class="fa-solid fa-book-bookmark"></i>',
        label: "واجب جديد",
        badgeColor: "rgba(56, 189, 248, 0.15)",
        textColor: "#38bdf8",
        iconGradient: "linear-gradient(135deg, #38bdf8, #0284c7)",
        glowColor: "rgba(56, 189, 248, 0.3)"
      };
    case NOTIFICATION_TYPES.ASSIGNMENT_GRADED:
      return {
        icon: '<i class="fa-solid fa-pen-ruler"></i>',
        label: "تقييم الواجب",
        badgeColor: "rgba(99, 102, 241, 0.15)",
        textColor: "#818cf8",
        iconGradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
        glowColor: "rgba(99, 102, 241, 0.3)"
      };
    case NOTIFICATION_TYPES.ATTENDANCE_RECORDED:
      return {
        icon: '<i class="fa-solid fa-circle-check"></i>',
        label: "توثيق حضور",
        badgeColor: "rgba(16, 185, 129, 0.15)",
        textColor: "#34d399",
        iconGradient: "linear-gradient(135deg, #10b981, #047857)",
        glowColor: "rgba(16, 185, 129, 0.3)"
      };
    case NOTIFICATION_TYPES.ATTENDANCE_WARNING:
      return {
        icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
        label: "إنذار غياب",
        badgeColor: "rgba(244, 63, 94, 0.15)",
        textColor: "#fb7185",
        iconGradient: "linear-gradient(135deg, #f43f5e, #be123c)",
        glowColor: "rgba(244, 63, 94, 0.3)"
      };
    case NOTIFICATION_TYPES.RANKING_UPDATE:
    case NOTIFICATION_TYPES.RANKING_PROMOTED:
      return {
        icon: '<i class="fa-solid fa-trophy"></i>',
        label: "لوحة الشرف",
        badgeColor: "rgba(245, 158, 11, 0.15)",
        textColor: "#fbbf24",
        iconGradient: "linear-gradient(135deg, #fbbf24, #b45309)",
        glowColor: "rgba(245, 158, 11, 0.3)"
      };
    case NOTIFICATION_TYPES.ACHIEVEMENT_UNLOCKED:
      return {
        icon: '<i class="fa-solid fa-medal"></i>',
        label: "وسام إنجاز",
        badgeColor: "rgba(234, 179, 8, 0.15)",
        textColor: "#facc15",
        iconGradient: "linear-gradient(135deg, #eab308, #ca8a04)",
        glowColor: "rgba(234, 179, 8, 0.3)"
      };
    case NOTIFICATION_TYPES.GAME_LEVEL_UP:
    case NOTIFICATION_TYPES.PYTHON_CHALLENGE:
      return {
        icon: '<i class="fa-solid fa-code"></i>',
        label: "تحدي بايثون",
        badgeColor: "rgba(168, 85, 247, 0.15)",
        textColor: "#c084fc",
        iconGradient: "linear-gradient(135deg, #a855f7, #7e22ce)",
        glowColor: "rgba(168, 85, 247, 0.3)"
      };
    case NOTIFICATION_TYPES.LECTURE_REMINDER:
      return {
        icon: '<i class="fa-solid fa-circle-play"></i>',
        label: "محاضرة جديدة",
        badgeColor: "rgba(14, 165, 233, 0.15)",
        textColor: "#38bdf8",
        iconGradient: "linear-gradient(135deg, #0ea5e9, #0369a1)",
        glowColor: "rgba(14, 165, 233, 0.3)"
      };
    default:
      return {
        icon: '<i class="fa-solid fa-bell"></i>',
        label: "تنبيه عام",
        badgeColor: "rgba(148, 163, 184, 0.15)",
        textColor: "#cbd5e1",
        iconGradient: "linear-gradient(135deg, #64748b, #334155)",
        glowColor: "rgba(148, 163, 184, 0.3)"
      };
  }
}

/**
 * Returns HTML for the inner list of notifications with active filtering.
 * @param {Array} notifications
 * @param {string} [activeFilter="all"]
 * @returns {string}
 */
export function renderNotificationsList(notifications = [], activeFilter = "all") {
  // 1. Filter notifications
  const filtered = notifications.filter((notif) => {
    if (activeFilter === "unread") return !notif.read;
    if (activeFilter === "tasks") {
      return [
        NOTIFICATION_TYPES.EXAM_AVAILABLE,
        NOTIFICATION_TYPES.EXAM_RESULT,
        NOTIFICATION_TYPES.ASSIGNMENT_NEW,
        NOTIFICATION_TYPES.ASSIGNMENT_GRADED,
        NOTIFICATION_TYPES.PYTHON_CHALLENGE
      ].includes(notif.type);
    }
    if (activeFilter === "attendance") {
      return [
        NOTIFICATION_TYPES.ATTENDANCE_RECORDED,
        NOTIFICATION_TYPES.ATTENDANCE_WARNING,
        NOTIFICATION_TYPES.RANKING_UPDATE,
        NOTIFICATION_TYPES.RANKING_PROMOTED,
        NOTIFICATION_TYPES.ACHIEVEMENT_UNLOCKED,
        NOTIFICATION_TYPES.GAME_LEVEL_UP,
        NOTIFICATION_TYPES.LECTURE_REMINDER,
        NOTIFICATION_TYPES.GENERAL
      ].includes(notif.type);
    }
    return true; // "all"
  });

  if (filtered.length === 0) {
    const isFiltered = activeFilter !== "all";
    return `
      <div class="notif-empty-state">
        <div class="notif-empty-emblem">
          <i class="fa-regular fa-bell-slash text-slate-500"></i>
        </div>
        <h4 class="text-white font-extrabold text-sm mb-1">
          ${isFiltered ? "لا توجد تنبيهات مطابقة لهذا التصنيف" : "لا توجد أي إشعارات جديدة حالياً"}
        </h4>
        <p class="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed m-0">
          ${isFiltered
            ? "يمكنك الانتقال لتبويب (الكل) لاستعراض كافة السجلات والرسائل السابقة."
            : "أنت على اطلاع دائم بكافة التحديثات الأكاديمية والمهام والمحاضرات فور صدورها."
          }
        </p>
      </div>
    `;
  }

  return `
    <div class="notif-cards-list" dir="rtl">
      ${filtered
        .map((notif) => {
          const isUnread = !notif.read;
          const meta = getNotificationMeta(notif.type);
          const relativeTime = formatRelativeTime(notif.createdAt);

          return `
            <div
              class="notif-card ${isUnread ? 'is-unread' : 'is-read'}"
              data-notification-id="${escapeHtml(notif.id)}"
              data-notification-unread="${isUnread}"
            >
              <div class="notif-card-main">
                <!-- Icon Avatar -->
                <div class="notif-avatar-box" style="background: ${meta.iconGradient}; box-shadow: 0 4px 14px ${meta.glowColor};">
                  ${meta.icon}
                </div>

                <!-- Text Content -->
                <div class="notif-card-text">
                  <div class="notif-card-top-meta">
                    <span class="notif-category-pill" style="background: ${meta.badgeColor}; color: ${meta.textColor};">
                      ${meta.label}
                    </span>
                    ${isUnread ? `<span class="notif-new-dot-pill"><span class="notif-pulse-dot"></span> جديد</span>` : ""}
                    <span class="notif-time-text font-mono">
                      <i class="fa-regular fa-clock text-[10px]"></i>
                      ${escapeHtml(relativeTime)}
                    </span>
                  </div>

                  <h4 class="notif-card-title">
                    ${escapeHtml(notif.title)}
                  </h4>

                  <p class="notif-card-desc">
                    ${escapeHtml(notif.body || notif.message || "")}
                  </p>
                </div>
              </div>

              <!-- Action Bar -->
              <div class="notif-card-actions">
                ${
                  (notif.deepLink || notif.link)
                    ? `
                  <button
                    type="button"
                    class="notif-action-btn primary"
                    data-notif-deep-link="${escapeHtml(notif.deepLink || notif.link)}"
                    data-notification-id="${escapeHtml(notif.id)}"
                  >
                    <span>${notif.type === NOTIFICATION_TYPES.ATTENDANCE_WARNING ? "عرض سجل الحضور 📑" : "معاينة التفاصيل ↗"}</span>
                  </button>
                `
                    : `<span></span>`
                }

                ${
                  isUnread
                    ? `
                  <button
                    type="button"
                    class="notif-action-btn read-btn"
                    data-notif-mark-read="${escapeHtml(notif.id)}"
                    title="تحديد هذا الإشعار كمقروء"
                  >
                    <i class="fa-solid fa-check text-emerald-400"></i>
                    <span>تم الاطلاع</span>
                  </button>
                `
                    : `
                  <span class="notif-seen-indicator">
                    <i class="fa-solid fa-circle-check text-slate-500"></i>
                    <span>تمت القراءة</span>
                  </span>
                `
                }
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

// src/features/notifications/notifications.controller.js
import { NotificationsService } from "./notifications.service.js";
import {
  renderNotificationsModal,
  renderNotificationsList,
  renderNotificationBellButton,
  NOTIFICATIONS_MODAL_ID
} from "./components/notifications-modal.component.js";
import { mountStudentInteractiveBanner } from "./components/student-interactive-banner.component.js";
import { openModal, closeModal } from "../../shared/components/Modal/modal.component.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";
import { setHtml } from "../../shared/utils/dom.utils.js";
import { auth } from "../../core/firebase.js";

export const NotificationsController = {
  _notifications: [],
  _onNavigateCallback: null,
  _student: null,

  /**
   * Initializes the notifications system, mounts modal shell, and mounts bell widget.
   * @param {object} options
   * @param {string|HTMLElement} [options.bellMountPoint]
   * @param {function} [options.onNavigate]
   * @param {object|null} [options.student]
   */
  async init({ bellMountPoint = null, onNavigate = null, student = null } = {}) {
    this._onNavigateCallback = onNavigate;
    this._student = student;

    // Ensure modal shell in DOM
    if (!document.getElementById(NOTIFICATIONS_MODAL_ID)) {
      document.body.insertAdjacentHTML("beforeend", renderNotificationsModal());
      this.bindModalGlobalEvents();
    }

    // Mount bell if mount point specified
    if (bellMountPoint) {
      const mountEl = typeof bellMountPoint === "string" ? document.getElementById(bellMountPoint) : bellMountPoint;
      if (mountEl) {
        mountEl.innerHTML = renderNotificationBellButton(0);
        mountEl.querySelector("#openNotificationsModalBtn")?.addEventListener("click", () => {
          this.openNotificationsModal();
        });
      }
    }

    // Refresh unread count
    await this.refreshUnreadBadge();
  },

  /**
   * Updates student context and refreshes notification indicators.
   * @param {object} student
   */
  setStudent(student) {
    this._student = student;
    this.refreshUnreadBadge();
  },

  /**
   * Fetches latest notifications and updates the bell badge counter.
   */
  async refreshUnreadBadge() {
    const user = auth.currentUser;
    if (!user) return;

    try {
      this._notifications = await NotificationsService.getUserNotifications(user.uid, 20, this._student);
      const unreadCount = this._notifications.filter((n) => !n.read).length;

      const badgeEl = document.getElementById("notificationsUnreadBadge");
      const btnEl = document.getElementById("openNotificationsModalBtn");
      const tasksBellIndicator = document.getElementById("tasksBellIndicator") || document.querySelector("#btnTasksNotification .notification-indicator");
      const tasksBellRing = document.querySelector("#btnTasksNotification .bell-ping-ring");

      if (badgeEl) {
        if (unreadCount > 0) {
          badgeEl.textContent = unreadCount > 9 ? "9+" : unreadCount;
          badgeEl.style.display = "flex";
        } else {
          badgeEl.style.display = "none";
        }
      } else if (btnEl && unreadCount > 0) {
        btnEl.insertAdjacentHTML(
          "beforeend",
          `<span class="bell-badge-pill" id="notificationsUnreadBadge">${unreadCount > 9 ? "9+" : unreadCount}</span>`
        );
      }

      // Update in-modal badges if modal is currently open/rendered
      const headerBadge = document.getElementById("notifUnreadHeaderBadge");
      if (headerBadge) {
        if (unreadCount > 0) {
          headerBadge.textContent = `${unreadCount} جديدة`;
          headerBadge.style.display = "inline-flex";
        } else {
          headerBadge.style.display = "none";
        }
      }

      const tabCounter = document.getElementById("notifTabCounterUnread");
      if (tabCounter) {
        if (unreadCount > 0) {
          tabCounter.textContent = String(unreadCount);
          tabCounter.style.display = "inline-flex";
        } else {
          tabCounter.style.display = "none";
        }
      }

      if (tasksBellIndicator) {
        tasksBellIndicator.style.display = unreadCount > 0 ? "block" : "none";
      }
      if (tasksBellRing) {
        tasksBellRing.style.display = unreadCount > 0 ? "block" : "none";
      }
    } catch (e) {
      console.warn("Refresh unread badge error:", e);
    }
  },

  /**
   * Opens the notifications modal and loads fresh notifications.
   */
  async openNotificationsModal() {
    openModal(NOTIFICATIONS_MODAL_ID);
    const bodySlot = document.getElementById("notificationsListBodySlot");
    if (!bodySlot) return;

    setHtml(bodySlot, `
      <div class="notif-loading-box">
        <div class="spinner"></div>
        <span>جاري جلب وتحديث الإشعارات... ⏳</span>
      </div>
    `);

    const user = auth.currentUser;
    if (!user) {
      setHtml(bodySlot, `<div class="notif-empty-state"><p class="text-xs text-slate-400">يرجى تسجيل الدخول لعرض الإشعارات.</p></div>`);
      return;
    }

    try {
      this._notifications = await NotificationsService.getUserNotifications(user.uid, 30, this._student);
      this._activeFilter = "all";
      this.renderList();
      this.refreshUnreadBadge();
    } catch (err) {
      setHtml(bodySlot, `<div class="p-6 text-center text-rose-400 text-sm">تعذر جلب قائمة الإشعارات. يرجى المحاولة لاحقاً.</div>`);
    }
  },

  /**
   * Renders the notification cards and binds deep links and read toggles.
   */
  renderList() {
    const bodySlot = document.getElementById("notificationsListBodySlot");
    if (!bodySlot) return;

    const currentFilter = this._activeFilter || "all";
    setHtml(bodySlot, renderNotificationsList(this._notifications, currentFilter));

    // Update filter tabs active state
    const tabsBar = document.getElementById("notifFilterTabsBar");
    if (tabsBar) {
      tabsBar.querySelectorAll(".notif-tab-item").forEach((tab) => {
        const f = tab.getAttribute("data-notif-filter");
        tab.classList.toggle("active", f === currentFilter);
      });
    }

    // Bind filter tabs click
    tabsBar?.querySelectorAll(".notif-tab-item[data-notif-filter]").forEach((tab) => {
      tab.onclick = () => {
        this._activeFilter = tab.getAttribute("data-notif-filter") || "all";
        this.renderList();
      };
    });

    // Bind individual mark as read
    bodySlot.querySelectorAll("[data-notif-mark-read]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-notif-mark-read");
        try {
          await NotificationsService.markAsRead(id);
          const item = this._notifications.find((n) => n.id === id);
          if (item) item.read = true;
          this.renderList();
          this.refreshUnreadBadge();
          showToast("تم تحديث حالة الإشعار ✓", "success");
        } catch (e) {
          showToast("تعذر تحديث حالة الإشعار", "error");
        }
      });
    });

    // Bind deep links
    bodySlot.querySelectorAll("[data-notif-deep-link]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const link = btn.getAttribute("data-notif-deep-link");
        const id = btn.getAttribute("data-notification-id");

        // Mark as read on navigation
        if (id) {
          NotificationsService.markAsRead(id).catch(() => {});
          const item = this._notifications.find((n) => n.id === id);
          if (item) item.read = true;
          this.refreshUnreadBadge();
        }

        closeModal(NOTIFICATIONS_MODAL_ID);

        if (typeof this._onNavigateCallback === "function") {
          this._onNavigateCallback(link);
        } else {
          // Fallback tab navigation
          const tabBtn = document.querySelector(`[data-tab="${link}"]`) || document.querySelector(`[data-section="${link}"]`);
          if (tabBtn) tabBtn.click();
        }
      });
    });
  },

  /**
   * Binds global events for the notifications modal.
   */
  bindModalGlobalEvents() {
    document.getElementById("markAllNotificationsReadBtn")?.addEventListener("click", async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        await NotificationsService.markAllAsRead(user.uid, this._student);
        this._notifications.forEach((n) => (n.read = true));
        this.renderList();
        this.refreshUnreadBadge();
        showToast("تم تحديد جميع الإشعارات كمقروءة ✓", "success");
      } catch (err) {
        showToast("تعذر تحديث حالة الإشعارات", "error");
      }
    });
  },

  /**
   * Mounts the interactive notification banner for students (Python Valley Challenge, Lectures, Tasks).
   * @param {string|HTMLElement} containerId
   * @param {object} options
   * @param {object} options.student
   * @param {function} options.onNavigate
   */
  mountStudentInteractiveBanner(containerId, { student = {}, onNavigate = null } = {}) {
    return mountStudentInteractiveBanner(containerId, {
      student,
      onNavigate: onNavigate || this._onNavigateCallback
    });
  }
};

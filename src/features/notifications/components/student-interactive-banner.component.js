// src/features/notifications/components/student-interactive-banner.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

const STORAGE_COLLAPSED_KEY = "mw_student_alert_collapsed";
const STORAGE_ACTIVE_TAB_KEY = "mw_student_alert_active_topic";

/**
 * Renders the Interactive Smart Notification Banner for the Student Portal.
 * Allows interactive switching between Python Valley Challenge, Lecture Appointments, and Tasks.
 * @param {object} options
 * @param {object} [options.student]
 * @param {string} [options.activeTopic="python-challenge"]
 * @param {boolean} [options.isCollapsed=false]
 * @returns {string}
 */
export function renderStudentInteractiveBanner({
  student = {},
  activeTopic = "python-challenge",
  isCollapsed = false
} = {}) {
  const safeName = escapeHtml(student.name || student.studentName || "إبراهيم خالد");

  if (isCollapsed) {
    return `
      <aside class="student-challenge-banner-row is-collapsed" aria-label="شريط التحديات التفاعلية">
        <div class="banner-challenge-lead">
          <span class="banner-challenge-icon">🐍</span>
          <span class="banner-challenge-text">أهلاً ${safeName}! تحدي وادي بايثون بانتظارك</span>
        </div>
        <button type="button" id="expandInteractiveBannerBtn" class="btn-banner-challenge" style="padding:0.35rem 0.85rem; font-size:0.75rem;">
          <span>إظهار التحدي ⚡</span>
        </button>
      </aside>
    `;
  }

  return `
    <aside class="student-challenge-banner-row" aria-label="تحدي وادي بايثون">
      <div class="banner-challenge-lead">
        <span class="banner-challenge-icon">🐍</span>
        <span class="banner-challenge-text">أهلاً ${safeName}! تحدي وادي بايثون بانتظارك 🐍</span>
      </div>
      <div class="banner-challenge-actions">
        <button type="button" class="btn-banner-challenge" data-interactive-navigate="python-adventure" title="بدء خوض التحدي البرمجي">
          <span>خوض التحدي</span>
          <span>⚡</span>
        </button>
        <button type="button" class="btn-banner-leaderboard" data-interactive-navigate="leaderboard" title="عرض لوحة الشرف">
          <span>المتصدرين</span>
          <span>🏆</span>
        </button>
      </div>
    </aside>
  `;
}



/**
 * Mounts and wires up the interactive notification banner in the target container.
 * @param {string|HTMLElement} containerId
 * @param {object} options
 * @param {object} options.student
 * @param {function} options.onNavigate
 */
export function mountStudentInteractiveBanner(containerId, { student = {}, onNavigate = null } = {}) {
  const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
  if (!container) return;

  let activeTopic = sessionStorage.getItem(STORAGE_ACTIVE_TAB_KEY) || "python-challenge";
  let isCollapsed = sessionStorage.getItem(STORAGE_COLLAPSED_KEY) === "true";

  function render() {
    container.innerHTML = renderStudentInteractiveBanner({
      student,
      activeTopic,
      isCollapsed
    });

    // Wire events
    if (isCollapsed) {
      container.querySelector("#expandInteractiveBannerBtn")?.addEventListener("click", () => {
        isCollapsed = false;
        sessionStorage.setItem(STORAGE_COLLAPSED_KEY, "false");
        render();
      });
      return;
    }

    // Collapse button
    container.querySelector("#collapseInteractiveBannerBtn")?.addEventListener("click", () => {
      isCollapsed = true;
      sessionStorage.setItem(STORAGE_COLLAPSED_KEY, "true");
      render();
    });

    // Topic Tab buttons
    container.querySelectorAll("[data-banner-topic]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const nextTopic = btn.getAttribute("data-banner-topic");
        if (nextTopic && nextTopic !== activeTopic) {
          activeTopic = nextTopic;
          sessionStorage.setItem(STORAGE_ACTIVE_TAB_KEY, activeTopic);
          render();
        }
      });
    });

    // Interactive Navigation Actions
    container.querySelectorAll("[data-interactive-navigate]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-interactive-navigate");
        if (typeof onNavigate === "function") {
          onNavigate(targetTab);
        } else {
          // Fallback direct click
          const tabEl = document.querySelector(`[data-section="${targetTab}"]`);
          if (tabEl) tabEl.click();
        }
      });
    });
  }

  render();

  return {
    updateStudent(newStudent) {
      student = { ...student, ...newStudent };
      render();
    },
    switchTopic(topicId) {
      activeTopic = topicId;
      isCollapsed = false;
      render();
    }
  };
}

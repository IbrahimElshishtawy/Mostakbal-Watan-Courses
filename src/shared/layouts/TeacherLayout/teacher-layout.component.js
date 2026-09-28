// src/shared/layouts/TeacherLayout/teacher-layout.component.js
import { escapeHtml } from "../../utils/dom.utils.js";

/**
 * Mounts the Teacher Application Shell Layout matching the design system.
 * @param {HTMLElement} container
 * @param {object} options
 * @param {Function} options.onLogout
 * @param {Function} options.onTabChange
 */
export function mountTeacherLayout(container, { onLogout, onTabChange }) {
  if (!container) return;

  const isSubdir = window.location.pathname.includes("/pages/");
  const logoSrc = isSubdir ? "../assets/images/logo_union.jpeg" : "assets/images/logo_union.jpeg";

  container.innerHTML = `
    <!-- Topbar Header (Sticky) matching Admin Layout -->
    <header class="admin-topbar" dir="rtl">
      <!-- Right: Brand Logo & Title -->
      <div class="admin-topbar-right">
        <button type="button" id="mobileTeacherMenuToggle" class="mobile-menu-btn d-lg-none" aria-label="فتح القائمة" style="display:none;background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;">
          ☰
        </button>
        <div class="admin-brand-emblem">
          <img src="${logoSrc}" alt="شعار حزب مستقبل وطن" />
        </div>
        <div class="admin-brand-text">
          <h1>حزب مستقبل وطن</h1>
          <p>أمانة أول المحلة الكبرى • البوابة الأكاديمية للمعلم</p>
        </div>
        <span class="admin-location-pill d-none d-md-inline-flex">
          <span>🏛️</span>
          <span>أمانة أول المحلة</span>
        </span>
      </div>

      <!-- Center / Left: Server status, Season, Notifications & User Pill -->
      <div class="admin-topbar-left">
        <div class="admin-breadcrumb-pill d-none d-lg-flex">
          <span>بوابة المعلم</span>
          <span>&gt;</span>
          <span id="teacherTopbarCurrentTab" class="crumb-active">إدارة المحاضرات والداتا</span>
        </div>

        <div class="admin-status-pill online" title="حالة الاتصال بالخادم الرئيسي">
          <span class="admin-live-dot" aria-hidden="true"></span>
          <span>الخادم : 172.20.104.203 (متصل)</span>
        </div>

        <div class="admin-season-pill d-none d-sm-inline-flex">
          <span aria-hidden="true">📅</span>
          <span>الموسم: 2026/2027</span>
        </div>

        <div id="teacherNotificationBellSlot" class="admin-notification-bell" title="التنبيهات والإشعارات" role="button" tabindex="0">
          <span aria-hidden="true">🔔</span>
          <span class="admin-notification-badge">2</span>
        </div>

        <div class="admin-user-pill" id="teacherUserPillTrigger">
          <div class="admin-user-pill-avatar" id="teacherTopbarUserInitial">م</div>
          <div class="admin-user-pill-info d-none d-sm-flex">
            <strong id="teacherSidebarName">المعلم الأكاديمي</strong>
            <span id="teacherSidebarEmail">teacher@watan.edu.eg</span>
          </div>
          <span style="font-size: 0.7rem; color: #fbbf24; margin-inline-start: 4px;">👨‍🏫</span>
        </div>
      </div>
    </header>

    <div id="mobileTeacherOverlay" class="mobile-overlay"></div>

    <div class="app-shell" style="min-height: calc(100vh - 70px);">
      <!-- Main Content Area -->
      <div class="main-wrapper" style="flex: 1; min-width: 0;">
        <main class="main-view" role="main" style="padding: 1.5rem 1.75rem; max-width: 1540px; margin: 0 auto; width: 100%; box-sizing: border-box;">
          
          <section id="sec-data" class="tab-content active" aria-labelledby="heading-t-data">
            <div id="teacherDataContainer"></div>
          </section>

          <section id="sec-exams" class="tab-content" aria-labelledby="heading-t-exams">
            <div id="teacherExamsContainer"></div>
          </section>

          <section id="sec-assignments" class="tab-content" aria-labelledby="heading-t-assignments">
            <div id="teacherAssignmentsContainer"></div>
          </section>

          <section id="sec-students" class="tab-content" aria-labelledby="heading-t-students">
            <div id="teacherStudentsContainer"></div>
          </section>

          <section id="sec-attendance" class="tab-content" aria-labelledby="heading-t-attendance">
            <div id="teacherAttendanceContainer"></div>
          </section>

          <section id="sec-settings" class="tab-content" aria-labelledby="heading-t-settings">
            <div id="teacherSettingsContainer"></div>
          </section>
        </main>
      </div>

      <!-- Right Sidebar (Fixed RTL) -->
      <aside id="teacherSidebar" class="admin-sidebar" aria-label="القائمة الجانبية للمعلم">
        <!-- User Profile Card -->
        <div class="admin-sidebar-profile-card">
          <div class="admin-sidebar-avatar-wrapper">
            <div class="admin-sidebar-avatar" id="teacherAvatarSlot">م</div>
            <span class="admin-avatar-status-dot online"></span>
          </div>
          <div class="admin-sidebar-user-details">
            <h4 id="teacherSidebarNameDisplay">المعلم الأكاديمي</h4>
            <span class="admin-user-role-badge teacher">👨‍🏫 معلم معتمد</span>
            <p id="teacherSidebarEmailDisplay">teacher@watan.edu.eg</p>
          </div>
        </div>

        <div class="admin-sidebar-nav-label">المهام التعليمية</div>

        <nav class="admin-sidebar-nav" id="teacherSidebarNav" role="navigation">
          <button type="button" class="admin-nav-item active" data-section="data">
            <div class="admin-nav-item-content">
              <span class="admin-nav-icon">📚</span>
              <span>المحاضرات والداتا</span>
            </div>
            <span class="admin-nav-badge live">دروس</span>
          </button>

          <button type="button" class="admin-nav-item" data-section="exams">
            <div class="admin-nav-item-content">
              <span class="admin-nav-icon">📝</span>
              <span>الاختبارات والتقييمات</span>
            </div>
            <span class="admin-nav-badge">12</span>
          </button>

          <button type="button" class="admin-nav-item" data-section="assignments">
            <div class="admin-nav-item-content">
              <span class="admin-nav-icon">📋</span>
              <span>التاسكات والواجبات</span>
            </div>
            <span class="admin-nav-badge gold">مراجعة</span>
          </button>

          <button type="button" class="admin-nav-item" data-section="students">
            <div class="admin-nav-item-content">
              <span class="admin-nav-icon">👥</span>
              <span>دليل الطلاب والدرجات</span>
            </div>
            <span class="admin-nav-badge">342</span>
          </button>

          <button type="button" class="admin-nav-item" data-section="attendance">
            <div class="admin-nav-item-content">
              <span class="admin-nav-icon">📊</span>
              <span>الغياب والحضور اليومي</span>
            </div>
            <span class="admin-nav-badge live">مباشر</span>
          </button>

          <div class="admin-sidebar-nav-label">الإعدادات والتخصيص</div>

          <button type="button" class="admin-nav-item" data-section="settings">
            <div class="admin-nav-item-content">
              <span class="admin-nav-icon">⚙️</span>
              <span>إعدادات الحساب والمظهر</span>
            </div>
          </button>
        </nav>

        <div class="admin-sidebar-footer">
          <div class="admin-security-pill">
            <i class="fas fa-lock"></i>
            <span>تشفير 256-bit آمن v2.6.4</span>
          </div>
          <button type="button" class="admin-logout-btn" id="teacherLogoutBtn">
            <i class="fas fa-sign-out-alt"></i>
            <span>تسجيل الخروج الآمن</span>
          </button>
        </div>
      </aside>
    </div>
  `;

  const sidebar = document.getElementById("teacherSidebar");
  const overlay = document.getElementById("mobileTeacherOverlay");
  const toggleBtn = document.getElementById("mobileTeacherMenuToggle");
  const navItems = container.querySelectorAll(".admin-nav-item[data-section]");
  const topbarBreadcrumb = document.getElementById("teacherTopbarCurrentTab");

  const tabLabels = {
    data: "المحاضرات والداتا",
    exams: "الاختبارات والتقييمات",
    assignments: "التاسكات والواجبات",
    students: "دليل الطلاب والدرجات",
    attendance: "الغياب والحضور اليومي",
    settings: "إعدادات الحساب والمظهر"
  };

  function closeMobile() {
    sidebar?.classList.remove("mobile-open");
    overlay?.classList.remove("active");
  }

  toggleBtn?.addEventListener("click", () => {
    sidebar?.classList.toggle("mobile-open");
    overlay?.classList.toggle("active");
  });

  overlay?.addEventListener("click", closeMobile);

  function setActiveTab(sectionId) {
    navItems.forEach((btn) => {
      const match = btn.getAttribute("data-section") === sectionId;
      btn.classList.toggle("active", match);
    });

    const allSections = container.querySelectorAll(".tab-content");
    allSections.forEach((sec) => sec.classList.remove("active"));

    const target = document.getElementById(`sec-${sectionId}`);
    if (target) {
      target.classList.add("active");
    }

    if (topbarBreadcrumb && tabLabels[sectionId]) {
      topbarBreadcrumb.textContent = tabLabels[sectionId];
    }

    closeMobile();
    if (typeof onTabChange === "function") {
      onTabChange(sectionId);
    }
  }

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      setActiveTab(section);
    });
  });

  document.getElementById("teacherLogoutBtn")?.addEventListener("click", () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  });

  return {
    switchTab: setActiveTab,
    updateProfile({ name, email }) {
      const nameEl = document.getElementById("teacherSidebarName");
      const nameDisplayEl = document.getElementById("teacherSidebarNameDisplay");
      const emailEl = document.getElementById("teacherSidebarEmail");
      const emailDisplayEl = document.getElementById("teacherSidebarEmailDisplay");
      const avatarSlot = document.getElementById("teacherAvatarSlot");
      const topbarAvatar = document.getElementById("teacherTopbarUserInitial");

      if (name) {
        if (nameEl) nameEl.textContent = name;
        if (nameDisplayEl) nameDisplayEl.textContent = name;
        if (avatarSlot) avatarSlot.textContent = name.trim().charAt(0);
        if (topbarAvatar) topbarAvatar.textContent = name.trim().charAt(0);
      }
      if (email) {
        if (emailEl) emailEl.textContent = email;
        if (emailDisplayEl) emailDisplayEl.textContent = email;
      }
    }
  };
}

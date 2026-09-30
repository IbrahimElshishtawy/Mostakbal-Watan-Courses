// src/shared/layouts/StudentLayout/student-layout.component.js
import { escapeHtml } from "../../utils/dom.utils.js";
import { renderAvatar } from "../../components/Avatar/avatar.component.js";
import { renderBadge } from "../../components/Badge/badge.component.js";

/**
 * Mounts the complete modern Student Application Shell Layout into a root container.
 */
export function mountStudentLayout(container, { onLogout, onTabChange }) {
  if (!container) return;

  const isSubdir = window.location.pathname.includes("/pages/");
  const logoSrc = isSubdir ? "../assets/images/logo_union.jpeg" : "assets/images/logo_union.jpeg";

  container.innerHTML = `
    <!-- Mobile Top Header Bar -->
    <header class="mobile-header">
      <div class="d-flex items-center gap-3">
        <div class="brand-mark" style="width:36px;height:36px;">
          <img src="${logoSrc}" alt="شعار مستقبل وطن" />
        </div>
        <div>
          <strong id="mobileStudentName" class="text-sm d-block font-extrabold">إبراهيم خالد</strong>
          <span class="text-xs text-muted">أمانة أول المحلة • بوابة الطالب</span>
        </div>
      </div>
      <button type="button" id="mobileMenuToggle" class="mobile-menu-btn" aria-label="فتح القائمة الجانبية">
        ☰
      </button>
    </header>

    <div id="mobileOverlay" class="mobile-overlay"></div>

    <div class="app-shell">
      <!-- Sidebar Navigation -->
      <aside id="appSidebar" class="sidebar" aria-label="القائمة الجانبية">
        <div class="brand">
          <div class="brand-mark">
            <img src="${logoSrc}" alt="شعار مستقبل وطن" />
          </div>
          <div class="brand-info">
            <h1>حزب مستقبل وطن</h1>
            <p>أمانة أول المحلة الكبرى • المنصة الرقمية</p>
          </div>
        </div>

        <!-- Student Profile Box Matching Image Design -->
        <div class="sidebar-user-box">
          <div class="sidebar-user-avatar-wrap">
            <div id="sidebarAvatarSlot">
              ${renderAvatar({ name: "إبراهيم خالد", size: "md" })}
            </div>
            <span class="online-status-dot" title="متصل"></span>
          </div>
          <div class="sidebar-user-info">
            <div class="d-flex items-center gap-1">
              <strong id="sidebarName">إبراهيم خالد</strong>
              <span class="sidebar-verified-badge" title="حساب نشط وموثق">✓</span>
            </div>
            <small id="sidebarPhone">01223070571</small>
            <div class="sidebar-role-tag">
              <span class="pulse-indicator"></span>
              <span>طالب متميز • مسار بايثون وهندسة النظم</span>
            </div>
          </div>
        </div>

        <div class="sidebar-menu-title">المحتوى الأكاديمي</div>
        <nav class="sidebar-menu" id="sidebarNav" role="navigation">
          <button type="button" class="sidebar-item active" data-section="videos">
            <span class="side-icon" aria-hidden="true">📖</span>
            <span class="side-text">الداتا والدروس</span>
          </button>

          <button type="button" class="sidebar-item" data-section="exams">
            <span class="side-icon" aria-hidden="true">📝</span>
            <span class="side-text">الامتحانات والتقييمات</span>
          </button>

          <button type="button" class="sidebar-item" data-section="tasks">
            <span class="side-icon" aria-hidden="true">📋</span>
            <span class="side-text">التاسكات والواجبات</span>
          </button>

          <button type="button" class="sidebar-item" data-section="attendance">
            <span class="side-icon" aria-hidden="true">📊</span>
            <span class="side-text">الغياب والحضور</span>
          </button>

          <div class="sidebar-menu-title">ألعاب وبرمجة تفاعلية</div>

          <button type="button" class="sidebar-item" data-section="python-adventure">
            <span class="side-icon" aria-hidden="true">🐍</span>
            <span class="side-text">مغامرة بايثون</span>
            <span class="side-badge-pill">جديد</span>
          </button>

          <button type="button" class="sidebar-item" data-section="leaderboard">
            <span class="side-icon" aria-hidden="true">🏆</span>
            <span class="side-text">لوحة المتصدرين</span>
          </button>

          <button type="button" class="sidebar-item" data-section="cloud-console">
            <span class="side-icon" aria-hidden="true">💻</span>
            <span class="side-text">الكونسول السحابي</span>
            <span class="side-badge-pill" style="background: rgba(14, 165, 233, 0.2); color: #38bdf8;">IDE</span>
          </button>

          <div class="sidebar-menu-title">الحساب والتفضيلات</div>

          <button type="button" class="sidebar-item" data-section="profile">
            <span class="side-icon" aria-hidden="true">👤</span>
            <span class="side-text">حسابي الشخصي</span>
          </button>

          <button type="button" class="sidebar-item" data-section="settings">
            <span class="side-icon" aria-hidden="true">⚙️</span>
            <span class="side-text">الإعدادات والمظهر</span>
          </button>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-security-badge mb-2">
            <span class="sec-dot"></span>
            <span>جلسة مشفرة 256-Bit</span>
          </div>
          <button type="button" class="sidebar-item text-danger" id="sidebarLogoutBtn">
            <span class="side-icon" aria-hidden="true">🚪</span>
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="main-wrapper">
        <!-- Desktop Topbar Matching Screenshots -->
        <header class="topbar">
          <div class="topbar-right-group">
            <div class="topbar-breadcrumb">
              <span>منصة مستقبل وطن</span>
              <span class="breadcrumb-sep">/</span>
              <span>بوابة الطالب</span>
              <span class="breadcrumb-sep">/</span>
              <strong id="topbarCurrentTab">الداتا والدروس</strong>
            </div>
            <div class="topbar-pills-row">
              <span class="topbar-pill">
                <span class="pill-icon">📅</span>
                <span>الموسم 2026 / 2027</span>
              </span>
              <span class="topbar-pill server-active">
                <span class="pill-dot"></span>
                <span>الخادم النشط: 01-Delta المحلة</span>
              </span>
            </div>
          </div>

          <div class="topbar-actions">
            <div id="studentNotificationBellSlot"></div>
            <button type="button" class="topbar-icon-btn" id="topbarHelpBtn" title="دليل الطالب">
              <span>❓</span>
            </button>
            <div class="topbar-student-pill" id="topbarStudentPill">
              <div class="topbar-student-meta">
                <strong id="topbarStudentName">إبراهيم خالد</strong>
                <span class="topbar-student-track">مسار بايثون وهندسة النظم</span>
              </div>
              <div id="topbarUserInitial" class="avatar avatar-sm">إ</div>
            </div>
          </div>
        </header>

        <main class="main-view" role="main">
          <!-- Interactive Alert Banner Slot (Notifications for Python Challenge, Lectures, Tasks) -->
          <div id="studentInteractiveAlertSlot" class="student-interactive-alert-slot mb-4"></div>

          <!-- Lectures Section (Image 10.jpeg) -->
          <section id="sec-videos" class="tab-content active" aria-labelledby="heading-videos">
            <!-- Top Navigation Shortcuts Row -->
            <div class="student-top-shortcuts-bar mb-4">
              <button type="button" class="shortcut-pill-btn active-shortcut" id="dashNavAdventureBtn" data-target="python-adventure">
                <span class="pill-icon">🎮</span>
                <span>تحدي وادي بايثون</span>
              </button>
              <button type="button" class="shortcut-pill-btn" id="dashNavExamsBtn" data-target="exams">
                <span class="pill-icon">📝</span>
                <span>الامتحانات والتقييمات</span>
              </button>
              <button type="button" class="shortcut-pill-btn" id="dashNavScheduleBtn" data-target="schedule">
                <span class="pill-icon">📅</span>
                <span>مواعيد المحاضرات</span>
              </button>
              <button type="button" class="shortcut-pill-btn" id="dashNavTasksBtn" data-target="tasks">
                <span class="pill-icon">📋</span>
                <span>التاسكات والواجبات</span>
              </button>
            </div>

            <!-- Main Lectures Header (Matching Image 10.jpeg) -->
            <div class="student-lessons-header-box mb-4">
              <div class="student-lessons-header-tag">
                <span class="header-tag-icon">🎓</span>
                <span>المحتوى الأكاديمي والمحاضرات المسجلة</span>
              </div>
              <h2 id="heading-videos" class="student-lessons-main-title">الداتا والمحاضرات التدريبية</h2>
              <p class="student-lessons-subtitle">استكشف السلايدات، الشروحات، الكود المصدري، والتكليفات المصاحبة لكل جلسة</p>
            </div>

            <div id="videoListContainer"></div>
          </section>

          <!-- Exams Section (Image 7.png) -->
          <section id="sec-exams" class="tab-content" aria-labelledby="heading-exams">
            <div id="examListContainer"></div>
            <div id="activeExamContainer" class="d-none"></div>
          </section>

          <!-- Tasks Section -->
          <section id="sec-tasks" class="tab-content" aria-labelledby="heading-tasks">
            <div class="page-header">
              <div>
                <h2 id="heading-tasks" class="page-title">📋 التاسكات والواجبات العملية</h2>
                <p class="page-subtitle">قم برفع وتسليم حلول المهام البرمجية لمتابعة تقييم المعلم.</p>
              </div>
            </div>
            <div id="taskListContainer"></div>
          </section>

          <!-- Attendance Section -->
          <section id="sec-attendance" class="tab-content" aria-label="سجل الحضور والغياب">
            <div id="attendanceContainer"></div>
          </section>

          <!-- Python Adventure Section -->
          <section id="sec-python-adventure" class="tab-content" aria-labelledby="heading-python-adventure">
            <div id="pythonAdventureContainer"></div>
          </section>

          <!-- Problem Solving Section (5 Levels) -->
          <section id="sec-problem-solving" class="tab-content" aria-labelledby="heading-problem-solving">
            <div id="problemSolvingContainer"></div>
          </section>

          <!-- Leaderboard Section -->
          <section id="sec-leaderboard" class="tab-content" aria-labelledby="heading-leaderboard">
            <div id="leaderboardContainer"></div>
          </section>

          <!-- Interactive Cloud Console IDE Section -->
          <section id="sec-cloud-console" class="tab-content" aria-labelledby="heading-cloud-console">
            <div id="cloudConsoleContainer"></div>
          </section>

          <!-- Profile Section -->
          <section id="sec-profile" class="tab-content" aria-labelledby="heading-profile">
            <div class="page-header">
              <div>
                <h2 id="heading-profile" class="page-title">👤 الملف التعريفي للطالب</h2>
                <p class="page-subtitle">بيانات الحساب الشخصي، المجموعة الدراسية، وإدارة كلمة المرور.</p>
              </div>
            </div>
            <div id="profileContainer"></div>
            <div id="profileAttendanceContainer" class="mt-6"></div>
          </section>

          <!-- Settings Section -->
          <section id="sec-settings" class="tab-content" aria-labelledby="heading-settings">
            <div class="page-header">
              <div>
                <h2 id="heading-settings" class="page-title">⚙️ تخصيص المنصة والمظهر</h2>
                <p class="page-subtitle">اختيار لون الواجهة المميز، تكبير أو تصغير الخط، وتغيير اللغة.</p>
              </div>
            </div>
            <div id="settingsContainer"></div>
          </section>
        </main>
      </div>
    </div>
  `;

  // Wire up sidebar switching and mobile drawer
  const sidebar = document.getElementById("appSidebar");
  const overlay = document.getElementById("mobileOverlay");
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const navItems = container.querySelectorAll(".sidebar-item[data-section]");
  const topbarBreadcrumb = document.getElementById("topbarCurrentTab");

  const tabLabels = {
    videos: "📚 الداتا والدروس",
    exams: "📝 الامتحانات",
    tasks: "📋 التاسكات والواجبات",
    attendance: "📊 الغياب والحضور",
    "python-adventure": "🐍 مغامرة بايثون",
    "problem-solving": "⚡ تحديات البرمجة (5 مستويات)",
    leaderboard: "🏆 لوحة المتصدرين والأبطال",
    "cloud-console": "💻 الكونسول السحابي (Python 3 IDE)",
    profile: "👤 حسابي الشخصي",
    settings: "⚙️ الإعدادات والمظهر"
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
    if (sectionId === "problem-solving") {
      sectionId = "python-adventure";
      try {
        window.dispatchEvent(new CustomEvent("open-python-track", { detail: { track: "problem-solving", worldId: "ps-level-1" } }));
      } catch (_) {}
    }

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

  document.getElementById("sidebarLogoutBtn")?.addEventListener("click", () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  });

  return {
    switchTab: setActiveTab,
    updateProfile({ name, phone }) {
      const nameEl = document.getElementById("sidebarName");
      const phoneEl = document.getElementById("sidebarPhone");
      const mobileNameEl = document.getElementById("mobileStudentName");
      const topbarStudentName = document.getElementById("topbarStudentName");
      const avatarSlot = document.getElementById("sidebarAvatarSlot");
      const topbarAvatar = document.getElementById("topbarUserInitial");
      const topbarBadge = document.getElementById("topbarStudentBadge");

      if (name) {
        if (nameEl) nameEl.textContent = name;
        if (mobileNameEl) mobileNameEl.textContent = name;
        if (topbarStudentName) topbarStudentName.textContent = name;
        if (avatarSlot) avatarSlot.innerHTML = renderAvatar({ name, size: "md" });
        if (topbarAvatar) topbarAvatar.textContent = name.trim().charAt(0);
        if (topbarBadge && name !== "طالب مسجل") {
          topbarBadge.innerHTML = renderBadge({ text: name, variant: "primary", icon: "🎓" });
        }
      }
      if (phone && phoneEl) {
        phoneEl.textContent = phone;
      }
    }
  };
}

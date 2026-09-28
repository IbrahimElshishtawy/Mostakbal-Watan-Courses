// src/shared/layouts/AdminLayout/admin-layout.component.js
import { escapeHtml } from "../../utils/dom.utils.js";

/**
 * Mounts the high-fidelity Admin Application Shell Layout matching Image 8.html and Image 2.html specifications.
 * @param {HTMLElement} container
 * @param {object} options
 * @param {Function} options.onLogout
 * @param {Function} options.onTabChange
 */
export function mountAdminLayout(container, { onLogout, onTabChange }) {
  if (!container) return;

  const isSubdir = window.location.pathname.includes("/pages/");
  const logoSrc = isSubdir ? "../assets/images/logo_union.jpeg" : "assets/images/logo_union.jpeg";

  container.className = "bg-[#0b0e14] text-slate-100 font-sans antialiased min-h-screen flex overflow-x-hidden selection:bg-emerald-500 selection:text-white";

  container.innerHTML = `
    <!-- BEGIN: Sidebar (Right Side in RTL) -->
    <aside id="adminSidebar" class="w-[285px] bg-[#101520] border-l border-[#1e293b] flex-shrink-0 flex flex-col justify-between z-30 sticky top-0 h-screen overflow-y-auto transition-transform duration-300" data-purpose="executive-sidebar">
      <div>
        <!-- Platform Header / Logo -->
        <div class="p-5 border-b border-[#1b2436] flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-[2px] shadow-lg shadow-emerald-950/50">
              <div class="w-full h-full bg-[#101520] rounded-[10px] flex items-center justify-center text-emerald-400 text-xl font-bold">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
            </div>
            <div>
              <h1 class="text-base font-extrabold tracking-wide text-white flex items-center gap-1.5">
                مستقبل وطن
                <span class="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">EduTech</span>
              </h1>
              <p class="text-xs text-slate-400 font-medium leading-none mt-1">أمانة أول المحلة الكبرى</p>
            </div>
          </div>
          <button id="adminMobileMenuToggle" type="button" class="text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer lg:hidden" title="تصغير القائمة">
            <i class="fa-solid fa-bars-staggered text-sm"></i>
          </button>
        </div>

        <!-- Admin Identity Card -->
        <div class="p-4 mx-3 my-4 bg-gradient-to-r from-[#151c2c] to-[#121927] border border-[#222f47] rounded-xl flex items-center gap-3 shadow-inner">
          <div class="relative">
            <div id="adminSidebarAvatar" class="w-10 h-10 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-sm shadow">
              م
            </div>
            <span class="w-3 h-3 bg-emerald-400 border-2 border-[#101520] rounded-full absolute bottom-0 left-0"></span>
          </div>
          <div class="overflow-hidden flex-1">
            <div class="flex items-center justify-between">
              <h4 id="adminSidebarName" class="text-sm font-bold text-white truncate">أحمد ممدوح</h4>
              <span class="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-semibold">مشرف عام</span>
            </div>
            <p id="adminSidebarEmail" class="text-[11px] text-slate-400 font-mono truncate">admin@admin.local</p>
          </div>
        </div>

        <!-- Navigation Menu Group: Supervision & Ops -->
        <div class="px-4 mb-2">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">الإشراف والعمليات التعليمية</p>
          <nav class="space-y-1">
            <!-- Active Tab 1: Attendance Management (Image 2) -->
            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="attendance" id="tab-btn-attendance">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-clipboard-user w-4 text-center text-slate-400 group-hover:text-cyan-400"></i>
                <span>الغياب والحضور العام</span>
              </div>
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>

            <!-- Tab 2: Students Management -->
            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="students" id="tab-btn-students">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-users-gear w-4 text-center text-slate-400 group-hover:text-cyan-400"></i>
                <span>إدارة شؤون الطلاب</span>
              </div>
              <span class="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full border border-slate-700" id="adminNavStudentsBadge">342</span>
            </button>

            <!-- Tab 3: Exams -->
            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="exams" id="tab-btn-exams">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-file-pen w-4 text-center text-slate-400 group-hover:text-amber-400"></i>
                <span>الامتحانات والاختبارات</span>
              </div>
            </button>

            <!-- Tab 4: Python Coding Challenges (Image 8) -->
            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="coding-problems" id="tab-btn-coding-problems">
              <div class="flex items-center gap-3">
                <span class="text-base">🐍</span>
                <span>تحديات بايثون البرمجية</span>
              </div>
              <span class="text-[9px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 px-1.5 py-0.5 rounded font-mono uppercase">مباشر</span>
            </button>
          </nav>
        </div>

        <!-- Navigation Menu Group: Control & Settings -->
        <div class="px-4 mt-6">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">النظام والتحكم الفني</p>
          <nav class="space-y-1">
            <button type="button" class="admin-nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="financial" id="tab-btn-financial">
              <i class="fa-solid fa-boxes-stacked w-4 text-center text-slate-400 group-hover:text-indigo-400"></i>
              <span>بنك الأكواد والخوارزميات</span>
            </button>

            <button type="button" class="admin-nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="settings" id="tab-btn-settings">
              <i class="fa-solid fa-sliders w-4 text-center text-slate-400 group-hover:text-purple-400"></i>
              <span>إعدادات النظام والمظهر</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Sidebar Bottom / Footer Info -->
      <div class="p-4 border-t border-[#1b2436] space-y-3 bg-[#0d121c]">
        <div class="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span class="flex items-center gap-1.5">
            <i class="fa-solid fa-shield-halved text-emerald-400 text-xs"></i>
            <span>حماية مشفرة 256-bit</span>
          </span>
          <span class="font-mono text-slate-400">v3.4.1</span>
        </div>
        <button id="adminLogoutBtn" type="button" class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span>تسجيل الخروج الآمن</span>
        </button>
      </div>
    </aside>
    <!-- END: Sidebar -->

    <!-- BEGIN: Main Work Area -->
    <div class="flex-1 flex flex-col min-w-0 bg-[#0c1017]">
      <!-- BEGIN: Top Navigation Bar matching Image 8.html & Image 2.html -->
      <header class="h-16 border-b border-[#1b2537] bg-[#101623]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20" data-purpose="top-header">
        <!-- Breadcrumbs & Status Tag -->
        <div class="flex items-center gap-3 text-xs" id="adminBreadcrumbWrapper">
          <a class="text-slate-400 hover:text-slate-200 transition-colors" href="#">لوحة الإدارة</a>
          <i class="fa-solid fa-chevron-left text-[10px] text-slate-600"></i>
          <span id="adminBreadcrumbCurrentTab" class="text-emerald-400 font-bold flex items-center gap-1.5">
            <span>الغياب والحضور العام</span>
          </span>
        </div>

        <!-- Server Info, Season Badge & User Actions -->
        <div class="flex items-center gap-4">
          <!-- Mobile Sidebar Toggle -->
          <button id="adminMobileOpenBtn" type="button" class="text-slate-400 hover:text-white p-1 lg:hidden cursor-pointer" title="فتح القائمة">
            <i class="fa-solid fa-bars text-base"></i>
          </button>

          <!-- Live Server IP Indicator -->
          <div class="hidden xl:flex items-center gap-2 bg-[#151d2d] border border-[#212e46] px-3 py-1.5 rounded-lg text-xs text-slate-300 font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
            <span>172.20.104.203:3000</span>
            <span class="text-slate-500 text-[10px]">| متصل</span>
          </div>

          <!-- Academic Season -->
          <div class="hidden sm:flex items-center gap-1.5 bg-[#172033] border border-[#24334d] px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <i class="fa-solid fa-code text-cyan-400 text-xs"></i>
            <span>الموسم البرمجي 2026 / 2027</span>
          </div>

          <!-- Notifications Bell -->
          <div id="adminNotificationBellSlot" class="relative">
            <button class="relative w-9 h-9 rounded-lg bg-[#151d2d] border border-[#223049] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:border-slate-500 cursor-pointer" title="الإشعارات والتنبيهات">
              <i class="fa-regular fa-bell text-sm"></i>
              <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center">3</span>
            </button>
          </div>

          <!-- Rapid Account Avatar -->
          <div class="flex items-center gap-2 border-r border-[#202b3f] pr-4">
            <div id="adminTopbarUserInitial" class="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-xs shadow">
              م
            </div>
            <div class="hidden md:flex flex-col text-right">
              <span id="adminTopbarUserName" class="text-xs font-semibold text-slate-200">مدير النظام</span>
              <span id="adminTopbarUserEmail" class="text-[10px] text-slate-500 font-mono">admin@admin.local</span>
            </div>
          </div>
        </div>
      </header>
      <!-- END: Top Navigation Bar -->

      <!-- BEGIN: Main Dashboard Content Container -->
      <main class="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto" role="main">
        <!-- Tab 1: Attendance Management (Image 2) -->
        <section id="sec-attendance" class="tab-content active" aria-labelledby="tab-btn-attendance">
          <div id="adminAttendanceContainer"></div>
        </section>

        <!-- Tab 2: Students Management -->
        <section id="sec-students" class="tab-content hidden" aria-labelledby="tab-btn-students">
          <div id="adminStudentsContainer"></div>
        </section>

        <!-- Tab 3: Python Coding Challenges (Image 8) -->
        <section id="sec-coding-problems" class="tab-content hidden" aria-labelledby="tab-btn-coding-problems">
          <div id="adminCodingProblemsContainer"></div>
        </section>

        <!-- Tab 4: Exams & Assessments -->
        <section id="sec-exams" class="tab-content hidden" aria-labelledby="tab-btn-exams">
          <div id="adminExamsContainer"></div>
        </section>

        <!-- Tab 5: Settings -->
        <section id="sec-settings" class="tab-content hidden" aria-labelledby="tab-btn-settings">
          <div id="adminSettingsContainer"></div>
        </section>

        <!-- Tab 6: Algorithms & Records -->
        <section id="sec-financial" class="tab-content hidden" aria-labelledby="tab-btn-financial">
          <div class="bg-[#121825] border border-[#1e2a3f] rounded-2xl p-8 text-center">
            <i class="fa-solid fa-boxes-stacked text-indigo-400 text-4xl mb-3"></i>
            <h3 class="text-white text-base font-bold">بنك الأكواد والخوارزميات البرمجية</h3>
            <p class="text-slate-400 text-xs mt-1 max-w-md mx-auto">مكتبة الخوارزميات وحلول التحديات البرمجية المعتمدة لطلاب منصة مستقبل وطن التعليمية.</p>
          </div>
        </section>
      </main>
    </div>
  `;

  // Dynamic Navigation Setup
  const sidebar = document.getElementById("adminSidebar");
  const navItems = container.querySelectorAll(".admin-nav-item[data-section]");
  const breadcrumbText = document.getElementById("adminBreadcrumbCurrentTab");

  const tabBreadcrumbHtml = {
    attendance: `<i class="fa-solid fa-chart-pie mr-1"></i> <span>إدارة الغياب والحضور العام</span>`,
    students: `<i class="fa-solid fa-users-gear mr-1"></i> <span>إدارة شؤون الطلاب</span>`,
    exams: `<i class="fa-solid fa-file-pen mr-1"></i> <span>الامتحانات والاختبارات</span>`,
    "coding-problems": `<span>🐍 تحديات بايثون البرمجية</span> <span class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono">Python 3.12 Engine</span>`,
    settings: `<i class="fa-solid fa-sliders mr-1"></i> <span>إعدادات النظام والمظهر</span>`,
    financial: `<i class="fa-solid fa-boxes-stacked mr-1"></i> <span>بنك الأكواد والخوارزميات</span>`
  };

  const activeNavClasses = "bg-gradient-to-l from-emerald-500/20 via-emerald-600/10 to-transparent border-r-4 border-emerald-400 text-emerald-300 font-bold active-nav-glow shadow-sm";
  const inactiveNavClasses = "text-slate-300 hover:bg-[#182133] hover:text-white";

  function setActiveTab(sectionId) {
    navItems.forEach((btn) => {
      const isTarget = btn.getAttribute("data-section") === sectionId;
      if (isTarget) {
        btn.className = `admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all cursor-pointer text-right ${activeNavClasses}`;
      } else {
        btn.className = `admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-right ${inactiveNavClasses}`;
      }
    });

    const allSections = container.querySelectorAll(".tab-content");
    allSections.forEach((sec) => {
      sec.classList.add("hidden");
      sec.classList.remove("active");
    });

    const targetSec = document.getElementById(`sec-${sectionId}`);
    if (targetSec) {
      targetSec.classList.remove("hidden");
      targetSec.classList.add("active");
    }

    if (breadcrumbText && tabBreadcrumbHtml[sectionId]) {
      breadcrumbText.innerHTML = tabBreadcrumbHtml[sectionId];
    }

    if (typeof onTabChange === "function") {
      onTabChange(sectionId);
    }
  }

  // Bind sidebar buttons
  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      setActiveTab(section);
    });
  });

  // Mobile menu buttons
  document.getElementById("adminMobileOpenBtn")?.addEventListener("click", () => {
    sidebar?.classList.toggle("hidden");
  });
  document.getElementById("adminMobileMenuToggle")?.addEventListener("click", () => {
    sidebar?.classList.add("hidden");
  });

  // Logout button
  document.getElementById("adminLogoutBtn")?.addEventListener("click", () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  });

  // Set default active tab
  setActiveTab("attendance");

  return {
    switchTab: setActiveTab,
    updateProfile({ name, email }) {
      const nameEl = document.getElementById("adminSidebarName");
      const emailEl = document.getElementById("adminSidebarEmail");
      const topbarName = document.getElementById("adminTopbarUserName");
      const topbarEmail = document.getElementById("adminTopbarUserEmail");
      const topbarInitial = document.getElementById("adminTopbarUserInitial");
      const sidebarAvatar = document.getElementById("adminSidebarAvatar");

      const displayName = name || "أحمد ممدوح";
      if (nameEl) nameEl.textContent = displayName;
      if (topbarName) topbarName.textContent = displayName;
      if (topbarEmail && email) topbarEmail.textContent = email;
      if (emailEl && email) emailEl.textContent = email;

      const firstChar = displayName.trim().charAt(0) || "م";
      if (topbarInitial) topbarInitial.textContent = firstChar;
      if (sidebarAvatar) sidebarAvatar.textContent = firstChar;
    }
  };
}

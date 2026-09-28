// src/shared/layouts/TeacherLayout/teacher-layout.component.js
import { escapeHtml } from "../../utils/dom.utils.js";

/**
 * Mounts the high-fidelity Teacher Application Shell Layout matching Image 8.html & Image 2.html design standards.
 * @param {HTMLElement} container
 * @param {object} options
 * @param {Function} options.onLogout
 * @param {Function} options.onTabChange
 */
export function mountTeacherLayout(container, { onLogout, onTabChange }) {
  if (!container) return;

  const isSubdir = window.location.pathname.includes("/pages/");
  const logoSrc = isSubdir ? "../assets/images/logo_union.jpeg" : "assets/images/logo_union.jpeg";

  container.className = "bg-[#0b0e14] text-slate-100 font-sans antialiased min-h-screen flex overflow-x-hidden selection:bg-brand-500 selection:text-white";

  container.innerHTML = `
    <!-- BEGIN: Sidebar (Right Side in RTL) -->
    <aside id="teacherSidebar" class="w-[285px] bg-[#101520] border-l border-[#1e293b] flex-shrink-0 flex flex-col justify-between z-30 sticky top-0 h-screen overflow-y-auto transition-transform duration-300" data-purpose="teacher-sidebar">
      <div>
        <!-- Platform Header / Logo -->
        <div class="p-5 border-b border-[#1b2436] flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan p-[2px] shadow-lg shadow-cyan-950/50">
              <div class="w-full h-full bg-[#101520] rounded-[10px] flex items-center justify-center text-accent-cyan text-xl font-bold">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
            </div>
            <div>
              <h1 class="text-base font-extrabold tracking-wide text-white flex items-center gap-1.5">
                مستقبل وطن
                <span class="text-[10px] bg-brand-500/15 text-accent-cyan border border-brand-500/30 px-1.5 py-0.5 rounded font-mono">Teacher</span>
              </h1>
              <p class="text-xs text-slate-400 font-medium leading-none mt-1">البوابة الأكاديمية للمعلم</p>
            </div>
          </div>
          <button id="mobileTeacherMenuToggle" type="button" class="text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer lg:hidden" title="تصغير القائمة">
            <i class="fa-solid fa-bars-staggered text-sm"></i>
          </button>
        </div>

        <!-- Teacher Identity Card -->
        <div class="p-4 mx-3 my-4 bg-gradient-to-r from-[#151c2c] to-[#121927] border border-[#222f47] rounded-xl flex items-center gap-3 shadow-inner">
          <div class="relative">
            <div id="teacherAvatarSlot" class="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-sm shadow">
              م
            </div>
            <span class="w-3 h-3 bg-emerald-400 border-2 border-[#101520] rounded-full absolute bottom-0 left-0"></span>
          </div>
          <div class="overflow-hidden flex-1">
            <div class="flex items-center justify-between">
              <h4 id="teacherSidebarNameDisplay" class="text-sm font-bold text-white truncate">المعلم الأكاديمي</h4>
              <span class="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-semibold">معلم معتمد</span>
            </div>
            <p id="teacherSidebarEmailDisplay" class="text-[11px] text-slate-400 font-mono truncate">teacher@watan.edu.eg</p>
          </div>
        </div>

        <!-- Navigation Menu: Instructional Tasks -->
        <div class="px-4 mb-2">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">المهام التعليمية والصفية</p>
          <nav class="space-y-1">
            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="data" id="tab-btn-data">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-book-open w-4 text-center text-slate-400 group-hover:text-cyan-400"></i>
                <span>المحاضرات والداتا</span>
              </div>
              <span class="text-[10px] bg-brand-500/20 text-accent-cyan px-2 py-0.5 rounded-full font-bold">دروس</span>
            </button>

            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="exams" id="tab-btn-exams">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-file-pen w-4 text-center text-slate-400 group-hover:text-amber-400"></i>
                <span>الاختبارات والتقييمات</span>
              </div>
              <span class="text-[10px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded-full border border-slate-700">12</span>
            </button>

            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="assignments" id="tab-btn-assignments">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-list-check w-4 text-center text-slate-400 group-hover:text-amber-400"></i>
                <span>التاسكات والواجبات</span>
              </div>
              <span class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">مراجعة</span>
            </button>

            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="students" id="tab-btn-students">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-users w-4 text-center text-slate-400 group-hover:text-cyan-400"></i>
                <span>دليل الطلاب والدرجات</span>
              </div>
              <span class="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded-full border border-slate-700">342</span>
            </button>

            <!-- Active Tab: Attendance Sheet (Image 2) -->
            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="attendance" id="tab-btn-attendance">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-clipboard-user w-4 text-center text-slate-400 group-hover:text-emerald-400"></i>
                <span>الغياب والحضور اليومي</span>
              </div>
              <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">مباشر</span>
            </button>

            <!-- Python Adventure World & Level Management -->
            <button type="button" class="admin-nav-item w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="python-adventure" id="tab-btn-python-adventure">
              <div class="flex items-center gap-3">
                <span class="text-sm">🐍</span>
                <span>عالم ومستويات بايثون</span>
              </div>
              <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">تحديات</span>
            </button>
          </nav>
        </div>

        <!-- Navigation Menu: Settings -->
        <div class="px-4 mt-6">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">النظام والتخصيص</p>
          <nav class="space-y-1">
            <button type="button" class="admin-nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-slate-300 hover:bg-[#182133] hover:text-white transition-all text-xs font-semibold group cursor-pointer text-right" data-section="settings" id="tab-btn-settings">
              <i class="fa-solid fa-sliders w-4 text-center text-slate-400 group-hover:text-purple-400"></i>
              <span>إعدادات الحساب والمظهر</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-[#1b2436] space-y-3 bg-[#0d121c]">
        <div class="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span class="flex items-center gap-1.5">
            <i class="fa-solid fa-shield-halved text-emerald-400 text-xs"></i>
            <span>تشفير 256-bit آمن</span>
          </span>
          <span class="font-mono text-slate-400">v2.6.4</span>
        </div>
        <button id="teacherLogoutBtn" type="button" class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span>تسجيل الخروج الآمن</span>
        </button>
      </div>
    </aside>
    <!-- END: Sidebar -->

    <!-- BEGIN: Main Work Area -->
    <div class="flex-1 flex flex-col min-w-0 bg-[#0c1017]">
      <!-- Topbar Header -->
      <header class="h-16 border-b border-[#1b2537] bg-[#101623]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
        <!-- Breadcrumbs -->
        <div class="flex items-center gap-3 text-xs">
          <a class="text-slate-400 hover:text-slate-200 transition-colors" href="#">بوابة المعلم</a>
          <i class="fa-solid fa-chevron-left text-[10px] text-slate-600"></i>
          <span id="teacherTopbarCurrentTab" class="text-accent-cyan font-bold flex items-center gap-1.5">
            <span>المحاضرات والداتا</span>
          </span>
        </div>

        <!-- Server & Account Status -->
        <div class="flex items-center gap-4">
          <!-- Mobile Sidebar Toggle -->
          <button id="mobileTeacherOpenBtn" type="button" class="text-slate-400 hover:text-white p-1 lg:hidden cursor-pointer" title="فتح القائمة">
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
            <i class="fa-regular fa-calendar-check text-brand-400 text-xs"></i>
            <span>الموسم: 2026/2027</span>
          </div>

          <!-- Notification Bell Slot -->
          <div id="teacherNotificationBellSlot" class="relative">
            <button class="relative w-9 h-9 rounded-lg bg-[#151d2d] border border-[#223049] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:border-slate-500 cursor-pointer">
              <i class="fa-regular fa-bell text-sm"></i>
              <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center">2</span>
            </button>
          </div>

          <!-- Teacher Profile Pill -->
          <div class="flex items-center gap-2 border-r border-[#202b3f] pr-4">
            <div id="teacherTopbarUserInitial" class="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-accent-cyan text-white font-bold flex items-center justify-center text-xs shadow">
              م
            </div>
            <div class="hidden md:flex flex-col text-right">
              <span id="teacherTopbarUserName" class="text-xs font-semibold text-slate-200">المعلم الأكاديمي</span>
              <span id="teacherTopbarUserEmail" class="text-[10px] text-slate-500 font-mono">teacher@watan.edu.eg</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Tab Content Area -->
      <main class="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto" role="main">
        <section id="sec-data" class="tab-content active" aria-labelledby="tab-btn-data">
          <div id="teacherDataContainer"></div>
        </section>

        <section id="sec-exams" class="tab-content hidden" aria-labelledby="tab-btn-exams">
          <div id="teacherExamsContainer"></div>
        </section>

        <section id="sec-assignments" class="tab-content hidden" aria-labelledby="tab-btn-assignments">
          <div id="teacherAssignmentsContainer"></div>
        </section>

        <section id="sec-students" class="tab-content hidden" aria-labelledby="tab-btn-students">
          <div id="teacherStudentsContainer"></div>
        </section>

        <section id="sec-attendance" class="tab-content hidden" aria-labelledby="tab-btn-attendance">
          <div id="teacherAttendanceContainer"></div>
        </section>

        <section id="sec-python-adventure" class="tab-content hidden" aria-labelledby="tab-btn-python-adventure">
          <div id="teacherPythonAdventureContainer"></div>
        </section>

        <section id="sec-settings" class="tab-content hidden" aria-labelledby="tab-btn-settings">
          <div id="teacherSettingsContainer"></div>
        </section>
      </main>
    </div>
  `;

  const sidebar = document.getElementById("teacherSidebar");
  const navItems = container.querySelectorAll(".admin-nav-item[data-section]");
  const topbarBreadcrumb = document.getElementById("teacherTopbarCurrentTab");

  const tabLabels = {
    data: "المحاضرات والداتا",
    exams: "الاختبارات والتقييمات",
    assignments: "التاسكات والواجبات",
    students: "دليل الطلاب والدرجات",
    attendance: "إدارة الغياب والحضور المركزي",
    "python-adventure": "عالم ومستويات بايثون",
    settings: "إعدادات الحساب والمظهر"
  };

  const activeNavClasses = "bg-gradient-to-l from-brand-600/30 to-brand-500/10 border-r-4 border-accent-cyan shadow-glow-cyan/20 text-accent-cyan font-bold";
  const inactiveNavClasses = "text-slate-300 hover:bg-[#182133] hover:text-white";

  function setActiveTab(sectionId) {
    navItems.forEach((btn) => {
      const match = btn.getAttribute("data-section") === sectionId;
      if (match) {
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

    const target = document.getElementById(`sec-${sectionId}`);
    if (target) {
      target.classList.remove("hidden");
      target.classList.add("active");
    }

    if (topbarBreadcrumb && tabLabels[sectionId]) {
      topbarBreadcrumb.textContent = tabLabels[sectionId];
    }

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

  document.getElementById("mobileTeacherOpenBtn")?.addEventListener("click", () => {
    sidebar?.classList.toggle("hidden");
  });
  document.getElementById("mobileTeacherMenuToggle")?.addEventListener("click", () => {
    sidebar?.classList.add("hidden");
  });

  document.getElementById("teacherLogoutBtn")?.addEventListener("click", () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  });

  // Set default active tab
  setActiveTab("data");

  return {
    switchTab: setActiveTab,
    updateProfile({ name, email }) {
      const nameDisplayEl = document.getElementById("teacherSidebarNameDisplay");
      const emailDisplayEl = document.getElementById("teacherSidebarEmailDisplay");
      const topbarName = document.getElementById("teacherTopbarUserName");
      const topbarEmail = document.getElementById("teacherTopbarUserEmail");
      const avatarSlot = document.getElementById("teacherAvatarSlot");
      const topbarAvatar = document.getElementById("teacherTopbarUserInitial");

      const displayName = name || "المعلم الأكاديمي";
      if (nameDisplayEl) nameDisplayEl.textContent = displayName;
      if (topbarName) topbarName.textContent = displayName;
      if (topbarEmail && email) topbarEmail.textContent = email;
      if (emailDisplayEl && email) emailDisplayEl.textContent = email;

      const firstChar = displayName.trim().charAt(0) || "م";
      if (avatarSlot) avatarSlot.textContent = firstChar;
      if (topbarAvatar) topbarAvatar.textContent = firstChar;
    }
  };
}

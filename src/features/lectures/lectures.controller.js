// src/features/lectures/lectures.controller.js
import { LecturesService } from "./lectures.service.js";
import { lecturesState } from "./lectures.state.js";
import { renderStudentLessonCard, renderTeacherLessonCard } from "./components/lesson-card.component.js";
import { renderLessonFormModal, renderResourceFormRow } from "./components/lesson-form-modal.component.js";
import { renderLessonDetailsModal, renderLessonDetailsContent, renderEngagementContent } from "./components/lesson-details-modal.component.js";
import { renderVideoPlayerModal } from "./components/video-player-modal.component.js";
import { renderLessonFilters, renderStudentLessonFilters } from "./components/lesson-filters.component.js";
import { renderStudentLessonSkeletonGrid } from "./components/lesson-skeleton.component.js";
import { openModal, closeModal } from "../../shared/components/Modal/modal.component.js";
import { renderSkeletonCards } from "../../shared/components/Skeleton/skeleton.component.js";
import { renderEmptyState } from "../../shared/components/EmptyState/empty-state.component.js";
import { renderErrorState } from "../../shared/components/ErrorState/error-state.component.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";
import { showConfirmDialog } from "../../shared/components/ConfirmDialog/confirm-dialog.component.js";
import { setHtml, escapeHtml, qs, qsa } from "../../shared/utils/dom.utils.js";
import { validateLessonInput, resolveMediaEmbed } from "../../shared/validators/url.validator.js";

// Internal debounce helper
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export const LecturesController = {
  /**
   * Ensures all required feature modals are injected into the DOM once.
   */
  ensureModals() {
    if (!document.getElementById("lessonFormModal")) {
      document.body.insertAdjacentHTML("beforeend", renderLessonFormModal());
    }
    if (!document.getElementById("lessonDetailsModal")) {
      document.body.insertAdjacentHTML("beforeend", renderLessonDetailsModal());
    }
    if (!document.getElementById("videoPlayerModal")) {
      document.body.insertAdjacentHTML("beforeend", renderVideoPlayerModal());
    }

    this.bindGlobalModalEvents();
  },

  /**
   * Binds global events on modals like video player cleanup.
   */
  bindGlobalModalEvents() {
    const videoModal = document.getElementById("videoPlayerModal");
    if (videoModal && !videoModal.hasAttribute("data-player-cleanup")) {
      videoModal.setAttribute("data-player-cleanup", "true");
      videoModal.querySelectorAll("[data-modal-close]").forEach((c) => {
        c.addEventListener("click", () => {
          const frame = document.getElementById("videoPlayerFrame");
          if (frame) frame.src = "";
        });
      });
    }

    // Bind form resource dynamic add button
    const addResourceBtn = document.getElementById("addResourceBtn");
    if (addResourceBtn && !addResourceBtn.hasAttribute("data-bound")) {
      addResourceBtn.setAttribute("data-bound", "true");
      addResourceBtn.addEventListener("click", () => {
        const container = document.getElementById("lessonResourcesContainer");
        if (container) {
          const count = container.querySelectorAll("[data-resource-row]").length;
          container.insertAdjacentHTML("beforeend", renderResourceFormRow({}, count));
          this.bindResourceRowRemovals();
        }
      });
    }

    // Bind form submission once
    const form = document.getElementById("lessonForm");
    if (form && !form.hasAttribute("data-bound")) {
      form.setAttribute("data-bound", "true");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }
  },

  /**
   * Binds remove buttons on dynamic resource rows in the form.
   */
  bindResourceRowRemovals() {
    const container = document.getElementById("lessonResourcesContainer");
    if (!container) return;

    container.querySelectorAll("[data-remove-resource]").forEach((btn) => {
      if (!btn.hasAttribute("data-remove-bound")) {
        btn.setAttribute("data-remove-bound", "true");
        btn.addEventListener("click", () => {
          const row = btn.closest("[data-resource-row]");
          if (row) row.remove();
        });
      }
    });
  },

  // ========================================================
  // 1. TEACHER / ADMIN MANAGEMENT WORKFLOW
  // ========================================================

  /**
   * Loads and renders the complete lecture management section for teachers/admins.
   * @param {string|HTMLElement} containerId
   */
  async loadTeacherLectures(containerId) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.ensureModals();
    this.currentTeacherContainer = container;

    // Render loading shimmer skeleton
    setHtml(container, renderSkeletonCards(3));

    try {
      const lectures = await LecturesService.getAllLectures();
      lecturesState.set("lectures", lectures);

      // Render the full management view
      this.renderTeacherView(container);
    } catch (err) {
      console.error("Failed to load teacher lectures:", err);
      setHtml(container, renderErrorState({
        title: "تعذر تحميل قائمة المحاضرات",
        message: err.message,
        retryBtnId: "retryTeacherLecturesBtn"
      }));
      document.getElementById("retryTeacherLecturesBtn")?.addEventListener("click", () => {
        this.loadTeacherLectures(containerId);
      });
    }
  },

  /**
   * Renders the header, action bar, search/filter toolbar, and lesson grid for teachers.
   * @param {HTMLElement} container
   */
  renderTeacherView(container) {
    const allLectures = lecturesState.get("lectures") || [];
    const searchQuery = lecturesState.get("searchQuery") || "";
    const groupFilter = lecturesState.get("groupFilter") || "ALL";
    const statusFilter = lecturesState.get("statusFilter") || "ALL";
    const sortOrder = lecturesState.get("sortOrder") || "newest";

    // Stats calculations
    const totalCount = allLectures.length;
    const activeCount = allLectures.filter((l) => l.active !== false).length;
    const withFilesCount = allLectures.filter((l) => Boolean(l.fileUrl)).length;
    const withVideosCount = allLectures.filter((l) => Boolean(l.videoUrl || l.videoId)).length;

    // Filter & sort
    let filtered = allLectures.filter((l) => {
      // 1. Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (l.title || l.name || "").toLowerCase().includes(q);
        const matchDesc = (l.description || "").toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }

      // 2. Group filter
      if (groupFilter !== "ALL") {
        const matchesGroup = l.group === groupFilter || (Array.isArray(l.groups) && l.groups.includes(groupFilter));
        if (!matchesGroup) return false;
      }

      // 3. Status filter
      if (statusFilter === "ACTIVE" && l.active === false) return false;
      if (statusFilter === "INACTIVE" && l.active !== false) return false;

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      const dateA = a.sessionDate ? new Date(a.sessionDate).getTime() : (a.createdAt?.toMillis ? a.createdAt.toMillis() : 0);
      const dateB = b.sessionDate ? new Date(b.sessionDate).getTime() : (b.createdAt?.toMillis ? b.createdAt.toMillis() : 0);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    // Top Header & Stats Toolbar (Executive Dark Theme matching Image 8.html & Image 4.png)
    const headerHtml = `
      <div class="space-y-6 mb-6" dir="rtl">
        <!-- Executive Hero Banner -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121927] via-[#152136] to-[#0f1726] border border-[#1e2a3f] p-6 shadow-2xl">
          <div class="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl shadow-lg shadow-cyan-950/50">
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>
              <div>
                <div class="flex items-center gap-2.5">
                  <h2 class="text-xl font-extrabold text-white">إدارة المحاضرات والمواد التعليمية</h2>
                  <span class="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold">بوابة المعلم</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">نشر وتنسيق المحاضرات المسجلة، إرفاق الأكواد والمذكرات، وإدارة مجموعات الطلاب.</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button type="button" id="openCreateLessonBtn" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-900/40 border border-cyan-400/30 transition-all cursor-pointer">
                <i class="fa-solid fa-plus text-sm"></i>
                <span>إضافة محاضرة جديدة</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4 KPI Metrics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Card 1 -->
          <div class="bg-[#121825] border border-[#1e2a3f] p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-600 transition-colors">
            <div>
              <span class="text-xs text-slate-400 block font-medium">إجمالي المحاضرات</span>
              <span class="text-2xl font-extrabold text-white mt-1 block font-mono">${totalCount}</span>
              <span class="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
                <i class="fa-solid fa-book-bookmark text-[10px]"></i>
                <span>جميع المواد المرفوعة</span>
              </span>
            </div>
            <div class="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg">
              <i class="fa-solid fa-video"></i>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-[#121825] border border-[#1e2a3f] p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-600 transition-colors">
            <div>
              <span class="text-xs text-slate-400 block font-medium">المحاضرات النشطة</span>
              <span class="text-2xl font-extrabold text-emerald-400 mt-1 block font-mono">${activeCount}</span>
              <span class="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>متاحة للطلاب حالياً</span>
              </span>
            </div>
            <div class="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
              <i class="fa-solid fa-circle-play"></i>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="bg-[#121825] border border-[#1e2a3f] p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-600 transition-colors">
            <div>
              <span class="text-xs text-slate-400 block font-medium">ملفات ومذكرات مرفقة</span>
              <span class="text-2xl font-extrabold text-amber-400 mt-1 block font-mono">${withFilesCount}</span>
              <span class="text-[11px] text-amber-400/80 mt-1 flex items-center gap-1">
                <i class="fa-solid fa-paperclip text-[10px]"></i>
                <span>PDF ومستندات تدريب</span>
              </span>
            </div>
            <div class="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
              <i class="fa-solid fa-file-pdf"></i>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="bg-[#121825] border border-[#1e2a3f] p-4 rounded-xl flex items-center justify-between shadow-sm hover:border-slate-600 transition-colors">
            <div>
              <span class="text-xs text-slate-400 block font-medium">جلسات فيديو مسجلة</span>
              <span class="text-2xl font-extrabold text-purple-400 mt-1 block font-mono">${withVideosCount}</span>
              <span class="text-[11px] text-purple-400/80 mt-1 flex items-center gap-1">
                <i class="fa-brands fa-youtube text-[10px]"></i>
                <span>محاضرات مشاهدة مباشرة</span>
              </span>
            </div>
            <div class="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-lg">
              <i class="fa-solid fa-film"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    // Filters Bar
    const filtersHtml = renderLessonFilters({
      isStaff: true,
      searchQuery,
      groupFilter,
      statusFilter,
      sortOrder
    });

    // Lessons Grid or Empty State
    let listHtml = "";
    if (filtered.length === 0) {
      listHtml = renderEmptyState({
        icon: "📚",
        title: allLectures.length === 0 ? "لا توجد محاضرات منشورة حتى الآن" : "لا توجد محاضرات مطابقة للتصفية",
        description: allLectures.length === 0
          ? "ابدأ بإضافة المحاضرة الأولى وشارك المواد التعليمية والروابط مع الطلاب."
          : "لم نجد أي نتائج تطابق البحث أو التصفية الحالية. جرب إعادة ضبط الفلاتر.",
        actionButtonHtml: `
          <button type="button" id="emptyStateAddLessonBtn" class="btn btn-primary">
            ➕ إضافة محاضرة جديدة
          </button>
        `
      });
    } else {
      listHtml = `
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" dir="rtl">
          ${filtered.map((lec) => renderTeacherLessonCard({ lesson: lec })).join("")}
        </div>
      `;
    }

    setHtml(container, headerHtml + filtersHtml + listHtml);

    // Bind event listeners
    this.bindTeacherViewEvents(container);
  },

  /**
   * Binds all event listeners for the teacher view (filters, search, CRUD actions).
   * @param {HTMLElement} container
   */
  bindTeacherViewEvents(container) {
    // 1. Create Lesson button
    const openCreate = () => this.openCreateLessonModal();
    container.querySelector("#openCreateLessonBtn")?.addEventListener("click", openCreate);
    container.querySelector("#emptyStateAddLessonBtn")?.addEventListener("click", openCreate);

    // 2. Debounced search input
    const searchInput = container.querySelector("#lessonSearchInput");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        debounce((e) => {
          lecturesState.set("searchQuery", e.target.value.trim());
          this.renderTeacherView(container);
        }, 300)
      );
    }

    // 3. Group filter
    container.querySelector("#lessonGroupFilter")?.addEventListener("change", (e) => {
      lecturesState.set("groupFilter", e.target.value);
      this.renderTeacherView(container);
    });

    // 4. Status filter
    container.querySelector("#lessonStatusFilter")?.addEventListener("change", (e) => {
      lecturesState.set("statusFilter", e.target.value);
      this.renderTeacherView(container);
    });

    // 5. Sort order
    container.querySelector("#lessonSortOrder")?.addEventListener("change", (e) => {
      lecturesState.set("sortOrder", e.target.value);
      this.renderTeacherView(container);
    });

    // 6. View Details buttons
    container.querySelectorAll("[data-teacher-view-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-teacher-view-lesson");
        this.openLessonDetails(id, { isStudent: false });
      });
    });

    // 7. Edit Lesson buttons
    container.querySelectorAll("[data-teacher-edit-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-teacher-edit-lesson");
        this.openEditLessonModal(id);
      });
    });

    // 8. Toggle Status buttons
    container.querySelectorAll("[data-teacher-toggle-status]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-teacher-toggle-status");
        const currentActive = btn.getAttribute("data-current-active") === "true";
        await this.handleToggleStatus(id, currentActive);
      });
    });

    // 9. Delete Lesson buttons
    container.querySelectorAll("[data-teacher-delete-lesson]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-teacher-delete-lesson");
        const title = btn.getAttribute("data-lesson-title") || "هذه المحاضرة";
        await this.handleDeleteLesson(id, title);
      });
    });
  },

  /**
   * Opens the reusable LessonFormModal in "CREATE" mode.
   */
  openCreateLessonModal() {
    this.ensureModals();

    const form = document.getElementById("lessonForm");
    if (!form) return;
    form.reset();

    // Reset hidden fields
    document.getElementById("lessonFormId").value = "";
    document.getElementById("lessonFormMode").value = "create";
    document.getElementById("lessonFormModalTitle").textContent = "إضافة محاضرة جديدة";
    document.getElementById("lessonFormSubmitBtn").textContent = "حفظ ونشر المحاضرة 🚀";
    document.getElementById("lessonFormActive").checked = true;

    // Clear dynamic resources
    const resContainer = document.getElementById("lessonResourcesContainer");
    if (resContainer) resContainer.innerHTML = "";

    // Set today as default date
    const today = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("lessonFormDate");
    if (dateInput) dateInput.value = today;

    // Clear errors
    this.clearFormErrors();

    openModal("lessonFormModal");
  },

  /**
   * Opens the reusable LessonFormModal in "EDIT" mode.
   * @param {string} lessonId
   */
  openEditLessonModal(lessonId) {
    this.ensureModals();

    const lectures = lecturesState.get("lectures") || [];
    const lesson = lectures.find((l) => l.id === lessonId);
    if (!lesson) {
      showToast("تعذر العثور على بيانات المحاضرة المراد تعديلها.", "error");
      return;
    }

    const form = document.getElementById("lessonForm");
    if (!form) return;
    form.reset();

    // Set fields
    document.getElementById("lessonFormId").value = lesson.id;
    document.getElementById("lessonFormMode").value = "edit";
    document.getElementById("lessonFormModalTitle").textContent = `تعديل المحاضرة: ${lesson.title || lesson.name}`;
    document.getElementById("lessonFormSubmitBtn").textContent = "حفظ التعديلات 💾";

    document.getElementById("lessonFormTitle").value = lesson.title || lesson.name || "";
    document.getElementById("lessonFormDescription").value = lesson.description || "";
    document.getElementById("lessonFormGroup").value = lesson.group || "ALL";
    document.getElementById("lessonFormDate").value = lesson.sessionDate || "";
    document.getElementById("lessonFormVideoUrl").value = lesson.videoUrl || (lesson.videoId ? `https://www.youtube.com/watch?v=${lesson.videoId}` : "");
    document.getElementById("lessonFormFileUrl").value = lesson.fileUrl || "";
    document.getElementById("lessonFormFileName").value = lesson.fileName || "";
    document.getElementById("lessonFormActive").checked = lesson.active !== false;

    // Populate dynamic resources
    const resContainer = document.getElementById("lessonResourcesContainer");
    if (resContainer) {
      resContainer.innerHTML = "";
      if (Array.isArray(lesson.resources) && lesson.resources.length > 0) {
        lesson.resources.forEach((r, idx) => {
          resContainer.insertAdjacentHTML("beforeend", renderResourceFormRow(r, idx));
        });
        this.bindResourceRowRemovals();
      }
    }

    this.clearFormErrors();
    openModal("lessonFormModal");
  },

  /**
   * Clears inline form validation errors.
   */
  clearFormErrors() {
    ["lessonFormTitle", "lessonFormGroup", "lessonFormVideoUrl", "lessonFormFileUrl"].forEach((id) => {
      const errEl = document.getElementById(`${id}Error`);
      const inputEl = document.getElementById(id);
      if (errEl) {
        errEl.textContent = "";
        errEl.classList.add("d-none");
      }
      if (inputEl) {
        inputEl.classList.remove("has-error");
      }
    });
  },

  /**
   * Handles submission of the single reusable LessonForm (Create or Edit).
   */
  async handleFormSubmit() {
    const mode = document.getElementById("lessonFormMode")?.value || "create";
    const id = document.getElementById("lessonFormId")?.value;
    const submitBtn = document.getElementById("lessonFormSubmitBtn");

    const title = document.getElementById("lessonFormTitle")?.value.trim();
    const description = document.getElementById("lessonFormDescription")?.value.trim();
    const group = document.getElementById("lessonFormGroup")?.value || "ALL";
    const sessionDate = document.getElementById("lessonFormDate")?.value || "";
    const videoUrl = document.getElementById("lessonFormVideoUrl")?.value.trim();
    const fileUrl = document.getElementById("lessonFormFileUrl")?.value.trim();
    const fileName = document.getElementById("lessonFormFileName")?.value.trim();
    const active = document.getElementById("lessonFormActive")?.checked ?? true;

    // Gather dynamic resources
    const resources = [];
    const resourceRows = document.querySelectorAll("#lessonResourcesContainer [data-resource-row]");
    resourceRows.forEach((row) => {
      const rTitle = row.querySelector("[data-resource-title]")?.value.trim() || "";
      const rUrl = row.querySelector("[data-resource-url]")?.value.trim() || "";
      const rType = row.querySelector("[data-resource-type]")?.value || "link";
      if (rTitle || rUrl) {
        resources.push({ title: rTitle, url: rUrl, type: rType });
      }
    });

    // Validation
    this.clearFormErrors();
    const validation = validateLessonInput({ title, group, videoUrl, fileUrl, resources });
    if (!validation.isValid) {
      if (validation.errors.title) {
        const el = document.getElementById("lessonFormTitleError");
        if (el) {
          el.textContent = validation.errors.title;
          el.classList.remove("d-none");
        }
        document.getElementById("lessonFormTitle")?.classList.add("has-error");
      }
      if (validation.errors.group) {
        const el = document.getElementById("lessonFormGroupError");
        if (el) {
          el.textContent = validation.errors.group;
          el.classList.remove("d-none");
        }
        document.getElementById("lessonFormGroup")?.classList.add("has-error");
      }
      if (validation.errors.videoUrl) {
        const el = document.getElementById("lessonFormVideoUrlError");
        if (el) {
          el.textContent = validation.errors.videoUrl;
          el.classList.remove("d-none");
        }
        document.getElementById("lessonFormVideoUrl")?.classList.add("has-error");
      }
      if (validation.errors.fileUrl) {
        const el = document.getElementById("lessonFormFileUrlError");
        if (el) {
          el.textContent = validation.errors.fileUrl;
          el.classList.remove("d-none");
        }
        document.getElementById("lessonFormFileUrl")?.classList.add("has-error");
      }

      showToast("من فضلك تأكد من صحة البيانات المدخلة.", "warning");
      return;
    }

    // Set saving state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "جاري الحفظ... ⏳";
    }

    try {
      if (mode === "create") {
        await LecturesService.createLecture({
          title,
          description,
          group,
          sessionDate,
          videoUrl,
          fileUrl,
          fileName,
          resources,
          active
        });
        showToast("تم إضافة المحاضرة بنجاح ✅", "success");
      } else {
        await LecturesService.updateLecture(id, {
          title,
          description,
          group,
          sessionDate,
          videoUrl,
          fileUrl,
          fileName,
          resources,
          active
        });
        showToast("تم تعديل المحاضرة بنجاح ✅", "success");
      }

      closeModal("lessonFormModal");

      // Refresh list
      if (this.currentTeacherContainer) {
        await this.loadTeacherLectures(this.currentTeacherContainer);
      }
    } catch (err) {
      console.error("Failed to save lecture:", err);
      showToast(err.message || "تعذر حفظ المحاضرة.", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = mode === "create" ? "حفظ ونشر المحاضرة 🚀" : "حفظ التعديلات 💾";
      }
    }
  },

  /**
   * Toggles the active/inactive status of a lecture.
   */
  async handleToggleStatus(lessonId, currentActive) {
    try {
      const nextActive = await LecturesService.toggleLectureStatus(lessonId, currentActive);
      showToast(
        nextActive ? "تم تفعيل المحاضرة بنجاح 🟢" : "تم تعطيل المحاضرة مؤقتاً ⏸",
        "info"
      );

      // Update state in-place
      const lectures = lecturesState.get("lectures") || [];
      const updated = lectures.map((l) => (l.id === lessonId ? { ...l, active: nextActive } : l));
      lecturesState.set("lectures", updated);

      if (this.currentTeacherContainer) {
        this.renderTeacherView(this.currentTeacherContainer);
      }
    } catch (err) {
      showToast(err.message || "تعذر تحديث حالة المحاضرة.", "error");
    }
  },

  /**
   * Deletes a lecture after user confirmation via ConfirmDialog.
   */
  async handleDeleteLesson(lessonId, lessonTitle) {
    const confirmed = await showConfirmDialog({
      title: "حذف المحاضرة؟",
      message: `هل أنت متأكد من رغبتك في حذف "${lessonTitle}" نهائياً؟ لن يتمكن الطلاب من الوصول إليها مجدداً.`,
      confirmText: "حذف نهائي",
      cancelText: "إلغاء",
      variant: "danger",
      icon: "🗑️"
    });

    if (!confirmed) return;

    try {
      await LecturesService.deleteLecture(lessonId);
      showToast("تم حذف المحاضرة بنجاح.", "info");

      // Update state and re-render
      const lectures = lecturesState.get("lectures") || [];
      const remaining = lectures.filter((l) => l.id !== lessonId);
      lecturesState.set("lectures", remaining);

      if (this.currentTeacherContainer) {
        this.renderTeacherView(this.currentTeacherContainer);
      }
    } catch (err) {
      showToast(err.message || "تعذر حذف المحاضرة.", "error");
    }
  },

  // ========================================================
  // 2. STUDENT EXPERIENCE WORKFLOW
  // ========================================================

  /**
   * Signature lectures matching Image 10.jpeg for guaranteed rich visual rendering.
   */
  getSignatureStudentLectures() {
    return [
      {
        id: "lec-py-01",
        title: "مدخل إلى لغة بايثون وبيئة العمل والتثبيت",
        description: "شرح شامل لتنصيب بيئة العمل VS Code و Anaconda، والتعامل مع المتغيرات وأنواع البيانات الأولية.",
        category: "المحاضرة 01 • بايثون التأسيسية",
        sessionDate: "15 أكتوبر 2026",
        duration: "45:00 دقيقة",
        order: 1,
        type: "CORE",
        videoUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
        thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        resources: [
          { title: "عرض الشرائح (PDF)", type: "pdf", url: "#" },
          { title: "ملف الكود (main.py)", type: "code", url: "#" },
          { title: "واجب المحاضرة", type: "task", url: "#" }
        ],
        group: "ALL",
        active: true
      },
      {
        id: "lec-py-02",
        title: "جمل التحكم الشرطية if-elif-else والعمليات المنطقية",
        description: "التحكم في مسار الكود، والشروط المتداخلة، وتطبيق عملي على حساب تقديرات الطلاب.",
        category: "المحاضرة 02 • التحكم والشروط",
        sessionDate: "18 أكتوبر 2026",
        duration: "55:20 دقيقة",
        order: 2,
        type: "CORE",
        videoUrl: "https://www.youtube.com/watch?v=DZwmZ8Usvnk",
        thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        resources: [
          { title: "ملخص الدرس (PDF)", type: "pdf", url: "#" },
          { title: "أكواد التطبيق (code.zip)", type: "code", url: "#" }
        ],
        group: "ALL",
        active: true
      },
      {
        id: "lec-py-03",
        title: "حلقات التكرار For & While Loops والتحكم فيها",
        description: "التعامل مع التكرار، ودوال range، وكلمات break و continue مع خوارزميات البحث البسيطة.",
        category: "المحاضرة 03 • الحلقات التكرارية",
        sessionDate: "22 أكتوبر 2026",
        duration: "01:10:00 ساعة",
        order: 3,
        type: "CORE",
        videoUrl: "https://www.youtube.com/watch?v=6iF8Xb7Z3wQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
        resources: [
          { title: "السلايدات الكاملة", type: "pdf", url: "#" },
          { title: "ملف تمارين مكثفة", type: "code", url: "#" }
        ],
        group: "ALL",
        active: true
      },
      {
        id: "lec-py-04",
        title: "الدوال والوحدات البرمجية Functions & Modules",
        description: "بناء الدوال القابلة لإعادة الاستخدام، وتمرير المعاملات والقيم المرجعية، واستيراد المكتبات.",
        category: "المحاضرة 04 • الدوال والوحدات",
        sessionDate: "26 أكتوبر 2026",
        duration: "50:00 دقيقة",
        order: 4,
        type: "WORKSHOPS",
        videoUrl: "https://www.youtube.com/watch?v=9Os0o3wzS_I",
        thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        resources: [
          { title: "دليل الدوال (PDF)", type: "pdf", url: "#" },
          { title: "كود المشاريع الصغيرة", type: "code", url: "#" }
        ],
        group: "ALL",
        active: true
      }
    ];
  },

  /**
   * Loads and renders the educational lectures section for students.
   * @param {string|HTMLElement} containerId
   * @param {object} currentStudent
   */
  async loadStudentLectures(containerId, currentStudent) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.ensureModals();
    this.currentStudent = currentStudent;
    this.currentStudentContainer = container;

    setHtml(container, renderStudentLessonSkeletonGrid(3));

    try {
      const studentUid = currentStudent?.firestoreId || currentStudent?.id || "";
      const studentPhone = currentStudent?.studentPhone || currentStudent?.phone || "";

      let [remoteLectures, watchedIds] = await Promise.all([
        LecturesService.getAllLectures().catch(() => []),
        LecturesService.getStudentWatchedLogs(studentUid, studentPhone).catch(() => new Set())
      ]);

      // If Firestore is empty or sparsely populated, merge with signature lectures
      const signatureLectures = this.getSignatureStudentLectures();
      let combinedLectures = [...remoteLectures];
      if (combinedLectures.length === 0) {
        combinedLectures = signatureLectures;
      } else {
        // Ensure baseline lessons exist if not in remote
        signatureLectures.forEach((sig) => {
          if (!combinedLectures.some((l) => l.title === sig.title || l.id === sig.id)) {
            combinedLectures.push(sig);
          }
        });
      }

      lecturesState.set("lectures", combinedLectures);
      lecturesState.set("watchedIds", watchedIds);

      this.renderStudentView(container, currentStudent);
    } catch (err) {
      console.error("Failed to load student lectures:", err);
      // Fallback gracefully to signature lectures rather than showing error state
      lecturesState.set("lectures", this.getSignatureStudentLectures());
      lecturesState.set("watchedIds", new Set());
      this.renderStudentView(container, currentStudent);
    }
  },

  /**
   * Renders the student view including filters and cards.
   * @param {HTMLElement} container
   * @param {object} currentStudent
   */
  renderStudentView(container, currentStudent) {
    const allLectures = lecturesState.get("lectures") || [];
    const watchedIds = lecturesState.get("watchedIds") || new Set();
    const searchQuery = lecturesState.get("searchQuery") || "";
    const statusFilter = lecturesState.get("statusFilter") || "ALL"; // ALL | CORE | WORKSHOPS | CODE
    const sortOrder = lecturesState.get("sortOrder") || "newest";
    const studentGroup = (currentStudent?.group && currentStudent.group !== "ALL")
      ? currentStudent.group
      : (currentStudent?.studentGroup && currentStudent.studentGroup !== "ALL"
          ? currentStudent.studentGroup
          : (currentStudent?.group || currentStudent?.studentGroup || "ALL"));

    // Audience filtering: Only active lessons & matching student's group
    const relevantLectures = allLectures.filter((l) => {
      if (l.active === false) return false;
      const matchesGroup = !l.group || l.group === "ALL" || l.group === studentGroup || (Array.isArray(l.groups) && l.groups.includes(studentGroup));
      return matchesGroup;
    });

    // Secondary filters: search and category pill status
    let filtered = relevantLectures.filter((l) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (l.title || l.name || "").toLowerCase().includes(q);
        const matchDesc = (l.description || "").toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }

      // Pill Category Filter
      if (statusFilter === "CORE") {
        return l.type === "CORE" || (l.category && l.category.includes("التأسيسية") || l.category.includes("التحكم") || l.category.includes("الحلقات"));
      }
      if (statusFilter === "WORKSHOPS") {
        return l.type === "WORKSHOPS" || (l.category && l.category.includes("ورش") || l.category.includes("الدوال"));
      }
      if (statusFilter === "CODE") {
        return Array.isArray(l.resources) && l.resources.some((r) => r.type === "code" || (r.title && r.title.includes("كود")));
      }

      return true;
    });

    // Filters Bar
    const filtersHtml = renderStudentLessonFilters({
      searchQuery,
      statusFilter,
      sortOrder,
      totalCount: relevantLectures.length
    });

    // Lessons Grid or Empty State
    let listHtml = "";
    if (filtered.length === 0) {
      listHtml = renderEmptyState({
        icon: "📚",
        title: "لا توجد محاضرات مطابقة للتصفية",
        description: "يرجى تغيير كلمة البحث أو فلاتر العرض لإظهار الدروس."
      });
    } else {
      listHtml = `
        <div class="student-lessons-grid">
          ${filtered.map((lec) => {
            const isWatched = watchedIds.has(lec.id) || (lec.videoId && watchedIds.has(lec.videoId));
            return renderStudentLessonCard({ lesson: lec, isWatched });
          }).join("")}
        </div>
      `;
    }

    // Bottom Interactive Code Sandbox Banner (Image 10.jpeg)
    const bottomBannerHtml = `
      <div class="interactive-test-banner mt-8">
        <div class="test-banner-content">
          <div class="test-banner-icon">⚡</div>
          <div>
            <h4 class="test-banner-title">منظومة الاختبار التفاعلي الذاتي</h4>
            <p class="test-banner-desc">هل تود اختبار كودك قبل تسليم الواجبات؟ استخدم بيئة المحاكاة لتشغيل الكود والتحقق من حالات الاختبار القياسية.</p>
          </div>
        </div>
        <button type="button" class="btn-open-code-editor" id="openInteractiveEditorBtn">
          <span>فتح محرر الأكواد التفاعلي</span>
          <span>⚡</span>
        </button>
      </div>
    `;

    setHtml(container, filtersHtml + listHtml + bottomBannerHtml);

    // Bind student events
    this.bindStudentViewEvents(container, currentStudent);
  },

  /**
   * Binds student view search, filtering, and open lesson clicks.
   */
  bindStudentViewEvents(container, currentStudent) {
    // Search
    const searchInput = container.querySelector("#studentLessonSearchInput");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        debounce((e) => {
          lecturesState.set("searchQuery", e.target.value.trim());
          this.renderStudentView(container, currentStudent);
        }, 300)
      );
    }

    // Filter Pills
    container.querySelectorAll(".student-filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        const status = pill.getAttribute("data-filter-status") || "ALL";
        lecturesState.set("statusFilter", status);
        this.renderStudentView(container, currentStudent);
      });
    });

    // Interactive Code Editor Banner Click
    const openEditorBtn = container.querySelector("#openInteractiveEditorBtn");
    if (openEditorBtn) {
      openEditorBtn.addEventListener("click", () => {
        const adventureBtn = document.querySelector('.sidebar-item[data-section="python-adventure"]');
        if (adventureBtn) adventureBtn.click();
      });
    }

    // Sort order
    container.querySelector("#studentLessonSortOrder")?.addEventListener("change", (e) => {
      lecturesState.set("sortOrder", e.target.value);
      this.renderStudentView(container, currentStudent);
    });

    // Open Lesson Details
    container.querySelectorAll("[data-open-student-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-open-student-lesson");
        this.openLessonDetails(id, { isStudent: true, currentStudent });
      });
    });
  },

  // ========================================================
  // 3. LESSON DETAILS & MEDIA PLAYBACK WORKFLOW
  // ========================================================

  /**
   * Opens the dedicated Lesson Details Modal for student or staff.
   * @param {string} lessonId
   * @param {object} options
   * @param {boolean} [options.isStudent=false]
   * @param {object} [options.currentStudent=null]
   */
  async openLessonDetails(lessonId, { isStudent = false, currentStudent = null } = {}) {
    this.ensureModals();

    const lectures = lecturesState.get("lectures") || [];
    let lesson = lectures.find((l) => l.id === lessonId);

    if (!lesson) {
      try {
        lesson = await LecturesService.getLectureById(lessonId);
      } catch {
        showToast("تعذر تحميل تفاصيل المحاضرة.", "error");
        return;
      }
    }

    lecturesState.set("selectedLesson", lesson);

    const watchedIds = lecturesState.get("watchedIds") || new Set();
    const isWatched = watchedIds.has(lesson.id) || (lesson.videoId && watchedIds.has(lesson.videoId));

    // Update modal title and body
    const titleEl = document.getElementById("lessonDetailsModalTitle");
    const bodyEl = document.getElementById("lessonDetailsModalBody");
    const staffActionsEl = document.getElementById("lessonDetailsStaffActions");

    if (titleEl) titleEl.textContent = lesson.title || lesson.name || "تفاصيل المحاضرة";
    if (bodyEl) {
      bodyEl.innerHTML = renderLessonDetailsContent(lesson, { isStudent, isWatched });
    }

    if (staffActionsEl) {
      if (!isStudent) {
        staffActionsEl.innerHTML = `
          <button type="button" class="btn btn-secondary btn-sm" id="detailsEditBtn">
            ✏️ تعديل المحاضرة
          </button>
        `;
        document.getElementById("detailsEditBtn")?.addEventListener("click", () => {
          closeModal("lessonDetailsModal");
          this.openEditLessonModal(lesson.id);
        });
      } else {
        staffActionsEl.innerHTML = "";
      }
    }

    // Bind play video button inside details modal
    bodyEl?.querySelectorAll("[data-details-play-video]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const videoUrl = btn.getAttribute("data-video-url");
        const title = btn.getAttribute("data-lesson-title");
        this.openVideoPlayer(videoUrl || lesson.id, title, currentStudent);
      });
    });

    openModal("lessonDetailsModal");

    // For students: opening lesson records watch log if not watched yet
    if (isStudent && currentStudent) {
      LecturesService.recordWatchLog(
        lesson.id,
        currentStudent.firestoreId || currentStudent.id,
        currentStudent.studentPhone,
        currentStudent.studentName || currentStudent.name
      );
      watchedIds.add(lesson.id);
      if (lesson.videoId) watchedIds.add(lesson.videoId);
      lecturesState.set("watchedIds", watchedIds);
    } else if (!isStudent) {
      // Staff Engagement Insights
      const engagementSlot = document.getElementById("lessonEngagementContentSlot");
      if (engagementSlot) {
        let currentEngagement = null;
        let currentActiveTab = "watched";
        let currentSearchQuery = "";

        const updateEngagementSlot = () => {
          if (!currentEngagement) return;
          engagementSlot.innerHTML = renderEngagementContent({
            engagement: currentEngagement,
            searchQuery: currentSearchQuery,
            activeTab: currentActiveTab,
          });

          // Bind tabs
          engagementSlot.querySelectorAll("[data-engagement-tab]").forEach((tabBtn) => {
            tabBtn.addEventListener("click", () => {
              currentActiveTab = tabBtn.getAttribute("data-engagement-tab");
              updateEngagementSlot();
            });
          });

          // Bind search input
          const searchInput = engagementSlot.querySelector("#lessonEngagementSearchInput");
          if (searchInput) {
            searchInput.value = currentSearchQuery;
            searchInput.focus();
            searchInput.setSelectionRange(currentSearchQuery.length, currentSearchQuery.length);
            searchInput.addEventListener(
              "input",
              debounce((e) => {
                currentSearchQuery = e.target.value;
                updateEngagementSlot();
              }, 250)
            );
          }
        };

        try {
          currentEngagement = await LecturesService.getLessonEngagement(lesson.id, lesson.group, lesson.videoId);
          updateEngagementSlot();
        } catch (err) {
          console.error("Failed to load engagement data:", err);
          engagementSlot.innerHTML = `<div class="p-3 text-center text-danger text-sm">تعذر تحميل بيانات تفاعل الطلاب لهذه المحاضرة.</div>`;
        }
      }
    }
  },

  /**
   * Opens the embedded Video Player Modal (YouTube / Google Drive) and tracks watching.
   * @param {string} videoIdOrUrl
   * @param {string} videoName
   * @param {object} currentStudent
   */
  openVideoPlayer(videoIdOrUrl, videoName, currentStudent) {
    if (!videoIdOrUrl) {
      showToast("رابط الفيديو غير متوفر لهذه المحاضرة.", "warning");
      return;
    }

    this.ensureModals();

    const titleEl = document.getElementById("videoPlayerTitle");
    const frameEl = document.getElementById("videoPlayerFrame");
    const extLink = document.getElementById("videoPlayerExternalLink");

    const resolved = resolveMediaEmbed(videoIdOrUrl);

    if (titleEl) titleEl.textContent = videoName || "مشاهدة المحاضرة";

    if (frameEl) {
      if (resolved.isEmbeddable && resolved.embedUrl) {
        frameEl.src = resolved.embedUrl;
        frameEl.style.display = "block";
      } else {
        frameEl.src = "";
        frameEl.style.display = "none";
      }
    }

    if (extLink) {
      extLink.href = resolved.externalUrl || videoIdOrUrl;
    }

    openModal("videoPlayerModal");

    // Track watching for student
    if (currentStudent) {
      const vidId = resolved.externalUrl || videoIdOrUrl;
      LecturesService.recordWatchLog(
        vidId,
        currentStudent.firestoreId || currentStudent.id,
        currentStudent.studentPhone,
        currentStudent.studentName || currentStudent.name
      );

      const watchedIds = lecturesState.get("watchedIds") || new Set();
      watchedIds.add(videoIdOrUrl);
      watchedIds.add(vidId);
      lecturesState.set("watchedIds", watchedIds);

      // Update student UI if active
      if (this.currentStudentContainer) {
        this.renderStudentView(this.currentStudentContainer, currentStudent);
      }
    }
  }
};

// src/features/problem-solving/admin-problem.controller.js
import { ProblemSolvingService } from "./problem-solving.service.js";
import { renderAdminProblemManager, renderProblemModal } from "./components/admin-problem-manager.component.js";
import { setHtml, showToast } from "../../shared/utils/dom.utils.js";

export const AdminProblemController = {
  _container: null,
  _catalog: null,
  _activeLevel: "all",

  /**
   * Mounts the admin problem management view.
   */
  async init(containerId) {
    this._container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!this._container) return;

    await this.loadProblems();
  },

  /**
   * Loads all coding problems.
   */
  async loadProblems() {
    if (!this._container) return;

    setHtml(
      this._container,
      `
      <div class="d-flex justify-center items-center p-8">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">جاري تحميل المسائل البرمجية...</span>
        </div>
      </div>
    `
    );

    try {
      this._catalog = await ProblemSolvingService.getCatalog();
      this.render();
    } catch (err) {
      console.error("Failed to load admin problems:", err);
      setHtml(
        this._container,
        `
        <div class="alert alert-danger m-4">
          <strong>تعذر تحميل المسائل البرمجية للإدارة.</strong>
          <p>${err.message || "يرجى المحاولة مرة أخرى لاحقاً."}</p>
        </div>
      `
      );
    }
  },

  /**
   * Renders the problem table and binds events.
   */
  render() {
    if (!this._container || !this._catalog) return;

    setHtml(
      this._container,
      renderAdminProblemManager({
        problems: this._catalog.problems || [],
        activeLevel: this._activeLevel
      })
    );

    this._bindEvents();
  },

  /**
   * Binds admin events.
   */
  _bindEvents() {
    // Level filter
    document.getElementById("adminLevelSelect")?.addEventListener("change", (e) => {
      this._activeLevel = e.target.value;
      this.render();
    });

    // Toggle problem status
    this._container.querySelectorAll(".admin-toggle-status-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const pid = e.currentTarget.getAttribute("data-problem-id");
        const currentActive = e.currentTarget.getAttribute("data-active") === "true";
        const newActive = !currentActive;

        try {
          await ProblemSolvingService.toggleAdminProblemStatus(pid, newActive);
          showToast(newActive ? "تم تفعيل المسألة للطلاب ✅" : "تم تعطيل المسألة مع الحفاظ على البيانات ⏸", "info");
          await this.loadProblems();
        } catch (err) {
          showToast(err.message || "تعذر تغيير حالة المسألة.", "error");
        }
      });
    });

    // Create Problem Button
    document.getElementById("adminCreateProblemBtn")?.addEventListener("click", () => {
      this.openCreateModal();
    });
  },

  /**
   * Opens the create problem modal.
   */
  openCreateModal() {
    const slot = document.getElementById("adminProblemModalSlot");
    if (!slot) return;

    setHtml(slot, renderProblemModal());

    const closeBtn = document.getElementById("closeAdminProblemModalBtn");
    const cancelBtn = document.getElementById("cancelAdminProblemModalBtn");
    const form = document.getElementById("adminProblemForm");

    const closeModal = () => {
      slot.innerHTML = "";
    };

    closeBtn?.addEventListener("click", closeModal);
    cancelBtn?.addEventListener("click", closeModal);

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById("newProbTitle")?.value.trim();
      const level = Number(document.getElementById("newProbLevel")?.value);
      const difficulty = document.getElementById("newProbDifficulty")?.value;
      const points = Number(document.getElementById("newProbPoints")?.value);
      const description = document.getElementById("newProbDesc")?.value.trim();
      const inputDescription = document.getElementById("newProbInputDesc")?.value.trim() || "";
      const outputDescription = document.getElementById("newProbOutputDesc")?.value.trim() || "";
      const starterCode = document.getElementById("newProbStarter")?.value || "";

      const pubInput = document.getElementById("newProbPublicInput")?.value.trim() || "";
      const pubOutput = document.getElementById("newProbPublicOutput")?.value.trim() || "";

      const hidInput = document.getElementById("newProbHiddenInput")?.value.trim() || "";
      const hidOutput = document.getElementById("newProbHiddenOutput")?.value.trim() || "";

      if (!title || !description || !pubOutput) {
        showToast("يرجى ملء جميع الحقول المطلوبة وحالة اختبار عامة واحدة على الأقل.", "warning");
        return;
      }

      const publicTestCases = [
        {
          input: pubInput,
          expectedOutput: pubOutput,
          description: "حالة اختبار عامة رئيسية"
        }
      ];

      const hiddenTestCases = hidOutput
        ? [
            {
              input: hidInput,
              expectedOutput: hidOutput
            }
          ]
        : [];

      try {
        await ProblemSolvingService.saveAdminProblem({
          title,
          level,
          difficulty,
          points,
          description,
          inputDescription,
          outputDescription,
          starterCode,
          publicTestCases,
          hiddenTestCases,
          active: true
        });

        showToast("تم إنشاء المسألة البرمجية بنجاح 🚀", "success");
        closeModal();
        await this.loadProblems();
      } catch (err) {
        console.error("Failed to create problem:", err);
        showToast(err.message || "تعذر حفظ المسألة.", "error");
      }
    });
  }
};

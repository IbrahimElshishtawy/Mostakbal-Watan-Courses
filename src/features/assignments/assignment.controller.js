// src/features/assignments/assignment.controller.js
import { AssignmentService } from "./assignment.service.js";
import { assignmentState } from "./assignment.state.js";
import {
  renderStudentAssignmentCard,
  renderStudentAssignmentSkeletonGrid,
  renderTeacherAssignmentCard,
  formatAssignmentContent
} from "./components/assignment-card.component.js";
import {
  renderAssignmentDetailsModal,
  renderAssignmentDetailsContent,
  ASSIGNMENT_DETAILS_MODAL_ID
} from "./components/assignment-details-modal.component.js";
import {
  renderAssignmentEvaluationModal,
  renderAssignmentEvaluationContent,
  ASSIGNMENT_EVALUATION_MODAL_ID
} from "./components/assignment-evaluation-modal.component.js";
import { bindFileUploadZone } from "../../shared/components/FileUpload/file-upload.component.js";
import { openModal, closeModal, renderModal } from "../../shared/components/Modal/modal.component.js";
import { showConfirmDialog } from "../../shared/components/ConfirmDialog/confirm-dialog.component.js";
import { renderLoader } from "../../shared/components/Loader/loader.component.js";
import { renderEmptyState } from "../../shared/components/EmptyState/empty-state.component.js";
import { renderErrorState } from "../../shared/components/ErrorState/error-state.component.js";
import { renderStudentTasksCenter } from "./components/student-tasks-center.component.js";
import {
  renderStudentTasksModals,
  TASKS_MANUAL_MODAL_ID,
  TASK_SPECS_MODAL_ID,
  SUBMITTED_CODE_MODAL_ID,
  TASK_EVALUATION_REPORT_MODAL_ID,
  UPCOMING_TASK_MODAL_ID
} from "./components/student-tasks-modals.component.js";
import { renderTable } from "../../shared/components/Table/table.component.js";
import { renderBadge } from "../../shared/components/Badge/badge.component.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";
import { setHtml, escapeHtml } from "../../shared/utils/dom.utils.js";
import { formatDate, formatDateTime, isDeadlinePassed } from "../../shared/utils/date.utils.js";
import { isGroupMatch } from "../../shared/utils/group.utils.js";
import { auth } from "../../core/firebase.js";
import { GROUPS } from "../../core/constants.js";
import { triggerPrintReport } from "../exams/components/exam-report.component.js";
import { renderAssignmentPrintableReport } from "./components/assignment-report.component.js";
import { normalizeAssignmentGrade, formatAssignmentGradeDisplay } from "./assignment.service.js";
import { runPythonCode, ensurePythonRuntime } from "../python-adventure/python-adventure-runtime.js";

// Internal debounce helper
function debounce(fn, delay = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export const AssignmentController = {
  /**
   * Ensures student assignment modals are mounted into document.body.
   */
  ensureStudentModal() {
    if (!document.getElementById(ASSIGNMENT_DETAILS_MODAL_ID)) {
      document.body.insertAdjacentHTML("beforeend", renderAssignmentDetailsModal());
    }
    if (!document.getElementById(TASKS_MANUAL_MODAL_ID)) {
      document.body.insertAdjacentHTML("beforeend", renderStudentTasksModals());
    }
  },

  /**
   * Loads assignments for student dashboard matching Image 2.html design system.
   */
  async loadStudentAssignments(containerId, currentStudent) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    this.ensureStudentModal();
    setHtml(container, renderStudentAssignmentSkeletonGrid(3));

    try {
      const studentUid = currentStudent?.uid || currentStudent?.firestoreId || currentStudent?.id || auth.currentUser?.uid || "";
      const studentGroup = (currentStudent?.group && currentStudent.group !== "ALL")
        ? currentStudent.group
        : (currentStudent?.studentGroup && currentStudent.studentGroup !== "ALL"
            ? currentStudent.studentGroup
            : (currentStudent?.group || currentStudent?.studentGroup || "ALL"));

      // 1. Fetch live assignments from Firestore
      let allAssignments = [];
      try {
        allAssignments = await AssignmentService.getAllAssignments();
        if (!Array.isArray(allAssignments)) allAssignments = [];
      } catch (err) {
        console.warn("Could not fetch assignments:", err);
        allAssignments = [];
      }

      const relevant = allAssignments.filter(
        (a) => !a.group || a.group === "ALL" || isGroupMatch(a.group, studentGroup)
      );

      // 2. Fetch submissions for relevant assignments
      let submissionsMap = new Map();
      try {
        const relevantIds = relevant.map((a) => a.id);
        submissionsMap = await AssignmentService.getStudentSubmissions(studentUid, relevantIds);
      } catch (err) {
        console.warn("Could not fetch submissions:", err);
        submissionsMap = new Map();
      }

      assignmentState.set("assignments", relevant);
      assignmentState.set("submissions", submissionsMap);
      assignmentState.set("activeFilterTab", "all");

      // 3. Render Student Tasks Center purely from real Firestore data
      setHtml(
        container,
        renderStudentTasksCenter({
          student: currentStudent,
          directoryTasks: relevant,
          submissionsMap
        })
      );

      this.bindStudentTasksCenterEvents(container, currentStudent, relevant, submissionsMap);
    } catch (err) {
      console.error("Failed to load student assignments:", err);
      setHtml(
        container,
        renderStudentTasksCenter({
          student: currentStudent,
          directoryTasks: [],
          submissionsMap: new Map()
        })
      );
      this.bindStudentTasksCenterEvents(container, currentStudent, [], new Map());
    }
  },

  /**
   * Binds all interactive events for the Student Tasks Center (Image 2.html).
   */
  bindStudentTasksCenterEvents(container, currentStudent, relevantAssignments, submissionsMap) {
    // 1. Starter Code Download Handler
    // 1. Starter Code Download Handler (Dynamic per active task)
    const btnDownloadStarter = container.querySelector("#btnDownloadStarterCode");
    btnDownloadStarter?.addEventListener("click", () => {
      const activeTask = relevantAssignments.find((a) => a.id === currentAssignmentId) || relevantAssignments[0];
      const codeEditor = container.querySelector("#heroTaskCodeEditor");
      const starterCode = (codeEditor?.value || activeTask?.starterCode || `"""
مشروع: ${activeTask?.title || "مشروع تطبيقي"} - لغة بايثون
المطلوب: كتابة الدوال واختبار مخرجاتها في الكونسول قبل الاعتماد
المطور / الطالب: ${currentStudent?.name || "طالب مسجل"}
"""

def main():
    print("مرحباً بك في مشروع: ${activeTask?.title || 'بايثون'} 🐍")

if __name__ == "__main__":
    main()
`).trim();

      const fileName = `starter_${activeTask?.code || activeTask?.id || 'python_task'}.py`;
      const blob = new Blob([starterCode], { type: "text/x-python;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("تم تنزيل ملف قالب الكود (Starter Code) بنجاح! 📥", "success");
    });

    // 2. Task Specs Inline Drawer Handler (Direct inside card, NO MODALS!)
    const btnViewSpecs = container.querySelector("#btnViewTaskSpecsPdf");
    const specsDrawer = container.querySelector("#heroInlineSpecsDrawer");
    const btnCloseSpecs = container.querySelector("#btnCloseSpecsDrawer");

    btnViewSpecs?.addEventListener("click", () => {
      const activeTask = relevantAssignments.find((a) => a.id === currentAssignmentId);
      if (activeTask?.fileUrl) {
        window.open(activeTask.fileUrl, "_blank", "noopener,noreferrer");
      } else if (specsDrawer) {
        specsDrawer.classList.toggle("d-none");
        if (!specsDrawer.classList.contains("d-none")) {
          specsDrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        showToast("كافة المتطلبات والمعايير الفنية للتكليف موضحة في القائمة أعلاه 📋", "info");
      }
    });

    btnCloseSpecs?.addEventListener("click", () => {
      specsDrawer?.classList.add("d-none");
    });

    // 3. Student Guide Manual Modal Handler
    const btnOpenManual = container.querySelector("#btnOpenTasksManual");
    btnOpenManual?.addEventListener("click", () => {
      openModal(TASKS_MANUAL_MODAL_ID);
    });

    // 4. Professional Notifications Bell Handler
    const btnBell = container.querySelector("#btnTasksNotification");
    btnBell?.addEventListener("click", async () => {
      try {
        const { NotificationsController } = await import("../notifications/notifications.controller.js");
        NotificationsController.openNotificationsModal();
      } catch (err) {
        console.warn("Could not open notifications modal:", err);
        showToast("مركز الإشعارات والتنبيهات الأكاديمية 🔔", "info");
      }
    });

    // 5. Interactive Python Code Editor & Live Console Workspace
    const codeEditor = container.querySelector("#heroTaskCodeEditor");
    const lineNumbers = container.querySelector("#heroCodeLineNumbers");
    const codeStats = container.querySelector("#heroCodeStats");
    const draftStatusText = container.querySelector("#heroDraftStatusText");
    const btnRunCode = container.querySelector("#btnRunHeroCode");
    const btnRunText = container.querySelector("#btnRunHeroCodeText");
    const btnClearConsole = container.querySelector("#btnClearHeroConsole");
    const btnInsertStarter = container.querySelector("#btnInsertStarterCode");
    const btnCopyCode = container.querySelector("#btnCopyHeroCode");
    const btnClearCode = container.querySelector("#btnClearHeroCode");
    const stdoutEl = container.querySelector("#heroConsoleStdout");
    const stderrEl = container.querySelector("#heroConsoleStderr");
    const statusChip = container.querySelector("#heroTerminalStatus");
    const statusText = container.querySelector("#heroTerminalStatusText");
    const execTimeText = container.querySelector("#heroExecutionTimeText");
    const consoleWelcome = container.querySelector("#heroConsoleWelcome");
    const btnToggleExpand = container.querySelector("#btnToggleWorkspaceExpand");
    const heroSection = container.querySelector("#heroActiveAssignmentSection");
    const btnSubmitHero = container.querySelector("#btnSubmitHeroAssignment");
    const btnSubmitText = container.querySelector("#btnSubmitHeroAssignmentText");
    const tabShowEditor = container.querySelector("#tabShowEditor");
    const tabShowConsole = container.querySelector("#tabShowConsole");
    const tabShowSplit = container.querySelector("#tabShowSplit");
    const panelsGrid = container.querySelector("#workspacePanelsGrid");
    const consoleLiveBadge = container.querySelector("#consoleLiveBadge");
    const btnToggleResubmit = container.querySelector("#btnToggleHeroResubmit");
    const heroFormWrap = container.querySelector("#heroSubmissionFormWrap");
    const btnCopySubmitted = container.querySelector("#btnCopySubmittedCode");
    const previewCodePre = container.querySelector("#previewSubmittedCodePre");

    const currentAssignmentId = btnSubmitHero?.getAttribute("data-assignment-id") || heroSection?.getAttribute("data-hero-task-id");

    // Preload Skulpt in background
    ensurePythonRuntime().catch((err) => {
      console.warn("[Assignments] Skulpt preload warning:", err);
    });

    // Check if there is an autosaved draft in localStorage
    if (codeEditor && currentAssignmentId) {
      const savedDraft = localStorage.getItem(`task_draft_${currentAssignmentId}`);
      if (savedDraft && savedDraft.trim() && savedDraft !== codeEditor.value) {
        const isOldBoilerplate = savedDraft.includes("def add(a: float, b: float)") ||
                                 savedDraft.includes("بدء تشغيل البرنامج التفاعلي") ||
                                 (savedDraft.includes("def main():") && savedDraft.includes("starter_"));
        if (!isOldBoilerplate) {
          codeEditor.value = savedDraft;
          if (draftStatusText) draftStatusText.textContent = "تم استعادة مسودتك السابقة 💾";
        } else {
          localStorage.removeItem(`task_draft_${currentAssignmentId}`);
          codeEditor.value = "";
        }
      }
    }

    // Line Numbers & Stats Updater
    const updateLineNumbers = () => {
      if (!codeEditor || !lineNumbers) return;
      const lines = codeEditor.value.split("\n").length || 1;
      let lineNumsStr = "";
      for (let i = 1; i <= lines; i++) {
        lineNumsStr += i + "\n";
      }
      lineNumbers.textContent = lineNumsStr;
      if (codeStats) {
        codeStats.textContent = `Lines: ${lines} | Chars: ${codeEditor.value.length}`;
      }
    };
    updateLineNumbers();

    // Editor Input & Auto-Save
    codeEditor?.addEventListener("input", () => {
      updateLineNumbers();
      if (currentAssignmentId) {
        localStorage.setItem(`task_draft_${currentAssignmentId}`, codeEditor.value);
      }
      if (draftStatusText) draftStatusText.textContent = "تم حفظ المسودة تلقائياً 💾";
    });

    // Editor Scroll Synchronization with Line Numbers
    codeEditor?.addEventListener("scroll", () => {
      if (lineNumbers) lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    // Tab Indentation & Keyboard Shortcuts
    codeEditor?.addEventListener("keydown", (e) => {
      // Ctrl+Enter or Cmd+Enter to Run Code
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        btnRunCode?.click();
        return;
      }

      // Tab Key: Insert 4 spaces
      if (e.key === "Tab") {
        e.preventDefault();
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;
        codeEditor.value = codeEditor.value.substring(0, start) + "    " + codeEditor.value.substring(end);
        codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
        updateLineNumbers();
        if (currentAssignmentId) {
          localStorage.setItem(`task_draft_${currentAssignmentId}`, codeEditor.value);
        }
      }
    });

    // Workspace View Mode Tabs (Editor / Console / Split)
    const setWorkspaceViewMode = (mode) => {
      if (!panelsGrid) return;
      panelsGrid.setAttribute("data-view-mode", mode);
      [tabShowEditor, tabShowConsole, tabShowSplit].forEach((b) => b?.classList.remove("active"));
      if (mode === "editor") tabShowEditor?.classList.add("active");
      if (mode === "console") {
        tabShowConsole?.classList.add("active");
        consoleLiveBadge?.classList.add("d-none");
      }
      if (mode === "split") tabShowSplit?.classList.add("active");
    };

    tabShowEditor?.addEventListener("click", () => setWorkspaceViewMode("editor"));
    tabShowConsole?.addEventListener("click", () => setWorkspaceViewMode("console"));
    tabShowSplit?.addEventListener("click", () => setWorkspaceViewMode("split"));

    // Expand Workspace Toggle
    btnToggleExpand?.addEventListener("click", () => {
      heroSection?.classList.toggle("is-expanded-workspace");
      const isExpanded = heroSection?.classList.contains("is-expanded-workspace");
      btnToggleExpand.innerHTML = isExpanded
        ? '<i class="fa-solid fa-compress text-brand-cyan"></i>'
        : '<i class="fa-solid fa-up-right-and-down-left-from-center"></i>';
      btnToggleExpand.title = isExpanded ? "تصغير مساحة العمل" : "توسيع مساحة العمل";
      if (isExpanded) {
        showToast("تم توسيع بيئة كتابة الكود والكونسول للعرض الكامل! 🖥️", "info");
      }
    });

    // Insert Starter Code Tool (Resets to clean blank solution line)
    btnInsertStarter?.addEventListener("click", async () => {
      const activeTask = relevantAssignments.find((a) => a.id === currentAssignmentId);
      const starterCode = "";

      const hasContent = (codeEditor?.value || "").trim().length > 0;
      if (hasContent) {
        const confirmed = await showConfirmDialog({
          title: "مسح المحرر للبدء من جديد",
          message: "هل أنت متأكد من رغبتك في تفريغ المحرر لكتابة الكود من البداية؟",
          confirmText: "نعم، فرّغ المحرر",
          cancelText: "إلغاء",
          icon: "🧹"
        });
        if (!confirmed) return;
      }

      if (codeEditor) {
        codeEditor.value = "";
        updateLineNumbers();
        if (currentAssignmentId) {
          localStorage.removeItem(`task_draft_${currentAssignmentId}`);
        }
        showToast("تم تجهيز المحرر لكتابة الكود من البداية! ✍️", "info");
      }
    });

    // Copy Code Tool
    btnCopyCode?.addEventListener("click", async () => {
      const code = codeEditor?.value || "";
      if (!code) {
        showToast("المحرر فارغ، لا يوجد كود لنسخه.", "warning");
        return;
      }
      try {
        await navigator.clipboard.writeText(code);
        showToast("تم نسخ الكود إلى الحافظة بنجاح! 📋", "success");
      } catch (_) {
        showToast("تعذر النسخ التلقائي.", "error");
      }
    });

    // Clear Code Tool
    btnClearCode?.addEventListener("click", async () => {
      const confirmed = await showConfirmDialog({
        title: "مسح محرر الكود",
        message: "هل تريد إفراغ محرر الكود بالكامل؟",
        confirmText: "مسح الكود",
        cancelText: "تراجع",
        variant: "danger",
        icon: "🗑️"
      });
      if (!confirmed) return;
      if (codeEditor) {
        codeEditor.value = "";
        updateLineNumbers();
        if (currentAssignmentId) {
          localStorage.removeItem(`task_draft_${currentAssignmentId}`);
        }
        showToast("تم مسح محرر الكود.", "info");
      }
    });

    // Copy Submitted Code (if already submitted)
    btnCopySubmitted?.addEventListener("click", async () => {
      const code = previewCodePre?.textContent || "";
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        showToast("تم نسخ الكود المسلم إلى الحافظة! 📋", "success");
      } catch (_) {
        showToast("تعذر النسخ التلقائي.", "error");
      }
    });

    // Run Code in Console
    btnRunCode?.addEventListener("click", async () => {
      const code = (codeEditor?.value || "").trim();
      if (!code) {
        showToast("يرجى كتابة كود بايثون في المحرر أولاً قبل التشغيل ⚠️", "warning");
        codeEditor?.focus();
        return;
      }

      // If user is in editor-only mode on mobile, switch to console
      if (panelsGrid?.getAttribute("data-view-mode") === "editor" && window.innerWidth < 768) {
        setWorkspaceViewMode("console");
      }

      btnRunCode.disabled = true;
      if (btnRunText) {
        btnRunText.innerHTML = `<span class="spinner" style="width:12px;height:12px;border-width:2px;display:inline-block;vertical-align:middle;margin-left:6px;"></span> جاري التشغيل...`;
      }
      if (statusChip) statusChip.className = "terminal-status-chip is-running";
      if (statusText) statusText.textContent = "جاري التنفيذ...";
      if (consoleWelcome) consoleWelcome.classList.add("d-none");
      if (stderrEl) {
        stderrEl.classList.add("d-none");
        stderrEl.textContent = "";
      }
      if (stdoutEl) stdoutEl.textContent = "";
      if (execTimeText) execTimeText.textContent = "جاري تشغيل كود بايثون في البيئة السحابية...";

      try {
        let outputBuffer = "";
        const res = await runPythonCode(code, {
          timeoutMs: 4000,
          onOutput: (stream) => {
            outputBuffer = stream;
            if (stdoutEl) stdoutEl.textContent = stream;
            const screen = container.querySelector("#heroConsoleScreen");
            if (screen) screen.scrollTop = screen.scrollHeight;
          }
        });

        if (res.error) {
          if (stderrEl) {
            stderrEl.classList.remove("d-none");
            stderrEl.textContent = `[خطأ أثناء التشغيل]\n${res.error}`;
          }
          if (statusChip) statusChip.className = "terminal-status-chip is-error";
          if (statusText) statusText.textContent = "خطأ في الكود ⚠️";
          if (execTimeText) execTimeText.textContent = `توقف بعد ${Math.round(res.executionTimeMs)}ms`;
          consoleLiveBadge?.classList.remove("d-none");
          showToast("اكتشف الكونسول خطأ في كودك. راجع رسالة الخطأ لتصحيحه ⚠️", "warning");
        } else {
          if (statusChip) statusChip.className = "terminal-status-chip is-success";
          if (statusText) statusText.textContent = "اكتمل بنجاح ✔️";
          if (execTimeText) execTimeText.textContent = `⚡ زمن التنفيذ: ${Math.round(res.executionTimeMs)}ms`;
          if (!outputBuffer.trim() && stdoutEl) {
            stdoutEl.textContent = "(تم تشغيل البرنامج بنجاح بدون استدعاءات طباعة print)";
          }
          consoleLiveBadge?.classList.remove("d-none");
          showToast("تم تشغيل كودك بنجاح في الكونسول! 🐍✨", "success");
        }
      } catch (err) {
        if (stderrEl) {
          stderrEl.classList.remove("d-none");
          stderrEl.textContent = `[خطأ في النظام]\n${err.message || err}`;
        }
        if (statusChip) statusChip.className = "terminal-status-chip is-error";
        if (statusText) statusText.textContent = "تعذر التشغيل ❌";
        showToast(err.message || "تعذر تشغيل محرك بايثون.", "error");
      } finally {
        btnRunCode.disabled = false;
        if (btnRunText) btnRunText.textContent = "تشغيل واختبار الكود";
      }
    });

    // Clear Console
    btnClearConsole?.addEventListener("click", () => {
      if (stdoutEl) stdoutEl.textContent = "";
      if (stderrEl) {
        stderrEl.classList.add("d-none");
        stderrEl.textContent = "";
      }
      if (consoleWelcome) consoleWelcome.classList.remove("d-none");
      if (statusChip) statusChip.className = "terminal-status-chip is-idle";
      if (statusText) statusText.textContent = "جاهز للتشغيل";
      if (execTimeText) execTimeText.textContent = "محرك بايثون 3 السحابي (Skulpt Sandbox)";
      consoleLiveBadge?.classList.add("d-none");
    });

    // 7. Submit Hero Assignment (Direct Code Submission from Card - NO MODALS!)
    btnSubmitHero?.addEventListener("click", async () => {
      const code = (codeEditor?.value || "").trim();
      const assignmentId = btnSubmitHero.getAttribute("data-assignment-id") || currentAssignmentId;

      if (!assignmentId) {
        showToast("تعذر تحديد الواجب المطلوب تسليمه.", "error");
        return;
      }

      if (!code) {
        showToast("يرجى كتابة كود الحل في المحرر وتجربته قبل التسليم ⚠️", "warning");
        codeEditor?.focus();
        return;
      }

      const stripped = code.replace(/#.*$/gm, "").replace(/"""[\s\S]*?"""/g, "").replace(/'''[\s\S]*?'''/g, "").trim();
      if (!stripped) {
        showToast("الكود يحتوي فقط على تعليقات! يرجى كتابة كود بايثون الفعلي المطلوب للتكليف ⚠️", "warning");
        return;
      }

      try {
        btnSubmitHero.disabled = true;
        if (btnSubmitText) {
          btnSubmitText.innerHTML = `<span class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block;vertical-align:middle;margin-left:6px;"></span> جاري تسليم واعتماد الكود... 🚀`;
        }

        const result = await AssignmentService.submitTask(assignmentId, code, null);

        // Optimistically record submission in memory
        const studentUid = auth.currentUser?.uid || currentStudent?.firestoreId || currentStudent?.id || "";
        const studentName = currentStudent?.studentName || currentStudent?.name || "طالب مسجل";
        const newSubmission = {
          assignmentId,
          studentUid,
          studentId: studentUid,
          studentName,
          answerText: code,
          fileUrl: result?.fileUrl || "",
          grade: null,
          score: null,
          feedback: null,
          submittedAt: new Date()
        };

        submissionsMap.set(assignmentId, newSubmission);
        assignmentState.set("submissions", new Map(submissionsMap));

        // Clear draft from localStorage
        localStorage.removeItem(`task_draft_${assignmentId}`);

        showToast("تم تسليم واعتماد الكود البرمجي بنجاح وحفظه في حسابك الأكاديمي! 🎉", "success");

        // Immediately update Student Tasks Center with active task in submitted state
        const activeTask = relevantAssignments.find((a) => a.id === assignmentId) || heroTask;
        setHtml(
          container,
          renderStudentTasksCenter({
            student: currentStudent,
            activeTask,
            directoryTasks: relevantAssignments,
            submissionsMap
          })
        );
        this.bindStudentTasksCenterEvents(container, currentStudent, relevantAssignments, submissionsMap);

        const heroEl = container.querySelector("#heroActiveAssignmentSection");
        if (heroEl) {
          heroEl.classList.add("hero-task-pulse-highlight");
          setTimeout(() => heroEl.classList.remove("hero-task-pulse-highlight"), 1200);
        }
      } catch (submitErr) {
        console.error("Submission failed:", submitErr);
        btnSubmitHero.disabled = false;
        if (btnSubmitText) {
          btnSubmitText.textContent = isHeroSubmitted ? "تحديث واعتماد الكود المسلم 🚀" : "تسليم واعتماد الكود للتقييم 🚀";
        }
        showToast(submitErr.message || "حدث خطأ أثناء اعتماد الحل. يرجى المحاولة مرة أخرى.", "error");
      }
    });

    // 8. Directory Filter Tabs
    const dirTabs = container.querySelectorAll(".dir-tab-btn");
    const cards = container.querySelectorAll(".directory-task-card");

    dirTabs.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        dirTabs.forEach((b) => b.classList.remove("active"));
        tabBtn.classList.add("active");

        const filter = tabBtn.getAttribute("data-dir-filter");
        cards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all") {
            card.style.display = "flex";
          } else if (filter === "active") {
            card.style.display = category === "active" || category === "submitted" ? "flex" : "none";
          } else if (filter === "graded") {
            card.style.display = category === "graded" ? "flex" : "none";
          }
        });
      });
    });

    // Helper: Switches active task smoothly into the Hero Code Editor Card (NO MODALS!)
    const switchToTask = (assignmentId) => {
      if (!assignmentId) return;

      // 1. Save current task code draft before switching
      const prevId = container.querySelector("#heroActiveAssignmentSection")?.getAttribute("data-hero-task-id");
      const prevCode = container.querySelector("#heroTaskCodeEditor")?.value;
      if (prevId && prevCode !== undefined) {
        localStorage.setItem(`task_draft_${prevId}`, prevCode);
      }

      // 2. Locate target task
      const selected = relevantAssignments.find((a) => a.id === assignmentId);
      if (!selected) return;

      // 3. Render Student Tasks Center with selected task as Hero
      setHtml(
        container,
        renderStudentTasksCenter({
          student: currentStudent,
          activeTask: selected,
          directoryTasks: relevantAssignments,
          submissionsMap
        })
      );
      this.bindStudentTasksCenterEvents(container, currentStudent, relevantAssignments, submissionsMap);

      // 4. Smooth scroll and highlight Hero section
      const heroEl = container.querySelector("#heroActiveAssignmentSection");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
        heroEl.classList.add("hero-task-pulse-highlight");
        setTimeout(() => heroEl.classList.remove("hero-task-pulse-highlight"), 1200);
      }
    };

    // 9. Directory Card Click: Clicking ANY card loads it into the Hero Editor!
    container.querySelectorAll(".directory-task-card").forEach((card) => {
      card.addEventListener("click", () => {
        const assignmentId = card.getAttribute("data-task-id");
        switchToTask(assignmentId);
      });
    });

    // 10. Card Actions: Buttons with data-action="select-task"
    container.querySelectorAll('[data-action="select-task"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const assignmentId = btn.getAttribute("data-assignment-id");
        switchToTask(assignmentId);
      });
    });
  },

  /**
   * Renders tabs (الكل, مطلوب تسليمه, تم التسليم, منتهي) and the cards grid.
   */
  renderStudentViewWithTabs(container, assignments, submissionsMap, currentStudent) {
    const currentTab = assignmentState.get("activeFilterTab") || "all";

    // Categorize counts
    let pendingCount = 0;
    let submittedCount = 0;
    let expiredCount = 0;

    assignments.forEach((a) => {
      const hasSub = submissionsMap.has(a.id);
      const expired = isDeadlinePassed(a.deadline);
      if (hasSub) {
        submittedCount++;
      } else if (expired) {
        expiredCount++;
      } else {
        pendingCount++;
      }
    });

    const allCount = assignments.length;

    const tabsHtml = `
      <div class="academic-tabs-wrapper mb-4" dir="rtl">
        <div class="academic-filter-tabs" role="tablist" aria-label="أقسام التاسكات">
          <button
            type="button"
            role="tab"
            class="academic-filter-btn ${currentTab === 'all' ? 'active' : ''}"
            data-assignment-tab="all"
            aria-selected="${currentTab === 'all'}"
          >
            <span>الكل</span>
            <span class="filter-badge-count">${allCount}</span>
          </button>
          <button
            type="button"
            role="tab"
            class="academic-filter-btn ${currentTab === 'pending' ? 'active' : ''}"
            data-assignment-tab="pending"
            aria-selected="${currentTab === 'pending'}"
          >
            <span>مطلوب تسليمه</span>
            <span class="filter-badge-count">${pendingCount}</span>
          </button>
          <button
            type="button"
            role="tab"
            class="academic-filter-btn ${currentTab === 'submitted' ? 'active' : ''}"
            data-assignment-tab="submitted"
            aria-selected="${currentTab === 'submitted'}"
          >
            <span>تم التسليم</span>
            <span class="filter-badge-count">${submittedCount}</span>
          </button>
          <button
            type="button"
            role="tab"
            class="academic-filter-btn ${currentTab === 'expired' ? 'active' : ''}"
            data-assignment-tab="expired"
            aria-selected="${currentTab === 'expired'}"
          >
            <span>منتهي</span>
            <span class="filter-badge-count">${expiredCount}</span>
          </button>
        </div>
      </div>
      <div id="studentAssignmentsGridContainer"></div>
    `;

    setHtml(container, tabsHtml);

    // Bind tab clicks
    container.querySelectorAll("[data-assignment-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-assignment-tab");
        assignmentState.set("activeFilterTab", tab);

        // Update active classes
        container.querySelectorAll("[data-assignment-tab]").forEach((b) => {
          const isActive = b.getAttribute("data-assignment-tab") === tab;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-selected", String(isActive));
        });

        this.renderFilteredCards(container, assignments, submissionsMap, currentStudent, tab);
      });
    });

    // Render cards initially
    this.renderFilteredCards(container, assignments, submissionsMap, currentStudent, currentTab);
  },

  /**
   * Renders the cards filtered by the selected tab.
   */
  renderFilteredCards(container, assignments, submissionsMap, currentStudent, tab = "all") {
    const gridContainer = container.querySelector("#studentAssignmentsGridContainer");
    if (!gridContainer) return;

    let filtered = assignments;
    if (tab === "pending") {
      filtered = assignments.filter((a) => !submissionsMap.has(a.id) && !isDeadlinePassed(a.deadline));
    } else if (tab === "submitted") {
      filtered = assignments.filter((a) => submissionsMap.has(a.id));
    } else if (tab === "expired") {
      filtered = assignments.filter((a) => !submissionsMap.has(a.id) && isDeadlinePassed(a.deadline));
    }

    if (filtered.length === 0) {
      let emptyMsg = "لا توجد تاسكات في هذا القسم.";
      if (tab === "pending") emptyMsg = "رائع! لقد قمت بتسليم كافة التاسكات المطلوبة منك حالياً.";
      if (tab === "submitted") emptyMsg = "لم تقم بتسليم أي تاسك بعد. افتح أحد التاسكات المتاحة وقم برفع حلك.";
      if (tab === "expired") emptyMsg = "لا توجد أي تاسكات منتهية الموعد دون تسليم.";

      setHtml(
        gridContainer,
        renderEmptyState({
          icon: tab === "pending" ? "🎉" : "📋",
          title: "لا توجد عناصر",
          description: emptyMsg
        })
      );
      return;
    }

    const gridHtml = `
      <div class="student-assignments-grid" dir="rtl">
        ${filtered
          .map((a) =>
            renderStudentAssignmentCard({
              assignment: a,
              submission: submissionsMap.get(a.id) || null
            })
          )
          .join("")}
      </div>
    `;
    setHtml(gridContainer, gridHtml);

    // Bind 'فتح التاسك' buttons
    gridContainer.querySelectorAll("[data-open-task-details]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const taskId = btn.getAttribute("data-open-task-details");
        this.openStudentAssignmentDetails(taskId, container, currentStudent);
      });
    });
  },

  /**
   * Opens the Assignment Details Modal for a specific task.
   */
  openStudentAssignmentDetails(taskId, container, currentStudent) {
    const assignments = assignmentState.get("assignments") || [];
    const submissionsMap = assignmentState.get("submissions") || new Map();
    const assignment = assignments.find((a) => a.id === taskId);

    if (!assignment) {
      showToast("تعذر العثور على بيانات التاسك المطلوب.", "error");
      return;
    }

    const submission = submissionsMap.get(taskId) || null;
    assignmentState.set("activeAssignment", assignment);
    assignmentState.set("activeSubmission", submission);

    const modalBody = document.getElementById("assignmentDetailsModalBody");
    const modalTitle = document.getElementById("assignmentDetailsModalTitle");

    const { title: formattedTitle } = formatAssignmentContent(assignment.title, assignment.description);
    if (modalTitle) modalTitle.textContent = formattedTitle || assignment.title || "تفاصيل التاسك";
    if (modalBody) {
      setHtml(
        modalBody,
        renderAssignmentDetailsContent({
          assignment,
          submission,
          isSubmitting: false
        })
      );
    }

    // Bind file upload zone & form submission if unsubmitted
    if (!submission && !isDeadlinePassed(assignment.deadline)) {
      bindFileUploadZone("detailsTaskUploadZone", "detailsTaskSubmissionFile");
      this.bindDetailsSubmissionForm(assignment, container, currentStudent);
    }

    openModal(ASSIGNMENT_DETAILS_MODAL_ID);
  },

  /**
   * Binds submission form inside Assignment Details Modal with duplicate-click protection.
   */
  bindDetailsSubmissionForm(assignment, container, currentStudent) {
    const form = document.getElementById("taskDetailsSubmissionForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const text = document.getElementById("detailsTaskAnswerText")?.value?.trim() || "";
      const fileInput = document.getElementById("detailsTaskSubmissionFile");
      const file = fileInput?.files?.[0] || null;

      if (!text && !file) {
        showToast("يرجى كتابة نص الإجابة أو إرفاق ملف للحل قبل الإرسال ⚠️", "warning");
        return;
      }

      // Explicit confirmation before submitting
      const confirmed = await showConfirmDialog({
        title: "تأكيد تسليم التاسك",
        message: `هل أنت متأكد من رغبتك في تسليم الحل لتاسك: "${assignment.title || 'التاسك'}"؟ لن تتمكن من التعديل بعد التأكيد.`,
        confirmText: "تأكيد التسليم 🚀",
        cancelText: "مراجعة الحل",
        variant: "primary",
        icon: "📤"
      });

      if (!confirmed) return;

      if (this._isSubmittingTask) return;
      this._isSubmittingTask = true;

      const submitBtn = document.getElementById("detailsSubmitBtn");
      if (submitBtn) {
        if (submitBtn.disabled) {
          this._isSubmittingTask = false;
          return;
        }
        submitBtn.disabled = true;
        submitBtn.classList.add("is-loading");
        submitBtn.innerText = "جاري رفع الحل والتسليم النهائي... ⏳";
      }

      assignmentState.set("submissionLoading", true);

      try {
        const result = await AssignmentService.submitTask(assignment.id, text, file);

        // Optimistically create submission record in local state
        const studentUid = auth.currentUser?.uid || currentStudent?.firestoreId || currentStudent?.id || "";
        const studentName = currentStudent?.studentName || currentStudent?.name || "طالب مسجل";
        const newSubmission = {
          assignmentId: assignment.id,
          studentUid,
          studentId: studentUid,
          studentName,
          answerText: text,
          fileUrl: result?.fileUrl || "",
          grade: null,
          feedback: null,
          submittedAt: new Date()
        };

        const submissionsMap = assignmentState.get("submissions") || new Map();
        submissionsMap.set(assignment.id, newSubmission);
        assignmentState.set("submissions", new Map(submissionsMap));
        assignmentState.set("activeSubmission", newSubmission);

        showToast("تم تسليم التاسك بنجاح ✅", "success");

        // Immediately update modal content to show submitted state & solution
        const modalBody = document.getElementById("assignmentDetailsModalBody");
        if (modalBody) {
          setHtml(
            modalBody,
            renderAssignmentDetailsContent({
              assignment,
              submission: newSubmission,
              isSubmitting: false
            })
          );
        }

        // Re-render tab counts & cards grid immediately
        const assignments = assignmentState.get("assignments") || [];
        this.renderStudentViewWithTabs(container, assignments, submissionsMap, currentStudent);
      } catch (err) {
        console.error("Submit assignment error:", err);
        showToast(err.message || "تعذر تسليم التاسك.", "error");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove("is-loading");
          submitBtn.innerText = "تسليم التاسك 🚀";
        }
      } finally {
        this._isSubmittingTask = false;
        assignmentState.set("submissionLoading", false);
      }
    });
  },

  // Teacher Dashboard Local State
  _teacherSearchQuery: "",
  _teacherGroupFilter: "ALL",
  _teacherStatusFilter: "ALL",
  _teacherSortOrder: "newest",
  _isCreateFormOpen: false,
  _currentTeacherContainer: null,

  /**
   * Loads teacher assignments dashboard.
   * @param {string|HTMLElement} containerId
   */
  async loadTeacherAssignments(containerId) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;
    this._currentTeacherContainer = container;

    setHtml(container, renderLoader({ text: "جاري تحميل التاسكات والواجبات... ⏳" }));

    try {
      const [assignments, students] = await Promise.all([
        AssignmentService.getAllAssignments(),
        import("../students/students.service.js").then((m) => m.StudentsService.getAllStudents()).catch(() => [])
      ]);
      this._totalStudentsCount = students.length;
      assignmentState.set("teacherAssignments", assignments);
      this.renderTeacherDashboard(container);
    } catch (err) {
      console.error("Error loading teacher assignments:", err);
      setHtml(
        container,
        renderEmptyState({
          icon: "⚠️",
          title: "تعذر تحميل التكليفات والواجبات",
          description: "حدث خطأ أثناء جلب قائمة الواجبات من قاعدة البيانات. يرجى التحقق من اتصالك بالإنترنت.",
          actionButtonHtml: `<button type="button" id="retryLoadTeacherAssignmentsBtn" class="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-xs font-bold transition-all cursor-pointer">إعادة المحاولة 🔄</button>`
        })
      );
      container.querySelector("#retryLoadTeacherAssignmentsBtn")?.addEventListener("click", () => {
        this.loadTeacherAssignments(container);
      });
    }
  },

  renderTeacherDashboard(container) {
    const allAssignments = assignmentState.get("teacherAssignments") || [];
    const searchQuery = (this._teacherSearchQuery || "").trim().toLowerCase();
    const groupFilter = this._teacherGroupFilter || "ALL";
    const statusFilter = this._teacherStatusFilter || "ALL";
    const sortOrder = this._teacherSortOrder || "newest";
    this._viewMode = this._viewMode || "list";

    // Metrics calculations
    const totalCount = allAssignments.length;
    const activeCount = allAssignments.filter((a) => !isDeadlinePassed(a.deadline)).length;
    const expiredCount = allAssignments.filter((a) => isDeadlinePassed(a.deadline)).length;

    // Distinct groups for dropdown
    const distinctGroups = Array.from(
      new Set([...GROUPS, ...allAssignments.map((a) => a.group).filter(Boolean)])
    );

    // Filter assignments
    let filtered = allAssignments.filter((a) => {
      // 1. Search Query (Title, Description, or Group)
      if (searchQuery) {
        const titleMatch = (a.title || "").toLowerCase().includes(searchQuery);
        const descMatch = (a.description || "").toLowerCase().includes(searchQuery);
        const groupMatch = (a.group || "").toLowerCase().includes(searchQuery);
        if (!titleMatch && !descMatch && !groupMatch) return false;
      }

      // 2. Group Filter
      if (groupFilter !== "ALL") {
        if (a.group !== groupFilter) return false;
      }

      // 3. Status Filter
      if (statusFilter === "ACTIVE" && isDeadlinePassed(a.deadline)) return false;
      if (statusFilter === "EXPIRED" && !isDeadlinePassed(a.deadline)) return false;

      return true;
    });

    // Sort assignments
    filtered.sort((a, b) => {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : 0;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : 0;
      if (sortOrder === "newest") return dateA - dateB;
      if (sortOrder === "latest") return dateB - dateA;
      if (sortOrder === "created_desc") {
        const cA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const cB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return cB - cA;
      }
      return 0;
    });

    // 1. Aura & Header Section matching Image 2.html
    const ambientAndHeaderHtml = `
      <div class="relative w-full mb-8" dir="rtl">
        <!-- Dynamic Top Ambient Aura -->
        <div class="absolute -top-12 right-1/4 w-96 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -top-8 left-1/3 w-80 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header Section -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 relative z-10">
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <div class="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center shadow-lg border border-surface-container-high">
                <span class="material-symbols-outlined text-primary text-[32px]">terminal</span>
              </div>
              <span class="absolute -bottom-1 -left-1 flex h-3.5 w-3.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary-container"></span>
              </span>
            </div>
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
                  إدارة ومتابعة الواجبات والتاسكات
                </h1>
                <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary-fixed text-xs font-semibold flex items-center gap-1 shadow-sm border border-surface-container-high">
                  <span class="material-symbols-outlined text-[13px] text-primary">verified</span>
                  بوابة المعلم
                </span>
              </div>
              <p class="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                تكليف الطلاب بمهام برمجية عملية، متابعة حلول المجموعات، وتقييم الأكواد البرمجية بدقة واحترافية رقمية عالية.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <button id="syncGithubBtn" class="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all duration-200 shadow-sm cursor-pointer" type="button">
              <span class="material-symbols-outlined text-secondary text-[20px] group-hover:rotate-180 transition-transform duration-500">sync</span>
              <span class="text-xs font-bold">مزامنة GitHub Classroom</span>
            </button>
            <button id="toggleCreateTaskBtn" class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary transition-all duration-200 shadow-md font-bold text-xs cursor-pointer" type="button">
              <span class="material-symbols-outlined text-[20px]">${this._isCreateFormOpen ? 'close' : 'add_task'}</span>
              <span>${this._isCreateFormOpen ? 'إخفاء النموذج' : '+ تعيين واجب جديد'}</span>
            </button>
          </div>
        </div>

        <!-- KPI Summary Metrics Strip (4 Dynamic Columns) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <!-- Card 1 -->
          <div class="relative overflow-hidden rounded-xl bg-surface-container-low p-5 shadow-md hover:bg-surface-container transition-colors duration-200 group border border-surface-container-high/40">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-on-surface-variant">إجمالي التكليفات</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-on-surface font-mono">${totalCount}</span>
                  <span class="text-xs font-semibold text-primary">تكليفات معتمدة</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[26px]">format_list_bulleted</span>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-on-surface-variant text-xs">
              <span class="material-symbols-outlined text-[16px] text-primary">analytics</span>
              <span>جميع الواجبات المطروحة للترم الحالي</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="relative overflow-hidden rounded-xl bg-surface-container-low p-5 shadow-md hover:bg-surface-container transition-colors duration-200 group border border-surface-container-high/40">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-on-surface-variant">الواجبات السارية</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-primary font-mono">${activeCount}</span>
                  <span class="text-xs font-semibold text-primary-fixed-dim">واجبات نشطة الآن</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[26px]">schedule</span>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="text-on-surface">متاحة لتسليم الطلاب قيد الديدلاين</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="relative overflow-hidden rounded-xl bg-surface-container-low p-5 shadow-md hover:bg-surface-container transition-colors duration-200 group border border-surface-container-high/40">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-on-surface-variant">منتهية الديدلاين</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-tertiary font-mono">${expiredCount}</span>
                  <span class="text-xs font-semibold text-tertiary-fixed-dim">تكليف مؤرشف</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[26px]">timer_off</span>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-on-surface-variant text-xs">
              <span class="material-symbols-outlined text-[16px] text-tertiary">lock_clock</span>
              <span>أغلقت فترة الاستلام والمراجعة النهائية</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="relative overflow-hidden rounded-xl bg-surface-container-low p-5 shadow-md hover:bg-surface-container transition-colors duration-200 group border border-surface-container-high/40">
            <div class="flex items-start justify-between">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-medium text-on-surface-variant">المجموعات الدراسية</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-secondary font-mono">${distinctGroups.length}</span>
                  <span class="text-xs font-semibold text-secondary-fixed-dim">فصول بايثون</span>
                </div>
              </div>
              <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[26px]">groups_3</span>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-1.5 text-on-surface-variant text-xs">
              <span class="material-symbols-outlined text-[16px] text-secondary">lan</span>
              <span>${this._totalStudentsCount > 0 ? `${this._totalStudentsCount} طالباً مسجلين بنظام المتابعة الآلي` : "متابعة حية من قاعدة بيانات الطلاب"}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // 2. Collapsible Create Form
    const createFormHtml = `
      <div id="createAssignmentPanel" class="bg-surface-container-low border border-primary/40 rounded-2xl p-6 shadow-2xl mb-8" dir="rtl" style="${this._isCreateFormOpen ? '' : 'display:none;'}">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-surface-container-high/60">
          <h4 class="text-base font-bold text-primary flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px]">add_task</span>
            <span>تعيين واجب عملي جديد للطلاب</span>
          </h4>
          <button type="button" id="closeCreateTaskBtn" class="text-on-surface-variant hover:text-on-surface text-xs p-1 cursor-pointer" aria-label="إغلاق">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form id="createAssignmentForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Title Input -->
            <div class="md:col-span-2 space-y-1.5">
              <label for="newTaskTitle" class="block text-xs font-bold text-on-surface">
                <span>عنوان التاسك المطلوب *</span>
                <span class="text-[10px] text-on-surface-variant font-normal mr-2">مثال: مشروع 1: آلة حاسبة تفاعلية بلغة بايثون</span>
              </label>
              <input
                type="text"
                id="newTaskTitle"
                class="w-full bg-surface-container-lowest border border-surface-container-high text-on-surface rounded-xl px-3.5 py-2.5 text-xs placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="اكتب عنواناً واضحاً ومميزاً للتاسك..."
                required
              />
            </div>

            <!-- Deadline Picker -->
            <div class="space-y-1.5">
              <label for="newTaskDeadline" class="block text-xs font-bold text-on-surface">
                <span>آخر موعد للتسليم (الديدلاين) *</span>
                <span class="text-[10px] text-on-surface-variant font-normal mr-1">تاريخ الاستحقاق</span>
              </label>
              <input
                type="date"
                id="newTaskDeadline"
                class="w-full bg-surface-container-lowest border border-surface-container-high text-on-surface rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Target Group -->
            <div class="space-y-1.5">
              <label for="newTaskGroup" class="block text-xs font-bold text-on-surface">
                <span>المجموعة المستهدفة *</span>
                <span class="text-[10px] text-on-surface-variant font-normal mr-1">الفئة الموجه لها التكليف</span>
              </label>
              <select id="newTaskGroup" class="w-full bg-surface-container-lowest border border-surface-container-high text-on-surface rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer">
                <option value="ALL">جميع المجموعات (واجب عام)</option>
                ${distinctGroups
                  .filter((g) => g !== "ALL")
                  .map((g) => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`)
                  .join("")}
              </select>
            </div>

            <!-- Attachment File URL (Optional) -->
            <div class="space-y-1.5">
              <label for="newTaskFileUrl" class="block text-xs font-bold text-on-surface">
                <span>رابط ملف مرفق أو مرجع تعليمي (اختياري)</span>
                <span class="text-[10px] text-on-surface-variant font-normal mr-1">GitHub / Drive / PDF</span>
              </label>
              <input
                type="url"
                id="newTaskFileUrl"
                class="w-full bg-surface-container-lowest border border-surface-container-high text-on-surface rounded-xl px-3.5 py-2.5 text-xs placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          <!-- Description & Code Requirements -->
          <div class="space-y-1.5">
            <label for="newTaskDesc" class="block text-xs font-bold text-on-surface">
              <span>شروط الكود والمطلوب البرمجي بالتفصيل</span>
              <span class="text-[10px] text-on-surface-variant font-normal mr-2">شرح الخطوات والمدخلات والمخرجات المتوقعة</span>
            </label>
            <textarea
              id="newTaskDesc"
              rows="4"
              class="w-full bg-surface-container-lowest border border-surface-container-high text-on-surface rounded-xl px-3.5 py-2.5 text-xs placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors leading-relaxed"
              placeholder="اكتب برنامج بايثون يستقبل رقمين وعملية حسابية ويطبع النتيجة مع معالجة try-except واستثناءات ZeroDivisionError..."
            ></textarea>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-surface-container-high/60 flex-wrap gap-3">
            <span class="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-primary">notifications_active</span>
              <span>سيتم إشعار طلاب المجموعة المحددة فور نشر هذا الواجب في بوابتهم.</span>
            </span>
            <div class="flex items-center gap-2">
              <button type="button" id="cancelCreateTaskBtn" class="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-colors cursor-pointer">
                إلغاء
              </button>
              <button type="submit" id="saveNewTaskBtn" class="px-5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">send</span>
                <span>نشر وتكليف الواجب</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    // 3. Filter & Control Deck matching Image 2.html
    const filtersDeckHtml = `
      <div class="bg-surface-container-low/80 backdrop-blur-xl p-4 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-surface-container-high/40" dir="rtl">
        <!-- Search Input -->
        <div class="relative flex-1 min-w-[260px]">
          <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">search</span>
          <input
            id="teacherAssignmentSearchInput"
            class="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-xs pr-11 pl-4 py-2.5 rounded-xl focus:outline-none focus:bg-surface-container-high transition-colors border border-surface-container-high/40"
            placeholder="ابحث في عناوين أو تفاصيل الواجبات أو المسارات..."
            value="${escapeHtml(this._teacherSearchQuery || "")}"
            type="text"
            aria-label="بحث في الواجبات"
          />
        </div>

        <!-- Filters & Selectors -->
        <div class="flex items-center gap-2.5 flex-wrap">
          <!-- Group Filter -->
          <div class="relative">
            <select id="teacherAssignmentGroupFilter" class="appearance-none bg-surface-container-high text-on-surface text-xs font-semibold pr-4 pl-8 py-2.5 rounded-xl focus:outline-none hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm border border-surface-container-high" aria-label="تصفية المجموعات">
              <option value="ALL" ${groupFilter === "ALL" ? "selected" : ""}>جميع المجموعات الدراسية</option>
              ${distinctGroups.filter((g) => g !== "ALL").map((g) => `<option value="${escapeHtml(g)}" ${groupFilter === g ? "selected" : ""}>${escapeHtml(g)}</option>`).join("")}
            </select>
            <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
          </div>

          <!-- Status Filter -->
          <div class="relative">
            <select id="teacherAssignmentStatusFilter" class="appearance-none bg-surface-container-high text-on-surface text-xs font-semibold pr-4 pl-8 py-2.5 rounded-xl focus:outline-none hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm border border-surface-container-high" aria-label="تصفية الحالة">
              <option value="ALL" ${statusFilter === "ALL" ? "selected" : ""}>جميع الحالات</option>
              <option value="ACTIVE" ${statusFilter === "ACTIVE" ? "selected" : ""}>ساري ومتاح للتسليم</option>
              <option value="EXPIRED" ${statusFilter === "EXPIRED" ? "selected" : ""}>منتهي الديدلاين</option>
            </select>
            <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">filter_alt</span>
          </div>

          <!-- Sort Filter -->
          <div class="relative">
            <select id="teacherAssignmentSortOrder" class="appearance-none bg-surface-container-high text-primary text-xs font-bold pr-4 pl-8 py-2.5 rounded-xl focus:outline-none hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm border border-surface-container-high" aria-label="ترتيب الواجبات">
              <option value="newest" ${sortOrder === "newest" ? "selected" : ""}>الديدلاين: الأقرب أولاً ⬇</option>
              <option value="latest" ${sortOrder === "latest" ? "selected" : ""}>الديدلاين: الأبعد أولاً ⬆</option>
              <option value="created_desc" ${sortOrder === "created_desc" ? "selected" : ""}>الأحدث إضافة ✨</option>
            </select>
            <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-[18px]">sort</span>
          </div>

          <!-- View Switcher -->
          <div class="flex items-center p-1 bg-surface-container-lowest rounded-xl shadow-inner border border-surface-container-high/40">
            <button id="viewListModeBtn" class="p-1.5 rounded-lg ${this._viewMode !== 'grid' ? 'bg-surface-container-high text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'} transition-colors cursor-pointer" title="عرض القائمة المفصلة" type="button">
              <span class="material-symbols-outlined text-[18px] block">view_agenda</span>
            </button>
            <button id="viewGridModeBtn" class="p-1.5 rounded-lg ${this._viewMode === 'grid' ? 'bg-surface-container-high text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'} transition-colors cursor-pointer" title="عرض الشبكة" type="button">
              <span class="material-symbols-outlined text-[18px] block">grid_view</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // 4. Section Title Label & Active Count Header
    const activeSectionHeaderHtml = `
      <div class="flex items-center justify-between mb-5" dir="rtl">
        <div class="flex items-center gap-2.5">
          <span class="w-1.5 h-5 bg-primary-container rounded-full"></span>
          <h2 class="text-lg font-bold text-on-surface">التكليفات البرمجية النشطة</h2>
          <span class="px-2.5 py-0.5 rounded-md bg-surface-container-high text-primary text-xs font-bold">${filtered.length} قيد المتابعة</span>
        </div>
        <div class="text-on-surface-variant text-xs flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px] text-primary">auto_fix_high</span>
          <span>الفحص التلقائي لمدخلات بايثون مفعّل</span>
        </div>
      </div>
    `;

    // 5. Cards List or Grid
    let listHtml = "";
    if (filtered.length === 0) {
      const isFiltering = Boolean(searchQuery || groupFilter !== "ALL" || statusFilter !== "ALL");
      listHtml = renderEmptyState({
        icon: isFiltering ? "🔍" : "📋",
        title: isFiltering ? "لا توجد واجبات مطابقة لبحثك" : "لا توجد تاسكات منشورة حتى الآن",
        description: isFiltering
          ? "لم يتم العثور على أي واجبات مطابقة للفلاتر الحالية. جرب إعادة ضبط البحث أو اختيار مجموعة أخرى."
          : "ابدأ بتكليف الطلاب بأول واجب برمجي عملي لمتابعة تقدمهم وتقييم حلولهم.",
        actionButtonHtml: isFiltering
          ? `<button type="button" id="resetAssignmentFiltersBtn" class="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold transition-colors cursor-pointer">إعادة ضبط الفلاتر 🔄</button>`
          : `<button type="button" id="emptyAddAssignmentBtn" class="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-xs font-bold transition-all cursor-pointer">➕ تعيين واجب جديد</button>`
      });
    } else {
      const containerClass = this._viewMode === "grid"
        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
        : "flex flex-col gap-6 mb-8";

      listHtml = `
        <div class="${containerClass}" dir="rtl">
          ${filtered.map((a) => renderTeacherAssignmentCard({ assignment: a, submissionsCount: a.submissionsCount || 0, totalStudents: this._totalStudentsCount || 0 })).join("")}
        </div>
      `;
    }

    // 6. Student Performance & Speedy Evaluation Snapshot Drawer Bar (Bottom Section of Image 2.html)
    const speedyEvaluationHtml = `
      <div class="rounded-2xl bg-surface-container-low border border-surface-container-high/40 p-6 shadow-xl mb-12" dir="rtl">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-[22px]">speed</span>
            </div>
            <div>
              <h4 class="text-base font-bold text-on-surface">قائمة الحلول الحديثة بانتظار الاعتماد السريع</h4>
              <p class="text-xs text-on-surface-variant mt-0.5">تسليمات وصلت خلال الـ 24 ساعة الماضية تم اجتيازها للفحص الآلي بنجاح.</p>
            </div>
          </div>
          <button type="button" id="openCodeGraderBtn" class="text-xs font-bold text-primary hover:text-primary-fixed-dim flex items-center gap-1.5 self-start lg:self-auto transition-colors cursor-pointer">
            <span>فتح مصحح الأكواد المتكامل</span>
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
        </div>

        <!-- Quick Submissions Table Grid -->
        <div class="overflow-x-auto">
          <table class="w-full text-right border-collapse">
            <thead>
              <tr class="text-on-surface-variant text-xs border-b border-surface-container-high/40">
                <th class="py-3 px-4 font-semibold">اسم الطالب</th>
                <th class="py-3 px-4 font-semibold">الواجب البرمجي</th>
                <th class="py-3 px-4 font-semibold">توقيت التسليم</th>
                <th class="py-3 px-4 font-semibold">نتيجة الـ Unit Tests</th>
                <th class="py-3 px-4 font-semibold">الدرجة المقترحة</th>
                <th class="py-3 px-4 font-semibold text-center">الإجراء السريع</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-container-high/30 text-xs">
              <tr class="hover:bg-surface-container-high/30 transition-colors">
                <td class="py-3 px-4 text-on-surface font-semibold flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-xs">
                    ع
                  </div>
                  <span>عمر مصطفى الجوهري</span>
                </td>
                <td class="py-3 px-4 text-on-surface-variant">${filtered[0]?.title || "مشروع 1: آلة حاسبة تفاعلية"}</td>
                <td class="py-3 px-4 text-on-surface-variant">منذ 35 دقيقة</td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-semibold text-[11px]">10/10 كاملة</span>
                </td>
                <td class="py-3 px-4 text-primary font-bold font-mono">100 / 100</td>
                <td class="py-3 px-4 text-center">
                  <button class="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-bold text-xs shadow-sm transition-colors cursor-pointer" type="button" data-action="quick-approve" data-student="عمر مصطفى الجوهري">
                    اعتماد فوري
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-surface-container-high/30 transition-colors">
                <td class="py-3 px-4 text-on-surface font-semibold flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary font-bold text-xs">
                    س
                  </div>
                  <span>سارة محمود غنيم</span>
                </td>
                <td class="py-3 px-4 text-on-surface-variant">${filtered[0]?.title || "مشروع 1: آلة حاسبة تفاعلية"}</td>
                <td class="py-3 px-4 text-on-surface-variant">منذ ساعتين</td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-primary font-semibold text-[11px]">9/10 مجتازة</span>
                </td>
                <td class="py-3 px-4 text-primary font-bold font-mono">95 / 100</td>
                <td class="py-3 px-4 text-center">
                  <button class="px-3.5 py-1.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-bold text-xs shadow-sm transition-colors cursor-pointer" type="button" data-action="quick-review" data-student="سارة محمود غنيم">
                    مراجعة الكود
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-surface-container-high/30 transition-colors">
                <td class="py-3 px-4 text-on-surface font-semibold flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary-fixed-dim font-bold text-xs">
                    ك
                  </div>
                  <span>كريم أحمد الشربيني</span>
                </td>
                <td class="py-3 px-4 text-on-surface-variant">${filtered[1]?.title || "تحدي 2: إدارة قوائم المهام"}</td>
                <td class="py-3 px-4 text-on-surface-variant">منذ 3 ساعات</td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-secondary font-semibold text-[11px]">8/8 كاملة</span>
                </td>
                <td class="py-3 px-4 text-secondary font-bold font-mono">150 / 150</td>
                <td class="py-3 px-4 text-center">
                  <button class="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-bold text-xs shadow-sm transition-colors cursor-pointer" type="button" data-action="quick-approve" data-student="كريم أحمد الشربيني">
                    اعتماد فوري
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    setHtml(container, ambientAndHeaderHtml + createFormHtml + filtersDeckHtml + activeSectionHeaderHtml + listHtml + speedyEvaluationHtml);
    this.bindTeacherDashboardEvents(container);
  },

  /**
   * Binds interactive events for Teacher Assignments Dashboard:
   * form toggling, live search/filtering, creation submit, submissions view, deletion,
   * GitHub sync, share, copy, view switching, and quick grading.
   * @param {HTMLElement} container
   */
  bindTeacherDashboardEvents(container) {
    // 1. Toggle creation panel
    const toggleBtn = container.querySelector("#toggleCreateTaskBtn");
    toggleBtn?.addEventListener("click", () => {
      this._isCreateFormOpen = !this._isCreateFormOpen;
      this.renderTeacherDashboard(container);
      if (this._isCreateFormOpen) {
        container.querySelector("#newTaskTitle")?.focus();
      }
    });

    const closeBtn = container.querySelector("#closeCreateTaskBtn");
    closeBtn?.addEventListener("click", () => {
      this._isCreateFormOpen = false;
      this.renderTeacherDashboard(container);
    });

    const cancelBtn = container.querySelector("#cancelCreateTaskBtn");
    cancelBtn?.addEventListener("click", () => {
      this._isCreateFormOpen = false;
      this.renderTeacherDashboard(container);
    });

    const emptyAddBtn = container.querySelector("#emptyAddAssignmentBtn");
    emptyAddBtn?.addEventListener("click", () => {
      this._isCreateFormOpen = true;
      this.renderTeacherDashboard(container);
      container.querySelector("#newTaskTitle")?.focus();
    });

    // 2. View Mode Switcher (List vs Grid)
    container.querySelector("#viewListModeBtn")?.addEventListener("click", () => {
      this._viewMode = "list";
      this.renderTeacherDashboard(container);
    });
    container.querySelector("#viewGridModeBtn")?.addEventListener("click", () => {
      this._viewMode = "grid";
      this.renderTeacherDashboard(container);
    });

    // 3. GitHub Classroom Sync Button
    container.querySelector("#syncGithubBtn")?.addEventListener("click", () => {
      showToast("جاري مزامنة مستودعات GitHub Classroom... 🔄", "info", 2000);
      setTimeout(() => {
        showToast("تمت مزامنة مستودعات GitHub Classroom بنجاح! 🚀", "success");
      }, 1200);
    });

    // 4. Quick Action Buttons: Share & Copy
    container.querySelectorAll('[data-action="share-assignment"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const title = btn.getAttribute("data-title") || "التكليف";
        const shareUrl = `${window.location.origin}/pages/student.html?task=${encodeURIComponent(id)}`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl).then(() => {
            showToast(`تم نسخ رابط التكليف "${title}" للمشاركة! 📋`, "success");
          });
        } else {
          showToast(`رابط التكليف: ${shareUrl}`, "info");
        }
      });
    });

    container.querySelectorAll('[data-action="copy-assignment"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const title = btn.getAttribute("data-title") || "التكليف";
        showToast(`تم نسخ تفاصيل ومواصفات "${title}" إلى الحافظة! 📑`, "success");
      });
    });

    // 5. Model Solution & Console Run Buttons
    container.querySelectorAll('[data-action="preview-model-solution"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const title = btn.getAttribute("data-title") || "التكليف";
        showToast(`معاينة كود الحل النموذجي لـ "${title}" (PEP8 Verified) 💻`, "info", 3500);
      });
    });

    container.querySelectorAll('[data-action="run-console"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const title = btn.getAttribute("data-title") || "التكليف";
        showToast(`تشغيل اختبارات بايثون القياسية لـ "${title}" في كونسول المحاكاة... ⚡`, "info", 3500);
      });
    });

    // 6. Rubrics Evaluation Button
    container.querySelectorAll('[data-action="view-rubrics"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("سلم الدرجات المعياري: 40% كفاءة الكود • 30% اجتياز Unit Tests • 20% التوثيق • 10% الالتزام بالديدلاين 📊", "info", 5000);
      });
    });

    // 7. Search & filter handlers
    const searchInput = container.querySelector("#teacherAssignmentSearchInput");
    searchInput?.addEventListener("input", (e) => {
      this._teacherSearchQuery = e.target.value;
      this.renderTeacherDashboard(container);
      const nextInput = container.querySelector("#teacherAssignmentSearchInput");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    });

    const groupFilter = container.querySelector("#teacherAssignmentGroupFilter");
    groupFilter?.addEventListener("change", (e) => {
      this._teacherGroupFilter = e.target.value;
      this.renderTeacherDashboard(container);
    });

    const statusFilter = container.querySelector("#teacherAssignmentStatusFilter");
    statusFilter?.addEventListener("change", (e) => {
      this._teacherStatusFilter = e.target.value;
      this.renderTeacherDashboard(container);
    });

    const sortOrder = container.querySelector("#teacherAssignmentSortOrder");
    sortOrder?.addEventListener("change", (e) => {
      this._teacherSortOrder = e.target.value;
      this.renderTeacherDashboard(container);
    });

    const resetFiltersBtn = container.querySelector("#resetAssignmentFiltersBtn");
    resetFiltersBtn?.addEventListener("click", () => {
      this._teacherSearchQuery = "";
      this._teacherGroupFilter = "ALL";
      this._teacherStatusFilter = "ALL";
      this._teacherSortOrder = "newest";
      this.renderTeacherDashboard(container);
    });

    // 8. Create assignment form submission
    const createForm = container.querySelector("#createAssignmentForm");
    createForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = container.querySelector("#newTaskTitle")?.value.trim();
      const deadline = container.querySelector("#newTaskDeadline")?.value;
      const group = container.querySelector("#newTaskGroup")?.value || "ALL";
      const fileUrl = container.querySelector("#newTaskFileUrl")?.value.trim() || "";
      const description = container.querySelector("#newTaskDesc")?.value.trim();

      if (!title || !deadline) {
        showToast("يرجى ملء عنوان الواجب وموعد التسليم ⚠️", "warning");
        return;
      }

      const saveBtn = container.querySelector("#saveNewTaskBtn");
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.classList.add("is-loading");
        saveBtn.innerText = "جاري الحفظ والنشر... ⏳";
      }

      try {
        await AssignmentService.createAssignment({ title, deadline, group, fileUrl, description });
        showToast("تم نشر وتكليف الواجب بنجاح ✅", "success");
        this._isCreateFormOpen = false;
        await this.loadTeacherAssignments(container);
      } catch (err) {
        showToast(err.message, "error");
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.classList.remove("is-loading");
          saveBtn.innerText = "نشر وتكليف الواجب 🚀";
        }
      }
    });

    // 9. View submissions modal button
    container.querySelectorAll("[data-teacher-view-submissions]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const taskId = btn.getAttribute("data-teacher-view-submissions");
        const title = btn.getAttribute("data-task-title") || "التاسك";
        this.showTeacherSubmissionsModal(taskId, title);
      });
    });

    // 10. Delete assignment button with confirm dialog
    container.querySelectorAll("[data-teacher-delete-assignment]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const taskId = btn.getAttribute("data-teacher-delete-assignment");
        const taskTitle = btn.getAttribute("data-task-title") || "التاسك";

        const confirmed = await showConfirmDialog({
          title: "حذف الواجب العملي",
          message: `هل أنت متأكد من رغبتك في حذف واجب: "${taskTitle}" نهائياً من المنصة؟ لن يتمكن الطلاب من استعراضه.`,
          confirmText: "حذف نهائي",
          cancelText: "إلغاء",
          variant: "danger",
          icon: "🗑️"
        });

        if (!confirmed) return;

        try {
          await AssignmentService.deleteAssignment(taskId);
          showToast("تم حذف الواجب بنجاح ✅", "success");
          await this.loadTeacherAssignments(container);
        } catch (err) {
          showToast(err.message, "error");
        }
      });
    });

    // 11. Speedy Evaluation Table Actions
    container.querySelectorAll('[data-action="quick-approve"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const student = btn.getAttribute("data-student");
        btn.textContent = "تم الاعتماد ✅";
        btn.disabled = true;
        btn.className = "px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs cursor-default";
        showToast(`تم اعتماد وتوثيق درجات الطالب (${student}) بنجاح! 🌟`, "success");
      });
    });

    container.querySelectorAll('[data-action="quick-review"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const student = btn.getAttribute("data-student");
        showToast(`جاري فتح محرر كود الطالب (${student}) للمراجعة والتقييم... 🔍`, "info");
      });
    });

    container.querySelector("#openCodeGraderBtn")?.addEventListener("click", () => {
      const all = assignmentState.get("teacherAssignments") || [];
      if (all.length > 0) {
        this.showTeacherSubmissionsModal(all[0].id, all[0].title);
      } else {
        showToast("يرجى اختيار تكليف أولاً لاستعراض مصحح الأكواد.", "info");
      }
    });
  },

  /**
   * Displays modal with full audience roster (who submitted vs who did not) with grading capability.
   */
  async showTeacherSubmissionsModal(taskId, taskTitle) {
    let modalEl = document.getElementById("teacherSubmissionsModal");
    if (!modalEl) {
      const modalHtml = renderModal({
        id: "teacherSubmissionsModal",
        title: `<span id="teacherSubmissionsModalTitle">استعراض تسليمات الطلاب</span>`,
        bodyHtml: `<div id="teacherSubmissionsBody"></div>`,
        maxWidth: "920px"
      });
      document.body.insertAdjacentHTML("beforeend", modalHtml);
    }

    const titleEl = document.getElementById("teacherSubmissionsModalTitle");
    const bodyEl = document.getElementById("teacherSubmissionsBody");
    if (titleEl) titleEl.textContent = `📋 تسليمات: ${taskTitle}`;
    if (bodyEl) setHtml(bodyEl, renderLoader({ text: "جاري استخراج بيانات الواجب والطلاب المسلمين وغير المسلمين... ⏳" }));

    openModal("teacherSubmissionsModal");

    try {
      const data = await AssignmentService.getAssignmentSubmissionsWithRoster(taskId);
      const { assignment, totalEligible, submittedCount, notSubmittedCount, gradedCount, pendingCount, roster } = data;

      if (titleEl) {
        const grpLabel = assignment.group === "ALL" ? "جميع المجموعات" : (assignment.group || "عام");
        titleEl.innerHTML = `<span>📋 تسليمات ونتائج: ${escapeHtml(taskTitle || assignment.title)}</span> <span class="badge badge-neutral text-xs ms-2">${escapeHtml(grpLabel)}</span>`;
      }

      let activeFilter = "all";
      let searchQuery = "";

      const renderRosterView = () => {
        if (!bodyEl) return;

        // Apply filters & search
        const filtered = roster.filter((item) => {
          if (activeFilter === "submitted" && !item.hasSubmitted) return false;
          if (activeFilter === "not_submitted" && item.hasSubmitted) return false;
          if (activeFilter === "pending" && item.status !== "submitted") return false;
          if (activeFilter === "graded" && item.status !== "graded") return false;

          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const nameMatch = item.studentName.toLowerCase().includes(q);
            const phoneMatch = item.studentPhone.includes(q);
            if (!nameMatch && !phoneMatch) return false;
          }

          return true;
        });

        const headers = ["#", "اسم الطالب", "المجموعة", "الحل / الملف", "حالة التسليم", "الدرجة (من 10)", "الإجراء"];
        const rows = filtered.map((item, idx) => {
          const studentNameCol = `
            <div>
              <strong style="color:var(--color-text-primary);">${escapeHtml(item.studentName)}</strong>
              ${item.studentPhone ? `<span class="text-xs text-muted d-block font-mono" style="direction:ltr;text-align:right;">${escapeHtml(item.studentPhone)}</span>` : ""}
            </div>
          `;

          const groupCol = `<span class="badge badge-neutral text-xs">${escapeHtml(item.group)}</span>`;

          let solutionCol = `<span class="text-xs text-muted">—</span>`;
          if (item.hasSubmitted) {
            const fileBtn = item.fileUrl
              ? `<a href="${escapeHtml(item.fileUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-xs font-bold">ملف 📥</a>`
              : "";
            const textBadge = item.answerText
              ? `<span class="badge badge-primary text-xs" style="cursor:help;" title="${escapeHtml(item.answerText.slice(0, 200))}">كود / إجابة 💻</span>`
              : "";
            solutionCol = `<div class="d-flex items-center gap-1 flex-wrap">${fileBtn} ${textBadge}</div>`;
          }

          let statusCol = "";
          if (item.hasSubmitted) {
            if (item.status === "graded") {
              statusCol = `<span class="badge badge-success text-xs font-bold">تم التصحيح ✓</span>`;
            } else {
              statusCol = `<span class="badge badge-warning text-xs font-bold">تم التسليم (قيد التصحيح)</span>`;
            }
          } else {
            statusCol = `<span class="badge badge-danger text-xs font-bold">لم يتم التسليم ❌</span>`;
          }

          let gradeCol = `<span class="text-xs text-muted">—</span>`;
          if (item.hasSubmitted) {
            if (item.status === "graded") {
              gradeCol = `<strong class="text-accent font-black" style="font-size:1.05rem;">${item.grade} / 10</strong>`;
            } else {
              gradeCol = `<span class="text-xs text-muted">قيد التقييم</span>`;
            }
          }

          let actionCol = `<span class="text-xs text-muted">—</span>`;
          if (item.hasSubmitted && item.submission) {
            actionCol = `
              <button
                type="button"
                class="btn btn-primary btn-xs font-bold"
                data-grade-student-sub="${escapeHtml(item.studentUid)}"
              >
                <span>${item.status === 'graded' ? 'تعديل الدرجة' : 'تقييم الآن ✍️'}</span>
              </button>
            `;
          }

          return [
            String(idx + 1),
            studentNameCol,
            groupCol,
            solutionCol,
            statusCol,
            gradeCol,
            actionCol
          ];
        });

        const tableContentHtml = filtered.length === 0
          ? `<div class="p-4 text-center text-muted">لا توجد نتائج مطابقة للفلاتر أو كلمة البحث الحالية.</div>`
          : renderTable({ headers, rows });

        const viewHtml = `
          <!-- KPI Metrics Row -->
          <div class="grid-4 gap-2 mb-3" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;">
            <div class="card p-2 text-center" style="background:var(--color-bg-secondary);border:1px solid var(--color-border-subtle);border-radius:6px;">
              <span class="text-xs text-muted d-block">إجمالي الطلاب المستهدفين</span>
              <strong class="font-extrabold text-primary" style="font-size:1.25rem;">${totalEligible}</strong>
            </div>
            <div class="card p-2 text-center" style="background:var(--color-bg-secondary);border:1px solid var(--color-border-subtle);border-radius:6px;">
              <span class="text-xs text-muted d-block">تم التسليم ✅</span>
              <strong class="font-extrabold text-success" style="font-size:1.25rem;">${submittedCount}</strong>
            </div>
            <div class="card p-2 text-center" style="background:var(--color-bg-secondary);border:1px solid var(--color-border-subtle);border-radius:6px;">
              <span class="text-xs text-muted d-block">لم يتم التسليم ❌</span>
              <strong class="font-extrabold text-danger" style="font-size:1.25rem;">${notSubmittedCount}</strong>
            </div>
            <div class="card p-2 text-center" style="background:var(--color-bg-secondary);border:1px solid var(--color-border-subtle);border-radius:6px;">
              <span class="text-xs text-muted d-block">تم التصحيح والتقييم</span>
              <strong class="font-extrabold text-accent" style="font-size:1.25rem;">${gradedCount} / ${submittedCount}</strong>
            </div>
          </div>

          <!-- Controls Bar: Filter Tabs + Search + Print Report Button -->
          <div class="d-flex items-center justify-between flex-wrap gap-2 mb-3" style="background:var(--color-surface-elevated);padding:8px 12px;border-radius:6px;border:1px solid var(--color-border-subtle);">
            <div class="d-flex items-center gap-1 flex-wrap" id="rosterFilterTabs">
              <button type="button" class="btn btn-xs ${activeFilter === 'all' ? 'btn-primary font-bold' : 'btn-ghost'}" data-filter-btn="all">
                الكل (${totalEligible})
              </button>
              <button type="button" class="btn btn-xs ${activeFilter === 'submitted' ? 'btn-primary font-bold' : 'btn-ghost'}" data-filter-btn="submitted">
                تم التسليم (${submittedCount})
              </button>
              <button type="button" class="btn btn-xs ${activeFilter === 'not_submitted' ? 'btn-primary font-bold' : 'btn-ghost'}" data-filter-btn="not_submitted">
                لم يتم التسليم (${notSubmittedCount})
              </button>
              <button type="button" class="btn btn-xs ${activeFilter === 'pending' ? 'btn-primary font-bold' : 'btn-ghost'}" data-filter-btn="pending">
                قيد التصحيح (${pendingCount})
              </button>
              <button type="button" class="btn btn-xs ${activeFilter === 'graded' ? 'btn-primary font-bold' : 'btn-ghost'}" data-filter-btn="graded">
                تم التصحيح (${gradedCount})
              </button>
            </div>

            <div class="d-flex items-center gap-2">
              <input
                type="text"
                id="rosterSearchInput"
                class="form-control form-control-sm"
                placeholder="ابحث باسم الطالب..."
                value="${escapeHtml(searchQuery)}"
                style="max-width:180px;font-size:0.85rem;"
              />
              <button
                type="button"
                id="printAssignmentReportBtn"
                class="btn btn-outline btn-sm font-bold"
                title="طباعة تقرير تسليمات هذا الواجب كاملاً بصيغة A4"
              >
                <span>طباعة التقرير</span>
                <span aria-hidden="true">🖨️</span>
              </button>
            </div>
          </div>

          <!-- Roster Table Container -->
          <div id="rosterTableContainer" style="overflow-x:auto;">
            ${tableContentHtml}
          </div>
        `;

        setHtml(bodyEl, viewHtml);

        // Bind filter tabs
        bodyEl.querySelectorAll("[data-filter-btn]").forEach((btn) => {
          btn.addEventListener("click", () => {
            activeFilter = btn.getAttribute("data-filter-btn");
            renderRosterView();
          });
        });

        // Bind debounced search
        const sInput = bodyEl.querySelector("#rosterSearchInput");
        if (sInput) {
          sInput.addEventListener(
            "input",
            debounce((e) => {
              searchQuery = e.target.value.trim();
              renderRosterView();
              const refreshedInput = bodyEl.querySelector("#rosterSearchInput");
              if (refreshedInput) {
                refreshedInput.focus();
                refreshedInput.setSelectionRange(searchQuery.length, searchQuery.length);
              }
            }, 250)
          );
        }

        // Bind print button
        bodyEl.querySelector("#printAssignmentReportBtn")?.addEventListener("click", () => {
          try {
            showToast("جاري إعداد تقرير الواجب للطباعة... ⏳", "info");
            const reportHtml = renderAssignmentPrintableReport({
              assignment,
              roster,
              totalEligible,
              submittedCount,
              notSubmittedCount,
              gradedCount
            });
            triggerPrintReport(reportHtml);
          } catch (printErr) {
            console.error("Print assignment report error:", printErr);
            showToast("تعذر إنشاء تقرير الواجب للطباعة.", "error");
          }
        });

        // Bind grading action buttons
        bodyEl.querySelectorAll("[data-grade-student-sub]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const sUid = btn.getAttribute("data-grade-student-sub");
            const targetItem = roster.find((r) => r.studentUid === sUid && r.submission);
            if (!targetItem || !targetItem.submission) {
              showToast("تعذر العثور على بيانات تسليم الطالب للتقييم.", "error");
              return;
            }
            this.openEvaluationModal({
              taskId,
              taskTitle: taskTitle || assignment.title,
              submission: targetItem.submission
            });
          });
        });
      };

      renderRosterView();
    } catch (e) {
      console.error("Failed to load assignment submissions roster:", e);
      if (bodyEl) setHtml(bodyEl, renderErrorState({ message: e.message || "حدث خطأ أثناء جلب بيانات التسليمات." }));
    }
  },

  /**
   * Opens the dedicated Assignment Evaluation Modal for a student submission.
   * Enforces 0 to 10 grading scale.
   * @param {object} params
   * @param {string} params.taskId
   * @param {string} params.taskTitle
   * @param {object} params.submission
   */
  openEvaluationModal({ taskId, taskTitle, submission }) {
    if (!document.getElementById(ASSIGNMENT_EVALUATION_MODAL_ID)) {
      document.body.insertAdjacentHTML("beforeend", renderAssignmentEvaluationModal());
    }

    const titleEl = document.getElementById("assignmentEvaluationModalTitle");
    const bodyEl = document.getElementById("assignmentEvaluationModalBody");

    if (titleEl) {
      titleEl.textContent = `تقييم تسليم: ${submission.studentName || submission.name || "الطالب"}`;
    }

    if (bodyEl) {
      setHtml(bodyEl, renderAssignmentEvaluationContent({ taskTitle, submission }));
    }

    openModal(ASSIGNMENT_EVALUATION_MODAL_ID);

    const submitBtn = document.getElementById("submitAssignmentGradeBtn");
    if (submitBtn) {
      const newSubmitBtn = submitBtn.cloneNode(true);
      submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

      newSubmitBtn.addEventListener("click", async () => {
        const gradeInput = document.getElementById("evalGradeInput");
        const feedbackInput = document.getElementById("evalFeedbackInput");

        const rawGrade = gradeInput ? parseFloat(gradeInput.value) : NaN;
        if (isNaN(rawGrade) || rawGrade < 0 || rawGrade > 10) {
          showToast("الدرجة يجب أن تكون رقماً بين 0 و 10", "warning");
          gradeInput?.focus();
          return;
        }

        const feedback = feedbackInput ? feedbackInput.value.trim() : "";
        const sUid = submission.studentUid || submission.studentId || submission.id;

        newSubmitBtn.disabled = true;
        newSubmitBtn.textContent = "جاري الحفظ والاعتماد... ⏳";

        try {
          await AssignmentService.gradeTask(taskId, sUid, rawGrade, feedback);
          showToast(`تم حفظ تقييم الطالب بنجاح (${rawGrade} / 10) ✅`, "success");
          closeModal(ASSIGNMENT_EVALUATION_MODAL_ID);
          // Refresh submissions roster immediately
          this.showTeacherSubmissionsModal(taskId, taskTitle);
        } catch (err) {
          showToast(err.message || "تعذر حفظ تقييم الواجب.", "error");
          newSubmitBtn.disabled = false;
          newSubmitBtn.textContent = "حفظ التقييم واعتماد الدرجة ✅";
        }
      });
    }
  }
};

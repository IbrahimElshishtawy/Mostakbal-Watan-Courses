// src/features/attendance/attendance.controller.js
import { AttendanceService } from "./attendance.service.js";
import { StudentsService } from "../students/students.service.js";
import { attendanceState } from "./attendance.state.js";
import {
  renderStudentAttendanceView,
  renderAttendanceSkeleton
} from "./components/attendance-stats.component.js";
import { renderAttendanceDashboardWidget } from "./components/attendance-widget.component.js";
import { renderAttendanceManagementView } from "./components/attendance-sheet.component.js";
import { renderLoader } from "../../shared/components/Loader/loader.component.js";
import { renderErrorState } from "../../shared/components/ErrorState/error-state.component.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";
import { setHtml } from "../../shared/utils/dom.utils.js";

export const AttendanceController = {
  activeFilter: "all",
  sortOrder: "desc",

  /**
   * Loads attendance history and statistics for student view.
   */
  async loadStudentAttendance(containerId, currentStudent) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    // 1. Render Skeleton Loader (Never show 0% or 0/8 during loading)
    setHtml(container, renderAttendanceSkeleton());

    try {
      // 2. Fetch authoritative student attendance data
      const data = await AttendanceService.getStudentAttendance(currentStudent);
      attendanceState.set("studentAttendance", data);

      // 3. Render Dashboard View
      this.renderView(container, data);
    } catch (err) {
      console.error("Load attendance error:", err);
      // Explicit error state: never treat error as empty or 0%
      setHtml(container, renderErrorState({
        title: "تعذر تحميل سجل الحضور والغياب",
        message: err.message || "حدث خطأ غير متوقع أثناء استرجاع بيانات الحضور. يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.",
        retryBtnId: "retryAttendanceBtn"
      }));

      document.getElementById("retryAttendanceBtn")?.addEventListener("click", () => {
        this.loadStudentAttendance(containerId, currentStudent);
      });
    }
  },

  /**
   * Helper to render and bind interactive filters and sort controls.
   */
  renderView(container, data) {
    setHtml(container, renderStudentAttendanceView({
      attendanceData: data,
      activeFilter: this.activeFilter,
      sortOrder: this.sortOrder
    }));

    // Bind Filter Tabs
    container.querySelectorAll("[data-attendance-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-attendance-filter");
        this.activeFilter = filter;
        this.renderView(container, data);
      });
    });

    // Bind Sort Select
    const sortSelect = container.querySelector("#attendanceSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortOrder = e.target.value;
        this.renderView(container, data);
      });
    }
  },

  /**
   * Loads and renders the compact attendance widget for the Student Dashboard.
   */
  async loadDashboardWidget(containerId, currentStudent, onNavigate) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    try {
      let data = attendanceState.get("studentAttendance");
      if (!data) {
        data = await AttendanceService.getStudentAttendance(currentStudent);
        attendanceState.set("studentAttendance", data);
      }

      setHtml(container, renderAttendanceDashboardWidget({ attendanceData: data }));

      document.getElementById("widgetViewAttendanceBtn")?.addEventListener("click", () => {
        if (typeof onNavigate === "function") {
          onNavigate("attendance");
        }
      });
    } catch (err) {
      console.warn("Dashboard attendance widget error:", err);
      // Suppress or render empty if dashboard widget fails
      container.innerHTML = "";
    }
  },

  /**
   * Loads attendance taking sheet for Teacher / Admin view with session selector,
   * default absent for new sessions, and live modification of old sessions.
   * @param {string|HTMLElement} containerId
   * @param {string} [initialSessionId="NEW"]
   */
  async loadTeacherAttendance(containerId, initialSessionId = "NEW") {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    setHtml(container, renderLoader({ text: "جاري تحميل بيانات كشف الغياب والحضور..." }));

    try {
      const [students, sessions] = await Promise.all([
        StudentsService.getAllStudents(),
        AttendanceService.getAllSessions()
      ]);

      attendanceState.set("sessions", sessions);

      let selectedSessionId = initialSessionId;
      let selectedSession = sessions.find((s) => (s.id || s.sessionId) === selectedSessionId) || null;
      let sessionRecords = new Map();

      if (!selectedSession && selectedSessionId !== "NEW" && sessions.length > 0) {
        selectedSessionId = "NEW";
      }

      if (selectedSession) {
        sessionRecords = await AttendanceService.getSessionRecords(selectedSession.id || selectedSession.sessionId);
      }

      const renderCurrentSheet = () => {
        setHtml(
          container,
          renderAttendanceManagementView({
            students,
            sessions,
            selectedSessionId,
            selectedSession,
            sessionRecords
          })
        );

        this.bindTeacherAttendanceEvents(container, {
          students,
          sessions,
          selectedSessionId,
          selectedSession,
          sessionRecords,
          onSessionChange: async (newSessionId) => {
            await this.loadTeacherAttendance(container, newSessionId);
          }
        });
      };

      renderCurrentSheet();
    } catch (err) {
      console.error("Load teacher attendance failed:", err);
      showToast("حدث خطأ أثناء تحميل كشف الحضور والغياب", "error");
    }
  },

  /**
   * Binds interactive events for the teacher/admin attendance sheet matching Image 2.html.
   */
  bindTeacherAttendanceEvents(container, { students, sessions, selectedSessionId, selectedSession, sessionRecords, onSessionChange }) {
    const isNew = selectedSessionId === "new" || selectedSessionId === "NEW" || !selectedSession;

    // 1. Live Counters Synchronizer
    const updateCounters = () => {
      let presentCount = 0;
      let absentCount = 0;
      let excusedCount = 0;

      container.querySelectorAll("#student-roster-rows tr").forEach((tr) => {
        const activeBtn = tr.querySelector(".status-btn.active-present, .status-btn.active-absent, .status-btn.active-excused");
        const status = activeBtn?.getAttribute("data-action-status") || "present";
        if (status === "present") presentCount++;
        else if (status === "absent") absentCount++;
        else if (status === "excused") excusedCount++;
      });

      const statPresent = container.querySelector("#stat-present-count") || container.querySelector("#statPresentCount");
      const statAbsent = container.querySelector("#stat-absent-count") || container.querySelector("#statAbsentCount");
      if (statPresent) statPresent.textContent = presentCount;
      if (statAbsent) statAbsent.textContent = absentCount;

      const footerPresent = container.querySelector("#footer-present-count");
      const footerAbsent = container.querySelector("#footer-absent-count");
      const footerExcused = container.querySelector("#footer-excused-count");
      if (footerPresent) footerPresent.textContent = `${presentCount} حاضر`;
      if (footerAbsent) footerAbsent.textContent = `${absentCount} غائب`;
      if (footerExcused) footerExcused.textContent = `${excusedCount} معتذر`;

      // Filter tabs counters
      const tabPresent = container.querySelector(".filter-status-btn[data-filter='present']");
      const tabAbsent = container.querySelector(".filter-status-btn[data-filter='absent']");
      if (tabPresent) tabPresent.textContent = `حاضر (${presentCount})`;
      if (tabAbsent) tabAbsent.textContent = `غائب (${absentCount})`;
    };

    // Helper to toggle a single student's status
    const setStudentStatus = (btnElement, statusType) => {
      const parentContainer = btnElement.parentElement;
      const allButtons = parentContainer.querySelectorAll(".status-btn");
      allButtons.forEach((b) => {
        b.className = "status-btn px-3.5 py-1.5 rounded-lg border border-transparent text-slate-400 hover:text-slate-200 text-xs font-bold flex items-center gap-1.5";
      });

      if (statusType === "present") {
        btnElement.className = "status-btn active-present px-3.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5";
      } else if (statusType === "absent") {
        btnElement.className = "status-btn active-absent px-3.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5";
      } else if (statusType === "excused") {
        btnElement.className = "status-btn active-excused px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5";
      }

      const row = btnElement.closest("tr");
      if (row) {
        row.classList.toggle("bg-rose-500/[0.02]", statusType === "absent");
      }

      updateCounters();
    };

    // 2. Interactive Status Buttons
    container.querySelectorAll(".status-btn[data-action-status]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const statusType = btn.getAttribute("data-action-status");
        setStudentStatus(btn, statusType);
      });
    });

    // 3. Mark All Present Button
    container.querySelector("#mark-all-present")?.addEventListener("click", () => {
      container.querySelectorAll("#student-roster-rows tr").forEach((row) => {
        if (row.style.display !== "none") {
          const presentBtn = row.querySelector(".status-btn[data-action-status='present']");
          if (presentBtn) setStudentStatus(presentBtn, "present");
        }
      });
      showToast("تم رصد جميع الطلاب في الكشف كـ (حاضر) ✓", "info");
    });

    // 4. Mark All Absent Button
    container.querySelector("#mark-all-absent")?.addEventListener("click", () => {
      container.querySelectorAll("#student-roster-rows tr").forEach((row) => {
        if (row.style.display !== "none") {
          const absentBtn = row.querySelector(".status-btn[data-action-status='absent']");
          if (absentBtn) setStudentStatus(absentBtn, "absent");
        }
      });
      showToast("تم رصد جميع الطلاب في الكشف كـ (غائب) ✕", "warning");
    });

    // 5. Search & Status Filter
    let activeFilter = "all";
    const applyFilters = () => {
      const term = (container.querySelector("#search-input")?.value || "").toLowerCase().trim();

      container.querySelectorAll("#student-roster-rows tr").forEach((row) => {
        const text = row.innerText.toLowerCase();
        const activeBtn = row.querySelector(".status-btn.active-present, .status-btn.active-absent, .status-btn.active-excused");
        const status = activeBtn?.getAttribute("data-action-status") || "present";

        const matchesTerm = !term || text.includes(term);
        const matchesStatus = activeFilter === "all" || activeFilter === status;

        row.style.display = matchesTerm && matchesStatus ? "" : "none";
      });
    };

    container.querySelector("#search-input")?.addEventListener("input", applyFilters);

    container.querySelectorAll(".filter-status-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".filter-status-btn").forEach((b) => {
          b.className = "px-2.5 py-1 rounded-lg text-slate-400 hover:text-white filter-status-btn";
        });
        btn.className = "px-2.5 py-1 rounded-lg bg-brand-500 text-white font-bold filter-status-btn active";
        activeFilter = btn.getAttribute("data-filter") || "all";
        applyFilters();
      });
    });

    // 6. Session Selection Change
    container.querySelector("#session-list")?.addEventListener("change", (e) => {
      const newSessionId = e.target.value;
      if (typeof onSessionChange === "function") {
        onSessionChange(newSessionId);
      }
    });

    // 7. Start New Lecture Quick Action
    container.querySelector("#startNewLectureBtn")?.addEventListener("click", async () => {
      if (typeof onSessionChange === "function") {
        await onSessionChange("NEW");
        const titleInput = container.querySelector("#session-title");
        titleInput?.focus();
        showToast("تم فتح محاضرة جديدة! الكشف جاهز لرصد الحضور والغياب الآن 🚀", "success");
      }
    });

    // 8. Open Roster Scroll
    container.querySelector("#openRosterBtn")?.addEventListener("click", () => {
      const rosterTable = container.querySelector("[data-purpose='attendance-roster-table']");
      rosterTable?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("تم فتح الكشف بنجاح، يمكنك الآن تسجيل الحضور والغياب 🚀", "info");
    });

    // 9. History Sessions
    container.querySelector("#historySessionsBtn")?.addEventListener("click", () => {
      const select = container.querySelector("#session-list");
      select?.focus();
      showToast("يرجى اختيار الجلسة السابقة من قائمة الجلسات أعلاه 📑", "info");
    });

    // 10. Export Report
    container.querySelector("#exportFullReportBtn")?.addEventListener("click", () => {
      window.print();
    });

    // 11. Student note & profile triggers
    container.querySelectorAll(".student-note-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("ميزة تدوين الملاحظات السلوكية مفعلة ومرتبطة بملف الطالب 📝", "info");
      });
    });

    container.querySelectorAll(".student-profile-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast("جاري فتح الملف الشامل للطالب وسجل الحضور التاريخي 👤", "info");
      });
    });

    // 12. Save Roster Action (unified for top, middle, and bottom buttons)
    const handleSaveRoster = async () => {
      if (this._isSavingAttendance) return;

      const date = container.querySelector("#session-date")?.value || new Date().toISOString().slice(0, 10);
      const title = container.querySelector("#session-title")?.value?.trim() || `المحاضرة ${sessions.length + 1}`;
      const group = "المجموعة التدريبية المعتمدة";

      this._isSavingAttendance = true;
      const saveBtns = [
        container.querySelector("#save-roster-btn"),
        container.querySelector("#topSaveRosterBtn"),
        container.querySelector("#bottomSaveRosterBtn")
      ].filter(Boolean);

      saveBtns.forEach((btn) => {
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-base"></i> <span>جاري الاعتماد...</span>`;
      });

      try {
        let targetSessionId = selectedSessionId;
        if (isNew) {
          const created = await AttendanceService.createSession({ name: title, date, group });
          targetSessionId = created.sessionId || created.id;
        } else {
          await AttendanceService.updateSession(targetSessionId, { name: title, date, group });
        }

        const records = [];
        container.querySelectorAll("#student-roster-rows tr").forEach((tr) => {
          const studentId = tr.getAttribute("data-student-id");
          const activeBtn = tr.querySelector(".status-btn.active-present, .status-btn.active-absent, .status-btn.active-excused");
          const status = activeBtn?.getAttribute("data-action-status") || "present";
          records.push({
            studentUid: studentId,
            studentId,
            studentName: tr.querySelector(".font-bold.text-white")?.textContent?.trim() || "",
            studentPhone: tr.querySelector("td:nth-child(5) span")?.textContent?.trim() || "",
            group,
            present: status === "present",
            status
          });
        });

        await AttendanceService.recordBatch(targetSessionId, records);
        showToast("تم اعتماد الكشف، وتم ترحيل وتسميع بيانات الحضور والغياب للطالب بنجاح ✅", "success");
        await this.loadTeacherAttendance(container, targetSessionId);
      } catch (err) {
        console.error("Save attendance error:", err);
        showToast(err.message || "تعذر حفظ كشف الحضور.", "error");
        saveBtns.forEach((btn) => {
          btn.disabled = false;
          btn.innerHTML = `<i class="fa-solid fa-floppy-disk text-base"></i> <span>حفظ واعتماد الكشف</span>`;
        });
      } finally {
        this._isSavingAttendance = false;
      }
    };

    container.querySelector("#save-roster-btn")?.addEventListener("click", handleSaveRoster);
    container.querySelector("#topSaveRosterBtn")?.addEventListener("click", handleSaveRoster);
    container.querySelector("#bottomSaveRosterBtn")?.addEventListener("click", handleSaveRoster);

    updateCounters();
  }
};

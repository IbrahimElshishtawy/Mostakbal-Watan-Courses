// src/features/students/students.controller.js
import { StudentsService } from "./students.service.js";
import { studentsState } from "./students.state.js";
import { renderStudentListView } from "./components/student-list.component.js";
import { renderStudentStats } from "./components/student-stats.component.js";
import { renderStudentDetailModal, renderStudentDetailContent, renderStudent360Content } from "./components/student-detail.component.js";
import { renderEditStudentModal, populateEditStudentForm } from "./components/student-edit.component.js";
import { renderAddStudentModal, renderResetPasswordModal } from "./components/student-form.component.js";
import { validateStudentData, validateStudentEditData } from "../../shared/validators/student.validator.js";
import { openModal, closeModal } from "../../shared/components/Modal/modal.component.js";
import { renderLoader } from "../../shared/components/Loader/loader.component.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";
import { showConfirmDialog } from "../../shared/components/ConfirmDialog/confirm-dialog.component.js";
import { renderErrorState } from "../../shared/components/ErrorState/error-state.component.js";
import { setHtml } from "../../shared/utils/dom.utils.js";

export const StudentsController = {
  /** Tracks whether modals have been injected to avoid duplicates */
  _modalsInjected: false,

  /**
   * Injects all required modals into document.body once.
   */
  _ensureModals() {
    if (this._modalsInjected) return;

    if (!document.getElementById("addStudentModal")) {
      document.body.insertAdjacentHTML("beforeend", renderAddStudentModal());
    }
    if (!document.getElementById("resetStudentPasswordModal")) {
      document.body.insertAdjacentHTML("beforeend", renderResetPasswordModal());
    }
    if (!document.getElementById("studentDetailModal")) {
      document.body.insertAdjacentHTML("beforeend", renderStudentDetailModal());
    }
    if (!document.getElementById("editStudentModal")) {
      document.body.insertAdjacentHTML("beforeend", renderEditStudentModal());
    }

    this._modalsInjected = true;
  },

  /**
   * Loads all students and renders the complete management view.
   */
  async loadStudentsList(containerId, { canDelete = false } = {}) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) return;

    setHtml(container, renderLoader({ text: "جاري تحميل قائمة الطلاب... 👥" }));

    // Inject all modals once
    this._ensureModals();

    try {
      const [students, absencesMap] = await Promise.all([
        StudentsService.getAllStudents(),
        StudentsService.getStudentAbsencesMap().catch(() => new Map())
      ]);
      studentsState.set("students", students);
      studentsState.set("absencesMap", absencesMap);

      this.renderFullView(container, canDelete);
      this.bindToolbarEvents(container, canDelete);
      this.bindModalForms(container, canDelete);
      this.bindEditForm(container, canDelete);
      this.bindDetailActions(canDelete);
    } catch (err) {
      console.error("Failed to load students:", err);
      showToast(err.message, "error");
      setHtml(
        container,
        renderErrorState({
          title: "تعذر تحميل قائمة الطلاب",
          message: err.message || "حدث خطأ غير متوقع أثناء استرجاع بيانات الطلاب من الخادم.",
          retryBtnText: "إعادة المحاولة 🔄",
        })
      );
      container.querySelector("#retryBtn")?.addEventListener("click", () => {
        this.loadStudentsList(containerId, { canDelete });
      });
    }
  },

  /**
   * Renders the full view: KPI stats + filtered table.
   */
  renderFullView(container, canDelete) {
    const all = studentsState.get("students") || [];
    const groupFilter = studentsState.get("filterGroup") || "ALL";
    const search = (studentsState.get("searchQuery") || "").toLowerCase().trim();
    const absencesMap = studentsState.get("absencesMap") || new Map();

    const filtered = this._filterStudents(all, groupFilter, search);

    const statsHtml = renderStudentStats(all);
    const listHtml = renderStudentListView({
      students: filtered,
      canDelete,
      totalCount: all.length,
      absencesMap
    });

    setHtml(container, statsHtml + listHtml);
    this.bindRowActions(container, canDelete);
  },

  /**
   * Re-renders only the table portion for search/filter performance.
   */
  updateTableOnly(canDelete) {
    const wrapper = document.getElementById("studentsTableWrapper");
    const countEl = document.getElementById("studentCountIndicator");
    if (!wrapper) return;

    const all = studentsState.get("students") || [];
    const groupFilter = studentsState.get("filterGroup") || "ALL";
    const search = (studentsState.get("searchQuery") || "").toLowerCase().trim();
    const absencesMap = studentsState.get("absencesMap") || new Map();

    const filtered = this._filterStudents(all, groupFilter, search);

    // Re-render table
    const tempDiv = document.createElement("div");
    setHtml(tempDiv, renderStudentListView({
      students: filtered,
      canDelete,
      totalCount: all.length,
      absencesMap
    }));

    const newTableWrapper = tempDiv.querySelector("#studentsTableWrapper");
    if (newTableWrapper) {
      wrapper.innerHTML = newTableWrapper.innerHTML;
      this.bindRowActions(wrapper, canDelete);
    }

    // Update count indicator
    if (countEl) {
      countEl.innerHTML = `عرض <strong>${filtered.length}</strong> طالب من أصل <strong>${all.length}</strong>`;
    }
  },

  /**
   * Filters students by group and search term.
   * @private
   */
  _filterStudents(all, groupFilter, search) {
    return all.filter((s) => {
      const name = (s.studentName || s.name || "").toLowerCase();
      const phone = String(s.studentPhone || s.phone || "");
      const group = s.studentGroup || s.group || "ALL";

      const matchesGroup = groupFilter === "ALL" || group === groupFilter;
      const matchesSearch = !search || name.includes(search) || phone.includes(search);

      return matchesGroup && matchesSearch;
    });
  },

  /**
   * Finds a student by UID from the local state.
   * @private
   */
  _findStudent(uid) {
    const all = studentsState.get("students") || [];
    return all.find((s) => (s.id || s.firestoreId) === uid) || null;
  },

  // ─────────────────────────────────────────────
  // TOOLBAR EVENTS (search, filter, add button)
  // ─────────────────────────────────────────────
  bindToolbarEvents(container, canDelete) {
    container.addEventListener("input", (e) => {
      if (e.target.id === "studentSearchInput") {
        studentsState.set("searchQuery", e.target.value);
        this.updateTableOnly(canDelete);
      }
    });

    container.addEventListener("change", (e) => {
      if (e.target.id === "studentGroupFilter") {
        studentsState.set("filterGroup", e.target.value);
        this.updateTableOnly(canDelete);
      }
    });

    container.addEventListener("click", (e) => {
      if (e.target.closest("#openAddStudentModalBtn")) {
        openModal("addStudentModal");
      } else if (e.target.closest("#exportStudentsExcelBtn")) {
        this.exportStudentsExcel();
      } else if (e.target.closest("#importStudentsBatchBtn")) {
        this.openBatchImportDialog(canDelete);
      }
    });
  },

  async _ensureXLSX() {
    if (window.XLSX) return window.XLSX;
    return new Promise((resolve) => {
      const existing = document.querySelector('script[src*="xlsx"]');
      if (existing) {
        if (window.XLSX) return resolve(window.XLSX);
        existing.addEventListener("load", () => resolve(window.XLSX));
        existing.addEventListener("error", () => resolve(null));
        setTimeout(() => resolve(window.XLSX || null), 3000);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
      script.async = true;
      script.onload = () => resolve(window.XLSX);
      script.onerror = () => resolve(null);
      document.head.appendChild(script);
      setTimeout(() => resolve(window.XLSX || null), 4000);
    });
  },

  /**
   * Exports student roster to Excel (.xlsx) with clean Arabic UTF-8 CSV fallback.
   */
  async exportStudentsExcel() {
    try {
      await this._ensureXLSX();
      const all = studentsState.get("students") || [];
      const groupFilter = studentsState.get("filterGroup") || "ALL";
      const search = (studentsState.get("searchQuery") || "").toLowerCase().trim();
      const absencesMap = studentsState.get("absencesMap") || new Map();

      const listToExport = (groupFilter !== "ALL" || search)
        ? this._filterStudents(all, groupFilter, search)
        : all;

      if (!listToExport || listToExport.length === 0) {
        showToast("لا توجد بيانات طلاب لتصديرها حالياً", "warning");
        return;
      }

      const rows = listToExport.map((s, idx) => {
        const phone = s.phone || s.studentPhone || "";
        const nationalId = s.nationalId || "";
        const pass = s.pass || s.password || (nationalId ? String(nationalId).slice(-6) : phone ? phone.slice(-6) : "");
        const sId = s.id || s.firestoreId || s.authUid || phone;
        const absObj = absencesMap.get(sId) || absencesMap.get(phone) || {};
        const absCount = typeof absObj === "number" ? absObj : (absObj.absenceCount || s.absencesCount || 0);

        return {
          "م": idx + 1,
          "اسم الطالب": s.name || s.studentName || "بدون اسم",
          "رقم الهاتف (اسم المستخدم)": phone,
          "الرقم القومي": nationalId,
          "كلمة المرور": pass,
          "الكلية / جهة الدراسة": s.collegeUniversity || s.faculty || "-",
          "الفرقة / السنة الدراسية": s.academicYear || "-",
          "المجموعة الدراسية": s.group || s.studentGroup || "المجموعة التدريبية المعتمدة",
          "العنوان / المحافظة": s.governorate || s.address || "-",
          "مرات الغياب": absCount,
          "كود الحساب (UID)": s.authUid || s.id || "",
          "حالة الحساب": s.active !== false ? "نشط" : "معطل"
        };
      });

      const todayStr = new Date().toISOString().slice(0, 10);
      const filenameBase = `كشف_بيانات_الطلاب_اتحاد_بشبابها_${todayStr}`;

      if (window.XLSX) {
        const ws = window.XLSX.utils.json_to_sheet(rows);
        ws["!dir"] = "rtl";
        ws["!cols"] = [
          { wch: 6 },
          { wch: 30 },
          { wch: 18 },
          { wch: 20 },
          { wch: 16 },
          { wch: 26 },
          { wch: 20 },
          { wch: 22 },
          { wch: 24 },
          { wch: 12 },
          { wch: 32 },
          { wch: 12 }
        ];

        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, "الطلاب");
        window.XLSX.writeFile(wb, `${filenameBase}.xlsx`);
        showToast(`تم تصدير كشف بيانات ${rows.length} طالب إلى ملف Excel بنجاح 📊`, "success");
      } else {
        const headers = Object.keys(rows[0]);
        const csvRows = [
          headers.join(","),
          ...rows.map((row) =>
            headers
              .map((h) => {
                const val = String(row[h] ?? "").replace(/"/g, '""');
                return `"${val}"`;
              })
              .join(",")
          )
        ];
        const csvContent = "\uFEFF" + csvRows.join("\r\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${filenameBase}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast(`تم تصدير كشف بيانات ${rows.length} طالب بنجاح 📊`, "success");
      }
    } catch (err) {
      console.error("Export error:", err);
      showToast("تعذر تصدير بيانات الطلاب: " + (err.message || err), "error");
    }
  },

  /**
   * Opens batch import file dialog for Excel/CSV student files.
   */
  openBatchImportDialog(canDelete) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls, .csv";
    input.style.display = "none";
    document.body.appendChild(input);

    input.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (input.parentNode) input.parentNode.removeChild(input);
      if (!file) return;

      await this._ensureXLSX();

      if (!window.XLSX) {
        showToast("جاري تهيئة قارئ ملفات Excel... يرجى المحاولة بعد قليل", "info");
        return;
      }

      try {
        const data = await file.arrayBuffer();
        const wb = window.XLSX.read(data, { type: "array" });
        const firstSheetName = wb.SheetNames[0];
        const ws = wb.Sheets[firstSheetName];
        const jsonRows = window.XLSX.utils.sheet_to_json(ws, { defval: "" });

        if (!jsonRows || jsonRows.length === 0) {
          showToast("الملف فارغ أو لا يحتوي على بيانات صالحة.", "warning");
          return;
        }

        const parsedStudents = [];
        for (const row of jsonRows) {
          const getField = (...keys) => {
            for (const k of keys) {
              const foundKey = Object.keys(row).find((col) => col.trim().toLowerCase().includes(k.toLowerCase()));
              if (foundKey && String(row[foundKey]).trim()) return String(row[foundKey]).trim();
            }
            return "";
          };

          const name = getField("اسم الطالب", "الاسم", "name", "studentName");
          let phone = getField("رقم التليفون", "رقم الهاتف", "الهاتف", "الموبايل", "phone", "mobile");
          const nationalId = getField("الرقم القومي", "القومي", "nationalId", "nid");
          const address = getField("العنوان", "محل الإقامة", "المحافظة", "address", "governorate");
          const group = getField("المجموعة", "الفرقة", "السنة الدراسية", "group");
          const customPass = getField("كلمة المرور", "الباسورد", "password", "pass");

          phone = phone.replace(/[^\d+]/g, "");
          if (phone.startsWith("+20")) phone = "0" + phone.slice(3);
          if (phone.startsWith("20") && phone.length === 12) phone = phone.slice(1);

          if (phone && phone.length >= 10) {
            const pass = customPass || (nationalId && nationalId.length >= 6 ? nationalId.slice(-6) : phone);
            parsedStudents.push({
              name: name || "طالب جديد",
              phone,
              nationalId,
              address,
              group: group || "المجموعة التدريبية المعتمدة",
              password: pass
            });
          }
        }

        if (parsedStudents.length === 0) {
          showToast("لم يتم العثور على أرقام هواتف صالحة للطلاب في الملف المرفوع.", "error");
          return;
        }

        const confirmed = await showConfirmDialog({
          title: "تأكيد استيراد دفعة طلاب",
          message: `تم العثور على (${parsedStudents.length}) طالب في الملف "${file.name}". هل تريد بدء الاستيراد وتوليد حساباتهم بكلمة المرور (آخر 6 أرقام من الرقم القومي / رقم الهاتف)؟`,
          confirmText: `بدء الاستيراد (${parsedStudents.length}) طالب 🚀`,
          confirmVariant: "primary",
          cancelText: "إلغاء"
        });

        if (!confirmed) return;

        showToast(`جاري استيراد ${parsedStudents.length} طالب، يرجى الانتظار... ⏳`, "info", 6000);

        let importedCount = 0;
        for (const std of parsedStudents) {
          try {
            await StudentsService.createStudent(std);
            importedCount++;
          } catch (err) {
            console.warn(`Failed to import student ${std.name} (${std.phone}):`, err);
          }
        }

        showToast(`تم استيراد ${importedCount} طالب بنجاح ✅`, "success");
        const fresh = await StudentsService.getAllStudents();
        studentsState.set("students", fresh);
        this.updateTableOnly(canDelete);
        this._refreshStats();
      } catch (err) {
        console.error("Batch import error:", err);
        showToast("حدث خطأ أثناء معالجة الملف: " + (err.message || err), "error");
      }
    });

    input.click();
  },

  // ─────────────────────────────────────────────
  // ROW ACTIONS (view, edit, reset pass, delete)
  // ─────────────────────────────────────────────
  bindRowActions(scopeElement, canDelete) {
    // View student detail
    scopeElement.querySelectorAll("[data-view-student]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-view-student");
        this.openStudentDetail(uid, canDelete);
      });
    });

    // Edit student
    scopeElement.querySelectorAll("[data-edit-student]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-edit-student");
        this.openEditStudentModal(uid);
      });
    });

    // Reset password button
    scopeElement.querySelectorAll("[data-reset-pass]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-reset-pass");
        const name = btn.getAttribute("data-student-name");

        const uidInput = document.getElementById("resetPasswordStudentUid");
        const hintEl = document.getElementById("resetPasswordStudentNameHint");
        if (uidInput) uidInput.value = uid;
        if (hintEl) hintEl.textContent = `إعادة تعيين كلمة السر للطالب: ${name}`;

        openModal("resetStudentPasswordModal");
      });
    });

    // Delete student button (Admin)
    if (canDelete) {
      scopeElement.querySelectorAll("[data-delete-student]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const uid = btn.getAttribute("data-delete-student");
          const name = btn.getAttribute("data-student-name");
          this._confirmAndDeleteStudent(uid, name, canDelete);
        });
      });
    }
  },

  // ─────────────────────────────────────────────
  // STUDENT 360 DETAIL
  // ─────────────────────────────────────────────
  async openStudentDetail(uid, canDelete = false) {
    const student = this._findStudent(uid);
    if (!student) {
      showToast("لم يتم العثور على بيانات هذا الطالب", "error");
      return;
    }

    this._ensureModals();
    openModal("studentDetailModal");

    const bodyEl = document.getElementById("studentDetailBody");
    if (bodyEl) {
      setHtml(bodyEl, renderLoader({ text: "جاري تجميع الملف الشامل للطالب 360°... ⏳" }));
    }

    try {
      const data360 = await StudentsService.getStudent360Data(uid);
      if (bodyEl) {
        setHtml(bodyEl, renderStudent360Content(data360, { canDelete }));
        this._bindDetailInternalActions(bodyEl, canDelete);

        // Bind 360 Tab Switching
        bodyEl.querySelectorAll("[data-s360-tab]").forEach((tabBtn) => {
          tabBtn.addEventListener("click", () => {
            const target = tabBtn.getAttribute("data-s360-tab");
            bodyEl.querySelectorAll("[data-s360-tab]").forEach((b) => b.classList.remove("active"));
            tabBtn.classList.add("active");

            const panes = {
              overview: bodyEl.querySelector("#s360TabOverview"),
              exams: bodyEl.querySelector("#s360TabExams"),
              assignments: bodyEl.querySelector("#s360TabAssignments"),
              attendance: bodyEl.querySelector("#s360TabAttendance"),
              game: bodyEl.querySelector("#s360TabGame")
            };

            Object.entries(panes).forEach(([key, pane]) => {
              if (pane) {
                pane.style.display = key === target ? "block" : "none";
              }
            });
          });
        });
      }
    } catch (err) {
      console.error("Failed to load student 360 data:", err);
      if (bodyEl) {
        setHtml(bodyEl, renderErrorState({ title: "تعذر تحميل الملف الشامل", message: err.message }));
      }
    }
  },

  /**
   * Binds action buttons inside the detail modal content.
   * @private
   */
  _bindDetailInternalActions(bodyEl, canDelete) {
    // Edit from detail
    bodyEl.querySelectorAll("[data-detail-edit-student]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-detail-edit-student");
        closeModal("studentDetailModal");
        this.openEditStudentModal(uid);
      });
    });

    // Reset password from detail
    bodyEl.querySelectorAll("[data-detail-reset-pass]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-detail-reset-pass");
        const name = btn.getAttribute("data-student-name");

        closeModal("studentDetailModal");

        const uidInput = document.getElementById("resetPasswordStudentUid");
        const hintEl = document.getElementById("resetPasswordStudentNameHint");
        if (uidInput) uidInput.value = uid;
        if (hintEl) hintEl.textContent = `إعادة تعيين كلمة السر للطالب: ${name}`;

        openModal("resetStudentPasswordModal");
      });
    });

    // Delete from detail
    if (canDelete) {
      bodyEl.querySelectorAll("[data-detail-delete-student]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const uid = btn.getAttribute("data-detail-delete-student");
          const name = btn.getAttribute("data-student-name");
          closeModal("studentDetailModal");
          this._confirmAndDeleteStudent(uid, name, canDelete);
        });
      });
    }
  },

  /**
   * Binds delegated events for detail modal actions (global, once).
   */
  bindDetailActions(canDelete) {
    // This is handled internally via _bindDetailInternalActions when the modal opens
  },

  // ─────────────────────────────────────────────
  // EDIT STUDENT
  // ─────────────────────────────────────────────
  openEditStudentModal(uid) {
    const student = this._findStudent(uid);
    if (!student) {
      showToast("لم يتم العثور على بيانات هذا الطالب", "error");
      return;
    }

    populateEditStudentForm(student);
    openModal("editStudentModal");
  },

  /**
   * Binds the edit student form submit handler.
   */
  bindEditForm(container, canDelete) {
    const editForm = document.getElementById("editStudentForm");
    if (!editForm || editForm._bound) return;
    editForm._bound = true;

    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const uid = document.getElementById("editStudentUid")?.value;
      const name = document.getElementById("editStudentName")?.value;
      const nationalId = document.getElementById("editStudentNationalId")?.value;
      const address = document.getElementById("editStudentAddress")?.value;
      const group = document.getElementById("editStudentGroup")?.value;

      const submitBtn = document.getElementById("submitEditStudentBtn");

      try {
        const validated = validateStudentEditData({ name, nationalId, address, group });

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "جاري حفظ التعديلات... ⏳";
        }

        await StudentsService.updateStudent(uid, validated);
        showToast("تم تحديث بيانات الطالب بنجاح ✅", "success");
        closeModal("editStudentModal");

        // Update local state directly for instant feedback
        const all = studentsState.get("students") || [];
        const updated = all.map((s) => {
          if ((s.id || s.firestoreId) === uid) {
            return { ...s, ...validated };
          }
          return s;
        });
        studentsState.set("students", updated);
        this.updateTableOnly(canDelete);

        // Also refresh stats
        this._refreshStats();
      } catch (err) {
        showToast(err.message, "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = "حفظ التعديلات ✅";
        }
      }
    });
  },

  /**
   * Refreshes the KPI stats bar without reloading the whole view.
   * @private
   */
  _refreshStats() {
    const statsContainer = document.getElementById("studentStatsBar");
    if (statsContainer) {
      const all = studentsState.get("students") || [];
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = renderStudentStats(all);
      const newStats = tempDiv.querySelector("#studentStatsBar");
      if (newStats) {
        statsContainer.innerHTML = newStats.innerHTML;
      }
    }
  },

  // ─────────────────────────────────────────────
  // DELETE STUDENT
  // ─────────────────────────────────────────────
  async _confirmAndDeleteStudent(uid, name, canDelete) {
    const confirmed = await showConfirmDialog({
      title: "حذف حساب طالب",
      message: `هل أنت متأكد من حذف حساب الطالب "${name}" نهائياً؟ ⚠️ لا يمكن التراجع عن هذه الخطوة وسيتم حذف الحساب وبياناته بالكامل.`,
      confirmText: "نعم، حذف الحساب 🗑️",
      confirmVariant: "danger",
      cancelText: "إلغاء",
    });

    if (confirmed) {
      try {
        await StudentsService.deleteStudent(uid);
        showToast("تم حذف حساب الطالب بنجاح", "info");
        // Refresh state
        const updated = (studentsState.get("students") || []).filter((s) => (s.id || s.firestoreId) !== uid);
        studentsState.set("students", updated);
        this.updateTableOnly(canDelete);
        this._refreshStats();

        const badgeAdmin = document.getElementById("adminNavStudentsBadge");
        if (badgeAdmin) badgeAdmin.textContent = updated.length;
        const badgeTeacher = document.getElementById("teacherNavStudentsBadge");
        if (badgeTeacher) badgeTeacher.textContent = updated.length;
      } catch (err) {
        showToast(err.message, "error");
      }
    }
  },

  // ─────────────────────────────────────────────
  // ADD & RESET PASSWORD FORMS
  // ─────────────────────────────────────────────
  bindModalForms(container, canDelete) {
    // Add student form
    const addForm = document.getElementById("addStudentForm");
    if (addForm && !addForm._bound) {
      addForm._bound = true;
      addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("newStudentName")?.value;
        const phone = document.getElementById("newStudentPhone")?.value;
        const password = document.getElementById("newStudentPassword")?.value;
        const nationalId = document.getElementById("newStudentNationalId")?.value;
        const address = document.getElementById("newStudentAddress")?.value;
        const group = document.getElementById("newStudentGroup")?.value;

        const submitBtn = document.getElementById("submitAddStudentBtn");
        try {
          const validated = validateStudentData({ name, phone, nationalId, address, group, password });
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "جاري الحفظ والتسجيل... ⏳";
          }

          await StudentsService.createStudent(validated);
          showToast("تم إنشاء حساب الطالب وتعيين كلمة المرور بنجاح ✅", "success");
          closeModal("addStudentModal");
          addForm.reset();

          // Reload students list
          const fresh = await StudentsService.getAllStudents();
          studentsState.set("students", fresh);
          this.updateTableOnly(canDelete);
          this._refreshStats();

          const badgeAdmin = document.getElementById("adminNavStudentsBadge");
          if (badgeAdmin) badgeAdmin.textContent = fresh.length;
          const badgeTeacher = document.getElementById("teacherNavStudentsBadge");
          if (badgeTeacher) badgeTeacher.textContent = fresh.length;
        } catch (err) {
          showToast(err.message, "error");
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "إضافة الطالب وتوليد الحساب 🚀";
          }
        }
      });
    }

    // Reset password form
    const resetForm = document.getElementById("resetStudentPasswordForm");
    if (resetForm && !resetForm._bound) {
      resetForm._bound = true;
      resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const uid = document.getElementById("resetPasswordStudentUid")?.value;
        const newPass = document.getElementById("resetNewPasswordInput")?.value?.trim();
        const submitBtn = document.getElementById("submitResetPasswordBtn");

        if (!uid || !newPass || newPass.length < 6) {
          showToast("كلمة المرور يجب ألا تقل عن 6 أحرف أو أرقام.", "warning");
          return;
        }

        try {
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "جاري التحديث... ⏳";
          }
          await StudentsService.resetPassword(uid, newPass);
          showToast("تم تغيير كلمة المرور بنجاح 🔐", "success");
          closeModal("resetStudentPasswordModal");
          resetForm.reset();
        } catch (err) {
          showToast(err.message, "error");
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "حفظ كلمة المرور الجديدة 🔐";
          }
        }
      });
    }
  }
};

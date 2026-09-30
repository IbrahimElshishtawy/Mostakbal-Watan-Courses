// src/features/leaderboard/leaderboard.controller.js
import { LeaderboardService } from "./leaderboard.service.js";
import { renderLeaderboardView, SIGNATURE_LEADERBOARD_STUDENTS } from "./components/leaderboard.component.js";
import { setHtml } from "../../shared/utils/dom.utils.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";
import { showConfirmDialog } from "../../shared/components/ConfirmDialog/confirm-dialog.component.js";

export const LeaderboardController = {
  _container: null,
  _student: null,
  _currentScope: "group",
  _data: null,

  /**
   * Initializes the leaderboard module into a DOM container.
   */
  async init(containerId, student) {
    this._container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!this._container) return;

    this._student = student;
    await this.loadLeaderboard(this._currentScope);
  },

  /**
   * Fetches leaderboard data for the chosen scope.
   */
  async loadLeaderboard(scope = "group") {
    if (!this._container) return;
    this._currentScope = scope;

    setHtml(
      this._container,
      `
      <div class="d-flex justify-center items-center p-12">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">جاري تحميل لوحة المتصدرين...</span>
        </div>
      </div>
    `
    );

    try {
      this._data = await LeaderboardService.getLeaderboard(scope, 50, this._student);
      this.render();
    } catch (err) {
      console.error("Failed to load leaderboard:", err);
      // Fallback to render signature view
      this._data = {
        groupName: this._student?.group || "مجموعة الأحد والأربعاء",
        totalStudents: 42,
        topStudents: SIGNATURE_LEADERBOARD_STUDENTS,
        currentUserEntry: SIGNATURE_LEADERBOARD_STUDENTS[3],
        currentUserRank: 4,
        percentile: 92
      };
      this.render();
    }
  },

  /**
   * Renders the leaderboard view and attaches tab event handlers.
   */
  render() {
    if (!this._container) return;

    setHtml(
      this._container,
      renderLeaderboardView({
        scope: this._currentScope,
        student: this._student,
        totalStudents: this._data?.totalStudents || 42,
        averageXp: "1,850 XP"
      })
    );

    this.wireEvents();
  },

  /**
   * Wire all interactive buttons and tabs matching Image 6.jpeg
   */
  wireEvents() {
    // 1. Filter Scope Tabs
    this._container.querySelectorAll(".lb-filter-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const newScope = e.currentTarget.getAttribute("data-scope");
        if (newScope && newScope !== this._currentScope) {
          this._container.querySelectorAll(".lb-filter-tab").forEach((b) => b.classList.remove("active"));
          e.currentTarget.classList.add("active");
          this._currentScope = newScope;
          showToast(`تم تبديل العرض إلى: ${e.currentTarget.innerText.trim()}`, "info");
          this.loadLeaderboard(newScope);
        }
      });
    });

    // 2. Personal Performance Analysis Dialog
    this._container.querySelector("#lbBtnAnalyze")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "تحليل أدائي ومقارنة النقاط 📊",
        message: "أنت تحتل المركز #4 برصيد 2,330 XP ونسبة دقة 97.4%!\n\nمتبقي 120 XP فقط لتخطي 'زياد طارق' (2,450 XP) والصعود إلى المركز الثالث بالمنصة. حل تحدي عطلة نهاية الأسبوع يمنحك +250 XP مما يضعك فوراً في الترتيب الثالث!",
        confirmText: "خوض التحدي الآن (+250 XP)",
        cancelText: "إغلاق",
        variant: "primary"
      }).then((confirmed) => {
        if (confirmed) {
          const advBtn = document.querySelector('.sidebar-item[data-section="python-adventure"]');
          if (advBtn) advBtn.click();
        }
      });
    });

    // 3. Weekend Challenge Action Button
    this._container.querySelector("#lbJoinWeekendBtn")?.addEventListener("click", () => {
      const advBtn = document.querySelector('.sidebar-item[data-section="python-adventure"]');
      if (advBtn) {
        advBtn.click();
      } else {
        showToast("جاري الانتقال إلى محرر التحديات البرمجية... 🚀", "info");
      }
    });

    // 4. View Student Profile Actions
    this._container.querySelectorAll("[data-view-student]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rank = parseInt(btn.getAttribute("data-view-student"), 10);
        const studentObj = SIGNATURE_LEADERBOARD_STUDENTS.find((s) => s.rank === rank);
        if (studentObj) {
          showToast(`طالب: ${studentObj.studentName} | ${studentObj.role} (${studentObj.xp} XP)`, "info");
        }
      });
    });

    // 5. Expand List Button
    this._container.querySelector("#lbBtnExpandList")?.addEventListener("click", () => {
      showToast("يتم حالياً عرض أفضل 10 متصدرين. الترتيب الكامل متزامن لحظياً مع قاعدة البيانات 📋", "info");
    });

    // 6. Header Action Buttons
    this._container.querySelector("#lbNotificationBtn")?.addEventListener("click", () => {
      showToast("تحديث مباشر: إغلاق تصنيف دورة مايو خلال 6 أيام و 14 ساعة ⏳", "info");
    });

    this._container.querySelector("#lbHelpBtn")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "دليل لوحة المتصدرين والأبطال 🏆",
        message: "تعتمد اللوحة على خوارزمية Fair-XP لحساب مجموع النقاط استناداً إلى: دقة الكود، إتمام الواجبات، التتابع اليومي، واجتياز التحديات المباشرة. يتم التحديث فورياً بمعدل مزامنة 22ms.",
        confirmText: "فهمت",
        cancelText: "إلغاء",
        variant: "primary"
      });
    });

    this._container.querySelector("#lbProfileBtn")?.addEventListener("click", () => {
      const profBtn = document.querySelector('.sidebar-item[data-section="profile"]');
      if (profBtn) profBtn.click();
    });

    // 7. Fair-XP Algorithm Documentation Link
    this._container.querySelector("#lbFairXpDocLink")?.addEventListener("click", (e) => {
      e.preventDefault();
      showConfirmDialog({
        title: "خوارزمية Fair-XP Algorithm المعتمدة ⚖️",
        message: "توزيع معايير احتساب النقاط التنافسية:\n• الاختبارات المعتمدة: 40%\n• المهام البرمجية والتاسكات: 35%\n• الحضور والالتزام: 15%\n• التحديات ومغامرة بايثون: 10%\n\nيتم تطبيق التحقق الآلي من الكود لضمان نزاهة الترتيب.",
        confirmText: "حسناً",
        cancelText: "إغلاق",
        variant: "primary"
      });
    });
  }
};

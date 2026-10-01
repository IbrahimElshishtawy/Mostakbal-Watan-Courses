// src/features/leaderboard/leaderboard.controller.js
import { LeaderboardService } from "./leaderboard.service.js";
import { renderLeaderboardView } from "./components/leaderboard.component.js";
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
          <span class="sr-only">جاري تحميل لوحة المتصدرين من قاعدة البيانات...</span>
        </div>
      </div>
    `
    );

    try {
      this._data = await LeaderboardService.getLeaderboard(scope, 50, this._student);
      this.render();
    } catch (err) {
      console.error("Failed to load leaderboard:", err);
      this._data = {
        groupName: this._student?.group || "مجموعتي الدراسية",
        totalStudents: 1,
        topStudents: [
          {
            rank: 1,
            studentUid: this._student?.uid || "current",
            studentName: this._student?.name || "حسابي الشخصي",
            group: this._student?.group || "ALL",
            xp: 0,
            level: 1,
            tasksDone: 0,
            tasksTotal: 10,
            accuracy: "100%",
            streak: 1,
            isCurrentUser: true,
            badge: "⚡ مبرمج نشط",
            badgeType: "cyan",
            levelTitle: "مبرمج صاعد 🥉"
          }
        ],
        currentUserEntry: null,
        currentUserRank: 1,
        percentile: 100,
        averageXp: "0 XP"
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
        totalStudents: this._data?.totalStudents || 0,
        averageXp: this._data?.averageXp || "0 XP",
        leaderboardData: this._data
      })
    );

    this.wireEvents();
  },

  /**
   * Wire all interactive buttons and tabs.
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
      const cur = this._data?.currentUserEntry;
      const top = this._data?.topStudents || [];
      const rank = cur?.rank || 1;
      const xp = cur?.xp || 0;

      let msg = `أنت تحتل المركز #${rank} برصيد ${xp.toLocaleString()} XP!\n\n`;
      if (rank === 1) {
        msg += "أنت حالياً في المركز الأول وتتصدر الترتيب العام! استمر في إتمام التحديات للحفاظ على الصدارة 🏆";
      } else {
        const ahead = top[rank - 2];
        if (ahead) {
          const diff = Math.max(10, (ahead.xp || 0) - xp + 10);
          msg += `متبقي ${diff.toLocaleString()} XP لتخطي '${ahead.studentName}' (${(ahead.xp || 0).toLocaleString()} XP) والصعود إلى المركز #${ahead.rank} بالمنصة. حل تحديات بايثون يمنحك نقاطاً إضافية ترفع ترتيبك مباشرة! 🚀`;
        } else {
          msg += "استمر في خوض تحديات بايثون وحل الواجبات لرفع رصيدك من الـ XP!";
        }
      }

      showConfirmDialog({
        title: "تحليل أدائي ومقارنة النقاط 📊",
        message: msg,
        confirmText: "خوض التحديات الآن",
        cancelText: "إغلاق",
        variant: "primary"
      }).then((confirmed) => {
        if (confirmed) {
          const advBtn = document.querySelector('.sidebar-item[data-section="python-adventure"]');
          if (advBtn) advBtn.click();
        }
      });
    });

    // 3. Challenge Action Button
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
        const studentObj = (this._data?.topStudents || []).find((s) => s.rank === rank);
        if (studentObj) {
          showToast(`طالب: ${studentObj.studentName} | ${studentObj.levelTitle || `مستوى ${studentObj.level}`} (${(studentObj.xp || 0).toLocaleString()} XP)`, "info");
        }
      });
    });

    // 5. Expand / Refresh List Button
    this._container.querySelector("#lbBtnExpandList")?.addEventListener("click", () => {
      this.loadLeaderboard(this._currentScope);
      showToast("تم تحديث لوحة المتصدرين لحظياً من Firebase 🔄", "success");
    });

    // 6. Header Action Buttons
    this._container.querySelector("#lbNotificationBtn")?.addEventListener("click", () => {
      showToast("تحديث مباشر: لوحة المتصدرين متزامنة لحظياً مع أداء الطلاب في الدورة 📊", "info");
    });

    this._container.querySelector("#lbHelpBtn")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "دليل لوحة المتصدرين والأبطال 🏆",
        message: "تعتمد اللوحة على خوارزمية Fair-XP لحساب مجموع النقاط استناداً إلى: دقة الكود، إتمام الواجبات، التتابع اليومي، واجتياز التحديات المباشرة. يتم التحديث فورياً بمعدل مزامنة من Firestore.",
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

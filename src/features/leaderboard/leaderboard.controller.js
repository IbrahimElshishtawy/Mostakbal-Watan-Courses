// src/features/leaderboard/leaderboard.controller.js
import { LeaderboardService } from "./leaderboard.service.js";
import { renderLeaderboardView } from "./components/leaderboard.component.js";
import { setHtml } from "../../shared/utils/dom.utils.js";

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
      <div class="d-flex justify-center items-center p-8">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">جاري تحميل بيانات لوحة المتصدرين...</span>
        </div>
      </div>
    `
    );

    try {
      this._data = await LeaderboardService.getLeaderboard(scope, 50, this._student);
      this.render();
    } catch (err) {
      console.error("Failed to load leaderboard:", err);
      setHtml(
        this._container,
        `
        <div class="alert alert-danger m-4">
          <strong>تعذر تحميل لوحة المتصدرين.</strong>
          <p>${err.message || "يرجى المحاولة مرة أخرى لاحقاً."}</p>
          <button type="button" id="lbRetryBtn" class="btn btn-primary mt-2">إعادة المحاولة 🔄</button>
        </div>
      `
      );
      document.getElementById("lbRetryBtn")?.addEventListener("click", () => this.loadLeaderboard(this._currentScope));
    }
  },

  /**
   * Renders the leaderboard view and attaches tab event handlers.
   */
  render() {
    if (!this._container || !this._data) return;

    setHtml(
      this._container,
      renderLeaderboardView({
        scope: this._currentScope,
        groupName: this._data.groupName || this._student?.group || "ALL",
        totalStudents: this._data.totalStudents || 0,
        topStudents: this._data.topStudents || [],
        currentUserEntry: this._data.currentUserEntry,
        currentUserRank: this._data.currentUserRank || 1,
        percentile: this._data.percentile || 100
      })
    );

    // Bind Scope Tabs & Filter Buttons
    this._container.querySelectorAll(".lb-filter-btn, .lb-scope-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const newScope = e.currentTarget.getAttribute("data-scope");
        if (newScope) {
          this._container.querySelectorAll(".lb-filter-btn").forEach((b) => b.classList.remove("active"));
          e.currentTarget.classList.add("active");
          this.loadLeaderboard(newScope);
        }
      });
    });

    // Bind Weekend Challenge button
    this._container.querySelector("#joinWeekendChallengeBtn")?.addEventListener("click", () => {
      const advBtn = document.querySelector('.sidebar-item[data-section="python-adventure"]');
      if (advBtn) advBtn.click();
    });
  }
};

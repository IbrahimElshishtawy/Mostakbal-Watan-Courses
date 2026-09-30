// src/features/problem-solving/components/competitive-dashboard-widget.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Returns HTML string for the competitive student dashboard overview widget.
 */
export function renderCompetitiveDashboardWidget({ stats = {} }) {
  const {
    currentLevel = 1,
    levelName = "مبتدئ (Beginner)",
    points = 0,
    solvedCount = 0,
    totalCount = 25,
    streak = 1,
    dailyChallenge = {
      id: "prob-l1-01",
      title: "حساب مجموع رقمين في بايثون sum_two(a, b)",
      level: 1,
      points: 10
    }
  } = stats;

  return `
    <div class="dash-competitive-card">
      <div class="dash-comp-header">
        <div class="dash-comp-title-box">
          <span class="comp-icon">⚡</span>
          <h4 class="comp-title">مستوى التنافس والأداء (Python L1)</h4>
        </div>
        <div class="dash-comp-actions">
          <button type="button" id="dashGoToLeaderboardBtn" class="btn-comp-ghost" title="لوحة المتصدرين">
            <span>لوحة المتصدرين 🏆</span>
          </button>
        </div>
      </div>

      <!-- Quick Metrics Strip -->
      <div class="dash-comp-metrics-strip">
        <div class="comp-metric-pill level">
          <span class="pill-label">المستوى:</span>
          <span class="pill-value">L${currentLevel} مبتدئ</span>
        </div>
        <div class="comp-metric-pill points">
          <span class="pill-icon">💎</span>
          <span class="pill-value">${points} نقطة</span>
        </div>
        <div class="comp-metric-pill solved">
          <span class="pill-icon">🎯</span>
          <span class="pill-value">${solvedCount}/${totalCount} محلول</span>
        </div>
        <div class="comp-metric-pill streak">
          <span class="pill-icon">🔥</span>
          <span class="pill-value">ستريك ${streak}</span>
        </div>
      </div>

      <!-- Daily Challenge Box -->
      <div class="dash-daily-challenge-box">
        <div class="daily-challenge-text">
          <div class="daily-tag">⭐ التحدي اليومي السريع</div>
          <strong class="daily-title">${escapeHtml(dailyChallenge.title || "حساب مجموع رقمين في بايثون sum_two(a, b)")}</strong>
          <span class="daily-reward">مكافأة الحل: +${dailyChallenge.points || 10} XP للمتصدرين</span>
        </div>
        <button
          type="button"
          class="btn-daily-challenge"
          id="dashSolveDailyBtn"
          data-problem-id="${escapeHtml(dailyChallenge.id || 'prob-l1-01')}"
        >
          <span>+10 XP ابدأ الحل الآن</span>
          <span class="btn-icon">🚀</span>
        </button>
      </div>
    </div>
  `;
}

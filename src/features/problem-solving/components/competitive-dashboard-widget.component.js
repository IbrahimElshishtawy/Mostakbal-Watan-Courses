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
    rank = "—",
    streak = 1,
    dailyChallenge = {
      id: "prob-l1-01",
      title: "حساب مجموع رقمين",
      level: 1,
      points: 10,
      difficulty: "easy"
    },
    unlockedBadgesCount = 0,
    totalBadgesCount = 8
  } = stats;

  const progressPercent = Math.min(100, Math.round((solvedCount / (totalCount || 1)) * 100));

  return `
    <div class="competitive-dash-widget mb-4">
      <div class="competitive-dash-header">
        <div class="d-flex items-center gap-3">
          <div class="competitive-dash-icon">⚡</div>
          <div>
            <h3 class="competitive-dash-title">لوحة أداء بايثون والتحديات البرمجية</h3>
            <p class="competitive-dash-subtitle">تدرج عبر 5 مستويات تنافسية واكسب النقاط والألقاب المعتمدة.</p>
          </div>
        </div>
        <div class="competitive-dash-actions">
          <button type="button" id="dashGoToProblemsBtn" class="btn btn-primary btn-sm">
            <span>انطلق للتحديات البرمجية</span>
            <span>🚀</span>
          </button>
          <button type="button" id="dashGoToLeaderboardBtn" class="btn btn-outline btn-sm">
            <span>لوحة المتصدرين</span>
            <span>🏆</span>
          </button>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="competitive-metrics-grid mt-3">
        <!-- Metric 1: Level -->
        <div class="comp-metric-card">
          <span class="comp-metric-label">المستوى الحالي</span>
          <div class="comp-metric-value text-primary">
            <span>L${currentLevel}</span>
            <small class="comp-metric-sub">${escapeHtml(levelName)}</small>
          </div>
        </div>

        <!-- Metric 2: Points -->
        <div class="comp-metric-card">
          <span class="comp-metric-label">مجموع النقاط التنافسية</span>
          <div class="comp-metric-value text-gold">
            <span>💎 ${points}</span>
            <small class="comp-metric-sub">نقطة مكتسبة</small>
          </div>
        </div>

        <!-- Metric 3: Rank -->
        <div class="comp-metric-card">
          <span class="comp-metric-label">الترتيب العام</span>
          <div class="comp-metric-value text-accent">
            <span>${rank === 1 ? "🥇 #1" : rank === 2 ? "🥈 #2" : rank === 3 ? "🥉 #3" : (rank !== "—" ? `#${rank}` : "—")}</span>
            <small class="comp-metric-sub">بين جميع الطلاب</small>
          </div>
        </div>

        <!-- Metric 4: Solved -->
        <div class="comp-metric-card">
          <span class="comp-metric-label">المسائل المحلولة</span>
          <div class="comp-metric-value">
            <span>${solvedCount} / ${totalCount}</span>
            <small class="comp-metric-sub">${progressPercent}% إنجاز</small>
          </div>
        </div>

        <!-- Metric 5: Streak -->
        <div class="comp-metric-card">
          <span class="comp-metric-label">التتابع اليومي</span>
          <div class="comp-metric-value text-danger">
            <span>🔥 ${streak}</span>
            <small class="comp-metric-sub">أيام متتالية</small>
          </div>
        </div>

        <!-- Metric 6: Badges -->
        <div class="comp-metric-card">
          <span class="comp-metric-label">الأوسمة والألقاب</span>
          <div class="comp-metric-value text-success">
            <span>🎖️ ${unlockedBadgesCount}/${totalBadgesCount}</span>
            <small class="comp-metric-sub">أوسمة مفتوحة</small>
          </div>
        </div>
      </div>

      <!-- Daily Challenge Feature Banner -->
      <div class="daily-challenge-banner mt-3">
        <div class="d-flex items-center gap-3">
          <span class="daily-badge">⭐ تحدي اليوم</span>
          <div>
            <strong class="text-white">${escapeHtml(dailyChallenge.title || "تحدي بايثون السريع")}</strong>
            <span class="text-xs text-muted d-block mt-0.5">
              المستوى ${dailyChallenge.level || 1} · مكافأة: +${dailyChallenge.points || 10} نقطة تنافسية
            </span>
          </div>
        </div>
        <button type="button" class="btn btn-gold btn-sm" id="dashSolveDailyBtn" data-problem-id="${escapeHtml(dailyChallenge.id || 'prob-l1-01')}">
          <span>حل التحدي الآن</span>
          <span>⚡</span>
        </button>
      </div>
    </div>
  `;
}

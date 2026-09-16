// src/features/profile/components/competitive-profile.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderCard } from "../../../shared/components/Card/card.component.js";

/**
 * Returns HTML string for the comprehensive Student Competitive Profile Card.
 */
export function renderCompetitiveProfileCard({ competitiveData = {} }) {
  const {
    currentLevel = 1,
    levelTitle = "مبتدئ (Beginner)",
    totalPoints = 0,
    problemsSolved = 0,
    totalProblems = 25,
    problemsFailed = 0,
    successRate = 100,
    currentRank = "—",
    bestRank = "—",
    streak = 1,
    badges = [],
    levelsProgress = [],
    recentSubmissions = []
  } = competitiveData;

  const contentHtml = `
    <!-- Top Stats Row -->
    <div class="comp-stats-overview-grid mb-6">
      <div class="comp-stat-box">
        <span class="stat-icon">⚡</span>
        <div class="stat-meta">
          <small>المستوى الحالي</small>
          <strong>L${currentLevel} · ${escapeHtml(levelTitle)}</strong>
        </div>
      </div>

      <div class="comp-stat-box">
        <span class="stat-icon">💎</span>
        <div class="stat-meta">
          <small>إجمالي النقاط</small>
          <strong class="text-gold">${totalPoints} نقطة</strong>
        </div>
      </div>

      <div class="comp-stat-box">
        <span class="stat-icon">🎯</span>
        <div class="stat-meta">
          <small>المسائل المحلولة</small>
          <strong>${problemsSolved} <span class="text-muted text-xs">/ ${totalProblems}</span></strong>
        </div>
      </div>

      <div class="comp-stat-box">
        <span class="stat-icon">❌</span>
        <div class="stat-meta">
          <small>المحاولات غير المكتملة</small>
          <strong class="text-danger">${problemsFailed}</strong>
        </div>
      </div>

      <div class="comp-stat-box">
        <span class="stat-icon">📈</span>
        <div class="stat-meta">
          <small>معدل النجاح الدقيق</small>
          <strong class="text-success">${successRate}%</strong>
        </div>
      </div>

      <div class="comp-stat-box">
        <span class="stat-icon">🏆</span>
        <div class="stat-meta">
          <small>الترتيب الحالي / الأفضل</small>
          <strong class="text-accent">
            ${currentRank === 1 ? "🥇 #1" : currentRank === 2 ? "🥈 #2" : currentRank === 3 ? "🥉 #3" : (currentRank !== "—" ? `#${currentRank}` : "—")}
            <span class="text-xs text-muted font-normal">(الأفضل: #${bestRank})</span>
          </strong>
        </div>
      </div>

      <div class="comp-stat-box">
        <span class="stat-icon">🔥</span>
        <div class="stat-meta">
          <small>سلسلة التتابع الحالية</small>
          <strong class="text-danger">${streak} أيام متتالية</strong>
        </div>
      </div>
    </div>

    <!-- Levels Mastery Progress -->
    <div class="comp-section-block mb-6">
      <h4 class="comp-section-title">
        <span>🗺️ تقدم المستويات الخمسة (Problem Solving Levels)</span>
      </h4>
      <div class="comp-levels-bars-grid mt-3">
        ${(levelsProgress || []).map((lvl) => {
          const pct = lvl.total > 0 ? Math.min(100, Math.round((lvl.solved / lvl.total) * 100)) : 0;
          const isDone = pct === 100;
          return `
            <div class="comp-level-bar-card ${isDone ? 'completed' : ''}">
              <div class="d-flex items-center justify-between mb-1">
                <strong class="text-sm text-white">L${lvl.level} - ${escapeHtml(lvl.title)}</strong>
                <span class="text-xs font-bold ${isDone ? 'text-success' : 'text-muted'}">
                  ${isDone ? '✓ مكتمل (+Bonus)' : `${lvl.solved}/${lvl.total} (${pct}%)`}
                </span>
              </div>
              <div class="comp-progress-track">
                <div class="comp-progress-fill ${isDone ? 'bg-success' : ''}" style="width:${pct}%;"></div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Badges & Titles Grid -->
    <div class="comp-section-block mb-6">
      <div class="d-flex items-center justify-between mb-3">
        <h4 class="comp-section-title">
          <span>🎖️ الألقاب والأوسمة التنافسية (Titles & Badges)</span>
        </h4>
        <span class="text-xs text-muted font-bold">
          ${badges.filter(b => b.unlocked).length} / ${badges.length} وسام معتمد
        </span>
      </div>
      <div class="comp-badges-grid">
        ${(badges || []).map((b) => {
          return `
            <div class="comp-badge-card ${b.unlocked ? 'unlocked' : 'locked'}">
              <div class="comp-badge-icon">${escapeHtml(b.icon || '🎖️')}</div>
              <div class="comp-badge-info">
                <strong class="comp-badge-name">${escapeHtml(b.title)}</strong>
                <p class="comp-badge-desc">${escapeHtml(b.description)}</p>
                <div class="comp-badge-status mt-1">
                  ${b.unlocked
                    ? `<span class="badge badge-success text-xs">✓ محقق</span>`
                    : `<span class="badge badge-secondary text-xs">🔒 قيد التحدي</span>`
                  }
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Recent Submissions History -->
    <div class="comp-section-block">
      <h4 class="comp-section-title mb-3">
        <span>📜 سجل المحاولات الأخيرة (Recent Submissions)</span>
      </h4>
      ${(!recentSubmissions || recentSubmissions.length === 0) ? `
        <div class="empty-state p-4 text-center">
          <span class="text-2xl d-block mb-1">✍️</span>
          <p class="text-muted text-sm m-0">لم تسجل أي إرسال برمجي بعد. ابدأ بحل أول مسألة في المستوى الأول!</p>
        </div>
      ` : `
        <div class="table-wrapper">
          <table class="table-modern">
            <thead>
              <tr>
                <th>المسألة البرمجية</th>
                <th>الحالة</th>
                <th>النقاط المكتسبة</th>
                <th>تاريخ الإرسال</th>
              </tr>
            </thead>
            <tbody>
              ${recentSubmissions.map((sub) => {
                const isPassed = sub.status === "passed";
                const dateStr = sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString("ar-EG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
                return `
                  <tr>
                    <td><strong>${escapeHtml(sub.challengeTitle || sub.challengeId || "مسألة بايثون")}</strong></td>
                    <td>
                      ${isPassed
                        ? `<span class="badge badge-success">✓ تم الحل بنجاح</span>`
                        : `<span class="badge badge-danger">✗ لم يجتز الفحص</span>`
                      }
                    </td>
                    <td><span class="text-gold font-bold">+${sub.pointsAwarded || (isPassed ? 10 : 0)} 💎</span></td>
                    <td class="text-xs text-muted">${escapeHtml(dateStr)}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;

  return renderCard({
    title: "سجل الإنجاز التنافسي والأوسمة (Python Problem Solving)",
    icon: "⚡",
    content: contentHtml
  });
}

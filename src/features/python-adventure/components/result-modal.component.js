// src/features/python-adventure/components/result-modal.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Challenge Result Feedback Modal (Success or Failure)
 * with deep Code Complexity, Anti-Cheat, and Clean Code Review.
 */
export function renderResultModal({
  passed = false,
  earnedXp = 0,
  stars = 3,
  levelUp = false,
  newLevel = 1,
  feedback = "",
  errorDetails = "",
  skillsGained = [],
  newlyUnlockedAchievements = [],
  hasNextChallenge = true,
  nextChallengeId = null,
  codeAnalysis = null,
  attemptsCount = 1,
  maxAttempts = 2,
  isTimeout = false
}) {
  const attemptsLeft = Math.max(0, maxAttempts - attemptsCount);
  const attemptsExhausted = attemptsLeft <= 0;

  return `
    <div class="adventure-modal-overlay" id="adventureResultModal" role="dialog" aria-modal="true">
      <div class="adventure-modal-card result-card ${passed ? "success" : "failure"}">
        ${passed ? `
          <!-- SUCCESS STATE -->
          <div class="result-celebration-header">
            <div class="result-badge-anim">🎉</div>
            <h3 class="result-title">أحسنت صنعاً! تم اجتياز التحدي</h3>
            <p class="result-subtitle">تم إثبات كفاءة الكود واجتياز جميع حالات الاختبار بنجاح.</p>
          </div>

          <div class="result-rewards-row">
            <div class="result-xp-chip">+${earnedXp} XP</div>
            <div class="result-stars-chip">
              <span class="${stars >= 1 ? "star-lit" : "star-dim"}">★</span>
              <span class="${stars >= 2 ? "star-lit" : "star-dim"}">★</span>
              <span class="${stars >= 3 ? "star-lit" : "star-dim"}">★</span>
            </div>
            <div class="result-attempts-chip">
              المحاولة: ${attemptsCount} من ${maxAttempts}
            </div>
          </div>

          ${levelUp ? `
            <div class="result-levelup-banner">
              <span>🚀 ارتقيت إلى الرتبة البرمجية: <strong>Level ${newLevel}</strong>!</span>
            </div>
          ` : ""}

          <!-- ACADEMIC CODE ANALYSIS CARD -->
          ${renderCodeAnalysisSection(codeAnalysis)}

          ${newlyUnlockedAchievements.length > 0 ? `
            <div class="result-achievement-unlock">
              ${newlyUnlockedAchievements.map((ach) => `
                <div class="ach-unlock-card">
                  <span class="ach-icon">${ach.icon || "🏆"}</span>
                  <div>
                    <strong>وسام جديد: ${escapeHtml(ach.title)}</strong>
                    <p class="text-xs text-muted">${escapeHtml(ach.description || "")}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          ` : ""}

          ${skillsGained.length > 0 ? `
            <div class="result-skills-box">
              <strong class="text-xs text-muted">المهارات المكتسبة:</strong>
              <div class="skills-tags-wrap">
                ${skillsGained.map((sk) => `<span class="skill-tag">✓ ${escapeHtml(sk)}</span>`).join("")}
              </div>
            </div>
          ` : ""}

          <div class="result-actions-row">
            ${hasNextChallenge ? `
              <button type="button" class="btn btn-primary btn-lg w-100" id="resultNextMissionBtn">
                <span>المهمة التالية ➔</span>
              </button>
            ` : `
              <button type="button" class="btn btn-primary btn-lg w-100" id="resultReturnMapBtn">
                <span>🏆 تم إكمال هذا المسار - العودة للخريطة</span>
              </button>
            `}
            <button type="button" class="btn btn-secondary w-100 mt-2" id="resultReturnMapBtnSecondary">
              <span>خريطة العوالم</span>
            </button>
          </div>

        ` : `
          <!-- FAILURE / CONSTRUCTIVE STATE -->
          <div class="result-fail-header">
            <div class="result-badge-anim fail">${isTimeout ? "⏱️" : "❌"}</div>
            <h3 class="result-title text-warning">
              ${isTimeout ? "انتهت المهلة المحددة للتحدي" : (attemptsExhausted ? "استنفدت محاولات الحل المتاحة" : "لم تنجح المهمة بعد")}
            </h3>
            <p class="result-subtitle">
              ${isTimeout
                ? "انتهى الوقت المسموح به لحل هذا التحدي لمنع الغش البرمجي."
                : (attemptsExhausted
                  ? `تم استنفاد المحاولتين المسموحتين (${maxAttempts}/${maxAttempts}) لهذا التحدي لمنع التخمين العشوائي.`
                  : `تبقت لك فرصة واحدة فقط (${attemptsLeft} من ${maxAttempts})! راجع كودك بعناية واختبره قبل التسليم.`)}
            </p>
          </div>

          <!-- ACADEMIC CODE ANALYSIS CARD (EVEN ON FAIL) -->
          ${renderCodeAnalysisSection(codeAnalysis)}

          <div class="result-feedback-box">
            <div class="feedback-icon">${isTimeout ? "⏳" : "💡"}</div>
            <div class="feedback-text">
              <p>${escapeHtml(feedback || "الكود لم يحقق الناتج المطلوب تماماً. راجع المتطلبات وجرب مرة أخرى.")}</p>
              ${errorDetails ? `<pre class="feedback-error-pre" dir="ltr"><code>${escapeHtml(errorDetails)}</code></pre>` : ""}
            </div>
          </div>

          <div class="result-actions-row">
            ${!attemptsExhausted && !isTimeout ? `
              <button type="button" class="btn btn-primary btn-lg w-100" id="resultTryAgainBtn">
                <span>🔄 العودة وتعديل الكود (فرصة أخيرة ${attemptsLeft}/${maxAttempts})</span>
              </button>
              <button type="button" class="btn btn-secondary w-100 mt-2" id="resultGetHintBtn">
                <span>💡 طلب تلميح إضافي</span>
              </button>
            ` : `
              <button type="button" class="btn btn-primary btn-lg w-100" id="resultReturnMapBtn">
                <span>🗺️ العودة لخريطة العوالم</span>
              </button>
            `}
          </div>
        `}
      </div>
    </div>
  `;
}

function renderCodeAnalysisSection(codeAnalysis) {
  if (!codeAnalysis) return "";

  const time = codeAnalysis.timeComplexity || {};
  const space = codeAnalysis.spaceComplexity || {};
  const clean = codeAnalysis.cleanCode || {};
  const antiCheat = codeAnalysis.antiCheat || {};

  return `
    <div class="result-code-analysis-card">
      <div class="analysis-card-header">
        <div class="d-flex items-center gap-2">
          <span class="analysis-icon">🔬</span>
          <h4 class="analysis-title">التقرير الأكاديمي الشامل وتحليل الكود</h4>
        </div>
        <span class="integrity-chip ${antiCheat.isHardcoded ? "warning" : "safe"}">
          ${escapeHtml(antiCheat.integrityBadge || "🛡️ كود خوارزمي معتمد")}
        </span>
      </div>

      <!-- Metrics Grid -->
      <div class="analysis-metrics-grid">
        <div class="analysis-metric-box">
          <span class="metric-label">التعقيد الزمني (Time)</span>
          <strong class="metric-val ${time.rating || "optimal"}">${escapeHtml(time.notation || "O(N)")}</strong>
          <span class="metric-sub">${escapeHtml(time.label || "")}</span>
        </div>

        <div class="analysis-metric-box">
          <span class="metric-label">التعقيد المكاني (Space)</span>
          <strong class="metric-val ${space.rating || "optimal"}">${escapeHtml(space.notation || "O(1)")}</strong>
          <span class="metric-sub">${escapeHtml(space.label || "")}</span>
        </div>

        <div class="analysis-metric-box">
          <span class="metric-label">مؤشر جودة الكود (Clean Code)</span>
          <strong class="metric-val quality">${clean.score || 85}%</strong>
          <span class="metric-sub">${escapeHtml(clean.gradeLabel || "كود متقن")}</span>
        </div>
      </div>

      <!-- Academic Reviewer Quote -->
      ${codeAnalysis.academicFeedback ? `
        <div class="analysis-feedback-quote">
          <span class="quote-icon">👨‍🏫</span>
          <p class="quote-text">${escapeHtml(codeAnalysis.academicFeedback)}</p>
        </div>
      ` : ""}

      ${clean.badges?.length > 0 ? `
        <div class="analysis-badges-row">
          ${clean.badges.map((b) => `<span class="analysis-badge-pill">✓ ${escapeHtml(b)}</span>`).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

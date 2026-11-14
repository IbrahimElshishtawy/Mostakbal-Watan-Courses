// src/features/python-adventure/components/challenge-view.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderCodeEditor } from "./code-editor.component.js";
import { PythonHeartsService } from "../python-hearts.service.js";

/**
 * Renders the full interactive Coding Challenge Workspace
 * with Anti-Cheat Countdown Timer, Hearts System (3 Hearts), and 2-Attempt Limit with Cooldown.
 */
export function renderChallengeView({
  challenge,
  code,
  output,
  error,
  hintsRevealed = 0,
  attempts = 0,
  maxAttempts = 2,
  heartsState = null,
  challengeCooldown = null,
  timeRemainingSeconds = null,
  timeLimitMinutes = 15,
  isTimeExpired = false,
  isRunning = false,
  isSubmitting = false,
  solutionRevealed = false
}) {
  if (!challenge) return "";

  const hints = challenge.hints || [];
  const requirements = challenge.requirements || [];

  const effectiveLimitMinutes = challenge.timeLimitMinutes || timeLimitMinutes || 15;
  const currentRemaining = timeRemainingSeconds !== null ? timeRemainingSeconds : effectiveLimitMinutes * 60;
  const minutes = Math.floor(Math.max(0, currentRemaining) / 60);
  const seconds = Math.max(0, currentRemaining) % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const attemptsLeft = Math.max(0, maxAttempts - (attempts || 0));
  const attemptsExhausted = attemptsLeft <= 0;
  const isCooldownLocked = Boolean(challengeCooldown?.isOnCooldown);
  const isNoHeartsLocked = Boolean(heartsState?.isEmpty);
  const isLocked = isTimeExpired || attemptsExhausted || isCooldownLocked || isNoHeartsLocked;

  let submitBtnText = "تسليم الحل والتحقق";
  if (isSubmitting) submitBtnText = "جاري التحقق...";
  else if (isNoHeartsLocked) submitBtnText = "💔 نفدت القلوب (0/3)";
  else if (isCooldownLocked) submitBtnText = `⏳ استراحة تفكير (${challengeCooldown?.formattedRemaining || "03:00"})`;
  else if (isTimeExpired) submitBtnText = "انتهت المهلة";
  else if (attemptsExhausted) submitBtnText = "استنفدت المحاولات (0/2)";

  return `
    <div class="adventure-challenge-wrapper">
      <!-- Challenge Top Bar -->
      <div class="challenge-topbar">
        <div class="d-flex items-center gap-2">
          <button type="button" class="btn btn-sm btn-secondary" id="challengeBackBtn">
            <span>➔ العودة للخريطة</span>
          </button>
          <div class="challenge-meta">
            <span class="challenge-world-label">${escapeHtml(challenge.worldTitle || "عالم بايثون")} • Level ${challenge.levelNumber}</span>
            <h2 class="challenge-main-title">${escapeHtml(challenge.title)}</h2>
          </div>
        </div>

        <div class="challenge-topbar-actions">
          <!-- Hearts Indicator Pill -->
          ${PythonHeartsService.renderHeartsPillHtml(heartsState)}

          <!-- Anti-Cheat Countdown Timer -->
          <div class="challenge-timer-pill ${currentRemaining <= 60 ? "urgent" : (currentRemaining <= 180 ? "warning" : "safe")}" id="pyLiveTimerPill" title="مهلة التحدي الزمنية لمكافحة الغش">
            <span class="timer-icon">⏱️</span>
            <span class="timer-label">المتبقي:</span>
            <strong class="timer-digits" id="pyLiveTimerDigits">${formattedTime}</strong>
          </div>

          <button type="button" class="btn btn-sm btn-secondary" id="challengeLessonBtn">
            <span>📖 مراجعة الشرح</span>
          </button>
          <div class="challenge-reward-badge">
            <span class="reward-xp">+${challenge.baseXp} XP</span>
            <span class="reward-stars">★★★</span>
          </div>
        </div>
      </div>

      <!-- Main Split Workspace -->
      <div class="challenge-workspace-grid">
        <!-- Sidebar: Mission, Requirements & Hints -->
        <aside class="challenge-sidebar-pane">
          <!-- Mission Instructions -->
          <div class="challenge-card mission-instructions-card">
            <div class="card-header-mini">
              <span class="icon">📜</span>
              <h3>المطلوب في المهمة</h3>
            </div>
            <p class="mission-desc">${escapeHtml(challenge.story)}</p>

            ${requirements.length > 0 ? `
              <div class="mission-requirements-box">
                <strong class="requirements-title">قائمة المتطلبات:</strong>
                <ul class="requirements-list">
                  ${requirements.map((req) => `<li><span class="check-mark">✓</span> <span>${escapeHtml(req)}</span></li>`).join("")}
                </ul>
              </div>
            ` : ""}
          </div>

          <!-- Progressive Hint System -->
          <div class="challenge-card hints-system-card" id="hintsSystemCard">
            ${renderHintsCardContent({ challenge, hintsRevealed, attempts, solutionRevealed })}
          </div>
        </aside>

        <!-- Main Code Editor & Terminal Pane -->
        <main class="challenge-editor-pane">
          ${isNoHeartsLocked ? `
            <div class="challenge-cooldown-banner no-hearts-banner" role="alert">
              <div class="cooldown-banner-icon">💔</div>
              <div class="cooldown-banner-content">
                <h4 class="text-rose-400 font-bold">نفدت جميع قلوبك (0/${heartsState?.maxHearts || 3})</h4>
                <p>لقد استنفدت كل القلوب المتاحة للتحديات. خذ استراحة وراجع دروس وشروحات بايثون... سيتجدد قلب إضافي تلقائياً خلال:</p>
                <div class="cooldown-timer-badge">
                  <span>⏳ متبقي لشحن قلب:</span>
                  <strong class="font-mono text-cyan-300" id="pyBannerHeartsCountdown">${heartsState?.formattedNextHeart || "10:00"}</strong>
                </div>
              </div>
            </div>
          ` : (isCooldownLocked ? `
            <div class="challenge-cooldown-banner challenge-waiting-banner" role="alert">
              <div class="cooldown-banner-icon">⏳</div>
              <div class="cooldown-banner-content">
                <h4 class="text-amber-400 font-bold">استراحة تفكير ومراجعة (المحاولتان استنفدتا)</h4>
                <p>لقد أخطأت في المحاولتين السابقتين وخسرت قلباً واحداً (تبقى لديك ${heartsState?.hearts ?? 2} من 3 ❤️). خذ استراحة لمراجعة الشرح وتصحيح المنطق قبل فتح المحاولة الجديدة.</p>
                <div class="cooldown-timer-badge">
                  <span>⏳ متبقي لإعادة فتح المحاولة:</span>
                  <strong class="font-mono text-amber-300" id="pyBannerCooldownCountdown">${challengeCooldown?.formattedRemaining || "03:00"}</strong>
                </div>
              </div>
            </div>
          ` : "")}

          <!-- Editor Slot -->
          <div class="editor-slot ${isLocked ? "editor-locked" : ""}" id="challengeEditorSlot">
            ${renderCodeEditor({ initialCode: code })}
          </div>

          <!-- Interactive Action Buttons Bar -->
          <div class="challenge-actions-bar">
            <div class="d-flex items-center gap-2">
              <button type="button" class="btn btn-secondary btn-run" id="pyRunBtn" ${isRunning || isSubmitting || isTimeExpired ? "disabled" : ""}>
                <span class="btn-icon">${isRunning ? "⏳" : "▶"}</span>
                <span>${isRunning ? "جاري التشغيل..." : "تشغيل الكود"}</span>
              </button>
              <button type="button" class="btn btn-primary btn-submit ${isLocked ? "btn-disabled-locked" : ""}" id="pySubmitBtn" ${isRunning || isSubmitting || isLocked ? "disabled" : ""}>
                <span class="btn-icon">${isSubmitting ? "⏳" : (isLocked ? "🔒" : "🚀")}</span>
                <span>${submitBtnText}</span>
              </button>
            </div>

            <!-- Attempts Badge -->
            <div class="challenge-status-indicator">
              <div class="challenge-attempts-pill ${attemptsLeft === 2 ? "safe" : (attemptsLeft === 1 ? "warning" : "danger")}" id="pyChallengeAttemptsPill">
                <span class="attempts-icon">🎯</span>
                <span class="attempts-text">المحاولات المتبقية: <strong id="pyChallengeAttemptsCount">${attemptsLeft} من ${maxAttempts}</strong></span>
              </div>
            </div>
          </div>

          <!-- Terminal Output Console -->
          <div class="py-terminal-card" dir="ltr">
            <div class="py-terminal-header">
              <div class="d-flex items-center gap-2">
                <span class="terminal-dot red"></span>
                <span class="terminal-dot yellow"></span>
                <span class="terminal-dot green"></span>
                <span class="terminal-title">Terminal Console</span>
              </div>
              <button type="button" class="terminal-clear-btn" id="pyClearTerminalBtn" title="مسح المخرجات">
                Clear
              </button>
            </div>

            <div class="py-terminal-output" id="pyTerminalOutput" role="region" aria-live="polite">
              ${error ? `<div class="terminal-error">${escapeHtml(error)}</div>` : ""}
              ${output ? `<div class="terminal-stdout">${escapeHtml(output)}</div>` : ""}
              ${!output && !error ? `<div class="terminal-placeholder text-muted"># اضغط "تشغيل الكود" لمعاينة المخرجات هنا...</div>` : ""}
            </div>
          </div>
        </main>
      </div>
    </div>
  `;
}

/**
 * Renders only the inner HTML of the hints card for surgical, lag-free updates.
 */
export function renderHintsCardContent({ challenge, hintsRevealed = 0, attempts = 0, solutionRevealed = false }) {
  if (!challenge) return "";

  const hints = challenge.hints || [];
  const revealedHints = hints.slice(0, hintsRevealed);
  const hasMoreHints = hintsRevealed < hints.length;

  // XP discount label
  let penaltyLabel = "100% XP (كامل المكافأة)";
  if (solutionRevealed) penaltyLabel = "20% XP (تم عرض الحل)";
  else if (hintsRevealed === 1) penaltyLabel = "90% XP (-10% لاستخدام مساعدة)";
  else if (hintsRevealed === 2) penaltyLabel = "75% XP (-25% لمساعدتين)";
  else if (hintsRevealed >= 3) penaltyLabel = "50% XP (-50% لـ 3 مساعدات)";

  return `
    <div class="card-header-mini">
      <div class="d-flex items-center gap-2">
        <span class="icon">💡</span>
        <h3>إرشادات التفكير والتلميحات</h3>
      </div>
      <span class="hints-penalty-badge text-xs">${penaltyLabel}</span>
    </div>

    <!-- Revealed Hints List -->
    <div class="hints-container">
      ${revealedHints.length === 0 ? `
        <p class="no-hints-msg text-xs text-muted">
          حاول حل المهمة بنفسك أولاً للحصول على الدرجة الكاملة و 3 نجوم! لديك محاولتان فقط للتسليم النهائي، فاختبر كودك جيداً بزر "تشغيل الكود".
        </p>
      ` : `
        <div class="revealed-hints-list">
          ${revealedHints.map((hint, idx) => `
            <div class="hint-bubble">
              <strong class="hint-num">إرشاد ${idx + 1}:</strong>
              <span>${escapeHtml(hint)}</span>
            </div>
          `).join("")}
        </div>
      `}
    </div>

    <!-- Hint Actions -->
    <div class="hint-actions-row">
      ${hasMoreHints ? `
        <button type="button" class="btn btn-sm btn-secondary w-100" id="revealNextHintBtn">
          <span>💡 إرشاد خطوة إضافي (${hintsRevealed + 1} من ${hints.length})</span>
        </button>
      ` : `
        <div class="all-hints-used text-xs text-muted text-center py-1">
          تم فتح جميع الإرشادات التوجيهية المتاحة لهذه المهمة.
        </div>
      `}
    </div>
  `;
}

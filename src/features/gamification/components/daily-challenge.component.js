// src/features/gamification/components/daily-challenge.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Adaptive 6-Question Daily Challenge quiz interface.
 */
export function renderDailyChallengeView(state) {
  const { challenge, activeQuestionIndex = 0, selectedOption = null, submittedResult = null, isSubmitting = false } = state;

  if (!challenge || !challenge.questions || !challenge.questions.length) {
    return `
      <div class="gam-quiz-card text-center p-8">
        <div class="text-4xl mb-3">⏳</div>
        <h3 class="text-lg font-bold text-white mb-2">جاري تجهيز تحدي اليوم الذكي...</h3>
        <p class="text-xs text-slate-400">نقوم بتحديد الأسئلة الستة المتكيفة مع مستواك البرمجي.</p>
      </div>
    `;
  }

  const questions = challenge.questions;
  const currentQ = questions[activeQuestionIndex] || questions[0];
  const qId = currentQ.id;
  const isAnswered = !!(challenge.answers && challenge.answers[qId]);
  const answeredInfo = isAnswered ? challenge.answers[qId] : null;

  // Calculate remaining time from expiresAt
  const expiresMs = new Date(challenge.expiresAt).getTime();
  const diffMs = Math.max(0, expiresMs - Date.now());
  const hoursLeft = Math.floor(diffMs / (3600 * 1000));
  const minsLeft = Math.floor((diffMs % (3600 * 1000)) / (60 * 1000));

  const totalScore = challenge.totalScore || 0;
  const isAllAnswered = Object.keys(challenge.answers || {}).length >= questions.length;

  return `
    <div class="gam-quiz-card" id="gamQuizCard">
      <!-- Quiz Header Strip -->
      <div class="gam-quiz-header">
        <div>
          <div class="d-flex items-center gap-2 mb-1">
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
              تحدي الـ 24 ساعة اليومي 🎯
            </span>
            <span class="gam-timer-badge">
              <span>⏳ متبقي:</span>
              <span id="gamTimerCounter">${hoursLeft} س و ${minsLeft} د</span>
            </span>
          </div>
          <p class="text-xs text-slate-400">
            مستوى التحدي: 
            <strong class="text-white">${challenge.difficultyTier === "advanced" ? "متقدم (Advanced) 🔥" : challenge.difficultyTier === "intermediate" ? "متوسط (Intermediate) ⚡" : "تأسيسي (Beginner) 🌱"}</strong>
            • الدورة: ${escapeHtml(challenge.cycleDate || "")}
          </p>
        </div>

        <!-- 6 Step Indicator Dots -->
        <div class="gam-step-dots" role="tablist" aria-label="أسئلة التحدي الستة">
          ${questions.map((q, idx) => {
            const ans = challenge.answers && challenge.answers[q.id];
            let dotClass = "";
            if (ans) {
              dotClass = ans.isCorrect ? "correct" : "wrong";
            } else if (idx === activeQuestionIndex) {
              dotClass = "active";
            }
            return `
              <button type="button" 
                      class="gam-step-dot ${dotClass}" 
                      data-q-idx="${idx}"
                      title="السؤال ${idx + 1} (${q.difficulty})">
                ${ans ? (ans.isCorrect ? "✓" : "✗") : (idx + 1)}
              </button>
            `;
          }).join("")}
        </div>
      </div>

      ${isAllAnswered ? `
        <!-- Completion Summary Showcase -->
        <div class="text-center p-6 bg-slate-900/60 rounded-2xl border border-emerald-500/30 mb-6">
          <div class="text-5xl mb-3">🎉</div>
          <h3 class="text-xl font-black text-white mb-1">أحسنت يا بطل! أتممت جميع أسئلة التحدي</h3>
          <p class="text-sm text-slate-300 mb-4">
            النتيجة النهائية: <strong class="text-emerald-400 font-bold">${totalScore} من ${questions.length}</strong> 
            • إجمالي نقاط الـ XP المكتسبة: <strong class="text-amber-400 font-bold">+${challenge.totalXpEarned || 0} XP</strong>
          </p>
          <div class="d-inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span>✨ تم صرف بونص الإكمال الشامل (+10 XP) تلقائياً!</span>
          </div>
        </div>
      ` : ""}

      <!-- Active Question Section -->
      <div class="gam-question-body">
        <div class="d-flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-slate-400">السؤال رقم ${activeQuestionIndex + 1} من ${questions.length}</span>
          <span class="badge" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3);">
            ${escapeHtml(currentQ.topic)} • +${currentQ.xpReward} XP
          </span>
        </div>

        <h3 class="gam-question-text">${escapeHtml(currentQ.questionText)}</h3>

        <!-- Options List -->
        <div class="gam-options-grid">
          ${currentQ.answerOptions.map((optText, optIdx) => {
            let optClass = "";
            const isSelected = selectedOption === optIdx || (answeredInfo && answeredInfo.selectedOption === optIdx);
            if (isSelected) optClass += " selected";

            if (isAnswered && answeredInfo) {
              if (submittedResult && submittedResult.correctAnswer === optIdx) {
                optClass += " is-correct";
              } else if (answeredInfo.selectedOption === optIdx && !answeredInfo.isCorrect) {
                optClass += " is-wrong";
              }
            }

            return `
              <button type="button" 
                      class="gam-option-btn ${optClass}" 
                      data-option-idx="${optIdx}"
                      ${isAnswered ? "disabled" : ""}>
                <span class="gam-option-key">${["أ", "ب", "ج", "د"][optIdx] || optIdx + 1}</span>
                <span class="gam-option-label">${escapeHtml(optText)}</span>
              </button>
            `;
          }).join("")}
        </div>

        <!-- Feedback & Explanation (Rendered after answer) -->
        ${(isAnswered || submittedResult) ? `
          <div class="gam-explanation-box">
            <div class="d-flex items-center gap-2 mb-2 font-bold ${((submittedResult?.isCorrect ?? answeredInfo?.isCorrect) ? "text-emerald-400" : "text-rose-400")}">
              <span>${(submittedResult?.isCorrect ?? answeredInfo?.isCorrect) ? "✅ إجابة صحيحة وممتازة!" : "❌ إجابة غير موفقة"}</span>
              ${(submittedResult?.xpEarned || answeredInfo?.xpEarned) ? `<span class="badge bg-emerald-500/20 text-emerald-300">+${submittedResult?.xpEarned || answeredInfo?.xpEarned} XP</span>` : ""}
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              ${escapeHtml(submittedResult?.explanation || "تم تسجيل إجابتك واعتماد النتيجة في سجلك التعليمي.")}
            </p>
          </div>
        ` : ""}

        <!-- Actions Row -->
        <div class="d-flex items-center justify-between flex-wrap gap-3 mt-4">
          <div class="d-flex gap-2">
            <button type="button" 
                    id="gamPrevQBtn" 
                    class="btn btn-secondary px-4 py-2 text-xs" 
                    ${activeQuestionIndex === 0 ? "disabled" : ""}>
              السابق ⬅️
            </button>
            <button type="button" 
                    id="gamNextQBtn" 
                    class="btn btn-secondary px-4 py-2 text-xs" 
                    ${activeQuestionIndex === questions.length - 1 ? "disabled" : ""}>
              التالي ➡️
            </button>
          </div>

          ${!isAnswered ? `
            <button type="button" 
                    id="gamSubmitAnswerBtn" 
                    class="btn btn-primary px-6 py-2 font-bold text-sm"
                    ${selectedOption === null || isSubmitting ? "disabled" : ""}>
              ${isSubmitting ? "جاري الاعتماد... ⏳" : "تأكيد الإجابة واعتماد النقاط 🚀"}
            </button>
          ` : `
            <span class="text-xs text-emerald-400 font-bold">✓ تم تسليم إجابة هذا السؤال</span>
          `}
        </div>
      </div>
    </div>
  `;
}

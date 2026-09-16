// src/features/exams/components/my-mistakes.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the "My Mistakes / أخطائي" review section for an exam.
 */
export function renderMyMistakesSection({ wrongAnswers = [], examTitle = "الامتحان" }) {
  if (!Array.isArray(wrongAnswers) || wrongAnswers.length === 0) {
    return `
      <div class="my-mistakes-box empty">
        <div class="mistakes-celebrate-icon">🌟</div>
        <h3 class="font-bold text-success mb-1">لا توجد أخطاء لمراجعتها!</h3>
        <p class="text-muted text-sm">أحسنت صنعاً! لقد أجبت على جميع الأسئلة المصححة بشكل صحيح 100%.</p>
      </div>
    `;
  }

  return `
    <div class="my-mistakes-box" id="myMistakesContainer">
      <div class="mistakes-header">
        <div class="d-flex items-center gap-2">
          <span class="mistakes-header-icon">❌</span>
          <div>
            <h3 class="mistakes-title">مراجعة أخطائي (My Mistakes)</h3>
            <p class="mistakes-subtitle">عرض الأسئلة التي لم تجب عليها بشكل صحيح للتعلم منها (${wrongAnswers.length} سؤال)</p>
          </div>
        </div>
      </div>

      <div class="mistakes-list">
        ${wrongAnswers
          .map((m, idx) => {
            return `
            <div class="mistake-card">
              <div class="mistake-card-top">
                <span class="mistake-badge">❌ السؤال رقم ${m.questionNumber || idx + 1}</span>
                <div class="d-flex items-center gap-2">
                  <span class="mistake-tag">${escapeHtml(m.type || "اختيار من متعدد")}</span>
                  <span class="mistake-points">الدرجة: ${m.scoreReceived || 0} / ${m.maxScore || 1}</span>
                </div>
              </div>

              <h4 class="mistake-question-text">${escapeHtml(m.question || m.questionTitle || "")}</h4>

              <div class="mistake-answers-grid">
                <div class="mistake-ans-box your-answer">
                  <span class="mistake-ans-label">إجابتك المسجلة:</span>
                  <strong class="mistake-ans-val text-danger">❌ ${escapeHtml(String(m.studentAnswer ?? "لم تتم الإجابة"))}</strong>
                </div>

                <div class="mistake-ans-box correct-answer">
                  <span class="mistake-ans-label">الإجابة الصحيحة المعتمدة:</span>
                  <strong class="mistake-ans-val text-success">✅ ${escapeHtml(String(m.correctAnswer ?? ""))}</strong>
                </div>
              </div>

              ${
                m.explanation
                  ? `
                <div class="mistake-explanation-box">
                  <span class="explanation-icon">💡</span>
                  <div>
                    <strong>التفسير والشرح:</strong>
                    <p class="text-xs mt-1 mb-0">${escapeHtml(m.explanation)}</p>
                  </div>
                </div>
              `
                  : ""
              }
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
  `;
}

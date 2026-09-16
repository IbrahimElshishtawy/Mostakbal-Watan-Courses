// src/features/problem-solving/components/problem-workspace.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the responsive code editor workspace for a Python coding problem.
 */
export function renderProblemWorkspace({ problem, userCode = "", testResults = null, submissionResult = null, isRunning = false, isSubmitting = false, activeTab = "description" }) {
  const codeToDisplay = userCode || problem.starterCode || "# اكتب كودك هنا بلغة بايثون\n";
  const publicCases = problem.publicTestCases || [];
  const examples = problem.examples || [];
  const constraints = problem.constraints || [];
  const hints = problem.hints || [];
  const history = problem.submissionHistory || [];

  const difficultyBadge =
    problem.difficulty === "expert"
      ? { text: "خبير 💎", cls: "diff-expert" }
      : problem.difficulty === "hard"
      ? { text: "متقدم 🧠", cls: "diff-hard" }
      : problem.difficulty === "medium"
      ? { text: "متوسط 🔥", cls: "diff-medium" }
      : { text: "سهل ⚡", cls: "diff-easy" };

  return `
    <div class="ps-workspace-wrapper" id="psWorkspaceRoot">
      <!-- Workspace Top Navigation -->
      <div class="ps-workspace-topbar">
        <div class="d-flex items-center gap-3 flex-wrap">
          <button type="button" id="psBackToCatalogBtn" class="btn btn-secondary btn-sm">
            <span>العودة لقائمة المسائل ⬅️</span>
          </button>

          <div class="ps-ws-title-wrap">
            <span class="ps-level-indicator">المستوى ${problem.level}</span>
            <h2 class="ps-ws-title">${escapeHtml(problem.title)}</h2>
            <span class="ps-diff-badge ${difficultyBadge.cls}">${difficultyBadge.text}</span>
            <span class="ps-points-tag">+${problem.points} نقطة</span>
          </div>
        </div>

        <div class="d-flex items-center gap-2">
          <small class="text-muted">⏳ حد التشغيل: ${problem.timeLimit || 3000}ms</small>
        </div>
      </div>

      <!-- Workspace Body: Split View (Responsive Desktop Grid & Mobile Stack) -->
      <div class="ps-workspace-body">
        <!-- Panel 1: Problem Details, Examples, Constraints, & History -->
        <div class="ps-panel-details">
          <div class="ps-details-nav" role="tablist">
            <button
              type="button"
              class="ps-details-tab ${activeTab === "description" ? "active" : ""}"
              data-details-tab="description"
              role="tab"
            >
              <span>📄 وصف المسألة</span>
            </button>

            <button
              type="button"
              class="ps-details-tab ${activeTab === "history" ? "active" : ""}"
              data-details-tab="history"
              role="tab"
            >
              <span>📜 سجل المحاولات (${history.length})</span>
            </button>
          </div>

          <div class="ps-details-content">
            ${
              activeTab === "description"
                ? `
              <!-- Description Section -->
              <section class="ps-detail-section">
                <h4 class="ps-section-heading">الوصف المطلوب:</h4>
                <p class="ps-text">${escapeHtml(problem.description)}</p>

                ${
                  problem.inputDescription
                    ? `
                  <h4 class="ps-section-heading mt-4">مدخلات البرنامج (Input Format):</h4>
                  <div class="ps-spec-box">${escapeHtml(problem.inputDescription)}</div>
                `
                    : ""
                }

                ${
                  problem.outputDescription
                    ? `
                  <h4 class="ps-section-heading mt-4">مخرجات البرنامج (Output Format):</h4>
                  <div class="ps-spec-box">${escapeHtml(problem.outputDescription)}</div>
                `
                    : ""
                }
              </section>

              <!-- Examples Section -->
              ${
                examples.length > 0
                  ? `
                <section class="ps-detail-section mt-4">
                  <h4 class="ps-section-heading">أمثلة توضيحية (Examples):</h4>
                  ${examples
                    .map(
                      (ex, i) => `
                    <div class="ps-example-card">
                      <div class="ps-example-header">
                        <strong>مثال ${i + 1}:</strong>
                      </div>
                      <div class="ps-example-row">
                        <div class="ps-example-col">
                          <span class="ps-sub-label">المدخلات (Input):</span>
                          <pre class="ps-code-block">${escapeHtml(ex.input)}</pre>
                        </div>
                        <div class="ps-example-col">
                          <span class="ps-sub-label">المخرجات المتوقعة (Output):</span>
                          <pre class="ps-code-block">${escapeHtml(ex.output)}</pre>
                        </div>
                      </div>
                      ${
                        ex.explanation
                          ? `
                        <div class="ps-example-explanation">
                          <small><strong>تفسير:</strong> ${escapeHtml(ex.explanation)}</small>
                        </div>
                      `
                          : ""
                      }
                    </div>
                  `
                    )
                    .join("")}
                </section>
              `
                  : ""
              }

              <!-- Constraints Section -->
              ${
                constraints.length > 0
                  ? `
                <section class="ps-detail-section mt-4">
                  <h4 class="ps-section-heading">القيود والشروط (Constraints):</h4>
                  <ul class="ps-constraints-list">
                    ${constraints.map((c) => `<li><code>${escapeHtml(c)}</code></li>`).join("")}
                  </ul>
                </section>
              `
                  : ""
              }

              <!-- Hints Accordion -->
              ${
                hints.length > 0
                  ? `
                <section class="ps-detail-section mt-4">
                  <details class="ps-hints-details">
                    <summary class="ps-hints-summary">
                      <span>💡 تلميحات مساعدة (${hints.length})</span>
                    </summary>
                    <div class="ps-hints-body">
                      ${hints.map((h, i) => `<div class="ps-hint-item"><strong>تلميح ${i + 1}:</strong> ${escapeHtml(h)}</div>`).join("")}
                    </div>
                  </details>
                </section>
              `
                  : ""
              }
            `
                : `
              <!-- Submissions History Section -->
              <section class="ps-detail-section">
                <h4 class="ps-section-heading">سجل محاولاتك في هذه المسألة:</h4>
                ${
                  history.length === 0
                    ? `
                  <div class="ps-empty-state-sm">
                    <p class="text-muted">لم تقم بأي تسليم لهذه المسألة حتى الآن. اكتب كودك واضغط تسليم لحفظ أول محاولة!</p>
                  </div>
                `
                    : `
                  <div class="ps-history-list">
                    ${history
                      .map(
                        (h, idx) => `
                      <div class="ps-history-item ${h.status === "passed" ? "passed" : "failed"}">
                        <div class="d-flex justify-between items-center mb-1">
                          <strong>محاولة #${history.length - idx}: ${h.status === "passed" ? "✅ ناجحة" : "❌ غير مكتملة"}</strong>
                          <small class="text-muted">${h.submittedAt ? new Date(h.submittedAt).toLocaleTimeString("ar-EG") : ""}</small>
                        </div>
                        ${h.feedback ? `<p class="ps-history-feedback">${escapeHtml(h.feedback)}</p>` : ""}
                        <details class="ps-history-code-toggle">
                          <summary><small>عرض الكود المرسل 📜</small></summary>
                          <pre class="ps-code-block mt-2">${escapeHtml(h.code || "")}</pre>
                        </details>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                `
                }
              </section>
            `
            }
          </div>
        </div>

        <!-- Panel 2: Code Editor & Console Runner -->
        <div class="ps-panel-editor">
          <!-- Editor Top Toolbar -->
          <div class="ps-editor-toolbar">
            <div class="d-flex items-center gap-2">
              <span class="ps-lang-badge">🐍 Python 3.10</span>
              <span class="text-xs text-muted">UTF-8 / Stdin Enabled</span>
            </div>
            <div class="d-flex items-center gap-2">
              <button type="button" id="psResetCodeBtn" class="btn btn-secondary btn-sm" title="إعادة الكود الأولي">
                <span>إعادة تعيين 🔄</span>
              </button>
              <button type="button" id="psCopyCodeBtn" class="btn btn-secondary btn-sm" title="نسخ الكود">
                <span>نسخ 📋</span>
              </button>
            </div>
          </div>

          <!-- Code Editor Area -->
          <div class="ps-editor-container">
            <label for="psCodeTextarea" class="sr-only">محرر كود بايثون</label>
            <textarea
              id="psCodeTextarea"
              class="ps-code-editor"
              spellcheck="false"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              placeholder="# اكتب كود بايثون هنا..."
            >${escapeHtml(codeToDisplay)}</textarea>
          </div>

          <!-- Action Control Buttons -->
          <div class="ps-editor-actions">
            <div class="d-flex items-center gap-2 flex-wrap">
              <button
                type="button"
                id="psRunTestsBtn"
                class="btn btn-secondary"
                ${isRunning || isSubmitting ? "disabled" : ""}
              >
                <span>${isRunning ? "جاري التشغيل... ⏳" : "تشغيل الحالات العامة ▶️"}</span>
              </button>

              <button
                type="button"
                id="psSubmitCodeBtn"
                class="btn btn-primary"
                ${isRunning || isSubmitting ? "disabled" : ""}
              >
                <span>${isSubmitting ? "جاري الاعتماد السحابي... ⏳" : "تسليم الحل النهائي 🚀"}</span>
              </button>
            </div>

            <div class="ps-editor-hint">
              <small class="text-muted">⚡ التسليم يختبر الكود على الحالات العامة والسرية معاً</small>
            </div>
          </div>

          <!-- Console & Output Panel -->
          <div class="ps-console-panel" id="psConsolePanel">
            <div class="ps-console-header">
              <strong>نتائج التشغيل والاختبار (Console Output):</strong>
            </div>

            <div class="ps-console-body">
              ${
                submissionResult
                  ? `
                <div class="ps-submission-banner ${submissionResult.passed ? "passed" : "failed"}">
                  <div class="d-flex items-center gap-2 mb-2">
                    <span class="ps-banner-icon">${submissionResult.passed ? "🏆" : "⚠️"}</span>
                    <h3 class="ps-banner-title">
                      ${submissionResult.passed ? "تم قبول الحل بنجاح!" : "لم يجتز الحل جميع الاختبارات"}
                    </h3>
                  </div>
                  <p class="ps-banner-desc">${escapeHtml(submissionResult.feedback || "")}</p>

                  ${
                    submissionResult.passed
                      ? `
                    <div class="ps-rewards-chips">
                      <span class="ps-reward-chip points">+${submissionResult.competitionPointsAwarded || problem.points} نقطة تنافسية 💎</span>
                      <span class="ps-reward-chip xp">+${submissionResult.earnedXp || problem.baseXp} XP ⚡</span>
                      <span class="ps-reward-chip stars">${"⭐".repeat(submissionResult.stars || 3)}</span>
                    </div>
                  `
                      : ""
                  }
                </div>
              `
                  : ""
              }

              ${
                testResults
                  ? `
                <div class="ps-test-results-summary">
                  <strong>ملخص الاختبارات:</strong>
                  <span class="ps-summary-badge ${testResults.passedCount === testResults.totalCount ? "passed" : "failed"}">
                    ${testResults.passedCount} / ${testResults.totalCount} حالات ناجحة
                  </span>
                </div>

                <div class="ps-cases-list">
                  ${(testResults.publicResults || [])
                    .map(
                      (tc, i) => `
                    <div class="ps-case-card ${tc.passed ? "passed" : "failed"}">
                      <div class="ps-case-header">
                        <span class="ps-case-num">حالة #${tc.caseNumber || i + 1}: ${escapeHtml(tc.description || "")}</span>
                        <span class="ps-case-badge ${tc.passed ? "passed" : "failed"}">
                          ${tc.passed ? "✅ نجاح" : "❌ فشل"}
                        </span>
                      </div>
                      <div class="ps-case-grid">
                        <div>
                          <small class="text-muted">المدخلات (Input):</small>
                          <pre class="ps-mini-pre">${escapeHtml(tc.input ?? "")}</pre>
                        </div>
                        <div>
                          <small class="text-muted">المتوقع (Expected):</small>
                          <pre class="ps-mini-pre">${escapeHtml(tc.expected ?? "")}</pre>
                        </div>
                        <div>
                          <small class="text-muted">الناتج الفعلي (Actual):</small>
                          <pre class="ps-mini-pre ${!tc.passed ? "text-danger" : ""}">${escapeHtml(tc.actual ?? "")}</pre>
                        </div>
                      </div>
                      ${tc.error ? `<div class="ps-case-err"><small>خطأ: ${escapeHtml(tc.error)}</small></div>` : ""}
                    </div>
                  `
                    )
                    .join("")}
                </div>
              `
                  : !submissionResult
                  ? `
                <div class="ps-console-empty">
                  <span>انقر على "تشغيل الحالات العامة ▶️" لفحص الكود، أو "تسليم الحل النهائي 🚀" لاعتماده.</span>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

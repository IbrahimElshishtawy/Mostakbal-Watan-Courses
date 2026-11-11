// src/features/assignments/components/assignment-evaluation-modal.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { renderModal } from "../../../shared/components/Modal/modal.component.js";
import { formatDateTime } from "../../../shared/utils/date.utils.js";
import { normalizeAssignmentGrade } from "../assignment.service.js";

export const ASSIGNMENT_EVALUATION_MODAL_ID = "assignmentEvaluationModal";

/**
 * Returns HTML string for the Assignment Evaluation Modal shell.
 */
export function renderAssignmentEvaluationModal() {
  return renderModal({
    id: ASSIGNMENT_EVALUATION_MODAL_ID,
    title: `<span id="assignmentEvaluationModalTitle">تقييم تسليم الطالب</span>`,
    bodyHtml: `<div id="assignmentEvaluationModalBody"><div class="spinner"></div></div>`,
    footerHtml: `
      <div class="flex items-center justify-between w-full flex-wrap gap-2" id="assignmentEvaluationModalFooter">
        <div class="flex items-center gap-2">
          <button type="button" class="btn btn-secondary text-xs" data-modal-close="${ASSIGNMENT_EVALUATION_MODAL_ID}">
            إغلاق
          </button>
          <button type="button" class="btn btn-outline btn-xs font-bold hidden" id="evalPrevStudentBtn">
            السابق ➡️
          </button>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" class="btn btn-primary font-bold text-xs" id="submitAssignmentGradeBtn">
            حفظ التقييم واعتماد الدرجة ✅
          </button>
          <button type="button" class="btn btn-primary font-bold text-xs hidden" id="evalSaveAndNextBtn" style="background:linear-gradient(135deg, #0ea5e9, #0284c7);">
            حفظ والتقييم التالي ⬅️
          </button>
        </div>
      </div>
    `,
    maxWidth: "760px"
  });
}

/**
 * Returns inner HTML content for the assignment evaluation modal.
 * @param {object} options
 * @param {string} options.taskTitle
 * @param {object} options.submission
 * @param {number} [options.currentIndex=0]
 * @param {number} [options.totalCount=1]
 * @returns {string}
 */
export function renderAssignmentEvaluationContent({
  taskTitle,
  submission,
  currentIndex = 0,
  totalCount = 1
}) {
  const studentName = escapeHtml(submission.studentName || submission.name || "طالب");
  const studentPhone = escapeHtml(submission.studentPhone || submission.studentUid || "—");
  const submittedAtFormatted = formatDateTime(submission.submittedAt || submission.createdAt);

  const rawAnswer = (
    submission.answerText ||
    submission.answer ||
    submission.code ||
    submission.solution ||
    submission.content ||
    submission.text ||
    ""
  ).trim();

  const fileUrl = submission.fileUrl ? escapeHtml(submission.fileUrl) : "";
  const normGrade = normalizeAssignmentGrade(submission.grade, 10);
  const currentGrade = normGrade !== null ? normGrade : "10";
  const currentFeedback = submission.feedback ? escapeHtml(submission.feedback) : "";

  return `
    <div class="assignment-evaluation-view space-y-4" dir="rtl">
      <!-- Student & Navigation Status Header -->
      <div class="p-3.5 rounded-xl bg-[#141b29] border border-[#233148] flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-sm">
            ${escapeHtml((studentName || "ط").trim()[0] || "ط")}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <strong class="text-sm font-bold text-white">${studentName}</strong>
              <span class="text-[11px] text-slate-400 font-mono" dir="ltr">${studentPhone}</span>
            </div>
            <span class="text-xs text-slate-400 block mt-0.5">تاريخ التسليم: ${submittedAtFormatted}</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          ${
            totalCount > 1
              ? `<span class="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono">
                  طالب ${currentIndex + 1} من ${totalCount}
                </span>`
              : ""
          }
          <span class="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
            ${escapeHtml(taskTitle || "واجب بايثون")}
          </span>
        </div>
      </div>

      <!-- Submitted Content & Code Inspection -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="font-bold text-xs text-slate-300">محتوى إجابة وكود الطالب:</label>
          ${
            rawAnswer
              ? `<button
                  type="button"
                  id="evalRunCodeBtn"
                  class="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="تشغيل الكود والتحقق من المخرجات عبر محرك بايثون"
                >
                  <i class="fa-solid fa-play text-[11px]"></i>
                  <span>تشغيل واختبار الكود آلياً 🚀</span>
                </button>`
              : ""
          }
        </div>

        ${
          rawAnswer
            ? `
          <div class="submitted-code-box rounded-xl overflow-hidden border border-[#2b3a55] bg-[#0c101a]">
            <div class="bg-[#162032] px-3 py-1.5 flex items-center justify-between border-b border-[#2b3a55]">
              <span class="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <i class="fa-brands fa-python text-emerald-400"></i>
                <span>كود بايثون المسلم</span>
              </span>
              <button
                type="button"
                class="px-2 py-0.5 rounded text-[11px] text-slate-300 hover:text-white bg-[#223048] hover:bg-[#2c3e5d] cursor-pointer"
                onclick="navigator.clipboard?.writeText(document.getElementById('submittedCodePre').innerText);this.innerText='تم النسخ ✓';setTimeout(()=>this.innerText='نسخ الكود 📋',2000);"
              >
                نسخ الكود 📋
              </button>
            </div>
            <pre id="submittedCodePre" class="p-3 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed" dir="ltr" style="text-align:left;"><code>${escapeHtml(rawAnswer)}</code></pre>
          </div>
          <!-- Terminal Runner Output for Teacher -->
          <div id="evalTestRunnerOutput" class="mt-2 hidden"></div>
        `
            : `<div class="p-4 rounded-xl bg-[#141b29] text-xs text-slate-400 border border-[#233148]">لا يوجد كود برمجي نصي مدون (تم تسليم ملف خارجي فقط).</div>`
        }

        ${
          fileUrl
            ? `
          <div class="mt-2.5 flex items-center justify-between p-3 rounded-xl bg-[#141b29] border border-[#233148]">
            <div class="flex items-center gap-2.5">
              <span class="text-xl">📄</span>
              <div>
                <strong class="text-xs font-bold text-white block">الملف المرفق من الطالب</strong>
                <span class="text-[11px] text-slate-400 font-mono">${escapeHtml(fileUrl.split("/").pop() || "ملف الواجب")}</span>
              </div>
            </div>
            <a
              href="${fileUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all"
            >
              فتح ومعاينة الملف ↗
            </a>
          </div>
        `
            : ""
        }
      </div>

      <!-- Grading (0 to 10 Scale) and Feedback Controls -->
      <div class="p-4 rounded-xl bg-[#141b29] border border-[#233148] space-y-3">
        <div>
          <div class="flex items-center justify-between mb-1.5 flex-wrap gap-2">
            <label for="evalGradeInput" class="font-bold text-xs text-white flex items-center gap-1.5">
              <span>الدرجة المعتمدة (من 10):</span>
              <span class="text-rose-400">*</span>
            </label>
            <div class="flex items-center gap-1.5">
              <span class="text-[11px] text-slate-400">درجات سريعة:</span>
              <button type="button" class="px-2 py-0.5 rounded bg-[#202b3f] hover:bg-cyan-600 hover:text-white text-cyan-300 text-[11px] font-mono font-bold cursor-pointer" onclick="document.getElementById('evalGradeInput').value='10'">10 / 10</button>
              <button type="button" class="px-2 py-0.5 rounded bg-[#202b3f] hover:bg-cyan-600 hover:text-white text-cyan-300 text-[11px] font-mono font-bold cursor-pointer" onclick="document.getElementById('evalGradeInput').value='9.5'">9.5</button>
              <button type="button" class="px-2 py-0.5 rounded bg-[#202b3f] hover:bg-cyan-600 hover:text-white text-cyan-300 text-[11px] font-mono font-bold cursor-pointer" onclick="document.getElementById('evalGradeInput').value='9'">9</button>
              <button type="button" class="px-2 py-0.5 rounded bg-[#202b3f] hover:bg-cyan-600 hover:text-white text-cyan-300 text-[11px] font-mono font-bold cursor-pointer" onclick="document.getElementById('evalGradeInput').value='8'">8</button>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <input
              type="number"
              id="evalGradeInput"
              class="form-control font-black text-center text-primary"
              style="max-width:130px;font-size:1.25rem;background:#0d121c;border-color:#2a3b58;color:#38bdf8;"
              min="0"
              max="10"
              step="0.5"
              value="${currentGrade}"
              placeholder="0-10"
              required
            />
            <span class="text-xs text-slate-400">
              سلم الدرجات المعتمد من 0 إلى 10 درجات. يتم احتسابها في المعدل الإحصائي فوراً.
            </span>
          </div>
        </div>

        <div>
          <label for="evalFeedbackInput" class="font-bold text-xs text-slate-400 mb-1 block">
            توجيهات وملاحظات المعلم للطالب (Feedback):
          </label>
          <textarea
            id="evalFeedbackInput"
            class="form-control text-xs"
            rows="2"
            placeholder="اكتب ملاحظاتك التشجيعية أو التوجيهات البرمجية لتطوير كود الطالب..."
            style="background:#0d121c;border-color:#2a3b58;color:#f1f5f9;"
          >${currentFeedback}</textarea>
        </div>
      </div>
    </div>
  `;
}

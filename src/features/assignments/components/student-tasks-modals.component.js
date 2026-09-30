import { renderModal } from "../../../shared/components/Modal/modal.component.js";
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

export const TASKS_MANUAL_MODAL_ID = "tasksManualModal";
export const TASK_SPECS_MODAL_ID = "taskSpecsPdfModal";
export const SUBMITTED_CODE_MODAL_ID = "submittedCodeModal";
export const TASK_EVALUATION_REPORT_MODAL_ID = "taskEvaluationReportModal";
export const UPCOMING_TASK_MODAL_ID = "upcomingTaskModal";

/**
 * Returns markup for all student tasks modals.
 */
export function renderStudentTasksModals() {
  return `
    <!-- 1. Student Guide Manual Modal -->
    ${renderModal({
      id: TASKS_MANUAL_MODAL_ID,
      title: `<span class="flex items-center gap-2 text-brand-cyan"><i class="fa-solid fa-book-bookmark"></i> دليل الطالب للتكليفات البرمجية</span>`,
      maxWidth: "680px",
      bodyHtml: `
        <div class="tasks-manual-content space-y-4" dir="rtl" style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.7;">
          <div class="bg-brand-surface/70 p-4 rounded-xl border border-brand-border space-y-2">
            <h4 class="font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-circle-check text-emerald-400"></i>
              خطوات تسليم الواجبات بنجاح
            </h4>
            <p>1. قم بتحميل كود البداية (Starter Code) أو مراجعة مواصفات المشروع بالكامل.</p>
            <p>2. اكتب كود الحل والتزم بمعايير نظافة الكود (PEP 8) والتعليقات التوضيحية (Docstrings).</p>
            <p>3. اختبر الكود محلياً، أو استعن بـ <strong>بيئة الفحص والتجربة السحابية (Sandbox)</strong> المرفقة بالأسفل لتأكيد نجاح اختبارات pytest.</p>
            <p>4. ارفع ملف الحل بصيغة <code class="code-token">.py</code> أو رابط مستودع GitHub ثم اضغط على <strong>تسليم واعتماد الحل</strong>.</p>
          </div>

          <div class="bg-brand-surface/70 p-4 rounded-xl border border-brand-border space-y-2">
            <h4 class="font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-scale-balanced text-amber-400"></i>
              معايير التقييم واحتساب الدرجات
            </h4>
            <ul class="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>صحة المنطق الرياضي والبرمجي:</strong> 40%</li>
              <li><strong>معالجة الاستثناءات والأخطاء (Exception Handling):</strong> 30%</li>
              <li><strong>نظافة الكود وتطبيق PEP 8:</strong> 15%</li>
              <li><strong>توثيق الدوال وتنسيق الإخراج:</strong> 15%</li>
            </ul>
          </div>

          <div class="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs">
            <i class="fa-solid fa-triangle-exclamation ml-1"></i>
            <strong>تنبيه النزاهة الرقمية:</strong> تخضع جميع الأكواد المرفوعة لفحص آلي لكشف التشابه والتطابق. يُرجى الاعتماد الكامل على مجهودك الشخصي.
          </div>
        </div>
      `,
      footerHtml: `
        <div class="flex justify-end w-full">
          <button type="button" class="btn btn-primary" data-modal-close="${TASKS_MANUAL_MODAL_ID}">
            فهمت الإرشادات ✅
          </button>
        </div>
      `
    })}

    <!-- 2. Task Specs PDF Modal -->
    ${renderModal({
      id: TASK_SPECS_MODAL_ID,
      title: `<span class="flex items-center gap-2 text-rose-400"><i class="fa-regular fa-file-pdf"></i> كراسة مواصفات التكليف (TASK-PY-03)</span>`,
      maxWidth: "750px",
      bodyHtml: `
        <div class="task-specs-content space-y-4" dir="rtl" style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.7;">
          <div class="flex items-center justify-between p-3 rounded-xl bg-brand-surface/80 border border-brand-border">
            <div>
              <span class="text-xs text-brand-cyan font-bold block font-mono">TASK-PY-03 • SPECIFICATION SHEET</span>
              <h4 class="text-white font-bold text-base">مشروع 1: آلة حاسبة تفاعلية متقدمة مع معالجة الاستثناءات</h4>
            </div>
            <span class="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">100 نقطة</span>
          </div>

          <div class="space-y-2">
            <h5 class="text-white font-bold text-sm">🎯 المتطلبات الوظيفية:</h5>
            <ol class="list-decimal list-inside space-y-1.5 text-slate-300 pr-2">
              <li>دعم العمليات الحسابية الخمس الأساسية: الجمع، الطرح، الضرب، القسمة، والأسس.</li>
              <li>التحقق من عدم القسمة على الصفر إطلاقاً واصطياد استثناء <code class="code-token text-brand-cyan">ZeroDivisionError</code> دون توقف التطبيق.</li>
              <li>التحقق من صحة المدخلات واصطياد استثناء <code class="code-token text-brand-cyan">ValueError</code> عند إدخال نصوص أو أحرف غير مسموح بها.</li>
              <li>توفير كلمة <code class="code-token text-amber-400">'exit'</code> لإنهاء البرنامج بأمان مع رسالة شكر ختامية.</li>
              <li>الاحتفاظ بسجل العمليات (History list) وطباعته عند طلب المستخدم كلمة <code class="code-token text-brand-cyan">'history'</code>.</li>
            </ol>
          </div>

          <div class="space-y-2">
            <h5 class="text-white font-bold text-sm">🧪 حالات الاختبار الإلزامية (Test Cases):</h5>
            <div class="bg-black/60 p-3 rounded-lg border border-brand-border font-mono text-xs text-slate-300 space-y-1" dir="ltr">
              <div>&gt;&gt;&gt; calculate(10, '+', 5)  -&gt; 15.0</div>
              <div>&gt;&gt;&gt; calculate(10, '/', 0)  -&gt; Handled ZeroDivisionError</div>
              <div>&gt;&gt;&gt; calculate('abc', '+', 2) -&gt; Handled ValueError</div>
              <div>&gt;&gt;&gt; calculate(2, '^', 4)  -&gt; 16.0</div>
            </div>
          </div>
        </div>
      `,
      footerHtml: `
        <div class="flex items-center justify-between w-full">
          <button type="button" class="btn btn-secondary" id="btnPrintTaskSpecsBtn">
            <i class="fa-solid fa-print ml-1"></i> طباعة كراسة المواصفات
          </button>
          <button type="button" class="btn btn-primary" data-modal-close="${TASK_SPECS_MODAL_ID}">
            إغلاق
          </button>
        </div>
      `
    })}

    <!-- 3. Submitted Code Viewer Modal -->
    ${renderModal({
      id: SUBMITTED_CODE_MODAL_ID,
      title: `<span class="flex items-center gap-2 text-brand-cyan"><i class="fa-solid fa-code"></i> <span id="submittedCodeModalTitle">استعراض الكود المسلم</span></span>`,
      maxWidth: "800px",
      bodyHtml: `
        <div class="submitted-code-content space-y-3" dir="rtl">
          <div class="flex items-center justify-between p-2.5 rounded-lg bg-brand-surface border border-brand-border text-xs">
            <div class="flex items-center gap-2">
              <span class="text-slate-400">اسم الملف:</span>
              <span id="submittedCodeFileName" class="font-mono text-emerald-400 font-bold">solution.py</span>
            </div>
            <div class="flex items-center gap-2 font-mono text-slate-400">
              <span id="submittedCodeDate">24 سبتمبر 2026</span>
            </div>
          </div>
          <div class="bg-black/90 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto text-left" dir="ltr" style="max-height: 420px;">
            <pre id="submittedCodePre"><code id="submittedCodeBlock"># Code preview</code></pre>
          </div>
        </div>
      `,
      footerHtml: `
        <div class="flex justify-between items-center w-full">
          <span class="text-xs text-emerald-400 font-semibold">
            <i class="fa-solid fa-shield-check"></i> الكود معتمد وتم فحصه آلياً بنجاح
          </span>
          <button type="button" class="btn btn-secondary" data-modal-close="${SUBMITTED_CODE_MODAL_ID}">
            إغلاق
          </button>
        </div>
      `
    })}

    <!-- 4. Task Evaluation Report Modal -->
    ${renderModal({
      id: TASK_EVALUATION_REPORT_MODAL_ID,
      title: `<span class="flex items-center gap-2 text-emerald-400"><i class="fa-solid fa-chart-pie"></i> تقرير التقييم الأكاديمي المعتمد</span>`,
      maxWidth: "700px",
      bodyHtml: `
        <div class="evaluation-report-content space-y-4" dir="rtl" style="color: #cbd5e1; font-size: 0.88rem;">
          <div class="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-brand-surface border border-emerald-500/30">
            <div>
              <span class="text-xs text-emerald-400 font-mono font-bold block" id="evalReportTaskCode">TASK-PY-01</span>
              <h4 class="text-white font-bold text-base mt-0.5" id="evalReportTaskTitle">تطبيق خوارزميات البحث الخطي والثنائي</h4>
            </div>
            <div class="text-center">
              <span class="text-xs text-slate-400 block">الدرجة النهائية</span>
              <span class="text-2xl font-black text-emerald-400 font-mono" id="evalReportScore">98 / 100</span>
            </div>
          </div>

          <div class="space-y-2">
            <h5 class="text-xs font-bold text-slate-300">تفاصيل معايير التقييم:</h5>
            <div class="space-y-2" id="evalReportRubricList">
              <!-- Dynamically populated or standard rubric -->
            </div>
          </div>

          <div class="p-4 rounded-xl bg-brand-darker border border-brand-border space-y-1.5">
            <h5 class="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <i class="fa-solid fa-chalkboard-user"></i>
              <span id="evalReportInstructorTitle">ملاحظة م/ إبراهيم الششتاوي:</span>
            </h5>
            <p class="text-xs text-slate-300 leading-relaxed" id="evalReportFeedbackText">
              "تنظيم الدوال والـ Docstrings مثالي جداً، وحساب الوقت الزمني دقيق. استمر بهذا المستوى الرائع!"
            </p>
          </div>
        </div>
      `,
      footerHtml: `
        <div class="flex justify-between items-center w-full">
          <button type="button" class="btn btn-secondary" id="btnPrintEvalReportBtn">
            <i class="fa-solid fa-print ml-1"></i> طباعة التقرير
          </button>
          <button type="button" class="btn btn-primary" data-modal-close="${TASK_EVALUATION_REPORT_MODAL_ID}">
            تم الاستعراض
          </button>
        </div>
      `
    })}

    <!-- 5. Upcoming Task Preview Modal -->
    ${renderModal({
      id: UPCOMING_TASK_MODAL_ID,
      title: `<span class="flex items-center gap-2 text-purple-400"><i class="fa-solid fa-calendar-check"></i> متطلبات التكليف القادم (TASK-PY-04)</span>`,
      maxWidth: "650px",
      bodyHtml: `
        <div class="upcoming-task-content space-y-4" dir="rtl" style="color: #cbd5e1; font-size: 0.88rem; line-height: 1.7;">
          <div class="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
            <div>
              <span class="text-xs text-purple-300 font-mono font-bold">TASK-PY-04 • المحاضرة 04</span>
              <h4 class="text-white font-bold text-sm mt-0.5">نظام إدارة المهام التفاعلي مع حفظ البيانات (To-Do CLI & JSON)</h4>
            </div>
            <span class="text-xs font-mono font-bold bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg border border-purple-500/40">150 نقطة</span>
          </div>

          <p class="text-slate-300 text-xs leading-relaxed">
            يهدف هذا المشروع لترسيخ مفاهيم البرمجة كائنية التوجه (Classes, Objects, Methods, Encapsulation) مع بناء نظام كامل لتخزين واسترجاع المهام عبر مكتبة <code class="code-token">json</code> المدمجة في بايثون.
          </p>

          <div class="bg-brand-surface/60 p-3 rounded-xl border border-brand-border space-y-1 text-xs">
            <h5 class="text-white font-bold mb-1">المحاور المتوقعة في المشروع:</h5>
            <p>• تصميم كلاس <code class="code-token">Task</code> مع الخصائص (id, title, status, created_at).</p>
            <p>• تصميم كلاس <code class="code-token">TaskManager</code> لإضافة وعرض وتعديل وحذف وتحديد المهام كمكتملة.</p>
            <p>• الدوال البرمجية <code class="code-token">save_to_file()</code> و <code class="code-token">load_from_file()</code>.</p>
          </div>

          <div class="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
            <i class="fa-solid fa-lock text-amber-400"></i>
            <span>سيتم فتح التسليم رسمياً فور انتهاء المحاضرة الرابعة يوم الأحد 05 أكتوبر 2026.</span>
          </div>
        </div>
      `,
      footerHtml: `
        <div class="flex justify-end w-full">
          <button type="button" class="btn btn-secondary" data-modal-close="${UPCOMING_TASK_MODAL_ID}">
            إغلاق
          </button>
        </div>
      `
    })}
  `;
}

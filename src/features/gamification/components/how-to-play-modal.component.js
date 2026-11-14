// src/features/gamification/components/how-to-play-modal.component.js

/**
 * Renders the interactive "How to Play" educational onboarding modal.
 */
export function renderHowToPlayModal() {
  return `
    <div class="modal-backdrop gam-modal-backdrop" id="howToPlayModalBackdrop" style="display: none; position: fixed; inset: 0; background: rgba(3, 7, 18, 0.85); backdrop-filter: blur(8px); z-index: 9999; align-items: center; justify-content: center; padding: 1rem;">
      <div class="modal-card gam-modal-card" style="background: #0b1120; border: 1.5px solid rgba(16, 185, 129, 0.4); border-radius: 24px; max-width: 680px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 2rem; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7); position: relative;">
        <!-- Close Button -->
        <button type="button" id="closeHowToPlayModalBtn" style="position: absolute; top: 1.25rem; left: 1.25rem; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); color: #cbd5e1; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1rem;">
          ✕
        </button>

        <div class="text-center mb-6">
          <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
            دليل الفرسان والأبطال 📖
          </span>
          <h2 class="text-xl font-black text-white mt-2">كيف تعمل منظومة التحديات والمكافآت؟</h2>
          <p class="text-xs text-slate-400">تعرف على قواعد النقاط، العملات، الأوسمة، والتصنيف الشرفي في المنصة.</p>
        </div>

        <div class="space-y-4 text-xs text-slate-300 leading-relaxed">
          <!-- 1. Daily Questions -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 class="text-sm font-bold text-emerald-400 mb-1 d-flex items-center gap-2">
              <span>🎯</span>
              <span>1. الأسئلة اليومية المتكيفة (Adaptive Daily Questions)</span>
            </h4>
            <p>
              يستلم كل طالب <strong>6 أسئلة رسمية يومياً</strong> بصلاحية 24 ساعة بالضبط. تتكيف صعوبة الأسئلة تلقائياً بحسب دقتك السابقة:
              (المبتدئ: 4 سهل، 2 متوسط • المتوسط: 2 سهل، 3 متوسط، 1 صعب • المتقدم: 1 سهل، 3 متوسط، 2 صعب).
              تحصل على <strong>+5 XP</strong> للسؤال السهل، <strong>+10 XP</strong> للمتوسط، <strong>+15 XP</strong> للصعب، بالإضافة إلى <strong>بونص +10 XP</strong> عند إكمال الأسئلة الستة!
            </p>
          </div>

          <!-- 2. Dual Economy: XP vs Coins -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 class="text-sm font-bold text-amber-400 mb-1 d-flex items-center gap-2">
              <span>⚖️</span>
              <span>2. الاقتصاد المزدوج: نقاط الخبرة (XP) والعملات (Coins)</span>
            </h4>
            <ul style="list-style-type: disc; padding-right: 1.25rem;" class="space-y-1">
              <li>
                <strong>نقاط الخبرة (XP):</strong> مقياس تحصيلك العلمي، لا يمكن إنفاقها، وتحدد مستواك (من المستوى 1 إلى 10) وترتيبك في لوحة المتصدرين.
              </li>
              <li>
                <strong>العملات الذهبية (Coins):</strong> عملة افتراضية تُمنح <strong>فقط وحصرياً</strong> عند إنجاز التكليفات والمهام البرمجية واجتياز حالات الاختبار:
                (10 للمهام البسيطة، 25 للمتوسطة، 50 للصعبة، 100 للمشاريع الكاملة).
              </li>
            </ul>
          </div>

          <!-- 3. Virtual Store -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 class="text-sm font-bold text-sky-400 mb-1 d-flex items-center gap-2">
              <span>🛍️</span>
              <span>3. متجر المكافآت والألقاب الافتراضية</span>
            </h4>
            <p>
              استبدل عملاتك الذهبية بشخصيات أفاتار وإطارات هولوغرام مضيئة وألقاب شرفية حصرية (مثل "خبير الخوارزميات" و"مهندس المستقبل").
              جميع المكافآت افتراضية 100% داخل المنصة وتُضاف إلى حقيبتك لارتدائها في أي وقت.
            </p>
          </div>

          <!-- 4. Badges & Leaderboard -->
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 class="text-sm font-bold text-purple-400 mb-1 d-flex items-center gap-2">
              <span>🏆</span>
              <span>4. الأوسمة ولوحة شرف المتصدرين</span>
            </h4>
            <p>
              تنافس مع زملائك على صدارة 4 فترات مستقلة: <strong>اليومية، الأسبوعية، الشهرية، والموسمية الشاملة</strong>.
              يتم ترتيب الطلاب بأعلى نقاط XP، مع تفوق الطالب الأكثر إنجازاً للمهام البرمجية في حالات التعادل.
            </p>
          </div>
        </div>

        <div class="mt-6 text-center">
          <button type="button" id="confirmHowToPlayBtn" class="btn btn-primary px-8 py-2.5 font-bold text-xs" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            فهمت، وجاهز للانطلاق والتحدي! 🚀
          </button>
        </div>
      </div>
    </div>
  `;
}

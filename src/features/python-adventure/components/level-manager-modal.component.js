// src/features/python-adventure/components/level-manager-modal.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import { WORLDS_DATA, PROBLEM_SOLVING_WORLDS_DATA } from "../python-adventure-data.js";
import { PythonAdventureService } from "../python-adventure.service.js";

export const LEVEL_MANAGER_MODAL_ID = "pythonLevelManagerModal";

/**
 * Returns HTML for the Level Manager Modal shell.
 */
export function renderLevelManagerModal() {
  return `
    <div id="${LEVEL_MANAGER_MODAL_ID}" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm hidden" role="dialog" aria-modal="true" aria-labelledby="levelManagerModalTitle" dir="rtl">
      <div class="relative w-full max-w-4xl bg-[#101623] border border-[#1e2a3f] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Modal Top Bar -->
        <div class="p-5 border-b border-[#1c273c] flex items-center justify-between gap-4 bg-[#131b2c]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg shadow">
              <i class="fa-solid fa-sliders"></i>
            </div>
            <div>
              <h3 id="levelManagerModalTitle" class="text-base font-extrabold text-white flex items-center gap-2">
                <span>إدارة مستويات وترتيب عالم بايثون</span>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">لوحة المعلم</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">تحكم في تسلسل مستويات العوالم، أعد ترتيب التحديات، أو أضف مهمات برمجية جديدة.</p>
            </div>
          </div>

          <button type="button" id="closeLevelManagerModalBtn" class="w-8 h-8 rounded-lg bg-[#182236] hover:bg-[#202d47] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer" aria-label="إغلاق">
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <!-- Modal Body Dynamic Container -->
        <div id="levelManagerModalBody" class="p-6 overflow-y-auto space-y-6 flex-1">
          <!-- Injected dynamically by renderLevelManagerContent -->
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the internal interactive content of the Level Manager:
 * World selector, Reordering list with Move Up/Down, and Add New Level form.
 * @param {object} params
 * @param {string} params.selectedWorldId
 * @param {string} [params.activeTab="reorder"] "reorder" | "add"
 */
export function renderLevelManagerContent({ selectedWorldId = "world-1", activeTab = "reorder" } = {}) {
  const allWorlds = [...WORLDS_DATA];
  const selectedWorld = allWorlds.find((w) => w.id === selectedWorldId) || allWorlds[0];
  const challenges = PythonAdventureService.getWorldChallenges(selectedWorld.id);

  return `
    <div class="space-y-6" data-current-world-id="${escapeHtml(selectedWorld.id)}">
      <!-- 1. World Selector Strip -->
      <div class="bg-[#121927] border border-[#1e2a3f] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${selectedWorld.icon || "🏠"}</span>
          <div>
            <h4 class="text-sm font-extrabold text-white">${escapeHtml(selectedWorld.title)}</h4>
            <span class="text-xs text-slate-400 font-mono">${escapeHtml(selectedWorld.englishTitle || "")} • ${challenges.length} مستويات وتحديات</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <label for="levelManagerWorldSelect" class="text-xs text-slate-400 font-medium whitespace-nowrap">اختر العالم:</label>
          <select id="levelManagerWorldSelect" class="bg-[#0c1017] border border-[#1e2a3f] text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer">
            ${allWorlds.map((w) => `<option value="${escapeHtml(w.id)}" ${w.id === selectedWorld.id ? "selected" : ""}>${w.icon} ${escapeHtml(w.title)} (${w.englishTitle})</option>`).join("")}
          </select>
        </div>
      </div>

      <!-- 2. Tab Navigation Switcher -->
      <div class="flex items-center gap-2 border-b border-[#1c273c] pb-3">
        <button
          type="button"
          id="tabBtnReorderLevels"
          class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'reorder' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow' : 'text-slate-400 hover:text-white hover:bg-[#151d2c]'}"
        >
          <i class="fa-solid fa-arrow-down-up-across-line text-xs"></i>
          <span>إدارة الترتيب والتسلسل (${challenges.length})</span>
        </button>

        <button
          type="button"
          id="tabBtnAddNewLevel"
          class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'add' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow' : 'text-slate-400 hover:text-white hover:bg-[#151d2c]'}"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          <span>إضافة مستوى جديد للعالم ✨</span>
        </button>
      </div>

      <!-- 3. TAB 1: REORDER LEVELS -->
      <div id="levelManagerReorderTab" class="${activeTab === 'reorder' ? '' : 'hidden'} space-y-4">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <p>استخدم أزرار التحريك ⬆️ و ⬇️ لتعديل الترتيب الذي يظهر به الطلاب في الخريطة.</p>
          <button type="button" id="saveLevelsOrderBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 border border-emerald-400/30 transition-all cursor-pointer">
            <i class="fa-solid fa-floppy-disk text-xs"></i>
            <span>حفظ الترتيب الحالي</span>
          </button>
        </div>

        <div id="levelsOrderList" class="space-y-2.5">
          ${challenges.map((ch, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === challenges.length - 1;
            const isCustom = Boolean(ch.isCustom);
            const isBoss = ch.type === "boss";

            return `
              <div class="bg-[#121825] border border-[#1e2a3f] rounded-xl p-3.5 flex items-center justify-between gap-4 hover:border-slate-600 transition-colors" data-order-challenge-id="${escapeHtml(ch.id)}" data-current-index="${idx}">
                <!-- Level Info -->
                <div class="flex items-center gap-3 overflow-hidden">
                  <span class="w-7 h-7 rounded-lg bg-[#182236] border border-[#23314a] text-slate-300 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    #${idx + 1}
                  </span>

                  <div class="flex-shrink-0">
                    <span class="text-lg">${isBoss ? "👑" : "⚔️"}</span>
                  </div>

                  <div class="overflow-hidden">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h5 class="text-xs font-bold text-white truncate">${escapeHtml(ch.title)}</h5>
                      ${isBoss ? '<span class="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">زعيم العالم</span>' : ''}
                      ${isCustom ? '<span class="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono">مستوى مخصص</span>' : ''}
                    </div>
                    <p class="text-[11px] text-slate-400 truncate mt-0.5">${escapeHtml(ch.subtitle || ch.story || "")}</p>
                  </div>
                </div>

                <!-- Meta & Controls -->
                <div class="flex items-center gap-3 flex-shrink-0">
                  <span class="text-[11px] text-emerald-400 font-mono font-bold">+${ch.baseXp || 50} XP</span>

                  <!-- Move Up / Down Buttons -->
                  <div class="flex items-center gap-1">
                    <button
                      type="button"
                      class="btn-move-level-up w-8 h-8 rounded-lg ${isFirst ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800' : 'bg-[#182236] hover:bg-[#202e48] text-slate-200 border border-[#24334f] cursor-pointer'} flex items-center justify-center transition-colors"
                      data-challenge-id="${escapeHtml(ch.id)}"
                      data-direction="up"
                      ${isFirst ? "disabled" : ""}
                      title="تحريك للأعلى"
                    >
                      <i class="fa-solid fa-chevron-up text-xs"></i>
                    </button>

                    <button
                      type="button"
                      class="btn-move-level-down w-8 h-8 rounded-lg ${isLast ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800' : 'bg-[#182236] hover:bg-[#202e48] text-slate-200 border border-[#24334f] cursor-pointer'} flex items-center justify-center transition-colors"
                      data-challenge-id="${escapeHtml(ch.id)}"
                      data-direction="down"
                      ${isLast ? "disabled" : ""}
                      title="تحريك للأسفل"
                    >
                      <i class="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                  </div>

                  <!-- Delete Custom Level -->
                  ${isCustom ? `
                    <button
                      type="button"
                      class="btn-delete-custom-level w-8 h-8 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center transition-colors cursor-pointer"
                      data-challenge-id="${escapeHtml(ch.id)}"
                      data-world-id="${escapeHtml(selectedWorld.id)}"
                      title="حذف هذا المستوى المخصص"
                    >
                      <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- 4. TAB 2: ADD NEW LEVEL FORM -->
      <div id="levelManagerAddTab" class="${activeTab === 'add' ? '' : 'hidden'} space-y-4">
        <form id="addNewLevelForm" class="bg-[#121825] border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div class="border-b border-[#1e2a3f] pb-3 mb-2">
            <h4 class="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <i class="fa-solid fa-code text-xs"></i>
              <span>إضافة مستوى وتحدي جديد إلى: ${escapeHtml(selectedWorld.title)}</span>
            </h4>
            <p class="text-xs text-slate-400 mt-1">سيتم إضافة هذا المستوى للتحدي في الخريطة مباشرة وربطه بتسلسل العالم.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Title -->
            <div class="space-y-1.5">
              <label for="newLevelTitle" class="block text-xs font-bold text-slate-300">عنوان المستوى / المسألة *</label>
              <input
                type="text"
                id="newLevelTitle"
                class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3.5 py-2.5 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="مثال: حساب مجموع الأرقام الفردية"
                required
              />
            </div>

            <!-- Subtitle -->
            <div class="space-y-1.5">
              <label for="newLevelSubtitle" class="block text-xs font-bold text-slate-300">المفهوم أو العنوان الفرعي</label>
              <input
                type="text"
                id="newLevelSubtitle"
                class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3.5 py-2.5 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="مثال: التكرار مع المعاملات الحسابية"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Difficulty -->
            <div class="space-y-1.5">
              <label for="newLevelDifficulty" class="block text-xs font-bold text-slate-300">مستوى الصعوبة</label>
              <select id="newLevelDifficulty" class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer">
                <option value="easy">سهل ⚡</option>
                <option value="medium" selected>متوسط 🔥</option>
                <option value="hard">متقدم 🧠</option>
                <option value="expert">خبير 💎</option>
              </select>
            </div>

            <!-- Type -->
            <div class="space-y-1.5">
              <label for="newLevelType" class="block text-xs font-bold text-slate-300">نوع المهمة</label>
              <select id="newLevelType" class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer">
                <option value="write_code" selected>مهمة كود عادية ⚔️</option>
                <option value="boss">تحدي زعيم العالم 👑</option>
                <option value="fix_bug">تصحيح أخطاء برمجية 🐞</option>
              </select>
            </div>

            <!-- Base XP -->
            <div class="space-y-1.5">
              <label for="newLevelXp" class="block text-xs font-bold text-slate-300">نقاط الخبرة Base XP</label>
              <input
                type="number"
                id="newLevelXp"
                class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                value="75"
                min="10"
                max="500"
              />
            </div>
          </div>

          <!-- Starter Code -->
          <div class="space-y-1.5">
            <label for="newLevelStarterCode" class="block text-xs font-bold text-slate-300">الكود المبدئي (Starter Code)</label>
            <textarea
              id="newLevelStarterCode"
              rows="3"
              class="w-full bg-[#0c1017] border border-[#1e2a3f] text-cyan-300 font-mono text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-500"
              placeholder="# اكتب تعليقاً أو قالباً برمجياً للبدء به&#10;"
            ></textarea>
          </div>

          <!-- Requirements & Expected Output -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label for="newLevelRequirements" class="block text-xs font-bold text-slate-300">
                <span>متطلبات الحل (سطر لكل متطلب)</span>
              </label>
              <textarea
                id="newLevelRequirements"
                rows="3"
                class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                placeholder="استخدم for loop&#10;اطبع الناتج النهائي فقط"
              ></textarea>
            </div>

            <div class="space-y-1.5">
              <label for="newLevelExpectedOutput" class="block text-xs font-bold text-slate-300">المخرجات المتوقعة (Expected Output)</label>
              <input
                type="text"
                id="newLevelExpectedOutput"
                class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 rounded-xl px-3.5 py-2.5 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                placeholder="مثال: 250"
              />
              <span class="text-[10px] text-slate-500 block">إذا كان الكود يطبع ناتجاً محدداً للتحقق منه تلقائياً.</span>
            </div>
          </div>

          <!-- Hints -->
          <div class="space-y-1.5">
            <label for="newLevelHints" class="block text-xs font-bold text-slate-300">تلميحات مساعدة للطلاب (سطر لكل تلميح)</label>
            <textarea
              id="newLevelHints"
              rows="2"
              class="w-full bg-[#0c1017] border border-[#1e2a3f] text-slate-100 text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-500 placeholder-slate-500"
              placeholder="تذكر استخدام دالة range()&#10;تحقق من شروط الجمع"
            ></textarea>
          </div>

          <!-- Submit Bar -->
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2a3f]">
            <button
              type="submit"
              id="submitNewLevelBtn"
              class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/50 border border-cyan-400/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <i class="fa-solid fa-plus text-xs"></i>
              <span>إضافة المستوى وحفظه في العالم 🚀</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

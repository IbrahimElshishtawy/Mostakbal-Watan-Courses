// src/features/problem-solving/components/admin-problem-manager.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Admin Coding Problems Management View.
 */
export function renderAdminProblemManager({ problems = [], activeLevel = "all" }) {
  const filtered = problems.filter((p) => {
    if (activeLevel !== "all" && p.level !== Number(activeLevel)) return false;
    return true;
  });

  return `
    <div class="admin-pm-container">
      <!-- Action Toolbar -->
      <div class="admin-pm-toolbar">
        <div class="d-flex items-center gap-3 flex-wrap">
          <button type="button" id="adminCreateProblemBtn" class="btn btn-primary">
            <span>إضافة مسألة برمجية جديدة ➕</span>
          </button>

          <div class="admin-pm-level-filter">
            <label for="adminLevelSelect" class="text-sm font-bold ml-2">تصفية بالمستوى:</label>
            <select id="adminLevelSelect" class="ps-select">
              <option value="all" ${activeLevel === "all" ? "selected" : ""}>جميع المستويات (5)</option>
              <option value="1" ${activeLevel === "1" ? "selected" : ""}>المستوى 1: مبتدئ (Beginner)</option>
              <option value="2" ${activeLevel === "2" ? "selected" : ""}>المستوى 2: سهل (Easy)</option>
              <option value="3" ${activeLevel === "3" ? "selected" : ""}>المستوى 3: متوسط (Intermediate)</option>
              <option value="4" ${activeLevel === "4" ? "selected" : ""}>المستوى 4: متقدم (Advanced)</option>
              <option value="5" ${activeLevel === "5" ? "selected" : ""}>المستوى 5: خبير (Expert)</option>
            </select>
          </div>
        </div>

        <div class="text-sm text-muted">
          <span>إجمالي المسائل المتاحة: <strong>${filtered.length}</strong></span>
        </div>
      </div>

      <!-- Problems Table -->
      <div class="table-responsive mt-4">
        <table class="table admin-pm-table" aria-label="جدول إدارة المسائل البرمجية">
          <thead>
            <tr>
              <th scope="col" style="width: 60px;">المستوى</th>
              <th scope="col">عنوان المسألة</th>
              <th scope="col">درجة الصعوبة</th>
              <th scope="col">النقاط</th>
              <th scope="col">حالات الاختبار</th>
              <th scope="col">الحالة</th>
              <th scope="col" class="text-end">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${filtered
              .map((p) => {
                const isActive = p.active !== false;
                const difficultyText =
                  p.difficulty === "expert"
                    ? "خبير 💎"
                    : p.difficulty === "hard"
                    ? "متقدم 🧠"
                    : p.difficulty === "medium"
                    ? "متوسط 🔥"
                    : "سهل ⚡";

                return `
                <tr data-problem-id="${p.id}" class="${!isActive ? "row-disabled" : ""}">
                  <td>
                    <span class="ps-level-indicator">L${p.level}</span>
                  </td>
                  <td>
                    <strong class="d-block">${escapeHtml(p.title)}</strong>
                    <small class="text-muted">${escapeHtml(p.id)}</small>
                  </td>
                  <td>
                    <span class="ps-diff-badge diff-${p.difficulty || "easy"}">${difficultyText}</span>
                  </td>
                  <td>
                    <strong class="text-accent">+${p.points} نقطة</strong>
                  </td>
                  <td>
                    <span class="text-xs">🧪 ${p.totalTestCasesCount || p.publicTestCases?.length || 2} حالات</span>
                  </td>
                  <td>
                    <span class="badge ${isActive ? "badge-success" : "badge-secondary"}">
                      ${isActive ? "مفعلة للطلاب" : "معطلة مؤقتاً"}
                    </span>
                  </td>
                  <td class="text-end">
                    <div class="d-flex justify-end gap-2">
                      <button
                        type="button"
                        class="btn btn-secondary btn-sm admin-toggle-status-btn"
                        data-problem-id="${p.id}"
                        data-active="${isActive}"
                        title="${isActive ? "تعطيل المسألة" : "تفعيل المسألة"}"
                      >
                        <span>${isActive ? "تعطيل ⏸" : "تفعيل ▶️"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
      </div>

      <!-- Create / Edit Modal Slot -->
      <div id="adminProblemModalSlot"></div>
    </div>
  `;
}

/**
 * Renders the Create Problem modal form.
 */
export function renderProblemModal() {
  return `
    <div class="modal-backdrop active" id="adminProblemModalBackdrop">
      <div class="modal-dialog" style="max-width: 720px;" role="dialog" aria-modal="true" aria-labelledby="modalProblemTitle">
        <div class="modal-header">
          <h3 class="modal-title" id="modalProblemTitle">➕ إضافة مسألة برمجية جديدة</h3>
          <button type="button" class="btn-close" id="closeAdminProblemModalBtn" aria-label="إغلاق">✕</button>
        </div>

        <form id="adminProblemForm" class="modal-body">
          <div class="form-row">
            <div class="form-group flex-1">
              <label class="form-label" for="newProbTitle">عنوان المسألة: *</label>
              <input type="text" id="newProbTitle" class="form-input" required placeholder="مثال: حساب مجموع الأرقام الفردية" />
            </div>
            <div class="form-group" style="width: 140px;">
              <label class="form-label" for="newProbLevel">المستوى: *</label>
              <select id="newProbLevel" class="form-input">
                <option value="1">1 - مبتدئ</option>
                <option value="2">2 - سهل</option>
                <option value="3" selected>3 - متوسط</option>
                <option value="4">4 - متقدم</option>
                <option value="5">5 - خبير</option>
              </select>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="form-group flex-1">
              <label class="form-label" for="newProbDifficulty">درجة الصعوبة:</label>
              <select id="newProbDifficulty" class="form-input">
                <option value="easy">🟢 سهل (Easy - 10ن)</option>
                <option value="medium" selected>🟡 متوسط (Medium - 25ن)</option>
                <option value="hard">🟠 متقدم (Hard - 50ن)</option>
                <option value="expert">🔴 خبير (Expert - 100ن)</option>
              </select>
            </div>
            <div class="form-group" style="width: 140px;">
              <label class="form-label" for="newProbPoints">النقاط التنافسية:</label>
              <input type="number" id="newProbPoints" class="form-input" value="25" min="5" max="500" required />
            </div>
          </div>

          <div class="form-group mt-3">
            <label class="form-label" for="newProbDesc">نص ووصف المسألة: *</label>
            <textarea id="newProbDesc" class="form-input" rows="3" required placeholder="اشرح المطلوب من الطالب بدقة..."></textarea>
          </div>

          <div class="form-row mt-3">
            <div class="form-group flex-1">
              <label class="form-label" for="newProbInputDesc">وصف المدخلات:</label>
              <input type="text" id="newProbInputDesc" class="form-input" placeholder="مثال: سطر يحتوي على عدد صحيح N" />
            </div>
            <div class="form-group flex-1">
              <label class="form-label" for="newProbOutputDesc">وصف المخرجات:</label>
              <input type="text" id="newProbOutputDesc" class="form-input" placeholder="مثال: اطبع الناتج النهائي" />
            </div>
          </div>

          <div class="form-group mt-3">
            <label class="form-label" for="newProbStarter">الكود الابتدائي (Starter Code):</label>
            <textarea id="newProbStarter" class="form-input" rows="3" style="font-family: monospace;" placeholder="# اقرأ المدخلات واكتب حلك هنا..."></textarea>
          </div>

          <div class="form-row mt-3">
            <div class="form-group flex-1">
              <label class="form-label" for="newProbPublicInput">حالة اختبار عامة (المدخلات): *</label>
              <textarea id="newProbPublicInput" class="form-input" rows="2" placeholder="5&#10;10"></textarea>
            </div>
            <div class="form-group flex-1">
              <label class="form-label" for="newProbPublicOutput">المخرجات المتوقعة: *</label>
              <textarea id="newProbPublicOutput" class="form-input" rows="2" placeholder="15"></textarea>
            </div>
          </div>

          <div class="form-row mt-3">
            <div class="form-group flex-1">
              <label class="form-label" for="newProbHiddenInput">حالة اختبار سرية (المدخلات):</label>
              <textarea id="newProbHiddenInput" class="form-input" rows="2" placeholder="100&#10;200"></textarea>
            </div>
            <div class="form-group flex-1">
              <label class="form-label" for="newProbHiddenOutput">المخرجات المتوقعة السرية:</label>
              <textarea id="newProbHiddenOutput" class="form-input" rows="2" placeholder="300"></textarea>
            </div>
          </div>

          <div class="modal-footer mt-4">
            <button type="button" id="cancelAdminProblemModalBtn" class="btn btn-secondary">إلغاء</button>
            <button type="submit" id="submitAdminProblemModalBtn" class="btn btn-primary">حفظ واعتماد المسألة 💾</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

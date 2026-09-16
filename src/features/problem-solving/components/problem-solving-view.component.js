// src/features/problem-solving/components/problem-solving-view.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the modern, responsive Problem Solving catalog view with 5 level tabs and problem cards.
 */
export function renderProblemSolvingView({ levels = [], problems = [], studentSummary = {}, activeLevel = "all", activeDifficulty = "all", activeStatus = "all", searchQuery = "" }) {
  const solvedCount = studentSummary.solvedCount || 0;
  const totalCount = studentSummary.totalCount || problems.length || 25;
  const totalPoints = studentSummary.totalPointsEarned || 0;
  const streak = studentSummary.streakCount || 1;
  const progressPercent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Filter problems
  let filteredProblems = problems.filter((p) => {
    if (activeLevel !== "all" && p.level !== Number(activeLevel)) return false;
    if (activeDifficulty !== "all" && p.difficulty !== activeDifficulty) return false;
    if (activeStatus === "solved" && !p.isCompleted) return false;
    if (activeStatus === "unsolved" && p.isCompleted) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (p.title || "").toLowerCase().includes(q);
      const matchSkills = Array.isArray(p.skills) && p.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchSkills) return false;
    }
    return true;
  });

  return `
    <div class="problem-solving-container">
      <!-- Hero Banner -->
      <div class="ps-hero-card">
        <div class="ps-hero-content">
          <div class="ps-hero-badge">
            <span class="ps-pulse-dot" aria-hidden="true"></span>
            <span>منصة تحديات بايثون التنافسية • 5 مستويات تصاعدية</span>
          </div>
          <h1 class="ps-hero-title">تحديات حل المشكلات البرمجية (Python Problem Solving)</h1>
          <p class="ps-hero-desc">
            انتقل من الأساسيات إلى مستوى الخبير عبر 5 مستويات تدرجية. اكتب كودك واختبره ضد حالات اختبار حقيقية واجمع نقاط المنافسة لتتصدر لوحة الشرف.
          </p>

          <!-- Quick Stats Row -->
          <div class="ps-hero-stats-row">
            <div class="ps-stat-pill">
              <span class="ps-stat-icon">🎯</span>
              <div>
                <strong class="ps-stat-value">${solvedCount} / ${totalCount}</strong>
                <span class="ps-stat-label">المسائل المحلولة (${progressPercent}%)</span>
              </div>
            </div>

            <div class="ps-stat-pill">
              <span class="ps-stat-icon">💎</span>
              <div>
                <strong class="ps-stat-value">${totalPoints}</strong>
                <span class="ps-stat-label">نقاط المنافسة</span>
              </div>
            </div>

            <div class="ps-stat-pill">
              <span class="ps-stat-icon">🔥</span>
              <div>
                <strong class="ps-stat-value">${streak} أيام</strong>
                <span class="ps-stat-label">التتابع المستمر</span>
              </div>
            </div>
          </div>
        </div>

        <div class="ps-hero-decoration" aria-hidden="true">
          <span class="ps-hero-emoji">🐍</span>
        </div>
      </div>

      <!-- Level Tabs Bar -->
      <div class="ps-levels-bar" role="tablist" aria-label="مستويات حل المشكلات">
        <button
          type="button"
          class="ps-level-tab ${activeLevel === "all" ? "active" : ""}"
          data-level="all"
          role="tab"
          aria-selected="${activeLevel === "all"}"
        >
          <span class="ps-level-icon">🌐</span>
          <div class="ps-level-text">
            <strong>جميع المستويات</strong>
            <small>كل التحديات</small>
          </div>
        </button>

        ${levels
          .map((lvl) => {
            const isSelected = String(activeLevel) === String(lvl.level);
            const levelProblems = problems.filter((p) => p.level === lvl.level);
            const solvedInLevel = levelProblems.filter((p) => p.isCompleted).length;

            return `
              <button
                type="button"
                class="ps-level-tab ${isSelected ? "active" : ""}"
                data-level="${lvl.level}"
                role="tab"
                aria-selected="${isSelected}"
                style="--tab-accent: ${lvl.color};"
              >
                <span class="ps-level-icon">${lvl.icon}</span>
                <div class="ps-level-text">
                  <strong>${escapeHtml(lvl.shortTitle)}</strong>
                  <small>${solvedInLevel}/${levelProblems.length} محلولة • +${lvl.pointsPerProblem}ن</small>
                </div>
              </button>
            `;
          })
          .join("")}
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="ps-toolbar">
        <div class="ps-search-wrap">
          <span class="ps-search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            id="psSearchInput"
            class="ps-search-input"
            placeholder="ابحث باسم المسألة، المفهوم البرمجي، أو الكلمات الدلالية..."
            value="${escapeHtml(searchQuery)}"
            aria-label="البحث في المسائل البرمجية"
          />
        </div>

        <div class="ps-filter-group">
          <!-- Difficulty Filter -->
          <div class="ps-select-wrap">
            <label for="psDifficultySelect" class="sr-only">الصعوبة</label>
            <select id="psDifficultySelect" class="ps-select" aria-label="تصفية حسب الصعوبة">
              <option value="all" ${activeDifficulty === "all" ? "selected" : ""}>جميع درجات الصعوبة</option>
              <option value="easy" ${activeDifficulty === "easy" ? "selected" : ""}>🟢 سهل (Easy - 10ن)</option>
              <option value="medium" ${activeDifficulty === "medium" ? "selected" : ""}>🟡 متوسط (Medium - 25ن)</option>
              <option value="hard" ${activeDifficulty === "hard" ? "selected" : ""}>🟠 متقدم (Hard - 50ن)</option>
              <option value="expert" ${activeDifficulty === "expert" ? "selected" : ""}>🔴 خبير (Expert - 100ن)</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div class="ps-select-wrap">
            <label for="psStatusSelect" class="sr-only">حالة الحل</label>
            <select id="psStatusSelect" class="ps-select" aria-label="تصفية حسب حالة الإنجاز">
              <option value="all" ${activeStatus === "all" ? "selected" : ""}>كل المسائل</option>
              <option value="solved" ${activeStatus === "solved" ? "selected" : ""}>✅ تم حلها بنجاح</option>
              <option value="unsolved" ${activeStatus === "unsolved" ? "selected" : ""}>⏳ بانتظار الحل</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Problem Cards Grid -->
      <div class="ps-grid" id="psProblemsGrid">
        ${
          filteredProblems.length === 0
            ? `
            <div class="ps-empty-state">
              <span class="ps-empty-icon">🔎</span>
              <h3>لا توجد مسائل تطابق معايير البحث الحالية</h3>
              <p>جرّب اختيار مستوى آخر أو مسح عبارة البحث لإظهار المزيد من التحديات.</p>
              <button type="button" id="psResetFiltersBtn" class="btn btn-secondary mt-3">
                <span>إعادة ضبط التصفية 🔄</span>
              </button>
            </div>
          `
            : filteredProblems
                .map((p) => {
                  const difficultyBadge =
                    p.difficulty === "expert"
                      ? { text: "خبير 💎", cls: "diff-expert" }
                      : p.difficulty === "hard"
                      ? { text: "متقدم 🧠", cls: "diff-hard" }
                      : p.difficulty === "medium"
                      ? { text: "متوسط 🔥", cls: "diff-medium" }
                      : { text: "سهل ⚡", cls: "diff-easy" };

                  return `
                    <div class="ps-card ${p.isCompleted ? "is-completed" : ""}" data-problem-id="${p.id}">
                      <div class="ps-card-header">
                        <div class="d-flex items-center gap-2">
                          <span class="ps-level-indicator">المستوى ${p.level}</span>
                          <span class="ps-diff-badge ${difficultyBadge.cls}">${difficultyBadge.text}</span>
                        </div>
                        <div class="ps-points-tag">
                          <span>+${p.points} نقطة</span>
                        </div>
                      </div>

                      <h3 class="ps-card-title">${escapeHtml(p.title)}</h3>
                      <p class="ps-card-desc">${escapeHtml(p.description)}</p>

                      <div class="ps-card-skills">
                        ${(p.skills || [])
                          .slice(0, 3)
                          .map((s) => `<span class="ps-skill-tag">${escapeHtml(s)}</span>`)
                          .join("")}
                      </div>

                      <div class="ps-card-footer">
                        <div class="ps-card-meta">
                          ${
                            p.isCompleted
                              ? `<span class="ps-status-tag solved">✅ تم الحل بنجاح (${p.stars || 3} ⭐)</span>`
                              : `<span class="ps-status-tag pending">⏳ بانتظار الحل</span>`
                          }
                          <small class="text-muted d-block mt-1">🧪 ${p.totalTestCasesCount || p.publicTestCases?.length || 2} حالات اختبار</small>
                        </div>

                        <button
                          type="button"
                          class="btn ${p.isCompleted ? "btn-secondary" : "btn-primary"} ps-open-btn"
                          data-problem-id="${p.id}"
                        >
                          <span>${p.isCompleted ? "مراجعة الحل 💻" : "حل المسألة 🚀"}</span>
                        </button>
                      </div>
                    </div>
                  `;
                })
                .join("")
        }
      </div>
    </div>
  `;
}

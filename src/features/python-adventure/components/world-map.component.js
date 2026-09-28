// src/features/python-adventure/components/world-map.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";
import {
  WORLDS_DATA,
  PROBLEM_SOLVING_WORLDS_DATA,
  ALL_WORLDS_DATA,
  CHALLENGES_CLIENT_DATA,
  PROBLEM_SOLVING_CHALLENGES_DATA
} from "../python-adventure-data.js";
import { PythonAdventureService } from "../python-adventure.service.js";

/**
 * Renders the interactive World Map and Levels Drawer,
 * including both the 8 Concept Worlds and the 5 Problem Solving Level Worlds.
 */
export function renderWorldMap({ progress, selectedWorldId = "world-1", activeTrack = "all" }) {
  const unlockedWorlds = new Set(progress?.unlockedWorlds || ["world-1"]);
  const completedChallenges = progress?.completedChallenges || {};
  const starsMap = progress?.stars || {};

  // Group concept challenges by world honoring custom ordering and custom levels
  const worldChallengesMap = {};
  for (const w of WORLDS_DATA) {
    worldChallengesMap[w.id] = PythonAdventureService.getWorldChallenges(w.id);
  }

  // Group problem solving challenges by level world
  const psProblemsMap = {
    "ps-level-1": [],
    "ps-level-2": [],
    "ps-level-3": [],
    "ps-level-4": [],
    "ps-level-5": []
  };
  for (const [pId, prob] of Object.entries(PROBLEM_SOLVING_CHALLENGES_DATA)) {
    const key = `ps-level-${prob.level}`;
    if (psProblemsMap[key]) {
      psProblemsMap[key].push(prob);
    }
  }

  const isPsSelected = selectedWorldId.startsWith("ps-level-");
  const activeWorldObj =
    ALL_WORLDS_DATA.find((w) => w.id === selectedWorldId) || WORLDS_DATA[0];

  const activeWorldChallenges = isPsSelected
    ? psProblemsMap[selectedWorldId] || []
    : worldChallengesMap[selectedWorldId] || [];

  return `
    <div class="adventure-map-wrapper">
      <!-- Header -->
      <div class="adventure-view-header">
        <div class="d-flex items-center justify-between w-full flex-wrap gap-3">
          <div>
            <button type="button" class="btn btn-sm btn-secondary adventure-back-btn" id="mapBackToHomeBtn">
              <span>➔ العودة للرئيسية</span>
            </button>
            <h2 class="view-title">🗺️ خريطة عوالم بايثون وتحديات البرمجة</h2>
            <p class="view-subtitle">تدرج عبر عوالم التأسيس الثمانية ومسار تحديات البرمجة الخمسة لإتقان 25 مسألة برمجية باختبارات حقيقية.</p>
          </div>
          <div>
            <button type="button" id="openLevelManagerModalBtn" class="btn btn-sm btn-primary flex items-center gap-2" style="background: linear-gradient(135deg, #10b981 0%, #0d9488 100%); border: 1px solid rgba(16, 185, 129, 0.4); font-weight: 700; padding: 0.5rem 1rem;">
              <span>⚙️</span>
              <span>إدارة المستويات والترتيب</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Track Filter Switcher -->
      <div class="map-track-switcher" role="tablist">
        <button type="button" class="map-track-pill ${activeTrack === "all" ? "active" : ""}" data-track="all">
          <span>🌐 جميع العوالم والتحديات (13 محطة)</span>
        </button>
        <button type="button" class="map-track-pill ${activeTrack === "concepts" ? "active" : ""}" data-track="concepts">
          <span>🏰 مسار عوالم التأسيس (8 عوالم)</span>
        </button>
        <button type="button" class="map-track-pill ${activeTrack === "problem-solving" ? "active" : ""}" data-track="problem-solving">
          <span>⚡ مسار تحديات البرمجة (5 مستويات)</span>
        </button>
      </div>

      <!-- TRACK 1: CONCEPT WORLDS (8 WORLDS) -->
      ${
        activeTrack === "all" || activeTrack === "concepts"
          ? `
        <div class="map-track-section">
          <div class="map-track-section-header">
            <div class="d-flex items-center gap-2">
              <span class="track-header-icon">🏰</span>
              <h3 class="track-header-title">عوالم مسار التأسيس والمفاهيم البرمجية</h3>
            </div>
            <span class="track-header-subtitle">8 عوالم متدرجة من قرية بايثون حتى البرمجة كائنية التوجه والمشروع الختامي</span>
          </div>

          <div class="worlds-grid">
            ${WORLDS_DATA.map((w, index) => {
              const isUnlocked = unlockedWorlds.has(w.id);
              const isSelected = selectedWorldId === w.id;

              const challenges = worldChallengesMap[w.id] || [];
              const worldCompletedCount = challenges.filter((c) => completedChallenges[c.id]).length;
              const isAllCompleted = challenges.length > 0 && worldCompletedCount === challenges.length;

              let statusBadge = "";
              let cardClass = "world-card";

              if (isAllCompleted) {
                statusBadge = '<span class="world-status-badge success">✅ مكتمل</span>';
                cardClass += " completed";
              } else if (isUnlocked) {
                statusBadge = '<span class="world-status-badge active">🔓 متاح</span>';
                cardClass += " active";
              } else {
                statusBadge = '<span class="world-status-badge locked">🔒 مغلق</span>';
                cardClass += " locked";
              }

              if (isSelected) cardClass += " selected";

              const prevWorld = WORLDS_DATA[index - 1];
              const lockReason = prevWorld ? `أكمل ${prevWorld.title} أولاً لفتح هذا العالم.` : "عالم مغلق حالياً.";

              return `
                <div class="${cardClass}" data-world-id="${w.id}" role="button" tabindex="${isUnlocked ? "0" : "-1"}">
                  <div class="world-card-top">
                    <span class="world-number">عالم ${w.number}</span>
                    ${statusBadge}
                  </div>

                  <div class="world-icon-wrap" style="border-color: ${w.color};">
                    <span class="world-icon">${w.icon}</span>
                  </div>

                  <h3 class="world-title">${escapeHtml(w.title)}</h3>
                  <span class="world-english">${escapeHtml(w.englishTitle)}</span>
                  <p class="world-concept">${escapeHtml(w.concept)}</p>

                  <div class="world-progress-mini">
                    <div class="d-flex justify-between text-xs text-muted mb-1">
                      <span>التقدم</span>
                      <span>${worldCompletedCount} / ${challenges.length}</span>
                    </div>
                    <div class="world-mini-track">
                      <div class="world-mini-fill" style="width: ${challenges.length ? (worldCompletedCount / challenges.length) * 100 : 0}%; background-color: ${w.color};"></div>
                    </div>
                  </div>

                  ${!isUnlocked ? `<div class="world-lock-overlay"><span>🔒 ${lockReason}</span></div>` : ""}
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `
          : ""
      }

      <!-- TRACK 2: PROBLEM SOLVING LEVEL WORLDS (5 LEVELS) -->
      ${
        activeTrack === "all" || activeTrack === "problem-solving"
          ? `
        <div class="map-track-section mt-8">
          <div class="map-track-section-header">
            <div class="d-flex items-center gap-2">
              <span class="track-header-icon">⚡</span>
              <h3 class="track-header-title">عوالم مسار تحديات البرمجة وحل المشكلات</h3>
            </div>
            <span class="track-header-subtitle">5 مستويات تنافسية • 25 مسألة برمجية حقيقية باختبارات تلقائية ونقاط للوحة الشرف</span>
          </div>

          <div class="worlds-grid">
            ${PROBLEM_SOLVING_WORLDS_DATA.map((lvl) => {
              const isSelected = selectedWorldId === lvl.id;
              const problems = psProblemsMap[lvl.id] || [];
              const solvedCount = problems.filter((p) => completedChallenges[p.id]).length;
              const isAllSolved = problems.length > 0 && solvedCount === problems.length;

              let cardClass = "world-card ps-world-card";
              let statusBadge = "";

              if (isAllSolved) {
                statusBadge = '<span class="world-status-badge success">✅ مكتمل</span>';
                cardClass += " completed";
              } else {
                statusBadge = `<span class="world-status-badge active" style="color: ${lvl.color}; background: rgba(255,255,255,0.08);">🔓 ${solvedCount}/${problems.length} محلول</span>`;
                cardClass += " active";
              }

              if (isSelected) cardClass += " selected";

              return `
                <div class="${cardClass}" data-world-id="${lvl.id}" role="button" tabindex="0">
                  <div class="world-card-top">
                    <span class="world-number" style="color: ${lvl.color}; font-weight: bold;">المستوى ${lvl.level}</span>
                    ${statusBadge}
                  </div>

                  <div class="world-icon-wrap" style="border-color: ${lvl.color};">
                    <span class="world-icon">${lvl.icon}</span>
                  </div>

                  <h3 class="world-title">${escapeHtml(lvl.title)}</h3>
                  <span class="world-english">${escapeHtml(lvl.englishTitle)}</span>
                  <p class="world-concept">${escapeHtml(lvl.concept)}</p>

                  <div class="world-progress-mini">
                    <div class="d-flex justify-between text-xs text-muted mb-1">
                      <span>المسائل المحلولة</span>
                      <span>${solvedCount} / ${problems.length}</span>
                    </div>
                    <div class="world-mini-track">
                      <div class="world-mini-fill" style="width: ${problems.length ? (solvedCount / problems.length) * 100 : 0}%; background-color: ${lvl.color};"></div>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `
          : ""
      }

      <!-- LEVELS / PROBLEMS SECTION FOR SELECTED WORLD -->
      <div class="world-levels-section" id="worldLevelsSection">
        <div class="levels-section-header">
          <div class="d-flex items-center gap-3">
            <span class="selected-world-icon">${activeWorldObj.icon}</span>
            <div>
              <h3 class="levels-world-title">${escapeHtml(activeWorldObj.title)} - ${isPsSelected ? "قائمة المسائل البرمجية" : "قائمة المهمات"}</h3>
              <p class="levels-world-desc">${escapeHtml(activeWorldObj.description)}</p>
            </div>
          </div>
          ${
            isPsSelected
              ? `
            <div class="levels-header-stats d-flex items-center gap-2">
              <span class="ps-header-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); padding: 4px 12px; border-radius: 9999px; font-size: 0.85rem; font-weight: bold;">
                🎯 +${activeWorldObj.pointsPerProblem} نقطة لكل مسألة
              </span>
            </div>
          `
              : ""
          }
        </div>

        <div class="levels-grid">
          ${
            isPsSelected
              ? activeWorldChallenges.map((prob, idx) => {
                  const isCompleted = !!completedChallenges[prob.id];
                  const diffClass =
                    prob.difficulty === "expert"
                      ? "diff-expert"
                      : prob.difficulty === "hard"
                      ? "diff-hard"
                      : prob.difficulty === "medium"
                      ? "diff-medium"
                      : "diff-easy";

                  const diffText =
                    prob.difficulty === "expert"
                      ? "خبير 💎"
                      : prob.difficulty === "hard"
                      ? "متقدم 🧠"
                      : prob.difficulty === "medium"
                      ? "متوسط 🔥"
                      : "سهل ⚡";

                  return `
                    <div class="level-card ps-challenge-card ${isCompleted ? "completed" : "unlocked"}" data-problem-id="${prob.id}" role="button" tabindex="0">
                      <div class="level-card-header">
                        <span class="level-badge">${escapeHtml(activeWorldObj.shortTitle || activeWorldObj.title)} • مسألة ${idx + 1}</span>
                        <span class="ps-diff-pill ${diffClass}">${diffText}</span>
                      </div>

                      <h4 class="level-title">${escapeHtml(prob.title)}</h4>
                      <p class="level-subtitle">${escapeHtml(prob.description)}</p>

                      <div class="ps-skills-wrap">
                        ${(prob.skills || []).map((s) => `<span class="ps-skill-tag">${escapeHtml(s)}</span>`).join("")}
                      </div>

                      <div class="level-footer">
                        <div class="level-xp-tag">+${prob.points} نقطة / +50 XP</div>
                        ${
                          isCompleted
                            ? '<span class="level-status-tag done">مكتمل بنجاح ✅</span>'
                            : '<button type="button" class="btn btn-sm btn-primary level-play-btn ps-start-btn">ابدأ الحل ⚡</button>'
                        }
                      </div>
                    </div>
                  `;
                }).join("")
              : activeWorldChallenges.map((ch, idx) => {
                  const isCompleted = !!completedChallenges[ch.id];
                  const unlockedList = progress?.unlockedChallenges || ["world-1-level-1"];
                  const isLevelUnlocked = unlockedList.includes(ch.id);
                  const stars = starsMap[ch.id] || 0;

                  let levelClass = "level-card";
                  if (isCompleted) levelClass += " completed";
                  else if (isLevelUnlocked) levelClass += " unlocked";
                  else levelClass += " locked";

                  const prevLevel = activeWorldChallenges[idx - 1];
                  const lockMsg = prevLevel ? `أكمل "${prevLevel.title}" لفتح هذه المهمة.` : "أكمل المهمات السابقة.";

                  return `
                    <div class="${levelClass}" data-challenge-id="${ch.id}" role="button" tabindex="${isLevelUnlocked ? "0" : "-1"}">
                      <div class="level-card-header">
                        <span class="level-badge">${ch.type === "boss" ? "👑 زعيم العالم" : `Level ${ch.levelNumber}`}</span>
                        <div class="level-stars">
                          <span class="${stars >= 1 ? "star-active" : "star-dim"}">★</span>
                          <span class="${stars >= 2 ? "star-active" : "star-dim"}">★</span>
                          <span class="${stars >= 3 ? "star-active" : "star-dim"}">★</span>
                        </div>
                      </div>

                      <h4 class="level-title">${escapeHtml(ch.title)}</h4>
                      <p class="level-subtitle">${escapeHtml(ch.subtitle || "")}</p>

                      <div class="level-footer">
                        <div class="level-xp-tag">+${ch.baseXp} XP</div>
                        ${
                          isCompleted
                            ? '<span class="level-status-tag done">مكتمل ✅</span>'
                            : isLevelUnlocked
                            ? '<button type="button" class="btn btn-sm btn-primary level-play-btn">ابدأ ⚔️</button>'
                            : `<span class="level-status-tag lock" title="${lockMsg}">🔒 مغلق</span>`
                        }
                      </div>

                      ${!isLevelUnlocked ? `<div class="level-locked-hint"><span>${lockMsg}</span></div>` : ""}
                    </div>
                  `;
                }).join("")
          }
        </div>
      </div>
    </div>
  `;
}

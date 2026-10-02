// src/features/python-adventure/components/skill-tree.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the Visual Skill Tree and Topic Mastery screen with a tiered, gamified design.
 */
export function renderSkillTree({ progress }) {
  const completed = progress?.completedChallenges || {};

  // Structured learning tiers and modules
  const tiers = [
    {
      tierId: "tier-1",
      tierName: "المرحلة الأولى: ركائز البرمجة وتدفق البيانات",
      tierSubtitle: "Syntax, Variables, Operations & Logical Conditions",
      tierBadge: "الأساسيات الخوارزمية",
      topics: [
        {
          id: "basics",
          title: "الطباعة والعمليات الأساسية",
          subtitle: "Print, Arithmetic & Operators",
          icon: "🏠",
          challenges: ["world-1-level-1", "world-1-level-2", "world-1-level-3", "world-1-level-4"]
        },
        {
          id: "variables",
          title: "المتغيرات والأنواع البيانية",
          subtitle: "Variables, Strings, Int & Float",
          icon: "🔢",
          challenges: ["world-2-level-1", "world-2-level-2", "world-2-level-3", "world-2-level-4"]
        },
        {
          id: "conditions",
          title: "الجمل الشرطية والمنطق البرمجي",
          subtitle: "If-Else & Logical Decisions",
          icon: "🔀",
          challenges: ["world-3-level-1", "world-3-level-2", "world-3-level-3", "world-3-level-4"]
        }
      ]
    },
    {
      tierId: "tier-2",
      tierName: "المرحلة الثانية: الخوارزميات وهياكل البيانات",
      tierSubtitle: "Loops, Lists, Collections & Modularity",
      tierBadge: "التحكم وهياكل البيانات",
      topics: [
        {
          id: "loops",
          title: "حلقات التكرار والمدى",
          subtitle: "Loops: for, while & range()",
          icon: "🔁",
          challenges: ["world-4-level-1", "world-4-level-2", "world-4-level-3", "world-4-level-4"]
        },
        {
          id: "lists",
          title: "القوائم والمصفوفات",
          subtitle: "Lists, Slicing & Collections",
          icon: "📦",
          challenges: ["world-5-level-1", "world-5-level-2", "world-5-level-3", "world-5-level-4"]
        },
        {
          id: "functions",
          title: "الدوال وتجزئة البرمجيات",
          subtitle: "Functions: def, args & return",
          icon: "⚙️",
          challenges: ["world-6-level-1", "world-6-level-2", "world-6-level-3", "world-6-level-4"]
        }
      ]
    },
    {
      tierId: "tier-3",
      tierName: "المرحلة الثالثة: هندسة البرمجيات والمشاريع",
      tierSubtitle: "Object-Oriented Programming & Capstone Projects",
      tierBadge: "المستوى الاحترافي",
      topics: [
        {
          id: "oop",
          title: "البرمجة كائنية التوجه",
          subtitle: "OOP: Classes, Objects & Methods",
          icon: "🧱",
          challenges: ["world-7-level-1", "world-7-level-2", "world-7-level-3", "world-7-level-4"]
        },
        {
          id: "final_project",
          title: "المشاريع التطبيقية المتكاملة",
          subtitle: "Capstone Real-World Projects",
          icon: "🏆",
          challenges: ["world-8-level-1", "world-8-level-2", "world-8-level-3"]
        }
      ]
    }
  ];

  // Calculate overall metrics
  const allTopics = tiers.flatMap(t => t.topics);
  const allChallengeIds = allTopics.flatMap(t => t.challenges);
  const totalChallenges = allChallengeIds.length;
  const totalDone = allChallengeIds.filter(id => !!completed[id]).length;
  const overallPercent = Math.min(100, Math.round((totalDone / totalChallenges) * 100));

  const masteredCount = allTopics.filter(t => {
    const done = t.challenges.filter(id => !!completed[id]).length;
    return done === t.challenges.length;
  }).length;

  let masteryRank = "مبتدئ واعد 🌱";
  if (overallPercent >= 75) masteryRank = "خبير بايثون محترف 🚀";
  else if (overallPercent >= 40) masteryRank = "مبرمج بايثون متقدم ⚡";
  else if (overallPercent >= 15) masteryRank = "مغامر نشط ومثابر 🧭";

  return `
    <div class="adventure-skill-tree-wrapper">
      
      <!-- Top Action & Navigation Header -->
      <div class="daily-header-glass skill-tree-header-glass">
        <div class="daily-header-right">
          <button type="button" class="daily-back-btn" id="skillTreeBackBtn" title="العودة لمغامرة بايثون">
            <span class="back-arrow">➔</span>
            <span>العودة للرئيسية</span>
          </button>
          <div class="daily-title-meta">
            <div class="daily-badge-pill skill-badge-pill">
              <span class="live-pulse-dot"></span>
              <span>خريطة التمكن المهارية</span>
            </div>
            <h1 class="daily-main-title">🌳 شجرة المهارات ونسب التمكن البرمجي</h1>
            <p class="daily-main-desc">
              تقييم استراتيجي دقيق يوضح نسبة استيعابك لكل ركن من أركان لغة بايثون بناءً على حلولك البرمجية الحقيقية.
            </p>
          </div>
        </div>

        <!-- Overall Mastery Pill -->
        <div class="daily-header-left">
          <div class="mastery-summary-pill">
            <span class="pill-label">التمكن الإجمالي:</span>
            <span class="pill-value">${overallPercent}%</span>
          </div>
        </div>
      </div>

      <!-- Overall Mastery Hero Card -->
      <div class="skill-tree-hero-card">
        <div class="mastery-hero-left">
          <div class="mastery-radial-box">
            <div class="mastery-radial-circle">
              <span class="mastery-percent-num">${overallPercent}%</span>
              <span class="mastery-percent-label">إتقان عام</span>
            </div>
          </div>
        </div>

        <div class="mastery-hero-right">
          <div class="mastery-rank-row">
            <span class="mastery-rank-tag">${masteryRank}</span>
            <span class="mastery-eval-note">مقياس الدقة المعتمد 2026/2027</span>
          </div>
          <h2 class="mastery-heading">مؤشر النضج الخوارزمي في لغة بايثون</h2>
          <p class="mastery-desc">
            لقد أنجزت <strong>${totalDone}</strong> من أصل <strong>${totalChallenges}</strong> تحدٍ برمجي، وأتقنت <strong>${masteredCount}</strong> محاور رئيسية بنسبة 100%. استمر في حل التحديات لفتح المرحلة النهائية!
          </p>
          <div class="mastery-progress-track">
            <div class="mastery-progress-bar" style="width: ${overallPercent}%;">
              <span class="mastery-progress-glow"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tiered Sections -->
      <div class="skill-tree-tiers-container">
        ${tiers.map((tier) => `
          <div class="skill-tier-section" id="${tier.tierId}">
            
            <div class="tier-section-header">
              <div class="tier-title-wrap">
                <span class="tier-badge-pill">${tier.tierBadge}</span>
                <h3 class="tier-main-title">${tier.tierName}</h3>
                <span class="tier-subtitle">${tier.tierSubtitle}</span>
              </div>
            </div>

            <div class="skill-topics-grid">
              ${tier.topics.map((t) => {
                const doneCount = t.challenges.filter((cId) => completed[cId]).length;
                const totalCount = t.challenges.length;
                const percent = Math.round((doneCount / totalCount) * 100);
                const isMastered = percent === 100;
                const isStarted = percent > 0;

                const stateClass = isMastered ? "mastered" : isStarted ? "in-progress" : "locked";

                return `
                  <div class="skill-topic-card ${stateClass}">
                    
                    <!-- Card Top Header -->
                    <div class="topic-header-row">
                      <div class="topic-icon-wrap">
                        <span class="topic-emoji">${t.icon}</span>
                      </div>
                      <div class="topic-title-area">
                        <h4 class="topic-name">${escapeHtml(t.title)}</h4>
                        <span class="topic-eng-sub">${escapeHtml(t.subtitle)}</span>
                      </div>
                      <div class="topic-badge-wrap">
                        <span class="topic-percent-pill ${isMastered ? "pill-mastered" : isStarted ? "pill-started" : "pill-locked"}">
                          ${percent}%
                        </span>
                      </div>
                    </div>

                    <!-- Progress Track -->
                    <div class="topic-track-container">
                      <div class="topic-track-bar" style="width: ${percent}%;"></div>
                    </div>

                    <!-- Challenges Dots & Status -->
                    <div class="topic-challenges-row">
                      <div class="challenges-dots-list">
                        ${t.challenges.map((cId, cIdx) => {
                          const isDone = !!completed[cId];
                          return `
                            <span class="c-dot-pill ${isDone ? "dot-done" : "dot-pending"}" 
                                  title="تحدي ${cIdx + 1}: ${isDone ? "تم الاجتياز بنجاح ✓" : "بانتظار الإنجاز"}">
                              ${isDone ? "✓" : (cIdx + 1)}
                            </span>
                          `;
                        }).join("")}
                      </div>
                      <span class="topic-counts-text">
                        ${doneCount} / ${totalCount} منجز
                      </span>
                    </div>

                    <!-- Card Footer State Note -->
                    <div class="topic-card-footer">
                      ${isMastered ? `
                        <div class="topic-state-note note-mastered">
                          <span>🏆 تم التمكن والإتقان الكامل</span>
                        </div>
                      ` : isStarted ? `
                        <div class="topic-state-note note-started">
                          <span>⚡ قيد التدريب والتطوير (${doneCount}/${totalCount})</span>
                        </div>
                      ` : `
                        <div class="topic-state-note note-locked">
                          <span>🔒 بانتظار البدء في العالم الخاص</span>
                        </div>
                      `}
                    </div>

                  </div>
                `;
              }).join("")}
            </div>

          </div>
        `).join("")}
      </div>

    </div>
  `;
}


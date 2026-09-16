// src/features/leaderboard/components/leaderboard.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Renders the modern, responsive Leaderboard UI with podium and ranked table.
 */
export function renderLeaderboardView({ scope = "group", groupName = "ALL", totalStudents = 0, topStudents = [], currentUserEntry = null, currentUserRank = 1, percentile = 100 }) {
  const top1 = topStudents[0] || null;
  const top2 = topStudents[1] || null;
  const top3 = topStudents[2] || null;

  return `
    <div class="lb-container">
      <!-- Leaderboard Header -->
      <div class="lb-hero-card">
        <div class="lb-hero-content">
          <div class="lb-hero-badge">
            <span>🏆 لوحة الشرف والمتصدرين • التنافس البرمجي الأكاديمي</span>
          </div>
          <h1 class="lb-hero-title">لوحة المتصدرين والأبطال</h1>
          <p class="lb-hero-desc">
            قائمة شرف تنافسية تُحدث تلقائياً عند إكمال أي مسألة، اجتياز اختبار، أو الحصول على أوسمة الإتقان في بايثون.
          </p>

          <!-- Scope Switcher Tabs -->
          <div class="lb-scope-tabs" role="tablist">
            <button
              type="button"
              class="lb-scope-tab ${scope === "group" ? "active" : ""}"
              data-scope="group"
              role="tab"
              aria-selected="${scope === "group"}"
            >
              <span>مجموعتي الدراسية (${escapeHtml(groupName || "مجموعتي")}) 👥</span>
            </button>

            <button
              type="button"
              class="lb-scope-tab ${scope === "global" ? "active" : ""}"
              data-scope="global"
              role="tab"
              aria-selected="${scope === "global"}"
            >
              <span>الترتيب العام للمنصة (الكل) 🌐</span>
            </button>
          </div>
        </div>

        <div class="lb-hero-emblem" aria-hidden="true">
          <span>🥇</span>
        </div>
      </div>

      <!-- Current User Standing Highlight -->
      ${
        currentUserEntry
          ? `
        <div class="lb-user-card">
          <div class="lb-user-rank-box">
            <span class="lb-rank-num">#${currentUserRank}</span>
            <small class="text-muted">ترتيبك الحالي</small>
          </div>

          <div class="lb-user-info-box">
            <h3 class="lb-user-name">${escapeHtml(currentUserEntry.studentName)} (أنت)</h3>
            <div class="lb-user-tags">
              <span class="lb-chip level">${escapeHtml(currentUserEntry.levelTitle || "مبتدئ")}</span>
              <span class="lb-chip badge">${escapeHtml(currentUserEntry.badge || "🌟 مبرمج")}</span>
              <span class="lb-chip group">المجموعة: ${escapeHtml(currentUserEntry.group || "ALL")}</span>
            </div>
            <p class="lb-user-percentile">
              🚀 أنت تتفوق على <strong>${percentile}%</strong> من طلاب المنافسة! واصل حل المسائل للوصول إلى قمة المتصدرين.
            </p>
          </div>

          <div class="lb-user-stats-box">
            <div class="lb-stat-cell">
              <strong>${currentUserEntry.competitionPoints}</strong>
              <small>النقاط 💎</small>
            </div>
            <div class="lb-stat-cell">
              <strong>${currentUserEntry.solvedCount || 0}</strong>
              <small>المحلولة 🎯</small>
            </div>
            <div class="lb-stat-cell">
              <strong>${currentUserEntry.streak || 1}</strong>
              <small>أيام التتابع 🔥</small>
            </div>
          </div>
        </div>
      `
          : ""
      }

      <!-- Top 3 Podium (منصة التتويج) -->
      ${
        topStudents.length > 0
          ? `
        <div class="lb-podium-section">
          <div class="lb-section-header text-center mb-6">
            <h2 class="lb-section-title">🏆 منصة التتويج والمراكز الثلاثة الأولى</h2>
            <p class="lb-section-subtitle">أبطال الصدارة في التنافس البرمجي وحل المسائل بلغة بايثون</p>
          </div>
          <div class="lb-podium-grid">
            <!-- 2nd Place (Silver) -->
            ${
              top2
                ? `
              <div class="lb-podium-card rank-2">
                <div class="lb-podium-card-content">
                  <div class="lb-podium-medal">🥈</div>
                  <div class="lb-podium-avatar silver-ring">
                    <span>${escapeHtml(top2.avatarInitial || "ط")}</span>
                  </div>
                  <h3 class="lb-podium-name">${escapeHtml(top2.studentName)}</h3>
                  <span class="lb-podium-points silver-text">${top2.competitionPoints} نقطة 💎</span>
                  <div class="lb-podium-badge silver-badge">${escapeHtml(top2.levelTitle || "")}</div>
                  <small class="lb-podium-sub">🎯 ${top2.solvedCount || 0} مسألة • 🔥 ${top2.streak || 1} أيام</small>
                </div>
                <div class="lb-podium-pedestal step-2">
                  <span class="lb-pedestal-num">2</span>
                </div>
              </div>
            `
                : `<div class="lb-podium-card empty"><span>بانتظار المركز الثاني 🥈</span></div>`
            }

            <!-- 1st Place (Gold) - Elevated Center -->
            ${
              top1
                ? `
              <div class="lb-podium-card rank-1">
                <div class="lb-podium-crown">👑</div>
                <div class="lb-podium-card-content">
                  <div class="lb-podium-medal">🥇</div>
                  <div class="lb-podium-avatar gold-ring">
                    <span>${escapeHtml(top1.avatarInitial || "ط")}</span>
                  </div>
                  <h3 class="lb-podium-name">${escapeHtml(top1.studentName)}</h3>
                  <span class="lb-podium-points gold-text">${top1.competitionPoints} نقطة 💎</span>
                  <div class="lb-podium-badge gold-badge">${escapeHtml(top1.badge || "بطل بايثون")}</div>
                  <small class="lb-podium-sub">🎯 ${top1.solvedCount || 0} مسألة • 🔥 ${top1.streak || 1} أيام</small>
                </div>
                <div class="lb-podium-pedestal step-1">
                  <span class="lb-pedestal-num">1</span>
                </div>
              </div>
            `
                : `<div class="lb-podium-card empty"><span>بانتظار المتصدر الأول 🥇</span></div>`
            }

            <!-- 3rd Place (Bronze) -->
            ${
              top3
                ? `
              <div class="lb-podium-card rank-3">
                <div class="lb-podium-card-content">
                  <div class="lb-podium-medal">🥉</div>
                  <div class="lb-podium-avatar bronze-ring">
                    <span>${escapeHtml(top3.avatarInitial || "ط")}</span>
                  </div>
                  <h3 class="lb-podium-name">${escapeHtml(top3.studentName)}</h3>
                  <span class="lb-podium-points bronze-text">${top3.competitionPoints} نقطة 💎</span>
                  <div class="lb-podium-badge bronze-badge">${escapeHtml(top3.levelTitle || "")}</div>
                  <small class="lb-podium-sub">🎯 ${top3.solvedCount || 0} مسألة • 🔥 ${top3.streak || 1} أيام</small>
                </div>
                <div class="lb-podium-pedestal step-3">
                  <span class="lb-pedestal-num">3</span>
                </div>
              </div>
            `
                : `<div class="lb-podium-card empty"><span>بانتظار المركز الثالث 🥉</span></div>`
            }
          </div>
        </div>
      `
          : ""
      }

      <!-- Detailed Responsive Leaderboard Table -->
      <div class="lb-table-card">
        <div class="lb-table-header">
          <div>
            <h3 class="lb-table-title">الترتيب الكامل للمتنافسين (${topStudents.length} طالب)</h3>
            <p class="text-muted text-xs">يتم الترتيب تنازلياً وفق مجموع نقاط المنافسة ثم المستوى فالأسبقية.</p>
          </div>
        </div>

        ${
          topStudents.length === 0
            ? `
          <div class="lb-empty-box">
            <span class="lb-empty-icon">📊</span>
            <h4>لا توجد بيانات مسجلة في هذا النطاق حتى الآن</h4>
            <p class="text-muted">ابدأ بحل أول مسألة برمجية ليظهر اسمك مباشرة في صدارة اللوحة!</p>
          </div>
        `
            : `
          <div class="table-responsive">
            <table class="lb-table" aria-label="جدول المتصدرين">
              <thead>
                <tr>
                  <th scope="col" style="width:80px;">الترتيب</th>
                  <th scope="col">الطالب</th>
                  <th scope="col">المستوى</th>
                  <th scope="col" class="text-center">النقاط</th>
                  <th scope="col" class="text-center">المسائل المحلولة</th>
                  <th scope="col" class="text-center">التتابع المستمر</th>
                  <th scope="col">اللقب / الوسام</th>
                </tr>
              </thead>
              <tbody>
                ${topStudents
                  .map((s) => {
                    const isTop1 = s.rank === 1;
                    const isTop2 = s.rank === 2;
                    const isTop3 = s.rank === 3;
                    const rankBadge = isTop1
                      ? "🥇 1"
                      : isTop2
                      ? "🥈 2"
                      : isTop3
                      ? "🥉 3"
                      : `#${s.rank}`;

                    return `
                    <tr class="lb-row ${s.isCurrentUser ? "is-current-user" : ""}">
                      <td>
                        <span class="lb-rank-badge ${isTop1 ? "gold" : isTop2 ? "silver" : isTop3 ? "bronze" : ""}">
                          ${rankBadge}
                        </span>
                      </td>

                      <td>
                        <div class="lb-student-cell">
                          <div class="avatar avatar-sm">${escapeHtml(s.avatarInitial || "ط")}</div>
                          <div>
                            <strong class="lb-student-name">
                              ${escapeHtml(s.studentName)}
                              ${s.isCurrentUser ? '<span class="lb-you-tag">أنت</span>' : ""}
                            </strong>
                            <small class="text-muted d-block">${escapeHtml(s.studentPhoneMasked)}</small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span class="lb-level-tag">${escapeHtml(s.levelTitle || `المستوى ${s.level}`)}</span>
                      </td>

                      <td class="text-center">
                        <strong class="lb-points-val">${s.competitionPoints} 💎</strong>
                      </td>

                      <td class="text-center">
                        <span class="lb-solved-val">${s.solvedCount || 0} 🎯</span>
                      </td>

                      <td class="text-center">
                        <span class="lb-streak-val">${s.streak || 1} أيام 🔥</span>
                      </td>

                      <td>
                        <span class="lb-title-badge">${escapeHtml(s.badge || "🌟 مبرمج")}</span>
                      </td>
                    </tr>
                  `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        `
        }
      </div>
    </div>
  `;
}

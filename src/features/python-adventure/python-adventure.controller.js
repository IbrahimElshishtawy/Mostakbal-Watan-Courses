// src/features/python-adventure/python-adventure.controller.js
import { adventureStore } from "./python-adventure.state.js";
import { PythonAdventureService } from "./python-adventure.service.js";
import { runPythonCode } from "./python-adventure-runtime.js";
import { CHALLENGES_CLIENT_DATA, WORLDS_DATA } from "./python-adventure-data.js";
import { escapeHtml } from "../../shared/utils/dom.utils.js";

import { renderAdventureHome } from "./components/adventure-home.component.js";
import { renderWorldMap } from "./components/world-map.component.js";
import { renderMissionModal } from "./components/mission-modal.component.js";
import { renderChallengeView, renderHintsCardContent } from "./components/challenge-view.component.js";
import { wireCodeEditorEvents } from "./components/code-editor.component.js";
import { renderResultModal } from "./components/result-modal.component.js";
import { renderSkillTree } from "./components/skill-tree.component.js";
import { renderAchievements } from "./components/achievements-modal.component.js";
import { renderDailyChallenge } from "./components/daily-challenge.component.js";
import { renderProfileStats } from "./components/profile-stats.component.js";
import {
  renderLevelManagerModal,
  renderLevelManagerContent,
  LEVEL_MANAGER_MODAL_ID
} from "./components/level-manager-modal.component.js";
import {
  renderTeacherAdventureDashboard,
  renderStudentSolutionsModal
} from "./components/teacher-adventure-dashboard.component.js";
import { showToast } from "../../shared/components/Toast/toast.component.js";

let containerElement = null;
let currentStudent = null;
let currentRenderedView = null;
let currentRenderedChallengeId = null;

export const PythonAdventureController = {
  /**
   * Initializes the Python Adventure system inside target container.
   */
  async init(containerId, student) {
    containerElement = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!containerElement) return;

    currentStudent = student;
    adventureStore.setState({ student });

    // 1. Teacher Management Portal Mode
    if (student?.role === "teacher") {
      await this.initTeacherDashboard(containerElement);
      return;
    }

    // Show initial loading skeleton
    containerElement.innerHTML = `
      <div class="adventure-loading-card">
        <div class="adventure-loader-spinner"></div>
        <h3>جاري تجهيز مغامرة بايثون... 🐍</h3>
        <p class="text-sm text-muted">استرجاع تقدمك البرمجي، الأوسمة، والعوالم المفتوحة...</p>
      </div>
    `;

    try {
      const studentId = student?.uid || student?.id || student?.firestoreId;
      const progress = await PythonAdventureService.getStudentProgress(studentId);
      adventureStore.setState({
        progress,
        activeView: "home",
        selectedWorldId: progress.currentWorldId || "world-1"
      });

      // Subscribe to store updates for reactive re-rendering
      adventureStore.subscribe((state) => {
        this.renderCurrentView(state);
      });

      if (!this._hasTrackListener) {
        this._hasTrackListener = true;
        window.addEventListener("open-python-track", (e) => {
          const { track, worldId } = e.detail || {};
          this.openWorldMapTrack(track || "all", worldId || null);
        });
      }

      this.renderCurrentView(adventureStore.getState());

    } catch (err) {
      console.error("Failed to initialize Python Adventure:", err);
      containerElement.innerHTML = `
        <div class="adventure-error-card">
          <h3>تعذر تحميل مغامرة بايثون</h3>
          <p class="text-sm text-muted">حدث خطأ أثناء استرجاع بياناتك. تأكد من اتصالك بالإنترنت ثم أعد المحاولة.</p>
          <button type="button" class="btn btn-primary mt-3" id="retryAdventureInitBtn">إعادة المحاولة</button>
        </div>
      `;
      document.getElementById("retryAdventureInitBtn")?.addEventListener("click", () => {
        this.init(containerId, student);
      });
    }
  },

  /**
   * Initializes the teacher dashboard for managing python levels, reordering, and student progress tracking.
   */
  async initTeacherDashboard(container) {
    this._teacherContainer = container;
    this._isTeacherMode = true;
    this._teacherActiveSubTab = this._teacherActiveSubTab || "students";
    this._teacherActiveWorldId = this._teacherActiveWorldId || "world-1";
    this._teacherSearchQuery = this._teacherSearchQuery || "";
    this._teacherGroupFilter = this._teacherGroupFilter || "ALL";

    container.innerHTML = `
      <div class="p-12 text-center text-slate-300">
        <div class="adventure-loader-spinner mx-auto mb-4"></div>
        <h3 class="text-base font-bold text-white">جاري تجهيز لوحة إدارة تحديات بايثون للمعلم... 🐍</h3>
        <p class="text-xs text-slate-400 mt-1">جلب بيانات الطلاب، مستويات العوالم، وإحصائيات التفاعل...</p>
      </div>
    `;

    try {
      this._teacherStudents = await PythonAdventureService.getAllStudentsAdventureRoster();
      this.renderTeacherDashboard();

      if (!this._hasLevelUpdateListener) {
        this._hasLevelUpdateListener = true;
        window.addEventListener("python-adventure-levels-updated", () => {
          if (this._isTeacherMode) {
            this.renderTeacherDashboard();
          }
        });
      }
    } catch (err) {
      console.error("Error loading teacher adventure dashboard:", err);
      container.innerHTML = `
        <div class="p-8 rounded-2xl bg-[#101623] border border-[#1e2a3f] text-center space-y-3">
          <div class="text-3xl">⚠️</div>
          <h3 class="text-sm font-bold text-white">تعذر تحميل لوحة إدارة بايثون</h3>
          <p class="text-xs text-slate-400">حدث خطأ أثناء جلب البيانات. يرجى إعادة المحاولة.</p>
          <button type="button" class="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold" id="retryTeacherAdventureInitBtn">إعادة المحاولة 🔄</button>
        </div>
      `;
      container.querySelector("#retryTeacherAdventureInitBtn")?.addEventListener("click", () => {
        this.initTeacherDashboard(container);
      });
    }
  },

  renderTeacherDashboard() {
    if (!this._teacherContainer) return;
    this._isTeacherMode = true;

    this._teacherContainer.innerHTML = renderTeacherAdventureDashboard({
      worlds: WORLDS_DATA,
      activeWorldId: this._teacherActiveWorldId,
      activeSubTab: this._teacherActiveSubTab,
      students: this._teacherStudents || [],
      searchQuery: this._teacherSearchQuery,
      groupFilter: this._teacherGroupFilter
    });

    this.wireTeacherDashboardEvents();

    if (this._teacherActiveSubTab === "preview") {
      const previewBox = this._teacherContainer.querySelector("#teacherLivePreviewContainer");
      if (previewBox) {
        previewBox.innerHTML = renderWorldMap({
          progress: {
            unlockedWorlds: ["world-1", "world-2", "world-3", "world-4"],
            completedChallenges: { "world-1-level-1": true, "world-1-level-2": true },
            stars: { "world-1-level-1": 3, "world-1-level-2": 3 }
          },
          selectedWorldId: this._teacherActiveWorldId,
          activeTrack: "all"
        });
        this.wireWorldMapEvents();
      }
    }
  },

  wireTeacherDashboardEvents() {
    const container = this._teacherContainer;
    if (!container) return;

    // 1. Sub-tab navigation
    container.querySelectorAll(".teacher-tab-btn[data-subtab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._teacherActiveSubTab = btn.getAttribute("data-subtab");
        this.renderTeacherDashboard();
      });
    });

    // 2. Open Add Level Modal button
    container.querySelector("#teacherOpenAddLevelModalBtn")?.addEventListener("click", () => {
      this.openLevelManagerModal(this._teacherActiveWorldId, "add");
    });
    container.querySelector("#addNewLevelToCurrentWorldBtn")?.addEventListener("click", () => {
      this.openLevelManagerModal(this._teacherActiveWorldId, "add");
    });

    // 3. Open Reorder Modal / Tab
    container.querySelector("#teacherOpenReorderModalBtn")?.addEventListener("click", () => {
      this._teacherActiveSubTab = "reorder";
      this.renderTeacherDashboard();
    });
    container.querySelector("#quickReorderCurrentWorldBtn")?.addEventListener("click", () => {
      this._teacherActiveSubTab = "reorder";
      this.renderTeacherDashboard();
    });

    // 4. Students Search and Filtering
    const searchInput = container.querySelector("#studentProgressSearchInput");
    searchInput?.addEventListener("input", (e) => {
      this._teacherSearchQuery = e.target.value;
      this.renderTeacherDashboard();
      const nextInput = container.querySelector("#studentProgressSearchInput");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
      }
    });

    const groupFilterSelect = container.querySelector("#studentProgressGroupFilter");
    groupFilterSelect?.addEventListener("change", (e) => {
      this._teacherGroupFilter = e.target.value;
      this.renderTeacherDashboard();
    });

    const refreshBtn = container.querySelector("#refreshStudentsRosterBtn");
    refreshBtn?.addEventListener("click", async () => {
      showToast("جاري تحديث سجل إنجازات الطلاب... ⏳", "info");
      this._teacherStudents = await PythonAdventureService.getAllStudentsAdventureRoster();
      this.renderTeacherDashboard();
      showToast("تم تحديث سجل الطلاب بنجاح! 🚀", "success");
    });

    // 5. Inspect student solutions
    container.querySelectorAll('[data-action="inspect-student-solutions"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const studentId = btn.getAttribute("data-student-id");
        const student = (this._teacherStudents || []).find((s) => s.id === studentId) || {
          name: btn.getAttribute("data-student-name") || "طالب",
          id: studentId,
          completedCount: 6,
          percent: 50,
          xp: 450,
          badgesCount: 3
        };

        const sampleChallenges = [
          { title: "طباعة أول رسالة ترحيبية", code: '# الحل المعتمد للطالب:\nprint("أهلاً بك في عالم بايثون!")' },
          { title: "حساب مساحة المستطيل", code: 'width = 5\nheight = 10\narea = width * height\nprint(f"Area is: {area}")' },
          { title: "فحص الرقم الزوجي والفردي", code: 'num = 7\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")' }
        ];

        let modalWrap = document.getElementById("studentSolutionsInspectModalWrapper");
        if (!modalWrap) {
          modalWrap = document.createElement("div");
          modalWrap.id = "studentSolutionsInspectModalWrapper";
          document.body.appendChild(modalWrap);
        }

        modalWrap.innerHTML = renderStudentSolutionsModal(student, sampleChallenges);

        const closeBtn = document.getElementById("closeStudentSolutionsModalBtn");
        const modalEl = document.getElementById("studentSolutionsInspectModal");
        closeBtn?.addEventListener("click", () => {
          modalWrap.innerHTML = "";
        });
        modalEl?.addEventListener("click", (e) => {
          if (e.target === modalEl) modalWrap.innerHTML = "";
        });
      });
    });

    // 6. World selection in Levels tab
    container.querySelectorAll(".world-pill-btn[data-world-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._teacherActiveWorldId = btn.getAttribute("data-world-id");
        this.renderTeacherDashboard();
      });
    });

    // 7. World selector in Reorder tab
    const reorderWorldSelect = container.querySelector("#reorderWorldSelect");
    reorderWorldSelect?.addEventListener("change", (e) => {
      this._teacherActiveWorldId = e.target.value;
      this.renderTeacherDashboard();
    });

    // 8. Reordering Move Up & Down in Levels and Reorder tabs
    const handleMove = (worldId, challengeId, direction) => {
      const currentList = PythonAdventureService.getWorldChallenges(worldId);
      const idx = currentList.findIndex((c) => c.id === challengeId);
      if (idx === -1) return;

      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= currentList.length) return;

      const targetList = [...currentList];
      const temp = targetList[idx];
      targetList[idx] = targetList[newIdx];
      targetList[newIdx] = temp;

      const newOrderIds = targetList.map((c) => c.id);
      PythonAdventureService.reorderWorldLevels(worldId, newOrderIds);
      showToast("تم تحديث تسلسل المستويات بنجاح! 🚀", "success");
      this.renderTeacherDashboard();
    };

    container.querySelectorAll('[data-action="move-level-up"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        handleMove(btn.getAttribute("data-world-id"), btn.getAttribute("data-challenge-id"), "up");
      });
    });

    container.querySelectorAll('[data-action="move-level-down"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        handleMove(btn.getAttribute("data-world-id"), btn.getAttribute("data-challenge-id"), "down");
      });
    });

    container.querySelectorAll('[data-action="reorder-up"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        handleMove(this._teacherActiveWorldId, btn.getAttribute("data-challenge-id"), "up");
      });
    });

    container.querySelectorAll('[data-action="reorder-down"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        handleMove(this._teacherActiveWorldId, btn.getAttribute("data-challenge-id"), "down");
      });
    });

    // 9. Delete Level
    container.querySelectorAll('[data-action="delete-level"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const worldId = btn.getAttribute("data-world-id");
        const challengeId = btn.getAttribute("data-challenge-id");
        const title = btn.getAttribute("data-challenge-title") || "هذا المستوى";

        if (confirm(`هل أنت متأكد من حذف مستوى "${title}"؟`)) {
          PythonAdventureService.deleteCustomLevel(worldId, challengeId);
          showToast(`تم حذف مستوى "${title}" بنجاح.`, "info");
          this.renderTeacherDashboard();
        }
      });
    });

    // 10. Edit Level
    container.querySelectorAll('[data-action="edit-level"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const worldId = btn.getAttribute("data-world-id");
        this.openLevelManagerModal(worldId, "add");
      });
    });

    // 11. Save Sequence
    container.querySelector("#saveReorderedSequenceBtn")?.addEventListener("click", () => {
      showToast("تم اعتماد وحفظ ترتيب المستويات في قاعدة البيانات بنجاح! 🌟", "success");
    });

    // 12. Launch full sandbox
    container.querySelector("#launchFullStudentSandboxBtn")?.addEventListener("click", () => {
      const challenges = PythonAdventureService.getWorldChallenges(this._teacherActiveWorldId);
      if (challenges.length > 0) {
        this.showMissionModal(challenges[0], "story");
      } else {
        showToast("لا توجد تحديات في هذا العالم لتجربتها حالياً.", "warning");
      }
    });
  },

  /**
   * Renders the active view based on state.
   */
  renderCurrentView(state) {
    if (!containerElement) return;

    const { activeView, progress, student, selectedWorldId, activeChallenge } = state;

    // Guard against unnecessary full DOM wipes of the active challenge workspace
    if (activeView === "challenge" && currentRenderedView === "challenge" && currentRenderedChallengeId === state.activeChallengeId) {
      return;
    }

    currentRenderedView = activeView;
    currentRenderedChallengeId = activeView === "challenge" ? state.activeChallengeId : null;

    switch (activeView) {
      case "home":
        containerElement.innerHTML = renderAdventureHome({
          student,
          progress,
          onContinue: () => this.handleContinue(),
          onNavigate: (view) => this.navigateTo(view)
        });
        this.wireHomeEvents();
        break;

      case "world-map":
        containerElement.innerHTML = renderWorldMap({
          progress,
          selectedWorldId,
          activeTrack: state.activeTrack || "all"
        });
        this.wireWorldMapEvents();
        break;

      case "challenge":
        if (activeChallenge) {
          containerElement.innerHTML = renderChallengeView({
            challenge: activeChallenge,
            code: state.editorCode,
            output: state.terminalOutput,
            error: state.terminalError,
            hintsRevealed: state.hintsRevealed,
            attempts: state.attemptsCount,
            isRunning: state.isRunning,
            isSubmitting: state.isSubmitting,
            solutionRevealed: state.solutionRevealed
          });
          this.wireChallengeEvents();
        } else {
          this.navigateTo("world-map");
        }
        break;

      case "skill-tree":
        containerElement.innerHTML = renderSkillTree({ progress });
        this.wireSkillTreeEvents();
        break;

      case "achievements":
        containerElement.innerHTML = renderAchievements({ progress });
        this.wireAchievementsEvents();
        break;

      case "daily":
        containerElement.innerHTML = renderDailyChallenge({
          daily: {
            title: "تحدي جمع الأعداد الزوجية 🔥",
            description: "اكتب برنامجاً يحسب مجموع الأعداد الزوجية من 1 إلى 20 واطبع الناتج (110).",
            requirements: ["استخدم for loop مع range", "اطبع الناتج النهائي فقط (110)"]
          },
          progress
        });
        this.wireDailyEvents();
        break;

      case "profile":
        containerElement.innerHTML = renderProfileStats({ student, progress });
        this.wireProfileEvents();
        break;

      default:
        this.navigateTo("home");
    }
  },

  navigateTo(view, extraState = {}) {
    adventureStore.setState({ activeView: view, ...extraState });
  },

  // ========================================================
  // HOME ACTIONS
  // ========================================================
  wireHomeEvents() {
    document.getElementById("adventureContinueBtn")?.addEventListener("click", () => {
      this.handleContinue();
    });

    document.getElementById("adventureStartMissionBtn")?.addEventListener("click", () => {
      this.handleContinue();
    });

    document.getElementById("adventureShowHintBtn")?.addEventListener("click", () => {
      showConfirmDialog({
        title: "تلميح لغز السلاسل النصية والدوال 💡",
        message: "استخدم دالة split() لتقسيم الجملة إلى كلمات، ثم قم بتعريف قاموس counts = {} وتحديث تكرار كل كلمة، أو استخدم Counter من مكتبة collections.",
        confirmText: "فهمت الفكرة، سأبرمجها الآن",
        cancelText: "إغلاق",
        variant: "primary"
      });
    });

    document.getElementById("advOpenFullLeaderboardBtn")?.addEventListener("click", () => {
      const lbBtn = document.querySelector('.sidebar-item[data-section="leaderboard"]');
      if (lbBtn) lbBtn.click();
    });

    document.getElementById("adventureQuickMapBtn")?.addEventListener("click", () => {
      this.openWorldMapTrack("all", "world-1");
    });

    document.getElementById("adventureQuickProblemsBtn")?.addEventListener("click", () => {
      this.openWorldMapTrack("problem-solving", "ps-level-1");
    });

    containerElement.querySelectorAll("[data-adv-action]").forEach((card) => {
      card.addEventListener("click", () => {
        const action = card.getAttribute("data-adv-action");
        if (action === "world-map") this.navigateTo("world-map");
        else if (action === "duels") {
          showConfirmDialog({
            title: "حلبة مبارزة الأكواد ⚔️",
            message: "ميزة التحدي المباشر بين الطلاب ستنطلق مع نهاية الأسبوع الجاري! استعد بمراجعة هياكل البيانات وحل التحديات الفردية.",
            confirmText: "رائع، أنا جاهز",
            cancelText: "إغلاق",
            variant: "primary"
          });
        } else if (action === "bank") {
          this.navigateTo("daily");
        } else if (action === "projects") {
          const taskBtn = document.querySelector('.sidebar-item[data-section="tasks"]');
          if (taskBtn) taskBtn.click();
        } else if (action === "badges") {
          this.navigateTo("achievements");
        }
      });
    });

    containerElement.querySelectorAll(".adventure-hub-card[data-nav]").forEach((card) => {
      card.addEventListener("click", () => {
        const nav = card.getAttribute("data-nav");
        if (nav) this.navigateTo(nav);
      });
    });
  },

  /**
   * Primary Action [ استكمال اللعب ]: Finds next unfinished challenge.
   */
  handleContinue() {
    const { progress } = adventureStore.getState();
    const unlocked = progress?.unlockedChallenges || ["world-1-level-1"];
    const completed = progress?.completedChallenges || {};

    // Find first unlocked challenge not yet completed
    let targetChallengeId = unlocked.find((id) => !completed[id]);
    if (!targetChallengeId) {
      targetChallengeId = unlocked[unlocked.length - 1] || "world-1-level-1";
    }

    this.startMissionFlow(targetChallengeId);
  },

  // ========================================================
  // WORLD MAP ACTIONS & PROBLEM SOLVING INTEGRATION
  // ========================================================
  openWorldMapTrack(track = "all", worldId = null) {
    const defaultWorld = track === "problem-solving" ? "ps-level-1" : "world-1";
    adventureStore.setState({
      activeView: "world-map",
      activeTrack: track,
      selectedWorldId: worldId || defaultWorld
    });
  },

  async openProblemSolvingChallenge(problemId) {
    try {
      const { ProblemSolvingController } = await import("../problem-solving/problem-solving.controller.js");
      ProblemSolvingController._container = containerElement;
      ProblemSolvingController._student = currentStudent;
      ProblemSolvingController._onBackToMap = async (worldId) => {
        try {
          const studentId = currentStudent?.uid || currentStudent?.id || currentStudent?.firestoreId;
          const freshProgress = await PythonAdventureService.getStudentProgress(studentId);
          adventureStore.setState({
            progress: freshProgress,
            activeView: "world-map",
            selectedWorldId: worldId || "ps-level-1",
            activeTrack: "problem-solving"
          });
        } catch (_) {
          adventureStore.setState({
            activeView: "world-map",
            selectedWorldId: worldId || "ps-level-1",
            activeTrack: "problem-solving"
          });
        }
      };

      await ProblemSolvingController.openProblemWorkspace(problemId);
    } catch (err) {
      console.error("Failed to open problem solving challenge:", err);
      alert(err.message || "تعذر فتح مساحة حل المشكلة البرمجية.");
    }
  },

  wireWorldMapEvents() {
    document.getElementById("mapBackToHomeBtn")?.addEventListener("click", () => {
      this.navigateTo("home");
    });

    // Track Switcher Pills (All / Concepts / Problem-Solving)
    containerElement.querySelectorAll(".map-track-pill[data-track]").forEach((pill) => {
      pill.addEventListener("click", () => {
        const track = pill.getAttribute("data-track");
        adventureStore.setState({ activeTrack: track });
      });
    });

    // World & Level Cards selection
    containerElement.querySelectorAll(".world-card[data-world-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const worldId = card.getAttribute("data-world-id");
        const { progress } = adventureStore.getState();
        const isUnlocked =
          worldId.startsWith("ps-level-") || (progress?.unlockedWorlds || ["world-1"]).includes(worldId);
        if (isUnlocked) {
          adventureStore.setState({ selectedWorldId: worldId });
          // Scroll levels section smoothly into view
          document.getElementById("worldLevelsSection")?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Concept Challenge Cards
    containerElement.querySelectorAll(".level-card[data-challenge-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const challengeId = card.getAttribute("data-challenge-id");
        const { progress } = adventureStore.getState();
        const isUnlocked = (progress?.unlockedChallenges || ["world-1-level-1"]).includes(challengeId);
        if (isUnlocked && challengeId) {
          this.startMissionFlow(challengeId);
        }
      });
    });

    // Problem Solving Coding Problem Cards
    containerElement.querySelectorAll(".ps-challenge-card[data-problem-id]").forEach((card) => {
      card.addEventListener("click", () => {
        const problemId = card.getAttribute("data-problem-id");
        if (problemId) {
          this.openProblemSolvingChallenge(problemId);
        }
      });
    });

    // Open Level Manager Modal (Teacher / Admin Level Ordering & Creation)
    document.getElementById("openLevelManagerModalBtn")?.addEventListener("click", () => {
      const { selectedWorldId } = adventureStore.getState();
      this.openLevelManagerModal(selectedWorldId || "world-1");
    });
  },

  // ========================================================
  // LEVEL MANAGER & ORDERING MODAL FLOWS
  // ========================================================
  openLevelManagerModal(worldId = "world-1", activeTab = "reorder") {
    let modalEl = document.getElementById(LEVEL_MANAGER_MODAL_ID);
    if (!modalEl) {
      document.body.insertAdjacentHTML("beforeend", renderLevelManagerModal());
      modalEl = document.getElementById(LEVEL_MANAGER_MODAL_ID);
      modalEl.querySelector("#closeLevelManagerModalBtn")?.addEventListener("click", () => {
        modalEl.classList.add("hidden");
      });
      // Click outside backdrop to close
      modalEl.addEventListener("click", (e) => {
        if (e.target === modalEl) {
          modalEl.classList.add("hidden");
        }
      });
    }

    modalEl.classList.remove("hidden");
    this.renderLevelManagerBody(worldId, activeTab);
  },

  renderLevelManagerBody(worldId = "world-1", activeTab = "reorder") {
    const bodyEl = document.getElementById("levelManagerModalBody");
    if (!bodyEl) return;
    bodyEl.innerHTML = renderLevelManagerContent({ selectedWorldId: worldId, activeTab });
    this.wireLevelManagerEvents(worldId, activeTab);
  },

  wireLevelManagerEvents(worldId, activeTab) {
    const modalEl = document.getElementById(LEVEL_MANAGER_MODAL_ID);
    if (!modalEl) return;

    // 1. World Selector Switch
    const worldSelect = modalEl.querySelector("#levelManagerWorldSelect");
    worldSelect?.addEventListener("change", (e) => {
      const newWorldId = e.target.value;
      this.renderLevelManagerBody(newWorldId, activeTab);
    });

    // 2. Tab Switches
    const tabReorderBtn = modalEl.querySelector("#tabBtnReorderLevels");
    const tabAddBtn = modalEl.querySelector("#tabBtnAddNewLevel");

    tabReorderBtn?.addEventListener("click", () => {
      this.renderLevelManagerBody(worldId, "reorder");
    });
    tabAddBtn?.addEventListener("click", () => {
      this.renderLevelManagerBody(worldId, "add");
    });

    // 3. Move Up / Down Buttons
    modalEl.querySelectorAll(".btn-move-level-up, .btn-move-level-down").forEach((btn) => {
      btn.addEventListener("click", () => {
        const challengeId = btn.getAttribute("data-challenge-id");
        const direction = btn.getAttribute("data-direction");
        const listItems = Array.from(modalEl.querySelectorAll("#levelsOrderList [data-order-challenge-id]"));
        const ids = listItems.map((item) => item.getAttribute("data-order-challenge-id"));
        const currentIndex = ids.indexOf(challengeId);
        if (currentIndex === -1) return;

        if (direction === "up" && currentIndex > 0) {
          const temp = ids[currentIndex];
          ids[currentIndex] = ids[currentIndex - 1];
          ids[currentIndex - 1] = temp;
        } else if (direction === "down" && currentIndex < ids.length - 1) {
          const temp = ids[currentIndex];
          ids[currentIndex] = ids[currentIndex + 1];
          ids[currentIndex + 1] = temp;
        }

        PythonAdventureService.reorderWorldLevels(worldId, ids);
        this.renderLevelManagerBody(worldId, "reorder");
        showToast("تم تحديث ترتيب المستويات. اضغط 'حفظ الترتيب الحالي' للتأكيد.", "info");

        // Sync with world map if visible
        const { activeView } = adventureStore.getState();
        if (activeView === "world-map") {
          adventureStore.setState({ selectedWorldId: worldId });
        }
      });
    });

    // 4. Save Levels Order Button
    modalEl.querySelector("#saveLevelsOrderBtn")?.addEventListener("click", () => {
      const listItems = Array.from(modalEl.querySelectorAll("#levelsOrderList [data-order-challenge-id]"));
      const ids = listItems.map((item) => item.getAttribute("data-order-challenge-id"));
      PythonAdventureService.reorderWorldLevels(worldId, ids);
      showToast("تم حفظ ترتيب مستويات العالم بنجاح! 💾", "success");

      const { activeView } = adventureStore.getState();
      if (activeView === "world-map") {
        adventureStore.setState({ selectedWorldId: worldId });
      }
    });

    // 5. Delete Custom Level
    modalEl.querySelectorAll(".btn-delete-custom-level").forEach((btn) => {
      btn.addEventListener("click", () => {
        const challengeId = btn.getAttribute("data-challenge-id");
        const wId = btn.getAttribute("data-world-id") || worldId;
        if (confirm("هل أنت متأكد من حذف هذا المستوى المخصص نهائياً؟")) {
          PythonAdventureService.deleteCustomLevel(wId, challengeId);
          showToast("تم حذف المستوى بنجاح.", "info");
          this.renderLevelManagerBody(wId, "reorder");

          const { activeView } = adventureStore.getState();
          if (activeView === "world-map") {
            adventureStore.setState({ selectedWorldId: wId });
          }
        }
      });
    });

    // 6. Add New Level Form
    const addForm = modalEl.querySelector("#addNewLevelForm");
    addForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const title = modalEl.querySelector("#newLevelTitle")?.value?.trim();
        const subtitle = modalEl.querySelector("#newLevelSubtitle")?.value?.trim() || "";
        const difficulty = modalEl.querySelector("#newLevelDifficulty")?.value || "medium";
        const type = modalEl.querySelector("#newLevelType")?.value || "write_code";
        const baseXp = parseInt(modalEl.querySelector("#newLevelXp")?.value, 10) || 75;
        const starterCode = modalEl.querySelector("#newLevelStarterCode")?.value || "";
        const requirementsText = modalEl.querySelector("#newLevelRequirements")?.value || "";
        const expectedOutput = modalEl.querySelector("#newLevelExpectedOutput")?.value?.trim() || "";
        const hintsText = modalEl.querySelector("#newLevelHints")?.value || "";

        if (!title) {
          showToast("يرجى إدخال عنوان المستوى.", "error");
          return;
        }

        const requirements = requirementsText
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);

        const hints = hintsText
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);

        const newChallenge = PythonAdventureService.addCustomLevel({
          worldId,
          title,
          subtitle,
          difficulty,
          type,
          baseXp,
          starterCode,
          requirements,
          expectedOutput,
          hints
        });

        showToast(`تمت إضافة المستوى "${newChallenge.title}" بنجاح! 🚀`, "success");
        this.renderLevelManagerBody(worldId, "reorder");

        const { activeView } = adventureStore.getState();
        if (activeView === "world-map") {
          adventureStore.setState({ selectedWorldId: worldId });
        }
      } catch (err) {
        console.error("Error creating level:", err);
        showToast(err.message || "تعذر إضافة المستوى.", "error");
      }
    });
  },

  // ========================================================
  // MISSION INTRO & MICRO LESSON FLOW
  // ========================================================
  async startMissionFlow(challengeId) {
    try {
      const challenge = await PythonAdventureService.getChallenge(challengeId);
      if (!challenge) return;

      // Show Mission Intro Modal (Step 1: Story)
      this.showMissionModal(challenge, "story");

    } catch (err) {
      console.error("Failed to load challenge:", err);
      alert(err.message || "تعذر فتح المهمة.");
    }
  },

  showMissionModal(challenge, step = "story") {
    // Remove existing modal if any
    document.getElementById("adventureMissionModal")?.remove();

    document.body.insertAdjacentHTML("beforeend", renderMissionModal(challenge, step));

    document.getElementById("closeMissionModalBtn")?.addEventListener("click", () => {
      document.getElementById("adventureMissionModal")?.remove();
    });

    document.getElementById("missionStoryNextBtn")?.addEventListener("click", () => {
      this.showMissionModal(challenge, "micro");
    });

    document.getElementById("missionMicroDoneBtn")?.addEventListener("click", () => {
      document.getElementById("adventureMissionModal")?.remove();
      this.openChallengeWorkspace(challenge);
    });
  },

  openChallengeWorkspace(challenge) {
    adventureStore.resetEditor(challenge.starterCode || "");
    adventureStore.setState({
      activeChallengeId: challenge.id,
      activeChallenge: challenge,
      activeView: "challenge"
    });
  },

  // ========================================================
  // CHALLENGE WORKSPACE & PYTHON EXECUTION
  // ========================================================
  wireChallengeEvents() {
    const textareaEl = document.getElementById("pyCodeTextarea");
    const lineNumbersEl = document.getElementById("pyLineNumbers");

    wireCodeEditorEvents({
      textareaEl,
      lineNumbersEl,
      onChange: (code) => {
        adventureStore.setState({ editorCode: code }, { notify: false });
      },
      onRunShortcut: () => {
        this.runCurrentCode();
      }
    });

    document.getElementById("challengeBackBtn")?.addEventListener("click", () => {
      this.navigateTo("world-map");
    });

    document.getElementById("challengeLessonBtn")?.addEventListener("click", () => {
      const { activeChallenge } = adventureStore.getState();
      if (activeChallenge) {
        this.showMissionModal(activeChallenge, "micro");
      }
    });

    document.getElementById("pyCopyCodeBtn")?.addEventListener("click", async () => {
      const currentCode = textareaEl ? textareaEl.value : adventureStore.getState().editorCode;
      if (navigator.clipboard && currentCode) {
        await navigator.clipboard.writeText(currentCode);
        const btn = document.getElementById("pyCopyCodeBtn");
        if (btn) btn.innerHTML = "<span>✓ تم النسخ</span>";
        setTimeout(() => {
          if (btn) btn.innerHTML = "<span>📋 نسخ</span>";
        }, 1500);
      }
    });

    document.getElementById("pyResetCodeBtn")?.addEventListener("click", () => {
      const { activeChallenge } = adventureStore.getState();
      if (activeChallenge && confirm("هل تريد استعادة الكود الأصلي للقالب؟")) {
        const starter = activeChallenge.starterCode || "";
        adventureStore.setState({ editorCode: starter }, { notify: false });
        if (textareaEl) {
          textareaEl.value = starter;
          if (lineNumbersEl) {
            const lines = Math.max(1, starter.split("\n").length);
            lineNumbersEl.innerHTML = Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join("");
          }
        }
        const terminalEl = document.getElementById("pyTerminalOutput");
        if (terminalEl) {
          terminalEl.innerHTML = `<div class="terminal-placeholder text-muted"># اضغط "تشغيل الكود" لمعاينة المخرجات هنا...</div>`;
        }
      }
    });

    document.getElementById("pyClearTerminalBtn")?.addEventListener("click", () => {
      adventureStore.setState({ terminalOutput: "", terminalError: null }, { notify: false });
      const terminalEl = document.getElementById("pyTerminalOutput");
      if (terminalEl) {
        terminalEl.innerHTML = `<div class="terminal-placeholder text-muted"># اضغط "تشغيل الكود" لمعاينة المخرجات هنا...</div>`;
      }
    });

    document.getElementById("pyRunBtn")?.addEventListener("click", () => {
      this.runCurrentCode();
    });

    document.getElementById("pySubmitBtn")?.addEventListener("click", () => {
      this.submitCurrentSolution();
    });

    document.getElementById("revealNextHintBtn")?.addEventListener("click", () => {
      this.revealNextHint();
    });

    document.getElementById("revealSolutionPromptBtn")?.addEventListener("click", () => {
      this.promptRevealSolution();
    });
  },

  /**
   * Safe in-browser execution with real-time output (butter-smooth, no page re-renders).
   */
  async runCurrentCode() {
    const state = adventureStore.getState();
    if (state.isRunning || state.isSubmitting) return;

    const textareaEl = document.getElementById("pyCodeTextarea");
    const code = textareaEl ? textareaEl.value : state.editorCode;

    adventureStore.setState({ isRunning: true, terminalError: null }, { notify: false });
    const runBtn = document.getElementById("pyRunBtn");
    if (runBtn) {
      runBtn.disabled = true;
      runBtn.innerHTML = "<span>⏳ جاري التشغيل...</span>";
    }

    const terminalEl = document.getElementById("pyTerminalOutput");
    if (terminalEl) {
      terminalEl.innerHTML = `<div class="terminal-running text-muted">⏳ جاري تشغيل الكود في بايثون...</div>`;
    }

    try {
      const result = await runPythonCode(code, {
        onOutput: (stream) => {
          if (terminalEl) {
            terminalEl.innerHTML = `<div class="terminal-stdout">${escapeHtml(stream)}</div>`;
          }
        }
      });

      if (terminalEl) {
        if (result.error) {
          terminalEl.innerHTML = `
            ${result.output ? `<div class="terminal-stdout">${escapeHtml(result.output)}</div>` : ""}
            <div class="terminal-error">${escapeHtml(result.error)}</div>
          `;
        } else if (result.output) {
          terminalEl.innerHTML = `<div class="terminal-stdout">${escapeHtml(result.output)}</div>`;
        } else {
          terminalEl.innerHTML = `<div class="terminal-placeholder text-muted"># تم تنفيذ الكود بنجاح (لا توجد مخرجات للطباعة).</div>`;
        }
      }

      adventureStore.setState({
        editorCode: code,
        terminalOutput: result.output,
        terminalError: result.error,
        isRunning: false
      }, { notify: false });

    } catch (err) {
      if (terminalEl) {
        terminalEl.innerHTML = `<div class="terminal-error">${escapeHtml(err.message || "حدث خطأ غير متوقع أثناء التشغيل")}</div>`;
      }
      adventureStore.setState({
        editorCode: code,
        terminalError: err.message,
        isRunning: false
      }, { notify: false });
    } finally {
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.innerHTML = "<span>▶ تشغيل الكود</span>";
      }
    }
  },

  /**
   * Submits solution for authoritative verification and reward calculation.
   */
  async submitCurrentSolution() {
    const state = adventureStore.getState();
    if (state.isSubmitting || !state.activeChallenge) return;

    const textareaEl = document.getElementById("pyCodeTextarea");
    const code = textareaEl ? textareaEl.value : state.editorCode;

    adventureStore.setState({ isSubmitting: true }, { notify: false });
    const submitBtn = document.getElementById("pySubmitBtn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>⏳ جاري التحقق...</span>";
    }

    const terminalEl = document.getElementById("pyTerminalOutput");

    try {
      // 1. Run local syntax & runtime check first
      const runCheck = await runPythonCode(code);
      if (runCheck.error) {
        if (terminalEl) {
          terminalEl.innerHTML = `
            ${runCheck.output ? `<div class="terminal-stdout">${escapeHtml(runCheck.output)}</div>` : ""}
            <div class="terminal-error">${escapeHtml(runCheck.error)}</div>
          `;
        }
        adventureStore.setState({
          editorCode: code,
          terminalError: runCheck.error,
          terminalOutput: runCheck.output,
          isSubmitting: false,
          attemptsCount: state.attemptsCount + 1
        }, { notify: false });

        this.showResultModal({
          passed: false,
          feedback: "الكود يحتوي على أخطاء برمجية تمنع تنفيذه.",
          errorDetails: runCheck.error
        });
        return;
      }

      // 2. Submit to Authoritative Service
      const result = await PythonAdventureService.submitChallenge({
        challengeId: state.activeChallenge.id,
        code,
        hintsUsed: state.hintsRevealed,
        attempts: state.attemptsCount,
        currentProgress: state.progress
      });

      adventureStore.setState({ isSubmitting: false }, { notify: false });

      if (result.passed) {
        // Update local state progress
        const studentId = currentStudent?.uid || currentStudent?.id || currentStudent?.firestoreId;
        const updatedProgress = await PythonAdventureService.getStudentProgress(studentId);
        adventureStore.setState({ progress: updatedProgress }, { notify: false });

        this.showResultModal({
          passed: true,
          earnedXp: result.earnedXp,
          stars: result.stars,
          levelUp: result.levelUp,
          newLevel: result.newLevel,
          feedback: result.feedback,
          skillsGained: result.skillsGained,
          newlyUnlockedAchievements: result.newlyUnlockedAchievements,
          hasNextChallenge: !!result.unlockedNextChallengeId,
          nextChallengeId: result.unlockedNextChallengeId
        });

      } else {
        if (terminalEl && result.testResults?.stdout) {
          terminalEl.innerHTML = `<div class="terminal-stdout">${escapeHtml(result.testResults.stdout)}</div>`;
        }
        adventureStore.setState({
          attemptsCount: state.attemptsCount + 1,
          terminalOutput: result.testResults?.stdout || state.terminalOutput
        }, { notify: false });

        this.showResultModal({
          passed: false,
          feedback: result.feedback,
          errorDetails: result.errorDetails
        });
      }

    } catch (err) {
      console.error("Submission failed:", err);
      adventureStore.setState({ isSubmitting: false }, { notify: false });
      alert("حدث خطأ أثناء إرسال الحل. حاول مرة أخرى.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "<span>🚀 تسليم الحل والتحقق</span>";
      }
    }
  },

  showResultModal(params) {
    document.getElementById("adventureResultModal")?.remove();
    document.body.insertAdjacentHTML("beforeend", renderResultModal(params));

    document.getElementById("resultTryAgainBtn")?.addEventListener("click", () => {
      document.getElementById("adventureResultModal")?.remove();
    });

    document.getElementById("resultGetHintBtn")?.addEventListener("click", () => {
      document.getElementById("adventureResultModal")?.remove();
      this.revealNextHint();
    });

    document.getElementById("resultNextMissionBtn")?.addEventListener("click", () => {
      document.getElementById("adventureResultModal")?.remove();
      if (params.nextChallengeId) {
        this.startMissionFlow(params.nextChallengeId);
      } else {
        this.navigateTo("world-map");
      }
    });

    document.getElementById("resultReturnMapBtn")?.addEventListener("click", () => {
      document.getElementById("adventureResultModal")?.remove();
      this.navigateTo("world-map");
    });

    document.getElementById("resultReturnMapBtnSecondary")?.addEventListener("click", () => {
      document.getElementById("adventureResultModal")?.remove();
      this.navigateTo("world-map");
    });
  },

  updateHintsCardInChallengeView() {
    const cardEl = document.getElementById("hintsSystemCard");
    if (!cardEl) return;
    const state = adventureStore.getState();
    cardEl.innerHTML = renderHintsCardContent({
      challenge: state.activeChallenge,
      hintsRevealed: state.hintsRevealed,
      attempts: state.attemptsCount,
      solutionRevealed: state.solutionRevealed
    });
    document.getElementById("revealNextHintBtn")?.addEventListener("click", () => {
      this.revealNextHint();
    });
    document.getElementById("revealSolutionPromptBtn")?.addEventListener("click", () => {
      this.promptRevealSolution();
    });
  },

  revealNextHint() {
    const { activeChallenge, hintsRevealed } = adventureStore.getState();
    const hints = activeChallenge?.hints || [];
    if (hintsRevealed < hints.length) {
      adventureStore.setState({ hintsRevealed: hintsRevealed + 1 }, { notify: false });
      this.updateHintsCardInChallengeView();
    }
  },

  promptRevealSolution() {
    const confirmed = confirm("⚠️ تنبيه:\nعرض الحل النموذجي سيقلل المكافأة إلى 20% XP ونجمة واحدة لهذه المهمة.\n\nهل أنت متأكد من رغبتك في عرض الحل؟");
    if (confirmed) {
      adventureStore.setState({ solutionRevealed: true, hintsRevealed: 4 }, { notify: false });
      this.updateHintsCardInChallengeView();
    }
  },

  // ========================================================
  // SECONDARY VIEWS NAVIGATION
  // ========================================================
  wireSkillTreeEvents() {
    document.getElementById("skillTreeBackBtn")?.addEventListener("click", () => {
      this.navigateTo("home");
    });
  },

  wireAchievementsEvents() {
    document.getElementById("achievementsBackBtn")?.addEventListener("click", () => {
      this.navigateTo("home");
    });
  },

  wireDailyEvents() {
    document.getElementById("dailyBackBtn")?.addEventListener("click", () => {
      this.navigateTo("home");
    });

    document.getElementById("startDailyChallengeBtn")?.addEventListener("click", () => {
      // Launch daily challenge challenge
      const dailyChallengeObj = {
        id: "daily-loop-sum",
        worldTitle: "التحدي اليومي",
        levelNumber: 1,
        title: "تحدي جمع الأعداد الزوجية 🔥",
        subtitle: "تحدي الـ 24 ساعة",
        difficulty: "medium",
        type: "write_code",
        baseXp: 100,
        story: "اكتب برنامجاً بلغة بايثون يحسب مجموع الأعداد الزوجية من 1 إلى 20 واطبع الناتج النهائي فقط (الناتج هو 110).",
        microLesson: {
          concept: "جمع الأعداد الزوجية",
          summary: "يمكنك استخدام for i in range(2, 21, 2) للمرور على الأعداد الزوجية فقط، وجمعها في متغير total."
        },
        starterCode: "total = 0\n# احسب واطبع مجموع الأعداد الزوجية من 1 إلى 20\n",
        requirements: ["استخدم for loop", "اطبع الناتج النهائي فقط (110)"],
        hints: ["for i in range(2, 21, 2): total += i", "print(total)"]
      };
      this.showMissionModal(dailyChallengeObj, "story");
    });
  },

  wireProfileEvents() {
    document.getElementById("profileBackBtn")?.addEventListener("click", () => {
      this.navigateTo("home");
    });
  }
};

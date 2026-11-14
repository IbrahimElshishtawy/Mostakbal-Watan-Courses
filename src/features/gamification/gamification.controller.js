// src/features/gamification/gamification.controller.js
import { GamificationService } from "./gamification.service.js";
import { renderDailyChallengeView } from "./components/daily-challenge.component.js";
import { renderRewardStoreView } from "./components/reward-store.component.js";
import { renderStudentInventoryView } from "./components/student-inventory.component.js";
import { renderStudentProgressView } from "./components/student-progress.component.js";
import { renderHowToPlayModal } from "./components/how-to-play-modal.component.js";
import { renderTeacherCodeAnalyticsView } from "./components/teacher-code-analytics.component.js";
import { renderAdminGamificationCenterView } from "./components/admin-gamification-center.component.js";
import { showToast } from "../../shared/utils/dom.utils.js";

export const GamificationController = {
  _studentContainer: null,
  _teacherContainer: null,
  _adminContainer: null,

  _state: {
    student: null,
    activeSubTab: "challenge", // 'challenge' | 'progress' | 'store' | 'inventory'
    activeQuestionIndex: 0,
    selectedOption: null,
    submittedResult: null,
    isSubmitting: false,
    challenge: null,
    profile: null,
    catalog: [],
    inventory: [],
    storeCategory: "all",
    isPurchasing: false,
    isEquipping: false,

    // Teacher & Admin state
    teacherActiveSubTab: "overview",
    overview: null,
    selectedStudent: null,
    codeHistory: null,
    dailyReport: null,
    weeklyReport: null,
    activeSeason: null,
    resetPreview: null,
    adminActiveTab: "seasons"
  },

  /**
   * Initializes the Student Gamification Experience.
   */
  async initStudent(container, student) {
    if (!container) return;
    this._studentContainer = container;
    this._state.student = student;

    container.innerHTML = `
      <div class="gam-page-container">
        <!-- Top Navigation Subtabs & How-To-Play Button -->
        <div class="d-flex items-center justify-between flex-wrap gap-2 mb-4">
          <div class="gam-tabs-nav" style="margin-bottom: 0;">
            <button type="button" class="gam-tab-btn active" data-subtab="challenge">
              <span>🎯</span>
              <span>تحدي الـ 24 ساعة (6 أسئلة)</span>
            </button>
            <button type="button" class="gam-tab-btn" data-subtab="progress">
              <span>📈</span>
              <span>المستوى والأوسمة (XP)</span>
            </button>
            <button type="button" class="gam-tab-btn" data-subtab="store">
              <span>🛍️</span>
              <span>متجر المكافآت (Coins)</span>
            </button>
            <button type="button" class="gam-tab-btn" data-subtab="inventory">
              <span>🎒</span>
              <span>حقيبة المقتنيات</span>
            </button>
          </div>

          <button type="button" class="btn btn-secondary text-xs px-3 py-1.5 font-bold" id="gamOpenHowToPlayBtn">
            <span>❓ كيف ألعب وأكسب؟</span>
          </button>
        </div>

        <div id="gamMainContentSlot">
          <div class="p-12 text-center text-slate-400">
            <span class="spinner mb-2 d-inline-block"></span>
            <p class="text-xs">جاري تجهيز التحديات ونقاط الـ XP...</p>
          </div>
        </div>
      </div>
    `;

    // Ensure How-to-play modal is mounted
    if (!document.getElementById("howToPlayModalBackdrop")) {
      document.body.insertAdjacentHTML("beforeend", renderHowToPlayModal());
    }

    this._wireStaticEvents();

    try {
      // Parallel loading of student gamification data
      const [profile, challenge, catalog, inventory] = await Promise.all([
        GamificationService.getStudentGamificationProfile(student?.id || student?.firestoreId),
        GamificationService.getDailyChallenge(),
        GamificationService.getStoreCatalog(),
        GamificationService.getStudentInventory(student?.id || student?.firestoreId)
      ]);

      this._state.profile = profile || {};
      this._state.challenge = challenge;
      this._state.catalog = catalog || [];
      this._state.inventory = inventory || [];

      this.renderStudentView();
    } catch (err) {
      console.warn("Gamification student load error:", err);
      this.renderStudentView();
    }
  },

  /**
   * Renders the active sub-tab view inside student portal.
   */
  renderStudentView() {
    const slot = document.getElementById("gamMainContentSlot");
    if (!slot) return;

    const { activeSubTab, challenge, activeQuestionIndex, selectedOption, submittedResult, isSubmitting, profile, catalog, inventory, storeCategory, isPurchasing, isEquipping } = this._state;

    // Update tab button highlights
    document.querySelectorAll(".gam-tab-btn[data-subtab]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-subtab") === activeSubTab);
    });

    if (activeSubTab === "challenge") {
      slot.innerHTML = renderDailyChallengeView({
        challenge,
        activeQuestionIndex,
        selectedOption,
        submittedResult,
        isSubmitting
      });
      this._wireDailyChallengeEvents();
    } else if (activeSubTab === "progress") {
      slot.innerHTML = renderStudentProgressView({
        profile,
        unlockedBadges: profile?.badges || ["first_step"]
      });
    } else if (activeSubTab === "store") {
      slot.innerHTML = renderRewardStoreView({
        catalog,
        inventory,
        currentCoins: Number(profile?.coins || 0),
        activeCategory: storeCategory,
        isPurchasing
      });
      this._wireStoreEvents();
    } else if (activeSubTab === "inventory") {
      slot.innerHTML = renderStudentInventoryView({
        inventory,
        catalog,
        equippedItems: profile?.equippedItems || {},
        isEquipping
      });
      this._wireInventoryEvents();
    }
  },

  _wireStaticEvents() {
    // Sub-tab switching
    document.querySelectorAll(".gam-tab-btn[data-subtab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this._state.activeSubTab = btn.getAttribute("data-subtab");
        this.renderStudentView();
      });
    });

    // How to Play Modal
    document.getElementById("gamOpenHowToPlayBtn")?.addEventListener("click", () => {
      const modal = document.getElementById("howToPlayModalBackdrop");
      if (modal) modal.style.display = "flex";
    });

    document.getElementById("closeHowToPlayModalBtn")?.addEventListener("click", () => {
      const modal = document.getElementById("howToPlayModalBackdrop");
      if (modal) modal.style.display = "none";
    });

    document.getElementById("confirmHowToPlayBtn")?.addEventListener("click", () => {
      const modal = document.getElementById("howToPlayModalBackdrop");
      if (modal) modal.style.display = "none";
    });
  },

  _wireDailyChallengeEvents() {
    const { challenge, activeQuestionIndex } = this._state;
    if (!challenge) return;

    // Step dots navigation
    document.querySelectorAll(".gam-step-dot[data-q-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-q-idx"));
        this._state.activeQuestionIndex = idx;
        this._state.selectedOption = null;
        this._state.submittedResult = null;
        this.renderStudentView();
      });
    });

    // Option selection
    document.querySelectorAll(".gam-option-btn[data-option-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        const optIdx = Number(btn.getAttribute("data-option-idx"));
        this._state.selectedOption = optIdx;
        this.renderStudentView();
      });
    });

    // Prev / Next Question buttons
    document.getElementById("gamPrevQBtn")?.addEventListener("click", () => {
      if (activeQuestionIndex > 0) {
        this._state.activeQuestionIndex--;
        this._state.selectedOption = null;
        this._state.submittedResult = null;
        this.renderStudentView();
      }
    });

    document.getElementById("gamNextQBtn")?.addEventListener("click", () => {
      if (activeQuestionIndex < challenge.questions.length - 1) {
        this._state.activeQuestionIndex++;
        this._state.selectedOption = null;
        this._state.submittedResult = null;
        this.renderStudentView();
      }
    });

    // Submit Answer
    document.getElementById("gamSubmitAnswerBtn")?.addEventListener("click", async () => {
      if (this._state.selectedOption === null || this._state.isSubmitting) return;

      const currentQ = challenge.questions[activeQuestionIndex];
      this._state.isSubmitting = true;
      this.renderStudentView();

      try {
        const result = await GamificationService.submitDailyAnswer(
          challenge.challengeId,
          currentQ.id,
          this._state.selectedOption
        );

        this._state.submittedResult = result;
        if (!challenge.answers) challenge.answers = {};
        challenge.answers[currentQ.id] = {
          selectedOption: this._state.selectedOption,
          isCorrect: result.isCorrect,
          xpEarned: result.xpEarned
        };

        if (result.isCorrect) {
          showToast(`أحسنت! إجابة صحيحة وحصلت على +${result.xpEarned} XP 🎯`, "success");
        } else {
          showToast("إجابة غير صحيحة، راجع التفسير البرمجي جيداً 💡", "info");
        }

        if (result.bonusXp > 0) {
          showToast("🎉 مبارك! أتممت جميع أسئلة التحدي اليومي وحصلت على بونص +10 XP!", "success");
        }

        // Refresh profile in background
        GamificationService.getStudentGamificationProfile(this._state.student?.id).then(p => {
          if (p) this._state.profile = p;
        });

      } catch (err) {
        showToast(err.message || "حدث خطأ أثناء اعتماد الإجابة.", "error");
      } finally {
        this._state.isSubmitting = false;
        this.renderStudentView();
      }
    });
  },

  _wireStoreEvents() {
    // Store category filter
    document.querySelectorAll(".gam-tab-btn[data-store-cat]").forEach(btn => {
      btn.addEventListener("click", () => {
        this._state.storeCategory = btn.getAttribute("data-store-cat");
        this.renderStudentView();
      });
    });

    // Buy item buttons
    document.querySelectorAll("[data-buy-reward-id]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const rewardId = btn.getAttribute("data-buy-reward-id");
        const price = Number(btn.getAttribute("data-buy-price"));
        const name = btn.getAttribute("data-buy-name");

        if (confirm(`هل أنت متأكد من رغبتك في شراء "${name}" مقابل ${price} عملة ذهبية؟ 🪙`)) {
          this._state.isPurchasing = true;
          this.renderStudentView();

          try {
            const purchaseRes = await GamificationService.purchaseReward(rewardId);
            showToast(purchaseRes.message || "تمت عملية الشراء بنجاح! 🛍️", "success");

            // Update local state
            if (this._state.profile) {
              this._state.profile.coins = purchaseRes.balanceAfter;
            }
            this._state.inventory.push({
              rewardId,
              purchasedAt: new Date().toISOString(),
              pricePaid: price,
              isEquipped: false
            });
          } catch (e) {
            showToast(e.message || "تعذر إتمام عملية الشراء.", "error");
          } finally {
            this._state.isPurchasing = false;
            this.renderStudentView();
          }
        }
      });
    });
  },

  _wireInventoryEvents() {
    document.getElementById("gamGoToStoreBtn")?.addEventListener("click", () => {
      this._state.activeSubTab = "store";
      this.renderStudentView();
    });

    // Equip item buttons
    document.querySelectorAll("[data-equip-reward-id]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const rewardId = btn.getAttribute("data-equip-reward-id");
        const category = btn.getAttribute("data-equip-category");

        this._state.isEquipping = true;
        this.renderStudentView();

        try {
          const equipRes = await GamificationService.equipReward(rewardId, category);
          showToast(equipRes.message || "تم تفعيل العنصر بنجاح! ✨", "success");

          if (!this._state.profile) this._state.profile = {};
          if (!this._state.profile.equippedItems) this._state.profile.equippedItems = {};
          const mapKey = category === "avatar" ? "avatarId" : category === "frame" ? "frameId" : category === "title" ? "titleId" : "nameEffectId";
          this._state.profile.equippedItems[mapKey] = rewardId;
        } catch (e) {
          showToast(e.message || "تعذر تفعيل العنصر.", "error");
        } finally {
          this._state.isEquipping = false;
          this.renderStudentView();
        }
      });
    });
  },

  /**
   * Initializes Teacher Analytics Dashboard.
   */
  async initTeacher(container, teacher) {
    if (!container) return;
    this._teacherContainer = container;

    container.innerHTML = `
      <div class="gam-page-container">
        <div class="p-12 text-center text-slate-400">
          <span class="spinner mb-2 d-inline-block"></span>
          <p class="text-xs">جاري تحميل تقارير الأكواد وإحصائيات الطلاب البرمجية...</p>
        </div>
      </div>
    `;

    try {
      const [overview, dailyReport, weeklyReport] = await Promise.all([
        GamificationService.getStudentsOverview().catch(() => null),
        GamificationService.getDailyReports().catch(() => null),
        GamificationService.getWeeklyReports().catch(() => null)
      ]);

      this._state.overview = overview;
      this._state.dailyReport = dailyReport;
      this._state.weeklyReport = weeklyReport;

      this.renderTeacherView();
    } catch (e) {
      console.warn("Teacher gamification init warning:", e);
      this.renderTeacherView();
    }
  },

  renderTeacherView() {
    if (!this._teacherContainer) return;
    this._teacherContainer.innerHTML = `
      <div class="gam-page-container">
        ${renderTeacherCodeAnalyticsView(this._state)}
      </div>
    `;

    // Wire sub-tab switching
    this._teacherContainer.querySelectorAll("[data-teacher-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this._state.activeSubTab = btn.getAttribute("data-teacher-tab");
        this.renderTeacherView();
      });
    });
  },

  /**
   * Initializes Administrative Gamification Center.
   */
  async initAdmin(container, admin) {
    if (!container) return;
    this._adminContainer = container;

    try {
      const activeSeason = await GamificationService.getActiveSeason().catch(() => null);
      this._state.activeSeason = activeSeason;
      this.renderAdminView();
    } catch (e) {
      this.renderAdminView();
    }
  },

  renderAdminView() {
    if (!this._adminContainer) return;
    this._adminContainer.innerHTML = `
      <div class="gam-page-container">
        ${renderAdminGamificationCenterView(this._state)}
      </div>
    `;

    // Tab switching
    this._adminContainer.querySelectorAll("[data-admin-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this._state.adminActiveTab = btn.getAttribute("data-admin-tab");
        this.renderAdminView();
      });
    });

    // Dry Run Preview Button
    document.getElementById("gamDryRunPreviewBtn")?.addEventListener("click", async () => {
      const targetSeason = this._state.activeSeason?.seasonId || "season_2026_01";
      showToast("جاري إعداد المعاينة التجريبية الآمنة للموسم... 🔍", "info");

      try {
        const preview = await GamificationService.getSeasonResetPreview(targetSeason);
        this._state.resetPreview = preview;
        this.renderAdminView();
      } catch (e) {
        showToast(e.message || "تعذر توليد المعاينة التجريبية.", "error");
      }
    });

    // Execute Reset Button
    document.getElementById("gamExecuteResetBtn")?.addEventListener("click", async () => {
      const confirmKey = document.getElementById("gamAdminConfirmKeyInput")?.value?.trim();
      const nextSeasonId = document.getElementById("gamNextSeasonIdInput")?.value?.trim() || "season_2027_01";
      const targetSeason = this._state.activeSeason?.seasonId || "season_2026_01";

      if (confirmKey !== "CONFIRM_SEASON_RESET_2026") {
        showToast("رمز تأكيد إعادة التعيين غير صحيح! يرجى كتابة الرمز المطلوب بدقة.", "error");
        return;
      }

      if (confirm("تحذير إداري أخير: هل أنت متأكد من رغبتك في أرشفة بيانات الموسم الحالي وبدء موسم جديد؟ لن يتم مسح أي بيانات أكاديمية أو حسابات.")) {
        try {
          const res = await GamificationService.executeSeasonReset(targetSeason, nextSeasonId, confirmKey);
          showToast(`تمت أرشفة الموسم بنجاح لـ ${res.studentsReset} طالب وبدء الموسم الجديد! 🚀`, "success");
          this._state.resetPreview = null;
          this.initAdmin(this._adminContainer);
        } catch (e) {
          showToast(e.message || "فشلت عملية إعادة التعيين.", "error");
        }
      }
    });
  }
};

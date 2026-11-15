// src/features/gamification/gamification.controller.js
import { GamificationService } from "./gamification.service.js";
import { renderDailyChallengeView } from "./components/daily-challenge.component.js";
import { renderRewardStoreView } from "./components/reward-store.component.js";
import { renderStudentInventoryView } from "./components/student-inventory.component.js";
import { renderStudentProgressView } from "./components/student-progress.component.js";
import { renderPointsExchangeView, EXCHANGE_PACKAGES } from "./components/points-exchange.component.js";
import { renderHowToPlayModal } from "./components/how-to-play-modal.component.js";
import { renderTeacherCodeAnalyticsView } from "./components/teacher-code-analytics.component.js";
import { renderAdminGamificationCenterView } from "./components/admin-gamification-center.component.js";
import { showToast } from "../../shared/utils/dom.utils.js";
import { showConfirmDialog } from "../../shared/components/ConfirmDialog/confirm-dialog.component.js";

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
    selectedStudentUid: null,
    codeHistory: null,
    dailyReport: null,
    weeklyReport: null,
    searchQuery: "",
    groupFilter: "ALL",
    levelFilter: "ALL",
    currentPage: 1,
    pageSize: 25,
    isLoading: false,
    activeSeason: null,
    resetPreview: null,
    adminActiveTab: "seasons"
  },

  /**
   * Initializes the Student Gamification Experience.
   */
  async initStudent(containerInput, student) {
    const container = typeof containerInput === "string" ? document.getElementById(containerInput) : containerInput;
    if (!container) {
      console.warn("[GamificationController] Container element not found:", containerInput);
      return;
    }
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
            <button type="button" class="gam-tab-btn" data-subtab="exchange">
              <span>🔄</span>
              <span>صرافة النقاط (تبديل بكوينز)</span>
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
      const studentUid = student?.id || student?.firestoreId || student?.uid || student?.phone;
      // Parallel loading of student gamification data with safe fallbacks
      const [profile, challenge, catalog, inventory] = await Promise.all([
        GamificationService.getStudentGamificationProfile(studentUid).catch((e) => {
          console.warn("Profile fetch error:", e);
          return null;
        }),
        GamificationService.getDailyChallenge().catch((e) => {
          console.warn("Daily challenge fetch error:", e);
          return null;
        }),
        GamificationService.getStoreCatalog().catch((e) => {
          console.warn("Store catalog error:", e);
          return [];
        }),
        GamificationService.getStudentInventory(studentUid).catch((e) => {
          console.warn("Inventory fetch error:", e);
          return [];
        })
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
    const slot = this._studentContainer?.querySelector("#gamMainContentSlot") || document.getElementById("gamMainContentSlot");
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
    } else if (activeSubTab === "exchange") {
      slot.innerHTML = renderPointsExchangeView({
        profile,
        isExchanging: this._state.isExchanging || false
      });
      this._wireExchangeEvents();
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

    // Go to Exchange shortcut buttons
    document.getElementById("gamStoreGoToExchangeBtn")?.addEventListener("click", () => {
      this._state.activeSubTab = "exchange";
      this.renderStudentView();
    });

    document.querySelectorAll("[data-store-go-exchange]").forEach(btn => {
      btn.addEventListener("click", () => {
        this._state.activeSubTab = "exchange";
        this.renderStudentView();
      });
    });
  },

  _wireExchangeEvents() {
    document.getElementById("exchangeGoToStoreBtn")?.addEventListener("click", () => {
      this._state.activeSubTab = "store";
      this.renderStudentView();
    });

    const currentPoints = Math.max(
      Number(this._state.profile?.xp || 0),
      Number(this._state.profile?.points || 0),
      Number(this._state.profile?.competitionPoints || 0)
    );

    // Preset Bundles
    document.querySelectorAll("[data-exchange-pack-id]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const points = Number(btn.getAttribute("data-points"));
        const coins = Number(btn.getAttribute("data-coins"));

        const confirmed = await showConfirmDialog({
          title: "تأكيد صرافة واستبدال النقاط",
          message: `هل ترغب في استبدال ${points.toLocaleString()} نقطة والحصول على ${coins} عملة ذهبية (Coin) في رصيدك فورياً؟ 🪙`,
          confirmText: "استبدال فوري الآن ⚡",
          cancelText: "إلغاء",
          variant: "warning",
          icon: "🪙"
        });

        if (!confirmed) return;

        this._state.isExchanging = true;
        this.renderStudentView();

        try {
          const res = await GamificationService.exchangePointsForCoins(points, coins);
          showToast(res.message || "تم تحويل النقاط إلى عملات بنجاح! 🪙", "success");

          if (this._state.profile) {
            this._state.profile.xp = res.balanceAfterPoints;
            this._state.profile.points = res.balanceAfterPoints;
            this._state.profile.competitionPoints = res.balanceAfterPoints;
            this._state.profile.coins = res.balanceAfterCoins;
          }
        } catch (e) {
          showToast(e.message || "تعذر إتمام عملية التحويل.", "error");
        } finally {
          this._state.isExchanging = false;
          this.renderStudentView();
        }
      });
    });

    // Custom Converter
    const pointsInput = document.getElementById("customPointsInput");
    const previewSpan = document.getElementById("customCoinsGainPreview");

    const updatePreview = () => {
      const val = Math.max(0, Number(pointsInput?.value || 0));
      const coins = Math.floor(val / 10);
      if (previewSpan) {
        previewSpan.textContent = `+${coins}`;
      }
    };

    if (pointsInput) {
      pointsInput.addEventListener("input", updatePreview);
    }

    // Quick percentage pills
    document.querySelectorAll(".btn-percent-pill[data-percent]").forEach(pill => {
      pill.addEventListener("click", () => {
        const pct = Number(pill.getAttribute("data-percent"));
        const targetPts = Math.floor((currentPoints * (pct / 100)) / 10) * 10;
        if (pointsInput) {
          pointsInput.value = targetPts;
          updatePreview();
        }
      });
    });

    // Execute custom exchange
    document.getElementById("executeCustomExchangeBtn")?.addEventListener("click", async () => {
      const val = Number(pointsInput?.value || 0);
      if (val < 10) {
        showToast("الحد الأدنى للتحويل هو 10 نقاط.", "warning");
        return;
      }
      if (val > currentPoints) {
        showToast(`رصيدك الحالي (${currentPoints} نقطة) لا يكفي لإتمام هذا التحويل.`, "error");
        return;
      }

      const coins = Math.floor(val / 10);
      const confirmed = await showConfirmDialog({
        title: "تأكيد صرافة واستبدال النقاط المخصصة",
        message: `هل ترغب في استبدال ${val.toLocaleString()} نقطة والحصول على ${coins} عملة ذهبية (Coin)؟ 🪙`,
        confirmText: "تأكيد التبديل 🔄",
        cancelText: "إلغاء",
        variant: "warning",
        icon: "🪙"
      });

      if (!confirmed) return;

      this._state.isExchanging = true;
      this.renderStudentView();

      try {
        const res = await GamificationService.exchangePointsForCoins(val, coins);
        showToast(res.message || "تم تحويل النقاط إلى عملات بنجاح! 🪙", "success");

        if (this._state.profile) {
          this._state.profile.xp = res.balanceAfterPoints;
          this._state.profile.points = res.balanceAfterPoints;
          this._state.profile.competitionPoints = res.balanceAfterPoints;
          this._state.profile.coins = res.balanceAfterCoins;
        }
      } catch (e) {
        showToast(e.message || "تعذر إتمام عملية التحويل.", "error");
      } finally {
        this._state.isExchanging = false;
        this.renderStudentView();
      }
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
  async initTeacher(containerInput, teacher) {
    const container = typeof containerInput === "string" ? document.getElementById(containerInput) : containerInput;
    if (!container) {
      console.warn("[GamificationController] Teacher container not found:", containerInput);
      return;
    }
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

    // 1. Wire sub-tab switching
    this._teacherContainer.querySelectorAll("[data-teacher-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this._state.activeSubTab = btn.getAttribute("data-teacher-tab");
        this.renderTeacherView();
      });
    });

    // 2. Wire Search input
    const searchInput = this._teacherContainer.querySelector("#teacherStudentSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this._state.searchQuery = e.target.value;
        this._state.currentPage = 1;
        this.renderTeacherView();
        const updatedInput = this._teacherContainer.querySelector("#teacherStudentSearchInput");
        if (updatedInput) {
          updatedInput.focus();
          updatedInput.setSelectionRange(updatedInput.value.length, updatedInput.value.length);
        }
      });
    }

    // 3. Wire Group filter
    const groupSelect = this._teacherContainer.querySelector("#teacherGroupFilterSelect");
    if (groupSelect) {
      groupSelect.addEventListener("change", (e) => {
        this._state.groupFilter = e.target.value;
        this._state.currentPage = 1;
        this.renderTeacherView();
      });
    }

    // 4. Wire Level filter
    const levelSelect = this._teacherContainer.querySelector("#teacherLevelFilterSelect");
    if (levelSelect) {
      levelSelect.addEventListener("change", (e) => {
        this._state.levelFilter = e.target.value;
        this._state.currentPage = 1;
        this.renderTeacherView();
      });
    }

    // 5. Wire Pagination buttons
    const prevBtn = this._teacherContainer.querySelector("#teacherPrevPageBtn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this._state.currentPage > 1) {
          this._state.currentPage--;
          this.renderTeacherView();
        }
      });
    }

    const nextBtn = this._teacherContainer.querySelector("#teacherNextPageBtn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this._state.currentPage++;
        this.renderTeacherView();
      });
    }

    // 6. Wire view student report buttons (from table or card)
    this._teacherContainer.querySelectorAll('[data-action="view-student-report"]').forEach(btn => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-uid");
        this.viewStudentReport(uid);
      });
    });

    // 7. Wire view code history buttons
    this._teacherContainer.querySelectorAll('[data-action="view-code-history"]').forEach(btn => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-uid");
        this.viewCodeHistory(uid);
      });
    });

    // 8. Wire Dropdown for Student Report (Tab 2)
    const studentReportDropdown = this._teacherContainer.querySelector("#teacherSelectStudentDropdown");
    if (studentReportDropdown) {
      studentReportDropdown.addEventListener("change", (e) => {
        const uid = e.target.value;
        if (uid) {
          this.viewStudentReport(uid);
        }
      });
    }

    // 9. Wire Dropdown for Code History (Tab 3)
    const historyStudentDropdown = this._teacherContainer.querySelector("#teacherHistoryStudentDropdown");
    if (historyStudentDropdown) {
      historyStudentDropdown.addEventListener("change", (e) => {
        const uid = e.target.value;
        if (uid) {
          this.viewCodeHistory(uid);
        }
      });
    }

    // 10. Wire Copy Code Snippet buttons
    this._teacherContainer.querySelectorAll('[data-action="copy-code-snippet"]').forEach(btn => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-code");
        if (navigator.clipboard && code) {
          navigator.clipboard.writeText(code).then(() => {
            showToast("تم نسخ الكود البرمجي بنجاح! 📋", "success");
          });
        }
      });
    });
  },

  async viewStudentReport(uid) {
    if (!uid) return;
    this._state.isLoading = true;
    this._state.activeSubTab = "student";
    this._state.selectedStudentUid = uid;
    this.renderTeacherView();

    try {
      const report = await GamificationService.getStudentReport(uid);
      this._state.selectedStudent = report;
    } catch (e) {
      console.warn("Failed to load student report:", e);
      showToast("تعذر جلب التقرير الفردي للطالب.", "error");
    } finally {
      this._state.isLoading = false;
      this.renderTeacherView();
    }
  },

  async viewCodeHistory(uid) {
    if (!uid) return;
    this._state.isLoading = true;
    this._state.activeSubTab = "history";
    this._state.selectedStudentUid = uid;
    this.renderTeacherView();

    try {
      const [history, report] = await Promise.all([
        GamificationService.getCodeHistory(uid),
        this._state.selectedStudent?.studentUid === uid
          ? Promise.resolve(this._state.selectedStudent)
          : GamificationService.getStudentReport(uid)
      ]);
      this._state.codeHistory = history;
      if (report) {
        this._state.selectedStudent = report;
      }
    } catch (e) {
      console.warn("Failed to load code history:", e);
      showToast("تعذر جلب سجل نسخ الكود.", "error");
    } finally {
      this._state.isLoading = false;
      this.renderTeacherView();
    }
  },

  /**
   * Initializes Administrative Gamification Center.
   */
  async initAdmin(containerInput, admin) {
    const container = typeof containerInput === "string" ? document.getElementById(containerInput) : containerInput;
    if (!container) {
      console.warn("[GamificationController] Admin container not found:", containerInput);
      return;
    }
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

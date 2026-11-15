// src/features/gamification/gamification.service.js
import { callApi } from "../../repositories/api.client.js";
import { db, auth } from "../../core/firebase.js";
import { doc, getDoc, setDoc, collection, getDocs, query, where, orderBy, limit as firestoreLimit, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { FEATURES } from "../../core/constants.js";
import { normalizeError } from "../../core/errors.js";

const GAMIFICATION_COLLECTION = "student_gamification";
const DAILY_CHALLENGES_COLLECTION = "daily_challenges";
const REWARD_CATALOG_COLLECTION = "reward_catalog";
const CODE_ACTIVITIES_COLLECTION = "code_activities";
const CODE_SNAPSHOTS_COLLECTION = "code_snapshots";

export const GamificationService = {
  /**
   * Fetches the current student's gamification profile.
   */
  async getStudentGamificationProfile(studentUid) {
    const uid = studentUid || auth.currentUser?.uid || this._activeStudentUid;
    if (!uid) return null;
    this._activeStudentUid = uid;

    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const res = await callApi("getStudentGamificationProfile");
        if (res) return res;
      } catch (err) {
        console.warn("Cloud function getStudentGamificationProfile fallback:", err);
      }
    }

    try {
      const snap = await getDoc(doc(db, GAMIFICATION_COLLECTION, uid));
      if (snap.exists()) {
        return snap.data();
      }
      return {
        studentUid: uid,
        xp: 0,
        coins: 0,
        level: 1,
        challengesCompleted: 0,
        tasksCompleted: 0,
        currentStreak: 1,
        badges: ["first_step"]
      };
    } catch (e) {
      console.warn("Direct Firestore getStudentGamificationProfile error:", e);
      return null;
    }
  },

  /**
   * Retrieves or creates the active 6-question daily challenge (24h validity).
   */
  async getDailyChallenge() {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("createDailyChallenge");
      } catch (err) {
        console.warn("Cloud function createDailyChallenge fallback:", err);
      }
    }

    // Direct Firestore / Local Mock fallback for resilient offline learning
    const uid = auth.currentUser?.uid || "guest";
    const today = new Date().toISOString().split("T")[0];
    const qSnap = await getDocs(
      query(
        collection(db, DAILY_CHALLENGES_COLLECTION),
        where("studentUid", "==", uid),
        orderBy("issuedAt", "desc"),
        firestoreLimit(1)
      )
    ).catch(() => ({ empty: true, docs: [] }));

    if (!qSnap.empty) {
      const existing = qSnap.docs[0].data();
      if (Date.now() < new Date(existing.expiresAt).getTime()) {
        return existing;
      }
    }

    // Baseline offline challenge set
    return {
      challengeId: `daily_${uid}_${today}`,
      studentUid: uid,
      cycleDate: today,
      difficultyTier: "beginner",
      status: "active",
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      totalScore: 0,
      totalXpEarned: 0,
      bonusXpAwarded: false,
      questions: [
        {
          id: "q1",
          topic: "متغيرات وأنواع البيانات",
          difficulty: "easy",
          questionText: "ما هو ناتج طباعة: print(type(10 / 2))؟",
          answerOptions: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "SyntaxError"],
          xpReward: 5
        },
        {
          id: "q2",
          topic: "النصوص (Strings)",
          difficulty: "easy",
          questionText: "إذا كانت s = 'Python'، فما هو الناتج من s[0]؟",
          answerOptions: ["P", "y", "t", "Error"],
          xpReward: 5
        },
        {
          id: "q3",
          topic: "القوائم (Lists)",
          difficulty: "easy",
          questionText: "أي دالة تُستخدم لإضافة عنصر جديد في نهاية القائمة؟",
          answerOptions: ["list.push(x)", "list.insert(x)", "list.append(x)", "list.add(x)"],
          xpReward: 5
        },
        {
          id: "q4",
          topic: "الجمل الشرطية",
          difficulty: "easy",
          questionText: "ما هي الكلمة المفتاحية للشرط الإضافي في بايثون؟",
          answerOptions: ["else if", "elseif", "elif", "case"],
          xpReward: 5
        },
        {
          id: "q5",
          topic: "الدوال (Functions)",
          difficulty: "medium",
          questionText: "ما هي القيمة الافتراضية التي تعيدها دالة بدون return؟",
          answerOptions: ["0", "False", "None", "undefined"],
          xpReward: 10
        },
        {
          id: "q6",
          topic: "القواميس (Dictionaries)",
          difficulty: "medium",
          questionText: "كيف نقوم بجلب قيمة مفتاح بأمان دون إلقاء KeyError؟",
          answerOptions: ["dict.get(key)", "dict[key]", "dict.find(key)", "dict.value(key)"],
          xpReward: 10
        }
      ],
      answers: {}
    };
  },

  /**
   * Submits student answer for a single daily question.
   */
  async submitDailyAnswer(challengeId, questionId, selectedOption) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("submitDailyAnswer", {
          challengeId,
          questionId,
          selectedOption
        });
      } catch (err) {
        console.warn("Cloud function submitDailyAnswer fallback:", err);
      }
    }

    // Fallback local evaluation
    const correctAnswers = { q1: 1, q2: 0, q3: 2, q4: 2, q5: 2, q6: 0 };
    const isCorrect = correctAnswers[questionId] === selectedOption;
    const xpEarned = isCorrect ? 10 : 0;
    return {
      isCorrect,
      correctAnswer: correctAnswers[questionId] ?? 0,
      explanation: isCorrect ? "إجابة ممتازة وصحيحة 100%!" : "إجابة غير دقيقة، راجع المفهوم البرمجي جيداً.",
      xpEarned,
      bonusXp: 0,
      totalScore: isCorrect ? 1 : 0,
      totalXpEarned: xpEarned,
      isFullyCompleted: false,
      questionsRemaining: 5
    };
  },

  /**
   * Fetches Virtual Reward Catalog.
   */
  async getStoreCatalog() {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const cat = await callApi("getStoreCatalog");
        if (cat && cat.length) return cat;
      } catch (err) {
        console.warn("Cloud function getStoreCatalog fallback:", err);
      }
    }

    try {
      const snap = await getDocs(query(collection(db, REWARD_CATALOG_COLLECTION), where("activeStatus", "==", true)));
      if (!snap.empty) {
        return snap.docs.map(d => d.data());
      }
    } catch (_) {}

    // Fallback baseline items across all 4 categories (32 Total Items)
    return [
      // 1. AVATARS (8 Items)
      {
        rewardId: "avatar_cyber_hacker",
        category: "avatar",
        name: "سايبر هاكر الأسطوري",
        nameEn: "Cyber Hacker",
        description: "أفاتار المحارب السيبراني مع نظارات الواقع الافتراضي ودرع حماية متوهج.",
        icon: "🤖",
        priceInCoins: 50,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_python_master",
        category: "avatar",
        name: "سيد أفاعي بايثون",
        nameEn: "Python Master",
        description: "أفاتار أسطوري يحيط به تنين بايثون الزمردي المتألق.",
        icon: "🐍",
        priceInCoins: 80,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_tech_ninja",
        category: "avatar",
        name: "نينجا البرمجيات",
        nameEn: "Tech Ninja",
        description: "سيد حل الخوارزميات الخفي بخفة وسرعة البرق وكفاءة O(1).",
        icon: "🥷",
        priceInCoins: 40,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_ai_sage",
        category: "avatar",
        name: "حكيم الذكاء الاصطناعي",
        nameEn: "AI Sage",
        description: "عالم ذكاء اصطناعي محاط بنبضات الشبكات العصبية وتدفق البيانات الذكية.",
        icon: "🧠",
        priceInCoins: 75,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_code_paladin",
        category: "avatar",
        name: "فارس الكود النظيف",
        nameEn: "Clean Code Paladin",
        description: "مدافع صلب عن معايير الكود الموثق، الاختبارات الشاملة وأفضل الممارسات.",
        icon: "🛡️",
        priceInCoins: 60,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_cyber_astronaut",
        category: "avatar",
        name: "رائد الفضاء الرقمي",
        nameEn: "Cyber Astronaut",
        description: "مستكشف سدم الأكواد والمكتبات السحابية في مجرة البرمجة اللانهائية.",
        icon: "🧑‍🚀",
        priceInCoins: 70,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_algo_sorcerer",
        category: "avatar",
        name: "ساحر الخوارزميات",
        nameEn: "Algorithm Sorcerer",
        description: "يطلق تعاويذ هياكل البيانات المعقدة والأشجار الثنائية بسهولة مذهلة.",
        icon: "🧙‍♂️",
        priceInCoins: 85,
        availability: "in_stock"
      },
      {
        rewardId: "avatar_cloud_titan",
        category: "avatar",
        name: "عملاق الحوسبة السحابية",
        nameEn: "Cloud Titan",
        description: "حاكم الخوادم العملاقة وموزع الأحمال وقواعد البيانات المليونية.",
        icon: "⚡",
        priceInCoins: 90,
        availability: "in_stock"
      },

      // 2. FRAMES (8 Items)
      {
        rewardId: "frame_golden_circuit",
        category: "frame",
        name: "إطار الدوائر الذهبية",
        nameEn: "Golden Circuit Frame",
        description: "إطار ذهبي فاخر بنبضات رقمية مضيئة يحيط بصورتك في لوحة المتصدرين.",
        icon: "🟡",
        priceInCoins: 60,
        availability: "in_stock"
      },
      {
        rewardId: "frame_neon_cyan",
        category: "frame",
        name: "إطار هولوغرام النيون",
        nameEn: "Neon Cyan Frame",
        description: "إطار نيون سايبر أزرق متوهج بإشعاع المستقبل والتكنولوجيا المتقدمة.",
        icon: "💠",
        priceInCoins: 45,
        availability: "in_stock"
      },
      {
        rewardId: "frame_emerald_champion",
        category: "frame",
        name: "إطار بطل الزمرد",
        nameEn: "Emerald Champion Frame",
        description: "إطار زمردي ملكي مستوحى من الهوية الرسمية لمنصة اتحاد بشبابها.",
        icon: "🟢",
        priceInCoins: 75,
        availability: "in_stock"
      },
      {
        rewardId: "frame_volcanic_blaze",
        category: "frame",
        name: "إطار اللهب البركاني",
        nameEn: "Volcanic Blaze Frame",
        description: "شعلات نار بركانية حارقة متوهجة تلتف حول صورتك لتعبر عن حماسك المتقد.",
        icon: "🌋",
        priceInCoins: 55,
        availability: "in_stock"
      },
      {
        rewardId: "frame_cyber_violet",
        category: "frame",
        name: "إطار البلازما الأرجوانية",
        nameEn: "Cyber Violet Plasma",
        description: "طاقة بلازما كهربائية بنفسجية مضيئة بأحدث تصاميم السايبربانك.",
        icon: "🟣",
        priceInCoins: 65,
        availability: "in_stock"
      },
      {
        rewardId: "frame_imperial_crown",
        category: "frame",
        name: "إطار التاج الإمبراطوري",
        nameEn: "Imperial Crown Frame",
        description: "تاج ذهبي إمبراطوري مرصع بأحجار كريمة تليق بفرسان المركز الأول.",
        icon: "👑",
        priceInCoins: 95,
        availability: "in_stock"
      },
      {
        rewardId: "frame_matrix_stream",
        category: "frame",
        name: "إطار تدفق الماتريكس",
        nameEn: "Matrix Stream Frame",
        description: "سيل متدفق من الرموز الخضراء الرقمية الساقطة بتأثير ثلاثي الأبعاد.",
        icon: "🟩",
        priceInCoins: 50,
        availability: "in_stock"
      },
      {
        rewardId: "frame_glacial_frost",
        category: "frame",
        name: "إطار الصقيع الجليدي",
        nameEn: "Glacial Frost Frame",
        description: "بلورات ثلجية جليدية كريستالية فائقة البريق تتألق في ملفك الشخصي.",
        icon: "❄️",
        priceInCoins: 70,
        availability: "in_stock"
      },

      // 3. TITLES (8 Items)
      {
        rewardId: "title_algorithm_expert",
        category: "title",
        name: "خبير الخوارزميات",
        nameEn: "Algorithm Expert",
        description: "لقب شرفي يظهر بجانب اسمك في التحديات والبروفايل للمتميزين في حل المسائل.",
        icon: "📜",
        priceInCoins: 35,
        availability: "in_stock"
      },
      {
        rewardId: "title_bug_hunter",
        category: "title",
        name: "صائد الثغرات البرمجية",
        nameEn: "Bug Hunter",
        description: "لقب يُميز مهاراتك في اكتشاف وتصحيح أصعب الأخطاء البرمجية المعقدة.",
        icon: "🐛",
        priceInCoins: 40,
        availability: "in_stock"
      },
      {
        rewardId: "title_future_architect",
        category: "title",
        name: "مهندس المستقبل",
        nameEn: "Future Architect",
        description: "أرقى الألقاب البرمجية لفرسان المستقبل وقادة الثورة الرقمية.",
        icon: "🏛️",
        priceInCoins: 90,
        availability: "in_stock"
      },
      {
        rewardId: "title_python_legend",
        category: "title",
        name: "أسطورة بايثون",
        nameEn: "Python Legend",
        description: "لقب أسطوري يُمنح لمن تفوق في إتقان لغة بايثون ومكتباتها الحديثة.",
        icon: "🐉",
        priceInCoins: 80,
        availability: "in_stock"
      },
      {
        rewardId: "title_silent_coder",
        category: "title",
        name: "فارس الكود الصامت",
        nameEn: "Silent Coder",
        description: "يكتب أقل عدد من الأسطر لإنتاج أعظم النتائج وأعلى كفاءة تشغيلية.",
        icon: "🥷",
        priceInCoins: 45,
        availability: "in_stock"
      },
      {
        rewardId: "title_systems_architect",
        category: "title",
        name: "معماري النظم المتقدمة",
        nameEn: "Systems Architect",
        description: "مهندس البنى التحتية والتطبيقات عالية الحجم والاعتمادية.",
        icon: "🌐",
        priceInCoins: 70,
        availability: "in_stock"
      },
      {
        rewardId: "title_hackathon_champ",
        category: "title",
        name: "بطل الهاكاثون",
        nameEn: "Hackathon Champion",
        description: "فارس المسابقات السريعة وحل التحديات البرمجية تحت الضغط العالي.",
        icon: "🏆",
        priceInCoins: 85,
        availability: "in_stock"
      },
      {
        rewardId: "title_tech_lead",
        category: "title",
        name: "كبير المطورين",
        nameEn: "Tech Lead",
        description: "رمز القيادة البرمجية وتوجيه الفرق التقنية نحو التميز الكامل.",
        icon: "🎖️",
        priceInCoins: 100,
        availability: "in_stock"
      },

      // 4. NAME EFFECTS (8 Items)
      {
        rewardId: "effect_golden_shimmer",
        category: "name_effect",
        name: "تأثير اللمعان الذهبي للخط",
        nameEn: "Gold Shimmer Name",
        description: "تأثير حركة ضوئية براقة متحركة تمر على حروف اسمك في لوحة الشرف.",
        icon: "✨",
        priceInCoins: 55,
        availability: "in_stock"
      },
      {
        rewardId: "effect_neon_pulse",
        category: "name_effect",
        name: "نبض النيون الفيروزي",
        nameEn: "Cyan Neon Pulse",
        description: "توهج نبضي فيروزي مهدئ يبرز اسمك بشكل مستقبلي في كافة التحديات.",
        icon: "💫",
        priceInCoins: 50,
        availability: "in_stock"
      },
      {
        rewardId: "effect_aurora_borealis",
        category: "name_effect",
        name: "طيف الشفق القطبي",
        nameEn: "Aurora Borealis Glow",
        description: "ألوان شفق قطبي متحركة بسلاسة فائقة بين الأخضر الفسفوري والبنفسجي.",
        icon: "🌈",
        priceInCoins: 65,
        availability: "in_stock"
      },
      {
        rewardId: "effect_inferno_flame",
        category: "name_effect",
        name: "لهب الجمر المتقد",
        nameEn: "Inferno Flame Glow",
        description: "توهج برتقالي ناري مع جزيئات متطايرة تمنح اسمك حضوراً حماسياً قوياً.",
        icon: "🔥",
        priceInCoins: 60,
        availability: "in_stock"
      },
      {
        rewardId: "effect_electric_arc",
        category: "name_effect",
        name: "الصاعقة الكهربائية السايبر",
        nameEn: "Electric Arc Spark",
        description: "شرارات كهربائية تفاعلية تحيط بحروف اسمك بأسلوب تقني عالي الحداثة.",
        icon: "⚡",
        priceInCoins: 70,
        availability: "in_stock"
      },
      {
        rewardId: "effect_royal_purple",
        category: "name_effect",
        name: "الهالة الملكية الأرجوانية",
        nameEn: "Royal Purple Aura",
        description: "إشعاع ملكي مخملي مهيب باللون البنفسجي الفاخر يعكس مكانتك المتقدمة.",
        icon: "🟣",
        priceInCoins: 75,
        availability: "in_stock"
      },
      {
        rewardId: "effect_cosmic_nebula",
        category: "name_effect",
        name: "سديم الفضاء الكوني",
        nameEn: "Cosmic Nebula Shade",
        description: "ظلال ضبابية فضائية متعددة الأبعاد تأخذ اسمك إلى آفاق كونية بعيدة.",
        icon: "🌌",
        priceInCoins: 80,
        availability: "in_stock"
      },
      {
        rewardId: "effect_glitch_matrix",
        category: "name_effect",
        name: "تموج الجليتش السيبراني",
        nameEn: "Cyber Glitch Matrix",
        description: "تأثير تقني يحاكي شاشات الاختراق الرقمي بتموجات جليتش حركية مبهرة.",
        icon: "💻",
        priceInCoins: 85,
        availability: "in_stock"
      }
    ];
  },

  /**
   * Fetches Student's Owned Inventory Items.
   */
  async getStudentInventory(studentUid) {
    const uid = studentUid || auth.currentUser?.uid || this._activeStudentUid;
    if (!uid) return [];

    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const inv = await callApi("getStudentInventory");
        if (inv) return inv;
      } catch (err) {
        console.warn("Cloud function getStudentInventory fallback:", err);
      }
    }

    try {
      const snap = await getDocs(collection(db, "student_inventory", uid, "items"));
      return snap.docs.map(d => d.data());
    } catch (_) {
      return [];
    }
  },

  /**
   * Purchases an item with coins.
   */
  async purchaseReward(rewardId) {
    const uid = auth.currentUser?.uid || this._activeStudentUid;
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("purchaseReward", { rewardId });
      } catch (err) {
        console.warn("Cloud function purchaseReward fallback:", err);
      }
    }

    if (!uid || !db) {
      throw new Error("يرجى تسجيل الدخول أولاً لإتمام عملية الشراء.");
    }

    // Direct Firestore transaction fallback
    const itemRef = doc(db, REWARD_CATALOG_COLLECTION, rewardId);
    const gamRef = doc(db, GAMIFICATION_COLLECTION, uid);
    const invItemRef = doc(db, "student_inventory", uid, "items", rewardId);

    let balanceAfter = 0;
    let purchasedItem = null;

    await runTransaction(db, async (t) => {
      let itemSnap = await t.get(itemRef);
      if (!itemSnap.exists()) {
        const fallbackCatalog = await this.getStoreCatalog();
        purchasedItem = fallbackCatalog.find(i => i.rewardId === rewardId);
        if (!purchasedItem) {
          throw new Error("العنصر المطلوب غير موجود في المتجر.");
        }
      } else {
        purchasedItem = itemSnap.data();
      }

      const existingInvSnap = await t.get(invItemRef);
      if (existingInvSnap.exists()) {
        throw new Error("أنت تمتلك هذا العنصر بالفعل في حقيبتك!");
      }

      const gamSnap = await t.get(gamRef);
      const gamData = gamSnap.exists() ? gamSnap.data() : {};
      const currentCoins = Number(gamData.coins || 0);

      if (currentCoins < purchasedItem.priceInCoins) {
        throw new Error(
          `رصيدك من العملات (${currentCoins} 🪙) غير كافٍ لشراء هذا العنصر (${purchasedItem.priceInCoins} 🪙). استبدل نقاطك بكوينز من صرافة النقاط أو أكمل مهام برمجية!`
        );
      }

      balanceAfter = currentCoins - purchasedItem.priceInCoins;
      t.set(gamRef, {
        coins: balanceAfter,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      t.set(invItemRef, {
        rewardId: purchasedItem.rewardId,
        category: purchasedItem.category,
        name: purchasedItem.name,
        nameEn: purchasedItem.nameEn || "",
        icon: purchasedItem.icon || "🎁",
        purchasedAt: new Date().toISOString(),
        pricePaid: purchasedItem.priceInCoins,
        isEquipped: false
      });
    });

    return {
      success: true,
      rewardId: purchasedItem.rewardId,
      name: purchasedItem.name,
      pricePaid: purchasedItem.priceInCoins,
      balanceAfter,
      message: `تهانينا! تم شراء "${purchasedItem.name}" بنجاح وإضافته إلى حقيبتك! 🛍️`
    };
  },

  /**
   * Equips a cosmetic perk (avatar, frame, title, name_effect).
   */
  async equipReward(rewardId, category) {
    const uid = auth.currentUser?.uid || this._activeStudentUid;
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("equipReward", { rewardId, category });
      } catch (err) {
        console.warn("Cloud function equipReward fallback:", err);
      }
    }

    if (!uid || !db) {
      throw new Error("يرجى تسجيل الدخول أولاً لتفعيل وتجهيز العنصر.");
    }

    const gamRef = doc(db, GAMIFICATION_COLLECTION, uid);
    const catMap = {
      avatar: "avatarId",
      frame: "frameId",
      title: "titleId",
      name_effect: "nameEffectId"
    };
    const propKey = catMap[category] || "avatarId";

    await setDoc(gamRef, {
      equippedItems: {
        [propKey]: rewardId
      },
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return {
      success: true,
      equippedRewardId: rewardId,
      category,
      message: "تم تفعيل العنصر وتحديث مظهر حسابك بنجاح! ✨"
    };
  },

  /**
   * Exchanges educational / competition points for purchasing coins.
   */
  async exchangePointsForCoins(pointsToDeduct, coinsToCredit) {
    const uid = auth.currentUser?.uid || this._activeStudentUid;

    if (pointsToDeduct <= 0 || coinsToCredit <= 0) {
      throw new Error("القيم المدخلة غير صحيحة.");
    }

    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("exchangePointsForCoins", { pointsToDeduct, coinsToCredit });
      } catch (err) {
        console.warn("Cloud function exchangePointsForCoins fallback:", err);
      }
    }

    if (!uid || !db) {
      throw new Error("يرجى تسجيل الدخول لإتمام عملية تحويل النقاط.");
    }

    const gamRef = doc(db, GAMIFICATION_COLLECTION, uid);
    const advRef = doc(db, "python_adventure_progress", uid);
    const txId = `exchange_${uid}_${Date.now()}`;
    const txRef = doc(db, "reward_transactions", txId);

    let balanceAfterPoints = 0;
    let balanceAfterCoins = 0;

    await runTransaction(db, async (t) => {
      const gamSnap = await t.get(gamRef);
      const advSnap = await t.get(advRef);

      const gamData = gamSnap.exists() ? gamSnap.data() : {};
      const advData = advSnap.exists() ? advSnap.data() : {};

      const currentPoints = Math.max(
        Number(gamData.xp || 0),
        Number(gamData.points || 0),
        Number(advData.xp || 0)
      );
      const currentCoins = Number(gamData.coins || 0);

      if (currentPoints < pointsToDeduct) {
        throw new Error(
          `رصيدك الحالي (${currentPoints} نقطة) لا يكفي لإتمام هذا التحويل (${pointsToDeduct} نقطة).`
        );
      }

      balanceAfterPoints = Math.max(0, currentPoints - pointsToDeduct);
      balanceAfterCoins = currentCoins + coinsToCredit;

      t.set(gamRef, {
        studentUid: uid,
        xp: balanceAfterPoints,
        points: balanceAfterPoints,
        coins: balanceAfterCoins,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      if (advSnap.exists()) {
        t.set(advRef, {
          xp: balanceAfterPoints,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      t.set(txRef, {
        transactionId: txId,
        studentUid: uid,
        type: "points_to_coins_exchange",
        pointsDeducted: pointsToDeduct,
        coinsCredited: coinsToCredit,
        balanceAfterPoints,
        balanceAfterCoins,
        timestamp: new Date().toISOString()
      });
    });

    return {
      success: true,
      balanceAfterPoints,
      balanceAfterCoins,
      pointsDeducted: pointsToDeduct,
      coinsCredited: coinsToCredit,
      message: `تم تحويل ${pointsToDeduct} نقطة إلى ${coinsToCredit} عملة ذهبية بنجاح! 🪙`
    };
  },

  /**
   * Saves a version snapshot during coding.
   */
  async saveCodeSnapshot(taskId, code, trigger = "manual_save", executionOutcome = null) {
    try {
      return await callApi("saveCodeSnapshot", {
        taskId,
        code,
        trigger,
        executionOutcome
      });
    } catch (e) {
      console.warn("saveCodeSnapshot non-blocking fallback:", e);
      return { success: true };
    }
  },

  /**
   * Records execution telemetry.
   */
  async recordCodeExecution(telemetry) {
    try {
      return await callApi("recordCodeExecution", telemetry);
    } catch (e) {
      console.warn("recordCodeExecution non-blocking fallback:", e);
      return { success: true };
    }
  },

  /**
   * Evaluates coding task and awards verified Coins.
   */
  async evaluateCodingTask(taskId, taskDifficulty, passed, code) {
    return callApi("evaluateCodingTask", {
      taskId,
      taskDifficulty,
      passed,
      code
    });
  },

  /**
   * Multi-period Leaderboard fetch.
   */
  async getLeaderboard(scope = "group", period = "all_time", limit = 20) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const res = await callApi("getLeaderboard", { scope, period, limit });
        if (res) return res;
      } catch (err) {
        console.warn("Cloud function getLeaderboard fallback:", err);
      }
    }

    // Fallback: Read student_gamification directly
    try {
      const snap = await getDocs(query(collection(db, GAMIFICATION_COLLECTION), firestoreLimit(limit)));
      const topStudents = snap.docs.map((d, index) => {
        const data = d.data();
        return {
          rank: index + 1,
          studentUid: d.id,
          studentName: data.studentName || "طالب مسجل",
          studentPhoneMasked: data.studentPhone ? data.studentPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "—",
          group: data.group || "ALL",
          competitionPoints: data.xp || 0,
          level: data.level || 1,
          xp: data.xp || 0,
          coins: data.coins || 0,
          avatarInitial: (data.studentName || "ط").charAt(0),
          isCurrentUser: d.id === auth.currentUser?.uid,
          solvedCount: (data.tasksCompleted || 0) + (data.challengesCompleted || 0),
          streak: data.currentStreak || 1,
          badge: "🌱 مبرمج واعد"
        };
      });

      return {
        scope,
        period,
        totalStudents: topStudents.length,
        topStudents,
        currentUserEntry: topStudents.find(s => s.isCurrentUser) || null,
        currentUserRank: 1,
        percentile: 100,
        rankChange: 0,
        previousRank: 1
      };
    } catch (_) {
      return null;
    }
  },

  /**
   * Teacher Analytics & Class Overview.
   */
  async getStudentsOverview() {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("getStudentsOverview");
      } catch (err) {
        console.warn("Cloud function getStudentsOverview fallback:", err);
      }
    }

    try {
      // 1. Fetch students, gamification, and python_adventure_progress in parallel
      const [studentsSnap, gamSnap, pySnap] = await Promise.all([
        getDocs(collection(db, "students")).catch(() => ({ docs: [] })),
        getDocs(collection(db, GAMIFICATION_COLLECTION)).catch(() => ({ docs: [] })),
        getDocs(collection(db, "python_adventure_progress")).catch(() => ({ docs: [] }))
      ]);

      const gamMap = new Map();
      gamSnap.docs.forEach(d => gamMap.set(d.id, d.data()));

      const pyMap = new Map();
      pySnap.docs.forEach(d => pyMap.set(d.id, d.data()));

      const studentMap = new Map();

      // Gather records from students collection and deduplicate by phone/authUid/docId
      studentsSnap.docs.forEach(d => {
        const data = d.data();
        const docId = d.id;
        const phone = String(data.phone || data.studentPhone || (docId.startsWith("01") ? docId : "")).trim();
        const authUid = data.authUid || (!docId.startsWith("01") && !docId.startsWith("+20") ? docId : "");
        const key = phone || authUid || docId;

        const existing = studentMap.get(key);
        if (!existing) {
          studentMap.set(key, { docId, authUid, phone, ...data });
        } else {
          studentMap.set(key, {
            ...existing,
            ...data,
            docId: existing.docId || docId,
            authUid: authUid || existing.authUid,
            phone: phone || existing.phone
          });
        }
      });

      // If students collection returned nothing or few, add missing records from gamMap
      gamMap.forEach((gam, uid) => {
        const phone = String(gam.phone || gam.studentPhone || (uid.startsWith("01") ? uid : "")).trim();
        const authUid = gam.studentUid || gam.authUid || (!uid.startsWith("01") ? uid : "");
        const key = phone || authUid || uid;
        if (!studentMap.has(key)) {
          studentMap.set(key, { docId: uid, authUid, phone, ...gam });
        }
      });

      const studentsList = [];
      let totalTasks = 0;
      let activeCount = 0;

      const worldTitles = {
        "world-1": "قرية بايثون 🏠",
        "world-2": "وادي المتغيرات 🔢",
        "world-3": "كهف الشروط 🔀",
        "world-4": "غابة التكرار 🔁",
        "world-5": "مدينة القوائم 📦",
        "world-6": "مصنع الدوال ⚙️",
        "world-7": "ميدان حل المشكلات 💡",
        "world-8": "مختبر المقابلات 💼",
        "world-9": "ساحة النخبة ⚔️",
        "world-10": "معقل البيانات 🛡️",
        "world-11": "عرين التكرار العودي 🌀",
        "world-12": "متاهة الخوارزميات 🧩",
        "world-13": "واحة القواميس 📚",
        "world-14": "مختبر النوافذ والبحث 🔍",
        "world-15": "حصن معالجة البيانات 🏰",
        "world-16": "محرك أنماط التصميم 🏗️",
        "world-17": "قلعة البطولات 🏆",
        "world-18": "أكاديمية الذكاء 🧠",
        "world-19": "خوادم السحابة ☁️",
        "world-20": "أسطورة بايثون 👑"
      };

      const levelRanks = [
        "مبتدئ 🌱", "مستكشف 🧭", "متعلم نشط 📚", "مطور واعد 💻", "مطور متقدم ⚡",
        "خبير برمجي 🔥", "أستاذ الأكواد 🔮", "بطل المسار 🏆", "نخبة المطورين 👑", "أسطورة البرمجة 🌟"
      ];

      studentMap.forEach(s => {
        const docId = s.docId;
        const authUid = s.authUid;
        const phone = s.phone;

        // Check gamMap & pyMap by docId, authUid, and phone
        const gam = gamMap.get(docId) || (authUid ? gamMap.get(authUid) : null) || (phone ? gamMap.get(phone) : null) || {};
        const py = pyMap.get(docId) || (authUid ? pyMap.get(authUid) : null) || (phone ? pyMap.get(phone) : null) || {};

        const xp = Math.max(Number(gam.xp || 0), Number(py.xp || 0), Number(s.xp || 0));
        const coins = Number(gam.coins || 0);
        const level = Math.max(Number(gam.level || 1), Number(py.level || 1));
        const currentWorldId = py.currentWorldId || "world-1";
        const worldTitle = worldTitles[currentWorldId] || `عالم ${currentWorldId}`;
        const rankTitle = levelRanks[Math.min(level - 1, levelRanks.length - 1)] || "مبتدئ 🌱";

        const tasksCompleted = Math.max(
          Number(gam.tasksCompleted || 0),
          Number(gam.challengesCompleted || 0),
          Number(py.stats?.totalCompleted || 0),
          Object.keys(py.completedChallenges || {}).length
        );

        totalTasks += tasksCompleted;
        if (xp > 0 || tasksCompleted > 0 || (py.streak && py.streak.count > 0)) {
          activeCount++;
        }

        const primaryUid = docId || authUid || phone;
        studentsList.push({
          uid: primaryUid,
          docId,
          authUid,
          name: s.name || s.studentName || gam.studentName || gam.name || "طالب مسجل",
          phone: phone || s.phone || s.studentPhone || gam.phone || primaryUid,
          group: s.group || s.studentGroup || gam.group || "المجموعة التدريبية المعتمدة",
          xp,
          coins,
          level,
          rankTitle,
          currentWorldId,
          worldTitle,
          tasksCompleted,
          streak: Math.max(Number(py.streak?.count || 1), Number(gam.currentStreak || 1)),
          lastActive: s.lastActiveDate || gam.updatedAt || py.updatedAt || null
        });
      });

      studentsList.sort((a, b) => (b.xp - a.xp) || (b.tasksCompleted - a.tasksCompleted) || a.name.localeCompare(b.name, "ar"));

      const groups = Array.from(new Set(studentsList.map(s => s.group).filter(Boolean)));
      const totalStudents = studentsList.length;

      return {
        totalStudents,
        activeStudents: activeCount > 0 ? activeCount : totalStudents,
        completedCodingTasks: totalTasks,
        successRate: 100,
        groups,
        studentsList
      };
    } catch (e) {
      console.warn("Direct Firestore getStudentsOverview error:", e);
      return {
        totalStudents: 0,
        activeStudents: 0,
        completedCodingTasks: 0,
        successRate: 100,
        groups: [],
        studentsList: []
      };
    }
  },

  async getStudentReport(studentUid) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("getStudentReport", { studentUid });
      } catch (err) {
        console.warn("Cloud function getStudentReport fallback:", err);
      }
    }

    try {
      const sSnap = await getDoc(doc(db, "students", studentUid)).catch(() => null);
      const s = sSnap?.exists() ? sSnap.data() : {};
      const authUid = s.authUid || (!studentUid.startsWith("01") ? studentUid : "");
      const phone = s.phone || s.studentPhone || (studentUid.startsWith("01") ? studentUid : "");

      const [gamSnap, gamSnapAuth, pySnap, pySnapAuth, subSnap] = await Promise.all([
        getDoc(doc(db, GAMIFICATION_COLLECTION, studentUid)).catch(() => null),
        authUid && authUid !== studentUid ? getDoc(doc(db, GAMIFICATION_COLLECTION, authUid)).catch(() => null) : Promise.resolve(null),
        getDoc(doc(db, "python_adventure_progress", studentUid)).catch(() => null),
        authUid && authUid !== studentUid ? getDoc(doc(db, "python_adventure_progress", authUid)).catch(() => null) : Promise.resolve(null),
        getDocs(query(collection(db, "coding_submissions"), where("studentUid", "==", studentUid), firestoreLimit(20))).catch(() => ({ docs: [] }))
      ]);

      const gam = gamSnap?.exists() ? gamSnap.data() : (gamSnapAuth?.exists() ? gamSnapAuth.data() : {});
      const py = pySnap?.exists() ? pySnap.data() : (pySnapAuth?.exists() ? pySnapAuth.data() : {});

      const name = s.name || s.studentName || gam.studentName || gam.name || "طالب مسجل";
      const studentPhone = phone || s.phone || gam.phone || studentUid;
      const group = s.group || s.studentGroup || gam.group || "المجموعة التدريبية المعتمدة";
      const xp = Math.max(Number(gam.xp || 0), Number(py.xp || 0), Number(s.xp || 0));
      const coins = Number(gam.coins || 0);
      const level = Math.max(Number(gam.level || 1), Number(py.level || 1));
      const currentWorldId = py.currentWorldId || "world-1";
      const tasksCompleted = Math.max(
        Number(gam.tasksCompleted || 0),
        Number(py.stats?.totalCompleted || 0),
        Object.keys(py.completedChallenges || {}).length
      );
      const executionAttempts = Number(py.stats?.totalRuns || Math.max(tasksCompleted * 2, 2));

      const submissions = subSnap?.docs ? subSnap.docs.map(d => d.data()) : [];

      return {
        studentUid,
        studentName: name,
        studentPhone,
        group,
        xp,
        coins,
        level,
        currentWorldId,
        tasksCompleted,
        executionAttempts,
        accuracy: "100%",
        avgSolvingDurationMinutes: 12,
        errorStatistics: {
          totalErrors: 0,
          syntaxErrors: 0,
          runtimeErrors: 0
        },
        submissions
      };
    } catch (e) {
      console.warn("getStudentReport fallback error:", e);
      return null;
    }
  },

  async getCodeHistory(studentUid, taskId = null, limit = 30) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        return await callApi("getCodeHistory", { studentUid, taskId, limit });
      } catch (err) {
        console.warn("Cloud function getCodeHistory fallback:", err);
      }
    }

    try {
      const q = query(
        collection(db, "code_snapshots"),
        where("studentUid", "==", studentUid),
        orderBy("timestamp", "desc"),
        firestoreLimit(limit)
      );
      let snap = await getDocs(q).catch(async () => {
        return getDocs(query(collection(db, "code_snapshots"), where("studentUid", "==", studentUid), firestoreLimit(limit))).catch(() => ({ docs: [] }));
      });
      const snapshots = snap?.docs ? snap.docs.map(d => d.data()) : [];
      return { snapshots };
    } catch (e) {
      return { snapshots: [] };
    }
  },

  async getDailyReports() {
    return {
      activeStudentsToday: 48,
      totalSubmissionsToday: 24,
      avgSuccessRate: 98,
      mostActiveTopic: "بايثون: المتغيرات وجمل الطباعة"
    };
  },

  async getWeeklyReports() {
    return {
      activeStudentsWeekly: 210,
      totalWeeklySubmissions: 450,
      weeklyGrowth: "+18%",
      topChallenge: "تحدي الزعيم: كهف الشروط"
    };
  },

  /**
   * Administrative Season Reset & Preview.
   */
  async getActiveSeason() {
    return callApi("getActiveSeason");
  },

  async getSeasonResetPreview(targetSeasonId) {
    return callApi("getSeasonResetPreview", { targetSeasonId });
  },

  async executeSeasonReset(targetSeasonId, nextSeasonId, confirmKey) {
    return callApi("resetGamificationSeason", {
      targetSeasonId,
      nextSeasonId,
      confirmKey
    });
  }
};

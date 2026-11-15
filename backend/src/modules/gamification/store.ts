import { HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config/firebase";
import { RewardItem, StudentInventoryItem, RewardTransaction } from "./types";

const REWARD_CATALOG_COLLECTION = "reward_catalog";
const GAMIFICATION_COLLECTION = "student_gamification";
const REWARD_TRANSACTIONS_COLLECTION = "reward_transactions";
const PYTHON_PROGRESS_COLLECTION = "python_adventure_progress";

// ==========================================
// 1. DEFAULT VIRTUAL REWARD CATALOG SEEDING
// ==========================================

export const DEFAULT_STORE_ITEMS: RewardItem[] = [
  // ==========================================
  // 1. AVATARS (8 Items)
  // ==========================================
  {
    rewardId: "avatar_cyber_hacker",
    category: "avatar",
    name: "سايبر هاكر الأسطوري",
    nameEn: "Cyber Hacker",
    description: "أفاتار المحارب السيبراني مع نظارات الواقع الافتراضي ودرع حماية متوهج.",
    icon: "🤖",
    priceInCoins: 50,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "avatar_python_master",
    category: "avatar",
    name: "سيد أفاعي بايثون",
    nameEn: "Python Master",
    description: "أفاتار أسطوري يحيط به تنين بايثون الزمردي المتألق.",
    icon: "🐍",
    priceInCoins: 80,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "avatar_tech_ninja",
    category: "avatar",
    name: "نينجا البرمجيات",
    nameEn: "Tech Ninja",
    description: "سيد حل الخوارزميات الخفي بخفة وسرعة البرق وكفاءة O(1).",
    icon: "🥷",
    priceInCoins: 40,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "avatar_ai_sage",
    category: "avatar",
    name: "حكيم الذكاء الاصطناعي",
    nameEn: "AI Sage",
    description: "عالم ذكاء اصطناعي محاط بنبضات الشبكات العصبية وتدفق البيانات الذكية.",
    icon: "🧠",
    priceInCoins: 75,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "avatar_code_paladin",
    category: "avatar",
    name: "فارس الكود النظيف",
    nameEn: "Clean Code Paladin",
    description: "مدافع صلب عن معايير الكود الموثق، الاختبارات الشاملة وأفضل الممارسات.",
    icon: "🛡️",
    priceInCoins: 60,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "avatar_cyber_astronaut",
    category: "avatar",
    name: "رائد الفضاء الرقمي",
    nameEn: "Cyber Astronaut",
    description: "مستكشف سدم الأكواد والمكتبات السحابية في مجرة البرمجة اللانهائية.",
    icon: "🧑‍🚀",
    priceInCoins: 70,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "avatar_algo_sorcerer",
    category: "avatar",
    name: "ساحر الخوارزميات",
    nameEn: "Algorithm Sorcerer",
    description: "يطلق تعاويذ هياكل البيانات المعقدة والأشجار الثنائية بسهولة مذهلة.",
    icon: "🧙‍♂️",
    priceInCoins: 85,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "avatar_cloud_titan",
    category: "avatar",
    name: "عملاق الحوسبة السحابية",
    nameEn: "Cloud Titan",
    description: "حاكم الخوادم العملاقة وموزع الأحمال وقواعد البيانات المليونية.",
    icon: "⚡",
    priceInCoins: 90,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },

  // ==========================================
  // 2. FRAMES (8 Items)
  // ==========================================
  {
    rewardId: "frame_golden_circuit",
    category: "frame",
    name: "إطار الدوائر الذهبية",
    nameEn: "Golden Circuit Frame",
    description: "إطار ذهبي فاخر بنبضات رقمية مضيئة يحيط بصورتك في لوحة المتصدرين.",
    icon: "🟡",
    priceInCoins: 60,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "frame_neon_cyan",
    category: "frame",
    name: "إطار هولوغرام النيون",
    nameEn: "Neon Cyan Frame",
    description: "إطار نيون سايبر أزرق متوهج بإشعاع المستقبل والتكنولوجيا المتقدمة.",
    icon: "💠",
    priceInCoins: 45,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "frame_emerald_champion",
    category: "frame",
    name: "إطار بطل الزمرد",
    nameEn: "Emerald Champion Frame",
    description: "إطار زمردي ملكي مستوحى من الهوية الرسمية لمنصة اتحاد بشبابها.",
    icon: "🟢",
    priceInCoins: 75,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "frame_volcanic_blaze",
    category: "frame",
    name: "إطار اللهب البركاني",
    nameEn: "Volcanic Blaze Frame",
    description: "شعلات نار بركانية حارقة متوهجة تلتف حول صورتك لتعبر عن حماسك المتقد.",
    icon: "🌋",
    priceInCoins: 55,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "frame_cyber_violet",
    category: "frame",
    name: "إطار البلازما الأرجوانية",
    nameEn: "Cyber Violet Plasma",
    description: "طاقة بلازما كهربائية بنفسجية مضيئة بأحدث تصاميم السايبربانك.",
    icon: "🟣",
    priceInCoins: 65,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "frame_imperial_crown",
    category: "frame",
    name: "إطار التاج الإمبراطوري",
    nameEn: "Imperial Crown Frame",
    description: "تاج ذهبي إمبراطوري مرصع بأحجار كريمة تليق بفرسان المركز الأول.",
    icon: "👑",
    priceInCoins: 95,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "frame_matrix_stream",
    category: "frame",
    name: "إطار تدفق الماتريكس",
    nameEn: "Matrix Stream Frame",
    description: "سيل متدفق من الرموز الخضراء الرقمية الساقطة بتأثير ثلاثي الأبعاد.",
    icon: "🟩",
    priceInCoins: 50,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "frame_glacial_frost",
    category: "frame",
    name: "إطار الصقيع الجليدي",
    nameEn: "Glacial Frost Frame",
    description: "بلورات ثلجية جليدية كريستالية فائقة البريق تتألق في ملفك الشخصي.",
    icon: "❄️",
    priceInCoins: 70,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },

  // ==========================================
  // 3. TITLES (8 Items)
  // ==========================================
  {
    rewardId: "title_algorithm_expert",
    category: "title",
    name: "خبير الخوارزميات",
    nameEn: "Algorithm Expert",
    description: "لقب شرفي يظهر بجانب اسمك في التحديات والبروفايل للمتميزين في حل المسائل.",
    icon: "📜",
    priceInCoins: 35,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "title_bug_hunter",
    category: "title",
    name: "صائد الثغرات البرمجية",
    nameEn: "Bug Hunter",
    description: "لقب يُميز مهاراتك في اكتشاف وتصحيح أصعب الأخطاء البرمجية المعقدة.",
    icon: "🐛",
    priceInCoins: 40,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "title_future_architect",
    category: "title",
    name: "مهندس المستقبل",
    nameEn: "Future Architect",
    description: "أرقى الألقاب البرمجية لفرسان المستقبل وقادة الثورة الرقمية.",
    icon: "🏛️",
    priceInCoins: 90,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "title_python_legend",
    category: "title",
    name: "أسطورة بايثون",
    nameEn: "Python Legend",
    description: "لقب أسطوري يُمنح لمن تفوق في إتقان لغة بايثون ومكتباتها الحديثة.",
    icon: "🐉",
    priceInCoins: 80,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "title_silent_coder",
    category: "title",
    name: "فارس الكود الصامت",
    nameEn: "Silent Coder",
    description: "يكتب أقل عدد من الأسطر لإنتاج أعظم النتائج وأعلى كفاءة تشغيلية.",
    icon: "🥷",
    priceInCoins: 45,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "title_systems_architect",
    category: "title",
    name: "معماري النظم المتقدمة",
    nameEn: "Systems Architect",
    description: "مهندس البنى التحتية والتطبيقات عالية الحجم والاعتمادية.",
    icon: "🌐",
    priceInCoins: 70,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "title_hackathon_champ",
    category: "title",
    name: "بطل الهاكاثون",
    nameEn: "Hackathon Champion",
    description: "فارس المسابقات السريعة وحل التحديات البرمجية تحت الضغط العالي.",
    icon: "🏆",
    priceInCoins: 85,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "title_tech_lead",
    category: "title",
    name: "كبير المطورين",
    nameEn: "Tech Lead",
    description: "رمز القيادة البرمجية وتوجيه الفرق التقنية نحو التميز الكامل.",
    icon: "🎖️",
    priceInCoins: 100,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },

  // ==========================================
  // 4. NAME EFFECTS (8 Items)
  // ==========================================
  {
    rewardId: "effect_golden_shimmer",
    category: "name_effect",
    name: "تأثير اللمعان الذهبي للخط",
    nameEn: "Gold Shimmer Name",
    description: "تأثير حركة ضوئية براقة متحركة تمر على حروف اسمك في لوحة الشرف.",
    icon: "✨",
    priceInCoins: 55,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "effect_neon_pulse",
    category: "name_effect",
    name: "نبض النيون الفيروزي",
    nameEn: "Cyan Neon Pulse",
    description: "توهج نبضي فيروزي مهدئ يبرز اسمك بشكل مستقبلي في كافة التحديات.",
    icon: "💫",
    priceInCoins: 50,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "effect_aurora_borealis",
    category: "name_effect",
    name: "طيف الشفق القطبي",
    nameEn: "Aurora Borealis Glow",
    description: "ألوان شفق قطبي متحركة بسلاسة فائقة بين الأخضر الفسفوري والبنفسجي.",
    icon: "🌈",
    priceInCoins: 65,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "effect_inferno_flame",
    category: "name_effect",
    name: "لهب الجمر المتقد",
    nameEn: "Inferno Flame Glow",
    description: "توهج برتقالي ناري مع جزيئات متطايرة تمنح اسمك حضوراً حماسياً قوياً.",
    icon: "🔥",
    priceInCoins: 60,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "effect_electric_arc",
    category: "name_effect",
    name: "الصاعقة الكهربائية السايبر",
    nameEn: "Electric Arc Spark",
    description: "شرارات كهربائية تفاعلية تحيط بحروف اسمك بأسلوب تقني عالي الحداثة.",
    icon: "⚡",
    priceInCoins: 70,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "effect_royal_purple",
    category: "name_effect",
    name: "الهالة الملكية الأرجوانية",
    nameEn: "Royal Purple Aura",
    description: "إشعاع ملكي مخملي مهيب باللون البنفسجي الفاخر يعكس مكانتك المتقدمة.",
    icon: "🟣",
    priceInCoins: 75,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "effect_cosmic_nebula",
    category: "name_effect",
    name: "سديم الفضاء الكوني",
    nameEn: "Cosmic Nebula Shade",
    description: "ظلال ضبابية فضائية متعددة الأبعاد تأخذ اسمك إلى آفاق كونية بعيدة.",
    icon: "🌌",
    priceInCoins: 80,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },
  {
    rewardId: "effect_glitch_matrix",
    category: "name_effect",
    name: "تموج الجليتش السيبراني",
    nameEn: "Cyber Glitch Matrix",
    description: "تأثير تقني يحاكي شاشات الاختراق الرقمي بتموجات جليتش حركية مبهرة.",
    icon: "💻",
    priceInCoins: 85,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  }
];

export async function seedRewardCatalogIfNeeded() {
  const catRef = db.collection(REWARD_CATALOG_COLLECTION);
  const snap = await catRef.limit(1).get();
  if (snap.empty) {
    const batch = db.batch();
    for (const item of DEFAULT_STORE_ITEMS) {
      batch.set(catRef.doc(item.rewardId), item);
    }
    await batch.commit();
  }
}

// ==========================================
// 2. STORE CATALOG & INVENTORY QUERIES
// ==========================================

export async function getStoreCatalog() {
  await seedRewardCatalogIfNeeded();
  const snap = await db.collection(REWARD_CATALOG_COLLECTION)
    .where("activeStatus", "==", true)
    .get();

  return snap.docs.map(doc => doc.data() as RewardItem);
}

export async function getStudentInventory(studentUid: string) {
  const invSnap = await db.collection("student_inventory")
    .doc(studentUid)
    .collection("items")
    .get();

  return invSnap.docs.map(doc => doc.data() as StudentInventoryItem);
}

// ==========================================
// 3. ATOMIC PURCHASE TRANSACTION
// ==========================================

export async function purchaseStoreItem(options: {
  studentUid: string;
  rewardId: string;
}) {
  const { studentUid, rewardId } = options;
  await seedRewardCatalogIfNeeded();

  const itemRef = db.collection(REWARD_CATALOG_COLLECTION).doc(rewardId);
  const gamRef = db.collection(GAMIFICATION_COLLECTION).doc(studentUid);
  const invItemRef = db.collection("student_inventory").doc(studentUid).collection("items").doc(rewardId);
  const txRef = db.collection(REWARD_TRANSACTIONS_COLLECTION).doc(`tx_${studentUid}_${rewardId}_${Date.now()}`);

  let balanceAfter = 0;
  let purchasedItem: RewardItem;

  await db.runTransaction(async (t) => {
    // 1. Check item exists and is active
    const itemSnap = await t.get(itemRef);
    if (!itemSnap.exists) {
      throw new HttpsError("not-found", "العنصر المطلوب غير موجود في المتجر.");
    }
    purchasedItem = itemSnap.data() as RewardItem;
    if (!purchasedItem.activeStatus) {
      throw new HttpsError("failed-precondition", "هذا العنصر غير متاح للشراء حالياً.");
    }

    // 2. Check if student already owns the item
    const existingInvSnap = await t.get(invItemRef);
    if (existingInvSnap.exists) {
      throw new HttpsError("already-exists", "أنت تمتلك هذا العنصر بالفعل في حقيبتك!");
    }

    // 3. Check student coin balance
    const gamSnap = await t.get(gamRef);
    const gamData = gamSnap.exists ? gamSnap.data()! : {};
    const currentCoins = Number(gamData.coins || 0);

    if (currentCoins < purchasedItem.priceInCoins) {
      throw new HttpsError(
        "failed-precondition",
        `رصيدك من العملات (${currentCoins} 🪙) غير كافٍ لشراء هذا العنصر (${purchasedItem.priceInCoins} 🪙). قم بإنجاز المزيد من المهام البرمجية لكسب العملات!`
      );
    }

    // 4. Deduct coins atomically
    balanceAfter = currentCoins - purchasedItem.priceInCoins;
    t.set(gamRef, {
      coins: balanceAfter,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // 5. Add to student inventory
    const inventoryRecord: StudentInventoryItem = {
      rewardId: purchasedItem.rewardId,
      category: purchasedItem.category,
      purchasedAt: new Date().toISOString(),
      pricePaid: purchasedItem.priceInCoins,
      isEquipped: false
    };
    t.set(invItemRef, inventoryRecord);

    // 6. Record immutable transaction log
    const txRecord: RewardTransaction = {
      transactionId: txRef.id,
      studentUid,
      rewardId: purchasedItem.rewardId,
      itemCategory: purchasedItem.category,
      pricePaid: purchasedItem.priceInCoins,
      balanceBefore: currentCoins,
      balanceAfter,
      purchasedAt: new Date().toISOString(),
      status: "completed"
    };
    t.set(txRef, txRecord);
  });

  return {
    success: true,
    rewardId: purchasedItem!.rewardId,
    name: purchasedItem!.name,
    pricePaid: purchasedItem!.priceInCoins,
    balanceAfter,
    message: `تهانينا! تم شراء "${purchasedItem!.name}" بنجاح وإضافته إلى حقيبتك! 🛍️`
  };
}

// ==========================================
// 4. EQUIP / UNEQUIP COSMETIC PERKS
// ==========================================

export async function equipStoreItem(options: {
  studentUid: string;
  rewardId: string;
  category: "avatar" | "frame" | "title" | "name_effect" | "theme";
}) {
  const { studentUid, rewardId, category } = options;

  // 1. Verify ownership
  const invItemRef = db.collection("student_inventory").doc(studentUid).collection("items").doc(rewardId);
  const invSnap = await invItemRef.get();

  if (!invSnap.exists) {
    throw new HttpsError("permission-denied", "يجب شراء هذا العنصر أولاً قبل التمكن من ارتدائه.");
  }

  // 2. Update equipped items map in profile
  const gamRef = db.collection(GAMIFICATION_COLLECTION).doc(studentUid);
  const fieldKey = `equippedItems.${category === "avatar" ? "avatarId" : category === "frame" ? "frameId" : category === "title" ? "titleId" : category === "name_effect" ? "nameEffectId" : "themeId"}`;

  await gamRef.set({
    [fieldKey]: rewardId,
    updatedAt: new Date().toISOString()
  }, { merge: true });

  return {
    success: true,
    equippedRewardId: rewardId,
    category,
    message: "تم تفعيل العنصر وتحديث مظهر حسابك بنجاح! ✨"
  };
}

// ==========================================
// 5. POINTS TO COINS EXCHANGE CENTER
// ==========================================

export async function exchangePointsForCoins(options: {
  studentUid: string;
  pointsToDeduct: number;
  coinsToCredit: number;
}) {
  const { studentUid, pointsToDeduct, coinsToCredit } = options;

  if (pointsToDeduct <= 0 || coinsToCredit <= 0) {
    throw new HttpsError("invalid-argument", "عدد النقاط والعملات يجب أن يكون أكبر من الصفر.");
  }

  // Maximum coins credited cannot exceed pointsToDeduct (prevents arbitrage/exploits)
  if (coinsToCredit > pointsToDeduct) {
    throw new HttpsError("invalid-argument", "معدل التحويل غير صالح.");
  }

  const gamDocRef = db.collection(GAMIFICATION_COLLECTION).doc(studentUid);
  const advDocRef = db.collection(PYTHON_PROGRESS_COLLECTION).doc(studentUid);
  const txRef = db.collection(REWARD_TRANSACTIONS_COLLECTION).doc(`exchange_${studentUid}_${Date.now()}`);

  let balanceAfterCoins = 0;
  let balanceAfterPoints = 0;

  await db.runTransaction(async (t) => {
    const gamSnap = await t.get(gamDocRef);
    const advSnap = await t.get(advDocRef);

    if (!gamSnap.exists) {
      throw new HttpsError("not-found", "ملف الطالب الجيميفيكيشن غير موجود.");
    }
    const data = gamSnap.data()!;
    const advData = advSnap.exists ? advSnap.data()! : {};

    const currentPoints = Math.max(
      Number(data.xp || 0),
      Number(data.points || 0),
      Number(data.competitionPoints || 0),
      Number(advData.xp || 0)
    );
    const currentCoins = Number(data.coins || 0);

    if (currentPoints < pointsToDeduct) {
      throw new HttpsError(
        "failed-precondition",
        `رصيدك الحالي (${currentPoints} نقطة) لا يكفي لإتمام هذا التحويل (${pointsToDeduct} نقطة).`
      );
    }

    balanceAfterPoints = Math.max(0, currentPoints - pointsToDeduct);
    balanceAfterCoins = currentCoins + coinsToCredit;

    t.set(gamDocRef, {
      xp: balanceAfterPoints,
      points: balanceAfterPoints,
      competitionPoints: balanceAfterPoints,
      coins: balanceAfterCoins,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    if (advSnap.exists) {
      t.set(advDocRef, {
        xp: balanceAfterPoints,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

    t.set(txRef, {
      transactionId: txRef.id,
      studentUid,
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
    message: `تم تحويل ${pointsToDeduct} نقطة إلى ${coinsToCredit} عملة ذهبية بنجاح! 🪙`,
    balanceAfterPoints,
    balanceAfterCoins
  };
}

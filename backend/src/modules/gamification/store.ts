import { HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config/firebase";
import { RewardItem, StudentInventoryItem, RewardTransaction } from "./types";

const REWARD_CATALOG_COLLECTION = "reward_catalog";
const GAMIFICATION_COLLECTION = "student_gamification";
const REWARD_TRANSACTIONS_COLLECTION = "reward_transactions";

// ==========================================
// 1. DEFAULT VIRTUAL REWARD CATALOG SEEDING
// ==========================================

export const DEFAULT_STORE_ITEMS: RewardItem[] = [
  // AVATARS
  {
    rewardId: "avatar_cyber_hacker",
    category: "avatar",
    name: "سايبر هاكر الأسطوري",
    nameEn: "Cyber Hacker",
    description: "أفاتار المحارب السيبراني مع نظارات الواقع الافتراضي ودرع حماية متوهج.",
    image: "avatar-cyber-hacker.png",
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
    image: "avatar-python-master.png",
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
    description: "سيد حل الخوارزميات الخفي بخفة وسرعة البرق.",
    image: "avatar-tech-ninja.png",
    priceInCoins: 40,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },

  // PROFILE FRAMES
  {
    rewardId: "frame_golden_circuit",
    category: "frame",
    name: "إطار الدوائر الذهبية",
    nameEn: "Golden Circuit Frame",
    description: "إطار ذهبي فاخر بنبضات رقمية مضيئة يحيط بصورتك في لوحة المتصدرين.",
    image: "frame-golden-circuit.png",
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
    description: "إطار نيون سايبر أزرق متوهج بإشعاع المستقبل.",
    image: "frame-neon-cyan.png",
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
    description: "إطار زمردي ملكي مستوحى من هوية منصة اتحاد بشبابها.",
    image: "frame-emerald-champion.png",
    priceInCoins: 75,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },

  // SPECIAL HONORARY TITLES
  {
    rewardId: "title_algorithm_expert",
    category: "title",
    name: "خبير الخوارزميات",
    nameEn: "Algorithm Expert",
    description: "لقب شرفي يظهر بجانب اسمك في التحديات والبروفايل.",
    image: "title-algorithm-expert.png",
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
    description: "لقب يُميز مهاراتك في اكتشاف وتصحيح أصعب الأخطاء البرمجية.",
    image: "title-bug-hunter.png",
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
    description: "أرقى الألقاب البرمجية لفرسان المستقبل في علوم الحاسب.",
    image: "title-future-architect.png",
    priceInCoins: 90,
    availability: "in_stock",
    purchaseLimit: 1,
    activeStatus: true,
    createdAt: "2026-09-01T00:00:00.000Z"
  },

  // NAME EFFECTS
  {
    rewardId: "effect_golden_shimmer",
    category: "name_effect",
    name: "تأثير اللمعان الذهبي للخط",
    nameEn: "Gold Shimmer Name",
    description: "تأثير حركة ضوئية براقة متحركة تمر على حروف اسمك في لوحة الشرف.",
    image: "effect-golden-shimmer.png",
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
    nameEn: "Neon Pulse Glow",
    description: "توهج نبضي فيروزي مهدئ يبرز اسمك بشكل احترافي.",
    image: "effect-neon-pulse.png",
    priceInCoins: 50,
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

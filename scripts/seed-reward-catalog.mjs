// scripts/seed-reward-catalog.mjs
import { db } from "../backend/lib/config/firebase.js";

export const FULL_REWARD_CATALOG = [
  // ==========================================
  // 1. AVATARS (شخصيات الأفاتار) - 8 Items
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
  // 2. FRAMES (إطارات المتصدرين) - 8 Items
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
  // 3. TITLES (الألقاب الشرفية) - 8 Items
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
  // 4. NAME EFFECTS (تأثيرات الأسماء) - 8 Items
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

async function seedRewardCatalog() {
  console.log("=================================================");
  console.log("🛍️ SEEDING VIRTUAL REWARD CATALOG IN FIRESTORE 🛍️");
  console.log("=================================================");

  const batch = db.batch();
  for (const item of FULL_REWARD_CATALOG) {
    const docRef = db.collection("reward_catalog").doc(item.rewardId);
    batch.set(docRef, item, { merge: true });
  }

  await batch.commit();
  console.log(`✅ Successfully seeded ${FULL_REWARD_CATALOG.length} rewards into 'reward_catalog' collection!`);

  const countsByCategory = {};
  for (const item of FULL_REWARD_CATALOG) {
    countsByCategory[item.category] = (countsByCategory[item.category] || 0) + 1;
  }
  console.log("Category counts:", countsByCategory);
}

seedRewardCatalog()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  });

// scripts/build-adventure-expansion.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataFilePath = path.join(projectRoot, "src/features/python-adventure/python-adventure-data.js");

console.log("Reading python-adventure-data.js...");
let code = fs.readFileSync(dataFilePath, "utf8");

// 1. Update WORLDS_DATA: set levelsCount: 11 for worlds 1 to 8, and add world-9
const world9Definition = `  {
    id: "world-9",
    number: 9,
    title: "واحة القواميس والبيانات",
    englishTitle: "Dictionaries & Data Oasis",
    icon: "📚",
    concept: "القواميس المتقدمة Dictionaries والمجموعات Sets والبيانات المنظمة",
    description: "أتقن بناء هياكل البيانات المتقدمة: ربط المفاتيح بالقيم (Key-Value)، تصفية البيانات، وتجميع الإحصائيات الذكية.",
    color: "#6366f1",
    levelsCount: 11,
    requiredWorldId: "world-8"
  }`;

// Update worlds 1-8 levelsCount from 8 to 11
code = code.replace(/levelsCount:\s*8/g, "levelsCount: 11");

// Insert world-9 before closing bracket of WORLDS_DATA
if (!code.includes('"world-9"')) {
  code = code.replace(
    /(requiredWorldId:\s*"world-7"\s*\n\s*\}\n\];)/,
    `requiredWorldId: "world-7"\n  },\n${world9Definition}\n];`
  );
}

// 2. Add PYTHON_RANKS_LADDER and getStudentRankTitle export
const ranksLadderCode = `
export const PYTHON_RANKS_LADDER = [
  { minLevel: 100, title: "إله البرمجة والأنظمة ⚡👑", englishTitle: "Divine Code Overlord", color: "#eab308", badgeIcon: "👑" },
  { minLevel: 80, title: "المعلم الأعظم للغة بايثون 🌟", englishTitle: "Supreme Python Master", color: "#f59e0b", badgeIcon: "🌟" },
  { minLevel: 70, title: "أسطورة الذكاء البرمجي 🏆", englishTitle: "Mythic Python Sage", color: "#ef4444", badgeIcon: "🏆" },
  { minLevel: 60, title: "قاهر التحديات الكوني 🌌", englishTitle: "Cosmic Problem Solver", color: "#ec4899", badgeIcon: "🌌" },
  { minLevel: 50, title: "بطل بايثون الأسطوري 👑", englishTitle: "Legendary Grandmaster", color: "#8b5cf6", badgeIcon: "👑" },
  { minLevel: 45, title: "حكيم الأكواد البرمجية 🧙‍♂️", englishTitle: "Code Archmage", color: "#6366f1", badgeIcon: "🧙‍♂️" },
  { minLevel: 40, title: "خبير بايثون المعتمد 💎", englishTitle: "Python Specialist", color: "#06b6d4", badgeIcon: "💎" },
  { minLevel: 35, title: "محارب الأكواد النخبة ⚔️", englishTitle: "Elite Code Warrior", color: "#0ea5e9", badgeIcon: "⚔️" },
  { minLevel: 30, title: "مهندس نظم بايثون 🧠", englishTitle: "Systems Engineer", color: "#3b82f6", badgeIcon: "🧠" },
  { minLevel: 25, title: "سيد الشروط والحلقات ⚙️", englishTitle: "Logic Master", color: "#10b981", badgeIcon: "⚙️" },
  { minLevel: 20, title: "فارس بايثون 🛡️", englishTitle: "Python Knight", color: "#14b8a6", badgeIcon: "🛡️" },
  { minLevel: 15, title: "صياد الخوارزميات 🔍", englishTitle: "Algorithm Hunter", color: "#84cc16", badgeIcon: "🔍" },
  { minLevel: 10, title: "مبرمج صاعد 💻", englishTitle: "Rising Developer", color: "#eab308", badgeIcon: "💻" },
  { minLevel: 5, title: "مستكشف الكود ⚡", englishTitle: "Code Explorer", color: "#f97316", badgeIcon: "⚡" },
  { minLevel: 1, title: "مبتدئ بايثون 🥉", englishTitle: "Python Novice", color: "#94a3b8", badgeIcon: "🥉" }
];

export function getStudentRankTitle(level = 1) {
  const lvl = Math.max(1, Number(level) || 1);
  const found = PYTHON_RANKS_LADDER.find(r => lvl >= r.minLevel);
  return found || PYTHON_RANKS_LADDER[PYTHON_RANKS_LADDER.length - 1];
}
`;

if (!code.includes("PYTHON_RANKS_LADDER")) {
  code = code.replace(
    /(export const ACHIEVEMENTS_DATA = \[)/,
    `${ranksLadderCode}\n$1`
  );
}

// 3. Connect world transition nextChallengeId for level-8s:
// world-1-level-8 next should be world-1-level-9 (not world-2-level-1)
code = code.replace(
  /("world-1-level-8":[\s\S]*?nextChallengeId:\s*)"world-2-level-1"/,
  '$1"world-1-level-9"'
);
code = code.replace(
  /("world-2-level-8":[\s\S]*?nextChallengeId:\s*)"world-3-level-1"/,
  '$1"world-2-level-9"'
);
code = code.replace(
  /("world-3-level-8":[\s\S]*?nextChallengeId:\s*)"world-4-level-1"/,
  '$1"world-3-level-9"'
);
code = code.replace(
  /("world-4-level-8":[\s\S]*?nextChallengeId:\s*)"world-5-level-1"/,
  '$1"world-4-level-9"'
);
code = code.replace(
  /("world-5-level-8":[\s\S]*?nextChallengeId:\s*)"world-6-level-1"/,
  '$1"world-5-level-9"'
);
code = code.replace(
  /("world-6-level-8":[\s\S]*?nextChallengeId:\s*)"world-7-level-1"/,
  '$1"world-6-level-9"'
);
code = code.replace(
  /("world-7-level-8":[\s\S]*?nextChallengeId:\s*)"world-8-level-1"/,
  '$1"world-7-level-9"'
);
code = code.replace(
  /("world-8-level-8":[\s\S]*?nextChallengeId:\s*)null/,
  '$1"world-8-level-9"'
);

fs.writeFileSync(dataFilePath, code, "utf8");
console.log("Base updates applied to python-adventure-data.js.");

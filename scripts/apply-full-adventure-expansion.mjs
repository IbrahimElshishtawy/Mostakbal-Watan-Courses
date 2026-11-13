// scripts/apply-full-adventure-expansion.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataFilePath = path.join(projectRoot, "src/features/python-adventure/python-adventure-data.js");
const serviceFilePath = path.join(projectRoot, "src/features/python-adventure/python-adventure.service.js");

console.log("Applying complete Python Adventure Expansion...");

// Load all new challenge definitions
const expansionModule = await import("./adventure-expansion-definitions.mjs");
const { NEW_EXPANSION_CHALLENGES, WORLD_9_OBJECT, PYTHON_RANKS_CODE } = expansionModule;

let dataCode = fs.readFileSync(dataFilePath, "utf8");

// 1. Update WORLDS_DATA
dataCode = dataCode.replace(/levelsCount:\s*8/g, "levelsCount: 11");

if (!dataCode.includes('"world-9"')) {
  dataCode = dataCode.replace(
    /(requiredWorldId:\s*"world-7"\s*\n\s*\}\n\];)/,
    `requiredWorldId: "world-7"\n  },\n${WORLD_9_OBJECT}\n];`
  );
}

// 2. Add PYTHON_RANKS_LADDER and getStudentRankTitle
if (!dataCode.includes("PYTHON_RANKS_LADDER")) {
  dataCode = dataCode.replace(
    /(export const ACHIEVEMENTS_DATA = \[)/,
    `${PYTHON_RANKS_CODE}\n$1`
  );
}

// 3. Connect world transition links for level-8s to level-9s
dataCode = dataCode.replace(
  /("world-1-level-8":[\s\S]*?nextChallengeId:\s*)"world-2-level-1"/,
  '$1"world-1-level-9"'
);
dataCode = dataCode.replace(
  /("world-2-level-8":[\s\S]*?nextChallengeId:\s*)"world-3-level-1"/,
  '$1"world-2-level-9"'
);
dataCode = dataCode.replace(
  /("world-3-level-8":[\s\S]*?nextChallengeId:\s*)"world-4-level-1"/,
  '$1"world-3-level-9"'
);
dataCode = dataCode.replace(
  /("world-4-level-8":[\s\S]*?nextChallengeId:\s*)"world-5-level-1"/,
  '$1"world-4-level-9"'
);
dataCode = dataCode.replace(
  /("world-5-level-8":[\s\S]*?nextChallengeId:\s*)"world-6-level-1"/,
  '$1"world-5-level-9"'
);
dataCode = dataCode.replace(
  /("world-6-level-8":[\s\S]*?nextChallengeId:\s*)"world-7-level-1"/,
  '$1"world-6-level-9"'
);
dataCode = dataCode.replace(
  /("world-7-level-8":[\s\S]*?nextChallengeId:\s*)"world-8-level-1"/,
  '$1"world-7-level-9"'
);
dataCode = dataCode.replace(
  /("world-8-level-8":[\s\S]*?nextChallengeId:\s*)null/,
  '$1"world-8-level-9"'
);

// 4. Insert new challenges into CHALLENGES_CLIENT_DATA before daily challenges
const insertionMarker = '// DAILY CHALLENGES POOL (Fully integrated & persistent)';
if (!dataCode.includes('"world-9-level-1"')) {
  let serializedChallenges = "";
  for (const [id, ch] of Object.entries(NEW_EXPANSION_CHALLENGES)) {
    serializedChallenges += `  "${id}": ${JSON.stringify(ch, null, 4)},\n\n`;
  }
  dataCode = dataCode.replace(
    insertionMarker,
    `// ==========================================\n  // EXPANDED ADVANCED LEVELS (WORLDS 1-9 & BONUS)\n  // ==========================================\n${serializedChallenges}  ${insertionMarker}`
  );
}

fs.writeFileSync(dataFilePath, dataCode, "utf8");
console.log("✅ python-adventure-data.js expanded successfully!");

// 5. Update python-adventure.service.js to dynamically support all worlds up to WORLDS_DATA.length (9 worlds)
let serviceCode = fs.readFileSync(serviceFilePath, "utf8");
serviceCode = serviceCode.replace(
  /for \(let wNum = 1; wNum <= 8; wNum\+\+\)/g,
  "for (let wNum = 1; wNum <= WORLDS_DATA.length; wNum++)"
);
serviceCode = serviceCode.replace(
  /if \(wNum < 8\)/g,
  "if (wNum < WORLDS_DATA.length)"
);
fs.writeFileSync(serviceFilePath, serviceCode, "utf8");
console.log("✅ python-adventure.service.js updated to dynamic worlds count!");

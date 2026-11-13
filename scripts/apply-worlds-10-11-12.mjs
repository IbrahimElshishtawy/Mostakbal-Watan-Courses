// scripts/apply-worlds-10-11-12.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const dataFilePath = path.join(projectRoot, "src/features/python-adventure/python-adventure-data.js");

console.log("Applying Worlds 10, 11, 12 to python-adventure-data.js...");

const expansion = await import("./adventure-expansion-definitions.mjs");
const { WORLDS_10_11_12_LIST, ALL_NEW_EXPANSION_CHALLENGES } = expansion;

let dataCode = fs.readFileSync(dataFilePath, "utf8");

// 1. Add Worlds 10, 11, 12 to WORLDS_DATA if not present
if (!dataCode.includes('"world-10"')) {
  let worldsString = "";
  for (const w of WORLDS_10_11_12_LIST) {
    worldsString += `  ${JSON.stringify(w, null, 2).replace(/\n/g, "\n  ")},\n`;
  }
  // Insert before closing bracket of WORLDS_DATA
  dataCode = dataCode.replace(
    /(id:\s*"world-9"[\s\S]*?requiredWorldId:\s*"world-8"\s*\n\s*\}\n)(\];)/,
    `$1,\n${worldsString.trimEnd()}\n$2`
  );
}

// 2. Link world-9-level-11 to world-10-level-1
dataCode = dataCode.replace(
  /("world-9-level-11":[\s\S]*?unlocksWorldId:\s*)null([\s\S]*?nextChallengeId:\s*)null/,
  '$1"world-10"$2"world-10-level-1"'
);

// 3. Insert all new challenges into CHALLENGES_CLIENT_DATA
const marker = '// DAILY CHALLENGES POOL (Fully integrated & persistent)';
if (!dataCode.includes('"world-10-level-1"')) {
  let serialized = "";
  for (const [id, ch] of Object.entries(ALL_NEW_EXPANSION_CHALLENGES)) {
    serialized += `  "${id}": ${JSON.stringify(ch, null, 4)},\n\n`;
  }
  dataCode = dataCode.replace(
    marker,
    `// ==========================================\n  // PROBLEM SOLVING & INTERVIEW EXPANSION WORLDS (10, 11, 12)\n  // ==========================================\n${serialized}  ${marker}`
  );
}

fs.writeFileSync(dataFilePath, dataCode, "utf8");
console.log("Successfully injected Worlds 10, 11, 12 into python-adventure-data.js!");

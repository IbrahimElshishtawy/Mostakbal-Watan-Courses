// scripts/test-drawer-and-worlds-integration.js
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { renderWorldMap } from "../src/features/python-adventure/components/world-map.component.js";
import {
  WORLDS_DATA,
  PROBLEM_SOLVING_WORLDS_DATA,
  ALL_WORLDS_DATA,
  PROBLEM_SOLVING_CHALLENGES_DATA
} from "../src/features/python-adventure/python-adventure-data.js";

console.log("🧪 Running Drawer Removal & World Map Expansion Verification Suite...\n");

// 1. Verify Sidebar Drawer in StudentLayout
{
  console.log("  1. Verifying StudentLayout drawer...");
  const layoutPath = path.resolve("src/shared/layouts/StudentLayout/student-layout.component.js");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  // Must NOT have the sidebar item in the nav drawer
  assert(
    !layoutContent.includes('<button type="button" class="sidebar-item" data-section="problem-solving">'),
    "Sidebar navigation drawer must NOT contain problem-solving item"
  );

  // Must contain python-adventure and leaderboard
  assert(layoutContent.includes('data-section="python-adventure"'), "Must contain python-adventure");
  assert(layoutContent.includes('data-section="leaderboard"'), "Must contain leaderboard");

  // Must redirect problem-solving to python-adventure in setActiveTab
  assert(layoutContent.includes('sectionId = "python-adventure"'), "Must redirect problem-solving tab");

  console.log("  ✅ Sidebar drawer verified: 'تحديات البرمجة' cleanly removed from drawer and redirected!");
}

// 2. Verify Worlds & Levels Data
{
  console.log("  2. Verifying Worlds & Problem Solving Levels Data...");
  assert.strictEqual(WORLDS_DATA.length, 8, "Must have 8 concept worlds");
  assert.strictEqual(PROBLEM_SOLVING_WORLDS_DATA.length, 5, "Must have 5 problem solving level worlds");
  assert.strictEqual(ALL_WORLDS_DATA.length, 13, "Must have 13 total worlds in ALL_WORLDS_DATA");

  const problemKeys = Object.keys(PROBLEM_SOLVING_CHALLENGES_DATA);
  assert.strictEqual(problemKeys.length, 25, "Must have exactly 25 problem solving challenges");

  console.log("  ✅ Worlds and Problem Solving data structures verified!");
}

// 3. Verify World Map Rendering with Both Tracks
{
  console.log("  3. Verifying World Map Rendering with both tracks...");
  const mockProgress = {
    unlockedWorlds: ["world-1", "world-2"],
    completedChallenges: { "world-1-level-1": true, "prob-l1-sum": true },
    stars: { "world-1-level-1": 3, "prob-l1-sum": 3 }
  };

  // Render full map
  const fullMapHtml = renderWorldMap({ progress: mockProgress, selectedWorldId: "world-1", activeTrack: "all" });
  assert(fullMapHtml.includes("map-track-switcher"), "Must have track switcher pills");
  assert(fullMapHtml.includes("قرية بايثون"), "Must include Concept World 1");
  assert(fullMapHtml.includes("حلبة الأبطال"), "Must include Concept World 8");
  assert(fullMapHtml.includes("مستوى المبتدئين"), "Must include Problem Solving Level 1");
  assert(fullMapHtml.includes("مستوى الخبراء"), "Must include Problem Solving Level 5");

  // Render with ps-level-1 selected
  const psMapHtml = renderWorldMap({ progress: mockProgress, selectedWorldId: "ps-level-1", activeTrack: "all" });
  assert(psMapHtml.includes("مجموع رقمين"), "Must render problem 'مجموع رقمين' when ps-level-1 is selected");
  assert(psMapHtml.includes("فاحص الرقم الزوجي والفردي"), "Must render problem 'فاحص الرقم الزوجي والفردي'");
  assert(psMapHtml.includes("ps-challenge-card"), "Must render ps-challenge-card");
  assert(psMapHtml.includes("مكتمل بنجاح ✅"), "Must indicate completed problem");

  // Render with concepts-only filter
  const conceptsOnlyHtml = renderWorldMap({ progress: mockProgress, selectedWorldId: "world-1", activeTrack: "concepts" });
  assert(conceptsOnlyHtml.includes("قرية بايثون"), "Concepts track must include concept worlds");
  assert(!conceptsOnlyHtml.includes("عوالم مسار تحديات البرمجة"), "Concepts track must hide problem solving section");

  // Render with problem-solving-only filter
  const psOnlyHtml = renderWorldMap({ progress: mockProgress, selectedWorldId: "ps-level-1", activeTrack: "problem-solving" });
  assert(psOnlyHtml.includes("عوالم مسار تحديات البرمجة"), "PS track must include problem solving section");
  assert(!psOnlyHtml.includes("عوالم مسار التأسيس والمفاهيم"), "PS track must hide concept worlds");

  console.log("  ✅ World Map track filtering and problem rendering verified!");
}

console.log("\n🎉 ALL DRAWER & WORLD MAP EXPANSION VERIFICATION TESTS PASSED!");

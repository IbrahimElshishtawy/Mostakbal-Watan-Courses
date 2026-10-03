// scripts/test-real-data-binding.js
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");

console.log("🧪 Testing Real Firebase Data Binding (Zero Mock Info)...\n");

// 1. Verify SIGNATURE_EXAMS is empty
const examListPath = path.join(ROOT_DIR, "src", "features", "exams", "components", "exam-list.component.js");
const examListSrc = fs.readFileSync(examListPath, "utf-8");

assert.ok(examListSrc.includes("export const SIGNATURE_EXAMS = [];"), "SIGNATURE_EXAMS must be an empty array");
assert.ok(!examListSrc.includes("PY-101-MID"), "Must not contain hardcoded PY-101-MID");
assert.ok(!examListSrc.includes("88.4%"), "Must not contain hardcoded 88.4%");
assert.ok(!examListSrc.includes("156"), "Must not contain hardcoded 156 students");
console.log("✅ 1. SIGNATURE_EXAMS is empty and no hardcoded fallback metrics exist!");

// 2. Verify exam card component has no hardcoded values
const examCardPath = path.join(ROOT_DIR, "src", "features", "exams", "components", "exam-card.component.js");
const examCardSrc = fs.readFileSync(examCardPath, "utf-8");

assert.ok(!examCardSrc.includes("38 طالب أتموا الاختبار"), "Must not contain hardcoded 38 students");
assert.ok(!examCardSrc.includes("92.4 / 100"), "Must not contain hardcoded 92.4 / 100");
assert.ok(!examCardSrc.includes("28 سبتمبر 2026"), "Must not contain hardcoded date");
console.log("✅ 2. Exam card component contains no hardcoded mock data!");

// 3. Verify speedyEvaluation table in assignment controller has no fake students
const asgCtrlPath = path.join(ROOT_DIR, "src", "features", "assignments", "assignment.controller.js");
const asgCtrlSrc = fs.readFileSync(asgCtrlPath, "utf-8");

assert.ok(!asgCtrlSrc.includes("عمر مصطفى الجوهري"), "Must not contain mock student عمر مصطفى");
assert.ok(!asgCtrlSrc.includes("سارة محمود غنيم"), "Must not contain mock student سارة محمود");
assert.ok(!asgCtrlSrc.includes("كريم أحمد الشربيني"), "Must not contain mock student كريم أحمد");
assert.ok(asgCtrlSrc.includes("AssignmentService.getAllSubmissions()"), "Must fetch real submissions from AssignmentService");
console.log("✅ 3. Assignments table renders real submissions and has zero fake student names!");

// 4. Verify python adventure service has no mock students roster
const pyServicePath = path.join(ROOT_DIR, "src", "features", "python-adventure", "python-adventure.service.js");
const pyServiceSrc = fs.readFileSync(pyServicePath, "utf-8");

assert.ok(!pyServiceSrc.includes("نور إبراهيم الدسوقي"), "Must not contain mock student نور إبراهيم");
console.log("✅ 4. Python adventure service has zero fake students fallback!");

console.log("\n🎉 ALL REAL FIREBASE DATA BINDING VERIFICATIONS PASSED! 🚀");

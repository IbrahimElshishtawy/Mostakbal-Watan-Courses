# Deployment and Operations Guide: Gamification Platform Upgrade

## Overview
This document outlines the operational deployment process, environment prerequisites, configuration settings, index definitions, and verification steps for deploying the Gamification, Adaptive Learning, and Code Analytics system.

---

## 1. Prerequisites & Environment

### Node.js & Tooling
- Node.js: `v18.x` or `v20.x` LTS
- npm: `v9.x` or higher
- Firebase CLI: `firebase-tools v13.x+` (authenticated via `firebase login` or `FIREBASE_TOKEN`)
- TypeScript: `v5.x`

### Target Firebase Project
- Production Project ID: `etihad-bshababha` (or configured staging project)
- Region: `europe-west3` (or default Cloud Functions region configured in `firebase.json`)

---

## 2. Pre-Deployment Verification

Always run local build and validation suites before initiating deployment:

```bash
# 1. Compile backend Cloud Functions v2 TypeScript code
cd backend
npm run build
cd ..

# 2. Run master regression and platform verification
node scripts/verify-all-master-fixes.mjs

# 3. Run dedicated gamification acceptance test suite
node scripts/test-gamification-suite.mjs
```

All suites must exit with status `0`.

---

## 3. Firestore Rules & Composite Indexes

### A. Deploy Security Rules
Security rules in `firestore.rules` protect all 27 domain collections including gamification ledgers and question banks.

```bash
firebase deploy --only firestore:rules
```

### B. Deploy Composite Indexes
Deploy index definitions from `firestore.indexes.json`:

```bash
firebase deploy --only firestore:indexes
```

Key required indexes:
- `daily_challenges`: `studentId ASC, createdAt DESC`
- `student_inventory`: `studentId ASC, itemType ASC`
- `code_snapshots`: `studentId ASC, taskId ASC, timestamp DESC`
- `code_executions`: `studentId ASC, taskId ASC, timestamp DESC`
- `xp_ledger`: `studentId ASC, timestamp DESC`
- `coin_ledger`: `studentId ASC, timestamp DESC`
- `season_archives`: `seasonId ASC, finalXP DESC`
- `audit_logs`: `adminId ASC, timestamp DESC`

---

## 4. Backend Cloud Functions Deployment

Cloud Functions v2 are located in `./backend` and exposed as HTTPS Callables:

```bash
firebase deploy --only functions
```

Deployed Callable Functions:
1. `gamification_getActiveSeason`
2. `gamification_getSeasonResetPreview`
3. `gamification_executeSeasonReset`
4. `gamification_getDailyChallenge`
5. `gamification_submitChallengeAnswer`
6. `gamification_saveCodeSnapshot`
7. `gamification_recordCodeExecution`
8. `gamification_evaluateCodingTask`
9. `gamification_getStoreCatalog`
10. `gamification_getStudentInventory`
11. `gamification_purchaseStoreItem`
12. `gamification_equipStoreItem`
13. `gamification_getLeaderboard`
14. `gamification_getTeacherOverview`
15. `gamification_getTeacherStudentReport`
16. `gamification_getTeacherCodeHistory`
17. `gamification_getTeacherDailySummary`

---

## 5. Frontend & Hosting Deployment

The platform is a modular Vanilla JS single-page architecture hosted on Firebase Hosting:

```bash
firebase deploy --only hosting
```

Static assets deployed:
- `pages/student.html`: Student gamification hub, 6-question challenge, inventory, store, progress gauge.
- `pages/teacher.html`: Teacher code analytics dashboard and code history diff viewer.
- `pages/admin.html`: Season reset management, dry-run preview, and audit trail.
- `src/features/gamification/*`: Controllers, components, and services.
- `src/styles/gamification.css`: Modern Dark Glassmorphic styling.

---

## 6. Post-Deployment Smoke Test Protocol

1. **Student Verification:**
   - Log in as a student user.
   - Navigate to the **"التحديات والألعاب"** (Gamification) tab.
   - Verify 6 adaptive questions are rendered with 24h countdown.
   - Verify correct answers grant XP, update Level gauge, and show celebratory animation.
   - Verify virtual store items load and show correct coin prices.
2. **Teacher Verification:**
   - Log in as an instructor.
   - Open **"تحليلات الأكواد والبرمجة"** (Code Analytics).
   - Check student telemetry, test run success ratios, and code snapshots.
3. **Admin Verification:**
   - Log in as an administrator.
   - Open **"إدارة المواسم واقتصاد النقاط"**.
   - Verify Active Season status.
   - Click "معاينة الجدولة (Dry-Run Preview)" and verify affected student count is calculated safely without altering student data.

---

## 7. Rollback & Disaster Recovery Procedures

- **Firestore Rules Rollback**:
  Use Firebase console to revert to the previous rules release or deploy the Git checkpoint:
  ```bash
  git checkout checkpoint/pre-gamification-upgrade -- firestore.rules
  firebase deploy --only firestore:rules
  ```
- **Hosting Rollback**:
  In Firebase Console > Hosting, select previous deployment and click "Rollback".
- **Season Restoration**:
  In the event an accidental season reset occurs, restore student XP, coins, and levels directly from the immutable `season_archives` collection corresponding to the `executionId`.

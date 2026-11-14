# System Architecture: Educational Gamification & Code Analytics

## 1. System Topology & Data Flow

```mermaid
flowchart TD
    subgraph Client["Frontend Client (Vanilla ESM & Skulpt)"]
        UI_Student["Student Gamification Hub\n(Daily Challenges, Store, Leaderboard)"]
        UI_IDE["In-Browser Python IDE\n(Skulpt Execution + Snapshots)"]
        UI_Teacher["Teacher Analytics Dashboard\n(Code History, Reports, Telemetry)"]
        UI_Admin["Admin Center\n(Season Control, Economy Config, Audit)"]
    end

    subgraph Security["Firebase Security & App Check Boundary"]
        FSR["Firestore Security Rules\n(Role & Ownership Enforcement)"]
        AuthClaims["Firebase Auth Custom Claims\n(student / teacher / admin)"]
    end

    subgraph CloudFunctions["Serverless Backend (Cloud Functions v2)"]
        CF_Challenges["Daily Challenge & Adaptive Selector"]
        CF_Economy["XP & Coins Authoritative Ledgers"]
        CF_Store["Atomic Store & Inventory Engine"]
        CF_Analytics["Code Activity & Snapshot Aggregator"]
        CF_Season["Season Lifecycle & Archival Engine"]
    end

    subgraph Storage["Cloud Firestore Database"]
        DB_Gamification[("student_gamification")]
        DB_Challenges[("daily_challenges")]
        DB_QuestionBank[("question_bank")]
        DB_CodeActivity[("code_activities & snapshots")]
        DB_Store[("reward_catalog & student_inventory")]
        DB_Ledgers[("xp_ledger & coin_ledger")]
        DB_Leaderboard[("leaderboard_snapshots")]
        DB_Seasons[("seasons & season_archives")]
        DB_Audit[("audit_logs")]
    end

    UI_Student -->|Direct Read (Cached)| FSR --> DB_Gamification
    UI_Student -->|Submit Answer / Action| CF_Challenges
    UI_IDE -->|Record Snapshot / Run| CF_Analytics
    UI_Student -->|Purchase Reward| CF_Store
    UI_Teacher -->|Inspect Student Reports| CF_Analytics
    UI_Admin -->|Trigger Season Reset / Config| CF_Season

    CF_Challenges -->|Transactional Update| DB_Challenges & DB_Ledgers & DB_Gamification
    CF_Economy -->|Atomic Ledgers| DB_Ledgers & DB_Gamification
    CF_Store -->|Atomic Transaction| DB_Store & DB_Ledgers & DB_Gamification
    CF_Analytics -->|Batch Writes| DB_CodeActivity
    CF_Season -->|Idempotent Archival| DB_Seasons & DB_Audit & DB_Gamification
```

---

## 2. Component Design & Responsibility Mapping

### 2.1 Backend Architecture (`backend/src/modules/gamification/`)
1. **`season.ts`**:
   - Manages active season state, dry-run previews, archival, and idempotent student reset operations.
2. **`adaptive-questions.ts`**:
   - Manages question bank, difficulty profiling, 24h cycle expiration, answer grading, and XP awards.
3. **`economy.ts`**:
   - Dual-ledger transactions (`xp_ledger`, `coin_ledger`), level progression curve, server-authoritative balance enforcement.
4. **`code-analytics.ts`**:
   - Code snapshot retention, test-run recording, syntax/runtime telemetry, time/space complexity metadata.
5. **`store.ts`**:
   - Virtual reward catalog, atomic purchasing with coin deduction, inventory management, cosmetic equipment.
6. **`leaderboard.ts`**:
   - Scoped multi-period rankings (Daily, Weekly, Monthly, All-Time), caching and tie-breaking algorithms.
7. **`teacher-reports.ts`**:
   - Aggregated student coding metrics, snapshot diffing, error frequency, daily/weekly class summaries.

### 2.2 Frontend Architecture (`src/features/gamification/`)
1. **`gamification.service.js`**:
   - Client service interfacing with Cloud Functions v2 and Firestore fallbacks.
2. **`gamification.controller.js`**:
   - Orchestrates views, state management, and tab switching across student/teacher/admin screens.
3. **`components/`**:
   - `daily-challenge.component.js`: 6-question quiz view with timer, progress bar, instant feedback.
   - `reward-store.component.js`: Gaming-inspired item showcase, live coin balance, instant purchase modal.
   - `student-inventory.component.js`: Equipped titles, frames, avatars, and badge showcase.
   - `student-progress.component.js`: Level progress bar, XP telemetry, educational badge roadmap.
   - `how-to-play-modal.component.js`: Onboarding modal explaining XP, Coins, Difficulty, and Rules.
   - `teacher-code-analytics.component.js`: Teacher analytics dashboard with student list, code diff viewer, telemetry.
   - `admin-gamification-center.component.js`: Season reset manager (with dry-run preview), reward config, question bank editor.

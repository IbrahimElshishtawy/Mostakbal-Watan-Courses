# Technical Specification: Student Gamification, Adaptive Learning & Code Analytics Platform Upgrade

## 1. Executive Summary & Objectives
This specification defines the complete architecture, data models, business logic, security constraints, and user experience for upgrading the **Etihad Beshababha (اتحاد بشبابها)** Educational Platform.

The upgrade introduces:
1. **Controlled Season & Gamification Lifecycle Management (Fresh Start)** with non-destructive archival and strict data protection.
2. **Adaptive Daily Questions Engine** delivering exactly six personalized questions per 24-hour cycle with dynamic difficulty calibration.
3. **Dual Economy (XP & Coins)**:
   - **XP (Experience Points)**: Educational progression, non-spendable, determines Level 1 to 10 and leaderboard ranking.
   - **Coins (Virtual Currency)**: Earned strictly through verified, successful programming task evaluations, spendable in the Virtual Reward Store.
4. **Code Activity Tracking & Analytics**: Integration with the existing in-browser Python IDE (Skulpt engine) capturing snapshots, test executions, syntax/runtime errors, algorithmic complexity, and anti-cheat indicators.
5. **Teacher & Supervisor Code Analytics Dashboard**: Real-time student progress, code history, snapshot comparison, error telemetry, daily/weekly aggregate reports.
6. **Dual-Category Badges & Achievements**:
   - **Educational Badges**: Earned through merit, consistency, and mastery (cannot be bought).
   - **Cosmetic Badges & Customization**: Avatars, frames, titles, name effects (purchased with Coins).
7. **Virtual-Only Reward Store & Inventory**: 100% virtual cosmetic perks with atomic Firestore transaction purchasing.
8. **Multi-Period Leaderboard System**: Daily, Weekly, Monthly, and All-Time rankings driven by XP and educational task tie-breakers.
9. **Administrative Control Center & Audit Logging**: Dynamic configuration of reward rates, difficulty distributions, level thresholds, and dry-run reset preview.

---

## 2. Existing Platform Architecture Audit

### 2.1 Technology Stack
- **Frontend**: Vanilla ECMAScript Modules (ESM), CSS Variables Design System, Semantic HTML5, RTL-first Arabic UX with full LTR support.
- **Python Runtime**: Client-side Skulpt Engine (`Sk.importMainWithBody`, `<stdin>`, standard library emulation) augmented with `PythonCodeAnalyzer` for static complexity and anti-cheat verification.
- **Backend / Serverless**: Cloud Functions v2 for Firebase (`firebase-functions/v2`, `europe-west1`), Node.js 18/20 runtime with TypeScript (`strict: true`).
- **Database & Security**: Cloud Firestore with granular, role-based Firestore Security Rules (`rules_version = '2'`).
- **Authentication**: Firebase Authentication with custom claims (`role: 'student' | 'teacher' | 'admin'`) and legacy email suffix fallback.

### 2.2 Preservation of Critical Existing Features
The implementation guarantees zero regression or tampering with:
- `students` collection and profile attributes (`nationalId`, `phone`, `group`).
- `exams` and `results` grading systems.
- `assignments` and `submissions` workflows.
- `attendance_sessions` and `records`.
- `python_adventure_progress` and existing 20-world curriculum.

---

## 3. Data Protection & Fresh Start / Season Reset

### 3.1 Immutable Data Invariants
Under NO circumstances will a season reset modify or delete:
- Student user accounts or Firebase Authentication records.
- Examination records, essay submissions, or scores.
- Academic assignments, uploaded solution files, or teacher grades.
- Attendance records across previous sessions.
- Historical code submissions (`coding_submissions`).

### 3.2 Controlled Gamification Reset Architecture
- **Season Metadata**:
  - `seasonId`: Format `season_YYYY_NN` (e.g., `season_2026_01`).
  - `status`: `'active' | 'archived' | 'upcoming'`.
  - `startedAt`, `endedAt`, `archivedAt`.
- **Reset Payload & Archival**:
  - Prior to reset, the system creates a materialized archive document in `season_archives/{seasonId}_{studentUid}` capturing:
    - Final XP, Level, Coins, Badges, Challenges Completed, and Leaderboard Rank.
  - Active gamification profile in `student_gamification/{studentUid}` is reset to:
    - `level = 1`, `xp = 0`, `coins = 0`, `currentStreak = 1`, `activeSeasonId = nextSeasonId`.
- **Administrative Guardrails**:
  - Admin authentication and role verification.
  - Mandatory **Dry-Run Preview** returning affected counts without applying mutations.
  - Idempotency token (`resetExecutionId`) preventing duplicate execution.
  - Complete write to `audit_logs` tracking Admin UID, timestamp, IP, and summary statistics.

---

## 4. Adaptive Daily Questions Engine

### 4.1 Challenge Rules
- **Cycle Duration**: Exactly 24 hours from issuance timestamp (`expiresAt = issuedAt + 24 * 3600 * 1000`).
- **Quota**: Exactly 6 official questions per challenge cycle.
- **Deterministic Assignment**: The selected 6 `questionIds` are persisted in Firestore immediately. Page refresh or network reconnection resumes the exact active set.
- **Single-Attempt Semantics**: An answer submitted for question $i \in \{1..6\}$ is final; no answer re-submission is allowed.
- **Anti-Leakage**: The correct option and explanation are NEVER returned to the client before answer submission.

### 4.2 Adaptive Calibration
Questions are selected based on the student's historical accuracy ($\text{Accuracy} = \frac{\text{Correct}}{\text{Total}}$):
1. **Beginner** ($\text{Accuracy} < 60\%$ or new student): 4 Easy, 2 Medium, 0 Hard.
2. **Intermediate** ($60\% \le \text{Accuracy} \le 85\%$): 2 Easy, 3 Medium, 1 Hard.
3. **Advanced** ($\text{Accuracy} > 85\%$): 1 Easy, 3 Medium, 2 Hard.

### 4.3 Reward Schedule
- **Easy Correct**: 5 XP
- **Medium Correct**: 10 XP
- **Hard Correct**: 15 XP
- **Full Completion Bonus**: 10 XP (awarded when all 6 questions are submitted, regardless of final score)
- **Incorrect Answer**: 0 XP

---

## 5. XP and Coins Economy

### 5.1 Experience Points (XP)
- Educational merit metric.
- Non-spendable, non-transferable.
- Determines Level 1–10:
  - Level 1 (Beginner): 0 XP
  - Level 2 (Explorer): 100 XP
  - Level 3 (Learner): 250 XP
  - Level 4 (Developer): 500 XP
  - Level 5 (Advanced): 850 XP
  - Level 6 (Expert): 1300 XP
  - Level 7 (Master): 1900 XP
  - Level 8 (Champion): 2700 XP
  - Level 9 (Elite): 3700 XP
  - Level 10 (Legend): 5000 XP
- All balance modifications recorded in immutable `xp_ledger`.

### 5.2 Coins (Virtual Currency)
- Earned exclusively through verified programming tasks evaluated successfully.
- Baseline Rewards:
  - Simple Task: 10 Coins
  - Medium Task: 25 Coins
  - Hard / Algorithmic Task: 50 Coins
  - Capstone / Full Project: 100 Coins
- Deductions occur solely in the Virtual Reward Store.
- Transactions are executed inside atomic Firestore transactions with balance validation ($Balance \ge Price$).
- All transactions logged in immutable `coin_ledger`.

---

## 6. Code Activity Tracking & Analytics
Integrating with the existing in-browser IDE:
- **Snapshots**: Automatically created on explicit save (`code_snapshots`), manual test runs (throttled to 1 snapshot per 30 seconds), and final task submission.
- **Telemetry**: Execution duration (ms), Skulpt stdout/stderr, syntax errors, failed test cases, memory warnings.
- **Algorithmic Profiling**:
  - Time Complexity: $O(1)$, $O(\log N)$, $O(N)$, $O(N \log N)$, $O(N^2)$, $O(2^N)$.
  - Space Complexity: $O(1)$, $O(N)$.
  - Anti-Cheat Index: Detection of hardcoded return values and print bypassing.
  - Clean Code Index (0–100) based on naming conventions and modularity.

---

## 7. Badges and Virtual Store Architecture

### 7.1 Educational Badges (Earned via Merit)
- `first_step`: Complete first daily question or coding task.
- `perfect_day`: Score 6/6 on a daily challenge cycle.
- `code_master`: Complete 10 coding challenges.
- `problem_solver`: Solve an Advanced or $O(N)$ optimized algorithmic task.
- `consistency`: Maintain a 7-day daily activity streak.
- `rising_developer`: Reach Level 4 (500 XP).
- `champion`: Reach Top 3 in any active leaderboard.

### 7.2 Cosmetic Perks & Store Inventory
- **Avatars**: Cyber Hacker, PyKnight, Tech Wizard, Desert Nomad.
- **Profile Frames**: Golden Circuit, Neon Pulse, Emerald Shield, Cosmic Aura.
- **Special Titles**: خبير الخوارزميات (Algorithm Expert), صائد الثغرات (Bug Hunter), مهندس المستقبل (Future Architect).
- **Name Effects**: Gold Shimmer, Neon Glow, Cyber Wave.

---

## 8. Multi-Period Leaderboards
1. **Daily Leaderboard**: XP earned since 00:00 UTC today.
2. **Weekly Leaderboard**: XP earned since Monday 00:00 UTC.
3. **Monthly Leaderboard**: XP earned since the 1st of the active month.
4. **All-Time Leaderboard**: Cumulative season XP.
- **Tie-Breaker Hierarchy**:
  1. Primary: Higher XP.
  2. Secondary: Greater count of verified coding tasks completed.
  3. Tertiary: Earlier achievement timestamp.

# Security Specification: Gamification, Adaptive Learning & Code Analytics

## 1. Security Principles & Architecture

The educational platform implements a multi-tier defense-in-depth model:
1. **Zero-Trust Client Policy**:
   - Frontend clients are completely untrusted for balance management, XP accrual, coin deductions, test grading, and badge awards.
   - All economy balance mutations execute inside atomic server-side transactions with double-entry ledgers (`xp_ledger` and `coin_ledger`).
2. **Server-Authoritative Evaluation**:
   - Daily question correct answers and explanations are stripped (`Anti-Leakage Filter`) before sending challenge payloads to the student.
   - Scoring and XP awards are calculated server-side based on the authoritative `question_bank` records.
   - Coding task coins are awarded only upon verified test case completion; repeat submissions for already-rewarded tasks yield 0 additional coins.
3. **Role-Based Access Control (RBAC)**:
   - **Student**:
     - Read own gamification profile, daily challenges, code snapshots, executions, inventory, and ledger entries.
     - Public read of sanitized leaderboards and store catalog.
     - Strictly forbidden from modifying XP, Coins, or inspecting private reports of other students.
   - **Teacher / Supervisor**:
     - Authorized access to classroom analytics, student progress reports, code version diffs, and execution telemetry.
     - Read-only access to economic ledgers; forbidden from arbitrary balance inflation or season destruction.
   - **Administrator**:
     - Full management of seasons, question bank, store catalog, difficulty distributions, and economic configurations.
     - Exclusive execution authority for season resets guarded by dry-run previews and confirmation keys.

---

## 2. Firestore Security Rules Matrix

| Collection | Student Read | Student Write | Teacher Read | Teacher Write | Admin Read/Write |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `users` | Own document | Denied | All | Denied | Read & Write |
| `students` | Own document | Denied | All | Write | Read & Write |
| `student_gamification` | Authenticated | Own profile (equipped items) | All | Write | Read & Write |
| `daily_challenges` | Own challenges | Own answers | All | Denied | Read & Write |
| `question_bank` | Read active | Denied | Read all | Write | Read & Write |
| `reward_catalog` | Read active | Denied | Read all | Denied | Read & Write |
| `student_inventory` | Own items | Own items | All | Denied | Read & Write |
| `reward_transactions` | Own transactions | Own create | All | Denied | Read & Write |
| `code_activities` | Own activities | Own create/update | All | Denied | Read & Write |
| `code_snapshots` | Own snapshots | Own create | All | Denied | Read & Write |
| `code_executions` | Own executions | Own create | All | Denied | Read & Write |
| `xp_ledger` | Own entries | Denied | All | Denied | Read & Write |
| `coin_ledger` | Own entries | Denied | All | Denied | Read & Write |
| `seasons` | Authenticated | Denied | Authenticated | Denied | Read & Write |
| `season_archives` | Own archives | Denied | All | Denied | Read & Write |
| `audit_logs` | Denied | Denied | Denied | Denied | Read & Write |

---

## 3. Anti-Cheat & Malicious Code Execution Protection

### 3.1 Client-Side Execution Boundary
- Student Python execution takes place in the client's browser sandbox using Skulpt (`Sk.importMainWithBody`).
- Privileged Cloud Functions and Firebase Admin environments **NEVER** execute raw, un-sandboxed student code.
- This eliminates server-side Remote Code Execution (RCE), filesystem traversal, and environment credential extraction.

### 3.2 Algorithmic Verification & Anti-Bypass
- Static code analysis (`PythonCodeAnalyzer`) parses the AST and code lines before awarding coins or marks:
  - Detects hardcoded `print(...)` statements mimicking test case expected outputs.
  - Verifies loop constructs, algorithmic operations, and function signatures.
  - Enforces time and space complexity thresholds.

---

## 4. Idempotency & Replay Protection

1. **Daily Question Submissions**:
   - The cycle ID and question ID uniquely form the transaction key.
   - An answer for question $i$ cannot be submitted more than once.
2. **XP & Coin Ledgers**:
   - Deterministic document IDs: `xp_{studentUid}_{source}_{sourceId}` and `coin_{studentUid}_{source}_{sourceId}`.
   - If an event is re-sent or repeated, the transaction verifies the existing document and yields an idempotent no-op.
3. **Season Reset Guardrails**:
   - Requires explicit administrative confirmation key (`CONFIRM_SEASON_RESET_2026`).
   - Prevents running reset on an already-archived season.
   - Generates immutable audit logs with admin UID, timestamp, and affected record count.

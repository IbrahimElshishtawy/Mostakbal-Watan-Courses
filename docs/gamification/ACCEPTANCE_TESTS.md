# Acceptance Tests Specification: Gamification & Adaptive Learning

## Overview
This document specifies the complete acceptance testing criteria, test scenarios, and verification results for the Etihad Beshababha Gamification, Adaptive Learning, Code Analytics, and Virtual Economy platform upgrade.

All 36 dedicated acceptance test cases have been implemented and validated in `scripts/test-gamification-suite.mjs` alongside 1,343 automated master regression tests in `scripts/verify-all-master-fixes.mjs`.

---

## Test Suites Matrix

| Suite ID | Domain | Test Cases | Status |
|---|---|:---:|:---:|
| **TC-01** | XP Economy & 10-Milestone Level Thresholds | 11 | **PASSED** |
| **TC-02** | Coins Economy & Verified Task Rewards | 7 | **PASSED** |
| **TC-03** | Adaptive Daily Questions & Anti-Leakage | 5 | **PASSED** |
| **TC-04** | 24-Hour Cycle & Single-Attempt Submission | 3 | **PASSED** |
| **TC-05** | Code Activity, Snapshots & Telemetry | 2 | **PASSED** |
| **TC-06** | Store Catalog, Inventory & Equip System | 3 | **PASSED** |
| **TC-07** | Deterministic Multi-Period Leaderboard | 3 | **PASSED** |
| **TC-08** | Season Reset, Archival & Data Protection | 2 | **PASSED** |

---

## Detailed Test Scenarios

### Suite 1: XP Economy & Level Progression (TC-01)
- **TC-01.1**: Verifies 0 XP yields Level 1 (Beginner) with 0% progress.
- **TC-01.2**: Verifies 99 XP maintains Level 1 with 99% progress toward Level 2.
- **TC-01.3 to TC-01.10**: Verifies all level progression transitions:
  - Level 1: 0 XP (Beginner)
  - Level 2: 100 XP (Explorer)
  - Level 3: 250 XP (Learner)
  - Level 4: 500 XP (Developer)
  - Level 5: 850 XP (Advanced)
  - Level 6: 1300 XP (Expert)
  - Level 7: 1900 XP (Master)
  - Level 8: 2700 XP (Champion)
  - Level 9: 3700 XP (Elite)
  - Level 10: 5000+ XP (Legend)
- **TC-01.11**: Verifies Level 10 caps progression at 100% with `nextLevelXP = null`.

### Suite 2: Coins Economy & Verified Task Rewards (TC-02)
- **TC-02.1**: Simple task evaluates to exactly +10 Coins.
- **TC-02.2**: Medium task evaluates to exactly +25 Coins.
- **TC-02.3**: Difficult task evaluates to exactly +50 Coins.
- **TC-02.4**: Complete capstone project evaluates to exactly +100 Coins.
- **TC-02.5**: Opening code editor awards 0 coins (server-authoritative rule).
- **TC-02.6**: Failed code execution awards 0 coins.
- **TC-02.7**: Duplicate task submission is detected and blocked; duplicate coin award prevented.

### Suite 3: Adaptive Daily Questions & Anti-Leakage (TC-03)
- **TC-03.1**: Beginner proficiency returns exactly 6 questions (4 Easy, 2 Medium, 0 Hard).
- **TC-03.2**: Intermediate proficiency returns exactly 6 questions (2 Easy, 3 Medium, 1 Hard).
- **TC-03.3**: Advanced proficiency returns exactly 6 questions (1 Easy, 3 Medium, 2 Hard).
- **TC-03.4**: Anti-leakage sanitizer strips `correctAnswer` and `explanation` from payload sent to student.
- **TC-03.5**: Answer submission awards XP strictly on correct answers:
  - Easy: 5 XP
  - Medium: 10 XP
  - Hard: 15 XP
  - 6/6 Perfect Day Bonus: 10 XP

### Suite 4: 24-Hour Cycle & Single-Attempt Rules (TC-04)
- **TC-04.1**: Cycle expiration timestamp is set to `createdAt + 86,400,000 ms`.
- **TC-04.2**: Submitting an answer after cycle expiration is rejected with `CHALLENGE_EXPIRED`.
- **TC-04.3**: Submitting a second answer to the same question ID in one cycle is rejected with `ALREADY_ANSWERED`.

### Suite 5: Code Activity, Snapshots & Telemetry (TC-05)
- **TC-05.1**: Code snapshot saves student ID, task ID, language, LOC, character count, and timestamp without capturing individual keystrokes.
- **TC-05.2**: Code execution records test case outcomes, syntax errors, and runtime duration in milliseconds.

### Suite 6: Virtual Rewards Store & Inventory (TC-06)
- **TC-06.1**: Insufficient coin balance aborts purchase without modifying user balance.
- **TC-06.2**: Valid purchase deducts coins atomically via Firestore transaction and adds item to `student_inventory`.
- **TC-06.3**: Equipping cosmetic items enforces single active item per slot (avatar, frame, title, name_effect).

### Suite 7: Deterministic Multi-Period Leaderboard (TC-07)
- **TC-07.1**: Primary sort order is XP descending.
- **TC-07.2**: Secondary sort order breaks ties by completed tasks descending.
- **TC-07.3**: Tertiary sort order breaks ties by earliest timestamp achieved ascending.

### Suite 8: Season Reset & Academic Data Protection (TC-08)
- **TC-08.1**: Dry-run preview calculates affected student count and total XP/coins without modifying Firestore documents.
- **TC-08.2**: Season reset creates immutable snapshot in `season_archives`, resets gamification attributes (Level=1, XP=0, Coins=0), and guarantees student accounts, grades, exam submissions, and attendance records are never deleted.

---

## Execution Command
```bash
node scripts/test-gamification-suite.mjs
```

### Result:
```
=======================================================
🎉 GAMIFICATION TEST SUITE FINISHED: 36 PASSED, 0 FAILED
=======================================================
```

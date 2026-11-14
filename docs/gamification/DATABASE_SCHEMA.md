# Firestore Database Schema: Gamification, Adaptive Learning & Code Analytics

## 1. Schema Definitions & Document Models

### 1.1 `student_gamification/{studentUid}`
Primary live gamification profile for an active student.
```typescript
interface StudentGamificationDocument {
  studentUid: string;            // Primary Key: Auth UID
  studentName: string;           // Cached display name
  studentPhone: string;          // Phone number for identity resolution
  group: string;                 // Track / Cohort identifier (e.g., '01-Delta')
  activeSeasonId: string;        // Current active season (e.g., 'season_2026_01')
  level: number;                 // Current Level (1 - 10)
  xp: number;                    // Total season Experience Points
  coins: number;                 // Total spendable virtual Coins
  tasksCompleted: number;        // Count of successfully solved coding tasks
  challengesCompleted: number;   // Count of completed daily question cycles
  currentStreak: number;         // Consecutive daily active streak
  lastActiveDate: string;        // YYYY-MM-DD
  equippedItems: {
    avatarId?: string;           // Selected custom avatar ID
    frameId?: string;            // Selected profile frame ID
    titleId?: string;            // Selected honorary title ID
    nameEffectId?: string;       // Selected name animation effect ID
    themeId?: string;            // Selected color theme ID
  };
  badges: string[];              // Array of unlocked badge IDs
  createdAt: string;             // ISO-8601
  updatedAt: string;             // ISO-8601
}
```

---

### 1.2 `seasons/{seasonId}`
Configuration and status of educational seasons.
```typescript
interface SeasonDocument {
  seasonId: string;              // e.g., 'season_2026_01'
  title: string;                 // e.g., 'الموسم البرمجي الأول 2026'
  status: 'active' | 'archived' | 'upcoming';
  startDate: string;             // ISO-8601
  endDate: string;               // ISO-8601
  xpMultiplier: number;          // Default: 1.0
  archivedAt?: string;
  totalParticipants?: number;
  totalXpAwarded?: number;
  totalCoinsAwarded?: number;
}
```

---

### 1.3 `season_archives/{seasonId}_{studentUid}`
Materialized archive of previous season results created before any reset.
```typescript
interface SeasonArchiveDocument {
  archiveId: string;             // e.g., 'season_2026_01_UID123'
  seasonId: string;
  studentUid: string;
  studentName: string;
  group: string;
  finalLevel: number;
  finalXp: number;
  finalCoins: number;
  finalRank: number;
  unlockedBadges: string[];
  tasksCompleted: number;
  challengesCompleted: number;
  archivedAt: string;
  resetExecutionId: string;
}
```

---

### 1.4 `daily_challenges/{challengeId}`
Document ID format: `{studentUid}_{YYYY-MM-DD}` or `{studentUid}_{cycleTimestamp}`.
```typescript
interface DailyChallengeDocument {
  challengeId: string;           // Unique cycle identifier
  studentUid: string;            // Owner student UID
  seasonId: string;              // Active season
  cycleDate: string;             // YYYY-MM-DD
  difficultyTier: 'beginner' | 'intermediate' | 'advanced';
  questionIds: string[];         // Exactly 6 question IDs
  questions: Array<{
    id: string;
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    questionText: string;
    answerOptions: string[];
    xpReward: number;
  }>;                            // Sanitized: NO correct answers or explanations
  answers: Record<string, {      // Keyed by question ID
    selectedOption: number;
    isCorrect: boolean;
    xpEarned: number;
    submittedAt: string;
  }>;
  status: 'active' | 'completed' | 'expired';
  issuedAt: string;              // ISO-8601
  expiresAt: string;             // ISO-8601 (issuedAt + 24 hours)
  completedAt?: string;
  totalScore: number;            // 0 - 6
  totalXpEarned: number;
  bonusXpAwarded: boolean;
}
```

---

### 1.5 `question_bank/{questionId}`
Universal repository of academic and programming questions.
```typescript
interface QuestionBankDocument {
  questionId: string;            // Unique question ID
  topic: string;                 // e.g., 'loops', 'variables', 'functions', 'lists'
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  answerOptions: string[];       // 4 multiple-choice options
  correctAnswer: number;         // 0 - 3 (Index)
  explanation: string;           // Detailed Arabic explanation
  activeStatus: boolean;
  xpReward: number;              // Easy: 5, Medium: 10, Hard: 15
  createdAt: string;
  updatedAt: string;
}
```

---

### 1.6 `code_activities/{activityId}`
High-level programming session for a coding task.
```typescript
interface CodeActivityDocument {
  activityId: string;            // e.g., 'act_{studentUid}_{taskId}_{timestamp}'
  studentUid: string;
  taskId: string;
  programmingLanguage: 'python';
  startedAt: string;
  lastSnapshotAt: string;
  timeSpentSeconds: number;
  executionCount: number;
  errorCount: number;
  successfulRuns: number;
  status: 'in_progress' | 'passed' | 'submitted';
  coinsAwarded: boolean;
}
```

---

### 1.7 `code_snapshots/{snapshotId}`
Version history of student code during task engagement.
```typescript
interface CodeSnapshotDocument {
  snapshotId: string;            // e.g., 'snap_{activityId}_{version}'
  activityId: string;
  studentUid: string;
  taskId: string;
  version: number;
  trigger: 'manual_save' | 'test_run' | 'submission';
  code: string;
  timestamp: string;
  executionOutcome?: {
    passed: boolean;
    runtimeMs: number;
    syntaxError?: string;
    runtimeError?: string;
  };
}
```

---

### 1.8 `code_executions/{executionId}`
Fine-grained telemetry of in-browser or sandbox runs.
```typescript
interface CodeExecutionDocument {
  executionId: string;
  studentUid: string;
  taskId: string;
  timestamp: string;
  durationMs: number;
  status: 'success' | 'syntax_error' | 'runtime_error' | 'test_failure';
  outputSample: string;
  errorMessage?: string;
  complexity?: {
    time: string;                // e.g., 'O(N)'
    space: string;               // e.g., 'O(1)'
    antiCheatPassed: boolean;
    cleanCodeScore: number;
  };
}
```

---

### 1.9 `reward_catalog/{rewardId}`
Items purchasable in the Virtual Reward Store.
```typescript
interface RewardItemDocument {
  rewardId: string;              // Unique identifier
  category: 'avatar' | 'frame' | 'title' | 'name_effect' | 'theme';
  name: string;                  // Display name in Arabic
  nameEn: string;                // Display name in English
  description: string;
  image: string;                 // Asset URL or CSS class
  priceInCoins: number;          // Cost in Coins
  availability: 'in_stock' | 'limited' | 'exclusive';
  purchaseLimit: number;         // Default: 1 (Owned permanently)
  activeStatus: boolean;
  createdAt: string;
}
```

---

### 1.10 `student_inventory/{studentUid}/items/{rewardId}`
Subcollection of owned virtual items.
```typescript
interface StudentInventoryItem {
  rewardId: string;
  category: 'avatar' | 'frame' | 'title' | 'name_effect' | 'theme';
  purchasedAt: string;
  pricePaid: number;
  isEquipped: boolean;
}
```

---

### 1.11 `reward_transactions/{transactionId}`
Immutable audit trail for all store purchases.
```typescript
interface RewardTransactionDocument {
  transactionId: string;         // e.g., 'tx_store_{studentUid}_{timestamp}'
  studentUid: string;
  rewardId: string;
  itemCategory: string;
  pricePaid: number;
  balanceBefore: number;
  balanceAfter: number;
  purchasedAt: string;
  status: 'completed' | 'refunded';
}
```

---

### 1.12 `xp_ledger/{entryId}` & `coin_ledger/{entryId}`
Double-entry immutable ledgers for balances.
```typescript
interface LedgerEntryDocument {
  entryId: string;               // e.g., 'xp_{studentUid}_{source}_{sourceId}'
  studentUid: string;
  seasonId: string;
  amount: number;                // Positive for credits, negative for debits
  source: 'daily_challenge' | 'coding_task' | 'bonus' | 'store_purchase' | 'season_reset';
  sourceId: string;
  reason: string;
  balanceAfter: number;
  timestamp: string;
}
```

---

### 1.13 `audit_logs/{logId}`
Administrative actions and system events.
```typescript
interface AuditLogDocument {
  logId: string;
  adminUid: string;
  adminEmail: string;
  action: 'season_reset' | 'economy_update' | 'difficulty_config' | 'question_bank_edit';
  details: Record<string, any>;
  ipAddress?: string;
  timestamp: string;
}
```

---

## 2. Required Firestore Indexes (`firestore.indexes.json`)
```json
{
  "indexes": [
    {
      "collectionGroup": "daily_challenges",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "studentUid", "order": "ASCENDING" },
        { "fieldPath": "issuedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "student_gamification",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "activeSeasonId", "order": "ASCENDING" },
        { "fieldPath": "xp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "code_activities",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "studentUid", "order": "ASCENDING" },
        { "fieldPath": "startedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "code_snapshots",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "taskId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    }
  ]
}
```

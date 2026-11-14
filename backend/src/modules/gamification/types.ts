import { z } from "zod";

// ==========================================
// 1. DATA MODELS & INTERFACES
// ==========================================

export interface StudentGamificationProfile {
  studentUid: string;
  studentName: string;
  studentPhone: string;
  group: string;
  activeSeasonId?: string;
  xp: number;
  coins?: number;
  level: number;
  competitionPoints: number;
  rank: number;
  previousRank: number;
  rankChange: number; // positive = advanced (e.g. +4), negative = dropped
  achievements: string[];
  currentStreak: number;
  challengesCompleted: number;
  tasksCompleted?: number;
  competitionsWon: number;
  competitionsParticipated: number;
  equippedItems?: {
    avatarId?: string;
    frameId?: string;
    titleId?: string;
    nameEffectId?: string;
    themeId?: string;
  };
  rankingHistory: Array<{
    date: string;
    rank: number;
    points: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export type PointSourceType =
  | "python_adventure"
  | "daily_challenge"
  | "boss_challenge"
  | "exam"
  | "assignment"
  | "competition_award"
  | "attendance"
  | "coding_task";

export interface PointLedgerEntry {
  id: string; // e.g. ledger_${studentUid}_${sourceType}_${sourceId}
  studentUid: string;
  sourceType: PointSourceType;
  sourceId: string;
  points: number;
  reason: string;
  createdAt: string;
  competitionId: string | null;
  metadata?: Record<string, any>;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  category: "python" | "general" | "weekly" | "monthly" | "special";
  status: "upcoming" | "active" | "ended" | "results_published";
  startAt: string; // ISO date
  endAt: string; // ISO date
  rules: string[];
  scoringPolicy: {
    easyPoints: number;
    mediumPoints: number;
    hardPoints: number;
    bossPoints: number;
    dailyPoints: number;
    specialRules?: string;
  };
  rewards: {
    firstPlacePoints: number;
    secondPlacePoints: number;
    thirdPlacePoints: number;
    top10Points: number;
    participantPoints: number;
    badgeName?: string;
  };
  participantsCount: number;
  featured?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  studentUid: string;
  studentName: string;
  studentPhoneMasked: string;
  group: string;
  competitionPoints: number;
  level: number;
  xp: number;
  coins?: number;
  avatarInitial: string;
  isCurrentUser?: boolean;
  solvedCount?: number;
  streak?: number;
  levelTitle?: string;
  badge?: string;
  equippedFrame?: string;
  equippedTitle?: string;
}

export type NotificationType =
  | "rank_up"
  | "rank_down"
  | "competition_started"
  | "competition_ending"
  | "competition_ended"
  | "competition_winner"
  | "top_10_entry"
  | "achievement_unlocked"
  | "points_earned"
  | "coins_earned"
  | "reward_purchased"
  | "level_up";

export interface InAppNotification {
  id: string;
  recipientUid: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionType: "ranking" | "competition" | "achievements" | "exam" | "adventure" | "store" | null;
  actionId: string | null;
  metadata?: Record<string, any>;
}

export interface RankingAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  pointsReward: number;
  category?: "educational" | "cosmetic";
}

// ----------------------------------------------------
// Upgraded Gamification Entities
// ----------------------------------------------------

export interface Season {
  seasonId: string;
  title: string;
  status: "active" | "archived" | "upcoming";
  startDate: string;
  endDate: string;
  xpMultiplier: number;
  archivedAt?: string;
  totalParticipants?: number;
  totalXpAwarded?: number;
  totalCoinsAwarded?: number;
}

export interface SeasonArchive {
  archiveId: string;
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

export interface QuestionBankItem {
  questionId: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questionText: string;
  answerOptions: string[];
  correctAnswer: number;
  explanation: string;
  activeStatus: boolean;
  xpReward: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyChallenge {
  challengeId: string;
  studentUid: string;
  seasonId: string;
  cycleDate: string;
  difficultyTier: "beginner" | "intermediate" | "advanced";
  questionIds: string[];
  questions: Array<{
    id: string;
    topic: string;
    difficulty: "easy" | "medium" | "hard";
    questionText: string;
    answerOptions: string[];
    xpReward: number;
  }>;
  answers: Record<string, {
    selectedOption: number;
    isCorrect: boolean;
    xpEarned: number;
    submittedAt: string;
  }>;
  status: "active" | "completed" | "expired";
  issuedAt: string;
  expiresAt: string;
  completedAt?: string;
  totalScore: number;
  totalXpEarned: number;
  bonusXpAwarded: boolean;
}

export interface CodeActivity {
  activityId: string;
  studentUid: string;
  taskId: string;
  programmingLanguage: "python";
  startedAt: string;
  lastSnapshotAt: string;
  timeSpentSeconds: number;
  executionCount: number;
  errorCount: number;
  successfulRuns: number;
  status: "in_progress" | "passed" | "submitted";
  coinsAwarded: boolean;
}

export interface CodeSnapshot {
  snapshotId: string;
  activityId: string;
  studentUid: string;
  taskId: string;
  version: number;
  trigger: "manual_save" | "test_run" | "submission";
  code: string;
  timestamp: string;
  executionOutcome?: {
    passed: boolean;
    runtimeMs?: number;
    syntaxError?: string;
    runtimeError?: string;
  };
}

export interface CodeExecution {
  executionId: string;
  studentUid: string;
  taskId: string;
  timestamp: string;
  durationMs: number;
  status: "success" | "syntax_error" | "runtime_error" | "test_failure";
  outputSample: string;
  errorMessage?: string;
  complexity?: {
    time?: string;
    space?: string;
    antiCheatPassed?: boolean;
    cleanCodeScore?: number;
  };
}

export interface RewardItem {
  rewardId: string;
  category: "avatar" | "frame" | "title" | "name_effect" | "theme";
  name: string;
  nameEn: string;
  description: string;
  image: string;
  priceInCoins: number;
  availability: "in_stock" | "limited" | "exclusive";
  purchaseLimit: number;
  activeStatus: boolean;
  createdAt: string;
}

export interface StudentInventoryItem {
  rewardId: string;
  category: "avatar" | "frame" | "title" | "name_effect" | "theme";
  purchasedAt: string;
  pricePaid: number;
  isEquipped: boolean;
}

export interface RewardTransaction {
  transactionId: string;
  studentUid: string;
  rewardId: string;
  itemCategory: string;
  pricePaid: number;
  balanceBefore: number;
  balanceAfter: number;
  purchasedAt: string;
  status: "completed" | "refunded";
}

export interface XpLedgerEntry {
  entryId: string;
  studentUid: string;
  seasonId: string;
  amount: number;
  source: "daily_challenge" | "coding_task" | "bonus" | "season_reset";
  sourceId: string;
  reason: string;
  balanceAfter: number;
  timestamp: string;
}

export interface CoinLedgerEntry {
  entryId: string;
  studentUid: string;
  seasonId: string;
  amount: number;
  source: "coding_task" | "store_purchase" | "season_reset";
  sourceId: string;
  reason: string;
  balanceAfter: number;
  timestamp: string;
}

// ==========================================
// 2. ZOD VALIDATION SCHEMAS
// ==========================================

export const GetLeaderboardSchema = z.object({
  scope: z.enum(["group", "course", "global"]).default("group"),
  period: z.enum(["daily", "weekly", "monthly", "all_time"]).default("all_time"),
  limit: z.number().int().min(1).max(100).default(20),
  competitionId: z.string().optional()
});

export const GetCompetitionsSchema = z.object({
  filter: z.enum(["all", "active", "ended", "upcoming"]).default("all")
});

export const GetCompetitionDetailsSchema = z.object({
  competitionId: z.string().min(1, "معرف المسابقة مطلوب")
});

export const JoinCompetitionSchema = z.object({
  competitionId: z.string().min(1, "معرف المسابقة مطلوب")
});

export const GetNotificationsSchema = z.object({
  limit: z.number().int().min(1).max(50).default(20),
  unreadOnly: z.boolean().default(false)
});

export const MarkNotificationReadSchema = z.object({
  notificationId: z.string().min(1, "معرف الإشعار مطلوب")
});

export const CreateDailyChallengeSchema = z.object({
  studentUid: z.string().optional()
});

export const SubmitDailyAnswerSchema = z.object({
  challengeId: z.string().min(1, "معرف التحدي مطلوب"),
  questionId: z.string().min(1, "معرف السؤال مطلوب"),
  selectedOption: z.number().int().min(0).max(3)
});

export const SaveCodeSnapshotSchema = z.object({
  taskId: z.string().min(1, "معرف المهمة مطلوب"),
  code: z.string(),
  trigger: z.enum(["manual_save", "test_run", "submission"]).default("manual_save"),
  executionOutcome: z.object({
    passed: z.boolean(),
    runtimeMs: z.number().optional(),
    syntaxError: z.string().optional(),
    runtimeError: z.string().optional()
  }).optional()
});

export const RecordCodeExecutionSchema = z.object({
  taskId: z.string().min(1, "معرف المهمة مطلوب"),
  code: z.string(),
  durationMs: z.number().default(0),
  status: z.enum(["success", "syntax_error", "runtime_error", "test_failure"]),
  outputSample: z.string().default(""),
  errorMessage: z.string().optional(),
  complexity: z.object({
    time: z.string().optional(),
    space: z.string().optional(),
    antiCheatPassed: z.boolean().optional(),
    cleanCodeScore: z.number().optional()
  }).optional()
});

export const EvaluateCodingTaskSchema = z.object({
  taskId: z.string().min(1, "معرف المهمة مطلوب"),
  taskDifficulty: z.enum(["simple", "medium", "difficult", "project"]).default("simple"),
  passed: z.boolean(),
  code: z.string()
});

export const PurchaseRewardSchema = z.object({
  rewardId: z.string().min(1, "معرف العنصر مطلوب")
});

export const EquipRewardSchema = z.object({
  rewardId: z.string().min(1, "معرف العنصر مطلوب"),
  category: z.enum(["avatar", "frame", "title", "name_effect", "theme"])
});

export const SeasonResetPreviewSchema = z.object({
  targetSeasonId: z.string().min(1, "معرف الموسم مطلوب")
});

export const ExecuteSeasonResetSchema = z.object({
  targetSeasonId: z.string().min(1, "معرف الموسم مطلوب"),
  confirmKey: z.string().min(6, "رمز التأكيد مطلوب"),
  nextSeasonId: z.string().min(1, "معرف الموسم القادم مطلوب")
});

export const GetStudentReportSchema = z.object({
  studentUid: z.string().min(1, "معرف الطالب مطلوب")
});

export const GetCodeHistorySchema = z.object({
  studentUid: z.string().min(1, "معرف الطالب مطلوب"),
  taskId: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(30)
});

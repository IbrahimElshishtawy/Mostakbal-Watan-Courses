import { CallableRequest, HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config/firebase";
import { getAuthenticatedUser, requireRole } from "../../middleware/auth";
import { validateInput } from "../../middleware/validator";
import {
  GetLeaderboardSchema,
  GetCompetitionsSchema,
  GetCompetitionDetailsSchema,
  JoinCompetitionSchema,
  GetNotificationsSchema,
  MarkNotificationReadSchema,
  CreateDailyChallengeSchema,
  SubmitDailyAnswerSchema,
  SaveCodeSnapshotSchema,
  RecordCodeExecutionSchema,
  EvaluateCodingTaskSchema,
  PurchaseRewardSchema,
  EquipRewardSchema,
  SeasonResetPreviewSchema,
  ExecuteSeasonResetSchema,
  GetStudentReportSchema,
  GetCodeHistorySchema,
  StudentGamificationProfile
} from "./types";
import { getScopedLeaderboard } from "./leaderboard";
import { getCompetitionsList, getCompetitionDetails, joinCompetition } from "./competitions";
import {
  getStudentNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
} from "./notifications";
import {
  createOrGetActiveDailyChallenge,
  submitDailyAnswer
} from "./adaptive-questions";
import {
  saveCodeSnapshot,
  recordCodeExecution,
  evaluateCodingTaskAndAwardCoins
} from "./code-analytics";
import {
  getStoreCatalog,
  getStudentInventory,
  purchaseStoreItem,
  equipStoreItem
} from "./store";
import {
  getActiveSeason,
  getSeasonResetPreview,
  executeSeasonReset
} from "./season";
import {
  getStudentsOverview,
  getStudentReport,
  getCodeHistory,
  getDailyReports,
  getWeeklyReports
} from "./teacher-reports";

const GAMIFICATION_COLLECTION = "student_gamification";
const STUDENTS_COLLECTION = "students";
const PYTHON_PROGRESS_COLLECTION = "python_adventure_progress";

/**
 * 1. Get Student Gamification Profile
 */
export async function getStudentGamificationProfileHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const docRef = db.collection(GAMIFICATION_COLLECTION).doc(user.uid);
  const snap = await docRef.get();

  const today = new Date().toISOString().split("T")[0];

  // Fetch Python adventure progress to sync XP/Level
  let adventureXp = 0;
  let adventureLevel = 1;
  let challengesCompleted = 0;
  const adventureSnap = await db.collection(PYTHON_PROGRESS_COLLECTION).doc(user.uid).get();
  if (adventureSnap.exists) {
    const advData = adventureSnap.data()!;
    adventureXp = Number(advData.xp || 0);
    adventureLevel = Number(advData.level || 1);
    challengesCompleted = Object.keys(advData.completedChallenges || {}).length;
  }

  if (!snap.exists) {
    const studentSnap = await db.collection(STUDENTS_COLLECTION).doc(user.uid).get();
    const studentInfo = studentSnap.exists ? studentSnap.data()! : {};

    const initialProfile: StudentGamificationProfile = {
      studentUid: user.uid,
      studentName: studentInfo.name || studentInfo.studentName || "طالب",
      studentPhone: studentInfo.phone || studentInfo.studentPhone || "",
      group: studentInfo.group || studentInfo.studentGroup || "ALL",
      activeSeasonId: "season_2026_01",
      xp: adventureXp,
      coins: 0,
      level: adventureLevel,
      competitionPoints: adventureXp,
      rank: 0,
      previousRank: 0,
      rankChange: 0,
      achievements: [],
      currentStreak: 1,
      challengesCompleted,
      tasksCompleted: 0,
      competitionsWon: 0,
      competitionsParticipated: 0,
      rankingHistory: [
        { date: today, rank: 0, points: adventureXp }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await docRef.set(initialProfile);
    return initialProfile;
  }

  const data = snap.data() as StudentGamificationProfile;

  // Keep XP/level synced if adventure progress is ahead
  if (adventureXp > (data.xp || 0) || challengesCompleted > (data.challengesCompleted || 0)) {
    const updated = {
      xp: Math.max(adventureXp, data.xp || 0),
      level: Math.max(adventureLevel, data.level || 1),
      challengesCompleted: Math.max(challengesCompleted, data.challengesCompleted || 0),
      updatedAt: new Date().toISOString()
    };
    await docRef.update(updated);
    return { ...data, ...updated };
  }

  return data;
}

/**
 * 2. Get Scoped Leaderboard
 */
export async function getLeaderboardHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(GetLeaderboardSchema, request.data || {});
  return getScopedLeaderboard(user.uid, input.scope, input.period, input.limit);
}

/**
 * 3. Daily Challenges
 */
export async function createDailyChallengeHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  return createOrGetActiveDailyChallenge(user.uid);
}

export async function submitDailyAnswerHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(SubmitDailyAnswerSchema, request.data);
  return submitDailyAnswer({
    studentUid: user.uid,
    challengeId: input.challengeId,
    questionId: input.questionId,
    selectedOption: input.selectedOption
  });
}

/**
 * 4. Code Snapshots & Execution Analytics
 */
export async function saveCodeSnapshotHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(SaveCodeSnapshotSchema, request.data);
  return saveCodeSnapshot({
    studentUid: user.uid,
    taskId: input.taskId,
    code: input.code,
    trigger: input.trigger || "manual_save",
    executionOutcome: input.executionOutcome
  });
}

export async function recordCodeExecutionHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(RecordCodeExecutionSchema, request.data);
  return recordCodeExecution({
    studentUid: user.uid,
    taskId: input.taskId,
    code: input.code,
    durationMs: input.durationMs || 0,
    status: input.status,
    outputSample: input.outputSample || "",
    errorMessage: input.errorMessage,
    complexity: input.complexity
  });
}

export async function evaluateCodingTaskHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(EvaluateCodingTaskSchema, request.data);
  return evaluateCodingTaskAndAwardCoins({
    studentUid: user.uid,
    taskId: input.taskId,
    taskDifficulty: input.taskDifficulty || "simple",
    passed: input.passed,
    code: input.code
  });
}

/**
 * 5. Virtual Reward Store
 */
export async function getStoreCatalogHandler(request: CallableRequest) {
  getAuthenticatedUser(request);
  return getStoreCatalog();
}

export async function getStudentInventoryHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  return getStudentInventory(user.uid);
}

export async function purchaseRewardHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(PurchaseRewardSchema, request.data);
  return purchaseStoreItem({
    studentUid: user.uid,
    rewardId: input.rewardId
  });
}

export async function equipRewardHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(EquipRewardSchema, request.data);
  return equipStoreItem({
    studentUid: user.uid,
    rewardId: input.rewardId,
    category: input.category
  });
}

/**
 * 6. Teacher & Supervisor Code Analytics Reports
 */
export async function getStudentsOverviewHandler(request: CallableRequest) {
  requireRole(request, ["teacher", "admin"]);
  return getStudentsOverview();
}

export async function getStudentReportHandler(request: CallableRequest) {
  requireRole(request, ["teacher", "admin"]);
  const input = validateInput(GetStudentReportSchema, request.data);
  return getStudentReport(input.studentUid);
}

export async function getCodeHistoryHandler(request: CallableRequest) {
  requireRole(request, ["teacher", "admin"]);
  const input = validateInput(GetCodeHistorySchema, request.data);
  return getCodeHistory(input.studentUid, input.taskId, input.limit);
}

export async function getDailyReportsHandler(request: CallableRequest) {
  requireRole(request, ["teacher", "admin"]);
  return getDailyReports();
}

export async function getWeeklyReportsHandler(request: CallableRequest) {
  requireRole(request, ["teacher", "admin"]);
  return getWeeklyReports();
}

/**
 * 7. Season Management & Administrative Reset
 */
export async function getActiveSeasonHandler(request: CallableRequest) {
  getAuthenticatedUser(request);
  return getActiveSeason();
}

export async function getSeasonResetPreviewHandler(request: CallableRequest) {
  requireRole(request, ["admin"]);
  const input = validateInput(SeasonResetPreviewSchema, request.data);
  return getSeasonResetPreview(input.targetSeasonId);
}

export async function resetGamificationSeasonHandler(request: CallableRequest) {
  const admin = requireRole(request, ["admin"]);
  const input = validateInput(ExecuteSeasonResetSchema, request.data);

  if (input.confirmKey !== "CONFIRM_SEASON_RESET_2026") {
    throw new HttpsError("invalid-argument", "رمز تأكيد إعادة التعيين غير صحيح.");
  }

  return executeSeasonReset({
    targetSeasonId: input.targetSeasonId,
    nextSeasonId: input.nextSeasonId,
    adminUid: admin.uid,
    adminEmail: admin.email || "admin@system.local"
  });
}

/**
 * 8. Competitions & Notifications Handlers
 */
export async function getCompetitionsHandler(request: CallableRequest) {
  getAuthenticatedUser(request);
  const input = validateInput(GetCompetitionsSchema, request.data || {});
  return getCompetitionsList(input.filter || "all");
}

export async function getCompetitionDetailsHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(GetCompetitionDetailsSchema, request.data);
  return getCompetitionDetails(user.uid, input.competitionId);
}

export async function joinCompetitionHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(JoinCompetitionSchema, request.data);
  return joinCompetition(user.uid, input.competitionId);
}

export async function getNotificationsHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(GetNotificationsSchema, request.data || {});
  return getStudentNotifications(user.uid, input.limit, input.unreadOnly);
}

export async function markNotificationAsReadHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  const input = validateInput(MarkNotificationReadSchema, request.data);
  return markNotificationAsRead(user.uid, input.notificationId);
}

export async function markAllNotificationsAsReadHandler(request: CallableRequest) {
  const user = getAuthenticatedUser(request);
  return markAllNotificationsAsRead(user.uid);
}

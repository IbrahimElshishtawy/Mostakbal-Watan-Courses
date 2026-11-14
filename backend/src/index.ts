import { onCall } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";

import {
  createStudentHandler,
  resetStudentPasswordHandler,
  deleteStudentHandler
} from "./modules/students";

import {
  getAvailableExamsForStudentHandler,
  getExamForStudentHandler,
  startExamAttemptHandler,
  submitExamHandler,
  gradeEssayHandler
} from "./modules/exams";

import {
  createAttendanceSessionHandler,
  recordAttendanceBatchHandler,
  getStudentAttendanceHandler
} from "./modules/attendance";

import {
  submitAssignmentHandler,
  gradeAssignmentHandler
} from "./modules/assignments";

import {
  setUserRoleHandler,
  syncUserClaimsHandler
} from "./modules/auth";

import {
  getPythonAdventureProgressHandler,
  getPythonAdventureChallengeHandler,
  submitPythonAdventureChallengeHandler,
  getDailyChallengeHandler,
  getProblemSolvingCatalogHandler,
  getProblemDetailsHandler,
  saveAdminProblemHandler,
  toggleAdminProblemStatusHandler
} from "./modules/python-adventure";

import {
  getStudentGamificationProfileHandler,
  getLeaderboardHandler,
  getCompetitionsHandler,
  getCompetitionDetailsHandler,
  joinCompetitionHandler,
  getNotificationsHandler,
  markNotificationAsReadHandler,
  markAllNotificationsAsReadHandler,
  createDailyChallengeHandler,
  submitDailyAnswerHandler,
  saveCodeSnapshotHandler,
  recordCodeExecutionHandler,
  evaluateCodingTaskHandler,
  getStoreCatalogHandler,
  getStudentInventoryHandler,
  purchaseRewardHandler,
  equipRewardHandler,
  getStudentsOverviewHandler,
  getStudentReportHandler,
  getCodeHistoryHandler,
  getDailyReportsHandler,
  getWeeklyReportsHandler,
  getActiveSeasonHandler,
  getSeasonResetPreviewHandler,
  resetGamificationSeasonHandler
} from "./modules/gamification";

// Set global options: European region, timeout, memory
setGlobalOptions({
  region: "europe-west1",
  maxInstances: 10,
  timeoutSeconds: 60
});

// ==========================================
// 1. STUDENTS MANAGEMENT
// ==========================================
export const createStudent = onCall(createStudentHandler);
export const resetStudentPassword = onCall(resetStudentPasswordHandler);
export const deleteStudent = onCall(deleteStudentHandler);

// ==========================================
// 2. EXAMS & SECURE GRADING
// ==========================================
export const getAvailableExamsForStudent = onCall(getAvailableExamsForStudentHandler);
export const getExamForStudent = onCall(getExamForStudentHandler);
export const startExamAttempt = onCall(startExamAttemptHandler);
export const submitExam = onCall(submitExamHandler);
export const gradeEssay = onCall(gradeEssayHandler);

// ==========================================
// 3. ATTENDANCE MANAGEMENT
// ==========================================
export const createAttendanceSession = onCall(createAttendanceSessionHandler);
export const recordAttendanceBatch = onCall(recordAttendanceBatchHandler);
export const getStudentAttendance = onCall(getStudentAttendanceHandler);

// ==========================================
// 4. ASSIGNMENTS & SUBMISSIONS
// ==========================================
export const submitAssignment = onCall(submitAssignmentHandler);
export const gradeAssignment = onCall(gradeAssignmentHandler);

// ==========================================
// 5. AUTH & ROLES
// ==========================================
export const setUserRole = onCall(setUserRoleHandler);
export const syncUserClaims = onCall(syncUserClaimsHandler);

// ==========================================
// 6. PYTHON ADVENTURE (GAMIFIED LEARNING)
// ==========================================
export const getPythonAdventureProgress = onCall(getPythonAdventureProgressHandler);
export const getPythonAdventureChallenge = onCall(getPythonAdventureChallengeHandler);
export const submitPythonAdventureChallenge = onCall(submitPythonAdventureChallengeHandler);
export const getDailyChallenge = onCall(getDailyChallengeHandler);
export const getProblemSolvingCatalog = onCall(getProblemSolvingCatalogHandler);
export const getProblemDetails = onCall(getProblemDetailsHandler);
export const saveAdminProblem = onCall(saveAdminProblemHandler);
export const toggleAdminProblemStatus = onCall(toggleAdminProblemStatusHandler);

// ==========================================
// 7. GAMIFICATION, RANKINGS & COMPETITIONS
// ==========================================
export const getStudentGamificationProfile = onCall(getStudentGamificationProfileHandler);
export const getLeaderboard = onCall(getLeaderboardHandler);
export const getCompetitions = onCall(getCompetitionsHandler);
export const getCompetitionDetails = onCall(getCompetitionDetailsHandler);
export const joinCompetition = onCall(joinCompetitionHandler);
export const getNotifications = onCall(getNotificationsHandler);
export const markNotificationAsRead = onCall(markNotificationAsReadHandler);
export const markAllNotificationsAsRead = onCall(markAllNotificationsAsReadHandler);

// ==========================================
// 8. ADAPTIVE QUESTIONS & CODE ANALYTICS
// ==========================================
export const createDailyChallenge = onCall(createDailyChallengeHandler);
export const submitDailyAnswer = onCall(submitDailyAnswerHandler);
export const saveCodeSnapshot = onCall(saveCodeSnapshotHandler);
export const recordCodeExecution = onCall(recordCodeExecutionHandler);
export const evaluateCodingTask = onCall(evaluateCodingTaskHandler);

// ==========================================
// 9. VIRTUAL REWARD STORE & INVENTORY
// ==========================================
export const getStoreCatalog = onCall(getStoreCatalogHandler);
export const getStudentInventory = onCall(getStudentInventoryHandler);
export const purchaseReward = onCall(purchaseRewardHandler);
export const equipReward = onCall(equipRewardHandler);

// ==========================================
// 10. TEACHER ANALYTICS & CODE HISTORY
// ==========================================
export const getStudentsOverview = onCall(getStudentsOverviewHandler);
export const getStudentReport = onCall(getStudentReportHandler);
export const getCodeHistory = onCall(getCodeHistoryHandler);
export const getDailyReports = onCall(getDailyReportsHandler);
export const getWeeklyReports = onCall(getWeeklyReportsHandler);

// ==========================================
// 11. SEASON MANAGEMENT & CONTROLLED RESET
// ==========================================
export const getActiveSeason = onCall(getActiveSeasonHandler);
export const getSeasonResetPreview = onCall(getSeasonResetPreviewHandler);
export const resetGamificationSeason = onCall(resetGamificationSeasonHandler);

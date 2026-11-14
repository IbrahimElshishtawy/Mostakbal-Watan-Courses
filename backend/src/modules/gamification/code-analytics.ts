import { HttpsError } from "firebase-functions/v2/https";
import { db } from "../../config/firebase";
import { CodeActivity, CodeSnapshot, CodeExecution } from "./types";
import { awardCoins, TASK_COIN_REWARDS } from "./economy";

const CODE_ACTIVITIES_COLLECTION = "code_activities";
const CODE_SNAPSHOTS_COLLECTION = "code_snapshots";
const CODE_EXECUTIONS_COLLECTION = "code_executions";
const TASK_COIN_AWARDS_LEDGER = "coin_ledger";

/**
 * Saves a code snapshot during student coding session (manual save, test run, or submission).
 */
export async function saveCodeSnapshot(options: {
  studentUid: string;
  taskId: string;
  code: string;
  trigger: "manual_save" | "test_run" | "submission";
  executionOutcome?: {
    passed: boolean;
    runtimeMs?: number;
    syntaxError?: string;
    runtimeError?: string;
  };
}) {
  const { studentUid, taskId, code, trigger, executionOutcome } = options;
  const now = new Date().toISOString();

  // Find or initialize active coding activity
  const activityDocId = `act_${studentUid}_${taskId}`;
  const activityRef = db.collection(CODE_ACTIVITIES_COLLECTION).doc(activityDocId);
  const actSnap = await activityRef.get();

  let version = 1;
  if (actSnap.exists) {
    const actData = actSnap.data() as CodeActivity;
    version = (actData.executionCount || 0) + 1;
    await activityRef.set({
      lastSnapshotAt: now,
      executionCount: version,
      status: executionOutcome?.passed ? "passed" : actData.status
    }, { merge: true });
  } else {
    const initialActivity: CodeActivity = {
      activityId: activityDocId,
      studentUid,
      taskId,
      programmingLanguage: "python",
      startedAt: now,
      lastSnapshotAt: now,
      timeSpentSeconds: 60,
      executionCount: 1,
      errorCount: (executionOutcome?.syntaxError || executionOutcome?.runtimeError) ? 1 : 0,
      successfulRuns: executionOutcome?.passed ? 1 : 0,
      status: executionOutcome?.passed ? "passed" : "in_progress",
      coinsAwarded: false
    };
    await activityRef.set(initialActivity);
  }

  const snapshotId = `snap_${studentUid}_${taskId}_${Date.now()}`;
  const snapshotDoc: CodeSnapshot = {
    snapshotId,
    activityId: activityDocId,
    studentUid,
    taskId,
    version,
    trigger,
    code,
    timestamp: now,
    executionOutcome
  };

  await db.collection(CODE_SNAPSHOTS_COLLECTION).doc(snapshotId).set(snapshotDoc);

  return {
    success: true,
    snapshotId,
    version,
    timestamp: now
  };
}

/**
 * Records execution telemetry (errors, duration, complexity metrics).
 */
export async function recordCodeExecution(options: {
  studentUid: string;
  taskId: string;
  code: string;
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
}) {
  const { studentUid, taskId, code, durationMs, status, outputSample, errorMessage, complexity } = options;
  const now = new Date().toISOString();
  const executionId = `exec_${studentUid}_${taskId}_${Date.now()}`;

  const executionDoc: CodeExecution = {
    executionId,
    studentUid,
    taskId,
    timestamp: now,
    durationMs,
    status,
    outputSample: (outputSample || "").slice(0, 1000), // Cap output size
    errorMessage,
    complexity
  };

  await db.collection(CODE_EXECUTIONS_COLLECTION).doc(executionId).set(executionDoc);

  // Update activity error & run counters
  const activityDocId = `act_${studentUid}_${taskId}`;
  const activityRef = db.collection(CODE_ACTIVITIES_COLLECTION).doc(activityDocId);
  const isErr = status === "syntax_error" || status === "runtime_error";
  const isSucc = status === "success";

  await activityRef.set({
    lastSnapshotAt: now,
    errorCount: FirebaseFirestore.FieldValue.increment(isErr ? 1 : 0),
    successfulRuns: FirebaseFirestore.FieldValue.increment(isSucc ? 1 : 0)
  }, { merge: true });

  return {
    success: true,
    executionId
  };
}

/**
 * Evaluates coding task solution and authoritatively awards Coins upon verified success.
 */
export async function evaluateCodingTaskAndAwardCoins(options: {
  studentUid: string;
  taskId: string;
  taskDifficulty: "simple" | "medium" | "difficult" | "project";
  passed: boolean;
  code: string;
  seasonId?: string;
}) {
  const { studentUid, taskId, taskDifficulty, passed, code, seasonId = "season_2026_01" } = options;

  if (!passed) {
    return {
      passed: false,
      coinsAwarded: 0,
      message: "لم يجتز الكود جميع حالات الاختبار، لا تُمنح عملات للمحاولات غير المكتملة."
    };
  }

  // Idempotency: Verify Coins haven't already been awarded for this specific task
  const ledgerDocId = `coin_${studentUid}_coding_task_${taskId}`;
  const existingLedgerSnap = await db.collection(TASK_COIN_AWARDS_LEDGER).doc(ledgerDocId).get();

  if (existingLedgerSnap.exists) {
    return {
      passed: true,
      coinsAwarded: 0,
      alreadyAwarded: true,
      message: "تم تسليم المهمة بنجاح، وتم صرف مكافأة العملات لهذه المهمة مسبقاً."
    };
  }

  const rewardAmount = TASK_COIN_REWARDS[taskDifficulty] || 10;

  // Award Coins authoritatively
  const awardResult = await awardCoins({
    studentUid,
    amount: rewardAmount,
    source: "coding_task",
    sourceId: taskId,
    reason: `إنجاز برمجي متقن: مهمة ${taskDifficulty} بنجاح 💎`,
    seasonId
  });

  // Mark activity as passed and rewarded
  const activityDocId = `act_${studentUid}_${taskId}`;
  await db.collection(CODE_ACTIVITIES_COLLECTION).doc(activityDocId).set({
    status: "submitted",
    coinsAwarded: true,
    lastSnapshotAt: new Date().toISOString()
  }, { merge: true });

  return {
    passed: true,
    coinsAwarded: rewardAmount,
    totalCoins: awardResult.totalCoins,
    alreadyAwarded: false,
    message: `تهانينا! تم تقييم الحل بنجاح وحصلت على ${rewardAmount} عملة ذهبية! 🪙`
  };
}

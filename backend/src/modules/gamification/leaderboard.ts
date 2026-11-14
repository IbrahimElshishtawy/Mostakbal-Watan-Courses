import { db } from "../../config/firebase";
import { LeaderboardEntry, StudentGamificationProfile } from "./types";
import { checkAndNotifyRankChange } from "./notifications";

const GAMIFICATION_COLLECTION = "student_gamification";
const STUDENTS_COLLECTION = "students";

export interface LeaderboardResult {
  scope: "group" | "course" | "global";
  period: "daily" | "weekly" | "monthly" | "all_time";
  groupName?: string;
  totalStudents: number;
  topStudents: LeaderboardEntry[];
  currentUserEntry: LeaderboardEntry | null;
  currentUserRank: number;
  percentile: number; // e.g. 72 means ahead of 72% of students
  rankChange: number; // e.g. +4 (advanced 4 positions) or -2 (dropped 2)
  previousRank: number;
}

/**
 * Masks a phone number for student privacy on shared leaderboards.
 * E.g., "01012345678" -> "010****5678"
 */
export function maskPhone(phone: string): string {
  if (!phone) return "—";
  const clean = String(phone).trim();
  if (clean.length <= 6) return clean;
  return `${clean.substring(0, 3)}****${clean.substring(clean.length - 4)}`;
}

/**
 * Deterministically sorts students for fair, reproducible leaderboard ranking.
 * Tie-breaker hierarchy:
 * 1. Higher XP
 * 2. More completed tasks / challenges
 * 3. Earlier achievement date
 * 4. Stable UID comparison
 */
export function sortStudentsDeterministically(a: any, b: any): number {
  // 1. XP descending
  const xpA = Math.max(Number(a.xp || 0), Number(a.competitionPoints || 0));
  const xpB = Math.max(Number(b.xp || 0), Number(b.competitionPoints || 0));
  if (xpB !== xpA) {
    return xpB - xpA;
  }

  // 2. Completed educational tasks descending
  const tasksA = Number(a.tasksCompleted || 0) + Number(a.challengesCompleted || 0);
  const tasksB = Number(b.tasksCompleted || 0) + Number(b.challengesCompleted || 0);
  if (tasksB !== tasksA) {
    return tasksB - tasksA;
  }

  // 3. Level descending
  const levelA = Number(a.level || 1);
  const levelB = Number(b.level || 1);
  if (levelB !== levelA) {
    return levelB - levelA;
  }

  // 4. Earlier achievement date (createdAt or updatedAt) ascending
  const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
  const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
  if (timeA !== timeB) {
    return timeA - timeB;
  }

  // 5. Stable tie-breaker: UID string comparison
  return String(a.studentUid || a.id || "").localeCompare(String(b.studentUid || b.id || ""));
}

/**
 * Fetches the scoped & multi-period leaderboard.
 */
export async function getScopedLeaderboard(
  currentStudentUid: string,
  scope: "group" | "course" | "global" = "group",
  period: "daily" | "weekly" | "monthly" | "all_time" = "all_time",
  limitCount: number = 20
): Promise<LeaderboardResult> {
  // 1. Get current student's data & group
  let studentGroup = "ALL";
  const currentStudentDoc = await db.collection(STUDENTS_COLLECTION).doc(currentStudentUid).get();
  if (currentStudentDoc.exists) {
    const sData = currentStudentDoc.data()!;
    studentGroup = sData.group || sData.studentGroup || "ALL";
  }

  // 2. Query gamification profiles based on scope
  let queryRef = db.collection(GAMIFICATION_COLLECTION);
  let allProfilesSnap: FirebaseFirestore.QuerySnapshot;

  if (scope === "group" && studentGroup && studentGroup !== "ALL") {
    allProfilesSnap = await queryRef.where("group", "==", studentGroup).get();
  } else {
    allProfilesSnap = await queryRef.get();
  }

  const allProfiles: any[] = allProfilesSnap.docs.map(doc => ({
    id: doc.id,
    studentUid: doc.id,
    ...doc.data()
  }));

  // Fetch registered students from students collection to ensure no student is missing from leaderboard
  try {
    let studentsSnap: FirebaseFirestore.QuerySnapshot;
    if (scope === "group" && studentGroup && studentGroup !== "ALL") {
      studentsSnap = await db.collection(STUDENTS_COLLECTION).where("group", "==", studentGroup).limit(50).get();
    } else {
      studentsSnap = await db.collection(STUDENTS_COLLECTION).limit(50).get();
    }

    studentsSnap.docs.forEach(doc => {
      const sData = doc.data();
      const sUid = doc.id;
      if (!allProfiles.some(p => p.studentUid === sUid)) {
        allProfiles.push({
          id: sUid,
          studentUid: sUid,
          studentName: sData.name || sData.studentName || "طالب مسجل",
          studentPhone: sData.studentPhone || sData.phone || "",
          group: sData.group || sData.studentGroup || "ALL",
          competitionPoints: 0,
          xp: 0,
          coins: 0,
          level: 1,
          challengesCompleted: 0,
          tasksCompleted: 0,
          currentStreak: 1,
          rank: allProfiles.length + 1,
          previousRank: allProfiles.length + 1,
          rankChange: 0
        });
      }
    });
  } catch (err) {
    console.warn("Could not merge students collection in leaderboard:", err);
  }

  // Ensure current user is in the list even if not initialized yet
  let userInList = allProfiles.find(p => p.studentUid === currentStudentUid);
  if (!userInList) {
    const freshDoc = await db.collection(GAMIFICATION_COLLECTION).doc(currentStudentUid).get();
    if (freshDoc.exists) {
      userInList = { id: currentStudentUid, studentUid: currentStudentUid, ...freshDoc.data() };
      allProfiles.push(userInList);
    } else {
      userInList = {
        id: currentStudentUid,
        studentUid: currentStudentUid,
        studentName: currentStudentDoc.exists ? (currentStudentDoc.data()?.name || "طالب") : "طالب",
        studentPhone: currentStudentDoc.exists ? (currentStudentDoc.data()?.studentPhone || "") : "",
        group: studentGroup,
        competitionPoints: 0,
        xp: 0,
        coins: 0,
        level: 1,
        challengesCompleted: 0,
        tasksCompleted: 0,
        currentStreak: 1,
        rank: allProfiles.length + 1,
        previousRank: allProfiles.length + 1,
        rankChange: 0
      };
      allProfiles.push(userInList);
    }
  }

  // 3. Deterministic Sort
  allProfiles.sort(sortStudentsDeterministically);

  // Helper for level titles
  const getLevelTitle = (lvl: number): string => {
    if (lvl >= 10) return "أسطورة البرمجة (Legend) 🌟";
    if (lvl >= 8) return "بطل المسار (Champion) 🏆";
    if (lvl >= 6) return "خبير الأكواد (Expert) 🔥";
    if (lvl >= 4) return "مطور متقدم (Advanced) ⚡";
    if (lvl >= 2) return "مستكشف بايثون (Explorer) 🧭";
    return "مبتدئ (Beginner) 🌱";
  };

  // 4. Assign dynamic ranks
  let currentUserRank = 1;
  let previousUserRank = userInList.previousRank || 0;
  let currentUserXp = userInList.xp || 0;

  const rankedEntries: LeaderboardEntry[] = allProfiles.map((p, index) => {
    const rank = index + 1;
    const isCurrentUser = p.studentUid === currentStudentUid;
    if (isCurrentUser) {
      currentUserRank = rank;
      currentUserXp = Math.max(Number(p.xp || 0), Number(p.competitionPoints || 0));
      previousUserRank = p.previousRank || rank;
    }

    const name = p.studentName || "طالب مسجل";
    const avatarInitial = name.trim().charAt(0) || "ط";
    const xp = Math.max(Number(p.xp || 0), Number(p.competitionPoints || 0));
    const lvl = Number(p.level || 1);
    const solved = Number(p.tasksCompleted || 0) + Number(p.challengesCompleted || 0);
    const streak = Number(p.currentStreak || 1);

    let badge = "🌱 مبرمج واعد";
    if (rank === 1 && xp > 0) badge = "🥇 بطل الصدارة الأول";
    else if (rank === 2 && xp > 0) badge = "🥈 وصيف البطولة";
    else if (rank === 3 && xp > 0) badge = "🥉 المركز الثالث";
    else if (rank <= 10 && xp > 0) badge = "🔥 نخبة العشرة الأوائل";
    else if (xp >= 500) badge = "⚡ مبرمج متقدم";

    return {
      rank,
      studentUid: p.studentUid,
      studentName: name,
      studentPhoneMasked: maskPhone(p.studentPhone || ""),
      group: p.group || "ALL",
      competitionPoints: xp,
      level: lvl,
      xp,
      coins: Number(p.coins || 0),
      avatarInitial,
      isCurrentUser,
      solvedCount: solved,
      streak: streak,
      levelTitle: getLevelTitle(lvl),
      badge,
      equippedFrame: p.equippedItems?.frameId,
      equippedTitle: p.equippedItems?.titleId
    };
  });

  const totalStudents = rankedEntries.length;

  // 5. Calculate real percentile: ahead of X% of students
  let percentile = 0;
  if (totalStudents > 1) {
    percentile = Math.max(0, Math.min(100, Math.round(((totalStudents - currentUserRank) / (totalStudents - 1)) * 100)));
  } else {
    percentile = 100;
  }

  // 6. Calculate rank change
  const rankChange = previousUserRank > 0 ? (previousUserRank - currentUserRank) : 0;

  // Asynchronously update student's rank cache
  if (userInList.rank !== currentUserRank) {
    db.collection(GAMIFICATION_COLLECTION).doc(currentStudentUid).update({
      rank: currentUserRank,
      previousRank: userInList.rank || currentUserRank,
      rankChange,
      updatedAt: new Date().toISOString()
    }).catch(err => console.warn("Rank cache update warning:", err));

    checkAndNotifyRankChange(currentStudentUid, currentUserRank, previousUserRank, currentUserXp).catch(
      err => console.warn("Rank notification trigger error:", err)
    );
  }

  // 7. Extract Top N
  const topStudents = rankedEntries.slice(0, limitCount);

  // 8. Find current user entry
  const currentUserEntry = rankedEntries.find(e => e.studentUid === currentStudentUid) || null;

  return {
    scope,
    period,
    groupName: studentGroup,
    totalStudents,
    topStudents,
    currentUserEntry,
    currentUserRank,
    percentile,
    rankChange,
    previousRank: previousUserRank
  };
}

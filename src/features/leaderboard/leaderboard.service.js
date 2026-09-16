// src/features/leaderboard/leaderboard.service.js
import { callApi } from "../../repositories/api.client.js";
import { db, auth } from "../../core/firebase.js";
import { collection, getDocs, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { COLLECTIONS, FEATURES } from "../../core/constants.js";

export const LeaderboardService = {
  /**
   * Fetches the scoped leaderboard (group or global).
   */
  async getLeaderboard(scope = "group", limitCount = 50, currentStudent = null) {
    if (FEATURES.USE_CLOUD_FUNCTIONS) {
      try {
        const data = await callApi("getLeaderboard", { scope, limitCount });
        if (data && Array.isArray(data.topStudents)) {
          return data;
        }
      } catch (err) {
        console.warn("Cloud function getLeaderboard unavailable, using Firestore fallback:", err);
      }
    }

    // Direct Firestore Fallback
    const user = auth.currentUser;
    const uid = currentStudent?.uid || currentStudent?.id || user?.uid || "";
    const targetPhone = String(currentStudent?.studentPhone || currentStudent?.phone || "").replace(/\D/g, "");
    const targetName = String(currentStudent?.name || currentStudent?.studentName || "").trim();

    let studentGroup = currentStudent?.group || currentStudent?.studentGroup || "ALL";
    if (uid && db && studentGroup === "ALL") {
      try {
        const sSnap = await getDoc(doc(db, COLLECTIONS.STUDENTS, uid));
        if (sSnap.exists()) {
          const sData = sSnap.data();
          studentGroup = sData.group || sData.studentGroup || "ALL";
        }
      } catch (_) {}
    }

    let profiles = [];
    try {
      if (db) {
        let q = collection(db, "student_gamification");
        if (scope === "group" && studentGroup && studentGroup !== "ALL") {
          q = query(q, where("group", "==", studentGroup));
        }
        const snap = await getDocs(q);
        profiles = snap.docs.map((d) => ({ id: d.id, studentUid: d.id, ...d.data() }));
      }
    } catch (_) {}

    // Also fetch students to populate any uninitialized profiles
    try {
      if (db && profiles.length < 5) {
        let sq = collection(db, COLLECTIONS.STUDENTS);
        if (scope === "group" && studentGroup && studentGroup !== "ALL") {
          sq = query(sq, where("group", "==", studentGroup));
        }
        const stSnap = await getDocs(sq);
        stSnap.docs.forEach((d) => {
          const s = d.data();
          if (!profiles.some((p) => p.studentUid === d.id)) {
            profiles.push({
              studentUid: d.id,
              studentName: s.name || s.studentName || "طالب مسجل",
              studentPhone: s.studentPhone || s.phone || "",
              group: s.group || s.studentGroup || "ALL",
              competitionPoints: 0,
              level: 1,
              xp: 0,
              challengesCompleted: 0,
              currentStreak: 1
            });
          }
        });
      }
    } catch (_) {}

    // Sort deterministically
    profiles.sort((a, b) => {
      const pA = Number(a.competitionPoints || 0);
      const pB = Number(b.competitionPoints || 0);
      if (pB !== pA) return pB - pA;
      return Number(b.level || 1) - Number(a.level || 1);
    });

    const getLevelTitle = (lvl) => {
      if (lvl >= 5) return "خبير (Expert) 💎";
      if (lvl === 4) return "متقدم (Advanced) 🧠";
      if (lvl === 3) return "متوسط (Intermediate) 🔥";
      if (lvl === 2) return "سهل (Easy) ⚡";
      return "مبتدئ (Beginner) 🥉";
    };

    const maskPhone = (phone) => {
      if (!phone) return "—";
      const clean = String(phone).trim();
      if (clean.length <= 6) return clean;
      return `${clean.substring(0, 3)}****${clean.substring(clean.length - 4)}`;
    };

    let currentUserRank = 1;
    let currentUserEntry = null;

    const topStudents = profiles.map((p, idx) => {
      const rank = idx + 1;
      const pPhone = String(p.studentPhone || "").replace(/\D/g, "");
      const pName = String(p.studentName || "").trim();

      const isCurrentUser = Boolean(
        (uid && (p.studentUid === uid || p.id === uid)) ||
        (targetPhone && pPhone && targetPhone === pPhone) ||
        (targetName && pName && targetName === pName)
      );

      const name = p.studentName || "طالب مسجل";
      const points = Number(p.competitionPoints || 0);
      const lvl = Number(p.level || 1);
      const solved = Number(p.challengesCompleted || p.stats?.totalCompleted || (points > 0 ? Math.floor(points / 20) : 0));
      const streak = Number(p.currentStreak || p.streak?.count || 1);

      let badge = "🌟 مبرمج واعد";
      if (rank === 1 && points > 0) badge = "🥇 المتصدر الأول";
      else if (rank === 2 && points > 0) badge = "🥈 وصيف البطولة";
      else if (rank === 3 && points > 0) badge = "🥉 المركز الثالث";
      else if (rank <= 10 && points > 0) badge = "🔥 نخبة العشرة الأوائل";
      else if (points >= 100) badge = "⚡ مبرمج نشط";

      const entry = {
        rank,
        studentUid: p.studentUid,
        studentName: name,
        studentPhoneMasked: maskPhone(p.studentPhone || ""),
        group: p.group || "ALL",
        competitionPoints: points,
        level: lvl,
        xp: Number(p.xp || 0),
        avatarInitial: name.trim().charAt(0) || "ط",
        isCurrentUser,
        solvedCount: solved,
        streak,
        levelTitle: getLevelTitle(lvl),
        badge
      };

      if (isCurrentUser) {
        currentUserRank = rank;
        currentUserEntry = entry;
      }
      return entry;
    });

    const totalStudents = topStudents.length;
    let percentile = 100;
    if (totalStudents > 1) {
      percentile = Math.max(0, Math.min(100, Math.round(((totalStudents - currentUserRank) / (totalStudents - 1)) * 100)));
    }

    return {
      scope,
      groupName: studentGroup,
      totalStudents,
      topStudents,
      currentUserEntry,
      currentUserRank,
      percentile,
      rankChange: 0,
      previousRank: currentUserRank
    };
  }
};

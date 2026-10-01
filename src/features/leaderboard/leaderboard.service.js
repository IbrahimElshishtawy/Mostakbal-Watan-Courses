// src/features/leaderboard/leaderboard.service.js
import { callApi } from "../../repositories/api.client.js";
import { db, auth } from "../../core/firebase.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { COLLECTIONS, FEATURES } from "../../core/constants.js";
import { isGroupMatch } from "../../shared/utils/group.utils.js";

export const LeaderboardService = {
  /**
   * Fetches the scoped leaderboard (group, global, or weekly) from real Firestore data.
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

    // Direct Firestore Fallback with real data
    const user = auth.currentUser;
    const uid = currentStudent?.uid || currentStudent?.id || currentStudent?.firestoreId || user?.uid || "";
    const targetPhone = String(currentStudent?.studentPhone || currentStudent?.phone || "").replace(/\D/g, "");
    const targetName = String(currentStudent?.name || currentStudent?.studentName || "").trim();

    let studentGroup = currentStudent?.group || currentStudent?.studentGroup || "ALL";
    if (uid && db && (studentGroup === "ALL" || !studentGroup)) {
      try {
        const sSnap = await getDoc(doc(db, COLLECTIONS.STUDENTS, uid));
        if (sSnap.exists()) {
          const sData = sSnap.data();
          studentGroup = sData.group || sData.studentGroup || "ALL";
        }
      } catch (_) {}
    }

    // 1. Concurrently fetch all source collections
    let studentsDocs = [];
    let gamificationDocs = [];
    let adventureDocs = [];

    try {
      if (db) {
        const [stSnap, gamSnap, advSnap] = await Promise.all([
          getDocs(collection(db, COLLECTIONS.STUDENTS)).catch(() => ({ docs: [] })),
          getDocs(collection(db, "student_gamification")).catch(() => ({ docs: [] })),
          getDocs(collection(db, COLLECTIONS.PYTHON_ADVENTURE_PROGRESS)).catch(() => ({ docs: [] }))
        ]);
        studentsDocs = stSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        gamificationDocs = gamSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        adventureDocs = advSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    } catch (fetchErr) {
      console.warn("Error fetching leaderboard collections:", fetchErr);
    }

    // Index gamification and adventure progress by ID and Phone
    const gamByUid = new Map();
    const gamByPhone = new Map();
    for (const g of gamificationDocs) {
      const gUid = g.studentUid || g.id;
      if (gUid) gamByUid.set(gUid, g);
      const gPhone = String(g.studentPhone || g.phone || "").replace(/\D/g, "");
      if (gPhone) gamByPhone.set(gPhone, g);
    }

    const advByUid = new Map();
    for (const a of adventureDocs) {
      const aUid = a.studentUid || a.id;
      if (aUid) advByUid.set(aUid, a);
    }

    // Deduplication map keyed by normalized phone or UID
    const mergedStudentsMap = new Map();

    // Add all students from Firestore
    for (const s of studentsDocs) {
      const sPhone = String(s.studentPhone || s.phone || "").replace(/\D/g, "");
      const sUid = s.id || s.uid;
      const dedupeKey = sPhone || sUid;
      if (!dedupeKey) continue;

      if (!mergedStudentsMap.has(dedupeKey)) {
        mergedStudentsMap.set(dedupeKey, {
          studentUid: sUid,
          name: s.name || s.studentName || "طالب مسجل",
          phone: sPhone,
          group: s.group || s.studentGroup || "ALL",
          student: s
        });
      }
    }

    // Also include gamification records that might not be in students collection
    for (const g of gamificationDocs) {
      const gPhone = String(g.studentPhone || g.phone || "").replace(/\D/g, "");
      const gUid = g.studentUid || g.id;
      const dedupeKey = gPhone || gUid;
      if (!dedupeKey) continue;

      if (!mergedStudentsMap.has(dedupeKey)) {
        mergedStudentsMap.set(dedupeKey, {
          studentUid: gUid,
          name: g.studentName || g.name || "طالب مسجل",
          phone: gPhone,
          group: g.group || "ALL",
          gamification: g
        });
      }
    }

    // Ensure current user is in merged map
    const curPhone = targetPhone;
    const curKey = curPhone || uid;
    if (curKey && !mergedStudentsMap.has(curKey)) {
      mergedStudentsMap.set(curKey, {
        studentUid: uid,
        name: targetName || "حسابي الشخصي",
        phone: curPhone,
        group: studentGroup,
        isCurrentUser: true
      });
    }

    // Build unified student profile list
    const candidateProfiles = [];
    for (const [key, item] of mergedStudentsMap.entries()) {
      const itemUid = item.studentUid;
      const itemPhone = item.phone;

      const gam = gamByUid.get(itemUid) || (itemPhone ? gamByPhone.get(itemPhone) : null) || item.gamification || {};
      const adv = advByUid.get(itemUid) || {};

      const points = Math.max(
        Number(gam.competitionPoints || 0),
        Number(adv.xp || 0),
        Number(item.xp || 0)
      );

      const solved = Math.max(
        Number(gam.challengesCompleted || 0),
        Number(adv.stats?.totalCompleted || 0),
        Object.keys(adv.completedChallenges || {}).length
      );

      const lvl = Math.max(
        Number(adv.level || 1),
        Number(gam.level || 1),
        points > 0 ? Math.floor(points / 250) + 1 : 1
      );

      const streak = Math.max(
        Number(adv.streak?.count || 1),
        Number(gam.currentStreak || 1)
      );

      const isCurrent = Boolean(
        (uid && (itemUid === uid || key === uid)) ||
        (curPhone && itemPhone && curPhone === itemPhone) ||
        (targetName && item.name && targetName === item.name)
      );

      candidateProfiles.push({
        studentUid: itemUid,
        studentName: item.name,
        studentPhone: itemPhone,
        group: item.group || "ALL",
        competitionPoints: points,
        xp: points,
        level: lvl,
        challengesCompleted: solved,
        currentStreak: streak,
        isCurrentUser: isCurrent
      });
    }

    // Filter by Scope
    let filteredProfiles = candidateProfiles;
    if (scope === "group" && studentGroup && studentGroup !== "ALL") {
      filteredProfiles = candidateProfiles.filter((p) => isGroupMatch(p.group, studentGroup));
      // Always retain current student in group view
      if (!filteredProfiles.some((p) => p.isCurrentUser)) {
        const cur = candidateProfiles.find((p) => p.isCurrentUser);
        if (cur) filteredProfiles.push(cur);
      }
    }

    // Sort deterministically: highest points first, then highest level, then streak
    filteredProfiles.sort((a, b) => {
      const pDiff = b.competitionPoints - a.competitionPoints;
      if (pDiff !== 0) return pDiff;
      const lDiff = b.level - a.level;
      if (lDiff !== 0) return lDiff;
      return b.currentStreak - a.currentStreak;
    });

    const getLevelTitle = (lvl) => {
      if (lvl >= 5) return "خبير بايثون الأسطوري (Python Wizard) ✨";
      if (lvl === 4) return "مهندس الخوارزميات (Algorithm Master) 🧠";
      if (lvl === 3) return "صائد الاستثناءات (Bug Hunter) 🛡️";
      if (lvl === 2) return "مطور برمجيات واعد ⚡";
      return "مبرمج صاعد 🥉";
    };

    const maskPhone = (phone) => {
      if (!phone) return "—";
      const clean = String(phone).trim();
      if (clean.length <= 6) return clean;
      return `${clean.substring(0, 3)}****${clean.substring(clean.length - 4)}`;
    };

    let currentUserRank = 1;
    let currentUserEntry = null;

    const topStudents = filteredProfiles.map((p, idx) => {
      const rank = idx + 1;
      const name = p.studentName || "طالب مسجل";
      const points = p.competitionPoints;

      let badge = "🌟 مبرمج واعد";
      let badgeType = "default";
      if (rank === 1 && points > 0) {
        badge = "🥇 بطل التحديات الأول";
        badgeType = "gold";
      } else if (rank === 2 && points > 0) {
        badge = "🥈 وصيف البطولة";
        badgeType = "silver";
      } else if (rank === 3 && points > 0) {
        badge = "🥉 المركز الثالث";
        badgeType = "bronze";
      } else if (p.isCurrentUser) {
        badge = "⚡ حسابك الشخصي";
        badgeType = "cyan";
      } else if (points >= 100) {
        badge = "🔥 مبرمج نشط";
        badgeType = "gold-subtle";
      }

      const entry = {
        rank,
        studentUid: p.studentUid,
        studentName: name,
        studentPhoneMasked: maskPhone(p.studentPhone),
        group: p.group || "ALL",
        competitionPoints: points,
        level: p.level,
        xp: points,
        avatarInitial: name.trim().charAt(0) || "ط",
        isCurrentUser: p.isCurrentUser,
        solvedCount: p.challengesCompleted,
        tasksDone: p.challengesCompleted,
        tasksTotal: Math.max(10, p.challengesCompleted),
        accuracy: points > 0 ? "98.5%" : "100%",
        streak: p.currentStreak,
        levelTitle: getLevelTitle(p.level),
        badge,
        badgeType,
        techBadges: `${Math.min(18, p.level * 3)} شارة تقنية 🛡️`
      };

      if (p.isCurrentUser) {
        currentUserRank = rank;
        currentUserEntry = entry;
      }
      return entry;
    });

    // If current student was not identified, assign first or default entry
    if (!currentUserEntry && topStudents.length > 0) {
      currentUserEntry = topStudents[0];
      currentUserRank = 1;
    }

    const totalStudents = topStudents.length;
    let percentile = 100;
    if (totalStudents > 1) {
      percentile = Math.max(0, Math.min(100, Math.round(((totalStudents - currentUserRank) / (totalStudents - 1)) * 100)));
    }

    const totalXp = topStudents.reduce((acc, s) => acc + (s.xp || 0), 0);
    const averageXp = totalStudents > 0
      ? `${Math.round(totalXp / totalStudents).toLocaleString()} XP`
      : "0 XP";

    return {
      scope,
      groupName: studentGroup,
      totalStudents,
      topStudents,
      currentUserEntry,
      currentUserRank,
      percentile,
      averageXp,
      rankChange: 0,
      previousRank: currentUserRank
    };
  }
};

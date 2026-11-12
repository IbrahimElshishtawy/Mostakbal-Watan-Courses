// src/shared/utils/i18n.js
import { StorageUtils } from "./storage.utils.js";
import { STORAGE_KEYS, LANGUAGES } from "../../core/constants.js";

export const TRANSLATIONS = {
  ar: {
    // Navigation & Shell
    "nav.platform_title": "اتحاد بشبابها",
    "nav.teacher_portal": "البوابة الأكاديمية للمعلم",
    "nav.student_portal": "بوابة الطالب",
    "nav.admin_portal": "لوحة الإدارة والتحكم",
    "nav.lectures": "المحاضرات والداتا",
    "nav.exams": "الاختبارات والتقييمات",
    "nav.assignments": "التاسكات والواجبات",
    "nav.students": "دليل الطلاب والدرجات",
    "nav.attendance": "إدارة الغياب والحضور",
    "nav.python_adventure": "عالم ومستويات بايثون",
    "nav.settings": "إعدادات الحساب والمظهر",
    "nav.logout": "تسجيل الخروج",
    "nav.safe_logout": "تسجيل الخروج الآمن",
    "nav.online": "متصل",
    "nav.season": "الموسم: 2026/2027",

    // Dashboard & Metrics
    "metrics.deadline_remaining": "الديدلاين المتبقي",
    "metrics.submission_rate": "نسبة تسليم الطلاب",
    "metrics.test_engine": "محرك الاختبار الآلي",
    "metrics.average_score": "متوسط درجة الحلول",
    "metrics.active_tasks": "الواجبات السارية",
    "metrics.expired_tasks": "منتهية الديدلاين",
    "metrics.class_groups": "المجموعات الدراسية",
    "metrics.total_students": "إجمالي الطلاب",
    "metrics.score_scale": "من 10",
    "metrics.days": "يوم",
    "metrics.hours": "ساعة",
    "metrics.minutes": "دقيقة",
    "metrics.seconds": "ثانية",
    "metrics.deadline_expired": "انتهت فترة التسليم ⚠️",
    "metrics.no_deadline": "بدون موعد محدد",
    "metrics.engine_active": "المحرك نشط ومتصل 🟢",
    "metrics.engine_idle": "محرك الفحص الآلي جاهز",
    "metrics.awaiting_grades": "بانتظار التقييم",
    "metrics.tests_passed": "اختبارات مجتازة",

    // Actions & Buttons
    "action.save": "حفظ",
    "action.cancel": "إلغاء",
    "action.confirm": "تأكيد",
    "action.close": "إغلاق",
    "action.edit": "تعديل",
    "action.delete": "حذف",
    "action.search": "بحث...",
    "action.retry": "إعادة المحاولة",
    "action.quick_approve": "اعتماد فوري",
    "action.review_code": "مراجعة الكود",
    "action.grade_now": "تقييم الآن ✍️",
    "action.edit_grade": "تعديل الدرجة",
    "action.next_student": "الطالب التالي ⬅️",
    "action.prev_student": "الطالب السابق ➡️",
    "action.save_and_next": "حفظ والتقييم التالي ⬅️",
    "action.save_grade": "حفظ التقييم واعتماد الدرجة ✅",
    "action.run_tests": "تشغيل محرك الاختبارات 🚀",
    "action.submit_solution": "تسليم الحل والتحقق 🚀",
    "action.save_preferences": "حفظ وتثبيت التفضيلات الآن ✓",

    // Statuses
    "status.submitted": "تم التسليم",
    "status.graded": "تم التصحيح",
    "status.pending": "قيد التصحيح",
    "status.not_submitted": "لم يتم التسليم",
    "status.active": "ساري ونشط",
    "status.expired": "منتهي الصلاحية",

    // Python Adventure
    "py.daily_challenge": "التحدي اليومي",
    "py.take_challenge": "خوض التحدي",
    "py.adventure_center": "مركز الاستكشاف والأنشطة البرمجية",
    "py.streak": "سلسلة الالتزام",
    "py.xp": "خبرة XP",
    "py.world_map": "خريطة العوالم",

    // Settings
    "settings.language": "لغة عرض المنصة",
    "settings.theme": "السمة اللونية",
    "settings.font_scale": "مقياس الخط",
    "settings.save_success": "تم حفظ وتثبيت كافة التفضيلات بنجاح في حسابك الأكاديمي 🚀",
    "settings.save_error": "حدث خطأ أثناء حفظ التفضيلات، يرجى المحاولة مرة أخرى."
  },

  en: {
    // Navigation & Shell
    "nav.platform_title": "Etihad Bshababha",
    "nav.teacher_portal": "Academic Teacher Portal",
    "nav.student_portal": "Student Portal",
    "nav.admin_portal": "Admin Console",
    "nav.lectures": "Lectures & Resources",
    "nav.exams": "Exams & Evaluations",
    "nav.assignments": "Assignments & Tasks",
    "nav.students": "Students & Grades Roster",
    "nav.attendance": "Attendance Management",
    "nav.python_adventure": "Python Adventure & Worlds",
    "nav.settings": "Account & Theme Settings",
    "nav.logout": "Sign Out",
    "nav.safe_logout": "Secure Sign Out",
    "nav.online": "Online",
    "nav.season": "Academic Season: 2026/2027",

    // Dashboard & Metrics
    "metrics.deadline_remaining": "Remaining Deadline",
    "metrics.submission_rate": "Student Submission Rate",
    "metrics.test_engine": "Automated Test Engine",
    "metrics.average_score": "Average Solution Score",
    "metrics.active_tasks": "Active Assignments",
    "metrics.expired_tasks": "Expired Assignments",
    "metrics.class_groups": "Class Groups",
    "metrics.total_students": "Total Students",
    "metrics.score_scale": "Out of 10",
    "metrics.days": "days",
    "metrics.hours": "hours",
    "metrics.minutes": "minutes",
    "metrics.seconds": "seconds",
    "metrics.deadline_expired": "Deadline Passed ⚠️",
    "metrics.no_deadline": "No Deadline Specified",
    "metrics.engine_active": "Test Engine Active 🟢",
    "metrics.engine_idle": "Auto Test Engine Ready",
    "metrics.awaiting_grades": "Awaiting Grading",
    "metrics.tests_passed": "Tests Passed",

    // Actions & Buttons
    "action.save": "Save",
    "action.cancel": "Cancel",
    "action.confirm": "Confirm",
    "action.close": "Close",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.search": "Search...",
    "action.retry": "Retry",
    "action.quick_approve": "Instant Approve",
    "action.review_code": "Review Code",
    "action.grade_now": "Grade Now ✍️",
    "action.edit_grade": "Edit Grade",
    "action.next_student": "Next Student ⬅️",
    "action.prev_student": "Previous Student ➡️",
    "action.save_and_next": "Save & Next Student ⬅️",
    "action.save_grade": "Save & Approve Grade ✅",
    "action.run_tests": "Run Test Suite 🚀",
    "action.submit_solution": "Submit & Verify Solution 🚀",
    "action.save_preferences": "Save All Preferences ✓",

    // Statuses
    "status.submitted": "Submitted",
    "status.graded": "Graded",
    "status.pending": "Pending Evaluation",
    "status.not_submitted": "Not Submitted",
    "status.active": "Active",
    "status.expired": "Expired",

    // Python Adventure
    "py.daily_challenge": "Daily Challenge",
    "py.take_challenge": "Start Challenge",
    "py.adventure_center": "Exploration & Coding Center",
    "py.streak": "Daily Streak",
    "py.xp": "XP Points",
    "py.world_map": "Worlds Map",

    // Settings
    "settings.language": "Platform Language",
    "settings.theme": "Color Theme",
    "settings.font_scale": "Font Scale",
    "settings.save_success": "All preferences have been saved and synced to your academic profile 🚀",
    "settings.save_error": "An error occurred while saving preferences, please try again."
  }
};

/**
 * Returns translation for key or fallback text.
 */
export function t(key, fallback = "") {
  const lang = getCurrentLanguage();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.ar;
  return dict[key] !== undefined ? dict[key] : (fallback || key);
}

/**
 * Gets currently active language from Storage.
 */
export function getCurrentLanguage() {
  const lang = StorageUtils.get(STORAGE_KEYS.LANGUAGE, LANGUAGES.AR);
  return lang === LANGUAGES.EN ? LANGUAGES.EN : LANGUAGES.AR;
}

/**
 * Applies language attribute, RTL/LTR direction, and updates DOM elements.
 */
export function applyLanguageToDOM(lang = getCurrentLanguage()) {
  const targetLang = lang === LANGUAGES.EN ? LANGUAGES.EN : LANGUAGES.AR;
  StorageUtils.set(STORAGE_KEYS.LANGUAGE, targetLang);

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", targetLang);
    document.documentElement.setAttribute("dir", targetLang === LANGUAGES.AR ? "rtl" : "ltr");

    // Translate all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = t(key);
      if (translation && translation !== key) {
        if (el.tagName === "INPUT" && el.getAttribute("placeholder")) {
          el.setAttribute("placeholder", translation);
        } else {
          el.textContent = translation;
        }
      }
    });

    // Translate core sidebar navigation & portal shell dynamically
    const isEn = targetLang === LANGUAGES.EN;
    const navMap = {
      videos: isEn ? "Lectures & Lessons" : "الداتا والدروس",
      exams: isEn ? "Exams & Tests" : "الامتحانات والتقييمات",
      tasks: isEn ? "Tasks & Assignments" : "التاسكات والواجبات",
      attendance: isEn ? "Attendance & Sessions" : "الغياب والحضور",
      "python-adventure": isEn ? "Python Adventure" : "مغامرة بايثون",
      leaderboard: isEn ? "Leaderboard" : "لوحة المتصدرين",
      "cloud-console": isEn ? "Cloud IDE Console" : "الكونسول السحابي",
      profile: isEn ? "My Profile" : "حسابي الشخصي",
      settings: isEn ? "Settings & Theme" : "الإعدادات والمظهر"
    };

    document.querySelectorAll(".sidebar-item[data-section]").forEach((btn) => {
      const sec = btn.getAttribute("data-section");
      const sideText = btn.querySelector(".side-text");
      if (sideText && navMap[sec]) {
        sideText.textContent = navMap[sec];
      }
    });

    const logoutSpan = document.querySelector("#sidebarLogoutBtn span:last-child");
    if (logoutSpan) {
      logoutSpan.textContent = isEn ? "Sign Out" : "تسجيل الخروج";
    }

    const helpBtn = document.getElementById("topbarHelpBtn");
    if (helpBtn) {
      helpBtn.title = isEn ? "Student Guide" : "دليل الطالب";
    }

    // Notify listeners
    window.dispatchEvent(new CustomEvent("mw:languageChanged", { detail: { lang: targetLang } }));
  }

  return targetLang;
}

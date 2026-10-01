// src/shared/utils/group.utils.js

/**
 * Checks if two group identifiers match, handling Arabic names, English keys, and 'ALL'.
 * e.g., 'group_sun_wed' matches 'مجموعة الأحد والأربعاء | 7:00 - 8:30'.
 *
 * @param {string} groupA
 * @param {string} groupB
 * @returns {boolean}
 */
export function isGroupMatch(groupA, groupB) {
  if (!groupA || !groupB) return true;
  if (groupA === "ALL" || groupB === "ALL") return true;

  const a = String(groupA).trim().toLowerCase();
  const b = String(groupB).trim().toLowerCase();
  if (a === b) return true;

  // Check Sunday / Wednesday variations
  const isSunWedA = a.includes("sun_wed") || a.includes("أحد") || a.includes("احد") || a.includes("الأحد");
  const isSunWedB = b.includes("sun_wed") || b.includes("أحد") || b.includes("احد") || b.includes("الأحد");

  if (isSunWedA && isSunWedB) {
    const is7A = a.includes("7") || a.includes("٧");
    const is7B = b.includes("7") || b.includes("٧");
    const is9A = a.includes("9") || a.includes("٩");
    const is9B = b.includes("9") || b.includes("٩");

    if (is7A && is7B) return true;
    if (is9A && is9B) return true;
    // If one does not specify time (e.g. generic 'group_sun_wed'), match!
    if (!is7A && !is9A) return true;
    if (!is7B && !is9B) return true;
    return true;
  }

  // Check Monday / Thursday variations
  const isMonThuA = a.includes("mon_thu") || a.includes("اثنين") || a.includes("إثنين") || a.includes("خميس");
  const isMonThuB = b.includes("mon_thu") || b.includes("اثنين") || b.includes("إثنين") || b.includes("خميس");
  if (isMonThuA && isMonThuB) return true;

  return false;
}

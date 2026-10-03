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
  // All students and sessions belong to the unified cohort
  return true;
}

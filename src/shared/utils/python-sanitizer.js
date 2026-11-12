// src/shared/utils/python-sanitizer.js
/**
 * Python Code Sanitizer & Normalizer for Etihad Beshababha Academic Platform
 * Specifically resolves common mobile keyboard auto-correct and typography substitutions
 * (e.g. ≤, ≥, ≠, ×, ÷, −, smart quotes “ ”, ‘ ’) before Python interpretation.
 */

export const REPLACEMENT_RULES = [
  { regex: /[≤⩽]/g, replacement: "<=", label: "≤", target: "<=" },
  { regex: /[≥⩾]/g, replacement: ">=", label: "≥", target: ">=" },
  { regex: /≠/g, replacement: "!=", label: "≠", target: "!=" },
  { regex: /×/g, replacement: "*", label: "×", target: "*" },
  { regex: /÷/g, replacement: "/", label: "÷", target: "/" },
  { regex: /[−–—]/g, replacement: "-", label: "−", target: "-" },
  { regex: /[“”«»]/g, replacement: '"', label: "“ ”", target: '""' },
  { regex: /[‘’]/g, replacement: "'", label: "‘ ’", target: "''" }
];

/**
 * Detects if the raw Python code contains mobile keyboard typography symbols,
 * converts them to valid Python tokens, and returns both the sanitized code
 * and the list of human-readable corrections made.
 *
 * @param {string} rawCode
 * @returns {{ sanitizedCode: string, corrections: string[], hasChanges: boolean }}
 */
export function detectAndSanitizePythonCode(rawCode) {
  if (!rawCode || typeof rawCode !== "string") {
    return { sanitizedCode: rawCode || "", corrections: [], hasChanges: false };
  }

  const corrections = [];
  let sanitizedCode = rawCode;

  for (const rule of REPLACEMENT_RULES) {
    if (rule.regex.test(sanitizedCode)) {
      corrections.push(`تحويل '${rule.label}' إلى '${rule.target}'`);
      sanitizedCode = sanitizedCode.replace(rule.regex, rule.replacement);
    }
  }

  return {
    sanitizedCode,
    corrections,
    hasChanges: corrections.length > 0
  };
}

/**
 * Direct drop-in sanitizer for raw Python code.
 * @param {string} rawCode
 * @returns {string} Sanitized valid Python code
 */
export function sanitizePythonCode(rawCode) {
  return detectAndSanitizePythonCode(rawCode).sanitizedCode;
}

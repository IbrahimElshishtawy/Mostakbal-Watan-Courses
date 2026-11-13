// src/features/python-adventure/python-code-analyzer.service.js

/**
 * Python Code & Complexity Analyzer Service
 * Evaluates Time/Space Complexity, Anti-Cheat Integrity, Clean Code Index,
 * and provides smart Arabic academic reviewer feedback on submissions.
 */
export class PythonCodeAnalyzer {
  /**
   * Performs in-depth static and algorithmic analysis of Python code.
   * @param {string} code - The submitted Python code.
   * @param {object} challenge - The active challenge metadata.
   * @returns {object} Analysis report with complexity, anti-cheat, quality score, and feedback.
   */
  static analyze(code = "", challenge = {}) {
    const rawCode = String(code || "").trim();
    const cleanLines = rawCode
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith("#"));

    // 1. Detect Anti-Cheat & Hardcoded Bypass Attempts
    const antiCheat = this._detectAntiCheat(rawCode, cleanLines, challenge);

    // 2. Detect Time Complexity
    const timeComplexity = this._detectTimeComplexity(rawCode, cleanLines);

    // 3. Detect Space Complexity
    const spaceComplexity = this._detectSpaceComplexity(rawCode, cleanLines);

    // 4. Calculate Clean Code & PEP-8 Index (0 - 100)
    const cleanCode = this._calculateCleanCodeScore(rawCode, cleanLines, antiCheat);

    // 5. Generate Academic Reviewer Feedback in Arabic
    const academicFeedback = this._generateAcademicFeedback({
      timeComplexity,
      spaceComplexity,
      antiCheat,
      cleanCode,
      challenge
    });

    return {
      timeComplexity,
      spaceComplexity,
      antiCheat,
      cleanCode,
      academicFeedback,
      analyzedAt: new Date().toISOString()
    };
  }

  /**
   * Checks if student bypassed algorithmic logic by hardcoding the output directly.
   */
  static _detectAntiCheat(rawCode, cleanLines, challenge) {
    const flags = [];
    let isHardcoded = false;
    const expectedOutput = String(challenge?.expectedOutput || "").trim();

    if (expectedOutput && cleanLines.length <= 3) {
      // Check if code is just a print of the expected output
      const matchesPrintLiteral = cleanLines.some(line => {
        const printMatch = line.match(/^print\s*\(\s*(['"])(.*?)\1\s*\)$/i);
        if (printMatch && printMatch[2].trim() === expectedOutput) {
          return true;
        }
        const printNumMatch = line.match(/^print\s*\(\s*([0-9.]+)\s*\)$/i);
        if (printNumMatch && printNumMatch[1].trim() === expectedOutput) {
          return true;
        }
        return false;
      });

      if (matchesPrintLiteral && challenge.type !== "write_code_intro") {
        isHardcoded = true;
        flags.push("طباعة الناتج النهائي بشكل مباشر دون خوارزمية حسابية (Hardcoding)");
      }
    }

    // Check for hardcoded return without parameters usage
    const returnLiteralMatch = rawCode.match(/def\s+\w+\s*\([^)]*\)\s*:\s*\n\s*return\s+(['"].*?['"]|\d+)\s*$/m);
    if (returnLiteralMatch && cleanLines.length <= 4) {
      flags.push("إرجاع قيمة ثابتة من الدالة دون معالجة المدخلات");
    }

    return {
      passed: !isHardcoded,
      isHardcoded,
      flags,
      integrityBadge: isHardcoded ? "⚠️ تنبيه نزاهة الكود" : "🛡️ كود خوارزمي معتمد",
      details: isHardcoded
        ? "تم رصد محاولة طباعة الناتج مباشرة بدون تنفيذ المنطق البرمجي المطلوب."
        : "تم التحقق من نزاهة الكود البرمجي وتنفيذه عبر منطق وخوارزمية حقيقية."
    };
  }

  /**
   * Estimates Big-O Time Complexity from static code structure.
   */
  static _detectTimeComplexity(rawCode, cleanLines) {
    const lines = rawCode.split("\n");
    let maxLoopDepth = 0;
    let currentDepth = 0;
    const indentStack = [];
    let hasBinarySearch = false;
    let hasSorting = false;
    let hasRecursion = false;

    // Detect function definitions for recursion
    const funcNames = [];
    const funcDefRegex = /def\s+([a-zA-Z_]\w*)\s*\(/g;
    let match;
    while ((match = funcDefRegex.exec(rawCode)) !== null) {
      funcNames.push(match[1]);
    }

    for (const name of funcNames) {
      const callRegex = new RegExp(`\\b${name}\\s*\\(`, "g");
      const calls = (rawCode.match(callRegex) || []).length;
      if (calls > 1) {
        hasRecursion = true;
        break;
      }
    }

    // Detect sorting
    if (/\.sort\s*\(|sorted\s*\(/.test(rawCode)) {
      hasSorting = true;
    }

    // Detect Binary Search patterns (left, right, mid = (left + right) // 2)
    if (/while\s+.*<=.*:/.test(rawCode) && /\/\/\s*2/.test(rawCode)) {
      hasBinarySearch = true;
    }

    // Track loop nesting depth
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const indent = line.search(/\S/);
      while (indentStack.length > 0 && indent <= indentStack[indentStack.length - 1]) {
        indentStack.pop();
      }

      if (/^(for|while)\s+.*:/.test(trimmed)) {
        indentStack.push(indent);
        maxLoopDepth = Math.max(maxLoopDepth, indentStack.length);
      }
    }

    // Check for nested operations inside loops: e.g. .count(), .index(), in list
    let hasHiddenNestedLinear = false;
    if (maxLoopDepth >= 1) {
      for (const line of cleanLines) {
        if (/for\s+.*in\s+.*:/.test(line) === false && /while\s+.*:/.test(line) === false) {
          if (/\.count\s*\(|\.index\s*\(/.test(line)) {
            hasHiddenNestedLinear = true;
            break;
          }
        }
      }
    }

    if (hasHiddenNestedLinear && maxLoopDepth === 1) {
      maxLoopDepth = 2; // Linear inside loop makes it quadratic
    }

    // Determine Big-O notation
    let notation = "O(1)";
    let label = "ثابت O(1)";
    let rating = "optimal"; // optimal, acceptable, warning
    let explanation = "كفاءة مثالية فائقة السرعة؛ العمليات تنفذ بزمن ثابت دون حلقات تكرارية.";

    if (hasRecursion) {
      if (rawCode.includes("memo") || rawCode.includes("cache") || rawCode.includes("@lru_cache")) {
        notation = "O(N)";
        label = "خطي مع حفظ مؤقت O(N)";
        rating = "optimal";
        explanation = "دالة عودية محسنة بتقنية البرمجة الديناميكية والتخزين المؤقت (Memoization).";
      } else {
        notation = "O(2^N)";
        label = "أسي O(2ⁿ)";
        rating = "warning";
        explanation = "دالة عودية بدون تخزين مؤقت؛ قد يسبب استدعاءات متكررة مفرطة مع المدخلات الكبيرة.";
      }
    } else if (maxLoopDepth >= 3) {
      notation = "O(N³)";
      label = "تكعيبي O(N³)";
      rating = "warning";
      explanation = "ثلاث حلقات تكرارية متداخلة؛ يُنصح بإعادة هيكلة الكود لتحسين سرعة المعالجة.";
    } else if (maxLoopDepth === 2) {
      notation = "O(N²)";
      label = "تربيعي O(N²)";
      rating = "acceptable";
      explanation = "حلقات تكرارية متداخلة؛ الكود يؤدي المطلوب ولكن يمكن تسريعه باستخدام القواميس أو الـ Hash Map.";
    } else if (hasSorting) {
      notation = "O(N log N)";
      label = "لوغاريتمي خطي O(N log N)";
      rating = "optimal";
      explanation = "خوارزمية تعتمد على الترتيب الذكي (TimSort) بكفاءة معيارية عالية.";
    } else if (hasBinarySearch) {
      notation = "O(log N)";
      label = "لوغاريتمي O(log N)";
      rating = "optimal";
      explanation = "بحث ثنائي فائق الكفاءة؛ يقسم مجال البحث إلى النصف في كل خطوة.";
    } else if (maxLoopDepth === 1 || rawCode.includes("[") && rawCode.includes("for ")) {
      notation = "O(N)";
      label = "خطي O(N)";
      rating = "optimal";
      explanation = "كفاءة زمنية خطية ممتازة؛ يمر الكود على البيانات مرة واحدة فقط.";
    }

    return { notation, label, rating, explanation };
  }

  /**
   * Estimates Space Complexity from auxiliary structures.
   */
  static _detectSpaceComplexity(rawCode, cleanLines) {
    let notation = "O(1)";
    let label = "ثابت O(1)";
    let rating = "optimal";
    let explanation = "استهلاك الذاكرة في الحد الأدنى؛ لا يتم إنشاء هياكل بيانات تزيد مع حجم المدخلات.";

    const hasNewLists = /\[\s*\]|\blist\s*\(|\[\s*.*for.*in.*\]/.test(rawCode);
    const hasNewDicts = /\{\s*\}|\bdict\s*\(/.test(rawCode);
    const hasNewSets = /\bset\s*\(/.test(rawCode);

    if (hasNewLists || hasNewDicts || hasNewSets) {
      notation = "O(N)";
      label = "خطي O(N)";
      rating = "optimal";
      explanation = "يتم استخدام ذاكرة مساعدة إضافية لتخزين العناصر بكفاءة وسرعة استرجاع عالية.";
    }

    if (/def\s+\w+\s*\(.*?\):/.test(rawCode) && (rawCode.match(/return\s+\w+\s*\(/g) || []).length > 0) {
      notation = "O(N)";
      label = "خطي O(N) مكدس الذاكرة";
      rating = "acceptable";
      explanation = "الاستدعاء العودي يستهلك من Call Stack بمقدار عمق شجرة الاستدعاء.";
    }

    return { notation, label, rating, explanation };
  }

  /**
   * Scores Clean Code, PEP-8 compliance and readability (0 - 100).
   */
  static _calculateCleanCodeScore(rawCode, cleanLines, antiCheat) {
    let score = 85;
    const badges = [];
    const deductions = [];

    if (antiCheat.isHardcoded) {
      score -= 35;
      deductions.push("خصم لتجاوز الخوارزمية بطباعة مباشرة (-35)");
    }

    // Has comments explaining logic
    if (rawCode.includes("#")) {
      score += 5;
      badges.push("توثيق الكود بالتعليقات التوضيحية (+5)");
    }

    // Uses modern f-strings
    if (/f["'].*?\{.*?\}["']/.test(rawCode)) {
      score += 5;
      badges.push("استخدام سلاسل f-strings الحديثة (+5)");
    }

    // Uses Pythonic built-ins
    if (/\b(enumerate|zip|reversed|sorted|sum|max|min)\s*\(/.test(rawCode)) {
      score += 5;
      badges.push("توظيف دوال بايثون القياسية الذكية (+5)");
    }

    // List comprehensions
    if (/\[\s*.*?\s+for\s+.*?\s+in\s+.*?\]/.test(rawCode)) {
      score += 5;
      badges.push("استخدام بناء القوائم المختصر (List Comprehension) (+5)");
    }

    // Proper indentation check (4 spaces)
    const lines = rawCode.split("\n");
    let hasWeirdIndent = false;
    for (const l of lines) {
      const match = l.match(/^(\s+)\S/);
      if (match) {
        const spaces = match[1].length;
        if (spaces % 2 !== 0) {
          hasWeirdIndent = true;
          break;
        }
      }
    }

    if (hasWeirdIndent) {
      score -= 5;
      deductions.push("تنسيق المسافات البادئة غير متسق مع معايير PEP-8 (-5)");
    }

    // Clamp score between 20 and 100
    const finalScore = Math.max(20, Math.min(100, score));

    let grade = "A+";
    let gradeLabel = "كود احترافي عالي الجودة";
    if (finalScore < 60) {
      grade = "C";
      gradeLabel = "بحاجة لتحسين الهيكلة";
    } else if (finalScore < 80) {
      grade = "B";
      gradeLabel = "كود جيد ومنظم";
    } else if (finalScore < 90) {
      grade = "A";
      gradeLabel = "كود متقن ونظيف";
    }

    return {
      score: finalScore,
      grade,
      gradeLabel,
      badges,
      deductions
    };
  }

  /**
   * Constructs smart Arabic academic review.
   */
  static _generateAcademicFeedback({ timeComplexity, spaceComplexity, antiCheat, cleanCode, challenge }) {
    if (antiCheat.isHardcoded) {
      return `⚠️ تنبيه المراجع الأكاديمي: الحل يعتمد على طباعة ناتج مباشر. في المقابلات التقنية والمسابقات البرمجية، يشترط استخدام متغيرات وحلقات تكرار أو دوال لمعالجة الحالات المختلفة.`;
    }

    let msg = `تحليل الأداء: الكود يعمل بتعقيد زمني ${timeComplexity.label} وتعقيد مكاني ${spaceComplexity.label}. `;

    if (timeComplexity.rating === "optimal") {
      msg += `كفاءة التنفيذ مثالية وتتوافق مع أعلى معايير البرمجة التنافسية. `;
    } else if (timeComplexity.rating === "acceptable") {
      msg += `الكود صحيح، ولكن يُمكن تحسين الكفاءة لاحقاً لتقليل التعقيد من ${timeComplexity.notation} إلى O(N) عبر القواميس أو المؤشرات المزدوجة. `;
    }

    if (cleanCode.score >= 90) {
      msg += `تقييم جودة الصياغة ${cleanCode.score}% (${cleanCode.gradeLabel}).`;
    } else {
      msg += `نصيحة أسلوب الكود: احرص على استخدام أسماء متغيرات واضحة وتنسيق المسافات وفق معيار PEP-8.`;
    }

    return msg;
  }
}

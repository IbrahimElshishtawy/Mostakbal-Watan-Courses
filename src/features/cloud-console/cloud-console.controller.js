// src/features/cloud-console/cloud-console.controller.js

import { renderCloudConsoleView, CLOUD_CONSOLE_TEMPLATES } from "./cloud-console.component.js";
import { runPythonCode, ensurePythonRuntime } from "../python-adventure/python-adventure-runtime.js";

const DRAFT_STORAGE_KEY = "cloud_console_draft_code";
let currentFontSize = 14;

export const CloudConsoleController = {
  /**
   * Initializes the Cloud Console workspace inside the specified container.
   * @param {string|HTMLElement} containerId
   * @param {object} [student]
   */
  async init(containerId, student = null) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) {
      console.error("[CloudConsole] Container not found:", containerId);
      return;
    }

    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY) || "";
    // If the saved draft has the old template dummy code with "إبراهيم خالد", reset to clean empty editor
    const isOldDefault =
      !savedDraft ||
      savedDraft === CLOUD_CONSOLE_TEMPLATES.hello_world.code ||
      savedDraft.includes("name = \"إبراهيم خالد\"") ||
      savedDraft.includes("إبراهيم خالد") ||
      savedDraft.includes("status = \n");

    const initialCode = isOldDefault ? "" : savedDraft;
    if (isOldDefault && savedDraft) {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }

    container.innerHTML = renderCloudConsoleView({ initialCode });

    this.bindEvents(container, student);
    this.updateLineNumbers(container);
    this.updateStats(container);
    this.updateAssistantStatus(container);

    // Warm up Python runtime in background without blocking
    ensurePythonRuntime().catch((err) => {
      console.warn("[CloudConsole] Runtime background preload warning:", err);
    });
  },

  /**
   * Binds all user interactions, editor inputs, shortcuts, and execution buttons.
   */
  bindEvents(container, student) {
    const editor = container.querySelector("#consoleCodeEditor");
    const lineNumbers = container.querySelector("#consoleLineNumbers");
    const runBtn = container.querySelector("#consoleRunCodeBtn");
    const clearBtn = container.querySelector("#consoleClearOutputBtn");
    const copyBtn = container.querySelector("#consoleCopyBtn");
    const downloadBtn = container.querySelector("#consoleDownloadBtn");
    const resetBtn = container.querySelector("#consoleResetBtn");
    const templateSelect = container.querySelector("#consoleTemplateSelect");
    const fontIncBtn = container.querySelector("#consoleFontIncreaseBtn");
    const fontDecBtn = container.querySelector("#consoleFontDecreaseBtn");
    const stdout = container.querySelector("#consoleStdout");
    const stderr = container.querySelector("#consoleStderr");
    const statusChip = container.querySelector("#terminalStatusChip");
    const statusText = container.querySelector("#terminalStatusText");
    const execTime = container.querySelector("#consoleExecutionTime");

    if (!editor) return;

    // 1. Textarea Input: Line numbers, stats, live syntax assistant, and autosave
    editor.addEventListener("input", () => {
      this.updateLineNumbers(container);
      this.updateStats(container);
      this.updateAssistantStatus(container);
      if (editor.value.trim()) {
        localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
      } else {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    });

    // 2. Scroll Sync between Line Numbers and Textarea
    editor.addEventListener("scroll", () => {
      if (lineNumbers) {
        lineNumbers.scrollTop = editor.scrollTop;
      }
    });

    // 3. Smart Auto-Pairing, Tab Indentation & Keyboard Shortcuts
    editor.addEventListener("keydown", (e) => {
      // Ctrl+Enter or Cmd+Enter to Run
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runBtn?.click();
        return;
      }

      // Tab Key: Insert 4 spaces or indent selection
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        if (start === end) {
          editor.setRangeText("    ", start, end, "end");
        } else {
          const val = editor.value;
          const firstLineStart = val.lastIndexOf("\n", start - 1) + 1;
          const lastLineEnd = val.indexOf("\n", end) === -1 ? val.length : val.indexOf("\n", end);
          const selectedBlock = val.substring(firstLineStart, lastLineEnd);
          const lines = selectedBlock.split("\n");
          if (e.shiftKey) {
            const newLines = lines.map((l) => (l.startsWith("    ") ? l.substring(4) : l.replace(/^\s{1,3}/, "")));
            editor.setRangeText(newLines.join("\n"), firstLineStart, lastLineEnd, "select");
          } else {
            const newLines = lines.map((l) => "    " + l);
            editor.setRangeText(newLines.join("\n"), firstLineStart, lastLineEnd, "select");
          }
        }

        this.updateLineNumbers(container);
        this.updateStats(container);
        this.updateAssistantStatus(container);
        localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
        return;
      }

      // Overtyping closing characters
      const closeChars = [")", "]", "}", "\"", "'"];
      if (closeChars.includes(e.key) && editor.selectionStart === editor.selectionEnd) {
        const nextChar = editor.value.charAt(editor.selectionStart);
        if (nextChar === e.key) {
          e.preventDefault();
          editor.selectionStart = editor.selectionEnd = editor.selectionStart + 1;
          return;
        }
      }

      // Auto-Pairing for opening brackets and quotes
      const pairs = { "(": ")", "[": "]", "{": "}", "\"": "\"", "'": "'" };
      if (pairs[e.key] && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const pair = pairs[e.key];

        if (start !== end) {
          const selectedText = editor.value.substring(start, end);
          editor.setRangeText(`${e.key}${selectedText}${pair}`, start, end, "select");
        } else {
          editor.setRangeText(`${e.key}${pair}`, start, end, "end");
          editor.selectionStart = editor.selectionEnd = start + 1;
        }

        this.updateLineNumbers(container);
        this.updateStats(container);
        this.updateAssistantStatus(container);
        localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
        return;
      }

      // Backspace between empty pairs delete both: () [] {} "" ''
      if (e.key === "Backspace" && editor.selectionStart === editor.selectionEnd) {
        const pos = editor.selectionStart;
        if (pos > 0 && pos < editor.value.length) {
          const prev = editor.value.charAt(pos - 1);
          const next = editor.value.charAt(pos);
          if (
            (prev === "(" && next === ")") ||
            (prev === "[" && next === "]") ||
            (prev === "{" && next === "}") ||
            (prev === "\"" && next === "\"") ||
            (prev === "'" && next === "'")
          ) {
            e.preventDefault();
            editor.setRangeText("", pos - 1, pos + 1, "end");
            this.updateLineNumbers(container);
            this.updateStats(container);
            this.updateAssistantStatus(container);
            localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
            return;
          }
        }
      }

      // Smart Enter: Auto Indentation
      if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const pos = editor.selectionStart;
        const val = editor.value;
        const lineStart = val.lastIndexOf("\n", pos - 1) + 1;
        const currentLine = val.substring(lineStart, pos);

        const indentMatch = currentLine.match(/^\s*/);
        let indent = indentMatch ? indentMatch[0] : "";

        if (currentLine.trimEnd().endsWith(":")) {
          indent += "    ";
        }

        const insertion = "\n" + indent;
        editor.setRangeText(insertion, pos, editor.selectionEnd, "end");
        this.updateLineNumbers(container);
        this.updateStats(container);
        this.updateAssistantStatus(container);
        localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
        return;
      }
    });

    // 4. Run Code Button
    runBtn?.addEventListener("click", async () => {
      const code = editor.value;
      if (!code.trim()) {
        stderr.innerHTML = `
          <div class="friendly-error-card">
            <div class="friendly-error-header">
              <div class="friendly-error-title-wrap">
                <span>⚠️</span>
                <span>المحرر فارغ!</span>
              </div>
            </div>
            <div class="friendly-error-desc">اكتب بعض كود بايثون لتشغيله ورؤية المخرجات فورياً.</div>
          </div>
        `;
        stderr.classList.remove("d-none");
        return;
      }

      // UI state: Running
      runBtn.disabled = true;
      runBtn.classList.add("is-loading");
      runBtn.querySelector(".btn-run-label").textContent = "جاري التنفيذ...";
      statusChip.className = "terminal-status-chip is-running";
      statusText.textContent = "جاري التشغيل...";
      stderr.classList.add("d-none");
      stderr.innerHTML = "";
      stdout.textContent = "";

      try {
        // Sanitize unicode math symbols commonly inserted by mobile keyboards (≤, ⩾, ≠, smart quotes)
        const sanitizedCode = code
          .replace(/[≤⩽]/g, "<=")
          .replace(/[≥⩾]/g, ">=")
          .replace(/≠/g, "!=")
          .replace(/[“”]/g, '"')
          .replace(/[‘’]/g, "'");

        const result = await runPythonCode(sanitizedCode, {
          timeoutMs: 15000,
          onOutput: (stream) => {
            stdout.textContent = stream;
            const termScreen = container.querySelector("#consoleTerminalScreen");
            if (termScreen) termScreen.scrollTop = termScreen.scrollHeight;
          }
        });

        if (result.error) {
          const parsed = this.parseFriendlyError(result.error);
          stderr.innerHTML = this.renderFriendlyErrorCard(parsed);
          stderr.classList.remove("d-none");
          statusChip.className = "terminal-status-chip is-error";
          statusText.textContent = "خطأ في الكود";
          execTime.textContent = `⏱️ توقف عند ${result.executionTimeMs}ms`;

          // Bind error actions
          this.bindErrorActions(container, parsed);
        } else {
          statusChip.className = "terminal-status-chip is-success";
          statusText.textContent = "تم بنجاح ✔️";
          execTime.textContent = `⚡ اكتمل في ${result.executionTimeMs}ms`;
          if (!result.output.trim()) {
            stdout.textContent = "# تم تنفيذ البرنامج بنجاح بدون أخطاء (لم يُطبع شيء عبر print).";
          }
        }
      } catch (err) {
        stderr.innerHTML = `
          <div class="friendly-error-card">
            <div class="friendly-error-header">
              <div class="friendly-error-title-wrap">
                <span>❌</span>
                <span>خطأ غير متوقع</span>
              </div>
            </div>
            <div class="friendly-error-desc">${err.message || err}</div>
          </div>
        `;
        stderr.classList.remove("d-none");
        statusChip.className = "terminal-status-chip is-error";
        statusText.textContent = "فشل التشغيل";
      } finally {
        runBtn.disabled = false;
        runBtn.classList.remove("is-loading");
        runBtn.querySelector(".btn-run-label").textContent = "تشغيل الكود الآن";
        const termScreen = container.querySelector("#consoleTerminalScreen");
        if (termScreen) termScreen.scrollTop = termScreen.scrollHeight;
      }
    });

    // 5. Clear Output Button
    clearBtn?.addEventListener("click", () => {
      stdout.textContent = "";
      stderr.innerHTML = "";
      stderr.classList.add("d-none");
      statusChip.className = "terminal-status-chip is-idle";
      statusText.textContent = "جاهز للتشغيل";
      execTime.textContent = "محرك Skulpt Sandbox";
    });

    // 6. Copy Code Button
    copyBtn?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(editor.value);
        const originalLabel = copyBtn.innerHTML;
        copyBtn.innerHTML = "<span>✔️</span><span>تم النسخ!</span>";
        setTimeout(() => {
          copyBtn.innerHTML = originalLabel;
        }, 1500);
      } catch (e) {
        editor.select();
        document.execCommand("copy");
      }
    });

    // 7. Download .py File
    downloadBtn?.addEventListener("click", () => {
      const code = editor.value;
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "main.py";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // 8. Reset / Clear Code Button
    resetBtn?.addEventListener("click", () => {
      if (confirm("هل تريد مسح المحرر بالكامل والبدء من جديد؟")) {
        editor.value = "";
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        this.updateLineNumbers(container);
        this.updateStats(container);
        this.updateAssistantStatus(container);
        clearBtn?.click();
      }
    });

    // 9. Template Selector Dropdown
    templateSelect?.addEventListener("change", (e) => {
      const templateId = e.target.value;
      if (templateId && CLOUD_CONSOLE_TEMPLATES[templateId]) {
        editor.value = CLOUD_CONSOLE_TEMPLATES[templateId].code;
        this.updateLineNumbers(container);
        this.updateStats(container);
        this.updateAssistantStatus(container);
        localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
        clearBtn?.click();
      }
    });

    // 10. Font Size Adjustments
    fontIncBtn?.addEventListener("click", () => {
      if (currentFontSize < 24) {
        currentFontSize += 2;
        editor.style.fontSize = `${currentFontSize}px`;
        if (lineNumbers) lineNumbers.style.fontSize = `${currentFontSize}px`;
      }
    });

    fontDecBtn?.addEventListener("click", () => {
      if (currentFontSize > 11) {
        currentFontSize -= 2;
        editor.style.fontSize = `${currentFontSize}px`;
        if (lineNumbers) lineNumbers.style.fontSize = `${currentFontSize}px`;
      }
    });

    // 11. Quick Syntax Reference Chips
    container.querySelectorAll(".cheat-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const snippet = chip.getAttribute("data-snippet") || "";
        if (!snippet) return;

        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const currentVal = editor.value;

        // Unescape \n
        const parsedSnippet = snippet.replace(/\\n/g, "\n");
        const separator = currentVal.length > 0 && !currentVal.endsWith("\n") ? "\n\n" : "";

        editor.value = currentVal.substring(0, start) + separator + parsedSnippet + "\n" + currentVal.substring(end);
        editor.selectionStart = editor.selectionEnd = start + separator.length + parsedSnippet.length + 1;
        editor.focus();

        this.updateLineNumbers(container);
        this.updateStats(container);
        this.updateAssistantStatus(container);
        localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
      });
    });
  },

  /**
   * Updates line numbers in the gutter to match the textarea.
   */
  updateLineNumbers(container) {
    const editor = container.querySelector("#consoleCodeEditor");
    const lineNumbers = container.querySelector("#consoleLineNumbers");
    if (!editor || !lineNumbers) return;

    const linesCount = Math.max(1, editor.value.split("\n").length);
    let linesHtml = "";
    for (let i = 1; i <= linesCount; i++) {
      linesHtml += `<span>${i}</span>\n`;
    }
    lineNumbers.innerHTML = linesHtml;
  },

  /**
   * Updates line and character count stats.
   */
  updateStats(container) {
    const editor = container.querySelector("#consoleCodeEditor");
    const statsEl = container.querySelector("#consoleEditorStats");
    if (!editor || !statsEl) return;

    const lines = Math.max(1, editor.value.split("\n").length);
    const chars = editor.value.length;
    statsEl.textContent = `السطور: ${lines} | الحروف: ${chars}`;
  },

  /**
   * Runs real-time Python syntax and typing analysis and updates the Assistant bar.
   */
  updateAssistantStatus(container) {
    const editor = container.querySelector("#consoleCodeEditor");
    const bar = container.querySelector("#consoleAssistantBar");
    const icon = container.querySelector("#consoleAssistantIcon");
    const text = container.querySelector("#consoleAssistantText");
    const actions = container.querySelector("#consoleAssistantActions");
    if (!editor || !bar || !icon || !text || !actions) return;

    const analysis = this.analyzePythonSyntax(editor.value);

    // Reset bar states
    bar.classList.remove("is-clean", "is-warning", "is-error");
    actions.innerHTML = "";

    if (analysis.status === "empty") {
      icon.textContent = "✨";
      text.textContent = "المساعد الذكي جاهز لمتابعة كتابتك واكتشاف الأخطاء وتصحيحها فورياً.";
    } else if (analysis.status === "clean") {
      bar.classList.add("is-clean");
      icon.textContent = "✔️";
      text.textContent = "الكود سليم وخالٍ من الأخطاء النحوية! جاهز للتشغيل (Ctrl + Enter).";
    } else if (analysis.status === "issue") {
      bar.classList.add("is-warning");
      icon.textContent = "⚠️";
      text.textContent = analysis.message;

      if (typeof analysis.fix === "function") {
        const fixBtn = document.createElement("button");
        fixBtn.type = "button";
        fixBtn.className = "btn-quick-fix";
        fixBtn.innerHTML = "<span>🪄</span><span>إصلاح تلقائي</span>";
        fixBtn.addEventListener("click", () => {
          const fixedCode = analysis.fix();
          editor.value = fixedCode;
          this.updateLineNumbers(container);
          this.updateStats(container);
          this.updateAssistantStatus(container);
          localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
        });
        actions.appendChild(fixBtn);
      }
    }
  },

  /**
   * Analyzes Python code for common syntax, typing, and formatting errors in real time.
   */
  analyzePythonSyntax(code) {
    if (!code || !code.trim()) {
      return { status: "empty" };
    }

    const lines = code.split("\n");

    // 1. Accidental Arabic punctuation or characters in code (outside comments)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const commentIdx = line.indexOf("#");
      const codePart = commentIdx >= 0 ? line.substring(0, commentIdx) : line;

      // Arabic comma, semicolon, question mark, quotes, or Eastern Arabic digits
      const arabicSymbolsRegex = /[،؛؟”“‘’٠-٩]/;
      if (arabicSymbolsRegex.test(codePart)) {
        return {
          status: "issue",
          type: "arabic_symbols",
          line: i + 1,
          message: `السطر ${i + 1}: تم اكتشاف علامات ترقيم أو أرقام عربية (، أو ؛ أو أرقام مشرقية) قد تعطل الكود.`,
          fix: () => {
            const replacer = (text) =>
              text
                .replace(/،/g, ",")
                .replace(/؛/g, ";")
                .replace(/؟/g, "?")
                .replace(/[“”]/g, '"')
                .replace(/[‘’]/g, "'")
                .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
            return lines.map((l, idx) => (idx === i ? replacer(l) : l)).join("\n");
          }
        };
      }

      // Mobile math comparison symbols: ≤, ⩽, ≥, ⩾, ≠
      const mathSymbolsRegex = /[≤⩽≥⩾≠]/;
      if (mathSymbolsRegex.test(codePart)) {
        return {
          status: "issue",
          type: "math_symbols",
          line: i + 1,
          message: `السطر ${i + 1}: تم استخدام رمز مقارنة رياضي غير مدعوم في بايثون (مثل '≤' أو '≠'). استخدم '<=' أو '!=' بدلاً منه.`,
          fix: () => {
            const replacer = (text) =>
              text
                .replace(/[≤⩽]/g, "<=")
                .replace(/[≥⩾]/g, ">=")
                .replace(/≠/g, "!=");
            return lines.map((l, idx) => (idx === i ? replacer(l) : l)).join("\n");
          }
        };
      }
    }

    // 2. Missing colon ':' on compound statements
    const compoundRegex = /^\s*(if\b|elif\b|else\b|for\b|while\b|def\b|class\b|try\b|except\b|finally\b|with\b)/;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const commentIdx = line.indexOf("#");
      const codePart = (commentIdx >= 0 ? line.substring(0, commentIdx) : line).trimEnd();

      if (compoundRegex.test(codePart)) {
        if (!codePart.endsWith(":")) {
          const match = codePart.match(compoundRegex);
          const keyword = match ? match[1] : "الشرط/الدالة";
          return {
            status: "issue",
            type: "missing_colon",
            line: i + 1,
            message: `السطر ${i + 1}: نسيت إضافة النقطتين ':' في نهاية جملة (${keyword}).`,
            fix: () => {
              return lines
                .map((l, idx) => {
                  if (idx !== i) return l;
                  const cIdx = l.indexOf("#");
                  if (cIdx >= 0) {
                    return l.substring(0, cIdx).trimEnd() + ":" + " " + l.substring(cIdx);
                  }
                  return l.trimEnd() + ":";
                })
                .join("\n");
            }
          };
        }
      }
    }

    // 3. Single '=' in comparison inside if or while
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const commentIdx = line.indexOf("#");
      const codePart = commentIdx >= 0 ? line.substring(0, commentIdx) : line;
      const assignmentInCondRegex = /^\s*(if|elif|while)\s+([a-zA-Z_]\w*(?:\s*\[[^\]]+\])?)\s*=(?!=)\s*([^:]+)/;
      const match = codePart.match(assignmentInCondRegex);
      if (match) {
        return {
          status: "issue",
          type: "single_equal",
          line: i + 1,
          message: `السطر ${i + 1}: خطأ شائع! استخدمت '=' (إسناد) بدلاً من '==' (مقارنة) داخل الشرط.`,
          fix: () => {
            return lines
              .map((l, idx) => {
                if (idx !== i) return l;
                return l.replace(/=(?!=)/, "==");
              })
              .join("\n");
          }
        };
      }
    }

    // 4. Keyword Typos (elseif, elsif, function, true, false, null)
    const typoKeywords = [
      { regex: /\belseif\b/g, correct: "elif", name: "elseif" },
      { regex: /\belsif\b/g, correct: "elif", name: "elsif" },
      { regex: /\bfunction\b/g, correct: "def", name: "function" },
      { regex: /\btrue\b/g, correct: "True", name: "true" },
      { regex: /\bfalse\b/g, correct: "False", name: "false" },
      { regex: /\bnull\b/g, correct: "None", name: "null" }
    ];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const commentIdx = line.indexOf("#");
      const codePart = commentIdx >= 0 ? line.substring(0, commentIdx) : line;
      for (const typo of typoKeywords) {
        if (typo.regex.test(codePart)) {
          return {
            status: "issue",
            type: "keyword_typo",
            line: i + 1,
            message: `السطر ${i + 1}: في بايثون نكتب '${typo.correct}' بدلاً من '${typo.name}'.`,
            fix: () => {
              return lines
                .map((l, idx) => {
                  if (idx !== i) return l;
                  return l.replace(typo.regex, typo.correct);
                })
                .join("\n");
            }
          };
        }
      }
    }

    // 5. Unclosed Quotes on single lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('"""') || line.includes("'''")) continue;
      const commentIdx = line.indexOf("#");
      const codePart = commentIdx >= 0 ? line.substring(0, commentIdx) : line;

      const dQuotes = (codePart.match(/(?<!\\)"/g) || []).length;
      if (dQuotes % 2 !== 0) {
        return {
          status: "issue",
          type: "unclosed_double_quote",
          line: i + 1,
          message: `السطر ${i + 1}: علامة تنصيص مزدوجة (") غير مغلقة.`,
          fix: () => {
            return lines
              .map((l, idx) => {
                if (idx !== i) return l;
                const cIdx = l.indexOf("#");
                if (cIdx >= 0) {
                  return l.substring(0, cIdx).trimEnd() + '" ' + l.substring(cIdx);
                }
                return l.trimEnd() + '"';
              })
              .join("\n");
          }
        };
      }

      const sQuotes = (codePart.match(/(?<!\\)'/g) || []).length;
      if (sQuotes % 2 !== 0) {
        return {
          status: "issue",
          type: "unclosed_single_quote",
          line: i + 1,
          message: `السطر ${i + 1}: علامة تنصيص مفردة (') غير مغلقة.`,
          fix: () => {
            return lines
              .map((l, idx) => {
                if (idx !== i) return l;
                const cIdx = l.indexOf("#");
                if (cIdx >= 0) {
                  return l.substring(0, cIdx).trimEnd() + "' " + l.substring(cIdx);
                }
                return l.trimEnd() + "'";
              })
              .join("\n");
          }
        };
      }
    }

    // 6. Unclosed Brackets
    let roundOpen = 0,
      squareOpen = 0,
      curlyOpen = 0;
    const sanitized = code
      .replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, "")
      .replace(/"(\\.|[^"\\])*"/g, "")
      .replace(/'(\\.|[^'\\])*'/g, "")
      .replace(/#.*$/gm, "");

    for (const char of sanitized) {
      if (char === "(") roundOpen++;
      else if (char === ")") roundOpen = Math.max(0, roundOpen - 1);
      else if (char === "[") squareOpen++;
      else if (char === "]") squareOpen = Math.max(0, squareOpen - 1);
      else if (char === "{") curlyOpen++;
      else if (char === "}") curlyOpen = Math.max(0, curlyOpen - 1);
    }

    if (roundOpen > 0) {
      return {
        status: "issue",
        type: "unclosed_bracket",
        message: "تنبيه: يوجد قوس '(' لم يتم إغلاقه ')' في الكود.",
        fix: () => code.trimEnd() + ")".repeat(roundOpen)
      };
    }
    if (squareOpen > 0) {
      return {
        status: "issue",
        type: "unclosed_bracket",
        message: "تنبيه: يوجد قوس مصفوفة '[' لم يتم إغلاقه ']' في الكود.",
        fix: () => code.trimEnd() + "]".repeat(squareOpen)
      };
    }
    if (curlyOpen > 0) {
      return {
        status: "issue",
        type: "unclosed_bracket",
        message: "تنبيه: يوجد قوس معقوف '{' لم يتم إغلاقه '}' في الكود.",
        fix: () => code.trimEnd() + "}".repeat(curlyOpen)
      };
    }

    // 7. Indentation after colon
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i];
      const commentIdx = line.indexOf("#");
      const codePart = (commentIdx >= 0 ? line.substring(0, commentIdx) : line).trimEnd();
      if (codePart.endsWith(":")) {
        let nextIdx = -1;
        for (let j = i + 1; j < lines.length; j++) {
          const l = lines[j].trim();
          if (l && !l.startsWith("#")) {
            nextIdx = j;
            break;
          }
        }
        if (nextIdx !== -1) {
          const parentIndent = line.match(/^\s*/)[0].length;
          const nextIndent = lines[nextIdx].match(/^\s*/)[0].length;
          if (nextIndent <= parentIndent) {
            return {
              status: "issue",
              type: "missing_indent",
              line: nextIdx + 1,
              message: `السطر ${nextIdx + 1}: خطأ مسافة بادئة (Indentation). يجب أن يبدأ السطر بمسافة بادئة بعد النقطتين ':'.`,
              fix: () => {
                return lines
                  .map((l, idx) => {
                    if (idx === nextIdx) {
                      return "    " + l;
                    }
                    return l;
                  })
                  .join("\n");
              }
            };
          }
        }
      }
    }

    return { status: "clean" };
  },

  /**
   * Parses runtime Python/Skulpt errors into Arabic friendly guidance.
   */
  parseFriendlyError(errorText) {
    if (!errorText) return null;
    const str = String(errorText);

    const lineMatch = str.match(/on line (\d+)|line (\d+)/i);
    const line = lineMatch ? lineMatch[1] || lineMatch[2] : null;

    let type = "خطأ برمجي (Runtime Error)";
    let desc = "حدث خطأ أثناء محاولة تنفيذ الكود البرمجي.";
    let hint = "راجع تفاصيل الخطأ واستخدم زر الذهاب للسطر لمعاينته في المحرر.";

    if (str.includes("SyntaxError") || str.includes("ParseError") || str.includes("bad token") || str.includes("TokenError")) {
      type = "خطأ في الصياغة ورموز غير مدعومة (SyntaxError / ParseError)";
      desc = "الصياغة البرمجية لهذا السطر غير صحيحة، أو تم استخدام رمز غير مدعوم في بايثون (مثل كتابة '≤' بدلاً من '<=' أو '≠' بدلاً من '!=').";
      hint = "في بايثون، استخدم علامات المقارنة العادية: '<=' و '>=' و '!='، وتأكد من إغلاق كافة الأقواس وعلامات التنصيص والنقطتين ':'";
    } else if (str.includes("NameError")) {
      const nameMatch = str.match(/name '(\w+)' is not defined/i);
      const varName = nameMatch ? nameMatch[1] : "المتغير";
      type = "اسم غير معرّف (NameError)";
      desc = `حاولت استخدام '${varName}' ولكن هذا المتغير أو الدالة غير معرّف مسبقاً.`;
      hint = `تأكد من كتابة الاسم بحروف صحيحة أو إعطائه قيمة مسبقاً (مثل: ${varName} = 0).`;
    } else if (str.includes("IndentationError")) {
      type = "خطأ مسافات بادئة (IndentationError)";
      desc = "الترتيب الهيكلي للمسافات البادئة غير متناسق.";
      hint = "في بايثون، استخدم 4 مسافات أو زر Tab لتوحيد المسافات البادئة لكل كتلة برمجية داخل الشروط والدوال.";
    } else if (str.includes("TypeError")) {
      type = "عدم توافق أنواع البيانات (TypeError)";
      desc = "تم تطبيق عملية أو دالة على نوع بيانات غير مناسب.";
      hint = "مثال: لا يمكن جمع نص مع رقم مباشرة بدون تحويله عبر str() أو int().";
    } else if (str.includes("ZeroDivisionError")) {
      type = "القسمة على صفر (ZeroDivisionError)";
      desc = "محاولة حسابية غير معرّفة: تمت محاولة القسمة على الصفر.";
      hint = "تأكد من أن المقام في عملية القسمة لا يساوي صفراً.";
    } else if (str.includes("IndexError")) {
      type = "فهرس خارج النطاق (IndexError)";
      desc = "حاولت الوصول إلى عنصر في القائمة عبر فهرس (Index) غير موجود.";
      hint = "تأكد من حجم القائمة عبر len(list) قبل طلب العنصر.";
    } else if (str.includes("ValueError")) {
      type = "قيمة غير صالحة (ValueError)";
      desc = "الدالة تلقت قيمة بنوع صحيح لكن بمحتوى غير متوافق (مثل تحويل كلمة إلى رقم).";
      hint = "تأكد من مدخلات التحويل والعمليات الحسابية.";
    }

    return { type, line, desc, hint, raw: str };
  },

  /**
   * Renders a friendly Arabic error diagnosis card.
   */
  renderFriendlyErrorCard(parsed) {
    if (!parsed) return "";
    return `
      <div class="friendly-error-card">
        <div class="friendly-error-header">
          <div class="friendly-error-title-wrap">
            <span>🚨</span>
            <span class="friendly-error-title">${parsed.type}</span>
          </div>
          ${parsed.line ? `<span class="friendly-error-line">السطر ${parsed.line}</span>` : ""}
        </div>
        <div class="friendly-error-desc">${parsed.desc}</div>
        <div class="friendly-error-hint">💡 نصيحة للحل: ${parsed.hint}</div>
        <div class="friendly-error-actions">
          ${
            parsed.line
              ? `<button type="button" class="btn-goto-line" data-line="${parsed.line}">
                  <span>🎯</span>
                  <span>الذهاب للسطر ${parsed.line} في المحرر</span>
                </button>`
              : ""
          }
          <button type="button" class="btn-toggle-trace" id="toggleRawTraceBtn">
            <span>🔍 تفاصيل الخطأ الخام</span>
          </button>
        </div>
        <pre class="raw-trace-box d-none" id="rawTraceBox">${parsed.raw}</pre>
      </div>
    `;
  },

  /**
   * Binds click handlers for the friendly error card.
   */
  bindErrorActions(container, parsed) {
    const editor = container.querySelector("#consoleCodeEditor");
    const gotoBtn = container.querySelector(".btn-goto-line");
    const toggleTraceBtn = container.querySelector("#toggleRawTraceBtn");
    const rawTraceBox = container.querySelector("#rawTraceBox");

    gotoBtn?.addEventListener("click", () => {
      const line = gotoBtn.getAttribute("data-line");
      this.gotoLine(editor, line);
    });

    toggleTraceBtn?.addEventListener("click", () => {
      rawTraceBox?.classList.toggle("d-none");
    });
  },

  /**
   * Highlights and positions cursor at a specific line in the editor.
   */
  gotoLine(editor, lineNumber) {
    if (!editor || !lineNumber) return;
    const lineNum = parseInt(lineNumber, 10);
    const lines = editor.value.split("\n");
    if (lineNum < 1 || lineNum > lines.length) return;

    let charPos = 0;
    for (let i = 0; i < lineNum - 1; i++) {
      charPos += lines[i].length + 1;
    }
    const lineLength = lines[lineNum - 1].length;

    editor.focus();
    editor.setSelectionRange(charPos, charPos + lineLength);

    const lineHeight = 22.4;
    editor.scrollTop = Math.max(0, (lineNum - 3) * lineHeight);
  }
};

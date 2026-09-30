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
    container.innerHTML = renderCloudConsoleView({ initialCode: savedDraft });

    this.bindEvents(container, student);
    this.updateLineNumbers(container);
    this.updateStats(container);

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

    // 1. Textarea Input: Line numbers, stats, and autosave
    editor.addEventListener("input", () => {
      this.updateLineNumbers(container);
      this.updateStats(container);
      localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
    });

    // 2. Scroll Sync between Line Numbers and Textarea
    editor.addEventListener("scroll", () => {
      if (lineNumbers) {
        lineNumbers.scrollTop = editor.scrollTop;
      }
    });

    // 3. Tab Key Indentation & Keyboard Shortcuts
    editor.addEventListener("keydown", (e) => {
      // Ctrl+Enter or Cmd+Enter to Run
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runBtn?.click();
        return;
      }

      // Tab Key: Insert 4 spaces
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        // Insert 4 spaces
        editor.value = editor.value.substring(0, start) + "    " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;

        this.updateLineNumbers(container);
        this.updateStats(container);
        localStorage.setItem(DRAFT_STORAGE_KEY, editor.value);
      }
    });

    // 4. Run Code Button
    runBtn?.addEventListener("click", async () => {
      const code = editor.value;
      if (!code.trim()) {
        stderr.innerHTML = "⚠️ تنبيه: المحرر فارغ! اكتب بعض كود بايثون لتشغيله.";
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
        const result = await runPythonCode(code, {
          timeoutMs: 4500,
          onOutput: (stream) => {
            stdout.textContent = stream;
            const termScreen = container.querySelector("#consoleTerminalScreen");
            if (termScreen) termScreen.scrollTop = termScreen.scrollHeight;
          }
        });

        if (result.error) {
          stderr.innerHTML = result.error;
          stderr.classList.remove("d-none");
          statusChip.className = "terminal-status-chip is-error";
          statusText.textContent = "خطأ في الكود";
          execTime.textContent = `⏱️ توقف عند ${result.executionTimeMs}ms`;
        } else {
          statusChip.className = "terminal-status-chip is-success";
          statusText.textContent = "تم بنجاح ✔️";
          execTime.textContent = `⚡ اكتمل في ${result.executionTimeMs}ms`;
          if (!result.output.trim()) {
            stdout.textContent = "# تم تنفيذ البرنامج بنجاح (لم يتم طباعة أي مخرجات عبر print).";
          }
        }
      } catch (err) {
        stderr.innerHTML = `❌ خطأ غير متوقع: ${err.message || err}`;
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

    // 8. Reset Code Button
    resetBtn?.addEventListener("click", () => {
      if (confirm("هل أنت متأكد من رغبتك في إعادة تعيين الكود واستعادة القالب الافتراضي؟")) {
        editor.value = CLOUD_CONSOLE_TEMPLATES.hello_world.code;
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        this.updateLineNumbers(container);
        this.updateStats(container);
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

    const linesCount = editor.value.split("\n").length;
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

    const lines = editor.value.split("\n").length;
    const chars = editor.value.length;
    statsEl.textContent = `السطور: ${lines} | الحروف: ${chars}`;
  }
};

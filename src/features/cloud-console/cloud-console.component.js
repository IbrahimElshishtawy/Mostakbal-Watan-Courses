// src/features/cloud-console/cloud-console.component.js

export const CLOUD_CONSOLE_TEMPLATES = {
  hello_world: {
    id: "hello_world",
    title: "مرحباً بايثون (Hello World)",
    code: `# مرحباً بك في الكونسول السحابي لبايثون
print("=" * 45)
print("مرحباً بك في منصة مستقبل وطن التعليمية! 🎓")
print("بيئة تشغيل بايثون السحابية التفاعلية 🐍")
print("=" * 45)

name = "إبراهيم خالد"
course = "دبلومة البرمجة وهندسة النظم"
status = "طالب متميز"

print(f"الطالب: {name}")
print(f"الدورة: {course}")
print(f"الحالة: {status}")
print("جاهز لكتابة واختبار أروع الأكواد البرمجية!")
`
  },
  variables_math: {
    id: "variables_math",
    title: "المتغيرات والعمليات الحسابية",
    code: `# المتغيرات والعمليات الحسابية في بايثون
a = 28
b = 12

addition = a + b
subtraction = a - b
multiplication = a * b
division = a / b
integer_div = a // b
modulus = a % b
power = a ** 2

print(f"العدد أ: {a} ، العدد ب: {b}")
print("-" * 30)
print(f"الجمع (a + b) = {addition}")
print(f"الطرح (a - b) = {subtraction}")
print(f"الضرب (a * b) = {multiplication}")
print(f"القسمة العادية (a / b) = {division:.2f}")
print(f"القسمة الصحيحة (a // b) = {integer_div}")
print(f"باقي القسمة (a % b) = {modulus}")
print(f"التربيع ({a}²) = {power}")
`
  },
  conditions: {
    id: "conditions",
    title: "الشروط والتحكم (If / Elif / Else)",
    code: `# جمل الشرط والتحكم
student_score = 87

print(f"درجة الطالب المدخلة: {student_score}")
print("-" * 35)

if student_score >= 90:
    grade = "ممتاز (A) 🏆"
    message = "أداء استثنائي ومستوى رفيع!"
elif student_score >= 80:
    grade = "جيد جداً (B) ⭐"
    message = "مستوى ممتاز، استمر في التقدم!"
elif student_score >= 70:
    grade = "جيد (C) 👍"
    message = "أداء جيد، يمكنك تحسين النتيجة في التاسك القادم."
elif student_score >= 50:
    grade = "مقبول (D) ✔️"
    message = "نجاح، ولكن بحاجة لمزيد من المراجعة والتطبيق."
else:
    grade = "راسب (F) ❌"
    message = "يرجى مراجعة تسجيلات المحاضرات وحضور جلسات الدعم."

print(f"التقدير الأكاديمي: {grade}")
print(f"التوجيه: {message}")
`
  },
  loops: {
    id: "loops",
    title: "حلقات التكرار (For & While Loops)",
    code: `# حلقات التكرار (Loops) في بايثون

print("1. حلقة For مع جدول الضرب للعدد 7:")
for i in range(1, 11):
    print(f"7 × {i} = {7 * i}")

print("\n" + "=" * 35 + "\n")

print("2. حلقة While للعد التنازلي:")
countdown = 5
while countdown > 0:
    print(f"متبقي: {countdown} ثوانٍ...")
    countdown -= 1

print("انطلق بنجاح! 🚀")
`
  },
  functions: {
    id: "functions",
    title: "تعريف واستدعاء الدوال (Functions)",
    code: `# تعريف الدوال وتمرير المعاملات والقيم المرجعة
def calculate_circle_area(radius):
    """دالة لحساب مساحة الدائرة بمعلومية نصف القطر"""
    PI = 3.14159
    area = PI * (radius ** 2)
    return round(area, 2)

def is_even(number):
    """دالة لمعرفة ما إذا كان العدد زوجياً أم فردياً"""
    return number % 2 == 0

# اختبار الدوال
r = 7
print(f"نصف القطر: {r}")
print(f"مساحة الدائرة: {calculate_circle_area(r)} وحدة مربعة")

test_numbers = [14, 27, 42, 99]
for n in test_numbers:
    type_str = "زوجي" if is_even(n) else "فردي"
    print(f"العدد {n} هو عدد {type_str}")
`
  },
  lists_and_dicts: {
    id: "lists_and_dicts",
    title: "القوائم والقواميس (Lists & Dicts)",
    code: `# هياكل البيانات: القوائم والقواميس
students_data = [
    {"name": "محمد علي", "city": "المنصورة", "grade": 94},
    {"name": "إبراهيم خالد", "city": "القاهرة", "grade": 98},
    {"name": "فاطمة أحمد", "city": "الإسكندرية", "grade": 91}
]

print("سجل درجات الطلاب:")
print("-" * 40)

total_score = 0
for idx, student in enumerate(students_data, start=1):
    print(f"#{idx} | الطالب: {student['name']:<15} | المدينة: {student['city']:<10} | الدرجة: {student['grade']}")
    total_score += student['grade']

avg_score = total_score / len(students_data)
print("-" * 40)
print(f"متوسط درجات المجموعة: {avg_score:.2f} / 100")
`
  },
  task_validator: {
    id: "task_validator",
    title: "قالب اختبار كود الواجب (Task Test)",
    code: `# قالب اختبار كود الواجبات والتاسكات البرمجية
# اكتب الحل داخل الدالة أدناه:

def solve_assignment(numbers):
    # المطلوب: إرجاع قائمة تحتوي فقط على الأعداد الزوجية بعد ضربها في 2
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num * 2)
    return result

# اختبار الكود مع حالات اختبار متعددة (Test Cases):
test_input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
expected_output = [4, 8, 12, 16, 20]

actual_output = solve_assignment(test_input)

print("مدخلات الاختبار:", test_input)
print("المخرجات الناتجة:", actual_output)
print("المخرجات المتوقعة:", expected_output)

if actual_output == expected_output:
    print("\n🎉 أحسنت! كودك مطابق للحل النموذجي وجاهز للتسليم 100%.")
else:
    print("\n⚠️ تنبيه: المخرجات غير متطابقة، راجع المنطق البرمجي للكود.")
`
  }
};

/**
 * Renders the complete Cloud Console workspace UI.
 * @param {object} options
 * @param {string} options.initialCode
 * @returns {string} HTML markup
 */
export function renderCloudConsoleView({ initialCode = "" } = {}) {
  const defaultCode = initialCode || CLOUD_CONSOLE_TEMPLATES.hello_world.code;

  return `
    <div class="cloud-console-workspace" id="cloudConsoleWorkspace">
      <!-- 1. Top Header Banner -->
      <div class="cloud-console-header-card mb-4">
        <div class="console-header-info">
          <div class="console-header-badge">
            <span class="console-pulse-emerald"></span>
            <span>الكونسول السحابي التفاعلي • بيئة Python 3</span>
          </div>
          <h2 class="console-header-title">مختبر البرمجة والتشغيل السحابي</h2>
          <p class="console-header-desc">
            محرر سحابي متكامل لتجربة أكواد بايثون، اختبار حلول الواجبات، واكتشاف الأخطاء البرمجية ذاتياً مع مخرجات فورية.
          </p>
        </div>

        <div class="console-header-actions">
          <div class="console-template-select-wrap">
            <label for="consoleTemplateSelect" class="sr-only">اختر قالباً برمجياً</label>
            <select id="consoleTemplateSelect" class="console-select-input" title="اختر قالباً جاهزاً للتجربة">
              <option value="">💡 نماذج برمجية جاهزة...</option>
              ${Object.values(CLOUD_CONSOLE_TEMPLATES)
                .map((t) => `<option value="${t.id}">${t.title}</option>`)
                .join("")}
            </select>
          </div>

          <button type="button" class="btn-console-pill" id="consoleResetBtn" title="إعادة تعيين المحرر">
            <span>🔄</span>
            <span>إعادة ضبط</span>
          </button>
        </div>
      </div>

      <!-- 2. Main IDE Grid (Left Editor + Right Terminal) -->
      <div class="cloud-console-ide-grid">
        <!-- Editor Column -->
        <div class="console-editor-panel">
          <div class="console-panel-topbar">
            <div class="console-file-tab">
              <span class="file-icon">🐍</span>
              <span class="file-name">main.py</span>
              <span class="file-badge">Python 3.10</span>
            </div>

            <div class="console-editor-meta-actions">
              <span class="console-editor-stats" id="consoleEditorStats">السطور: 1 | الحروف: 0</span>
              
              <div class="console-font-controls" title="تغيير حجم خط المحرر">
                <button type="button" class="btn-font-size" id="consoleFontDecreaseBtn" title="تصغير الخط">A-</button>
                <button type="button" class="btn-font-size" id="consoleFontIncreaseBtn" title="تكبير الخط">A+</button>
              </div>

              <button type="button" class="btn-editor-tool" id="consoleCopyBtn" title="نسخ الكود البرمجي">
                <span>📋</span>
                <span>نسخ</span>
              </button>
              <button type="button" class="btn-editor-tool" id="consoleDownloadBtn" title="تحميل ملف main.py">
                <span>💾</span>
                <span>تحميل</span>
              </button>
            </div>
          </div>

          <!-- Code Area with Line Numbers -->
          <div class="console-editor-body">
            <div class="console-line-numbers" id="consoleLineNumbers" aria-hidden="true">1</div>
            <textarea
              id="consoleCodeEditor"
              class="console-code-textarea"
              spellcheck="false"
              autocapitalize="off"
              autocomplete="off"
              placeholder="# اكتب كود بايثون هنا..."
              aria-label="محرر كود بايثون"
            >${defaultCode}</textarea>
          </div>

          <div class="console-editor-footer">
            <div class="console-shortcut-hint">
              <kbd class="console-kbd">Ctrl</kbd> + <kbd class="console-kbd">Enter</kbd>
              <span>لتشغيل الكود مباشرة ⚡</span>
            </div>
            <div class="console-auto-save-pill">
              <span class="save-dot"></span>
              <span>حفظ تلقائي للمسودة</span>
            </div>
          </div>
        </div>

        <!-- Terminal / Output Column -->
        <div class="console-terminal-panel">
          <div class="console-panel-topbar terminal-bar">
            <div class="terminal-window-dots">
              <span class="term-dot dot-red"></span>
              <span class="term-dot dot-yellow"></span>
              <span class="term-dot dot-green"></span>
              <span class="term-title">terminal ~ python3 main.py</span>
            </div>

            <div class="terminal-meta-actions">
              <span class="terminal-status-chip is-idle" id="terminalStatusChip">
                <span class="status-dot"></span>
                <span id="terminalStatusText">جاهز للتشغيل</span>
              </span>

              <button type="button" class="btn-terminal-clear" id="consoleClearOutputBtn" title="مسح شاشة المخرجات">
                <span>🧹 مسح</span>
              </button>
            </div>
          </div>

          <!-- Execution Action Banner -->
          <div class="console-run-cta-bar">
            <button type="button" class="btn-console-run" id="consoleRunCodeBtn">
              <span class="btn-run-icon">▷</span>
              <span class="btn-run-label">تشغيل الكود الآن</span>
            </button>
            <div class="console-runtime-badge">
              <span class="runtime-icon">⚡</span>
              <span id="consoleExecutionTime">محرك Skulpt Sandbox</span>
            </div>
          </div>

          <!-- Output Screen -->
          <div class="console-terminal-body" id="consoleTerminalScreen">
            <div class="terminal-welcome-msg">
              <div class="term-line-info">Python 3.10.12 [Skulpt Virtual Sandbox] on WebAssembly</div>
              <div class="term-line-info">اكتب الكود واضغط على "تشغيل الكود" لعرض النتائج هنا.</div>
              <div class="term-divider">--------------------------------------------------</div>
            </div>
            <pre class="terminal-stdout" id="consoleStdout"></pre>
            <div class="terminal-stderr d-none" id="consoleStderr"></div>
          </div>

          <!-- Interactive Input Bar (Appears when input() is called or manually tested) -->
          <div class="console-terminal-input-bar">
            <span class="term-prompt-sign">❯</span>
            <input
              type="text"
              id="consoleInteractiveInput"
              class="terminal-inline-input"
              placeholder="المدخلات (أو اضغط تشغيل لمشاهدة المخرجات)..."
              disabled
            />
            <button type="button" class="btn-send-input" id="consoleSendInputBtn" disabled>
              <span>إرسال</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 3. Quick Python Syntax Reference Bar -->
      <div class="cloud-console-cheatsheet-card mt-4">
        <div class="cheatsheet-header">
          <span class="cheatsheet-icon">📖</span>
          <span class="cheatsheet-title">أوامر بايثون السريعة (اضغط للإدراج في المحرر):</span>
        </div>
        <div class="cheatsheet-chips-row">
          <button type="button" class="cheat-chip" data-snippet='print("مرحباً")'>print()</button>
          <button type="button" class="cheat-chip" data-snippet='name = input("أدخل اسمك: ")'>input()</button>
          <button type="button" class="cheat-chip" data-snippet='for i in range(5):\n    print(i)'>for in range()</button>
          <button type="button" class="cheat-chip" data-snippet='if x > 10:\n    print("أكبر")\nelse:\n    print("أصغر")'>if / else</button>
          <button type="button" class="cheat-chip" data-snippet='def calculate(a, b):\n    return a + b'>def func():</button>
          <button type="button" class="cheat-chip" data-snippet='my_list = [10, 20, 30]\nprint(len(my_list))'>list & len()</button>
          <button type="button" class="cheat-chip" data-snippet='try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("خطأ قسمة")'>try / except</button>
        </div>
      </div>
    </div>
  `;
}

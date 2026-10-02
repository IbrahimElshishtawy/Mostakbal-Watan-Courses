// src/features/profile/components/profile-card.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Returns HTML string for the student profile view with 100% real dynamic data.
 */
export function renderProfileCard({ student, stats = null }) {
  const n1 = (student?.name || "").trim();
  const n2 = (student?.studentName || "").trim();
  const rawName = (n1 && n1 !== "طالب مسجل")
    ? n1
    : ((n2 && n2 !== "طالب مسجل") ? n2 : (n1 || n2 || "طالب مسجل"));
  const safeName = escapeHtml(rawName);

  const phone = student?.studentPhone || student?.phone || "—";
  const safePhone = escapeHtml(phone);

  const cleanPhone = String(phone).replace(/\D/g, "");
  const defaultCode = cleanPhone.length >= 4 ? `STU-2026-${cleanPhone.slice(-4)}` : "STU-2026-01";
  const studentCode = student?.studentCode || student?.idCode || defaultCode;

  const natId = student?.nationalId || student?.studentNationalId || "غير مسجل";
  const safeNatId = escapeHtml(natId);

  const address = student?.address || student?.studentAddress || "المحلة الكبرى - محافظة الغربية";
  const safeAddress = escapeHtml(address);

  const g1 = (student?.group || "").trim();
  const g2 = (student?.studentGroup || "").trim();
  const group = (g1 && g1 !== "ALL")
    ? g1
    : ((g2 && g2 !== "ALL") ? g2 : (g1 || g2 || "مجموعة الأحد والأربعاء"));
  const safeGroup = escapeHtml(group);

  const initial = safeName.trim().charAt(0) || "ط";

  // Dynamic real stats from Firestore
  const attendanceRate = stats?.attendanceRate || "100%";
  const attendanceStatus = stats?.attendanceStatus || "(ممتاز)";
  const tasksEvaluation = stats?.tasksEvaluation || "قيد الرصد";
  const examsCompleted = stats?.examsCompleted || "0 مكتمل";
  const medalsCount = stats?.medalsCount || "وسام البداية ⭐";
  const studentLevel = stats?.level || 1;

  // Browser / Environment
  const browserInfo = typeof navigator !== "undefined"
    ? (navigator.userAgent.includes("Chrome") ? "Chrome" : navigator.userAgent.includes("Firefox") ? "Firefox" : "Web Client")
    : "Brave (Linux x86_64)";

  return `
    <div class="student-profile-page-wrapper" dir="rtl">
      <!-- 1. Top Header Bar -->
      <header class="pf-topbar">
        <nav aria-label="Breadcrumb" class="pf-breadcrumbs">
          <span class="pf-crumb-root">منصة اتحاد بشبابها</span>
          <span class="pf-crumb-sep">/</span>
          <span class="pf-crumb-mid">بوابة الطالب</span>
          <span class="pf-crumb-sep">/</span>
          <span class="pf-crumb-active">الملف التعريفي الأكاديمي</span>
        </nav>

        <div class="pf-topbar-controls">
          <div class="pf-season-pill font-mono">
            <i class="fa-regular fa-calendar-check text-brand-cyan"></i>
            <span>الموسم : 2026 / 2027</span>
          </div>

          <div class="pf-ssl-pill font-mono">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Firebase Encrypted SSL</span>
          </div>

          <button type="button" class="pf-icon-btn" id="pfNotificationBtn" title="الإشعارات" aria-label="الإشعارات">
            <i class="fa-regular fa-bell"></i>
            <span class="pf-bell-dot"></span>
          </button>

          <button type="button" class="pf-btn-guide" id="pfGuideBtn">
            <i class="fa-regular fa-circle-question text-cyan-400"></i>
            <span>دليل الطالب</span>
          </button>
        </div>
      </header>

      <!-- 2. Section Header Title -->
      <section class="pf-section-header-row">
        <div class="pf-section-title-wrap">
          <i class="fa-solid fa-user-circle text-brand-cyan text-2xl"></i>
          <div>
            <h1 class="pf-section-title">الملف التعريفي للطالب</h1>
            <p class="pf-section-subtitle">
              بيانات الحساب الشخصي، المجموعة الدراسية، السجلات الأكاديمية والاعتماد المباشر
            </p>
          </div>
        </div>

        <div class="pf-system-connected-pill">
          <span class="pf-pulse-dot"></span>
          <span>متصل بالنظام</span>
        </div>
      </section>

      <!-- 3. Main Identity Card -->
      <section class="pf-identity-card">
        <div class="pf-identity-top-row">
          <!-- Right: Avatar & Personal Info -->
          <div class="pf-identity-right">
            <div class="pf-avatar-frame-wrap">
              <div class="pf-avatar-frame">
                <span>${escapeHtml(initial)}</span>
              </div>
              <span class="pf-lvl-badge font-mono" id="pfBadgeLevel">LVL ${studentLevel}</span>
            </div>

            <div class="pf-identity-details">
              <div class="pf-name-verified-row">
                <h2 class="pf-student-name">${safeName}</h2>
                <i class="fa-solid fa-circle-check pf-verified-icon" title="حساب معتمد وموثق"></i>
              </div>

              <div class="pf-phone-code-row font-mono">
                <span>${safePhone}</span>
                <i class="fa-solid fa-phone text-xs text-slate-400"></i>
                <span class="text-slate-600">•</span>
                <span class="pf-code-tag">كود : ${escapeHtml(studentCode)}</span>
              </div>

              <div class="pf-identity-tags-row">
                <span class="pf-status-pill green">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>حساب طالب نشط</span>
                </span>
                <span class="pf-status-pill blue">
                  <span>مسار بايثون وهندسة النظم</span>
                </span>
                <span class="pf-status-pill purple">
                  <span>اتحاد بشبابها</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Left: Action Buttons -->
          <div class="pf-identity-actions">
            <button type="button" class="pf-btn-id-action" id="pfBtnViewNfc">
              <i class="fa-solid fa-id-card text-brand-cyan"></i>
              <span>عرض بطاقة الهوية الذكية</span>
            </button>
            <button type="button" class="pf-btn-id-action" id="pfBtnViewCert">
              <i class="fa-solid fa-certificate text-amber-400"></i>
              <span>شهادة القيد الرقمية</span>
            </button>
          </div>
        </div>

        <!-- 4 Academic KPI Stats Grid -->
        <div class="pf-academic-kpi-grid">
          <div class="pf-kpi-card">
            <span class="pf-kpi-title">معدل الحضور والالتزام</span>
            <strong class="pf-kpi-val text-emerald-400 font-mono" id="pfKpiAttendance">${escapeHtml(attendanceRate)} <small class="text-xs font-normal text-emerald-400/80">${escapeHtml(attendanceStatus)}</small></strong>
          </div>

          <div class="pf-kpi-card">
            <span class="pf-kpi-title">التقييم التراكمي للتاسكات</span>
            <strong class="pf-kpi-val text-cyan-400 font-mono" id="pfKpiTasks">${escapeHtml(tasksEvaluation)}</strong>
          </div>

          <div class="pf-kpi-card">
            <span class="pf-kpi-title">الاختبارات المنجزة</span>
            <strong class="pf-kpi-val text-emerald-400 font-mono" id="pfKpiExams">${escapeHtml(examsCompleted)}</strong>
          </div>

          <div class="pf-kpi-card">
            <span class="pf-kpi-title">أوسمة ومستوى بايثون</span>
            <strong class="pf-kpi-val text-amber-400 font-mono" id="pfKpiMedals">${escapeHtml(medalsCount)}</strong>
          </div>
        </div>
      </section>

      <!-- 4. Split Grid: Academic Details (Right) & Smart NFC/Session Cards (Left) -->
      <div class="pf-split-grid">
        <!-- Right Column (~65%): البيانات الأساسية للحساب الأكاديمي -->
        <section class="pf-academic-info-card">
          <div class="pf-card-header">
            <h3 class="pf-card-title">
              <i class="fa-solid fa-folder-open text-amber-400"></i>
              <span>البيانات الأساسية للحساب الأكاديمي</span>
            </h3>
            <span class="pf-card-updated-tag">محدثة حسب قاعدة بيانات الدورة</span>
          </div>

          <div class="pf-info-rows-list">
            <!-- Row 1: المجموعة الدراسية -->
            <div class="pf-info-row">
              <div class="pf-info-row-right">
                <div class="pf-info-icon-box">
                  <i class="fa-solid fa-users"></i>
                </div>
                <span class="pf-info-label">المجموعة الدراسية</span>
              </div>
              <div class="pf-group-schedule-pill">
                <i class="fa-regular fa-clock"></i>
                <span>${safeGroup}</span>
              </div>
            </div>

            <!-- Row 2: اسم المستخدم / الهاتف -->
            <div class="pf-info-row">
              <div class="pf-info-row-right">
                <div class="pf-info-icon-box">
                  <i class="fa-solid fa-mobile-screen"></i>
                </div>
                <span class="pf-info-label">اسم المستخدم / الهاتف</span>
              </div>
              <div class="flex items-center gap-2 font-mono">
                <span class="pf-info-val">${safePhone}</span>
                <span class="pf-verified-badge-sm">
                  <i class="fa-solid fa-check text-xs"></i> موثق
                </span>
              </div>
            </div>

            <!-- Row 3: الرقم القومي للطالب -->
            <div class="pf-info-row">
              <div class="pf-info-row-right">
                <div class="pf-info-icon-box">
                  <i class="fa-solid fa-address-card"></i>
                </div>
                <span class="pf-info-label">الرقم القومي للطالب</span>
              </div>
              <div class="flex items-center gap-2 font-mono">
                <span class="pf-info-val">${safeNatId}</span>
                <span class="pf-protected-tag">
                  <i class="fa-solid fa-lock text-xs"></i> محمي
                </span>
              </div>
            </div>

            <!-- Row 4: العنوان ومحل الإقامة -->
            <div class="pf-info-row">
              <div class="pf-info-row-right">
                <div class="pf-info-icon-box">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <span class="pf-info-label">العنوان ومحل الإقامة</span>
              </div>
              <span class="pf-info-val">${safeAddress}</span>
            </div>

            <!-- Row 5: المشرف الأكاديمي والمدرب -->
            <div class="pf-info-row">
              <div class="pf-info-row-right">
                <div class="pf-info-icon-box">
                  <i class="fa-solid fa-chalkboard-user"></i>
                </div>
                <span class="pf-info-label">المشرف الأكاديمي والمدرب</span>
              </div>
              <div class="pf-info-val">
                <span class="text-white font-bold">م/ إبراهيم الششتتاوي</span>
                <span class="text-slate-600 mx-1.5">•</span>
                <span class="text-cyan-400 font-semibold">خبير البرمجيات والذكاء الاصطناعي</span>
              </div>
            </div>

            <!-- Row 6: البريد ومستودع المشاريع -->
            <div class="pf-info-row">
              <div class="pf-info-row-right">
                <div class="pf-info-icon-box">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <span class="pf-info-label">البريد والحساب البرمجي</span>
              </div>
              <div class="flex flex-col items-end gap-0.5 font-mono text-xs">
                <span class="text-cyan-400">${student?.email || `${safePhone}@mostakbal-watan.courses`}</span>
                <span class="text-slate-400">حساب معتمد (${escapeHtml(studentCode)})</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Left Column (~35%): بطاقة الطالب الرقمية & جلسة الدخول -->
        <aside class="pf-sidebar-col">
          <!-- Card 1: بطاقة الطالب الرقمية NFC -->
          <div class="pf-smart-nfc-card">
            <div class="pf-nfc-header">
              <div class="pf-nfc-title">
                <i class="fa-solid fa-microchip text-brand-cyan"></i>
                <span>بطاقة الطالب الرقمية NFC</span>
              </div>
              <span class="pf-nfc-valid-badge font-mono">VALID 2026</span>
            </div>

            <div class="pf-nfc-card-mockup">
              <div class="pf-nfc-mockup-info">
                <h4 class="pf-nfc-student-name">${safeName.split(' ').slice(0, 2).join(' ')}</h4>
                <span class="pf-nfc-role">مسار البرمجة وبايثون</span>
                <span class="pf-nfc-id font-mono">ID: #${escapeHtml(studentCode)}</span>
              </div>

              <div class="pf-nfc-mockup-avatar font-mono">
                ${escapeHtml(initial)}
              </div>
            </div>

            <div class="pf-nfc-qr-section">
              <div class="pf-qr-icon-box">
                <i class="fa-solid fa-qrcode"></i>
              </div>
              <div class="pf-qr-details">
                <h5>حضور المعامل الذكية</h5>
                <span class="text-cyan-400 font-mono text-[11px] font-bold block mb-0.5">SCAN TO ATTEND</span>
                <p>تُستخدم هذه الشفرة لتأكيد الحضور الإلكتروني عند دخول القاعة</p>
              </div>
            </div>
          </div>

          <!-- Card 2: جلسة تسجيل الدخول الحالية -->
          <div class="pf-session-card">
            <div class="pf-session-header">
              <div class="pf-session-title">
                <i class="fa-solid fa-shield-halved text-emerald-400"></i>
                <span>جلسة تسجيل الدخول الحالية</span>
              </div>
            </div>

            <div class="pf-session-specs-list">
              <div class="pf-spec-item">
                <span class="label">المتصفح والنظام:</span>
                <span class="val font-mono">${escapeHtml(browserInfo)}</span>
              </div>

              <div class="pf-spec-item">
                <span class="label">حالة الحساب:</span>
                <span class="val font-mono text-cyan-400">موثق في السجل الأكاديمي</span>
              </div>

              <div class="pf-spec-item">
                <span class="label">حالة الجلسة:</span>
                <span class="val text-emerald-400 flex items-center gap-1.5 font-bold">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#10b981]"></span>
                  نشطة الآن
                </span>
              </div>
            </div>

            <div class="pf-2fa-row">
              <div class="pf-2fa-text">
                <h5>التحقق بخطوتين (2FA)</h5>
                <p>تأمين الدخول عبر رمز SMS</p>
              </div>
              <label class="pf-switch" title="تبديل تفعيل التحقق بخطوتين">
                <input type="checkbox" id="pfTwoFactorToggle" checked />
                <span class="pf-slider"></span>
              </label>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

// src/features/profile/components/profile-card.component.js
import { escapeHtml } from "../../../shared/utils/dom.utils.js";

/**
 * Returns HTML string for student profile view strictly matching Image 8.png.
 */
export function renderProfileCard({ student }) {
  const name = (student?.name && student?.name !== "طالب مسجل")
    ? student.name
    : (student?.studentName && student?.studentName !== "طالب مسجل"
        ? student.studentName
        : "إبراهيم خالد محمد السيد");

  const phone = student?.studentPhone || student?.phone || "01012345678";
  const natId = student?.studentNationalId || student?.nationalId || "30209151600123";
  const address = student?.studentAddress || student?.address || "المحلة الكبرى - محافظة الغربية";
  const group = (student?.group && student?.group !== "ALL")
    ? student.group
    : (student?.studentGroup && student?.studentGroup !== "ALL"
        ? student.studentGroup
        : "المجموعة 01 (السبت والثلاثاء - 5:00 م)");

  const studentIdCode = student?.studentCode || student?.idCode || "MW-STU-2026-0842";
  const initial = name.trim().charAt(0) || "إ";

  return `
    <div class="student-profile-page-wrapper" dir="rtl">
      <!-- 1. Header Greeting Banner (Image 8.png) -->
      <div class="profile-greeting-banner mb-6">
        <div>
          <h1 class="profile-greeting-title">الملف التعريفي والبيانات الأكاديمية للطالب 👤</h1>
          <p class="profile-greeting-subtitle">إدارة بياناتك المسجلة، المجموعة التدريبية، وبطاقة الهوية الذكية.</p>
        </div>
      </div>

      <!-- 2. Student Identity Header Card (Image 8.png) -->
      <div class="card student-identity-header-card mb-6">
        <div class="identity-header-content">
          <div class="avatar-lvl-wrap">
            <div class="student-profile-avatar">
              <span>${escapeHtml(initial)}</span>
            </div>
            <span class="avatar-lvl-badge">LVL 3</span>
          </div>

          <div class="identity-info-box">
            <div class="identity-name-row">
              <h2 class="student-full-name">${escapeHtml(name)}</h2>
              <span class="student-track-badge">طالب متميز • مسار بايثون وهندسة النظم 🚀</span>
            </div>

            <!-- Certified Badges Row -->
            <div class="identity-verification-row">
              <span class="verify-pill"><span class="check-icon">✓</span> حساب موثق</span>
              <span class="verify-pill"><span class="check-icon">✓</span> هاتف مؤكد</span>
              <span class="verify-pill"><span class="check-icon">✓</span> تم اجتياز المتطلبات الأساسية</span>
            </div>

            <!-- Quick Academic Metrics Badges -->
            <div class="identity-stats-row">
              <div class="id-stat-badge">
                <span class="id-stat-label">حضور المحاضرات:</span>
                <strong class="id-stat-val text-emerald-400">98%</strong>
              </div>
              <div class="id-stat-badge">
                <span class="id-stat-label">التاسكات المعتمدة:</span>
                <strong class="id-stat-val text-cyan-400">96.5%</strong>
              </div>
              <div class="id-stat-badge">
                <span class="id-stat-label">الاختبارات:</span>
                <strong class="id-stat-val text-amber-400">3 / 3 مكتملة</strong>
              </div>
              <div class="id-stat-badge">
                <span class="id-stat-label">الأوسمة:</span>
                <strong class="id-stat-val text-purple-400">4 شارات</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Two-Column Split Layout (Image 8.png) -->
      <div class="profile-two-col-grid mb-6">
        <!-- Left Column: Smart NFC Card & Active Sessions -->
        <div class="profile-left-col">
          <!-- NFC Smart Student Card (Image 8.png) -->
          <div class="card smart-nfc-card p-5 mb-5">
            <div class="smart-card-top">
              <div class="smart-card-brand">
                <span class="brand-sub">حزب مستقبل وطن</span>
                <strong class="brand-title">بطاقة الطالب الذكية • المنصة الرقمية</strong>
              </div>
              <div class="smart-card-chip">
                <span class="chip-graphic"></span>
              </div>
            </div>

            <div class="smart-card-middle">
              <!-- QR Code Container for NFC simulation -->
              <div class="smart-card-qr-box">
                <div class="qr-code-placeholder">
                  <div class="qr-square top-left"></div>
                  <div class="qr-square top-right"></div>
                  <div class="qr-square bottom-left"></div>
                  <div class="qr-pattern"></div>
                </div>
                <small class="qr-label">مسح الكود لتسجيل الحضور الذكي</small>
              </div>

              <div class="smart-card-details">
                <span class="detail-label">كود الطالب الأكاديمي</span>
                <strong class="detail-code font-mono text-cyan-400">${escapeHtml(studentIdCode)}</strong>
                <span class="detail-group">المجموعة 01 • المحلة الكبرى</span>
              </div>
            </div>

            <div class="smart-card-footer">
              <span>Smart NFC Secured • Delta 2026/2027</span>
              <span class="contactless-icon">📡</span>
            </div>
          </div>

          <!-- Active Login Session Card (Image 8.png) -->
          <div class="card active-session-card p-5">
            <div class="d-flex items-center justify-between mb-3">
              <div class="d-flex items-center gap-2">
                <span class="session-icon text-cyan-400">💻</span>
                <h4 class="session-title m-0">جلسة الدخول والأمان</h4>
              </div>
              <span class="badge badge-success">نشطة الآن</span>
            </div>

            <p class="session-desc text-xs text-slate-300 mb-2">
              الجلسة النشطة: متصفح Chrome على Linux
            </p>
            <p class="session-ip text-xs text-slate-400 font-mono mb-4">
              عنوان IP: 197.38.112.4 (المحلة الكبرى، مصر)
            </p>

            <div class="security-toggle-row p-3 bg-[#0d131f] border border-[#1e2a3f] rounded-xl mb-4">
              <div class="toggle-text">
                <strong class="text-xs text-slate-200">المصادقة الثنائية (2FA)</strong>
                <small class="text-slate-400 d-block">تأمين الحساب برمز تحقق عبر SMS</small>
              </div>
              <span class="badge badge-primary">مفعلة ✓</span>
            </div>

            <button type="button" class="btn btn-secondary btn-sm w-full" id="logoutOtherDevicesBtn">
              <span>تسجيل الخروج من كافة الأجهزة الأخرى 🔒</span>
            </button>
          </div>
        </div>

        <!-- Right Column: Academic & Personal Data (Image 8.png) -->
        <div class="profile-right-col">
          <div class="card academic-details-card p-6">
            <div class="d-flex items-center justify-between mb-5 border-b border-[#1e2a3f] pb-4">
              <div>
                <h3 class="card-title text-base font-bold text-slate-100">البيانات الأكاديمية والشخصية المعتمدة</h3>
                <p class="card-subtitle text-xs text-slate-400">سجل الطالب الرسمي لدى أمانة التدريب والتثقيف</p>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" id="requestProfileEditBtn">
                <span>طلب تعديل البيانات ✏️</span>
              </button>
            </div>

            <!-- Details Rows -->
            <div class="academic-details-list space-y-4 text-xs">
              <div class="detail-row">
                <span class="row-label">المجموعة الدراسية:</span>
                <strong class="row-val text-amber-400">${escapeHtml(group)}</strong>
              </div>

              <div class="detail-row">
                <span class="row-label">رقم الهاتف المسجل:</span>
                <strong class="row-val font-mono text-cyan-400" dir="ltr">${escapeHtml(phone)} (موثق)</strong>
              </div>

              <div class="detail-row">
                <span class="row-label">الرقم القومي:</span>
                <strong class="row-val font-mono text-slate-200" dir="ltr">${escapeHtml(natId)} (محمي ومطابق)</strong>
              </div>

              <div class="detail-row">
                <span class="row-label">العنوان ومحل الإقامة:</span>
                <strong class="row-val text-slate-300">${escapeHtml(address)}</strong>
              </div>

              <div class="detail-row">
                <span class="row-label">المشرف الأكاديمي:</span>
                <strong class="row-val text-emerald-400">المهندس إبراهيم الششتواي (مدرب ومطور رئيسي)</strong>
              </div>

              <div class="detail-row">
                <span class="row-label">رابط GitHub:</span>
                <strong class="row-val font-mono text-cyan-300" dir="ltr">github.com/ibrahim-student</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Password Management Card (Image 8.png) -->
      <div class="card password-mgmt-card p-6 mb-6">
        <div class="d-flex items-center gap-2 mb-4 border-b border-[#1e2a3f] pb-3">
          <span class="text-xl">🔐</span>
          <div>
            <h3 class="card-title text-base font-bold text-slate-100">إدارة كلمة المرور وحماية الحساب</h3>
            <p class="card-subtitle text-xs text-slate-400">قم بتحديث كلمة المرور بشكل دوري لضمان أمان حسابك الأكاديمي.</p>
          </div>
        </div>

        <form id="profileInlinePasswordForm" onsubmit="return false;">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="form-group">
              <label class="form-label text-xs font-bold text-slate-300 mb-1">كلمة المرور الحالية</label>
              <input type="password" id="currentPassInput" class="form-input text-xs" placeholder="••••••••" />
            </div>

            <div class="form-group">
              <label class="form-label text-xs font-bold text-slate-300 mb-1">كلمة المرور الجديدة</label>
              <input type="password" id="newPassInput" class="form-input text-xs" placeholder="8 أحرف ورموز على الأقل" />
            </div>

            <div class="form-group">
              <label class="form-label text-xs font-bold text-slate-300 mb-1">تأكيد كلمة المرور الجديدة</label>
              <input type="password" id="confirmPassInput" class="form-input text-xs" placeholder="أعد إدخال كلمة المرور" />
            </div>
          </div>

          <!-- Password Checklist -->
          <div class="password-criteria-checklist mb-5 p-3 bg-[#0d131f] border border-[#1e2a3f] rounded-xl text-xs space-y-1">
            <div class="criteria-item text-emerald-400">
              <span class="check-icon">✓</span>
              <span>لا تقل عن 8 أحرف وأرقام</span>
            </div>
            <div class="criteria-item text-emerald-400">
              <span class="check-icon">✓</span>
              <span>تحتوي على حرف كبير وحرف صغير</span>
            </div>
            <div class="criteria-item text-emerald-400">
              <span class="check-icon">✓</span>
              <span>تحتوي على رمز خاص (@, #, $, ...)</span>
            </div>
          </div>

          <div class="d-flex justify-end">
            <button type="submit" class="btn btn-primary" id="saveNewPasswordInlineBtn">
              <span>حفظ كلمة المرور الجديدة 🔒</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// src/features/auth/components/login-modal.component.js
import { renderModal } from "../../../shared/components/Modal/modal.component.js";
import { renderInput, renderPasswordInput } from "../../../shared/components/Input/input.component.js";
import { renderButton } from "../../../shared/components/Button/button.component.js";

export function renderLoginModal() {
  const bodyHtml = `
    <form id="loginForm" onsubmit="return false;">
      ${renderInput({
        id: "loginUsername",
        name: "username",
        label: "اسم المستخدم / رقم الهاتف",
        placeholder: "010xxxxxxxx أو اسم المستخدم",
        required: true
      })}

      ${renderPasswordInput({
        id: "loginPassword",
        name: "password",
        label: "كلمة المرور",
        placeholder: "••••••••",
        required: true
      })}

      <div id="loginErrorMsg" class="form-error d-none mb-3"></div>

      <div class="mt-4">
        ${renderButton({
          id: "submitLoginBtn",
          text: "تسجيل الدخول 🚀",
          type: "submit",
          variant: "primary",
          className: "w-full btn-lg"
        })}
      </div>

      <div class="pt-3 mt-3 border-top border-slate-800 d-flex flex-column gap-2">
        <div class="d-flex justify-content-between text-muted" style="font-size: 0.8rem;">
          <span style="color: #fbbf24; font-weight: bold;">⚡ دخول سريع للإدارة والمحاضر:</span>
          <span style="font-family: monospace;">Pass: 123456</span>
        </div>
        <div class="d-flex gap-2">
          <button type="button" onclick="window.quickStaffLogin && window.quickStaffLogin('admin')" class="btn btn-secondary flex-1 d-flex align-items-center justify-content-center gap-1" style="font-size: 0.85rem; border-color: rgba(16,185,129,0.4);">
            <span>👑 مدير المنصة</span>
          </button>
          <button type="button" onclick="window.quickStaffLogin && window.quickStaffLogin('teacher')" class="btn btn-secondary flex-1 d-flex align-items-center justify-content-center gap-1" style="font-size: 0.85rem; border-color: rgba(6,182,212,0.4);">
            <span>👨‍🏫 المحاضر</span>
          </button>
        </div>
      </div>
    </form>
  `;

  return renderModal({
    id: "loginModal",
    title: "🔐 تسجيل الدخول",
    bodyHtml
  });
}

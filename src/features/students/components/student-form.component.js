// src/features/students/components/student-form.component.js
import { renderModal } from "../../../shared/components/Modal/modal.component.js";
import { renderInput, renderSelect, renderPasswordInput } from "../../../shared/components/Input/input.component.js";
import { renderButton } from "../../../shared/components/Button/button.component.js";
import { GROUPS } from "../../../core/constants.js";

export function renderAddStudentModal() {
  const groupOptions = [
    { value: "", label: "-- اختر المجموعة الدراسية --" },
    ...GROUPS.map((g) => ({ value: g, label: g }))
  ];

  const bodyHtml = `
    <form id="addStudentForm" onsubmit="return false;" class="space-y-4">
      ${renderInput({
        id: "newStudentName",
        label: "اسم الطالب بالكامل *",
        placeholder: "مثال: أحمد محمد علي",
        required: true
      })}

      ${renderInput({
        id: "newStudentPhone",
        label: "رقم هاتف الطالب (اسم المستخدم لتسجيل الدخول) *",
        placeholder: "010xxxxxxxx",
        required: true,
        hint: "يُستخدم رقم الهاتف لتسجيل دخول الطالب إلى المحاضرات والتكليفات"
      })}

      ${renderPasswordInput({
        id: "newStudentPassword",
        name: "newStudentPassword",
        label: "كلمة مرور حساب الطالب 🔐",
        placeholder: "اكتب كلمة المرور (6 أحرف أو أرقام على الأقل)",
        hint: "يمكنك تحديد كلمة مرور مخصصة أو تركها فارغة للاعتماد التلقائي على الرقم القومي أو 123456"
      })}

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${renderInput({
          id: "newStudentNationalId",
          label: "الرقم القومي (اختياري)",
          placeholder: "14 رقم قومي"
        })}

        ${renderSelect({
          id: "newStudentGroup",
          label: "المجموعة الدراسية *",
          options: groupOptions,
          required: true
        })}
      </div>

      ${renderInput({
        id: "newStudentAddress",
        label: "العنوان ومحل الإقامة (اختياري)",
        placeholder: "المحلة الكبرى - ..."
      })}

      <div class="mt-6 text-left pt-2 border-t border-slate-700/60">
        ${renderButton({
          id: "submitAddStudentBtn",
          text: "حفظ الطالب وتوليد الحساب الأكاديمي 🚀",
          type: "submit",
          variant: "primary",
          className: "w-full btn-lg font-bold"
        })}
      </div>
    </form>
  `;

  return renderModal({
    id: "addStudentModal",
    title: "👥 إضافة طالب جديد إلى المنصة وتعيين كلمة المرور",
    bodyHtml,
    maxWidth: "600px"
  });
}

export function renderResetPasswordModal() {
  const bodyHtml = `
    <form id="resetStudentPasswordForm" onsubmit="return false;">
      <input type="hidden" id="resetPasswordStudentUid" value="" />
      <div class="p-3.5 mb-5 rounded-xl border border-sky-500/30 bg-sky-950/40">
        <span class="text-xs text-slate-400 block mb-1">تعيين كلمة مرور جديدة للطالب:</span>
        <strong id="resetPasswordStudentNameHint" class="text-sky-300 font-extrabold text-base block"></strong>
      </div>

      ${renderPasswordInput({
        id: "resetNewPasswordInput",
        name: "resetNewPasswordInput",
        label: "كلمة المرور الجديدة للطالب *",
        placeholder: "أدخل كلمة المرور الجديدة (6 أحرف أو أرقام على الأقل)",
        required: true,
        hint: "سيتم تطبيق كلمة المرور فوراً وربطها بحساب الطالب لتسجيل دخوله مباشرة"
      })}

      <div class="mt-6 pt-2 border-t border-slate-700/60">
        ${renderButton({
          id: "submitResetPasswordBtn",
          text: "تأكيد وحفظ كلمة المرور الجديدة 🔐",
          type: "submit",
          variant: "primary",
          className: "w-full btn-lg font-bold"
        })}
      </div>
    </form>
  `;

  return renderModal({
    id: "resetStudentPasswordModal",
    title: "🔐 تعيين كلمة المرور للطالب",
    bodyHtml,
    maxWidth: "500px"
  });
}


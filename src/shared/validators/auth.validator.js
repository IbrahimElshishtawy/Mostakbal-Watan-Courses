// src/shared/validators/auth.validator.js
import { ValidationError } from "../../core/errors.js";

export function validateLogin(username, password) {
  const cleanUser = (username || "").trim();
  let cleanPass = (password || "").trim();
  const fieldErrors = {};

  if (!cleanUser) {
    fieldErrors.username = "يرجى إدخال اسم المستخدم أو رقم الهاتف.";
  }

  // If password was omitted, check if username is a phone number and default password to the phone number!
  let normalizedUser = cleanUser
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[\s\-_]/g, "");
  if (normalizedUser.startsWith("+20")) normalizedUser = "0" + normalizedUser.slice(3);
  else if (normalizedUser.startsWith("0020")) normalizedUser = "0" + normalizedUser.slice(4);
  else if (normalizedUser.startsWith("201") && normalizedUser.length === 12) normalizedUser = "0" + normalizedUser.slice(2);

  // Recognize staff aliases (admin & teacher in English and Arabic or official phone numbers)
  const lowerUser = cleanUser.toLowerCase().replace(/[\s\-_]/g, "");
  const isAdminAlias = /^(admin|ادمن|الادمن|مدير|المدير)$/i.test(lowerUser) || normalizedUser === "01020084862" || lowerUser === "admin@admin.local";
  const isTeacherAlias = /^(teacher|محاضر|المحاضر|معلم|المعلم|مدرس|المدرس)$/i.test(lowerUser) || normalizedUser === "01099959133" || lowerUser === "teacher@system.local";

  const isPhone = !isAdminAlias && !isTeacherAlias && (/^01[0125][0-9]{8}$/.test(normalizedUser) || /^[0-9]{8,15}$/.test(normalizedUser));
  
  if (!cleanPass) {
    if (isAdminAlias || isTeacherAlias) {
      cleanPass = "123456";
    } else if (isPhone) {
      cleanPass = normalizedUser;
    }
  }

  if (!cleanPass) {
    fieldErrors.password = "يرجى إدخال كلمة المرور أو رقم الهاتف.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError("يرجى إكمال بيانات تسجيل الدخول.", fieldErrors);
  }

  return { username: cleanUser, password: cleanPass };
}

export function validatePasswordChange(newPassword, confirmPassword) {
  const cleanNew = (newPassword || "").trim();
  const cleanConfirm = (confirmPassword || "").trim();
  const fieldErrors = {};

  if (!cleanNew || cleanNew.length < 6) {
    fieldErrors.newPassword = "كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف أو أرقام.";
  }
  if (cleanNew !== cleanConfirm) {
    fieldErrors.confirmPassword = "كلمتا المرور غير متطابقتين.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    throw new ValidationError("يرجى التأكد من تطابق كلمة المرور وصحتها.", fieldErrors);
  }

  return cleanNew;
}

import { auth } from "../../core/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { appStore } from "../../core/store.js";
import { ROLES } from "../../core/constants.js";
import { normalizeError, AuthError } from "../../core/errors.js";
import { StudentsService, getSecondaryAuth } from "../students/students.service.js";

export const AuthService = {
  /**
   * Authenticates user, extracts Custom Claims, updates global state, and returns redirect route.
   */
  async login(username, password) {
    const cleanUser = (username || "").trim();
    let cleanPass = (password || "").trim();

    if (!cleanUser) {
      throw new AuthError("يرجى إدخال اسم المستخدم أو رقم الهاتف.");
    }

    // Convert Arabic-Indic digits to standard Latin digits and remove spaces/dashes
    let normalized = cleanUser
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/[\s\-_]/g, "");

    // Normalize Egyptian phone prefixes (+20, 0020, 201...) to 01...
    if (normalized.startsWith("+20")) {
      normalized = "0" + normalized.slice(3);
    } else if (normalized.startsWith("0020")) {
      normalized = "0" + normalized.slice(4);
    } else if (normalized.startsWith("201") && normalized.length === 12) {
      normalized = "0" + normalized.slice(2);
    }

    const isPhone = /^01[0125][0-9]{8}$/.test(normalized) || /^[0-9]{8,15}$/.test(normalized);

    // If password was not entered and username is a phone number, default password to phone number!
    if (!cleanPass && isPhone) {
      cleanPass = normalized;
    }

    // Also normalize Arabic-Indic digits in password if present
    if (cleanPass) {
      cleanPass = cleanPass.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).trim();
    }

    if (!cleanPass) {
      throw new AuthError("يرجى إدخال كلمة المرور أو رقم الهاتف.");
    }

    let userCredential = null;
    let targetEmail = "";

    try {
      // 1. If already full email, use directly
      if (cleanUser.includes("@")) {
        targetEmail = cleanUser.replace(/\s+/g, "");
        userCredential = await signInWithEmailAndPassword(auth, targetEmail, cleanPass);
      } else {
        const attempts = isPhone
          ? [
              { email: `${normalized}@student.local`, pass: cleanPass },
              // If password differs from phone, try phone number as password too
              ...(cleanPass !== normalized ? [{ email: `${normalized}@student.local`, pass: normalized }] : []),
              // Try legacy default password for accounts created before this update
              { email: `${normalized}@student.local`, pass: "123456" },
              { email: `${normalized}@admin.local`, pass: cleanPass },
              { email: `${normalized}@system.local`, pass: cleanPass }
            ]
          : [
              { email: `${normalized}@admin.local`, pass: cleanPass },
              { email: `${normalized}@system.local`, pass: cleanPass },
              { email: `${normalized}@student.local`, pass: cleanPass }
            ];

        let lastError = null;
        for (const item of attempts) {
          try {
            userCredential = await signInWithEmailAndPassword(auth, item.email, item.pass);
            targetEmail = item.email;
            // If logged in using legacy password, silently update Auth password to phone number!
            if (isPhone && item.pass === "123456" && userCredential?.user) {
              import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js").then(({ updatePassword }) => {
                updatePassword(userCredential.user, normalized).catch(() => {});
              });
            }
            break;
          } catch (err) {
            lastError = err;
            if (err.code === "auth/too-many-requests") {
              break;
            }
          }
        }

        if (!userCredential) {
          if (lastError && lastError.code === "auth/too-many-requests") {
            throw normalizeError(lastError);
          }
          throw new AuthError("بيانات الدخول غير صحيحة، يرجى التأكد والمحاولة مرة أخرى ❌");
        }
      }

      const user = userCredential.user;
      const tokenResult = await user.getIdTokenResult(true); // Force refresh to get claims
      const claims = tokenResult.claims || {};

      let role = claims.role;
      if (!role) {
        if (targetEmail.endsWith("@admin.local")) role = ROLES.ADMIN;
        else if (targetEmail.endsWith("@system.local")) role = ROLES.TEACHER;
        else role = ROLES.STUDENT;
      }

      appStore.set("user", user);
      appStore.set("role", role);
      appStore.set("claims", claims);

      let redirectPage = "pages/student.html";
      if (role === ROLES.ADMIN) redirectPage = "pages/admin.html";
      else if (role === ROLES.TEACHER) redirectPage = "pages/teacher.html";

      return {
        user,
        role,
        claims,
        redirectPage
      };
    } catch (err) {
      throw normalizeError(err);
    }
  },

  async logout() {
    try {
      await signOut(auth);
      appStore.set("user", null);
      appStore.set("role", null);
      appStore.set("claims", null);
      const isPagesDir = window.location.pathname.includes("/pages/");
      window.location.replace(isPagesDir ? "../index.html" : "index.html");
    } catch (err) {
      console.error("Logout Error:", err);
      window.location.replace("index.html");
    }
  }
};

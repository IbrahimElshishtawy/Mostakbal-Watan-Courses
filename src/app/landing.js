// src/app/landing.js - Bootstrap & Authentication Wiring for Modern Cyber Landing Page
import { AuthController } from "../features/auth/auth.controller.js";
import { bootstrapApp } from "./bootstrap.js";
import { auth } from "../core/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { ROLES } from "../core/constants.js";
import { Router } from "./router.js";

// Initialize environment (theme, language, font scale)
bootstrapApp();

// Modal triggers & handlers
window.openLoginModal = function () {
  const modal = document.getElementById("login-modal") || document.getElementById("login");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    const userInput = document.getElementById("loginUsername");
    if (userInput) userInput.focus();
  }
};

window.closeLoginModal = function () {
  const modal = document.getElementById("login-modal") || document.getElementById("login");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
};

// Aliases for backward compatibility
window.showLogin = window.openLoginModal;
window.closeLogin = window.closeLoginModal;

window.openContactOptions = function () {
  const modal = document.getElementById("contact-modal") || document.getElementById("contactModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
};

window.closeContactOptions = function () {
  const modal = document.getElementById("contact-modal") || document.getElementById("contactModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
};

window.openGameModal = function () {
  const modal = document.getElementById("game-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
};

window.closeGameModal = function () {
  const modal = document.getElementById("game-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
};

window.toggleMobileMenu = function () {
  const nav = document.getElementById("mobile-menu");
  if (nav) {
    nav.classList.toggle("hidden");
  }
};

window.togglePassword = function () {
  const input = document.getElementById("loginPassword");
  const toggleIcon = document.getElementById("passwordToggleIcon");
  if (!input) return;
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  if (toggleIcon) {
    toggleIcon.textContent = isPassword ? "visibility_off" : "visibility";
  }
};

// Global click listener for dismissing modals when clicking outside
window.addEventListener("click", function (e) {
  const loginModal = document.getElementById("login-modal") || document.getElementById("login");
  const contactModal = document.getElementById("contact-modal") || document.getElementById("contactModal");
  const gameModal = document.getElementById("game-modal");

  if (e.target === loginModal) window.closeLoginModal();
  if (e.target === contactModal) window.closeContactOptions();
  if (e.target === gameModal) window.closeGameModal();
});

// Escape key listener
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    window.closeLoginModal();
    window.closeContactOptions();
    window.closeGameModal();
  }
});

// Splash screen loading controls
let loadingTimer = null;
window.showLoading = function (text = "أهلاً بيك 🚀", seconds = 2) {
  const screen = document.getElementById("loadingScreen");
  const title = document.getElementById("loadingText");
  const count = document.getElementById("loadingCount");
  const progress = document.querySelector(".splash-progress-bar");

  if (!screen) return;
  if (loadingTimer) clearInterval(loadingTimer);

  if (title) title.textContent = text;
  screen.style.display = "flex";
  screen.classList.remove("loading-hide");
  screen.classList.add("show");
  screen.setAttribute("aria-hidden", "false");

  let remaining = Math.max(1, Number(seconds) || 2);
  if (count) count.textContent = `${remaining}s`;

  if (progress) {
    progress.style.transition = "none";
    progress.style.width = "0%";
    void progress.offsetWidth;
    progress.style.transition = `width ${remaining}s cubic-bezier(0.2, 0, 0.2, 1)`;
    progress.style.width = "100%";
  }

  loadingTimer = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      if (count) count.textContent = `${remaining}s`;
    } else {
      clearInterval(loadingTimer);
      loadingTimer = null;
      window.hideLoading();
    }
  }, 1000);
};

window.hideLoading = function () {
  const screen = document.getElementById("loadingScreen");
  if (!screen) return;
  if (loadingTimer) clearInterval(loadingTimer);

  screen.classList.remove("show");
  screen.classList.add("loading-hide");
  screen.style.display = "none";
  screen.setAttribute("aria-hidden", "true");
};

// Initialize login form listeners
document.addEventListener("DOMContentLoaded", () => {
  AuthController.initLoginForm();

  // Smart Session Check: If already authenticated, update buttons to direct portal access
  try {
    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub();
      if (!user) return;

      try {
        const tokenResult = await user.getIdTokenResult();
        const claims = tokenResult.claims || {};
        const email = (user.email || "").toLowerCase();

        let role = claims.role;
        if (!role) {
          if (email.endsWith("@admin.local")) role = ROLES.ADMIN;
          else if (email.endsWith("@system.local")) role = ROLES.TEACHER;
          else role = ROLES.STUDENT;
        }

        const roleLabel =
          role === ROLES.ADMIN
            ? "لوحة الإدارة"
            : role === ROLES.TEACHER
            ? "لوحة المعلم"
            : "بوابة الطالب";

        const loginBtns = document.querySelectorAll(".landing-login-btn");
        loginBtns.forEach((btn) => {
          btn.innerHTML = `<span class="material-symbols-outlined text-[19px]">rocket_launch</span><span>الدخول إلى ${roleLabel}</span>`;
          btn.onclick = (e) => {
            e.preventDefault();
            Router.navigateToRole(role);
          };
        });

        // Also if user clicks game challenge, let them in directly
        const gameActionBtn = document.getElementById("gameChallengeBtn");
        if (gameActionBtn) {
          gameActionBtn.onclick = (e) => {
            e.preventDefault();
            Router.navigateToRole(role);
          };
        }
      } catch (err) {
        console.warn("Session check warning:", err);
      }
    });
  } catch (authErr) {
    console.warn("Auth observer error in landing:", authErr);
  }
});

export { AuthController };

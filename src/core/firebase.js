// src/core/firebase.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js";

const firebaseConfig = {
  apiKey: "AIzaSyCy6l-t5Kji_3Pxs0fcy7ZH4VZL3aOudx0",
  authDomain: "etihad-bshababha.firebaseapp.com",
  projectId: "mostakbal-watan-courses",
  storageBucket: "mostakbal-watan-courses.firebasestorage.app",
  messagingSenderId: "28994305753",
  appId: "1:28994305753:web:1aa5d732c15a770e24c8c8",
  measurementId: "G-YVP0VE2DS0"
};

// Singleton initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, "europe-west1");

export { httpsCallable };
export default app;

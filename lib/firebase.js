// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9DsP-s_dbfGdHgrwMZ-_2eZbP50_8qBE",
  authDomain: "spotlight-wag5yx.firebaseapp.com",
  projectId: "spotlight-wag5yx",
  storageBucket: "spotlight-wag5yx.firebasestorage.app",
  messagingSenderId: "918558081801",
  appId: "1:918558081801:web:f6aded49d173770db689d8",
  measurementId: "G-9BEDPYM0DB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

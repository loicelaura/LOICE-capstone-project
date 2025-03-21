// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhtEAqKD7QqvOQ-IfnOFZcoe5AMjBBuT4",
  authDomain: "daily-activity-planner-68956.firebaseapp.com",
  projectId: "daily-activity-planner-68956",
  storageBucket: "daily-activity-planner-68956.firebasestorage.app",
  messagingSenderId: "710641808732",
  appId: "1:710641808732:web:85feb0f6f3735ed3adbd99",
  measurementId: "G-XDQR9JV005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
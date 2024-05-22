// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAGWm9Z2ruF18Syix8CUd_R88--nV-RTs",
  authDomain: "mern2library-f21df.firebaseapp.com",
  projectId: "mern2library-f21df",
  storageBucket: "mern2library-f21df.appspot.com",
  messagingSenderId: "700041686290",
  appId: "1:700041686290:web:ea5ab20f7b578ffea197cb",
  measurementId: "G-ZX73QZFW9Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

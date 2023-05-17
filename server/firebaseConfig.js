// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIG7_hfEBDQ8DKno9nhG5CbVbmd03zr_0",
  authDomain: "note-app-ea2ea.firebaseapp.com",
  projectId: "note-app-ea2ea",
  storageBucket: "note-app-ea2ea.appspot.com",
  messagingSenderId: "193332822355",
  appId: "1:193332822355:web:7f95db60d8a795c080e1a6",
  measurementId: "G-PBRC6FEP1D"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
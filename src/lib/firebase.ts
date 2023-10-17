// Import the functions you need from the SDKs you need
import { initializeApp, getApps, deleteApp, getApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlfavRCcyKQ1snYoIU_Km8anlIjyDUYg8",
  authDomain: "project-broteas.firebaseapp.com",
  projectId: "project-broteas",
  storageBucket: "project-broteas.appspot.com",
  messagingSenderId: "182004280507",
  appId: "1:182004280507:web:8da2b95051c284dc624d9e",
  measurementId: "G-Y10FTECLHV"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
  deleteApp(app);
  app = initializeApp(firebaseConfig);
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
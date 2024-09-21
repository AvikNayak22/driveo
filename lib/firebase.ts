// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "driveo-7c769.firebaseapp.com",
  projectId: "driveo-7c769",
  storageBucket: "driveo-7c769.appspot.com",
  messagingSenderId: "1062875173328",
  appId: "1:1062875173328:web:ac8903d18c53481307e9d5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };

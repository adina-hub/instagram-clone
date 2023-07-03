// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOx1guwfmngFQ26Hxt9V1dWSkXrvOaE5E",
  authDomain: "instagram-clone-5a335.firebaseapp.com",
  projectId: "instagram-clone-5a335",
  storageBucket: "instagram-clone-5a335.appspot.com",
  messagingSenderId: "1091844452640",
  appId: "1:1091844452640:web:383c635bce7e80c5346745"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage }
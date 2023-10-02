// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBloZQRVN7rOe-Zf032kbSTOpFSGn9GyuY",
  authDomain: "geomapping-info-sys.firebaseapp.com",
  projectId: "geomapping-info-sys",
  storageBucket: "geomapping-info-sys.appspot.com",
  messagingSenderId: "684331752039",
  appId: "1:684331752039:web:ee7228859d1fe6f29a92c2",
  measurementId: "G-0D43FE9TX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
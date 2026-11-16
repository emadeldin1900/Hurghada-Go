import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBun3M3jUwXQ3pdxV4qUr-CE0npgE7t0WU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "go-hurghada-baa3c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "go-hurghada-baa3c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "go-hurghada-baa3c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "493483852754",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:493483852754:web:dc5b53b07ce2153733be0b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LNKE0BFLCF"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "mock-api-key" &&
  firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;
let storage = null;
let googleProvider = null;
let appleProvider = null;
let analytics = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    appleProvider = new OAuthProvider('apple.com');
    appleProvider.addScope('email');
    appleProvider.addScope('name');

    // Initialize analytics in browser environment if supported
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (err) {
    console.warn("Firebase initialization warning:", err);
  }
}

export { app, auth, db, storage, googleProvider, appleProvider, analytics };
export default firebaseConfig;

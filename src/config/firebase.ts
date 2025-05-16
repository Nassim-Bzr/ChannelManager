import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDG75EwJJ2nQpgkJ_W_-y-5EWKpTvkW4zk",
  authDomain: "channelmanager-9d0a9.firebaseapp.com",
  projectId: "channelmanager-9d0a9",
  storageBucket: "channelmanager-9d0a9.firebasestorage.app",
  messagingSenderId: "319114557665",
  appId: "1:319114557665:web:303f9f7d8d09ae39c49fa0",
  measurementId: "G-E2284HP1SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, analytics }; 
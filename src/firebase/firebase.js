import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyATWGGZ5FehNHE_RulnecX9ABbIlyan-d4",
  authDomain: "react-app-3ab49.firebaseapp.com",
  projectId: "react-app-3ab49",
  storageBucket: "react-app-3ab49.appspot.com",
  messagingSenderId: "155780717021",
  appId: "1:155780717021:web:fe9ea4d0c02ef99bcc3e34"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
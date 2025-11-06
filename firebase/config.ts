// firebase/config.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVKHzj511iB2IB7MqxIeK3Ip-dyVc_4XA",
  authDomain: "primeabsensi.firebaseapp.com",
  projectId: "primeabsensi",
  storageBucket: "primeabsensi.appspot.com",
  messagingSenderId: "481357532067",
  appId: "1:481357532067:web:8845e380bbbaba15b6e816",
  measurementId: "G-E2XHJHDKBZ"
};

// ⚠️ Pastikan initializeApp hanya dipanggil sekali
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


// Ekspor auth dan db
export const auth = getAuth(app);
export const db = getFirestore(app);

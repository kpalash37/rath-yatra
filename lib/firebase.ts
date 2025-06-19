// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAyoJKH0BMwq1WE4Rk8_91isEzz69FIlhc",
  authDomain: "rathyatradb.firebaseapp.com",
  projectId: "rathyatradb",
  databaseURL: "https://rathyatradb-default-rtdb.firebaseio.com",
  storageBucket: "rathyatradb.firebasestorage.app",
  messagingSenderId: "728010562006",
  appId: "1:728010562006:web:fae492480fb8f3544b2c77",
  measurementId: "G-85QKBDMB3T"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const database = getDatabase(app);

export { database };

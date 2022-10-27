
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'





const firebaseConfig = {
  apiKey: "AIzaSyAQWnedaiH4FCMpB4YA_Bhg4b5Y0smUneg",
  authDomain: "level-one-auto.firebaseapp.com",
  projectId: "level-one-auto",
  storageBucket: "level-one-auto.appspot.com",
  messagingSenderId: "528203547259",
  appId: "1:528203547259:web:bfd17d6d0c4ba9235958de",
  measurementId: "G-BQWM1GCQLJ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()
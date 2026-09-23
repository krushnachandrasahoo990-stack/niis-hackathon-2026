import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4W5fLnbovkEuprFzdE3sKrsiz9CU8I7k",
  authDomain: "niis-hackathon-db.firebaseapp.com",
  projectId: "niis-hackathon-db",
  storageBucket: "niis-hackathon-db.firebasestorage.app",
  messagingSenderId: "98055011859",
  appId: "1:98055011859:web:f968c2c99b22545961c9u6",
  measurementId: "G-PEKT76T0MC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIQzQSoNu--LFkZysEcURLcjAV75igjzg",
  authDomain: "tatawei.firebaseapp.com",
  projectId: "tatawei",
  storageBucket: "tatawei.appspot.com",
  messagingSenderId: "482101901992",
  appId: "1:482101901992:web:9649572c73f247579e209d",
  measurementId: "G-KB8X2L3LBG",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it as `db`
const db = getFirestore(app);
export { db };

export default app;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
console.log(process.env);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "fleet-manager-35d92.firebaseapp.com",
  projectId: "fleet-manager-35d92",
  storageBucket: "fleet-manager-35d92.appspot.com",
  messagingSenderId: "578621553561",
  appId: "1:578621553561:web:57c70857feb366a55e7108",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

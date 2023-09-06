// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  //   apiKey: "AIzaSyAiibKlHAEnInRzydHKPs2G4FbETif9kuc",
  authDomain: "fleet-manager-35d92.firebaseapp.com",
  projectId: "fleet-manager-35d92",
  storageBucket: "fleet-manager-35d92.appspot.com",
  messagingSenderId: "578621553561",
  appId: "1:578621553561:web:57c70857feb366a55e7108",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

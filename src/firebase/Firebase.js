import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //Authentication
import { getFirestore } from "firebase/firestore"; //Firestore Database

const firebaseConfig = {
  apiKey: "AIzaSyDH-xT3pggeDdabKSAqzyOQqxK-WtWhG00",
  authDomain: "e-commerce-nextjs-e7f31.firebaseapp.com",
  projectId: "e-commerce-nextjs-e7f31",
  storageBucket: "e-commerce-nextjs-e7f31.appspot.com",
  messagingSenderId: "148990088347",
  appId: "1:148990088347:web:ec9793a40e6e6f2191623e",
  measurementId: "G-PF3DTTF4FL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getFirestore(app);
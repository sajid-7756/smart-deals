import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACq02tI_SPJQXagaAbbWyWxGCAfBbNrMc",
  authDomain: "smart-deals-a78b7.firebaseapp.com",
  projectId: "smart-deals-a78b7",
  storageBucket: "smart-deals-a78b7.firebasestorage.app",
  messagingSenderId: "666957599501",
  appId: "1:666957599501:web:e50ff13fbbb34a49cc9644",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

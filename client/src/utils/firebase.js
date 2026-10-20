
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aceit-2d401.firebaseapp.com",
  projectId: "aceit-2d401",
  storageBucket: "aceit-2d401.firebasestorage.app",
  messagingSenderId: "604530036018",
  appId: "1:604530036018:web:0b9cb1b66c0af17c031b2b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}
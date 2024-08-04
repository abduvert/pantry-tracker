// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV9petsb9aNyKwB43qFNgdQG-OiZ2MrrU",
  authDomain: "pantry-tracker-36e28.firebaseapp.com",
  projectId: "pantry-tracker-36e28",
  storageBucket: "pantry-tracker-36e28.appspot.com",
  messagingSenderId: "407684945134",
  appId: "1:407684945134:web:6a23d967a2f7d299904fff",
  measurementId: "G-ZVVSPQZY91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)
const provider = new GoogleAuthProvider();

export { firestore, auth, provider, signInWithPopup };

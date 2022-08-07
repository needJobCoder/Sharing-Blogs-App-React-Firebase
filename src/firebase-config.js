// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtHki32lGetxHvfX13T0rfXOXaHQgUvBo",
  authDomain: "blog-36b02.firebaseapp.com",
  projectId: "blog-36b02",
  storageBucket: "blog-36b02.appspot.com",
  messagingSenderId: "719276424775",
  appId: "1:719276424775:web:30a201509b5910229b3b62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
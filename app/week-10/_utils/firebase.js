// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCP-UBvAKLXD7izQys3UF0Oj_i4Y1LlUXY",
    authDomain: "cprg306-7e903.firebaseapp.com",
    projectId: "cprg306-7e903",
    storageBucket: "cprg306-7e903.firebasestorage.app",
    messagingSenderId: "386404747899",
    appId: "1:386404747899:web:bd527984fa3510d7a830de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

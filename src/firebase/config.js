// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgy8Vs6kSviLDoHpaePE2XlHW2Ebl_1CE",
  authDomain: "car-rental-f6153.firebaseapp.com",
  projectId: "car-rental-f6153",
  storageBucket: "car-rental-f6153.appspot.com",
  messagingSenderId: "620322711105",
  appId: "1:620322711105:web:48458c50ed7c8be1cd88c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()




const db = getFirestore()
export {db,auth}
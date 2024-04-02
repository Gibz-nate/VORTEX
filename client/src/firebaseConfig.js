// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_7FMAjdZRxPpNXO3K1hYWz9GPJwe9B1o",
  authDomain: "block-chain-voting-system.firebaseapp.com",
  projectId: "block-chain-voting-system",
  storageBucket: "block-chain-voting-system.appspot.com",
  messagingSenderId: "189203287231",
  appId: "1:189203287231:web:51731e3b27023410404a0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
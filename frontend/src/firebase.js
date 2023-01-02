// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyDcpT5wT2IIZwXEqpUeGafF6PTc4ucIS9A",
  authDomain: "imsareplay.firebaseapp.com",
  projectId: "imsareplay",
  storageBucket: "imsareplay.appspot.com",
  messagingSenderId: "784488830425",
  appId: "1:784488830425:web:c40a8b2c771303272eb5c8",
  measurementId: "G-Z51F54EFK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
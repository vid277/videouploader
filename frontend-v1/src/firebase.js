import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcpT5wT2IIZwXEqpUeGafF6PTc4ucIS9A",
  authDomain: "imsareplay.firebaseapp.com",
  projectId: "imsareplay",
  storageBucket: "imsareplay.appspot.com",
  messagingSenderId: "784488830425",
  appId: "1:784488830425:web:c40a8b2c771303272eb5c8",
  measurementId: "G-Z51F54EFK7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
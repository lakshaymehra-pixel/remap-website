import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuxWgFYCIpsX_lOjvU0R1UVkAXYv8pH-s",
  authDomain: "salarytopup-otp.firebaseapp.com",
  projectId: "salarytopup-otp",
  storageBucket: "salarytopup-otp.firebasestorage.app",
  messagingSenderId: "254652858758",
  appId: "1:254652858758:web:b21981b2d9c8734bdaac07",
  measurementId: "G-LWNPRWJBKZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };

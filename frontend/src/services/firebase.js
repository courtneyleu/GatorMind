import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  /*apiKey: "secret",
    authDomain: "secret",
    projectId: "secret",
    storageBucket: "secret",
    messagingSenderId: "secret",
    appId: "secret",
    measurementId: "secret"*/
    apiKey: "AIzaSyAVijNTKy2UpmytW0Fnyr_eRz8CZYkBIZU",

    authDomain: "gator-mind.firebaseapp.com",
  
    projectId: "gator-mind",
  
    storageBucket: "gator-mind.appspot.com",
  
    messagingSenderId: "793974744981",
  
    appId: "1:793974744981:web:9d9aed0d8d4e91483cb89c",
  
    measurementId: "G-2JVXCHXXJF"
  
  
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (firstName, lastName, username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      lastName,
      username,
      authProvider: "local",
      email,
      following : 0,
      followers : 0
    });
  }
  catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  }
  catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  console.log(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
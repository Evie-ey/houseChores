// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyD-0xyI8Ygc6ctFFeXr6h40amnR2n9g44A",
  authDomain: "housechores-fcc0f.firebaseapp.com",
  projectId: "housechores-fcc0f",
  storageBucket: "housechores-fcc0f.appspot.com",
  messagingSenderId: "843067361789",
  appId: "1:843067361789:web:a9cf1e23bf8daf9a4d7194",
  measurementId: "G-4D1JY66FXX"
});

const db = getFirestore(firebaseConfig)
const auth = getAuth(firebaseConfig)

export {db, auth};

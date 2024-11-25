// Import necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAK8-MbaH5FMpHOUOSlMjMyezQ8coNdao",
  authDomain: "final-project-1320.firebaseapp.com",
  projectId: "final-project-1320",
  storageBucket: "final-project-1320.appspot.com",
  messagingSenderId: "408638174146",
  appId: "1:408638174146:web:24e43dc2fb8e5c86eadc5b",
  measurementId: "G-2NSH0KDJWJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

// Export Firebase services
export { app, auth, fireStore, storage };

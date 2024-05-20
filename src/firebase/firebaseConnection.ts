import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBbHOkwECzvDWif-kzweze4CumcYBp_9ug",
  authDomain: "openskill-1a.firebaseapp.com",
  projectId: "openskill-1a",
  storageBucket: "openskill-1a.appspot.com",
  messagingSenderId: "221063951220",
  appId: "1:221063951220:web:7ea37a571890bcc9b97221",
  measurementId: "G-7MQT23Q1T9"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export{db, auth, storage};
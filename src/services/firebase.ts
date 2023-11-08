import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSFn7qwoILD5a49_1F5dm2ksMKHJoTbp8",
  authDomain: "mapatesoro-6529c.firebaseapp.com",
  projectId: "mapatesoro-6529c",
  storageBucket: "mapatesoro-6529c.appspot.com",
  messagingSenderId: "50136449291",
  appId: "1:50136449291:web:ac981162b5ae72b0a2220e",
  measurementId: "G-F987D632YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

//exports

export { auth, db, storage }

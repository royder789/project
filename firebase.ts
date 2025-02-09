// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, addDoc,getDocs ,updateDoc} from "firebase/firestore"; 
 

import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0438n__djHXtP4IeHgqSoH7ShoB33ECE",
  authDomain: "cktu-56c2f.firebaseapp.com",
  projectId: "cktu-56c2f",
  storageBucket: "cktu-56c2f.firebasestorage.app",
  messagingSenderId: "804359966174",
  appId: "1:804359966174:web:6b307a72c35e31b9e5a14f",
  measurementId: "G-3474BSWBPZ"
};
                                                                                                                       
                                                                                                               
          
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);



// Function to fetch fraud cases from Firestore
const fetchFraudCases = async () => {
  try {
    const fraudCollection = collection(db, "fraudCases");
    const snapshot = await getDocs(fraudCollection);
    const fraudData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("Fetched Fraud Cases:", fraudData);
    return fraudData;
  } catch (error) {
    console.error("Error fetching fraud cases:", error);
    return [];
  }
};
const analytics = getAnalytics(app);
export { db, addDoc, collection,getDocs,updateDoc };




*/



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0438n__djHXtP4IeHgqSoH7ShoB33ECE",
  authDomain: "cktu-56c2f.firebaseapp.com",
  projectId: "cktu-56c2f",
  storageBucket: "cktu-56c2f.firebasestorage.app",
  messagingSenderId: "804359966174",
  appId: "1:804359966174:web:6b307a72c35e31b9e5a14f",
  measurementId: "G-3474BSWBPZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, collection, getDocs };

// Import the functions you need from the SDKs you need
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase, ref, set, push} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACW0J3k96ENCcZo1oZ03_Xx-EnElzhZMY",
  authDomain: "mobileprogramming-50430.firebaseapp.com",
  projectId: "mobileprogramming-50430",
  storageBucket: "mobileprogramming-50430.firebasestorage.app",
  messagingSenderId: "380086003709",
  appId: "1:380086003709:web:373b537ab10ef607359b94",
  measurementId: "G-9NBRBNSZB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

console.log("Firebase initialized");
console.log(database);

function addData(name, email, message) {
  const db = getDatabase();

  const usersRef = ref(db, 'users');
  const newUserRef = push(usersRef);

  set(newUserRef, {
    name: name,
    email: email,
    message: message
  });

  console.log("Data added successfully!");
  console.log("Generated user ID:", newUserRef.key);
}

// Expose the function to the global scope so it can be called from HTML
window.addData = addData;
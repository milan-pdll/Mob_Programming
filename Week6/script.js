{/* <script type="module"> */}
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  import { getDatabase,get,set,ref} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
// </script>
  console.log("milandada");
  console.log(database);
// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

function addData(users) {
  const db = getDatabase();
  const writes = users.map(([user_id, name, email, gender, marital_status, occupation, place_of_birth, nationality, date_of_birth, phone_number]) =>
    set(ref(db, `users/${user_id}`), {
      username: name,
      email,
      gender,
      marital_status,
      occupation,
      place_of_birth,
      nationality,
      date_of_birth,
      phone_number
    })
  );
}

// exposing the function to the global scope so it can be called from HTML
window.addData = addData;

function readData(userId) {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log(userData);
    } else {
      console.log("No data available");
    }

  }).catch((error) => {
    console.error(error);
  });
}


window.readData = readData;
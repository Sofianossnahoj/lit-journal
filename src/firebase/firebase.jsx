// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getFirestore } from "@firebase/firestore";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBZNNNG77o3mAB3L2puNdbUVGXP9M2VEJw",
  authDomain: "literature-journal.firebaseapp.com",
  projectId: "literature-journal",
  storageBucket: "literature-journal.appspot.com",
  messagingSenderId: "430383309143",
  appId: "1:430383309143:web:4b78f0e828e0f1c7f29e12",
};

// death-by-firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDP8pEx78IIdYQKgAOOw3dHXp6qS7OvFbA",
//   authDomain: "death-by-firestore.firebaseapp.com",
//   projectId: "death-by-firestore",
//   storageBucket: "death-by-firestore.appspot.com",
//   messagingSenderId: "986318356367",
//   appId: "1:986318356367:web:fdedcf5fb7425a5a2ed5fa",
// };

// Initialize Firebase
// export const db = getFirestore(app);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default db;

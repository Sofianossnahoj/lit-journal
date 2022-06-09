import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZNNNG77o3mAB3L2puNdbUVGXP9M2VEJw",
  authDomain: "literature-journal.firebaseapp.com",
  projectId: "literature-journal",
  storageBucket: "literature-journal.appspot.com",
  messagingSenderId: "430383309143",
  appId: "1:430383309143:web:4b78f0e828e0f1c7f29e12",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default db;

import { app } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import db from "../firebase/firebase";
import { useState } from "react";

function useFirebase() {
  const [userName, setUserName] = useState(null);
  const auth = getAuth();

  const handleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });

        await addDoc(docs(db, "users", user.uid, "user details"), {
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return {
    handleSignIn,
    userName,
  };
}

export default useFirebase;

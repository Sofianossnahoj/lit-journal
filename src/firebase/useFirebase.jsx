import { app } from "./firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import db from "../firebase/firebase";
import { useEffect, useState } from "react";
import { login, logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function useFirebase() {
  const [userName, setUserName] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  const handleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    try {
      const userAuth = await signInWithPopup(auth, googleAuthProvider);
      if (userAuth !== null) {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      }
      /*         .then(
        (userAuth) => {
          dispatch(
            login({
              email: userAuth.email,
              uid: userAuth.uid,
              displayName: userAuth.displayName,
            })
          );
        }
      );
      console.log(result); */
      const user = userAuth.user;
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

  /*   return (
    <userAuthContext.Provider value={{ handleSignIn, userName }}>
      {children}
    </userAuthContext.Provider>
  ); */
}

export default useFirebase;

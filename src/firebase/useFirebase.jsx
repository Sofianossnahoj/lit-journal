import { app } from "./firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
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
import { useEffect } from "react";
import { login, logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function useFirebase() {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      // console.log("inside useeffect userAuth: ", userAuth);
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

  // Prevent from firing on reload
  const handleSignIn = async () => {
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
      const user = userAuth.user;
      //console.log(userAuth);
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

  // Prevent from firing twice
  const handleSignOut = async () => {
    try {
      if (currentUser !== null) {
        const auth = getAuth();
        await signOut(auth);

        dispatch(logout());
        console.log('Dispatch logout and auth signout was fired');
      } else {
        console.log('User already signed out');
      }
    } catch (error) {
      console.log('Error: ', error)
    }
  };

  return {
    handleSignIn,
    handleSignOut
  };

  /*   return (
    <userAuthContext.Provider value={{ handleSignIn, userName }}>
      {children}
    </userAuthContext.Provider>
  ); */
}

export default useFirebase;

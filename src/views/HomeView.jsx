import Header from "../components/Header";
import SearchBooks from "../components/SearchBooks";
import React, { useEffect } from "react";
import { selectUser } from "../features/userSlice";
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import db from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEntries, getEntries } from "../features/entriesSlice";

function HomeView() {
  const entries = useSelector(getEntries);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const usersEntries = async () => {
    // console.log("logs currentuser: ", currentUser);
    // const auth = getAuth();
    // const user = auth.currentUser;
    if (currentUser !== null) {
      const uid = currentUser.uid;
      const entryQuery = query(collection(db, `users/${uid}/journal-notes`));
      console.log(entryQuery);
      const querySnapshot = await getDocs(entryQuery);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    
      dispatch(setEntries(data));

      // setEntries(data);
      // console.log(data);
      // console.log(entries);
    }
    // let currentUserId = firebase.auth().currentUser;
    // setCurrentUser(currentUserId);

    // console.log(entries);
  };

  useEffect(() => {
    usersEntries();
  }, []);

  // Must update after deletion
  const handleDelete = async (id) => {
    const docRef = doc(db, `users/${currentUser.uid}/journal-notes`, id);
    await deleteDoc(docRef);
  };

  return (
    <section>
      <Header />
      <h5>You don't have any journal entries yet!</h5>

      <button>Create New Entry</button>

      <h2>testar att loopa ut från användares info från firestore</h2>
      <span>
        {entries.map((val, id) => {
          // console.log("logs val in template map", val.id);
          return (
            <div key={id}>
              <p>{val.title}</p>
              <p>{val.author}</p>
              <button onClick={() => handleDelete(val.id)}>Delete</button>
            </div>
          );
        })}
      </span>
      <SearchBooks />
    </section>
  );
}

export default HomeView;

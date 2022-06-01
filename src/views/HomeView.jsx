import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEntries, getEntries, deleteEntry } from "../features/entriesSlice";
import { selectUser } from "../features/userSlice";
import db from "../firebase/firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import Header from "../components/Header";
import SearchBooks from "../components/SearchBooks";
import MenuBar from "../components/MenuBar";

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

  const handleDelete = async (id) => {
    const docRef = doc(db, `users/${currentUser.uid}/journal-notes`, id);
    const deletedItem = await deleteDoc(docRef);
    dispatch(deleteEntry(deletedItem));
    usersEntries();
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
      <MenuBar />
    </section>
  );
}

export default HomeView;

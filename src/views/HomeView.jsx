import React, { useEffect } from "react";
import "../sass/views/homeView.scss"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import SearchBar from "../components/SearchBar";
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
    <main className="home-view">
      <h2>LITerature Journal</h2>
      <div className="hr" />
      <SearchBar />
      <h5>You don't have any journal entries yet!</h5>

      <Link to="/create"><button>Create New Entry</button></Link>

      <h2>testar att loopa ut från användares info från firestore</h2>
      <h1>Testing space</h1>
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
      <MenuBar />
    </main>
  );
}

export default HomeView;

import React, { useEffect } from "react";
import "../sass/views/homeView.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usersEntries = async () => {
    // console.log("logs currentuser: ", currentUser);
    // const auth = getAuth();
    // const user = auth.currentUser;
    if (currentUser !== null) {
      const uid = currentUser.uid;
      const entryQuery = query(collection(db, `users/${uid}/journal-notes`));
      /* console.log(entryQuery); */
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

  const test = () => {
    /* console.log("test"); */
    navigate("/search", { replace: true });
  };

  return (
    <main className="home-view">
      <h2>LITerature Journal</h2>
      <div className="hr" />
      <div onClick={test}>
        <SearchBar />
      </div>

      {/* {entries ? (
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
          ) : (
            <div>
            <h5>You don't have any journal entries yet!</h5>
            
            <Link to="/create">
            <button>Create New Entry</button>
            </Link>
            </div>
          )} */}

      <section className="message-no-entries">
        <h3>You don't have any journal entries yet!</h3>

        <Link to="/create">
          <button>Create New Entry</button>
        </Link>
      </section>

      <MenuBar />
    </main>
  );
}

export default HomeView;

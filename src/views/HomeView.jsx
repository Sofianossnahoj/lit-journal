import React, { useEffect, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);

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

  const navigateToSearch = () => {
    navigate("/search", { replace: true });
  };

  return (
    <main className="home-view">
      <h2>LITerature Journal</h2>
      <div className="hr" />
      <div onSubmit={navigateToSearch}>
        <SearchBar />
      </div>

      {entries.length > 0 ? (
        <span>
          {entries.map((note, id) => {
            // console.log("logs val in template map", val.id);
            return (
              <article key={id} className="note-container">
                <section className="note-collapsed">
                  <label className="note-label">Title</label>
                  <p className="note-text">{note.title}</p>
                  <label className="note-label">Author</label>
                  <p className="note-text">{note.author}</p>
                  <label className="note-label">Genre</label>
                  <p className="note-text">{note.genre}</p>
                  <label className="note-label">Method</label>
                  <p className="note-text">{note.method}</p>
                </section>
                {isVisible ? (
                  <section className="">
                    <label className="note-label">Was it worth the read?</label>
                    <p className="note-text">{note.worthit}</p>
                    <label className="note-label">Favorite chapter</label>
                    <p className="note-text">{note.favoriteChapter}</p>
                    <label className="note-label">Favorite character</label>
                    <p className="note-text">{note.favoriteCharacter}</p>
                    <label className="note-label">
                      Sequel, will you read it?
                    </label>
                    <p className="note-text">{note.sequel}</p>
                    <label className="note-label">Quotes</label>
                    <p className="note-text">{note.quotes}</p>
                  </section>
                ) : (
                  <p></p>
                )}
                <section className="note-button">
                  <button
                    className="note-button-icon"
                    onClick={() => handleDelete(note.id)}
                  >
                    <img
                      className="icon"
                      src="src/images/trash-can-grey.png"
                      alt="Delete"
                    />
                  </button>
                  {!isVisible ? (
                    <button onClick={() => setIsVisible(true)}>See More</button>
                  ) : (
                    <button onClick={() => setIsVisible(false)}>
                      See Less
                    </button>
                  )}
                </section>
              </article>
            );
          })}
        </span>
      ) : (
        <section className="message-no-entries">
          <h3>You don't have any journal entries yet!</h3>

          <Link to="/create">
            <button>Create New Entry</button>
          </Link>
        </section>
      )}

      {/* <section className="message-no-entries">
        <h3>You don't have any journal entries yet!</h3>

        <Link to="/create">
          <button>Create New Entry</button>
        </Link>
      </section> */}
      <MenuBar />
    </main>
  );
}

export default HomeView;

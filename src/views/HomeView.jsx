import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import db from "../firebase/firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setEntries, getEntries, deleteEntry } from "../features/entriesSlice";
import { selectUser } from "../features/userSlice";
import SearchBar from "../components/SearchBar";
import MenuBar from "../components/MenuBar";
import "../sass/views/homeView.scss";

function HomeView() {
  const [isVisible, setIsVisible] = useState(false);
  const entries = useSelector(getEntries);
  const currentUser = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usersEntries = async () => {
    if (currentUser !== null) {
      const uid = currentUser.uid;
      const entryQuery = query(collection(db, `users/${uid}/journal-notes`));
      const querySnapshot = await getDocs(entryQuery);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setEntries(data));
    }
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
      <h3>Your Entries</h3>

      {entries.length > 0 ? (
        <span className="note-list">
          {entries.map((note, id) => {
            return (
              <article key={id} className="note-container">
                <section className="note-collapsed">
                  <div className={note.image ? "note-with-image" : ""}>
                    {note.image ? (
                      <img
                        src={note.image}
                        alt="Book Cover"
                        className="image"
                      />
                    ) : (
                      <p />
                    )}

                    <div>
                      <label className="note-label">Title</label>
                      <p className="note-text">{note.title}</p>
                      <label className="note-label">Author</label>
                      <p className="note-text">{note.author}</p>
                    </div>
                  </div>
                </section>
                {isVisible ? (
                  <section>
                    <label className="note-label">Genre</label>
                    <p className="note-text">{note.genre}</p>
                    <label className="note-label">Method</label>
                    <p className="note-text-extended">{note.method}</p>
                    <label className="note-label">Was it worth the read?</label>
                    <p className="note-text-extended">{note.worthit}</p>
                    <label className="note-label">Favorite chapter</label>
                    <p className="note-text-extended">{note.favoriteChapter}</p>
                    <label className="note-label">Favorite character</label>
                    <p className="note-text-extended">
                      {note.favoriteCharacter}
                    </p>
                    <label className="note-label">
                      Sequel, will you read it?
                    </label>
                    <p className="note-text-extended">{note.sequel}</p>
                    <label className="note-label">Quotes</label>
                    <p className="note-text-extended">{note.quotes}</p>
                  </section>
                ) : (
                  <p />
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
      <MenuBar />
    </main>
  );
}

export default HomeView;

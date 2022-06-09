import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import db from "../firebase/firebase";
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { createEntry } from "../features/entriesSlice";
import { selectUser } from "../features/userSlice";
import { entryInfo } from "../features/bookEntrySlice";

const JournalNote = () => {
  const bookData = useSelector(entryInfo);
  console.log(bookData);
  const [journalNote, setJournalNote] = useState({
    title: bookData ? bookData.title : "",
    author: bookData ? bookData.authors : "",
    genre: "",
    method: "",
    worthit: "",
    favoriteCharacter: "",
    favoriteChapter: "",
    sequel: "",
    quotes: "",
    image: bookData.imageUrl ? bookData.imageUrl.thumbnail : "",
  });

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(journalNote.image);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setJournalNote({
      ...journalNote,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const q = query(collection(db, "users"));
    //console.log("handleSub curentUser: ", currentUser);
    const userId = currentUser.uid;
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((journalNote) => ({
      ...journalNote.data(),
      id: journalNote.id,
    }));
    const newEntryData = {
      title: journalNote.title,
      author: journalNote.author,
      genre: journalNote.genre,
      method: journalNote.method,
      worthit: journalNote.worthit,
      favoriteCharacter: journalNote.favoriteCharacter,
      favoriteChapter: journalNote.favoriteChapter,
      sequel: journalNote.sequel,
      quotes: journalNote.quotes,
      image: journalNote.image,
    };
    queryData.map(async () => {
      await setDoc(
        doc(db, `users/${userId}/journal-notes`, journalNote.title),
        newEntryData
      );
    });

    dispatch(createEntry(newEntryData));
    navigate("/home", { replace: true });
  };

  return (
    <section className="card">
      <h3>Create a journal note</h3>
      <form
        className="form-new-entry"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <section className="form-section-top">
          {journalNote.image ? (
            <img src={journalNote.image} alt="Book Cover" className="image" />
          ) : (
            <p />
          )}
          <label>Title</label>
          {!bookData.title ? (
            <input
              className="box"
              type="text"
              id="title"
              value={journalNote.title}
              onChange={handleChange}
              name="title"
            />
          ) : (
            <p
              onChange={handleChange}
              value={journalNote.title}
              className="box"
            >
              {bookData.title}
            </p>
          )}
          <label>Author</label>
          {!bookData.authors ? (
            <input
              className="box"
              type="text"
              value={journalNote.author}
              onChange={handleChange}
              id="author"
              name="author"
            />
          ) : (
            <p value={journalNote.author} className="box">
              {bookData.authors}
            </p>
          )}
          <label>Genre</label>
          <input
            type="text"
            className="box"
            id="genre"
            value={journalNote.genre}
            onChange={handleChange}
            name="genre"
          />
        </section>
        <section className="form-section-bottom">
          <label>Method</label>
          {/*<select className="box" id="method" name="method">
            <option value="book">Book</option>
            <option value="audio-book">Audio Book</option>
            <option value="e-book">E-book</option>
          </select> */}
          <input
            type="text"
            className="box"
            value={journalNote.method}
            onChange={handleChange}
            id="method"
            name="method"
          />
          <label>Was it worth the read?</label>
          <input
            type="text"
            className="box"
            value={journalNote.worthit}
            onChange={handleChange}
            id="worthit"
            name="worthit"
          />
          <label>Favorite chapter</label>
          <input
            type="text"
            className="box"
            value={journalNote.favoriteChapter}
            onChange={handleChange}
            id="favoriteChapter"
            name="favoriteChapter"
          />
          <label>Favorite character</label>
          <input
            type="text"
            className="box"
            value={journalNote.favoriteCharacter}
            onChange={handleChange}
            id="favoriteCharacter"
            name="favoriteCharacter"
          />
          <label>Sequel, will you read it?</label>
          <input
            type="text"
            className="box"
            value={journalNote.sequel}
            onChange={handleChange}
            id="sequel"
            name="sequel"
          />
          <label>Quotes</label>
          <textarea
            type="text"
            className="box box-large"
            value={journalNote.quotes}
            onChange={handleChange}
            id="quotes"
            name="quotes"
          />
          <button className="button-save" onClick={handleSubmit}>
            Save Entry
          </button>
        </section>
      </form>
    </section>
  );
};

export default JournalNote;

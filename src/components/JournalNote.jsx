import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import db from "../firebase/firebase";
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { createEntry } from "../features/entriesSlice";
import { selectUser } from "../features/userSlice";

const JournalNote = () => {
  const [journalNote, setJournalNote] = useState({
    title: "",
    author: "",
    genre: "",
    method: "",
    worthit: "",
    favoriteCharacter: "",
    favoriteChapter: "",
    sequel: "",
    quotes: "",
  });

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setJournalNote({
      ...journalNote,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const q = query(collection(db, "users"));
    console.log("handleSub curentUser: ", currentUser);
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
        }
    queryData.map(() => {
      setDoc(
        doc(db, `users/${userId}/journal-notes`, journalNote.title),
        newEntryData
      );
    });
    dispatch(createEntry(newEntryData));
    navigate('/home', { replace: true });
  };
  
  return (
    <section>
      <h1>Create a journal note</h1>
      <form className="form-new-entry" onSubmit={(e) => e.preventDefault()}>
        <section className="form-section-top">
          <label htmlFor="">Title</label>
          <input
            className="box"
            type="text"
            id="title"
            value={journalNote.title}
            onChange={handleChange}
            name="title"
          />
          <label htmlFor="">Author</label>
          <input
            className="box"
            type="text"
            value={journalNote.author}
            onChange={handleChange}
            id="author"
            name="author"
          />
          <label htmlFor="">Genre</label>
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
          <label htmlFor="">Method</label>
          <input
            type="text"
            className="box"
            value={journalNote.method}
            onChange={handleChange}
            id="method"
            name="method"
          />
          <label htmlFor="">Was it worth the read?</label>
          <textarea
            type="text"
            className="box box-large"
            value={journalNote.worthit}
            onChange={handleChange}
            id="worthit"
            name="worthit"
          />
          <label htmlFor="">Favorite chapter</label>
          <input
            type="text"
            className="box"
            value={journalNote.favoriteChapter}
            onChange={handleChange}
            id="favoriteChapter"
            name="favoriteChapter"
          />
          <label htmlFor="">Favorite character</label>
          <input
            type="text"
            className="box"
            value={journalNote.favoriteCharacter}
            onChange={handleChange}
            id="favoriteCharacter"
            name="favoriteCharacter"
          />
          <label htmlFor="">Sequel, will you read it?</label>
          <input
            type="text"
            className="box"
            value={journalNote.sequel}
            onChange={handleChange}
            id="sequel"
            name="sequel"
          />
          <label htmlFor="">Quotes</label>
          <textarea
            type="text"
            className="box box-large"
            value={journalNote.quotes}
            onChange={handleChange}
            id="quotes"
            name="quotes"
          />
            <button
              className="button-save"
              onClick={handleSubmit}>
                Save Entry
            </button>
        </section>
      </form>
    </section>
  );
};

export default JournalNote;

import { doc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, getDocs } from "firebase/firestore";

export const JournalNote = () => {
  const [userId, setUserId] = useState(null);
  const [journalNote, setJournalNote] = useState({
    title: "",
    author: "",
    genre: "",
  });

  // behöver hjälp så det bara hämtas en gång
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        const userId = user.uid;

        console.log("user uid from firestore: ", userId);
        setUserId(userId);
        // setDoc(doc(db, `users/user/${uid}/journalnotes`));
        // console.log(newCollectionRef);
      } else {
        console.log("user not found");
      }
    });
    return () => {
      unsubscribe();
      console.log("unsub in useeffect");
    };
  }, [userId]);

  console.log("userId from updated state: ", userId);

  const handleChange = (event) => {
    setJournalNote({
      ...journalNote,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((journalNote) => ({
      ...journalNote.data(),
      id: journalNote.id,
    }));
    console.log(queryData);
    queryData.map(async () => {
      await setDoc(
        doc(db, `users/${userId}/journal-notes`, journalNote.title),
        {
          title: journalNote.title,
          author: journalNote.author,
          genre: journalNote.genre,
        }
      );
    });
  };
  return (
    <section>
      <h1>Create a journal note</h1>
      <div>
        <label>title</label>
        <input
          type="text"
          id="title"
          value={journalNote.title}
          onChange={handleChange}
          name="title"
        />

        <label>Author</label>
        <input
          type="text"
          value={journalNote.author}
          onChange={handleChange}
          id="author"
          name="author"
        />

        <label>Genre</label>
        <textarea
          id="genre"
          value={journalNote.genre}
          onChange={handleChange}
          name="genre"
        ></textarea>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </section>
  );
};

export default function Form() {
  return (
    <form className="form-new-entry">
      <section className="form-section-top">
        <label htmlFor="">Title</label>
        <input type="text" className="box" />
        <label htmlFor="">Author</label>
        <input type="text" className="box" />
        <label htmlFor="">Genre</label>
        <input type="text" className="box" />
      </section>
      <section className="form-section-bottom">
        <label htmlFor="">Method</label>
        <input type="text" className="box" />
        <label htmlFor="">Was it worth the read?</label>
        <textarea type="text" className="box box-large" />
        <label htmlFor="">Favorite chapter</label>
        <input type="text" className="box" />
        <label htmlFor="">Favorite character</label>
        <input type="text" className="box" />
        <label htmlFor="">Sequel, will you read it?</label>
        <input type="text" className="box" />
        <label htmlFor="">Quotes</label>
        <textarea type="text" className="box box-large" />
        <button className="button-save">Save entry</button>
      </section>
    </form>
  );
}

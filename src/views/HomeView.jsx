import Header from "../components/header";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase/firebase";
import db from "../firebase/firebase";

function HomeView() {
  const [entries, setEntries] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const usersEntries = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.uid;
      const entryQuery = query(collection(db, `users/${uid}/journal-notes`));
      console.log(entryQuery);
      const querySnapshot = await getDocs(entryQuery);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEntries(data);
      console.log(data);
      console.log(entries);
    }
    // let currentUserId = firebase.auth().currentUser;
    // setCurrentUser(currentUserId);

    console.log(entries);
  };

  useEffect(() => {
    usersEntries();
  }, []);

  return (
    <section>
      <Header />
      <h5>You don't have any journal entries yet!</h5>

      <button>Create New Entry</button>

      <h2>testar att loopa ut från användares info från firestore</h2>
      <span>
        {entries.map((val, id) => {
          console.log("logs val in template map", val.id);
          return <p key={id}>{val.id.title}</p>;
        })}
      </span>
    </section>
  );
}

export default HomeView;

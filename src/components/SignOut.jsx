import React from "react";
import useFirebase from "../firebase/useFirebase";

function SignOut() {
  const { handleSignOut, user } = useFirebase();

  return (
    <div>
      <article className="menu-button" onClick={handleSignOut}>
        <img src="src/images/arrow-right-from-bracket-grey.png" alt="search" className="menu-icons" />
        <p className="menu-button-text">Signout</p>
      </article>
    </div>
  );
}

export default SignOut;

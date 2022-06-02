import React from "react";
import useFirebase from "../firebase/useFirebase";

function SignOut() {
  const { handleSignOut, user } = useFirebase();

  return (
    <div>
      <button className="menu-button" onClick={handleSignOut}>
        <img src="src/images/arrow-right-from-bracket-grey.png" alt="search" className="menu-icons" />
        Sign Out
      </button>
      {user}
    </div>
  );
}

export default SignOut;

import React from "react";
import useFirebase from "../firebase/useFirebase";

function SignOut() {
  const { handleSignOut, user } = useFirebase();

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
      {user}
    </div>
  );
}

export default SignOut;

import React from "react";
import useFirebase from "../firebase/useFirebase";

function signIn() {
  const { handleSignIn, userName } = useFirebase();
  return (
    <div>
      <p>Sign in by clicking on the button</p>
      <button onClick={handleSignIn}>Sign In</button>
      {userName}
    </div>
  );
}

export default signIn;

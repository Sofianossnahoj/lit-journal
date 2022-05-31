import React, { useState } from "react";
import useFirebase from "../firebase/useFirebase";

function SignIn() {
  const { handleSignIn, user } = useFirebase();
  return (
    <div>
      <p>Sign in by clicking on the button</p>
      <button onClick={handleSignIn}>Sign In</button>
      {user}
    </div>
  );
}

export default SignIn;

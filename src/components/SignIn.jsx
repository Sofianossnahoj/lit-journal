import React from "react";
import useFirebase from "../firebase/useFirebase";
import GoogleButton from 'react-google-button';

function SignIn() {
  const { handleSignIn } = useFirebase();

  return (
    <div>
      <GoogleButton
        type="light"
        onClick={handleSignIn}
      />
    </div>
  );
}

export default SignIn;

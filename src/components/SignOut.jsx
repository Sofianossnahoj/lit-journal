import React from "react";
import { logout } from "../features/userSlice";
import { useDispatch } from "react-redux";

function SignOut() {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(logout());
    console.log("dispatch log out fired");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default SignOut;

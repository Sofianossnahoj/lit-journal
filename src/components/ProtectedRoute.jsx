import { Navigate } from "react-router-dom";
import { useUserAuth } from "../firebase/useFirebase";

const ProtectedRoute = ({ children }) => {
  const userName = useUserAuth();
  console.log("Check user in private: ", userName);

  if (!userName) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(selectUser)
  //console.log("Check user in private: ", currentUser);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;

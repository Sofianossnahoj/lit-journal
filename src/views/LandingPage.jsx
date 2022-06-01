import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import SignIn from "../components/SignIn";

function LandingPage() {
  const currentUser = useSelector(selectUser);

  if (currentUser !== null) {
    return <Navigate to="/home" />;
  }

  return (
    <section className="landing">
      <p>Welcome to LITerature Journal</p>
      <SignIn />
    </section>
  );
}

export default LandingPage;
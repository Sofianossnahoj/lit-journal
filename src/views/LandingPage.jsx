import "../sass/views/landingPage.scss";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Header from "../components/header";
import SignIn from "../components/SignIn";

function LandingPage() {
  const currentUser = useSelector(selectUser);

  if (currentUser !== null) {
    return <Navigate to="/home" />;
  }

  return (
    <main className="landing-page">
      <section className="content-box">
        <h3>Welcome to</h3>
        <Header />
        <SignIn />
      </section>
    </main>
  );
}

export default LandingPage;
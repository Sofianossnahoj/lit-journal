import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Header from "../components/header";
import SignIn from "../components/SignIn";
import "../sass/views/landingPage.scss";

function LandingPage() {
  const currentUser = useSelector(selectUser);

  if (currentUser !== null) {
    return <Navigate to="/home" />;
  }

  return (
    <main className="landing-page">
      <section className="content-box">
        <h2>Welcome to</h2>
        <Header />
        <SignIn />
      </section>
    </main>
  );
}

export default LandingPage;

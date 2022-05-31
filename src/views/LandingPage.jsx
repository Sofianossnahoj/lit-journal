import SignIn from "../components/SignIn";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section className="landing">
      <p>Welcome to LITerature Journal</p>
      <Link to="/home"><SignIn /></Link>
    </section>
  );
}

export default LandingPage;
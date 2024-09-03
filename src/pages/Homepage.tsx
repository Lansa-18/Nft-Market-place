// import { Link } from "react-router-dom";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";

export default function Homepage() {
  return (
    <>
      <div className="p-12 min-h-screen">
        <Navbar />
        <Main />
      </div>
      <Navigation type={'home'} />
    </>
  );
}

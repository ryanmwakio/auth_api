import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/login" className="signin">
              Sign in
            </Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Home;

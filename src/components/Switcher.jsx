import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Switcher() {
  //get current path
  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(window.location.pathname);
  }, [path]);

  return (
    <>
      <ul className="switcher">
        <li>
          <Link to="/login" className={path === "/login" ? "selected" : ""}>
            Sign in
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className={path === "/register" ? "selected" : ""}
          >
            New account
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Switcher;

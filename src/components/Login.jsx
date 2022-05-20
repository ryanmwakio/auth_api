import React from "react";
import Switcher from "./Switcher";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="user-modal-container">
        <Switcher />
        <div id="login ">
          <form className="form">
            <p className="fieldset">
              <label className="image-replace email" for="signin-email">
                E-mail
              </label>
              <input
                className="full-width has-padding has-border"
                id="signin-email"
                type="email"
                placeholder="E-mail"
              />
              <span className="error-message">
                An account with this email address does not exist!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace password" for="signin-password">
                Password
              </label>
              <input
                className="full-width has-padding has-border"
                id="signin-password"
                type="password"
                placeholder="Password"
              />
              <a href="#0" className="hide-password">
                Show
              </a>
              <span className="error-message">Wrong password! Try again.</span>
            </p>

            <p className="fieldset">
              <input type="checkbox" id="remember-me" checked />
              <label for="remember-me">Remember me</label>
            </p>

            <p className="fieldset">
              <input className="full-width" type="submit" value="Login" />
            </p>
          </form>

          <p className="form-bottom-message">
            <Link to="/reset-password">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

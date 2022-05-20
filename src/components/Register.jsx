import React from "react";
import Switcher from "./Switcher";

function Register() {
  return (
    <>
      <div className="user-modal-container">
        <Switcher />
        <div id="signup">
          <form className="form">
            <p className="fieldset">
              <label className="image-replace username" for="signup-username">
                Username
              </label>
              <input
                className="full-width has-padding has-border"
                id="signup-username"
                type="text"
                placeholder="Username"
              />
              <span className="error-message">
                Your username can only contain numeric and alphabetic symbols!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace email" for="signup-email">
                E-mail
              </label>
              <input
                className="full-width has-padding has-border"
                id="signup-email"
                type="email"
                placeholder="E-mail"
              />
              <span className="error-message">
                Enter a valid email address!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace username" for="signup-username">
                Current Location
              </label>
              <input
                className="full-width has-padding has-border"
                id="signup-username"
                type="text"
                placeholder="Your Location e.g Nairobi, Kenya"
              />
              <span className="error-message">
                Your username can only contain numeric and alphabetic symbols!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace password" for="signup-password">
                Password
              </label>
              <input
                className="full-width has-padding has-border"
                id="signup-password"
                type="password"
                placeholder="Password"
              />
              <a href="#0" className="hide-password">
                Show
              </a>
              <span className="error-message">
                Your password has to be at least 6 characters long!
              </span>
            </p>

            <p className="fieldset">
              <input type="checkbox" id="accept-terms" />
              <label for="accept-terms">
                I agree to the{" "}
                <a className="accept-terms" href="#0">
                  Terms
                </a>
              </label>
            </p>

            <p className="fieldset">
              <input
                className="full-width has-padding"
                type="submit"
                value="Create account"
              />
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

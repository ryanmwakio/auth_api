import React, { useState } from "react";
import Switcher from "./Switcher";
import axios from "../api/axios";

let REGISTER_URL = "/register";
function Register() {
  let [showPassword, setShowPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState("");
  let [successful, setSuccessful] = useState(false);

  let togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const location_name = e.target.location_name.value;

      const user = JSON.stringify({ name, email, password, location_name });

      setLoading(true);
      const response = await axios.post(REGISTER_URL, user, {
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      console.log(response);
      setMessage(response.data.message);
      setSuccessful(response.data.successful);

      //empty all the form values
      // e.target.name.value = "";
      // e.target.email.value = "";
      // e.target.password.value = "";
      // e.target.location_name.value = "";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="user-modal-container">
        <Switcher />
        <div id="signup">
          <form className="form" onSubmit={handleSubmit}>
            <p className="fieldset">
              <label className="image-replace username">Username</label>
              <input
                className="full-width has-padding has-border"
                id="signup-username"
                type="text"
                placeholder="Username"
                name="name"
                required
              />
              <span className="error-message">
                Your username can only contain numeric and alphabetic symbols!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace email">E-mail</label>
              <input
                className="full-width has-padding has-border"
                id="signup-email"
                type="email"
                placeholder="E-mail"
                name="email"
                required
              />
              <span className="error-message">
                Enter a valid email address!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace username">Current Location</label>
              <input
                className="full-width has-padding has-border"
                id="signup-userlocation"
                type="text"
                placeholder="Your Location e.g Nairobi, Kenya"
                name="location_name"
                required
              />
              <span className="error-message">
                Your username can only contain numeric and alphabetic symbols!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace password">Password</label>
              <input
                className="full-width has-padding has-border"
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
              />
              <a href="#0" className="hide-password" onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
              </a>
              <span className="error-message">
                Your password has to be at least 6 characters long!
              </span>
            </p>

            <p className="fieldset">
              <input type="checkbox" id="accept-terms" />
              <label>
                I agree to the{" "}
                <a className="accept-terms" href="#0">
                  Terms
                </a>
              </label>
            </p>
            <span
              className={`message ${
                successful ? "text-success" : "text-danger"
              }`}
            >
              {message}
            </span>
            <span>{}</span>

            <p className="fieldset">
              <input
                className="full-width has-padding"
                type="submit"
                value={loading ? "Loading..." : "Register"}
              />
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

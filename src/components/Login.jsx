import React, { useContext, useState } from "react";
import Switcher from "./Switcher";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./../store/userContext";
import axios from "../api/axios";

const LOGIN_URL = "/login";
function Login() {
  const { setUser } = useContext(UserContext);
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState("");
  let [successful, setSuccessful] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  let togglePassword = () => {
    setShowPassword(!showPassword);
  };

  //login function through a submitted form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const user = JSON.stringify({ email, password });
      setLoading(true);
      const response = await axios.post(LOGIN_URL, user, {
        headers: { "Content-Type": "application/json" },
      });

      //parse the response the whole response if it's in json format
      setMessage(response.data.message);
      setLoading(false);
      setSuccessful(response.data.successful);
      setUser(response.data.responseObject[0]);

      //empty all the form values
      e.target.email.value = "";
      e.target.password.value = "";

      //redirect to the home page
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="user-modal-container">
        <Switcher />
        <div id="login ">
          <form className="form" onSubmit={handleSubmit}>
            <p className="fieldset">
              <label className="image-replace email">E-mail</label>
              <input
                name="email"
                className="full-width has-padding has-border"
                id="signin-email"
                type="email"
                placeholder="E-mail"
                required
              />
              <span className="error-message">
                An account with this email address does not exist!
              </span>
            </p>

            <p className="fieldset">
              <label className="image-replace password">Password</label>
              <input
                name="password"
                className="full-width has-padding has-border"
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <a href="#0" className="hide-password" onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
              </a>
              <span className="error-message">Wrong password! Try again.</span>
            </p>

            <p className="fieldset">
              <input type="checkbox" id="remember-me" name="remember_me" />
              <label>Remember me</label>
            </p>
            <span
              className={`message ${
                successful ? "text-success" : "text-danger"
              }`}
            >
              {message}
            </span>

            <p className="fieldset">
              <input
                className="full-width"
                type="submit"
                value={loading ? "Loading..." : "Login"}
              />
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

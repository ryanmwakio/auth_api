import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../store/userContext";

function ResetPassword() {
  let { user, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <div className="user-modal-container">
        <div id="reset-password">
          <p className="form-message">
            Lost your password? Please enter your email address. You will
            receive a link to create a new password.
          </p>

          <form className="form">
            <p className="fieldset">
              <label className="image-replace email">E-mail</label>
              <input
                className="full-width has-padding has-border"
                id="reset-email"
                type="email"
                placeholder="E-mail"
              />
              <span className="error-message">
                An account with this email does not exist!
              </span>
            </p>

            <p className="fieldset">
              <input
                className="full-width has-padding"
                type="submit"
                value="Reset password"
              />
            </p>
          </form>

          <p className="form-bottom-message">
            <Link to="/login">Back to log-in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;

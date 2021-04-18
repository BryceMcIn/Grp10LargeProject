import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";

import "./Email.css";

function SendPass(props) {
  // local details
  const [state, setState] = useState({
    login: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      login: state.login,
    };
    axios
      .post(
        "https://letsbuckit.herokuapp.com/api/send-password-recovery",
        payload
      )
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Update successful. Redirecting to settings page..",
          }));
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          redirectToHome();
          props.showError(null);
        } else if (response.code === 204) {
          props.showError("Password Incorrect");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // method for submitting the form
  const submitHandler = (e) => {
    // prevent the page from reloading
    e.preventDefault();

    // passes through the form details we have set via props
    Email(details);
  };
  return (
    <div className="grid-container">
      <div className="grid-item">
        <div class="grid-item">
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <h2>Reset Password</h2>
              <div class="form-group">
                <label htmlFor="login">Username </label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  value={state.login}
                  onChange={handleChange}
                />
                <h3>
                  An email will be sent to the account associated with this
                  login
                </h3>
              </div>

              <input
                type="submit"
                value="Send Email"
                onClick={handleSubmitClick}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendPass;

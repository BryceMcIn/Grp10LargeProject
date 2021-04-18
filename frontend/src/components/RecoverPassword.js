import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";

import "./Email.css";

function RecoverPassword(props) {
  // local details
  const [state, setState] = useState({
    newPassword: "",
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
      newPassword: state.newPassword,
    };
    axios
      .post("https://letsbuckit.herokuapp.com/api/password-reset", payload)
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
              <h2>New Password</h2>
              <div class="form-group">
                <label htmlFor="newPassword"> New Password </label>
                <input
                  type="text"
                  name="newPassword"
                  id="newPassword"
                  value={state.newPassword}
                  onChange={handleChange}
                />
              </div>

              <input
                type="submit"
                value="Reset Password"
                onClick={handleSubmitClick}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecoverPassword;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";

import "./Email.css";

function Password(props) {
  // local details
  const [state, setState] = useState({
    login: "",
    password: "",
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
  const jwt = require("jsonwebtoken");
  var storage = require("../tokenStorage.js");

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { json: true });

  var localUserID = ud.userID;

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      userID: localUserID,
      login: state.login,
      password: state.password,
      newPassword: state.newPassword,
    };
    axios
      .post("https://letsbuckit.herokuapp.com/api/change-password", payload)
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
              <h2>Update Password</h2>
              <div class="form-group">
                <label htmlFor="login">Login</label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  value={state.login}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label htmlFor="currentPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <h3>To verify your identity, please enter your password</h3>
              <div class="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={state.newPassword}
                  onChange={handleChange}
                />
              </div>
              <input
                type="submit"
                value="Save Changes"
                onClick={handleSubmitClick}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;

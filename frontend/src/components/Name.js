import React, { useEffect, useState } from "react";
import axios from "axios";
import navbar from "./Navbar.js";
import { Route, withRouter, Link, Switch } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";

import "./Email.css";
// this is to change the login username
function Name(props) {
  // local details
  const [state, setState] = useState({
    login: "",
    newLogin: "",
    password: "",
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
      //needs to be changed to email maybe.
      userID: localUserID,
      login: state.login,
      newLogin: state.newLogin,
      password: state.password,
    };
    axios
      .post("https://letsbuckit.herokuapp.com/api/change-login", payload)
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
              <h2>Update Login</h2>
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
                <label htmlFor="oldEmail">New Login</label>
                <input
                  type="text"
                  name="newLogin"
                  id="newLogin"
                  value={state.newLogin}
                  onChange={handleChange}
                />
              </div>
              <h3>To verify your identity, please enter your password</h3>
              <div class="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              <input
                type="submit"
                value="Save Changes"
                onClick={handleSubmitClick}
              />
              <button style={{ marginLeft: 20 }} className="button">
                <Link to="/navbar">
                  <span className="linktext2">Back to Settings</span>
                </Link>
                <Switch>
                  <Route path="/navbar" component={navbar} exact={true} />
                </Switch>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Name;

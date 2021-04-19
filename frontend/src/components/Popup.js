import "./Popup.css";
import axios from "axios";
import friends from "./Friends.js";
import React, { useEffect, useState, useHistory } from "react";
import { Route, withRouter, Link, Switch } from "react-router-dom";
function Popup(props) {
  // local details

  const [state, setState] = useState({
    senderID: "",
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
      //needs to be changed to email maybe.
      senderID: state.senderID,
      login: state.login,
    };
    axios
      .post("https://letsbuckit.herokuapp.com/api/fr-request", payload)
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
    window.location.href = "/http://localhost:3000/friends";

    // passes through the form details we have set via props
    Popup(details);
  };

  return props.trigger ? (
    <Route>
      <div className="popup">
        <div className="popup-inner">
          <form onSubmit={submitHandler}>
            <label htmlFor="newEmail">Enter Friends Email</label>
            <div className="form-inner">
              <h2>Add Friend</h2>
              <div class="form-group">
                <label htmlFor="newEmail">login</label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  value={state.login}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label htmlFor="senderID">Friends ID</label>
                <input
                  type="text"
                  name="senderID"
                  id="senderID"
                  value={state.senderID}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <button className="button" onClick={handleSubmitClick}>
            Add Friend
          </button>
        </div>
      </div>
    </Route>
  ) : (
    ""
  );
}

export default Popup;

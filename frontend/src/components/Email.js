import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";
import navbar from "./Navbar.js";
import { Route, withRouter, Link, Switch, useHistory } from "react-router-dom";
import "./Email.css";

function Email(props) {
  // local details
  const [state, setState] = useState({
    email: "",
    newEmail: "",
    password: "",
    successMessage: null,
    stateError:false,
    message:''
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
      email: state.email,
      newEmail: state.newEmail,
      password: state.password,
    };
    axios
      .post("https://letsbuckit.herokuapp.com/api/change-email", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            stateError:false,
            message:"Email change successful"
          }));
        } else if (response.status == 204 || response.code == 500) {
          setState((prevState) => ({
            ...prevState,
            stateError:true,
            message:"Email change unsuccessful. Check password"
          }));
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

  let history=useHistory();

  return (
    <div class="registerContainer">
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
      <div class="registerTitle">Change Email</div>
      <input class="form-control formItem" id="email" onChange={handleChange} value={state.login} placeholder="Old Email"></input>
      <input class="form-control formItem" id="newEmail" onChange={handleChange} value={state.newLogin} placeholder="New Email"></input>
      <input class="form-control formItem" type="password" id="password" onChange={handleChange} value={state.password} placeholder="Password"></input>
      <div class="links" onClick={() => { history.push('/home') }}>Back To Home</div>
      <button class="btn registerButton" onClick={handleSubmitClick}>Change Email</button>
      <div class="links" style={{ color: state.successState ? '#7b0000' : "#77dd77" }}>{state.message}</div>
    </div>
  );
}

export default Email;

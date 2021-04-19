import React, { useEffect, useState } from "react";
import axios from "axios";
import navbar from "./Navbar.js";
import { Route, withRouter, Link, Switch, useHistory} from "react-router-dom";
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
      stateError:false,
      message:''
    };
    axios
      .post("https://letsbuckit.herokuapp.com/api/change-login", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            stateError:false,
            message:"Login change successful"
          }));
        } else if (response.status === 204) {
          setState((prevState) => ({
            ...prevState,
            stateError:true,
            message:"Login change unsuccessful. Check password"
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let history = useHistory()

  return (
    <div class="registerContainer">
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
      <div class="registerTitle">Change Login</div>
      <input class="form-control formItem" id="login" onChange={handleChange} value={state.login} placeholder="Old Username"></input>
      <input class="form-control formItem" id="newLogin" onChange={handleChange} value={state.newLogin}  placeholder="New Username"></input>
      <input class="form-control formItem" type="password" id="password" onChange={handleChange} value={state.password}  placeholder="Password"></input>
      <div class="links" onClick={()=>{history.push('/home')}}>Back To Home</div>
      <button class="btn registerButton" onClick={handleSubmitClick}>Change Login</button>
      <div class="links" style={{ color: state.successState ? '#7b0000' : "#77dd77"}}>{state.message}</div>
    </div>
  );
}

export default Name;

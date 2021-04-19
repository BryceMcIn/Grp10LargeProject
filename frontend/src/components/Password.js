import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";
import { Route, withRouter, Link, Switch, useHistory } from "react-router-dom";

function Password(props) {
  // local details
  const [state, setState] = useState({
    login: "",
    password: "",
    newPassword: "",
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
            stateError:false,
            message:"Email change successful"
          }));
        } else {
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

  let history = useHistory();

  return (
    <div class="registerContainer">
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
      <div class="registerTitle">Change Password</div>
      <input class="form-control formItem" id="login" onChange={handleChange} value={state.login} placeholder="Username"></input>
      <input class="form-control formItem" type="password" id="password" onChange={handleChange} value={state.password}  placeholder="Password"></input>
      <input class="form-control formItem" type="password" id="newPassword" onChange={handleChange} value={state.newPassword}  placeholder="New Password"></input>
      <div class="links" onClick={()=>{history.push('/home')}}>Back To Home</div>
      <button class="btn registerButton" onClick={handleSubmitClick}>Change Password</button>
      <div class="links" style={{ color: state.successState ? '#7b0000' : "#77dd77"}}>{state.message}</div>
    </div>
  );
}

export default Password;

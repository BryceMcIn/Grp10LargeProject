import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";

import "./Email.css";

function SendPass(props) {
  // local details
  const [state, setState] = useState({
    login: "",
    successMessage: null,
    successState: null
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
            successMessage: "Check your email for instructions",
            successState: true
          }));
        } else if (response.status === 204) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "No email found",
            successState: false
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="registerContainer">
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
  <div class="registerTitle">
    Password Reset
  </div>
  <input class="formItem" id="login" type="text" placeholder="Username" onChange={handleChange} value={state.login}></input>
<div class="fieldCaption">An email will be sent to the account associated with this login</div>
<button type="button" class="btn registerButton" onClick={handleSubmitClick}>Send Reset Email</button>
<div class="links" style={{ color: !state.successState ? '#7b0000' : "#77dd77"}}>{state.successMessage}</div>
</div>
  );
}

export default SendPass;

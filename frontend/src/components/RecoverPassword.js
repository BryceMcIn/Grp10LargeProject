import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants.js";

import "./RegistrationForm/RegistrationForm.css";
import { Redirect } from "react-router";

function RecoverPassword(props) {
  // local details
  const [state, setState] = useState({
    token: "",
    password: "",
    retypedPassword: "",
    successMessage: null,
    successState: false
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = () => {
    const payload = {
      token:state.token,
      newPassword:state.password
    };

    if(state.password != state.retypedPassword){
      setState((prevState) => ({
        ...prevState,
        successMessage: "Passwords do not match!",
      }))
      return;
    }
    axios
      .post("/api/password-reset", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Password Reset Successful",
            successState : true
          }))
          console.log(state.successMessage);
        } else if (response.code === 204) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Invalid Token.",
            successState: false
          }))
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
  <div class="registerTitle">Reset Password</div>
  <input class="formItem" id="token" type="text" placeholder="Email Token" value={state.emailToken} onChange={handleChange}></input>
<input class="formItem" id="password" type="password" placeholder="New Password" value={state.emailToken} onChange={handleChange}></input>
<input class="formItem" id="retypedPassword" type="password" placeholder="Retype New Password" value={state.emailToken} onChange={handleChange}></input>
<button type="button" class="btn registerButton" value={state.emailToken} onClick={ () =>handleSubmitClick()}>Reset Password</button>
<div class="links" style={{ color: !state.successState ? '#7b0000' : "green"}}>{state.successMessage}</div>
</div>
  );
}

export default RecoverPassword;

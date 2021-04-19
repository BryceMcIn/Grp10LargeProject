import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { withRouter, Link, useHistory } from "react-router-dom";

function LoginForm(props) {

    let history = useHistory();

    const storage = require('../../tokenStorage.js');
    const [state, setState] = useState({
        login: "",
        password: "",
        successMessage: null,
        sucessState: false
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            //needs to be changed to email maybe.
            "login": state.login,
            "password": state.password,
        }

        console.log(payload)
        axios.post('https://letsbuckit.herokuapp.com/api/login', payload)
            .then(function (response) {
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful. Redirecting to home page..'
                    }))

                    var res = response.data;
                    console.log(res);
                    storage.storeToken(res.jwt);
                    history.push('/home')
                }
                else if (response.status === 204) {
                    setState(prevState => ({
                        ...prevState,
                        successMessage: 'Invalid User/Pass or account unverified',
                        sucessState: false
                    }))
                }
                else {
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div class="registerContainer">
             <link rel="preconnect" href="https://fonts.gstatic.com"></link>
             <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
            <div class="registerTitle">Let's Buck-it!</div>
            <div>
            <img class="loginLogo" src="https://raw.githubusercontent.com/BryceMcIn/Grp10LargeProject/frontend/settings/frontend/public/circle-cropped.png" alt="logo"></img>
            </div>
            <input class="formItem" placeholder="Username" id="login" value={state.login} onChange={handleChange} type="text"></input>
            <input class="formItem" placeholder="Password" id="password" value={state.password} onChange={handleChange}  type="password"></input>
            <div class="links" onClick={()=>{history.push('/sendPassword')}}>Forgot password?</div>
            <button class="btn registerButton" onClick={handleSubmitClick}>Login</button>
            <div class="links" onClick={()=>{history.push('/register')}}>Don't an account? Click here to register!</div>
            <div class="links" style={{ color: state.successMessage ? '#7b0000' : "#77dd77"}}>{state.successMessage}</div>
        </div>
    )
}

export default withRouter(LoginForm);
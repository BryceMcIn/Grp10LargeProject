import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        firstName :"",
        lastName :"",
        username :"",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
                "firstName":state.firstName,
                "lastName":state.lastName,
                "login":state.username
            }
            axios.post('/api/register', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        redirectToLogin();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }

    // this is to redirect the props to different pages
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(

        <div class="registerContainer">
                  <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
        <div class="registerTitle">
                Registration
        </div>
        <input class="formItemHalf" type="text" id="firstName" value={state.firstName}
                        onChange={handleChange}  placeholder="First"></input>
        <input class="formItemHalf" id="lastName" value={state.lastName}
                        onChange={handleChange} type="text" placeholder="Last"></input>
        <input class="formItem " id="email" value={state.email}
                        onChange={handleChange} type="email" placeholder="Email"></input>
        <input class="formItem" id="username" value={state.username}
                        onChange={handleChange} type="text" placeholder="Username"></input>
        <input class="formItem" id="password" value={state.password}
                        onChange={handleChange}  type="password" placeholder="Password"></input>
        <input class="formItem" id="confirmPassword" value={state.confirmPassword}
                        onChange={handleChange} type="password" placeholder="Re-Type Password"></input>
        <button type="button" onClick={handleSubmitClick} class="btn registerButton">Register</button>
        <div class="links" onClick={() => redirectToLogin()}>Already have an account? Click here!</div>
        </div>
    )
}

export default withRouter(RegistrationForm);
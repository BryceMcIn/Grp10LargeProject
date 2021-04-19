import React, { useEffect, useState } from "react";
import { Route, withRouter, Link, Switch } from "react-router-dom";
import './VerifyEmail.css';
import axios from 'axios';


const VerifyEmail = function (props) {

    const [state,setState] = useState({
        statusMessage:''
    });

    useEffect( ()=>{

    const parsedInput = props.location.search.substring(1).replaceAll('%22','"').replaceAll('%3A',':').replaceAll('%7D',"}").replaceAll('%7B','{');
    const myPackage = JSON.parse(parsedInput)
    console.log(myPackage);

    axios
    .post("https://letsbuckit.herokuapp.com/api/verify-email", myPackage)
    .then(function(response){
        if(response.status==200){
            setState({
                statusMessage:'Email verified sucessfully'
            })
        }
        else{
            setState({
                statusMessage:'Email not verified'
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
    },[])

    return (
        <div class="emailContainer">
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
            <button class="returnLoginButton" onClick={()=>{history.push('/login')}}>Return to Login</button>
            <div class="emailBody">
                <div class="emailTitle">Email Verification</div>
                <div class="fieldCaption">If something happened, it will show up here:</div>
                <div class="emailStatus">{state.statusMessage}</div>
            </div>
        </div>
    )
}
export default withRouter(VerifyEmail)
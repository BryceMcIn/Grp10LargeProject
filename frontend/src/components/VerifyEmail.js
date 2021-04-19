import { JsonWebTokenError } from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { Route, withRouter, Link, Switch } from "react-router-dom";
import './VerifyEmail.css';


const VerifyEmail = function (props) {

    const [state,setState] = useState({
        statusMessage:''
    });

    const myPackage = JSON.parse(props.location.search.substring(1).replaceAll('%22','"'))
    console.log(myPackage)

    
    return (
        <div class="emailContainer">
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
            <button class="returnLoginButton">Return to Login</button>
            <div class="emailBody">
                <div class="emailTitle">Email Verification</div>
                <div class="fieldCaption">If something happened, it will show up here:</div>
                <div class="emailStatus">Email set.</div>
            </div>
        </div>
    )
}
export default withRouter(VerifyEmail)
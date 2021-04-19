import React from "react";
import "./Navbar.css";

import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import { Route, withRouter, Link, Switch, useHistory} from "react-router-dom";


function Navbar() {

  let history = useHistory();

  return (
    <div class="registerContainer">
   <link rel="preconnect" href="https://fonts.gstatic.com"></link>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
<div class="registerTitle">Settings</div>
  <button class="btn settingsButton" onClick={()=>{history.push('/name')}}>Change Username</button>
  <button class="btn settingsButton" onClick={()=>{history.push('/password')}}>Change Password</button>
  <button class="btn settingsButton" onClick={()=>{history.push('/email')}}>Update Email</button>
  <button class="btn registerButton" onClick={()=>{history.push('/home')}}>Back to Home</button>
</div>
  );
}

export default Navbar;

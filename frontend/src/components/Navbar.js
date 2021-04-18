import React from "react";
import "./Navbar.css";

import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import { Route, withRouter, Link, Switch } from "react-router-dom";
import home from "./Home/Home.js";

function clickMe() {
  alert("This will take back to main");
}
function Navbar() {
  return (
    <Route>
      <>
        <div className="navbar">
          <Link to="#" className="menu-bars"></Link>
        </div>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            <ul className="navbar-toggle">
              <h1 style={{ marginRight: 100 }}>Settings</h1>
              <Link to="#" className="menu-bars" />
            </ul>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <button style={{ marginLeft: -75 }} className="button">
              <Link to="/home">
                <span className="linktext2"> Back to Home</span>
              </Link>
              <Switch>
                <Route path="/home" component={home} exact={true} />
              </Switch>
            </button>
          </ul>
        </nav>
      </>
    </Route>
  );
}

export default Navbar;

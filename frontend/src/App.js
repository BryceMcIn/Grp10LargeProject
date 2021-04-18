import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import Home from "./components/Home/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Email from "./components/Email";
import Navbar from "./components/Navbar";
import Name from "./components/Name";
import Password from "./components/Password";
import Friends from "./components/Friends";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import SendPass from "./components/SendPass";
import RecoverPassword from "./components/RecoverPassword";
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact={true}>
            <RegistrationForm
              showError={updateErrorMessage}
              updateTitle={updateTitle}
            />
          </Route>
          <Route path="/register">
            <RegistrationForm
              showError={updateErrorMessage}
              updateTitle={updateTitle}
            />
          </Route>
          <Route path="/login">
            <LoginForm
              showError={updateErrorMessage}
              updateTitle={updateTitle}
            />
          </Route>
          <Route path="/home">
            <Home showError={updateErrorMessage} updateTitle={updateTitle} />
          </Route>
          <Route path="/friends">
            <Friends showError={updateErrorMessage} updateTitle={updateTitle} />
          </Route>

          <Route path="/email">
            <Email />
          </Route>
          <Route path="/name">
            <Name />
          </Route>
          <Route path="/password">
            <Password />
          </Route>
          <Route path="/sendPassword">
            <SendPass />
          </Route>
          <Route path="/recoverPassword">
            <RecoverPassword />
          </Route>
          <Route path="/navbar">
            <Navbar />
          </Route>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
        </Switch>

        <AlertComponent
          errorMessage={errorMessage}
          hideError={updateErrorMessage}
        />
      </div>
    </Router>
  );
}

export default App;

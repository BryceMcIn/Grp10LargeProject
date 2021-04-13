import React, {useState} from 'react';
import axios from 'axios';
import './home.css';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFill } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function Home(props){

  const jwt = require('jsonwebtoken');
  var storage = require('../../tokenStorage.js');


  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok,{json:true});

  console.log(ud)
  var userId = ud.payload.id;
  var firstName = ud.payload.firstName; 
  var lastName = ud.payload.lastName;


  const [state, setState] = useState({
    searchQuery : "",
    displayState : 0,
    addTitle : "",
    addDesc : "",
    addType : 0
  })

  
  return(
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
      </head>
      <body>
      <div class="wrapper">
  <div class="addItem">
    <div class="addItem-header">
      Add to a list
    </div>
    <div class="addItem-container">
      <input class="addItemTitle form-control" type="text" placeholder="Goal"></input>
      <textarea class="addItemDesc form-control" type="text" placeholder="Describe your goal here!"></textarea>
    </div>
    <div class="buttonContainer">
      <div>
        Which list?
      </div>
      <div>
        <input type="radio" class="listTypeButton btn-check" name="options" id="option1" autocomplete="off"></input><label class="btn btn-secondary" for="option1">Bucket</label> <input type="radio" class="btn-check listTypeButton" name="options" id="option2" autocomplete="off"></input><label class="btn btn-secondary" for="option2">Todo</label>
      </div>
    </div><button type="button" class="btn addItemButton">Add</button>
  </div>
  <div class="sidenav">
    <div class="sidebar-header">
      Welcome,
    </div>
    <div class="user-name">
      {firstName} {lastName}
    </div>
    <div class="sidebar-item">
      <FontAwesomeIcon icon={faFill}/>
      Bucket List
    </div>
    <div class="sidebar-item">
    <FontAwesomeIcon icon={faList}/>
      Todo List
    </div>
    <div class="sidebar-item">
      <FontAwesomeIcon icon={faUserFriends}/>
      Friends
    </div>
    <div class="sidebar-item">
      <FontAwesomeIcon icon={faCog}/>
      Settings
    </div>
    <div class="sidebar-item">
      <FontAwesomeIcon icon={faSignOutAlt}/>
      Sign-Out
    </div>
    <div class="sidebar-bottom">
      [insert graphic]Bucket List
    </div>
  </div>
  <div class="content">
    <input type="text" class="form-control searchBar" placeholder="Search..."></input>
  </div>
</div>
      </body>
    </html>
  )
}

export default withRouter(Home);
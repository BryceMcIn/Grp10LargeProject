import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './home.css';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFill } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import ListContainer from './ListContainer';

function Home(props){

  const [state, setState] = useState({
    searchQuery : "",
    currentListItems : [],
    currentState : 0,
  })

  const [addState, setAddState] = useState({
    addTitle : "",
    addDesc : "",
    currentAddState: 0
  })

  const jwt = require('jsonwebtoken');
  var storage = require('../../tokenStorage.js');

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok,{json:true});

  var localUserID = ud.userID;
  var firstName = ud.firstName; 
  var lastName = ud.lastName;
  //END OF TOKEN CRAP

  useEffect(() => {
    getAllListItems();
  }, []);

  const getAllListItems = async () => {
    const payload = {userID:localUserID};
    const response = await axios.post('/api/all-buckets',payload);
    var responseListItems = response.data.results;
    console.log(responseListItems);
    setState(prevState => ({
      ...prevState,
      currentListItems:responseListItems,
    }))
  }

  const addItemToList = async () => {
    if (addState.currentAddState == 0){
      const payload = {userID:localUserID,itemTitle:addState.addTitle,caption:addState.addDesc};
      const response = await axios.post('/api/add-bucket',payload);
      if(await response.status != 200){
        console.log("Big error. Probably caused by connection");
        return;
      }
      console.log(addState);
      setAddState(prevState => ({
        ...prevState,
        addTitle:"",
        addDesc:""
      }));
      getAllListItems();
    }
    else{
      const payload = {userID:localUserID,itemTitle:addState.addTitle};
      const response = await axios.post('api/add-todo',payload);
      if(await response.status != 200){
        console.log("Big error. Probably caused by connection");
        return;
      }
      console.log(addState);
      setAddState(prevState => ({
        ...prevState,
        addTitle:"",
        addDesc:""
      }));
      getAllListItems();
    }
  }

  const handleChange = (e) => {
    const {id , value} = e.target   
    setAddState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  const handleRadio = (e) => {
    const {value} = e.target
    setAddState(prevState => ({
      ...prevState,
      currentAddState : value
    }))
  }

  return(
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
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
      <input class="addItemTitle form-control" id="addTitle" type="text" placeholder="Goal" value={addState.addTitle} onChange={handleChange}></input>
      <textarea class="addItemDesc form-control" type="text" id="addDesc" placeholder="Describe your goal here!" value={addState.addDesc} onChange={handleChange}></textarea>
    </div>
    <div class="buttonContainer">
      <div>
        Which list?
      </div>
      <div onChange={handleRadio}>
        <input type="radio" value='0' class="listTypeButton btn-check" name="options" id="option1" autocomplete="off"></input><label class="btn btn-secondary" for="option1">Bucket</label> <input type="radio" class="btn-check listTypeButton" name="options" value='1' id="option2" autocomplete="off"></input><label class="btn btn-secondary" for="option2">Todo</label>
      </div>
    </div><button type="button" disabled={!addState.addTitle} class="btn addItemButton" onClick={addItemToList}>Add</button>
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
    <ListContainer state={state}/>
  </div>
</div>
      </body>
    </html>
  )
}

export default withRouter(Home);
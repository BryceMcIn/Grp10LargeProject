import React, { setState, useState, useEffect, useContext } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom"
import './RegistrationForm/RegistrationForm.css'

function Friends() {

  function FriendContainer(props){
    let history = useHistory();
    return(
    props.state.localFriends.map((item, index) => {
      return(<button class="btn friendBox" onClick={()=>{history.push({pathname:'viewFriend',state:item})}}>{'@' + item.login}</button>)
    })
    )
  }
  
  const jwt = require("jsonwebtoken");
  var storage = require("../tokenStorage.js");

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { json: true });

  var localuser = ud.userID;

  const [buttonPopup, setButtonPopup] = useState({
    popupState: false,
    localUserID: localuser
  });
  
  const [state, setState] = useState({
    localFriends: []
  });

  const [addFriend, setAddFriend] = useState({
    currentQuery:"",
    addMessage:""
  });

  //function to get the friends data
  const getFriends = () => {
    //get is getting every response by the endpoint
    const payload = { userID: buttonPopup.localUserID };
    axios
      .post("https://letsbuckit.herokuapp.com/api/fr-allfriends", payload)
      .then((response) => {
        setState({
          localFriends:response.data.results
        });
      })
      .catch(err =>{
        console.log(err);
      })
  };

  // this is going to delete the item from the
  const deleteFriend = () => {
    const payload = { userID: localUserID, friendID: localfriendsId };
    axios
      .post("https://letsbuckit.herokuapp.com/api/fr-remove", payload)
      .then((response) => {
        var responseList = response.data.results;
        console.log(responseList);
        window.location.reload(true);
      });
  };

  useEffect(() => {
    getFriends();
  }, []);

  const handleAddingFriend = function(friendLogin){
    const payload = {senderID:localuser,login:friendLogin};
    axios
    .post('https://letsbuckit.herokuapp.com/api/fr-request',payload)
    .then(function (response){
      if(response.status == 200){
        setAddFriend({
          addMessage: "Friend added successfully!"
        });
      }
      else{
        setAddFriend({
          addMessage: "Error!"
        });
      }
    })
    .catch(err =>{
      console.log(err);
    });
  }

  const handleKeyDown = (e) => {
    var friendLogin;
    const {value} = e.target;
    if(e.key === 'Enter'){
      if(value == "" || value == null){
        return;
      }
      if(value.charAt(0) === '@'){
        friendLogin = value.substring(1);
      }
      else{
        friendLogin = value;
      }

      handleAddingFriend(friendLogin)
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddFriend({
      currentQuery: value
    });
  }

  let history = useHistory();

  return (

    <div class="friendContainer">
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>

      <button class="btn returnHomeButton" onClick={()=>{history.push('/home')}}>Return Home</button>
      <div class="links" id="error">{addFriend.addMessage}</div>
      <div class="addFriendContainer">
        <input class="form-control searchBarHome" id="currentQuery" value={addFriend.currentQuery} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="To add a friend, enter their username here, then press Enter"></input>
      </div>
      <div class="friendBoxContainer">
        <FriendContainer state={state} />
      </div>
    </div>
  );
}

export default Friends;

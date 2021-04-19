import axios from "axios";
import React, { useEffect, useState, useHistory } from "react";
import "./Popup.css";


function Popup(props) {

  var userID;
  const [state, setState] = useState({
    userID: null,
    friendUserLogin: null
  })

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = () => {
    const payload = {
      senderID: userID,
      login: state.friendUserLogin
    };
    axios
    .post("https://letsbuckit.herokuapp.com/api/fr-request", payload)
    .then(function (response) {
      if(response.status == 200){
          console.log('ok');
      }
      else{
        console.log(response);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  console.log("inside popip");
  if(!props.user){
    return(null)
  } else{
    userID = props.user.localUser
  }

  console.log(props);
  return (
    <div class="popup">
      <div class="popup-inner">
        <div class="popupHeader">Add Friend</div>
        <input class="form-control formItem" type="text" id="friendUserLogin" value={state.friendUserLogin} onChange={handleChange} placeholder="Your Friend's Username"></input>
        <button class="btn addFriendButton" onClick={()=>{props.toggle}}>Add Friend</button>
      </div>
    </div>
  );
}

export default Popup;

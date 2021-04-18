import React, { setState, useState, useEffect } from "react";
import "./Popup.js";
import "./Friends.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActions, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Popup from "./Popup.js";
import axios from "axios";
const useStyles = makeStyles({
  root: {
    minWidth: 150,
    marginBlock: 30,

    margin: "20px 20px 50px 20px",
    backgroundColor: "#1E5F74",
    color: "#FFFF",
    display: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 20px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 4,
  },
  pos: {
    marginBottom: 12,
  },
});

function Friends() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [friendReq, setFriend] = useState([]);
  //function to get the friends data
  const getFriends = () => {
    //get is getting every response by the endpoint
    const payload = { userID: localUserID };
    axios
      .post("https://letsbuckit.herokuapp.com/api/fr-allfriends", payload)
      .then((response) => {
        responseList = [];
        var responseList = response.data.results;
        console.log(responseList);
        setFriend(responseList);
      });
  };

  // this is going to delete the item from the
  const deleteFriend = () => {
    const payload = { userID: localUserID, friendID: localfriendsId };
    axios
      .post("https://letsbuckit.herokuapp.com/api/fr-remove", payload)
      .then((response) => {
        var responseList = response.data.results;
        console.log(responseList);
      });
  };

  useEffect(() => {
    getFriends();
  }, []);

  const jwt = require("jsonwebtoken");
  var storage = require("../tokenStorage.js");

  var tok = storage.retrieveToken();
  var ud = jwt.decode(tok, { json: true });

  var localUserID = ud.userID;
  var localfriendsId = ud.friendsId;
  var lastName = ud.lastName;

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className="conatiner">
      <input
        type="text"
        class="form-control searchBar"
        placeholder="Search Friends..."
      ></input>
      <Container>
        <Grid container spacing={1}>
          {friendReq.map((item) => {
            return (
              <Grid item={2}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    ></Typography>
                    <Typography variant="h5" component="h2">
                      {item.login}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {item.friendID}
                    </Typography>
                    {item.itemTitle}
                  </CardContent>
                  <CardActions>
                    <button className="delete" onClick={() => deleteFriend()}>
                      Delete
                    </button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <button className="button" onClick={() => setButtonPopup(true)}>
        Add new Friend
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3></h3>
      </Popup>
      <button onClick={getFriends}> ßuck</button>
    </div>
  );
}

export default Friends;
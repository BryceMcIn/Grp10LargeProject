import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Home/home.css';
import './ViewFriend.css'
import { Route, withRouter, Link, Switch, useHistory } from "react-router-dom";

function ViewFriend(props){

    function ListContainer(props) {

        if (props.state != undefined && props.state.bucketList != undefined){
        var listItemState = '';
        if (props.state.bucketList.length > 0) {
            return (
                props.state.bucketList.map((item, index) => {
                    return (
                        <div class="list-item-Home">
                            <div class="type">
                                Bucket List
                            </div>
                            <div class="listTitle">
                                {item.itemTitle}
                            </div>
                            <div class="listBody">
                                {item.caption}
                            </div>
                        </div>
                    ) 
                })
            )
        }
      }
        return (
            <>
            </>
        )
    }   

    let history = useHistory();
    //main return
    return(
        <div class="friendContainer">
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"></link>
            <button class="btn returnHomeButton" onClick={()=>{history.push('/friends')}}>Return to Friends</button>
            <div class="viewFriendHeader">{'@' + props.location.state.login +"'s Bucket List"}</div>
            <ListContainer state={props.location.state}/>
        </div>
    )
}

export default withRouter(ViewFriend);
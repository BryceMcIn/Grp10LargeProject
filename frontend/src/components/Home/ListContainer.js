import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFill } from '@fortawesome/free-solid-svg-icons'

function ListContainer(props) {

    var listItemState = '';
    if(props.state.currentState === 0){
        listItemState = "Bucket List";
    }
    else{
        listItemState = "Todo List";
    }
    if(props.state.currentListItems.length > 0){
        return(
            props.state.currentListItems.map((item, index) => {
                return(
                    <div class="list-item">
                    <div class="type">
                      {listItemState}
                    </div>
                    <div class="listTitle">
                      {item.itemTitle}
                    </div>
                    <div class="listBody">
                      {item.caption}
                    </div>
                    <div class="complete"><FontAwesomeIcon icon={faFill}/></div>
                    <div class="removeListItem"><FontAwesomeIcon icon={faFill}/></div>
                    </div>
                )
            })
        )
    }
return(
    <>
    </>
)
}

export default ListContainer
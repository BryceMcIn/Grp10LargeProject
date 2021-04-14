import React from 'react';

export default function listContainer(props) {

    const displayItems = (props) => {
    const {listItems} = props;
    
    if (listItems > 0){
        return(
            listItems.map((item, index) => {
                console.log(note);
                return(
                    <h3>{item.itemTitle}</h3>
                )
            })
        )
    } else {
        return (<h3>Nothing????</h3>)
    }
}
return(
    <>
        {displayItems(props)}
    </>
)
}
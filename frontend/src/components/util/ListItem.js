import React from "react";
import "../chat/assets/Chat.css";
import "./Util.css"
import  MaterialListItem from "@material-ui/core/ListItem";
import classnames from 'classnames';

function ListItem(props) {
  return (
    <MaterialListItem {...props} className={classnames("ListItem",props.className)} style={({justifyContent:'space-between'},props.style)}>
      {props.left}
      <div style={{overflow:'hidden',flexGrow:'1',flexShrink: '1'}}>
        {props.center}
      </div>
      <div >
        {props.right}
      </div>
    </MaterialListItem>
  );
}

export default ListItem;

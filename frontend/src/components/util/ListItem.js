import React from "react";
import "../chat/assets/Chat.css";
import "./Util.css"
import ListItem from "@material-ui/core/ListItem";
import classnames from 'classnames';

function ListItem2({left,center, right, style, className, onClick}) {
  return (
    <ListItem onClick={onClick} button className={classnames("ListItem",className)} style={({justifyContent:'space-between'},style)}>
      {left}
      <div style={{overflow:'hidden',flexGrow:'1',flexShrink: '1'}}>
        {center}
      </div>
      <div >
        {right}
      </div>
    </ListItem>
  );
}

export default ListItem2;

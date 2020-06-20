import React from "react";
import "../chat/assets/Chat.css";
import "./Util.css"
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { BsClock, BsCheckAll } from "react-icons/bs";
import ListItem from "@material-ui/core/ListItem";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Badge from "@material-ui/core/Badge";
import classnames from 'classnames';

function ListItem2({left,center, right, style, className, onClick}) {
  return (
    <ListItem onClick={onClick} button className={classnames("ListItem",className)} style={{justifyContent:'space-between'},style}>
      {left}
      <div style={{width:'100%'}}>
        {center}
      </div>
      <div >
        {right}
      </div>
    </ListItem>
  );
}

export default ListItem2;

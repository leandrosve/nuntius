import React from "react";

import ListItem from "../util/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import StartChatButton from "../chat/StartChatButton";
import DeleteContactButton from "./DeleteContactButton";
import useAvatar from "../profile/useAvatar";
import Username from "../user/Username";
import Avatar from "../util/Avatar";
const useStyles = makeStyles((theme) => ({
  contact: {
    minWidth: "400px",
    height: "75px",
    "&:hover $action": { visibility: "visible" },
  },

  action: {
    visibility: "hidden",
  },
}));

const ContactListItem = ({ alias, username, name, id, contactId, deleteContact, onClick, handleClose}) => {
    const classes = useStyles();
    const avatar = useAvatar(id);
    return (
      <ListItem
        onClick={onClick}
        className={classes.contact}
        left={<Avatar src={avatar} className="avatar" style={{height:"50px", width:"50px"}} alt={alias}/>}
        center={
          <>
            <h3 style={{margin:"0px 2px"}}>{alias}</h3>
            <Username>{username}</Username>                   
          </>
        }
        right={
          <div className={classes.action} style={{display:"flex", direction:"row"}}>
            <StartChatButton username={username}/>           
            <DeleteContactButton deleteContact={deleteContact} contact={{username:username, alias:alias, id:id, contactId:contactId, name:name}}/>
          </div>
        }
      />
    );
  };

  export default React.memo(ContactListItem);
import React from "react";

import ListItem from "../util/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar"
import { Typography } from "@material-ui/core";
import StartChatButton from "../chat/StartChatButton";
import DeleteContactButton from "./DeleteContactButton";
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

const ContactListItem = ({ alias, username, biography, name, id, userId, avatar, onRemoveContact, onClick, handleClose}) => {
    const classes = useStyles();
  
    return (
      <ListItem
        onClick={onClick}
        className={classes.contact}
        left={<Avatar src={avatar} className="avatar" style={{height:"50px", width:"50px"}} alt="user">{alias}</Avatar>}
        center={
          <>
            <h3 style={{margin:"0px 2px"}}>{alias}</h3>
            <Typography gutterbottom="true"  variant="overline">
              <p style={{lineHeight: 1,margin:"0px 2px"}}>            
              @{username}
             </p>
            </Typography>
            <p style={{margin:"0px 2px"}}>{biography}</p>
            
          </>
        }
        right={
          <div className={classes.action} style={{display:"flex", direction:"row"}}>
            <StartChatButton username={username}/>           
            <DeleteContactButton contact={{username:username, alias:alias, id:id, userId:userId, name:name}}/>
          </div>
        }
      />
    );
  };

  export default React.memo(ContactListItem);
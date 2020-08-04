import React from "react";

import ListItem from "../util/ListItem";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar"
import { Typography } from "@material-ui/core";
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

const ContactListItem = ({ alias, username, biography, avatar, onRemoveContact, onClick, handleClose}) => {
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
          <React.Fragment>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
                
              }}
              className={classes.action}
              aria-label="start chat"
              component={Link} to={`/browse/chat/@${username}`}

            >
              <ChatIcon />
            </IconButton>
  
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onRemoveContact();
              }}
              className={classes.action}
              aria-label="delete contact"
              component="span"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    );
  };

  export default React.memo(ContactListItem);
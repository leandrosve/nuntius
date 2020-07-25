import React from "react";

import ListItem from "../util/ListItem";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from '@material-ui/icons/Chat';
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  contact: {
    minWidth: "400px",
    "&:hover $action": { visibility: "visible" },
  },

  action: {
    visibility: "hidden",
  },
}));

const ContactListItem = ({ alias, username, info, avatar, onRemoveContact, handleClick , handleClose}) => {
    const classes = useStyles();
  
    return (
      <ListItem
        className={classes.contact}
        onClick={(e) => {
          handleClick();
          e.stopPropagation();
        }}
        left={<img src={avatar} className="avatar" alt="user" />}
        center={
          <React.Fragment>
            <h3>{alias}</h3>
            <div>
              <p>{info}</p>
            </div>
          </React.Fragment>
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
                onRemoveContact(alias);
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
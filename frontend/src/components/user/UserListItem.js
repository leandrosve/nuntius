import React from "react";

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
} from "@material-ui/core";
import Avatar from "../util/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector} from "react-redux";
import { getUserById } from "../../redux/user/userReducer";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles(() => ({
  root: {
    "&:hover $actionsVisibility": { visibility: "visible" },
    width: "100%"
  },

  actions: {
    display:"flex",
    flexDirection:"row",
  },

  actionsVisibility:{visibility: "hidden"}
}));


const UserListItem = ({userId, handleClick, actions, dontHideActions}) => {
  
  const classes = useStyles();
  
  const { t } = useTranslation();
 const user = useSelector(({user})=>getUserById(user, userId));
 
 const avatar = user ? user.avatar : null;
 const currentUserId = useSelector(({session})=>session.currentUser.id);

  if(!user) return null;
  return (
    <div className={classes.root}>
      <ListItem  button={!!handleClick} onClick={handleClick}>
        <ListItemAvatar >
          <Avatar src={avatar} alt={ user.alias ? user.alias : user.username} colorSource={userId}/>
        </ListItemAvatar>
        <ListItemText id={user.id} primary={userId === currentUserId ? t("you") : user.alias ? user.alias : user.name} secondary={"@"+user.username}/>
        <ListItemSecondaryAction >
          <div className={`${classes.actions} ${!dontHideActions ? classes.actionsVisibility : null}`}>
            {actions}
          
          </div>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default UserListItem;

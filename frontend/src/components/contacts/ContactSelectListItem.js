import React from "react";
import useAvatar from "../util/useAvatar";

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  ListItemAvatar,
} from "@material-ui/core";
import Avatar from "../util/Avatar";

const ContactSelectListItem = ({participant, handleSelect}) => {
  const avatar= useAvatar(participant.id);
  return (
    <ListItem button>
      <ListItemAvatar >
        <Avatar src={avatar} alt={participant.alias}/>
      </ListItemAvatar>
      <ListItemText id={participant.id} primary={participant.alias} secondary={"@"+participant.username}/>
      <ListItemSecondaryAction>
        <Checkbox
          onChange={handleSelect}
          edge="end"
          inputProps={{ "aria-labelledby": participant.id }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ContactSelectListItem;

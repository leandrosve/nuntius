import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../redux/user/userReducer";

import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { useTranslation } from "react-i18next";
import { Tooltip, IconButton } from "@material-ui/core";
import ConfirmationDialog from "../util/ConfirmationDialog";
import { addUserToChat } from "../../redux/chats/groups/groupActions";
const AddParticipantButton = ({ userId, chatId}) => {
  const user = useSelector((state) => getUserById(state.user, userId));
  const { t } = useTranslation();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const dispatch = useDispatch();
  const addUser = ()=>dispatch(addUserToChat(chatId, userId))
  return (
    <React.Fragment>
      <Tooltip title={t("group_add_to")} aria-label="add">
        <IconButton onClick={() => setOpenConfirmationDialog(true)}>
          <MeetingRoomIcon />
        </IconButton>
      </Tooltip>
      {openConfirmationDialog && 
      <ConfirmationDialog
        open={openConfirmationDialog}
        handleCancel={() => setOpenConfirmationDialog(false)}
        handleAccept={() => {setOpenConfirmationDialog(false); addUser()}}
        title= {t("confirmation:participant_add", {name: user ? user.alias ? user.alias : user.name : "null"})}
      /> 
    }    
    </React.Fragment>
  );
};

export default AddParticipantButton;

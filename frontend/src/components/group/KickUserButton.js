import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../redux/user/userReducer";

import NoMeetingRoomIcon from "@material-ui/icons/NoMeetingRoom";
import { useTranslation } from "react-i18next";
import { Tooltip, IconButton } from "@material-ui/core";
import ConfirmationDialog from "../util/ConfirmationDialog";
import { removeUserFromChat } from "../../redux/chats/groups/groupActions";
const KickUserButton = ({ userId, chatId}) => {
  const user = useSelector((state) => getUserById(state.user, userId));
  const { t } = useTranslation();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const dispatch = useDispatch();
  const removeUser = ()=>dispatch(removeUserFromChat(chatId, userId))
  return (
    <React.Fragment>
      <Tooltip title={t("kick")} aria-label="kick">
        <IconButton onClick={() => setOpenConfirmationDialog(true)}>
          <NoMeetingRoomIcon />
        </IconButton>
      </Tooltip>
      {openConfirmationDialog && 
      <ConfirmationDialog
        open={openConfirmationDialog}
        handleCancel={() => setOpenConfirmationDialog(false)}
        handleAccept={() => {setOpenConfirmationDialog(false); removeUser()}}
        title= {t("confirmation:participant_delete", {name: user ? user.alias ? user.alias : user.name : null})}
      /> 
    }    
    </React.Fragment>
  );
};

export default KickUserButton;

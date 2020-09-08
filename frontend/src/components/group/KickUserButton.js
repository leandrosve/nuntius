import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../redux/user/userReducer";

import NoMeetingRoomIcon from "@material-ui/icons/NoMeetingRoom";
import { useTranslation } from "react-i18next";
import { Tooltip, IconButton } from "@material-ui/core";
import ConfirmationDialog from "../util/ConfirmationDialog";
import { removeUserFromChat } from "../../redux/chats/groups/groupActions";
import { leaveChat } from "../../redux/chats/chatActions";
const KickUserButton = ({ userId, chatId}) => {
  const user = useSelector((state) => getUserById(state.user, userId));
  
  const isCurrentUser = useSelector((state) => state.session.currentUser.id === userId);
  const { t } = useTranslation();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const dispatch = useDispatch();
  const removeUser = ()=>dispatch(removeUserFromChat(chatId, userId));
  const leaveGroup = ()=>dispatch(leaveChat(chatId));

  return (
    <React.Fragment>
      <Tooltip title={isCurrentUser ? t("conversation_leave") : t("kick")} aria-label="kick">
        <IconButton onClick={() => setOpenConfirmationDialog(true)}>
          <NoMeetingRoomIcon />
        </IconButton>
      </Tooltip>
      {openConfirmationDialog && 
      <ConfirmationDialog
        open={openConfirmationDialog}
        handleCancel={() => setOpenConfirmationDialog(false)}
        handleAccept={() => {setOpenConfirmationDialog(false); isCurrentUser? leaveGroup() : removeUser()}}
        title= { !isCurrentUser ? 
          t("confirmation:participant_delete", {name: user ? user.alias ? user.alias : user.name : null})
          : t("confirmation:conversation_leave")
        }
      /> 
    }    
    </React.Fragment>
  );
};

export default KickUserButton;

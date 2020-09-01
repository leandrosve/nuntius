import React, {  } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';
import {
    IconButton,
    Tooltip,
    List,
    Typography,
  } from "@material-ui/core";
  
import UserListItem from "../user/UserListItem";
import StartChatButton from "../chat/StartChatButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const ParticipantList = ({userIds}) => {
    const currentUserId = useSelector(({session})=>session.currentUser.id);
    const { t } = useTranslation();
  return (
    <>
      <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", margin:"-10px 0px"}}>
        <Typography variant="h5" style={{textTransform: "capitalize"}}>
          {t("participants")}
        </Typography>
        <IconButton>
          <PersonAddIcon/>
        </IconButton>
      </div>
      <List style={{paddingTop:"0px", overflowY:"auto", minHeight:"100px"}}>
        {userIds.map((userId) => {
          return (
            <UserListItem
              key={userId}
              userId={userId}
              actions={
                userId !== currentUserId && (
                  <>
                    <StartChatButton userId={userId} />
                    <Tooltip title={t("kick")} aria-label="kick">
                      <IconButton>
                        <NoMeetingRoomIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )
              }
            />
          );
        })}
      </List>
    </>
  );
};

export default ParticipantList;

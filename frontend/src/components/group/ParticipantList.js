import React, {  } from "react";
import { useSelector } from "react-redux";
import {
    List,
  } from "@material-ui/core";
import UserListItem from "../user/UserListItem";
import StartChatButton from "../chat/StartChatButton";
import KickUserButton from "./KickUserButton";

const ParticipantList = ({userIds, chatId}) => {
    const currentUserId = useSelector(({session})=>session.currentUser.id);
  return (
    
      <List style={{paddingTop:"0px", overflowY:"auto", minHeight:"50px"}}>
        {userIds.map((userId) => {
          return (
            <UserListItem
              key={userId}
              userId={userId}
              actions={
                userId !== currentUserId && (
                  <>
                    <StartChatButton userId={userId} />
                    <KickUserButton userId={userId} chatId={chatId}/>
                    
                  </>
                )
              }
            />
          );
        })}
      </List>
  );
};

export default ParticipantList;

import React, {  } from "react";
import { useSelector } from "react-redux";
import {
    List, CircularProgress,
  } from "@material-ui/core";
import UserListItem from "../user/UserListItem";
import StartChatButton from "../chat/StartChatButton";
import KickUserButton from "./KickUserButton";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { FETCH_USER_REQUEST } from "../../redux/user/userActionTypes";

const ParticipantList = ({userIds, chatId}) => {
    const currentUserId = useSelector(({session})=>session.currentUser.id);
    const loading = useSelector(({loading})=> isRequestLoading(loading, [FETCH_USER_REQUEST]));
  return (
    <>
      { loading ? 
        <div style={{display:"flex", justifyContent:"center"}}><CircularProgress/></div>
        :
        <List style={{paddingTop:"0px", overflowY:"auto", minHeight:"50px"}}>
        {userIds.map((userId) => {
          return (
            <UserListItem
              key={userId}
              userId={userId}
              actions={
                <>
                { userId !== currentUserId && (                  
                    <StartChatButton userId={userId} />                                                 
                )}
                <KickUserButton userId={userId} chatId={chatId}/>
                </>
              }
            />
          );
        })}
      </List>
      }
    </>
  );
};

export default ParticipantList;

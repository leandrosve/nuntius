import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Chat from "./Chat";
import { openUserDetail, openMedia } from "../../redux/modal/modalActions";
import { getContactByUsername } from "../../redux/contacts/contactReducer";
import { getUserByUsername } from "../../redux/user/userReducer";
import { withRouter } from "react-router-dom";
import { fetchUserByUsername } from "../../redux/user/userActions";
import { LinearProgress } from "@material-ui/core";
import { getChatGroupById } from "../../redux/chats/chatReducer";
import {userType, contactType, chatType} from "../../types";
import {bool, string, func} from "prop-types";
import { fetchMessagesFromUser, fetchMessagesFromChat, sendMessageToUser, sendMessageToChat, setCurrentChat} from "../../redux/chats/chatActions";
import MessageSource from "./message/MessageSource";

const ChatContainer = ({
  user, contact, group, fetchUserByUsername, openUserDetail, 
  loading = true, username, openMedia,
  fetchMessagesFromUser, messages, fetchMessagesFromChat, sendMessageToUser, sendMessageToChat, groupId,
  setCurrentChat
}) => {
  const [done, setDone] = useState(false);

  const getUserId= useCallback(() =>{
    return contact ? contact.userId : user ? user.id : null
  }
  ,[contact,user]);

  useEffect(()=>{
    if (group|| user || contact ){
    setCurrentChat({id:group ? group.id : null, userId:getUserId()});
  }
  },[groupId, user, contact, getUserId, setCurrentChat]);

  useEffect(() => {
    if(group)
      fetchMessagesFromChat(group.id);
    else if (username && !contact && !user ){
      fetchUserByUsername(username); 
    }else{
      const userId = getUserId();
      if(userId) fetchMessagesFromUser(userId);
    }
  }, [fetchUserByUsername, fetchMessagesFromChat, fetchMessagesFromUser, username, getUserId, groupId, setDone, user]);

  const handleOpenDetail = useCallback(() => {
    if(contact) openUserDetail({user:{ ...contact, id:contact.userId }}) 
    else if (user)openUserDetail({ user }) 
    else alert("not yet");
  }, [user, openUserDetail, contact]);

  const handleOpenMedia = useCallback((src) => {
    openMedia(src)
  },[openMedia]);
 
  const handleSendMessage = useCallback((text) => {
    group ? sendMessageToChat({chatId:group.id,text:text }) : sendMessageToUser({userId: getUserId(), text:text});
  },[getUserId, group, sendMessageToUser, sendMessageToChat]);
 
  return (
    <>
      <MessageSource/>
      {loading && <LinearProgress color="secondary" />}

      {!loading && (contact || user || group) ? (
        <Chat
          title={
            group
              ? group.title
              : contact
              ? contact.alias
              : user
              ? user.name
              : null
          }
          username={contact ? contact.username : user ? user.username : null}
          messages={messages}
          type={group? "group" : contact ? "contact" : user ? "user" : null}
          handleOpenDetail={handleOpenDetail}
          handleOpenMedia={handleOpenMedia}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        !loading && done && <div>not found</div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openUserDetail: (props) => dispatch(openUserDetail(props)),
    fetchUserByUsername: (username) => dispatch(fetchUserByUsername(username)),
    fetchMessagesFromUser: (userId) => dispatch(fetchMessagesFromUser(userId)),
    fetchMessagesFromChat: (chatId) => dispatch(fetchMessagesFromChat(chatId)),
    openMedia: (src) => dispatch(openMedia(src)),
    sendMessageToUser: (userId) => dispatch(sendMessageToUser(userId)),
    sendMessageToChat: (chatId) => dispatch(sendMessageToChat(chatId)),
    
    setCurrentChat: (id, userId) => dispatch(setCurrentChat(id, userId)),
  };
};

const mapStateToProps = ({ contact, user, chat }, { match }) => {
  const username = match.params.username;
  const groupId = match.params.groupId;
  const c = username ? getContactByUsername(contact, username) : null;
  const u=  !c ? getUserByUsername(user.users, username) : null;
  return {
    contact: c,
    user: u,
    group: groupId ? getChatGroupById(chat, groupId) : null,
    groupId :match.params.groupId,
    loading: user.users.loading,
    shouldFetchUser: (username && !c && !u ),
    username: username,
    messages: chat.currentChat.messages,
  };
};

ChatContainer.propTypes = {   
  user: userType,
  contact: contactType,
  group: chatType,
  loading: bool.isRequired,
  username: string,
  openUserDetail: func.isRequired,
  fetchUserByUsername: func.isRequired,

};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
);
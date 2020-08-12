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
import { fetchMessagesFromUser, fetchMessagesFromChat, sendMessageToUser, sendMessageToChat} from "../../redux/chats/chatActions";

const ChatContainer = ({
  user, contact, group, fetchUserByUsername, openUserDetail, 
  loading = true, shouldFetchUser = false, username, openMedia,
  fetchMessagesFromUser, messages, fetchMessagesFromChat, sendMessageToUser, sendMessageToChat
}) => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (shouldFetchUser)
      fetchUserByUsername(username);
    setDone(true);
  }, [fetchUserByUsername, shouldFetchUser, username, setDone]);

  const handleOpenDetail = useCallback(() => {
    if(contact) openUserDetail({user:{ ...contact, id:contact.userId }}) 
    else if (user)openUserDetail({ user }) 
    else alert("not yet");
  }, [user, openUserDetail, contact]);

  const handleOpenMedia = useCallback((src) => {
    openMedia(src)
  },[openMedia]);
 
  const getUserId= useCallback(() =>{return contact ? contact.userId : user ? user.id : null},[contact,user]);
  useEffect(() => {
      if(group){
        fetchMessagesFromChat(group.id);
      }
      const userId= getUserId();
      if(userId){fetchMessagesFromUser(userId)}
  }, [fetchMessagesFromUser, getUserId, group, fetchMessagesFromChat]);

  const handleSendMessage = useCallback((text) => {
    group ? sendMessageToChat({chatId:group.id,text:text }) : sendMessageToUser({userId: getUserId(), text:text});
  },[getUserId, group, sendMessageToUser, sendMessageToChat]);
 
  return (
    <>
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
  shouldFetchUser: bool,
  username: string,
  openUserDetail: func.isRequired,
  fetchUserByUsername: func.isRequired,

};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
);

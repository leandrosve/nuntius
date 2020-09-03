import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Chat from "./Chat";
import { openUserDetail, openMedia, openGroupDetail } from "../../redux/modal/modalActions";
import { getUserByUsername } from "../../redux/user/userReducer";
import { withRouter } from "react-router-dom";
import { fetchUserByUsername } from "../../redux/user/userActions";
import { getChatGroupById, getPrivateChatByUserId } from "../../redux/chats/chatReducer";
import {userType, contactType, chatType} from "../../types";
import {bool, string, func} from "prop-types";
import { fetchMessagesFromUser, fetchMessagesFromChat, sendMessageToUser, sendMessageToChat, setCurrentChat, leaveChat} from "../../redux/chats/chatActions";
import {Redirect} from "react-router-dom"
import useAvatar from "../util/hooks/useAvatar";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { FETCH_USER_REQUEST } from "../../redux/user/userActionTypes";
import { FETCH_MESSAGES_REQUEST } from "../../redux/chats/chatActionTypes";

const ChatContainer = ({
  user, group, fetchUserByUsername, openUserDetail, 
  loading = true, username, openMedia,messages, fetchMessagesFromChat, sendMessageToUser, sendMessageToChat, 
  setCurrentChat, chatId, privateChatId, leaveChat, currentUser, openGroupDetail
}) => {

  const getUserId= useCallback(() =>{
    return user ? user.id : null
  }
  ,[user]);

  const groupId = group ? group.id : null;

  const avatar = useAvatar({userId: user ? user.id : null, chatId:group? group.id : null});
  
  useEffect(()=>{
    if (groupId || user){ 
    setCurrentChat({id:(groupId ? groupId : privateChatId), userId:user? user.id : null});
  }
  },[user, setCurrentChat, privateChatId, groupId]);

  useEffect(()=>{
    if(chatId) fetchMessagesFromChat(chatId);
  },
  [chatId, fetchMessagesFromChat])

  useEffect(() => { 
     if (username && !user ){
      fetchUserByUsername(username); 
    }
  }, [fetchUserByUsername, username, user]);

  const handleOpenDetail = useCallback(() => {
    if (user)openUserDetail({userId: user.id}) 
    else if (group) openGroupDetail({chatId: group.id}) 
  }, [user, openUserDetail, openGroupDetail, group]);

  const handleOpenMedia = useCallback((src) => {
    openMedia(src)
  },[openMedia]);
 
  const handleSendMessage = useCallback((text) => {
    group ? sendMessageToChat({chatId:group.id,text:text }) : sendMessageToUser({userId: getUserId(), text:text});
  },[getUserId, group, sendMessageToUser, sendMessageToChat]);
 
  const handleLeaveChat = useCallback(() => {
    if(chatId)leaveChat(chatId);
  },[chatId, leaveChat]);
 
  if(currentUser.username === username){
    return <Redirect to='/home' />
  }

  return (
    <>
      
      {(user || group) ? (
        <Chat
          title={
            group
              ? group.title            
              : user
              ? user.alias || user.name
              : null
          }
          loading={loading}
          avatar={avatar}
          username={user ? user.username : null}
          messages={messages}
          canDelete={!!chatId || !!group}
          colorSource={user ? user.id : group.id}
          type={group? "group" : user.contactId ? "contact" : user ? "user" : null}
          handleOpenDetail={handleOpenDetail}
          handleOpenMedia={handleOpenMedia}
          handleSendMessage={handleSendMessage}
          handleLeaveChat={handleLeaveChat}
        />
      ) : (
        !loading && <div>not found</div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openUserDetail: (userId) => dispatch(openUserDetail(userId)),
    openGroupDetail: (props) => dispatch(openGroupDetail(props)),
    fetchUserByUsername: (username) => dispatch(fetchUserByUsername(username)),
    fetchMessagesFromUser: (userId) => dispatch(fetchMessagesFromUser(userId)),
    fetchMessagesFromChat: (chatId) => dispatch(fetchMessagesFromChat(chatId)),
    openMedia: (src) => dispatch(openMedia(src)),
    sendMessageToUser: (userId) => dispatch(sendMessageToUser(userId)),
    sendMessageToChat: (chatId) => dispatch(sendMessageToChat(chatId)),
    setCurrentChat: (id, userId) => dispatch(setCurrentChat(id, userId)),
    leaveChat: (chatId) => dispatch(leaveChat(chatId)),
  };
};

const mapStateToProps = ({ user, chat, session, loading}, { match }) => {
  const username = match.params.username;
  const groupId = match.params.groupId;
  const u = getUserByUsername(user, username);
  const privateChat = u ? getPrivateChatByUserId(chat,u.id) : null;
  return {
   // contact: c,
    user: u,
    group: groupId ? getChatGroupById(chat, groupId) : null,
    groupId :match.params.groupId,
    loading: isRequestLoading(loading, [FETCH_USER_REQUEST, FETCH_MESSAGES_REQUEST]),
    chatId: chat.currentChat.id,
    username: username,
    messages: chat.currentChat.messages,
    privateChatId: privateChat ? privateChat.id : null,
    currentUser: session.currentUser,
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

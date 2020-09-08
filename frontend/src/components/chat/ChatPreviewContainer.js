import React, { useEffect, useCallback } from "react";
import ChatPreview from "./ChatPreview";
import { getUserById } from "../../redux/user/userReducer";
import { fetchUserById } from "../../redux/user/userActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAvatar from "../util/hooks/useAvatar";
import { getChatById } from "../../redux/chats/chatReducer";

const ChatPreviewContainer = ({ chat, userId, user, fetchUserById }) => {
    
    const history = useHistory();
  
    const { t } = useTranslation();
  const getTitle = () => {
    return  chat.groupal ? chat.title || t("group_untitled") : user ? user.alias || user.name : "unknown user";
  };

  const handleClick = useCallback(() => {
    const route = chat.groupal ? `/chat/group/${chat.id}` : `/chat/@${user && user.username}`;
    history.push(route);
  }, [user, chat, history]);

  useEffect(() => {
    if (userId != null && user == null ) {
      fetchUserById(userId);
    }
  }, [userId,user,fetchUserById]);

  const avatar = user ? user.avatar :chat ? chat.avatar : null;

  return (
    <ChatPreview
      title={getTitle()}
      lastMessage={chat.lastMessage}
      type={chat.groupal ? "group" : "user"}
      unreadMessagesCount="30"
      avatar={avatar}
      lastMessageTime="20:00"
      handleClick={()=>handleClick(chat)}
      colorSource={user ? user.id : chat.id}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserById: (id) => dispatch(fetchUserById(id)),
  };
};

const mapStateToProps = ({ user, session, chat}, {chatId}) => {
  const currentUserId = session.currentUser.id;
  const c =  getChatById(chat, chatId);
  const userId = c.groupal ? null : c.userIds.filter((id) => id !== currentUserId)[0];
  return {
    currentUserId: session.currentUser.id,
    userId: userId,
    user: userId ? getUserById(user, userId) : null,
    chat: c,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPreviewContainer);

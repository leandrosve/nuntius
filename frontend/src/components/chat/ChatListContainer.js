import React, { useEffect } from "react";
import { connect } from "react-redux";
import ChatList from "./ChatList";
import { chats } from "../../redux/chats/chatActions";
import { getAllChats } from "../../redux/chats/chatReducer";
import { openContacts } from "../../redux/modal/modalActions";

const ChatListContainer = (props) => {
  const { fetchChats, ...params } = props;
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);


 

  return <ChatList {...params} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChats: () => dispatch(chats()),
    openContacts: () => dispatch(openContacts()),
  };
};

const mapStateToProps = ({ chat, user, contact }) => {
  return {
    chats: getAllChats(chat),
    loading: chat.isFetching,
    error: chat.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListContainer);

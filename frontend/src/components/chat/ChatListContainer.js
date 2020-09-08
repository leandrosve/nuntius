import React, { useEffect } from "react";
import { connect } from "react-redux";
import ChatList from "./ChatList";
import { chats } from "../../redux/chats/chatActions";
import { openContacts, openAddGroup } from "../../redux/modal/modalActions";
import { FETCH_CHATS_REQUEST } from "../../redux/chats/chatActionTypes";
import { isRequestLoading } from "../../redux/notification/loadingReducer";




const  ChatListContainer = (props) => {
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
    openAddGroup: () => dispatch(openAddGroup()),
  };
};

const mapStateToProps = ({ chat, loading }) => {
  const byIds = chat.byIds;

  const chatComparator = (a, b) => {
    if (byIds[a].lastMessage && byIds[b].lastMessage) {
      return byIds[a].lastMessage.sentTime > byIds[b].lastMessage.sentTime ? -1 : 1;
    } else if (byIds[a].lastMessage) {
      return -1;
    } else if (byIds[b].lastMessage) {
      return 1;
    } else {
      return byIds[a].id > byIds[b].id ? -1 : 1;
    }
  };
  return {
    chatIds: chat.allIds.sort((a,b) => chatComparator(a,b)),
    loading: isRequestLoading(loading, [FETCH_CHATS_REQUEST]),
    byIds: byIds //solo para que se reordene :(
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(ChatListContainer);

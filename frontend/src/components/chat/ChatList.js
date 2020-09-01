import React from "react";
import "./assets/Chat.css";
import "./assets/Chat.css";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { useTranslation } from "react-i18next";
import ChatPreviewContainer from "./ChatPreviewContainer";
import AddCommentIcon from "@material-ui/icons/AddComment";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

function ChatList({ loading, chats = [], openContacts, openAddGroup }) {
  const { t } = useTranslation();
  const sort = (a, b) => {
    if (a.lastMessage && b.lastMessage) {
      return a.lastMessage.sentTime > b.lastMessage.sentTime ? -1 : 1;
    } else if (a.lastMessage) {
      return -1;
    } else if (b.lastMessage) {
      return 1;
    } else {
      return a.id > b.id ? -1 : 1;
    }
  };
  return (
    <div className="ChatList">
      {loading && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      {chats.length === 0 && !loading &&  (
        <Button
          color="secondary"
          style={{ color: "white", width:"100%", borderRadius:'0px' }}
          startIcon={<AddCommentIcon />}
          onClick={() => openContacts()}
        >
          {t("start_chatting")}
        </Button>
      )}

      <Button
        variant="contained"
        style={{  width:"100%", borderRadius:'0px' }}
        startIcon={<GroupAddIcon />}
        onClick={() => openAddGroup()}
      >
        {t("group_add")}
      </Button>
      

      {chats.sort(sort).map((chat) => {
        return (
          <div key={chat.id}>
            <ChatPreviewContainer avatar={profilePicPlaceholder} chat={chat} />
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;

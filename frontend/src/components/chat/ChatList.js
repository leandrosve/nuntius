import React from "react";
import "./assets/Chat.css";
import "./assets/Chat.css";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { useTranslation } from "react-i18next";
import ChatPreviewContainer from "./ChatPreviewContainer";

function ChatList({ loading, chats = [], openContacts }) {
  const { t } = useTranslation();
  const sort = (a, b) => (a.id > b.id ? 1 : -1); 
  return (
    <div className="ChatList">
      {loading && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      {chats.length === 0 && (
        <Button
          color="secondary"
          style={{ color: "white" }}
          onClick={() => openContacts()}
        >
          {t("contact_add")}
        </Button>
      )}
      {chats.sort(sort).map((chat)=>{
        return(
          <div key={chat.id}>
          <ChatPreviewContainer
          avatar={profilePicPlaceholder}
          chat={chat}       
        />
        </div>
        )
      })}      
    </div>
  );
}

export default ChatList;

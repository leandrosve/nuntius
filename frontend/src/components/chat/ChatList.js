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

function ChatList({ loading, chatIds = [], openContacts, openAddGroup }) {
  const { t } = useTranslation();

  return (
    <div className="ChatList">     
      {chatIds.length === 0 && !loading &&  (
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
      
      {loading && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}

      {chatIds.map((chatId) => {
        return (
          <div key={chatId}>
            <ChatPreviewContainer avatar={profilePicPlaceholder} chatId={chatId} />
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;

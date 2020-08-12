import React from "react";
import "./assets/Chat.css";
import { withRouter } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import MessageForm from "./message/MessageForm";

const Chat = (props) => {
  return (
      <>
      <ChatHeader {...props} />
      <ChatContent handleOpenMedia={props.handleOpenMedia} messages={props.messages}/>
      <MessageForm handleSendMessage={props.handleSendMessage} />
      </>
  );
};



export default withRouter(Chat);

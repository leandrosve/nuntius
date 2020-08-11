import React from "react";
import "./assets/Chat.css";
import { withRouter } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";

const Chat = (props) => {
  return (
      <>
      <ChatHeader {...props} />
      <ChatContent handleOpenMedia={props.handleOpenMedia}/>
      </>
  );
};



export default withRouter(Chat);

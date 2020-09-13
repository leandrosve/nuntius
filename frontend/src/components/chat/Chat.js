import React, { useState } from "react";
import "./assets/Chat.css";
import { withRouter } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import MessageForm from "./message/MessageForm";
import { LinearProgress } from "@material-ui/core";

const Chat = (props) => {

  const [filter, setFilter] = useState(null);

  const handleFilterChange = (text) => setFilter(text);

  
  return (
      <>
      {props.loading && <div><LinearProgress color="secondary" /></div>}
      <ChatHeader {...props} handleFilterChange={handleFilterChange}/>
      <ChatContent 
        handleOpenMedia={props.handleOpenMedia} 
        messages={props.messages} 
        filter={filter}
        type={props.type}/>
      <MessageForm handleSendMessage={props.handleSendMessage} />
      </>
  );
};



export default withRouter(Chat);

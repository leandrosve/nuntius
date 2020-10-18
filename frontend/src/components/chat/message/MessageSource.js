import React, { useEffect } from "react";
import {connect} from "react-redux";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { receiveMessage, leaveChatSuccess, receiveChatSuccess, deleteChat} from "../../../redux/chats/chatActions";



const MessageSource = ({username, jwtToken, receiveMessage, deleteChat, receiveChat, children}) => {
  
  let client=new Client({
    webSocketFactory:()=> {return new SockJS('http://localhost:8080/ws')},
    connectHeaders: {
      username: username,
      jwtToken: jwtToken,
    },  
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 10000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000
   });
  
  
  

  useEffect(()=>{
    if(client){
      client.activate();
      return ()=>{console.log("deactivating"); client.deactivate();};
    } 
  },[client])

  const handleReceiveMessage = function(message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      const parsedMessage = JSON.parse(message.body);
      parsedMessage.sentTime = new Date(parsedMessage.sentTime).getTime();
      receiveMessage(parsedMessage)
    } 
  };

  const handleDeleteChat = function(message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      deleteChat(JSON.parse(message.body));
    } else {
      alert("got empty message");
    }
  };

  const handleReceiveChat = function(message){
    
    if (message.body) {
      receiveChat(JSON.parse(message.body));
    } else {
      alert("got empty message");
    }
  }

 
  client.onConnect = function(frame) {
    
    client.subscribe("/user/queue/messages", handleReceiveMessage);
    
    client.subscribe("/user/queue/chats/delete", handleDeleteChat);

    client.subscribe("/user/queue/chats", handleReceiveChat);
  };


  return (
    <>
     {children}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
   receiveMessage: (msg) => dispatch(receiveMessage(msg)),
   deleteChat: (chat) => dispatch(deleteChat(chat)),
   receiveChat: (chat) => dispatch(receiveChatSuccess(chat))
  };
};

const mapStateToProps = ({session}) => {
  return {
    username: session.currentUser.username,
    jwtToken: session.currentUser.jwtToken,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageSource);

import React from "react";
import {connect} from "react-redux";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { receiveMessage, leaveChatSuccess} from "../../../redux/chats/chatActions";


const MessageSource = ({user, receiveMessage, deleteChat}) => {
  
  const client = new Client({
    webSocketFactory:()=> {return new SockJS('http://localhost:8080/ws')},
    connectHeaders: {
      username: user.username,
      jwtToken: user.jwtToken,
    },  
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 10000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000
  });

  console.log(client.brokerURL);
  client.activate();

  const handleReceiveMessage = function(message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      const parsedMessage = JSON.parse(message.body);
      receiveMessage(parsedMessage)
    } else {
      alert("got empty message");
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

 
  client.onConnect = function(frame) {
    
    client.subscribe("/user/queue/messages", handleReceiveMessage);
    
    client.subscribe("/user/queue/chats/delete", handleDeleteChat);
  };


  return (
    <>
     
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
   receiveMessage: (msg) => dispatch(receiveMessage(msg)),
   deleteChat: (chat) => dispatch(leaveChatSuccess(chat))
  };
};

const mapStateToProps = ({user}) => {
  return {
    user: user.session.currentUser
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageSource);

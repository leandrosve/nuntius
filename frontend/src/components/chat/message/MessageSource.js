import React, { useEffect } from "react";
import {connect} from "react-redux";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { receiveMessage } from "../../../redux/chats/chatActions";


const MessageSource = ({user, receiveMessage}) => {
  const callback = function(message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      receiveMessage(JSON.parse(message.body))
    } else {
      alert("got empty message");
    }
  };
  const client = new Client({
    webSocketFactory:()=> {return new SockJS('http://localhost:8080/ws')},
    connectHeaders: {
      username: user.username,
      jwtToken: user.jwtToken,
    },  
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  
 
  console.log(client.brokerURL);
  client.activate();
  client.onConnect = function(frame) {
    
    client.subscribe("/user/queue/messages", callback);
  };


  return (
    <>
     
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
   receiveMessage: (msg) => dispatch(receiveMessage(msg))
  };
};

const mapStateToProps = ({user}) => {
  return {
    user: user.session.currentUser
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageSource);

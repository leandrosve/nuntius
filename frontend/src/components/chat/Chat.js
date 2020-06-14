import React from 'react';
import './assets/Chat.css';
import ChatHeader from './ChatHeader';
import Message from './Message';


function Chat() {  
  return (
    <div className='Chat'>
        <ChatHeader/>
        <div className='ChatMessages'>  
          <div className='ChatMessages-content'>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
          </div>
        </div>
        <div className='ChatSendForm'></div>
    </div>
  );
}

export default Chat;

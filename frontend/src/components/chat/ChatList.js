import React from 'react';
import './assets/Chat.css';
import ChatPreview from './ChatPreview'

function ChatList() {
  return (
    <div className='ChatList'>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
        <ChatPreview/>
    </div>
  );
}

export default ChatList;

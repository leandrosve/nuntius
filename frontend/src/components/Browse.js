import React from 'react';
import '../App.css';
import Nav from './nav/Nav';
import ChatList from './chat/ChatList';
import Chat from './chat/Chat';


function Browse() {
  return (
    <div>
        <Nav/>
        <div className="Browse-content">
            <ChatList/>
            <Chat/>
        </div>
    </div>
  );
}

export default Browse;

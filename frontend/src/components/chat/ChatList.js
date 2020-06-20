import React from 'react';
import './assets/Chat.css';
import ChatPreview from './ChatPreview';
import ListItem2 from '../util/ListItem';
import "./assets/Chat.css";

import profilePicPlaceholder from '../assets/images/profile-pic-placeholder.jpg';

function ChatList() {
  return (
    <div className='ChatList'>
        <ChatPreview avatar={profilePicPlaceholder} alias='José Peralta' lastMessage='a ver a verrr' unreadMessagesCount='30' lastMessageTime='20:00'/>

        <ChatPreview avatar={profilePicPlaceholder} alias='José Peralta' lastMessage='a ver a verrr' unreadMessagesCount='30' lastMessageTime='20:00'/>
        <ChatPreview avatar={profilePicPlaceholder} alias='José Peralta' lastMessage='a ver a verrr' unreadMessagesCount='30' lastMessageTime='20:00'/>
        <ChatPreview avatar={profilePicPlaceholder} alias='José Peralta' lastMessage='a ver a verrr' unreadMessagesCount='30' lastMessageTime='20:00'/>
        <ChatPreview avatar={profilePicPlaceholder} alias='José Peralta' lastMessage='a ver a verrr' unreadMessagesCount='30' lastMessageTime='20:00'/>
        <ChatPreview avatar={profilePicPlaceholder} alias='José Peralta' lastMessage='a ver a verrr' unreadMessagesCount='30' lastMessageTime='20:00'/>
        


    </div>
  );
}

export default ChatList;

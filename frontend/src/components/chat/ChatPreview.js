import React from 'react';
import './assets/Chat.css';
import profilePicPlaceholder from '../assets/images/profile-pic-placeholder.jpg';
import {BsClock} from 'react-icons/bs';

function ChatPreview() {
  return (
    <div className='ChatPreview'>
      <img src={profilePicPlaceholder} className='ChatPreview-image' alt='user' />
        <div className='ChatPreview-user-data'>
          <h3>Juan Perez</h3>
          <p>You: euuu ultimo mensaje</p>
        </div>
        <div className='ChatPreview-chat-data'>    
          <div className='ChatPreview-time'><BsClock/><p>3:03</p></div>
          <div><span className='ChatPreview-messageCount'>15</span></div>
        </div>
    </div>
  );
}

export default ChatPreview;

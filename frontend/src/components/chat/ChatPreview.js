import React from 'react';
import './assets/Chat.css';
import profilePicPlaceholder from '../assets/images/profile-pic-placeholder.jpg';

function ChatPreview() {
  return (
    <div className='ChatPreview'>
      <img src={profilePicPlaceholder} className='ChatPreview-image' alt='user' />
        <div className='ChatPreview-user-data'>
          <h3>Juan Perez</h3>
          <p>ultimo mensaje</p>
        </div>
        <div className='ChatPreview-chat-data'>    
          <p>3:03pm</p>
          <p>15</p>
        </div>
    </div>
  );
}

export default ChatPreview;

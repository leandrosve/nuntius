import React from 'react';
import './assets/Chat.css';
import profilePicPlaceholder from '../assets/images/profile-pic-placeholder.jpg';
import {BsTriangleFill} from 'react-icons/bs';

function Message({text}) {
    const selectMessage = ()=>{
        alert('holaa');
      }
    return (
        <div className='Message'>
            <div className='Message-box' onClick={selectMessage} >
                <div className='Message-text'>                   
                    <p>{text}</p>
                </div>
                <BsTriangleFill className='Message-dialogShape'/>
                <div>
            </div>
           <img src={profilePicPlaceholder} className='Message-profilePic' alt='username'/>
           </div>
        </div>
    );
}

export default Message;

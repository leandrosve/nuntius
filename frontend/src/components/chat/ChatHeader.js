import React from 'react';
import './assets/Chat.css';
import { FiMoreHorizontal } from 'react-icons/fi';
import { RiRadioButtonLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { IoIosAttach } from 'react-icons/io';
import profilePicPlaceholder from '../assets/images/profile-pic-placeholder.jpg';

function ChatHeader() {
    return (
        <div className='ChatHeader'>
            <div className='ChatUserInfo'>
                <img src={profilePicPlaceholder} className='ChatHeader-profilePic' alt='user' />
                <h1>Juan Perez</h1>
                <RiRadioButtonLine className='OnlineMarker' />
            </div>
            <div className='ChatHeader-options'>
                <div className='ChatHeader-button'><BsSearch className='ChatHeader-button-icon' /></div>
                <div className='ChatHeader-button'><IoIosAttach className='ChatHeader-button-icon' /></div>
                <div className='ChatHeader-button'><FiMoreHorizontal className='ChatHeader-button-icon' /></div>
            </div>
        </div>
    );
}

export default ChatHeader;

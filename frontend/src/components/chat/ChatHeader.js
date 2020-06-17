import React from "react";
import "./assets/Chat.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { IoIosAttach } from "react-icons/io";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { useTranslation } from "react-i18next";

function ChatHeader() {
  const {t} = useTranslation();
  return (
    <div className="ChatHeader">
      <div className="ChatHeader-userInfo">
        <img
          src={profilePicPlaceholder}
          className="ChatHeader-profilePic"
          alt="user"
        />
        <h1>Juan Perez</h1>
        <p>{t('online')}</p>
      </div>
      <div className="ChatHeader-options">
        <div className="ChatHeader-button">
          <BsSearch className="ChatHeader-button-icon" />
        </div>
        <div className="ChatHeader-button">
          <IoIosAttach className="ChatHeader-button-icon" />
        </div>
        <div className="ChatHeader-button">
          <FiMoreHorizontal className="ChatHeader-button-icon" />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

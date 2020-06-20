import React from "react";
import "./assets/Chat.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { IoIosAttach } from "react-icons/io";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { useTranslation } from "react-i18next";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import ListItem from "@material-ui/core/ListItem";
function ChatHeader() {
  const { t } = useTranslation();
  return (
    <div>
    <Toolbar style={{padding:'0px'}}className="ChatHeader">
     <ListItem button  style={{width:'auto'}}className="ChatHeader-userInfo">
        <img
          src={profilePicPlaceholder}
          className="ChatHeader-profilePic"
          alt="user"
        />
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h1>Juan Perez</h1>
          <p>{t("online")}</p>
        </div>
      </ListItem>
      <div className="ChatHeader-options">
      <IconButton color="primary">
        <SearchIcon style={{fontSize:'30px', color:'white'}} />
      </IconButton>
      <IconButton color="primary" >
        <AttachFileIcon  style={{fontSize:'30px', color:'white'}} />
      </IconButton>
      <IconButton color="primary" >
        <MoreHorizIcon  style={{fontSize:'30px', color:'white'}} />
      </IconButton>
       
      </div>
    </Toolbar>
    </div>
  );
}

export default ChatHeader;

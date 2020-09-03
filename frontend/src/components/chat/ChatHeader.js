import React, { useState, useCallback } from "react";
import "./assets/Chat.css";
import { useTranslation } from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ListItem from "@material-ui/core/ListItem";
import DropdownMenu from "../util/DropdownMenu";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { string, func } from "prop-types";
import Username from "../user/Username";
import ConfirmationDialog from "../util/ConfirmationDialog";
import Avatar from "../util/Avatar";




const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.mixins.toolbar,
    minHeight: theme.mixins.toolbar,
    background: "#1f1f23",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px 10px 0px 10px",
    zIndex: theme.zIndex.appbar - 1,
  },
}));

function ChatHeader({
  handleOpenDetail,
  handleLeaveChat,
  online = false,
  title,
  avatar,
  username,
  type,
  canDelete,
  colorSource,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      
      
      <Toolbar style={{ padding: "0px" }} className={classes.root}>   
        <ListItem
          button
          style={{ width: "auto" }}
          className="ChatHeader-userInfo"
          onClick={handleOpenDetail}
        >
          <Avatar          
            src={avatar}
            group={type === "group"}
            alt={title}  
            colorSource={colorSource}
          />
           
          

          <div style={{ display: "flex", paddingLeft:"10px", alignItems: "baseline" }}>
            <h1>
              
              {title || t("group_untitled")}
            </h1>
            {online && <p>{t("online")}</p>}
            {username && <Username>{username}</Username>}
          </div>
        </ListItem>
        <div className="ChatHeader-options">
          <IconButton color="primary">
            <SearchIcon style={{ fontSize: "30px", color: "white" }} />
          </IconButton>
          <IconButton color="primary">
            <AttachFileIcon style={{ fontSize: "30px", color: "white" }} />
          </IconButton>
          <ChatHeaderMenu handleOpenDetail={handleOpenDetail} handleLeaveChat={handleLeaveChat} type={type} canDelete={canDelete}/>
        </div>
      </Toolbar>
    </div>
  );
}

const ChatHeaderMenu = ({ handleOpenDetail, handleLeaveChat, type, canDelete}) => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleLeaveChatConfirm = useCallback(()=>{
    handleToggleMenu();
    handleLeaveChat();
  },[handleLeaveChat])

  return (
    <React.Fragment>
      <IconButton color="primary" onClick={() => handleToggleMenu()}>
        <MoreHorizIcon style={{ fontSize: "30px", color: "white" }} />
      </IconButton>
      {openMenu && (
        <DropdownMenu style={{ position: "absolute", right: "0" }}>
          <ListItem
            button
            onClick={() => {
              handleToggleMenu();
              handleOpenDetail();
            }}
          >
            {
              {
                group: t("group_detail"),
                user: t("user_detail"),
                contact: t("contact_detail"),
              }[type]
            }
          </ListItem>
          {canDelete &&
            <ListItem
              button
              onClick={() => {
                setOpenConfirmDialog(true);
              }}
            >
            {t("chat_delete")}
            </ListItem>
          }
        </DropdownMenu>     
      )}  
      <ConfirmationDialog 
        open={openConfirmDialog}
        title={t("confirmation:chat_delete")} 
        handleAccept={()=>handleLeaveChatConfirm()} 
        handleCancel={()=>setOpenConfirmDialog(false)}
      />
    </React.Fragment>
  );
};


ChatHeader.propTypes = {
  title: string,
  type: string.isRequired,
  handleOpenDetail: func.isRequired,
};

ChatHeaderMenu.propTypes = {
  type: string.isRequired,
  handleOpenDetail: func.isRequired,
};

export default  withRouter(ChatHeader);

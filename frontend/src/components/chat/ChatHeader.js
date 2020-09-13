import React, { useState, useCallback } from "react";
import "./assets/Chat.css";
import { useTranslation } from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import DropdownMenu from "../util/DropdownMenu";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { string, func } from "prop-types";
import Username from "../user/Username";
import ConfirmationDialog from "../util/ConfirmationDialog";
import Avatar from "../util/Avatar";
import { TextField } from "@material-ui/core";




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
  icon:{
    fontSize: "30px", color: "white" 
  }
}));

function ChatHeader({
  handleOpenDetail,
  handleLeaveChat,
  handleDeleteConversation,
  handleFilterChange,
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
  const [openSearchField, setOpenSearchField] = useState(false);

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
         
          {openSearchField ?
          <>       
            <TextField variant="outlined" autoFocus margin="dense" onChange={(e)=>handleFilterChange(e.target.value)} InputProps={{style:{background:"white"}}}></TextField>
            <IconButton color="primary" onClick={()=>{setOpenSearchField(false); handleFilterChange(null)}}><CloseIcon className={classes.icon}/> </IconButton>
          </>
          :   
          <IconButton color="primary">
            <SearchIcon className={classes.icon}  onClick={()=>setOpenSearchField(true)}/>
          </IconButton> 
          }       
          <ChatHeaderMenu handleOpenDetail={handleOpenDetail} handleLeaveChat={handleLeaveChat} handleDeleteConversation={handleDeleteConversation} type={type} canDelete={canDelete}/>
        </div>
      </Toolbar>
    </div>
  );
}

const ChatHeaderMenu = ({ handleOpenDetail, handleLeaveChat, handleDeleteConversation, type}) => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const handleToggleMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  },[])
  const classes = useStyles();
  const [confirmationDialog, setConfirmationDialog] = useState({open:false, action:null});

  const handleLeaveChatConfirm = useCallback(()=>{
    handleToggleMenu();
    handleLeaveChat();
  },[handleLeaveChat, handleToggleMenu])

  const handleDeleteChatConfirm = useCallback(()=>{
    handleToggleMenu();
    handleDeleteConversation();
  },[handleToggleMenu, handleDeleteConversation])


  return (
    <React.Fragment>
      <IconButton color="primary" onClick={() => handleToggleMenu()}>
        <MoreHorizIcon className={classes.icon}/>
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
                   
              <ListItem
              button  
              onClick={() => {
                setConfirmationDialog({open:true, action:"chat_delete"});
              }}>       
              
                {t("chat_delete")}
              </ListItem>
              {type === "group" && 
              <ListItem
                button
                onClick={() => {
                  setConfirmationDialog({open:true, action:"conversation_leave"});
                }}
              >
                {t("conversation_leave")}              
              </ListItem>
              }
        </DropdownMenu>     
      )}  
      <ConfirmationDialog 
        open={confirmationDialog.open}
        title={
          confirmationDialog.action === "conversation_leave" ?
            t("confirmation:conversation_leave")
          : t("confirmation:chat_delete")
        } 
        handleAccept={confirmationDialog.action === "conversation_leave" ? handleLeaveChatConfirm : handleDeleteChatConfirm} 
        handleCancel={()=>setConfirmationDialog({open:false})}
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

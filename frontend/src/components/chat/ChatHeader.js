import React, { useState } from "react";
import "./assets/Chat.css";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { useTranslation } from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ListItem from "@material-ui/core/ListItem";
import DropdownMenu from "../util/DropdownMenu";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { string, func } from "prop-types";
import Username from "../user/Username";

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
  username,
  type,
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
          <img
            src={profilePicPlaceholder}
            className="ChatHeader-profilePic"
            alt="user"
          />

          <div style={{ display: "flex", alignItems: "baseline" }}>
            <h1>
              {type === "group" && (
                <SupervisedUserCircleIcon style={{ verticalAlign: "middle" }} />
              )}
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
          <ChatHeaderMenu handleOpenDetail={handleOpenDetail} handleLeaveChat={handleLeaveChat} type={type} />
        </div>
      </Toolbar>
    </div>
  );
}

const ChatHeaderMenu = ({ handleOpenDetail, handleLeaveChat, type }) => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
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
          <ListItem
            button
            onClick={() => {
              handleToggleMenu();
              handleLeaveChat();
            }}
          >
          {t("chat_delete")}
          </ListItem>
        </DropdownMenu>
      )}
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

export default withRouter(ChatHeader);

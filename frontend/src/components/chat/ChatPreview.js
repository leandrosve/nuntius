import React from "react";
import "./assets/Chat.css";
import { BsClock, BsCheckAll } from "react-icons/bs";
import ListItem2 from "../util/ListItem";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Badge from "@material-ui/core/Badge";

function ChatPreview({avatar, alias, lastMessage, unreadMessagesCount, lastMessageTime}) {
  return (
    <ListItem2
    style={{ background: '#1f1f23', borderBottom:'1px solid #303035'}}
      left={
        <img
          src={avatar}
          className="ChatPreview-image"
          alt="user"
        />
       
      }
      center={
        <React.Fragment>
          <h3>{alias}</h3>
          <div>
            <p>
              <BsCheckAll />
              {lastMessage}
            </p>
          </div>
        </React.Fragment>
      }
      right={
        <React.Fragment>
          <div className="ChatPreview-time">
            <BsClock />
            <p>{lastMessageTime}</p>
          </div>
          <div>
            {unreadMessagesCount > 0 && (
              <Badge
                className="ChatPreview-messageCount"
                badgeContent={unreadMessagesCount}
                color="secondary"
                children={<ChatBubbleOutlineIcon />}
              />
            )}
          </div>
        </React.Fragment>
      }
    />
  );
}
export default ChatPreview;

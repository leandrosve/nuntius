import React, {useState} from "react";
import "./assets/Chat.css";
import { BsClock, BsCheckAll } from "react-icons/bs";
import ListItem from "../util/ListItem";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Badge from "@material-ui/core/Badge";
import {Link} from "react-router-dom";


function ChatPreview({avatar, alias, lastMessage, unreadMessagesCount, lastMessageTime}) {
  const [user, setUser] = useState({username:'@donramon'});
  return (
    <ListItem  button component={Link} to={`/browse/chat/${user.username}`}
    
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
            <p style={{whiteSpace:'nowrap',  overflow:'hidden', textOverflow: 'ellipsis'}}>
              <span style={{position:'relative',top:'3px', paddingRight:'5px',display:'inline-block',margin:'0'}}>
              <BsCheckAll />
              </span>
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

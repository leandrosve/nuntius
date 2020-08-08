import React, {useState} from "react";
import "./assets/Chat.css";
import { BsClock, BsCheckAll } from "react-icons/bs";
import ListItem from "../util/ListItem";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Badge from "@material-ui/core/Badge";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";


function ChatPreview({avatar, title, lastMessage, unreadMessagesCount=10, id, groupal = false, lastMessageTime="4:20"}) {
  const [user] = useState({username:'@donramon'});
  const { t } = useTranslation();
  const link= groupal ? `/chat/group/${id}` : `/chat/${user.username}`;
  return (
    <ListItem  button component={Link} to={link}
    
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
          <h3>{title? title : t("group_untitled")}</h3>
          
          <div>
            <p style={{whiteSpace:'nowrap',  overflow:'hidden', textOverflow: 'ellipsis'}}>
            {lastMessage &&
              <span style={{position:'relative',top:'3px', paddingRight:'5px',display:'inline-block',margin:'0'}}>
              <BsCheckAll />
              </span>
            }
            
            {lastMessage ? lastMessage.text : t("no_messages")}
              
            </p>
          </div>
      
        </React.Fragment>
      }
      right={
        lastMessage &&
        <React.Fragment>
          <div className="ChatPreview-time">
            <BsClock />
            <p>{lastMessageTime}</p>
          </div>
          <div style={{marginRight:"10px"}}>
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
export default React.memo(ChatPreview);

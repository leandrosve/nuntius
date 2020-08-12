import React from "react";
import "./assets/Chat.css";
import { BsClock} from "react-icons/bs";
import ListItem from "../util/ListItem";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Badge from "@material-ui/core/Badge";
import { useTranslation } from "react-i18next";
import MessageCheckMarker from "./message/MessageCheckMarker";
import dateFormat from "dateformat";


const ellipsis = {
  whiteSpace:'nowrap',  overflow:'hidden', textOverflow: 'ellipsis'
}
function ChatPreview({avatar, title, lastMessage, handleClick, unreadMessagesCount=10}) {
  const { t } = useTranslation();
  return (
    <ListItem  button onClick={handleClick}
    style={{ background: '#1f1f23', borderBottom:'1px solid #303035'}}
      left={<img src={avatar} className="ChatPreview-image" alt="user"/>}
      center={
        <React.Fragment>
          <h3 style={ellipsis}>{title}</h3>       
          <div>
            <p style={ellipsis}>
              {lastMessage && lastMessage.details && <MessageCheckMarker {...lastMessage}/>}          
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
            <p>{lastMessage && dateFormat(lastMessage.sentTime, "shortDate")}</p>
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

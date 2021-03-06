import React from "react";
import "./assets/Chat.css";
import ListItem from "../util/ListItem";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Badge from "@material-ui/core/Badge";
import { useTranslation } from "react-i18next";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import moment from "moment";
import "moment/locale/es";
import Avatar from "../util/Avatar";
import MessagePreview from "./message/MessagePreview";

const ellipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

function ChatPreview({
  avatar,
  title,
  lastMessage,
  type,
  handleClick,
  unreadMessagesCount = 10,
  colorSource,
}) {
  const { t } = useTranslation();

  const displayDate = (date)=>{
    const momentDate = moment(date);
    const momentCompare = moment(new Date());
    return momentDate.isSame(momentCompare, 'day') ? (momentDate.format('LT')):
      momentDate.isSame(momentCompare.subtract(1, 'day'),'day') ?  t("date:yesterday") : 
      momentDate.format('l'); 
  }

  return (
    <ListItem
      button
      onClick={handleClick}
      style={{borderBottom: "1px solid #303035" }}
      left={<Avatar src={avatar} style={{width:"50px", height:"50px"}} colorSource={colorSource} group={type === "group"} alt={title} />}
      center={
        <React.Fragment>
          <h3 style={ellipsis}>
            {type === "group" && (
              <SupervisedUserCircleIcon style={{ verticalAlign: "middle" }} />
            )}
            {title}
          </h3>
         
          <MessagePreview message={lastMessage}/>
        </React.Fragment>
      }
      right={
        lastMessage && (
          <React.Fragment>
            <div className="ChatPreview-time">            
              <p>
                {lastMessage &&
                  displayDate(lastMessage.sentTime)}
              </p>
            </div>
            <div style={{ marginRight: "10px" }}>
              {unreadMessagesCount > 0 && (
                <Badge
                  className="ChatPreview-messageCount"
                  badgeContent="?"
                  color="secondary"
                  children={<ChatBubbleOutlineIcon />}
                />
              )}
            </div>
          </React.Fragment>
        )
      }
    />
  );
}

export default React.memo(ChatPreview);

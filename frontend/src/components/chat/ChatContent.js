import React, { useState } from "react";
import "./assets/Chat.css";
import Message from "./message/Message";
import DateMarker from "../util/DateMarker";
import VideoPlayer from "../util/VideoPlayer";
import Chip from "@material-ui/core/Chip";
import { useTranslation } from "react-i18next";

const sortByDate = (a, b) => (a.sentTime > b.sentTime ? 1 : -1);

const ChatContent = ({handleOpenMedia, messages, type, filter}) => {
  const { t } = useTranslation();
  const [videoPlayer, setVideoPlayer] = useState({
    open: false,
    src: null,
  });

  const filteredMessages = (!filter && filter !== "") ? messages : messages.filter(m=>m.text? m.text.toLowerCase().includes(filter.toLowerCase()): false);

  const handleOpenVideoPlayer = React.useCallback((src) => {
    setVideoPlayer({ open: true, src: src });
  }, []);


  const chatEndRef = React.createRef();

  React.useEffect(() => {
    setTimeout(() => {
      if (chatEndRef.current)
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [messages, chatEndRef]);

  return (
    <>
      <div className="ChatMessages">
        {videoPlayer.open && 
          <VideoPlayer src={ videoPlayer.src} handleClose={() => setVideoPlayer({ open: false, src:null })}/>   
        }
        
        
        <div className="ChatMessages-content">
        {(!filteredMessages || (filteredMessages.length === 0)) && 
          <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}>
            <Chip label={!!filter && filter.length > 0 ? t("no_results") : t("no_messages")}/>
          </div>
        }
        {}
       
          {filteredMessages.sort(sortByDate).map((message, index) => {
            const showDateMarker = index === 0 || !sameDay(message.sentTime, messages[index - 1].sentTime);
            const displayAvatar = (index === 0 || message.userId !== messages[index - 1].userId || showDateMarker);
            return (
              <div key={message.id}>
                { showDateMarker ? (
                  <DateMarker date={message.sentTime} />
                ) : null}
                <Message
                  handleOpenMedia={handleOpenMedia}
                  handleOpenVideoPlayer={handleOpenVideoPlayer}
                  {...message}
                  displayUserName={type === "group"}
                  displayAvatar={displayAvatar}
                />
              </div>
            );
          })}
          <div style={{ float: "left", clear: "both" }} ref={chatEndRef}></div>
        </div>
      </div>

      
    </>
  );
};

function sameDay(d1, d2) {
  const d1f = new Date(d1);
  const d2f = new Date(d2);
  return (
    d1f.getFullYear() === d2f.getFullYear() &&
    d1f.getMonth() === d2f.getMonth() &&
    d1f.getDate() === d2f.getDate()
  );
}

export default ChatContent;

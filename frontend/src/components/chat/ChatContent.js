import React, { useState } from "react";
import "./assets/Chat.css";
import Message from "./message/Message";
import MessageForm from "./message/MessageForm";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import DateMarker from "../util/DateMarker";
import VideoPlayer from "../util/VideoPlayer";

const ChatContent = ({handleOpenMedia}) => {
 
  const [videoPlayer, setVideoPlayer] = useState({
    open: false,
    src: null,
  });

  const handleOpenVideoPlayer = React.useCallback((src) => {
    setVideoPlayer({ open: true, src: src });
  }, []);

  const [, setSendBottom] = useState(false);

  const handleMessageSubmit = React.useCallback((message) => {
    setMessages((prev) => prev.concat(message));
    setSendBottom((prev) => !prev);
  }, []);

  const chatEndRef = React.createRef();

  const messagesData = [
    {
      text: "primero",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 1,
      id:1,
    },
    {
      text: "https://www.youtube.com/watch?v=2JCN7pfiEWE ",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      seenTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 1,
      id:2,
    },
    {
      text: "holaa probando",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 1,
      id:3,
    },
    {
      text: "holaa probando sdfsdfsd sdfsdfs sdfsdf sdfsdf sdfsdf sdfsdf ",
      media: profilePicPlaceholder,
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 2,
      id:4,
    },
    {
      text: "https://www.youtube.com/watch?v=Rlh_hxjmSvc",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 30, 14, 39, 7),
      seenTime: new Date(2020, 5, 28, 14, 39, 7),
      id:5,
      userId: 2,
    },
    {
      text: "https://www.youtube.com/watch?v=lCPwR7R4hlA",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      seenTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 2,
      id:6,
    },
    {
      text: "https://www.youtube.com/watch?v=n9PaAHqMNjI",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 1,
      id:7,
    },
    {
      text: "ultimo",
      profilePicture: profilePicPlaceholder,
      media:"https://images.pexels.com/photos/2661176/pexels-photo-2661176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      sendTime: new Date(2020, 5, 29, 14, 39, 7),
      userId: 1,
      id:8,
    },
  ];
  const [messages, setMessages] = useState(messagesData);

  React.useEffect(() => {
    setTimeout(() => {
      if (chatEndRef.current)
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [messages, chatEndRef]);

  const sortByDate = (a, b) => (a.sendTime > b.sendTime ? 1 : -1);
  return (
    <>
      <div className="ChatMessages">
        {videoPlayer.open && 
          <VideoPlayer src={ videoPlayer.src} handleClose={() => setVideoPlayer({ open: false, src:null })}/>   
        }
        <div className="ChatMessages-content">
          {messages.sort(sortByDate).map((message, index) => {
            return (
              <div key={message.id}>
                {index === 0 ||
                !sameDay(message.sendTime, messages[index - 1].sendTime) ? (
                  <DateMarker date={message.sendTime} />
                ) : null}
                <Message
                  handleOpenMedia={handleOpenMedia}
                  handleOpenVideoPlayer={handleOpenVideoPlayer}
                  {...message}
                />
              </div>
            );
          })}
          <div style={{ float: "left", clear: "both" }} ref={chatEndRef}></div>
        </div>
      </div>

      <MessageForm handleSubmit={handleMessageSubmit} />
    </>
  );
};

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export default ChatContent;

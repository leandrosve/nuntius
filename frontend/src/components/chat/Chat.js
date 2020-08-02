import React, { useState } from "react";
import "./assets/Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import Modal from "../util/Modal";
import DateMarker from "../util/DateMarker";
import VideoPlayer from "../util/VideoPlayer";
import ChatWelcome from "./ChatWelcome";

const Chat = (props) => {
  const { match } = props;
  return (
    <div className="Chat">
      <Switch>
        <Route path={`${match.path}/chat`} component={ChatContent} />
        <ChatWelcome/>
       
      </Switch>
    </div>
  );
};

const ChatContent = () => {
  const [showMedia, setOpenMedia] = useState({ open: false, content: null });
  const handleOpenMedia = React.useCallback((media) => {
    setOpenMedia({ open: true, content: media });
  }, []);
  const [videoPlayer, setVideoPlayer] = useState({
    open: false,
    content: null,
  });
  const handleOpenVideoPlayer = React.useCallback((media) => {
    setVideoPlayer({ open: true, content: media });
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
    },
    {
      text: "https://www.youtube.com/watch?v=2JCN7pfiEWE ",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      seenTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 1,
    },
    {
      text: "holaa probando",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 1,
    },
    {
      text: "holaa probando sdfsdfsd sdfsdfs sdfsdf sdfsdf sdfsdf sdfsdf ",
      media: profilePicPlaceholder,
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 2,
    },
    {
      text: "https://www.youtube.com/watch?v=Rlh_hxjmSvc",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 30, 14, 39, 7),
      seenTime: new Date(2020, 5, 28, 14, 39, 7),
      
      userId: 2,
    },
    {
      text: "https://www.youtube.com/watch?v=lCPwR7R4hlA",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      seenTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 2,
    },
    {
      text: "https://www.youtube.com/watch?v=n9PaAHqMNjI",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 28, 14, 39, 7),
      userId: 1,
    },
    {
      text: "ultimo",
      profilePicture: profilePicPlaceholder,
      sendTime: new Date(2020, 5, 29, 14, 39, 7),
      userId: 1,
    },
  ];
  const [messages, setMessages] = useState(messagesData);

  React.useEffect(() => {
    setTimeout(() => {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 200);
  },  [messages, chatEndRef]);

  const sortByDate = (a, b) => (a.sendTime > b.sendTime ? 1 : -1);
  return (
    <>
      <ChatHeader />
      <div className="ChatMessages">
        {videoPlayer.open && (
          <VideoPlayer handleClose={() => setVideoPlayer({ open: false })}>
            {videoPlayer.content}
          </VideoPlayer>
        )}
        <div className="ChatMessages-content">
          {messages.sort(sortByDate).map((obj, index) => {
            return (
              <div key={index}>           
                {index === 0 ||
                !sameDay(obj.sendTime, messages[index - 1].sendTime) ? (
                  <DateMarker date={obj.sendTime}/>
                ) : null}
                <Message               
                  handleOpenMedia={handleOpenMedia}
                  handleOpenVideoPlayer={handleOpenVideoPlayer}      
                  {...obj}
                />
              </div>
            );
          })}
          <div style={{ float: "left", clear: "both" }} ref={chatEndRef}></div>
        </div>

        <Modal
          open={showMedia.open}
          handleClose={() => setOpenMedia({ open: false })}
        >
          {showMedia.content}
        </Modal>
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

export default withRouter(Chat);

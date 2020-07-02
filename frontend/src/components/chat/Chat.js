import React, { useState, useCallback } from "react";
import "./assets/Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageForm from "./MessageForm";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { AiFillAlipayCircle } from "react-icons/ai";
import Modal from "../util/Modal";
import { Spring } from "react-spring/renderprops";
import Button from "@material-ui/core/Button";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";

const useStyles = makeStyles((theme) => ({
  videoPlayer: {
    background: "white",
    position: "absolute",
    top: "0",
    zIndex: theme.zIndex.speedDial,
    left: "50%",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: theme.shadows[3],
    transform: "translateX(-50%)",
  },
  dateMarker: {
    background: "gray",
    padding: "0px 10px",
    boxShadow: theme.shadows[1],
    borderRadius: '10px',
  },
}));

const propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
const Chat = (props) => {
  const { match, location, history } = props;
  const { t } = useTranslation();

  dateFormat.i18n = {
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
  };

  return (
    <div className="Chat">
      <Switch>
        <Route path={`${match.path}/chat`} component={ChatContent} />

        <Box
          display="flex"
          flexWrap="1"
          flexDirection="column"
          alignItems="center"
          style={{ marginTop: "20%" }}
        >
          <AiFillAlipayCircle style={{ width: "200px", height: "200px" }} />
          <Box display="flex" flexDirection="row" css={{ maxWidth: "400px" }}>
            <div>
              <EmojiPeopleIcon style={{ width: "100px", height: "100px" }} />
            </div>
            <div>
              <Typography variant="h5">{t("welcome_message")}</Typography>
            </div>
          </Box>
        </Box>
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

  const [sendBottom, setSendBottom] = useState(false);

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
  }, (null, [messages]));

  const classes = useStyles();
  const sortByDate = (a, b) => (a.sendTime > b.sendTime ? 1 : -1);
  return (
    <>
      <ChatHeader />
      <div className="ChatMessages">
        {videoPlayer.open && (
          <VideoPlayer handleClose={() => setVideoPlayer({ open: false })}>
            {" "}
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
                  text={obj.text}
                  sendTime={obj.sendTime}                 
                  profilePicture={
                    index == 0 || messages[index - 1].userId !== obj.userId
                      ? obj.profilePicture
                      : null
                  }
                  userId={obj.userId}
                  handleOpenMedia={handleOpenMedia}
                  handleOpenVideoPlayer={handleOpenVideoPlayer}
                  media={obj.media}
                  seenTime={obj.seenTime}
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

const VideoPlayer = ({ children, handleClose }) => {
  const classes = useStyles();
  return (
    <Spring
      from={{ opacity: 0.5, height: "0px" }}
      to={{ opacity: 1, height: "305px" }}
      duration={2500}
    >
      {(props) => (
        <Box
          display="flex"
          flexDirection="column"
          style={props}
          className={classes.videoPlayer}
        >
          {children}
          <Button onClick={handleClose} style={{ width: "100%" }}>
            <ExpandLessIcon />
          </Button>
        </Box>
      )}
    </Spring>
  );
};

const DateMarker = ({date}) => {
  const classes= useStyles();
  return (
    <div
      style={{
        textAlignLast: "center",
        width: "auto",
        margin: "10px",
      }}
    >
    
      <span className={classes.dateMarker}>
        {dateFormat(date, "longDate")}
      </span>
      
    </div>
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

import React, { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  videoPlayer: {
    background: "white", position:'absolute',top:'0', 
    zIndex:'100', left:'50%', marginTop:'10px', borderRadius:'5px',
    boxShadow:'2px 2px 6px black',transform:'translateX(-50%)' 
  }

}));

const propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
function Chat(props) {
  const { match, location, history } = props;
  const { t } = useTranslation();
  console.log("Renderizando chat entero");
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
}

const ChatContent = () => {
  const [showMedia, setOpenMedia] = useState({ open: false, content: null });
  const handleOpenMedia = React.useCallback(media => {
    setOpenMedia({ open: true, content: media });},[]);
  const [videoPlayer, setVideoPlayer] = useState({ open: false, content: null });
  const handleOpenVideoPlayer =  React.useCallback( media => {
    setVideoPlayer({ open: true, content: media })},[]);
  

  return (
    <>
      <ChatHeader />
      <div className="ChatMessages">

        {videoPlayer.open && <VideoPlayer handleClose={()=>setVideoPlayer({open:false})}> {videoPlayer.content}</VideoPlayer>}
        <div className="ChatMessages-content">
        
          <Message
            text="Holaaaaaaa asdadsda asdasd asdas asdas asdas asdas asdas asdas"
            handleOpenMedia={handleOpenMedia}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
          <Message
            text="Euuu holaaaa lpm,asdasd asdasd, asdadasad asdasdasd,asdasd"
            handleOpenMedia={handleOpenMedia}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
          <Message
            text=" https://www.youtube.com/watch?v=Rlh_hxjmSvc https://www.youtube.com/watch?v=2JCN7pfiEWE "
            handleOpenMedia={handleOpenMedia}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
          <Message
            text="https://www.youtube.com/watch?v=2JCN7pfiEWE "
            handleOpenMedia={handleOpenMedia}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
          <Message text=" " handleOpenMedia={handleOpenMedia} />
          <Message
            text=" https://www.youtube.com/watch?v=n9PaAHqMNjI"
            profilePicture={profilePicPlaceholder}
            handleOpenMedia={handleOpenMedia}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
          <Message text=" asdas 😃" handleOpenMedia={handleOpenMedia} />
          <Message
            text="https://www.youtube.com/watch?v=2JCN7pfiEWE "
            media={profilePicPlaceholder}
            handleOpenMedia={handleOpenMedia}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
          <Message text=" " handleOpenMedia={handleOpenMedia}  handleOpenVideoPlayer={handleOpenVideoPlayer}/>
        </div>

        <Modal
          open={showMedia.open}
          handleClose={() => setOpenMedia({ open: false })}
        >
          {showMedia.content}
        </Modal>
        
      </div>
      <div className="ChatSendForm" style={{ background: "white" }}>
        <MessageForm />
      </div>
    </>
  );
};

const VideoPlayer = ({ children , handleClose}) => {
  const classes=useStyles();
  return (
    <Spring
      from={{ opacity: 0.5, height: "0px" }}
      to={{ opacity: 1, height: "351px" }}
      duration={2500}
    >
      {(props) => (
        <Box display="flex" flexDirection="column" style={props} className={classes.videoPlayer}>
          {children}
          <Button onClick={handleClose} style={{width:'100%'}}><ExpandLessIcon/></Button>
        </Box>
      )}
    </Spring>
  );
};
export default withRouter(Chat);

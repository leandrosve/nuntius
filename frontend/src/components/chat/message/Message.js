import React, { memo } from "react";
import Typography from "@material-ui/core/Typography";
import Linkify from "react-linkify";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import EmbededYoutube from "./EmbededYoutube";
import MessageCheckMarker from "./MessageCheckMarker";
import Media from "./Media";
import { useSelector } from "react-redux";
import { getUserById } from "../../../redux/user/userReducer";
import Avatar from "../../util/Avatar";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    width: "100%",
    overflow: "hidden",
  },
  messageBox: {
    background: "white",
    margin: "10px",
    display: "inline-block",
    maxWidth: "40%",
    marginRight: "50px",
    marginLeft: "50px",
    cursor: "pointer",
    position: "relative",
    borderRadius: "10px",
    boxShadow: theme.shadows[4],
    color: "black",
    padding: "5px",
    "& a": { color: "rgba(0, 0, 0, 0.7)", fontStyle: "italic" },
  },
  avatar:{
    boxShadow: theme.shadows[3],
  },
  avatarLeft: {
    display: "flex",
    flexDirection: "row",
    top: "0px",
    margin: "5px",
    position: "absolute",
    left: "-50px",
    "& svg": {
      color: "white",
      fontSize: "40px",
      transform: "translateY(25px) rotate(70deg) ",
    },
  },
  avatarRight: {
    display: "flex",
    flexDirection: "row-reverse",
    top: "0px",
    margin: "5px",
    position: "absolute",
    right: "-50px",
    "& svg": {
      color: "white",
      fontSize: "40px",
      transform: "translateY(25px) rotate(-70deg) ",
    },
  },
}));

function Message({
  text,
  media,
  handleOpenMedia,
  handleOpenVideoPlayer,
  sentTime,
  details,
  userId,
  displayUserName,
  displayAvatar = false,
}) {
  const classes = useStyles();

  const user = useSelector(state =>{ 
    return (userId === state.session.currentUser.id) ?  
      state.session.currentUser
      : getUserById(state.user, userId)})
  const avatar= user ? user.avatar : null;
  const alt=  user ? user.alias ? user.alias :  user.name : null;

  return (
    <div className={classes.messageContainer}>
      <div
        className={classes.messageBox}
        style={details ? { float: "right" } : null}
      >
        {avatar && (
          <div
            className={details ? classes.avatarRight : classes.avatarLeft}
          >
          <Avatar src={avatar} className={classes.avatar} alt={alt} />
          </div>
        )}
        { displayUserName && !details && displayAvatar && <Typography variant="caption" color="textSecondary">{alt}</Typography>}
        {media ? (
          <Media src={media} handleOpenMedia={handleOpenMedia} />
        ) : (
          <EmbededYoutube
            text={text}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
        )}
        <Typography variant="body2" style={{ wordWrap: "break-word", textAlign:"left", textOverflow: "string", margin: "0px" }}>
          <Linkify target="_blank">{text}</Linkify>
        </Typography>
        <div style={{ alignSelf: "flex-end" }}>
          <Typography
            variant="caption"
            style={{ textAlign: "end" }}
            display="block"
            gutterBottom
          >
            {details && 
              <MessageCheckMarker fontSize="large" />         
            }
             {dateFormat(sentTime, "shortTime")}
          </Typography>
        </div>
      </div>
    </div>
  );
}



export default memo(Message);

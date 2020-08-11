import React, { memo } from "react";
import Typography from "@material-ui/core/Typography";
import Linkify from "react-linkify";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import EmbededYoutube from "./EmbededYoutube";
import MessageCheckMarker from "./MessageCheckMarker";
import Media from "./Media";

const useStyles = makeStyles(() => ({
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
    boxShadow: " 2px 2px 8px rgba(0, 0, 0, 0.7)",
    color: "black",
    padding: "5px",
    "& a": { color: "rgba(0, 0, 0, 0.7)", fontStyle: "italic" },
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
  profilePicture,
  media,
  handleOpenMedia,
  handleOpenVideoPlayer,
  userId = 1,
  sendTime = new Date(Date.now()),
  seenTime,
}) {
  const classes = useStyles();

  return (
    <div className={classes.messageContainer}>
      <div
        className={classes.messageBox}
        style={userId === 1 ? { float: "right" } : null}
      >
        {profilePicture && (
          <div
            className={userId === 1 ? classes.avatarRight : classes.avatarLeft}
          >
            <Avatar src={profilePicture} alt="username" />
          </div>
        )}

        {media ? (
          <Media src={media} handleOpenMedia={handleOpenMedia} />
        ) : (
          <EmbededYoutube
            text={text}
            handleOpenVideoPlayer={handleOpenVideoPlayer}
          />
        )}
        <p style={{ wordWrap: "break-word", textOverflow: "string", margin: "0px" }}>
          <Linkify>{text}</Linkify>
        </p>
        <div style={{ alignSelf: "flex-end" }}>
          <Typography
            variant="caption"
            style={{ textAlign: "end", marginRight: "5px" }}
            display="block"
            gutterBottom
          >
            <MessageCheckMarker fontSize="large" />
            {dateFormat(sendTime, "shortTime")}
          </Typography>
        </div>
      </div>
    </div>
  );
}



export default memo(Message);

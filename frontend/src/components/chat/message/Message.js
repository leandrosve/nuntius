import React, { memo } from "react";
import Typography from "@material-ui/core/Typography";
import Linkify from "react-linkify";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import EmbededYoutube from "./EmbededYoutube";
import MessageCheckMarker from "./MessageCheckMarker";
import Media from "./Media";
import useAvatar from "../../profile/useAvatar";
import { Avatar } from "@material-ui/core";

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
  displayAvatar = false,
}) {
  const classes = useStyles();

  
  const avatar=useAvatar({userId: displayAvatar ?  userId:  null} );
  
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
            <Avatar src={avatar}className={classes.avatar} alt="user" />
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
          <Linkify target="_blank">{text}</Linkify>
        </p>
        <div style={{ alignSelf: "flex-end" }}>
          <Typography
            variant="caption"
            style={{ textAlign: "end", marginRight: "5px" }}
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

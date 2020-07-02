import React, {memo} from "react";
import "./assets/Chat.css";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { BsTriangleFill } from "react-icons/bs";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";
import Link from "react-router-dom";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Linkify from "react-linkify";
import Avatar from "@material-ui/core/Avatar";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
const useStyles = makeStyles((theme) => ({
  embeded: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  messageContainer:{
    width:'100%', overflow:'hidden'
  },
  messageBox:{
    background:'white',
    margin: '10px',
    display: 'inline-block',
    maxWidth:'40%',
    marginRight:'50px',
    marginLeft:'50px',
    cursor: 'pointer',
    position:'relative',
    borderRadius: '10px',
    boxShadow:' 2px 2px 8px rgba(0, 0, 0, 0.7)',
    color:'black',
    padding:'5px',
    "& a":{color:'rgba(0, 0, 0, 0.7)', fontStyle:'italic'},
   
  },
   thumbnailContainer:{
    position:'relative',
    "&:hover $thumbnail":{opacity:'0.8'},
    width:'100%', 
    height:'calc(width * 1.333)',
  },
  thumbnail:{
    width:'100%', height:'auto',position:'relative',zIndex:'50'
  },
  thumbnailButton:{
    position:'absolute', zIndex:'55',
    top:'50%',left:'50%',transform:'translate(-50%, -50%)',  
  },
  avatarLeft:{
    display:'flex',
    flexDirection:'row',
    top:'0px',
    margin:'5px',
    position:'absolute',left:'-50px',
    "& svg":{color:'white', fontSize:'40px',transform:'translateY(25px) rotate(70deg) '}
  },
  avatarRight:{
    display:'flex',
    flexDirection:'row-reverse',
    top:'0px',
    margin:'5px',
    position:'absolute',right:'-50px',
    "& svg":{color:'white', fontSize:'40px',transform:'translateY(25px) rotate(-70deg) '}
  }
}));

const EmbededYoutube = ({ text, handleOpenMedia , handleOpenVideoPlayer}) => {
  const classes= useStyles();
  const { t } = useTranslation();
  const regex = /(?:(?:https?:)?\/\/)?(?:www\.)?youtu(?:be\.com\/(?:watch\?(?:.*?&(?:amp;)?)*v=|v\/|embed\/)|\.be\/)([\w‌​\-]+)(?:(?:&(?:amp;)?|\?)[\w\?=]*)*/g;
  var matches = regex.exec(text);
  if (matches !== null) {
    const media = (
      <iframe
        width="480"
        height="270"
        src={"https://www.youtube.com/embed/" + matches[1]+"?autoplay=1"}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope;"
        pictureInPicture='false'
      ></iframe>
    );
    return (
        <div className={classes.thumbnailContainer} onClick={() => handleOpenVideoPlayer(media)}>
          <Button startIcon={<YouTubeIcon/>} className={classes.thumbnailButton} variant='contained' color='secondary'>{t('watch')}</Button>
          <img src={`https://img.youtube.com/vi/${matches[1]}/0.jpg`}  className={classes.thumbnail}/>      
        </div>
    );
  } else {
    return null;
  }
};

function Message({ text, profilePicture, media, handleOpenMedia, handleOpenVideoPlayer , userId=1, sendTime=new Date(Date.now()), seenTime}) {
  const classes=useStyles();

  const [selected, setSelected] = React.useState(false);
  return (
    <div className={classes.messageContainer}>     
      <div className={classes.messageBox} style={userId === 1 ? {float:'right'} : null }>
        {profilePicture && 
        
        <div className={userId === 1 ? classes.avatarRight : classes.avatarLeft}>
           
          <Avatar
            src={profilePicture}
            alt="username"
          />
        </div>
          }
  
          {media ? (
            <Media media={media} handleOpenMedia={handleOpenMedia} />
          ) : (
            <EmbededYoutube text={text} handleOpenMedia={handleOpenMedia} handleOpenVideoPlayer={handleOpenVideoPlayer} />
          )}
          <p
            style={{
              wordWrap: "break-word",
              textOverflow: "string",
              margin: "0px",
            }}
          >
          <Linkify>{text}</Linkify>
          </p>
          <div style={{alignSelf:'flex-end'}}>
          <Typography
            variant="caption"
            style={{ textAlign: "end", marginRight: "5px" }}
            display="block"
            gutterBottom
          >
            
          { seenTime ? 
            <DoneAllIcon fontSize="small" color='secondary' style={{ marginBottom: "-5px", color:'#4fa862' }} /> 
          :
            <CheckIcon fontSize="small" style={{ marginBottom: "-5px" }} />
          }
              {dateFormat(sendTime, "shortTime")}
          </Typography>
          </div>        
      </div>
    </div>
  );
}



const Media = ({ media, handleOpenMedia }) => {
  return (
    <div onClick={() => handleOpenMedia(<img src={media}/>)}>
      <img
        src={media}
        style={{
          width: "100px",
          maxHeight: "100px",
          margin: "5px",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default memo(Message);

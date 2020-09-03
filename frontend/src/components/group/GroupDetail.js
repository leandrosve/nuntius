import React, { useState, useEffect, useRef, useCallback } from "react";
import Alert from "../util/Alert";
import { editGroupImage, editGroupTitle } from "../../redux/chats/groups/groupActions";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getChatById } from "../../redux/chats/chatReducer";
import InlineForm from "../util/InlineForm";
import Avatar from "../util/Avatar";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Typography, Fab, CircularProgress, Divider, IconButton } from "@material-ui/core";

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from "@material-ui/core/styles";
import { sortAlphabetically } from "../../redux/user/userReducer";
import { fetchUsersById } from "../../redux/user/userActions";
import ParticipantList from "./ParticipantList";
import ImageEditor from "../util/ImageEditor";
import AddParticipants from "./AddParticipants";
import WideCloseButton from "../util/WideCloseButton";
import { ADD_GROUP_REQUEST,EDIT_GROUP_REQUEST,  KICK_USER_REQUEST, ADD_USER_TO_CHAT_REQUEST} from "../../redux/chats/groups/groupActionTypes";
import SmartAlert from "../util/SmartAlert";
import useAvatar from "../util/hooks/useAvatar";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection:"column",
    overflowY:"auto",
  },

  details: {
    display: "flex",
    margin: "5px 0px"
  },
  content: {
    flex: "1 0 auto",
    marginLeft: "10px",
  },
  cover: {
    width: 151,
  },

  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  avatar: {
    width: "125px",
    height: "125px",
    marginBottom: "auto",
  },
}));

const GroupDetail = ({
  loading,
  chat,
  sortAlphabetically,
  editImage,
  editTitle,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [userIds, setUserIds] = useState([]);

  const [editedImage, setEditedImage] = useState(null);
  const [uneditedImage, setUneditedImage] = useState(null);
  const editorRef = useRef();

  const [openAddParticipant, setOpenAddParticipant] =useState(false);

  const getEditedImage = () =>{
    const image = editorRef.current.getImage().toDataURL('image/png');
    editImage(chat.id, image);
    setEditedImage(image);
    setUneditedImage(null);
  }

  const handleEditTitle= useCallback((title)=>{
    if(title!== "" && title !== chat.title) editTitle(chat.id, title) 
  },[editTitle, chat])


  const avatar=useAvatar({chatId: chat.id});
  useEffect(() => {
    if(!!chat)setUserIds(sortAlphabetically(chat.userIds));
  }, [chat, setUserIds, sortAlphabetically]);

   return (
    <div className={classes.root}>
      {!chat ?

        <Alert
        open={true}
        severity="error"
        isDismissible={false}
        >
        {t("error:chat_not_found")}
        </Alert>
       :
       <>    
      <div className={classes.details}>
        <Avatar src={editedImage ? editedImage : avatar} colorSource={chat.id} className={classes.avatar} alt={chat.title} />
        <div className={classes.content}>
          <InlineForm variant="h5" defaultValue={chat.title} fieldName={t("title")} handleSubmit={handleEditTitle}/>
          <Typography>
            {t("participants_cant", { cant: chat.userIds.length })}
          </Typography>
          <Fab size="small" component="label">
            <CameraAltIcon />
            <input
              type="file"
              accept="image/*"
              val={editedImage}
              style={{ display: "none" }}
              onChange={(e) => {
                setUneditedImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Fab>
        </div>
      </div>
      <SmartAlert concerns={concerns}/>
      {uneditedImage && (
        <ImageEditor
          handleCancel={() => setUneditedImage(null)}
          image={uneditedImage}
          editorRef={editorRef}
          handleAccept={getEditedImage}
        />
      )}
      <Divider style={{ margin: "10px 0px" }} />
      {loading && <CircularProgress color="secondary" />}
      <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", margin:"-10px 0px"}}>
        <Typography variant="h5" style={{textTransform: "capitalize"}}>
          {t("participants")}
        </Typography>
        <IconButton onClick={()=>setOpenAddParticipant(true)}>
          <PersonAddIcon/>
        </IconButton>
      </div>  
      {openAddParticipant && 
      <>
        <AddParticipants chatId={chat.id}/> 
        <WideCloseButton onClick={()=>setOpenAddParticipant(false)}/>
        <Typography variant="subtitle1" style={{textTransform: "capitalize"}}>
          {t("current_participants")}
        </Typography>
      </>}
      {!loading && <ParticipantList userIds={userIds} chatId={chat.id}/>}
      </>}  
    </div>
  );
};

const concerns = [ADD_GROUP_REQUEST, EDIT_GROUP_REQUEST, KICK_USER_REQUEST, ADD_USER_TO_CHAT_REQUEST];
const mapStateToProps = ({ chat, user }, { chatId }) => {
  return {
    chat: chatId ? getChatById(chat, chatId) : null,
    sortAlphabetically: (userIds) => sortAlphabetically(user, userIds),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editImage: (chatId, image) =>{dispatch(editGroupImage(chatId, image))},   
    editTitle: (chatId, title) =>{dispatch(editGroupTitle(chatId, title))},
    fetchUsers: (ids) => dispatch(fetchUsersById(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);

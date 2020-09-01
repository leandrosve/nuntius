import React, { useState, useEffect, useRef } from "react";
import { getRequestSuccessMessage } from "../../redux/notification/successReducer";
import Alert from "../util/Alert";
import { ADD_GROUP_REQUEST, editGroupImage, EDIT_GROUP_REQUEST } from "../../redux/groups/groupActions";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { connect } from "react-redux";
import { clearNotifications } from "../../redux/notification/notificationActions";
import { useTranslation } from "react-i18next";
import { getChatById } from "../../redux/chats/chatReducer";
import InlineForm from "../util/InlineForm";
import Avatar from "../util/Avatar";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Typography, Fab, CircularProgress, Divider } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { sortAlphabetically } from "../../redux/user/userReducer";
import { fetchUsersById } from "../../redux/user/userActions";

import { FETCH_USERS_REQUEST } from "../../redux/user/userActionTypes";
import ParticipantList from "./ParticipantList";
import ImageEditor from "../profile/ImageEditor";
import useAvatar from "../profile/useAvatar";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection:"column",
    overflowY:"auto",
  },

  details: {
    display: "flex",
  },
  content: {
    flex: "1 0 auto",
    marginLeft: "10px",
    paddingTop: "10px",
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
  success,
  error,
  clearNotifications,
  chat,
  sortAlphabetically,
  editImage
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [userIds, setUserIds] = useState([]);

  const [editedImage, setEditedImage] = useState(null);
  const [uneditedImage, setUneditedImage] = useState(null);
  const editorRef = useRef();

  const getEditedImage = () =>{
    const image = editorRef.current.getImage().toDataURL('image/png');
    editImage(chat.id, image);
    setEditedImage(image);
    setUneditedImage(null);
  }

  const avatar=useAvatar({chatId:chat? chat.id: null})
  useEffect(() => {
    setUserIds(sortAlphabetically(chat.userIds));
  }, [chat, setUserIds, sortAlphabetically]);
  return (
    <div className={classes.root}>
      <Alert
        open={!loading && (!!error || !!success)}
        severity={error ? "error" : "success"}
        onClick={() => clearNotifications()}
      >
        {error || t(success)}
      </Alert>
      <div className={classes.details}>
        <Avatar src={editedImage ? editedImage : avatar} className={classes.avatar} alt={chat.title} />
        <div className={classes.content}>
          <InlineForm variant="h5" defaultValue={chat.title} />
          <Typography>
            {t("participants", { cant: chat.userIds.length })}
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
      {!loading && <ParticipantList userIds={userIds} />}
    </div>
  );
};

const mapStateToProps = ({ success, loading, chat, user }, { chatId }) => {
  return {
    chat: chatId ? getChatById(chat, chatId) : null,
    sortAlphabetically: (userIds) => sortAlphabetically(user, userIds),
    success: getRequestSuccessMessage(success, [ADD_GROUP_REQUEST, EDIT_GROUP_REQUEST]),
    loading: isRequestLoading(loading, [
      ADD_GROUP_REQUEST,
      FETCH_USERS_REQUEST,
    ]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editImage: (chatId, image) =>{dispatch(editGroupImage(chatId, image))},
    clearNotifications: () => {
      dispatch(clearNotifications([ADD_GROUP_REQUEST, EDIT_GROUP_REQUEST]));
    },
    fetchUsers: (ids) => dispatch(fetchUsersById(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);

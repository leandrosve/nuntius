import ApiService from "../../../ApiService";
import { hideModal } from "../../modal/modalActions";
import * as actionTypes from "./groupActionTypes";
const addGroupRequest = () => ({
  type: actionTypes.ADD_GROUP_REQUEST,
});

const addGroupSuccess = () => ({
  type: actionTypes.ADD_GROUP_SUCCESS,
  success: "success:group_saved",
});

const addGroupFailure = (error) => ({
  type: actionTypes.ADD_GROUP_FAILURE,
  error: error,
});

const editGroupRequest = () => ({
  type: actionTypes.EDIT_GROUP_REQUEST,
});

const editGroupSuccess = (chat) => ({
  type: actionTypes.EDIT_GROUP_SUCCESS,
  payload: chat,
  success: "success:group_saved",
});

const editGroupFailure = (error) => ({
  type: actionTypes.EDIT_GROUP_FAILURE,
  error: error,
});

const kickUserRequest = () => ({
  type: actionTypes.KICK_USER_REQUEST,
});

const kickUserSuccess = (chat) => ({
  type: actionTypes.KICK_USER_SUCCESS,
  payload: chat,
  success: "success:participant_delete",
});

const kickUserFailure = (error) => ({
  type: actionTypes.KICK_USER_FAILURE,
  error: error,
});

const addUserToChatRequest = () => ({
  type: actionTypes.ADD_USER_TO_CHAT_REQUEST,
});

const addUserToChatSuccess = (chat) => ({
  type: actionTypes.ADD_USER_TO_CHAT_SUCCESS,
  payload: chat,
  success: "success:participant_add",
});

const addUserToChatFailure = (error) => ({
  type: actionTypes.ADD_USER_TO_CHAT_FAILURE,
  error: error,
});



export const addGroup = (title, userIds) => {
  return (dispatch) => {
    dispatch(addGroupRequest());
    ApiService.post(`/chats`, { title: title, userIds: userIds })
      .then((response) => {    
        dispatch(addGroupSuccess());
        dispatch(hideModal());
      })
      .catch((error) => {
        dispatch(addGroupFailure(error.message));
      });
  };
};

export const editGroupImage = (chatId, avatar) => {
  return (dispatch) => {
    dispatch(editGroupRequest());
    ApiService.putGroupImage(chatId,avatar)
      .then(() => {
          ApiService.getGroupImage(chatId).then((image)=>{
          dispatch(editGroupSuccess({avatar:image, id:chatId}));     
        })         
      })
      .catch((error) => {
        dispatch(editGroupFailure(error.message));
      });
  };
};

export const editGroupTitle = (chatId, title) => {
  return (dispatch) => {
    dispatch(editGroupRequest());
    ApiService.patch(`/group/${chatId}`,title)
      .then((response) => {
          dispatch(editGroupSuccess(response.data));     
        })         
      .catch((error) => {
        dispatch(editGroupFailure(error.message));
      });
  };
};

export const removeUserFromChat = (chatId, userId) => {
  return (dispatch) => {
    dispatch(kickUserRequest());
    ApiService.delete(`/group/${chatId}/users/${userId}`)
      .then(() => {
          dispatch(kickUserSuccess({chatId, userId}));     
        })         
      .catch((error) => {
        dispatch(kickUserFailure(error.message));
      });
  };
};

export const addUserToChat = (chatId, userId) => {
  return (dispatch) => {
    dispatch(addUserToChatRequest());
    ApiService.put(`/group/${chatId}/users/${userId}`)
      .then((response) => {
          dispatch(addUserToChatSuccess(response.data));     
        })         
      .catch((error) => {
        dispatch(addUserToChatFailure(error.message));
      });
  };
};

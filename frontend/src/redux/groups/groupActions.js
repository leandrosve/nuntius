import ApiService from "../../ApiService";
import { openGroupDetail } from "../modal/modalActions";

export const ADD_GROUP_REQUEST = "ADD_GROUP_REQUEST";
export const ADD_GROUP_SUCCESS = "ADD_GROUP_SUCCESS";
export const ADD_GROUP_FAILURE = "ADD_GROUP_FAILURE";

export const EDIT_GROUP_REQUEST = "EDIT_GROUP_REQUEST";
export const EDIT_GROUP_SUCCESS = "EDIT_GROUP_SUCCESS";
export const EDIT_GROUP_FAILURE = "EDIT_GROUP_FAILURE";

export const SET_GROUP_AVATAR = "SET_GROUP_AVATAR";

const addGroupRequest = () => ({
  type: ADD_GROUP_REQUEST,
});

const addGroupSuccess = () => ({
  type: ADD_GROUP_SUCCESS,
  success: "success:group_saved",
});

const addGroupFailure = (error) => ({
  type: ADD_GROUP_FAILURE,
  error: error,
});

const editGroupRequest = () => ({
  type: EDIT_GROUP_REQUEST,
});

const editGroupSuccess = (chat) => ({
  type: EDIT_GROUP_SUCCESS,
  payload: chat,
  success: "success:group_saved",
});

const editGroupFailure = (error) => ({
  type: EDIT_GROUP_FAILURE,
  error: error,
});


export const addGroup = (title, userIds) => {
  return (dispatch) => {
    dispatch(addGroupRequest());
    ApiService.post(`/chats`, { title: title, userIds: userIds })
      .then((response) => {    
        dispatch(addGroupSuccess());
        dispatch(openGroupDetail({chatId:response.data.id}));
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

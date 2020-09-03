import * as actionTypes from "./chatActionTypes";
import ApiService from "../../ApiService";
import { normalize } from "normalizr";
import * as schema from "../schema";
import { getChatById} from "./chatReducer";

const fetchChatsRequest = () => ({
  type: actionTypes.FETCH_CHATS_REQUEST,
});

const fetchChatsSuccess = (chats) => ({
  type: actionTypes.FETCH_CHATS_SUCCESS,
  payload: chats,
});

const fetchChatsFailure = (error) => ({
  type: actionTypes.FETCH_CHATS_FAILURE,
  payload: error,
});

const fetchMessagesRequest = () => ({
  type: actionTypes.FETCH_MESSAGES_REQUEST,
});

const fetchMessagesSuccess = (messages) => ({
  type: actionTypes.FETCH_MESSAGES_SUCCESS,
  payload: messages,
});

const fetchMessagesFailure = (error) => ({
  type: actionTypes.FETCH_MESSAGES_FAILURE,
  payload: error,
});

const sendMessageRequest = () => ({
  type: actionTypes.SEND_MESSAGE_REQUEST,
});


export const addMessage = (message) => (
{
  type: actionTypes.ADD_MESSAGE,
  payload: message,
});

const sendMessageSuccess = () => ({
  type: actionTypes.SEND_MESSAGE_SUCCESS,
});

const sendMessageFailure = (error) => ({
  type: actionTypes.SEND_MESSAGE_FAILURE,
  payload: error,
});

const fetchChatSuccess = (message) => ({
  type: actionTypes.FETCH_CHAT_SUCCESS,
  payload: message,
});

const fetchChatFailure = (error) => ({
  type: actionTypes.FETCH_CHAT_FAILURE,
  payload: error,
});

export const leaveChatSuccess = (chat) => ({
  type: actionTypes.LEAVE_CHAT_SUCCESS,
  payload: chat,
});

export const receiveChatSuccess = (chat) => ({
  type: actionTypes.ADD_CHAT,
  payload: chat,      
});

const leaveChatFailure = (error) => ({
  type: actionTypes.LEAVE_CHAT_FAILURE,
  payload: error,
});


export const setCurrentChat = ({id, userId}) => ({
  type: actionTypes.SET_CURRENT_CHAT,
  payload: {id:id, userId:userId},
});

export const chats = () => {
  return (dispatch) => {
    dispatch(fetchChatsRequest());
    ApiService.get("/chats")
      .then((response) => {     
        const normalized = normalize(response.data, schema.arrayOfChats);
        dispatch(fetchChatsSuccess(normalized));
      })
      .catch((error) => {
        dispatch(fetchChatsFailure(error.message));
      });
  };
};

export const fetchChatById = (chatId) => {
  return (dispatch) => {
    ApiService.get(`/chats/${chatId}`)
      .then((response) => {
        dispatch(fetchChatSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchChatFailure(error.message));
      });
  };
};

export const fetchMessagesFromUser = (userId) => {
  return (dispatch) => {
    dispatch(fetchMessagesRequest());
    ApiService.get(`/users/${userId}/messages`)
      .then((response) => {
        dispatch(fetchMessagesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMessagesFailure(error.message));
      });
  };
};

export const fetchMessagesFromChat = (chatId) => {
  return (dispatch) => {
    dispatch(fetchMessagesRequest());
    ApiService.get(`/chats/${chatId}/messages`)
      .then((response) => {
        dispatch(fetchMessagesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchMessagesFailure(error.message));
      });
  };
};

export const sendMessageToUser = ({ userId, text }) => {
  return (dispatch) => {
    dispatch(sendMessageRequest());
    ApiService.post(`/users/${userId}/messages`, { text })
      .then(dispatch(sendMessageSuccess()))
      .catch((error) => {
        dispatch(sendMessageFailure(error.message));
      });
  };
};

export const sendMessageToChat = ({ chatId, text }) => {
  return (dispatch) => {
    dispatch(sendMessageRequest());
    ApiService.post(`/chats/${chatId}/messages`, { text }) 
      .catch((error) => {
        dispatch(sendMessageFailure(error.message));
      });
  };
};

export const receiveMessage = (message) => {
  return (dispatch, getState) => { 
    const chats = getState().chat;
    if(!getChatById(chats, message.chatId)){
      dispatch(fetchChatById(message.chatId))     
    } else{
      dispatch(addMessage(message)); 
    }
  } 
};

export const leaveChat = (chatId) => {
  return (dispatch) => {
    ApiService.delete(`/chats/${chatId}`)
      .catch((error) => {
        dispatch(leaveChatFailure(error.message));
      });
  };
};



import * as actionTypes from "./chatActionTypes";
import ApiService from "../../ApiService";
import { normalize } from "normalizr";
import * as schema from "../schema";

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

const sendMessageSuccess = (message) => ({
  type: actionTypes.SEND_MESSAGE_SUCCESS,
  payload: message,
});

const sendMessageFailure = (error) => ({
  type: actionTypes.SEND_MESSAGE_FAILURE,
  payload: error,
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
      .then((response) => {
        dispatch(sendMessageSuccess(response.data));
      })
      .catch((error) => {
        dispatch(sendMessageFailure(error.message));
      });
  };
};

export const sendMessageToChat = ({ chatId, text }) => {
  return (dispatch) => {
    dispatch(sendMessageRequest());
    ApiService.post(`/chats/${chatId}/messages`, { text })
      .then((response) => {
        dispatch(sendMessageSuccess(response.data));
      })
      .catch((error) => {
        dispatch(sendMessageFailure(error.message));
      });
  };
};

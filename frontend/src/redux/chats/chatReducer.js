import * as actionTypes from "./chatActionTypes";
import { combineReducers } from "redux";
import currentChatReducer from "./currentChatReducer";
import { union, mapValues } from "lodash";
import {
  EDIT_GROUP_SUCCESS,
  SET_GROUP_AVATAR,
  KICK_USER_SUCCESS,
  ADD_USER_TO_CHAT_SUCCESS,
  SET_EMPTY_GROUP_AVATARS,
} from "./groups/groupActionTypes";

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHATS_REQUEST:
      return true;
    case actionTypes.FETCH_CHATS_FAILURE:
    case actionTypes.FETCH_CHATS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const error = (state = "", action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHATS_REQUEST:
    case actionTypes.FETCH_CHATS_SUCCESS:
      return "";
    case actionTypes.FETCH_CHATS_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

const byIds = (state = {}, action) => {
  let chat;
  switch (action.type) {
    case SET_EMPTY_GROUP_AVATARS:
      return mapValues(state, (chat) => {
        if (action.payload.includes(chat.id))
          return { ...chat, avatar: "not found" };
        return chat;
      });
    case ADD_USER_TO_CHAT_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case KICK_USER_SUCCESS:
      chat = state[action.payload.chatId];
      return {
        ...state,
        [chat.id]: {
          ...chat,
          userIds: chat.userIds.filter((id) => id !== action.payload.userId),
        },
      };
    case actionTypes.LEAVE_CHAT_SUCCESS:
    case actionTypes.DELETE_CHAT:
      const { [action.payload.id]: removed, ...rest } = state;
      return rest;
    case actionTypes.FETCH_CHATS_SUCCESS:
      const contacts = action.payload.entities.chats;
      return contacts ? contacts : state;
    case actionTypes.FETCH_CHAT_SUCCESS:
    case actionTypes.ADD_CHAT:
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.ADD_MESSAGE:
      chat = state[action.payload.chatId];
      return chat
        ? {
            ...state,
            [action.payload.chatId]: { ...chat, lastMessage: action.payload },
          }
        : state;
    case EDIT_GROUP_SUCCESS:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload },
      };
    case SET_GROUP_AVATAR:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          avatar: action.payload.avatar,
        },
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LEAVE_CHAT_SUCCESS:
    case actionTypes.DELETE_CHAT:
      return state.filter((id) => id !== action.payload.id);
    case actionTypes.FETCH_CHATS_SUCCESS:
      return action.payload.result;
    case actionTypes.FETCH_CHAT_SUCCESS:
    case actionTypes.ADD_CHAT:
      return union(state, [action.payload.id]);
    default:
      return state;
  }
};

export const getAllChats = (state) => {
  return state.allIds.map((chatId) => {
    return state.byIds[chatId];
  });
};

export const getChatGroupById = (state, id) => {
  const chat = state.byIds[id];
  return chat && chat.groupal ? chat : null;
};

export const getChatById = (state, id) => {
  return state.byIds[id];
};

export const getPrivateChatByUserId = (state, userId) => {
  const result = getAllChats(state).find(
    (c) => !c.groupal && c.userIds.includes(userId)
  );
  return result;
};

const chatReducer = combineReducers({
  byIds,
  allIds,
  isFetching,
  error,
  currentChat: currentChatReducer,
});

export default chatReducer;

import * as actionTypes from "./chatActionTypes";
import { combineReducers } from "redux";

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
  switch (action.type) {
    case actionTypes.FETCH_CHATS_SUCCESS:
      const contacts = action.payload.entities.chats;
      return contacts ? contacts : state;

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHATS_SUCCESS:
      return action.payload.result;
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
  return ( chat && chat.groupal) ? chat : null;
};

const chatReducer = combineReducers({
  byIds,
  allIds,
  isFetching,
  error,
});

export default chatReducer;

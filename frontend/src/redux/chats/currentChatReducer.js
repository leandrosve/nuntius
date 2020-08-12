import * as actionTypes from "./chatActionTypes";
import { combineReducers } from "redux";

const messages = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      return action.payload;
    case actionTypes.FETCH_MESSAGES_FAILURE:
      return [];
    case actionTypes.SEND_MESSAGE_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES_REQUEST:
      return true;
    case actionTypes.FETCH_MESSAGES_SUCCESS:
    case actionTypes.FETCH_MESSAGES_FAILURE:
      return false;
    default:
      return state;
  }
};

const currentChatReducer = combineReducers({
  messages,
  loading,
});

export default currentChatReducer;

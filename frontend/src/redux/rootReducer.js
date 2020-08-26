import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import contactReducer from "./contacts/contactReducer";
import chatReducer from "./chats/chatReducer";
import modalReducer from "./modal/modalReducer";
import {LOGOUT} from "./user/userActionTypes";
const appReducer = combineReducers({
  user: userReducer,
  contact: contactReducer,
  chat: chatReducer,
  modal: modalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;

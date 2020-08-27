import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import chatReducer from "./chats/chatReducer";
import modalReducer from "./modal/modalReducer";
import sessionReducer from "./session/sessionReducer";
import {LOGOUT} from "./user/userActionTypes";
import loadingReducer from "./notification/loadingReducer";
import errorReducer from "./notification/errorReducer";
import successReducer from "./notification/successReducer";

const appReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  modal: modalReducer,
  session: sessionReducer,
  loading: loadingReducer,
  success: successReducer,
  error: errorReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;

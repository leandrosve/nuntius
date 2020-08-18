import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import contactReducer from "./contacts/contactReducer";
import chatReducer from "./chats/chatReducer";
import modalReducer from "./modal/modalReducer";
const rootReducer = combineReducers({
  user: userReducer,
  contact: contactReducer,
  chat: chatReducer,
  modal: modalReducer,
});

export default rootReducer;

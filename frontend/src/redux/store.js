import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './user/userReducer';
import contactReducer from './contacts/contactReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import chatReducer from './chats/chatReducer';
import modalReducer from './modal/modalReducer';

const store = createStore(
    combineReducers({
        user: userReducer, 
        contact: contactReducer,
        chat: chatReducer,
        modal: modalReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);


export default store;

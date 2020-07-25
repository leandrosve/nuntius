import {createStore, applyMiddleware, combineReducers} from 'redux';
import {logger} from 'redux-logger';
import userReducer from './user/userReducer';
import contactReducer from './contacts/contactReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        user: userReducer, 
        contact: contactReducer}),
    composeWithDevTools(applyMiddleware(thunk))
);


export default store;

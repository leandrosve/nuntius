import * as actionTypes from "./userActionTypes";
import { combineReducers } from "redux";
import * as contactActionTypes from "../contacts/contactActionTypes";
import union from "lodash/union";
import contact from "../contacts/contactReducer";

const search = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SEARCH_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const byIds = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.ADD_USER:
      return { ...state, [action.payload.id]: {...state[action.payload.id],...action.payload} };
    case actionTypes.SET_USER_AVATAR:
      const user = state[action.payload.id];
      return !!user ? { ...state, [user.id]: {...user,...action.payload}} : state;
    case contactActionTypes.FETCH_CONTACTS_SUCCESS:
    case contactActionTypes.ADD_CONTACT_SUCCESS:
    case contactActionTypes.EDIT_CONTACT_SUCCESS:
    case contactActionTypes.DELETE_CONTACT_SUCCESS:
      return contact(state, action);    
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    case contactActionTypes.ADD_CONTACT_SUCCESS:
      return union(state, [action.payload.id]);
    case contactActionTypes.FETCH_CONTACTS_SUCCESS:
      return union(state, action.payload.result);
    case actionTypes.ADD_USER:
      return state.find((id) => id === action.payload.id)
        ? state
        : [...state, action.payload.id];
    default:
      return state;
  }
};

const users = combineReducers({
  byIds,
  allIds,
});

export const getAllUsers = (state) => {
  return state.users.allIds.map((id) => {
    return state.users.byIds[id];
  });
};

export const getUserByUsername = (state, username) => {
  return getAllUsers(state).find((u) => u.username === username);
};

export const getUserById = (state, id) => {
  return state.users.byIds[id];
};

export const getSearchedUserById = (state, id) =>{
  return state.search.find(u => u.id === id);
}

export const getContacts = (state) => {
  return getAllUsers(state).filter((u) => !!u.contactId);
};

export const getContactIds = (state) => {
  return state.users.allIds.filter((id) => {
    const user = state.users.byIds[id];
    return user ? !!user.contactId : false
  }).sort((a,b)=> a.alias > b.alias);
};

export const sortAlphabetically=(state, userIds=[])=>{
  const byIds = state.users.byIds;
  return userIds.sort(
    (a,b)=> {
      const aliasA= !!byIds[a] ? !!byIds[a].alias ? byIds[a].alias :  byIds[a].username : "zzzzz";     
      const aliasB= !!byIds[b] ? !!byIds[b].alias ? byIds[b].alias :  byIds[b].username : "zzzzz";
      return aliasA > aliasB
    }
    
    )
}

export default combineReducers({ search, users });

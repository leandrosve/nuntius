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
      return { ...state, [action.payload.id]: action.payload };
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

const loadingUsers = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.FETCH_USER_FAILURE:
      return false;
    case actionTypes.FETCH_USER_REQUEST:
      return true;
    default:
      return state;
  }
};

const users = combineReducers({
  byIds,
  allIds,
  loading: loadingUsers,
});

export const getAllUsers = (state) => {
  console.log(JSON.stringify(state));
  return state.users.allIds.map((id) => {
    return state.users.byIds[id];
  });
};

export const getUserByUsername = (state, username) => {
  return getAllUsers(state).find((u) => u.username === username);
};

export const getUserById = (state, id) => {
  const user = state.users.byIds[id]
  return user ? user : state.search.find(u => u.id === id)
};

export const getContacts = (state) => {
  return getAllUsers(state).filter((u) => !!u.contactId);
};

export default combineReducers({ search, users });

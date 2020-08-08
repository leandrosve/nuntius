import * as actionTypes from "./contactActionTypes";
import { combineReducers } from "redux";

const contact = (contact, action) => {
  switch (action.type) {
    case actionTypes.EDIT_CONTACT_SUCCESS:
      if (contact.id !== action.payload.id) {
        return contact;
      }
      return {
        ...contact,
        alias: action.payload.alias,
      };
    default:
      return contact;
  }
};

const byUserIds = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTACT_SUCCESS:
      return { ...state, [action.payload.userId]: action.payload };
    case actionTypes.FETCH_CONTACTS_SUCCESS:
      const contacts= action.payload.entities.contacts;
      return contacts ? contacts : state;
    case actionTypes.EDIT_CONTACT_SUCCESS:
      return {
        ...state,
        [action.payload.userId]: contact(state[action.payload.userId], action),
      };
    case actionTypes.DELETE_CONTACT_SUCCESS:
      const { [action.payload.userId]: removed, ...rest } = state;

      return rest;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTACT_SUCCESS:
      return [...state, action.payload.userId];
    case actionTypes.FETCH_CONTACTS_SUCCESS:
      return action.payload.result;
    case actionTypes.DELETE_CONTACT_SUCCESS:
      return state.filter((userId) => userId !== action.payload.userId);
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTACTS_REQUEST:
    case actionTypes.ADD_CONTACT_REQUEST:
    case actionTypes.EDIT_CONTACT_REQUEST:
    case actionTypes.DELETE_CONTACT_REQUEST:
      return true;
    case actionTypes.FETCH_CONTACTS_SUCCESS:
    case actionTypes.FETCH_CONTACTS_FAILURE:
    case actionTypes.EDIT_CONTACT_SUCCESS:
    case actionTypes.ADD_CONTACT_SUCCESS:
    case actionTypes.EDIT_CONTACT_FAILURE:
    case actionTypes.ADD_CONTACT_FAILURE:
    case actionTypes.DELETE_CONTACT_SUCCESS:
    case actionTypes.DELETE_CONTACT_FAILURE:
      return false;

    default:
      return state;
  }
};

const error = (state = "", action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTACTS_REQUEST:
    case actionTypes.FETCH_CONTACTS_SUCCESS:
    case actionTypes.EDIT_CONTACT_REQUEST:
    case actionTypes.EDIT_CONTACT_SUCCESS:
    case actionTypes.ADD_CONTACT_SUCCESS:
    case actionTypes.DELETE_CONTACT_REQUEST:
    case actionTypes.DELETE_CONTACT_SUCCESS:
      return "";
    case actionTypes.FETCH_CONTACTS_FAILURE:
    case actionTypes.EDIT_CONTACT_FAILURE:
    case actionTypes.ADD_CONTACT_FAILURE:
    case actionTypes.DELETE_CONTACT_FAILURE:
      return action.payload;
    default:
      return state;
  }
};

const success = (state = "", action) => {
  switch (action.type) {
    case actionTypes.DELETE_CONTACT_SUCCESS:
      return "success:contact_removed";
    case actionTypes.EDIT_CONTACT_SUCCESS:
      return "success:saved";
    case actionTypes.ADD_CONTACT_SUCCESS:
      return "success:contact_saved";
    default:
      return "";
  }
};

export const getAllContacts = (state) => {
  return state.allIds.map((userId) => {
    return state.byUserIds[userId];
  });
};

export const getContactByUserId = (state, userId) => {
  return state.byUserIds[userId];
};

export const getContactByUsername = (state, username) => {
  return getAllContacts(state).find((c)=> c.username === username)
};

const contactReducer = combineReducers({
  byUserIds,
  allIds,
  isFetching,
  error,
  success,
});

export default contactReducer;

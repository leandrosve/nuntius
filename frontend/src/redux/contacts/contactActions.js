import * as actionTypes from "./contactActionTypes";
import ApiService from "../../ApiService";
import { normalize } from "normalizr";
import * as schema from "../schema";

const fetchContactsRequest = () => ({
  type: actionTypes.FETCH_CONTACTS_REQUEST,
});

const fetchContactsSuccess = (contacts) => ({
  type: actionTypes.FETCH_CONTACTS_SUCCESS,
  payload: contacts,
});

const fetchContactsFailure = (error) => ({
  type: actionTypes.FETCH_CONTACTS_FAILURE,
  payload: error,
});

const editContactRequest = () => ({
  type: actionTypes.EDIT_CONTACT_REQUEST,
});

const editContactSuccess = (contact) => ({
  type: actionTypes.EDIT_CONTACT_SUCCESS,
  payload: contact,
  success:"success:saved"
});

const editContactFailure = (error) => ({
  type: actionTypes.EDIT_CONTACT_FAILURE,
  payload: error,
});

const addContactRequest = () => ({
  type: actionTypes.ADD_CONTACT_REQUEST,
});

const addContactSuccess = (contact) => ({
  type: actionTypes.ADD_CONTACT_SUCCESS,
  payload: contact,
  success:"success:contact_saved"
});

const addContactFailure = (error) => ({
  type: actionTypes.ADD_CONTACT_FAILURE,
  error: error,
});

const deleteContactRequest = () => ({
  type: actionTypes.DELETE_CONTACT_REQUEST,
});

const deleteContactSuccess = (contact) => ({
  type: actionTypes.DELETE_CONTACT_SUCCESS,
  payload: contact,
  success:"success:contact_removed"
});

const deleteContactFailure = (error) => ({
  type: actionTypes.DELETE_CONTACT_FAILURE,
  payload: error,
});

export const contacts = () => {
  return (dispatch) => {
    dispatch(fetchContactsRequest());
    ApiService.get("/contacts")
      .then((response) => {
        const contacts = response.data;
        const normalized = normalize(contacts, schema.arrayOfUsers);
        dispatch(fetchContactsSuccess(normalized));
      })
      .catch((error) => {
        dispatch(fetchContactsFailure(error.message));
      });
  };
};

export const editContact = (user) => {
  return (dispatch) => {
    dispatch(editContactRequest());
    ApiService.patch(`/contacts/${user.contactId}`, { ...user })
      .then((response) => {
        dispatch(editContactSuccess(response.data));
      })
      .catch((error) => {
        dispatch(editContactFailure(error.message));
      });
  };
};

export const addContact = (userId) => {
  return (dispatch) => {
    dispatch(addContactRequest());
    ApiService.post(`/contacts`, { userId: userId })
      .then((response) => {
        dispatch(addContactSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addContactFailure(error.message));
      });
  };
};

export const deleteContact = (contact) => {
  return (dispatch) => {
    dispatch(deleteContactRequest());
    ApiService.delete(`/contacts/${contact.contactId}`)
      .then((response) => {
        dispatch(deleteContactSuccess(response.data));
      })
      .catch((error) => {
        dispatch(deleteContactFailure(error.message));
      });
  };
};

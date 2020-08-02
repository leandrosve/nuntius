import * as actionTypes from "./contactActionTypes";
import ApiService from "../../ApiService";
import { normalize } from "normalizr";
import * as schema from "../schema";

export const fetchContactsRequest = () => ({
  type: actionTypes.FETCH_CONTACTS_REQUEST,
});

export const fetchContactsSuccess = (contacts) => ({
  type: actionTypes.FETCH_CONTACTS_SUCCESS,
  payload: contacts,
});

export const fetchContactsFailure = (error) => ({
  type: actionTypes.FETCH_CONTACTS_FAILURE,
  payload: error,
});

export const editContactRequest = () => ({
  type: actionTypes.EDIT_CONTACT_REQUEST,
});

export const editContactSuccess = (contact) => ({
  type: actionTypes.EDIT_CONTACT_SUCCESS,
  payload: contact,
});

export const editContactFailure = (error) => ({
  type: actionTypes.EDIT_CONTACT_FAILURE,
  payload: error,
});

export const addContactRequest = () => ({
  type: actionTypes.ADD_CONTACT_REQUEST,
});

export const addContactSuccess = (contact) => ({
  type: actionTypes.ADD_CONTACT_SUCCESS,
  payload: contact,
});

export const addContactFailure = (error) => ({
  type: actionTypes.ADD_CONTACT_FAILURE,
  payload: error,
});

export const deleteContactRequest = () => ({
  type: actionTypes.DELETE_CONTACT_REQUEST,
});

export const deleteContactSuccess = (contact) => ({
  type: actionTypes.DELETE_CONTACT_SUCCESS,
  payload: contact,
});

export const deleteContactFailure = (error) => ({
  type: actionTypes.DELETE_CONTACT_FAILURE,
  payload: error,
});

export const contacts = () => {
  return (dispatch) => {
    dispatch(fetchContactsRequest());
    ApiService.get("/contacts")
      .then((response) => {
        const contacts = response.data;
        const normalized = normalize(contacts, schema.arrayOfContacts);
        console.log(
          normalized
        );
        dispatch(fetchContactsSuccess(normalized));
      })
      .catch((error) => {
        dispatch(fetchContactsFailure(error.message));
      });
  };
};

export const editContact = (contact) => {
  return (dispatch) => {
    dispatch(editContactRequest());
    ApiService.patch(`/contacts/${contact.id}`, { ...contact })
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
    ApiService.post(`/contacts`, {userId:userId})
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
    ApiService.delete(`/contacts/${contact.id}`)
      .then(() => {   
        dispatch(deleteContactSuccess(contact));
      })
      .catch((error) => {
        dispatch(deleteContactFailure(error.message));
      });
  };
};

import * as actionTypes from "./contactActionTypes";
import axios from "axios";
import ApiService from "../../ApiService"

export const fetchContactsRequest= () =>{
    return{      
        type: actionTypes.FETCH_CONTACTS_REQUEST
    }
}

export const fetchContactsSuccess= contacts =>{
    return {
        type: actionTypes.FETCH_CONTACTS_SUCCESS,
        payload: contacts
    }
}

export const fetchContactsFailure= (error) =>{
    return {
        type: actionTypes.FETCH_CONTACTS_FAILURE,
        payload:error
    }
}

export const contacts = () => {
  return (dispatch) => {
    dispatch(fetchContactsRequest());
    ApiService
      .get("/contacts")
      .then((response) => {
        const contacts = response.data;
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((errorMsg) => {
        let error;
        if (errorMsg.response) {
          error = errorMsg.response.data.message;
        } else {
          error = errorMsg.message;
        }
        dispatch(fetchContactsFailure(error));
      });
  };
};

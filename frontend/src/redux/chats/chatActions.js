import * as actionTypes from "./chatActionTypes";
import ApiService from "../../ApiService";
import { normalize } from "normalizr";
import * as schema from "../schema";

export const fetchChatsRequest = () => ({
    type: actionTypes.FETCH_CHATS_REQUEST,
  });
  
  export const fetchChatsSuccess = (chats) => ({
    type: actionTypes.FETCH_CHATS_SUCCESS,
    payload: chats,
  });
  
  export const fetchChatsFailure = (error) => ({
    type: actionTypes.FETCH_CHATS_FAILURE,
    payload: error,
  });


  export const chats = () => {
    return (dispatch) => {
      dispatch(fetchChatsRequest());
      ApiService.get("/chats")
        .then((response) => {
          const normalized = normalize(response.data, schema.arrayOfChats);        
          dispatch(fetchChatsSuccess(normalized));
        })
        .catch((error) => {
          dispatch(fetchChatsFailure(error.message));
        });
    };
  };
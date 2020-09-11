import { EDIT_PROFILE_SUCCESS, SET_USER_AVATAR } from "../user/userActionTypes";
import * as actionTypes from "./sessionActionTypes";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
  authenticated: !!localStorage.getItem("user"),
  refreshTokenTimestamp: localStorage.getItem("refreshTokenTimestamp")
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AVATAR:
      if(action.payload.id === state.currentUser.id)
        return{
          ...state,
          currentUser: { ...state.currentUser, ...action.payload },       
        };
      else return state;
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload }
      };

    case actionTypes.CLEAN_SESSION_ERRORS:
      return {
        ...state,
      };
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
      };
    case actionTypes.LOGIN_SUCCESS:    
    case actionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        authenticated: true,
        refreshTokenTimestamp:action.payload.refreshTokenTimestamp,
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        currentUser: null,
        authenticated: false,
        refreshTokenTimestamp: null,
      };
    case actionTypes.LOGOUT:   
    case actionTypes.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        currentUser: {},
        authenticated: false,     
        refreshTokenTimestamp: null,
      };
    default:
      return state;
  }
};

export default sessionReducer;

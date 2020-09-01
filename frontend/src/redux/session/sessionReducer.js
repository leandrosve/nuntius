import * as actionTypes from "../user/userActionTypes";
import { user } from "../schema";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
  success: "",
  authenticated: !!localStorage.getItem("user"),
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_AVATAR:
      if(action.payload.id === state.currentUser.id)
        return{
          ...state,
          currentUser: { ...state.currentUser, ...action.payload },       
        };
      else return state;
    case actionTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        success: "success:saved",
      };

    case actionTypes.CLEAN_SESSION_ERRORS:
      return {
        ...state,
        success: "",
      };
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
      };
    case actionTypes.LOGIN_SUCCESS:    
      return {
        ...state,
        currentUser: action.payload,
        authenticated: true,
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        currentUser: null,
        authenticated: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: {},
        authenticated: false,
      };
    default:
      return state;
  }
};

export default sessionReducer;

import * as actionTypes from "./userActionTypes";
import { combineReducers } from "redux";

const initialState = {
  session: {
    loading: false,
    currentUser: JSON.parse(localStorage.getItem("user")),
    error: "",
    authenticated: !!localStorage.getItem("user"),
    jwtToken: JSON.parse(localStorage.getItem("jwtToken")),
  },
  signUp: {
    loading: false,
    success: "",
    error: "",
  },
};

const session = (state = initialState.session, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("jwtToken", JSON.stringify(action.payload.jwtToken));
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: "",
        authenticated: true,
      };

    case actionTypes.LOGIN_FAILURE:
      localStorage.removeItem("user");
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        error: action.payload,
        loading: false,
        currentUser: null,
        authenticated: false,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        currentUser: {},
        authenticated: false,
      };
    default:
      return state;
  }
};

const signUp = (state = initialState.signUp, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        sucess: action.payload,
        error: "",
      };

    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: "",
      };
    default:
      return state;
  }
};

const search = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SEARCH_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};






export default combineReducers({signUp, session, search});

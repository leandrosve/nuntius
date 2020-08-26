import * as actionTypes from "./userActionTypes";
import { combineReducers } from "redux";

const initialState = {
  session: {
    loading: false,
    currentUser: JSON.parse(localStorage.getItem("user")),
    error: "",
    success: "",
    authenticated: !!localStorage.getItem("user")
  },
  signUp: {
    loading: false,
    success: "",
    error: "",
  },
  users: {
    byIds: {},
    allIds: [],
    loading: false,
  },
};

const session = (state = initialState.session, action) => {
  switch (action.type) {

    case actionTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser:{...state.currentUser, ...action.payload},
        success:"success:saved"
      };

    case actionTypes.CLEAN_SESSION_ERRORS:
      return{
        ...state,
        loading:false,
        error:"",
        success:"",
      }
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
        sucess: "success:signup",
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

const byIds = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.ADD_USER:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
      return [...state, action.payload.id];
    case actionTypes.ADD_USER:
      return state.find(id=> id === action.payload.id) ? state : [...state,action.payload.id ];
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
  return state.allIds.map((id) => {
    return state.byIds[id];
  });
};

export const getUserByUsername = (state, username) => {
  return getAllUsers(state).find((u) => u.username === username);
};

export const getUserById = (state, id) => {
  return state.users.byIds[id];
};

export default combineReducers({ signUp, session, search, users });

import * as actionTypes from "./userActionTypes";
import ApiService from "../../ApiService";
import { openLogin } from "../modal/modalActions";
import { getUserById } from "./userReducer";

export const signupRequest = () => {
  return {
    type: actionTypes.SIGNUP_REQUEST,
  };
};

export const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    success: "success:signup",
  };
};

export const signupFailure = (error) => {
  return {
    type: actionTypes.SIGNUP_FAILURE,
    error: error,
  };
};

export const searchUsersRequest = () => {
  return {
    type: actionTypes.SEARCH_USERS_REQUEST,
  };
};

export const searchUsersSuccess = (users) => {
  return {
    type: actionTypes.SEARCH_USERS_SUCCESS,
    payload: users,
  };
};

export const searchUsersFailure = (error) => {
  return {
    type: actionTypes.SEARCH_USERS_FAILURE,
    error: error,
  };
};

export const fetchUserRequest = () => {
  return {
    type: actionTypes.FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAILURE,
    error: error,
  };
};

export const fetchUsersRequest = () => {
  return {
    type: actionTypes.FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAILURE,
    error: error,
  };
};

export const addUser = (user) => {
  return {
    type: actionTypes.ADD_USER,
    payload: user,
  };
};

export const signUp = (username, password, name, email) => {
  return (dispatch) => {
    dispatch(signupRequest());
    ApiService.post("/signup", { username, password, name, email })
      .then(() => {
        dispatch(signupSuccess());
        dispatch(openLogin({ success: "success:signup" }));
      })
      .catch((error) => {
        dispatch(signupFailure(error.message));
      });
  };
};



export const searchUsers = (someString) => {
  return (dispatch) => {
    dispatch(searchUsersRequest());
    ApiService.get(`/users/search?q=${someString}`)
      .then((response) => {
        dispatch(searchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(searchUsersFailure(error.message));
      });
  };
};

export const fetchUserByUsername = (username) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    ApiService.get(`/user?username=${username}`)
      .then((response) => {
        dispatch(fetchUserSuccess(response.data));
        dispatch(fetchProfileImage(response.data.id));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

export const fetchUserById = (id) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    ApiService.get(`/users/${id}`)
      .then((response) => {
        dispatch(fetchUserSuccess(response.data));
        dispatch(fetchProfileImage(id));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

export const fetchUsersById = (ids = []) => {
  return (dispatch, getState) => {
    const users = getState().user;
    const currentUserId = getState().session.currentUser.id;
    dispatch(fetchUsersRequest());
    ids.filter(id => id !== currentUserId).forEach((id) => {
      
     
      if (!getUserById(users, id))
        dispatch(fetchUserById(id));
    });
    dispatch(fetchUsersSuccess());
  };
};

export const fetchProfileImage = (userId) => {
  return (dispatch) => {
    ApiService.getProfileImage(userId).then((avatar) => {
      dispatch({
        type: actionTypes.SET_USER_AVATAR,
        payload: { id: userId, avatar: avatar },
      });
    });
  };
};

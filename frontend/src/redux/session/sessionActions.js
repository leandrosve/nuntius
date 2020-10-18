import * as actionTypes from './sessionActionTypes';
import ApiService from "../../ApiService";
import { hideModal } from '../modal/modalActions';
import i18next from 'i18next';
import { EDIT_PROFILE_FAILURE, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS } from '../user/userActionTypes';

export const login= (username, password) =>{
    return (dispatch) => {
        dispatch(loginRequest());
        ApiService.post("/authenticate", {username, password })
            .then(response => {
                const timestamp =Date.now() +(1*60*60*1000);
                const user = response.data;
                setStorage(user, user.jwtToken, timestamp)               
                dispatch(hideModal());
                dispatch(loginSuccess({user:user, refreshTokenTimestamp:timestamp}));
            })
            .catch(
                error => {
                    clearStorage();
                    dispatch(loginFailure(error.message))
                }
            )               
    }
}

export const refreshToken= () =>{
    return (dispatch, getState) => {
        const currentUser = getState().session.currentUser;
        dispatch(refreshTokenRequest());
        ApiService.post("/authenticate/refresh", {username:currentUser.username, jwtToken:currentUser.jwtToken })
            .then(response => {
                const timestamp =Date.now() +(1*60*60*1000);
                const user = response.data;
                setStorage(user, user.jwtToken, timestamp)                             
                dispatch(refreshTokenSuccess({user:user, refreshTokenTimestamp:timestamp}));
            })
            .catch(
                error => {
                    clearStorage();
                    dispatch(refreshTokenFailure(i18next.t("error:session_expired")))
                }
            )               
    }
}

export const editProfile = (name, biography, avatar) => {
    return (dispatch) => {
      dispatch(editProfileRequest());
      ApiService.patch("/profile", { name, biography })
        .then((response) => {
          if (avatar) {
            ApiService.putProfileImage(avatar).then((avatarURL) =>
              dispatch(editProfileSuccess({ avatar: avatarURL }))
            );
          } else {
            const user =JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user", JSON.stringify({...user, ...response.data}));
            dispatch(editProfileSuccess(response.data));
          }
        })
        .catch((error) => {
          dispatch(editProfileFailure(error.message));
        });
    };
  };

export const editProfileRequest = () => { 
    return {
      type: EDIT_PROFILE_REQUEST,
    };
  };
  
  export const editProfileSuccess = (user) => {
    return {
      type: EDIT_PROFILE_SUCCESS,
      payload: user,
      success: "success:saved",
    };
  };
  
  export const editProfileFailure = (error) => {
    return {
      type: EDIT_PROFILE_FAILURE,
      error: error,
    };
  };

const clearStorage = () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshTokenTimestamp");
}

const setStorage = (user, jwtToken, timestamp)=>{
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("jwtToken", JSON.stringify(jwtToken));
    localStorage.setItem("refreshTokenTimestamp", timestamp );
}


export const loginRequest= () =>{
    return{      
        type: actionTypes.LOGIN_REQUEST
    }
}


export const loginSuccess= session =>{
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: session
    }
}

export const loginFailure= (error) =>{
    return {
        type: actionTypes.LOGIN_FAILURE,
        error:error
    }
}


export const refreshTokenRequest= () =>{
    return{      
        type: actionTypes.REFRESH_TOKEN_REQUEST
    }
}


export const refreshTokenSuccess= session =>{
    return {
        type: actionTypes.REFRESH_TOKEN_SUCCESS,
        payload: session
    }
}

export const refreshTokenFailure= (error) =>{
    return {
        type: actionTypes.REFRESH_TOKEN_FAILURE,
        error:error
    }
}

export const logout= () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    
    localStorage.removeItem("refreshTokenTimestamp");
    return {
        type: actionTypes.LOGOUT
    }
}

export const clearSessionErrors= () =>{
    return {
        type: actionTypes.CLEAN_SESSION_ERRORS,
    }
}

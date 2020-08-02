import * as actionTypes from './userActionTypes';
import ApiService from "../../ApiService";

export const loginRequest= () =>{
    return{      
        type: actionTypes.LOGIN_REQUEST
    }
}

export const loginSuccess= user =>{
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: user
    }
}

export const loginFailure= (error) =>{
    return {
        type: actionTypes.LOGIN_FAILURE,
        payload:error
    }
}

export const logout= () =>{
    return {
        type: actionTypes.LOGOUT
    }
}

export const signupRequest= () =>{
    return{      
        type: actionTypes.SIGNUP_REQUEST
    }
}

export const signupSuccess= () =>{
    return {
        type: actionTypes.SIGNUP_SUCCESS,
    }
}

export const signupFailure= (error) =>{
    return {
        type: actionTypes.SIGNUP_FAILURE,
        payload:error
    }
}

export const searchUsersRequest= () =>{
    return{      
        type: actionTypes.SEARCH_USERS_REQUEST
    }
}

export const searchUsersSuccess= (users) =>{
    return {
        type: actionTypes.SEARCH_USERS_SUCCESS,
        payload:users
    }
}

export const searchUsersFailure= (error) =>{
    return {
        type: actionTypes.SEARCH_USERS_FAILURE,
        payload:error
    }
}



export const login= (username, password) =>{
    return (dispatch) => {
        dispatch(loginRequest());
        ApiService.post("/authenticate", {username, password })
            .then(response => {
                const user = response.data;
                dispatch(loginSuccess(user));
            })
            .catch(
                error => {
             
                    dispatch(loginFailure(error.message))
                }
            )
                
    }
}

export const signUp= (username, password, name, email) =>{
    return (dispatch) => {
        dispatch(signupRequest());
        ApiService.post("/signup", {username, password,  name ,email})
            .then(() => {
                dispatch(signupSuccess());
            })
            .catch(
                error => {              
                    dispatch(signupFailure(error.message))
                }
            )
                
    }
}

export const searchUsers= (someString) =>{
    return (dispatch) => {
        dispatch(searchUsersRequest());
        ApiService.get(`/users/search?q=${someString}`)
            .then((response) => {
                dispatch(searchUsersSuccess(response.data));
            })
            .catch(
                error => {              
                    dispatch(searchUsersFailure(error.message))
                }
            )
                
    }
}

import * as actionTypes from './userActionTypes';
import ApiService from "../../ApiService";
import { hideModal, openLogin } from '../modal/modalActions';

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

export const fetchUserRequest= () =>{
    return {
        type: actionTypes.FETCH_USER_REQUEST,
    }
}

export const fetchUserSuccess= (user) =>{
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        payload:user
    }
}

export const fetchUserFailure= (error) =>{
    return {
        type: actionTypes.FETCH_USER_FAILURE,
        payload:error
    }
}



export const login= (username, password) =>{
    return (dispatch) => {
        dispatch(loginRequest());
        ApiService.post("/authenticate", {username, password })
            .then(response => {
                const user = response.data;
                dispatch(hideModal());
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
                dispatch(openLogin({success:"success:signUp"}));
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

export const fetchUserByUsername= (username) =>{
    return (dispatch) => {
        dispatch(fetchUserRequest());
        ApiService.get(`/user?username=${username}`)
            .then((response) => {
                dispatch(fetchUserSuccess(response.data));
            })
            .catch(
                error => {              
                    dispatch(fetchUserFailure(error.message))
                }
            )
                
    }
}

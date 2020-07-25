import * as actionTypes from './userActionTypes';
import axios from "axios";
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

export const login= (username, password) =>{
    return (dispatch) => {
        dispatch(loginRequest());
        ApiService.post("/authenticate", {username, password })
            .then(response => {
                const user = response.data;
                dispatch(loginSuccess(user));
            })
            .catch(
                errorMsg => {
                    let error;
                    if(errorMsg.response){
                       error = errorMsg.response.data.message
                    }else{
                      error = errorMsg.message;                 
                    }
                    dispatch(loginFailure(error))
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
                errorMsg => {
                    let error;
                    if(errorMsg.response){
                       error = errorMsg.response.data.message
                    }else{
                      error = errorMsg.message;                 
                    }
                    dispatch(signupFailure(error))
                }
            )
                
    }
}


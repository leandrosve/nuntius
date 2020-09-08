import * as actionTypes from '../user/userActionTypes';
import ApiService from "../../ApiService";
import { hideModal } from '../modal/modalActions';
import { fetchProfileImage } from '../user/userActions';

export const login= (username, password) =>{
    return (dispatch) => {
        dispatch(loginRequest());
        ApiService.post("/authenticate", {username, password })
            .then(response => {
                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("jwtToken", JSON.stringify(user.jwtToken));
                dispatch(hideModal());
                dispatch(loginSuccess(user));
            })
            .catch(
                error => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("jwtToken");
                    dispatch(loginFailure(error.message))
                }
            )               
    }
}

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
        error:error
    }
}

export const logout= () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    return {
        type: actionTypes.LOGOUT
    }
}

export const clearSessionErrors= () =>{
    return {
        type: actionTypes.CLEAN_SESSION_ERRORS,
    }
}

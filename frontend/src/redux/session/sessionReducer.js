import * as actionTypes from "../user/userActionTypes";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
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

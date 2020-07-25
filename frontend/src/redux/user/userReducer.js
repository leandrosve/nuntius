import * as actionTypes from "./userActionTypes";

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

const userReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        session: {
          ...state.session,
          loading: true,
        },
      };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload)); 
      localStorage.setItem("jwtToken", JSON.stringify(action.payload.jwtToken));
      return {
        ...state,
        session: {
          currentUser: action.payload ,
          loading: false,
          error: "",
          authenticated: true
        },
      };

    case actionTypes.LOGIN_FAILURE:
      localStorage.removeItem("user");
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        session: {
          ...state.session,
          error: action.payload,
          loading: false,
          currentUser:null,
          authenticated: false
        },
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("user");      
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        session: {
          ...state.session,
          currentUser: {},
          authenticated: false,
        },
      };
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          loading: true,
        },
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signUp: {
          loading: false,
          sucess: action.payload,
          error: ''
        },
      };

    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          error: action.payload,
          loading: false,
          success: ''
        },
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        session: {
          ...state.session,
          currentUser: {},
        },
      };

    default:
      return state;
  }
};

export default userReducer;

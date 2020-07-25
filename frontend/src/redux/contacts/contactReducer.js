import * as actionTypes from "./contactActionTypes";

const initialState = {
  contacts: [],
  loading: false,
  isPopulated: false,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_CONTACTS_SUCCESS:     
      return {
       contacts:action.payload,
       loading:false,
       isPopulated:true,
      };

    case actionTypes.FETCH_CONTACTS_FAILURE:
     
      return {
        ...state,
       loading:false,
       isPopulated:true,
      };
    default:
      return state;
  }
};

export default contactReducer;

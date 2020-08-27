import * as actionTypes from "./contactActionTypes";


export const contact = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTACTS_SUCCESS:
      const contacts = action.payload.entities.users;
      return { ...state, ...contacts };
    case actionTypes.ADD_CONTACT_SUCCESS:
    case actionTypes.EDIT_CONTACT_SUCCESS:  
    case actionTypes.DELETE_CONTACT_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };     
    default:
      return state;
  }
};

export default contact;


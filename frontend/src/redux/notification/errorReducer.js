import { omit } from "lodash";
import { CLEAR_ERROR, CLEAR_NOTIFICATIONS } from "./notificationActions";
const errorReducer = (state = {}, action) => {
    
    if (action.type.includes("_REQUEST") || action.type.includes("_SUCCESS")) {
      const requestName = action.type.replace("_SUCCESS", "_REQUEST");
      return omit(state, [requestName]);
    }
   
    if (action.type.includes("_FAILURE")) {
      const requestName = action.type.replace("_FAILURE", "_REQUEST");
      return { ...state, [requestName]: action.error };
    }
    
    if(action.type === CLEAR_ERROR || action.type === CLEAR_NOTIFICATIONS){
        const requestTypes = action.payload;   
        return omit(state, requestTypes);
    }
    return {...state};
  };

export const getRequestError = (state, types) => {
    const errorType =  types.find((type) => !!state[type]);
    return errorType ? state[errorType] : null;
}
  
export default errorReducer;
  
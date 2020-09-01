import { omit } from "lodash";
import { CLEAR_SUCCESS, CLEAR_NOTIFICATIONS } from "./notificationActions";
const successReducer = (state = {}, action) => {
  
    if (action.type.includes("_REQUEST") || action.type.includes("_FAILURE")) {
      const requestName = action.type.replace("_FAILURE", "_REQUEST");;
      return  omit(state, [requestName]);
    }
  
    if (action.type.includes("_SUCCESS")) {
      const requestName = action.type.replace("_SUCCESS", "_REQUEST");
      return { ...state, [requestName]: action.success };
    }
    
    if(action.type === CLEAR_SUCCESS || action.type === CLEAR_NOTIFICATIONS){
        const requestTypes = action.payload;   
        return omit(state, requestTypes);
    }
    return {...state};
  };

export const getRequestSuccessMessage = (state, types) => {
    const requestType =  types.find((type) => !!state[type]);
    return requestType ? state[requestType] : null;
}
  
export default successReducer;
  
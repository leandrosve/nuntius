import { omit } from "lodash";

const loadingReducer = (state = {}, action) => {
  // We only take actions that include 'REQUEST_' in the type.
  let isRequestType = action.type.includes("_REQUEST");

  if (isRequestType) {
    const requestName = action.type;
    return { ...state, [requestName]: true };
  }

  isRequestType = action.type.includes("_SUCCESS") || action.type.includes("_FAILURE") ;

  if (isRequestType) {
    const requestName = action.type.replace("_SUCCESS", "_REQUEST").replace("_FAILURE","_REQUEST");
    return omit( state, [requestName]);
  }

  return {...state};
};

export const isRequestLoading = (state, types) => {
    return types.some((actionType)=> state[actionType]);
}

export default loadingReducer;

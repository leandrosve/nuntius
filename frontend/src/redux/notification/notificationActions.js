export const CLEAR_ERROR="CLEAR_ERROR";
export const CLEAR_SUCCESS="CLEAR_MESSAGES";

export const CLEAR_NOTIFICATIONS="CLEAR_NOTIFICATIONS";

export const clearError = (requestTypes = []) => ({
  type: CLEAR_ERROR,
  payload: requestTypes,
});

export const clearSuccess = (requestTypes = []) => ({
    type: CLEAR_SUCCESS,
    payload: requestTypes,
  });


  export const clearNotifications = (requestTypes = []) =>({
    type: CLEAR_NOTIFICATIONS,
    payload: requestTypes,
  });
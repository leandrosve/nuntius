import * as actionTypes from "./modalActionTypes";  

export const modalContentTypes = {
  CONTACTS : "CONTACTS",
  PROFILE: "PROFILE",
  SETTINGS: "SETTINGS",
  LOGIN: "LOGIN",
  SIGN_UP: "SIGN_UP",
  USER_DETAILS: "USER_DETAILS"
}

export const openModal = (contentType, contentProps) => ({
  type: actionTypes.SHOW_MODAL,
  contentType: contentType,
  contentProps: contentProps
});

export const hideModal = () => ({
  type: actionTypes.HIDE_MODAL,
});

export const openLogin = (props) =>{
  return openModal(modalContentTypes.LOGIN, props);
};

export const openSignUp = (props) =>{
  return openModal(modalContentTypes.SIGN_UP, props);
};

export const openContacts = (props) =>{
  return openModal(modalContentTypes.CONTACTS, props);
};

export const openProfile = (props) =>{
  return openModal(modalContentTypes.PROFILE, props);
};

export const openSettings = (props) =>{
  return openModal(modalContentTypes.SETTINGS, props);
};

export const openUserDetail = (props) =>{
  return openModal(modalContentTypes.USER_DETAILS, props);
};
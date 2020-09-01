import * as actionTypes from "./modalActionTypes";  

export const modalContentTypes = {
  CONTACTS : "CONTACTS",
  PROFILE: "PROFILE",
  SETTINGS: "SETTINGS",
  LOGIN: "LOGIN",
  SIGN_UP: "SIGN_UP",
  USER_DETAILS: "USER_DETAILS",
  MEDIA: "MEDIA",
  GROUP_ADD: "GROUP_ADD",
  GROUP_DETAILS: "GROUP_DETAILS"
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

export const openMedia = (props) =>{
  return openModal(modalContentTypes.MEDIA, props);
};

export const openAddGroup = (props) =>{
  return openModal(modalContentTypes.GROUP_ADD, props);
};

export const openGroupDetail = (props) =>{
  return openModal(modalContentTypes.GROUP_DETAILS, props);
};
import React from "react";

import { connect } from "react-redux";

import {
  editContact,
  deleteContact,
  addContact,
} from "../../redux/contacts/contactActions";
import UserDetail from "./UserDetail";
import { getUserById, getSearchedUserById } from "../../redux/user/userReducer";
import { ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST } from "../../redux/contacts/contactActionTypes";
import { clearNotifications } from "../../redux/notification/notificationActions";

const UserDetailContainer = (props) => {
  return <UserDetail {...props} {...props.user}  />;
};

const mapStateToProps = ({ user }, {userId}) => {
  const u = getUserById(user, userId);
  return { user: u ? u : getSearchedUserById(user, userId) };
};

const mapDispatchToProps = (dispatch) => {
  const concerns = [
    ADD_CONTACT_REQUEST,
    EDIT_CONTACT_REQUEST,
    DELETE_CONTACT_REQUEST,
  ];

  const clearNotificationsAndDispatch = (action) => {
    dispatch(clearNotifications(concerns));
    dispatch(action);
  };

  return {
    clearNotifications: () => {
      dispatch(clearNotifications(concerns));
    },
    editContact: (user) => {
      clearNotificationsAndDispatch(editContact(user));
    },
    deleteContact: (contact) => {
      clearNotificationsAndDispatch(deleteContact(contact));
    },
    addContact: (user) => {
      clearNotificationsAndDispatch(addContact(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailContainer);

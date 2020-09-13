import React, { useEffect } from "react";

import { connect } from "react-redux";

import {
  editContact,
  deleteContact,
  addContact,
} from "../../redux/contacts/contactActions";
import UserDetail from "./UserDetail";
import { getUserById, getSearchedUserById } from "../../redux/user/userReducer";
import { ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST } from "../../redux/contacts/contactActionTypes";
import SmartAlert from "../util/SmartAlert";
import { addUser } from "../../redux/user/userActions";

const UserDetailContainer = ({ shouldAddUser, addUser, user, ...props}) => {

  useEffect(()=>{
    if(shouldAddUser && user){
      addUser(user);
    }
  },[user, shouldAddUser, addUser])

  return (
    <>
      <SmartAlert concerns ={concerns}/>
      <UserDetail {...props} {...user}  />
    </>);
};

const mapStateToProps = ({ user }, {userId}) => {
  const u = getUserById(user, userId);
  const shouldAddUser = !u;
  return { 
    user: u ? u : getSearchedUserById(user, userId),
    shouldAddUser: shouldAddUser
  };
};

const concerns = [
  ADD_CONTACT_REQUEST,
  EDIT_CONTACT_REQUEST,
  DELETE_CONTACT_REQUEST,
];

const mapDispatchToProps = (dispatch) => {

  return {
    editContact: (user) => {
      dispatch(editContact(user))
    },
    deleteContact: (contact) => {
      dispatch(deleteContact(contact))
    },
    addContact: (user) => {
      dispatch(addContact(user));
    },
    addUser: (user) =>{
      dispatch(addUser(user));
      
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailContainer);

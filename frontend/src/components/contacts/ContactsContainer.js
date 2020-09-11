import React from "react";

import Contacts from './Contacts';
import {connect} from "react-redux";
import {editContact, deleteContact, addContact} from "../../redux/contacts/contactActions";
import { useTranslation } from "react-i18next";
import { getContacts, getUserById, getContactIds, getSearchedUserById } from "../../redux/user/userReducer";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { FETCH_CONTACTS_REQUEST, ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST } from "../../redux/contacts/contactActionTypes";

const ContactsContainer = (props) =>{
  const {success} = props;
    
    const { t } = useTranslation();  

    return (
        <Contacts 
        {...props}
        success={t(success)}/>
    )
}
 
  const mapDispatchToProps = () =>  {

    return {  
      editContact: (user) => {editContact(user)},
      deleteContact: (contact) => {deleteContact(contact)},
      addContact: (user) => {addContact(user)},
    }
  }

  const mapStateToProps = ({ user, loading}) => {
    const concerns = [FETCH_CONTACTS_REQUEST, ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST];
    
    return {
      contacts: getContacts(user),
      contactIds: getContactIds(user),
      loading: isRequestLoading(loading, concerns),
      getUserById: (id) => { const u = getUserById(user, id); return  u ? u : getSearchedUserById(user, id)}
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
  
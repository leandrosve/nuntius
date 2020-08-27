import React, { useEffect } from "react";

import Contacts from './Contacts';
import {connect} from "react-redux";
import {editContact, deleteContact, addContact} from "../../redux/contacts/contactActions";
import { useTranslation } from "react-i18next";
import { getContacts, getUserById } from "../../redux/user/userReducer";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { FETCH_CONTACTS_REQUEST, ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST } from "../../redux/contacts/contactActionTypes";
import { getRequestError } from "../../redux/notification/errorReducer";
import { getRequestSuccessMessage } from "../../redux/notification/successReducer";
import { clearNotifications } from "../../redux/notification/notificationActions";

const ContactsContainer = (props) =>{
  const {success, clearNotifications} = props;
    
    const { t } = useTranslation();

    useEffect(()=>{clearNotifications()},[clearNotifications])
    

    return (
        <Contacts 
        {...props}
        success={t(success)}/>
    )
}
 
  const mapDispatchToProps = dispatch =>  {
    const concerns = [FETCH_CONTACTS_REQUEST, ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST];
    const clearNotificationsAndDispatch = (action) => {
      dispatch(clearNotifications(concerns));
      dispatch(action);
    }

    return {  
      clearNotifications : () => {dispatch(clearNotifications(concerns))},
      editContact: (user) => {clearNotificationsAndDispatch(editContact(user))},
      deleteContact: (contact) => {clearNotificationsAndDispatch(deleteContact(contact))},
      addContact: (user) => {clearNotificationsAndDispatch(addContact(user))},
    }
  }

  const mapStateToProps = ({ user, loading, error, success}) => {
    const concerns = [FETCH_CONTACTS_REQUEST, ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST];
    return {
      contacts: getContacts(user),
      loading: isRequestLoading(loading, concerns),
      error: getRequestError(error, concerns),
      success: getRequestSuccessMessage(success, concerns),
      getUserById: (id) => getUserById(user, id)
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
  
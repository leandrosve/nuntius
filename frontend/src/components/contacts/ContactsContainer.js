import React, {useEffect} from "react";

import Contacts from './Contacts';
import {connect} from "react-redux";
import {contacts, editContact, deleteContact, addContact} from "../../redux/contacts/contactActions";
import {getContactByUserId, getAllContacts} from "../../redux/contacts/contactReducer";
import { useTranslation } from "react-i18next";

const ContactsContainer = (props) =>{
  const {fetchContacts, success} = props;
  const [isPopulated, setIsPopulated] = React.useState(false);
    useEffect(() => {
        if(!isPopulated){
          setIsPopulated(false);
          fetchContacts();
          }; 
     },[isPopulated, fetchContacts]);

    const { t } = useTranslation();

    
   
    return (
        <Contacts 
        {...props}
        success={t(success)}/>
    )
}
 
  const mapDispatchToProps = dispatch =>  {
    return {
      fetchContacts: () => dispatch(contacts()),
      editContact: (contact) => dispatch(editContact(contact)),
      deleteContact: (contact) => dispatch(deleteContact(contact)),
      addContact: (user) => dispatch(addContact(user)),
    }
  }

  const mapStateToProps = ({ contact }) => {
    
    return {
      contacts: getAllContacts(contact),
      loading: contact.isFetching,
      error: contact.error,
      success:contact.success,
      getContactByUserId: (userId) => getContactByUserId(contact, userId)
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
  
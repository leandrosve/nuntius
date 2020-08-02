import React from "react";

import {connect} from "react-redux";
import {editContact, deleteContact, addContact} from "../../redux/contacts/contactActions";
            
import {getContactByUserId} from "../../redux/contacts/contactReducer";
import ContactDetail from "../contacts/ContactDetail";

const UserDetailContainer = (props) => {
  const {user,  ...params } = props;
  return (
   
   <ContactDetail {...params}  />
   
  );
};

const mapStateToProps = ({ contact }, {user}) => {
    const c = getContactByUserId(contact, user.id)
    let isContact = false;
    if(c){
      isContact = true;
      return {...c}
    }
    else{
      return {...user, isContact}
    }
  
};

export default connect(mapStateToProps, null )(UserDetailContainer);



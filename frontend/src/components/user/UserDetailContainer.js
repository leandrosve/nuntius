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
    if(c){    
      return  {...c, isContact :true}
    }
    else{
      return {...user, isContact: false}
    }
  
};

const mapDispatchToProps = (dispatch) =>({
  editContact: (contact) => dispatch(editContact(contact)),
    deleteContact: (contact) => dispatch(deleteContact(contact)),
    addContact: (user) => dispatch(addContact(user)),


})

export default connect(mapStateToProps, mapDispatchToProps )(UserDetailContainer);



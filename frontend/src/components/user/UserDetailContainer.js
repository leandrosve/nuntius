import React from "react";

import {connect} from "react-redux";
            
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
      return {...c, isContact :true}
    }
    else{
      return {...user, isContact: false}
    }
  
};

export default connect(mapStateToProps, null )(UserDetailContainer);



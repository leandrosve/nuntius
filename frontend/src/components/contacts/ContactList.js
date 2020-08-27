import React from "react";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import ContactListItem from "./ContactListItem";

const ContactList = ({
  deleteContact,
  onClickContact,
  handleClose,
  contacts,
}) => {
  return (
    <React.Fragment>
      {contacts.map((contact) => {
        return (
          <div key={contact.id} onClick={() => {onClickContact(contact)}}>
            <ContactListItem
              avatar={profilePicPlaceholder}
              {...contact}
              deleteContact={()=>deleteContact(contact)}
              handleClose={handleClose}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default React.memo(ContactList);

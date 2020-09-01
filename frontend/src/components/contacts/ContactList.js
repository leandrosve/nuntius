import React from "react";
import UserListItem from "../user/UserListItem";
import DeleteContactButton from "./DeleteContactButton";
import StartChatButton from "../chat/StartChatButton";

//sort((a,b)=>a.alias > b.alias)
const ContactList = ({
  onClickContact,
  contactIds,
}) => {
  return (
    <>
      {contactIds.map((userId) => {
        return (
            <UserListItem
              key={userId}
              userId={userId}
              handleClick={() => {onClickContact(userId)}}
              actions={
                <>
                <StartChatButton 
                  userId={userId} 
                 />
                <DeleteContactButton contactUserId={userId}/>
                </>
              }
            />
          
        );
      })}
    </>
  );
};

export default React.memo(ContactList);

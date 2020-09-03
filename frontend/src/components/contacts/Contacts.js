import React from "react";

import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import WideCloseButton from "../util/WideCloseButton";
import TitledContainer from "../util/TitledContainer";
import { useTranslation } from "react-i18next";
import ContactList from "./ContactList";
import AddContact from "./AddContact";

import CircularProgress from "@material-ui/core/CircularProgress";
import UserDetailContainer from "../user/UserDetailContainer";
import SmartAlert from "../util/SmartAlert";
import { FETCH_CONTACTS_REQUEST, ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST } from "../../redux/contacts/contactActionTypes";


const concerns = [FETCH_CONTACTS_REQUEST, ADD_CONTACT_REQUEST, EDIT_CONTACT_REQUEST, DELETE_CONTACT_REQUEST];

function Contacts({
  handleClose,
  contacts = [],
  deleteContact,
  contactIds = [],
  loading,
}) {
  const { t } = useTranslation();

  const [openAddContact, setOpenAddContact] = React.useState(false);

  const [userDetail, setContactDetail] = React.useState({
    open: false,
    userId: null,
  });

  const handleOpenContactDetail = React.useCallback((userId) => {
    setContactDetail({ open: true, userId:userId });
  }, []);

  const handleUserSearchClick = React.useCallback(
    (userId) => {
      setContactDetail({ open: true, userId: userId });
    },
    [setContactDetail]
  );

  return (
    <TitledContainer
      title={t("contacts")}
      icon={<GroupIcon />}
      actions={
        <IconButton
          color="primary"
          aria-label="add"
          onClick={() => setOpenAddContact(true)}
        >
          <AddIcon />
        </IconButton>
      }
      fixedContent={
        <React.Fragment>
          {(openAddContact || (!loading && contacts.length === 0)) && (
            <>
              <AddContact handleUserSearchClick={handleUserSearchClick} />
              <WideCloseButton onClick={() => setOpenAddContact(false)} />
            </>
          )}

          <SmartAlert concerns={concerns}/>

          {userDetail.open && userDetail.userId && (
            <>
              <UserDetailContainer
                userId={userDetail.userId}
                handleClose={handleClose}                
              />
              <WideCloseButton
                onClick={() => setContactDetail({ open: false })}
              />
            </>
          )}
        </React.Fragment>
      }
    >
      {loading && <CircularProgress color="secondary" />}
      <ContactList
        contacts={contacts}
        contactIds={contactIds}
        handleClose={handleClose}
        deleteContact={deleteContact}
        onClickContact={handleOpenContactDetail}
      />   
    </TitledContainer>
  );
}

export default Contacts;

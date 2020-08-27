import React from "react";

import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import WideCloseButton from "../util/WideCloseButton";
import TitledContainer from "../util/TitledContainer";
import { useTranslation } from "react-i18next";
import Alert from "../util/Alert";
import ContactList from "./ContactList";
import AddContact from "./AddContact";

import CircularProgress from "@material-ui/core/CircularProgress";
import UserDetailContainer from "../user/UserDetailContainer";

function Contacts({
  handleClose,
  contacts = [],
  loading,
  deleteContact,
  error,
  success,
  clearNotifications,
}) {
  const { t } = useTranslation();

  const [openAddContact, setOpenAddContact] = React.useState(false);

  const [userDetail, setContactDetail] = React.useState({
    open: false,
    user: null,
  });

  const handleOpenContactDetail = React.useCallback((contact) => {
    setContactDetail({ open: true, user:contact });
  }, []);

  const handleUserSearchClick = React.useCallback(
    (user) => {
      setContactDetail({ open: true, user: user });
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
          <Alert
            open={!loading && (!!error || !!success)}
            severity={error? "error" : "success"}
            onClick={() => clearNotifications()}
          >
            {error || success}
          </Alert>

          {userDetail.open && userDetail.user && (
            <>
              <UserDetailContainer
                user={userDetail.user}
                handleClose={handleClose}
                {...userDetail.user}                        
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
        handleClose={handleClose}
        deleteContact={deleteContact}
        onClickContact={handleOpenContactDetail}
      />   
    </TitledContainer>
  );
}

export default Contacts;

import React, { useEffect } from "react";

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
  error,
  success,
}) {
  const { t } = useTranslation();

  const [openAlert, setOpenAlert] = React.useState(true);

  const [openAddContact, setOpenAddContact] = React.useState(false);

  const [userDetail, setContactDetail] = React.useState({
    open: false,
    user: null,
  });

  const handleOpenContactDetail = React.useCallback((contact) => {
    setContactDetail({ open: true, user: { id: contact.userId, username: contact.username, name: contact.name } });
  }, []);

  const handleUserSearchClick = React.useCallback(
    (user) => {
      setContactDetail({ open: true, user: user });
    },
    [setContactDetail]
  );

  useEffect(() => setOpenAlert(true), [setOpenAlert, error, success, contacts]);
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
            open={openAlert && !loading && (error !== "" || success !== "")}
            severity={error !== "" ? "error" : "success"}
            onClick={() => setOpenAlert(false)}
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
        onClickContact={handleOpenContactDetail}
      />   
    </TitledContainer>
  );
}

export default Contacts;

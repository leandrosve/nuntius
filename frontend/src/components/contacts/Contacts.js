import React, { useEffect } from "react";

import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ConfirmationDialog from "../util/ConfirmationDialog";

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
  editContact,
  addContact,
  deleteContact,
  success,
}) {
  const { t } = useTranslation();

  const [deleteDialog, setDeleteDialog] = React.useState({
    open: false,
    contact: null,
    title: "",
  });

  const [openAlert, setOpenAlert] = React.useState(true);

  const [openAddContact, setOpenAddContact] = React.useState(false);

  const [userDetail, setContactDetail] = React.useState({
    open: false,
    user: null,
  });

  const handleOpenContactDetail = React.useCallback((contact) => {
    setContactDetail({ open: true, user: { id: contact.userId } });
  }, []);

  const onRemoveContact = React.useCallback(
    (contact) => {
      let title = t("confirmation:contact_delete", { name: contact.alias });
      setDeleteDialog({ open: true, title: title, contact: contact });
    },
    [t]
  );

  const confirmDeleteContact = () => {
    if (userDetail.open && deleteDialog.contact.id === userDetail.user.id) {
      setContactDetail({ open: false, user: null });
    }
    deleteContact(deleteDialog.contact);
  };

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
                editContact={editContact}
                addContact={addContact}
                onRemoveContact={onRemoveContact}
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
        onRemoveContact={onRemoveContact}
        onClickContact={handleOpenContactDetail}
      />

      <ConfirmationDialog
        open={deleteDialog.open}
        handleCancel={() => setDeleteDialog({ open: false })}
        handleAccept={confirmDeleteContact}
        title={deleteDialog.title}
        handleClose={() => handleClose()}
      />
    </TitledContainer>
  );
}

export default Contacts;

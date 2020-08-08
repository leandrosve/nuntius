import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { deleteContact } from "../../redux/contacts/contactActions";
import ConfirmationDialog from "../util/ConfirmationDialog";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useTranslation } from "react-i18next";
import { contactType } from "../../types";
import {func} from "prop-types";

const DeleteContactButton = ({ deleteContact, contact }) => {

 const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
 const { t } = useTranslation();
  return (
    <React.Fragment>
        <ConfirmationDialog
            open={openConfirmDialog}
            handleCancel={() => setOpenConfirmDialog(false)}
            handleAccept={()=>deleteContact(contact)}
            title={t("confirmation:contact_delete", { name: contact.alias })}
            handleClose={() => setOpenConfirmDialog(false)}
      />
      <IconButton
        onClick={() => setOpenConfirmDialog(true)}
        aria-label="delete contact"
        component="span"
        >
        <DeleteOutlineIcon />
      </IconButton>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: (contact) => dispatch(deleteContact(contact)),
  };
};

DeleteContactButton.propTypes = {
  contact: contactType,
  deleteContact: func.isRequired,
}
export default connect(null, mapDispatchToProps)(DeleteContactButton);

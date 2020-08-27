import React from "react";
import IconButton from "@material-ui/core/IconButton";
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
        onClick={(e) => {setOpenConfirmDialog(true); e.stopPropagation()}}
        aria-label="delete contact"
        component="span"
        >
        <DeleteOutlineIcon />
      </IconButton>
    </React.Fragment>
  );
};


DeleteContactButton.propTypes = {
  contact: contactType,
  deleteContact: func.isRequired,
}
export default DeleteContactButton;

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ConfirmationDialog from "../util/ConfirmationDialog";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useTranslation } from "react-i18next";
import {func} from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../redux/user/userReducer";
import {deleteContact as deleteContactAction} from "../../redux/contacts/contactActions";
const DeleteContactButton = ({ contactUserId }) => {

 const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
 const { t } = useTranslation();
 const contact = useSelector(({user})=>getUserById(user, contactUserId));
 const dispatch = useDispatch();
 const deleteContact = ()=>dispatch(deleteContactAction(contact.contactId));
  if(!contact) return;
 

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
  deleteContact: func.isRequired,
}
export default DeleteContactButton;

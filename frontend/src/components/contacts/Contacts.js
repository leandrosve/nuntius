import React, {useCallback} from "react";

import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ConfirmationDialog from "../util/ConfirmationDialog";
import TitledContainer from "../util/TitledContainer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useTranslation } from "react-i18next";
import { Spring } from "react-spring/renderprops";
import Alert from "../util/Alert";
import Button from "@material-ui/core/Button";
import ContactListItem from "./ContactListItem";
import ContactDetail from "./ContactDetail";

function Contacts({handleClose}) {
  const { t } = useTranslation();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState({
    open: false,
    title: "",
  });

  const handleOpenDialog = React.useCallback(name => {
    let title = t("confirmation:contact_delete", { name: name });
    setShowDeleteDialog({ open: true, title: title })},[]);
  
  const handleOpenContactDetail= React.useCallback(()=>setOpenContactDetail(true),[])
  const [openSuccessAlert, setOpenSuccesAlert] = React.useState(false);

  const [openAddContact, setOpenAddContact] = React.useState(false);

  const [openContactDetail, setOpenContactDetail] = React.useState(false);

  return (
    <TitledContainer
      title={t("contacts")}
      icon={<GroupIcon />}
      actions={
        <IconButton
          color="primary"
          size="large"
          aria-label="add"
          onClick={() => setOpenAddContact(true)}
        >
          <AddIcon />
        </IconButton>
      }
      fixedContent={
        <React.Fragment>
          {openAddContact && 
            <>
            <AddContact/>
            <Button
            style={{ width: "100%", marginTop: "10px" }}
            color="primary"
            size="large"
            aria-label="close"
            onClick={()=> setOpenAddContact(false)}
          >
            <ExpandLessIcon square />
          </Button>
          </>
          }
          <Alert
            open={openSuccessAlert}
            onClick={() => setOpenSuccesAlert(false)}
          >
            {t("success:contact_removed")}
          </Alert>
          {openContactDetail && 
          <>
            <ContactDetail/>
          
            <Button
            style={{ width: "100%"}}
            color="primary"
            size="large"
            aria-label="close"
            onClick={()=>setOpenContactDetail(false)}
           >
          <ExpandLessIcon square />
        </Button>
        </>}
        </React.Fragment>
      }
    >
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Miguel"
        info="Apaisai lala"
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Francisco Pepe"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ContactListItem
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
        handleClick={handleOpenContactDetail}
        handleClose={handleClose}
      />
      <ConfirmationDialog
        open={showDeleteDialog.open}
        handleCancel={() => setShowDeleteDialog({ open: false })}
        handleAccept={() => setOpenSuccesAlert(true)}
        title={showDeleteDialog.title}
        handleClose={() => handleClose()}
      />
    </TitledContainer>
  );
}

const AddContact = () => {
  const { t } = useTranslation();
  return (
    <Spring
      from={{ opacity: 0, height: "0px" }}
      to={{ opacity: 1, height: "77px" }}
      duration={2500}
    >
      {(props) => (
        <div style={props}>
          <Typography style={{ margin: "5px" }} variant="h5">
            {t("contact_add")}
          </Typography>

          <TextField
            size="small"
            autoFocus="true"
            placeholder={t("username or email")}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
         
        </div>
      )}
    </Spring>
  );
};

export default Contacts;


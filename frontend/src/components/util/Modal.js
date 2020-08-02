import React, {  } from "react";
import "./Util.css";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import MaterialModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import ConfirmationDialog from "./ConfirmationDialog";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: theme.zIndex.modal,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    minHeight: "400px", 
    minWidth: "400px",
    display: "flex",
    flexDirection: "column",
    boxShadow: theme.shadows[5],
    padding:'10px',
    maxHeight: "80vh",

  },
  content: {
    minHeight: "400px",
    overflow: "hidden",
    display:"flex"
  },
  dismissButon: {
    marginLeft: "auto",
  },
}));

const Modal = ({ children, open, handleClose, header, hasCloseButton = true, confirmClose=false}) => {
  const classes = useStyles();

  const [showCloseDialog, setShowCloseDialog] = React.useState({
    open: false,
    title: "",
  });

  const handleOpenDialog = () => {
    let title = "Are you sure you want to exit?";
    setShowCloseDialog({ open: true, title: title });
  };

  const handleClick = () =>{
    if(confirmClose){
      handleOpenDialog();
    }else{
      handleClose();
    }
  }
  const {t} = useTranslation();
  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClick}
      closeAfterTransition={false}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >

        <React.Fragment>
        <div className={classes.paper}>
          {header}
          <div className={classes.content}>{children}</div>
          {hasCloseButton && (
            <IconButton
              color="primary"
              className={classes.dismissButon}
              onClick={handleClick}
            >
              <CloseIcon />
            </IconButton>
          )}
        </div>
        <ConfirmationDialog 
        open={showCloseDialog.open}
         title={t('confirmation:exit_without_saving')} 
        handleAccept={()=>{setShowCloseDialog({open:false});handleClose()}}
        handleCancel={()=>{setShowCloseDialog({open:false})}}/>
        </React.Fragment>
     
    </MaterialModal>
  );
};

export default Modal;

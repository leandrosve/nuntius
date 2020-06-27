import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from "react-i18next";

export default function ConfirmationDialog({open, title, description, handleCancel, handleAccept}) {
  const {t} = useTranslation();
  const close= (e)=>{
    e.stopPropagation();handleCancel();
  }

  const accept= () =>{
    if(handleAccept ){
      handleAccept();
      handleCancel();
    }else{
      handleCancel();
    }
  }
  return (

    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        {description && 
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        }
        <DialogActions>
          <Button onClick={(e)=>{close(e)}}  color="primary" autoFocus>
            {t('confirmation:cancel')}
          </Button>
          <Button  onClick={accept}  color="primary">
            {t('confirmation:accept')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
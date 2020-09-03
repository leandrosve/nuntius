import React, {  } from "react";
import {default as MaterialAlert} from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const Alert = ({open, severity, onClick, children, isDismissible=true}) => {
    return(
        <Collapse in={open}>
        <MaterialAlert
          severity={severity}
          action={
              isDismissible &&
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClick}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>          
          }
        >
         {children}
        </MaterialAlert>
        
       </Collapse>

    )



}

export default Alert;
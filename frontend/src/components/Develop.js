import React, {useState} from 'react';
import Modal from './util/Modal';

import { makeStyles } from '@material-ui/core/styles';
import Profile from './profile/Profile';
import Button from "@material-ui/core/Button";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TitledContainer from './util/TitledContainer';
import GroupIcon from "@material-ui/icons/Group";
import Settings from "./Settings";



function Develop() {
    

    const [showModal, setShowModal] = useState({
        open: false,
        content: "",
      });

      const [open, setOpen] = React.useState(false);

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setShowModal({open:false});
      };
  return (
    
    <div>
      <button type="button" onClick={()=>setShowModal({open:true, content:<Profile/>})}>
        react-transition-group
      </button>
      <Modal
      open={true}
      handleClose={handleClose}
      content={showModal.content}
      hasCloseButton={true} 
      confirmClose={true}
      >
        <Profile/>  
      </Modal>
      
    </div>
  );
}

export default Develop;

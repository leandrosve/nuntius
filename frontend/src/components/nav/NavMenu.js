import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import DropdownMenu from "../util/DropdownMenu";
import Modal from "../util/Modal";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Contacts from '../contacts/Contacts';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Profile from '../profile/Profile';
import Settings from '../user/Settings';
import { withRouter } from "react-router-dom";

function NavMenu(props) {

  const { t } = useTranslation();

  const [open, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState({open:false, content:'', confirmClose:false});
  const handleCloseModal= React.useCallback(()=>setShowModal({open:false}))
  const openMenu = () => {
    setOpenMenu(!open);
  };



  return (
    <>
     

      <IconButton onClick={openMenu} color="primary" aria-label="upload picture" component="span">
      <BsList
          className={"Nav-menuButton " + (open && "Nav-menuButton--open")}
        />
      </IconButton>
        
      {open && (
        <ClickAwayListener onClickAway={()=>setShowModal({open:false})}>
        <DropdownMenu style={{width:'300px'}}>
          <ListItem button  onClick={()=>{setOpenMenu(false);setShowModal({open:true, content:<Contacts handleClose={()=>setShowModal({open:false})}/>})}}>
            <ListItemIcon>
            <GroupIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("contacts")} />
          </ListItem>
          <ListItem button   onClick={()=>{setOpenMenu(false);setShowModal({open:true, confirmClose:true, content:<Profile/>})}}>
            <ListItemIcon>
            <AssignmentIndIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("profile")} />
          </ListItem>
          <ListItem button    onClick={()=>{setOpenMenu(false);setShowModal({open:true, content:<Settings/>});}} >
            <ListItemIcon>
            <SettingsIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("settings")} />
          </ListItem>
        </DropdownMenu>
        </ClickAwayListener>
      )}
 
      <Modal open={showModal.open} handleClose={handleCloseModal} confirmClose={showModal.confirmClose}>
          {showModal.content}

      </Modal>
      
    </>
  );
}
export default withRouter(NavMenu);

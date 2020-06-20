import React, { useState } from "react";
import { BsList } from "react-icons/bs";
import DropdownMenu, { DropdownItem } from "../util/DropdownMenu";
import Modal from "../util/Modal";
import { useTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Contacts from '../Contacts';

function NavMenu() {
  const { t } = useTranslation();

  const [open, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState({open:false, content:''});

  const openMenu = () => {
    setOpenMenu(!open);
  };

  const openContacts = () => {   
     setShowModal({open:true, content:<Contacts/>});
  };

  return (
    <>
     
      <IconButton onClick={openMenu} color="primary" aria-label="upload picture" component="span">
      <BsList
          className={"Nav-menuButton " + (open && "Nav-menuButton--open")}
        />
      </IconButton>
        
      {open && (
        <DropdownMenu>
          <ListItem button  onClick={()=>{setOpenMenu(false);openContacts()}}>
            <ListItemIcon>
            <GroupIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("contacts")} />
          </ListItem>
          <ListItem button  onClick={()=>{setOpenMenu(false);openContacts()}}>
            <ListItemIcon>
            <AssignmentIndIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("profile")} />
          </ListItem>
          <ListItem button  onClick={()=>{setOpenMenu(false);openContacts()}}>
            <ListItemIcon>
            <SettingsIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("settings")} />
          </ListItem>
        </DropdownMenu>
      )}
      {showModal.open &&
      <Modal handleClose={()=>setShowModal({open:false})}>
          {showModal.content}
      </Modal>
      }
    </>
  );
}
export default NavMenu;

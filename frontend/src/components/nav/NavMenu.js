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
import Contacts from '../contacts/Contacts';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Profile from '../profile/Profile';
import {Route , Link , useHistory } from 'react-router-dom';
import Settings from '../Settings';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function NavMenu(props) {
  const { match, location, history } = props;

  const { t } = useTranslation();

  const [open, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState({open:false, content:'', confirmClose:false});

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
        <ClickAwayListener onClickAway={()=>setShowModal({open:false})}>
        <DropdownMenu>
          <ListItem button  component={ Link }  to={`${match.path}/contacts`}  onClick={()=>{setOpenMenu(false);setShowModal({open:true})}}>
            <ListItemIcon>
            <GroupIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("contacts")} />
          </ListItem>
          <ListItem button  component={ Link }  to={`${match.path}/profile`} onClick={()=>{setOpenMenu(false);setShowModal({open:true, confirmClose:true})}}>
            <ListItemIcon>
            <AssignmentIndIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("profile")} />
          </ListItem>
          <ListItem button   component={ Link }  to={`${match.path}/settings`} onClick={()=>{setOpenMenu(false);setShowModal({open:true});}} >
            <ListItemIcon>
            <SettingsIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("settings")} />
          </ListItem>
        </DropdownMenu>
        </ClickAwayListener>
      )}
 
      <Modal open={showModal.open} handleClose={()=>{setShowModal({open:false});history.push("/browse")}} confirmClose={showModal.confirmClose}>
          <Route path={`${match.path}/contacts`} component={Contacts}/>
          <Route path={`${match.path}/profile`} component={Profile}/>
          <Route path={`${match.path}/settings`} component={Settings}/>

      </Modal>
      
    </>
  );
}
export default withRouter(NavMenu);

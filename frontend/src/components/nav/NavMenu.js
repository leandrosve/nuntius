import React, { useState} from "react";
import { BsList } from "react-icons/bs";
import DropdownMenu from "../util/DropdownMenu";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {openContacts, openProfile, openSettings} from "../../redux/modal/modalActions";
import { connect } from "react-redux";

function NavMenu({openContacts, openProfile, openSettings}) {

  const { t } = useTranslation();

  const [open, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((open) => !open);
  };

  return (
    <>
      <IconButton onClick={toggleMenu} color="primary" aria-label="upload picture" component="span">
      <BsList
          className={"Nav-menuButton " + (open && "Nav-menuButton--open")}
        />
      </IconButton>
        
      {open && (     
          <React.Fragment>
        <DropdownMenu style={{width:'300px'}}>
          <ListItem button  onClick={()=>{setOpenMenu(false);openContacts()}}>
            <ListItemIcon>
            <GroupIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("contacts")} />
          </ListItem>
          <ListItem button   onClick={()=>{setOpenMenu(false);openProfile()}}>
            <ListItemIcon>
            <AssignmentIndIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("profile")} />
          </ListItem>
          <ListItem button  onClick={()=>{setOpenMenu(false);openSettings()}} >
            <ListItemIcon>
            <SettingsIcon style={{ color: 'white'}}/>
            </ListItemIcon>
            <ListItemText primary={t("settings")} />
          </ListItem>
        </DropdownMenu>
        </React.Fragment>     
      )}
    </>
  );
}

const mapDispatchToProps = dispatch =>  {
  return {
    openContacts: () => dispatch(openContacts()),
    openProfile: () => dispatch(openProfile()),
    openSettings: () => dispatch(openSettings()),
  }
}


export default connect(null, mapDispatchToProps)(NavMenu);

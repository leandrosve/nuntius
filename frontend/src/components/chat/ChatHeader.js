import React, {useState} from "react";
import "./assets/Chat.css";
import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import { useTranslation } from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Modal from '../util/Modal';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import ListItem from "@material-ui/core/ListItem";
import ContactDetail from "../contacts/ContactDetail";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import  DropdownMenu, { DropdownItem, } from "../util/DropdownMenu";
import PersonIcon from '@material-ui/icons/Person';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height:theme.mixins.toolbar,
    minHeight:theme.mixins.toolbar,  
    "background":"#1f1f23",
    "display":"flex",
    "flexDirection":"row",
    "alignItems":"center",
    "padding":"0px 10px 0px 10px",
    zIndex:theme.zIndex.appbar -1 ,
  },
}));

function ChatHeader() {
  const { t } = useTranslation();
  const [openUserDetail, setOpenUserDetail] = useState(false);
  const classes= useStyles();
  return (
    <div>
    <Toolbar style={{padding:'0px'}}className={classes.root}>
     <ListItem button  style={{width:'auto'}}className="ChatHeader-userInfo" onClick={()=>setOpenUserDetail(true)}>
        <img
          src={profilePicPlaceholder}
          className="ChatHeader-profilePic"
          alt="user"
        />
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h1>Juan Perez</h1>
          <p>{t("online")}</p>
        </div>
      </ListItem>
      <div className="ChatHeader-options">
      <IconButton color="primary">
        <SearchIcon style={{fontSize:'30px', color:'white'}} />
      </IconButton>
      <IconButton color="primary" >
        <AttachFileIcon  style={{fontSize:'30px', color:'white'}} />
      </IconButton>
      <MoreButton handleOpenUserDetail={()=>setOpenUserDetail(true)}/>
       
      </div>
    </Toolbar>

    <Modal open={openUserDetail} handleClose={()=>setOpenUserDetail(false)}>
      <ContactDetail/>
    </Modal>

    </div>
  );
}

const MoreButton = ({handleOpenUserDetail})=>{
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const handleToggleMenu = () =>{
    setOpenMenu((prev) => !prev)
  }
  return (

        <React.Fragment>
           <IconButton color="primary" onClick={()=>handleToggleMenu()} >
             <MoreHorizIcon  style={{fontSize:'30px', color:'white'}} />
          </IconButton>
          {openMenu &&
          
            <DropdownMenu style={{position:'absolute', right:'0'}}>
                <ListItem button  onClick={()=>{handleToggleMenu();handleOpenUserDetail()}}>{t('contact_detail')}</ListItem>
                
            </DropdownMenu>
         
          }
         
         
        </React.Fragment>
      )
    }


export default ChatHeader;

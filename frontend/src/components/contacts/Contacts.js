import React from "react";

import profilePicPlaceholder from "../assets/images/profile-pic-placeholder.jpg";
import ListItem from "../util/ListItem";
import GroupIcon from "@material-ui/icons/Group";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ConfirmationDialog from "../util/ConfirmationDialog";
import TitledContainer from "../util/TitledContainer";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useTranslation } from "react-i18next";
import {Spring} from "react-spring/renderprops";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",

    position: "relative",
    overflowY: "scroll",
    scrollbarColor: theme.palette.primary,
    scrollbarWidth: "thin",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    height: "100%",
    padding: "0px",
  },
  contact: {
    minWidth: "400px",
    "&:hover $action": { visibility: "visible" },
  },

  action: {
    visibility: "hidden",
  },
}));

function Contacts() {
  const { t } = useTranslation();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState({
    open: false,
    title: "",
  });

  const handleOpenDialog = (name) => {
    let title = t("confirmation:contact_delete", { name: name });
    setShowDeleteDialog({ open: true, title: title });
  };

  const [openAddContact, setOpenAddContact] = React.useState(false);

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
      fixedContent={openAddContact && <AddContact handleClose={()=>{setOpenAddContact(false) }}/>}
    >
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Miguel"
        info="Apaisai lala"
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Francisco Pepe"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <Contact
        avatar={profilePicPlaceholder}
        alias="Don Ramon"
        info=" Me gusta el polen..."
        handleOpenDialog={handleOpenDialog}
      />
      <ConfirmationDialog
        open={showDeleteDialog.open}
        handleCancel={() => setShowDeleteDialog({ open: false })}
        title={showDeleteDialog.title}
      />
    </TitledContainer>
  );
}

const Contact = ({ alias, info, avatar, handleOpenDialog }) => {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.contact}
      onClick={(e) => {
        console.log("asdasdasdas");
        e.stopPropagation();
      }}
      left={<img src={avatar} className="avatar" alt="user" />}
      center={
        <React.Fragment>
          <h3>{alias}</h3>
          <div>
            <p>{info}</p>
          </div>
        </React.Fragment>
      }
      right={
        <React.Fragment>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={classes.action}
            aria-label="upload picture"
            component="span"
          >
            <MoreHorizIcon />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDialog(alias);
            }}
            className={classes.action}
            aria-label="upload picture"
            component="span"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

const AddContact = ({handleClose}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Spring
      from={{opacity:0}}
      to={{ opacity: 1}}
    >
      {props =>(
    <div style={props}>   
      <Typography style={{margin:'5px'}} variant="h5">
        {t("contact_add")}
      </Typography>
  
      <TextField
        size="small"
        autoFocus='true'
        placeholder="Nombre de usuario o correo electronico"
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
      <Button
      style={{width:'100%',marginTop:'10px'}}
        color="primary"
        size="large"
        
        aria-label="add"
        onClick={handleClose}
      >
        <ExpandLessIcon square/>
      </Button>
     
    </div>
       ) }
    </Spring>
  );
};

export default Contacts;

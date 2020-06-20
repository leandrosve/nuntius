import React from "react";

import profilePicPlaceholder from "./assets/images/profile-pic-placeholder.jpg";
import { BsClock, BsCheckAll } from "react-icons/bs";
import ListItem from "./util/ListItem";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { makeStyles } from "@material-ui/core/styles";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: "80vh",
    scrollbarColor: theme.palette.primary,
    scrollbarWidth: 'thin',
  },
  header: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contact: {
    "&:hover $action": { visibility: "visible" },
  },

  action: {
    visibility: "hidden",
  },
}));


const Contact = ({ alias, info, avatar }) => {
  const classes = useStyles();
  return (
    <ListItem
      className={classes.contact}
      onClick={() => {
        console.log("asdasdasdas");
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

function Contacts() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Container>
      <div class={classes.header}>
        <Avatar circle className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("contacts")}
        </Typography>
      </div>
      <List className={classes.root}>
        <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
        <Contact
          avatar={profilePicPlaceholder}
          alias="Don Miguel"
          info="Apaisai lala"
        />
        <Contact
          avatar={profilePicPlaceholder}
          alias="Francisco Pepe"
          info=" Me gusta el polen..."
        />
        <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
          <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
          <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
          <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
          <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
          <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
          <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
          <Contact
          avatar={profilePicPlaceholder}
          alias="Don Ramon"
          info=" Me gusta el polen..."
        />
      </List>
    </Container>
  );
}

export default Contacts;

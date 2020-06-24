import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { AiFillAlipayCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import NavMenu from "./NavMenu";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily:" 'Bellota', cursive",
  },
  toolBar:{
    padding:'0px',
    width:'80%',
    margin:'auto'
  },
  appBar:{
    background: '#18181b'
  },


}));

function Nav() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
      <AppBar position="static" className={classes.appBar}>
        
      <Toolbar className={classes.toolBar}>
          
        <NavMenu/>

        <AiFillAlipayCircle className="Nav-logo" />
        <Typography variant="h5" color="inherit" className={classes.title} >NUNTIUS</Typography>
        <div className="Nav-links">
          <Link to="/">
             <Button color="inherit">{t("logout")}</Button>
          </Link>
        </div>
      </Toolbar>
      </AppBar>
  );
}

export default Nav;

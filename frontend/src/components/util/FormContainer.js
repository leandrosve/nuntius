import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Util.css";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const FormContainer = (props) => {

  const classes = useStyles();

  return (
    <Container style={{overflow:"scroll"}} maxWidth="xs">
      <div className={classes.paper}>
        {props.icon && (
          <Avatar className={classes.avatar}>{props.icon}</Avatar>
        )}
        {props.title && (
          <Typography component="h1" variant="h5">
            {props.title}
          </Typography>
        )}
        {props.children}
      </div>
    </Container>
  );
};

export default FormContainer;

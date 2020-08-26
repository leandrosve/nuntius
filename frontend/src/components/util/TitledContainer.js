import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    padding: "0px",
  },
  content: {
    marginTop: "10px",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow:"auto"
  },
  header: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    background: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
}));

const TitledContainer = ({ title, icon, children, actions, fixedContent }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.header}>
        <Avatar className={classes.avatar}>
          {icon}
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>

        <div style={{ marginLeft: "auto" }}>{actions}</div>
      </div>
      <Divider />
      <div>
        {fixedContent}
        {fixedContent && <Divider />}
      </div>

      <div className={classes.content}>{children}</div>
    </React.Fragment>
  );
};
export default TitledContainer;

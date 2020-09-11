import React from "react";
import "../App.css";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {openLogin, openSignUp} from "../redux/modal/modalActions";
import {connect} from "react-redux";
import NuntiusLogo from "./util/NuntiusLogo";
import SmartAlert from "./util/SmartAlert";
import { Snackbar } from "@material-ui/core";
import { REFRESH_TOKEN_REQUEST } from "../redux/session/sessionActionTypes";

function Welcome({openLogin, openSignUp}) {
  const { t } = useTranslation();

  return (
    <header className="App-header">
      <NuntiusLogo className="App-logo" />
      <h1 className="App-link">NUNTIUS</h1>
      <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  autoHideDuration={6000}>        
        <SmartAlert concerns={alertConcens}/>     
      </Snackbar>
      <Grid>
        <Button
          color="secondary"
          size="large"
          onClick={() => {
            openLogin();
          }}
        >
          {t("login")}
        </Button>

        <Button
          color="secondary"
          size="large"
          onClick={() => {
            openSignUp()
          }}
        >
          {t("register")}
        </Button>
      </Grid>
      
    </header>
  );
}

const alertConcens=[REFRESH_TOKEN_REQUEST];

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: () => dispatch(openLogin()),
    openSignUp: () => dispatch(openSignUp()),
  };
};

export default connect(null, mapDispatchToProps)(Welcome);

import React from "react";
import "../App.css";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {openLogin, openSignUp} from "../redux/modal/modalActions";
import {connect} from "react-redux";
import NuntiusLogo from "./util/NuntiusLogo";

function Welcome({openLogin, openSignUp}) {
  const { t } = useTranslation();

  return (
    <header className="App-header">
      <NuntiusLogo className="App-logo" />
      <h1 className="App-link">NUNTIUS</h1>
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

const mapDispatchToProps = (dispatch) => {
  return {
    openLogin: () => dispatch(openLogin()),
    openSignUp: () => dispatch(openSignUp()),
  };
};

export default connect(null, mapDispatchToProps)(Welcome);

import React, { useState } from "react";
import "../App.css";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { AiFillAlipayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "./util/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles();

function Welcome() {
  const { t } = useTranslation();

  const classes = useStyles();

  const [showModal, setShowModal] = useState({
    open: false,
    content: "",
  });

  return (
    <header className="App-header">
      <AiFillAlipayCircle className="App-logo" />
      <h1 className="App-link">NUNTIUS</h1>
      <Grid>
        <Link to="/browse">
          <Button
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={
              <BsFillChatQuoteFill style={{ display: "inline-block" }} />
            }
          >
            {t("start")}
          </Button>
        </Link>
        <Button
          color="secondary"
          size="large"
          onClick={() => {
            setShowModal({ open: true, content: <LoginForm /> });
          }}
        >
          {t("login")}
        </Button>

        <Button
          color="secondary"
          size="large"
          onClick={() => {
            setShowModal({ open: true, content: <RegisterForm /> });
          }}
        >
          {t("register")}
        </Button>
      </Grid>
      {showModal.open && (
        <Modal handleClose={() => setShowModal({ open: false })}>
          {showModal.content}
        </Modal>
      )}
    </header>
  );
}

export default Welcome;

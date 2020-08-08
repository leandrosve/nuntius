import React, { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField as TextField } from "formik-material-fields";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormContainer from "../util/FormContainer";

import Alert from "../util/Alert";
import { login } from "../../redux/user/userActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ( {error="", login, loading, success=""} ) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);


  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(()=>{setOpenAlert(true)},[loading, error, success, setOpenAlert])
  return (
    <Formik
      validateOnMount={true}
      validateOnBlur={true}
      initialValues={initialValues}
      validationSchema={Yup.object({
        username: Yup.string().required(t("error:required_field")),
        password: Yup.string().required(t("error:required_field")),
      })}
      onSubmit={(values, { setSubmitting }) => {   
          login(values.username.trim(), values.password.trim());
          
          setSubmitting(false);
      }}
    >
      {({ isValid }) => (
        <FormContainer title={t("login")} icon={<LockOutlinedIcon />}>

          {loading && <CircularProgress color="secondary" />}
          <Alert
            severity={error ? "error" : "success"}
            open={openAlert && !loading && (error !== '' || success !== '')}
            onClick={() => setOpenAlert(false)}
          >
            {error || t(success)}
          </Alert>
          <Form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              id="username"
              label={t("username")}
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("password_remember")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isValid}
            >
              {t("login")}
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};


const mapStateToProps = state =>{
  const session = state.user.session;
  return {
      error: session.error,
      loading: session.loading,
  }
}
const mapDispatchToProps = dispatch =>  {
  return {
    login: (username, password) => dispatch(login(username, password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

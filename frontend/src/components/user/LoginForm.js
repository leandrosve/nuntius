import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField as TextField } from "formik-material-fields";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormContainer from "../util/FormContainer";

import Alert from "../util/Alert";
import { login} from "../../redux/session/sessionActions";
import { connect } from "react-redux";
import {isRequestLoading} from "../../redux/notification/loadingReducer";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "../../redux/user/userActionTypes";
import { getRequestError } from "../../redux/notification/errorReducer";
import { clearError, clearSuccess } from "../../redux/notification/notificationActions";
import { getRequestSuccessMessage } from "../../redux/notification/successReducer";
import NuntiusLogo from "../util/NuntiusLogo";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ( {error="", login, loading, success="", clearErrors, clearSuccessMessages} ) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(()=>{clearErrors()},[clearErrors]);

  const handleCloseAlert = useCallback(()=>{
    clearErrors();
    clearSuccessMessages();
  },[clearErrors, clearSuccessMessages])

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
          handleCloseAlert();
          setSubmitting(false);
      }}
    >
      {({ isValid }) => (
        <FormContainer title={t("login")} icon={<NuntiusLogo/>}>
        
          {loading && <CircularProgress color="secondary" />}
          <Alert
            severity={success ? "success" : "error"}
            open={!loading && (!!success || !!error)}
            onClick={() => handleCloseAlert()}
          >
            {success ? t(success) : error}
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


const mapStateToProps = ({loading, error, success}) =>{
  return {
      error: getRequestError(error, [LOGIN_REQUEST]),     
      success: getRequestSuccessMessage(success, [SIGNUP_REQUEST]),
      loading: isRequestLoading(loading, [LOGIN_REQUEST]),
  }
}
const mapDispatchToProps = dispatch =>  {
  return {
    clearErrors: () => {dispatch(clearError([LOGIN_REQUEST]));},
    clearSuccessMessages: () => {dispatch(clearSuccess([SIGNUP_REQUEST]));},
    login: (username, password) => dispatch(login(username, password)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import { FormikTextField as TextField } from "formik-material-fields";
import { Formik , Form} from "formik";
import * as Yup from "yup";
import FormContainer from "../util/FormContainer";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '../util/Alert';
import { signUp } from "../../redux/user/userActions";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import { SIGNUP_REQUEST } from "../../redux/user/userActionTypes";
import { getRequestError } from "../../redux/notification/errorReducer";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { clearError } from "../../redux/notification/notificationActions";
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

function RegisterForm({signUp, error, loading, clearErrors}) {
  const { t } = useTranslation();

  const classes = useStyles();

  useEffect(()=>{clearErrors()}, [clearErrors]);

  return (
    <FormContainer title={t("register")} icon={<NuntiusLogo />}>
      <Formik
        validateOnMount={true}
        initialValues={{
          username: "",
          password: "",
          email: "",
          password_repeat: "",
          name: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, t("error:username_short", { min: 3, max: 25 }))
            .max(25, t("error:username_long", { min: 3, max: 25 }))
            .required(t("error:required_field"))
            .matches(
              /^\S+$/,
              t("error:no_spaces")),

          email: Yup.string()
            .email(t("error:email_invalid"))
            .required(t("error:required_field")),
          password: Yup.string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              t("error:password_weak", { cant: 8 })
            )
            .required(t("error:required_field")),
          password_repeat: Yup.string()
            .oneOf([Yup.ref("password"), null], t("error:passwords_must_match"))
            .required(t("error:required_field")),
        })}
        onSubmit={(values, { setSubmitting }) => {         
            signUp(values.username, values.password, values.name, values.email);
            setSubmitting(false);
        }}
      >
        {({ isValid }) => (
          <Form className={classes.form}>
            {loading && <CircularProgress color="secondary" />}

            <Alert
            severity='error'
            open={!loading && !!error}
            onClick={() => clearErrors()}  
          >
            {error}
            </Alert>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label={t("username")}
              name="username"
              autoFocus
              size='small'
            />

            <TextField
              label={t("email")}
              name="email"
              size='small'
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
            />

            <TextField
              label={`${t("name")}`}
              name="name"
              type="text"
              size='small'
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
            />

            <TextField
              label={t("password")}
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              size='small'
              id="password"
            />

            <TextField
              label={t("password_repeat")}
              name="password_repeat"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              size='small'
              id="password_repeat"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isValid}
            >
              {t("register")}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}

const mapStateToProps = ({loading, error}) =>{
  return {
      error: getRequestError(error, [SIGNUP_REQUEST]),
      loading: isRequestLoading(loading, [SIGNUP_REQUEST]),
  }
}
const mapDispatchToProps = dispatch =>  {
  return {
    clearErrors: () => dispatch(clearError([SIGNUP_REQUEST])),
    signUp: (username, password, name, email) => dispatch(signUp(username, password, name, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

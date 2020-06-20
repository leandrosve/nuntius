import React from "react";

import { useTranslation } from "react-i18next";

import { FormikTextField as TextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormContainer from "./util/FormContainer";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function RegisterForm() {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <FormContainer title={t("register")} icon={<AccountBoxIcon />}>
      <Formik
        validateOnMount={true}
        initialValues={{
          username: "",
          password: "",
          email: "",
          password_repeat: "",
          alias: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, t("error:username_short", { min: 3, max: 25 }))
            .max(25, t("error:username_long", { min: 3, max: 25 }))
            .required(t("error:required_field")),

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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isValid }) => (
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label={t("username")}
              name="username"
              autoFocus
            />

            <TextField
              label={t("email")}
              name="email"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
            />

            <TextField
              label={`${t("alias")} (${t("optional")})`}
              name="alias"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              id="alias"
            />

            <TextField
              label={t("password")}
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
            />

            <TextField
              label={t("password_repeat")}
              name="password_repeat"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
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
          </form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default RegisterForm;

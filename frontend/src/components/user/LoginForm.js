import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField as TextField } from "formik-material-fields";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { makeStyles } from '@material-ui/core/styles';
import FormContainer from '../util/FormContainer';

import Alert from '../util/Alert';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const LoginForm = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };


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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setOpenAlert(true);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isValid }) => (

        <FormContainer title={t('login')} icon={<LockOutlinedIcon/>}>
          <Alert
            severity='error'
            open={openAlert}
            onClick={() => setOpenAlert(false)}  
          >
            Username and password don't match
            </Alert>
          <Form className={classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              size='small'
              fullWidth
              id="username"
              label={t('username')}
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
              label={t('password')}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t('password_remember')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!isValid}
            >
              {t('login')}
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};
export default LoginForm;

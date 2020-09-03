import React, { useCallback, useState } from "react";

import * as Yup from "yup";
import TitledContainer from "../util/TitledContainer";
import { useTranslation } from "react-i18next";
import Alert from "../util/Alert";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form } from "formik";
import {
  Button,
  List,
  Divider,
  Typography,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import { FormikTextField as TextField } from "formik-material-fields";
import { getContactIds } from "../../redux/user/userReducer";
import { connect } from "react-redux";
import { remove, union } from "lodash";
import { addGroup } from "../../redux/chats/groups/groupActions";
import { isRequestLoading } from "../../redux/notification/loadingReducer";
import { openContacts } from "../../redux/modal/modalActions";
import UserListItem from "../user/UserListItem";
import { ADD_GROUP_REQUEST } from "../../redux/chats/groups/groupActionTypes";

const useStyles = makeStyles(() => ({
  list: {
    maxHeight:"300px",
    overflowY:"auto"
  },
  
}));

const GroupForm = ({
  loading,
  error,
  success,
  clearNotifications,
  contactIds = [],
  addGroup,
  openContacts,
}) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const handleSelectParticipant = useCallback((userId)=>{
    if(selectedParticipants.includes(userId)){
      setSelectedParticipants(prev => remove(prev, id => id !== userId))
    }else{
      setSelectedParticipants(prev => union(prev, [userId]))
    }
    
  },[selectedParticipants, setSelectedParticipants])
 

  const handleSubmit = (values)=>{
    addGroup(values.title,selectedParticipants)
  }
  return (
    <TitledContainer
      title={t("group_add")}
      icon={<GroupWorkIcon />}
      fixedContent={
        <React.Fragment>
          <Alert
            open={!loading && (!!error || !!success)}
            severity={error ? "error" : "success"}
            onClick={() => clearNotifications()}
          >
            {error || success}
          </Alert>
        </React.Fragment>
      }
    >
      {loading && <CircularProgress color="secondary" />}

      <Formik
        initialValues={{ title: "" }}    
        isInitialValid={false}
        validationSchema={Yup.object({
          title: Yup.string().required(t("error:required_field")),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          handleSubmit(values)
        }}
      >
        {({ isValid }) => (
          <Form style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              margin="normal"           
              fullWidth
              id="title"
              label={t("title")}
              name="title"
              autoFocus
            />
            <Divider/>
            {contactIds.length > 0 ?
              <>
              <Typography variant="h5" >
                {t("participants_add")}
              </Typography>

           
                <Typography variant="h6">
                  {t("contacts")}
                </Typography>
                
              
              
                <List dense className={classes.list}>
                  {contactIds.map((userId) => {
                    return (
                      <UserListItem key={userId}
                        userId={userId}
                        dontHideActions
                        actions={
                          <Checkbox
                              onChange={()=>{handleSelectParticipant(userId)}}
                              edge="end"
                              inputProps={{ "aria-labelledby": userId }}
                          />
                        }
                      />
                     
                    );
                  })}
                </List>  
              </>  
              :
              <div>
            <Typography variant="body">{t("contacts_empty")}</Typography>
            <Button onClick={openContacts}>{t("contacts_add")}</Button>  
              </div>   
            }
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!isValid}
            >
              {t("group_add")}
            </Button>
          </Form>
        )}
      </Formik>
    </TitledContainer>
  );
}

const mapStateToProps = ({ user, loading }) => {
  return {
    contactIds: getContactIds(user),
    loading: isRequestLoading(loading, [ADD_GROUP_REQUEST]),
  };
};

const mapDispatchToProps = dispatch =>  {
  return {
    addGroup: (name, userIds) => dispatch(addGroup(name, userIds)),
    openContacts: () => dispatch(openContacts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);

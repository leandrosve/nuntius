import React from "react";
import "./Util.css";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import MaterialModal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import { hideModal } from "../../redux/modal/modalActions";
import { connect } from "react-redux";
import ContactsContainer from "../contacts/ContactsContainer";
import Settings from "../user/Settings";
import ProfileContainer from "../profile/ProfileContainer";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import {modalContentTypes} from "../../redux/modal/modalActions"
import UserDetailContainer from "../user/UserDetailContainer";
import Image from 'material-ui-image';
import GroupForm from "../group/GroupForm";
import GroupDetail from "../group/GroupDetail";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: theme.zIndex.modal,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    display:"flex",
    minWidth: "400px",
    flexDirection: "column",
    boxShadow: theme.shadows[5],
    padding: "10px",
    maxHeight: "80vh",
    overflow:"hidden"
  },
  content: {
    minHeight: "400px", 
    display: "flex",
  },
  dismissButon: {
    marginLeft: "auto",
  },
}));

const MODAL_COMPONENTS = {
  [modalContentTypes.CONTACTS]: ContactsContainer,
  [modalContentTypes.PROFILE]: ProfileContainer,
  [modalContentTypes.SETTINGS]: Settings,
  [modalContentTypes.LOGIN]: LoginForm,
  [modalContentTypes.SIGN_UP] : RegisterForm,
  [modalContentTypes.USER_DETAILS] : UserDetailContainer,
  [modalContentTypes.MEDIA] : Image ,
  [modalContentTypes.GROUP_ADD]: GroupForm,
  [modalContentTypes.GROUP_DETAILS]: GroupDetail,
}

const Modal = ({ open, hideModal, contentType, contentProps}) => {
  const classes = useStyles();
  const Content = MODAL_COMPONENTS[contentType];

  if (open)
    return (
      <MaterialModal
        className={classes.modal}
        open={open}
        onClose={() => hideModal()}
        closeAfterTransition={false}
      >
        <React.Fragment>
          <div className={classes.paper}>
           <Content {...contentProps} />
            <IconButton
              color="primary"
              className={classes.dismissButon}
              onClick={() => hideModal()}
            >
              <CloseIcon />
            </IconButton>
          </div>        
        </React.Fragment>
      </MaterialModal>
    );
  else return null;
};

const mapStateToProps = ({ modal }) => {
  return {
    open: modal.open,
    contentType: modal.contentType,
    contentProps: modal.contentProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

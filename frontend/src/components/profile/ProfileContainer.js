import React, { useCallback, useEffect } from "react";
import Profile from "./Profile";

import { connect } from "react-redux";
import { clearSessionErrors } from "../../redux/session/sessionActions";
import {editProfile} from "../../redux/user/userActions";

const ProfileContainer = (props) => {
  const {saveProfile, clearSessionErrors, ...params} = props;

  useEffect(()=>{clearSessionErrors()},[clearSessionErrors]);
  
  const handleSave = useCallback((name, biography, avatar)=>{
    clearSessionErrors()
    console.log(avatar);
    saveProfile(name, biography, avatar)
  }
  ,[saveProfile, clearSessionErrors]);

 
 
  return <Profile {...params} handleSave={handleSave}  />;
};


const mapStateToProps = ({ session }) => {
  return {
    ...session.currentUser,
    success: session.success,
    error: session.error,
  };
};

const mapDispatchToProps = dispatch =>  {
  return {
    saveProfile: (name, biography, avatar) => dispatch(editProfile(name, biography, avatar)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

import React, { useCallback, useEffect } from "react";
import Profile from "./Profile";

import { connect } from "react-redux";
import {editProfile} from "../../redux/user/userActions";

const ProfileContainer = (props) => {
  const {saveProfile, ...params} = props;
  
  const handleSave = useCallback((name, biography, avatar)=>{
    saveProfile(name, biography, avatar)
  }
  ,[saveProfile]);

 
 
  return <Profile {...params} handleSave={handleSave}  />;
};


const mapStateToProps = ({ session }) => {
  return {
    ...session.currentUser,
  };
};

const mapDispatchToProps = dispatch =>  {
  return {
    saveProfile: (name, biography, avatar) => dispatch(editProfile(name, biography, avatar)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

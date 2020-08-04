import React from "react";
import Profile from "./Profile";

import {connect} from "react-redux";

const ProfileContainer = (props) => {
    return(
  <Profile {...props} />
    )
};

const mapStateToProps = ({ user }) => {
  return {
    ...user.session.currentUser,
  };
};

export default connect(mapStateToProps, null)(ProfileContainer);

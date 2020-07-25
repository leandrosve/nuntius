import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthRoute = props => {
  const { isAuthUser, type } = props;
  if (type === "guest" && isAuthUser) return <Redirect to="/browse" />;
  else if (type === "private" && !isAuthUser) return <Redirect to="/" />;

  return <Route {...props} />;
};

const mapStateToProps = ( state ) => ({
  isAuthUser : state.user.session.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
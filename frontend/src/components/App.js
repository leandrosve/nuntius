import React, { useCallback, useEffect } from "react";
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Browse from "./Browse";
import Develop from "./Develop";
import { useDispatch, useSelector } from "react-redux";
import AuthRoute from "./util/AuthRoute";
import Modal from "./util/Modal";
import { refreshToken } from "../redux/session/sessionActions";

function App() {
  const refreshTokenTimestamp = useSelector((state)=>state.session.refreshTokenTimestamp);
  const dispatch = useDispatch();
  const updateToken = useCallback(()=>{
    if(refreshTokenTimestamp && refreshTokenTimestamp < Date.now()){
      dispatch(refreshToken());
    }
  }, [refreshTokenTimestamp, dispatch]);

  useEffect(
    () => {
      const timer = setInterval(() => updateToken(), 120000)
      return () => {
        clearInterval(timer)
      }
    },
    [updateToken]
  )

  useEffect(()=>{
    updateToken();
  },[updateToken])

  return (
      <div className="App">      
        <Router>
          <Switch>
            <AuthRoute path="/home" exact component={Welcome} type="guest" />
            <AuthRoute path="/" component={Browse} type="private" />
            <Route path="/develop" exact component={Develop} />
          </Switch>
          <Modal />
        </Router>
      </div>
  );
}

export default App;

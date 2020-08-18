import React from "react";
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Browse from "./Browse";
import Develop from "./Develop";
import { Provider } from "react-redux";
import AuthRoute from "./util/AuthRoute";
import Modal from "./util/Modal";
import store from "../redux/store";

function App() {

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

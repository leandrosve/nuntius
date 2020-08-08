import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Browse from "./components/Browse";
import Develop from "./components/Develop";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthRoute from "./components/util/AuthRoute";
import ReduxModal from "./components/util/ReduxModal";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <AuthRoute path="/home" exact component={Welcome} type="guest"/>
            <AuthRoute path="/" component={Browse} type="private" />
            <Route path="/develop" exact component={Develop} />
          </Switch>
        </div>
        <ReduxModal/>
      </Router>
     
    </Provider>
  );
}

export default App;

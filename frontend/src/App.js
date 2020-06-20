import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Browse from './components/Browse';
import LoginForm from './components/LoginForm';


function App() {

  
  return (
    <Router>     
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/browse" component={Browse}/>
          <Route path="/login" component={LoginForm}/>
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;

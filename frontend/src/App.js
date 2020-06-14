import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Browse from './components/Browse';


function App() {
  return (
    <Router>
      
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/browse" component={Browse}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

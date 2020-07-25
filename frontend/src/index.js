import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import "./i18n";
import axios from "axios";

WebFont.load({
  google: {
    families: ['Bellota','Titillium Web:300,400,700', 'sans-serif']
  }
});

//axios.defaults.baseURL = 'http://localhost:8080';


//axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('jwtToken');

//axios.defaults.headers.common['Accept-Language'] = localStorage.getItem('i18nextLng');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

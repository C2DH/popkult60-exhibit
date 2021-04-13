import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.info('Welcome to popkult60')
console.info('version:', process.env.REACT_APP_GIT_BRANCH, process.env.REACT_APP_GIT_REVISION)
console.info('Current proxy:', process.env.REACT_APP_PROXY)
console.info('Current map style:', process.env.REACT_APP_MAPBOX_STYLE_URL)
ReactDOM.render(
  <React.StrictMode>
    <App className="h-100"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

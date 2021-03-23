import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import reportWebVitals from './reportWebVitals';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

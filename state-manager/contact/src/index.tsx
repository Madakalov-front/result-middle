import React from 'react';
import ReactDOM from 'react-dom/client';
import {setupListeners} from '@reduxjs/toolkit/query';
import './index.scss';
import {MainApp} from './apps/MainApp';
import {store} from './store';
import reportWebVitals from './reportWebVitals';

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

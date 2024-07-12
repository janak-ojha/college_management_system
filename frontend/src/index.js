// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import redux from './Redux/redux';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
// <Provider store={redux}>
//   <App />
// </Provider>
//   );




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={redux}>
      
        <App />
      
    </Provider>
    
  </React.StrictMode>
);

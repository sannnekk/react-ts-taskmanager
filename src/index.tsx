import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state from './state';

function renderDOM() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );  

  console.log(state);
}

renderDOM();

export default renderDOM;
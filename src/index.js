import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state from "./state"
const root = ReactDOM.createRoot(document.getElementById('root'));

function rerenderTree(){
  root.render(
    <React.StrictMode>
      <App rerenderTree={rerenderTree} state={state}/>
    </React.StrictMode>
  );
}
rerenderTree(); //для того что бы перезагрузить страницу если не появляются обновленные данные.
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

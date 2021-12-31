import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from "react-router-dom"
import { store } from "@reducers";
import { Provider } from "react-redux";

import './index.scss'

import App from './App'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>

  </Provider>
), document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import App from './App';
// import './index.css';

const initialState = {};
const history = createBrowserHistory();
export const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  MOUNT_NODE
);
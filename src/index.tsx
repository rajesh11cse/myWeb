import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const initialState = {};
const history = createHistory();
export const store = configureStore(initialState, history);

ReactDOM.render(
            <Provider store={store}>
              {/* <LanguageProvider messages={messages}> */}
                {/* <ConnectedRouter history={history}> */}
                    {/* <Suspense fallback={<BLoaderCon />}> */}
                      <App />
                    {/* </Suspense> */}
                {/* </ConnectedRouter> */}
              {/* </LanguageProvider> */}
            </Provider>,
  
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import initStore from "./initStore"
import './styles/index.css';
import App from './components/App';

import { Provider } from "react-redux"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "react-router-redux"
import { ConnectedRouter } from "connected-react-router"

const history = createBrowserHistory()
export const middleware = routerMiddleware(history)

ReactDOM.render(
  <Provider store={initStore(history)}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
)
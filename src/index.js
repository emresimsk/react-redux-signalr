// polyfills start
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js';
import 'raf/polyfill';
// polyfills end
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import 'flag-icon-css/css/flag-icon.min.css';
import 'animate.css/animate.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './utils/configureStore';
import theme from './utils/theme';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { signalRun } from './redux/modules/signalr';


const { REACT_APP_BASEPATH } = process.env;
export const history = createBrowserHistory({
  basename: REACT_APP_BASEPATH,
});
export const store = configureStore(undefined, history);

store.dispatch(signalRun());

console.log(process.env);
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  // Reload components
  module.hot.accept('./containers/App', () => {
    render(App);
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

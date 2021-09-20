import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './app/Main';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider } from "react-redux";
import rootSaga from './sagas';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { I18nextProvider } from 'react-i18next';
import './i18n'
import { ConfirmationDialogProvider } from './components/EAMConfirmDialog';

let store;
const middleware = [];
const sagaMiddleware = createSagaMiddleware({
  onError: error => {
    // eslint-disable-next-line no-console
    console.warn('saga middleware crashed on error ', error);
    //disptach action for app error. Display popup to reload app
    // store.dispatch(actions.app.errored());
    // LogRocket.captureException(error);
  },
});

middleware.push(sagaMiddleware);
// redux-logger options reference: https://www.npmjs.com/package/redux-logger#options
const logOptions = {
  predicate: (getState, action) => !['API_WATCHER_SUCCESS', 'API_COMPLETE'].includes(action.type),
  diff: true,
  duration: true,
  collapsed: (getState, action, logEntry) => !logEntry.error,
};

middleware.push(createLogger(logOptions));
// trace true allows us to determine the origin of dispatched actions
// using the redux dev tools plugin we can see the stack trace of where the request is originated from.
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // TODO: check if we need to enable it in staging.
    // env === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    })) || compose;

store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ConfirmationDialogProvider>
          {/* <I18nextProvider i18n={i18n}> */}
          <Main />
          {/* </I18nextProvider> */}
        </ConfirmationDialogProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

window.store = store;//remove


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

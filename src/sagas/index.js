// import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import {
  all,
  call,
  take,
  race,
  delay,
  fork,
  cancelled,
  select,
} from 'redux-saga/effects';
import actionsTypes from '../actions/types'
import { createRequestInstance } from 'redux-saga-requests';
import { workflowSagas } from './workflow';
import { workOrderSagas } from './workOrder';
import { workRequestV2Sagas } from './workRequestV2';
import { equipmentLocationsSagas } from './equipmentLocations';
import { assetsSagas } from './assets';

import { createDriver } from 'redux-saga-requests-fetch';
import { APIException } from './api';
import { onRequestSaga, onSuccessSaga, onAbortSaga } from './api/requestInterceptors'
import { request, gql } from 'graphql-request'
import { AppSettings } from '../utils/appSettings';
import { selectors } from '../reducers';

export const CANCELLED_REQ = {
  status: 'Cancelled',
  message: 'Cancelled request',
};

export function* allSagas() {
  yield all([
    ...workflowSagas,
    ...equipmentLocationsSagas,
    ...assetsSagas,
    ...workOrderSagas,
    ...workRequestV2Sagas
  ]);
}

//TODO Dummy
const LOGOUT_PATH = '/logout'

export function* requestCleanup(path, reqMethod) {
  // yield cancelled is true when the saga gets cancelled
  // lets perform some cleanup here by completing any ongoing requests
}


export function* apiCallWithRetry(args) {
  const { query, gCtxtCmp = 'workRequest', timeout = 3 * 60 * 1000, opts } = args;
  const path = AppSettings.API_URL;
  // const apiRequestAction = {
  //   type: 'API_WATCHER',
  //   request: { url: path, args },

  // };

  try {
    let apiResp;
    let logout;
    let timeoutEffect;
    // const token = state?.workrequest?.authContext?.accessToken || AppSettings.TEST_TOKEN;
    let token = yield select(selectors.userToken);
    if(!token){
      token = AppSettings.TEST_TOKEN;
    }
    if (path !== LOGOUT_PATH) {
      ({ apiResp, logout, timeoutEffect } = yield race({
        apiResp: call(request, path, gql`${query}`, undefined, {
          Authorization: `Bearer ${token}`,
          g_ctxt_cmp: gCtxtCmp,
          g_ctxt_lang: 1,
          g_ctxt_ou: 2,
          g_ctxt_role: "testrole"
        }),
        logout: take(actionsTypes.USER_LOGOUT),
        timeoutEffect: delay(timeout),
      }));
    } else {
      // apiResp = yield call(sendRequest, apiRequestAction, {
      //   dispatchRequestAction: false,
      // });
    }

    if (timeoutEffect) {
      yield call(requestCleanup, path, opts?.method);

      throw new APIException(CANCELLED_REQ);
    }

    // logout effect succeeded then the apiResp would be undefined

    if (logout) { return null; }

    return apiResp || {};
  } finally {
    if (yield cancelled()) {
      yield call(requestCleanup, path, opts?.method);
    }
  }
}

export default function* rootSaga() {
  yield createRequestInstance({
    driver: createDriver(window.fetch, {
      // AbortController Not supported in IE installed this polyfill package
      // that it would resort to
      // TODO: Have to check if it works in an IE explorer
      AbortController: window.AbortController,
    }),
    onRequest: onRequestSaga,
    onSuccess: onSuccessSaga,
    onAbort: onAbortSaga,
  });
  yield fork(allSagas);
  // const {logout} = yield race({
  //   logout: take(Abort all saga actions),
  // });

  // stop the main sagas
  // t.cancel();
}

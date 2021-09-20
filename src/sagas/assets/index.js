
import {
  call,
  takeEvery,
  put,
  select,
} from "redux-saga/effects";
import { apiCallWithRetry } from "..";
import actions from "../../actions";
import actionTypes from "../../actions/types";
import { selectors } from "../../reducers";
import { downloadFileV2 } from "../../queries/workRequest/downloadFileV2";

export function* requestAssets({ fileId, relativePath }) {
  const assetObj = yield select(selectors.assets, { fileId, relativePath });
  if (assetObj.status === 'received') {
    return;
  }
  const query = downloadFileV2({
    fileId,
    relativePath
  });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    // if(resp?.['workRequest_getPlanningMetaData']?.getPlanningMetaData){
    // const data = resp['workRequest_getPlanningMetaData']?.getPlanningMetaData || [];             
    if (resp.downloadFile) {
      return yield put(actions.assets.received({
        fileId,
        relativePath,
        byteArr: resp.downloadFile,
      }));
    }

    // }

  } catch (e) {
  }
}



export const assetsSagas = [
  takeEvery(actionTypes.ASSETS.REQUEST, requestAssets),
];


import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { apiCallWithRetry } from "../..";
import actions from "../../../actions";
import actionTypes from "../../../actions/types";
import { getCountByStatusV2 } from "../../../queries/workRequest/getCountByStsV2";
import getWorkRequestListByGroupStatus from "../../../queries/workRequest/getWorkRequestListByGroupStatus";
import { getWorkRequestListCount } from "../../../queries/workRequest/getWorkRequestListCount";
import { selectors } from "../../../reducers";


export function* getWorkRequestCount({ groupBy, Actionflag = 'WorkReq_WS_fetch' }) {
  const query = getCountByStatusV2({ Actionflag, groupBy });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getCountBySts']?.gettheCountofWorkRequestsgroupedbyStatus?.data) {
      const value = resp?.['workRequest_getCountBySts']?.gettheCountofWorkRequestsgroupedbyStatus?.data
      return value;
    }
  } catch (e) {
  }
}
export function* dashboardInit() {
  const selectedFilter = yield select(selectors.dashboardSelectedFilter);
  const isDashboardInitDone = selectedFilter !== '';
  if (!isDashboardInitDone) {
    yield put(actions.workRequestV2.filterOpts.init());
  }

  const value = yield call(getWorkRequestCount, { Actionflag: 'WorkReq_WS_fetch', groupBy: selectedFilter });
  if (value) {
    const defaultGroupBy = value.workhubcmbcode;
    if (!isDashboardInitDone) {
      yield put(actions.workRequestV2.dashboard.selectFilter(defaultGroupBy));
      yield put(actions.workRequestV2.dashboard.receivedCount(defaultGroupBy, value));
    }
    else {
      yield put(actions.workRequestV2.dashboard.receivedCount(selectedFilter, value));
    }

  }
}

export function* updateDashbordFilter({ groupBy }) {
  const Actionflag = 'WorkReq_WS_fetch'
  const value = yield call(getWorkRequestCount, { Actionflag, groupBy });
  if (value) {
    yield put(actions.workRequestV2.dashboard.receivedCount(groupBy, value));
  }
}


export const worRequestDashboardSagas = [
  takeLatest([
    actionTypes.WORK_REQUEST_V2.DASHBOARD.INIT,
  ], dashboardInit),
  takeLatest(actionTypes.WORK_REQUEST_V2.DASHBOARD.CHANGE_FILTER, updateDashbordFilter),

];

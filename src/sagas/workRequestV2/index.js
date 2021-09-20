
import {
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { apiCallWithRetry } from "..";
import actionTypes from "../../actions/types";
import { getCountByStatusV2 } from "../../queries/workRequest/getCountByStsV2";
import actions from "../../actions";
import getFilterMetaData from "../../queries/workRequest/getFilterMetaData";
import { selectors } from "../../reducers";
import { getWorkRequestTimeline } from "../../queries/workRequest/getWorkRequestTimeline";
import moment from "moment";
import { postWorkReqAction } from "../../queries/workRequest/postWorkReqAction";
import { workRequestV2ListSagas } from "./List";
import { worRequestDashboardSagas } from "./Dashboard";
import getWorkRequestListByGroupStatus from "../../queries/workRequest/getWorkRequestListByGroupStatus";
import { getWRWorkOrder } from "../../queries/workRequest/getWRWorkorder";
import { postAssignWOV2 } from "../../queries/workRequest/postAssignWOV2";
import { getWorkRequestListActions } from "../../queries/workRequest/getWorkRequestListActions";

export function* filterOptsInit() {
  const query = getFilterMetaData();
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getWrkReqMetaData']?.getListItems?.data) {
      const value = resp?.['workRequest_getWrkReqMetaData']?.getListItems?.data
      yield put(actions.workRequestV2.filterOpts.initSuccess(value));
      return;
    }
  } catch (e) {
  }
}
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
export function* requestWorkRequestCount({ groupBy, Actionflag = 'WorkReq_WS_fetch' }) {

  const value = yield call(getWorkRequestCount, { groupBy, Actionflag });
  if (value) {
    yield put(actions.workRequestV2.count.received(groupBy, Actionflag, value));
  } else {
    return yield put(actions.workRequestV2.count.requestFailed(groupBy, Actionflag));
  }
}
export function* workRequestListInit({ groupBy, status }) {

  if (!status) {
    let workRequestSet = yield select(selectors.workRequestCount, groupBy);
    if (!workRequestSet?.value?.workrequestcount) {
      yield call(requestWorkRequestCount, { groupBy });
      workRequestSet = yield select(selectors.workRequestCount, groupBy);
    }
    if (workRequestSet?.value?.workrequestcount?.length) {
      const statusTmp = workRequestSet?.value?.workrequestcount[0].hdn_card_code;
      yield put(actions.workRequestV2.list.request(groupBy, statusTmp))
    }
    return;
  }
  yield put(actions.workRequestV2.list.request(groupBy, status))
}

export function* getWorkRequestListCount({ groupBy, status, Actionflag }) {
  const filters = yield select(selectors.workRequestListFilter, groupBy);

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
// export function* workRequestListRequest({ groupBy, status, pageNo = 0 }) {
//   const filters = yield select(selectors.workRequestListFilter, groupBy);
//   console.log("filters", filters, groupBy, status)
//   const obj = { skip: pageNo, groupBy, status };
//   if (groupBy === 'Status') {
//     obj.Actionflag = 'Browse_Work_Requests_UI_Fetch';
//   }
//   else if (groupBy === 'Priority') {
//     obj.Actionflag = 'Priority_Filter';
//   }
//   else if (groupBy === 'RepDate') {
//     obj.Actionflag = 'ReportedDate_Filter';
//   }
//   const query = getWorkRequestListByGroupStatus(obj);
//   try {
//     const resp = yield call(apiCallWithRetry, {
//       opts: {},
//       query: query,
//       gCtxtCmp: 'workRequest',
//       hidden: true,
//     })
//     if (resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo) {
//       const value = resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo;
//       return yield put(actions.workRequestV2.list.received(groupBy, status, value, pageNo + 1));
//     }
//     return yield put(actions.workRequestV2.list.requestFailed(groupBy, status));

//   } catch (e) {
//     return yield put(actions.workRequestV2.list.requestFailed(groupBy, status));
//   }
// }

export function* requestWrTimeline({ wrNo }) {
  const query = getWorkRequestTimeline({ wrNo });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getWRTimeline']?.getthetimelinemapoftheWorkRequest?.data) {
      const value = resp?.['workRequest_getWRTimeline']?.getthetimelinemapoftheWorkRequest?.data
      const valueFormatted = [];
      value.forEach(val => {
        const date = moment(val.HistoryDatetime).format('DD/MM/YYYY HH:mm');
        if (val.iconcode.indexOf('WR-') !== -1) {
          const iconcode = val.iconcode.replace('WR-', '');
          valueFormatted.push({ ...val, iconcode, date });
        } else if (val.iconcode.indexOf('WO-') !== -1 && valueFormatted.length) {
          const lastItem = valueFormatted[valueFormatted.length - 1];
          if (!lastItem.child) {
            lastItem.child = [];
          }
          const iconcode = val.iconcode.replace('WO-', '');
          lastItem.child.push({ ...val, iconcode, date });
        }
      })
      return yield put(actions.workRequestV2.timeline.received(wrNo, valueFormatted));
    }
    return yield put(actions.workRequestV2.timeline.requestFailed(wrNo));

  } catch (e) {
    return yield put(actions.workRequestV2.timeline.requestFailed(wrNo));
  }
}

export function* requestWorkRequest({ wrNo }) {
  const query = getWorkRequestListByGroupStatus({ workrequestNo: wrNo });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo?.[0]) {
      const value = resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo?.[0]
      return yield put(actions.workRequestV2.resource.received(wrNo, value));
    }
    return yield put(actions.workRequestV2.resource.requestFailed(wrNo));

  } catch (e) {
    return yield put(actions.workRequestV2.resource.requestFailed(wrNo));
  }
}
export function* triggerAction({ groupBy, value }) {
  if (!value.length) {
    return;
  }
  const query = postWorkReqAction(value);
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.errors) {
      const parsedErrorJson = JSON.parse(resp.errors[0].message || "{}");
      //something went wrong
      // return yield put(actions.workflow.update.saveFailed(parsedErrorJson.description || 'Something went wrong!'));
    }
    if (resp?.['workRequest_postWrkReqs']?.processtheWorkRequestbasedontheActionTypeflag?.data) {
      const status = yield select(selectors.workRequestActiveTab, groupBy);
      yield put(actions.workRequestV2.list.refresh(groupBy, status));
    }

  } catch (e) {
    const [error] = e.response.errors;
    let message = 'Something went wrong!';
    try {
      const parsedErorMsg = JSON.parse(error.message);
      if (parsedErorMsg?.[0]?.description) {
        message = parsedErorMsg[0].description;
      }

    } catch (e) {
      if (error.message) {
        message = error.message;
      }
    }
    // return yield put(actions.workflow.update.saveFailed(message));
  }
}

export function* dashboardInit() {
  yield put(actions.workRequestV2.filterOpts.init());
  const value = yield call(getWorkRequestCount, { Actionflag: 'WorkReq_WS_fetch' });
  if (value) {
    const defaultGroupBy = value.workhubcmbcode;
    yield put(actions.workRequestV2.dashboard.selectFilter(defaultGroupBy));
    yield put(actions.workRequestV2.count.received(defaultGroupBy, 'WorkReq_WS_fetch', value));
  }
}

export function* requestAssociatedWorkOrder({ wrNo }) {

  const query = getWRWorkOrder({ wrNo });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.errors) {
      // const parsedErrorJson = JSON.parse(resp.errors[0].message || "{}");
      //something went wrong
      // return yield put(actions.workflow.update.saveFailed(parsedErrorJson.description || 'Something went wrong!'));
    }
    if (resp?.['workRequest_getWRWorkorder']?.listofopenWorkordersraisedontheEquipmentLocation?.data?.WorkOrderInfo) {
      const value = resp['workRequest_getWRWorkorder'].listofopenWorkordersraisedontheEquipmentLocation.data.WorkOrderInfo || [];
      yield put(actions.workRequestV2.resource.workOrder.received(wrNo, value));
      return;
    }

    yield put(actions.workRequestV2.resource.workOrder.requestFailed(wrNo));

  } catch (e) {
    yield put(actions.workRequestV2.resource.workOrder.requestFailed(wrNo));
  }
}
export function* assignWorkOrder({ wrNo, woNo }) {
  const query = postAssignWOV2({ wrNo, woNo });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.errors) {
    }
    if (resp?.['workRequest_postWRAssignWrkReq']?.tagWorkrequesttotheworkordergivenintheRequestbody?.data) {
      yield put(actions.workRequestV2.resource.request(wrNo))
      return;
    }
    yield put(actions.workRequestV2.resource.workOrder.assignFailed(wrNo));
  } catch (e) {
    yield put(actions.workRequestV2.resource.workOrder.assignFailed(wrNo));
  }
}
export function* requestWorkRequestAction({ wrNo }) {
  const query = getWorkRequestListActions({ documentNo: wrNo });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getlistOfAllowedActions']?.listOfAllowedActions?.data) {
      const value = resp?.['workRequest_getlistOfAllowedActions']?.listOfAllowedActions?.data
      return yield put(actions.workRequestV2.resource.receivedActions(wrNo, value));
    }
  } catch (e) {
  }
}
export function* triggerActionForWR({ actionFlag, wrNo }) {
  const arr = [{
    actionFlag,
    workrequestNo: wrNo
  }];
  const query = postWorkReqAction(arr);
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.errors) {
      const parsedErrorJson = JSON.parse(resp.errors[0].message || "{}");
      yield put(actions.workRequestV2.resource.triggerActionFailed(wrNo, parsedErrorJson.description || ''));
      //something went wrong
      // return yield put(actions.workflow.update.saveFailed(parsedErrorJson.description || 'Something went wrong!'));
    }
    if (resp?.['workRequest_postWrkReqs']?.processtheWorkRequestbasedontheActionTypeflag?.data) {
      yield put(actions.workRequestV2.resource.requestActions(wrNo));
      yield put(actions.workRequestV2.resource.request(wrNo));
      yield put(actions.workRequestV2.resource.workOrder.request(wrNo));
    }

  } catch (e) {
    const [error] = e.response.errors || [];
    let message = 'Something went wrong!';
    try {
      const parsedErorMsg = JSON.parse(error.message);
      if (parsedErorMsg?.[0]?.description) {
        message = parsedErorMsg[0].description;
      }

    } catch (e) {
      if (error.message) {
        message = error.message;
      }
    }
    yield put(actions.workRequestV2.resource.triggerActionFailed(wrNo, message));
    
  }
}



export const workRequestV2Sagas = [
  takeLatest(actionTypes.WORK_REQUEST_V2.FILTER_OPTIONS.INIT, filterOptsInit),
  takeLatest(actionTypes.WORK_REQUEST_V2.COUNT.REQUEST, requestWorkRequestCount),
  takeLatest(actionTypes.WORK_REQUEST_V2.LIST.INIT, workRequestListInit),
  takeLatest(actionTypes.WORK_REQUEST_V2.TIMELINE.REQUEST, requestWrTimeline),
  takeLatest(actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST, requestWorkRequest),
  takeLatest(actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.REQUEST, requestAssociatedWorkOrder),
  takeLatest(actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.ASSIGN, assignWorkOrder),
  takeLatest(actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST_ACTION, requestWorkRequestAction),
  takeLatest(actionTypes.WORK_REQUEST_V2.RESOURCE.TRIGGER_ACTION, triggerActionForWR),
  ...workRequestV2ListSagas,
  ...worRequestDashboardSagas,

];

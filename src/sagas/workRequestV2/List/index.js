
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
import { getWorkRequestListActions } from "../../../queries/workRequest/getWorkRequestListActions";
import getWorkRequestListByGroupStatus from "../../../queries/workRequest/getWorkRequestListByGroupStatus";
import { getWorkRequestListCount } from "../../../queries/workRequest/getWorkRequestListCount";
import { postWorkReqAction } from "../../../queries/workRequest/postWorkReqAction";
import { selectors } from "../../../reducers";


function getRequestObj({ taskStatus, groupBy, subGroup, pageNo,isFilterSet, ...others }) {
  console.log("isFilterSet", isFilterSet)
  const {
    reportedBy = '',
    PlangroupCode = '',
    workGroup = '',
    Priority = '',
    locationCode = '',
    equipmentCode = '',
    WorkrequestOn = '',
    srchby = '',
    Category = '',
  } = others ;
  const obj = {}
  if(isFilterSet){
    obj.Actionflag = 'filter';
  }
  else if(taskStatus){
    obj.Actionflag = 'status_click'
    if(groupBy === 'RepDate'){
      obj.ReportedTimeCode = subGroup;
    } else if(groupBy === 'Priority'){
      obj.Priority = subGroup;
    }
  }
  else if (groupBy === 'Status') {
    obj.Actionflag = 'Browse_Work_Requests_UI_Fetch'
  }
  else if (groupBy === 'Priority') {
    obj.Actionflag = 'Priority_Filter';
  }
  else if (groupBy === 'RepDate') {
    obj.Actionflag = 'ReportedDate_Filter';
  }
  obj.HiddenControl1 = groupBy;
  obj.HiddenControl2 = subGroup;
  obj.status = taskStatus;
  obj.skip = pageNo;
  obj.reportedBy = reportedBy;
  obj.PlangroupCode = PlangroupCode;
  obj.workGroup = workGroup;
  obj.Category = Category;
  if(!obj.Priority){
    obj.Priority = Priority;
  }
  obj.locationCode = locationCode;
  obj.equipmentCode = equipmentCode;
  obj.WorkrequestOn = WorkrequestOn;
  obj.srchby = srchby;
  return obj;
}

export function* workRequestListCount({ groupBy }) {
  const { taskStatus, pageNo, filter = {}, subGroup } = yield select(selectors.workRequestListObj, groupBy);
  const opts = getRequestObj({ groupBy, subGroup, pageNo, isFilterSet: Object?.keys?.(filter)?.length, ...filter });
  const query = getWorkRequestListCount(opts);
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getCountBySts']?.gettheCountofWorkRequestsgroupedbyStatus?.data) {
      const value = resp?.['workRequest_getCountBySts']?.gettheCountofWorkRequestsgroupedbyStatus?.data;
      yield put(actions.workRequestV2.list.receivedCount(groupBy, value));
      if(!taskStatus && value.workrequestcount){
        yield put(actions.workRequestV2.list.updateTaskStatus(groupBy, value.workrequestcount[0].hdn_card_code, true));
      }
      return;
    }
  } catch (e) {
  }
}

export function* workRequestListRequest({ groupBy }) {
  if(groupBy === 'Priority'){
    const priorityCountObj = yield select(selectors.workRequestPriorityColor);
    if(!priorityCountObj){
      yield put(actions.workRequestV2.dashboard.changeFilter("Priority"));
    }
  }
  const xyz = yield select(selectors.workRequestListObj, groupBy);
  console.log("xyz", xyz);
  const { taskStatus, pageNo, filter = {}, subGroup } = xyz;
  const isFilterSet = !!Object?.keys?.(filter)?.length

  let opts = {}
  if(isFilterSet){
    yield call(workRequestListCount, {groupBy, isFilterSet});
    opts = getRequestObj({ groupBy, subGroup, pageNo, ...filter, taskStatus, isFilterSet });
  }
  else if(!subGroup || (subGroup && taskStatus !== subGroup)){
    yield call(workRequestListCount, {groupBy, isFilterSet});
    opts = getRequestObj({ groupBy, subGroup, pageNo, ...filter, isFilterSet });
  }
  else {
    opts = getRequestObj({ groupBy, subGroup, pageNo, ...filter, taskStatus, isFilterSet });
  }

  const query = getWorkRequestListByGroupStatus(opts);
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo) {
      const value = resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo;
      return yield put(actions.workRequestV2.list.received(groupBy, value));
    }
    yield put(actions.workRequestV2.list.requestFailed(groupBy));
    return;
  } catch (e) {
    // return yield put(actions.workRequestV2.list.requestFailed(groupBy, status));
  }
}
export function* workRequestListTaskUpdate({ groupBy, skipFetch }) {
  if(skipFetch){
    return;
  }

  const { taskStatus, pageNo, filter = {}, subGroup } = yield select(selectors.workRequestListObj, groupBy);
  const isFilterSet = Object?.keys?.(filter)?.length
  const opts = getRequestObj({ groupBy, subGroup, pageNo, isFilterSet, ...filter, taskStatus });
  const query = getWorkRequestListByGroupStatus(opts);
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo) {
      const value = resp?.['workRequest_getWrkReqsBySts']?.getthelistofWorkRequests?.data?.GetWorkReqInfo;
      return yield put(actions.workRequestV2.list.received(groupBy, value));
    }
    return yield put(actions.workRequestV2.list.requestFailed(groupBy));

  } catch (e) {
    // return yield put(actions.workRequestV2.list.requestFailed(groupBy, status));
  }
}

export function* requestWorkRequestActions({ status }) {
  const query = getWorkRequestListActions({ status });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workRequest',
      hidden: true,
    })
    if (resp?.['workRequest_getlistOfAllowedActions']?.listOfAllowedActions?.data) {
      const value = resp?.['workRequest_getlistOfAllowedActions']?.listOfAllowedActions?.data
      return yield put(actions.workRequestV2.list.receivedActions(status, value));
    }
  } catch (e) {
  }
}

export function* fetchNewWorkRequests({ groupBy, status }) {
  const { pageNo } = yield select(selectors.workRequestList, groupBy);
  // yield call(workRequestListRequest, { groupBy, status, pageNo: pageNo + 1 })
}

export function* triggerAction({ groupBy, actionFlag, workrequestNo, allSelected }) {
  const arr = [];
  if(!allSelected){
    arr.push({
      actionFlag,
      workrequestNo
    });
  }
  else {
    const allWrNo = yield select(selectors.allWRItemSelected, groupBy);
    allWrNo.forEach(wrNo => {
      arr.push({
        actionFlag,
        workrequestNo: wrNo
      });
    })
  }
  const query = postWorkReqAction(arr);
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
      yield put(actions.workRequestV2.list.refresh(groupBy));
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
    // return yield put(actions.workflow.update.saveFailed(message));
  }
}



export const workRequestV2ListSagas = [
  takeLatest([
    actionTypes.WORK_REQUEST_V2.LIST.REQUEST,
    actionTypes.WORK_REQUEST_V2.LIST.REFRESH,
    actionTypes.WORK_REQUEST_V2.LIST.SET_FILTER,
    actionTypes.WORK_REQUEST_V2.LIST.REQUEST_NEXT_PAGE
  ], workRequestListRequest),
  takeLatest([
    actionTypes.WORK_REQUEST_V2.LIST.UPDATE_TASK_STATUS,
  ], workRequestListTaskUpdate),
  takeLatest(actionTypes.WORK_REQUEST_V2.LIST.REQUEST_ACTIONS, requestWorkRequestActions),
  takeEvery(actionTypes.WORK_REQUEST_V2.LIST.TRIGGER_ACTION, triggerAction),
];

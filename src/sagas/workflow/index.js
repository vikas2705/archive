
import {
  call,
  takeEvery,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios from 'axios';
import { apiCallWithRetry } from "..";
import actions from "../../actions";
import actionTypes from "../../actions/types";
import { selectors } from "../../reducers";
import { getWorkflowMetadata } from "../../queries/workRequest/getWorkflowMetadata";
import { convertUtcToTimezone } from "../../utils/date";
import { AppSettings } from "../../utils/appSettings";
import { createWorkflowRequest } from '../../queries/workRequest/createWorkflowRequest';
import { requestWorkRequest } from "../workRequestV2";
import moment from "moment";
import { uploadAttachment } from "../attachment";

/**
 *
 * This loads workflow combo box items
 */
export function* workflowLoadItems() {
  const query = getWorkflowMetadata();
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.['workRequest_getWrkReqMetaAndDefs']?.getListItems?.data) {
      const comboItems = resp['workRequest_getWrkReqMetaAndDefs'].getListItems.data;
      const defaultValues = resp['workRequest_getWrkReqMetaAndDefs'].screenLaunchdefaultvaluesUPEassistedforallProperties.data;
      return yield put(actions.workflow.comboItems.received(comboItems, defaultValues));
    }
    return yield put(actions.workflow.comboItems.failed());

  } catch (e) {
    return yield put(actions.workflow.comboItems.failed());
  }
}


export function* workflowUpdateInit({ id, mode }) {
  const workflowItems = yield select(selectors.workflowItems);
  if (workflowItems.status !== 'success') {
    //load required workflow combo items
    yield call(workflowLoadItems);
  }
  if (mode === 'edit') {
    //editing existing
    let existingWorkflowObj = yield select(selectors.workOrderResource, id);
    if (!existingWorkflowObj?.value) {
      yield call(requestWorkRequest, { wrNo: id });
      existingWorkflowObj = yield select(selectors.workOrderResource, id);
      if (!existingWorkflowObj.value) {
        //error
        return;
      }
    }
    const { value: existingWorkflow } = existingWorkflowObj;
    const observationDt = moment(existingWorkflow.observationDate).format('YYYY-MM-DD HH:mm:ss');
    const targetDt = moment(existingWorkflow.targetDate).format('YYYY-MM-DD HH:mm:ss');
    const wRDate = moment(existingWorkflow.date).format('YYYY-MM-DD HH:mm:ss');
    let wrNo = '';
    if (mode !== 'copy') {
      wrNo = existingWorkflow.workrequestNoout
    }
    return yield put(actions.workflow.update.initSuccess({
      id,
      observationDate: observationDt.split(' ')[0],
      observationTime: observationDt.split(' ')[1],
      targetDate: targetDt.split(' ')[0],
      targetTime: targetDt.split(' ')[1],
      observationDetails: existingWorkflow.observationDetails,
      autoCloseFlag: existingWorkflow.autoclose,
      date: wRDate.split(' ')[0],
      fileList: existingWorkflow.GetfileListinfo.map(i => ({ ...i, status: 'UPLOADED' })),
      wrOn: existingWorkflow.workrequestOnout,
      eqplocCode: existingWorkflow.equipmentCodeout,
      Guid: existingWorkflow.Guid,
      locationCode: existingWorkflow.locationCodeout,
      problemCode: existingWorkflow.problemCode,
      problemDesc: existingWorkflow.problemDesc,
      reportedByCode: existingWorkflow.reportedByCodeout,
      reportedByName: existingWorkflow.reportedByNameout,
      status: existingWorkflow.Statusdesc,
      time: wRDate.split(' ')[1],
      Timestamp: existingWorkflow.timestamp + 1 || 0,
      workGroup: existingWorkflow.workGroupout,
      workPhone: existingWorkflow.workPhone,
      workrequestNo: wrNo,
      wrCategory: existingWorkflow.Categoryout,
      wrDesc: existingWorkflow.wrDesc,
      wrhdndate1: "",
      wrhdndate2: "",
      wrhdndate3: "",
      wrhdnint1: null,
      wrhdnint2: null,
      wrhdnint3: null,
      wrhdnnumeric1: null,
      wrhdnnumeric2: null,
      wrhdnnumeric3: null,
      wrhdnstring1: "",
      wrhdnstring2: "",
      wrhdnstring3: "",
      wrhdnstring4: "",
      wrhdnstring5: "",
      wrPriority: existingWorkflow.Priorityout,
      wrType: existingWorkflow.Typeout,
      Actionflag: "Create_WR",
      autoclosedesc: '',
      equipmentCondition: existingWorkflow.equipmentCondition,
    }));
  }
  const defaultValues = yield select(selectors.workflowDefaultValues);
  const { reportedbyinformation = [], probleminformation = [] } = yield select(selectors.workflowItems);
  const currentDate = convertUtcToTimezone({ date: new Date(), dateFormat: 'YYYY-MM-DD HH:mm:ss', isDateOnly: true })
  return yield put(actions.workflow.update.initSuccess({
    id,
    observationDate: currentDate.split(' ')[0],
    observationTime: currentDate.split(' ')[1],
    targetDate: currentDate.split(' ')[0],
    targetTime: currentDate.split(' ')[1],
    observationDetails: '',
    autoCloseFlag: defaultValues.autoCloseCode,
    date: currentDate.split(' ')[0],
    fileList: [],
    wrOn: defaultValues.wrOnCode,
    eqplocCode: defaultValues.eqplocCode,
    Guid: "",
    locationCode: "",
    problemCode: probleminformation?.[0]?.problemCode || '',
    problemDesc: probleminformation?.[0]?.problemDesc || '',
    reportedByCode: reportedbyinformation?.[0]?.reportedbycode || '',
    reportedByName: reportedbyinformation?.[0]?.reportedbyname || '',
    status: "Fresh",
    time: currentDate.split(' ')[1],
    Timestamp: null,
    workGroup: defaultValues.wgCode,
    workPhone: "",
    workrequestNo: "",
    wrCategory: defaultValues.categoryCode,
    wrDesc: defaultValues.wrOnDesc,
    wrhdndate1: "",
    wrhdndate2: "",
    wrhdndate3: "",
    wrhdnint1: null,
    wrhdnint2: null,
    wrhdnint3: null,
    wrhdnnumeric1: null,
    wrhdnnumeric2: null,
    wrhdnnumeric3: null,
    wrhdnstring1: "",
    wrhdnstring2: "",
    wrhdnstring3: "",
    wrhdnstring4: "",
    wrhdnstring5: "",
    wrPriority: defaultValues.priorityCode,
    wrType: defaultValues.typeCode,
    Actionflag: "Create_WR",
    autoclosedesc: defaultValues.autoCloseDesc,
    equipmentCondition: defaultValues.eqpConditionCode,
  }));
}

export function* workflowSave() {
  const { value: workflow = {} } = yield select(selectors.workflow);
  const query = createWorkflowRequest(workflow);
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.errors) {
      const parsedErrorJson = JSON.parse(resp.errors[0].message || "{}");
      return yield put(actions.workflow.update.saveFailed(parsedErrorJson.description || 'Something went wrong!'));
    }
    if (resp?.['workRequest_postWrkReqCreation']?.createWorkRequest?.data) {
      const { workrequestNo } = resp['workRequest_postWrkReqCreation'].createWorkRequest.data
      return yield put(actions.workflow.update.saveSuccess(workrequestNo));
    }
    return yield put(actions.workflow.update.saveFailed('Something went wrong!'));

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
    return yield put(actions.workflow.update.saveFailed(message));
  }
}

export function* workflowAddAttachment({ file }) {
  const { data, error } = yield call(uploadAttachment, { file });
  if(data){
    yield put(actions.workflow.update.addAttachmentSuccess({ filesIndividualRef: data.fileId, name: file.name, filesMainRef: data.name, relativePath: 'APIEamwrkreq' }));
  }
  else {
    yield put(actions.workflow.update.addAttachmentFailed({ name: file.name }));
  }
}



export const workflowSagas = [
  takeLatest(actionTypes.WORKFLOW.COMBO_ITEMS.REQUEST, workflowLoadItems),
  takeLatest(actionTypes.WORKFLOW.UPDATE.INIT, workflowUpdateInit),
  takeEvery(actionTypes.WORKFLOW.UPDATE.SAVE, workflowSave),
  takeEvery(actionTypes.WORKFLOW.UPDATE.ADD_ATTACHMENT, workflowAddAttachment),
];

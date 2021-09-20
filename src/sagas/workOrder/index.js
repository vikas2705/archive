
import {
  call,
  takeEvery,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { apiCallWithRetry } from "..";
import actions from "../../actions";
import actionTypes from "../../actions/types";
import { selectors } from "../../reducers";
import { getWorkOrderMetadata } from "../../queries/workOrder/getWorkOrderMetadata";
import { convertUtcToTimezone } from "../../utils/date";
import { createWorkOrderRequest } from '../../queries/workOrder/createWorkOrderRequest';
import { uploadAttachment } from "../attachment";
import { getWorkOrderMetadataParentListItem } from "../../queries/workOrder/getWorkOrderMetadataParentListItem";

/**
 *
 * This loads workOrder combo box items
 */
export function* workOrderLoadItems() {
  const query = getWorkOrderMetadata();
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workOrder',
      hidden: true,
    })
    if (resp?.['EAMWorkOrder_getMetaData_UpeDefault']?.getListItems?.data) {
      const comboItems = resp['EAMWorkOrder_getMetaData_UpeDefault'].getListItems.data;
      const defaultValues = resp['EAMWorkOrder_getMetaData_UpeDefault'].screenLaunchdefaultvaluesUPEassistedforallProperties.data;
      return yield put(actions.workOrder.comboItems.received(comboItems, defaultValues));
    }
    return yield put(actions.workOrder.comboItems.failed());

  } catch (e) {
    return yield put(actions.workOrder.comboItems.failed());
  }
}


export function* workOrderUpdateInit({ id }) {
  const workflowItems = yield select(selectors.workOrderItems);
  if (workflowItems.status !== 'success') {
    //load required workflow combo items
    yield call(workOrderLoadItems);
  }
  // const workflows = yield select(selectors.workOrders) || [];
  // const workflow = workflows.find(workflow => workflow.id === id);
  // if (workflow) {
  //   return yield put(actions.workOrder.update.initSuccess(workflow));
  // }
  const defaultValues = yield select(selectors.workOrderDefaultValues);
  const currentDate = convertUtcToTimezone({ date: new Date(), dateFormat: 'YYYY-MM-DD HH:mm:ss', isDateOnly: true })
  return yield put(actions.workOrder.update.initSuccess({
    id,
    actionFlag: "QUICKWO",
    WoEqpLocCode: defaultValues.WOEqpLocCode,
    WoOnEqpLocFlag: "E",
    WorkGroup: defaultValues.WorkGroupCode,
    WorkOrderDesc: "",
    WorkPhone1: defaultValues.WorkPhone1 === '-1' ? '' : defaultValues.WorkPhone1,
    WorkPhone2: defaultValues.WorkPhone2 === '-1' ? '' : defaultValues.WorkPhone2,
    WoScheduledComplDate: "",
    WoScheduledComplTime: "",
    WoScheduledStartDate: currentDate.split(' ')[0],
    WoScheduledStartTime: currentDate.split(' ')[1],
    WoSource: "",
    WoStatus: "",
    accountCode: "",
    AdditionalFaiureInfo: "",
    analysisCode: "",
    contractNo: "",
    CopyTasksFromProcedure: "",
    CostCenterCode: "PL1",
    CostType: "RE",
    FailureDate: currentDate.split(' ')[0],
    fbid: "",
    WoSubGroup: "",
    WoTime: currentDate.split(' ')[1],
    WoType: defaultValues.TypeCode,
    genfrom: "",
    Guid: "",
    holdReason: "",
    InterruptedDatetime: "",
    LeadCode: "",
    MajorProblemCode: defaultValues.ProblemCode,
    MajorProblemDesc: defaultValues.ProblemDesc,
    ParentWOCode: "",
    percentCompleted: 1.00,
    PerformRCAFlag: defaultValues.PerformRCA === "1" ? "1" : "0",
    PlanningGroup: defaultValues.PlanningGroupCode,
    projectCode: "",
    proposalid: "",
    ReasonCode: "",
    RejectionReason: "",
    Remarks: "",
    ScheduleBy: "",
    SchedulingRemarks: "",
    subAnalysisCode: "",
    SupervisorCode: defaultValues.SupervisorCode,
    TimeStamp: 1,
    WoAuthRequiredFlag: "0",
    WoAuthUser: "",
    WoCategory: "Ext",
    WoClearanceRequiredFlag: "",
    WoDate: currentDate.split(' ')[0],
    WoDuration: "",
    WoEqpLocDescription: defaultValues.WOEqpLocDesc,
    WoGroup: "",
    WoMiscCost: "",
    WoPermitType: "",
    WoPriority: defaultValues.PriorityCode,
    WoRank: "",
    WorkOrderNo: "",
    fileList: [],
    CompanyBaseCurrency: defaultValues.CompanyBaseCurrency,
    //{name: '', fileId: '', modeFlag}
    // { filesIndividualRef: "${file.fileId}", filesMainRef: "${file.name}", ModeFlag: "I" },
  }));
}

export function* workOrderSave() {
  const { value: workOrder = {} } = yield select(selectors.workOrder);
  const query = createWorkOrderRequest(workOrder);
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workOrder',
      hidden: true,
    })
    if (resp?.errors) {
      const parsedErrorJson = JSON.parse(resp.errors[0].message || "{}");
      return yield put(actions.workOrder.update.saveFailed(parsedErrorJson.description || 'Something went wrong!'));
    }
    if (resp?.['EAMWorkOrder_postworkOrderCreation']?.createWorkOrder?.data) {
      const { WorkOrderNoout } = resp['EAMWorkOrder_postworkOrderCreation'].createWorkOrder.data
      return yield put(actions.workOrder.update.saveSuccess(WorkOrderNoout));
    }
    return yield put(actions.workOrder.update.saveFailed('Something went wrong!'));

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
    return yield put(actions.workOrder.update.saveFailed(message));
  }
}

export function* workOrderAddAttachment({ file }) {
  const { data, error } = yield call(uploadAttachment, { file });
  if (data) {
    yield put(actions.workOrder.update.addAttachmentSuccess({
      filesIndividualRef: data.fileId, name: file.name, filesMainRef: data.name, relativePath: 'APIEamwrkreq',
    }));
  }
  else {
    yield put(actions.workOrder.update.addAttachmentFailed({ name: file.name }));
  }
}

export function* patchField({ fieldId, value }) {
  // const {data, error} = yield call(uploadAttachment,{file});
  if (fieldId === "WoEqpLocCode") {
    const { value: workOrder } = yield select(selectors.workOrder);
    const { WoOnEqpLocFlag } = workOrder || {};
    const obj = yield select(selectors.findEquipmentLocation, value, WoOnEqpLocFlag);
    yield put(actions.workOrder.update.patchField("criticality", obj.CriticalityDesc));
    yield put(actions.workOrder.update.patchField("ParentWOCode", obj.ParentCode));
  }
}

export function* workOrderParentListItemRequest({ eqpLocCode, eqpOrLoc }) {
  if (!eqpLocCode) {
    return;
  }
  const opts = yield select(selectors.workOrderParentList, { eqpLocCode, eqpOrLoc });
  if (opts) {
    return;
  }

  const query = getWorkOrderMetadataParentListItem({ eqpLocCode, eqpOrLoc });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      gCtxtCmp: 'workOrder',
      hidden: true,
    })
    if (resp?.['EAMWorkOrder_getMetaData_UpeDefault']?.getListItems?.data?.Parentinfo) {
      const defaultParentOptions = resp['EAMWorkOrder_getMetaData_UpeDefault'].getListItems.data?.Parentinfo;
      return yield put(actions.workOrder.update.parentListItem.received({ value: defaultParentOptions, eqpLocCode, eqpOrLoc }));
    }
    // return yield put(actions.workOrder.comboItems.failed());

  } catch (e) {
    // return yield put(actions.workOrder.comboItems.failed());
  }
}

export const workOrderSagas = [
  takeLatest(actionTypes.WORK_ORDER.COMBO_ITEMS.REQUEST, workOrderLoadItems),
  takeLatest(actionTypes.WORK_ORDER.UPDATE.INIT, workOrderUpdateInit),
  takeLatest(actionTypes.WORK_ORDER.UPDATE.PARENT_LIST_ITEM.REQUEST, workOrderParentListItemRequest),
  takeEvery(actionTypes.WORK_ORDER.UPDATE.SAVE, workOrderSave),
  takeLatest(actionTypes.WORK_ORDER.UPDATE.PATCH_FIELD, patchField),
  takeEvery(actionTypes.WORK_ORDER.UPDATE.ADD_ATTACHMENT, workOrderAddAttachment),
];

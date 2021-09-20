import produce from 'immer';
import { createSelector } from 'reselect';
import actionTypes from '../../../actions/types';

const reducer = (state = {}, action) => {
  const { type, wrNo, value, message } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST:
        if (!draft.resource) {
          draft.resource = {};
        }
        if (!draft.resource[wrNo]) {
          draft.resource[wrNo] = {}
          draft.resource[wrNo].status = 'requested';
        }
        if (draft?.resource?.[wrNo]?.actions?.errMessage) {
          delete draft.resource[wrNo].actions.errMessage;
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST_FAILED:
        if (draft?.resource?.[wrNo]) {
          draft.resource[wrNo].status = 'failed';
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.RECEIVED:
        if (!draft.resource) {
          draft.resource = {};
        }
        if (!draft.resource[wrNo]) {
          draft.resource[wrNo] = {}
        }
        draft.resource[wrNo].status = 'received';
        draft.resource[wrNo].value = value;
        break;

      case actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.REQUEST:
        if (!draft.resource) {
          draft.resource = {};
        }
        if (!draft.resource[wrNo]) {
          draft.resource[wrNo] = {};

        }
        if (!draft.resource[wrNo].workOrder) {
          draft.resource[wrNo].workOrder = {};
        }
        draft.resource[wrNo].workOrder.assignStatus = ''
        draft.resource[wrNo].workOrder.status = 'requested'
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.REQUEST_FAILED:
        if (draft?.resource?.[wrNo]?.workOrder) {
          draft.resource[wrNo].workOrder.status = 'failed';
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.RECEIVED:
        if (draft?.resource?.[wrNo]?.workOrder) {
          draft.resource[wrNo].workOrder.status = 'received';
          draft.resource[wrNo].workOrder.value = value;
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.ASSIGN:
        if (draft?.resource?.[wrNo]?.workOrder) {
          draft.resource[wrNo].workOrder.assignStatus = 'requested';
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.ASSIGN_FAIL:
        if (draft?.resource?.[wrNo]?.workOrder) {
          draft.resource[wrNo].workOrder.assignStatus = 'failed';
        }
        break;

      case actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST_ACTION:
        if (!draft?.resource?.[wrNo]) {
          draft.resource[wrNo] = {};
        }
        if (!draft?.resource?.[wrNo]?.actions) {
          draft.resource[wrNo].actions = {};
        }
        draft.resource[wrNo].actions.status = 'requested';
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.RECEIVED_ACTION:
        if (draft?.resource?.[wrNo]?.actions) {
          draft.resource[wrNo].actions.status = 'received';
          draft.resource[wrNo].actions.value = value;
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.CLEAR_MESSAGE:
        if (draft?.resource?.[wrNo]?.actions?.errMessage) {
          delete draft.resource[wrNo].actions.errMessage;
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.TRIGGER_ACTION:
        if (draft?.resource?.[wrNo]?.actions?.errMessage) {
          delete draft.resource[wrNo].actions.errMessage;
        }
        break;
      case actionTypes.WORK_REQUEST_V2.RESOURCE.TRIGGER_ACTION_FAILED:
        if (draft?.resource?.[wrNo]?.actions) {
          draft.resource[wrNo].actions.status = 'failed';
          draft.resource[wrNo].actions.errMessage = message;
        }
        break;

      default:
    }
  })
}

export default reducer;
const emptyObj = {};
const emptySet = [];
export const selectors = {};

selectors.workOrderResource = (state, wrNo) => {
  return state?.resource?.[wrNo] || emptyObj;
}

selectors.wrWorkOrder = (state, wrNo) => {
  return state?.resource?.[wrNo]?.workOrder || emptyObj;
}

selectors.workRequestActionErrorMsg = (state, wrNo) => {
  return state?.resource?.[wrNo]?.actions?.errMessage;
}
selectors.workRequestAvailActions = createSelector(
  (state, wrNo) => state?.resource?.[wrNo]?.actions?.value || emptySet,
  (actions) => {
    return actions.map(act => ({ id: act.AllowedActionCode, label: act.AllowedActionDesc }))
  }
);

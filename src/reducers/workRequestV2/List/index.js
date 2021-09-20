import produce from 'immer';
import { createSelector } from 'reselect';
import actionTypes from '../../../actions/types';

const reducer = (state = {}, action) => {
  const { type, taskStatus, groupBy, status, value, filter, subGroup } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORK_REQUEST_V2.LIST.CLEAR:
        delete draft.list;
        break;
      case actionTypes.WORK_REQUEST_V2.LIST.REQUEST:
        if (!draft.list) {
          draft.list = {}
        }
        if (!draft.list[groupBy]) {
          draft.list[groupBy] = {};
        }
        if (groupBy === 'Status' && subGroup !== '') {
          draft.list[groupBy].taskStatus = subGroup;
        }
        else {
          draft.list[groupBy].taskStatus = '';
        }
        draft.list[groupBy].subGroup = subGroup;
        draft.list[groupBy].status = 'requested';
        draft.list[groupBy].filter = {};
        draft.list[groupBy].pageNo = 0;
        delete draft.list[groupBy].selectedItem;
        draft.list[groupBy].count = {};
        draft.list[groupBy].list = [];
        break;
      case actionTypes.WORK_REQUEST_V2.LIST.UPDATE_TASK_STATUS:
        draft.list[groupBy].taskStatus = taskStatus;
        draft.list[groupBy].status = 'requested';
        delete draft.list[groupBy].selectedItem;
        draft.list[groupBy].pageNo = 0;
        draft.list[groupBy].list = [];
        break;

      case actionTypes.WORK_REQUEST_V2.LIST.SET_FILTER:
        draft.list[groupBy].filter = filter
        draft.list[groupBy].status = 'requested'
        delete draft.list[groupBy].selectedItem;
        draft.list[groupBy].list = [];
        draft.list[groupBy].count = {};
        draft.list[groupBy].pageNo = 0;
        delete draft.list[groupBy].selectedItem;
        break;

      case actionTypes.WORK_REQUEST_V2.LIST.SET_TASK_STATUS:
        break;

      case actionTypes.WORK_REQUEST_V2.LIST.RECEIVED:
        if (draft.list[groupBy]) {
          if (!draft.list[groupBy].list) {
            draft.list[groupBy].list = []
          }
          draft.list[groupBy].list = draft.list[groupBy].list.concat(value);
          draft.list[groupBy].status = 'received'
        }
        break;
      case actionTypes.WORK_REQUEST_V2.LIST.COUNT_RECEIVED:
        if (draft.list[groupBy]) {
          draft.list[groupBy].count = value;
        }
        break;
      case actionTypes.WORK_REQUEST_V2.LIST.REFRESH:
        if (!draft.list) {
          draft.list = {};
        }
        if (!draft.list[groupBy]) {
          draft.list[groupBy] = {}
        }
        draft.list[groupBy].status = 'requested';
        draft.list[groupBy].pageNo = 0;
        draft.list[groupBy].list = [];
        delete draft.list[groupBy].selectedItem;
        break;

      case actionTypes.WORK_REQUEST_V2.LIST.REQUEST_NEXT_PAGE:
        if (draft.list[groupBy]) {
          draft.list[groupBy].pageNo = (draft?.list[groupBy]?.pageNo || 0) + 1;
        }
        break;

      case actionTypes.WORK_REQUEST_V2.LIST.TOGGLE_ITEM_SELECTION:
        if (draft?.list?.[groupBy]) {
          if (!draft.list[groupBy]?.selectedItem) {
            draft.list[groupBy].selectedItem = [];
          }
          if (draft.list[groupBy].selectedItem.findIndex(i => i === value) !== -1) {
            draft.list[groupBy].selectedItem = draft.list[groupBy].selectedItem.filter(i => i !== value);
          } else {
            draft.list[groupBy].selectedItem.push(value);
          }
        }
        break;
      case actionTypes.WORK_REQUEST_V2.LIST.RECEIVED_ACTIONS:
        if (!draft.listActions) {
          draft.listActions = {};
        }
        if (!draft.listActions[status]) {
          draft.listActions[status] = {};
        }
        draft.listActions[status] = value;

        break;
      default:
    }
  })
}

export default reducer;
const emptyObj = {};
const emptySet = [];
export const selectors = {};


selectors.workRequestListObj = (state, groupBy) => {
  return state?.list?.[groupBy] || emptyObj;
}

selectors.workRequestStatusCount = (state, groupBy) => {
  const taskStatus = state?.list?.[groupBy]?.taskStatus || '';
  if (!taskStatus) {
    return 0;
  }
  const item = state.list[groupBy].count?.workrequestcount?.find(i => i.hdn_card_code === taskStatus)
  return item?.tabvalue || 0;
}

// selectors.workRequestListActions = (state, status) => {
//   return state?.listActions?.[status] || emptySet
// }

selectors.workRequestListActions = createSelector(
  (state, status) => state?.listActions?.[status] || emptySet,
  (actions) => {
    return actions.map(act => ({ id: act.AllowedActionCode, label: act.AllowedActionDesc }))
  }
);
selectors.workRequestListFilter = (state, groupBy) => {
  return state?.list?.[groupBy]?.filter || emptyObj;
}



// selectors.workRequestList = (state, groupBy) => {
//   const status = selectors.workRequestActiveTab(state, groupBy);
//   return state?.list?.[groupBy]?.[status] || emptyObj;
// }


selectors.previousWorkRequestId = (state, groupBy, WoReqNo) => {
  const workflows = state?.list?.[groupBy]?.list || []
  const currentWorkflowIndex = workflows.findIndex(workflow => workflow.workrequestNoout === WoReqNo);
  if (currentWorkflowIndex > 0) {
    return workflows[currentWorkflowIndex - 1].workrequestNoout;
  }
  return undefined;
}
selectors.nextWorkRequestId = (state, groupBy, WoReqNo) => {
  const workflows = state?.list?.[groupBy]?.list || []
  const currentWorkflowIndex = workflows.findIndex(workflow => workflow.workrequestNoout === WoReqNo);
  if (currentWorkflowIndex !== -1 && currentWorkflowIndex < (workflows.length - 1)) {
    return workflows[currentWorkflowIndex + 1].workrequestNoout;
  }
  return undefined;
}


selectors.isWRItemSelected = (state, groupBy, WoReqNo) => {
  if (state?.list?.[groupBy]?.selectedItem?.length && state?.list?.[groupBy]?.selectedItem?.findIndex(i => i === WoReqNo) !== -1){
    return true;
  }
  return false;
}
selectors.isAnyWRItemSelected = (state, groupBy, WoReqNo) => {
  return !!state?.list?.[groupBy]?.selectedItem?.length;
}
selectors.allWRItemSelected = (state, groupBy) => {
  return state?.list?.[groupBy]?.selectedItem || emptySet;
}



// selectors.workRequestListFilter = (state, groupBy) => {
//   const status = selectors.workRequestActiveTab(state, groupBy);
//   return state?.list?.[groupBy]?.[status]?.filter || emptyObj;
// }
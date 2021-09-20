import produce from 'immer';
import actionTypes from '../../actions/types'
import { deepClone } from 'fast-json-patch';

const reducer = (state = {}, action) => {
  const { type, value, defaultValues, filesMainRef, filesIndividualRef, relativePath, fieldId, file, fileId, name, errMsg, eqpOrLoc, eqpLocCode } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORK_ORDER.COMBO_ITEMS.REQUEST:
        if (!draft.workOrderItems) {
          draft.workOrderItems = {};
        }
        draft.workOrderItems.status = 'requested';
        break;
      case actionTypes.WORK_ORDER.COMBO_ITEMS.RECEIVED:
        if (!draft.workOrderItems) {
          draft.workOrderItems = {};
        }
        if (!draft.defaultValues) {
          draft.defaultValues = {};
        }
        draft.workOrderItems.status = 'success';
        Object.assign(draft.workOrderItems, value)
        Object.assign(draft.defaultValues, defaultValues)
        break;
      case actionTypes.WORK_ORDER.COMBO_ITEMS.FAILED:
        if (!draft.workOrderItems) {
          draft.workOrderItems = {};
        }
        draft.workOrderItems.status = 'failed';

        break;

      case actionTypes.WORK_ORDER.UPDATE.INIT_SUCCESS:
        if (!draft.workOrder) {
          draft.workOrder = {};
        }
        draft.workOrder.value = value;
        draft.workOrder.initValue = deepClone(value);
        draft.workOrder.status = 'success';
        break;
      case actionTypes.WORK_ORDER.UPDATE.PATCH_FIELD:
        if (draft.workOrder) {
          draft.workOrder.value[fieldId] = value;
        }
        break;
      case actionTypes.WORK_ORDER.UPDATE.SAVE:
        draft.workOrder.saveStatus = 'saving';
        delete draft.workOrder.saveErrorMsg;
        break;
      case actionTypes.WORK_ORDER.UPDATE.SAVE_SUCCESS:
        draft.workOrder.saveStatus = 'completed';
        draft.workOrder.workOrderNo = value;
        break;
      case actionTypes.WORK_ORDER.UPDATE.SAVE_FAILED:
        draft.workOrder.saveStatus = 'failed';
        draft.workOrder.saveErrorMsg = errMsg;
        break;
      case actionTypes.WORK_ORDER.UPDATE.CLEAR_MSG:
        delete draft.workOrder.saveErrorMsg;
        break;
      case actionTypes.WORK_ORDER.UPDATE.CLEAN:
        delete draft.workOrder;
        break;
      case actionTypes.WORK_ORDER.UPDATE.ADD_ATTACHMENT_SUCCESS:
        if (draft.workOrder) {
          const item = draft.workOrder.value.fileList.find(i => i.uiName === name);
          if (item) {
            item.filesMainRef = filesMainRef;
            item.filesIndividualRef = filesIndividualRef;
            item.relativePath = relativePath;

            item.name = name;
            item.status = 'UPLOADED'
          }
          // draft.workOrder.value.fileList.push({fileId, name})
        }

        break;
      case actionTypes.WORK_ORDER.UPDATE.ADD_ATTACHMENT:
        if (draft.workOrder) {
          if (!draft.workOrder.value.fileList) {
            draft.workOrder.value.fileList = [];
          }
          draft.workOrder.value.fileList.push({ uiName: file.name, type: file.type, status: 'UPLOADING' })
        }
        break;
      case actionTypes.WORK_ORDER.UPDATE.REMOVE_ATTACHMENT:
        if (draft.workOrder) {
          const item = draft.workOrder.value.fileList.find(i => i.filesIndividualRef === filesIndividualRef);
          if (item) {
            item.status = 'DELETED'
          }
          // draft.workOrder.value.fileList.push({fileId, name})
        }
        break;
      case actionTypes.WORK_ORDER.UPDATE.ADD_ATTACHMENT_FAILED:
        if (draft?.workOrder?.value?.fileList?.length) {
          const clonedFileSet = deepClone(draft.workOrder.value.fileList);
          const newFileList = clonedFileSet.filter(i => i.uiName !== name);
          draft.workOrder.value.fileList = newFileList;
          draft.workOrder.value.fileListError = "Failed to Upload";
        }
        break;
      case actionTypes.WORK_ORDER.UPDATE.PARENT_LIST_ITEM.RECEIVED:
        if (!draft.workOrder?.parentListItems) {
          draft.workOrder.parentListItems = {};
        }
        draft.workOrder.parentListItems[`${eqpOrLoc}-${eqpLocCode}`] = value;
        break;
      default:
    }
  })
}

export default reducer;
const emptyObj = {};
export const selectors = {};
selectors.workOrder = (state) => {
  if (!state) {
    return emptyObj;
  }

  return state.workOrder || emptyObj;
};

selectors.workOrderItems = (state) => {
  if (!state) {
    return emptyObj;
  }

  return state.workOrderItems || emptyObj;
};
selectors.workOrderDefaultValues = (state) => {
  if (!state) {
    return emptyObj;
  }

  return state.defaultValues || emptyObj;
};

selectors.workOrderParentList = (state, { eqpLocCode, eqpOrLoc }) => {
  return state?.workOrder?.parentListItems?.[`${eqpOrLoc}-${eqpLocCode}`];
};

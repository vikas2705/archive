import produce from 'immer';
import actionTypes from '../../actions/types'
import { deepClone } from 'fast-json-patch';

const reducer = (state = {}, action) => {
  const { type, value, defaultValues, filesMainRef, fieldId, file, filesIndividualRef, name, relativePath, errMsg, workrequestNo } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORKFLOW.COMBO_ITEMS.REQUEST:
        if (!draft.workflowItems) {
          draft.workflowItems = {};
        }
        draft.workflowItems.status = 'requested';
        break;
      case actionTypes.WORKFLOW.COMBO_ITEMS.RECEIVED:
        if (!draft.workflowItems) {
          draft.workflowItems = {};
        }
        if (!draft.defaultValues) {
          draft.defaultValues = {};
        }
        draft.workflowItems.status = 'success';
        Object.assign(draft.workflowItems, value)
        Object.assign(draft.defaultValues, defaultValues)
        break;
      case actionTypes.WORKFLOW.COMBO_ITEMS.FAILED:
        if (!draft.workflowItems) {
          draft.workflowItems = {};
        }
        draft.workflowItems.status = 'failed';

        break;

      case actionTypes.WORKFLOW.UPDATE.INIT_SUCCESS:
        if (!draft.workflow) {
          draft.workflow = {};
        }
        draft.workflow.value = value;
        draft.workflow.initValue = deepClone(value);
        draft.workflow.status = 'success';
        break;
      case actionTypes.WORKFLOW.UPDATE.PATCH_FIELD:
        if (draft.workflow) {
          draft.workflow.value[fieldId] = value;
        }
        break;
      case actionTypes.WORKFLOW.UPDATE.SAVE:
        draft.workflow.saveStatus = 'saving';
        delete draft.workflow.saveErrorMsg;
        break;
      case actionTypes.WORKFLOW.UPDATE.SAVE_SUCCESS:
        draft.workflow.saveStatus = 'completed';
        draft.workflow.workrequestNo = workrequestNo;
        break;
      case actionTypes.WORKFLOW.UPDATE.SAVE_FAILED:
        draft.workflow.saveStatus = 'failed';
        draft.workflow.saveErrorMsg = errMsg;
        break;
      case actionTypes.WORKFLOW.UPDATE.CLEAR_MSG:
        delete draft.workflow.saveErrorMsg;
        break;
      case actionTypes.WORKFLOW.UPDATE.CLEAN:
        delete draft.workflow;
        break;
      case actionTypes.WORKFLOW.UPDATE.ADD_ATTACHMENT_SUCCESS:
        if (draft.workflow) {
          const item = draft.workflow.value.fileList.find(i => i.uiName === name);
          if (item) {
            item.filesIndividualRef = filesIndividualRef;
            item.relativePath = relativePath;
            item.name = name;
            item.status = 'UPLOADED';
            item.filesMainRef = filesMainRef;

          }
          // draft.workflow.value.fileList.push({fileId, name})
        }

        break;
      case actionTypes.WORKFLOW.UPDATE.REMOVE_ATTACHMENT:
        if (draft.workOrder) {
          const item = draft.workflow.value.fileList.find(i => i.filesIndividualRef === filesIndividualRef);
          if (item) {
            item.status = 'DELETED'
          }
          // draft.workOrder.value.fileList.push({fileId, name})
        }
        break;
      case actionTypes.WORKFLOW.UPDATE.ADD_ATTACHMENT:
        if (draft.workflow) {
          if (!draft.workflow.value.fileList) {
            draft.workflow.value.fileList = [];
          }
          draft.workflow.value.fileList.push({ uiName: file.name, type: file.type, status: 'UPLOADING' })
        }
        break;
      case actionTypes.WORKFLOW.UPDATE.ADD_ATTACHMENT_FAILED:
          if (draft?.workflow?.value?.fileList?.length) {
            const clonedFileSet = deepClone(draft.workflow.value.fileList);
            const newFileList = clonedFileSet.filter(i => i.uiName !== name);
            draft.workflow.value.fileList = newFileList;
            draft.workflow.value.fileListError = "Failed to Upload";
          }
          break;
      default:
    }
  })
}

export default reducer;
const emptyObj = {};
export const selectors = {};
selectors.workflow = (state) => {
  if (!state) {
    return emptyObj;
  }

  return state.workflow || emptyObj;
};

selectors.workflowItems = (state) => {
  if (!state) {
    return emptyObj;
  }

  return state.workflowItems || emptyObj;
};
selectors.workflowDefaultValues = (state) => {
  if (!state) {
    return emptyObj;
  }

  return state.defaultValues || emptyObj;
};


import actionTypes from './types';

function action(type, payload = {}) {
  return { type, ...payload };
}


const workflow = {
  comboItems: {
    request: () => action(actionTypes.WORKFLOW.COMBO_ITEMS.REQUEST, {}),
    received: (value, defaultValues) => action(actionTypes.WORKFLOW.COMBO_ITEMS.RECEIVED, { value, defaultValues }),
    failed: () => action(actionTypes.WORKFLOW.COMBO_ITEMS.FAILED, {}),
  },
  update: {
    init: (id, mode) => action(actionTypes.WORKFLOW.UPDATE.INIT, { id, mode }),
    initSuccess: (value) => action(actionTypes.WORKFLOW.UPDATE.INIT_SUCCESS, { value }),
    patchField: (fieldId, value) => action(actionTypes.WORKFLOW.UPDATE.PATCH_FIELD, { fieldId, value }),
    save: () => action(actionTypes.WORKFLOW.UPDATE.SAVE, {}),
    saveFailed: (errMsg) => action(actionTypes.WORKFLOW.UPDATE.SAVE_FAILED, { errMsg }),
    saveSuccess: (workrequestNo) => action(actionTypes.WORKFLOW.UPDATE.SAVE_SUCCESS, { workrequestNo }),
    addAttachment: (file) => action(actionTypes.WORKFLOW.UPDATE.ADD_ATTACHMENT, { file }),
    removeAttachment: (filesIndividualRef) => action(actionTypes.WORKFLOW.UPDATE.REMOVE_ATTACHMENT, { filesIndividualRef }),
    addAttachmentSuccess: ({ filesIndividualRef, name, relativePath, filesMainRef }) => action(actionTypes.WORKFLOW.UPDATE.ADD_ATTACHMENT_SUCCESS, { filesIndividualRef, name, relativePath, filesMainRef }),
    addAttachmentFailed: ({ name }) => action(actionTypes.WORKFLOW.UPDATE.ADD_ATTACHMENT_FAILED, { name }),
    clearMsg: () => action(actionTypes.WORKFLOW.UPDATE.CLEAR_MSG, {}),
    clean: () => action(actionTypes.WORKFLOW.UPDATE.CLEAN, {}),

  }
};

const context = {
  getToken: (value) => action(actionTypes.CONTEXT.GET_TOKEN, { value })
};

const workRequestV2 = {
  dashboard: {
    init: () =>   action(actionTypes.WORK_REQUEST_V2.DASHBOARD.INIT, {}),
    changeFilter: (groupBy) => action(actionTypes.WORK_REQUEST_V2.DASHBOARD.CHANGE_FILTER, {groupBy}),
    selectFilter: (value) => action(actionTypes.WORK_REQUEST_V2.DASHBOARD.FILTER_SELECT, {value}),
    receivedCount: (groupBy, value) =>   action(actionTypes.WORK_REQUEST_V2.DASHBOARD.RECEIVED_COUNT, {groupBy, value}),
  },
  resource: {
    request: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST, {wrNo}),
    received: (wrNo, value) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.RECEIVED, {wrNo, value}),
    requestFailed: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST_FAILED, {wrNo}),
    requestActions: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.REQUEST_ACTION, {wrNo}),
    receivedActions: (wrNo, value) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.RECEIVED_ACTION, {wrNo, value}),
    triggerAction: ({actionFlag, wrNo}) => action(actionTypes.WORK_REQUEST_V2.RESOURCE.TRIGGER_ACTION, {actionFlag, wrNo }),
    clearMessage: (wrNo) => action(actionTypes.WORK_REQUEST_V2.RESOURCE.CLEAR_MESSAGE, {wrNo}),
    triggerActionFailed: (wrNo, message) => action(actionTypes.WORK_REQUEST_V2.RESOURCE.TRIGGER_ACTION_FAILED, {wrNo, message }),
    workOrder: {
      request: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.REQUEST, {wrNo}),
      received: (wrNo, value) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.RECEIVED, {wrNo, value}),
      requestFailed: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.REQUEST_FAILED, {wrNo}),
      assign: (wrNo, woNo) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.ASSIGN, {wrNo, woNo}),
      assignFailed: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.RESOURCE.WORK_ORDER.ASSIGN_FAIL, {wrNo}),
    },
  },
  timeline: {
    request: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.TIMELINE.REQUEST, {wrNo}),
    received: (wrNo, value) =>   action(actionTypes.WORK_REQUEST_V2.TIMELINE.RECEIVED, {wrNo, value}),
    requestFailed: (wrNo) =>   action(actionTypes.WORK_REQUEST_V2.TIMELINE.REQUEST_FAILED, {wrNo}),
  },
  filterOpts: {
    init: (Actionflag) => action(actionTypes.WORK_REQUEST_V2.FILTER_OPTIONS.INIT, {Actionflag}),
    initSuccess: (value) => action(actionTypes.WORK_REQUEST_V2.FILTER_OPTIONS.INIT_SUCCESS, { value }),
    updateSelected : (value, Actionflag, skipFetch) => action(actionTypes.WORK_REQUEST_V2.FILTER_OPTIONS.UPDATE_SELECTED, { value, Actionflag, skipFetch}),
  },
  count: {
    request: (groupBy, Actionflag, filters) => action(actionTypes.WORK_REQUEST_V2.COUNT.REQUEST, { groupBy,Actionflag, filters }),
    received: (groupBy, Actionflag, value) => action(actionTypes.WORK_REQUEST_V2.COUNT.RECEIVED, { groupBy, Actionflag, value }),
    requestFailed: (groupBy, Actionflag) => action(actionTypes.WORK_REQUEST_V2.COUNT.REQUEST_FAILED, { groupBy, Actionflag }),
  },
  list: {
    // init: (groupBy, status,) => action(actionTypes.WORK_REQUEST_V2.LIST.INIT, { groupBy, status }),
    request: (groupBy, subGroup,) => action(actionTypes.WORK_REQUEST_V2.LIST.REQUEST, { groupBy, subGroup }),
    received: (groupBy, value) => action(actionTypes.WORK_REQUEST_V2.LIST.RECEIVED, { groupBy, value }),
    clear: () => action(actionTypes.WORK_REQUEST_V2.LIST.CLEAR, {}),
    setFilter:  (groupBy, filter) => action(actionTypes.WORK_REQUEST_V2.LIST.SET_FILTER, { groupBy, filter, isFilterSet: true }),
    receivedCount: (groupBy, value) => action(actionTypes.WORK_REQUEST_V2.LIST.COUNT_RECEIVED, { groupBy, value }),
    requestFailed: (groupBy, status) => action(actionTypes.WORK_REQUEST_V2.LIST.REQUEST_FAILED, { groupBy, status }),
    updateTaskStatus: (groupBy, taskStatus, skipFetch) => action(actionTypes.WORK_REQUEST_V2.LIST.UPDATE_TASK_STATUS, { groupBy, taskStatus, skipFetch }),
    requestNextPage: (groupBy, status) => action(actionTypes.WORK_REQUEST_V2.LIST.REQUEST_NEXT_PAGE, { groupBy, status }),
    refresh: (groupBy) => action(actionTypes.WORK_REQUEST_V2.LIST.REFRESH, { groupBy }),
    requestActions: (status) => action(actionTypes.WORK_REQUEST_V2.LIST.REQUEST_ACTIONS, {status}),
    receivedActions: (status, value) => action(actionTypes.WORK_REQUEST_V2.LIST.RECEIVED_ACTIONS, { status, value }),
    triggerAction: ({groupBy, actionFlag, workrequestNo, allSelected = false}) => action(actionTypes.WORK_REQUEST_V2.LIST.TRIGGER_ACTION, {groupBy, actionFlag, workrequestNo, allSelected }),
    requestCount:  (groupBy, status,) => action(actionTypes.WORK_REQUEST_V2.LIST.REQUEST_COUNT, { groupBy, status }),
    toggleItemSelect: (groupBy, value)  => action(actionTypes.WORK_REQUEST_V2.LIST.TOGGLE_ITEM_SELECTION, { groupBy, value }),
  },
}
const workRequest = {
  comboItems: {
    received: (value) => action(actionTypes.WORKREQUEST.COMBO_ITEMS.RECEIVED, { value }),
    failed: () => action(actionTypes.WORKREQUEST.COMBO_ITEMS.FAILED, {}),
  },
  getCountSuccess: (value) => action(actionTypes.WORKREQUEST.GET_COUNT_SUCCESS, { value }),
  getListSuccess: (value) => action(actionTypes.WORKREQUEST.GET_LIST_SUCCESS, { value }),
  applyFilter: (value) => action(actionTypes.WORKREQUEST.FILTER, { value }),
  refresh: (value) => action(actionTypes.WORKREQUEST.REFRESH, { value }),
  getListActionSuccess: (value) => action(actionTypes.WORKREQUEST.GET_LISTACTION_SUCCESS, { value }),
  singleWRSelection: (value) => action(actionTypes.WORKREQUEST.SINGLE_WRSELECTION, { value }),
  multiWRSelection: (value) => action(actionTypes.WORKREQUEST.MULTI_WRSELECTION, { value }),
  getOverviewSuccess: (value) => action(actionTypes.WORKREQUEST.GET_OVERVIEW_SUCCESS, { value }),
  getOverviewCardSuccess: (value) => action(actionTypes.WORKREQUEST.GET_OVERVIEWCARD_SUCCESS, { value }),
  getOverviewCardImgSuccess: (value) => action(actionTypes.WORKREQUEST.GET_OVERVIEWCARD_IMG_SUCCESS, { value }),
  getTimelineSuccess: (value) => action(actionTypes.WORKREQUEST.GET_TIMELINE_SUCCESS, { value }),
  getWrWoSuccess: (value) => action(actionTypes.WORKREQUEST.GET_WRWO_SUCCESS, { value })
};

const equipmentLocations = {
  request: ({ eqpOrLoc, eqpLocCode, eqpLocDesc }) => action(actionTypes.EQUIPMENT_LOCATIONS.REQUEST, { eqpOrLoc, eqpLocCode, eqpLocDesc }),
  received: ({ eqpLocCode, eqpOrLoc, value }) => action(actionTypes.EQUIPMENT_LOCATIONS.RECEIVED, { eqpLocCode, value, eqpOrLoc }),
  failed: ({ eqpOrLoc }) => action(actionTypes.EQUIPMENT_LOCATIONS.FAILED, { eqpOrLoc }),
  mapLocations: {
    request: ({ lat, lng, eqpOrLoc }) => action(actionTypes.EQUIPMENT_LOCATIONS.MAP_LOCATIONS.REQUEST, { lat, lng, eqpOrLoc }),
    received: (value) => action(actionTypes.EQUIPMENT_LOCATIONS.MAP_LOCATIONS.RECEIVED, { value }),
  },
  groupEqpAndLoc: {
    request: ({ wrkGrpCode, eqpLocCode, parentEqpCode }) => action(actionTypes.EQUIPMENT_LOCATIONS.GROUP_EQP_AND_LOC.REQUEST, { wrkGrpCode, eqpLocCode, parentEqpCode }),
    received: ({ wrkGrpCode, eqpLocCode, parentEqpCode, value }) => action(actionTypes.EQUIPMENT_LOCATIONS.GROUP_EQP_AND_LOC.RECEIVED, { wrkGrpCode, eqpLocCode, parentEqpCode, value }),
  },
  planningGroup: {
    request: ({ planningGrpCode, parentCode }) => action(actionTypes.EQUIPMENT_LOCATIONS.PLANNING_GROUP.REQUEST, { planningGrpCode, parentCode }),
    received: ({ planningGrpCode, parentCode, value }) => action(actionTypes.EQUIPMENT_LOCATIONS.PLANNING_GROUP.RECEIVED, { planningGrpCode, parentCode, value }),
  },
}
const assets = {
  request: ({ fileId, relativePath }) => action(actionTypes.ASSETS.REQUEST, { fileId, relativePath }),
  received: ({ fileId, relativePath, byteArr }) => action(actionTypes.ASSETS.RECEIVED, { fileId, relativePath, byteArr }),

}

const workOrder = {
  comboItems: {
    request: () => action(actionTypes.WORK_ORDER.COMBO_ITEMS.REQUEST, {}),
    received: (value, defaultValues) => action(actionTypes.WORK_ORDER.COMBO_ITEMS.RECEIVED, { value, defaultValues }),
    failed: () => action(actionTypes.WORK_ORDER.COMBO_ITEMS.FAILED, {}),
  },
  update: {
    init: (id) => action(actionTypes.WORK_ORDER.UPDATE.INIT, { id }),
    initSuccess: (value) => action(actionTypes.WORK_ORDER.UPDATE.INIT_SUCCESS, { value }),
    patchField: (fieldId, value) => action(actionTypes.WORK_ORDER.UPDATE.PATCH_FIELD, { fieldId, value }),
    save: () => action(actionTypes.WORK_ORDER.UPDATE.SAVE, {}),
    saveFailed: (errMsg) => action(actionTypes.WORK_ORDER.UPDATE.SAVE_FAILED, { errMsg }),
    saveSuccess: (value) => action(actionTypes.WORK_ORDER.UPDATE.SAVE_SUCCESS, { value }),
    addAttachment: (file) => action(actionTypes.WORK_ORDER.UPDATE.ADD_ATTACHMENT, { file }),
    removeAttachment: (filesIndividualRef) => action(actionTypes.WORK_ORDER.UPDATE.REMOVE_ATTACHMENT, { filesIndividualRef }),
    addAttachmentSuccess: ({ filesIndividualRef, name, relativePath, filesMainRef }) => action(actionTypes.WORK_ORDER.UPDATE.ADD_ATTACHMENT_SUCCESS, { filesIndividualRef, name, relativePath, filesMainRef }),
    addAttachmentFailed: ({ name }) => action(actionTypes.WORK_ORDER.UPDATE.ADD_ATTACHMENT_FAILED, { name }),
    clearMsg: () => action(actionTypes.WORK_ORDER.UPDATE.CLEAR_MSG, {}),
    clean: () => action(actionTypes.WORK_ORDER.UPDATE.CLEAN, {}),
    parentListItem: {
      request: ({ eqpLocCode, eqpOrLoc }) => action(actionTypes.WORK_ORDER.UPDATE.PARENT_LIST_ITEM.REQUEST, { eqpLocCode, eqpOrLoc }),
      received: ({ eqpLocCode, eqpOrLoc, value }) => action(actionTypes.WORK_ORDER.UPDATE.PARENT_LIST_ITEM.RECEIVED, { eqpLocCode, eqpOrLoc, value }),
    }
  }
}

const actions = {
  assets,
  workflow,
  equipmentLocations,
  workOrder,
  workRequest,
  workRequestV2,
  context
};
export default actions;

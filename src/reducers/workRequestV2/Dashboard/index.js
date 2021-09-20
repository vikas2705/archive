import produce from 'immer';
import actionTypes from '../../../actions/types';

const reducer = (state = {}, action) => {
  const { type, groupBy, Actionflag, value } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORK_REQUEST_V2.DASHBOARD.INIT:
        if (!draft.dashboard) {
          draft.dashboard = {};
          // draft.dashboard.status = 'requested';
          draft.dashboard.selectedFilter = '';
          draft.dashboard.filterOption = [];
          draft.dashboard.count = {};
        }
        break;
      case actionTypes.WORK_REQUEST_V2.DASHBOARD.CHANGE_FILTER:
        if(!draft.dashboard)  {
          draft.dashboard = {}
        }
        draft.dashboard.selectedFilter = groupBy;
        break;
      case actionTypes.WORK_REQUEST_V2.DASHBOARD.FILTER_SELECT:
        draft.dashboard.selectedFilter = value;
        break;
      case actionTypes.WORK_REQUEST_V2.DASHBOARD.RECEIVED_COUNT:
        if(!draft.dashboard[groupBy])  {
          draft.dashboard[groupBy] = {}
        }
          draft.dashboard[groupBy].status = 'received';
          draft.dashboard[groupBy].value = value;
        break;
      default:
    }
  })
}

export default reducer;
const emptyObj = {};
export const selectors = {};

selectors.dashboardSelectedFilter = (state) => {
  return state?.dashboard?.selectedFilter;
}

selectors.wRDashboardCountList = (state) => {
  const selectedFilter = state?.dashboard?.selectedFilter;
  if(!selectedFilter){
    return emptyObj;
  }
  return state?.dashboard?.[selectedFilter] || emptyObj;
}

selectors.wRDashboardStatusCountByTaskStatus = (state, taskStatus) => {
  if(!state?.dashboard?.Status?.value?.workrequestcount?.length){
    return 0;
  }
  const item = state?.dashboard?.Status?.value.workrequestcount?.find(i => i.hdn_card_code === taskStatus);
  return item.tabvalue || 0;
}


selectors.workRequestPriorityColor = (state, subGroup) => {
  if(!subGroup){
    return state?.dashboard?.Priority?.value?.workrequestcount;
  }
  const obj = state?.dashboard?.Priority?.value?.workrequestcount?.find(i => i.hdn_card_code === subGroup);
  return obj?.circlecolor;
}

import produce from 'immer';
import actionTypes from '../../../actions/types';

const getFilterKey = (filter) => {
  if(!filter){
    return '';
  }
  let key = '';
  Object.keys(filter).forEach(filterItem =>{
    if(filter[filterItem]){
      key += `(${filterItem}-${filter[filterItem]})_`
    }
  })
  return key;
}

const reducer = (state = {}, action) => {
  const { type, groupBy, Actionflag, filters,  value } = action;
  const filterKey = getFilterKey(filters);
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORK_REQUEST_V2.FILTER_OPTIONS.INIT:
        if (!draft.filterOpts) {
          draft.filterOpts = {};
          draft.filterOpts.status = 'requested';
        }
        break;
      case actionTypes.WORK_REQUEST_V2.FILTER_OPTIONS.INIT_SUCCESS:
        if (draft.filterOpts) {
          draft.filterOpts.value = value;
          draft.filterOpts.selectedValue = value?.workhubinformation?.[0]?.workhubcmbcode;
          draft.filterOpts.status = 'received';
        }
        break;
      case actionTypes.WORK_REQUEST_V2.COUNT.REQUEST:
        if (!draft.count) {
          draft.count = {};
        }
        if (!draft.count[groupBy]) {
          draft.count[groupBy] = {}
        }

        if (!draft.count[groupBy][Actionflag]) {
          draft.count[groupBy][Actionflag] = {}
        }
        if (!draft.count[groupBy][Actionflag][filterKey]) {
          draft.count[groupBy][Actionflag][filterKey] = {}
        }
        draft.count[groupBy][Actionflag][filterKey].status = 'requested';
        break;
      // case actionTypes.WORK_REQUEST_V2.FILTER_OPTIONS.UPDATE_SELECTED:
      //   draft.filterOpts.selectedValue = value;
      //   break;
      case actionTypes.WORK_REQUEST_V2.COUNT.RECEIVED:
        if (!draft.count) {
          draft.count = {};
        }
        if (!draft.count[groupBy]) {
          draft.count[groupBy] = {}
        }
        if (!draft.count[groupBy][Actionflag]) {
          draft.count[groupBy][Actionflag] = {}
        }
        if (!draft.count[groupBy][Actionflag][filterKey]) {
          draft.count[groupBy][Actionflag][filterKey] = {}
        }
        draft.count[groupBy][Actionflag][filterKey].status = 'requested';
        draft.count[groupBy][Actionflag][filterKey].value = value;
        break;
      case actionTypes.WORK_REQUEST_V2.COUNT.REQUEST_FAILED:
        if (draft?.count?.[groupBy]?.[Actionflag]?.[filterKey]) {
          draft.count[groupBy][Actionflag][filterKey].status = 'failed';
        }
        break;
      default:
    }
  })
}

export default reducer;
const emptyObj = {};
export const selectors = {};

selectors.workRequestFilterOptions = (state) => {
  return state?.filterOpts || emptyObj;
}

selectors.workRequestCount = (state, groupBy, Actionflag, filter) => {
  const filterKey = getFilterKey(filter);
  return state?.count?.[groupBy]?.[Actionflag]?.[filterKey] || emptyObj;
}

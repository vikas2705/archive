import produce from 'immer';
import { combineReducers } from 'redux';
import actionTypes from '../actions/types';
import workflow, { selectors as fromWorkflow } from './workflow';
import equipmentLocations, { selectors as fromEquipmentLocations } from './equipmentLocations';
import assets, { selectors as fromAssets } from './assets';
import { genSelectors } from './util';
import workrequest from './workrequest';
import workRequestV2, {selectors as fromWorkRequestV2} from './workRequestV2';
import context from './context';
import workOrder, { selectors as fromWorkOrder } from './workOrder';

const emptySet = [];
const combinedReducers = combineReducers({
  // session,
  workflow,
  assets,
  equipmentLocations,
  context,
  workrequest,
  workRequestV2,
  workOrder,
  // user,
});

const rootReducer = (state, action) => {
  const newState = combinedReducers(state, action);

  const { type } = action;

  return produce(newState, draft => {
    switch (type) {
      //TODO
      case actionTypes.CLEAR_STORE:
        Object.keys(draft).forEach(key => {
          // delete everthing except for auth
          if (key !== 'auth') {
            delete draft[key];
          }
        });

        break;

      //TODO
      case actionTypes.APP_DELETE_DATA_STATE:
        delete draft.data;

        break;

      default:
    }
  });
};

export default rootReducer;

export const selectors = {};
const subSelectors = {
  // resources: fromResources,
  workflow: fromWorkflow,
  assets: fromAssets,
  equipmentLocations: fromEquipmentLocations,
  workOrder: fromWorkOrder,
  workRequestV2: fromWorkRequestV2,
};

genSelectors(selectors, subSelectors);


selectors.workflows = (state) => {
  //mock imp
  return emptySet;
}

//currently this is returning mock preference
const MOCK_PREFERENCE = {
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm:ss'
}
selectors.userPreferences = (state) => {
  return MOCK_PREFERENCE;
}

selectors.userToken = (state) => {
  return state.context.accessToken
}

selectors.workRequestStatusName = (state, groupBy) => {

}


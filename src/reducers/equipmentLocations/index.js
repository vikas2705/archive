import produce from 'immer';
import actionTypes from '../../actions/types'
import { createSelector } from 'reselect';
import { orderBy, uniq } from 'lodash'
import { deepClone } from 'fast-json-patch';
const reducer = (state = {}, action) => {
  const { type, value, eqpLocCode, eqpOrLoc = "", wrkGrpCode = "", parentEqpCode = "", planningGrpCode, parentCode } = action;
  return produce(state, draft => {
    switch (type) {

      case actionTypes.EQUIPMENT_LOCATIONS.REQUEST:
        if (!draft.equipmentLocations) {
          draft.equipmentLocations = {};
        }
        if (!draft.equipmentLocations[eqpOrLoc]) {
          draft.equipmentLocations[eqpOrLoc] = { items: [], itemTextList: [] };
        }
        draft.equipmentLocations[eqpOrLoc].status = 'requested';

        break;
      case actionTypes.EQUIPMENT_LOCATIONS.RECEIVED:
        if (draft.equipmentLocations[eqpOrLoc].itemTextList.indexOf(eqpLocCode) === -1) {
          draft.equipmentLocations[eqpOrLoc].itemTextList.push(eqpLocCode)
        }
        const mergedItems = [...deepClone(draft.equipmentLocations[eqpOrLoc].items), ...value,];
        draft.equipmentLocations[eqpOrLoc].items = uniq(mergedItems, 'EqpLocCode')
        draft.equipmentLocations[eqpOrLoc].status = 'success';
        break;
      case actionTypes.EQUIPMENT_LOCATIONS.FAILED:
        // if(!draft.workflowItems){
        //     draft.workflowItems = {};
        // }
        draft.equipmentLocations[eqpOrLoc].status = 'failed';
        break;
      case actionTypes.EQUIPMENT_LOCATIONS.MAP_LOCATIONS.REQUEST:
        if (!draft.equipmentMapLocations) {
          draft.equipmentMapLocations = {};
        }
        draft.equipmentMapLocations.status = 'requested';
        break;
      case actionTypes.EQUIPMENT_LOCATIONS.MAP_LOCATIONS.RECEIVED:
        draft.equipmentMapLocations.status = 'success';
        draft.equipmentMapLocations.defaultCenterInformation = value.defaultCenterInformation
        draft.equipmentMapLocations.defaultZoominformation = value.defaultZoominformation
        draft.equipmentMapLocations.markersInformation = value.markersInformation
        draft.equipmentMapLocations.wayPointsInformation = value.wayPointsInformation
        break;
      case actionTypes.EQUIPMENT_LOCATIONS.GROUP_EQP_AND_LOC.REQUEST: {
        const key = `${wrkGrpCode}-${eqpLocCode}-${parentEqpCode}`
        if (!draft.eqpGroup) {
          draft.eqpGroup = {};
        }
        if (!draft.eqpGroup[key]) {
          draft.eqpGroup[key] = {
            status: 'requested'
          };
        }
        break;
      }
      case actionTypes.EQUIPMENT_LOCATIONS.GROUP_EQP_AND_LOC.RECEIVED: {
        const key = `${wrkGrpCode}-${eqpLocCode}-${parentEqpCode}`
        draft.eqpGroup[key].status = 'requested';
        draft.eqpGroup[key].value = value;
        break;
      }
      case actionTypes.EQUIPMENT_LOCATIONS.PLANNING_GROUP.REQUEST: {
        const key = `${planningGrpCode}-${parentCode}`
        if (!draft.planningGroup) {
          draft.planningGroup = {};
        }
        if (!draft.planningGroup[key]) {
          draft.planningGroup[key] = {
            status: 'requested'
          };
        }
        break;
      }
      case actionTypes.EQUIPMENT_LOCATIONS.PLANNING_GROUP.RECEIVED: {
        const key = `${planningGrpCode}-${parentCode}`
        draft.planningGroup[key].status = 'requested';
        draft.planningGroup[key].value = value;
        break;
      }

      default:

    }
  })
}

export default reducer;
const emptySet = [];
const emptyObj = {};
export const selectors = {};
// selectors.workflow = (state) => {
//     if (!state) {
//       return emptyObj;
//     }

//     return state.workflow || emptyObj;
// };

selectors.equipmentLocations = (state, eqpOrLoc) => {
  if (!state) {
    return emptyObj;
  }
  return state.equipmentLocations?.[eqpOrLoc] || emptyObj;
};

selectors.equipmentLocationDetail = (state, eqpLocCode, eqpOrLoc) => {
  if (!state) {
    return emptyObj;
  }
  return state.equipmentLocations?.[eqpOrLoc]?.items?.find(item => {
    return item.EqpLocCode === eqpLocCode
  }) || emptyObj;
};


selectors.equipmentLocationsByCode = createSelector(
  (state, eqpLocCode, eqpOrLoc) => state?.equipmentLocations?.[eqpOrLoc]?.items || emptySet,
  (state, eqpLocCode) => eqpLocCode,
  (equipmentLocations, eqpLocCode) => {
    return equipmentLocations.filter(loc => loc.EqpLocCode?.startsWith(eqpLocCode)) || emptySet
  }
);

selectors.findEquipmentLocation = createSelector(
  (state, eqpLocCode, eqpOrLoc) => state?.equipmentLocations?.[eqpOrLoc]?.items || emptySet,
  (state, eqpLocCode) => eqpLocCode,
  (equipmentLocations, eqpLocCode) => {
    return equipmentLocations.find(loc => loc.EqpLocCode?.startsWith(eqpLocCode)) || emptySet
  }
);


selectors.equipmentMapLocations = (state) => {
  return state?.equipmentMapLocations || emptySet
}



selectors.groupEqpAndLoc = createSelector(
  (state, { wrkGrpCode, eqpLocCode, parentEqpCode }) => {
    const key = `${wrkGrpCode}-${eqpLocCode}-${parentEqpCode}`;
    if (!state) {
      return emptyObj;
    }

    return state.eqpGroup?.[key] || emptyObj;
  },
  (equipmentLocationsObj) => {
    const { value: equipmentLocations = [], status } = equipmentLocationsObj
    const sortedItems = orderBy(equipmentLocations, ["EQP_description"], ["asc"]) || emptySet;
    return { value: sortedItems, status }
  }
);

selectors.locationPlanningGroup = createSelector(
  (state, { planningGrpCode, parentCode }) => {
    const key = `${planningGrpCode}-${parentCode}`;
    if (!state) {
      return emptyObj;
    }

    return state.planningGroup?.[key] || emptyObj;
  },
  (planningGroupObj) => {
    const { value: planningGroups = [], status } = planningGroupObj
    const sortedItems = orderBy(planningGroups, ["Description"], ["asc"]) || emptySet;
    return { value: sortedItems, status }
  }
);

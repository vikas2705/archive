
import {
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { apiCallWithRetry } from "..";
import actions from "../../actions";
import actionTypes from "../../actions/types";
import { selectors } from "../../reducers";
import { getEqpLocDetails } from "../../queries/workRequest/getEqpLocDetails";
import { getListofEqpWithLocDetails } from "../../queries/workRequest/getListofEqpWithLocDetails";
import { getEqpMetaDataTreeView } from "../../queries/workRequest/getEqpMetaDataTreeView";
import { getPlanningMetaData } from "../../queries/workRequest/getPlanningMetaData"
export function* requestEquipmentLocations({ eqpOrLoc, eqpLocCode, eqpLocDesc }) {
  const { itemTextList: existingTextList = [] } = yield select(selectors.equipmentLocations, eqpOrLoc) || {};
  if (existingTextList.indexOf(eqpLocCode) !== -1) {
    return;
  }
  const query = getEqpLocDetails({
    EqporLoc: eqpOrLoc,
    EqpLocCode: eqpLocCode,
    eqpLocDesc: eqpLocDesc,
  });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      gCtxtCmp: 'location',
      query: query,
      hidden: true,
    })
    if (resp?.['location_getEqpLocDet']?.getEquipmentLocationDetails?.data) {
      const locationsTmp = resp['location_getEqpLocDet'].getEquipmentLocationDetails.data || [];
      // const {items: existingLocations= []} = yield select(selectors.equipmentLocations, eqpOrLoc) || {};
      // const locationsToAdd = locationsTmp.filter(l => existingLocations?.indexOf(el => el.EqpLocCode === l.EqpLocCode) === -1)
      return yield put(actions.equipmentLocations.received({ eqpLocCode, eqpOrLoc, value: locationsTmp }));
    }

  } catch (e) {
    return yield put(actions.equipmentLocations.failed({ eqpOrLoc }));
  }
}

export function* requestMapLocations({ eqpOrLoc, lat, lng }) {
  const query = getListofEqpWithLocDetails({
    currentLat: lat,
    currentLong: lng,
    eqpOrLoc
  });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.['workRequest_getListofEqpWithLocDetails']?.getthelistofEquipmentswiththeirGeolocationdetails?.data) {
      const { defaultCenterInformation, defaultZoominformation, markersInformation, wayPointsInformation } = resp['workRequest_getListofEqpWithLocDetails'].getthelistofEquipmentswiththeirGeolocationdetails.data || {}
      return yield put(actions.equipmentLocations.mapLocations.received({
        defaultCenterInformation,
        defaultZoominformation,
        markersInformation,
        wayPointsInformation
      }));
    }

  } catch (e) {
  }
}

export function* requestGroupEqpAndLoc({ wrkGrpCode, eqpLocCode, parentEqpCode }) {
  const query = getEqpMetaDataTreeView({
    EqpLocCode: eqpLocCode,
    wrkGrpCode: wrkGrpCode,
    ParentEqpCode: parentEqpCode
  });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.['workRequest_getEqpMetaData']?.getEqpMetaData) {
      const data = resp['workRequest_getEqpMetaData']?.getEqpMetaData || [];

      return yield put(actions.equipmentLocations.groupEqpAndLoc.received({
        wrkGrpCode,
        eqpLocCode,
        parentEqpCode,
        value: data
      }));
    }

  } catch (e) {
  }
}

export function* requestLocationPlanningMetadata({ planningGrpCode, parentCode }) {
  const query = getPlanningMetaData({
    PlanningGrpCode: planningGrpCode,
    ParentCode: parentCode,
  });
  try {
    const resp = yield call(apiCallWithRetry, {
      opts: {},
      query: query,
      hidden: true,
    })
    if (resp?.['workRequest_getPlanningMetaData']?.getPlanningMetaData) {
      const data = resp['workRequest_getPlanningMetaData']?.getPlanningMetaData || [];

      return yield put(actions.equipmentLocations.planningGroup.received({
        planningGrpCode,
        parentCode,
        value: data
      }));
    }

  } catch (e) {
  }
}

export const equipmentLocationsSagas = [
  // takeLatest(actionTypes.WORKFLOW.COMBO_ITEMS.REQUEST, workflowLoadItems),
  // takeLatest(actionTypes.WORKFLOW.UPDATE.INIT, workflowUpdateInit),
  takeLatest(actionTypes.EQUIPMENT_LOCATIONS.REQUEST, requestEquipmentLocations),
  takeLatest(actionTypes.EQUIPMENT_LOCATIONS.MAP_LOCATIONS.REQUEST, requestMapLocations),
  takeLatest(actionTypes.EQUIPMENT_LOCATIONS.GROUP_EQP_AND_LOC.REQUEST, requestGroupEqpAndLoc),
  takeLatest(actionTypes.EQUIPMENT_LOCATIONS.PLANNING_GROUP.REQUEST, requestLocationPlanningMetadata),
];

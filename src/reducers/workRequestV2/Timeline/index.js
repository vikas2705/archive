import produce from 'immer';
import actionTypes from '../../../actions/types';

const reducer = (state = {}, action) => {
  const { type, wrNo, value } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORK_REQUEST_V2.TIMELINE.REQUEST:
        if (!draft.timeline) {
          draft.timeline = {};
        }
        if (!draft.timeline[wrNo]) {
          draft.timeline[wrNo] = {}
          draft.timeline[wrNo].status = 'requested';
        }
        break;
      case actionTypes.WORK_REQUEST_V2.TIMELINE.REQUEST_FAILED:
        if (draft?.timeline?.[wrNo]) {
          draft.timeline[wrNo].status = 'failed';
        }
        break;
      case actionTypes.WORK_REQUEST_V2.TIMELINE.RECEIVED:
        if (draft?.timeline?.[wrNo]) {
          draft.timeline[wrNo].status = 'received';
          draft.timeline[wrNo].value = value;
        }
        break;
      default:
    }
  })
}

export default reducer;
const emptyObj = {};
export const selectors = {};

selectors.wrTimeline = (state, wrNo) => {
  return state?.timeline?.[wrNo] || emptyObj;
}

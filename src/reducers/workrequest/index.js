import produce from 'immer';
import actionTypes from '../../actions/types';

const reducer = (state = {}, action) => {
  const { type, value } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.WORKREQUEST.COMBO_ITEMS.RECEIVED:
        draft.wrkReqMetadata = value;
        break;

      case actionTypes.WORKREQUEST.GET_COUNT_SUCCESS:
        draft.countBySts = value
        break;

      case actionTypes.WORKREQUEST.GET_LIST_SUCCESS:
        draft.wrkReqBySts = value;
        break;

      case actionTypes.WORKREQUEST.FILTER:
        draft.wrkReqListFilter = value;
        break;

      case actionTypes.WORKREQUEST.REFRESH:
        draft.refreshContext = value;
        break;

      case actionTypes.WORKREQUEST.GET_LISTACTION_SUCCESS:
        draft.wrkReqListActions = value;
        break;

      case actionTypes.WORKREQUEST.SINGLE_WRSELECTION:
        draft.singleWrkReqSelection = value;
        break;

      case actionTypes.WORKREQUEST.MULTI_WRSELECTION:
        draft.multiWrkReqSelection = value;
        break;

      case actionTypes.WORKREQUEST.GET_OVERVIEW_SUCCESS:
        draft.wrkReqSummary = value;
        break;

      case actionTypes.WORKREQUEST.GET_OVERVIEWCARD_SUCCESS:
        draft.wrkReqOverviewCard = value;
        break;

      case actionTypes.WORKREQUEST.GET_OVERVIEWCARD_IMG_SUCCESS:
        draft.wrkReqOverviewCardImage = value;
        break;

      case actionTypes.WORKREQUEST.GET_TIMELINE_SUCCESS:
        draft.wrkReqTimeline = value;
        break;

      case actionTypes.WORKREQUEST.GET_WRWO_SUCCESS:
        draft.wrkReqSuggestedWO = value;
        break;

      default:
    }
  })
}

export default reducer;

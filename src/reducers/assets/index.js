import produce from 'immer';
import actionTypes from '../../actions/types'

const reducer = (state = {}, action) => {
  const { type, fileId, relativePath, byteArr } = action;
  const key = `${fileId}-${relativePath}`;
  return produce(state, draft => {
    switch (type) {

      case actionTypes.ASSETS.REQUEST:
        if (!draft.assets) {
          draft.assets = {};
        }
        if (!draft.assets[key]) {
          draft.assets[key] = {
            status: 'requested'
          };
        }

        break;
      case actionTypes.ASSETS.RECEIVED:
        draft.assets[key].byteArr = byteArr;
        draft.assets[key].status = 'received'
        break;

      default:
    }
  })
}

export default reducer;
const emptyObj = {};
export const selectors = {};
selectors.assets = (state, { fileId, relativePath }) => {
  if (!state) {
    return emptyObj;
  }
  const key = `${fileId}-${relativePath}`;

  return state?.assets?.[key] || emptyObj;
};

import produce from 'immer';
import actionTypes from '../../actions/types';

const reducer = (state = {}, action) => {
  const { type, value } = action;
  return produce(state, draft => {
    switch (type) {
      case actionTypes.CONTEXT.GET_TOKEN:
          draft.accessToken = value;
        break;

      default:
    }
  })
}

export default reducer;

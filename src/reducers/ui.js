import produce from 'immer';
import { handleActions } from 'redux-actions';

const initialState = {
  pendingRequests: {
    symbols: 0,
  },
};

export default handleActions({
  REST_START: (state, action) => {
    return produce(state, draftState => {
      draftState.pendingRequests[action.payload.label]++;
    });
  },
  REST_FINISH: (state, action) => {
    return produce(state, draftState => {
      draftState.pendingRequests[action.payload.label]--;
    });
  }
}, initialState);
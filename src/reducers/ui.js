import { handleActions } from 'redux-actions';

const initialState = {
  pendingRequests: {
    symbols: false,
  },
};

export default handleActions({
  REST_START: (state, action) => {
    return {
      pendingRequests: {
        ...state.pendingRequests,
        [action.payload.label]: true,
      },
    }
  },
  REST_FINISH: (state, action) => {
    return {
      pendingRequests: {
        ...state.pendingRequests,
        [action.payload.label]: false,
      },
    }
  }
}, initialState);
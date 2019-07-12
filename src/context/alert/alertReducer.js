import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: null,
      };

    default:
      return state;
  }
};

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

export default (state, { type, payload }) => {
  switch (type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

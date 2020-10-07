import * as constants from '../constants/constants';

const initialState = {
  list: [],
  error: null,
};

const toyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.TOYS_RECEIVED:
      return {
        ...state,
        list: payload,
        error: null,
      };
    case constants.TOYS_NOT_RECEIVED:
    case constants.TOY_NOT_RECEIVED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default toyReducer;

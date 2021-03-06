import * as constants from '../constants/constants';

const initialState = {
  list: [],
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.CATEGORIES_RECEIVED:
      return {
        ...state,
        list: payload,
        error: null,
      };
    case constants.CATEGORIES_NOT_RECEIVED:
    case constants.CATEGORY_NOT_RECEIVED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;

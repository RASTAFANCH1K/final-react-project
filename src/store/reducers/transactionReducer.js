import * as constants from '../constants/constants';

const initialState = {
  list: [],
  error: null,
};

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case constants.TRANSACTIONS_RECEIVED:
      return {
        ...state,
        list: payload,
        error: null,
      };
    case constants.TRANSACTIONS_NOT_RECEIVED:
    case constants.TRANSACTION_NOT_RECEIVED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;
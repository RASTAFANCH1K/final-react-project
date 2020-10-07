import * as constants from '../constants/constants';

const initialState = {
  logged: true,
  token: '',
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.TOKEN_DELETED:
      return {
        ...state,
        logged: false,
        token: '',
        error: new Error('o_O Error'),
      };
    case constants.TOKEN_RECEIVED:
      return {
        ...state,
        logged: true,
        token: action.payload,
        error: null,
      };
    case constants.TOKEN_NOT_RECEIVED:
      return {
        ...state,
        logged: false,
        token: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
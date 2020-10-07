import { combineReducers } from 'redux';

import authReducer from './authReducer';
import toyReducer from './toyReducer';
import transactionReducer from './transactionReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  authReducer,
  toyReducer,
  transactionReducer,
  categoryReducer
});

export default rootReducer;

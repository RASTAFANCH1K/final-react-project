import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

import { logger } from './middlewares/logger';

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
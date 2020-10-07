import * as constants from '../constants/constants';
import * as authResource from '../../resources/authResource';
import * as toyResource from '../../resources/toyResource';
import * as transactionResource from '../../resources/transactionResource';
import * as authActions from './authActions';

export const toysReceived = toys => ({
  type: constants.TOYS_RECEIVED,
  payload: toys,
});

export const toysNotReceived = error => ({
  type: constants.TOYS_NOT_RECEIVED,
  payload: error,
});

export const toysLoading = () => ({
  type: constants.LOADING,
  payload: null,
});

export const toyReceived = toy => ({
  type: constants.TOY_RECEIVED,
  payload: toy,
});

export const toyNotReceived = error => ({
  type: constants.TOY_NOT_RECEIVED,
  payload: error,
});

export const toyLoading = () => ({
  type: constants.LOADING,
  payload: null,
});

const transactionsReceived = transactions => ({
  type: constants.TRANSACTIONS_RECEIVED,
  payload: transactions,
});

const transactionsNotReceived = error => ({
  type: constants.TRANSACTIONS_NOT_RECEIVED,
  payload: error,
});

export const getToys = token => dispatch => {
  dispatch(toysLoading());

  return toyResource.getToys(token).then(({ data, error }) => {
      if (error) {
        if (error.message === 'o_O Error') {
          authResource.deleteToken();
          dispatch(authActions.tokenDeleted());
        }

        dispatch(toysNotReceived(error));
        return;
      }
      
      dispatch(toysReceived(data));
    });
};

export const addToy = (token, toy) => dispatch => {
  dispatch(toyLoading());

  return toyResource.addToy(token, toy).then(() => toyResource.getToys(token)).then(({ data, error }) => {
      if (error) {
        if (error.message === 'o_O Error') {
          authResource.deleteToken();
          dispatch(authActions.tokenDeleted());
        }

        dispatch(toysNotReceived(error));
        return;
      }

      dispatch(toysReceived(data));
    });
};

export const addToyWithTransaction = (token, toy) => dispatch => {
  if (toy.quantity <= 0) return Promise.resolve();
  
  dispatch(toyLoading());

  return toyResource.addToy(token, toy).then(({ data, error }) => {
      if (!data) return Promise.resolve({ data, error });
      
      return transactionResource.addTransaction(token, {
        toys: [{ id: data.id, quantity: toy.quantity }],
        type: 'incoming',
      });
    })
    .then(() => Promise.all([
      toyResource.getToys(token),
      transactionResource.getTransactions(token),
    ]))
    .then(results => {
      const [toysRes, transactionRes] = results;

      if ((toysRes.error && toysRes.error.message === 'o_O Error') || (transactionRes.error && transactionRes.error.message === 'o_O Error')) {
        authResource.deleteToken();
        dispatch(authActions.tokenDeleted());
      }

      if (toysRes.error) {
        dispatch(toysNotReceived(toysRes.error));
      } else {
        dispatch(toysReceived(toysRes.data));
      }
      
      if (transactionRes.error) {
        dispatch(transactionsNotReceived(transactionRes.error))
      } else {
        dispatch(transactionsReceived(transactionRes.data));
      }
    });
};

export const deleteToy = (token, id) => dispatch => {
  dispatch(toyLoading());

  return toyResource.deleteToy(token, id).then(() => toyResource.getToys(token)).then(({ data, error }) => {
    if (error) {
      if (error.message === 'o_O Error') {
        authResource.deleteToken();
        dispatch(authActions.tokenDeleted());
      }

      dispatch(toysNotReceived(error));
      return;
    }

    dispatch(toysReceived(data));
  });
};
import * as constants from '../constants/constants';
import * as authResource from '../../resources/authResource';
import * as toyResource from '../../resources/toyResource';
import * as transactionResource from '../../resources/transactionResource';
import * as authActions from './authActions';

export const transactionsReceived = transactions => ({
  type: constants.TRANSACTIONS_RECEIVED,
  payload: transactions,
});

export const transactionsNotReceived = error => ({
  type: constants.TRANSACTIONS_NOT_RECEIVED,
  payload: error,
});

export const transactionsLoading = () => ({
  type: constants.LOADING,
  payload: null,
});

export const transactionReceived = transaction => ({
  type: constants.TRANSACTION_RECEIVED,
  payload: transaction,
});

export const transactionNotReceived = error => ({
  type: constants.TRANSACTION_NOT_RECEIVED,
  payload: error,
});

export const transactionLoading = () => ({
  type: constants.LOADING,
  payload: null,
});


const toysReceived = toys => ({
  type: constants.TOYS_RECEIVED,
  payload: toys,
});

const toysNotReceived = error => ({
  type: constants.TOYS_NOT_RECEIVED,
  payload: error,
});

export const getTransactions = token => dispatch => {
  dispatch(transactionsLoading());

  return transactionResource.getTransactions(token).then(({ data, error }) => {
      if (error) {
        if (error.message === 'o_O Error') {
          authResource.deleteToken();
          dispatch(authActions.tokenDeleted());
        }

        dispatch(transactionsNotReceived(error));
        return;
      }

      dispatch(transactionsReceived(data));
    });
};

export const addTransaction = (token, transaction) => dispatch => {
  dispatch(transactionLoading());

  return transactionResource.addTransaction(token, transaction).then(() => Promise.all([
      toyResource.getToys(token),
      transactionResource.getTransactions(token),
    ]))
    .then(results => {
      const [toysRes, transactionRes] = results;

      if (toysRes.error && toysRes.error.message === 'o_O Error' || transactionRes.error && transactionRes.error.message === 'o_O Error') {
        authResource.deleteToken();
        dispatch(authActions.tokenDeleted());
      }

      if (toysRes.error) {
        dispatch(toysNotReceived(toysRes.error))
      } else {
        dispatch(toysReceived(toysRes.data));
      }

      if ( transactionRes.error) {
        dispatch(transactionsNotReceived(transactionRes.error))
      } else {
        dispatch(transactionsReceived(transactionRes.data));
      }
    });
};
import * as constants from '../constants/constants';
import * as authActions from './authActions';
import * as categoryActions from './categoryActions';
import * as toyActions from './toyActions';
import * as transactionActions from './transactionActions';

import * as authResource from '../../resources/authResource';
import * as categoryResource from '../../resources/categoryResource';
import * as toyResource from '../../resources/toyResource';
import * as transactionResource from '../../resources/transactionResource';

export const dataLoading = () => ({
  type: constants.LOADING,
  payload: null,
});

export const start = () => dispatch => {
  const token = authResource.getToken();

  if (!token) {
    dispatch(authActions.tokenDeleted());
    return Promise.resolve();
  }

  return authResource.isTokenActive(token).then((active) => {
    if (!active) {
      authResource.deleteToken();
      dispatch(authActions.tokenDeleted());

      return [];
    }

    dispatch(authActions.tokenReceived(token));
    dispatch(dataLoading());

    return Promise.all([
      categoryResource.getCategories(token),
      toyResource.getToys(token),
      transactionResource.getTransactions(token),
    ]);
  })
  .then((results) => {
    if (results.length !== 3) {
      const error = new Error('o_O Error');
      dispatch(categoryActions.categoriesNotReceived(error));
      dispatch(toyActions.toysNotReceived(error));
      dispatch(transactionActions.transactionsNotReceived(error));

      return;
    }

    const [categoriesRes, toysRes, transactionRes] = results;

    if (categoriesRes.error) {
      dispatch(categoryActions.categoriesNotReceived(categoriesRes.error))
    } else {
      dispatch(categoryActions.categoriesReceived(categoriesRes.data));
    }

    if (toysRes.error) {
      dispatch(toyActions.toysNotReceived(toysRes.error))
    } else {
      dispatch(toyActions.toysReceived(toysRes.data));
    }

    if (transactionRes.error) {
      dispatch(transactionActions.transactionsNotReceived(transactionRes.error))
    } else {
      dispatch(transactionActions.transactionsReceived(transactionRes.data));
    }
  });
};

export const getData = token => dispatch => {
  if (!token) {
    dispatch(authActions.tokenDeleted());
    return Promise.resolve();
  }

  dispatch(dataLoading());

  return Promise.all([
    categoryResource.getCategories(token),
    toyResource.getToys(token),
    transactionResource.getTransactions(token),
  ])
  .then((results) => {
    const [categoriesRes, toysRes, transactionRes] = results;

    if (categoriesRes.error) {
      dispatch(categoryActions.categoriesNotReceived(categoriesRes.error))
    } else {
      dispatch(categoryActions.categoriesReceived(categoriesRes.data));
    }

    if (toysRes.error) {
      dispatch(toyActions.toysNotReceived(toysRes.error))
    } else {
      dispatch(toyActions.toysReceived(toysRes.data));
    }

    if (transactionRes.error) {
      dispatch(transactionActions.transactionsNotReceived(transactionRes.error))
    } else {
      dispatch(transactionActions.transactionsReceived(transactionRes.data));
    }
  });
};



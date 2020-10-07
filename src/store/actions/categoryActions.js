import * as constants from '../constants/constants';
import * as authResource from '../../resources/authResource';
import * as authActions from './authActions';
import * as categoryResource from '../../resources/categoryResource';

export const categoriesReceived = categories => ({
  type: constants.CATEGORIES_RECEIVED,
  payload: categories,
});

export const categoriesNotReceived = error => ({
  type: constants.CATEGORIES_NOT_RECEIVED,
  payload: error,
});

export const categoriesLoading = () => ({
  type: constants.LOADING,
  payload: null,
});

export const categoryReceived = category => ({
  type: constants.CATEGORY_RECEIVED,
  payload: category,
});

export const categoryNotReceived = error => ({
  type: constants.CATEGORY_NOT_RECEIVED,
  payload: error,
});

export const categoryLoading = () => ({
  type: constants.LOADING,
  payload: null,
});

export const getCategories = token => dispatch => {
  dispatch(categoriesLoading());

  return categoryResource.getCategories(token).then(({ data, error }) => {
      if (error) {
        if (error.message === 'o_O Error') {
          authResource.deleteToken();
          dispatch(authActions.tokenDeleted());
        }

        dispatch(categoriesNotReceived(error));
        return;
      }

      dispatch(categoriesReceived(data));
    });
};

export const addCategory = (token, name) => dispatch => {
  dispatch(categoryLoading());

  return categoryResource.addCategory(token, name).then(() => categoryResource.getCategories(token)).then(({ data, error }) => {
      if (error) {
        if (error.message === 'o_O Error') {
          authResource.deleteToken();
          dispatch(authActions.tokenDeleted());
        }

        dispatch(categoriesNotReceived(error));
        return;
      }

      dispatch(categoriesReceived(data));
    });
};

export const deleteCategory = (token, id) => dispatch => {
  dispatch(categoryLoading());

  return categoryResource.deleteCategory(token, id).then(() => categoryResource.getCategories(token)).then(({ data, error }) => {
      if (error) {
        if (error.message === 'o_O Error') {
          authResource.deleteToken();
          dispatch(authActions.tokenDeleted());
        }

        dispatch(categoriesNotReceived(error));
        return;
      }

      dispatch(categoriesReceived(data));
    });
};
import * as constants from '../constants/constants';
import * as authResource from '../../resources/authResource';

export const tokenDeleted = () => ({
  type: constants.TOKEN_DELETED,
  payload: null,
});

export const tokenReceived = token => ({
  type: constants.TOKEN_RECEIVED,
  payload: token,
});

export const tokenNotReceived = error => ({
  type: constants.TOKEN_NOT_RECEIVED,
  payload: error,
});

export const tokenLoading = () => ({
  type: constants.LOADING,
  payload: null,
});

export const login = state => dispatch => {
  dispatch(tokenLoading());

  return authResource.login(state).then(({ data, error }) => {
      if (error) {
        dispatch(tokenNotReceived(error));
        return;
      }

      authResource.setToken(data);

      dispatch(tokenReceived(data));
    });
};

export const logout = (token = '') => dispatch => {
  dispatch(tokenLoading());

  return authResource.logout(token || authResource.getToken()).then(() => {
      authResource.deleteToken();
      dispatch(tokenDeleted());
    });
};
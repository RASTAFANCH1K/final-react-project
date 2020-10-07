import * as networkProvider from '../services/networkProvider';

const url = 'http://localhost:8080';

export const login = async state => {
  const headers = { 'Content-Type': 'application/json' };

  const response = await networkProvider.post(`${url}/login`, state, { headers });

  if (response.data.accessToken) {
    return { 
      data: response.data.accessToken, 
      error: null 
    }
  } else {
    return { 
      data: null, 
      error: new Error('Email or password is incorrect')
    }
  }
};

export const logout = async token => {
  const headers = { 'Authorization': `Bearer ${token}` };

  const response = await networkProvider.get(`${url}/logout`, { headers });

  if (response.status === 200) {
    return { 
      data: 'success', 
      error: null 
    }
  } else {
    return {
      data: null, 
      error: new Error('o_O Error') 
    }
  }
};

export const getProfile = async token => {
  const headers = { 'Authorization': `Bearer ${token}` };
  const response = await networkProvider.get(`${url}/profile`, { headers });

  if (response.data && response.data.id ) {
    return { 
      data: response.data, 
      error: null 
    } 
  } else {
    return { 
      data: null, 
      error: new Error('o_O Error') 
    }
  }
};

export const isTokenActive = async token => {
  if (!token) return false;
  
  const result = await getProfile(token);

  if (result.data) return Boolean(result.data);
  
  return result.error.message !== 'o_O Error';
};

export const setToken = token => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token') || '';

export const deleteToken = () => localStorage.removeItem('token');
import * as networkProvider from '../services/networkProvider';

const url = 'http://localhost:8080/categories';

export const getCategories = async token => {
  const headers = { 'Authorization': `Bearer ${token}` };

  const response = await networkProvider.get(url, { headers });

  if (response.data.categories) {
    return { 
      data: response.data.categories, 
      error: null 
    }
  } else {
    return { 
      data: [], 
      error: new Error('o_O Error') 
    }
  }
};

export const addCategory = async(token, name) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const response = await networkProvider.post(url, { name }, { headers });

  if (response.data && response.data.id) {
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

export const deleteCategory = async (token, id) => {
  const headers = { 'Authorization': `Bearer ${token}` };

  const response = await networkProvider.del(`${url}/${id}`, { headers });

  if (response.data && response.data.id) {
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
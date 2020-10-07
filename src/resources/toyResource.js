import * as networkProvider from '../services/networkProvider';

const url = 'http://localhost:8080/toys';

export const getToys = async token => {
  const headers = { 'Authorization': `Bearer ${token}` };
  const response = await networkProvider.get(url, { headers });

  if (response.data.toys) {
    return { 
      data: response.data.toys, 
      error: null 
    }
  } else {
    return { 
      data: [], 
      error: new Error('o_O Error') 
    }
  }
};

export const addToy = async (token, toy) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const body = {
    id: toy.id,
    name: toy.name,
    quantity: 0,
    price: toy.price,
    totalCost: toy.totalCost,
    description: toy.description,
    categoryId: toy.category.id,
  };

  const response = await networkProvider.post(url, body, { headers });

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

export const deleteToy = async (token, id) => {
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
import * as networkProvider from '../services/networkProvider';

const url = 'http://localhost:8080/transactions';

export const getTransactions = async token => {
  const headers = { 'Authorization': `Bearer ${token}` };

  const response = await networkProvider.get(url, { headers });

  if (response.data.transactions) {
    return {
      data: response.data.transactions, 
      error: null
    }
  } else {
    return { 
      data: [], 
      error: new Error('o_O Error') 
    };
  }
};

export const addTransaction = async (token, transaction) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const body = {
    toys: transaction.toys.map(trx => ({ id: trx.id, quantity: trx.quantity })),
    type: transaction.type,
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
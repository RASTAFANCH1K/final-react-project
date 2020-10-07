import axios from 'axios';

export const get = (url, headers) => axios.get(url, headers);
export const post = (url, data, headers) => axios.post(url, data, headers);
export const del = (url, headers) => axios.delete(url, headers);
import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOSTNAME || 'localhost'}:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});
export const loginAPI = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body).catch((e) => e.response);

  return data;
};

export const getProducts = async () => {
  const { data } = await api.get('/products').catch((e) => e.response);
  return data;
};

export const createSale = async (saleDetails) => {
  const { data } = await api.post('/orders', { saleDetails }).catch((e) => e.response);
  return data;
};

export default api;

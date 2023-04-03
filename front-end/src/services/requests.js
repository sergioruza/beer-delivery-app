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

export const getOrdersByUserId = async (id) => {
  const { data } = await api.get(`/orders/${id}`).catch((e) => e.response);
  return data;
};

export const createSale = async (body) => {
  const headers = { headers: { Authorization: body.user.token } };
  const { data } = await api.post('/orders', body, headers).catch((e) => e.response);
  return data;
};

export const patchSale = async (endpoint, body) => {
  const headers = { headers: { Authorization: body.token } };
  const { data } = await api.patch(endpoint, body, headers).catch((e) => e.response);

  return data;
};

export default api;

import axios from 'axios';

const { REACT_APP_BACK_END } = process.env;

const api = axios.create({
  baseURL: REACT_APP_BACK_END || '3001',
});
export const loginAPI = async (endpoint, body) => {
  let payload = body;
  if (!body.role) {
    payload = { ...body, role: 'customer' };
  }
  console.log(payload);
  const { data } = await api.post(endpoint, payload).catch((e) => e.response);

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

export const createUserAdm = async (endpoint, body, token) => {
  let payload = body;
  if (!body.role) {
    payload = { ...body, role: 'customer' };
  }
  const headers = { headers: { Authorization: token } };
  const { data } = await api.post(endpoint, payload, headers).catch((e) => e.response);

  return data;
};
export default api;

export const getUsers = async () => {
  const { data } = await api.get('/users').catch((e) => e.response);
  return data;
};

export const deleteUsers = async (id) => {
  const { data } = await api.delete(`/users/${id}`).catch((e) => e.response);
  return data;
};

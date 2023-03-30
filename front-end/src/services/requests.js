import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOSTNAME || 'localhost'}:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});
export const loginAPI = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body).catch((e) => e.response);
  return data;
};

export default api;

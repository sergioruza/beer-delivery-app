import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/login',
});

export const loginAPI = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;

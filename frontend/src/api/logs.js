import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchLogs = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${API_URL}/logs?${params}`);
  return res.data;
};

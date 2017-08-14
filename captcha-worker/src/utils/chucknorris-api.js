import axios from 'axios';
import { getAccessToken } from './AuthService';

const BASE_URL = 'https://api-react-auth.herokuapp.com' || 'http://localhost:3333';

export {getFoodData, getCelebrityData};

function getFoodData() {
  const url = `${BASE_URL}/api/jokes/food`;
  return axios.get(url).then(res => res.data);
}

function getCelebrityData() {
  const url = `${BASE_URL}/api/jokes/celebrity`;
  return axios.get(url,{ headers: {Authorization: `Bearer ${getAccessToken()}`}}).then(res => res.data);
}

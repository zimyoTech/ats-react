import axios from 'axios'
import authHeader from './auth-header'

const API_URL = "http://localhost:8080/api/user/";

const getToken = () => {
  return axios.get(API_URL + 'getToken', { headers: authHeader() });
}

export default { getToken }
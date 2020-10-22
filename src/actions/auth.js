import axios from 'axios';
import {
  GET_TOKEN,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// get token
export const getToken = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/user/getToken');

    if (res.data && res.data.token) {
      setAuthToken(res.data.token);
    }

    dispatch({
      type: GET_TOKEN,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
}

// Login User
export const login = (username, password) => async (dispatch) => {
  var body = {};

  const params = new URLSearchParams({
    username: username,
    password: password
  }).toString();

  const config = {
    headers: {
      'token': localStorage.getItem('token')
    }
  }

  dispatch(getToken());

  try {
    const res = await axios.post(`/api/user/login?${params}`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout // Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

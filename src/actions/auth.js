import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';
import getToken from '../utils/getToken';

// Login User
export const login = (username, password) => async (dispatch) => {
  var body = {};

  const params = new URLSearchParams({
    username: username,
    password: password
  }).toString();

  let token = getToken();
  console.log('token',token)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }

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

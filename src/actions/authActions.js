import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

import {
  AUTH_LOADING,
  GET_ERRORS,
  PASSWORD_CHANGE,
  RESET_PASSWORD,
  SEND_RESET_PASSWORD_LINK,
  SET_CURRENT_USER,
} from './types';
import { toast } from 'react-toastify';
import { GetCartItems } from './cartActions';

// Register User
// now we dealing with async data, when data comes from backend then we dispatch
// for that we add here dispatch
export const registerUser = (userData, history) => (dispatch) => {
  console.log("In action registerUser");
  axios
    .post('/api/auth/register', userData)
    .then((res) => {
      toast.success(res.data.message);
      history.push('/login');
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
      
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  console.log("In action loginUser");
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      // save to localStorage
      const { token } = res.data;
      // set token to ls
      localStorage.setItem('jwtToken', token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwtDecode(token);
      // set current user
      // we gonna create seperate fun to do it and dispatch to it.
      dispatch(SetCurrentUser(decoded));
      dispatch(GetCartItems());
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const passwordChange = (userData) => (dispatch) => {
  dispatch(setAuthLoading());
  console.log("In action passwordChange");
  axios
    .post('/api/auth/change-password', userData)
    .then((res) =>
      dispatch({
        type: PASSWORD_CHANGE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const SendPasswordResetLink = (email) => (dispatch) => {
  dispatch(setAuthLoading());
  console.log("In action SendPasswordResetLink");
  axios
    .post(`/api/auth/forgotPassword?email=${email}`)
    .then((res) =>
      dispatch({
        type: SEND_RESET_PASSWORD_LINK,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const resetPassword = (data) => (dispatch) => {
  console.log("In action resetPassword");
  axios
    .post('/api/auth/reset-password', data)
    .then((res) =>
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      if (err.response.data.status === 'Error') {
        toast.error(err.response.data.message);
      }
    });
};

// set logged in user
export const SetCurrentUser = (decoded) => {
  console.log("In action SetCurrentUser");
  return {
    // dispatch to reducer
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// log user out
export const logoutUser = () => (dispatch) => {
  console.log("In action logoutUser");
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header from futuer requests
  setAuthToken(false);
  // Set current user to {} and isAuthenticated to false
  dispatch(SetCurrentUser({}));
};

export const setAuthLoading = () => {
  console.log("In action setAuthLoading");
  return {
    type: AUTH_LOADING,
  };
};

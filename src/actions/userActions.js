import axios from 'axios';
import {
  GET_ERRORS,
  GET_USER,
  GET_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  USER_LOADING,
} from './types';

export const getUser = (id) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .get(`/api/users`)
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER,
        payload: {},
      })
    );
};

// export const getUsers = () => (dispatch) => {
//   dispatch(setUserLoading());

//   axios
//     .get('/api/users/all')
//     .then((res) =>
//       dispatch({
//         type: GET_USERS,
//         payload: res.data,
//       })
//     )
//     .catch((err) =>
//       dispatch({
//         type: GET_USERS,
//         payload: {},
//       })
//     );
// };

export const getUserAddress = () => (dispatch) => {
  dispatch(setUserLoading());

  axios
    .get('/api/users/address')
    .then((res) =>
      dispatch({
        type: GET_USER_ADDRESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_ADDRESS,
        payload: {},
      })
    );
};

export const updateUserAddress = (address) => (dispatch) => {
  axios
    .put(`/api/users/address`, address)
    .then((res) =>
      dispatch({
        type: UPDATE_USER_ADDRESS,
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

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};


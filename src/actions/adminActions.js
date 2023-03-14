import axios from 'axios';
import {
  ACTIVATE_PLAN,
  ADMIN_LOADING,
  GET_ERRORS,
  GET_USERS,
  GET_VENDORS,
  USER_WITH_PLAN,
} from './types';

export const GetVendors = () => (dispatch) => {
  console.log("In admin action GetVendors");
  dispatch(setAdminLoading());
  axios
    .get('/api/admin/getvendors')
    .then((res) => {
      console.log("In admin action GetVendors then "+res.data);
      dispatch({
        type: GET_VENDORS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_VENDORS,
        payload: [],
      });
    });
};

export const DeactivateUserPlan = (userId, planId) => (dispatch) => {
  console.log("In admin action DeactivateUserPlan");
  dispatch(setAdminLoading());
  axios
    .get(`/api/admin/activatePlan/${userId}/plan/${planId}`)
    .then((res) => {
      console.log("In admin action GetVendors then "+res.data);
      dispatch({
        type: ACTIVATE_PLAN,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const getUsers = (pageNumber) => (dispatch) => {
  console.log("In admin action getUsers");
  dispatch(setAdminLoading());

  axios
    .get(`/api/admin/getallusers?PageNumber=${pageNumber}`)
    .then((res) => {
      console.log("In admin action GetVendors then "+res.data);
      dispatch({
        type: GET_USERS,
        payload: res,
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_USERS,
        payload: err.response,
      })
    );
};

export const setAdminLoading = () => {
  console.log("In admin action setAdminLoading");
  return {
    type: ADMIN_LOADING,
  };
};

export const getUserWithPlan = (userId) => (dispatch) => {
  console.log("In admin action getUserWithPlan");
  dispatch(setAdminLoading());

  axios
    .get(`/api/admin/userWithPlan/${userId}`)
    .then((res) => {
      console.log("In admin action getUserWithPlan then "+res.data);
      dispatch({
        type: USER_WITH_PLAN,
        payload: res.data,
      })
    })
    .catch((err) =>
      dispatch({
        type: USER_WITH_PLAN,
        payload: err.response,
      })
    );
};

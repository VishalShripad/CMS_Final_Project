import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_PLAN,
  GET_ALL_PLANS,
  MAKE_PAYMENT,
  CHECKOUT,
  GET_ERRORS,
} from './types';

export const getAllPlansForUser =
  (pageNumber = 1, pageSize = 5) =>
    (dispatch) => {
      console.log("In plan action getAllPlansForUser");
    axios
      .get(`/api/Plan?PageNumber=${pageNumber}&PageSize=${pageSize}`)
      .then((res) => {
        console.log("In plan action getAllPlansForUser then "+res.data);
        dispatch({
          type: GET_ALL_PLANS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("In plan action getAllPlansForUser error");
        dispatch({
          type: GET_ALL_PLANS,
          payload: [],
        });
      });
  };

export const checkout = () => (dispatch) => {
  console.log("In plan action checkout");
  axios
    .get('/api/Payment/checkout')
    .then((res) => {
      console.log("In plan action checkout then "+res.data);
      dispatch({
        type: CHECKOUT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("In plan action checkout error");
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const makePayment = (payment) => (dispatch) => {
  console.log("In plan action makePayment");
  axios
    .post('/api/Payment/makepayment', payment)
    .then((res) => {
      console.log("In plan action makePayment then "+res.data);
      dispatch({
        type: MAKE_PAYMENT,
        payload: res.data,
      });
      if (res.data === true) {
        toast.success('Payment is successfull');
      } else {
        toast.error('Payment failed');
      }
    })
    .catch((err) => {
      console.log("In plan action makePayment error");
      dispatch({
        type: GET_ERRORS,
        payload: err.errors,
      });
    });
};

export const getPlanById = (planId) => (dispatch) => {
  console.log("In plan action getPlanById");
  axios
    .get(`/api/plan/${planId}`)
    .then((res) => {
      console.log("In plan action getPlanById then "+res.data);
      dispatch({
        type: GET_PLAN,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("In plan action getPlanById error");
      dispatch({
        type: GET_PLAN,
        payload: {},
      });
    });
};

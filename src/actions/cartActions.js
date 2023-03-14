import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CART_LOADING,
  GET_CART,
  ADD_TO_CART,
  REMOVE_FORM_CART,
  GET_ERRORS,
} from './types';

export const GetCartItems = () => (dispatch) => {
  dispatch(setCartLoading());
  console.log("In cart action GetCartItems");
  axios
    .get('/api/Cart/GetUserCart')
    .then((res) => {
      console.log("In cart action GetCartItems then "+res.data);
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CART,
        payload: [],
      });
    });
};

export const AddToCart = (id, name) => (dispatch) => {
  dispatch(setCartLoading());
  console.log("In cart action AddToCart");
  axios
    .get(`/api/Cart/addChannel/${id}`)
    .then((res) => {
      //localStorage.setItem('cart_id', res.data.cart.id
      console.log("In cart action AddToCart then "+res.data);
      toast.success(`Channel ${name} added to watchlist`);
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.errors,
      });
    });
};

export const RemoveFromCart = (id) => (dispatch) => {
  dispatch(setCartLoading());
  console.log("In cart action RemoveFromCart");
  axios
    .get(`/api/Cart/removeChannel/${id}`)
    .then((res) => {
      console.log("In cart action RemoveFromCart then "+res.data);
      toast.success('Channel removed from cart');
      dispatch({
        type: REMOVE_FORM_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.errors,
      });
    });
};

export const setCartLoading = () => {
  console.log("In cart action setCartLoading");
  return {
    type: CART_LOADING,
  };
};

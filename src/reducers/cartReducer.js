import {
  GET_CART,
  CART_LOADING,
  ADD_TO_CART,
  REMOVE_FORM_CART,
} from '../actions/types';

export default function (state = { cart: [], updateCart: false }, action) {
  console.log("In cart reducer");
  switch (action.type) {
    case GET_CART:
      console.log("In cart reducer GET_CART");
      return {
        ...state,
        cart: action.payload,
        updateCart: false,
        loading: false,
      };
    case ADD_TO_CART:
      console.log("In cart reducer ADD_TO_CART");
      return {
        ...state,
        updateCart: action.payload,
        loading: false, 
      };
    case REMOVE_FORM_CART:
      console.log("In cart reducer REMOVE_FORM_CART");
      return {
        ...state,
        updateCart: action.payload,
        loading: false,
      };
    case CART_LOADING:
      console.log("In cart reducer CART_LOADING");
      return {
        ...state,
        loading: true,
      };
    default:
      console.log("In cart default state");
      return state;
  }
}

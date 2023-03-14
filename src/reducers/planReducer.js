import {
  GET_PLAN,
  GET_ALL_PLANS,
  MAKE_PAYMENT,
  CHECKOUT,
  PLAN_LOADING,
} from '../actions/types';

export default function (
  state = { plan: {}, plans: [], isPaymentSuccess: '' },
  action
) {
  switch (action.type) {
    case CHECKOUT:
      return {
        ...state,
        plan: action.payload,
        loading: false,
      };
    case MAKE_PAYMENT:
      return {
        ...state,
        isPaymentSuccess: action.payload,
        loading: false,
      };
    case GET_ALL_PLANS:
      return {
        ...state,
        plans: action.payload,
        loading: false,
      };
    case GET_PLAN:
      return {
        ...state,
        plan: action.payload,
        loading: false,
      };
    case PLAN_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

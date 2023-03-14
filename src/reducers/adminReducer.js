import {
  ACTIVATE_PLAN,
  ADMIN_LOADING,
  GET_USERS,
  GET_VENDORS,
  USER_WITH_PLAN,
  VENDOR_LOADING,
} from '../actions/types';

export default function (
  state = {
    vendors: [],
    activated: false,
    users: [],
    pagination: '',
    userWithPlan: {},
  },
  action
) {
  console.log("In admin reducer");
  switch (action.type) {
    case GET_VENDORS:
      console.log("In admin reducer GET_VENDORS");
      return {
        ...state,
        vendors: action.payload,
        loading: false,
      };
    case VENDOR_LOADING:
      console.log("In admin reducer VENDOR_LOADING");
      return {
        ...state,
        loading: true,
        vendors: [],
      };
    case ACTIVATE_PLAN:
      console.log("In admin reducer ACTIVATE_PLAN");
      return {
        ...state,
        loading: false,
        activated: action.payload,
      };
    case GET_USERS:
      console.log("In admin reducer GET_USERS");
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        pagination: action.payload.headers.get('pagination'),
      };
    case ADMIN_LOADING:
      console.log("In admin reducer ADMIN_LOADING");
      return {
        ...state,
        loading: true,
      };
    case USER_WITH_PLAN:
      console.log("In admin reducer USER_WITH_PLAN");
      return {
        ...state,
        loading: false,
        userWithPlan: action.payload,
      };
    default:
      console.log("In admin reducer default state");
      return state;
  }
}

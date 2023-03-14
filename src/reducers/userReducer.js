import {
  GET_USER,
  GET_USERS,
  GET_USER_ADDRESS,
  UPDATE_USER,
  UPDATE_USER_ADDRESS,
  USER_LOADING,
} from '../actions/types';

// other way of passing initial state
export default function (
  state = { userInfo: {}, users: [], address: {} },
  action
) {
  switch (action.type) {
    case GET_USER:
      console.log("In user reducer GET_USER");
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
    case USER_LOADING:
      console.log("In user reducer USER_LOADING");
      return {
        ...state,
        loading: true,
      };
    // case GET_USERS:
    //   return {
    //     ...state,
    //     users: action.payload,
    //     loading: false,
    //   };
    case GET_USER_ADDRESS:
      console.log("In user reducer GET_USER_ADDRESS");
      return {
        ...state,
        address: action.payload,
        loading: false,
      };
    case UPDATE_USER_ADDRESS:
      console.log("In user reducer UPDATE_USER_ADDRESS");
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    case UPDATE_USER:
      console.log("In user reducer UPDATE_USER");
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    default:
      console.log("In user reducer default state");
      return state;
  }
}

import {
    AUTH_LOADING,
    PASSWORD_CHANGE,
    RESET_PASSWORD,
    SEND_RESET_PASSWORD_LINK,
    SET_CURRENT_USER,
  } from '../actions/types';
  import isEmpty from '../validation/is-empty';
  
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    changePassword: '',
    resetLinkSend: '',
    resetPasswordSuccess: '',
  };
  
export default function (state = initialState, action) {
  console.log("In auth reducer");
    switch (action.type) {
      case SET_CURRENT_USER:
        console.log("In auth reducer SET_CURRENT_USER");
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
        };
      case PASSWORD_CHANGE:
        return {
          ...state,
          loading: false,
          changePassword: action.payload,
        };
      case AUTH_LOADING:
        console.log("In auth reducer AUTH_LOADING");
        return {
          ...state,
          loading: true,
        };
      case SEND_RESET_PASSWORD_LINK:
        return {
          ...state,
          loading: false,
          resetLinkSend: action.payload,
        };
      case RESET_PASSWORD:
        return {
          ...state,
          resetPasswordSuccess: action.payload,
        };
      default:
        console.log("In auth default state");
        return state;
    }
  }
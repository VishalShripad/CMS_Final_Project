import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  console.log("In error reducer");
  switch (action.type) {
    case GET_ERRORS:
      console.log("In error reducer GET_ERRORS");
      return action.payload;
    case CLEAR_ERRORS:
      console.log("In error reducer CLEAR_ERRORS");
      return {};
    default:
      console.log("In error default state");
      return state;
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

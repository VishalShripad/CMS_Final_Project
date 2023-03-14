import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer';
import channelReducer from './channelReducer';
import planReducer from './planReducer';
import userReducer from './userReducer';

console.log("In combine reduser");
export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  cart: cartReducer,
  channel: channelReducer,
  plan: planReducer,
  user: userReducer,
  admin: adminReducer,
});

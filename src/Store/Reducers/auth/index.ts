import { combineReducers } from '@reduxjs/toolkit';
import generalReducer from './general';

export default combineReducers({
  general: generalReducer,
});

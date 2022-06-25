import { combineReducers } from '@reduxjs/toolkit';
import generalReducer from './general';
import themeReducer from './theme';

export default combineReducers({
  general: generalReducer,
  theme: themeReducer,
});

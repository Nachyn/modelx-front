import { combineReducers } from '@reduxjs/toolkit';
import map from './map/slice';
import user from './user/slice';

export const rootReducer = combineReducers({
  map,
  user
});

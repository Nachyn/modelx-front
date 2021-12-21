import { combineReducers } from '@reduxjs/toolkit';
import map from './map/slice';

export const rootReducer = combineReducers({
  map
});

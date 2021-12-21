import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectState = createSelector(
  (state: RootState) => state,
  state => state.map
);

export const selectMap = createSelector(selectState, state => state.map);

export const selectLatitude = createSelector(
  selectState,
  state => state.latitude
);

export const selectLongitude = createSelector(
  selectState,
  state => state.longitude
);

export const selectZoom = createSelector(selectState, state => state.zoom);

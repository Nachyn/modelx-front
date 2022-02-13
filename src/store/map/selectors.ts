import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectState = createSelector(
  (state: RootState) => state,
  state => state.map
);

export const selectLngLat = createSelector(selectState, state => ({
  lng: state.longitude,
  lat: state.latitude
}));

export const selectZoom = createSelector(selectState, state => state.zoom);

export const selectModels = createSelector(selectState, state => state.models);

export const selectMapInitialized = createSelector(
  selectState,
  state => state.mapInitialized
);

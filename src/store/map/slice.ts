import mapboxgl, { Map } from 'mapbox-gl';
import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';
import { defaultMapValues } from '../../consts/map';

export interface MapState {
  map: Map | null;
  latitude: number;
  longitude: number;
  zoom: number;
}

const initialState: MapState = {
  map: null,
  latitude: 0,
  longitude: 0,
  zoom: 10
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.initializeMap, (state, { payload }) => {
      const { mapContainer, latitude, longitude, zoom } = payload;
      return {
        latitude,
        longitude,
        zoom,
        map: new mapboxgl.Map({
          container: mapContainer,
          center: [longitude, latitude],
          zoom,
          style: defaultMapValues.style
        })
      };
    });
  }
});

export default mapSlice.reducer;
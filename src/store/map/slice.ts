import mapboxgl, { Map } from 'mapbox-gl';
import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';
import { defaultMapValues } from '../../consts/map';
import { createCustomLayer } from '../../mapboxgl/create-custom-layer';
import { MapModel } from './models/map-model';

let MAP: Map | null = null;

export interface MapState {
  latitude: number;
  longitude: number;
  zoom: number;
  models: MapModel[];
}

const initialState: MapState = {
  latitude: 0,
  longitude: 0,
  zoom: 10,
  models: []
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(actions.initializeMap, (state, { payload }) => {
        const { mapContainer, latitude, longitude, zoom } = payload;
        MAP = new mapboxgl.Map({
          container: mapContainer,
          center: [longitude, latitude],
          zoom,
          style: defaultMapValues.style,
          antialias: defaultMapValues.antialias,
          pitch: defaultMapValues.pitch
        });
        return {
          latitude,
          longitude,
          zoom,
          models: []
        };
      })
      .addCase(actions.addModel, (state, { payload }) => {
        if (!MAP || state.models.find(m => m.id === payload.id)) {
          return;
        }

        const customLayer = createCustomLayer(payload);
        MAP.addLayer(customLayer, 'waterway-label');

        return {
          ...state,
          models: [...state.models, payload]
        };
      })
      .addCase(actions.removeModel, (state, { payload }) => {
        if (!MAP) {
          return;
        }

        const model = state.models.find(m => m.id === payload.id);
        if (!model) {
          return;
        }

        MAP.removeLayer(model.id);
        return {
          ...state,
          models: state.models.filter(m => m.id !== model.id)
        };
      });
  }
});

export default mapSlice.reducer;

import mapboxgl, { Map } from 'mapbox-gl';
import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';
import { defaultMapValues } from '../../app/consts/map';
import { createCustomLayer } from '../../mapboxgl/create-custom-layer';
import { MapModel } from './models/map-model';
import * as events from './events';

let MAP: Map | null = null;

export interface MapState {
  mapInitialized: boolean;
  latitude: number;
  longitude: number;
  zoom: number;
  models: MapModel[];
}

const initialState = (): MapState => ({
  mapInitialized: false,
  latitude: 0,
  longitude: 0,
  zoom: 10,
  models: []
});

export const mapSlice = createSlice({
  name: 'map',
  initialState: initialState(),
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
        MAP.on('style.load', events.dispatchInitializeMapSuccessEvent);
        MAP.on('zoom', () => {
          events.dispatchZoomMapEvent(MAP!.getZoom());
        });
        MAP.on('click', e => events.dispatchLngLatEvent(e.lngLat));

        return {
          latitude,
          longitude,
          zoom,
          models: [],
          mapInitialized: false
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
      })
      .addCase(actions.setZoomSuccess, (state, { payload }) => {
        return {
          ...state,
          zoom: payload
        };
      })
      .addCase(actions.setLngLat, (state, { payload }) => {
        return {
          ...state,
          longitude: payload.lng,
          latitude: payload.lat
        };
      })
      .addCase(actions.clear, state => {
        if (!MAP) {
          return;
        }

        state.models.forEach(m => MAP!.removeLayer(m.id));
        return {
          ...state,
          models: []
        };
      })
      .addCase(actions.initializeMapSuccess, state => {
        return {
          ...state,
          mapInitialized: true
        };
      });
  }
});

export default mapSlice.reducer;

import {
  getCreateActionFromStore,
  getCreatePayloadActionFromStore
} from '../helpers';
import { MapModel } from './models/map-model';

const storeName = 'map';
const createPayloadAction = getCreatePayloadActionFromStore(storeName);
const createAction = getCreateActionFromStore(storeName);

export const initializeMap = createPayloadAction<{
  mapContainer: HTMLElement | string;
  latitude: number;
  longitude: number;
  zoom: number;
}>('initializeMap');
export const initializeMapSuccess = createAction('initializeMapSuccess');

export const loadModels = createAction('loadModels');
export const loadModelsFailure = createPayloadAction<any>('loadModelsFailure');

export const addModel = createPayloadAction<MapModel>('addModel');

export const deleteModel = createPayloadAction<{
  id: string;
}>('deleteModel');
export const deleteModelFailure =
  createPayloadAction<any>('deleteModelFailure');
export const removeModel = createPayloadAction<{
  id: string;
}>('removeModel');

export const setZoom = createPayloadAction<number>('setZoom');
export const setZoomSuccess = createPayloadAction<number>('setZoomSuccess');

export const setLngLat =
  createPayloadAction<{ lng: number; lat: number }>('setLngLat');

export const uploadModel = createPayloadAction<File>('uploadModel');
export const uploadModelSuccess =
  createPayloadAction<{ newModelId: number }>('uploadModelSuccess');
export const uploadModelFailure =
  createPayloadAction<any>('uploadModelFailure');

export const clear = createAction('clear');

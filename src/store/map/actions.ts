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

export const addModel = createPayloadAction<MapModel>('addModel');

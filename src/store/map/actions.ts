import {
  getCreateActionFromStore,
  getCreatePayloadActionFromStore
} from '../helpers';

const storeName = 'map';
const createPayloadAction = getCreatePayloadActionFromStore(storeName);
const createAction = getCreateActionFromStore(storeName);

export const initializeMap = createPayloadAction<{
  mapContainer: HTMLElement | string;
  latitude: number;
  longitude: number;
  zoom: number;
}>('initializeMap');

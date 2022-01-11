import {
  getCreateActionFromStore,
  getCreatePayloadActionFromStore
} from '../helpers';
import { RegisterInfo } from './models/register-info';

const storeName = 'user';
const createPayloadAction = getCreatePayloadActionFromStore(storeName);
const createAction = getCreateActionFromStore(storeName);

export const register = createPayloadAction<RegisterInfo>('register');
export const registerSuccess = createAction('registerSuccess');
export const registerFailure = createPayloadAction<any>('registerFailure');

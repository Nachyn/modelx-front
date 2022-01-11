import {
  getCreateActionFromStore,
  getCreatePayloadActionFromStore
} from '../helpers';
import { RegisterInfo } from './models/register-info';
import { LoginInfo } from './models/login-info';
import { AuthInfo } from './models/auth-info';

const storeName = 'user';
const createPayloadAction = getCreatePayloadActionFromStore(storeName);
const createAction = getCreateActionFromStore(storeName);

export const register = createPayloadAction<RegisterInfo>('register');
export const registerSuccess = createAction('registerSuccess');
export const registerFailure = createPayloadAction<any>('registerFailure');

export const login = createPayloadAction<LoginInfo>('login');
export const loginSuccess = createPayloadAction<AuthInfo>('loginSuccess');
export const loginFailure = createPayloadAction<any>('loginFailure');

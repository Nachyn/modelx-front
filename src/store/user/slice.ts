import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';

export interface UserState {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const initialState: UserState = {
  id: 0,
  email: '',
  roles: [],
  username: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.loginSuccess, (_, { payload }) => {
      return {
        id: payload.userId,
        username: payload.username,
        roles: payload.roles,
        email: payload.email
      };
    });
  }
});

export default userSlice.reducer;

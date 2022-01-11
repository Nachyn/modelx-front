import { createSlice } from '@reduxjs/toolkit';

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
  extraReducers: builder => {}
});

export default userSlice.reducer;

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectState = createSelector(
  (state: RootState) => state,
  state => state.user
);

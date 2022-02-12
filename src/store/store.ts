import { createEpicMiddleware } from 'redux-observable';
import { configureStore } from '@reduxjs/toolkit';
import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';
import { addInitializeMapSuccessEventListener } from './events';
import { initializeMapSuccess } from './map/actions';

const epicMiddleware = createEpicMiddleware();

addInitializeMapSuccessEventListener(() => {
  store!.dispatch(initializeMapSuccess());
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware]
});

// @ts-ignore
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;

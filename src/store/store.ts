import { createEpicMiddleware } from 'redux-observable';
import { configureStore } from '@reduxjs/toolkit';
import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';
import * as mapEvents from './map/events';
import * as mapActions from './map/actions';

const epicMiddleware = createEpicMiddleware();

mapEvents.addInitializeMapSuccessEventListener(() => {
  store!.dispatch(mapActions.initializeMapSuccess());
});
mapEvents.addZoomMapEventListener(zoom => {
  store!.dispatch(mapActions.setZoom(zoom));
});
mapEvents.addLngLatEventListener(props => {
  store!.dispatch(mapActions.setLngLat(props));
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware]
});

// @ts-ignore
epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;

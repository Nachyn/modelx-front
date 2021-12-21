import { combineEpics } from 'redux-observable';
import { mapEpics } from './map/epics';

export const rootEpic = combineEpics(mapEpics);

import { combineEpics } from 'redux-observable';
import { mapEpics } from './map/epics';
import { userEpics } from './user/epics';

// @ts-ignore
export const rootEpic = combineEpics(mapEpics, userEpics);

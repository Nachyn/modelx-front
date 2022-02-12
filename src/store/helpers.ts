import { Action, createAction, PayloadAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';

function createActionName(storeName: string, actionName: string) {
  return `${storeName}/${actionName}`;
}

export function getCreatePayloadActionFromStore(storeName: string) {
  return function <T>(actionName: string) {
    return createAction<T>(createActionName(storeName, actionName));
  };
}

export function getCreateActionFromStore(storeName: string) {
  return function (actionName: string) {
    return createAction(createActionName(storeName, actionName));
  };
}

export type PayloadEpic<T> = Epic<PayloadAction<T>, any, void, T>;
export type StatePayloadEpic<T, S> = Epic<PayloadAction<T>, any, S, T>;
export type SimpleEpic = Epic<Action, Action, void>;

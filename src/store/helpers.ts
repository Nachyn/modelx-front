import { createAction } from '@reduxjs/toolkit';

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

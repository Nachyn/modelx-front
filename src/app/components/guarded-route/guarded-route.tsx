import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorageService } from '../../services/local-storage/local-storage-service';
import { LocalStorageKeys } from '../../consts/local-storage-keys';
import * as React from 'react';
import { PageRoutes } from '../../consts/routes';

export function GuardedRoute() {
  return !!LocalStorageService.getItem(LocalStorageKeys.Token) ? (
    <Outlet />
  ) : (
    <Navigate to={PageRoutes.login} />
  );
}

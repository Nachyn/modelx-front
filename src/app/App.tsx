import React from 'react';
import { Map } from './components/map/map';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Lobby } from './pages/lobby/lobby';
import { Login } from './pages/login/login';
import { PageRoutes } from './consts/routes';
import { GuardedRoute } from './components/guarded-route/guarded-route';

export function App() {
  return (
    <AppComponent>
      <Routes>
        <Route path={PageRoutes.lobby} element={<GuardedRoute />}>
          <Route path={PageRoutes.lobby} element={<Lobby />} />
        </Route>
        <Route path={PageRoutes.login} element={<Login />} />
      </Routes>
      <Map />
    </AppComponent>
  );
}

const AppComponent = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

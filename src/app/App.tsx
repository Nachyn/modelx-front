import React from 'react';
import { Map } from './components/Map/Map';
import styled from 'styled-components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Lobby } from './pages/Lobby/Lobby';
import { Login } from './pages/Login/Login';
import { PageRoutes } from './consts/routes';
import { GuardedRoute } from './components/GuardedRoute/GuardedRoute';
import { Register } from './pages/Register/Register';

export function App() {
  return (
    <AppComponent>
      <Routes>
        <Route path={PageRoutes.lobby} element={<GuardedRoute />}>
          <Route path={PageRoutes.lobby} element={<Lobby />} />
        </Route>
        <Route path={PageRoutes.login} element={<Login />} />
        <Route path={PageRoutes.register} element={<Register />} />
        <Route path="*" element={<Navigate to={PageRoutes.lobby} />} />
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

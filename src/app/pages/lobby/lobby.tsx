import React from 'react';
import styled from 'styled-components';
import { ZIndex } from '../../consts/z-index';
import { CenteredRowFlex } from '../../typograhpy/flex';

export function Lobby() {
  return <LobbyComponent>Lobby</LobbyComponent>;
}

const LobbyComponent = styled(CenteredRowFlex)`
  width: 300px;
  height: 300px;
  position: absolute;
  z-index: ${ZIndex.Lobby};
  top: 20px;
  left: 50%;
  background: white;
  border-radius: 15px;
  transform: translateX(-50%);
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { ZIndex } from '../../consts/z-index';
import { Divider, List } from 'antd';
import * as mapSelectors from '../../../store/map/selectors';
import { useSelector } from 'react-redux';

export function Lobby() {
  const [isOpen, setIsOpen] = useState(true);
  const models = useSelector(mapSelectors.selectModels);
  const zoom = useSelector(mapSelectors.selectZoom);
  const latitude = useSelector(mapSelectors.selectLatitude);
  const longitude = useSelector(mapSelectors.selectLongitude);

  const settings = [
    <div>Zoom: {zoom.toFixed(2)}</div>,
    <div>Longitude: {longitude.toFixed(6)}</div>,
    <div>Latitude: {latitude.toFixed(6)}</div>
  ];

  return isOpen ? (
    <LobbyComponent onClick={() => setIsOpen(true)}>
      <Divider orientation="left">Map</Divider>
      <List
        bordered
        dataSource={settings}
        renderItem={setting => <List.Item>{setting}</List.Item>}
      />
      <Divider orientation="left">Models</Divider>
      <List
        footer={<ListAction>Add model</ListAction>}
        bordered
        dataSource={models}
        renderItem={model => <List.Item>{model.name}</List.Item>}
      />
    </LobbyComponent>
  ) : (
    <HiddenLobbyComponent onClick={() => setIsOpen(true)} />
  );
}

const LobbyComponent = styled.div`
  width: 300px;
  position: absolute;
  z-index: ${ZIndex.Lobby};
  top: 20px;
  left: 20px;
  background: white;
  border-radius: 2px;
  padding: 10px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  max-height: calc(100vh - 40px);
  overflow: hidden;
  overflow-y: auto;
`;

const HiddenLobbyComponent = styled(LobbyComponent)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const ListAction = styled.div`
  font-weight: 500;
`;

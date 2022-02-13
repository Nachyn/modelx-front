import React, { useState } from 'react';
import styled from 'styled-components';
import { ZIndex } from '../../consts/z-index';
import { Divider, List } from 'antd';
import * as mapSelectors from '../../../store/map/selectors';
import * as mapActions from '../../../store/map/actions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { Models } from './components/Models/Models.';
import { MapModel } from '../../../store/map/models/map-model';

export function Lobby() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);
  const zoom = useSelector(mapSelectors.selectZoom);
  const { lng, lat } = useSelector(mapSelectors.selectLngLat);

  const settings = [
    <div>Zoom: {zoom.toFixed(2)}</div>,
    <div>Longitude: {lng.toFixed(6)}</div>,
    <div>Latitude: {lat.toFixed(6)}</div>
  ];

  const [deleteModel, setDeleteModel] = useState<MapModel | null>(null);

  return isOpen ? (
    <LobbyComponent onClick={() => setIsOpen(true)}>
      <ConfirmModal
        title="Delete"
        visible={!!deleteModel}
        onOk={() => {
          dispatch(mapActions.deleteModel({ id: deleteModel!.id }));
          setDeleteModel(null);
        }}
        onCancel={() => setDeleteModel(null)}
        okText="Yes"
        cancelText="No"
      >
        <p>
          Are you sure you want to delete <br /> <b>{deleteModel?.name}</b>?
        </p>
      </ConfirmModal>

      <Divider orientation="left">Map</Divider>
      <List
        bordered
        dataSource={settings}
        renderItem={setting => <List.Item>{setting}</List.Item>}
      />

      <Models onDelete={setDeleteModel} />
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

const ConfirmModal = styled(Modal)`
  width: 300px !important;
`;

import React from 'react';
import { Map } from './components/map/map';
import styled from 'styled-components';
import * as mapActions from '../store/map/actions';
import { useDispatch } from 'react-redux';

export function App() {
  const dispatch = useDispatch();
  const handleButton = () => {
    dispatch(
      mapActions.addModel({
        latitude: 40.689253,
        longitude: -74.044553,
        glbModelUrl:
          'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
        id: '1'
      })
    );
  };

  const handleButton2 = () => {
    dispatch(mapActions.removeModel({ id: '1' }));
  };
  return (
    <AppComponent>
      <HelpButton2 onClick={() => handleButton2()} />
      <HelpButton onClick={() => handleButton()} />
      <Map />
    </AppComponent>
  );
}

const AppComponent = styled.div`
  position: relative;
`;

const HelpButton = styled.div`
  height: 50px;
  width: 100px;
  background: blue;
  border-radius: 10px;
  z-index: 1;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`;

const HelpButton2 = styled(HelpButton)`
  background: red;
  bottom: 70px;
`;

import React, { useEffect, useRef } from 'react';
import styled, { StyledComponent } from 'styled-components';
import * as mapActions from '../../../store/map/actions';
import { useDispatch } from 'react-redux';
import { defaultMapValues } from '../../consts/map';
import { ZIndex } from '../../consts/z-index';

export function Map() {
  const dispatch = useDispatch();
  const mapContainer = useRef<string | HTMLElement>(
    defaultMapValues.containerRef
  );

  useEffect(() => {
    if (mapContainer.current === defaultMapValues.containerRef) {
      return;
    }

    dispatch(
      mapActions.initializeMap({
        zoom: defaultMapValues.zoom,
        latitude: defaultMapValues.latitude,
        longitude: defaultMapValues.longitude,
        mapContainer: mapContainer.current
      })
    );
  }, [mapContainer.current]);

  return <Mapbox ref={mapContainer} />;
}

const Mapbox = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${ZIndex.Map};
` as StyledComponent<any, HTMLDivElement>;

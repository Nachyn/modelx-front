import React, { useEffect, useRef } from 'react';
import styled, { StyledComponent } from 'styled-components';
import * as mapActions from '../../../store/map/actions';
import { useDispatch } from 'react-redux';
import { defaultMapValues } from '../../../consts/map';

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
  height: 100vh;
` as StyledComponent<any, HTMLDivElement>;

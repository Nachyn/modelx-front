const initializeMapSuccessEventName = 'initializeMapSuccessEvent';

export const addInitializeMapSuccessEventListener = (callback: () => void) => {
  window.addEventListener(initializeMapSuccessEventName, callback);
};

export const dispatchInitializeMapSuccessEvent = () => {
  window.dispatchEvent(new Event(initializeMapSuccessEventName));
};

const zoomMapEventName = 'zoomMapEvent';

export const addZoomMapEventListener = (callback: (zoom: number) => void) => {
  window.addEventListener(zoomMapEventName, ((e: CustomEvent) => {
    callback(e.detail);
  }) as EventListener);
};

export const dispatchZoomMapEvent = (zoom: number) => {
  window.dispatchEvent(new CustomEvent(zoomMapEventName, { detail: zoom }));
};

const lngLatEventEventName = 'lngLatEvent';

export const addLngLatEventListener = (
  callback: (props: { lng: number; lat: number }) => void
) => {
  window.addEventListener(lngLatEventEventName, ((e: CustomEvent) => {
    callback(e.detail);
  }) as EventListener);
};

export const dispatchLngLatEvent = (props: { lng: number; lat: number }) => {
  window.dispatchEvent(
    new CustomEvent(lngLatEventEventName, { detail: props })
  );
};

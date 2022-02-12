const initializeMapSuccessEventName = 'initializeMapSuccessEvent';
const initializeMapSuccessEvent = new Event(initializeMapSuccessEventName);

export const addInitializeMapSuccessEventListener = (callback: () => void) => {
  window.addEventListener(initializeMapSuccessEventName, callback);
};

export const dispatchInitializeMapSuccessEvent = () => {
  window.dispatchEvent(initializeMapSuccessEvent);
};

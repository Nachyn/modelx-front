import { useMediaQuery } from 'react-responsive';

export const sizes = {
  mini: 360,
  mobile: 720,
  desktop: 1100
};

export const useIsMini = () =>
  useMediaQuery({
    query: `(max-width: ${sizes.mini}px)`
  });

export const useIsMobile = () =>
  useMediaQuery({
    query: `(max-width: ${sizes.mobile}px)`
  });

export const useIsStrictMobile = () =>
  useMediaQuery({
    query: `(min-width: ${sizes.mini}px) and (max-width: ${sizes.mobile}px)`
  });

'use client';

import { useEffect, useState } from 'react';

const MOBILE_MAX = 480;
const TABLET_MAX = 768;

export const useMedia = (): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTabletOrMobile: boolean;
} => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isMobile = width !== null && width <= MOBILE_MAX;
  const isTablet = width !== null && width > MOBILE_MAX && width <= TABLET_MAX;
  const isDesktop = width !== null && width > TABLET_MAX;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTabletOrMobile: isTablet || isMobile,
  };
};
